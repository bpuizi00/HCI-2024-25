import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function Gallery() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <h1 className="text-4xl font-bold mb-8">Apartment Gallery</h1>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image
          src="/404picture.webp"
          alt="Unavailable"
          width={300}
          height={200}
          className="mb-8"
        />
        <p className="text-2xl font-semibold mb-4">
          This page is currently unavailable
        </p>
        <a
          href="/"
          className="mt-4 px-6 py-2 border border-blue-500 rounded text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-colors"
        >
          Go back home
        </a>
      </div>
      <Footer />
    </main>
  )
}
