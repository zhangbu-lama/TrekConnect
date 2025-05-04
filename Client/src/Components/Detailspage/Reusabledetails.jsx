"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Mountain, Clock, BarChart2, Phone, Mail, Star, MapPin, Camera, ChevronRight, Heart, Share2, CalendarIcon, Users, ArrowRight } from 'lucide-react';
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

// Mock data for demonstration
const BASE_URL = "http://127.0.0.1:8000";

// Custom hook to fetch trek details
const useDetailsByPlace = (id) => {
  // This is a mock implementation
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData([{
        _id: "trek123",
        name: "Annapurna Base Camp Trek",
        rating: 4.8,
        reviews: 124,
        overview: "The Annapurna Base Camp trek is one of the most popular treks in Nepal. This trek takes you through diverse landscapes, from lush subtropical forests to high alpine meadows, and offers stunning views of the Annapurna mountain range. The trek culminates at Annapurna Base Camp, where you'll be surrounded by some of the highest peaks in the world.",
        max_elevation: "4,130m (13,550ft)",
        duration: "7-12 days",
        difficulty: "Moderate",
        best_season: "March-May, September-November",
        images: ["trek1.jpg", "trek2.jpg", "trek3.jpg", "trek4.jpg", "trek5.jpg"],
        contact_email: "info@treknepal.com",
        contact_number: "+977 1234567890",
        created_at: "2023-01-15T08:30:00Z",
        updated_at: "2023-04-22T14:45:00Z",
        location: "Annapurna Conservation Area, Nepal",
        price: 1200,
        group_size: "2-12 people",
        included: [
          "Professional English speaking guide",
          "Porter service",
          "All meals during the trek (breakfast, lunch, dinner)",
          "Teahouse accommodation during the trek",
          "All necessary permits and entry fees",
          "Transportation to and from the trailhead",
          "Insurance for guide and porter"
        ],
        itinerary: [
          { day: 1, title: "Arrive in Kathmandu", description: "Arrival and transfer to hotel in Kathmandu." },
          { day: 2, title: "Drive to Pokhara", description: "Scenic drive from Kathmandu to Pokhara (6-7 hours)." },
          { day: 3, title: "Trek to Tikhedhunga", description: "Begin trek from Nayapul to Tikhedhunga (3-4 hours)." },
          { day: 4, title: "Trek to Ghorepani", description: "Uphill trek through rhododendron forests (5-6 hours)." },
          { day: 5, title: "Poon Hill sunrise and trek to Tadapani", description: "Early morning hike to Poon Hill for sunrise, then trek to Tadapani (6-7 hours)." },
          { day: 6, title: "Trek to Chhomrong", description: "Descend to Kimrong Khola, then climb to Chhomrong (5-6 hours)." },
          { day: 7, title: "Trek to Bamboo", description: "Descend to Chhomrong Khola, then climb to Sinuwa and descend to Bamboo (4-5 hours)." },
          { day: 8, title: "Trek to Deurali", description: "Trek through bamboo and rhododendron forests to Deurali (5-6 hours)." },
          { day: 9, title: "Trek to Annapurna Base Camp", description: "Trek to Machhapuchhre Base Camp and then to Annapurna Base Camp (4-5 hours)." },
          { day: 10, title: "Sunrise at ABC and trek to Bamboo", description: "Early morning sunrise view, then descend to Bamboo (7-8 hours)." },
          { day: 11, title: "Trek to Jhinu Danda", description: "Trek to Jhinu Danda with hot springs (6-7 hours)." },
          { day: 12, title: "Trek to Nayapul and drive to Pokhara", description: "Final day of trekking to Nayapul, then drive to Pokhara (5-6 hours)." }
        ],
        reviews_data: [
          { 
            id: 1, 
            user: "Sarah Johnson", 
            avatar: "user1.jpg", 
            rating: 5, 
            date: "2023-03-15", 
            comment: "One of the best treks I've ever done! The views were absolutely breathtaking and our guide was incredibly knowledgeable." 
          },
          { 
            id: 2, 
            user: "Michael Chen", 
            avatar: "user2.jpg", 
            rating: 4, 
            date: "2023-02-22", 
            comment: "Great experience overall. The trek was challenging but rewarding. Only giving 4 stars because the teahouses were a bit basic, but that's part of the adventure!" 
          },
          { 
            id: 3, 
            user: "Emma Wilson", 
            avatar: "user3.jpg", 
            rating: 5, 
            date: "2023-01-10", 
            comment: "Absolutely incredible journey. The mountains, the people, the food - everything was amazing. Our guide Tenzing was exceptional and made sure we were safe and comfortable throughout." 
          }
        ]
      }]);
      setIsLoading(false);
    }, 1500);
  }, [id]);

  return { data, isLoading, error };
};

const DetailsPage = () => {
  const params = useParams();
  const id = params?.id || "default-id";
  const { data: treks, isLoading, error } = useDetailsByPlace(id);
  const [activeTab, setActiveTab] = React.useState("overview");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="mb-4 inline-block"
          >
            <Mountain className="w-16 h-16 text-emerald-600" />
          </motion.div>
          <h3 className="text-xl font-medium text-slate-700">Loading trek details...</h3>
        </div>
      </div>
    );
  }

  if (error || !treks) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
          <div className="text-red-500 mb-4">
            <Mountain className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {error ? "Error Loading Trek" : "Trek Not Found"}
          </h2>
          <p className="text-slate-600 mb-6">
            {error ? error.message : "We couldn't find the trek you're looking for."}
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (treks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
          <div className="text-amber-500 mb-4">
            <Mountain className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Treks Available</h2>
          <p className="text-slate-600 mb-6">
            No treks are currently available for this location.
          </p>
          <Button asChild>
            <Link href="/">Explore Other Destinations</Link>
          </Button>
        </div>
      </div>
    );
  }

  const trek = treks[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <div className="relative h-full w-full">
          {trek.images.length > 0 ? (
            <div className="relative h-full w-full">
              <Image
                src={`/placeholder.svg?height=1080&width=1920`}
                alt={trek.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-emerald-600 to-teal-500" />
          )}
        </div>
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  {trek.difficulty}
                </Badge>
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                  {trek.duration}
                </Badge>
                <Badge className="bg-sky-500 hover:bg-sky-600 text-white">
                  Best Season: {trek.best_season}
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
              >
                {trek.name}
              </motion.h1>
              
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span className="text-white text-lg">{trek.location}</span>
              </motion.div>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-medium">
                    {trek.rating} ({trek.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Mountain className="h-5 w-5 text-emerald-400" />
                  <span className="text-white font-medium">
                    Max Elevation: {trek.max_elevation}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/20 hover:text-white">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/20 hover:text-white">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs Navigation */}
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-8 bg-white rounded-lg p-1 border">
                <TabsTrigger value="overview" className="text-sm md:text-base">Overview</TabsTrigger>
                <TabsTrigger value="itinerary" className="text-sm md:text-base">Itinerary</TabsTrigger>
                <TabsTrigger value="gallery" className="text-sm md:text-base">Gallery</TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm md:text-base">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <motion.div 
                  initial="hidden"
                  animate={activeTab === "overview" ? "visible" : "hidden"}
                  variants={fadeIn}
                  className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Trek Overview</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {trek.overview}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {[
                      {
                        icon: <Mountain className="w-8 h-8 text-emerald-500" />,
                        label: "Max Elevation",
                        value: trek.max_elevation,
                      },
                      {
                        icon: <Clock className="w-8 h-8 text-emerald-500" />,
                        label: "Duration",
                        value: trek.duration,
                      },
                      {
                        icon: <BarChart2 className="w-8 h-8 text-emerald-500" />,
                        label: "Difficulty",
                        value: trek.difficulty,
                      },
                      {
                        icon: <Calendar className="w-8 h-8 text-emerald-500" />,
                        label: "Best Season",
                        value: trek.best_season,
                      },
                      {
                        icon: <Users className="w-8 h-8 text-emerald-500" />,
                        label: "Group Size",
                        value: trek.group_size,
                      },
                      {
                        icon: <MapPin className="w-8 h-8 text-emerald-500" />,
                        label: "Location",
                        value: trek.location,
                      },
                    ].map((item, index) => (
                      <Card key={index} className="border-none shadow-sm hover:shadow transition-shadow">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="bg-emerald-50 p-3 rounded-full">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">{item.label}</p>
                            <p className="text-lg font-semibold text-slate-800">{item.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial="hidden"
                  animate={activeTab === "overview" ? "visible" : "hidden"}
                  variants={fadeIn}
                  className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">What's Included</h2>
                  <ul className="space-y-3">
                    {trek.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 bg-emerald-100 rounded-full p-1">
                          <ChevronRight className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </TabsContent>
              
              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="space-y-8">
                <motion.div 
                  initial="hidden"
                  animate={activeTab === "itinerary" ? "visible" : "hidden"}
                  variants={fadeIn}
                  className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Trek Itinerary</h2>
                  <div className="space-y-6">
                    {trek.itinerary.map((day, index) => (
                      <div key={index} className="relative pl-8 pb-8">
                        {/* Timeline connector */}
                        {index < trek.itinerary.length - 1 && (
                          <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-emerald-200"></div>
                        )}
                        
                        {/* Day marker */}
                        <div className="absolute left-0 top-1.5 bg-emerald-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                          {day.day}
                        </div>
                        
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                          <h3 className="text-lg font-semibold text-slate-800 mb-2">{day.title}</h3>
                          <p className="text-slate-600">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              
              {/* Gallery Tab */}
              <TabsContent value="gallery" className="space-y-8">
                <motion.div 
                  initial="hidden"
                  animate={activeTab === "gallery" ? "visible" : "hidden"}
                  variants={fadeIn}
                  className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Trek Gallery</h2>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Camera className="h-5 w-5" />
                      <span className="font-medium">{trek.images.length} Photos</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trek.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm"
                      >
                        <Image
                          src={`/placeholder.svg?height=600&width=800`}
                          alt={`${trek.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white font-medium">
                            {trek.name} - View {index + 1}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-8">
                <motion.div 
                  initial="hidden"
                  animate={activeTab === "reviews" ? "visible" : "hidden"}
                  variants={fadeIn}
                  className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-1">Customer Reviews</h2>
                      <p className="text-slate-500">See what others are saying about this trek</p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                      <div className="text-4xl font-bold text-slate-800">{trek.rating}</div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(trek.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-500">Based on {trek.reviews} reviews</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {trek.reviews_data.map((review) => (
                      <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg?height=100&width=100`} alt={review.user} />
                            <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <h4 className="font-semibold text-slate-800">{review.user}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-slate-500">{review.date}</span>
                              </div>
                            </div>
                            <p className="text-slate-600">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="gap-2">
                      View All Reviews
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-emerald-600 p-6 text-white">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-bold">
                      ${trek.price}
                    </h3>
                    <span className="text-emerald-100">per person</span>
                  </div>
                  <p className="text-emerald-100 text-sm">
                    *Price may vary based on group size and season
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Select Date</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-emerald-600" />
                        <span className="text-slate-700 font-medium">Number of Travelers</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-800">Trek Highlights</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-emerald-600">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-slate-600">Professional English speaking guide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-emerald-600">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-slate-600">All meals during the trek</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-emerald-600">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-slate-600">Teahouse accommodation</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Availability</span>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                        Available
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Booking Status</span>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">
                        Filling Fast
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-center text-slate-500">
                    No payment required to book. Reserve your spot now and pay later.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Need help?</p>
                      <a href={`tel:${trek.contact_number}`} className="font-medium text-slate-800 hover:text-emerald-600">
                        {trek.contact_number}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email us</p>
                      <a href={`mailto:${trek.contact_email}`} className="font-medium text-slate-800 hover:text-emerald-600">
                        {trek.contact_email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Book Now Button (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-800">${trek.price}</p>
            <p className="text-sm text-slate-500">per person</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
