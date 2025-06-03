import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BanknoteIcon, Bed, Users, Calendar } from 'lucide-react'
import { apartments } from '../data/apartments'

export function CreateReservation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apartment = apartments.find(a => a.id === Number(id))
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  })

  if (!apartment) {
    return <div>Apartamento no encontrado</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleConfirm = () => {
    // Here you would typically save the reservation to your backend
    const reservation = {
      apartmentId: apartment.id,
      startDate: formData.startDate,
      endDate: formData.endDate
    }
    console.log('Reservation created:', reservation)
    
    // Update apartment status
    const index = apartments.findIndex(a => a.id === apartment.id)
    if (index !== -1) {
      apartments[index] = {
        ...apartment,
        status: 'reserved'
      }
    }
    
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button 
          onClick={() => navigate(`/apartment/${id}`)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al apartamento
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Crear reserva</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Apartment Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Detalles del apartamento</h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{apartment.title}</h3>
                  <p className="text-gray-600 mb-6">{apartment.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <BanknoteIcon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-600">Precio</p>
                      <p className="font-semibold">${apartment.price}/mes</p>
                    </div>
                    <div className="text-center">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-600">Habitaciones</p>
                      <p className="font-semibold">{apartment.rooms}</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-600">Capacidad</p>
                      <p className="font-semibold">{apartment.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reservation Form */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Fechas de reserva</h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-700 font-medium">Fecha de inicio</span>
                      <div className="mt-1 relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border-gray-200 border pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-gray-700 font-medium">Fecha de fin</span>
                      <div className="mt-1 relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border-gray-200 border pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full py-3 px-6 rounded-lg font-medium text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-md w-full transform transition-transform duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar reserva</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas realizar esta reserva? Una vez confirmada, el apartamento quedará reservado.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Sí, confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}