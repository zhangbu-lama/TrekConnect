// // App.jsx
// import "./App.css";
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Public Pages
// import Routing from "./Components/HomePage/Routing.jsx";
// import Reusable from "./Components/Secondpage/Reusable.jsx";
// import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
// import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
// import Bouldering from "./Components/Bouldering/Bouldering.jsx";
// import Down from "./Components/HomePage/Down.jsx";

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
// import AdminPanel from "./Components/AdminPanel/Addproduct.jsx";
// import ShowBooking from "./Components/AdminPanel/ShowBooking.jsx";
// import ProductBooking from "./Components/Bouldering/ProductBooking.jsx";

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
//         <Route path="/bookproduct" element={<ProductBooking />} />
//         <Route path="/bookproduct/:id" element={<ProductBooking />} />
//         <Route path="/down" element={<Down />} />

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
//           path="/productbooking"
//           element={
//             <ProtectedRoute>
//               <ShowBooking />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/page"
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


// App.jsx
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Routing from "./Components/HomePage/Routing.jsx";
import Reusable from "./Components/Secondpage/Reusable.jsx";
import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
import Bouldering from "./Components/Bouldering/Bouldering.jsx";
import Down from "./Components/HomePage/Down.jsx";

// Admin Authentication
import LoginPage from "./Components/Auth/Login.jsx";
import RegisterPage from "./Components/Auth/Register.jsx";

// Admin Panel Pages (No ProtectedRoute)
import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
import AddPage from "./Components/AdminPanel/AddPlacePage.jsx";
import AddDetails from "./Components/AdminPanel/AddDetails.jsx";
import ShowBookings from "./Components/AdminPanel/Placebooking.jsx";
import AddCategory from "./Components/AdminPanel/Category.jsx";
import Location from "./Components/AdminPanel/Location.jsx";
import AdminPanel from "./Components/AdminPanel/Addproduct.jsx";
import ShowBooking from "./Components/AdminPanel/ShowBooking.jsx";
import ProductBooking from "./Components/Bouldering/ProductBooking.jsx";
import UserLayout from "./Components/UserDashboard/UserLayout.jsx";
import UserSidebar from "./Components/UserDashboard/UserSidebar.jsx";
import Placebook from "./Components/UserDashboard/placebook.jsx";
import Productbooked from "./Components/UserDashboard/Productbooked.jsx";
import UserLoginPage from "./Components/UserDashboard/Userlogin.jsx";
import UserRegisterPage from "./Components/UserDashboard/UserRegister.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Routing />} />
        <Route path="/places" element={<Reusable />} />
        <Route path="/reusabledetails/:id" element={<Reusabledetails />} />
        <Route path="/bookingform" element={<BookingFormPage />} />
        <Route path="/bouldering" element={<Bouldering />} />
        <Route path="/bookproduct" element={<ProductBooking />} />
        <Route path="/bookproduct/:id" element={<ProductBooking />} />
        <Route path="/down" element={<Down />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/register" element={<RegisterPage />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AdminPanel />} />
        <Route path="/productbooking" element={<ShowBooking />} />
        <Route path="/page" element={<AddPage />} />
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/addlocation" element={<Location />} />
        <Route path="/show-bookings" element={<ShowBookings />} />

        <Route path="/placebooked" element={<Placebook />} />
        <Route path="/productbooked" element={<Productbooked />} />



        <Route path='/user' element={<UserSidebar />} />
        <Route path='/userlayout' element={<UserLayout />} />

        <Route path='/userlogin' element={<UserLoginPage />} />
        <Route path='/userregister' element={<UserRegisterPage />} />

        {/* Protected Routes */}
      </Routes>
    </Router>
  );
  
}

export default App;
