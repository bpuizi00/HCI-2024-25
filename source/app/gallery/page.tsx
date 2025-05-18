import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function Gallery() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <h1 className="text-4xl font-bold mb-8">Apartment Gallery</h1>
      </div>
      <Footer />
    </main>
  )
}
