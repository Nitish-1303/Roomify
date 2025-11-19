import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Clock, Wifi, Monitor, Coffee } from 'lucide-react';
import { FlowButton } from './ui/flow-button';
import AvailableNowBadge from './AvailableNowBadge';

const RoomCard = ({ room, onBook, index, bookings = [] }) => {
  const getGradient = () => {
    const gradients = [
      'from-violet-500 via-purple-500 to-fuchsia-500',
      'from-cyan-500 via-blue-500 to-indigo-500',
      'from-emerald-500 via-teal-500 to-cyan-500',
      'from-orange-500 via-red-500 to-pink-500',
      'from-amber-500 via-yellow-500 to-lime-500',
    ];
    return gradients[index % gradients.length];
  };

  const getPattern = () => {
    const patterns = [
      'bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]',
      'bg-[radial-gradient(ellipse_at_top,rgba(186,230,253,0.3),transparent)]',
      'bg-[radial-gradient(circle_at_bottom_left,rgba(167,243,208,0.3),transparent)]',
      'bg-[radial-gradient(circle_at_top_right,rgba(254,202,202,0.3),transparent)]',
      'bg-[radial-gradient(ellipse_at_bottom,rgba(253,230,138,0.3),transparent)]',
    ];
    return patterns[index % patterns.length];
  };

  const getRoomImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // Modern office
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', // Conference room
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80', // Meeting space
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80', // Office interior
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', // Boardroom
    ];
    return images[index % images.length];
  };

  const amenities = [
    { icon: Wifi, label: 'WiFi' },
    { icon: Monitor, label: 'Display' },
    { icon: Coffee, label: 'Coffee' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
    >
      {/* Professional Image Header */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {/* Room Image */}
        <motion.img
          src={getRoomImage()}
          alt={room.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

        {/* Status Badge - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <AvailableNowBadge roomId={room._id} bookings={bookings} />
        </div>

        {/* Capacity Badge - Top Right */}
        <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm z-10">
          <Users className="w-3.5 h-3.5 text-gray-700" />
          <span className="text-xs font-bold text-gray-900">{room.capacity}</span>
        </div>
      </div>

      {/* Professional Content */}
      <div className="p-5 space-y-4">
        {/* Title & Location */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-sm">{room.location}</span>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="flex items-center gap-2">
          {amenities.map((amenity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
              title={amenity.label}
            >
              <amenity.icon className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Quick Info */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Available Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Instant Booking</span>
          </div>
        </div>

        {/* Modern Flow Button */}
        {onBook && (
          <FlowButton 
            text="Reserve Room" 
            onClick={() => onBook(room)}
          />
        )}
      </div>
    </motion.div>
  );
};

export default RoomCard;
