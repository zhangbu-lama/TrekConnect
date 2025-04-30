import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/Index';
import { fetchPlaces } from '../api/Place';

const AddTrek = () => {
  const queryClient = useQueryClient();

  // Initial form state based on trekSchema
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

  // State for storing selected image files (up to 4)
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch places for the dropdown
  const { data: places, isLoading: placesLoading } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });

  // Mutation for adding a trek
  const addTrekMutation = useMutation({
    mutationFn: (formData) => axiosInstance.post('/treks/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['details'] });
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
      setImageFiles([]);
      alert('Trek added successfully!');
    },
    onError: (error) => {
      alert('Error adding trek: ' + error.message);
    },
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
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

    // Create FormData object to send both text fields and files
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

    // Append image files to FormData
    imageFiles.forEach((file, index) => {
      data.append('images', file);
    });

    addTrekMutation.mutate(data);
  };

  // Handle input changes for text fields
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
      setErrors({ ...errors, images: 'You can upload a maximum of 4 images' });
      return;
    }
    setImageFiles([...imageFiles, ...files]);
    setErrors({ ...errors, images: '' });
  };

  // Remove an image from the selected files
  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Trek</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700">Trek Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter trek name"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <input
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Easy, Moderate, Hard"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Place</label>
            <select
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 5 days"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Describe the trek"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Max Elevation</label>
            <input
              type="text"
              name="max_elevation"
              value={formData.max_elevation}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 4000m"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Best Season</label>
            <input
              type="text"
              name="best_season"
              value={formData.best_season}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Spring, Autumn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.contact_number ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter contact number"
            />
            {errors.contact_number && <p className="mt-1 text-sm text-red-500">{errors.contact_number}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.contact_email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter contact email"
            />
            {errors.contact_email && <p className="mt-1 text-sm text-red-500">{errors.contact_email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              step="0.1"
              min="0"
              max="5"
              placeholder="e.g., 4.5"
            />
            {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Reviews</label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.reviews ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              min="0"
              placeholder="e.g., 100"
            />
            {errors.reviews && <p className="mt-1 text-sm text-red-500">{errors.reviews}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Images (Upload up to 4 images)</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
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
                setImageFiles([]);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={addTrekMutation.isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${addTrekMutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {addTrekMutation.isLoading ? 'Adding...' : 'Add Trek'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrek;