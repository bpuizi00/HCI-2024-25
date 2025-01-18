import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { PropertyTypes } from "@/components/property-types"
import { PropertyCard } from "@/components/property-card"
import { HighestRated } from "@/components/highest-rated"
import { Footer } from "@/components/footer"

const currentDeals = [
  {
    id: "1",
    name: "Maestro Apartment",
    location: "Bačvice",
    size: "65 m²",
    price: 230,
    rating: 5,
    features: ["Parking available"],
    image: "/maestro-studio.jpg?height=200&width=300",
    dateRange: "Dec. 20 - Dec. 23",
  },
  {
    id: "2",
    name: "COZY Studio Apartment",
    location: "Visoka",
    size: "20 m²",
    price: 175,
    rating: 5,
    features: ["Wi-Fi available"],
    image: "/garsonjera.jpg?height=200&width=300",
    dateRange: "Dec. 18 - Dec. 22",
  },
  {
    id: "3",
    name: "Luka Apartment",
    location: "Blatine",
    size: "42 m²",
    price: 210,
    rating: 5,
    features: ["Breakfast included"],
    image: "/luka-apartment.jpg?height=200&width=300",
    dateRange: "Jan. 3 - Jan. 5",
  },
]

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <PropertyTypes />
      <section className="py-12 px-6">
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-3xl font-bold">Current deals</h2>
          <span className="text-red-500">🔥</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentDeals.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      <HighestRated />
      <Footer />
    </main>
  )
}

