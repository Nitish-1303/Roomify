import React from "react";

const RoomifyLogo = ({ size = 40, showText = true, className = "" }) => (
  <span className={`studio-logo ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="22" y="22" width="20" height="20" rx="7" />
      <rect x="25" y="10" width="14" height="6" rx="3" />
      <rect x="25" y="48" width="14" height="6" rx="3" />
      <rect x="10" y="25" width="6" height="14" rx="3" />
      <rect x="48" y="25" width="6" height="14" rx="3" />
    </svg>
    {showText ? (
      <span className="studio-wordmark">roomify</span>
    ) : (
      <span className="sr-only">Roomify</span>
    )}
  </span>
);

export default RoomifyLogo;
