import React, { useState } from "react";
import {
    Calendar,
    ArrowLeft,
    MapPin,
    Thermometer,
    Mountain,
    Clock,
    BarChart2,
    Phone,
    Mail,
    Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useDetailsByPlace } from "../Hooks/useDetails";

const BASE_URL = "http://127.0.0.1:8000";

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

const HighlightImage = ({ image, alt }) => (
    <motion.div
        className="relative h-48 rounded-lg overflow-hidden shadow-md"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
        <img src={image} alt={alt} className="object-cover w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm text-center">
            {alt}
        </div>
    </motion.div>
);

const DetailsPage = () => {
    const { id } = useParams();
    const { data: treks, isLoading, error } = useDetailsByPlace(id);
    console.log(treks);

    if (isLoading) {
        return (
            <div className="text-center py-10 text-lg font-semibold animate-pulse">
                Loading trek details...
            </div>
        );
    }

    if (error || !treks) {
        return (
            <div className="text-center py-10 text-red-500 font-semibold">
                {error ? `Error: ${error.message}` : "Trek not found"}
            </div>
        );
    }
    if (treks.length === 0) {
        return (
            <div className="text-center py-10 text-red-500 font-semibold">
                No treks available for this place.
            </div>
        );
    }

    return (
        <div className="mt-10 flex justify-center flex-wrap ">
            {treks.map((trek) => (
                <TrekkingCard data={trek} key={trek._id} />
            ))}
        </div>
    );
};

export default DetailsPage;

function TrekkingCard({ data }) {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-102">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">
                        {data.name}
                    </h2>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-semibold">
                            {data.rating} ({data.reviews} reviews)
                        </span>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
                <p className="text-gray-600 leading-relaxed">{data.overview}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                        <Mountain className="w-6 h-6 text-purple-600" />
                        <div>
                            <p className="text-xs text-gray-500">
                                Max Elevation
                            </p>
                            <p className="font-semibold">
                                {data.max_elevation}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-500" />
                        <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-semibold">{data.duration}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <BarChart2 className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="text-xs text-gray-500">Difficulty</p>
                            <p className="font-semibold capitalize">
                                {data.difficulty}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-red-500" />
                        <div>
                            <p className="text-xs text-gray-500">Best Season</p>
                            <p className="font-semibold capitalize">
                                {data.best_season}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Contact Information
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <a
                                href={`mailto:${data.contact_email}`}
                                className="text-blue-600 hover:underline"
                            >
                                {data.contact_email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <a
                                href={`tel:${data.contact_number}`}
                                className="text-blue-600 hover:underline"
                            >
                                {data.contact_number}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Thumbnail */}
            {data.images.length > 0 && (
                <div className="border-t">
                    <img
                        src={`http://localhost:8000/uploads/${data.images[0]}`}
                        alt={data.name}
                        className="w-full h-48 object-cover object-center"
                    />
                </div>
            )}
        </div>
    );
}
