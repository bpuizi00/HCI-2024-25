import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function Apartments() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold">Apartments</h1>
      </div>
      <Footer />
    </main>
  )
}

