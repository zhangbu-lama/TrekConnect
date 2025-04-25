import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useProductStore from "../Store/useProductstore";
import Layout from "./Layout";
import React from "react";
import { Menu, X } from "lucide-react";

export default function AdminPanel() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [form, setForm] = useState({
    title: "",
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    duration: 24,
  });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expiresAt = new Date(Date.now() + form.duration * 60 * 60 * 1000).toISOString();
    const product = {
      ...form,
      id: editingId || uuidv4(),
      expiresAt,
    };

    editingId ? updateProduct(editingId, product) : addProduct(product);
    setForm({ title: "", name: "", price: "", imageUrl: "", description: "", duration: 24 });
    setEditingId(null);
    setImagePreview(null);
  };

  const startEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    setImagePreview(product.imageUrl);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setForm({ ...form, imageUrl: previewUrl });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}


        {/* Main Content */}
        <main className="flex-1 p-6 md:pl-72">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden p-2 bg-teal-600 text-white rounded-xl mb-6"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-teal-800 mb-8 flex items-center">
              <span className="mr-2">🛠️</span> Product Management
            </h2>

            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-teal-800 mb-6">
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Premium Widget"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Widget Pro"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="e.g. 999"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (hrs)
                    </label>
                    <input
                      type="number"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="e.g. 24"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Enter product description"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors h-32 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-600"
                    />
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => {
                        setForm({ ...form, imageUrl: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="Or enter image URL"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 h-40 w-full object-cover rounded-xl"
                      />
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300"
                  >
                    {editingId ? "Update Product" : "➕ Add Product"}
                  </button>
                </div>
              </form>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-teal-800 mb-6">Manage Products</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-48 w-full object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-lg font-semibold text-teal-800">{product.title}</h3>
                    <p className="text-gray-600">{product.name}</p>
                    <p className="text-teal-600 font-bold mt-2">Rs. {product.price}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Expires: {new Date(product.expiresAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{product.description}</p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => startEdit(product)}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}