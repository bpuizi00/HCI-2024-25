"use client"
import { useState, useMemo } from "react"
import { ApartmentsFilter } from "./apartments-filter"
import { ApartmentCard } from "./apartment-card"

export function ApartmentsFilterClient({ apartments }: { apartments: any[] }) {
  const [filter, setFilter] = useState<{ text: string; available: boolean }>({ text: "", available: false })

    const filteredApartments = useMemo(() => {
    let filtered = apartments
    if (filter.text) {
        filtered = filtered.filter((apt) =>
        apt.name?.toLowerCase().includes(filter.text.toLowerCase())
        )
    }
    if (filter.available) {
        filtered = filtered.filter((apt) => apt.availability === true)
    }
    return filtered
    }, [filter, apartments])

  return (
    <>
      <ApartmentsFilter onApply={setFilter} />
      {filteredApartments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No apartments found to display.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApartments.map((apartment, index) => (
            <ApartmentCard key={apartment.sys.id} apartment={apartment} priority={index === 0} />
          ))}
        </div>
      )}
    </>
  )
}