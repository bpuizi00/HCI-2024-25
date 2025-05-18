"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function LandingNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className={`text-2xl md:px-10 lg:px-10 font-bold ${scrolled ? "text-blue-500" : "text-white"}`}>
          Air<span className={scrolled ? "text-cyan-400" : "text-cyan-300"}>B&I</span>
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
            <Link
              key={item.name}
              href={item.route}
              className={`${
                scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-cyan-300"
              } transition-colors`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            className={`ml-4 px-4 py-2 rounded font-semibold transition-colors
              ${scrolled
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-blue-500 hover:bg-cyan-300"
              }`}
          >
            Log in
          </Link>
        </div>
        <div className="md:hidden z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${
              scrolled ? "text-gray-700" : "text-white"
            } hover:text-blue-500 transition-colors relative w-8 h-8`}
            aria-label="Toggle menu"
          >
            <span
              className={`block absolute h-0.5 w-8 ${
                scrolled ? "bg-current" : "bg-white"
              } transform transition duration-500 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-8 ${
                scrolled ? "bg-current" : "bg-white"
              } transform transition duration-500 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block absolute h-0.5 w-8 ${
                scrolled ? "bg-current" : "bg-white"
              } transform transition duration-500 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
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
            <Link
              href="/login"
              className="block mx-6 my-2 px-4 py-2 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
