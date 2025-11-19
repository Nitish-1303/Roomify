import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const AvailableNowBadge = ({ roomId, bookings = [] }) => {
  const [isAvailableNow, setIsAvailableNow] = useState(true);
  const [nextAvailable, setNextAvailable] = useState(null);

  useEffect(() => {
    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [bookings]);

  const checkAvailability = () => {
    const now = new Date();
    
    // Check if there's an active booking right now
    const activeBooking = bookings.find(booking => {
      const start = new Date(booking.start);
      const end = new Date(booking.end);
      return now >= start && now <= end && booking.status === 'approved';
    });

    if (activeBooking) {
      setIsAvailableNow(false);
      setNextAvailable(new Date(activeBooking.end));
    } else {
      setIsAvailableNow(true);
      // Find next booking
      const upcomingBookings = bookings
        .filter(b => new Date(b.start) > now && b.status === 'approved')
        .sort((a, b) => new Date(a.start) - new Date(b.start));
      
      if (upcomingBookings.length > 0) {
        setNextAvailable(new Date(upcomingBookings[0].start));
      } else {
        setNextAvailable(null);
      }
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (isAvailableNow) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-green-500 px-2.5 py-1 rounded-md shadow-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-white">AVAILABLE NOW</span>
        </div>
        {nextAvailable && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>Until {formatTime(nextAvailable)}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 bg-red-500 px-2.5 py-1 rounded-md shadow-sm">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        <span className="text-xs font-semibold text-white">IN USE</span>
      </div>
      {nextAvailable && (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="w-3 h-3" />
          <span>Free at {formatTime(nextAvailable)}</span>
        </div>
      )}
    </div>
  );
};

export default AvailableNowBadge;
