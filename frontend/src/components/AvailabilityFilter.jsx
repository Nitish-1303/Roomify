import React, { useState } from 'react';
import { Calendar, Clock, Users, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AvailabilityFilter = ({ onFilterChange, totalRooms, filteredCount }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    availableNow: false
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      date: '',
      startTime: '',
      endTime: '',
      capacity: '',
      availableNow: false
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '' && v !== false);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour < 18; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    times.push('18:00');
    return times;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Filter Availability</h3>
            <p className="text-sm text-gray-600">
              Showing {filteredCount} of {totalRooms} rooms
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-medium"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {/* Quick Filter: Available Now */}
      <div className="mb-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.availableNow}
              onChange={(e) => handleFilterChange('availableNow', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-900">Show Only Available Now</span>
          </div>
        </label>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-gray-200"
          >
            {/* Date Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                Select Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </label>
                <select
                  value={filters.startTime}
                  onChange={(e) => handleFilterChange('startTime', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Any time</option>
                  {generateTimeOptions().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </label>
                <select
                  value={filters.endTime}
                  onChange={(e) => handleFilterChange('endTime', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Any time</option>
                  {generateTimeOptions().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Capacity Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4" />
                Minimum Capacity
              </label>
              <select
                value={filters.capacity}
                onChange={(e) => handleFilterChange('capacity', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Any capacity</option>
                <option value="4">4+ people</option>
                <option value="6">6+ people</option>
                <option value="8">8+ people</option>
                <option value="10">10+ people</option>
                <option value="15">15+ people</option>
                <option value="20">20+ people</option>
              </select>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {filters.date && (
                    <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-200">
                      Date: {new Date(filters.date).toLocaleDateString()}
                    </span>
                  )}
                  {filters.startTime && (
                    <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-200">
                      From: {filters.startTime}
                    </span>
                  )}
                  {filters.endTime && (
                    <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-200">
                      To: {filters.endTime}
                    </span>
                  )}
                  {filters.capacity && (
                    <span className="px-2 py-1 bg-white text-blue-700 text-xs rounded-md border border-blue-200">
                      Capacity: {filters.capacity}+ people
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailabilityFilter;
