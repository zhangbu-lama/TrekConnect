import { useState } from 'react';
import { usePlaces, useAddPlace, useUpdatePlace, useDeletePlace } from '../Hooks/usePlace';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import Layout from './Layout';
import React from 'react';

const initialState = {
  name: '',
  location: '',
  description: '',
  category: '',
  timetotravel: '',
  image: null,
};

const PlacesPage = () => {
  const { data: places, isLoading } = usePlaces();
  const addPlace = useAddPlace();
  const updatePlace = useUpdatePlace();
  const deletePlace = useDeletePlace();
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);

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
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    if (editingId) {
      updatePlace.mutate({ id: editingId, data }, {
        onSuccess: () => {
          setFormData(initialState);
          setEditingId(null);
        },
      });
    } else {
      addPlace.mutate(data, {
        onSuccess: () => setFormData(initialState),
      });
    }
  };

  const handleEdit = (place) => {
    setFormData(place);
    setEditingId(place.id);
  };

  const handleDelete = (id) => {
    deletePlace.mutate(id);
  };

  return (
    <>
      <Layout>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">🏞️ Explore & Manage Places</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Place Name"
                className="input"
                required
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="input"
                required
              />
              <input
                name="timetotravel"
                value={formData.timetotravel}
                onChange={handleChange}
                placeholder="Time to Travel"
                className="input"
                required
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category ID"
                className="input"
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="input"
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="input w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            >
              {editingId ? 'Update Place' : 'Add Place'}
            </button>
          </form>

          {/* List */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {isLoading ? (
              <p className="col-span-full text-center">Loading...</p>
            ) : (
              places?.map((place) => (
                <motion.div
                  key={place.id}
                  className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  {place.image && (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-blue-700">{place.name}</h3>
                  <p className="text-sm text-gray-600">{place.location}</p>
                  <p className="mt-2 text-sm">{place.description}</p>
                  <p className="mt-2 text-green-600 font-medium">{place.timetotravel}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(place)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(place.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PlacesPage;
