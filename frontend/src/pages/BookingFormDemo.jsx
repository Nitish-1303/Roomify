import React, { useState } from 'react';
import { BookingForm } from '../components/ui/booking-form';

export default function BookingFormDemo() {
  const [destination, setDestination] = useState('Conference Room A');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formatDateRange = () => {
    if (!startDate || !endDate) return 'Select dates';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const handleDateRangeClick = () => {
    alert('Date range selector opened! In production, this would open a date picker modal.');
  };

  const handleRoomsClick = () => {
    alert('Room selector opened! You can customize the number of rooms here.');
  };

  const handleGuestsClick = () => {
    alert('Guest selector opened! Adjust the number of guests.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Checking availability for ${destination}...`);
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Info */}
        <div className="text-white space-y-6">
          <h1 className="text-5xl font-bold">
            Book Your Perfect Meeting Space
          </h1>
          <p className="text-xl text-white text-opacity-90">
            Find and reserve conference rooms with our intuitive booking system. 
            Select your dates, specify requirements, and check availability instantly.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Instant Availability</h3>
                <p className="text-white text-opacity-80">Check room availability in real-time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flexible Booking</h3>
                <p className="text-white text-opacity-80">Book for hours, days, or weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Easy Management</h3>
                <p className="text-white text-opacity-80">Track and manage all your bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Booking Form */}
        <div className="flex justify-center">
          <BookingForm
            destination={destination}
            dateRange={formatDateRange()}
            rooms={1}
            guests={10}
            onDestinationChange={(e) => setDestination(e.target.value)}
            onDateRangeClick={handleDateRangeClick}
            onRoomsClick={handleRoomsClick}
            onGuestsClick={handleGuestsClick}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
