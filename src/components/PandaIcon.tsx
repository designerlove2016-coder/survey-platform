import React from 'react';
import { motion } from 'motion/react';

interface PandaIconProps {
  size?: number;
  onClick?: () => void;
  className?: string;
  customImageUrl?: string | null;
}

export const PandaIcon: React.FC<PandaIconProps> = ({
  size = 60,
  onClick,
  className = '',
  customImageUrl,
}) => (
  <motion.div 
    whileTap={onClick ? { scale: 0.8 } : undefined}
    onClick={onClick}
    style={{ width: size, height: size }} 
    className={`relative flex items-center justify-center ${onClick ? 'cursor-pointer' : 'cursor-default select-none'} ${className}`}
  >
    {customImageUrl ? (
      <img 
        src={customImageUrl} 
        alt="Logo" 
        className="w-full h-full object-contain rounded-xl" 
        referrerPolicy="no-referrer" 
      />
    ) : (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Main Card Shape */}
        <rect x="2" y="10" width="96" height="70" rx="12" fill="white" stroke="#E34F26" strokeWidth="1.5" />
        
        {/* Arabic Text */}
        <text x="35" y="40" textAnchor="middle" fill="#005A2B" fontSize="18" fontWeight="900" style={{ fontFamily: 'inherit' }}>بنده</text>
        
        {/* English Text */}
        <text x="35" y="62" textAnchor="middle" fill="#005A2B" fontSize="16" fontWeight="900" style={{ fontFamily: 'inherit' }}>panda</text>
        
        {/* Red Circle / Logo shape */}
        <circle cx="78" cy="45" r="18" fill="#E34F26" />
        
        {/* Leaf / Stem */}
        <path 
          d="M78 28 C85 20 92 30 85 35 C78 40 70 30 78 28" 
          fill="#005A2B" 
          transform="rotate(-15, 78, 28)"
        />
        
        <circle cx="78" cy="45" r="8" fill="white" className="opacity-20" />
      </svg>
    )}
  </motion.div>
);
