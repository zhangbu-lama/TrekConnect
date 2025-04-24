import React from 'react';
import Layout from './Layout';

const AddDetails = () => (
  <Layout>
    <h1 className="text-3xl font-bold mb-6">📝 Add Travel Details</h1>
    <form className="space-y-6 max-w-2xl bg-white p-8 shadow rounded-lg">
      <div>
        <label className="block font-medium mb-2">Destination Name</label>
        <input type="text" className="w-full border p-3 rounded" placeholder="e.g. Maldives" required />
      </div>

      <div>
        <label className="block font-medium mb-2">Description</label>
        <textarea className="w-full border p-3 rounded" rows="4" placeholder="Describe the travel experience..." required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">Price per Person ($)</label>
          <input type="number" className="w-full border p-3 rounded" placeholder="e.g. 1200" required />
        </div>
        <div>
          <label className="block font-medium mb-2">Available Seats</label>
          <input type="number" className="w-full border p-3 rounded" placeholder="e.g. 20" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">Start Date</label>
          <input type="date" className="w-full border p-3 rounded" required />
        </div>
        <div>
          <label className="block font-medium mb-2">End Date</label>
          <input type="date" className="w-full border p-3 rounded" required />
        </div>
      </div>

      <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
        Save Details
      </button>
    </form>
  </Layout>
);

export default AddDetails;
