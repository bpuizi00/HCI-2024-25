"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname } from "next/navigation"

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const pathname = usePathname()

  const handleLoginClick = () => {
    setIsLoginOpen(true)
  }

  const handleLoginClose = () => {
    setIsLoginOpen(false)
  }

  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between relative">
      <Link href="/" className="text-2xl font-bold text-blue-500">
        Air<span className="text-cyan-400">B&I</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 ml-auto">
        {[
          { name: "APARTMENTS", route: "/apartments" },
          { name: "GALLERY", route: "/gallery" },
          { name: "BOOK NOW", route: "/book-now" },
          { name: "BLOG", route: "/blog" },
          { name: "CONTACT", route: "/contact" },
        ].map((item) => (
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
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-gray-700 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
              onClick={handleLoginClick}
            >
              Log in
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Account</DialogTitle>
              <DialogDescription>Log in to your account or create a new one.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Log in
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm your password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
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
          {[
            { name: "APARTMENTS", route: "/apartments" },
            { name: "GALLERY", route: "/gallery" },
            { name: "BOOK NOW", route: "/book-now" },
            { name: "BLOG", route: "/blog" },
            { name: "CONTACT", route: "/contact" },
          ].map((item) => (
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
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-gray-700 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  onClick={handleLoginClick}
                >
                  Log in
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Account</DialogTitle>
                  <DialogDescription>Log in to your account or create a new one.</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-email">Email</Label>
                        <Input id="mobile-email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-password">Password</Label>
                        <Input id="mobile-password" type="password" placeholder="Enter your password" />
                      </div>
                      <Button type="submit" className="w-full">
                        Log in
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="signup">
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-email">Email</Label>
                        <Input id="mobile-signup-email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-signup-password">Password</Label>
                        <Input id="mobile-signup-password" type="password" placeholder="Create a password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-confirm-password">Confirm Password</Label>
                        <Input id="mobile-confirm-password" type="password" placeholder="Confirm your password" />
                      </div>
                      <Button type="submit" className="w-full">
                        Sign up
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </nav>
  )
}

