"use client";

import { ArrowRight, MapPin, Clock, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
export default function TrekkingPage() {
  const trekkingSpots = [
    {
      id: 1,
      name: "Annapurna Circuit",
      image: "/images/annapurna.jpg",
      difficulty: "Moderate to Challenging",
      description:
        "Experience the diverse landscapes of the Annapurna region, from lush subtropical forests to high alpine environments. Cross the challenging Thorong La Pass at 5,416m and enjoy panoramic mountain views.",
      highlights: ["Thorong La Pass", "Poon Hill", "Hot Springs at Tatopani"],
      duration: "12-18 days",
      distance: "160-230 km",
    },
    {
      id: 2,
      name: "Langtang Circuit",
      image: "/images/langtang.jpg",
      difficulty: "Moderate",
      description:
        "Trek through the beautiful Langtang Valley with stunning views of the Himalayas. Experience the rich Tamang culture and visit ancient monasteries along the way.",
      highlights: ["Kyanjin Gompa", "Tserko Ri", "Langtang Village"],
      duration: "7-10 days",
      distance: "70 km",
    },
    {
      id: 3,
      name: "Everest Base Camp",
      image: "/images/everest.jpg",
      difficulty: "Challenging",
      description:
        "Journey to the foot of the world's highest mountain. Trek through Sherpa villages, ancient monasteries, and breathtaking landscapes with views of Everest and other Himalayan giants.",
      highlights: ["Kala Patthar", "Namche Bazaar", "Tengboche Monastery"],
      duration: "12-14 days",
      distance: "130 km",
    },
    {
      id: 4,
      name: "Manaslu Circuit",
      image: "/images/manaslu.jpg",
      difficulty: "Challenging",
      description:
        "A remote and less crowded alternative to the Annapurna Circuit. Trek around Mount Manaslu, the eighth highest mountain in the world, crossing the challenging Larkya La Pass.",
      highlights: ["Larkya La Pass", "Sama Gaon", "Budhi Gandaki River"],
      duration: "14-16 days",
      distance: "177 km",
    },
    {
      id: 5,
      name: "Upper Mustang",
      image: "/images/mustang.jpg",
      difficulty: "Moderate",
      description:
        "Explore the hidden kingdom of Mustang with its unique landscape resembling the Tibetan plateau. Discover ancient cave monasteries, colorful canyons, and traditional Tibetan culture.",
      highlights: ["Lo Manthang", "Chhoser Caves", "Kagbeni"],
      duration: "10-14 days",
      distance: "100 km",
    },
    {
      id: 6,
      name: "Gokyo Lakes",
      image: "/images/gokyo.jpg",
      difficulty: "Moderate to Challenging",
      description:
        "Visit the stunning turquoise Gokyo Lakes, the world's highest freshwater lake system. Climb Gokyo Ri for panoramic views of Everest, Lhotse, Makalu, and Cho Oyu.",
      highlights: ["Gokyo Ri", "Ngozumpa Glacier", "Renjo La Pass"],
      duration: "12-15 days",
      distance: "90 km",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-sky-600 to-sky-400 py-20 px-4 text-center overflow-hidden">
        {/* Decorative cloud elements */}
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Nepal Trekking Adventures
          </h1>
          <p className="text-lg md:text-xl font-medium text-emerald-200 max-w-3xl mx-auto drop-shadow">
            Explore the Best of Nepal's Trekking Trails
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#f0f9ff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 bg-sky-50">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sky-800 mb-4">
              Discover Breathtaking Trails
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nepal offers some of the world's most spectacular trekking routes,
              from the iconic Everest Base Camp to the diverse landscapes of the
              Annapurna Circuit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trekkingSpots.map((spot) => (
              <TrekkingCard key={spot.id} spot={spot} />
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-sky-100 to-emerald-50 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-sky-800 mb-6">
            Why Trek in Nepal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-lg shadow-sm">
              <div className="bg-emerald-100 p-4 rounded-full mb-4 shadow-inner">
                <Mountain className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                Majestic Mountains
              </h3>
              <p className="text-gray-600">
                Home to eight of the world's fourteen highest peaks, including
                Mount Everest.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-lg shadow-sm">
              <div className="bg-emerald-100 p-4 rounded-full mb-4 shadow-inner">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                Diverse Landscapes
              </h3>
              <p className="text-gray-600">
                Trek through subtropical forests, alpine meadows, and
                high-altitude deserts.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-lg shadow-sm">
              <div className="bg-emerald-100 p-4 rounded-full mb-4 shadow-inner">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-sky-700 mb-2">
                Rich Culture
              </h3>
              <p className="text-gray-600">
                Experience the unique cultures and traditions of mountain
                communities.
              </p>
            </div>
          </div>
        </section>
      </main>
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
              Providing unforgettable trekking experiences in the Himalayas
              since 2005.
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
            &copy; {new Date().getFullYear()} Nepal Trekking Adventures. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function TrekkingCard({ spot }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={spot.image}
          alt={spot.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-full opacity-40"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-sky-700 mb-4">{spot.name}</h3>
        <p className="text-gray-600 text-sm">{spot.description}</p>
        <ul className="mt-4 text-sm text-gray-500 space-y-2">
          <li>
            <strong>Difficulty:</strong> {spot.difficulty}
          </li>
          <li>
            <strong>Duration:</strong> {spot.duration}
          </li>
          <li>
            <strong>Distance:</strong> {spot.distance}
          </li>
        </ul>
        <div className="mt-4">
          <Link
            to={`/reusabledetails`}
            className="text-emerald-500 font-semibold hover:text-emerald-600"
          >
            View Details <ArrowRight className="inline h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
