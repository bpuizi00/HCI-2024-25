import type { Metadata } from 'next'
import { AuthProvider } from "@/context/AuthContext"
import './globals.css'

export const metadata: Metadata = {
  title: 'AirB&I - Vacation Rentals',
  description: 'Find and book unique accommodations',
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

