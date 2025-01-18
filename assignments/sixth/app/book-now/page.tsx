import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function BookNow() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold">Book Now</h1>
      </div>
      <Footer />
    </main>
  )
}

