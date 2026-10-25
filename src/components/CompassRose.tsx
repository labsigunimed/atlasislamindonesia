import React, { useState } from 'react';

interface CompassRoseProps {
  onResetOrientation: () => void;
  className?: string;
}

export const CompassRose: React.FC<CompassRoseProps> = ({ onResetOrientation, className = '' }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onResetOrientation();
    setTimeout(() => {
      setIsRotating(false);
    }, 700);
  };

  return (
    <div
      className={`group relative flex flex-col items-center select-none ${className}`}
      title="Orientasi Mata Angin (Klik untuk mengunci ke Utara Sejati)"
    >
      <button
        onClick={handleClick}
        aria-label="Orientasi Mata Angin - Klik untuk reset pandangan ke Utara"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F4F0E6]/95 hover:bg-[#F4F0E6] p-1.5 shadow-xl border-2 border-[#B58B4D] hover:border-[#8e6d38] backdrop-blur transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
      >
        {/* Outer Ring with Degree Ticks */}
        <div className="absolute inset-1 rounded-full border border-[#B58B4D]/40 pointer-events-none" />

        {/* The SVG Nautical Compass Rose */}
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full transform transition-transform duration-700 ease-out ${
            isRotating ? 'rotate-[360deg]' : 'rotate-0'
          }`}
        >
          <defs>
            <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBF7A" />
              <stop offset="100%" stopColor="#B58B4D" />
            </linearGradient>
            <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8E6D38" />
              <stop offset="100%" stopColor="#5E4520" />
            </linearGradient>
            <linearGradient id="charcoalDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#254353" />
              <stop offset="100%" stopColor="#172B36" />
            </linearGradient>
            <filter id="compassShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background circle */}
          <circle cx="50" cy="50" r="46" fill="#F4F0E6" stroke="#B58B4D" strokeWidth="1" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#B58B4D" strokeWidth="0.5" strokeDasharray="1,2" />

          {/* Ordinal Corner Points (TL, TG, BD, BL) - 45 deg */}
          <g filter="url(#compassShadow)">
            {/* North-East */}
            <polygon points="50,50 50,22 55,50" fill="#B58B4D" opacity="0.8" transform="rotate(45 50 50)" />
            <polygon points="50,50 50,22 45,50" fill="#172B36" opacity="0.6" transform="rotate(45 50 50)" />

            {/* South-East */}
            <polygon points="50,50 50,22 55,50" fill="#B58B4D" opacity="0.8" transform="rotate(135 50 50)" />
            <polygon points="50,50 50,22 45,50" fill="#172B36" opacity="0.6" transform="rotate(135 50 50)" />

            {/* South-West */}
            <polygon points="50,50 50,22 55,50" fill="#B58B4D" opacity="0.8" transform="rotate(225 50 50)" />
            <polygon points="50,50 50,22 45,50" fill="#172B36" opacity="0.6" transform="rotate(225 50 50)" />

            {/* North-West */}
            <polygon points="50,50 50,22 55,50" fill="#B58B4D" opacity="0.8" transform="rotate(315 50 50)" />
            <polygon points="50,50 50,22 45,50" fill="#172B36" opacity="0.6" transform="rotate(315 50 50)" />
          </g>

          {/* Cardinal Main Points (U, T, S, B) */}
          <g filter="url(#compassShadow)">
            {/* EAST (Timur) */}
            <polygon points="50,50 88,50 50,44" fill="url(#goldLight)" />
            <polygon points="50,50 88,50 50,56" fill="url(#charcoalDark)" />

            {/* SOUTH (Selatan) */}
            <polygon points="50,50 50,88 44,50" fill="url(#goldLight)" />
            <polygon points="50,50 50,88 56,50" fill="url(#charcoalDark)" />

            {/* WEST (Barat) */}
            <polygon points="50,50 12,50 50,56" fill="url(#goldLight)" />
            <polygon points="50,50 12,50 50,44" fill="url(#charcoalDark)" />

            {/* NORTH (Utara) - Extra prominent with Regal Arrowhead */}
            <polygon points="50,50 50,8 43,50" fill="url(#goldLight)" />
            <polygon points="50,50 50,8 57,50" fill="url(#goldDark)" />
            <polygon points="50,6 45,15 55,15" fill="#B58B4D" />
          </g>

          {/* Center Hub */}
          <circle cx="50" cy="50" r="7" fill="url(#goldLight)" stroke="#172B36" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3.5" fill="#172B36" />
          <circle cx="50" cy="50" r="1.5" fill="#F4F0E6" />

          {/* Cardinal Letter Labels */}
          {/* U - UTARA (Top) */}
          <text
            x="50"
            y="17"
            textAnchor="middle"
            fill="#172B36"
            fontSize="10"
            fontWeight="bold"
            fontFamily="'Cinzel', serif"
          >
            U
          </text>

          {/* T - TIMUR (Right) */}
          <text
            x="93"
            y="53.5"
            textAnchor="middle"
            fill="#172B36"
            fontSize="8"
            fontWeight="bold"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            T
          </text>

          {/* S - SELATAN (Bottom) */}
          <text
            x="50"
            y="95"
            textAnchor="middle"
            fill="#172B36"
            fontSize="8"
            fontWeight="bold"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            S
          </text>

          {/* B - BARAT (Left) */}
          <text
            x="7"
            y="53.5"
            textAnchor="middle"
            fill="#172B36"
            fontSize="8"
            fontWeight="bold"
            fontFamily="'Plus Jakarta Sans', sans-serif"
          >
            B
          </text>
        </svg>

        {/* Tooltip on hover */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-[#172B36] text-[#F4F0E6] text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap border border-[#B58B4D]/40 font-medium z-30">
          Utara Sejati
        </div>
      </button>

      {/* Caption badge */}
      <div className="mt-1 px-1.5 py-0.5 rounded bg-[#172B36]/80 text-[#F4F0E6] text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase border border-[#B58B4D]/30 shadow-sm hidden sm:block">
        Mata Angin
      </div>
    </div>
  );
};
