// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, Calendar, Clock, MapPin, Mountain, Star, Thermometer, Phone, Mail } from "lucide-react";
// import { Link, useParams } from "react-router-dom";

// // Mock data (replace with API call in production)
// const trekkingSpots = [
//   {
//     id: 1,
//     name: "Annapurna Circuit",
//     difficulty: "Medium",
//     duration: "12-18 days",
//     overview:
//       "The Annapurna Circuit is one of Nepal's most iconic treks, offering a journey through diverse landscapes from lush subtropical forests to high alpine environments. Cross the challenging Thorong La Pass and immerse in the rich cultural heritage of local communities.",
//     maxElevation: "5,416m (Thorong La Pass)",
//     highlights: [
//       { image: "https://via.placeholder.com/600/400?text=Thorong+La+Pass", alt: "Thorong La Pass" },
//       { image: "https://via.placeholder.com/600/400?text=Poon+Hill", alt: "Poon Hill" },
//       { image: "https://via.placeholder.com/600/400?text=Hot+Springs", alt: "Hot Springs at Tatopani" },
//       { image: "https://via.placeholder.com/600/400?text=Manang+Valley", alt: "Manang Valley" },
//     ],
//     bestSeason: "October to November",
//     contactNumber: "+1 (555) 123-4567",
//     contactEmail: "info@trekkingadventures.com",
//     rating: 4.8,
//     reviews: 124,
//   },
// ];

// // Utility function to fetch trek data
// const getTrekkingData = (id) => {
//   return trekkingSpots.find((spot) => spot.id === Number(id)) || trekkingSpots[0];
// };

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2, duration: 0.5 },
//   },
// };

// const childVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// // Highlight Image component
// const HighlightImage = ({ image, alt }) => (
//   <motion.div
//     className="relative h-48 rounded-lg overflow-hidden shadow-md"
//     whileHover={{ scale: 1.05 }}
//     transition={{ duration: 0.3 }}
//   >
//     <img src={image} alt={alt} className="object-cover w-full h-full" />
//     <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm text-center">{alt}</div>
//   </motion.div>
// );

// export default function TrekDetails() {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState("overview");
//   const trek = getTrekkingData(id);

//   const handleTabChange = (tab) => setActiveTab(tab);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 font-sans">
//       {/* Enhanced Hero Section with animated background elements */}
//       <motion.div
//         className="relative h-[50vh] md:h-[70vh] w-full"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <img
//           src={trek.highlights[0].image}
//           alt={trek.name}
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
//           {/* Animated background elements */}
//           <div className="absolute top-10 left-[10%] w-32 h-16 bg-white/10 rounded-full blur-xl"></div>
//           <div className="absolute top-20 left-[25%] w-48 h-20 bg-white/10 rounded-full blur-xl"></div>
//           <div className="absolute top-5 right-[15%] w-40 h-16 bg-white/10 rounded-full blur-xl"></div>
//         </div>

//         <div className="absolute top-6 left-6 z-10">
//           <Link
//             to="/reusable"
//             className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all transform hover:scale-105"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>Back to Treks</span>
//           </Link>
//         </div>

//         <motion.div 
//           className="absolute bottom-0 left-0 w-full p-6 md:p-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="max-w-7xl mx-auto">
//             <motion.div
//               className="flex items-center gap-2 mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-5 w-5 ${
//                       i < Math.floor(trek.rating)
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-white font-medium">
//                 {trek.rating} ({trek.reviews} reviews)
//               </span>
//             </motion.div>
//             <motion.h1
//               className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               {trek.name}
//             </motion.h1>
//             <motion.div 
//               className="flex flex-wrap gap-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-emerald-500/30">
//                 <Clock className="h-4 w-4" />
//                 <span>{trek.duration}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-sky-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-sky-500/30">
//                 <Mountain className="h-4 w-4" />
//                 <span>{trek.maxElevation}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-purple-500/30">
//                 <Thermometer className="h-4 w-4" />
//                 <span>{trek.bestSeason}</span>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Enhanced Main Content with new styling */}
//       <main className="max-w-7xl mx-auto px-4 py-12">
//         <motion.div
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2">
//             {/* Enhanced Tabs */}
//             <div className="mb-12">
//               <div className="grid w-full grid-cols-2 border-b sticky top-0 bg-white/90 backdrop-blur-sm z-10 rounded-t-lg shadow-sm">
//                 {["overview", "gallery"].map((tab) => (
//                   <button
//                     key={tab}
//                     className={`py-3 px-4 text-center relative transition-all ${
//                       activeTab === tab
//                         ? "text-sky-600 font-medium"
//                         : "text-gray-500 hover:text-sky-600"
//                     }`}
//                     onClick={() => handleTabChange(tab)}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     {activeTab === tab && (
//                       <motion.div
//                         className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600"
//                         layoutId="activeTab"
//                       />
//                     )}
//                   </button>
//                 ))}
//               </div>

//               <AnimatePresence mode="wait">
//                 {/* Overview Tab */}
//                 {activeTab === "overview" && (
//                   <motion.div
//                     key="overview"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-6"
//                   >
//                     <div className="bg-white rounded-xl p-6 shadow-md">
//                       <h2 className="text-2xl font-bold text-primary mb-4">Trek Overview</h2>
//                       <p className="text-gray-700 mb-6 leading-relaxed">{trek.overview}</p>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         <div className="bg-sky-50 p-4 rounded-lg">
//                           <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
//                             <MapPin className="h-5 w-5 text-accent" />
//                             Trek Details
//                           </h3>
//                           <ul className="space-y-2 text-gray-700">
//                             <li className="flex justify-between">
//                               <span>Difficulty:</span>
//                               <span className="font-medium">{trek.difficulty}</span>
//                             </li>
//                             <li className="flex justify-between">
//                               <span>Max Elevation:</span>
//                               <span className="font-medium">{trek.maxElevation}</span>
//                             </li>
//                             <li className="flex justify-between">
//                               <span>Best Season:</span>
//                               <span className="font-medium">{trek.bestSeason}</span>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Gallery Tab */}
//                 {activeTab === "gallery" && (
//                   <motion.div
//                     key="gallery"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-6"
//                   >
//                     <div className="bg-white rounded-xl p-6 shadow-md">
//                       <h2 className="text-2xl font-bold text-primary mb-6">Trek Gallery</h2>
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         {trek.highlights.map((highlight, index) => (
//                           <HighlightImage key={index} image={highlight.image} alt={highlight.alt} />
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Enhanced Right Column - Contact Card */}
//           <motion.div 
//             className="lg:col-span-1"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.7 }}
//           >
//             <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl p-6 shadow-lg sticky top-6 border border-sky-100">
//               <h3 className="text-xl font-bold text-sky-800 mb-4">Contact Us</h3>
//               <div className="space-y-4 mb-6">
//                 <motion.div 
//                   className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Phone className="h-5 w-5 text-emerald-500" />
//                   <span className="text-gray-700">{trek.contactNumber}</span>
//                 </motion.div>
//                 <motion.div 
//                   className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <Mail className="h-5 w-5 text-emerald-500" />
//                   <span className="text-gray-700">{trek.contactEmail}</span>
//                 </motion.div>
//               </div>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Link
//                   to="/bookingform"
//                   className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-lg shadow-md inline-block text-center transition-all"
//                 >
//                   Book Now
//                 </Link>
//               </motion.div>
//               <div className="mt-6 text-center">
//                 <p className="text-gray-500 text-sm">Need help planning your trip?</p>
//                 <Link 
//                   to="/contact" 
//                   className="text-sky-600 font-medium text-sm hover:text-sky-700 transition-colors"
//                 >
//                   Contact our travel experts
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* Why Trek Section */}
//       <section className="bg-gradient-to-r from-sky-100 to-emerald-50 rounded-xl shadow-lg p-8 mb-16 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-sky-800 mb-6">Why Trek in Nepal?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             {
//               icon: <Mountain className="h-8 w-8 text-emerald-600" />,
//               title: "Majestic Mountains",
//               text: "Experience the world's highest peaks up close.",
//             },
//             {
//               icon: <MapPin className="h-8 w-8 text-emerald-600" />,
//               title: "Diverse Landscapes",
//               text: "Trek through varied terrains and ecosystems.",
//             },
//             {
//               icon: <Clock className="h-8 w-8 text-emerald-600" />,
//               title: "Rich Culture",
//               text: "Immerse in local traditions and customs.",
//             },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               className="flex flex-col items-center text-center p-4 bg-white/70 rounded-lg shadow-sm"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 + i * 0.1 }}
//               whileHover={{ y: -5 }}
//             >
//               <div className="bg-emerald-100 p-4 rounded-full mb-4 shadow-inner">
//                 {card.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-sky-700 mb-2">{card.title}</h3>
//               <p className="text-gray-600">{card.text}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }




import React from 'react';
import { useDetails, useDetailsByPlace } from '../Hooks/useDetails';
import useDetailStore from '../Store/DetailStore';

const BASE_URL = 'http://127.0.0.1:8000';

const DetailsPage = () => {
  const { searchKeyword, setSearchKeyword, selectedPlace, setSelectedPlace } = useDetailStore();
  const { data: details, isLoading, error } = selectedPlace 
    ? useDetailsByPlace(selectedPlace) 
    : useDetails();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trekking Adventures</h1>



      {/* Trek List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {details
          ?.filter(detail => detail.name.toLowerCase().includes(searchKeyword.toLowerCase()))
          .map(detail => (
            <div key={detail.id} className="border rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{detail.name}</h2>
              <p><strong>Difficulty:</strong> {detail.difficulty}</p>
              <p><strong>Duration:</strong> {detail.duration}</p>
              <p><strong>Overview:</strong> {detail.overview}</p>
              <p><strong>Max Elevation:</strong> {detail.max_elevation}</p>
              <p><strong>Best Season:</strong> {detail.best_season}</p>
              <p><strong>Rating:</strong> {detail.rating} ({detail.reviews} reviews)</p>
              <p><strong>Contact:</strong> {detail.contact_number} | {detail.contact_email}</p>
              <div className="flex gap-2 mt-4">
                {detail.image1 && (
                  <img
                    src={`${BASE_URL}${detail.image1}`}
                    alt={`${detail.name} image 1`}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {detail.image2 && (
                  <img
                    src={`${BASE_URL}${detail.image2}`}
                    alt={`${detail.name} image 2`}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {detail.image3 && (
                  <img
                    src={`${BASE_URL}${detail.image3}`}
                    alt={`${detail.name} image 3`}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {detail.image4 && (
                  <img
                    src={`${BASE_URL}${detail.image4}`}
                    alt={`${detail.name} image 4`}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailsPage;