import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `px-4 py-3 rounded hover:bg-blue-700 transition ${
      isActive ? 'bg-blue-800 text-white' : 'text-gray-200'
    }`;

  return (
    <aside className="w-64 bg-blue-900 text-white h-screen p-6 space-y-8 fixed top-0 left-0">
      <div className="text-3xl font-extrabold tracking-wide">🌍 Travel Admin</div>
      <nav className="flex flex-col space-y-3">
        <NavLink to="/dashboard" className={linkStyle}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/add-page" className={linkStyle}>
          ➕ Add Page
        </NavLink>
        <NavLink to="/add-details" className={linkStyle}>
          📝 Add Details
        </NavLink>
        <NavLink to="/show-bookings" className={linkStyle}>
          📚 Show Bookings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
