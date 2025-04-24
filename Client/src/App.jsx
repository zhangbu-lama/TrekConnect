
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Routing from './Components/HomePage/Routing.jsx';
import Dashboard from './Components/AdminPanel/Dashboard.jsx';
import AddPage from './Components/AdminPanel/AddPlacePage.jsx';
import AddDetails from './Components/AdminPanel/AddDetails.jsx';
import ShowBookings from './Components/AdminPanel/Placebooking.jsx';
function App() {

  return (
    <>
        <Router>
        <Routes>
          <Route path="/" element={<Routing />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/dashboard" element={< Dashboard/>} />
        <Route path="/add-page" element={<AddPage />} />
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/show-bookings" element={<ShowBookings />} />

        </Routes>
        </Router>
    </>
  )
}

export default App
