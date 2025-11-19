import React from 'react';
import { motion } from 'framer-motion';

const RoomifyLogo = ({ size = 40, animated = false, showText = true, className = "" }) => {
  const LogoWrapper = animated ? motion.div : 'div';
  
  const animationProps = animated ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  } : {};

  return (
    <LogoWrapper 
      className={`flex items-center gap-3 ${className}`}
      {...animationProps}
    >
      {/* Logo Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="roomify-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="roomify-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#F0ABFC" />
          </linearGradient>
          
          {/* Glow Filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#roomify-gradient)"
          opacity="0.1"
        />

        {/* Main Building/Room Structure */}
        <g filter="url(#glow)">
          {/* Base Building */}
          <rect
            x="25"
            y="35"
            width="50"
            height="45"
            rx="4"
            fill="url(#roomify-gradient)"
            opacity="0.9"
          />
          
          {/* Door */}
          <rect
            x="42"
            y="55"
            width="16"
            height="25"
            rx="2"
            fill="white"
            opacity="0.9"
          />
          
          {/* Door Handle */}
          <circle
            cx="52"
            cy="67"
            r="1.5"
            fill="url(#roomify-gradient)"
          />
          
          {/* Windows - Left */}
          <rect
            x="30"
            y="42"
            width="10"
            height="8"
            rx="1"
            fill="white"
            opacity="0.8"
          />
          
          {/* Windows - Right */}
          <rect
            x="60"
            y="42"
            width="10"
            height="8"
            rx="1"
            fill="white"
            opacity="0.8"
          />
          
          {/* Roof */}
          <path
            d="M 20 35 L 50 20 L 80 35 Z"
            fill="url(#roomify-gradient-light)"
            opacity="0.9"
          />
          
          {/* Checkmark/Booking Symbol */}
          <g transform="translate(65, 25)">
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="white"
              opacity="0.95"
            />
            <path
              d="M -4 0 L -1 3 L 5 -4"
              stroke="url(#roomify-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>
      </svg>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Roomify
          </span>
          <span className="text-xs text-gray-500 font-medium tracking-wide">
            Smart Booking
          </span>
        </div>
      )}
    </LogoWrapper>
  );
};

export default RoomifyLogo;
