import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BookingRow from '../components/BookingRow';
import { useAuth } from '../context/AuthContext';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/bookings/${id}/approve`);
      fetchBookings();
    } catch (err) {
      alert('Failed to approve booking');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/bookings/${id}/reject`);
      fetchBookings();
    } catch (err) {
      alert('Failed to reject booking');
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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-3">
            {isAdmin ? '📊 All Bookings' : '📅 My Bookings'}
          </h1>
          <p className="text-white text-opacity-80 text-lg">
            {isAdmin ? 'Manage all booking requests' : 'Track your room reservations'}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center animate-slide-up">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-white text-xl font-medium">No bookings found</p>
            <p className="text-white text-opacity-70 mt-2">
              {isAdmin ? 'No booking requests yet' : 'Start by booking a room!'}
            </p>
          </div>
        ) : (
          <div className="glass rounded-3xl overflow-hidden shadow-2xl animate-slide-up border border-white border-opacity-20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white bg-opacity-10 border-b border-white border-opacity-20">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-white">Room</th>
                    {isAdmin && <th className="px-6 py-4 text-left font-semibold text-white">User</th>}
                    <th className="px-6 py-4 text-left font-semibold text-white">Start</th>
                    <th className="px-6 py-4 text-left font-semibold text-white">End</th>
                    <th className="px-6 py-4 text-left font-semibold text-white">Status</th>
                    {isAdmin && <th className="px-6 py-4 text-left font-semibold text-white">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <BookingRow
                      key={booking._id}
                      booking={booking}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      isAdmin={isAdmin}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
