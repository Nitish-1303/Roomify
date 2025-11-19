import React from "react";
import { AccordionFeatureSection } from "../components/ui/accordion-feature-section";

const roomifyFeatures = [
  {
    id: 1,
    title: "Real-Time Room Availability",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description:
      "Browse through available conference rooms with real-time availability status. Each room displays instant booking status, capacity, amenities, and location details. Simply select your preferred room and time slot to make a reservation.",
  },
  {
    id: 2,
    title: "Smart Scheduling System",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description:
      "Our intelligent scheduling system prevents double bookings and conflicts. Filter rooms by date, time, and capacity to find the perfect space. The calendar view shows availability at a glance with color-coded status indicators.",
  },
  {
    id: 3,
    title: "Advanced Analytics Dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description:
      "Track room utilization, booking patterns, and occupancy rates with comprehensive analytics. Generate detailed reports to optimize space usage and make data-driven decisions. Monitor trends and identify peak booking times.",
  },
  {
    id: 4,
    title: "Mobile-Friendly Interface",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    description:
      "Book rooms on-the-go with our fully responsive mobile interface. Access all features from any device - desktop, tablet, or smartphone. Receive instant notifications and manage bookings from anywhere.",
  },
  {
    id: 5,
    title: "Automated Notifications",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    description:
      "Stay informed with automated email and in-app notifications. Get reminders before meetings, booking confirmations, and status updates. Never miss an important meeting with our smart notification system.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powerful Features for Modern Workspaces
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage conference rooms efficiently. From real-time
            availability to advanced analytics, Roomify has you covered.
          </p>
        </div>
      </div>

      {/* Feature Accordion Section */}
      <AccordionFeatureSection features={roomifyFeatures} />

      {/* Additional Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            More Features You'll Love
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Access</h3>
              <p className="text-gray-600">
                Role-based access control ensures only authorized users can book and
                manage rooms. Keep your workspace secure.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Usage Reports</h3>
              <p className="text-gray-600">
                Generate comprehensive reports on room utilization, booking trends, and
                occupancy patterns for better planning.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized performance ensures quick loading times and smooth interactions.
                Book rooms in seconds, not minutes.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Calendar Integration</h3>
              <p className="text-gray-600">
                Sync with Google Calendar, Outlook, and other popular calendar apps.
                Manage all your meetings in one place.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">
                Automated reminders ensure you never miss a meeting. Customizable
                notification preferences for email and in-app alerts.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Manage user roles, permissions, and access levels. Perfect for
                organizations of any size with multiple departments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of organizations using Roomify to streamline their room
            booking process.
          </p>
          <button
            onClick={() => (window.location.href = "/rooms")}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg text-lg"
          >
            Start Booking Now
          </button>
        </div>
      </section>
    </div>
  );
}
