import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { ApartmentDetail } from './pages/ApartmentDetail'
import { AddApartment } from './pages/AddApartment'
import { EditApartment } from './pages/EditApartment'
import { CreateReservation } from './pages/CreateReservation'
import { apartments } from './data/apartments'
import type { FilterState } from './components/SearchBar'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const [filters, setFilters] = useState<FilterState>({
    minPrice: '',
    maxPrice: '',
    capacity: '',
    rooms: '',
    status: {
      available: false,
      reserved: false
    }
  })

  const filteredApartments = apartments.filter(apartment => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      apartment.title.toLowerCase().includes(searchLower) ||
      apartment.description.toLowerCase().includes(searchLower) ||
      apartment.price.toString().includes(searchLower) ||
      apartment.rooms.toString().includes(searchLower) ||
      apartment.capacity.toString().includes(searchLower) ||
      apartment.status.includes(searchLower)

    // Price filter
    const matchesPrice = 
      (!filters.minPrice || apartment.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || apartment.price <= parseInt(filters.maxPrice))

    // Capacity filter
    const matchesCapacity = !filters.capacity || apartment.capacity >= parseInt(filters.capacity)

    // Rooms filter
    const matchesRooms = !filters.rooms || apartment.rooms === parseInt(filters.rooms)

    // Status filter
    const matchesStatus = 
      (!filters.status.available && !filters.status.reserved) || // If none selected, show all
      (filters.status.available && apartment.status === 'available') ||
      (filters.status.reserved && apartment.status === 'reserved')

    return matchesSearch && matchesPrice && matchesCapacity && matchesRooms && matchesStatus
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
              filteredApartments={filteredApartments}
              navigate={navigate}
            />
          } 
        />
        <Route path="/apartment/:id" element={<ApartmentDetail />} />
        <Route path="/apartment/:id/edit" element={<EditApartment />} />
        <Route path="/apartment/:id/reserve" element={<CreateReservation />} />
        <Route path="/createApartment" element={<AddApartment />} />
      </Routes>
    </div>
  )
}

export default App