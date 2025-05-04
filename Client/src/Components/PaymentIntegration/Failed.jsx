import { XCircle } from 'lucide-react';
import React from 'react'

export default function Failed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <XCircle className="text-red-600 mx-auto mb-4" size={64} />
        <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong during the payment process. Please try again.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}
