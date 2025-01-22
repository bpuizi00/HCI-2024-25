"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white py-4 px-10 md:px-12 lg:px-24 flex items-center justify-between relative">
      <Link href="/" className="text-2xl font-bold text-blue-500">
        Air<span className="text-cyan-400">B&I</span>
      </Link>
      <div className="hidden md:flex gap-8">
        {[
          { name: "HOME", route: "/" },
          { name: "APARTMENTS", route: "/apartments" },
          { name: "GALLERY", route: "/gallery" },
          { name: "BOOK NOW", route: "/book-now" },
          { name: "BLOG", route: "/blog" },
          { name: "CONTACT", route: "/contact" },
        ].map((item) => (
          <Link key={item.name} href={item.route} className="text-gray-700 hover:text-blue-500 transition-colors">
            {item.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden z-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 hover:text-blue-500 transition-colors relative w-8 h-8"
          aria-label="Toggle menu"
        >
          <span
            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
          ></span>
          <span
            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
          ></span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-2 z-10">
          {[
            { name: "HOME", route: "/" },
            { name: "APARTMENTS", route: "/apartments" },
            { name: "GALLERY", route: "/gallery" },
            { name: "BOOK NOW", route: "/book-now" },
            { name: "BLOG", route: "/blog" },
            { name: "CONTACT", route: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.route}
              className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

