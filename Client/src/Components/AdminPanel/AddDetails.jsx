import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  X,
  Save,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/Index'; // Adjust path as needed
import { fetchPlaces } from '../api/Place'; // Adjust path as needed
import Layout from './Layout'; // Import Layout component

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const toastVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

// AddTrek Component
const AddTrek = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    place: '',
    duration: '',
    overview: '',
    max_elevation: '',
    best_season: '',
    contact_number: '',
    contact_email: '',
    rating: '',
    reviews: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Fetch places for dropdown
  const { data: places, isLoading: placesLoading } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });

  // Mutation for adding a trek
  const addTrekMutation = useMutation({
    mutationFn: (formData) =>
      axiosInstance.post('/treks/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treks'] });
      setFormData({
        name: '',
        difficulty: '',
        place: '',
        duration: '',
        overview: '',
        max_elevation: '',
        best_season: '',
        contact_number: '',
        contact_email: '',
        rating: '',
        reviews: '',
      });
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setImageFiles([]);
      setImagePreviews([]);
      setToast({ show: true, message: 'Trek added successfully!', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    },
    onError: (error) => {
      setToast({ show: true, message: `Error adding trek: ${error.message}`, type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 5000);
    },
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Trek name is required';
    if (formData.contact_email && !/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = 'Invalid email format';
    }
    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    if (formData.reviews && formData.reviews < 0) {
      newErrors.reviews = 'Reviews cannot be negative';
    }
    if (formData.contact_number && !/^\d+$/.test(formData.contact_number)) {
      newErrors.contact_number = 'Contact number must be numeric';
    }
    if (imageFiles.length > 4) {
      newErrors.images = 'You can upload a maximum of 4 images';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        if (key === 'rating') {
          data.append(key, parseFloat(formData[key]));
        } else if (key === 'reviews' || key === 'contact_number') {
          data.append(key, parseInt(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
    });
    imageFiles.forEach((file) => data.append('images', file));

    addTrekMutation.mutate(data);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 4) {
      setToast({ show: true, message: 'You can upload a maximum of 4 images', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 5000);
      return;
    }
    const newFiles = [...imageFiles, ...files];
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    setErrors({ ...errors, images: '' });
  };

  // Remove an image
  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Handle form clear
  const handleClear = () => {
    if (
      Object.values(formData).some((value) => value) ||
      imageFiles.length > 0
    ) {
      if (window.confirm('Are you sure you want to clear all fields?')) {
        setFormData({
          name: '',
          difficulty: '',
          place: '',
          duration: '',
          overview: '',
          max_elevation: '',
          best_season: '',
          contact_number: '',
          contact_email: '',
          rating: '',
          reviews: '',
        });
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setImageFiles([]);
        setImagePreviews([]);
        setErrors({});
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-emerald-50 font-sans">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
                toast.type === 'success' ? 'bg-teal-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-6 py-12"
        >
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-teal-800 tracking-tight">
                Add New Trek
              </h2>
              <button
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Clear form"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-12" encType="multipart/form-data">
              {/* Trek Details */}
              <motion.div variants={childVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                  Trek Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Trek Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-4 text-lg border rounded-lg shadow-sm ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                      placeholder="Enter trek name"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <input
                      type="text"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                      placeholder="e.g., Easy, Moderate, Hard"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Place
                    </label>
                    <select
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                    >
                      <option value="">Select a place</option>
                      {placesLoading ? (
                        <option>Loading places...</option>
                      ) : (
                        places?.map((place) => (
                          <option key={place._id} value={place._id}>
                            {place.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                      placeholder="e.g., 5 days"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Overview
                  </label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                    rows="5"
                    placeholder="Describe the trek..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Max Elevation
                    </label>
                    <input
                      type="text"
                      name="max_elevation"
                      value={formData.max_elevation}
                      onChange={handleChange}
                      className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                      placeholder="e.g., 4000m"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Best Season
                    </label>
                    <input
                      type="text"
                      name="best_season"
                      value={formData.best_season}
                      onChange={handleChange}
                      className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                      placeholder="e.g., Spring, Autumn"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={childVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleChange}
                      className={`w-full p-4 text-lg border rounded-lg shadow-sm ${
                        errors.contact_number ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                      placeholder="Enter contact number"
                      aria-invalid={errors.contact_number ? 'true' : 'false'}
                    />
                    {errors.contact_number && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.contact_number}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contact_email"
                      value={formData.contact_email}
                      onChange={handleChange}
                      className={`w-full p-4 text-lg border rounded-lg shadow-sm ${
                        errors.contact_email ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                      placeholder="Enter contact email"
                      aria-invalid={errors.contact_email ? 'true' : 'false'}
                    />
                    {errors.contact_email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.contact_email}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Rating and Reviews */}
              <motion.div variants={childVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                  Rating & Reviews
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className={`w-full p-4 text-lg border rounded-lg shadow-sm ${
                        errors.rating ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="e.g., 4.5"
                      aria-invalid={errors.rating ? 'true' : 'false'}
                    />
                    {errors.rating && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.rating}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Reviews
                    </label>
                    <input
                      type="number"
                      name="reviews"
                      value={formData.reviews}
                      onChange={handleChange}
                      className={`w-full p-4 text-lg border rounded-lg shadow-sm ${
                        errors.reviews ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                      min="0"
                      placeholder="e.g., 100"
                      aria-invalid={errors.reviews ? 'true' : 'false'}
                    />
                    {errors.reviews && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.reviews}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Images */}
              <motion.div variants={childVariants} className="space-y-6">
                <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                  Trek Images (Up to 4)
                </h3>
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="w-full p-4 text-lg border border-gray-200 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all duration-200"
                    />
                    {errors.images && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.images}
                      </p>
                    )}
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`preview-${index}`}
                            className="h-24 w-24 object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Submit Buttons */}
              <motion.div
                variants={childVariants}
                className="flex justify-end gap-4 pt-6 border-t border-gray-200"
              >
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addTrekMutation.isLoading}
                  className="px-6 py-3 bg-emerald-500 text-gray-500 rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-400"
                >
                  {addTrekMutation.isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                      ></path>
                    </svg>
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  Add Trek
                </button>
              </motion.div>
            </form>
          </div>
        </motion.main>
      </div>
    </Layout>
  );
};

export default AddTrek;