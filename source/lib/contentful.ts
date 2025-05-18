import { createClient } from "contentful"

// Use a direct access token for now (we'll fix the environment variable later)

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

if (!space || !accessToken) {
  throw new Error("CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be defined in environment variables.")
}

export const contentfulClient = createClient({
  space,
  accessToken,
})

// Define types based on your Contentful content model
export interface ApartmentCard {
  name: string
  location?: {
    lat: number
    lon: number
  }
  size?: string
  price?: string
  availability?: boolean
  image?: {
    url: string
    title: string
  }
  sys: {
    id: string
  }
}

export async function getApartmentCards(): Promise<ApartmentCard[]> {
  try {
    console.log("Fetching apartment entries")

    // Try both uppercase and lowercase content type IDs
    let entries = await contentfulClient.getEntries({
      content_type: "apartment", // lowercase first
      include: 10,
    })

    // If no entries found, try with uppercase
    if (entries.items.length === 0) {
      console.log("No entries found with lowercase 'apartment', trying uppercase 'Apartment'")
      entries = await contentfulClient.getEntries({
        content_type: "Apartment", // uppercase
        include: 10,
      })
    }

    console.log(`Fetched ${entries.items.length} apartment entries`)

    // Log the raw entries to see their structure
    console.log("Raw entries:", JSON.stringify(entries.items, null, 2))

    // Transform entries into our ApartmentCard type
    return entries.items.map((item) => {
      const fields = item.fields as any
      console.log(`Processing entry ${item.sys.id} with fields:`, fields)

      // Extract the rich text content as plain text
      const extractRichText = (richTextField: { content: any[] }) => {
        if (!richTextField) return ""

        // If it's already a string, return it
        if (typeof richTextField === "string") return richTextField

        // If it has content property (rich text format)
        if (richTextField.content) {
          try {
            // Try to extract text from the first paragraph
            return richTextField.content
              .filter((node) => node.nodeType === "paragraph")
              .map((node) =>
                node.content
                  .filter((content: { nodeType: string }) => content.nodeType === "text")
                  .map((text: { value: any }) => text.value)
                  .join(""),
              )
              .join("\n")
          } catch (e) {
            console.error("Error extracting rich text:", e)
            return ""
          }
        }

        return ""
      }

      // Extract image URL from the picture field
      let pictureUrl = "/placeholder.svg?height=400&width=600"
      let pictureTitle = fields.name || "Apartment Image"

      // Check if picture field exists and has the expected structure
      if (fields.image) {
        console.log("Picture field found:", fields.image)

        // Handle different possible structures of the picture field
        if (fields.image.fields && fields.image.fields.file) {
          // Standard asset reference
          pictureUrl = fields.image.fields.file.url || pictureUrl
          pictureTitle = fields.image.fields.title || pictureTitle

          // Make sure URL is absolute
          if (pictureUrl && !pictureUrl.startsWith("http")) {
            pictureUrl = `https:${pictureUrl}`
          }
        } else if (fields.image.file) {
          // Direct file object
          pictureUrl = fields.image.file.url || pictureUrl
          pictureTitle = fields.image.title || pictureTitle

          // Make sure URL is absolute
          if (pictureUrl && !pictureUrl.startsWith("http")) {
            pictureUrl = `https:${pictureUrl}`
          }
        } else if (typeof fields.image === "string") {
          // Direct URL string
          pictureUrl = fields.image
        }
      }

      return {
        name: fields.name || "Unnamed Apartment",
        location: fields.location || null,
        size: extractRichText(fields.size) || "",
        price: extractRichText(fields.price) || "",
        availability: typeof fields.availability === "boolean" ? fields.availability : true,
        image: {
          url: pictureUrl,
          title: pictureTitle,
        },
        sys: {
          id: item.sys.id,
        },
      }
    })
  } catch (error) {
    console.error("Error fetching apartment cards:", error)
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return []
  }
}

// Function to fetch all entries regardless of content type
export async function getAllEntries() {
  try {
    const entries = await contentfulClient.getEntries({
      include: 2,
    })

    console.log(`Found ${entries.total} total entries`)
    return entries.items
  } catch (error) {
    console.error("Error fetching all entries:", error)
    return []
  }
}

// Function to check content types
export async function checkContentTypes() {
  try {
    const contentTypes = await contentfulClient.getContentTypes()

    if (contentTypes && contentTypes.items) {
      return contentTypes.items.map((type) => ({
        id: type.sys.id,
        name: type.name,
      }))
    }
    return []
  } catch (error) {
    console.error("Error fetching content types:", error)
    return []
  }
}
