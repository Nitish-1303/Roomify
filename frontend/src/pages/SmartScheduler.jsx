import React, { useState } from 'react';
import api from '../api/axios';
import { Sparkles, Calendar, Users, Clock, MapPin, Zap } from 'lucide-react';

const SmartScheduler = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    duration: 60,
    capacity: ''
  });

  const getSuggestions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/smart/suggestions', { params: formData });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      alert('Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickBook = async (suggestion) => {
    try {
      await api.post('/bookings', {
        roomId: suggestion.room.id,
        start: suggestion.timeSlot.start,
        end: suggestion.timeSlot.end
      });
      alert('Booking request submitted successfully! 🎉');
    } catch (error) {
      alert(error.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Smart Scheduler</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered meeting suggestions based on room availability, capacity, and optimal time slots
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Duration (minutes)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Attendees
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="Optional"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            onClick={getSuggestions}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Finding best options...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Get Smart Suggestions
              </>
            )}
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ✨ Top {suggestions.length} Recommendations
            </h2>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-purple-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-red-500' :
                        'bg-gradient-to-br from-blue-400 to-purple-500'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{suggestion.room.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {suggestion.room.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {suggestion.room.capacity} people
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-900">
                          {new Date(suggestion.timeSlot.start).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                          {' - '}
                          {new Date(suggestion.timeSlot.end).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Available</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    {suggestion.room.amenities && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(suggestion.room.amenities).map(([key, value]) => 
                          value && (
                            <span key={key} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleQuickBook(suggestion)}
                    className="ml-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Quick Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && suggestions.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to find your perfect meeting time?</h3>
            <p className="text-gray-600">Fill in your preferences above and let our AI suggest the best options</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartScheduler;
