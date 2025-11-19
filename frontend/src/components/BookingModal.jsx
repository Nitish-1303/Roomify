import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingForm } from './ui/booking-form';

const BookingModal = ({ isOpen, onClose, room, onSubmit, error }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDateRange = () => {
    if (!startDate || !endDate) return 'Select dates';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, startDate, endDate);
  };

  const handleDateRangeClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  if (!isOpen || !room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Room info header */}
            <div className="bg-white rounded-t-2xl p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{room.name}</h2>
              <p className="text-gray-600 text-sm">
                📍 {room.location} • 👥 {room.capacity} people
              </p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 rounded"
              >
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Booking Form */}
            <div className="bg-white rounded-b-2xl">
              <BookingForm
                destination={room.name}
                dateRange={formatDateRange()}
                rooms={1}
                guests={room.capacity}
                onDestinationChange={() => {}}
                onDateRangeClick={handleDateRangeClick}
                onRoomsClick={() => {}}
                onGuestsClick={() => {}}
                onSubmit={handleFormSubmit}
                className="shadow-none border-0"
              />

              {/* Date picker section */}
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
