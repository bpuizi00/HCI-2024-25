import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { getHotelCards } from "@/lib/contentful"
import { ApartmentCard } from "@/components/apartment-card"
import { ApartmentsFilterClient } from "@/components/apartments-filter-client"

export default async function Hotels() {
  const hotels = await getHotelCards()

  return (
    <main>
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <h1 className="text-4xl font-bold mb-8">Hotels</h1>
        <ApartmentsFilterClient apartments={hotels} />
      </div>
      <Footer />
    </main>
  )
}