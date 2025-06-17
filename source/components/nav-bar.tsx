"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginDialog } from "@/components/login-dialog"
import { usePathname } from "next/navigation"

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "HOME", route: "/" },
    { name: "GALLERY", route: "/gallery" },
    { name: "BOOK NOW", route: "/book-now" },
    { name: "BLOG", route: "/blog" },
    { name: "CONTACT", route: "/contact" },
  ]

  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between relative">
      <Link href="/" className="text-2xl font-bold md:px-10 lg:px-10 text-blue-500">
        Air<span className="text-cyan-400">B&I</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 ml-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.route}
            className={`text-gray-700 hover:text-blue-500 transition-colors ${
              pathname === item.route ? "border-b-2 border-blue-500" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
        <LoginDialog
          open={isLoginOpen}
          setOpen={setIsLoginOpen}
          inputPrefix="desktop-"
          trigger={
            <Button
              variant="outline"
              className="text-gray-700 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => setIsLoginOpen(true)}
            >
              Log in
            </Button>
          }
        />
      </div>
      <div className="md:hidden z-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 hover:text-blue-500 transition-colors relative w-8 h-8"
          aria-label="Toggle menu"
        >
          <span
            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${
              isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2.5"
            }`}
          ></span>
          <span
            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${
              isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2.5"
            }`}
          ></span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-2 z-10">
          {navItems
            .filter((item) => item.name !== "HOME")
            .map((item) => (
              <Link
                key={item.name}
                href={item.route}
                className={`block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 text-center ${
                  pathname === item.route ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          <div className="px-6 py-2">
            <LoginDialog
              open={isLoginOpen}
              setOpen={setIsLoginOpen}
              inputPrefix="mobile-"
              trigger={
                <Button
                  variant="outline"
                  className="w-full text-gray-700 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Log in
                </Button>
              }
            />
          </div>
        </div>
      )}
    </nav>
  )
}

