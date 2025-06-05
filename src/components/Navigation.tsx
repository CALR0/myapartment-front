import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserCircle, LogOut } from 'lucide-react'
import '../styles/components/Navigation.css'

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
    setIsUserMenuOpen(false)
  }

  const activeTab = getActiveTab()

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white fixed w-full top-0 z-50 shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold tracking-tight hover:text-blue-100 transition-colors duration-200">
            My Apartment App
          </Link>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => handleTabClick('inicio')}
                className={`nav-tab ${activeTab === 'inicio' ? 'nav-tab-active' : ''}`}
              >
                INICIO
              </button>
              <button
                onClick={() => handleTabClick('reservas')}
                className={`nav-tab ${activeTab === 'reservas' ? 'nav-tab-active' : ''}`}
              >
                RESERVAS
              </button>
              <button
                onClick={() => handleTabClick('añadir')}
                className={`nav-tab ${activeTab === 'añadir' ? 'nav-tab-active' : ''}`}
              >
                AÑADIR APARTAMENTO
              </button>
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-button"
              >
                <UserCircle className="h-7 w-7" />
              </button>

              {isUserMenuOpen && (
                <div className="user-menu">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Usuario</p>
                    <p className="text-sm text-gray-500">usuario@example.com</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="user-menu-item"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}