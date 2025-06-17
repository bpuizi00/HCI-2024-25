"use client"

import { Dispatch, SetStateAction, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"

interface LoginDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger?: React.ReactNode
  inputPrefix?: string // for unique input ids in mobile/desktop
}

export function LoginDialog({ open, setOpen, trigger, inputPrefix = "" }: LoginDialogProps) {
  const { login, isLoggedIn, logout } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(email, password) && email === "admin@admin.hr" && password === "admin") {
      setOpen(false)
      setEmail("")
      setPassword("")
      setError("")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
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
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="text-green-600">You are logged in!</div>
                <Button onClick={logout} className="w-full">Log out</Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor={`${inputPrefix}email`}>Email</Label>
                  <Input
                    id={`${inputPrefix}email`}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${inputPrefix}password`}>Password</Label>
                  <Input
                    id={`${inputPrefix}password`}
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </form>
            )}
          </TabsContent>
          <TabsContent value="signup">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${inputPrefix}signup-email`}>Email</Label>
                <Input id={`${inputPrefix}signup-email`} type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${inputPrefix}signup-password`}>Password</Label>
                <Input id={`${inputPrefix}signup-password`} type="password" placeholder="Create a password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${inputPrefix}confirm-password`}>Confirm Password</Label>
                <Input id={`${inputPrefix}confirm-password`} type="password" placeholder="Confirm your password" />
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}