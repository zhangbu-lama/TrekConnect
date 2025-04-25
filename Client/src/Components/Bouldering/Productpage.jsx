import React, { useState } from "react";
import useProductStore from "../Store/useProductstore";



// Placeholder image for when the product image fails to load
const placeholderImage = "https://via.placeholder.com/300x192?text=No+Image";

export default function ProductShowcase() {
  const { products } = useProductStore();
  // State to track image loading for each product
  const [imageErrors, setImageErrors] = useState({});

  // Handle image load errors by setting a fallback
  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-teal-800 mb-8 flex items-center">
            <span className="mr-2">🛍️</span> Product Showcase
          </h2>

          {products.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No products available. Add some products in the admin panel!
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={imageErrors[product.id] || !product.imageUrl ? placeholderImage : product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover rounded-xl"
                      onError={() => handleImageError(product.id)}
                      loading="lazy"
                    />
                    {/* Loading spinner (optional) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-xl animate-pulse" hidden={imageErrors[product.id] || product.imageUrl}>
                      <svg className="w-6 h-6 text-teal-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-teal-800">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.name}</p>
                  <p className="text-teal-600 font-bold text-lg mt-2">Rs. {product.price}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{product.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Expires: {new Date(product.expiresAt).toLocaleString()}
                  </p>
                  <button
                    className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-xl transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}