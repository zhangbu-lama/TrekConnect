import React, { useEffect } from "react";
import { usePlaces } from "../Hooks/usePlace";
import usePlaceStore from "../Store/placeStore";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Mountain } from "lucide-react";

const IMAGE_BASE_URL = "http://localhost:8000";

const TrekkingPage = () => {
  const { data: places = [], isLoading, isError } = usePlaces();
  const { filter, selectedCategory, setSelectedCategory } = usePlaceStore();
  const [searchParams] = useSearchParams(); // Get query parameters

  // Set selectedCategory from URL query parameter on mount
  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      setSelectedCategory(Number(categoryId)); // Convert to number and set in store
    } else {
      setSelectedCategory(null); // Reset if no category is specified
    }
  }, [searchParams, setSelectedCategory]);

  const filteredPlaces = places.filter((place) => {
    const matchesFilter = place.name.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = selectedCategory ? place.category === selectedCategory : true;
    return matchesFilter && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex flex-col">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-sky-600 to-sky-400 py-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-10 left-[10%] w-32 h-16 bg-white rounded-full"></div>
          <div className="absolute top-20 left-[25%] w-48 h-20 bg-white rounded-full"></div>
          <div className="absolute top-5 right-[15%] w-40 h-16 bg-white rounded-full"></div>
          <div className="absolute top-24 right-[30%] w-36 h-14 bg-white rounded-full"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Nepal Trekking Adventures</h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">Explore the Best of Nepal's Trekking Trails</p>
          <div className="mt-8">
            <Link to="/bookingform" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f0f9ff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z" />
          </svg>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sky-800 mb-4">Discover Breathtaking Trails</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Nepal offers some of the world's most spectacular trekking routes.</p>
        </section>

        {isLoading && <div className="text-center py-10">Loading trekking places...</div>}
        {isError && <div className="text-center py-10 text-red-500">Failed to load trekking places.</div>}

        {!isLoading && !isError && (
          <>
            {filteredPlaces.length === 0 ? (
              <p className="text-center text-gray-500">No places match your filter.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map((place, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full"
                  >
                    {place.image && (
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={`${IMAGE_BASE_URL}${place.image}`}
                          alt={place.name}
                          className="w-full h-full object-cover transition duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40"></div>
                      </div>
                    )}

                    <div className="p-5 flex-grow flex flex-col">
                      <h2 className="text-2xl font-bold text-sky-700 mb-1">{place.name}</h2>

                      <div className="flex items-center mb-3 text-gray-500">
                        <MapPin className="h-4 w-4 mr-1 text-emerald-500 flex-shrink-0" />
                        <p className="text-sm italic">{place.location}</p>
                      </div>

                      <p className="text-gray-700 mb-4 flex-grow">{place.description}</p>

                      <div className="mt-2 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-emerald-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Duration: {place.timetotravel || place.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <Link
                        to={`/reusabledetails/${place.id}`}
                        className="block w-full text-center bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Explore Trail
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Why Trek Section */}
      <section className="bg-gradient-to-r from-sky-100 to-emerald-50 rounded-xl shadow-lg p-8 mb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-sky-800 mb-6">Why Trek in Nepal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Mountain className="h-8 w-8 text-emerald-600" />,
              title: "Majestic Mountains",
              text: "Home to eight of the world's fourteen highest peaks, including Mount Everest.",
            },
            {
              icon: <MapPin className="h-8 w-8 text-emerald-600" />,
              title: "Diverse Landscapes",
              text: "Trek through forests, meadows, and high-altitude deserts.",
            },
            {
              icon: <Clock className="h-8 w-8 text-emerald-600" />,
              title: "Rich Culture",
              text: "Experience unique cultures and traditions of mountain communities.",
            },
          ].map((card, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 bg-white/70 rounded-lg shadow-sm">
              <div className="bg-emerald-100 p-4 rounded-full mb-4 shadow-inner">{card.icon}</div>
              <h3 className="text-xl font-semibold text-sky-700 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-800 to-sky-700 text-white py-12 px-4 relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full h-auto"
          >
            <path
              fill="#f0f9ff"
              fillOpacity="1"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div>
            <p className="text-sky-100 mt-8">
              Providing unforgettable trekking experiences in the Himalayas since 2005.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-sky-100">Email: info@nepaltrekking.com</p>
            <p className="text-sky-100">Phone: +977 1 4123456</p>
            <p className="text-sky-100">Address: Thamel, Kathmandu, Nepal</p>
          </div>
          <div>
            <ul className="space-y-2 mt-5">
              <li>
                <Link
                  href="/about"
                  className="text-sky-100 hover:text-emerald-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-sky-100 hover:text-emerald-300 transition-colors"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sky-100 hover:text-emerald-300 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sky-100 hover:text-emerald-300 transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-sky-600 text-center text-sky-200">
          <p>
            © {new Date().getFullYear()} Nepal Trekking Adventures. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TrekkingPage;