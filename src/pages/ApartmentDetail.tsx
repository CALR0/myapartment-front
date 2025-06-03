import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, BanknoteIcon, Bed, Users } from 'lucide-react'
import { apartments } from '../data/apartments'

export function ApartmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apartment = apartments.find(a => a.id === Number(id))
  const [currentImage, setCurrentImage] = useState(0)

  if (!apartment) {
    return <div>Apartamento no encontrado</div>
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % apartment.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + apartment.images.length) % apartment.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a la lista
        </button>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-96 group">
            <img 
              src={apartment.images[currentImage]}
              alt={apartment.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {apartment.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentImage === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                apartment.status === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {apartment.status === 'available' ? 'Disponible' : 'Reservado'}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{apartment.title}</h1>
            <p className="text-gray-600 text-lg mb-8">{apartment.description}</p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <BanknoteIcon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">Precio</p>
                <p className="text-xl font-semibold">${apartment.price}/mes</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Bed className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">Habitaciones</p>
                <p className="text-xl font-semibold">{apartment.rooms}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600">Capacidad</p>
                <p className="text-xl font-semibold">{apartment.capacity} personas</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => navigate(`/apartment/${id}/reserve`)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-lg ${
                  apartment.status === 'available'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={apartment.status === 'reserved'}
              >
                Reservar
              </button>
              <button 
                onClick={() => navigate(`/apartment/${id}/edit`)}
                className="flex-1 py-3 px-6 rounded-lg font-medium text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}