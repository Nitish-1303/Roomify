import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AvailabilityCalendar = ({ roomId, bookings = [], onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getBookingsForDate = (date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.start);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear() &&
        booking.status === 'approved'
      );
    });
  };

  const getAvailabilityStatus = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return 'past';
    
    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length === 0) return 'available';
    if (dayBookings.length >= 8) return 'full'; // Assuming 8 slots per day
    return 'partial';
  };

  const handleDateClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    calculateAvailableSlots(date);
    if (onDateSelect) onDateSelect(date);
  };

  const calculateAvailableSlots = (date) => {
    const slots = [];
    const dayBookings = getBookingsForDate(date);
    
    // Generate time slots from 8 AM to 6 PM
    for (let hour = 8; hour < 18; hour++) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(date);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      const isBooked = dayBookings.some(booking => {
        const bookingStart = new Date(booking.start);
        const bookingEnd = new Date(booking.end);
        return (
          (slotStart >= bookingStart && slotStart < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd)
        );
      });

      slots.push({
        time: `${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
        available: !isBooked
      });
    }
    
    setAvailableSlots(slots);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300';
      case 'partial': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300';
      case 'full': return 'bg-red-100 text-red-700 cursor-not-allowed border-red-300';
      case 'past': return 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200';
      default: return 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const status = getAvailabilityStatus(day);
          const isSelected = selectedDate?.getDate() === day &&
                           selectedDate?.getMonth() === currentDate.getMonth();
          
          return (
            <motion.button
              key={day}
              whileHover={status !== 'past' && status !== 'full' ? { scale: 1.05 } : {}}
              whileTap={status !== 'past' && status !== 'full' ? { scale: 0.95 } : {}}
              onClick={() => status !== 'past' && status !== 'full' && handleDateClick(day)}
              className={`
                aspect-square rounded-lg border-2 text-sm font-semibold transition-all
                ${getStatusColor(status)}
                ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              `}
              disabled={status === 'past' || status === 'full'}
            >
              {day}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-100 border-2 border-green-300"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-100 border-2 border-yellow-300"></div>
          <span className="text-gray-600">Partially Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-100 border-2 border-red-300"></div>
          <span className="text-gray-600">Fully Booked</span>
        </div>
      </div>

      {/* Available Time Slots */}
      <AnimatePresence>
        {selectedDate && availableSlots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Available Slots for {selectedDate.toLocaleDateString()}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`
                    px-3 py-2 rounded-lg text-xs font-medium text-center border
                    ${slot.available 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-400 border-gray-200 line-through'
                    }
                  `}
                >
                  {slot.time}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailabilityCalendar;
