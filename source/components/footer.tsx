import Image from "next/image"
import Link from "next/link"

const paymentMethods = [
  {
    src: "/googlepay.svg?height=30&width=50",
    alt: "Google Pay",
    href: "https://pay.google.com/",
  },
  {
    src: "/applepay.svg?height=30&width=50",
    alt: "Apple Pay",
    href: "https://www.apple.com/apple-pay/",
  },
  {
    src: "/visa.svg?height=30&width=50",
    alt: "Visa",
    href: "https://www.visa.com/",
  },
  {
    src: "/mastercard.svg?height=30&width=50",
    alt: "Mastercard",
    href: "https://www.mastercard.com/",
  },
  {
    src: "/paypal.svg?height=30&width=50",
    alt: "PayPal",
    href: "https://www.paypal.com/",
  },
  {
    src: "/bitcoin.svg?height=30&width=50",
    alt: "Bitcoin",
    href: "https://bitcoin.org/",
  },
]

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
            {paymentMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={method.alt}
              >
                <Image
                  src={method.src}
                  alt={method.alt}
                  width={50}
                  height={30}
                  className="h-8 w-auto"
                />
              </a>
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

