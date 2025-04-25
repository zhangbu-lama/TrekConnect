import React, { useState } from "react";
import useLocationStore from "../Store/useLocationStore";
import Layout from "./Layout";
import rock from '../../assets/rock.png'

const AdminPanel = () => {
  const setNewLocation = useLocationStore((state) => state.setNewLocation);
  const locations = useLocationStore((state) => state.locations);
  const deleteLocation = useLocationStore((state) => state.deleteLocation);
  const updateLocation = useLocationStore((state) => state.updateLocation);

  const [form, setForm] = useState({ name: "", lat: "", lng: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLoc = {
        id: Date.now(),
        name: form.name,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        markerType: "stone", 
        icon: {rock} 
      };
      
    setNewLocation(newLoc);
    setForm({ name: "", lat: "", lng: "" });
  };

  const handleDelete = (id) => {
    deleteLocation(id);
  };

  const handleUpdate = (id) => {
    const updatedLoc = {
      name: prompt("Enter new name for the stone:"),
      lat: parseFloat(prompt("Enter new latitude:")),
      lng: parseFloat(prompt("Enter new longitude:")),
    };
    updateLocation(id, updatedLoc);
  };

  return (
    <Layout>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-teal-700 text-center mb-6">Add New Stone Marker</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stone Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sacred Rock"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                name="lat"
                value={form.lat}
                onChange={handleChange}
                placeholder="e.g. 27.700"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                name="lng"
                value={form.lng}
                onChange={handleChange}
                placeholder="e.g. 85.300"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
            >
              ➕ Add Stone Marker
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl text-center mb-4">Manage Stone Markers</h3>
        <ul>
          {locations.map((location) => (
            <li key={location.id} className="flex justify-between items-center mb-4">
              <span>{location.name}</span>
              <div>
                <button
                  onClick={() => handleUpdate(location.id)}
                  className="bg-teal-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default AdminPanel;
