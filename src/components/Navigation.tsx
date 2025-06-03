import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserCircle } from 'lucide-react'
import '../styles/components/Navigation.css'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const getActiveTab = () => {
    if (location.pathname === '/') return 'inicio'
    if (location.pathname === '/createApartment') return 'añadir'
    if (location.pathname.includes('/reservas')) return 'reservas'
    return ''
  }

  const handleTabClick = (tab: string) => {
    if (tab === 'inicio') {
      navigate('/')
    } else if (tab === 'añadir') {
      navigate('/createApartment')
    } else if (tab === 'reservas') {
      navigate('/reservas')
    }
  }

  const activeTab = getActiveTab()

  return (
    <nav className="bg-blue-600 text-white h-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          <Link to="/" className="text-lg font-medium">My Apartment App</Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button
                onClick={() => handleTabClick('inicio')}
                className={`nav-link font-semibold ${activeTab === 'inicio' ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                INICIO
              </button>
              <span className="nav-separator mx-2">|</span>
              <button
                onClick={() => handleTabClick('reservas')}
                className={`nav-link font-semibold ${activeTab === 'reservas' ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                RESERVAS
              </button>
              <span className="nav-separator mx-2">|</span>
              <button
                onClick={() => handleTabClick('añadir')}
                className={`nav-link font-semibold ${activeTab === 'añadir' ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                AÑADIR APARTAMENTO
              </button>
              <div className="ml-4">
                <UserCircle className="h-6 w-6 text-white hover:text-blue-100 transition-colors duration-200 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}