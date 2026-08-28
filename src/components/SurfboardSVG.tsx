import React from "react";

interface SurfboardSVGProps {
  shapeType: "fish" | "thruster" | "stepup" | "midlength" | "log";
  accentColor?: string;
  className?: string;
}

export const SurfboardSVG: React.FC<SurfboardSVGProps> = ({
  shapeType,
  accentColor = "#00F0FF",
  className = "w-24 h-64"
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 280" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
        <defs>
          <linearGradient id={`boardGrad-${shapeType}`} x1="0" y1="0" x2="100" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#131B28" />
            <stop offset="50%" stopColor="#0B0E14" />
            <stop offset="100%" stopColor="#1A2536" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Board Outline Shapes */}
        {shapeType === "fish" && (
          // Deep swallow tail fish
          <path
            d="M50 15 C78 60, 85 180, 80 240 L65 260 L50 245 L35 260 L20 240 C15 180, 22 60, 50 15 Z"
            fill={`url(#boardGrad-${shapeType})`}
            stroke={accentColor}
            strokeWidth="2.5"
          />
        )}

        {shapeType === "thruster" && (
          // Squash tail performance thruster
          <path
            d="M50 10 C76 65, 82 170, 75 245 L25 245 C18 170, 24 65, 50 10 Z"
            fill={`url(#boardGrad-${shapeType})`}
            stroke={accentColor}
            strokeWidth="2.5"
          />
        )}

        {shapeType === "stepup" && (
          // Sleek round pin step-up
          <path
            d="M50 8 C72 60, 78 180, 50 260 C22 180, 28 60, 50 8 Z"
            fill={`url(#boardGrad-${shapeType})`}
            stroke={accentColor}
            strokeWidth="2.5"
          />
        )}

        {shapeType === "midlength" && (
          // Smooth round tail midlength
          <path
            d="M50 12 C75 50, 80 190, 72 250 C62 262, 38 262, 28 250 C20 190, 25 50, 50 12 Z"
            fill={`url(#boardGrad-${shapeType})`}
            stroke={accentColor}
            strokeWidth="2.5"
          />
        )}

        {shapeType === "log" && (
          // Full rounded nose longboard
          <path
            d="M50 12 C82 35, 84 200, 75 255 C65 264, 35 264, 25 255 C16 200, 18 35, 50 12 Z"
            fill={`url(#boardGrad-${shapeType})`}
            stroke={accentColor}
            strokeWidth="2.5"
          />
        )}

        {/* Stringer Line down the middle */}
        <line x1="50" y1="15" x2="50" y2="245" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Mangōpare Kowhaiwhai Deck Graphic */}
        <path
          d="M50 60 C60 70, 60 80, 50 90 C40 80, 40 70, 50 60 Z"
          fill={accentColor}
          fillOpacity="0.4"
          stroke={accentColor}
          strokeWidth="1"
        />
        <circle cx="50" cy="75" r="3" fill="#FF9E00" />

        {/* Fins visualizer at tail */}
        {shapeType === "fish" ? (
          // Twin Fins
          <g fill={accentColor} opacity="0.9">
            <polygon points="25,220 20,240 32,238" />
            <polygon points="75,220 80,240 68,238" />
          </g>
        ) : shapeType === "log" ? (
          // Single Large Fin
          <polygon points="50,225 45,255 55,255" fill="#FF9E00" opacity="0.9" />
        ) : (
          // Thruster / Quad fins
          <g fill={accentColor} opacity="0.8">
            <polygon points="30,225 25,242 36,240" />
            <polygon points="70,225 75,242 64,240" />
            <polygon points="50,230 47,245 53,245" fill="#FF9E00" />
          </g>
        )}
      </svg>
    </div>
  );
};
