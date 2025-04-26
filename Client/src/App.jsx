<<<<<<< HEAD
=======
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Routing from "./Components/HomePage/Routing.jsx";
import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
import AddPage from "./Components/AdminPanel/AddPlacePage.jsx";
import AddDetails from "./Components/AdminPanel/AddDetails.jsx";
import ShowBookings from "./Components/AdminPanel/Placebooking.jsx";
import Reusable from "./Components/Secondpage/Reusable.jsx";
import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
import LoginPage from "./Components/Auth/Login.jsx";
import RegisterPage from "./Components/Auth/Register.jsx";
import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";
import AddCategory from "./Components/AdminPanel/Category.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Routing />} />
        {/* <Route path="/bouldering" element={<Bouldering />} /> */}
        <Route path="/places" element={<Reusable />} />
        <Route path="/reusabledetails/:id" element={<Reusabledetails />} /> 
        <Route path="/bookingform" element={<BookingFormPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        
        <Route
          path="/admin"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/page"
          element={
            // <ProtectedRoute>
              <AddPage />
            // </ProtectedRoute>
          }
        />
                <Route
          path="/add-category"
          element={
            // <ProtectedRoute>
              <AddCategory />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/add-details"
          element={
            // <ProtectedRoute>
              <AddDetails />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/show-bookings"
          element={
            // <ProtectedRoute>
              <ShowBookings />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

>>>>>>> 60657815cfff63cf412acd0b3b8187c03f2826aa
// import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Public Pages
// import Routing from "./Components/HomePage/Routing.jsx";
// import Reusable from "./Components/Secondpage/reusable.jsx";
// import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
// import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
// import Bouldering from "./Components/Bouldering/Bouldering.jsx";
// import AdminPanel from "./Components/AdminPanel/Addproduct.jsx";

// // Admin Authentication
// import LoginPage from "./Components/Auth/Login.jsx";
// import RegisterPage from "./Components/Auth/Register.jsx";
// import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";

// // Admin Panel Pages
// import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
// import AddPage from "./Components/AdminPanel/AddPlacePage.jsx";
// import AddDetails from "./Components/AdminPanel/AddDetails.jsx";
// import ShowBookings from "./Components/AdminPanel/Placebooking.jsx";
// import AddCategory from "./Components/AdminPanel/Category.jsx";
// import Location from "./Components/AdminPanel/Location.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* ✅ Public Routes */}
//         <Route path="/" element={<Routing />} />
//         <Route path="/places" element={<Reusable />} />
//         <Route path="/reusabledetails/:id" element={<Reusabledetails />} />
//         <Route path="/bookingform" element={<BookingFormPage />} />
//         <Route path="/bouldering" element={<Bouldering />} />

//         {/* ✅ Auth Routes */}
//         <Route path="/admin/login" element={<LoginPage />} />
//         <Route path="/admin/register" element={<RegisterPage />} />

//         {/* ✅ Protected Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/addproduct"
//           element={
//             <ProtectedRoute>
//               <AdminPanel />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-page"
//           element={
//             <ProtectedRoute>
//               <AddPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-details"
//           element={
//             <ProtectedRoute>
//               <AddDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-category"
//           element={
//             <ProtectedRoute>
//               <AddCategory />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/addlocation"
//           element={
//             <ProtectedRoute>
//               <Location />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/show-bookings"
//           element={
//             <ProtectedRoute>
//               <ShowBookings />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Routing from "./Components/HomePage/Routing.jsx";
import Reusable from "./Components/Secondpage/reusable.jsx";
import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
import Bouldering from "./Components/Bouldering/Bouldering.jsx";
import AdminPanel from "./Components/AdminPanel/Addproduct.jsx";
import ShowBooking from "./Components/AdminPanel/ShowBooking.jsx";
// Admin Authentication
import LoginPage from "./Components/Auth/Login.jsx";
import RegisterPage from "./Components/Auth/Register.jsx";
import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";

// Admin Panel Pages
import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
import AddPage from "./Components/AdminPanel/AddPlacePage.jsx";
import AddDetails from "./Components/AdminPanel/AddDetails.jsx";
import ShowBookings from "./Components/AdminPanel/Placebooking.jsx";
import AddCategory from "./Components/AdminPanel/Category.jsx";
import Location from "./Components/AdminPanel/Location.jsx";
import ProductBooking from "./Components/Bouldering/ProductBooking.jsx"
import Down from "./Components/HomePage/Down.jsx";
function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Routing />} />
        <Route path="/places" element={<Reusable />} />
        <Route path="/reusabledetails/:id" element={<Reusabledetails />} />
        <Route path="/bookingform" element={<BookingFormPage />} />
        <Route path="/bouldering" element={<Bouldering />} />

        {/* ✅ Auth Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />

        <Route path="/bookproduct" element={<ProductBooking />} />
        <Route path="/bookproduct/:id" element={<ProductBooking />} />

        <Route path="/down" element={<Down />} />

        

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/admin"
          element={
              <Dashboard />
          }
        />
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route
          path="/addproduct"
          element={
              <AdminPanel />
          }
        />
               <Route
          path="/productbooking"
          element={
              <ShowBooking />
          }
        />
        <Route
          path="/page"
          element={
              <AddPage />
          }
        />
        <Route
          path="/add-details"
          element={
              <AddDetails />
          }
        />
        <Route
          path="/add-category"
          element={
              <AddCategory />
          }
        />
        <Route
          path="/addlocation"
          element={
              <Location />
          }
        />
        <Route
          path="/show-bookings"
          element={
              <ShowBookings />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
