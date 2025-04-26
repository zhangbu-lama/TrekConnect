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

const summaryCards = [
  { title: 'Total Bookings', value: 248, icon: '📦' },
  { title: 'New Users', value: 53, icon: '👥' },
  { title: 'Revenue', value: '$4,230', icon: '💰' },
];

const latestBookings = [
  { user: 'Bibek Pandey', date: 'Apr 24, 2025', package: 'Annapurna Circuit', status: 'Confirmed' },
  { user: 'Nishan Shrestha', date: 'Apr 23, 2025', package: 'Everest Base Camp', status: 'Pending' },
  { user: 'Sita Thapa', date: 'Apr 22, 2025', package: 'Gokyo Lakes', status: 'Confirmed' },
];

const Dashboard = () => (
  <Layout>
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>
      <p className="text-gray-600 mt-2">Here's a quick look at monthly booking trends and recent activity.</p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {summaryCards.map((card, index) => (
        <div key={index} className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <span className="mr-2 text-2xl">{card.icon}</span> {card.title}
          </h3>
          <p className="mt-2 text-2xl font-bold text-blue-600">{card.value}</p>
        </div>
      ))}
    </div>

    {/* Bar Chart */}
    <div className="bg-white shadow rounded p-6 mb-6">
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

    {/* Latest Bookings Table */}
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Latest Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Package</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {latestBookings.map((booking, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-sm">{booking.user}</td>
                <td className="px-4 py-2 text-sm">{booking.date}</td>
                <td className="px-4 py-2 text-sm">{booking.package}</td>
                <td
                  className={`px-4 py-2 text-sm font-medium ${
                    booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-500'
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
);

export default Dashboard;
