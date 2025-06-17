"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginDialog } from "@/components/login-dialog"

export function LandingNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "HOME", route: "/" },
    { name: "GALLERY", route: "/gallery" },
    { name: "BOOK NOW", route: "/book-now" },
    { name: "BLOG", route: "/blog" },
    { name: "CONTACT", route: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        <Link
          href="/"
          className={`text-2xl font-bold md:px-10 lg:px-10 ${scrolled ? "text-blue-500" : "text-white"}`}
        >
          Air<span className={scrolled ? "text-cyan-400" : "text-cyan-300"}>B&I</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navItems.map((item) => (
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
          <LoginDialog
            open={isLoginOpen}
            setOpen={setIsLoginOpen}
            inputPrefix="desktop-"
            trigger={
              <span
                className={`
                  border
                  ${scrolled
                    ? "border-gray-700 text-gray-700 hover:bg-gray-100 hover:text-blue-500"
                    : "border-white text-white hover:bg-white/10"}
                  rounded
                  px-4
                  py-2
                  font-bold
                  transition-colors
                  cursor-pointer
                  inline-flex
                  items-center
                  bg-transparent
                  focus:outline-none
                `}
                onClick={() => setIsLoginOpen(true)}
                tabIndex={0}
                role="button"
              >
                Log in
              </span>
            }
          />
        </div>
        <div className="md:hidden z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-cyan-300 transition-colors relative w-8 h-8 focus:outline-none"
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
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.route}
                className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 text-center"
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
      </div>
    </nav>
  )
}
