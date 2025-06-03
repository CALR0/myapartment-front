import React from 'react'
import { SearchBar } from '../components/SearchBar'
import { PageTitle } from '../components/PageTitle'
import { ApartmentList } from '../components/ApartmentList'
import type { Apartment } from '../types/apartment'
import type { FilterState } from '../components/SearchBar'

interface HomePageProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: FilterState
  setFilters: (filters: FilterState) => void
  filteredApartments: Apartment[]
  navigate: (path: string) => void
}

export function HomePage({ 
  searchTerm, 
  setSearchTerm,
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  filteredApartments, 
  navigate 
}: HomePageProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-12">
      <PageTitle />
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ApartmentList apartments={filteredApartments} navigate={navigate} />
      </main>
    </div>
  )
}