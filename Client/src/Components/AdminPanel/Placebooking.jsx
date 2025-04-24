import React from 'react';
import Layout from './Layout';

const bookings = [
  {
    id: 1,
    customer: 'John Doe',
    destination: 'Bali',
    email: 'john@example.com',
    date: '2025-05-01',
    seats: 2,
    status: 'Confirmed'
  },
  {
    id: 2,
    customer: 'Sita Sharma',
    destination: 'Dubai',
    email: 'sita@example.com',
    date: '2025-06-15',
    seats: 1,
    status: 'Pending'
  }
];

const Placebooking = () => (
  <Layout>
    <h1 className="text-3xl font-bold mb-6">📚 Booking Records</h1>
    <div className="overflow-auto rounded-lg shadow bg-white">
      <table className="w-full text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-4">Customer</th>
            <th className="p-4">Destination</th>
            <th className="p-4">Email</th>
            <th className="p-4">Date</th>
            <th className="p-4">Seats</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{b.customer}</td>
              <td className="p-4">{b.destination}</td>
              <td className="p-4">{b.email}</td>
              <td className="p-4">{b.date}</td>
              <td className="p-4">{b.seats}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${b.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Layout>
);

export default Placebooking;
