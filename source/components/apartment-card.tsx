import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ApartmentCard as ApartmentCardType } from "@/lib/contentful"

interface ApartmentCardProps {
  apartment: ApartmentCardType
  priority?: boolean
}

export function ApartmentCard({ apartment, priority = false }: ApartmentCardProps) {
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
              Location: {apartment.location.lat.toFixed(6)}, {apartment.location.lon.toFixed(6)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
