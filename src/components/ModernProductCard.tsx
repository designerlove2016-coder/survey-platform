import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { ProductItemConfig } from '../types';
import { getProductTranslatedName, translateBadge, getUIString } from '../utils/languages';

interface ModernProductCardProps {
  product: ProductItemConfig;
  isSelected?: boolean;
  onToggle?: () => void;
  isEnglish?: boolean;
  currentLangCode?: string;
  layoutVariant?: 'tall' | 'wide' | 'standard' | 'compact';
  isInteractive?: boolean;
  selectedBadgeText?: string;
  tapToSelectText?: string;
}

export const ModernProductCard: React.FC<ModernProductCardProps> = ({
  product,
  isSelected = false,
  onToggle,
  isEnglish = false,
  currentLangCode,
  layoutVariant,
  isInteractive = true,
  selectedBadgeText,
  tapToSelectText,
}) => {
  // Determine variant: explicit layoutVariant > product.cardType > default 'compact'
  const variant = layoutVariant || product.cardType || 'compact';

  const effectiveLang = currentLangCode || (isEnglish ? 'en' : 'ar');
  const isRTL = effectiveLang === 'ar' || effectiveLang === 'ur';

  const rawBadge = product.badge?.trim();
  const badgeText = translateBadge(rawBadge, effectiveLang);

  // Dynamically translated product name using ID lookup, name lookup, and fallbacks
  const baseFallback = effectiveLang === 'en'
    ? (product.nameEn || product.name)
    : (product.name || product.nameEn);
  const displayName = getProductTranslatedName(product.id, baseFallback, effectiveLang);

  const localizedSelectedBadge = selectedBadgeText || getUIString('selectedBadge', effectiveLang);
  const localizedTapToSelect = tapToSelectText || getUIString('tapToSelect', effectiveLang);
  const localizedNoImage = getUIString('noImage', effectiveLang);

  // Container styling - calibrated so all 4 cards fit simultaneously on screen without scrolling
  const getVariantClasses = () => {
    const alignClass = isRTL ? 'text-right' : 'text-left';
    switch (variant) {
      case 'tall':
        return `col-span-1 row-span-2 h-full min-h-[260px] sm:min-h-[285px] flex flex-col justify-between ${alignClass}`;
      case 'wide':
        return `col-span-2 min-h-[118px] sm:min-h-[128px] max-h-[135px] flex flex-col justify-between ${alignClass}`;
      case 'compact':
        return `col-span-1 h-[168px] sm:h-[180px] flex flex-col justify-between ${alignClass}`;
      case 'standard':
      default:
        return `col-span-1 h-[126px] sm:h-[138px] flex flex-col justify-between ${alignClass}`;
    }
  };

  // Image container height - maximized photo display while keeping full screen visibility
  const getImageBoxClasses = () => {
    switch (variant) {
      case 'tall':
        return 'w-full flex-1 min-h-[185px] sm:min-h-[205px]';
      case 'wide':
        return 'w-full h-16 sm:h-20';
      case 'compact':
        return 'w-full h-[110px] sm:h-[120px]';
      case 'standard':
      default:
        return 'w-full h-[76px] sm:h-[86px]';
    }
  };

  return (
    <motion.button
      type="button"
      id={`modern-product-${product.id}`}
      disabled={!isInteractive}
      onClick={isInteractive ? onToggle : undefined}
      whileHover={isInteractive ? { scale: 1.02, y: -2 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 420, damping: 25 }}
      className={`group relative w-full p-1.5 sm:p-2 rounded-[22px] sm:rounded-[24px] transition-all duration-300 select-none overflow-hidden cursor-pointer ${getVariantClasses()} ${
        isSelected
          ? 'bg-white border-2 border-emerald-500 shadow-[0_0_22px_rgba(16,185,129,0.55),0_0_8px_rgba(52,211,153,0.6),inset_0_0_12px_rgba(16,185,129,0.15)] ring-2 ring-emerald-400/50'
          : 'bg-white border border-slate-200/90 hover:border-emerald-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_0_20px_rgba(16,185,129,0.38),0_0_6px_rgba(52,211,153,0.4),0_6px_16px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* 🌟 Luminous Pulsing Glow Frame when Selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[22px] sm:rounded-[24px] pointer-events-none animate-pulse border-2 border-emerald-400/70 shadow-[inset_0_0_14px_rgba(16,185,129,0.25)]" />
      )}

      {/* Ambient background hover shimmer */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isSelected 
            ? 'opacity-100 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10' 
            : 'opacity-0 group-hover:opacity-100 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/30'
        }`} 
      />

      {/* 1. MAXIMIZED FULL IMAGE BOX */}
      <div className={`${getImageBoxClasses()} relative w-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-slate-100 shadow-xs border border-slate-200/60 z-10 flex items-center justify-center`}>
        {/* Soft top gradient */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/45 via-black/15 to-transparent pointer-events-none z-10" />

        {/* 🎯 SELECTION DOT */}
        <div className={`absolute top-2.5 ${isRTL ? 'right-2.5' : 'left-2.5'} z-20`}>
          {isSelected ? (
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-gradient-to-tr from-[#005A2B] via-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-[0_0_14px_rgba(16,185,129,0.9),0_2px_6px_rgba(0,0,0,0.3)] ring-2 ring-white">
              <Check size={13} strokeWidth={3.5} />
            </div>
          ) : (
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-white/90 backdrop-blur-md border-2 border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.25)] group-hover:border-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-emerald-500 transition-colors" />
            </div>
          )}
        </div>

        {/* 🏷️ BADGE (e.g. Soon, عروض حصرية) */}
        {badgeText && (
          <div className={`absolute top-2.5 ${isRTL ? 'left-2.5' : 'right-2.5'} z-20`}>
            <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              {badgeText}
            </span>
          </div>
        )}

        {/* Product Image - Full Cover */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={displayName}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 text-slate-400 gap-1">
            <span className="text-3xl">{product.icon || '🛍️'}</span>
            <span className="text-[9px] font-bold">{localizedNoImage}</span>
          </div>
        )}
      </div>

      {/* 2. COMPACT BOTTOM BAR */}
      <div className={`w-full pt-1.5 sm:pt-2 pb-0.5 px-1 relative z-10 flex flex-col items-start ${isRTL ? 'text-right' : 'text-left'}`}>
        <h4 className="w-full font-black text-xs sm:text-sm text-slate-800 line-clamp-1 leading-tight tracking-tight">
          {displayName}
        </h4>
        <div className="mt-0.5 flex items-center gap-1 w-full justify-between">
          {isSelected ? (
            <span className="text-[9px] sm:text-[10px] font-black text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{localizedSelectedBadge}</span>
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
              {localizedTapToSelect}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
};

