import React from "react";

interface KowhaiwhaiProps {
  className?: string;
  color?: string;
  height?: number;
}

export const KowhaiwhaiPattern: React.FC<KowhaiwhaiProps> = ({
  className = "",
  color = "#00F0FF",
  height = 24
}) => {
  return (
    <div className={`w-full overflow-hidden opacity-80 ${className}`}>
      <svg
        viewBox="0 0 1200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ height: `${height}px` }}
      >
        <pattern id="mangopare" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
          {/* Mangōpare / Hammerhead Wave Kowhaiwhai motif */}
          <path
            d="M0 20 C20 5, 40 5, 60 20 C80 35, 100 35, 120 20 C100 5, 80 5, 60 20 C40 35, 20 35, 0 20 Z"
            fill={color}
            fillOpacity="0.15"
            stroke={color}
            strokeWidth="1.5"
          />
          <circle cx="60" cy="20" r="4" fill={color} />
          <path
            d="M30 20 Q45 10 60 20 Q75 30 90 20"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <circle cx="20" cy="20" r="2.5" fill="#FF9E00" />
          <circle cx="100" cy="20" r="2.5" fill="#FF9E00" />
        </pattern>
        <rect width="1200" height="40" fill="url(#mangopare)" />
      </svg>
    </div>
  );
};
