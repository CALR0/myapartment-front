export interface Apartment {
  id: number
  title: string
  price: number
  rooms: number
  capacity: number
  status: 'available' | 'reserved'
  images: string[]
  description: string
}