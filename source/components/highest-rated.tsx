import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface RatedProperty {
  id: string
  name: string
  rating: number
  image: string
  features: string[]
}

const ratedProperties: RatedProperty[] = [
  {
    id: "1",
    name: "Maestro Studio Apartment",
    rating: 9.9,
    image: "/maestro-studio.jpg?height=200&width=300",
    features: ["Sea view", "Parking slot", "Family room"]
  },
  {
    id: "2",
    name: "Luka Apartment",
    rating: 9.8,
    image: "/luka-apartment.jpg?height=200&width=300",
    features: ["Near center", "Beach enter", "Balcony"]
  },
  {
    id: "3",
    name: "Marija Apartment",
    rating: 9.7,
    image: "/marija-apartment.jpg?height=200&width=300",
    features: ["Free parking", "Free WiFi", "Balcony"]
  }
]

export function HighestRated() {
  return (
    <section className="py-12 px-6 md:px-12 lg:px-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Highest rated</h2>
        <button className="p-2">
          <span className="sr-only">Filter</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ratedProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1">
                  <span className="text-blue-500 font-bold">{property.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{property.name}</h3>
                <ul className="space-y-1 mb-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Book now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

