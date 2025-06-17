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

// Shared card type for Apartment, Hotel, Studio, etc.
export interface PropertyCard {
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

// Helper to capitalize first letter
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Generic function to fetch cards by content type
async function getPropertyCardsByType(contentType: string): Promise<PropertyCard[]> {
  try {
    console.log(`Fetching ${contentType} entries`)

    // Try both lowercase and uppercase content type IDs
    let entries = await contentfulClient.getEntries({
      content_type: contentType.toLowerCase(),
      include: 10,
    })

    if (entries.items.length === 0) {
      console.log(`No entries found with lowercase '${contentType}', trying uppercase '${capitalize(contentType)}'`)
      entries = await contentfulClient.getEntries({
        content_type: capitalize(contentType),
        include: 10,
      })
    }

    console.log(`Fetched ${entries.items.length} ${contentType} entries`)

    return entries.items.map((item) => {
      const fields = item.fields as any

      const extractRichText = (richTextField: { content: any[] }) => {
        if (!richTextField) return ""
        if (typeof richTextField === "string") return richTextField
        if (richTextField.content) {
          try {
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

      let pictureUrl = "/placeholder.svg?height=400&width=600"
      let pictureTitle = fields.name || `${capitalize(contentType)} Image`

      if (fields.image) {
        if (fields.image.fields && fields.image.fields.file) {
          pictureUrl = fields.image.fields.file.url || pictureUrl
          pictureTitle = fields.image.fields.title || pictureTitle
          if (pictureUrl && !pictureUrl.startsWith("http")) {
            pictureUrl = `https:${pictureUrl}`
          }
        } else if (fields.image.file) {
          pictureUrl = fields.image.file.url || pictureUrl
          pictureTitle = fields.image.title || pictureTitle
          if (pictureUrl && !pictureUrl.startsWith("http")) {
            pictureUrl = `https:${pictureUrl}`
          }
        } else if (typeof fields.image === "string") {
          pictureUrl = fields.image
        }
      }

      return {
        name: fields.name || `Unnamed ${capitalize(contentType)}`,
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
    console.error(`Error fetching ${contentType} cards:`, error)
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return []
  }
}

// Specific functions for each property type
export function getApartmentCards(): Promise<PropertyCard[]> {
  return getPropertyCardsByType("apartment")
}

export function getHotelCards(): Promise<PropertyCard[]> {
  return getPropertyCardsByType("hotels")
}

export function getStudioCards(): Promise<PropertyCard[]> {
  return getPropertyCardsByType("studio")
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
