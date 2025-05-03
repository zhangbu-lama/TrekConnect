import React from "react";
import {
    Calendar,
    Mountain,
    Clock,
    BarChart2,
    Phone,
    Mail,
    Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
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

const DetailsPage = () => {
    const { id } = useParams();
    const { data: treks, isLoading, error } = useDetailsByPlace(id);

    // Format timestamps for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="text-center py-20 text-2xl font-semibold animate-pulse">
                Loading trek details...
            </div>
        );
    }

    if (error || !treks) {
        return (
            <div className="text-center py-20 text-red-500 text-2xl font-semibold">
                {error ? `Error: ${error.message}` : "Trek not found"}
            </div>
        );
    }

    if (treks.length === 0) {
        return (
            <div className="text-center py-20 text-red-500 text-2xl font-semibold">
                No treks available for this place.
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {treks.map((trek) => (
                <div key={trek._id} className="mb-16">
                    {/* Header Section */}
                    <motion.div variants={childVariants}>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">
                                    {trek.name}
                                </h1>
                                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full">
                                    <Star className="w-6 h-6 text-yellow-400" />
                                    <span className="text-white text-lg font-semibold">
                                        {trek.rating} ({trek.reviews} reviews)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Overview Section */}
                    <motion.div variants={childVariants} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {trek.overview}
                        </p>
                    </motion.div>

                    {/* Details Grid */}
                    <motion.div variants={childVariants} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Mountain className="w-8 h-8 text-purple-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Max Elevation</p>
                                    <p className="text-lg font-semibold">{trek.max_elevation}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-8 h-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="text-lg font-semibold">{trek.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <BarChart2 className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Difficulty</p>
                                    <p className="text-lg font-semibold capitalize">{trek.difficulty}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-red-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Best Season</p>
                                    <p className="text-lg font-semibold capitalize">{trek.best_season}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Images Section */}
                    {trek.images.length > 0 && (
                        <motion.div variants={childVariants} className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Images</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {trek.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative h-64 rounded-lg overflow-hidden shadow-md"
                                    >
                                        <img
                                            src={`${BASE_URL}/uploads/${image}`}
                                            alt={`${trek.name} ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm text-center">
                                            {`${trek.name} ${index + 1}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Timestamps Section */}
                    <motion.div variants={childVariants} className="mb-8">
                        <h2 className="text-2xl font-semibold mb  mb-4">Record Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Created</p>
                                    <p className="text-lg font-semibold">{formatDate(trek.created_at)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="text-lg font-semibold">{formatDate(trek.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div variants={childVariants}>
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-8 h-8 text-gray-500" />
                                <a
                                    href={`mailto:${trek.contact_email}`}
                                    className="text-blue-600 hover:underline text-lg"
                                >
                                    {trek.contact_email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-8 h-8 text-gray-500" />
                                <a
                                    href={`tel:${trek.contact_number}`}
                                    className="text-blue-600 hover:underline text-lg"
                                >
                                    {trek.contact_number}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );
};

export default DetailsPage;