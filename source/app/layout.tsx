import type { Metadata } from 'next'
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
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}

