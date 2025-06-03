import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  images: string[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-48 group">
      <img 
        src={images[currentImage]} 
        alt="Apartment"
        className="w-full h-full object-cover transition-opacity duration-500"
      />
      <button 
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              currentImage === index ? 'bg-white w-3' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}