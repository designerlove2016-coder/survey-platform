import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCcw, 
  ExternalLink, 
  Check, 
  Coins, 
  Wallet, 
  Percent, 
  Gift, 
  Star, 
  Trophy, 
  Clock, 
  Volume2, 
  VolumeX, 
  Copy, 
  CheckCheck, 
  QrCode, 
  Smartphone, 
  ChevronRight, 
  ChevronLeft,
  X,
  Play,
  Eye,
  Sliders
} from 'lucide-react';
import { CustomerJourneyConfig, DepartmentConfig, ProductItemConfig } from '../../../types';
import { QuestionTemplateItem, SurveyCustomizerSettings } from '../../../types/surveyPlatform';
import { soundManager } from '../../../utils/audio';
import { CAFE_DEPARTMENTS, SUPERMARKET_DEPARTMENTS } from '../../../utils/journeyConfig';

export interface CustomerExperienceLivePhoneProps {
  config?: CustomerJourneyConfig;
  settings?: SurveyCustomizerSettings;
  activeTemplateId?: string | null;
  onSelectTemplateId?: (id: string) => void;
  onOpenFullScreen?: () => void;
  isEnglish?: boolean;
}

// 8 Unified Core Steps corresponding to the Customer Preview in the video
export const UNIFIED_JOURNEY_STEPS = [
  { id: 'qt_language_preference', stepKey: 'welcome', num: 1, titleAr: 'اختيار لغة العميل المفضلة', titleEn: 'Language Preference', icon: '🌐' },
  { id: 'qt_connected_success', stepKey: 'connected', num: 2, titleAr: 'تأكيد الربط الذكي', titleEn: 'Connected Success', icon: '⚡' },
  { id: 'qt_daily_shopping_needs', stepKey: 'shopping', num: 3, titleAr: 'الاحتياجات والكتالوج', titleEn: 'Catalog & Products', icon: '🛍️' },
  { id: 'qt_reward_preference', stepKey: 'preference', num: 4, titleAr: 'تفضيل نوع المكافأة', titleEn: 'Reward Preference', icon: '🎁' },
  { id: 'qt_speed_game_challenge', stepKey: 'challenge_splash', num: 5, titleAr: 'تحدي السرعة والألعاب', titleEn: 'Speed Challenge', icon: '🎯' },
  { id: 'qt_voucher_gift', stepKey: 'voucher_form', num: 6, titleAr: 'قسيمة الخصم والهدية', titleEn: 'Voucher & Gift', icon: '🎟️' },
  { id: 'qt_shopping_overall_eval', stepKey: 'feedback', num: 7, titleAr: 'تقييم تجربة العميل', titleEn: 'Service Feedback', icon: '⭐' },
  { id: 'qt_thank_you_screen', stepKey: 'thank_you', num: 8, titleAr: 'الشكر وبطاقة الولاء', titleEn: 'Thank You & Loyalty', icon: '❤️' },
];

export const CustomerExperienceLivePhone: React.FC<CustomerExperienceLivePhoneProps> = ({
  config,
  settings,
  activeTemplateId,
  onSelectTemplateId,
  onOpenFullScreen,
  isEnglish = false,
}) => {
  // Current step state (defaults to step 1: welcome)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Mode: 'inspector' (locks to selected step) or 'interactive' (allows clicking through flow)
  const [flowMode, setFlowMode] = useState<'inspector' | 'interactive'>('interactive');

  // Step 1: Language selection state
  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en' | 'fil'>('ar');
  const [rollerOffset, setRollerOffset] = useState<number>(0);

  // Step 3: Shopping catalog state
  const isCafe = config?.businessType === 'cafe' || config?.businessType === 'cafe_restaurant' || (!config?.businessType);
  const departments: DepartmentConfig[] = config?.departments && config.departments.length > 0 
    ? config.departments 
    : (isCafe ? CAFE_DEPARTMENTS : SUPERMARKET_DEPARTMENTS);
  const [activeDeptTab, setActiveDeptTab] = useState<string>(departments[0]?.id || 'hot_drinks');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['hd2', 'sb1']);

  // Step 4: Preference state
  const [selectedReward, setSelectedReward] = useState<string>('cashback');

  // Step 5: Game challenge state
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('hard');
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(5);
  const [gameTimer, setGameTimer] = useState<number>(8);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; popped: boolean }>>([
    { id: 1, x: 25, y: 30, popped: false },
    { id: 2, x: 70, y: 40, popped: false },
    { id: 3, x: 45, y: 65, popped: false },
    { id: 4, x: 80, y: 75, popped: false },
    { id: 5, x: 20, y: 80, popped: false },
  ]);

  // Step 6: Voucher form state
  const [guestName, setGuestName] = useState<string>('علي');
  const [guestPhone, setGuestPhone] = useState<string>('566666666');
  const [copiedCoupon, setCopiedCoupon] = useState<boolean>(false);

  // Step 7: Feedback answers
  const [feedbackRatings, setFeedbackRatings] = useState<{ [qId: string]: string }>({
    cleanliness: 'great',
    speed: 'good',
    overall: 'great',
  });

  // Step 8: Thank you QR modal state
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Sync with activeTemplateId if passed from outside in 'inspector' mode or when clicked
  useEffect(() => {
    if (activeTemplateId) {
      const idx = UNIFIED_JOURNEY_STEPS.findIndex(s => s.id === activeTemplateId);
      if (idx !== -1) {
        setCurrentStepIndex(idx);
      }
    }
  }, [activeTemplateId]);

  // Game timer loop when game is running
  useEffect(() => {
    if (!isGameRunning) return;
    const timer = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameRunning(false);
          setIsGameOver(true);
          soundManager.playVictory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameRunning]);

  // Navigation handlers
  const handleSelectStep = (index: number) => {
    soundManager.playClick();
    setCurrentStepIndex(index);
    const step = UNIFIED_JOURNEY_STEPS[index];
    if (step && onSelectTemplateId) {
      onSelectTemplateId(step.id);
    }
  };

  const handleNextStep = () => {
    soundManager.playClick();
    if (currentStepIndex < UNIFIED_JOURNEY_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const nextStep = UNIFIED_JOURNEY_STEPS[nextIdx];
      if (nextStep && onSelectTemplateId) {
        onSelectTemplateId(nextStep.id);
      }
    }
  };

  const handlePrevStep = () => {
    soundManager.playClick();
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      const prevStep = UNIFIED_JOURNEY_STEPS[prevIdx];
      if (prevStep && onSelectTemplateId) {
        onSelectTemplateId(prevStep.id);
      }
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentStepIndex(0);
    setIsGameRunning(false);
    setIsGameOver(false);
    setGameTimer(8);
    setGameScore(5);
    if (onSelectTemplateId) {
      onSelectTemplateId(UNIFIED_JOURNEY_STEPS[0].id);
    }
  };

  // Find corresponding template from settings for live customized text
  const currentStep = UNIFIED_JOURNEY_STEPS[currentStepIndex];
  const activeTemplate = settings?.questionTemplates?.find(t => t.id === currentStep.id);

  // Brand Name & Logo
  const brandTitle = isEnglish ? (settings?.branding?.restaurantNameEn || 'Family Restaurant & Cafe') : (settings?.branding?.restaurantName || 'مطعم العائلة');
  const brandLogoUrl = settings?.branding?.logoUrl || config?.logoUrl || '';

  return (
    <div className="flex flex-col items-center w-full select-none" dir="rtl">
      {/* Top Controller: Step Selector & Actions Bar */}
      <div className="w-full bg-slate-900 text-white p-3 rounded-2xl mb-3 shadow-lg border border-slate-700/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black text-emerald-300">
              {isEnglish ? 'Live Customer Screen' : 'معاينة تجربة العميل (المباشرة)'}
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold border border-slate-700">
              {currentStepIndex + 1} / {UNIFIED_JOURNEY_STEPS.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer text-[10px] font-bold flex items-center gap-1"
              title={isEnglish ? 'Restart Flow' : 'إعادة تشغيل المسار'}
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">{isEnglish ? 'Reset' : 'إعادة'}</span>
            </button>

            {onOpenFullScreen && (
              <button
                type="button"
                onClick={onOpenFullScreen}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                title={isEnglish ? 'Open Full Customer Screen' : 'فتح وضع معاينة تجربة العميل الكاملة'}
              >
                <ExternalLink size={12} />
                <span>{isEnglish ? 'Full View 🚀' : 'المعاينة الكاملة 🚀'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 8 Step Pills Bar - Synchronized with the editor on the left */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {UNIFIED_JOURNEY_STEPS.map((step, idx) => {
            const isActive = currentStepIndex === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={`shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-[#005A2B] text-white border-emerald-400 shadow-md shadow-emerald-950/40 scale-102'
                    : 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                }`}
                title={isEnglish ? step.titleEn : step.titleAr}
              >
                <span className="text-xs">{step.icon}</span>
                <span className="font-mono text-[10px] text-amber-300">#{step.num}</span>
                <span className="whitespace-nowrap">{isEnglish ? step.titleEn : step.titleAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Realistic Mobile Phone Frame (Clean White Theme matching Customer Preview in Image 2 & Video) */}
      <div className="w-full max-w-[390px] bg-white rounded-[38px] shadow-[0_20px_50px_rgba(0,0,0,0.18),0_0_0_10px_#1e293b,0_0_0_12px_#334155] border-2 border-slate-200 overflow-hidden relative flex flex-col min-h-[640px] max-h-[720px]">
        {/* Phone Top Speaker & Dynamic Island */}
        <div className="w-full bg-slate-900 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-bold z-30 select-none">
          <span className="font-mono tracking-wider">9:41</span>
          <div className="w-20 h-4 bg-black rounded-full mx-auto flex items-center justify-center gap-1.5 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-slate-800" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span>5G</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Customer Experience Top Brand Header (Shown when not on welcome step, exactly like Video 0:01) */}
        {currentStepIndex > 0 && (
          <div className="bg-white/95 border-b border-slate-100 px-4 py-2 flex items-center justify-between z-20 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <span>تجربة رقم #01</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {selectedLanguage === 'ar' ? 'العربية 🇸🇦' : selectedLanguage === 'en' ? 'English 🇬🇧' : 'Filipino 🇵🇭'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="text-right">
                <div className="text-xs font-black text-[#005A2B] leading-none">{brandTitle}</div>
                <div className="text-[9px] text-[#E34F26] font-bold">عالم من المزايا</div>
              </div>
              <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center overflow-hidden">
                {brandLogoUrl ? (
                  <img src={brandLogoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs">🐼</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Screen Viewport with Smooth Animation */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-between bg-gradient-to-b from-white via-slate-50/50 to-white relative">
          <AnimatePresence mode="wait">
            {/* ==================== STEP 1: LANGUAGE SELECTION (3D ROLLER) ==================== */}
            {currentStepIndex === 0 && (
              <motion.div
                key="step-welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex-1 flex flex-col items-center justify-between text-center py-2"
              >
                {/* SA Flag Badge top right */}
                <div className="w-full flex justify-end">
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-2xs">
                    <span>SA</span>
                    <span>🇸🇦</span>
                  </div>
                </div>

                {/* Logo & Welcome Badge */}
                <div className="my-auto flex flex-col items-center gap-2 w-full">
                  <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 w-24 h-12 flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🐼</span>
                      <div className="text-right">
                        <div className="text-[11px] font-black text-[#005A2B] leading-tight">بنده</div>
                        <div className="text-[8px] text-[#E34F26] font-bold">عالم من المزايا</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-2xs">
                    <span>✨ مرحباً بك في أسواق بنده 🐼</span>
                  </div>

                  <div className="space-y-0.5 mt-1">
                    <h2 className="text-xl font-black text-gray-800 flex items-center justify-center gap-1.5">
                      <span>{activeTemplate?.titleAr || 'اختر لغتك المفضلة'}</span>
                      <span className="text-blue-500">🌐</span>
                    </h2>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {activeTemplate?.subtitleAr || 'لتجربة تسوق ذكية وممتعة مخصصة لك'}
                    </p>
                  </div>

                  {/* 3D Language Roller Container (Exact matching Image 2 & Video) */}
                  <div className="w-full max-w-xs my-3 bg-white rounded-2xl border border-slate-200 p-2 shadow-xs relative overflow-hidden">
                    {/* Upper Item (Filipino) */}
                    <div 
                      onClick={() => setSelectedLanguage('fil')}
                      className={`py-1.5 text-center text-xs font-bold transition-all cursor-pointer ${
                        selectedLanguage === 'fil' ? 'text-emerald-700 font-black' : 'text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 text-[11px]">
                        <span>🇵🇭 PH</span>
                        <span>Filipino</span>
                        <span>PH 🇵🇭</span>
                      </div>
                      <div className="text-[9px] text-slate-400">Philippines (الفلبين)</div>
                    </div>

                    {/* Center Active Item (العربية) with Green Highlight Border */}
                    <div 
                      onClick={() => setSelectedLanguage('ar')}
                      className="my-1 py-2 px-3 bg-emerald-50/80 border-2 border-[#005A2B] rounded-xl flex items-center justify-between text-[#005A2B] font-black shadow-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-1 text-xs">
                        <span className="w-1.5 h-4 bg-[#005A2B] rounded-full" />
                        <span>🇸🇦 SA</span>
                      </div>
                      <div className="text-center">
                        <div className="text-base font-black">العربية</div>
                        <div className="text-[9px] font-bold text-emerald-700">العربية • المملكة العربية السعودية</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>SA 🇸🇦</span>
                        <span className="w-1.5 h-4 bg-[#005A2B] rounded-full" />
                      </div>
                    </div>

                    {/* Lower Item (English) */}
                    <div 
                      onClick={() => setSelectedLanguage('en')}
                      className={`py-1.5 text-center text-xs font-bold transition-all cursor-pointer ${
                        selectedLanguage === 'en' ? 'text-emerald-700 font-black' : 'text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 text-[11px]">
                        <span>🇬🇧 GB</span>
                        <span>English</span>
                        <span>GB 🇬🇧</span>
                      </div>
                      <div className="text-[9px] text-slate-400">English • International</div>
                    </div>

                    <div className="text-[9px] text-slate-400 font-bold text-center mt-1">
                      ^ حرك بإصبعك للأعلى والأسفل ثم اضغط تأكيد v
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-[#E34F26] to-[#cf421b] text-white py-3.5 rounded-2xl text-sm font-black shadow-md shadow-orange-700/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-98 transition-all"
                >
                  <span>{activeTemplate?.actionButtonText || 'تأكيد ومتابعة >'}</span>
                </button>
              </motion.div>
            )}

            {/* ==================== STEP 2: CONNECTED SUCCESS SCREEN ==================== */}
            {currentStepIndex === 1 && (
              <motion.div
                key="step-connected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col items-center justify-between text-center py-4"
              >
                <div className="w-full flex justify-start">
                  <button onClick={handlePrevStep} className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
                    <ChevronRight size={14} />
                    <span>رجوع</span>
                  </button>
                </div>

                <div className="my-auto flex flex-col items-center gap-4 w-full">
                  {/* Animated Double Pulsing Ring */}
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full border-4 border-[#005A2B]/30"
                    />
                    <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center relative shadow-sm">
                      <div className="w-16 h-16 rounded-full border-4 border-[#005A2B] bg-white flex items-center justify-center text-[#005A2B] shadow-xs">
                        <Check size={32} strokeWidth={3.5} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-gray-800">
                      {activeTemplate?.titleAr || 'تم الربط بنجاح!'}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium max-w-xs leading-relaxed">
                      {activeTemplate?.subtitleAr || 'استعد لتجربة تسوق ذكية وعروض حصرية مصممة لك'}
                    </p>
                  </div>

                  {/* Auto-advance banner */}
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-2xs mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>تم الربط! جاري المتابعة تلقائياً...</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[#005A2B] text-white py-3 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-700 active:scale-98 transition-all"
                >
                  <span>متابعة للكتالوج والأقسام 👈</span>
                </button>
              </motion.div>
            )}

            {/* ==================== STEP 3: SHOPPING / MENU CATALOG (BENTO & 2X2 GRID) ==================== */}
            {currentStepIndex === 2 && (
              <motion.div
                key="step-shopping"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col justify-between text-right"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={16} className="text-[#005A2B]" />
                      <h2 className="text-sm font-black text-gray-800">
                        {isCafe ? 'قائمة مشروبات وحلويات الكافيه' : 'اختر احتياجاتك لهذا اليوم'}
                      </h2>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      المرحلة 1 من 4
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {activeTemplate?.subtitleAr || 'اختر طلبك المفضل لتخصيص العروض والمكافآت'}
                  </p>
                </div>

                {/* Category Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl my-2">
                  {departments.slice(0, 4).map((dept) => {
                    const isTabActive = activeDeptTab === dept.id;
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setActiveDeptTab(dept.id);
                        }}
                        className={`py-1 px-1 rounded-lg text-[10px] font-black transition-all text-center truncate ${
                          isTabActive
                            ? 'bg-[#005A2B] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-white/80'
                        }`}
                      >
                        {dept.name}
                      </button>
                    );
                  })}
                </div>

                {/* 2x2 Bento Product Grid with Real High-Res Photos (Matching Video 0:02-0:09) */}
                <div className="grid grid-cols-2 gap-2 flex-1 my-1">
                  {(departments.find(d => d.id === activeDeptTab)?.products || departments[0]?.products || []).slice(0, 4).map((prod) => {
                    const isSelected = selectedProducts.includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedProducts(prev => 
                            prev.includes(prod.id) ? prev.filter(id => id !== prod.id) : [...prev, prod.id]
                          );
                        }}
                        className={`rounded-2xl border p-2 flex flex-col justify-between cursor-pointer transition-all relative overflow-hidden ${
                          isSelected
                            ? 'border-2 border-[#005A2B] bg-emerald-50/50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-[#005A2B] text-white flex items-center justify-center text-[10px]">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <div className="w-full h-20 rounded-xl overflow-hidden bg-slate-100 mb-1">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div className="text-[11px] font-black text-gray-800 line-clamp-1">{prod.name}</div>
                        <div className="text-[9px] text-gray-400 font-bold">
                          {isSelected ? '✓ محدد' : 'اضغط للاختيار'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1.5 mt-2">
                  <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[10px] font-black text-emerald-800 text-center">
                    👉 اختر طلبك من هذا القسم للانتقال للقسم التالي
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-[#005A2B] text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer hover:bg-emerald-700 active:scale-98 transition-all"
                  >
                    متابعة لتفضيل المكافأة 🎁
                  </button>
                </div>
              </motion.div>
            )}

            {/* ==================== STEP 4: REWARD PREFERENCE (ماذا تفضل؟) ==================== */}
            {currentStepIndex === 3 && (
              <motion.div
                key="step-preference"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col justify-between text-center py-2"
              >
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-gray-800">
                    {activeTemplate?.titleAr || 'ماذا تفضل؟'}
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    {activeTemplate?.subtitleAr || 'من تجربتك نحسن أداءنا وتطوير خدماتنا لكم'}
                  </p>
                </div>

                {/* 4 Reward Preference Cards (2x2 Grid matching Video 0:11) */}
                <div className="grid grid-cols-2 gap-2.5 my-auto w-full">
                  {[
                    { id: 'points', label: 'نقاط في التطبيق', icon: <Coins size={22} className="text-amber-500" />, bg: 'bg-amber-50' },
                    { id: 'cashback', label: 'كاش باك', icon: <Wallet size={22} className="text-emerald-500" />, bg: 'bg-emerald-50' },
                    { id: 'discount', label: 'خصومات حصرية', icon: <Percent size={22} className="text-orange-500" />, bg: 'bg-orange-50' },
                    { id: 'gift', label: 'هدايا وقسائم مجانية', icon: <Gift size={22} className="text-purple-500" />, bg: 'bg-purple-50' },
                  ].map((opt) => {
                    const isSelected = selectedReward === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedReward(opt.id);
                        }}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-between min-h-[105px] cursor-pointer transition-all relative ${
                          isSelected
                            ? 'border-2 border-[#005A2B] bg-emerald-50/70 shadow-sm ring-2 ring-[#005A2B]/20'
                            : 'border-slate-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-[#005A2B] text-white flex items-center justify-center text-[10px]">
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <div className={`w-10 h-10 rounded-xl ${opt.bg} flex items-center justify-center`}>
                          {opt.icon}
                        </div>
                        <span className="text-xs font-black text-gray-800">{opt.label}</span>
                        <span className="text-[9px] font-bold text-gray-400">
                          {isSelected ? '✓ تم الاختيار' : 'اختر هذا العرض'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1.5">
                  <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs font-black text-emerald-800 text-center">
                    ✓ تم اختيار مكافأتك! جاري المتابعة...
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-[#005A2B] text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer hover:bg-emerald-700 active:scale-98 transition-all"
                  >
                    متابعة لتحدي السرعة ⚡
                  </button>
                </div>
              </motion.div>
            )}

            {/* ==================== STEP 5: SPEED CHALLENGE & GAME (تحدي السرعة) ==================== */}
            {currentStepIndex === 4 && (
              <motion.div
                key="step-challenge"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col justify-between text-center py-2 relative"
              >
                {!isGameRunning && !isGameOver ? (
                  /* Mode A: Challenge Splash Screen (Video 0:13) */
                  <>
                    <div className="space-y-1">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm mx-auto flex items-center justify-center text-xl">
                        🐼
                      </div>
                      <h2 className="text-lg font-black text-[#005A2B]">تحدي بنده السريع</h2>
                      <p className="text-[11px] text-gray-500 font-medium">
                        فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية!
                      </p>
                    </div>

                    {/* 3 Difficulty Buttons */}
                    <div className="space-y-1.5 my-auto w-full">
                      <div className="text-[11px] font-black text-gray-600 text-right px-1">
                        مستوى الصعوبة:
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'easy', label: 'سهلة', time: '15 ثواني', emoji: '🟢' },
                          { id: 'medium', label: 'متوسطة', time: '10 ثواني', emoji: '⚡' },
                          { id: 'hard', label: 'صعبة', time: '8 ثواني', emoji: '🔥' },
                        ].map(d => {
                          const isSel = selectedDifficulty === d.id;
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => {
                                soundManager.playClick();
                                setSelectedDifficulty(d.id as any);
                              }}
                              className={`p-2 rounded-xl border flex flex-col items-center justify-between cursor-pointer transition-all ${
                                isSel
                                  ? 'border-2 border-[#005A2B] bg-emerald-50 font-black'
                                  : 'border-slate-200 bg-white text-slate-600'
                              }`}
                            >
                              <span className="text-lg">{d.emoji}</span>
                              <span className="text-xs font-black">{d.label}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{d.time}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Prize Banner */}
                      <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center justify-between text-right mt-2">
                        <div>
                          <div className="text-[9px] font-black text-amber-900 bg-amber-200/80 px-1.5 py-0.5 rounded-md inline-block">
                            جائزة التحدي
                          </div>
                          <div className="text-[11px] font-black text-gray-800 mt-0.5">
                            خصم فوري 10% على كامل سلتك
                          </div>
                        </div>
                        <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg">
                          FREE 🎁
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playPop();
                        setIsGameRunning(true);
                        setGameTimer(selectedDifficulty === 'easy' ? 15 : selectedDifficulty === 'medium' ? 10 : 8);
                        setGameScore(0);
                      }}
                      className="w-full bg-gradient-to-r from-[#E34F26] to-[#cf421b] text-white py-3.5 rounded-2xl text-sm font-black shadow-md shadow-orange-700/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-98 transition-all"
                    >
                      <Play size={16} fill="white" />
                      <span>ابدأ التحدي السريع ✨</span>
                    </button>
                  </>
                ) : isGameRunning ? (
                  /* Mode B: Active Bubble Popping Game (Video 0:15-0:23) */
                  <div className="w-full h-full flex flex-col justify-between">
                    {/* Game HUD */}
                    <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl text-xs font-black">
                      <div className="flex items-center gap-1 text-emerald-800 font-mono">
                        <Clock size={13} />
                        <span>0:0{gameTimer}</span>
                      </div>
                      <div className="text-slate-600">فرقع الشعارات!</div>
                      <div className="text-[#005A2B] font-mono">النقاط: {gameScore}</div>
                    </div>

                    {/* Game Field with Floating Bubbles */}
                    <div className="relative flex-1 my-2 bg-radial from-emerald-50 to-white rounded-2xl border border-emerald-100 overflow-hidden min-h-[220px]">
                      {bubbles.map((b) => (
                        <motion.button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            soundManager.playPop();
                            setGameScore(s => s + 1);
                            setBubbles(prev => prev.map(item => item.id === b.id ? { ...item, popped: true } : item));
                            setTimeout(() => {
                              setBubbles(prev => prev.map(item => item.id === b.id ? { ...item, popped: false } : item));
                            }, 800);
                          }}
                          style={{ top: `${b.y}%`, left: `${b.x}%` }}
                          animate={{ y: [0, -10, 0], scale: b.popped ? [1, 1.4, 0] : 1 }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-emerald-400 bg-white shadow-md flex items-center justify-center cursor-pointer ${
                            b.popped ? 'opacity-0' : 'opacity-100'
                          }`}
                        >
                          <span className="text-lg">🐼</span>
                        </motion.button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsGameRunning(false);
                        setIsGameOver(true);
                      }}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      إنهاء اللعبة مبكراً
                    </button>
                  </div>
                ) : (
                  /* Mode C: Game Result Screen (Video 0:24) */
                  <div className="w-full flex-1 flex flex-col justify-between items-center py-2">
                    <div className="text-2xl animate-bounce">🎉 🎈 ✨</div>
                    <div className="space-y-1">
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-black">
                        انتهى الوقت!
                      </span>
                      <h2 className="text-lg font-black text-gray-800">مجموع نقاطك: {gameScore || 5}</h2>
                      <p className="text-xs text-emerald-800 font-bold">
                        مشاركة رائعة ومميزة! تأهلت للحصول على كود الخصم الفوري
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl w-full text-right space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-600">
                        <span>النقاط: {gameScore || 5}</span>
                        <span>المكافأة: خصم 10%</span>
                      </div>
                      <div className="text-[11px] font-black text-[#005A2B]">
                        ✓ تم تفعيل الهدية بنجاح!
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-[#005A2B] text-white py-3 rounded-2xl text-xs font-black shadow-md cursor-pointer hover:bg-emerald-700 active:scale-98 transition-all"
                    >
                      استلم القسيمة والهدية 🎁
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ==================== STEP 6: VOUCHER UNLOCK FORM (قسيمة الخصم) ==================== */}
            {currentStepIndex === 5 && (
              <motion.div
                key="step-voucher"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col justify-between text-center py-2"
              >
                <div className="space-y-0.5">
                  <h2 className="text-lg font-black text-[#005A2B]">مبروك! لقد ربحت 🎁</h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    هدية فورية تقديراً لمشاركتك في التحدي
                  </p>
                </div>

                {/* Ticket Voucher Card (Exact matching Video 0:26) */}
                <div className="w-full my-auto bg-gradient-to-b from-white to-emerald-50/60 rounded-2xl border-2 border-dashed border-emerald-300 p-3 shadow-xs text-center relative">
                  <div className="text-[10px] text-emerald-800 font-black flex items-center justify-center gap-1">
                    <span>تم فك قفل قسيمتك بنجاح!</span>
                    <span>🎉</span>
                  </div>
                  <div className="text-xl font-black text-gray-800 my-1">
                    10% خصم فوري
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold mb-2">
                    على جميع المشروبات والحلى
                  </div>

                  {/* Coupon Code Pill */}
                  <div className="inline-flex items-center gap-2 bg-white border border-amber-300 px-3 py-1 rounded-xl shadow-2xs">
                    <span className="font-mono font-black text-xs text-amber-900 tracking-wider">
                      {isCafe ? 'CAFE-WIN-10' : 'PANDA-WIN-10'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setCopiedCoupon(true);
                        setTimeout(() => setCopiedCoupon(false), 2000);
                      }}
                      className="text-slate-400 hover:text-emerald-700"
                    >
                      {copiedCoupon ? <CheckCheck size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1">صالح لمدة 48 ساعة ⏱️</div>
                </div>

                {/* Name & Phone Inputs */}
                <div className="w-full space-y-2 text-right">
                  <div>
                    <label className="text-[10px] font-black text-gray-600 block mb-0.5">اسمك الكريم:</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-600 block mb-0.5">رقم الجوال:</label>
                    <div className="flex items-center gap-1" dir="ltr">
                      <span className="bg-slate-100 border border-slate-200 px-2 py-2 rounded-xl text-xs font-mono font-bold text-slate-600">
                        +966 🇸🇦
                      </span>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-gray-800 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-[#E34F26] to-[#cf421b] text-white py-3 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-98 transition-all mt-2"
                >
                  <span>استلم الهدية الآن 🎁</span>
                </button>
              </motion.div>
            )}

            {/* ==================== STEP 7: FEEDBACK SURVEY (تقييم الخدمة) ==================== */}
            {currentStepIndex === 6 && (
              <motion.div
                key="step-feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col justify-between text-right py-2"
              >
                <div className="space-y-0.5">
                  <h2 className="text-base font-black text-gray-800">
                    {activeTemplate?.titleAr || (isCafe ? 'كيف كانت تجربتك في الكافيه اليوم؟' : 'كيف كانت تجربتك في أسواقنا؟')}
                  </h2>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {activeTemplate?.subtitleAr || 'رأيك يهمنا لتطوير جودة القهوة وسرعة الخدمة والضيافة'}
                  </p>
                </div>

                {/* 3 Survey Criteria Rows (Matching Video 0:33) */}
                <div className="space-y-3 my-auto w-full">
                  {[
                    { id: 'cleanliness', label: isCafe ? 'ما رأيك في نظافة وهدوء الجلسات وأجواء الكافيه؟' : 'ما رأيك في نظافة وترتيب الأرفف؟' },
                    { id: 'speed', label: isCafe ? 'كيف تقيّم سرعة تحضير الطلب واحترافية الباريستا؟' : 'كيف تقيّم سرعة الكاشير وتعامل الطاقم؟' },
                    { id: 'overall', label: isCafe ? 'التقييم العام لتجربة الكافيه وجودة القهوة' : 'التقييم العام لتجربة التسوق' },
                  ].map((q) => {
                    const currentRating = feedbackRatings[q.id] || 'great';
                    return (
                      <div key={q.id} className="bg-white border border-slate-200 p-2.5 rounded-xl space-y-1.5 shadow-2xs">
                        <div className="text-[11px] font-black text-gray-800">{q.label}</div>
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { grade: 'great', label: 'ممتاز', emoji: '😍' },
                            { grade: 'good', label: 'جيد', emoji: '😊' },
                            { grade: 'normal', label: 'عادي', emoji: '😐' },
                            { grade: 'bad', label: 'غير مرضي', emoji: '😞' },
                          ].map(g => {
                            const isSelected = currentRating === g.grade;
                            return (
                              <button
                                key={g.grade}
                                type="button"
                                onClick={() => {
                                  soundManager.playClick();
                                  setFeedbackRatings(prev => ({ ...prev, [q.id]: g.grade }));
                                }}
                                className={`py-1.5 px-1 rounded-lg text-center cursor-pointer transition-all border ${
                                  isSelected
                                    ? 'bg-emerald-50 border-[#005A2B] text-[#005A2B] font-black shadow-2xs'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <span className="text-sm block">{g.emoji}</span>
                                <span className="text-[9px] font-bold block mt-0.5">{g.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1 mt-2">
                  <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-xl text-[10px] font-black text-emerald-800 text-center">
                    شكراً لتقييمك! جاري إتمام الزيارة...
                  </div>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-[#005A2B] text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer hover:bg-emerald-700 active:scale-98 transition-all"
                  >
                    إنهاء وعرض بطاقة الولاء والشكر ❤️
                  </button>
                </div>
              </motion.div>
            )}

            {/* ==================== STEP 8: THANK YOU & LOYALTY CARD (الشكر والولاء) ==================== */}
            {currentStepIndex === 7 && (
              <motion.div
                key="step-thank-you"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex-1 flex flex-col justify-between text-center py-2"
              >
                <div className="space-y-1">
                  <div className="text-xl animate-bounce">🎉 💖 ⭐</div>
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-0.5 rounded-full text-[10px] font-black inline-block">
                    عميلنا العزيز والمميز ⭐
                  </div>
                  <h2 className="text-xl font-black text-gray-800">{guestName || 'علي'} 😍</h2>
                  <p className="text-[11px] text-gray-500 font-medium">
                    شكراً لك يا {guestName || 'علي'}! سعدنا جداً بمشاركتك معنا
                  </p>
                </div>

                {/* Digital Loyalty Stamp Card (Exact matching Video 0:37) */}
                <div className="bg-white border-2 border-emerald-300 rounded-2xl p-3 my-auto shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#005A2B]">مشروب قهوة مجاني</span>
                    <span className="text-[10px] font-bold text-gray-500">بطاقة ولاء القهوة المعتمدة</span>
                  </div>

                  {/* 8 Stamp Circles */}
                  <div className="grid grid-cols-4 gap-2 py-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                      const isStamped = num <= 5;
                      return (
                        <div
                          key={num}
                          className={`h-9 rounded-xl border flex items-center justify-center text-xs font-mono font-black ${
                            isStamped
                              ? 'bg-emerald-500 border-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          {isStamped ? '✓' : `0${num}`}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[9px] text-gray-500 font-bold">
                    كل 6 زيارات = احصل على مشروب قهوة مجاناً!
                  </div>

                  {/* Show Loyalty QR Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setShowQrModal(true);
                    }}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <QrCode size={14} className="text-[#005A2B]" />
                    <span>عرض بطاقة الولاء (QR Code)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full bg-[#005A2B] text-white py-3 rounded-2xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-700 active:scale-98 transition-all"
                >
                  <RotateCcw size={14} />
                  <span>العودة للرئيسية وإعادة التجربة</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phone Bottom Gesture Bar */}
        <div className="w-full bg-white py-1.5 flex items-center justify-center">
          <div className="w-28 h-1 bg-slate-400 rounded-full" />
        </div>
      </div>

      {/* QR Code Modal for Loyalty Card (matching Video 0:41) */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-5 max-w-xs w-full text-center shadow-2xl border border-slate-200 space-y-3"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-[#005A2B] flex items-center justify-center mx-auto text-lg">
              🎖️
            </div>
            <h3 className="text-sm font-black text-gray-800">بطاقة الولاء الرقمية المعتمدة</h3>
            <p className="text-[11px] text-gray-500 font-medium">
              أظهر رمز QR للموظف عند الكاشير لاحتساب نقاط الإتمام والمكافآت
            </p>

            {/* QR Mockup */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl inline-block shadow-inner">
              <QrCode size={140} className="text-gray-800" />
              <div className="font-mono text-[10px] font-black text-slate-500 mt-1">
                8829 - PND-CAFE
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full bg-[#005A2B] text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer hover:bg-emerald-700"
            >
              إغلاق والعودة
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
