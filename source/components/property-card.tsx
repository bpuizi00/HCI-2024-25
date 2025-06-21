"use client"
import { Property } from "@/types/property"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        {/* Rating badge in top-right */}
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1">
          <span className="text-blue-500 font-bold">{property.rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{property.name}</h3>
        <p className="text-sm text-gray-600">{property.location}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">• {property.size}</p>
          {property.wifi && <p className="text-sm">• Wi-Fi available</p>}
          {property.parking && <p className="text-sm">• Parking available</p>}
          {property.breakfast && <p className="text-sm">• Breakfast included</p>}
          {property.seaView && <p className="text-sm">• Sea-view</p>}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">${property.price}</p>
          <p className="text-sm text-gray-600">includes taxes and fees</p>
          {property.dateRange && (
            <p className="text-sm text-gray-600">{property.dateRange}</p>
          )}
        </div>
        <Link href={`/book-now/`}>
          <Button
            asChild
            className="w-full mt-4 bg-black text-white hover:bg-blue-600"
            >
            <span>Book now</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

