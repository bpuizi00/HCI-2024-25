import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { getStudioCards } from "@/lib/contentful"
import { ApartmentCard } from "@/components/apartment-card"
import { ApartmentsFilterClient } from "@/components/apartments-filter-client"

export default async function Studios() {
  const studios = await getStudioCards()

  return (
    <main>
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <h1 className="text-4xl font-bold mb-8">Studio apartments</h1>
        <ApartmentsFilterClient apartments={studios} />
      </div>
      <Footer />
    </main>
  )
}