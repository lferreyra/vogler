import React from 'react';

interface VoglerLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'white';
  showSubtitle?: boolean;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const VoglerLogo: React.FC<VoglerLogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = false,
  iconOnly = false,
  size = 'md',
}) => {
  // Size dimensions
  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  const currentHeight = heights[size];

  // Text color based on variant
  const textColor = variant === 'white' || variant === 'light' ? '#FFFFFF' : '#141414';
  const slotFill = variant === 'white' || variant === 'light' ? '#12382C' : '#FAFAF7';

  // Unique ID prefix to avoid SVG filter/gradient collisions when multiple instances are rendered
  const idPrefix = React.useId().replace(/:/g, '_');

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox={iconOnly ? "15 0 125 180" : "15 0 515 180"}
        className={`${currentHeight} w-auto max-w-full overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="VOGLER Parques y Jardines Logo"
      >
        <defs>
          {/* Leaf Gradients with natural botanical depth */}
          <linearGradient id={`${idPrefix}-leafLeft`} x1="0.1" y1="0.9" x2="0.8" y2="0.1">
            <stop offset="0%" stopColor="#236B28" />
            <stop offset="35%" stopColor="#3FA644" />
            <stop offset="80%" stopColor="#7BC338" />
            <stop offset="100%" stopColor="#9DD854" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-leafRight`} x1="0.2" y1="0.8" x2="0.9" y2="0.1">
            <stop offset="0%" stopColor="#28772C" />
            <stop offset="50%" stopColor="#4CAE4E" />
            <stop offset="100%" stopColor="#8BC34A" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-stem`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1B5E20" />
            <stop offset="100%" stopColor="#43A047" />
          </linearGradient>
          
          {/* Rich Soil Bed Gradient */}
          <radialGradient id={`${idPrefix}-soil`} cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#5A3720" />
            <stop offset="60%" stopColor="#3D2314" />
            <stop offset="100%" stopColor="#24140A" />
          </radialGradient>
        </defs>

        {/* 1. ICON: PALA CON TIERRA FÉRTIL Y BROTE BOTÁNICO */}
        <g transform="translate(0, 4)">
          {/* Shovel Outer Dark Green Border / Shield */}
          <path
            d="M 28 80 C 28 76 31 73 35 73 L 64 73 C 67 73 69 75 70 78 L 71 115 C 71 118 73 121 76 121 C 79 121 81 118 81 115 L 82 78 C 83 75 85 73 88 73 L 117 73 C 121 73 124 76 124 80 C 124 108 114 136 86 156 C 80 160 72 160 66 156 C 38 136 28 108 28 80 Z"
            fill={variant === 'white' ? '#1F5A38' : '#0F3822'}
          />

          {/* Shovel Inner Soil Bed (Rich compost) */}
          <path
            d="M 33 80 C 33 105 42 131 69 149 C 73 152 79 152 83 149 C 110 131 119 105 119 80 L 92 80 L 91 114 C 90 123 84 130 76 130 C 68 130 62 123 61 114 L 60 80 Z"
            fill={`url(#${idPrefix}-soil)`}
          />
          
          {/* Soil organic granules texture */}
          <g fill="#7A4D2E" opacity="0.85">
            <circle cx="45" cy="95" r="1.6" />
            <circle cx="52" cy="110" r="1.8" />
            <circle cx="42" cy="118" r="1.4" />
            <circle cx="58" cy="125" r="1.6" />
            <circle cx="68" cy="138" r="1.7" />
            <circle cx="76" cy="144" r="1.5" />
            <circle cx="84" cy="138" r="1.6" />
            <circle cx="94" cy="125" r="1.5" />
            <circle cx="108" cy="100" r="1.7" />
            <circle cx="100" cy="115" r="1.4" />
            <circle cx="48" cy="85" r="1.3" />
            <circle cx="104" cy="86" r="1.5" />
          </g>
          <g fill="#180C05" opacity="0.75">
            <circle cx="40" cy="105" r="1.8" />
            <circle cx="50" cy="120" r="1.5" />
            <circle cx="62" cy="132" r="1.6" />
            <circle cx="76" cy="136" r="2.0" />
            <circle cx="90" cy="132" r="1.6" />
            <circle cx="102" cy="108" r="1.8" />
            <circle cx="112" cy="92" r="1.5" />
          </g>

          {/* Central Handle Socket Slot */}
          <path
            d="M 68 73 L 69 114 C 69 118 72 121 76 121 C 80 121 83 118 83 114 L 84 73 Z"
            fill={slotFill}
          />

          {/* Sprout Stem */}
          <path
            d="M 74 116 L 74 65 C 74 50 78 38 82 28 C 81 28 78 36 76 48 L 76 116 Z"
            fill={`url(#${idPrefix}-stem)`}
          />

          {/* Left Large Leaf */}
          <path
            d="M 77 48 C 74 38 68 28 54 18 C 38 6 22 10 24 28 C 26 44 44 56 68 56 C 73 56 75 52 77 48 Z"
            fill={`url(#${idPrefix}-leafLeft)`}
          />
          {/* Left Leaf Highlights & Inner Rib */}
          <path
            d="M 75 48 C 65 44 52 36 40 25 C 33 19 28 14 24 28 C 23 20 32 12 46 15 C 60 18 70 32 75 48 Z"
            fill="#C6FF00"
            opacity="0.4"
          />
          <path
            d="M 76 48 C 68 42 54 32 40 22 C 32 17 26 18 24 28"
            stroke="#1B5E20"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Right Small Leaf */}
          <path
            d="M 80 44 C 84 38 92 28 108 26 C 122 24 126 36 116 45 C 104 54 90 53 82 48 C 80 46 80 44 80 44 Z"
            fill={`url(#${idPrefix}-leafRight)`}
          />
          <path
            d="M 82 46 C 90 42 102 36 112 32 C 120 28 123 32 116 45"
            stroke="#1B5E20"
            strokeWidth="1.1"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* 2. TYPOGRAPHY: "vogler" SIN CÉSPED (BASE TOTALMENTE LIMPIA Y PROLIJA) */}
        {!iconOnly && (
          <g fill={textColor} transform="translate(0, 4)">
            {/* Letter v */}
            <path d="M 148 76 L 167 76 L 184 122 L 201 76 L 220 76 L 195 136 L 173 136 Z" />
            
            {/* Letter o */}
            <path d="M 261 74 C 280 74 295 88 295 106 C 295 124 280 138 261 138 C 242 138 227 124 227 106 C 227 88 242 74 261 74 Z M 261 91 C 252 91 245 97 245 106 C 245 115 252 121 261 121 C 270 121 277 115 277 106 C 277 97 270 91 261 91 Z" />
            
            {/* Letter g */}
            <path d="M 334 76 L 334 88 C 330 80 320 74 308 74 C 291 74 278 87 278 106 C 278 125 291 138 308 138 C 320 138 330 132 334 124 L 334 134 C 334 147 326 154 312 154 C 301 154 293 150 289 144 L 276 154 C 284 165 297 171 312 171 C 338 171 352 156 352 132 L 352 76 Z M 315 91 C 324 91 332 97 332 106 C 332 115 324 121 315 121 C 306 121 298 115 298 106 C 298 97 306 91 315 91 Z" />
            
            {/* Letter l */}
            <path d="M 364 52 L 382 52 L 382 136 L 364 136 Z" />
            
            {/* Letter e */}
            <path d="M 424 74 C 406 74 392 87 392 106 C 392 125 406 138 426 138 C 439 138 450 132 456 122 L 441 113 C 438 118 433 121 426 121 C 417 121 411 116 410 108 L 459 108 C 460 106 460 103 460 101 C 460 85 446 74 424 74 Z M 410 97 C 412 92 417 88 424 88 C 431 88 437 92 439 97 Z" />
            
            {/* Letter r */}
            <path d="M 470 76 L 488 76 L 488 88 C 492 80 500 75 511 75 L 514 75 L 514 94 C 500 94 488 101 488 114 L 488 136 L 470 136 Z" />
          </g>
        )}
      </svg>

      {showSubtitle && (
        <span
          className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase ${
            variant === 'white' || variant === 'light' ? 'text-[#8FA58D]' : 'text-[#12382C]'
          }`}
        >
          Parques & Jardines
        </span>
      )}
    </div>
  );
};
