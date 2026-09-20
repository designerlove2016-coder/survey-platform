import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, CheckCircle2 } from 'lucide-react';
import { OPEN_COLOR_PALETTES, ColorPalette, getPaletteById } from '../utils/theme';
import { BrandSettings } from '../types';

interface ThemeColorSelectorProps {
  brandSettings: BrandSettings;
  onSaveBrandSettings: (updated: BrandSettings) => void;
  isEnglish?: boolean;
  currentLangCode?: string;
  compact?: boolean;
  onSavedNotification?: (msg: string) => void;
}

export const ThemeColorSelector: React.FC<ThemeColorSelectorProps> = ({
  brandSettings,
  onSaveBrandSettings,
  isEnglish: isEnglishProp = false,
  currentLangCode,
  compact = false,
  onSavedNotification
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const currentPaletteId = brandSettings.colorPaletteId || 'emerald_mint';
  const currentPalette = getPaletteById(currentPaletteId);
  const [selectedId, setSelectedId] = useState<string>(currentPaletteId);
  const [customColor, setCustomColor] = useState<string>(
    brandSettings.customPrimaryColor || currentPalette.primary
  );
  const [isCustomMode, setIsCustomMode] = useState<boolean>(!!brandSettings.customPrimaryColor);
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  const handleSelectPalette = (palette: ColorPalette) => {
    setSelectedId(palette.id);
    setIsCustomMode(false);

    const updated: BrandSettings = {
      ...brandSettings,
      colorPaletteId: palette.id,
      customPrimaryColor: undefined,
    };
    onSaveBrandSettings(updated);

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);

    if (onSavedNotification) {
      onSavedNotification(
        isEnglish
          ? `Color theme updated: ${palette.nameEn}`
          : `تم تطبيق وحفظ لون الواجهة: ${palette.nameAr} ✓`
      );
    }
  };

  const handleApplyCustomColor = (colorHex: string) => {
    setCustomColor(colorHex);
    setIsCustomMode(true);

    const updated: BrandSettings = {
      ...brandSettings,
      customPrimaryColor: colorHex,
    };
    onSaveBrandSettings(updated);

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);

    if (onSavedNotification) {
      onSavedNotification(
        isEnglish ? 'Custom open color saved!' : 'تم تطبيق وحفظ اللون المخصص بنجاح! ✓'
      );
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
          <Palette size={14} className="text-[#005A2B]" />
          <span>{isEnglish ? 'Open Themes:' : 'ألوان الواجهة:'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {OPEN_COLOR_PALETTES.map((palette) => {
            const isSelected = !isCustomMode && selectedId === palette.id;
            return (
              <button
                key={palette.id}
                onClick={() => handleSelectPalette(palette)}
                title={`${palette.nameAr} - ${palette.nameEn}`}
                className={`w-7 h-7 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-xs relative ${
                  isSelected ? 'ring-2 ring-offset-2 ring-gray-800 scale-110' : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: palette.primary }}
              >
                {isSelected && <Check size={12} className="text-white drop-shadow-sm stroke-[3]" />}
              </button>
            );
          })}

          {/* Custom Color Input Mini */}
          <label 
            title={isEnglish ? 'Custom Color Picker' : 'اختيار لون مخصص'}
            className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 hover:border-gray-500 cursor-pointer flex items-center justify-center relative overflow-hidden bg-white shadow-2xs hover:scale-105 transition-all"
          >
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleApplyCustomColor(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: isCustomMode ? customColor : '#CBD5E1' }}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm transition-colors"
            style={{ backgroundColor: isCustomMode ? customColor : currentPalette.primary }}
          >
            <Palette size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-black text-gray-800">
                {isEnglish ? 'Open & Coordinated Interface Colors' : 'ألوان الواجهة المفتوحة والمنسقة'}
              </h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {isEnglish ? 'Auto-Saved' : 'حفظ تلقائي وفوري'}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              {isEnglish
                ? 'Select a light, airy harmonious palette to update all screens & dashboard'
                : 'اختر درجات لونية فاتحة ومفتوحة منسقة بدقة لتطبيقها فوراً على لوحة التحكم وشاشات النظام'}
            </p>
          </div>
        </div>

        {/* Live Status Toast */}
        <AnimatePresence>
          {savedStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-emerald-600 text-white text-xs font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 size={14} />
              <span>{isEnglish ? 'Saved to All Screens ✓' : 'تم الحفظ والتطبيق في كل الشاشات ✓'}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid of Open Palettes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {OPEN_COLOR_PALETTES.map((palette) => {
          const isSelected = !isCustomMode && selectedId === palette.id;
          return (
            <motion.button
              key={palette.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectPalette(palette)}
              className={`p-3.5 rounded-2xl border text-right rtl:text-right ltr:text-left transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'border-gray-800 bg-white shadow-md ring-2 ring-gray-800/10'
                  : 'border-gray-200 hover:border-gray-300 bg-gray-50/60 hover:bg-white'
              }`}
            >
              {/* Top: Swatches Preview */}
              <div className="flex items-center justify-between">
                <div className="flex items-center -space-x-1.5 rtl:space-x-reverse">
                  <div
                    className="w-5 h-5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: palette.previewHexes[0] }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: palette.previewHexes[1] }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-200 shadow-xs"
                    style={{ backgroundColor: palette.previewHexes[2] }}
                  />
                </div>

                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check size={12} className="stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                )}
              </div>

              {/* Bottom: Palette Name & Description */}
              <div>
                <span className="block text-xs font-black text-gray-800 mb-0.5">
                  {isEnglish ? palette.nameEn : palette.nameAr}
                </span>
                <span className="block text-[10px] text-gray-400 line-clamp-1">
                  {isEnglish ? palette.descEn : palette.descAr}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Custom Open Color Section */}
      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/70 p-3.5 rounded-2xl">
        <div className="flex items-center gap-3">
          <label className="relative cursor-pointer shrink-0">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleApplyCustomColor(e.target.value)}
              className="sr-only"
            />
            <div
              className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center transition-transform hover:scale-105"
              style={{ backgroundColor: customColor }}
            >
              <Sparkles size={16} className="text-white drop-shadow-sm" />
            </div>
          </label>

          <div>
            <span className="block text-xs font-black text-gray-800">
              {isEnglish ? 'Pick Any Custom Open Color' : 'اختيار لون مخصص مفتوح من لوحة الألوان:'}
            </span>
            <span className="block text-[11px] text-gray-400 font-mono">
              {customColor.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              if (e.target.value.startsWith('#')) {
                setCustomColor(e.target.value);
              }
            }}
            placeholder="#005A2B"
            className="w-24 px-2.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-center"
          />
          <button
            onClick={() => handleApplyCustomColor(customColor)}
            className="px-4 py-1.5 rounded-xl text-xs font-black text-white bg-gray-800 hover:bg-black transition-all cursor-pointer shadow-xs"
          >
            {isEnglish ? 'Apply Color' : 'تطبيق اللون'}
          </button>
        </div>
      </div>
    </div>
  );
};
