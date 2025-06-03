import React, { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import '../styles/components/SearchBar.css'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: FilterState
  setFilters: (filters: FilterState) => void
}

export interface FilterState {
  minPrice: string
  maxPrice: string
  capacity: string
  rooms: string
  status: {
    available: boolean
    reserved: boolean
  }
}

export function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  searchQuery,
  setSearchQuery,
  filters, 
  setFilters 
}: SearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleStatusChange = (status: 'available' | 'reserved') => {
    setFilters({
      ...filters,
      status: {
        ...filters.status,
        [status]: !filters.status[status]
      }
    })
  }

  const handleNumberInput = (field: 'minPrice' | 'maxPrice' | 'capacity' | 'rooms', value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setFilters({
        ...filters,
        [field]: value
      })
    }
  }

  const handleSearch = () => {
    setSearchQuery(searchTerm)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="search-input-container">
        <div className="flex-1 flex items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por título o descripción"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
          </div>
          <div className="h-8 w-[1px] bg-gray-200 mx-4"></div>
          <div className="w-48">
            <input
              type="text"
              placeholder="¿Cuántas personas?"
              className="search-input text-right"
              value={filters.capacity}
              onChange={(e) => handleNumberInput('capacity', e.target.value)}
            />
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>
          <Search className="h-5 w-5" />
        </button>
        <div className="relative">
          <button 
            className="filter-button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          <div className={`filter-dropdown ${isFilterOpen ? 'open' : ''}`}>
            <div className="filter-section">
              <h3 className="filter-section-title">Rango de Precio</h3>
              <div className="flex gap-2 px-4 py-2">
                <input
                  type="text"
                  placeholder="Min"
                  className="price-input"
                  value={filters.minPrice}
                  onChange={(e) => handleNumberInput('minPrice', e.target.value)}
                />
                <span className="text-gray-400">-</span>
                <input
                  type="text"
                  placeholder="Max"
                  className="price-input"
                  value={filters.maxPrice}
                  onChange={(e) => handleNumberInput('maxPrice', e.target.value)}
                />
              </div>
            </div>
            
            <div className="filter-section">
              <h3 className="filter-section-title">Habitaciones</h3>
              <div className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Número de habitaciones"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  value={filters.rooms}
                  onChange={(e) => handleNumberInput('rooms', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-section-title">Estado</h3>
              <div className="px-4 py-2 space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status.available}
                    onChange={() => handleStatusChange('available')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Disponible</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.status.reserved}
                    onChange={() => handleStatusChange('reserved')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Reservado</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}