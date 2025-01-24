export interface Property {
  id: string
  name: string
  location: string
  size: string
  price: number
  rating: number
  features: string[]
  image: string
  dateRange?: string
  breakfast?: boolean
  wifi?: boolean
  parking?: boolean
  seaView?: boolean
}

export interface PropertyType {
  title: string
  image: string
}

