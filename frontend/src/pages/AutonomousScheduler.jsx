import React, { useState, useEffect } from 'react';
import { Brain, Calendar, Clock, TrendingUp, Zap, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';

const AutonomousScheduler = () => {
  const [predictions, setPredictions] = useState([]);
  const [autoBookings, setAutoBookings] = useState([]);
  const [userPreferences, setUserPreferences] = useState({});
  const [learningProgress, setLearningProgress] = useState(67);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    generatePredictions();
    loadAutoBookings();
    loadUserPreferences();
  }, []);

  const generatePredictions = () => {
    // Simulated AI predictions based on patterns
    const mockPredictions = [
      {
        id: 1,
        type: 'recurring',
        confidence: 94,
        prediction: 'Weekly team standup detected',
        suggestedRoom: 'Conference Room A',
        suggestedTime: 'Monday 10:00 AM',
        reasoning: 'You book this room every Monday at 10 AM for the past 8 weeks',
        status: 'pending',
        autoBook: true
      },
      {
        id: 2,
        type: 'pattern',
        confidence: 87,
        prediction: 'Client presentation likely needed',
        suggestedRoom: 'Executive Boardroom',
        suggestedTime: 'Friday 2:00 PM',
        reasoning: 'End-of-week client meetings detected in your calendar pattern',
        status: 'pending',
        autoBook: false
      },
      {
        id: 3,
        type: 'preference',
        confidence: 91,
        prediction: 'Afternoon focus session',
        suggestedRoom: 'Quiet Room 2',
        suggestedTime: 'Wednesday 3:00 PM',
        reasoning: 'You prefer quiet rooms after lunch for deep work',
        status: 'auto-booked',
        autoBook: true
      },
      {
        id: 4,
        type: 'optimization',
        confidence: 78,
        prediction: 'Team brainstorming session',
        suggestedRoom: 'Creative Space',
        suggestedTime: 'Thursday 11:00 AM',
        reasoning: 'Your team typically brainstorms mid-week mornings',
        status: 'cancelled',
        autoBook: false
      }
    ];
    setPredictions(mockPredictions);
  };

  const loadAutoBookings = () => {
    const mockBookings = [
      { id: 1, room: 'Conference Room A', time: 'Today 10:00 AM', status: 'confirmed', used: true },
      { id: 2, room: 'Quiet Room 2', time: 'Today 3:00 PM', status: 'confirmed', used: false },
      { id: 3, room: 'Meeting Room B', time: 'Yesterday 2:00 PM', status: 'auto-cancelled', used: false },
      { id: 4, room: 'Executive Boardroom', time: 'Tomorrow 2:00 PM', status: 'pending', used: null }
    ];
    setAutoBookings(mockBookings);
  };

  const loadUserPreferences = () => {
    setUserPreferences({
      preferredTimes: ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
      avoidTimes: ['Before 9:00 AM', 'After 5:00 PM'],
      preferredRooms: ['Conference Room A', 'Quiet Room 2'],
      meetingStyle: 'Prefers small rooms, dislikes early mornings',
      avgMeetingDuration: '45 minutes',
      bookingFrequency: '3-4 times per week'
    });
  };

  const handleAcceptPrediction = (id) => {
    setIsProcessing(true);
    setTimeout(() => {
      setPredictions(predictions.map(p => 
        p.id === id ? { ...p, status: 'auto-booked' } : p
      ));
      setIsProcessing(false);
    }, 1000);
  };

  const handleRejectPrediction = (id) => {
    setPredictions(predictions.map(p => 
      p.id === id ? { ...p, status: 'rejected' } : p
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'auto-booked': return 'bg-green-100 text-green-700 border-green-300';
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cancelled': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'auto-cancelled': return 'bg-red-100 text-red-700 border-red-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Autonomous AI Scheduler</h1>
              <p className="text-gray-600 mt-1">Your personal AI concierge learns and books for you</p>
            </div>
          </div>

          {/* AI Learning Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">AI Learning Progress</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">{learningProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${learningProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Analyzing your booking patterns, preferences, and meeting behaviors
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Predictions */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Predictions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">AI Predictions & Auto-Bookings</h2>
              </div>

              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900">{prediction.prediction}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(prediction.status)}`}>
                            {prediction.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {prediction.suggestedTime}
                          </span>
                          <span>📍 {prediction.suggestedRoom}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}%
                        </div>
                        <div className="text-xs text-gray-500">confidence</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">AI Reasoning:</span> {prediction.reasoning}
                      </p>
                    </div>

                    {prediction.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptPrediction(prediction.id)}
                          disabled={isProcessing}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept & Auto-Book
                        </button>
                        <button
                          onClick={() => handleRejectPrediction(prediction.id)}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Auto-Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-900">Recent Auto-Bookings</h2>
              </div>

              <div className="space-y-3">
                {autoBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        booking.status === 'confirmed' ? 'bg-green-100' :
                        booking.status === 'pending' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        {booking.status === 'confirmed' ? '✓' :
                         booking.status === 'pending' ? '⏳' : '✗'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{booking.room}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {booking.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                      {booking.used !== null && (
                        <div className="text-xs text-gray-500 mt-1">
                          {booking.used ? '✓ Used' : '✗ Unused'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Preferences & Stats */}
          <div className="space-y-6">
            {/* Learned Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Learned Preferences</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Preferred Times</div>
                  {userPreferences.preferredTimes?.map((time, idx) => (
                    <div key={idx} className="text-sm text-gray-600 bg-green-50 px-2 py-1 rounded mb-1">
                      ✓ {time}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Avoid Times</div>
                  {userPreferences.avoidTimes?.map((time, idx) => (
                    <div key={idx} className="text-sm text-gray-600 bg-red-50 px-2 py-1 rounded mb-1">
                      ✗ {time}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Meeting Style</div>
                  <div className="text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded">
                    {userPreferences.meetingStyle}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-4">AI Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-90">Prediction Accuracy</div>
                  <div className="text-3xl font-bold">94%</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Time Saved This Month</div>
                  <div className="text-3xl font-bold">4.5 hrs</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Auto-Cancellations</div>
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-xs opacity-75">Unused bookings prevented</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                  Retrain AI Model
                </button>
                <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                  View Learning History
                </button>
                <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                  Adjust Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousScheduler;
