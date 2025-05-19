import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { getApartmentCards } from "@/lib/contentful"
import { ApartmentCard } from "@/components/apartment-card"
import { ApartmentsFilter } from "@/components/apartments-filter"

export const revalidate = 0 // Disable cache for debugging

export default async function Apartments() {
  // Fetch apartments from Contentful
  const apartments = await getApartmentCards()

  return (
    <main>
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <h1 className="text-4xl font-bold mb-8">Apartments</h1>
        <ApartmentsFilter />
        {apartments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No apartments found to display.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment, index) => (
              <ApartmentCard key={apartment.sys.id} apartment={apartment} priority={index === 0} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
