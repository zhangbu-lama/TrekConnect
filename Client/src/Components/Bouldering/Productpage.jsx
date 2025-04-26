import React, { useState } from "react";
import useProductStore from "../Store/useProductstore";
import { Link } from "react-router-dom";

const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

export default function ProductShowcase() {
  const { products } = useProductStore();
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (productId) => {
    console.error(`Image failed to load for product ID: ${productId}`);
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 flex items-center">
          <span className="mr-3 text-4xl">🧗‍♂️</span> Book Your Gears
        </h2>

        {products.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No products available. Please check again later!
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col max-w-[270px] mx-auto border border-gray-100"
              >
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                  <img
                    src={
                      imageErrors[product.id] || !product.imageUrl
                        ? placeholderImage
                        : product.imageUrl
                    }
                    alt={product.name || "Product"}
                    className="h-full w-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-110"
                    onError={() => handleImageError(product.id)}
                    onLoad={() => console.log(`Image loaded for product ID: ${product.id}`)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition duration-300 pointer-events-none rounded-t-2xl" />
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title || "Untitled Product"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {product.name || "No Name"}
                  </p>
                  <p className="text-blue-600 font-bold text-lg mt-2">
                    Rs. {product.price || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Expires:{" "}
                    {product.expiresAt
                      ? new Date(product.expiresAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <div className="flex-grow" />

                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 text-sm rounded-lg transition-all duration-300">
                    <Link to={`/bookproduct/${product.id}`} className="flex items-center justify-center">
                      <span>📦</span>
                      <span className="ml-2">View Details</span>
                    </Link>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
