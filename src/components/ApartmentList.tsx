import React from 'react'
import { BanknoteIcon, Bed, Users } from 'lucide-react'
import { ImageCarousel } from './ImageCarousel'
import type { Apartment } from '../types/apartment'

interface ApartmentListProps {
  apartments: Apartment[]
  navigate: (path: string) => void
}

export function ApartmentList({ apartments, navigate }: ApartmentListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apartments.map((apartment) => (
        <div 
          key={apartment.id} 
          className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <ImageCarousel images={apartment.images} />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              apartment.status === 'available' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {apartment.status === 'available' ? 'Disponible' : 'Reservado'}
            </span>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{apartment.title}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <BanknoteIcon className="h-5 w-5 mr-2" />
                <span>${apartment.price}/mes</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Bed className="h-5 w-5 mr-2" />
                <span>{apartment.rooms} Habitaciones</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Users className="h-5 w-5 mr-2" />
                <span>Capacidad: {apartment.capacity} personas</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/apartment/${apartment.id}`)}
              className="mt-4 w-full py-2 px-4 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              Ver
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}