import React from 'react';
import Layout from './Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const bookingData = [
  { month: 'Jan', bookings: 30 },
  { month: 'Feb', bookings: 45 },
  { month: 'Mar', bookings: 38 },
  { month: 'Apr', bookings: 60 },
  { month: 'May', bookings: 75 },
];

const Dashboard = () => (
  <Layout>
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>
      <p className="text-gray-600 mt-2">Here's a quick look at monthly booking trends.</p>
    </div>

    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Bookings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bookingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bookings" fill="#3B82F6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Layout>
);

export default Dashboard;
