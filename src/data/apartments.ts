import { Apartment } from '../types/apartment'

let nextId = 9; // Start after the last existing apartment ID

export const apartments: Apartment[] = [
  {
    id: 1,
    title: 'Apartamento Moderno Centro',
    price: 1200,
    rooms: 2,
    capacity: 4,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hermoso apartamento moderno ubicado en el centro de la ciudad. Cuenta con acabados de lujo, cocina equipada y excelente iluminación natural.'
  },
  {
    id: 2,
    title: 'Ático con Vista Panorámica',
    price: 1500,
    rooms: 3,
    capacity: 6,
    status: 'reserved',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Espectacular ático con vistas panorámicas de la ciudad. Terraza privada, amplios espacios y acabados premium.'
  },
  {
    id: 3,
    title: 'Apartamento Familiar',
    price: 900,
    rooms: 2,
    capacity: 4,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfecto para familias, ubicado en zona residencial tranquila. Cerca de parques y colegios.'
  },
  {
    id: 4,
    title: 'Estudio Ejecutivo',
    price: 800,
    rooms: 1,
    capacity: 2,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Estudio moderno ideal para profesionales. Ubicación céntrica, cerca de zonas comerciales y transporte público.'
  },
  {
    id: 5,
    title: 'Loft Industrial',
    price: 1100,
    rooms: 1,
    capacity: 3,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Espacioso loft de estilo industrial con techos altos, ventanales y acabados en ladrillo visto. Perfecto para creativos.'
  },
  {
    id: 6,
    title: 'Apartamento con Jardín',
    price: 1300,
    rooms: 2,
    capacity: 4,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hermoso apartamento en planta baja con jardín privado. Ideal para amantes de la naturaleza y mascotas.'
  },
  {
    id: 7,
    title: 'Ático Dúplex',
    price: 1800,
    rooms: 4,
    capacity: 8,
    status: 'reserved',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Espectacular ático dúplex con terraza panorámica, sala de estar a doble altura y acabados de lujo.'
  },
  {
    id: 8,
    title: 'Estudio Minimalista',
    price: 750,
    rooms: 1,
    capacity: 2,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Moderno estudio con diseño minimalista, perfectamente optimizado para maximizar el espacio.'
  }
]

export function addApartment(apartment: Omit<Apartment, 'id' | 'status'>): Apartment {
  const newApartment: Apartment = {
    ...apartment,
    id: nextId++,
    status: 'available'
  }
  apartments.push(newApartment)
  return newApartment
}