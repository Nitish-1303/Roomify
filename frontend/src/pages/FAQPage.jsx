import React, { useState } from "react";
import { FAQAccordion } from "../components/ui/faq-accordion";
import { Search, MessageCircle, Mail, Phone } from "lucide-react";

const allFAQs = [
  {
    id: 1,
    question: "How do I book a conference room?",
    answer:
      "Booking a room is simple! Navigate to the Rooms page, browse available spaces, and click 'Reserve Room' on your preferred option. Select your desired date and time slot, then submit your booking request. You'll receive instant confirmation via email and in-app notification.",
    category: "Booking",
  },
  {
    id: 2,
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your bookings from the Bookings page. Click on your booking to view details, then select 'Cancel' or 'Modify'. Please note that cancellations made less than 2 hours before the scheduled time may require admin approval.",
    category: "Booking",
  },
  {
    id: 3,
    question: "How do I check room availability in real-time?",
    answer:
      "Our platform shows real-time availability on every room card with color-coded badges. Green means 'Available Now', yellow indicates 'Partially Booked', and red shows 'Fully Booked'. You can also use the Calendar View to see availability across multiple days and time slots.",
    category: "Availability",
  },
  {
    id: 4,
    question: "What amenities are included in the conference rooms?",
    answer:
      "All our conference rooms come equipped with high-speed WiFi, display screens/projectors, whiteboards, and complimentary coffee/tea. Specific amenities vary by room and are clearly listed on each room card. Premium rooms may include video conferencing equipment and additional seating.",
    category: "Facilities",
  },
  {
    id: 5,
    question: "How far in advance can I book a room?",
    answer:
      "You can book rooms up to 90 days in advance. For recurring bookings or special events requiring longer advance notice, please contact your facility manager or admin. Same-day bookings are also available based on real-time availability.",
    category: "Booking",
  },
  {
    id: 6,
    question: "What happens if I'm late to my booking?",
    answer:
      "We have a 15-minute grace period for all bookings. If you haven't checked in within 15 minutes of your scheduled start time, the system may automatically release the room for other users. To avoid this, you can send a notification through the app if you're running late.",
    category: "Policies",
  },
  {
    id: 7,
    question: "Can I book rooms for external guests?",
    answer:
      "Yes, registered users can book rooms for meetings with external guests. When making your booking, you can specify the number of external attendees. Please ensure all guests sign in at reception and follow your organization's visitor policies.",
    category: "Booking",
  },
  {
    id: 8,
    question: "How do I access analytics and reports?",
    answer:
      "Admins and managers can access comprehensive analytics from the Analytics page. View room utilization rates, booking patterns, peak usage times, and generate custom reports. Export data in CSV or PDF format for presentations and planning purposes.",
    category: "Analytics",
  },
  {
    id: 9,
    question: "Is there a mobile app available?",
    answer:
      "Yes! Roomify is fully responsive and works seamlessly on all devices. Access the platform through your mobile browser for the same features as desktop. You can book rooms, check availability, receive notifications, and manage bookings on-the-go.",
    category: "Technical",
  },
  {
    id: 10,
    question: "What should I do if I encounter technical issues?",
    answer:
      "For technical issues, first try refreshing your browser or clearing cache. If the problem persists, contact our support team through the Help section or email support@roomify.com. Include details about the issue, browser type, and any error messages for faster resolution.",
    category: "Technical",
  },
  {
    id: 11,
    question: "How do notifications work?",
    answer:
      "You'll receive notifications for booking confirmations, upcoming meetings (15 minutes before), cancellations, and status changes. Notifications appear in-app and via email. You can customize notification preferences in your Profile settings to choose which alerts you want to receive.",
    category: "Technical",
  },
  {
    id: 12,
    question: "What are the room capacity limits?",
    answer:
      "Room capacities range from 4 to 50 people depending on the space. Each room card displays the maximum capacity. When booking, ensure you select a room that comfortably accommodates your group size. Exceeding capacity limits may result in booking cancellation.",
    category: "Facilities",
  },
  {
    id: 13,
    question: "Can I set up recurring bookings?",
    answer:
      "Yes, recurring bookings are available for regular meetings. When creating a booking, select the 'Recurring' option and choose your frequency (daily, weekly, monthly). The system will automatically check availability for all instances and notify you of any conflicts.",
    category: "Booking",
  },
  {
    id: 14,
    question: "How do I report issues with a room?",
    answer:
      "If you encounter any issues with a room (equipment malfunction, cleanliness, etc.), navigate to the Maintenance page and submit a report. Include the room name, issue description, and any photos if applicable. Our maintenance team will be notified immediately.",
    category: "Facilities",
  },
  {
    id: 15,
    question: "What is the cancellation policy?",
    answer:
      "You can cancel bookings free of charge up to 2 hours before the scheduled time. Cancellations within 2 hours may be subject to approval. Repeated no-shows or late cancellations may affect your booking privileges. Always cancel bookings you can't attend to free up space for others.",
    category: "Policies",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(allFAQs.map((faq) => faq.category))];

  const filteredFAQs = allFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to common questions about Roomify. Can't find what you're
            looking for? Contact our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing {filteredFAQs.length} question
                    {filteredFAQs.length !== 1 ? "s" : ""}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <FAQAccordion faqs={filteredFAQs} showCategories={false} />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or browse all categories
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Our support team is here to help you 24/7
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team in real-time
                </p>
                <button className="text-blue-600 font-semibold hover:underline">
                  Start Chat
                </button>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Get help via email within 24 hours
                </p>
                <a
                  href="mailto:support@roomify.com"
                  className="text-green-600 font-semibold hover:underline"
                >
                  support@roomify.com
                </a>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">
                  Speak with our team directly
                </p>
                <a
                  href="tel:+911234567890"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Quick Links</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/rooms"
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-gray-900">Browse Rooms</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="/bookings"
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-gray-900">My Bookings</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="/features"
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-gray-900">Features</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="/profile"
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-gray-900">My Profile</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
