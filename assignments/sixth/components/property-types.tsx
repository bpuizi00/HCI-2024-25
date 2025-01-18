import { PropertyType } from "@/types/property"
import Image from "next/image"

const propertyTypes: PropertyType[] = [
  {
    title: "Studio",
    image: "/studio.jpg?height=200&width=300",
  },
  {
    title: "Hotels",
    image: "/hotel-room.jpg?height=200&width=300",
  },
  {
    title: "Apartments",
    image: "/apartment.jpg?height=200&width=300",
  },
  {
    title: "Villas",
    image: "/villas.jpg?height=200&width=300",
  },
]

export function PropertyTypes() {
  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8">Browse by property type</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {propertyTypes.map((type) => (
          <div
            key={type.title}
            className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
          >
            <Image
              src={type.image || "/placeholder.svg"}
              alt={type.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <h3 className="text-white text-xl font-semibold">{type.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

