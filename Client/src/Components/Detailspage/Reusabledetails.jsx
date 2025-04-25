import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Mountain, Star, Thermometer, Phone, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock data (replace with API call in production)
const trekkingSpots = [
  {
    id: 1,
    name: "Annapurna Circuit",
    difficulty: "Medium",
    duration: "12-18 days",
    overview:
      "The Annapurna Circuit is one of Nepal's most iconic treks, offering a journey through diverse landscapes from lush subtropical forests to high alpine environments. Cross the challenging Thorong La Pass and immerse in the rich cultural heritage of local communities.",
    maxElevation: "5,416m (Thorong La Pass)",
    highlights: [
      { image: "https://via.placeholder.com/600/400?text=Thorong+La+Pass", alt: "Thorong La Pass" },
      { image: "https://via.placeholder.com/600/400?text=Poon+Hill", alt: "Poon Hill" },
      { image: "https://via.placeholder.com/600/400?text=Hot+Springs", alt: "Hot Springs at Tatopani" },
      { image: "https://via.placeholder.com/600/400?text=Manang+Valley", alt: "Manang Valley" },
    ],
    bestSeason: "October to November",
    contactNumber: "+1 (555) 123-4567",
    contactEmail: "info@trekkingadventures.com",
    rating: 4.8,
    reviews: 124,
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Arrive in Kathmandu and transfer to your hotel." },
      { day: 2, title: "Drive to Besisahar", description: "Drive from Kathmandu to Besisahar, the trek's starting point." },
      // ... (add more itinerary days as needed)
    ],
    whyChoose: [
      "Expert guides with extensive local knowledge",
      "Carefully planned itinerary for acclimatization",
      "Stunning views of Annapurna, Dhaulagiri, and Machhapuchhre",
      "Authentic cultural experiences with local communities",
    ],
  },
];

// Utility function to fetch trek data
const getTrekkingData = (id) => {
  return trekkingSpots.find((spot) => spot.id === Number(id)) || trekkingSpots[0];
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Highlight Image component
const HighlightImage = ({ image, alt }) => (
  <motion.div
    className="relative h-48 rounded-lg overflow-hidden shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={image} alt={alt} className="object-cover w-full h-full" />
    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm text-center">{alt}</div>
  </motion.div>
);

export default function TrekDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [accordionOpen, setAccordionOpen] = useState(null);
  const trek = getTrekkingData(id);

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleAccordionToggle = (index) => setAccordionOpen(accordionOpen === index ? null : index);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 font-sans">
      {/* Hero Section */}
      <motion.div
        className="relative h-[50vh] md:h-[70vh] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={trek.highlights[0].image}
          alt={trek.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/reusable"
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Treks</span>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex items-center gap-2 mb-2"
              variants={childVariants}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(trek.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-white font-medium">
                {trek.rating} ({trek.reviews} reviews)
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg"
              variants={childVariants}
            >
              {trek.name}
            </motion.h1>
            <motion.div className="flex flex-wrap gap-4" variants={childVariants}>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span>{trek.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <Mountain className="h-4 w-4" />
                <span>{trek.maxElevation}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <Thermometer className="h-4 w-4" />
                <span>{trek.bestSeason}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-12">
              <div className="grid w-full grid-cols-3 border-b sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                {["overview", "itinerary", "gallery"].map((tab) => (
                  <button
                    key={tab}
                    className={`py-3 px-4 text-center relative ${
                      activeTab === tab
                        ? "text-accent font-medium border-b-2 border-accent"
                        : "text-gray-500 hover:text-primary"
                    }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h2 className="text-2xl font-bold text-primary mb-4">Trek Overview</h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">{trek.overview}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-sky-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-accent" />
                            Trek Details
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex justify-between">
                              <span>Difficulty:</span>
                              <span className="font-medium">{trek.difficulty}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Max Elevation:</span>
                              <span className="font-medium">{trek.maxElevation}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Best Season:</span>
                              <span className="font-medium">{trek.bestSeason}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-primary mb-3">Why Choose This Trek</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {trek.whyChoose.map((reason, index) => (
                          <div
                            key={index}
                            className="bg-accent/10 p-3 rounded-lg flex items-start gap-3"
                          >
                            <div className="bg-accent/20 p-1 rounded-full mt-1">
                              <svg
                                className="h-4 w-4 text-accent"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <motion.div
                    key="itinerary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h2 className="text-2xl font-bold text-primary mb-6">Day-by-Day Itinerary</h2>
                      <div className="space-y-6">
                        {trek.itinerary.map((day, index) => (
                          <div key={index} className="relative pl-8 pb-6">
                            {index < trek.itinerary.length - 1 && (
                              <div className="absolute left-[15px] top-[28px] h-full w-0.5 bg-sky-200"></div>
                            )}
                            <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                              {day.day}
                            </div>
                            <div className="bg-sky-50 rounded-lg p-4">
                              <h3 className="font-bold text-primary text-lg">{day.title}</h3>
                              <p className="text-gray-700 mt-2">{day.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h2 className="text-2xl font-bold text-primary mb-6">Trek Gallery</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {trek.highlights.map((highlight, index) => (
                          <HighlightImage key={index} image={highlight.image} alt={highlight.alt} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <motion.div className="lg:col-span-1" variants={childVariants}>
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-6">
              <h3 className="text-xl font-bold text-primary mb-4">Contact Us</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-gray-700">{trek.contactNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-gray-700">{trek.contactEmail}</span>
                </div>
              </div>
              <Link
                to={`/bookingform`}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-lg shadow-md inline-block text-center transition-colors"
              >
                Book Now
              </Link>
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">Need help planning your trip?</p>
                <Link to="/contact" className="text-primary font-medium text-sm hover:underline">
                  Contact our travel experts
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}