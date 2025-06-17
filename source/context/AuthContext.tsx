"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (email: string, password: string) => {
    if (email === "admin@admin.hr" && password === "admin") {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => setIsLoggedIn(false)

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}