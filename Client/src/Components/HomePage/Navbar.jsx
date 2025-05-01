import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // You can install this: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'User Dashboard', path: '/userlogin' },
    { name: 'Admin Dashboard', path: '/admin/login' },
    { name: 'Bouldering', path: '/bouldering' },
  ];

  return (
    <nav className="bg-white/30 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-3xl font-extrabold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
            aria-label="Go to home"
          >
            Nexus
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-10 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-300 hover:text-blue-600 ${
                      isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : 'text-gray-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-800 hover:text-blue-600 transition"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col mt-6 space-y-6 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-semibold transition-colors duration-300 hover:text-blue-600 ${
                      isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : 'text-gray-800'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
