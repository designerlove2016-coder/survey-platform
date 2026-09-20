import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Type, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Copy,
  Sliders
} from 'lucide-react';
import { FontOption } from '../types';
import { AVAILABLE_FONTS, applyFontToDocument } from '../utils/fonts';
import { soundManager } from '../utils/audio';

interface FontSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFontId: string;
  onSelectFont: (fontId: string) => void;
  isEnglish?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export const FontSelectorModal: React.FC<FontSelectorModalProps> = ({
  isOpen,
  onClose,
  currentFontId,
  onSelectFont,
  isEnglish = false,
  primaryColor = '#00B4D8',
  accentColor = '#38BDF8',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'image-match' | 'geometric' | 'display' | 'sans'>('all');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const filteredFonts = AVAILABLE_FONTS.filter(font => {
    if (activeTab === 'all') return true;
    if (activeTab === 'image-match') return font.category === 'image-match';
    return font.category === activeTab;
  });

  const handleApply = (fontId: string) => {
    soundManager.playPop();
    applyFontToDocument(fontId);
    onSelectFont(fontId);
  };

  const copyPromptText = () => {
    const prompt = `يرجى استخدام الخط العربي المختار وتطبيقه على كافة واجهات وتطبيقات تجربة العملاء، مع دعم التبديل التفاعلي بين الخطوط:
1. خط الصورة الأولى: Baloo Bhaijaan 2 (عريض ومرح).
2. خط الصورة الثانية: Changa (كوفي هندسي مربع وتقني).
بالإضافة إلى إمكانية اختيار خطوط Cairo, Readex Pro, Almarai, Tajawal, و IBM Plex Sans Arabic.`;
    navigator.clipboard.writeText(prompt);
    soundManager.playPop();
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-2 sm:p-5 overflow-y-auto pointer-events-none bg-black/25 backdrop-blur-[2px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#0B0D13]/95 backdrop-blur-md border border-white/[0.15] rounded-3xl shadow-2xl overflow-hidden my-auto text-white pointer-events-auto max-h-[88vh] flex flex-col"
          dir={isEnglish ? 'ltr' : 'rtl'}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0E1017]">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center border"
                style={{ 
                  backgroundColor: `${primaryColor}20`,
                  borderColor: `${primaryColor}40`,
                  color: primaryColor 
                }}
              >
                <Type size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black tracking-tight text-white">
                    {isEnglish ? 'Typography & Font Selector' : 'محدد خطوط الواجهة والتطبيق'}
                  </h2>
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider"
                    style={{ 
                      backgroundColor: `${primaryColor}25`,
                      color: primaryColor 
                    }}
                  >
                    {isEnglish ? 'Full UI' : 'كامل الواجهة'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {isEnglish 
                    ? 'Select any font to instantly apply it across all screens, headers, buttons, and mobile views.' 
                    : 'اختر أي خط لتطبيقه فوراً وبنقرة واحدة على كامل الموقع والأزرار والشاشات.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Featured Banner for the 2 Uploaded Images */}
          <div className="px-6 pt-5 pb-2">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-purple-950/30 to-indigo-950/40 border border-sky-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {isEnglish ? 'Included Fonts from Your Uploaded Images:' : 'الخطان المستخرجان من صورتيك المرفوعتين:'}
                  </h4>
                  <p className="text-[11px] text-gray-300 font-medium">
                    {isEnglish 
                      ? '1. Baloo Bhaijaan 2 (Chunky/Playful) • 2. Changa (Geometric Squarish Kufic)' 
                      : '١. خط بالو (عريض ومرح - الصورة الأولى) • ٢. خط شانجا (كوفي مربع هندسي - الصورة الثانية)'}
                  </p>
                </div>
              </div>
              <button
                onClick={copyPromptText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-sky-300 text-xs font-bold transition-all shrink-0 cursor-pointer border border-sky-500/30"
              >
                {copiedPrompt ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedPrompt ? (isEnglish ? 'Copied Prompt!' : 'تم نسخ البرومبت!') : (isEnglish ? 'Copy Font Prompt' : 'نسخ برومبت الخطوط')}</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 px-6 py-3 border-b border-white/[0.06] overflow-x-auto">
            {[
              { id: 'all', labelAr: 'جميع الخطوط', labelEn: 'All Fonts' },
              { id: 'image-match', labelAr: 'خطوط الصورتين 🌟', labelEn: 'Image Matches 🌟' },
              { id: 'geometric', labelAr: 'كوفية وهندسية 📐', labelEn: 'Geometric & Kufic' },
              { id: 'display', labelAr: 'عريضة ومرحة 🎨', labelEn: 'Bold & Display' },
              { id: 'sans', labelAr: 'رسمية ومتزنة 🏛️', labelEn: 'Clean Sans' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {isEnglish ? tab.labelEn : tab.labelAr}
              </button>
            ))}
          </div>

          {/* Fonts Grid */}
          <div className="p-6 max-h-[58vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFonts.map((font) => {
                const isSelected = currentFontId === font.id;

                return (
                  <div
                    key={font.id}
                    onClick={() => handleApply(font.id)}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#121622] border-sky-500 shadow-lg ring-2 ring-sky-500/20'
                        : 'bg-[#0E1017] border-white/[0.08] hover:border-white/[0.22] hover:bg-[#11141E]'
                    }`}
                  >
                    {/* Top Row: Font Name & Badges */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-black text-white group-hover:text-sky-300 transition-colors">
                              {isEnglish ? font.nameEn : font.nameAr}
                            </h3>
                            {font.isImageRequested && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                {isEnglish ? `Image ${font.isImageRequested}` : `الصورة ${font.isImageRequested}`}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                            {isEnglish ? font.descriptionEn : font.descriptionAr}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-sky-500 text-black flex items-center justify-center shrink-0 shadow">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      {/* Live Typography Preview matching user's uploaded images */}
                      <div 
                        className="p-4 rounded-xl bg-black/60 border border-white/[0.06] mb-4 text-center overflow-hidden"
                        style={{ fontFamily: font.fontFamily }}
                      >
                        <div className="text-base sm:text-lg font-black text-white tracking-wide leading-snug">
                          {font.sampleHeadline}
                        </div>
                        <div 
                          className="text-base sm:text-lg font-black tracking-wide leading-snug bg-gradient-to-b from-white via-sky-200 to-sky-400 bg-clip-text text-transparent drop-shadow-sm"
                        >
                          {font.sampleSubline}
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium mt-1 tracking-wider">
                          Turn Customer Experience into Revenue Growth
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className="text-[11px] text-gray-500 font-medium">
                        CSS: <code className="text-gray-400 font-mono text-[10px]">{font.googleFontFamily}</code>
                      </span>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(font.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500 text-black shadow-md'
                            : 'bg-white/[0.08] hover:bg-white/[0.16] text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 size={13} />
                            <span>{isEnglish ? 'Active on UI' : 'مفعّل حالياً'}</span>
                          </>
                        ) : (
                          <>
                            <Sliders size={13} />
                            <span>{isEnglish ? 'Apply to UI' : 'تطبيق على الواجهة'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer with prompt copy */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-[#0A0C11] border-t border-white/[0.08]">
            <div className="text-xs text-gray-400 font-medium text-center sm:text-start">
              {isEnglish 
                ? 'Font selection is saved automatically and applies to both customer survey and business dashboard.' 
                : 'يتم حفظ الخط المختار تلقائياً وتطبيقه على كل من رحلة العميل بالجوال ولوحة تحكم الإدارة.'}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyPromptText}
                className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-gray-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/[0.08]"
              >
                {copiedPrompt ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedPrompt ? (isEnglish ? 'Copied Prompt!' : 'تم نسخ البرومبت!') : (isEnglish ? 'Copy Prompt for AI' : 'نسخ البرومبت للنسخ')}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-black text-xs hover:bg-gray-100 transition-all cursor-pointer shadow-md"
              >
                {isEnglish ? 'Done' : 'إتمام واغلاق'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
