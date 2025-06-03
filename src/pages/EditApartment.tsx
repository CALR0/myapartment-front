import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Plus, Minus, BanknoteIcon, Bed, Users, Trash2 } from 'lucide-react'
import { apartments } from '../data/apartments'

export function EditApartment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apartment = apartments.find(a => a.id === Number(id))
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  
  const [formData, setFormData] = useState({
    title: apartment?.title || '',
    price: apartment?.price.toString() || '',
    rooms: apartment?.rooms.toString() || '',
    capacity: apartment?.capacity.toString() || '',
    description: apartment?.description || ''
  })
  
  const [images, setImages] = useState<string[]>(apartment?.images || [])

  if (!apartment) {
    return <div>Apartamento no encontrado</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageAdd = () => {
    setImages(prev => [...prev, ''])
  }

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleImageChange = (index: number, value: string) => {
    setImages(prev => prev.map((img, i) => i === index ? value : img))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSaveModal(true)
  }

  const confirmSubmit = () => {
    const index = apartments.findIndex(a => a.id === apartment.id)
    if (index !== -1) {
      apartments[index] = {
        ...apartment,
        title: formData.title,
        price: parseInt(formData.price),
        rooms: parseInt(formData.rooms),
        capacity: parseInt(formData.capacity),
        description: formData.description,
        images: images
      }
    }

    navigate(`/apartment/${id}`)
  }

  const handleDelete = () => {
    const index = apartments.findIndex(a => a.id === apartment.id)
    if (index !== -1) {
      apartments.splice(index, 1)
    }
    navigate('/')
  }

  const handleCancel = () => {
    const hasChanges = 
      formData.title !== apartment.title ||
      formData.price !== apartment.price.toString() ||
      formData.rooms !== apartment.rooms.toString() ||
      formData.capacity !== apartment.capacity.toString() ||
      formData.description !== apartment.description ||
      JSON.stringify(images) !== JSON.stringify(apartment.images)

    if (hasChanges) {
      setShowCancelModal(true)
    } else {
      navigate(`/apartment/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={handleCancel}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al apartamento
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 transition-colors duration-300"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Eliminar
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Editando apartamento</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium">Título</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 border px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ej: Apartamento Moderno Centro"
                  required
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">Precio/mes</span>
                  <div className="mt-1 relative">
                    <BanknoteIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-gray-200 border pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="1200"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Habitaciones</span>
                  <div className="mt-1 relative">
                    <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-gray-200 border pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="2"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Capacidad</span>
                  <div className="mt-1 relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-gray-200 border pl-10 pr-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="4"
                      required
                    />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="text-gray-700 font-medium">Descripción</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-200 border px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe el apartamento..."
                  required
                />
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Imágenes</span>
                  <button
                    type="button"
                    onClick={handleImageAdd}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Añadir imagen
                  </button>
                </div>
                <div className="space-y-2">
                  {images.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1 rounded-lg border-gray-200 border px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="URL de la imagen"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="p-3 text-red-600 hover:text-red-800 transition-colors duration-300"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
                {images.length === 0 && (
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Añade al menos una imagen del apartamento</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 px-6 rounded-lg font-medium text-lg border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-lg font-medium text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-md w-full transform transition-transform duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-900 mb-4">¿Eliminar apartamento?</h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este apartamento?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Changes Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-md w-full transform transition-transform duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Guardar cambios</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas guardar los cambios realizados en este apartamento?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmSubmit}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Sí, guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Changes Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-md w-full transform transition-transform duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Descartar cambios</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas salir? Se perderán todos los cambios realizados.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
              >
                Volver
              </button>
              <button
                onClick={() => navigate(`/apartment/${id}`)}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
              >
                Sí, descartar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}