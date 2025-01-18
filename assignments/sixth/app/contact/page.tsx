import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Address:</strong><br />
                Pasike 14, Tugare<br />
                21252 Split, Croatia
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong><br />
                info@airbi.com
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong><br />
                +385 (0)21 123 456
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
            <div className="space-y-2 text-gray-600">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

