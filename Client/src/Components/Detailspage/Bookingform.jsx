import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building, CreditCard, DollarSign } from "lucide-react";

// Mock data (replace with API call in production)
const trekkingSpots = [
  {
    id: 1,
    name: "Annapurna Circuit",
    duration: "12-18 days",
    price: 1200,
  },
];

// Utility function to fetch trek data
const getTrekkingData = (id) => {
  return trekkingSpots.find((spot) => spot.id === Number(id)) || trekkingSpots[0];
};

export default function BookingFormPage() {
  const { id } = useParams();
  const trek = getTrekkingData(id);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: "",
    groupSize: "2",
    specialRequirements: "",
    paymentMethod: "creditCard",
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      console.log("Booking submitted:", formData);
      alert("Booking successful! We will contact you shortly to confirm your trek.");
      setBookingStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        startDate: "",
        groupSize: "2",
        specialRequirements: "",
        paymentMethod: "creditCard",
      });
    }
  };

  const handleBookingBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-[600px] w-full">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            to={`reusabledetails`}
            className="flex items-center gap-2 text-sky-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Trek Details</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-sky-800 mb-2">Book Your Trek</h2>
        <p className="text-gray-500 mb-4">{trek.name} - ${trek.price} per person</p>

        <div className="py-4">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= i ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {i}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  {i === 1 ? "Personal Info" : i === 2 ? "Trip Details" : "Payment"}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleBookingSubmit}>
            {bookingStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleBookingChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleBookingChange}
                      required
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleBookingChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleBookingChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Preferred Start Date</label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleBookingChange}
                    required
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700">Group Size</label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleBookingChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-5">3-5 People</option>
                    <option value="6-10">6-10 People</option>
                    <option value="10+">10+ People</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">Special Requirements</label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleBookingChange}
                    placeholder="Dietary restrictions, medical conditions, etc."
                    className="w-full p-2 border rounded-md h-24"
                  />
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-6">
                <div className="bg-sky-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-sky-800 mb-2">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Trek:</span>
                      <span className="font-medium">{trek.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{trek.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span className="font-medium">{formData.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Group Size:</span>
                      <span className="font-medium">{formData.groupSize}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base mt-4">
                      <span>Total Price:</span>
                      <span className="text-emerald-600">${trek.price}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="block text-sm font-medium text-gray-700">Payment Method</span>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={formData.paymentMethod === "creditCard"}
                        onChange={handleBookingChange}
                      />
                      <span className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" /> Credit Card
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleBookingChange}
                      />
                      <span className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" /> PayPal
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={formData.paymentMethod === "bankTransfer"}
                        onChange={handleBookingChange}
                      />
                      <span className="flex items-center gap-2">
                        <Building className="h-4 w-4" /> Bank Transfer
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {bookingStep > 1 ? (
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={handleBookingBack}
                >
                  Back
                </button>
              ) : (
                <Link
                  to={`/trekking/${trek.id}`}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Link>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
              >
                {bookingStep < 3 ? "Continue" : "Complete Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}