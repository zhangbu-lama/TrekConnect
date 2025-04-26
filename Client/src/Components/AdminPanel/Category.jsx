import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Edit, Trash2, Plus, X, Save, AlertCircle, Loader2 } from 'lucide-react';
import {
  useCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../Hooks/useCategory';
import useCategoryStore from '../Store/CategoryStore';
import Layout from './Layout';
import { baseAPIurl } from '../../constant';

// API Configuration (Assuming similar to AdminPanel)
const BASE_URL = 'http://127.0.0.1:8000';

// Animation Variants (Copied from AdminPanel)
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

const CategoryAdminPanel = () => {
  const { data: categories, isLoading, error } = useCategories();
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      image: null,
    },
  });

  // Sync form with selectedCategory
  useEffect(() => {
    if (selectedCategory) {
      setValue('name', selectedCategory.name || '');
      setValue('description', selectedCategory.description || '');
      setValue('image', null);
      setImagePreview(selectedCategory.image ? `${BASE_URL}${selectedCategory.image}` : '');
      setIsModalOpen(true);
    } else {
      reset();
      setImagePreview('');
    }
  }, [selectedCategory, setValue, reset]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('image', file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image) formData.append('category_image', data.image);

    if (selectedCategory) {
      updateCategoryMutation.mutate({ _id: selectedCategory._id, data: formData });
    } else {
      addCategoryMutation.mutate(formData);
    }

    setIsModalOpen(false);
    reset();
    setImagePreview('');
    setSelectedCategory(null);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      setIsModalOpen(false);
      reset();
      setSelectedCategory(null);
      setImagePreview('');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-emerald-50 font-sans">
        {/* Header */}
        <motion.header
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-500 py-8 px-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
            <h1 className="text-4xl font-extrabold text-gray-500 tracking-tight">
            Category Management Dashboard
              </h1>
            </div>
            <button
              onClick={() => {
                reset();
                setImagePreview('');
                setSelectedCategory(null);
                setIsModalOpen(true);
              }}
              className="bg-white text-emerald-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-md"
            >
              <Plus className="h-5 w-5" />
              Add New Category
            </button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto" />
              <p className="text-lg font-medium text-gray-600 mt-4">Loading categories...</p>
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
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-sky-100 to-emerald-50 text-sky-800">
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Description</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <motion.tr
                      key={category.id}
                      variants={childVariants}
                      className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
                      <td className="py-4 px-6 text-gray-600">{category.description}</td>
                      <td className="py-4 px-6 flex gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-sky-600 hover:text-sky-800 transition-colors duration-200"
                          title="Edit Category"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Delete Category"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {categories?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No categories found. Add a new category to get started!</p>
                </div>
              )}
            </motion.div>
          )}
        </main>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-sky-800 tracking-tight">
                  {selectedCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Category Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name <span className="text-red-500">*</span>
                        <span className="ml-2 text-gray-400" title="Enter the name of the category">
                          <AlertCircle className="h-4 w-4 inline" />
                        </span>
                      </label>
                      <input
                        {...register('name', { required: 'Category name is required' })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., Adventure Trek"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      className={`w-full p-3 border rounded-lg shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                      rows="4"
                      placeholder="Briefly describe the category..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Image</h3>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Image (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full p-3 border rounded-lg shadow-sm border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all duration-200"
                        />
                      </div>
                    </div>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={`${baseAPIurl}/${selectedCategory.image}` }
                          alt="Category Image Preview"
                          className="h-20 w-20 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setValue('image', null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
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
                    className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                    disabled={addCategoryMutation.isLoading || updateCategoryMutation.isLoading}
                  >
                    {addCategoryMutation.isLoading || updateCategoryMutation.isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    {selectedCategory ? 'Update Category' : 'Add Category'}
                  </button>
                </div>
              </form>

              {/* Cancel Confirmation Dialog */}
              {showCancelConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                  >
                    <h3 className="text-lg font-semibold text-sky-800">Confirm Cancel</h3>
                    <p className="text-gray-600 mt-2">Are you sure you want to cancel? All unsaved changes will be lost.</p>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200"
                      >
                        Stay
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          reset();
                          setSelectedCategory(null);
                          setImagePreview('');
                          setShowCancelConfirm(false);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                      >
                        Confirm Cancel
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryAdminPanel;
