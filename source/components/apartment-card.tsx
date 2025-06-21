import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ApartmentCard as ApartmentCardType } from "@/lib/contentful"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"

interface ApartmentCardProps {
  apartment: ApartmentCardType
  priority?: boolean
}

export function ApartmentCard({ apartment, priority = false }: ApartmentCardProps) {
  const [address, setAddress] = useState<string>("")
  const [city, setCity] = useState<string>("")

  useEffect(() => {
    async function fetchAddress() {
      if (!apartment.location) return
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${apartment.location.lat}&lon=${apartment.location.lon}`
        )
        const data = await res.json()
        // Extract first 3 words from display_name
        const firstThreeWords = data.display_name
          ? data.display_name.split(" ").slice(0, 4).join(" ").replace(/,$/, "")
          : "Unknown address"
        setAddress(firstThreeWords)
      } catch (error) {
        setAddress("Unknown address")
      }
    }
    fetchAddress()
  }, [apartment.location])

  return (
    <Card className="overflow-hidden">
      <div className="relative h-64">
        {apartment.image?.url ? (
          <Image
            src={apartment.image.url || "/placeholder.svg"}
            alt={apartment.image.title || apartment.name}
            fill
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
        {apartment.availability !== undefined && (
          <div className="absolute top-2 right-2">
            <Badge className={apartment.availability ? "bg-green-500" : "bg-red-500"}>
              {apartment.availability ? "Available" : "Booked"}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{apartment.name}</h3>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          {apartment.size && <p>Size: {apartment.size}</p>}
          {apartment.price && <p className="font-semibold text-base">Price: {apartment.price}</p>}
          {apartment.location && (
            <p>
              Location:{" "}
              {address ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${apartment.location.lat},${apartment.location.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {address}
                  {city && ` (${city})`}
                </a>
              ) : (
                <span>
                  Loading address...
                </span>
              )}
            </p>
          )}
        </div>
        {apartment.availability && (
         <Button asChild className="w-full mt-4 hover:bg-blue-600">
          <Link href={`/book-now/`}>Book now</Link>
        </Button>
        )}
        {!apartment.availability && (
          <Button asChild className="w-full mt-4 bg-red-600" disabled>
            <span>Booked</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
