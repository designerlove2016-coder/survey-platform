import React, { useState, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCcw, 
  Smartphone, 
  Sparkles, 
  ArrowRight,
  Store,
  X,
  Gift,
  Heart,
  ThumbsUp,
  Tag,
  ChevronLeft,
  ChevronRight,
  Camera,
  Upload
} from 'lucide-react';
import { 
  SurveyCustomizerSettings, 
  SurveyResponseRecord,
  SurveyIdentitySettings
} from '../../../types/surveyPlatform';
import {
  DEFAULT_IMPRESSION_CARDS,
  DEFAULT_QUESTION_TEMPLATES,
  DEFAULT_MENU_ITEMS,
  DEFAULT_EVALUATION_PILLARS,
  DEFAULT_QUICK_TAGS,
  DEFAULT_LOYALTY_PRIZES
} from '../../../utils/surveyDefaults';

interface MobileGuestSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SurveyCustomizerSettings;
  activeTableNumber: string;
  onTableChange: (tableNumber: string) => void;
  onSubmitNewResponse: (response: SurveyResponseRecord) => void;
  onUpdateIdentity?: (identity: SurveyIdentitySettings) => void;
  isEnglish?: boolean;
}

export const MobileGuestSimulatorModal: React.FC<MobileGuestSimulatorModalProps> = ({
  isOpen,
  onClose,
  settings,
  activeTableNumber,
  onTableChange,
  onSubmitNewResponse,
  onUpdateIdentity,
  isEnglish = false
}) => {
  const { branding, theme, tables } = settings;

  const identity = settings.identitySettings || {
    logoUrl: branding.logoUrl || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop&q=85',
    coverUrl: branding.coverBannerUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85',
    restaurantNameAr: branding.restaurantName || 'مطعم ومقهى السفير',
    restaurantNameEn: branding.restaurantNameEn || 'Al Safeer Restaurant & Cafe',
    overallQuestionAr: 'ما هو انطباعك العام عن زيارتك اليوم؟ 🌟',
    overallQuestionEn: 'How was your overall experience today? 🌟'
  };

  const modalHeaderInputRef = useRef<HTMLInputElement>(null);
  const modalLogoInputRef = useRef<HTMLInputElement>(null);
  const [modalVenueType, setModalVenueType] = useState<'restaurant' | 'cafe'>('restaurant');

  const handleModalHeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result && onUpdateIdentity) {
        onUpdateIdentity({
          ...identity,
          coverUrl: result
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleModalLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result && onUpdateIdentity) {
        onUpdateIdentity({
          ...identity,
          logoUrl: result
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const impressionCards = settings.impressionCards && settings.impressionCards.length > 0
    ? settings.impressionCards
    : DEFAULT_IMPRESSION_CARDS;

  const questionTemplates = settings.questionTemplates && settings.questionTemplates.length > 0
    ? settings.questionTemplates
    : DEFAULT_QUESTION_TEMPLATES;

  const enabledTemplates = questionTemplates.filter(q => q.isEnabled);

  const evaluationPillars = settings.evaluationPillars && settings.evaluationPillars.length > 0
    ? settings.evaluationPillars
    : DEFAULT_EVALUATION_PILLARS;

  const menuItems = settings.menuItems && settings.menuItems.length > 0
    ? settings.menuItems
    : DEFAULT_MENU_ITEMS;

  const quickTags = settings.quickTags && settings.quickTags.length > 0
    ? settings.quickTags
    : DEFAULT_QUICK_TAGS;

  const loyaltyPrizes = settings.loyaltyPrizes && settings.loyaltyPrizes.length > 0
    ? settings.loyaltyPrizes
    : DEFAULT_LOYALTY_PRIZES;

  // Selected State in the simulator
  const [selectedImpressionId, setSelectedImpressionId] = useState<string>('1');
  const [templateAnswers, setTemplateAnswers] = useState<Record<string, string>>({});
  const [pillarRatings, setPillarRatings] = useState<Record<string, number>>({
    food: 5,
    service: 5,
    ambiance: 5,
    welcome: 5
  });
  const [selectedDishes, setSelectedDishes] = useState<string[]>(['m1']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['t1', 't2']);
  const [commentText, setCommentText] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  if (!isOpen) return null;

  const selectedImpressionCard = impressionCards.find(c => c.id === selectedImpressionId) || impressionCards[0];
  const awardedPrize = loyaltyPrizes[0] || DEFAULT_LOYALTY_PRIZES[0];

  const handlePillarRating = (pillarId: string, rating: number) => {
    setPillarRatings(prev => ({ ...prev, [pillarId]: rating }));
  };

  const handleToggleDish = (dishId: string) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) ? prev.filter(d => d !== dishId) : [...prev, dishId]
    );
  };

  const handleToggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const starVal = selectedImpressionCard.stars;
    const isNegative = starVal <= 2;
    const sentiment = isNegative ? 'negative' : starVal >= 4 ? 'positive' : 'neutral';

    const newRecord: SurveyResponseRecord = {
      id: `resp_${Date.now()}`,
      timestamp: 'الآن',
      createdAt: Date.now(),
      tableNumber: activeTableNumber,
      branchName: branding.branchName,
      guestName: isEnglish ? 'Simulator Guest' : 'ضيف تجريبي',
      guestPhone: guestPhone.trim() || undefined,
      overallStars: starVal,
      npsScore: starVal * 2,
      answers: {
        impression: selectedImpressionCard.titleAr,
        ...templateAnswers,
        ...pillarRatings,
        dishes: selectedDishes,
        tags: selectedTags
      },
      comment: commentText || undefined,
      sentiment,
      sentimentKeywords: [selectedImpressionCard.titleAr],
      isFlaggedNegative: isNegative,
      resolved: !isNegative
    };

    onSubmitNewResponse(newRecord);
    setIsSubmitted(true);
  };

  const handleResetSimulator = () => {
    setSelectedImpressionId('1');
    setTemplateAnswers({});
    setPillarRatings({ food: 5, service: 5, ambiance: 5, welcome: 5 });
    setSelectedDishes(['m1']);
    setSelectedTags(['t1', 't2']);
    setCommentText('');
    setGuestPhone('');
    setIsSubmitted(false);
  };

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText('GUEST-VIP-2026');
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Container with mobile phone mockup */}
      <div className="w-full max-w-sm sm:max-w-md my-auto flex flex-col items-center">
        {/* Top Control Bar for Manager */}
        <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-3 mb-3 text-white flex items-center justify-between text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-emerald-400" />
            <span className="font-bold">
              {isEnglish ? 'Live Guest Mobile View' : 'معاينة شاشة جوال العميل الحية'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeTableNumber}
              onChange={(e) => onTableChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-amber-300 font-mono text-xs rounded-lg px-2 py-1 font-bold outline-hidden"
            >
              {tables.map(t => (
                <option key={t.id} value={t.tableNumber}>
                  طاولة #{t.tableNumber} ({t.sectionName})
                </option>
              ))}
            </select>

            <button
              onClick={handleResetSimulator}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="إعادة تعيين المحاكي"
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-rose-900/40 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Phone Mockup Device Frame */}
        <div 
          dir="rtl"
          className="w-full rounded-[40px] border-[6px] border-slate-800 shadow-2xl overflow-hidden relative flex flex-col bg-slate-50 max-h-[90vh]"
        >
          {/* Phone Top Speaker & Camera Notch */}
          <div className="w-full bg-slate-800 h-4.5 sm:h-5 flex items-center justify-center relative shrink-0">
            <div className="w-16 h-3 bg-black rounded-b-xl flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-1 h-1 rounded-full bg-indigo-950" />
            </div>
          </div>

          {/* Phone Content Scrollable Area */}
          <div className="overflow-y-auto flex-1 text-right">
            {/* LUXURY VENUE HEADER BANNER (Matching Image 1 - Responsively Compact) */}
            <div className="w-full relative shrink-0 overflow-hidden bg-slate-950">
              {/* Background Venue Cover Photo */}
              <img 
                src={identity.coverUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85'} 
                alt="Venue Cover"
                className="w-full h-28 sm:h-32 object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Deep Contrast Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85 pointer-events-none" />

              {/* Top Row: Venue Switcher + Language Pill */}
              <div className="absolute top-1.5 inset-x-2.5 flex items-center justify-between z-10">
                {/* Left: Venue Category Pills (🍔 مطعم | ☕ كافيه) */}
                <div className="flex items-center p-0.5 bg-black/70 backdrop-blur-md rounded-full border border-white/20 shadow-md">
                  <button
                    type="button"
                    onClick={() => setModalVenueType('restaurant')}
                    className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                      modalVenueType === 'restaurant'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🍔</span>
                    <span>مطعم</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalVenueType('cafe')}
                    className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      modalVenueType === 'cafe'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>☕</span>
                    <span>كافيه</span>
                  </button>
                </div>

                {/* Right: Gold Arabic Language Badge */}
                <div className="bg-black/80 backdrop-blur-md border border-amber-400 text-amber-300 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center gap-1 shadow-md">
                  <span className="font-mono text-[8px] sm:text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded">SA</span>
                  <span>العربية</span>
                  <span className="text-[10px]">🌐</span>
                </div>
              </div>

              {/* Quick Header Banner Upload Trigger on Cover */}
              <button
                type="button"
                onClick={() => modalHeaderInputRef.current?.click()}
                className="absolute top-8 sm:top-9 right-2.5 z-10 px-2 py-0.5 bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/30 text-white rounded-lg text-[8.5px] font-black flex items-center gap-1 shadow-md transition-all cursor-pointer hover:scale-105"
                title="رفع وتغيير صورة غلاف الهيدر"
              >
                <Camera size={10} className="text-amber-400" />
                <span>رفع صورة الهيدر 🖼️</span>
              </button>

              {/* Center Small Circular Venue Logo + Brand Hospitality Capsule */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 sm:pt-3 pointer-events-none">
                {/* Circular Venue Avatar with Double Gold Frame (Matching Image 1) */}
                <div 
                  onClick={() => modalLogoInputRef.current?.click()}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400 ring-2 ring-amber-500/40 shadow-xl bg-slate-900 relative group cursor-pointer pointer-events-auto transition-transform hover:scale-105"
                  title="انقر لرفع وتغيير لوقو المكان الصغير"
                >
                  <img
                    src={identity.logoUrl || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop&q=85'}
                    alt="Venue Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Camera Icon on Logo */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[7.5px] font-bold">
                    <Camera size={12} className="text-amber-300 mb-0.5" />
                    <span>تغيير</span>
                  </div>
                </div>

                {/* Black & Gold Luxury Capsule */}
                <div className="mt-1 pointer-events-auto">
                  <div className="bg-black/90 backdrop-blur-md border border-amber-400 text-amber-300 text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                    <span className="truncate max-w-[130px] sm:max-w-[160px]">{identity.restaurantNameAr || branding.restaurantName || 'مطعم ومقهى السفير'}</span>
                    <span>•</span>
                    <span className="shrink-0">طاولة #{activeTableNumber}</span>
                  </div>
                </div>
              </div>

              {/* Hidden Inputs for Direct Modal File Uploads */}
              <input
                type="file"
                ref={modalHeaderInputRef}
                onChange={handleModalHeaderUpload}
                accept="image/*"
                className="hidden"
              />
              <input
                type="file"
                ref={modalLogoInputRef}
                onChange={handleModalLogoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* 2. PROGRESS STAGE BAR MATCHING IMAGE 1 */}
            <div className="px-3.5 pt-2 pb-1.5 bg-white border-b border-slate-100 shrink-0">
              <div className="flex items-center justify-between text-[10.5px] font-black">
                <div className="flex items-center gap-1.5 text-[#E34F26]">
                  <span>الانطباع العام .1</span>
                  <span>🌟</span>
                </div>
                <span className="text-slate-500 font-bold text-[9.5px]">
                  المرحلة 1 من 4
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mt-1">
                <div className="h-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                <div className="h-1 rounded-full bg-slate-200" />
                <div className="h-1 rounded-full bg-slate-200" />
                <div className="h-1 rounded-full bg-slate-200" />
              </div>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-4 space-y-5">
                {/* 1. Step 1: Overall Impression Question (Exact Replica of Image 1) */}
                <div className="space-y-3">
                  <div className="text-center pt-1 px-2 space-y-0.5">
                    <h3 className="text-sm sm:text-base font-black text-[#005A2B] flex items-center justify-center gap-1.5 leading-snug">
                      <span>🌟</span>
                      <span>{identity.overallQuestionAr || 'ما هو انطباعك العام عن زيارتك اليوم؟'}</span>
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      :اختر البطاقة التي تعكس تجربتك بدقة
                    </p>
                  </div>

                  {/* 4 Impression Cards Grid (2x2) Matching Image 1 */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {impressionCards.map((card, cIdx) => {
                      const isSelected = selectedImpressionId === card.id;
                      const numberColors = [
                        'bg-purple-100 text-purple-700 border-purple-200',
                        'bg-emerald-100 text-emerald-700 border-emerald-200',
                        'bg-amber-100 text-amber-700 border-amber-200',
                        'bg-rose-100 text-rose-700 border-rose-200',
                      ];
                      const numStyle = numberColors[cIdx % numberColors.length];

                      return (
                        <div
                          key={card.id}
                          onClick={() => setSelectedImpressionId(card.id)}
                          className={`p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between text-center relative aspect-[1/0.95] sm:aspect-square shadow-2xs select-none ${
                            isSelected
                              ? 'border-2 border-[#00875A] ring-2 ring-[#00875A]/25 bg-emerald-50/15 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          {/* Top Right Corner Badge: Number 1, 2, 3, 4 */}
                          <span className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border text-[9px] sm:text-[10px] font-black font-mono absolute top-2 right-2 flex items-center justify-center ${numStyle}`}>
                            {cIdx + 1}
                          </span>

                          {/* Top Left Corner Indicator: Green dot if selected */}
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#00875A] absolute top-2.5 left-2.5 shadow-xs" />
                          )}

                          {/* Center Big Emoji */}
                          <span className="text-2xl sm:text-3xl my-auto pt-1">
                            {card.emoji}
                          </span>

                          {/* Dual Language Titles */}
                          <div className="w-full space-y-0.5">
                            <span className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight block truncate">
                              {card.titleEn || card.titleAr}
                            </span>
                            <span className="text-[9.5px] sm:text-[10px] text-slate-500 block truncate font-medium">
                              {card.descAr || card.titleAr}
                            </span>
                          </div>

                          {/* Bottom Button inside Card */}
                          <div className="w-full pt-1">
                            {isSelected ? (
                              <div className="w-full py-1 bg-[#00875A] text-white font-black text-[9px] sm:text-[10px] rounded-lg sm:rounded-xl flex items-center justify-center gap-1 shadow-xs">
                                <Check size={11} strokeWidth={3} />
                                <span>تم الاختيار</span>
                              </div>
                            ) : (
                              <div className="w-full py-1 bg-slate-100 text-slate-600 font-bold text-[9px] sm:text-[10px] rounded-lg sm:rounded-xl text-center hover:bg-slate-200 transition-colors">
                                <span>اختيار</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Step 2: Enabled Question Templates */}
                {enabledTemplates.length > 0 && (
                  <div className="space-y-3 pt-2 border-t border-slate-200/80">
                    <div className="text-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        الخطوة 2: أسئلة الجودة والنظافة
                      </span>
                    </div>

                    {enabledTemplates.map((template) => (
                      <div key={template.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs space-y-2">
                        {template.layoutType === 'language_roller' || template.id === 'qt_language_preference' ? (
                          /* Language Roller */
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                🇸🇦 SA
                              </span>
                              <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                                🍊 مطعم
                              </span>
                            </div>
                            <div className="text-center">
                              <span className="text-[10px] font-bold text-emerald-700 bg-[#EBF7F0] px-3 py-0.5 rounded-full inline-block">
                                ✨ مرحباً بك في أسواق بنده 🐼
                              </span>
                              <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                                اختر لغتك المفضلة 🌐
                              </h4>
                              <p className="text-[10px] text-slate-500">لتجربة تسوق ذكية وممتعة مخصصة لك</p>
                            </div>
                            {/* Roller Cards */}
                            <div className="p-2 bg-slate-50 rounded-xl space-y-1">
                              <div className="p-1 text-[10px] flex justify-between opacity-40 text-slate-500">
                                <span>🇵🇭 PH</span>
                                <span className="font-bold">Filipino</span>
                                <span>PH 🇵🇭</span>
                              </div>
                              <div className="p-2 rounded-lg bg-[#E8F8F0] border-2 border-[#1E7E4E] flex justify-between items-center text-xs font-black text-[#00381C]">
                                <span>🇸🇦 SA</span>
                                <span>العربية (المملكة العربية السعودية)</span>
                                <span>SA 🇸🇦</span>
                              </div>
                              <div className="p-1 text-[10px] flex justify-between opacity-40 text-slate-500">
                                <span>🇬🇧 GB</span>
                                <span className="font-bold">English</span>
                                <span>GB 🇬🇧</span>
                              </div>
                            </div>
                            <div className="text-center text-[9px] text-slate-400 font-bold">^ حرك بإصبعك للأعلى والأسفل ثم اضغط تأكيد v</div>
                            <button
                              type="button"
                              onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: 'ar' }))}
                              className="w-full py-2.5 bg-[#E34F26] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                            >
                              <span>تأكيد ومتابعة</span>
                              <ChevronLeft size={14} />
                            </button>
                          </div>
                        ) : template.layoutType === 'product_catalog' || template.id === 'qt_daily_shopping_needs' ? (
                          /* Bento Product Catalog */
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                                <ChevronRight size={12} /> رجوع
                              </span>
                              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                                <span>❇️</span>
                                <span>اختر احتياجاتك لهذا اليوم</span>
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black">
                              <span className="text-emerald-700">القسم 1 من 4: خضار وفواكه 🟢</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px]">
                                مكتمل: {templateAnswers[template.id] ? '1 / 4' : '0 / 4'}
                              </span>
                            </div>
                            {/* Department Tabs */}
                            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-[9px] font-bold overflow-x-auto scrollbar-none">
                              <span className="px-2 py-1 bg-[#005A2B] text-white rounded-lg shrink-0">خضار وفواكه</span>
                              <span className="px-1.5 py-1 text-slate-500 shrink-0">مواد غذائية وت...</span>
                              <span className="px-1.5 py-1 text-slate-500 shrink-0">الأجبان والألبان</span>
                            </div>
                            {/* Bento Images */}
                            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                              <div className="space-y-1.5">
                                <div 
                                  onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: 'cucumber' }))}
                                  className={`border rounded-xl p-1.5 bg-white shadow-2xs cursor-pointer ${templateAnswers[template.id] === 'cucumber' ? 'border-emerald-600 ring-1 ring-emerald-500' : 'border-slate-200'}`}
                                >
                                  <div className="h-14 rounded-lg overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=85" alt="خيار" className="w-full h-full object-cover" />
                                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 border border-slate-300" />
                                  </div>
                                  <span className="text-[10px] font-black text-slate-800 block mt-1">خيار طازج</span>
                                </div>
                                <div 
                                  onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: 'onion' }))}
                                  className={`border rounded-xl p-1.5 bg-white shadow-2xs cursor-pointer ${templateAnswers[template.id] === 'onion' ? 'border-emerald-600 ring-1 ring-emerald-500' : 'border-slate-200'}`}
                                >
                                  <div className="h-14 rounded-lg overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=85" alt="بصل" className="w-full h-full object-cover" />
                                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 border border-slate-300" />
                                  </div>
                                  <span className="text-[10px] font-black text-slate-800 block mt-1">بصل أحمر</span>
                                </div>
                              </div>
                              <div 
                                onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: 'tomato' }))}
                                className={`border rounded-xl p-1.5 bg-white shadow-2xs flex flex-col justify-between cursor-pointer ${templateAnswers[template.id] === 'tomato' ? 'border-emerald-600 ring-1 ring-emerald-500' : 'border-slate-200'}`}
                              >
                                <div className="h-[124px] rounded-lg overflow-hidden relative">
                                  <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=85" alt="طماطم" className="w-full h-full object-cover" />
                                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 border border-slate-300" />
                                </div>
                                <span className="text-[10px] font-black text-slate-800 block mt-1">طماطم محلي</span>
                              </div>
                            </div>
                            {/* Potato Bag */}
                            <div 
                              onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: 'potato' }))}
                              className={`border rounded-xl p-1.5 bg-white shadow-2xs cursor-pointer ${templateAnswers[template.id] === 'potato' ? 'border-emerald-600 ring-1 ring-emerald-500' : 'border-slate-200'}`}
                            >
                              <div className="h-14 rounded-lg overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=85" alt="بطاطس" className="w-full h-full object-cover" />
                                <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded-full bg-white text-[7px] font-black text-slate-700">قريباً</span>
                              </div>
                              <span className="text-[10px] font-black text-slate-800 block mt-1">بطاطس كيس</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: 'done' }))}
                              className="w-full py-2 bg-[#005A2B] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                            >
                              <span>👉 تأكيد المنتجات ومتابعة</span>
                            </button>
                          </div>
                        ) : (
                          /* Standard 2x2 */
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                {template.categoryBadge}
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-slate-900">
                              {template.titleAr}
                            </h4>
                            {template.subtitleAr && (
                              <p className="text-[10px] text-slate-500 leading-snug">
                                {template.subtitleAr}
                              </p>
                            )}

                            {/* Options Buttons (2x2 Square Cards Matching Image 2) */}
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              {template.options.map((opt, oIdx) => {
                                const isSelected = templateAnswers[template.id] === opt.id;
                                return (
                                  <button
                                    key={opt.id || oIdx}
                                    type="button"
                                    onClick={() => setTemplateAnswers(prev => ({ ...prev, [template.id]: opt.id }))}
                                    className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between text-center relative aspect-square shadow-2xs ${
                                      isSelected
                                        ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-400/40 shadow-sm'
                                        : 'border-slate-200 bg-white hover:bg-slate-50'
                                    }`}
                                  >
                                    <span className={`w-5 h-5 rounded-full border text-[10px] font-bold font-mono absolute top-2 right-2 flex items-center justify-center ${
                                      isSelected
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                    }`}>
                                      {oIdx + 1}
                                    </span>

                                    <span className="text-2xl sm:text-3xl my-auto pt-2">
                                      {opt.emoji || '✨'}
                                    </span>

                                    <span className="text-[11px] font-black text-slate-900 leading-tight block w-full">
                                      {opt.text}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Step 3: Evaluation Pillars (2x2 Square Cards Matching Image 1 - NO STARS!) */}
                <div className="space-y-3 pt-2 border-t border-slate-200/80">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-100/90 border border-purple-300/90 px-3.5 py-0.5 rounded-full inline-block shadow-2xs">
                      الخطوة 3: معايير الجودة والضيافة ⭐
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">
                      تقييم ركائز ومحاور التجربة
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      انقر لتأكيد مستوى رضاك عن الركائز الأساسية
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {evaluationPillars.slice(0, 4).map((pillar, pIdx) => {
                      const currentVal = pillarRatings[pillar.key] || 5;
                      const isSelected = currentVal >= 4;
                      const defaultIcons = ['🍲', '⚡', '🧹', '🤝'];
                      const pillarIcons: Record<string, string> = {
                        food: '🍲',
                        service: '⚡',
                        ambiance: '🧹',
                        welcome: '🤝'
                      };
                      const icon = pillarIcons[pillar.key] || defaultIcons[pIdx] || '✨';

                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          onClick={() => {
                            const nextVal = currentVal === 5 ? 4 : currentVal === 4 ? 3 : 5;
                            handlePillarRating(pillar.key, nextVal);
                          }}
                          className={`p-3.5 rounded-3xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between text-center relative aspect-square shadow-2xs ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-400/40 shadow-sm'
                              : 'border-slate-200/90 bg-white hover:bg-slate-50'
                          }`}
                        >
                          {/* Corner Number Circle (1, 2, 3, 4) */}
                          <span className={`w-6 h-6 rounded-full border text-xs font-bold font-mono absolute top-2.5 right-2.5 flex items-center justify-center ${
                            isSelected
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}>
                            {pIdx + 1}
                          </span>

                          {/* Large Center Emoji */}
                          <span className="text-3xl sm:text-4xl my-auto pt-2">
                            {icon}
                          </span>

                          {/* Option Title and Level */}
                          <div className="w-full">
                            <span className="text-xs font-black text-slate-900 leading-tight block truncate">
                              {pillar.titleAr}
                            </span>
                            <span className="text-[10px] font-bold text-amber-600 block mt-0.5">
                              {currentVal === 5 ? 'فائق الامتياز ✨' : currentVal === 4 ? 'جيد جداً 👍' : 'يحتاج متابعة ⚠️'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Step 4: Menu Dishes & Quick Feedback Tags */}
                <div className="space-y-3 pt-2 border-t border-slate-200/80">
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      الخطوة 4: الأطباق والوسوم السريعة
                    </span>
                  </div>

                  {/* Dishes */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      ما الأطباق التي نالت إعجابك اليوم؟ 🍴
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {menuItems.map((dish) => {
                        const isSelected = selectedDishes.includes(dish.id);
                        return (
                          <button
                            key={dish.id}
                            type="button"
                            onClick={() => handleToggleDish(dish.id)}
                            className={`p-2 rounded-xl border text-right transition-all cursor-pointer flex items-center gap-2 ${
                              isSelected
                                ? 'border-amber-500 bg-amber-500/10 shadow-2xs ring-1 ring-amber-400'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <img
                              src={dish.imageUrl}
                              alt={dish.nameAr}
                              className="w-9 h-9 rounded-lg object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <span className="text-[11px] font-bold text-slate-900 block truncate">
                                {dish.nameAr}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                ر.س {dish.price}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Tags */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      اختر الوسوم الأقرب لتجربتك: 🏷️
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {quickTags.map((t) => {
                        const isSelected = selectedTags.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleToggleTag(t.id)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? 'bg-slate-900 text-white shadow-2xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{t.emoji}</span>
                            <span>{t.textAr}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Optional Note & Submit Button */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  <textarea
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="ملاحظات إضافية تسعدنا وتطور خدماتنا..."
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none focus:border-amber-500"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>🚀 إرسال التقييم واستلام الهدية</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success / Reward Reveal Screen (Step 5) */
              <div className="p-5 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900">
                    شكراً جزيلاً لتقييمك الثمين! ❤️
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    يسر إدارة {identity.restaurantNameAr} تقديم هديتك الفورية تقديراً لوقتك
                  </p>
                </div>

                {/* Surprise Gift Box Card */}
                <div className="bg-gradient-to-br from-amber-50 via-purple-50 to-amber-50 border-2 border-amber-300 rounded-3xl p-4 shadow-sm text-right space-y-3">
                  <div className="flex items-center gap-2 text-purple-800 font-black text-xs">
                    <Gift size={16} className="text-amber-500" />
                    <span>مكافأة الولاء الخاصة بك 🎁</span>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md inline-block mb-1">
                      {awardedPrize.pointsBadge}
                    </span>
                    <h4 className="text-xs font-black text-slate-900">
                      {awardedPrize.titleAr}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {awardedPrize.titleEn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 text-white px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 font-mono font-bold">
                      <Sparkles size={14} className="text-amber-400" />
                      <span>GUEST-VIP-2026</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyVoucher}
                      className="text-amber-400 hover:text-amber-300 text-[11px] font-black flex items-center gap-1 cursor-pointer"
                    >
                      {copiedVoucher ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedVoucher ? 'تم النسخ' : 'نسخ الكود'}</span>
                    </button>
                  </div>
                </div>

                {/* 5-Star Review Booster */}
                {selectedImpressionCard.stars >= 4 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-right space-y-2">
                    <div className="flex items-center gap-1.5 text-blue-900 font-black text-xs">
                      <Star size={14} className="fill-amber-400 text-amber-500" />
                      <span>هل أعجبتك تجربتك معنا؟ شاركنا رأيك على خرائط جوجل!</span>
                    </div>
                    <a
                      href={branding.googleMapsReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MapPin size={13} />
                      <span>تقييم 5 نجوم على Google Maps ⭐⭐⭐⭐⭐</span>
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleResetSimulator}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  إجراء تقييم تجريبي آخر 🔄
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
