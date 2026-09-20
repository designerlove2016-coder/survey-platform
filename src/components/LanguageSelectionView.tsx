import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronRight, Globe, Sparkles } from 'lucide-react';
import { LanguageItem } from '../types';
import { PandaIcon } from './PandaIcon';
import { CountryFlag } from './CountryFlag';

interface LanguageSelectionViewProps {
  languages: LanguageItem[];
  currentLangCode: string;
  onSelectLanguage: (code: string) => void;
  onConfirm: () => void;
  logoUrl?: string | null;
  brandNameAr?: string;
  brandNameEn?: string;
  customTitle?: string;
  customSubtitle?: string;
  customBadge?: string;
}

export const LanguageSelectionView: React.FC<LanguageSelectionViewProps> = ({
  languages,
  currentLangCode,
  onSelectLanguage,
  onConfirm,
  logoUrl,
  brandNameAr,
  brandNameEn,
  customTitle,
  customSubtitle,
  customBadge,
}) => {
  const activeLanguages = languages.filter(l => l.isActive);

  // Find index of currently selected language
  const activeIndex = activeLanguages.findIndex(l => l.code === currentLangCode);
  const selectedIndex = activeIndex >= 0 ? activeIndex : 0;

  const total = activeLanguages.length;
  const currentLang = activeLanguages[selectedIndex] || activeLanguages[0];

  // For roller navigation
  const prevIndex = (selectedIndex - 1 + total) % total;
  const nextIndex = (selectedIndex + 1) % total;

  const prevLang = activeLanguages[prevIndex];
  const nextLang = activeLanguages[nextIndex];

  // Touch & drag handling for roller
  const touchStartY = useRef<number | null>(null);
  const rollerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diff = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        // Swiped down -> previous language
        onSelectLanguage(prevLang.code);
      } else {
        // Swiped up -> next language
        onSelectLanguage(nextLang.code);
      }
    }
    touchStartY.current = null;
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 15) {
      onSelectLanguage(nextLang.code);
    } else if (e.deltaY < -15) {
      onSelectLanguage(prevLang.code);
    }
  }, [nextLang, prevLang, onSelectLanguage]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        onSelectLanguage(prevLang.code);
      } else if (e.key === 'ArrowDown') {
        onSelectLanguage(nextLang.code);
      } else if (e.key === 'Enter') {
        onConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevLang, nextLang, onSelectLanguage, onConfirm]);

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-4 flex flex-col items-center">
      {/* Unified Main Card Container - Matching Reference Template */}
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden">
        
        {/* Top Corner Country Flag & Code Badge */}
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200 text-xs font-black text-emerald-800 shadow-2xs select-none">
          <CountryFlag countryCode={currentLang.countryCode} size="md" />
          <span className="font-mono text-xs font-black tracking-wider text-emerald-900">
            {currentLang.countryCode}
          </span>
        </div>

        <div className="w-full flex flex-col items-center flex-1 justify-center">
          {/* Top Brand Container (Unified Brand Logo & Name) */}
          <div className="flex flex-col items-center mb-2 select-none">
          <div className="border border-orange-200/90 rounded-xl py-1.5 px-4 bg-white shadow-2xs flex items-center justify-center gap-2.5 max-w-[260px]">
            {logoUrl ? (
              <div className="flex items-center gap-2.5">
                <img 
                  src={logoUrl} 
                  alt="Store Logo" 
                  className="h-8 max-w-[90px] object-contain rounded-lg drop-shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="block text-xs sm:text-sm font-black text-[#005A2B] leading-none">
                    {currentLangCode === 'en' ? (brandNameEn || brandNameAr || 'Panda') : (brandNameAr || brandNameEn || 'بنده')}
                  </span>
                  <span className="block text-[9px] font-bold text-[#E34F26] leading-none mt-0.5">
                    {currentLang.translations.brandSubtitle || 'عالم من المزايا'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-right rtl:text-right ltr:text-left">
                  <span className="block text-xs sm:text-sm font-black text-[#005A2B] leading-none">{brandNameAr || 'بنده'}</span>
                  <span className="block text-[10px] font-bold text-[#005A2B] tracking-wider leading-none">{brandNameEn || 'panda'}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#E34F26] to-[#F77F00] p-0.5 flex items-center justify-center shadow-xs">
                  <span className="text-xs">🍊</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Badge Pill */}
        <div className="bg-[#EBF7F0] border border-[#C6EAD7] text-[#006837] px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs mb-2">
          <span className="text-amber-500 text-xs">✨</span>
          <span>{customBadge || currentLang.translations.welcomeBadge || (currentLangCode === 'en' ? `Welcome to ${brandNameEn || 'Panda'} Stores` : `مرحباً بك في أسواق ${brandNameAr || 'بنده'}`)}</span>
          <span className="text-xs">🐼</span>
        </div>

        {/* Main Heading: اختر لغتك المفضلة 🌐 */}
        <h2 className="text-xl sm:text-2xl font-black text-[#00381C] flex items-center justify-center gap-1.5 mb-0.5 tracking-tight">
          <span>{customTitle || currentLang.translations.chooseLanguageTitle || 'اختر لغتك المفضلة'}</span>
          <span className="text-[#006837]">🌐</span>
        </h2>

        {/* Subtitle: لتجربة تسوق ذكية وممتعة مخصصة لك */}
        <p className="text-[11px] sm:text-xs text-gray-500 font-medium mb-3 max-w-xs">
          {customSubtitle || currentLang.translations.chooseLanguageSubtitle || 'لتجربة تسوق ذكية وممتعة مخصصة لك'}
        </p>

        {/* Roller / Wheel Picker Container */}
        <div 
          ref={rollerRef}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full flex flex-col items-center gap-1.5 relative select-none py-0.5"
        >
          {/* Previous Language (faded above) */}
          <div 
            onClick={() => onSelectLanguage(prevLang.code)}
            className="w-full py-1 px-3 sm:px-4 rounded-lg flex items-center justify-between opacity-40 hover:opacity-80 transition-all cursor-pointer text-gray-600"
          >
            {/* Left Corner Flag */}
            <div className="flex items-center gap-1.5">
              <CountryFlag countryCode={prevLang.countryCode} size="sm" />
              <span className="text-[11px] font-bold text-gray-400 font-mono">{prevLang.countryCode}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm font-bold text-gray-600 leading-tight">
                {prevLang.name}
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                {prevLang.nativeSublabel}
              </span>
            </div>

            {/* Right Corner Flag */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-400 font-mono">{prevLang.countryCode}</span>
              <CountryFlag countryCode={prevLang.countryCode} size="sm" />
            </div>
          </div>

          {/* ACTIVE Selected Language Frame with side bars & corner flags */}
          <motion.div 
            key={currentLang.code}
            initial={{ scale: 0.98, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.16 }}
            className="w-full py-2.5 px-2.5 sm:px-4 rounded-xl bg-[#E8F8F0] border-2 border-[#1E7E4E]/85 shadow-[0_4px_14px_rgba(0,90,43,0.08)] flex items-center justify-between relative group"
          >
            {/* Left Vertical Dark Green Accent Bar */}
            <div className="w-1.5 h-6 sm:h-7 bg-[#005A2B] rounded-full shrink-0 shadow-xs" />

            {/* Left Corner: Country Flag + Country Code */}
            <div className="flex items-center gap-2 ml-1 sm:ml-2">
              <CountryFlag countryCode={currentLang.countryCode} size="md" />
              <span className="text-xs sm:text-sm font-black text-[#005A2B] font-mono tracking-wider">
                {currentLang.countryCode}
              </span>
            </div>

            {/* Center Language Name & Native Sublabel */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <span className="text-base sm:text-lg font-black text-[#00381C] leading-tight">
                {currentLang.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#006837] mt-0.5">
                {currentLang.nativeSublabel}
              </span>
            </div>

            {/* Right Corner: Country Code + Country Flag */}
            <div className="flex items-center gap-2 mr-1 sm:mr-2">
              <span className="text-xs sm:text-sm font-black text-[#005A2B] font-mono tracking-wider">
                {currentLang.countryCode}
              </span>
              <CountryFlag countryCode={currentLang.countryCode} size="md" />
            </div>

            {/* Right Vertical Dark Green Accent Bar */}
            <div className="w-1.5 h-6 sm:h-7 bg-[#005A2B] rounded-full shrink-0 shadow-xs" />
          </motion.div>

          {/* Next Language (faded below) */}
          <div 
            onClick={() => onSelectLanguage(nextLang.code)}
            className="w-full py-1 px-3 sm:px-4 rounded-lg flex items-center justify-between opacity-40 hover:opacity-80 transition-all cursor-pointer text-gray-600"
          >
            {/* Left Corner Flag */}
            <div className="flex items-center gap-1.5">
              <CountryFlag countryCode={nextLang.countryCode} size="sm" />
              <span className="text-[11px] font-bold text-gray-400 font-mono">{nextLang.countryCode}</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm font-bold text-gray-600 leading-tight">
                {nextLang.name}
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                {nextLang.nativeSublabel}
              </span>
            </div>

            {/* Right Corner Flag */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-400 font-mono">{nextLang.countryCode}</span>
              <CountryFlag countryCode={nextLang.countryCode} size="sm" />
            </div>
          </div>
        </div>

        {/* Scroll / Swipe Guide Text */}
        <div className="flex items-center justify-center gap-1 text-gray-400 text-[10px] font-semibold mt-1 mb-2.5">
          <ChevronUp size={12} className="text-gray-400" />
          <span>{currentLang.translations.scrollHint || 'حرك بإصبعك لأعلى ولأسفل ثم اضغط تأكيد'}</span>
          <ChevronDown size={12} className="text-gray-400" />
        </div>
        </div>

        {/* Bottom Confirmation Button: تأكيد ومتابعة */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-[#E34F26] via-[#ea5a32] to-[#cf421b] text-white text-base font-black rounded-2xl shadow-[0_8px_22px_rgba(227,79,38,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] border-t border-white/35 hover:shadow-[0_12px_28px_rgba(227,79,38,0.45)] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{currentLang.translations.confirmAndContinue || 'تأكيد ومتابعة'}</span>
          <ChevronRight size={18} className={`text-white shrink-0 ${currentLang.dir === 'rtl' ? 'rotate-180' : ''}`} />
        </motion.button>

      </div>
    </div>
  );
};
