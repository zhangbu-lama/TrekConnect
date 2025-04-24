"use client";
import { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Mountain,
  Clock,
  Route,
  Loader2,
  Search,
  RefreshCw,
  Filter,
} from "lucide-react";
import React from "react";
import Layout from "./Layout";

export default function TrekkingAdminPanel() {
  const [trekkingSpots, setTrekkingSpots] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    difficulty: "",
    duration: "",
    distance: "",
    description: "",
    highlights: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  // Fetch all trekking spots on component mount
  useEffect(() => {
    fetchTrekkingSpots();
  }, []);

  // Fetch all trekking spots from API
  const fetchTrekkingSpots = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await fetch("/api/trekking-spots");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTrekkingSpots(data);
    } catch (err) {
      console.error("Failed to fetch trekking spots:", err);
      setError("Failed to load trekking spots. Please try again.");
      // For demonstration, adding sample data when API fails
      setTrekkingSpots([
        {
          id: "1",
          name: "Annapurna Circuit",
          image: "/api/placeholder/600/300",
          difficulty: "Moderate",
          duration: "12-15 days",
          distance: "160-230 km",
          description:
            "One of the most popular treks in Nepal, offering diverse landscapes and cultural experiences.",
          highlights: "Thorong La Pass, Mountain views, Local culture",
        },
        {
          id: "2",
          name: "Everest Base Camp",
          image: "/api/placeholder/600/300",
          difficulty: "Difficult",
          duration: "12-14 days",
          distance: "130 km",
          description:
            "Trek to the base of the world's highest mountain through Sherpa villages and breathtaking scenery.",
          highlights: "Mt. Everest views, Khumbu Glacier, Sherpa culture",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new trekking spot
  const createTrekkingSpot = async (spotData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await fetch("/api/trekking-spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(spotData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const newSpot = await response.json();

      // Update local state with the new spot from server
      setTrekkingSpots((prev) => [...prev, newSpot]);
      showNotification("Trekking spot added successfully!", "success");

      return true;
    } catch (err) {
      console.error("Failed to create trekking spot:", err);
      setError("Failed to add trekking spot. Please try again.");
      showNotification("Failed to add trekking spot", "error");

      // For demonstration, add spot locally when API fails
      const newSpot = { ...spotData, id: Date.now().toString() };
      setTrekkingSpots((prev) => [...prev, newSpot]);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing trekking spot
  const updateTrekkingSpot = async (id, spotData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await fetch(`/api/trekking-spots/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(spotData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const updatedSpot = await response.json();

      // Update local state with the updated spot
      setTrekkingSpots((prev) =>
        prev.map((spot) => (spot.id === id ? updatedSpot : spot))
      );
      showNotification("Trekking spot updated successfully!", "success");

      return true;
    } catch (err) {
      console.error("Failed to update trekking spot:", err);
      setError("Failed to update trekking spot. Please try again.");
      showNotification("Failed to update trekking spot", "error");

      // For demonstration, update spot locally when API fails
      setTrekkingSpots((prev) =>
        prev.map((spot, index) =>
          index === editIndex ? { ...spotData, id } : spot
        )
      );

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a trekking spot
  const deleteTrekkingSpot = async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await fetch(`/api/trekking-spots/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Remove the spot from local state
      setTrekkingSpots((prev) => prev.filter((spot) => spot.id !== id));
      showNotification("Trekking spot deleted successfully!", "success");

      return true;
    } catch (err) {
      console.error("Failed to delete trekking spot:", err);
      setError("Failed to delete trekking spot. Please try again.");
      showNotification("Failed to delete trekking spot", "error");

      // For demonstration, delete spot locally when API fails
      setTrekkingSpots((prev) => prev.filter((spot) => spot.id !== id));

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId !== null) {
      await updateTrekkingSpot(editId, formData);
      setEditId(null);
      setEditIndex(null);
    } else {
      await createTrekkingSpot(formData);
    }

    setFormData({
      name: "",
      image: "",
      difficulty: "",
      duration: "",
      distance: "",
      description: "",
      highlights: "",
    });
    setIsFormVisible(false);
  };

  const handleEdit = (index) => {
    const spot = trekkingSpots[index];
    setFormData({
      name: spot.name || "",
      image: spot.image || "",
      difficulty: spot.difficulty || "",
      duration: spot.duration || "",
      distance: spot.distance || "",
      description: spot.description || "",
      highlights: spot.highlights || "",
    });
    setEditIndex(index);
    setEditId(spot.id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trekking spot?"
    );
    if (confirmed) {
      await deleteTrekkingSpot(id);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      image: "",
      difficulty: "",
      duration: "",
      distance: "",
      description: "",
      highlights: "",
    });
    setEditIndex(null);
    setEditId(null);
    setIsFormVisible(false);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Helper function to get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    const level = difficulty?.toLowerCase() || "";
    if (level.includes("easy")) return "bg-green-100 text-green-800";
    if (level.includes("moderate") || level.includes("medium"))
      return "bg-yellow-100 text-yellow-800";
    if (level.includes("hard") || level.includes("difficult"))
      return "bg-red-100 text-red-800";
    return "bg-blue-100 text-blue-800";
  };

  // Filter spots based on search term and difficulty
  const filteredSpots = trekkingSpots.filter((spot) => {
    const matchesSearch =
      spot.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "" || spot.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="px-6 py-8 md:ml-64 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Notification */}
          {notification.show && (
            <div
              className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
                notification.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {notification.type === "success" ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{notification.message}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{notification.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Header with Add New Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Trekking Spots Management
            </h1>
            <div className="flex gap-3">
              <button
                onClick={fetchTrekkingSpots}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium p-2 rounded-xl flex items-center gap-1 transition-all"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              {!isFormVisible && (
                <button
                  onClick={() => setIsFormVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <span>Add New Spot</span>
                </button>
              )}
            </div>
          </div>

          {/* Form Section */}
          {isFormVisible && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 transition-all duration-300">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-blue-700 mb-6">
                  {editId !== null
                    ? "Edit Trekking Spot"
                    : "Add New Trekking Spot"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spot Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="e.g. Annapurna Circuit"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    >
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Difficult">Difficult</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="e.g. 5-7 days"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Distance
                    </label>
                    <input
                      type="text"
                      name="distance"
                      value={formData.distance}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="e.g. 75 km"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Provide a detailed description of the trekking spot..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highlights (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="highlights"
                      value={formData.highlights}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="e.g. Mountain views, Local culture, Alpine lakes"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow hover:shadow-md flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>
                        {editId !== null ? "Update Spot" : "Add Spot"}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search and Filter Section */}
          {trekkingSpots.length > 0 && !isFormVisible && (
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search trekking spots..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  >
                    <option value="">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !isFormVisible && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-600">
                Loading trekking spots...
              </span>
            </div>
          )}

          {/* Spots Display Section */}
          {!isLoading && filteredSpots.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {searchTerm || filterDifficulty
                    ? "Filtered Trekking Spots"
                    : "All Trekking Spots"}
                </h2>
                <span className="text-gray-500 text-sm">
                  Showing {filteredSpots.length} of {trekkingSpots.length} spots
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSpots.map((spot, index) => (
                  <div
                    key={spot.id || index}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition duration-300"
                  >
                    <div className="relative">
                      <img
                        src={spot.image || "/api/placeholder/600/300"}
                        alt={spot.name}
                        className="w-full h-52 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/600/300";
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            spot.difficulty
                          )}`}
                        >
                          {spot.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {spot.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {spot.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {spot.highlights &&
                            spot.highlights.split(",").map(
                              (highlight, i) =>
                                highlight.trim() && (
                                  <span
                                    key={i}
                                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                                  >
                                    {highlight.trim()}
                                  </span>
                                )
                            )}
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>{spot.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Route className="w-4 h-4 text-blue-600" />
                            <span>{spot.distance}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(spot.id || index, index)}
                          className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : !isLoading && trekkingSpots.length === 0 ? (
            !isFormVisible && (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
                <Mountain className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No Trekking Spots Added Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first trekking spot to get started
                </p>
                <button
                  onClick={() => setIsFormVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all"
                >
                  Add Your First Spot
                </button>
              </div>
            )
          ) : (
            !isLoading &&
            filteredSpots.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-sm">
                <Search className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No Matching Results
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterDifficulty("");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}
