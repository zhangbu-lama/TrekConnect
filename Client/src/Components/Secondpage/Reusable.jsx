import React, { useEffect, useState } from 'react';
import { usePlaces } from '../Hooks/usePlace';
import usePlaceStore from '../Store/placeStore';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Mountain, Mail, Facebook, Instagram, Twitter, Menu, X, Compass } from 'lucide-react';

const IMAGE_BASE_URL = 'http://localhost:8000/api';

const TrekkingPage = () => {
  const { data: places = [], isLoading, isError } = usePlaces();
  const { filter, selectedCategory, setSelectedCategory } = usePlaceStore();
  const [searchParams] = useSearchParams();

  // Set category from URL
  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (typeof setSelectedCategory !== 'function') {
      console.error('setSelectedCategory is not a function.');
      return;
    }
    setSelectedCategory(categoryId || null);
  }, [searchParams, setSelectedCategory]);

  // Filter places based on search and category
  const filteredPlaces = places.filter((place) => {
    const matchesFilter = place.name.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory
      ? place.category?._id === selectedCategory
      : true;
    return matchesFilter && matchesCategory;
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation Bar */}


      {/* Hero Section */}
      <header
        className="relative h-[95vh] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1544737700-7c30f97e6000')] flex items-center justify-center overflow-hidden"
        style={{ backgroundAttachment: 'fixed' }}
      >
        {/* Bluish Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/60 to-blue-600/30"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            <path
              d="M0,0 C300,200 600,100 900,300 C1200,500 1440,400 1440,600 V900 H0 Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1E3A8A', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Compass Icon */}
        <motion.div
          className="absolute top-10 right-10 text-blue-200"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Compass size={48} />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 text-center text-white px-6 md:px-12 max-w-4xl"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-emerald-200"
          >
            Journey Through Nepal’s Himalayas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto font-light text-blue-100 drop-shadow-md"
          >
            Explore majestic trails, vibrant cultures, and breathtaking vistas in the heart of the Himalayas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex justify-center gap-4 flex-col sm:flex-row"
          >
            <div className="relative w-full max-w-md">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-200" />
              <input
                type="text"
                placeholder="Search trails or destinations..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-blue-900/30 backdrop-blur-md text-white placeholder-blue-200 border border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <motion.a
              href="/bookingform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
            >
              Book Now
              <ArrowRight className="ml-3 h-5 w-5" />
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-12 flex justify-center space-x-8 text-sm md:text-base text-blue-100"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.9/5 from 12K+ Travelers
            </span>
            <span className="flex items-center">
              <Mountain className="h-5 w-5 mr-2" />
              60+ Unique Trails
            </span>
          </motion.div>
        </motion.div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50">
            <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L0,120Z" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Discover Iconic Treks
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From Everest to Annapurna, find the perfect trail for your next adventure.
          </p>
        </motion.section>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-52 bg-gray-200 rounded-t-2xl"></div>
                <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-10 text-red-600">
            Oops! Something went wrong. Please try again later.
          </div>
        )}

        {!isLoading && !isError && (
          <AnimatePresence>
            {filteredPlaces.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500"
              >
                No trails match your search. Try adjusting your filters.
              </motion.p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map((place, index) => (
                  <motion.div
                    key={place._id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {place.image ? (
                        <img
                          src={`${IMAGE_BASE_URL}${place.image}`}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/fallback-image.jpg';
                          }}
                        />
                      ) : (
                        <div className="h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No image available</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {place.name}
                      </h3>
                      <div className="flex items-center mt-2 text-gray-500">
                        <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
                        <span className="text-sm">{place.location}</span>
                      </div>
                      <p className="mt-3 text-gray-600 line-clamp-3">
                        {place.description}
                      </p>
                      <div className="mt-4 flex items-center text-emerald-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{place.time_to_travel}</span>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <Link
                        to={`/reusabledetails/${place._id}`}
                        className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition-colors"
                      >
                        Explore Trail
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Why Trek Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-emerald-50 to-sky-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Why Trek in Nepal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mountain className="h-10 w-10 text-emerald-600" />,
                title: 'Majestic Peaks',
                text: 'Trek among the world’s highest mountains, including Everest and Annapurna.',
              },
              {
                icon: <MapPin className="h-10 w-10 text-emerald-600" />,
                title: 'Stunning Landscapes',
                text: 'Explore lush valleys, rugged terrains, and serene alpine lakes.',
              },
              {
                icon: <Clock className="h-10 w-10 text-emerald-600" />,
                title: 'Cultural Immersion',
                text: 'Engage with vibrant local traditions and warm hospitality.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="bg-emerald-100 p-4 rounded-full inline-block mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 relative">
        <div className="absolute top-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" className="w-full h-16 fill-gray-50">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Nepal Trekking Adventures</h3>
            <p className="mt-4 text-gray-300">
              Crafting unforgettable Himalayan journeys since 2005.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-emerald-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-emerald-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-emerald-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mt-4 text-gray-300">Email: info@nepaltrekking.com</p>
            <p className="text-gray-300">Phone: +977 1 4123456</p>
            <p className="text-gray-300">Thamel, Kathmandu, Nepal</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {['About Us', 'Tours', 'Blog', 'FAQs'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-300 hover:text-emerald-400 transition"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="mt-4 text-gray-300">
              Subscribe for the latest trekking tips and offers.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 px-4 rounded-r-lg">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Nepal Trekking Adventures. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TrekkingPage;
