import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  Layers,
  MapPin,
  Mountain,
  Star,
  Thermometer,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock data (replace with API call in production)
const trekkingSpots = [
  {
    id: 1,
    name: "Annapurna Circuit",
    image: "/images/annapurna.jpg",
    galleryImages: ["/images/annapurna.jpg", "/images/annapurna-2.jpg", "/images/annapurna-3.jpg"],
    difficulty: "Moderate to Challenging",
    description:
      "Experience the diverse landscapes of the Annapurna region, from lush subtropical forests to high alpine environments. Cross the challenging Thorong La Pass at 5,416m and enjoy panoramic mountain views.",
    longDescription:
      "The Annapurna Circuit is one of the most popular and diverse treks in Nepal. This iconic trek takes you through a variety of landscapes, from lush subtropical forests to high alpine environments. You'll cross the challenging Thorong La Pass at 5,416m, visit ancient Buddhist and Hindu temples, and experience the rich cultural heritage of the local communities. The trek offers stunning views of the Annapurna range, Dhaulagiri, and Machhapuchhre (Fishtail Mountain).",
    highlights: ["Thorong La Pass", "Poon Hill", "Hot Springs at Tatopani"],
    duration: "12-18 days",
    distance: "160-230 km",
    maxElevation: "5,416m (Thorong La Pass)",
    bestSeason: "October-November, March-April",
    accommodation: "Teahouses/Lodges",
    startPoint: "Besisahar",
    endPoint: "Nayapul",
    price: 1200,
    rating: 4.8,
    reviews: 124,
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Arrive in Kathmandu and transfer to your hotel. Briefing about the trek and preparation." },
      { day: 2, title: "Drive to Besisahar (760m)", description: "Drive from Kathmandu to Besisahar, the starting point of the trek." },
      { day: 3, title: "Trek to Bahundanda (1,310m)", description: "Begin your trek through scenic villages and terraced fields." },
      { day: 4, title: "Trek to Chamje (1,410m)", description: "Trek through forests and cross suspension bridges over the Marsyangdi River." },
      { day: 5, title: "Trek to Dharapani (1,960m)", description: "Enter the Manang district and enjoy views of Annapurna II and Lamjung Himal." },
      { day: 6, title: "Trek to Chame (2,710m)", description: "Trek through pine forests with views of Annapurna II and Pisang Peak." },
      { day: 7, title: "Trek to Upper Pisang (3,300m)", description: "The landscape changes to alpine as you gain altitude." },
      { day: 8, title: "Trek to Manang (3,540m)", description: "Acclimatization day with side trips to nearby viewpoints." },
      { day: 9, title: "Acclimatization day in Manang", description: "Rest and explore the surroundings to help with acclimatization." },
      { day: 10, title: "Trek to Yak Kharka (4,018m)", description: "Short but steep climb as you approach the Thorong La Pass." },
      { day: 11, title: "Trek to Thorong Phedi (4,450m)", description: "Final preparation before crossing the pass." },
      { day: 12, title: "Cross Thorong La Pass (5,416m) to Muktinath (3,800m)", description: "Early morning start to cross the challenging pass and descend to Muktinath." },
      { day: 13, title: "Trek to Jomsom (2,720m)", description: "Trek through the Kali Gandaki valley, the deepest gorge in the world." },
      { day: 14, title: "Trek to Tatopani (1,190m)", description: "Descend to lower elevations and enjoy the hot springs at Tatopani." },
      { day: 15, title: "Trek to Ghorepani (2,860m)", description: "Climb to Ghorepani for stunning sunset views over the Annapurna range." },
      { day: 16, title: "Hike to Poon Hill (3,210m) and trek to Nayapul, drive to Pokhara", description: "Early morning hike to Poon Hill for sunrise views, then trek to Nayapul and drive to Pokhara." },
      { day: 17, title: "Drive back to Kathmandu", description: "Return to Kathmandu by bus or flight from Pokhara." },
    ],
    included: [
      "Airport pickups and drops",
      "All ground transportation",
      "Accommodation in Kathmandu and during the trek",
      "Breakfast in Kathmandu and all meals during the trek",
      "Experienced English-speaking guide and porters",
      "All necessary permits and fees",
      "First aid medical kit",
      "All government and local taxes",
    ],
    notIncluded: [
      "International airfare",
      "Nepal visa fee",
      "Travel insurance",
      "Lunch and dinner in Kathmandu",
      "Personal expenses (phone calls, laundry, bar bills, etc.)",
      "Tips for guides and porters",
    ],
    faqs: [
      { question: "How difficult is the Annapurna Circuit Trek?", answer: "The Annapurna Circuit is considered moderate to challenging. The main challenge is crossing the Thorong La Pass at 5,416m, which requires good physical fitness and proper acclimatization. Most days involve 5-7 hours of walking." },
      { question: "Do I need prior trekking experience?", answer: "While prior trekking experience is beneficial, it's not mandatory. However, good physical fitness is essential. We recommend preparing with cardiovascular exercises and hiking practice before the trek." },
      { question: "What is the best time to trek the Annapurna Circuit?", answer: "The best seasons are autumn (October-November) and spring (March-April) when the weather is clear with stable temperatures, offering excellent mountain views and comfortable trekking conditions." },
      { question: "What type of accommodation is available during the trek?", answer: "The trek follows established routes with teahouses/lodges in villages along the way. These provide basic but comfortable accommodation with twin beds, shared bathrooms, and dining areas." },
      { question: "Is altitude sickness a concern?", answer: "Yes, altitude sickness can affect anyone regardless of fitness level. Our itinerary includes proper acclimatization days. Our guides are trained to recognize symptoms and take appropriate action if needed." },
    ],
    testimonials: [
      { name: "Sarah Johnson", country: "USA", comment: "The Annapurna Circuit was the adventure of a lifetime! The views were breathtaking, and our guide was incredibly knowledgeable and supportive.", rating: 5 },
      { name: "Thomas Weber", country: "Germany", comment: "Crossing Thorong La Pass was challenging but so rewarding. The cultural experiences along the way made this trek special.", rating: 5 },
      { name: "Akiko Tanaka", country: "Japan", comment: "Beautiful landscapes and wonderful people. The teahouses were better than I expected, and the food was delicious.", rating: 4 },
    ],
  },
];

// Utility function to fetch trek data
const getTrekkingData = (id) => {
  return trekkingSpots.find((spot) => spot.id === Number(id)) || trekkingSpots[0];
};

// SVG Components
const Check = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const X = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function DetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [accordionOpen, setAccordionOpen] = useState(null);
  const trek = getTrekkingData(id);

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleAccordionToggle = (index) => setAccordionOpen(accordionOpen === index ? null : index);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <img
          src={trek.image || "/placeholder.svg?height=800&width=1200"}
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
            <div className="flex items-center gap-2 mb-2">
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
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">{trek.name}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                <span>{trek.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4" />
                <span>{trek.distance}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <Mountain className="h-4 w-4" />
                <span>{trek.maxElevation}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                <Thermometer className="h-4 w-4" />
                <span>{trek.bestSeason}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-12">
              <div className="grid w-full grid-cols-4 border-b">
                {["overview", "itinerary", "gallery", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-4 text-center ${activeTab === tab ? "border-b-2 border-emerald-500 text-emerald-600" : "text-gray-500"}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="mt-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-2xl font-bold text-sky-800 mb-4">Trek Overview</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">{trek.longDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-sky-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-sky-800 mb-2 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-emerald-600" />
                          Route Information
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex justify-between">
                            <span>Start Point:</span>
                            <span className="font-medium">{trek.startPoint}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>End Point:</span>
                            <span className="font-medium">{trek.endPoint}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Distance:</span>
                            <span className="font-medium">{trek.distance}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Max Elevation:</span>
                            <span className="font-medium">{trek.maxElevation}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-sky-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-sky-800 mb-2 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                          Trek Details
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">{trek.duration}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Difficulty:</span>
                            <span className="font-medium">{trek.difficulty}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Best Season:</span>
                            <span className="font-medium">{trek.bestSeason}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Accommodation:</span>
                            <span className="font-medium">{trek.accommodation}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-sky-800 mb-3">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {trek.highlights.map((highlight, index) => (
                        <div key={index} className="bg-emerald-50 p-3 rounded-lg flex items-start gap-3">
                          <div className="bg-emerald-100 p-1 rounded-full mt-1">
                            <Heart className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-bold text-sky-800 mb-3 flex items-center gap-2">
                          <div className="bg-emerald-100 p-1 rounded-full">
                            <Check className="h-4 w-4 text-emerald-600" />
                          </div>
                          What's Included
                        </h3>
                        <ul className="space-y-2">
                          {trek.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <div className="bg-emerald-100 p-1 rounded-full mt-1 flex-shrink-0">
                                <Check className="h-3 w-3 text-emerald-600" />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-sky-800 mb-3 flex items-center gap-2">
                          <div className="bg-red-100 p-1 rounded-full">
                            <X className="h-4 w-4 text-red-600" />
                          </div>
                          What's Not Included
                        </h3>
                        <ul className="space-y-2">
                          {trek.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <div className="bg-red-100 p-1 rounded-full mt-1 flex-shrink-0">
                                <X className="h-3 w-3 text-red-600" />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md mt-8">
                    <h2 className="text-2xl font-bold text-sky-800 mb-4">Frequently Asked Questions</h2>
                    <div className="w-full">
                      {trek.faqs.map((faq, index) => (
                        <div key={index} className="border-b">
                          <button
                            className="w-full text-left font-medium text-sky-700 py-2 flex justify-between items-center"
                            onClick={() => handleAccordionToggle(index)}
                          >
                            {faq.question}
                            <span>{accordionOpen === index ? "-" : "+"}</span>
                          </button>
                          {accordionOpen === index && (
                            <div className="text-gray-700 py-2">{faq.answer}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Itinerary Tab */}
              {activeTab === "itinerary" && (
                <div className="mt-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-2xl font-bold text-sky-800 mb-6">Day-by-Day Itinerary</h2>
                    <div className="space-y-6">
                      {trek.itinerary.map((day, index) => (
                        <div key={index} className="relative pl-8 pb-6">
                          {index < trek.itinerary.length - 1 && (
                            <div className="absolute left-[15px] top-[28px] h-full w-0.5 bg-sky-200"></div>
                          )}
                          <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm">
                            {day.day}
                          </div>
                          <div className="bg-sky-50 rounded-lg p-4">
                            <h3 className="font-bold text-sky-800 text-lg">{day.title}</h3>
                            <p className="text-gray-700 mt-2">{day.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === "gallery" && (
                <div className="mt-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-2xl font-bold text-sky-800 mb-6">Trek Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {trek.galleryImages.map((image, index) => (
                        <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg?height=400&width=600"}
                            alt={`${trek.name} - Image ${index + 1}`}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="mt-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-2xl font-bold text-sky-800 mb-6">Traveler Reviews</h2>
                    <div className="space-y-6">
                      {trek.testimonials.map((testimonial, index) => (
                        <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-sky-800">{testimonial.name}</h3>
                              <p className="text-gray-500 text-sm">{testimonial.country}</p>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{testimonial.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-sky-800">Price</h3>
                <div className="text-2xl font-bold text-emerald-600">${trek.price}</div>
              </div>
              <p className="text-gray-500 mb-6">per person</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{trek.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-full">
                    <Thermometer className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Best Season</div>
                    <div className="font-medium">{trek.bestSeason}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-full">
                    <Layers className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Difficulty</div>
                    <div className="font-medium">{trek.difficulty}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Group Size</div>
                    <div className="font-medium">2-12 People</div>
                  </div>
                </div>
              </div>

              <Link
                to={`/bookingform`}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md inline-block text-center"
              >
                Book Now
              </Link>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">Need help planning your trip?</p>
                <Link to="/contact" className="text-sky-600 font-medium text-sm hover:underline">
                  Contact our travel experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}