import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  Trash2, 
  Check, 
  Sparkles, 
  Globe, 
  Type, 
  Store, 
  CheckCircle2, 
  Image as ImageIcon,
  Layers,
  ArrowRight,
  Palette,
  Loader2
} from 'lucide-react';
import { BrandSettings, LanguageItem } from '../types';
import { PandaIcon } from './PandaIcon';
import { ThemeColorSelector } from './ThemeColorSelector';
import { soundManager } from '../utils/audio';
import { AVAILABLE_FONTS, getFontById, applyFontToDocument } from '../utils/fonts';

interface BrandCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandSettings: BrandSettings;
  onSaveBrandSettings: (updated: BrandSettings) => void;
  languages: LanguageItem[];
  onUpdateLanguages: (updated: LanguageItem[]) => void;
  isEnglish?: boolean;
  currentLangCode?: string;
}

export const BrandCustomizationModal: React.FC<BrandCustomizationModalProps> = ({
  isOpen,
  onClose,
  brandSettings,
  onSaveBrandSettings,
  languages,
  onUpdateLanguages,
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [activeTab, setActiveTab] = useState<'master' | 'colors' | 'fonts' | 'screens'>('master');
  const [localSettings, setLocalSettings] = useState<BrandSettings>(brandSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Screen texts state (editing per screen)
  const [activeScreenTab, setActiveScreenTab] = useState<'header' | 'welcome' | 'preference' | 'game' | 'thank_you'>('header');

  // Working copy of languages translations
  const [localLanguages, setLocalLanguages] = useState<LanguageItem[]>(languages);

  // Sync state if props change when opening
  React.useEffect(() => {
    if (isOpen) {
      setLocalSettings(brandSettings);
      setLocalLanguages(languages);
      setSavedSuccess(false);
    }
  }, [isOpen, brandSettings, languages]);

  if (!isOpen) return null;

  const arLang = localLanguages.find(l => l.code === 'ar') || localLanguages[0];
  const enLang = localLanguages.find(l => l.code === 'en') || localLanguages[1] || localLanguages[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const updated = { ...localSettings, logoUrl: result };
        setLocalSettings(updated);
        onSaveBrandSettings(updated);
        showSuccessNotification();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    const updated = { ...localSettings, logoUrl: null };
    setLocalSettings(updated);
    onSaveBrandSettings(updated);
    showSuccessNotification();
  };

  const showSuccessNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveMaster = () => {
    setIsSaving(true);
    // Also propagate brand title to the language translations
    const updatedLangs = localLanguages.map(l => {
      if (l.code === 'ar') {
        return {
          ...l,
          translations: {
            ...l.translations,
            brandTitle: localSettings.brandTitleAr || localSettings.brandNameAr,
            brandSubtitle: localSettings.brandSubtitleAr,
          }
        };
      }
      if (l.code === 'en') {
        return {
          ...l,
          translations: {
            ...l.translations,
            brandTitle: localSettings.brandTitleEn || localSettings.brandNameEn,
            brandSubtitle: localSettings.brandSubtitleEn,
          }
        };
      }
      return l;
    });

    onSaveBrandSettings(localSettings);
    onUpdateLanguages(updatedLangs);
    setLocalLanguages(updatedLangs);
    setSavedSuccess(true);
    soundManager.playVictory();

    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 850);
  };

  // Helper to update a translation field for a specific language
  const updateTranslation = (langCode: 'ar' | 'en', field: string, value: string) => {
    setLocalLanguages(prev => prev.map(l => {
      if (l.code === langCode) {
        return {
          ...l,
          translations: {
            ...l.translations,
            [field]: value,
          }
        };
      }
      return l;
    }));
  };

  const handleSaveScreenTexts = () => {
    setIsSaving(true);
    onUpdateLanguages(localLanguages);
    setSavedSuccess(true);
    soundManager.playVictory();

    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 850);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[36px] shadow-2xl border border-gray-100 max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden my-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 rtl:left-6 rtl:right-auto ltr:right-6 ltr:left-auto w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer z-10"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#005A2B] flex items-center justify-center shrink-0">
            <Store size={26} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-800">
              {isEnglish ? 'Store Brand & Text Manager' : 'إدارة هوية المتجر والشعار والنصوص'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              {isEnglish
                ? 'Change the logo once to update everywhere, or customize texts per screen'
                : 'غيّر الشعار مرة واحدة ليتحدث في كل مكان، أو خصّص كتابة ونصوص كل شاشة على حدة'}
            </p>
          </div>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-500 text-white px-4 py-2.5 rounded-2xl mb-4 flex items-center justify-between text-xs sm:text-sm font-bold shadow-md"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>
                  {isEnglish
                    ? 'Changes applied instantly to all screens!'
                    : 'تم تطبيق التعديلات فوراً على جميع الشاشات في التطبيق! ✓'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Navigation Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 gap-1">
          <button
            onClick={() => setActiveTab('master')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'master'
                ? 'bg-white text-[#005A2B] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sparkles size={16} />
            <span>{isEnglish ? 'Master Brand & Logo' : 'الشعار والاسم الموحد'}</span>
          </button>

          <button
            onClick={() => setActiveTab('colors')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'colors'
                ? 'bg-white text-[#005A2B] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Palette size={16} />
            <span>{isEnglish ? 'Themes & Colors' : 'ألوان الواجهة 🎨'}</span>
          </button>

          <button
            onClick={() => setActiveTab('fonts')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'fonts'
                ? 'bg-white text-[#005A2B] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Type size={16} />
            <span>{isEnglish ? 'Typography & Fonts' : 'خطوط الواجهة 🔤'}</span>
          </button>

          <button
            onClick={() => setActiveTab('screens')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'screens'
                ? 'bg-white text-[#005A2B] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Type size={16} />
            <span>{isEnglish ? 'Screen Texts' : 'تخصيص نصوص الشاشات'}</span>
          </button>
        </div>

        {/* Tab 1: Master Logo & Brand Name */}
        {activeTab === 'master' && (
          <div className="space-y-6">
            {/* Sync Notice Card */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900 font-medium">
              <Sparkles size={18} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block text-sm text-[#005A2B] mb-0.5">
                  {isEnglish ? 'Unified One-Time Update' : 'تغيير موحد من خانة واحدة:'}
                </span>
                <span>
                  {isEnglish
                    ? 'Updating your store logo or master name here applies immediately to the header, welcome screen, language box, game falling items, receipts, thank you card, and dashboard.'
                    : 'عند رفع أو تغيير الشعار والاسم هنا، يتغير فوراً في كافة الشاشات (الترويسة، شاشة الترحيب، بطاقة اختيار اللغة، فقاعات اللعبة، القسيمة، شاشة الشكر، ولوحة التحكم) دون الحاجة لتكرار التعديل.'}
                </span>
              </div>
            </div>

            {/* 1. Logo Section */}
            <div className="bg-gray-50/80 rounded-3xl p-5 border border-gray-200/80 space-y-4">
              <label className="block text-sm font-black text-gray-800 flex items-center gap-2">
                <ImageIcon size={18} className="text-[#005A2B]" />
                <span>{isEnglish ? 'Store Master Logo' : 'شعار المتجر الرسمي'}</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Logo Preview Box */}
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-white border-2 border-dashed border-emerald-300 shadow-sm flex items-center justify-center p-2 overflow-hidden">
                    {localSettings.logoUrl ? (
                      <img
                        src={localSettings.logoUrl}
                        alt="Store Logo"
                        className="w-full h-full object-contain rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 gap-1">
                        <PandaIcon size={46} />
                        <span className="text-[10px] font-bold text-gray-400">الافتراضي</span>
                      </div>
                    )}
                  </div>

                  {localSettings.logoUrl && (
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110"
                      title={isEnglish ? 'Reset to default logo' : 'استعادة الشعار الافتراضي'}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                {/* Upload Actions */}
                <div className="flex-1 space-y-2 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#005A2B] hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-102 active:scale-98"
                    >
                      <Upload size={15} />
                      <span>{isEnglish ? 'Upload Image from Device' : 'رفع شعار من جهازك'}</span>
                    </button>

                    {localSettings.logoUrl && (
                      <button
                        onClick={handleRemoveLogo}
                        className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3.5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Trash2 size={14} className="text-red-500" />
                        <span>{isEnglish ? 'Use Default' : 'استعادة الافتراضي'}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {isEnglish
                      ? 'Supports PNG, JPG, SVG, WebP. Recommended transparent background.'
                      : 'يدعم صور PNG, JPG, SVG الشفافة بدقة عالية وتتغير تلقائياً في كل مكان.'}
                  </p>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* 2. Master Brand Name */}
            <div className="space-y-4">
              <label className="block text-sm font-black text-gray-800 flex items-center gap-2">
                <Store size={18} className="text-[#005A2B]" />
                <span>{isEnglish ? 'Master Store Name' : 'اسم المتجر الرئيسي'}</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <span className="block text-xs font-bold text-gray-500 mb-1">
                    🇸🇦 اسم المتجر بالعربية:
                  </span>
                  <input
                    type="text"
                    value={localSettings.brandNameAr}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandNameAr: e.target.value })}
                    placeholder="مثال: بنده أو متجر النخبة"
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200 text-sm font-bold focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <span className="block text-xs font-bold text-gray-500 mb-1">
                    🇬🇧 Store Name in English:
                  </span>
                  <input
                    type="text"
                    value={localSettings.brandNameEn}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandNameEn: e.target.value })}
                    placeholder="e.g. Panda or Elite Store"
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200 text-sm font-bold focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 3. Promotional Slogans */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-black text-gray-700">
                {isEnglish ? 'Promotional Titles & Slogans' : 'العنوان الترويجي والشعار اللفظي'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <span className="block text-[11px] font-bold text-gray-400 mb-1">
                    🇸🇦 العنوان الرئيسي بالعربية:
                  </span>
                  <input
                    type="text"
                    value={localSettings.brandTitleAr}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandTitleAr: e.target.value })}
                    placeholder="بنده معك تفرق"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-gray-400 mb-1">
                    🇬🇧 Brand Title in English:
                  </span>
                  <input
                    type="text"
                    value={localSettings.brandTitleEn}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandTitleEn: e.target.value })}
                    placeholder="Panda Makes the Difference"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-gray-400 mb-1">
                    🇸🇦 العنوان الفرعي بالعربية:
                  </span>
                  <input
                    type="text"
                    value={localSettings.brandSubtitleAr}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandSubtitleAr: e.target.value })}
                    placeholder="عالم من المزايا"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-gray-400 mb-1">
                    🇬🇧 Brand Subtitle in English:
                  </span>
                  <input
                    type="text"
                    value={localSettings.brandSubtitleEn}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandSubtitleEn: e.target.value })}
                    placeholder="A World of Benefits"
                    className="w-full px-3.5 py-2 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Save Master Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                {isEnglish ? 'Cancel' : 'إلغاء'}
              </button>
              <button
                onClick={handleSaveMaster}
                disabled={isSaving}
                className="bg-[#005A2B] hover:bg-emerald-700 active:scale-98 text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-102 disabled:opacity-85"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 size={18} className="text-white animate-bounce" />
                    <span>{isEnglish ? 'Saved & Applied! ✓' : 'تم الحفظ والتطبيق في كل الشاشات بنجاح! ✓'}</span>
                  </>
                ) : isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white" />
                    <span>{isEnglish ? 'Saving & Applying...' : 'جاري الحفظ والتطبيق...'}</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    <span>{isEnglish ? 'Apply to All Screens' : 'حفظ وتطبيق في كل الشاشات'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Open & Coordinated Colors */}
        {activeTab === 'colors' && (
          <div className="space-y-5">
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-sky-900 font-medium">
              <Sparkles size={18} className="text-sky-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block text-sm text-sky-950 mb-0.5">
                  {isEnglish ? 'Open & Coordinated Light Colors' : 'ألوان مفتوحة، هادئة، ومريحة للعين:'}
                </span>
                <span>
                  {isEnglish
                    ? 'Pick an open harmonious palette to customize your dashboard and customer screens instantly with one click.'
                    : 'اختر التدرج المفتوح والمنسق الذي يناسب هوية متجرك ليعكس فوراً طابعاً مشرقاً ومريحاً على لوحة التحكم وشاشات التسوق.'}
                </span>
              </div>
            </div>

            <ThemeColorSelector
              brandSettings={localSettings}
              onSaveBrandSettings={(updated) => {
                setLocalSettings(updated);
                onSaveBrandSettings(updated);
              }}
              isEnglish={isEnglish}
            />

            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                {isEnglish ? 'Close' : 'إغلاق'}
              </button>
              <button
                onClick={handleSaveMaster}
                disabled={isSaving}
                className="bg-[#005A2B] hover:bg-emerald-700 text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-102"
              >
                <Check size={18} />
                <span>{isEnglish ? 'Save & Apply Color Theme' : 'حفظ وتطبيق لون الواجهة في كل الشاشات ✓'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Typography & Fonts Customizer */}
        {activeTab === 'fonts' && (
          <div className="space-y-5">
            {/* Header info banner */}
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-sky-900 font-medium">
              <Sparkles size={18} className="text-sky-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block text-sm text-sky-950 mb-0.5">
                  {isEnglish ? 'Typography & Fonts Manager' : 'تخصيص خطوط الواجهة والتطبيق:'}
                </span>
                <span>
                  {isEnglish
                    ? 'Includes fonts from your uploaded images: 1. Baloo Bhaijaan 2 (Chunky/Playful) and 2. Changa (Geometric Squarish Kufic). Pick any font to apply it instantly to all headers, buttons, cards, and surveys.'
                    : 'يشمل الخطين المرفوعين بالصور: ١. خط بالو (عريض ومرح - الصورة الأولى)، و٢. خط شانجا (كوفي هندسي مربع - الصورة الثانية). اختر أي خط وسيتم تطبيقه فوراً على كامل المنصة والشاشات.'}
                </span>
              </div>
            </div>

            {/* Fonts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[50vh] overflow-y-auto p-1">
              {AVAILABLE_FONTS.map((font) => {
                const isCurrent = (localSettings.fontFamilyId || 'baloo') === font.id;

                return (
                  <div
                    key={font.id}
                    onClick={() => {
                      soundManager.playClick();
                      const updated = { ...localSettings, fontFamilyId: font.id };
                      setLocalSettings(updated);
                      applyFontToDocument(font.id);
                      onSaveBrandSettings(updated);
                      setSavedSuccess(true);
                      setTimeout(() => setSavedSuccess(false), 2000);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-sky-50/80 border-sky-500 shadow-md ring-2 ring-sky-500/20'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-gray-900">
                              {isEnglish ? font.nameEn : font.nameAr}
                            </span>
                            {font.isImageRequested && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                                {isEnglish ? `Image ${font.isImageRequested}` : `الصورة ${font.isImageRequested}`}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 block mt-0.5">
                            {isEnglish ? font.descriptionEn : font.descriptionAr}
                          </span>
                        </div>

                        {isCurrent && (
                          <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      {/* Live sample */}
                      <div 
                        className="p-3 rounded-xl bg-gray-950 text-white text-center my-2"
                        style={{ fontFamily: font.fontFamily }}
                      >
                        <div className="text-sm font-black text-white">
                          {font.sampleHeadline}
                        </div>
                        <div className="text-sm font-black text-sky-400">
                          {font.sampleSubline}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400">
                        {font.googleFontFamily}
                      </span>
                      <span className={`text-[11px] font-bold ${isCurrent ? 'text-sky-700' : 'text-gray-600'}`}>
                        {isCurrent ? (isEnglish ? 'Active ✓' : 'مفعّل حالياً ✓') : (isEnglish ? 'Click to Apply' : 'تطبيق على الواجهة')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                {isEnglish ? 'Close' : 'إغلاق'}
              </button>
              <button
                onClick={handleSaveMaster}
                disabled={isSaving}
                className="bg-[#005A2B] hover:bg-emerald-700 text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-102"
              >
                <Check size={18} />
                <span>{isEnglish ? 'Save & Apply to Whole Interface' : 'حفظ وتطبيق الخط على كامل الواجهة ✓'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Screen-by-Screen Texts Customizer */}
        {activeTab === 'screens' && (
          <div className="space-y-5">
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 font-medium">
              <span>
                {isEnglish
                  ? 'As requested: you can customize the wording for each individual screen separately without affecting others.'
                  : 'تلبية لرغبتكم: يمكنك هنا تخصيص وكتابة نصوص كل شاشة ومكان على حدة بكل سهولة.'}
              </span>
            </div>

            {/* Sub-tabs for Screens */}
            <div className="flex flex-wrap gap-1.5 border-b border-gray-100 pb-3">
              {[
                { id: 'header', label: isEnglish ? 'Header & Slogan' : 'الترويسة الرئيسية' },
                { id: 'welcome', label: isEnglish ? 'Welcome & Language' : 'الترحيب واختيار اللغة' },
                { id: 'preference', label: isEnglish ? 'Preference Screen' : 'شاشة التفضيلات' },
                { id: 'game', label: isEnglish ? 'Game & Challenge' : 'تحدي اللعبة' },
                { id: 'thank_you', label: isEnglish ? 'Thank You & Ending' : 'شاشة الشكر' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveScreenTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeScreenTab === tab.id
                      ? 'bg-[#005A2B] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Screen 1: Header */}
            {activeScreenTab === 'header' && (
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-700">نصوص ترويسة المتجر أعلى الشاشة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">العنوان الرئيسي (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.brandTitle}
                      onChange={(e) => updateTranslation('ar', 'brandTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Brand Title (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.brandTitle}
                      onChange={(e) => updateTranslation('en', 'brandTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">العنوان الفرعي (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.brandSubtitle}
                      onChange={(e) => updateTranslation('ar', 'brandSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Brand Subtitle (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.brandSubtitle}
                      onChange={(e) => updateTranslation('en', 'brandSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Screen 2: Welcome & Language Selection */}
            {activeScreenTab === 'welcome' && (
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-700">نصوص شاشة الترحيب واختيار اللغة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">رسالة الترحيب في البادج (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.welcomeBadge}
                      onChange={(e) => updateTranslation('ar', 'welcomeBadge', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Welcome Badge (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.welcomeBadge}
                      onChange={(e) => updateTranslation('en', 'welcomeBadge', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">عنوان اختيار اللغة (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.chooseLanguageTitle}
                      onChange={(e) => updateTranslation('ar', 'chooseLanguageTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Choose Language Title (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.chooseLanguageTitle}
                      onChange={(e) => updateTranslation('en', 'chooseLanguageTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">الوصف الإرشادي (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.chooseLanguageSubtitle}
                      onChange={(e) => updateTranslation('ar', 'chooseLanguageSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Screen 3: Preference */}
            {activeScreenTab === 'preference' && (
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-700">نصوص شاشة التفضيلات:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">عنوان ماذا تفضل (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.whatDoYouPreferTitle}
                      onChange={(e) => updateTranslation('ar', 'whatDoYouPreferTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Preference Title (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.whatDoYouPreferTitle}
                      onChange={(e) => updateTranslation('en', 'whatDoYouPreferTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">الوصف المساعد (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.preferenceSubtitle}
                      onChange={(e) => updateTranslation('ar', 'preferenceSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Screen 4: Game & Challenge */}
            {activeScreenTab === 'game' && (
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-700">نصوص تحدي اللعبة التفاعلية:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">عنوان التحدي (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.challengeTitle}
                      onChange={(e) => updateTranslation('ar', 'challengeTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Challenge Title (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.challengeTitle}
                      onChange={(e) => updateTranslation('en', 'challengeTitle', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">وصف التحدي (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.challengeDesc}
                      onChange={(e) => updateTranslation('ar', 'challengeDesc', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Screen 5: Thank You */}
            {activeScreenTab === 'thank_you' && (
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-700">نصوص شاشة الشكر والإنهاء:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">العنوان الرئيسي للشكر (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.thankYouHeading}
                      onChange={(e) => updateTranslation('ar', 'thankYouHeading', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Thank You Heading (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.thankYouHeading}
                      onChange={(e) => updateTranslation('en', 'thankYouHeading', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">عبارة التسوق الممتع (عربي):</span>
                    <input
                      type="text"
                      value={arLang.translations.funShoppingPanda}
                      onChange={(e) => updateTranslation('ar', 'funShoppingPanda', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 mb-1">Shopping Phrase (English):</span>
                    <input
                      type="text"
                      value={enLang.translations.funShoppingPanda}
                      onChange={(e) => updateTranslation('en', 'funShoppingPanda', e.target.value)}
                      className="w-full px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Screens Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                {isEnglish ? 'Cancel' : 'إلغاء'}
              </button>
              <button
                onClick={handleSaveScreenTexts}
                disabled={isSaving}
                className="bg-[#005A2B] hover:bg-emerald-700 active:scale-98 text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-102 disabled:opacity-85"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 size={18} className="text-white animate-bounce" />
                    <span>{isEnglish ? 'Saved & Applied! ✓' : 'تم الحفظ والتطبيق بنجاح! ✓'}</span>
                  </>
                ) : isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-white" />
                    <span>{isEnglish ? 'Saving...' : 'جاري الحفظ...'}</span>
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    <span>{isEnglish ? 'Save Screen Texts' : 'حفظ نصوص الشاشات'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
