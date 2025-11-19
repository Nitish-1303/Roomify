import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import { AnimatedHero } from '../components/ui/animated-hero';
import { useAuth } from '../context/AuthContext';
import AvailabilityFilter from '../components/AvailabilityFilter';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { FeatureSteps } from '../components/ui/feature-section';
import { CircularTestimonials } from '../components/ui/circular-testimonials';
import { WorldMap } from '../components/ui/world-map';
import { Footer } from '../components/ui/footer-section';
import { Calendar, Grid, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'calendar'
  const [selectedCalendarRoom, setSelectedCalendarRoom] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRooms();
    fetchAllBookings();
  }, []);

  useEffect(() => {
    setFilteredRooms(rooms);
  }, [rooms]);

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setAllBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const getBookingsForRoom = (roomId) => {
    return allBookings.filter(booking => booking.room?._id === roomId || booking.room === roomId);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...rooms];

    // Filter by capacity
    if (filters.capacity) {
      filtered = filtered.filter(room => room.capacity >= parseInt(filters.capacity));
    }

    // Filter by availability
    if (filters.availableNow) {
      const now = new Date();
      filtered = filtered.filter(room => {
        const roomBookings = getBookingsForRoom(room._id);
        const hasActiveBooking = roomBookings.some(booking => {
          const start = new Date(booking.start);
          const end = new Date(booking.end);
          return now >= start && now <= end && booking.status === 'approved';
        });
        return !hasActiveBooking;
      });
    }

    // Filter by date and time range
    if (filters.date && filters.startTime && filters.endTime) {
      filtered = filtered.filter(room => {
        const roomBookings = getBookingsForRoom(room._id);
        const requestedStart = new Date(`${filters.date}T${filters.startTime}`);
        const requestedEnd = new Date(`${filters.date}T${filters.endTime}`);

        const hasConflict = roomBookings.some(booking => {
          if (booking.status !== 'approved') return false;
          const bookingStart = new Date(booking.start);
          const bookingEnd = new Date(booking.end);
          
          return (
            (requestedStart >= bookingStart && requestedStart < bookingEnd) ||
            (requestedEnd > bookingStart && requestedEnd <= bookingEnd) ||
            (requestedStart <= bookingStart && requestedEnd >= bookingEnd)
          );
        });

        return !hasConflict;
      });
    }

    setFilteredRooms(filtered);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
    setError('');
  };

  const handleSubmitBooking = async (e, start, end) => {
    e.preventDefault();
    setError('');

    if (!start || !end) {
      setError('Please select start and end dates');
      return;
    }

    if (new Date(end) <= new Date(start)) {
      setError('End time must be after start time');
      return;
    }

    try {
      await api.post('/bookings', {
        roomId: selectedRoom._id,
        start: start,
        end: end
      });
      
      setShowModal(false);
      setStartDate('');
      setEndDate('');
      alert('Booking request submitted successfully! 🎉');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Subtle Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative">
          <AnimatedHero
            titles={["professional", "modern", "equipped", "premium", "innovative"]}
            mainTitle="Enterprise-Grade"
            description="Premium meeting rooms designed for productivity. State-of-the-art technology, professional ambiance, and seamless booking experience for modern businesses."
            primaryButtonText="Browse Rooms"
            secondaryButtonText="Contact Sales"
            showTopButton={true}
            topButtonText={`${rooms.length} Spaces Available`}
            onPrimaryClick={() => {
              document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onSecondaryClick={() => {
              window.location.href = '/bookings';
            }}
          />
        </div>

        {/* Clean Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      {/* Rooms Grid Section */}
      <div id="rooms-section" className="container mx-auto px-4 py-16">
        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
              Grid View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === 'calendar'
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendar View
            </button>
          </div>
        </div>

        {/* Availability Filter */}
        <div className="mb-8">
          <AvailabilityFilter
            onFilterChange={handleFilterChange}
            totalRooms={rooms.length}
            filteredCount={filteredRooms.length}
          />
        </div>

        {/* Grid View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredRooms.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Rooms Available</h3>
                  <p className="text-gray-600">Try adjusting your filters to see more options</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRooms.map((room, index) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      index={index}
                      bookings={getBookingsForRoom(room._id)}
                      onBook={user?.role === 'user' ? handleBookRoom : null}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Room Selector */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select a room to view availability
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredRooms.map((room) => (
                    <button
                      key={room._id}
                      onClick={() => setSelectedCalendarRoom(room)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedCalendarRoom?._id === room._id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{room.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{room.location}</div>
                      <div className="text-xs text-gray-500 mt-1">Capacity: {room.capacity}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Display */}
              {selectedCalendarRoom ? (
                <div className="relative">
                  <button
                    onClick={() => setSelectedCalendarRoom(null)}
                    className="absolute -top-3 right-3 z-10 p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                  <AvailabilityCalendar
                    roomId={selectedCalendarRoom._id}
                    bookings={getBookingsForRoom(selectedCalendarRoom._id)}
                    onDateSelect={(date) => {
                      if (user?.role === 'user') {
                        handleBookRoom(selectedCalendarRoom);
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Select a room above to view its availability calendar</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Professional Admin Notice */}
        {user?.role === 'admin' && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Administrator View</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You're currently viewing the conference rooms as an administrator. 
                  Regular users can book these spaces directly through their dashboard. 
                  To manage bookings, navigate to the Bookings section.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Successful Bookings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600 text-sm">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Corporate Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16">
        <FeatureSteps
          features={[
            {
              step: "Step 1",
              title: "Browse Rooms",
              content: "Explore available conference rooms with real-time availability and detailed information.",
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            },
            {
              step: "Step 2",
              title: "Select Time",
              content: "Choose your preferred date and time slot using our intuitive booking interface.",
              image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
            },
            {
              step: "Step 3",
              title: "Confirm Booking",
              content: "Review your selection and submit your booking request for instant confirmation.",
              image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80",
            },
          ]}
          title="How to Book Your Space"
          autoPlayInterval={4000}
        />
      </div>

      {/* Client Testimonials Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trusted by leading organizations for seamless room booking
            </p>
          </div>
          <div className="flex justify-center">
            <CircularTestimonials
              testimonials={[
                {
                  quote: "Roomify has transformed how we manage our conference rooms. The real-time availability and seamless booking process have made scheduling meetings effortless.",
                  name: "Priya Sharma",
                  designation: "Operations Manager, Tech Solutions India",
                  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
                },
                {
                  quote: "The intuitive interface and smart scheduling features are outstanding. We've reduced booking conflicts by 90% since implementing Roomify.",
                  name: "Rajesh Kumar",
                  designation: "IT Director, Mumbai Enterprises",
                  src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
                },
                {
                  quote: "As a facility manager, Roomify has been a game-changer. The analytics dashboard helps us optimize room utilization perfectly.",
                  name: "Ananya Patel",
                  designation: "Facility Manager, Bangalore Tech Park",
                  src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
                },
              ]}
              autoplay={true}
              colors={{
                name: "#0a0a0a",
                designation: "#454545",
                testimony: "#171717",
                arrowBackground: "#141414",
                arrowForeground: "#f1f1f7",
                arrowHoverBackground: "#00A6FB",
              }}
              fontSizes={{
                name: "24px",
                designation: "16px",
                quote: "18px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Global Reach Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.p
              className="font-bold text-3xl md:text-5xl text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Global{" "}
              <span className="text-blue-400">
                {"Connectivity".split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Roomify connects organizations worldwide. From Mumbai to New York, 
              Bangalore to London - our platform serves businesses across continents 
              with seamless room booking solutions.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <WorldMap
              dots={[
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: 40.7128, lng: -74.006 }, // New York
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: 51.5074, lng: -0.1278 }, // London
                },
                {
                  start: { lat: 12.9716, lng: 77.5946 }, // Bangalore
                  end: { lat: 1.3521, lng: 103.8198 }, // Singapore
                },
                {
                  start: { lat: 19.076, lng: 72.8777 }, // Mumbai
                  end: { lat: 25.2048, lng: 55.2708 }, // Dubai
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                },
                {
                  start: { lat: 40.7128, lng: -74.006 }, // New York
                  end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
                },
              ]}
              lineColor="#3b82f6"
            />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-300 text-sm md:text-base">Countries</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-300 text-sm md:text-base">Organizations</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">100K+</div>
              <div className="text-gray-300 text-sm md:text-base">Active Users</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm md:text-base">Support</div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <BookingModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setError('');
        }}
        room={selectedRoom}
        onSubmit={handleSubmitBooking}
        error={error}
      />
    </div>
  );
};

export default Rooms;
