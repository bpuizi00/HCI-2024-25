"use client";

import { useState } from 'react'
import { CalendarIcon, Users, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export function HeroSection() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(1)
  const [location, setLocation] = useState('')

  return (
    <div className="relative h-[700px] md:h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://feriehome.com/storage/app/uploads/public/5eb/181/604/5eb181604475b931612629.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-9 pt-20 px-6">
        <h1 className="text-5xl font-bold text-white mb-12">
          Dalmatian Holiday Villas
        </h1>
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">WHERE</label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    placeholder="Enter location"
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkIn" className="text-sm font-medium">CHECK-IN</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {checkIn ? format(checkIn, 'PPP') : 'Select Date'}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkOut" className="text-sm font-medium">CHECK-OUT</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {checkOut ? format(checkOut, 'PPP') : 'Select Date'}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="guests" className="text-sm font-medium">GUESTS</label>
                  <input
                    id="guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md"
                    min="1"
                  />
                </div>
              </div>
              <Button className="w-full md:w-auto mt-4 md:mt-0">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

