import React from "react";
import { FeatureSteps } from "../components/ui/feature-section";

const features = [
  {
    step: "Step 1",
    title: "Browse Available Rooms",
    content: "Explore our collection of premium conference rooms with real-time availability status and detailed amenities.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    step: "Step 2",
    title: "Select Your Time Slot",
    content: "Choose your preferred date and time using our intuitive calendar interface with instant availability checking.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  },
  {
    step: "Step 3",
    title: "Confirm Your Booking",
    content: "Review your selection and submit your booking request. Get instant confirmation and calendar invites.",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80",
  },
  {
    step: "Step 4",
    title: "Enjoy Your Meeting",
    content: "Access your booked room with all amenities ready. Professional space designed for productivity.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
  },
];

export default function FeatureDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Roomify Booking Process
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Book your perfect meeting space in just a few simple steps
          </p>
        </div>
      </div>

      {/* Feature Steps Component */}
      <FeatureSteps
        features={features}
        title="How to Book a Room"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
        className="bg-white"
      />

      {/* Additional Info Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
            <p className="text-gray-600">
              Get immediate confirmation for your room reservations with our
              automated system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Availability</h3>
            <p className="text-gray-600">
              See live room availability and avoid double bookings with our
              smart scheduling system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Access</h3>
            <p className="text-gray-600">
              Book rooms anytime, anywhere with our always-available online
              platform.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Roomify for their
            meeting space needs.
          </p>
          <button
            onClick={() => (window.location.href = "/rooms")}
            className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Browse Available Rooms
          </button>
        </div>
      </div>
    </div>
  );
}
