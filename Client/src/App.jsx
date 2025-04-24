import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Routing from "./Components/HomePage/Routing.jsx";
import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
import AddPage from "./Components/AdminPanel/AddPlacePage.jsx";
import AddDetails from "./Components/AdminPanel/AddDetails.jsx";
import ShowBookings from "./Components/AdminPanel/Placebooking.jsx";
import Reusable from "./Components/Secondpage/reusable.jsx";
import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
import LoginPage from "./Components/Auth/Login.jsx";
import RegisterPage from "./Components/Auth/Register.jsx";
import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Routing />} />
        {/* <Route path="/bouldering" element={<Bouldering />} /> */}
        <Route path="/places" element={<Reusable />} />
        <Route path="/reusabledetails" element={<Reusabledetails />} />
        <Route path="/bookingform" element={<BookingFormPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-page"
          element={
            <ProtectedRoute>
              <AddPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-details"
          element={
            <ProtectedRoute>
              <AddDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/show-bookings"
          element={
            <ProtectedRoute>
              <ShowBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
