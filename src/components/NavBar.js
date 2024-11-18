import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../SOLO_LOGO.png';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'home' ? '/' : `/${tab}`);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Botón de menú móvil */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-9 w-auto"
                src={logo}
                alt="Quantify"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleTabClick('home')}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === 'home' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleTabClick('dashboard')}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleTabClick('savingsPlan')}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === 'savingPlan' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Planes
                </button>
                <button
                  onClick={() => handleTabClick('calendar')}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === 'calendar' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Menú de usuario */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => navigate('/signup')}
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Sign Up
              </button>
              <button
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => navigate('/login')}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil, mostrar/ocultar basado en el estado */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <button onClick={() => handleTabClick('dashboard')} className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Dashboard</button>
            <button onClick={() => handleTabClick('projects')} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</button>
            <button onClick={() => handleTabClick('calendar')} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</button>
            <button onClick={() => navigate('/signup')} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Sign Up</button>
            <button onClick={() => navigate('/login')} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
