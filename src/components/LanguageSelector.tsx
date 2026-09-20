import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageItem } from '../types';

interface LanguageSelectorProps {
  languages: LanguageItem[];
  currentLangCode: string;
  onSelectLanguage: (code: string) => void;
  variant?: 'header' | 'chips';
  id?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  currentLangCode,
  onSelectLanguage,
  variant = 'header',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLanguages = languages.filter(l => l.isActive);
  const currentLang = activeLanguages.find(l => l.code === currentLangCode) || activeLanguages[0] || languages[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'chips') {
    return (
      <div className="w-full flex items-center justify-center overflow-x-auto py-1">
        <div 
          dir="rtl"
          className="flex items-center gap-2 p-1.5 bg-gray-50/90 rounded-full border border-gray-200/60 shadow-2xs max-w-full overflow-x-auto no-scrollbar"
        >
          {activeLanguages.map((lang) => {
            const isSelected = lang.code === currentLangCode;
            const code = lang.countryCode || lang.code.toUpperCase();
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#005A2B] text-white shadow-xs scale-102'
                    : 'bg-white hover:bg-gray-100/90 text-gray-700 border border-gray-100'
                }`}
                title={`${lang.englishName} (${lang.name})`}
              >
                <span>{lang.name}</span>
                <span className={`text-[11px] font-bold ${isSelected ? 'text-emerald-200' : 'text-gray-400 font-mono'}`}>
                  {code}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id={id || "language-selector-btn"}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 shadow-2xs text-xs font-black flex items-center gap-2 text-gray-800 transition-all cursor-pointer hover:border-emerald-600"
        title={currentLangCode === 'ar' ? 'تغيير اللغة' : 'Change Language'}
      >
        <span className="bg-[#005A2B] text-white text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold">
          {currentLang?.countryCode || currentLang?.code.toUpperCase() || 'SA'}
        </span>
        <span className="font-black text-xs">{currentLang?.name || 'العربية'}</span>
        <ChevronDown size={13} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden text-right"
            dir="rtl"
          >
            <div className="px-3.5 py-1.5 border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
              <span className="flex items-center gap-1.5">
                <Globe size={13} className="text-emerald-600" />
                <span>اللغات المتاحة</span>
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md font-mono font-black">
                {activeLanguages.length}
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto py-1">
              {activeLanguages.map((lang) => {
                const isSelected = lang.code === currentLangCode;
                const countryCode = lang.countryCode || lang.code.toUpperCase();
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 text-[#005A2B]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <div className="text-right">
                        <div className="leading-tight font-black">{lang.name}</div>
                        <div className="text-[10px] text-gray-400 font-normal">{lang.englishName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-200/70 text-[#005A2B]' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {countryCode}
                      </span>
                      {isSelected && (
                        <Check size={15} className="text-[#005A2B] shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
