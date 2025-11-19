import React from 'react';

// Minimal Logo - Just Icon
export const RoomifyLogoMinimal = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="minimal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    {/* R Letter with Room Icon */}
    <path
      d="M 30 25 L 30 75 M 30 25 L 50 25 C 60 25 60 40 50 40 L 30 40 M 50 40 L 60 75"
      stroke="url(#minimal-gradient)"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Door in R */}
    <rect
      x="35"
      y="50"
      width="8"
      height="15"
      rx="1"
      fill="url(#minimal-gradient)"
    />
  </svg>
);

// Circular Badge Logo
export const RoomifyLogoBadge = ({ size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
      </filter>
    </defs>
    
    {/* Outer Circle */}
    <circle
      cx="60"
      cy="60"
      r="55"
      fill="url(#badge-gradient)"
      filter="url(#shadow)"
    />
    
    {/* Inner Circle */}
    <circle
      cx="60"
      cy="60"
      r="48"
      fill="white"
      opacity="0.1"
    />
    
    {/* Building Icon */}
    <rect
      x="40"
      y="45"
      width="40"
      height="35"
      rx="3"
      fill="white"
      opacity="0.9"
    />
    
    {/* Windows Grid */}
    <rect x="45" y="50" width="8" height="6" rx="1" fill="url(#badge-gradient)" opacity="0.6"/>
    <rect x="56" y="50" width="8" height="6" rx="1" fill="url(#badge-gradient)" opacity="0.6"/>
    <rect x="67" y="50" width="8" height="6" rx="1" fill="url(#badge-gradient)" opacity="0.6"/>
    <rect x="45" y="59" width="8" height="6" rx="1" fill="url(#badge-gradient)" opacity="0.6"/>
    <rect x="56" y="59" width="8" height="6" rx="1" fill="url(#badge-gradient)" opacity="0.6"/>
    <rect x="67" y="59" width="8" height="6" rx="1" fill="url(#badge-gradient)" opacity="0.6"/>
    
    {/* Door */}
    <rect
      x="53"
      y="68"
      width="14"
      height="12"
      rx="1"
      fill="url(#badge-gradient)"
    />
    
    {/* Roof */}
    <path
      d="M 35 45 L 60 35 L 85 45"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
  </svg>
);

// Horizontal Logo with Text
export const RoomifyLogoHorizontal = ({ height = 50 }) => (
  <svg
    height={height}
    viewBox="0 0 300 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="horizontal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    {/* Icon */}
    <g transform="translate(10, 10)">
      <rect x="5" y="20" width="50" height="40" rx="4" fill="url(#horizontal-gradient)" opacity="0.9"/>
      <rect x="22" y="35" width="16" height="25" rx="2" fill="white" opacity="0.9"/>
      <rect x="10" y="25" width="10" height="8" rx="1" fill="white" opacity="0.8"/>
      <rect x="40" y="25" width="10" height="8" rx="1" fill="white" opacity="0.8"/>
      <path d="M 0 20 L 30 5 L 60 20" fill="url(#horizontal-gradient)" opacity="0.8"/>
    </g>
    
    {/* Text */}
    <text
      x="85"
      y="50"
      fontFamily="Arial, sans-serif"
      fontSize="36"
      fontWeight="bold"
      fill="url(#horizontal-gradient)"
    >
      Roomify
    </text>
    
    {/* Tagline */}
    <text
      x="85"
      y="65"
      fontFamily="Arial, sans-serif"
      fontSize="12"
      fill="#6B7280"
      letterSpacing="1"
    >
      SMART BOOKING SYSTEM
    </text>
  </svg>
);

// Animated Logo
export const RoomifyLogoAnimated = ({ size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="animated-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6">
          <animate attributeName="stop-color" values="#8B5CF6; #EC4899; #8B5CF6" dur="3s" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" stopColor="#EC4899">
          <animate attributeName="stop-color" values="#EC4899; #8B5CF6; #EC4899" dur="3s" repeatCount="indefinite"/>
        </stop>
      </linearGradient>
    </defs>
    
    {/* Pulsing Circle */}
    <circle cx="50" cy="50" r="45" fill="url(#animated-gradient)" opacity="0.1">
      <animate attributeName="r" values="45; 48; 45" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.1; 0.2; 0.1" dur="2s" repeatCount="indefinite"/>
    </circle>
    
    {/* Building */}
    <rect x="25" y="35" width="50" height="45" rx="4" fill="url(#animated-gradient)" opacity="0.9">
      <animate attributeName="opacity" values="0.9; 1; 0.9" dur="2s" repeatCount="indefinite"/>
    </rect>
    
    {/* Door */}
    <rect x="42" y="55" width="16" height="25" rx="2" fill="white" opacity="0.9"/>
    
    {/* Windows */}
    <rect x="30" y="42" width="10" height="8" rx="1" fill="white" opacity="0.8">
      <animate attributeName="opacity" values="0.8; 0.4; 0.8" dur="1.5s" repeatCount="indefinite"/>
    </rect>
    <rect x="60" y="42" width="10" height="8" rx="1" fill="white" opacity="0.8">
      <animate attributeName="opacity" values="0.8; 0.4; 0.8" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
    </rect>
    
    {/* Roof */}
    <path d="M 20 35 L 50 20 L 80 35 Z" fill="url(#animated-gradient)" opacity="0.9"/>
    
    {/* Checkmark */}
    <g transform="translate(65, 25)">
      <circle cx="0" cy="0" r="12" fill="white" opacity="0.95"/>
      <path
        d="M -4 0 L -1 3 L 5 -4"
        stroke="url(#animated-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <animate attributeName="stroke-dasharray" values="0 20; 20 0" dur="1s" repeatCount="indefinite"/>
      </path>
    </g>
  </svg>
);

// Favicon/Small Icon
export const RoomifyFavicon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="favicon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    
    <rect width="32" height="32" rx="6" fill="url(#favicon-gradient)"/>
    <rect x="8" y="12" width="16" height="14" rx="1" fill="white" opacity="0.9"/>
    <rect x="14" y="18" width="4" height="8" rx="0.5" fill="url(#favicon-gradient)"/>
    <rect x="10" y="14" width="3" height="2" rx="0.5" fill="url(#favicon-gradient)" opacity="0.6"/>
    <rect x="19" y="14" width="3" height="2" rx="0.5" fill="url(#favicon-gradient)" opacity="0.6"/>
    <path d="M 6 12 L 16 6 L 26 12" fill="white" opacity="0.8"/>
  </svg>
);
