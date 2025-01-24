import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600">
            <p>AirB&I j.d.o.o</p>
            <p>Pasike 14, Tugare</p>
            <p>OIB: 26941009981</p>
          </div>
          <div className="flex items-center space-x-4">
            {[
              "/placeholder.svg?height=30&width=50",
              "/placeholder.svg?height=30&width=50",
              "/placeholder.svg?height=30&width=50",
              "/placeholder.svg?height=30&width=50",
              "/placeholder.svg?height=30&width=50",
              "/placeholder.svg?height=30&width=50"
            ].map((src, index) => (
              <Image
                key={index}
                src={src || "/placeholder.svg"}
                alt="Payment method"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
            ))}
          </div>
          <div className="flex space-x-4 text-gray-600">
            <Link href="/terms" className="hover:text-blue-500">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-blue-500">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

