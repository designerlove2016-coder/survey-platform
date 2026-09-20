import React from 'react';

interface CountryFlagProps {
  countryCode: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ 
  countryCode, 
  className = '', 
  size = 'md' 
}) => {
  const code = (countryCode || '').toUpperCase().trim();

  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-5.5'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  // Real, vector SVG Flags that look crisp and clear on any operating system, eliminating "SA SA" text artifacts
  switch (code) {
    case 'SA':
      // Saudi Arabia Flag (Green field with white Arabic inscription & sword)
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-emerald-700/20 ${className}`}
          aria-label="Saudi Arabia Flag"
        >
          <rect width="36" height="24" fill="#006C35" />
          {/* Stylized Shahada script & sword in white */}
          <path d="M7 8.5h22v1.5H7zm3 3h16v1.2H10z" fill="#FFFFFF" opacity="0.95" />
          <path d="M9 14.2h18v1.1H9zm1 1.6l-3-0.5 3-0.5v1z" fill="#FFFFFF" />
          <circle cx="27" cy="14.7" r="1.1" fill="#FFFFFF" />
        </svg>
      );

    case 'GB':
    case 'UK':
      // United Kingdom Union Jack
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-blue-900/20 ${className}`}
          aria-label="United Kingdom Flag"
        >
          <clipPath id="uk-clip">
            <rect width="36" height="24" rx="2" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            <rect width="36" height="24" fill="#012169" />
            <path d="M0 0L36 24M36 0L0 24" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M0 0L36 24M36 0L0 24" stroke="#C8102E" strokeWidth="2.5" />
            <path d="M18 0v24M0 12h36" stroke="#FFFFFF" strokeWidth="7" />
            <path d="M18 0v24M0 12h36" stroke="#C8102E" strokeWidth="4.2" />
          </g>
        </svg>
      );

    case 'PH':
      // Philippines Flag (Blue & Red stripes, White triangle with yellow sun & 3 stars)
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-slate-300/40 ${className}`}
          aria-label="Philippines Flag"
        >
          <rect width="36" height="12" fill="#0038A8" />
          <rect y="12" width="36" height="12" fill="#CE1126" />
          <polygon points="0,0 18,12 0,24" fill="#FFFFFF" />
          <circle cx="6" cy="12" r="2.8" fill="#FCD116" />
          {/* 3 yellow stars */}
          <circle cx="2.5" cy="3.5" r="0.9" fill="#FCD116" />
          <circle cx="2.5" cy="20.5" r="0.9" fill="#FCD116" />
          <circle cx="15.5" cy="12" r="0.9" fill="#FCD116" />
        </svg>
      );

    case 'IN':
      // India Flag (Tricolor: Saffron, White, Green with Ashoka Chakra)
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-slate-300/40 ${className}`}
          aria-label="India Flag"
        >
          <rect width="36" height="8" fill="#FF9933" />
          <rect y="8" width="36" height="8" fill="#FFFFFF" />
          <rect y="16" width="36" height="8" fill="#138808" />
          <circle cx="18" cy="12" r="2.8" stroke="#000080" strokeWidth="0.8" fill="none" />
          <circle cx="18" cy="12" r="0.8" fill="#000080" />
        </svg>
      );

    case 'PK':
      // Pakistan Flag (Green field, white stripe on hoist, white crescent & star)
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-emerald-900/20 ${className}`}
          aria-label="Pakistan Flag"
        >
          <rect width="36" height="24" fill="#01411C" />
          <rect width="9" height="24" fill="#FFFFFF" />
          <circle cx="22.5" cy="12" r="5" fill="#FFFFFF" />
          <circle cx="24.2" cy="10.8" r="4.3" fill="#01411C" />
          <polygon points="24,8.5 25,11.5 22.5,9.5 25.5,9.5 23,11.5" fill="#FFFFFF" />
        </svg>
      );

    case 'ET':
      // Ethiopia Flag (Green, Yellow, Red with blue circle and gold star)
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-slate-300/40 ${className}`}
          aria-label="Ethiopia Flag"
        >
          <rect width="36" height="8" fill="#078930" />
          <rect y="8" width="36" height="8" fill="#FCDD09" />
          <rect y="16" width="36" height="8" fill="#DA121A" />
          <circle cx="18" cy="12" r="3.6" fill="#0F47AF" />
          <polygon points="18,9.5 19,12.5 16.5,10.5 19.5,10.5 17,12.5" fill="#FCDD09" />
        </svg>
      );

    case 'FR':
      // France Flag (Blue, White, Red vertical tricolor)
      return (
        <svg 
          viewBox="0 0 36 24" 
          className={`${selectedSize} rounded-[3px] shadow-2xs inline-block shrink-0 overflow-hidden border border-slate-300/40 ${className}`}
          aria-label="France Flag"
        >
          <rect width="12" height="24" fill="#002395" />
          <rect x="12" width="12" height="24" fill="#FFFFFF" />
          <rect x="24" width="12" height="24" fill="#ED2939" />
        </svg>
      );

    default:
      return (
        <div className={`${selectedSize} rounded-[3px] bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] font-mono font-bold text-slate-700 shadow-2xs inline-block shrink-0 ${className}`}>
          {code.slice(0, 2) || '🌐'}
        </div>
      );
  }
};
