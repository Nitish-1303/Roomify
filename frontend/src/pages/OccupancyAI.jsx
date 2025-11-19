import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Users, Clock, Activity, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const OccupancyAI = () => {
  const [currentOccupancy, setCurrentOccupancy] = useState(67);
  const [predictions, setPredictions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [floorData, setFloorData] = useState([]);

  useEffect(() => {
    generatePredictions();
    generateAlerts();
    generateHistoricalData();
    generateFloorData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentOccupancy(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generatePredictions = () => {
    const now = new Date();
    const predictions = [];
    
    for (let i = 0; i < 24; i++) {
      const hour = (now.getHours() + i) % 24;
      const time = `${hour.toString().padStart(2, '0')}:00`;
      
      // Simulate realistic office patterns
      let occupancy;
      if (hour >= 9 && hour <= 11) occupancy = 75 + Math.random() * 20; // Morning peak
      else if (hour >= 14 && hour <= 16) occupancy = 80 + Math.random() * 15; // Afternoon peak
      else if (hour >= 12 && hour <= 13) occupancy = 40 + Math.random() * 20; // Lunch dip
      else if (hour >= 17 || hour <= 8) occupancy = 10 + Math.random() * 15; // Off hours
      else occupancy = 50 + Math.random() * 20;

      predictions.push({
        time,
        occupancy: Math.round(occupancy),
        confidence: 85 + Math.random() * 10
      });
    }
    
    setPredictions(predictions);
  };

  const generateAlerts = () => {
    setAlerts([
      {
        id: 1,
        type: 'warning',
        severity: 'high',
        message: 'Floor 3 will reach 95% capacity in 15 minutes',
        action: 'Suggest alternative floors',
        time: '2:45 PM'
      },
      {
        id: 2,
        type: 'info',
        severity: 'medium',
        message: 'Expected quiet hour: 3:00 PM - 4:00 PM',
        action: 'Optimal for focus work',
        time: '3:00 PM'
      },
      {
        id: 3,
        type: 'success',
        severity: 'low',
        message: 'Floor 2 has 8 available rooms right now',
        action: 'Book now for best selection',
        time: 'Now'
      }
    ]);
  };

  const generateHistoricalData = () => {
    const data = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    days.forEach(day => {
      data.push({
        day,
        actual: 60 + Math.random() * 30,
        predicted: 65 + Math.random() * 25,
        capacity: 100
      });
    });
    
    setHistoricalData(data);
  };

  const generateFloorData = () => {
    setFloorData([
      { floor: 'Floor 1', current: 45, predicted: 62, capacity: 80, rooms: 12 },
      { floor: 'Floor 2', current: 78, predicted: 85, capacity: 100, rooms: 15 },
      { floor: 'Floor 3', current: 92, predicted: 98, capacity: 100, rooms: 18 },
      { floor: 'Floor 4', current: 34, predicted: 45, capacity: 80, rooms: 10 }
    ]);
  };

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 90) return 'text-red-600';
    if (occupancy >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getOccupancyBg = (occupancy) => {
    if (occupancy >= 90) return 'bg-red-100 border-red-300';
    if (occupancy >= 70) return 'bg-yellow-100 border-yellow-300';
    return 'bg-green-100 border-green-300';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Occupancy AI Prediction</h1>
              <p className="text-gray-600 mt-1">Real-time crowd density forecasting & optimization</p>
            </div>
          </div>
        </motion.div>

        {/* Current Status Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Current Occupancy</div>
              <div className={`text-5xl font-bold ${getOccupancyColor(currentOccupancy)}`}>
                {Math.round(currentOccupancy)}%
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    animate={{ width: `${currentOccupancy}%` }}
                    className={`h-full rounded-full ${
                      currentOccupancy >= 90 ? 'bg-red-500' :
                      currentOccupancy >= 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Peak Time Today</div>
              <div className="text-3xl font-bold text-gray-900">2:30 PM</div>
              <div className="text-sm text-gray-500 mt-1">Expected: 94%</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Quiet Hour</div>
              <div className="text-3xl font-bold text-gray-900">3:00 PM</div>
              <div className="text-sm text-gray-500 mt-1">Best for focus</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Available Rooms</div>
              <div className="text-3xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-500 mt-1">Across all floors</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Predictions & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* 24-Hour Prediction */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">24-Hour Occupancy Forecast</h2>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictions.slice(0, 12)}>
                  <defs>
                    <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorOccupancy)" 
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Low Density</div>
                  <div className="text-lg font-bold text-green-600">0-60%</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">Moderate</div>
                  <div className="text-lg font-bold text-yellow-600">60-85%</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600">High Density</div>
                  <div className="text-lg font-bold text-red-600">85-100%</div>
                </div>
              </div>
            </div>

            {/* Floor-by-Floor Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Floor-by-Floor Analysis</h2>
              </div>

              <div className="space-y-4">
                {floorData.map((floor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900">{floor.floor}</div>
                        <div className="text-sm text-gray-600">{floor.rooms} rooms total</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getOccupancyColor(floor.current)}`}>
                          {floor.current}%
                        </div>
                        <div className="text-xs text-gray-500">
                          → {floor.predicted}% predicted
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${floor.current}%` }}
                          className={`h-full ${
                            floor.current >= 90 ? 'bg-red-500' :
                            floor.current >= 70 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                        />
                      </div>
                      <div 
                        className="absolute top-0 h-3 w-1 bg-purple-600"
                        style={{ left: `${floor.predicted}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-purple-600 font-semibold whitespace-nowrap">
                          ↓ Predicted
                        </div>
                      </div>
                    </div>

                    {floor.current >= 85 && (
                      <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700">
                        ⚠️ High congestion expected - Consider alternative floors
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weekly Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Weekly Occupancy Trends</h2>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="predicted" fill="#8b5cf6" name="Predicted" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - Alerts & Insights */}
          <div className="space-y-6">
            {/* Real-Time Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-bold text-gray-900">Live Alerts</h2>
              </div>

              <div className="space-y-3">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm">{alert.message}</div>
                      <div className="text-xs opacity-75">{alert.time}</div>
                    </div>
                    <div className="text-xs opacity-90 mb-2">{alert.action}</div>
                    <button className="text-xs font-semibold underline">
                      Take Action →
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">AI Insights</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm opacity-90">Prediction Accuracy</div>
                  <div className="text-3xl font-bold">96.8%</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Patterns Detected</div>
                  <div className="text-3xl font-bold">47</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Congestion Events Prevented</div>
                  <div className="text-3xl font-bold">23</div>
                  <div className="text-xs opacity-75">This month</div>
                </div>
              </div>
            </div>

            {/* Quick Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Smart Recommendations</h2>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm font-semibold text-green-900">✓ Best Time to Book</div>
                  <div className="text-xs text-green-700 mt-1">3:00 PM - 4:00 PM today</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm font-semibold text-blue-900">📍 Least Crowded Floor</div>
                  <div className="text-xs text-blue-700 mt-1">Floor 4 (34% occupancy)</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm font-semibold text-yellow-900">⚠️ Avoid Peak Hours</div>
                  <div className="text-xs text-yellow-700 mt-1">2:00 PM - 3:00 PM (94% expected)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyAI;
