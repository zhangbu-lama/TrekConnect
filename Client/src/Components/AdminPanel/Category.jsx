import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Edit, Trash2, Plus, X, Save, AlertCircle, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import {
  useCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../Hooks/useCategory';
import useCategoryStore from '../Store/CategoryStore';
import Layout from './Layout';
import { baseAPIurl } from '../../constant';

const CategoryAdminPanel = () => {
  const { data: categories, isLoading } = useCategories();
// API Configuration
const BASE_URL = 'http://localhost:8000/api';

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

const toastVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const CategoryAdminPanel = () => {
  const { data: categories, isLoading, error, refetch } = useCategories();
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name || '',
        description: selectedCategory.description || '',
        image: null,
      });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

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
      setImagePreview(selectedCategory.image ? `${baseAPIurl}/uploads/${selectedCategory.image}` : '');
      setIsModalOpen(true);
    } else {
      reset();
      setImagePreview('');
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    if (selectedCategory) {
      updateCategoryMutation.mutate({ id: selectedCategory.id, data });
  // Handle mutation feedback
  useEffect(() => {
    if (addCategoryMutation.isSuccess) {
      setToast({ show: true, message: 'Category added successfully!', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
    if (addCategoryMutation.isError) {
      setToast({ show: true, message: `Failed to add category: ${addCategoryMutation.error.message}`, type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 5000);
    }
    if (updateCategoryMutation.isSuccess) {
      setToast({ show: true, message: 'Category updated successfully!', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
    if (updateCategoryMutation.isError) {
      setToast({ show: true, message: `Failed to update category: ${updateCategoryMutation.error.message}`, type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 5000);
    }
    if (deleteCategoryMutation.isSuccess) {
      setToast({ show: true, message: 'Category deleted successfully!', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    }
    if (deleteCategoryMutation.isError) {
      setToast({ show: true, message: `Failed to delete category: ${deleteCategoryMutation.error.message}`, type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 5000);
    }
  }, [
    addCategoryMutation.isSuccess,
    addCategoryMutation.isError,
    updateCategoryMutation.isSuccess,
    updateCategoryMutation.isError,
    deleteCategoryMutation.isSuccess,
    deleteCategoryMutation.isError,
    addCategoryMutation.error,
    updateCategoryMutation.error,
    deleteCategoryMutation.error,
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
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
      addCategoryMutation.mutate(data);
    }

    setFormData({ name: '', description: '', image: null });
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

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Category Admin Panel</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-lg shadow space-y-4"
        >
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
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

        {/* Header */}
        <motion.header
          className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 py-8 px-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold text-zinc-600">
              Category Management
            </h1>
            <button
              onClick={() => {
                reset();
                setImagePreview('');
                setSelectedCategory(null);
                setIsModalOpen(true);
              }}
              className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 shadow-md"
            >
              <Plus className="h-5 w-5" />
              Add Category
            </button>
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {selectedCategory ? 'Update Category' : 'Add Category'}
          </button>
        </form>

        {/* Category List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Categories</h2>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {categories?.map((cat) => (
                <li
                  key={cat.id}
                  className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">{cat.name}</h3>
                    <p className="text-sm text-gray-600">{cat.description}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="h-12 w-12 text-teal-500 animate-spin mx-auto" />
              <p className="text-lg font-medium text-gray-600 mt-4">Loading categories...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-16 bg-red-50 rounded-lg p-6">
              <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-full flex items-center gap-2 hover:bg-teal-600 transition-all duration-200"
              >
                <RefreshCw className="h-5 w-5" />
                Retry
              </button>
            </div>
          )}
          {!isLoading && !error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-100"
            >
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800">
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Description</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Image</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.length > 0 ? (
                    categories.map((category) => (
                      <motion.tr
                        key={category._id}
                        variants={childVariants}
                        className="border-b border-gray-100 hover:bg-teal-50/30 transition-colors duration-150"
                      >
                        <td className="py-4 px-6 font-medium text-gray-800">{category.name}</td>
                        <td className="py-4 px-6 text-gray-600">{category.description}</td>
                        <td className="py-4 px-6">
                          {category.image ? (
                            <img
                              src={`${baseAPIurl}/uploads/${category.image}`}
                              alt={category.name}
                              className="h-10 w-10 object-cover rounded-md"
                            />
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="py-4 px-6 flex gap-3">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-teal-600 hover:text-teal-800 transition-colors duration-200"
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-gray-500 text-lg">
                        No categories found. Add a new category to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
              className="bg-gray-50 rounded-2xl p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-teal-800 tracking-tight">
                  {selectedCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>
              <form id="category-form" onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">Category Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('name', { required: 'Category name is required' })}
                        className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                        placeholder="Enter category name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                      rows="5"
                      placeholder="Describe the category..."
                      aria-invalid={errors.description ? 'true' : 'false'}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">Category Image</h3>
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Image (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full p-4 text-lg border border-gray-200 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all duration-200"
                          aria-label="Upload category image"
                        />
                      </div>
                    </div>
                    {imagePreview && (
                      <div className="relative flex items-center gap-3">
                        <img
                          src={`${baseAPIurl}/uploads/${selectedCategory?.image}` }
                          alt="Category Image Preview"
                          className="h-24 w-24 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex flex-col gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              if (imagePreview && imagePreview.startsWith('blob:')) {
                                URL.revokeObjectURL(imagePreview);
                              }
                              setImagePreview('');
                              setValue('image', null);
                            }}
                            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            form="category-form"
                            className="px-4 py-2 bg-teal-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-teal-600 transition-all duration-200 disabled:bg-teal-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-400"
                            disabled={addCategoryMutation.isLoading || updateCategoryMutation.isLoading}
                          >
                            {addCategoryMutation.isLoading || updateCategoryMutation.isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4" />
                            )}
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                    aria-label="Cancel form"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-400"
                    disabled={addCategoryMutation.isLoading || updateCategoryMutation.isLoading}
                    aria-label={selectedCategory ? 'Update category' : 'Add category'}
                  >
                    {addCategoryMutation.isLoading || updateCategoryMutation.isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    {selectedCategory ? 'Update Category' : 'Add Category'}
                  </button>
                  <button
                    type="submit"
                    form="category-form"
                    className="px-10 py-4 bg-teal-500 text-gray-600 rounded-full font-bold flex items-center gap-2 hover:bg-teal-600 hover:scale-105 transition-all duration-200 disabled:bg-teal-300 disabled:cursor-not-allowed shadow-lg focus:ring-2 focus:ring-teal-400"
                    disabled={addCategoryMutation.isLoading || updateCategoryMutation.isLoading}
                    aria-label="Confirm submission"
                  >
                    {addCategoryMutation.isLoading || updateCategoryMutation.isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                    Confirm
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
                    <h3 className="text-lg font-semibold text-teal-800">Confirm Cancel</h3>
                    <p className="text-gray-600 mt-2">Are you sure you want to cancel? All unsaved changes will be lost.</p>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
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
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 focus:ring-2 focus:ring-red-400"
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
