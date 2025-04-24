import React from 'react';
import Layout from './Layout';

const AddPage = () => (
  <Layout>
    <h1 className="text-3xl font-bold mb-6">➕ Create New Travel Page</h1>
    <form className="space-y-6 max-w-2xl bg-white p-8 shadow rounded-lg">
      <div>
        <label className="block font-medium mb-2">Page Title</label>
        <input type="text" className="w-full border p-3 rounded" placeholder="e.g. Summer in Switzerland" required />
      </div>

      <div>
        <label className="block font-medium mb-2">URL Slug</label>
        <input type="text" className="w-full border p-3 rounded" placeholder="e.g. summer-switzerland" required />
      </div>

      <div>
        <label className="block font-medium mb-2">Short Description</label>
        <textarea className="w-full border p-3 rounded" rows="3" placeholder="Write a short summary..." required />
      </div>

      <div>
        <label className="block font-medium mb-2">Cover Image URL</label>
        <input type="url" className="w-full border p-3 rounded" placeholder="https://..." required />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        Create Page
      </button>
    </form>
  </Layout>
);

export default AddPage;
