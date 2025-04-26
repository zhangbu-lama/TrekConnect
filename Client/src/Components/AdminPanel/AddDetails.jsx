import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Loader2, 
  Save, 
  MapPin, 
  Clock, 
  Mountain, 
  Thermometer,
  Tag,
  Globe
} from 'lucide-react';
import Layout from './Layout';
import { 
  useDetails, 
  useAddDetail, 
  useUpdateDetail, 
  useDeleteDetail 
} from '../Hooks/useDetails';
import { useCategories } from '../Hooks/useCategory';
import { usePlaces } from '../Hooks/usePlace';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesByCategory } from '../api/Category';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const TrekAdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch treks
  const { data: treks, isLoading, error } = useDetails();

  // Fetch categories and places
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: allPlaces, isLoading: isLoadingPlaces } = usePlaces();

  // Fetch places filtered by selected category
  const { data: filteredPlaces, isLoading: isLoadingFilteredPlaces } = useQuery({
    queryKey: ['places', selectedCategory],
    queryFn: () => fetchPlacesByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });

  // Mutations
  const addDetailMutation = useAddDetail();
  const updateDetailMutation = useUpdateDetail();
  const deleteDetailMutation = useDeleteDetail();

  // Form setup
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();

  // Watch for category changes to update filtered places
  const watchedCategory = watch('category');

  useEffect(() => {
    if (watchedCategory) {
      setSelectedCategory(watchedCategory);
    }
  }, [watchedCategory]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key.startsWith('image') && data[key] && data[key][0]) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    if (editingId) {
      updateDetailMutation.mutate({ id: editingId, data: formData });
    } else {
      addDetailMutation.mutate(formData);
    }

    setIsModalOpen(false);
    setEditingId(null);
    setSelectedCategory('');
    reset();
  };

  const handleEdit = (trek) => {
    setEditingId(trek.id);
    setIsModalOpen(true);
    Object.keys(trek).forEach(key => {
      if (!key.startsWith('image')) {
        setValue(key, trek[key]);
      }
    });
    // Pre-select category and fetch filtered places
    if (trek.category) {
      setSelectedCategory(trek.category);
      setValue('category', trek.category);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trek?')) {
      deleteDetailMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setSelectedCategory('');
    reset();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Main Content Wrapper */}
        <div className="md:pl-64">
          {/* Header */}
          <motion.header
            className="bg-white/90 backdrop-blur-md border-b border-gray-100/50 py-6 px-4 shadow-md sticky top-0 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Trek Management Dashboard
              </h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-teal-500 text-gray-900 font-semibold py-2 px-5 rounded-full flex items-center gap-2 hover:bg-teal-600 transition-all duration-200 shadow-md"
              >
                <Plus className="h-5 w-5" />
                Add New Trek
              </button>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-12">
            {isLoading && (
              <div className="text-center py-16">
                <Loader2 className="h-12 w-12 text-teal-500 animate-spin mx-auto" />
                <p className="text-lg font-medium text-gray-600 mt-4">Loading treks...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-16 bg-red-50 rounded-lg p-6">
                <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>
              </div>
            )}
            {!isLoading && !error && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Category</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Place</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Duration</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Max Elevation</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Best Season</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Difficulty</th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treks?.map((trek) => (
                      <motion.tr
                        key={trek.id}
                        variants={childVariants}
                        className="border-b border-gray-100 hover:bg-teal-50/30 transition-colors duration-150"
                      >
                        <td className="py-4 px-6 font-medium text-gray-800">{trek.name}</td>
                        <td className="py-4 px-6 text-gray-600">{trek.category_name || 'N/A'}</td>
                        <td className="py-4 px-6 text-gray-600">{trek.place_name || 'N/A'}</td>
                        <td className="py-4 px-6 text-gray-600">{trek.duration}</td>
                        <td className="py-4 px-6 text-gray-600">{trek.max_elevation}</td>
                        <td className="py-4 px-6 text-gray-600">{trek.best_season}</td>
                        <td className="py-4 px-6 text-gray-600">{trek.difficulty}</td>
                        <td className="py-4 px-6 flex gap-3">
                          <button
                            onClick={() => handleEdit(trek)}
                            className="text-teal-600 hover:text-teal-800 transition-colors duration-200"
                            title="Edit Trek"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(trek.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            title="Delete Trek"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                {(!treks || treks.length === 0) && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No treks available. Add a new trek to get started.</p>
                  </div>
                )}
              </motion.div>
            )}
          </main>
        </div>

        {/* Modal for Add/Edit Trek */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                    {editingId ? 'Edit Trek' : 'Add New Trek'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <X className="h-7 w-7" />
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Trek Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            {...register('category', { required: 'Category is required' })}
                            className={`w-full pl-10 p-3 border rounded-lg shadow-sm ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                          >
                            <option value="">Select a category</option>
                            {isLoadingCategories ? (
                              <option value="" disabled>Loading categories...</option>
                            ) : (
                              categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Place <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            {...register('place', { required: 'Place is required' })}
                            className={`w-full pl-10 p-3 border rounded-lg shadow-sm ${errors.place ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                            disabled={!selectedCategory || isLoadingFilteredPlaces}
                          >
                            <option value="">Select a place</option>
                            {isLoadingFilteredPlaces ? (
                              <option value="" disabled>Loading places...</option>
                            ) : (
                              filteredPlaces?.map((place) => (
                                <option key={place.id} value={place.id}>
                                  {place.name}
                                </option>
                              ))
                            )}
                          </select>
                        </div>
                        {errors.place && <p className="text-red-500 text-sm mt-1">{errors.place.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Trek Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('name', { required: 'Trek name is required' })}
                          className={`w-full p-3 border rounded-lg shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                          placeholder="e.g., Annapurna Base Camp"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating (1-5) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          {...register('rating', { required: 'Rating is required', min: 1, max: 5 })}
                          className={`w-full p-3 border rounded-lg shadow-sm ${errors.rating ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                          placeholder="e.g., 4.5"
                        />
                        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reviews Count <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          {...register('reviews', { required: 'Reviews count is required', min: 0 })}
                          className={`w-full p-3 border rounded-lg shadow-sm ${errors.reviews ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                          placeholder="e.g., 120"
                        />
                        {errors.reviews && <p className="text-red-500 text-sm mt-1">{errors.reviews.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register('duration', { required: 'Duration is required' })}
                            className={`w-full pl-10 p-3 border rounded-lg shadow-sm ${errors.duration ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                            placeholder="e.g., 10 days"
                          />
                        </div>
                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Elevation <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mountain className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register('max_elevation', { required: 'Max elevation is required' })}
                            className={`w-full pl-10 p-3 border rounded-lg shadow-sm ${errors.max_elevation ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                            placeholder="e.g., 4,130 m"
                          />
                        </div>
                        {errors.max_elevation && <p className="text-red-500 text-sm mt-1">{errors.max_elevation.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Best Season <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...register('best_season', { required: 'Best season is required' })}
                            className={`w-full pl-10 p-3 border rounded-lg shadow-sm ${errors.best_season ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                            placeholder="e.g., Spring (Mar-May)"
                          />
                        </div>
                        {errors.best_season && <p className="text-red-500 text-sm mt-1">{errors.best_season.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Difficulty <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('difficulty', { required: 'Difficulty is required' })}
                          className={`w-full p-3 border rounded-lg shadow-sm ${errors.difficulty ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                        >
                          <option value="">Select difficulty</option>
                          <option value="Easy">Easy</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Challenging">Challenging</option>
                        </select>
                        {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('contact_number', { required: 'Contact number is required' })}
                          className={`w-full p-3 border rounded-lg shadow-sm ${errors.contact_number ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                          placeholder="e.g., +977 123 456 7890"
                        />
                        {errors.contact_number && <p className="text-red-500 text-sm mt-1">{errors.contact_number.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          {...register('contact_email', { required: 'Contact email is required' })}
                          className={`w-full p-3 border rounded-lg shadow-sm ${errors.contact_email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                          placeholder="e.g., info@travelsphere.com"
                        />
                        {errors.contact_email && <p className="text-red-500 text-sm mt-1">{errors.contact_email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Overview <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('overview', { required: 'Overview is required' })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.overview ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                        rows="4"
                        placeholder="Describe the trek..."
                      />
                      {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {['image1', 'image2', 'image3', 'image4'].map((imageField, index) => (
                        <div key={imageField}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image {index + 1}
                          </label>
                          <input
                            type="file"
                            {...register(imageField)}
                            className="w-full p-3 border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-500 text-gray-900 rounded-full font-semibold flex items-center gap-2 hover:bg-teal-600 transition-all duration-200"
                      disabled={addDetailMutation.isLoading || updateDetailMutation.isLoading}
                    >
                      {addDetailMutation.isLoading || updateDetailMutation.isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Save className="h-5 w-5" />
                      )}
                      {editingId ? 'Update Trek' : 'Add Trek'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default TrekAdminPanel;