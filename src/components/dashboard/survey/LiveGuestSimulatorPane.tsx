import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Sparkles, 
  Smartphone, 
  Check, 
  RotateCcw, 
  Gift, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  ArrowRight,
  ArrowLeft,
  MoveRight,
  MoveLeft,
  ListOrdered,
  Layers,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  SurveyCustomizerSettings,
  SurveyIdentitySettings,
  QuestionTemplateItem
} from '../../../types/surveyPlatform';
import {
  DEFAULT_IMPRESSION_CARDS,
  DEFAULT_QUESTION_TEMPLATES,
  DEFAULT_MENU_ITEMS,
  DEFAULT_EVALUATION_PILLARS,
  DEFAULT_QUICK_TAGS,
  DEFAULT_LOYALTY_PRIZES
} from '../../../utils/surveyDefaults';

interface LiveGuestSimulatorPaneProps {
  settings: SurveyCustomizerSettings;
  activeTableNumber: string;
  onTableChange: (tableNumber: string) => void;
  onOpenFullModal: () => void;
  onUpdateScreenOrder?: (order: string[]) => void;
  onUpdateIdentity?: (identity: SurveyIdentitySettings) => void;
  highlightSection?: 'impression' | 'questions' | 'dishes' | 'pillars' | 'tags' | 'prizes' | 'identity';
  isEnglish?: boolean;
}

export const LiveGuestSimulatorPane: React.FC<LiveGuestSimulatorPaneProps> = ({
  settings,
  activeTableNumber,
  onTableChange,
  onOpenFullModal,
  onUpdateScreenOrder,
  onUpdateIdentity,
  highlightSection,
  isEnglish = false
}) => {
  const { branding, tables } = settings;

  const identity = settings.identitySettings || {
    logoUrl: branding.logoUrl || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop&q=85',
    coverUrl: branding.coverBannerUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85',
    restaurantNameAr: branding.restaurantName || 'مطعم ومقهى السفير',
    restaurantNameEn: branding.restaurantNameEn || 'Al Safeer Restaurant & Cafe',
    overallQuestionAr: 'ما هو انطباعك العام عن زيارتك اليوم؟ 🌟',
    overallQuestionEn: 'How was your overall experience today? 🌟'
  };

  // Header controls & states
  const [activeVenueType, setActiveVenueType] = useState<'restaurant' | 'cafe'>('restaurant');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const phoneHeaderInputRef = useRef<HTMLInputElement>(null);
  const phoneLogoInputRef = useRef<HTMLInputElement>(null);

  const handlePhoneHeaderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handlePhoneLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Selected state within the live pane
  const [selectedImpressionId, setSelectedImpressionId] = useState<string>(impressionCards[0]?.id || '1');
  const [templateAnswers, setTemplateAnswers] = useState<Record<string, string>>({});
  const [pillarRatings, setPillarRatings] = useState<Record<string, number>>({
    food: 5,
    service: 5,
    ambiance: 5,
    welcome: 5
  });
  const [selectedDishes, setSelectedDishes] = useState<string[]>([menuItems[0]?.id || 'm1']);
  const [selectedTags, setSelectedTags] = useState<string[]>([quickTags[0]?.id || 't1']);

  // Specialized Template Interactive State for Simulator
  const [simLanguageIndex, setSimLanguageIndex] = useState<number>(0);
  const [simSelectedProducts, setSimSelectedProducts] = useState<string[]>(['p1']);
  const [simActiveDepartment, setSimActiveDepartment] = useState<string>('veg');

  const SIM_ROLLER_LANGUAGES = [
    { id: 'ar', code: 'SA', flag: '🇸🇦', name: 'العربية', subtext: 'العربية • المملكة العربية السعودية' },
    { id: 'en', code: 'GB', flag: '🇬🇧', name: 'English', subtext: 'English - International' },
    { id: 'fil', code: 'PH', flag: '🇵🇭', name: 'Filipino', subtext: '(Philippines) Filipino - الفلبين' },
    { id: 'ur', code: 'PK', flag: '🇵🇰', name: 'اردو', subtext: 'Urdu - Multilingual' },
  ];

  // Active Screen ID: 'impression' | `template_${id}` | 'pillars' | 'dishes' | 'prizes'
  const [activeScreenId, setActiveScreenId] = useState<string>('impression');

  // Drag and drop state for mouse reordering
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showOrderPanel, setShowOrderPanel] = useState<boolean>(false);

  // Define screen item interface
  interface SimulatorScreenItem {
    id: string;
    cleanId: string;
    label: string;
    shortLabel: string;
    emoji: string;
    template?: QuestionTemplateItem;
  }

  // Map of all available screen objects from enabledTemplates & legacy aliases
  const allScreensMap: Record<string, SimulatorScreenItem> = {};

  // 1. Populate from enabledTemplates (The single source of truth!)
  enabledTemplates.forEach((t, idx) => {
    let shortText = t.categoryBadge.replace(/^[✨\s]+|[✨\s]+$/g, '').trim();
    if (shortText.length > 15) {
      shortText = shortText.slice(0, 14) + '…';
    }
    const item: SimulatorScreenItem = {
      id: t.id,
      cleanId: t.id,
      label: t.categoryBadge || (isEnglish ? `Stage ${idx + 1}` : `المرحلة ${idx + 1}`),
      shortLabel: shortText || (isEnglish ? `Q${idx + 1}` : `سؤال ${idx + 1}`),
      emoji: t.options[0]?.emoji || '✨',
      template: t
    };
    allScreensMap[t.id] = item;
    allScreensMap[`template_${t.id}`] = item;
  });

  // 2. Legacy alias fallbacks for backwards compatibility
  if (!allScreensMap['impression']) {
    allScreensMap['impression'] = {
      id: 'impression',
      cleanId: 'impression',
      label: isEnglish ? 'Overall Impression 🌟' : 'الانطباع العام 🌟',
      shortLabel: isEnglish ? 'Impression' : 'الانطباع',
      emoji: '🌟',
      template: enabledTemplates.find(t => t.id === 'qt_impression_stars')
    };
  }
  if (!allScreensMap['pillars']) {
    allScreensMap['pillars'] = {
      id: 'pillars',
      cleanId: 'pillars',
      label: isEnglish ? 'Quality Standards ⭐' : 'معايير الجودة ⭐',
      shortLabel: isEnglish ? 'Quality' : 'المعايير',
      emoji: '⭐',
      template: enabledTemplates.find(t => t.id === 'qt_quality_pillars')
    };
  }
  if (!allScreensMap['dishes']) {
    allScreensMap['dishes'] = {
      id: 'dishes',
      cleanId: 'dishes',
      label: isEnglish ? 'Menu & Tags 🍽️' : 'المنيو والوسوم 🍽️',
      shortLabel: isEnglish ? 'Menu' : 'المنيو',
      emoji: '🍽️',
      template: enabledTemplates.find(t => t.id === 'qt_signature_dishes')
    };
  }
  if (!allScreensMap['prizes']) {
    allScreensMap['prizes'] = {
      id: 'prizes',
      cleanId: 'prizes',
      label: isEnglish ? 'Gift & Reward 🎁' : 'الهدية والولاء 🎁',
      shortLabel: isEnglish ? 'Reward' : 'الهدية',
      emoji: '🎁',
      template: enabledTemplates.find(t => t.id === 'qt_voucher_gift')
    };
  }

  // Build the ordered screensList honoring settings.screenOrder
  const rawOrder = settings.screenOrder && settings.screenOrder.length > 0
    ? settings.screenOrder
    : enabledTemplates.map(t => t.id);

  const screensList: SimulatorScreenItem[] = [];
  const seenCanonicalKeys = new Set<string>();

  rawOrder.forEach(id => {
    const cleanKey = id.replace(/^template_/, '');
    const screenItem = allScreensMap[cleanKey] || allScreensMap[id];
    if (screenItem) {
      const canonicalKey = screenItem.template ? screenItem.template.id : screenItem.cleanId;
      if (!seenCanonicalKeys.has(canonicalKey)) {
        screensList.push(screenItem);
        seenCanonicalKeys.add(canonicalKey);
      }
    }
  });

  // Append any enabled templates that were not in rawOrder
  enabledTemplates.forEach(t => {
    if (!seenCanonicalKeys.has(t.id)) {
      const screenItem = allScreensMap[t.id];
      if (screenItem) {
        screensList.push(screenItem);
        seenCanonicalKeys.add(t.id);
      }
    }
  });

  // Reorder helper
  const handleMoveScreen = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= screensList.length || toIdx >= screensList.length) return;
    const reordered = [...screensList];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    const newOrder = reordered.map(s => s.template ? s.template.id : s.id);
    onUpdateScreenOrder?.(newOrder);
  };

  const handleResetOrder = () => {
    const defaultOrder = enabledTemplates.map(t => t.id);
    onUpdateScreenOrder?.(defaultOrder);
  };

  // Sync active screen with tab highlight or ensure it exists in screensList
  useEffect(() => {
    if (highlightSection === 'impression') {
      const impScreen = screensList.find(s => s.id === 'impression' || s.template?.id === 'qt_impression_stars');
      if (impScreen) setActiveScreenId(impScreen.id);
    } else if (highlightSection === 'questions') {
      if (screensList.length > 0) {
        setActiveScreenId(screensList[0].id);
      }
    } else if (highlightSection === 'pillars') {
      const pilScreen = screensList.find(s => s.id === 'pillars' || s.template?.id === 'qt_quality_pillars');
      if (pilScreen) setActiveScreenId(pilScreen.id);
    } else if (highlightSection === 'dishes' || highlightSection === 'tags') {
      const dshScreen = screensList.find(s => s.id === 'dishes' || s.template?.id === 'qt_signature_dishes');
      if (dshScreen) setActiveScreenId(dshScreen.id);
    } else if (highlightSection === 'prizes') {
      const przScreen = screensList.find(s => s.id === 'prizes' || s.template?.id === 'qt_voucher_gift');
      if (przScreen) setActiveScreenId(przScreen.id);
    }
  }, [highlightSection, screensList.length]);

  // Keep activeScreenId valid if screens change
  useEffect(() => {
    if (screensList.length > 0) {
      const isStillPresent = screensList.some(s => 
        s.id === activeScreenId || 
        s.cleanId === activeScreenId || 
        `template_${s.cleanId}` === activeScreenId ||
        s.template?.id === activeScreenId
      );
      if (!isStillPresent) {
        setActiveScreenId(screensList[0].id);
      }
    }
  }, [screensList, activeScreenId]);

  const currentIndex = screensList.findIndex(s => 
    s.id === activeScreenId || 
    s.cleanId === activeScreenId || 
    `template_${s.cleanId}` === activeScreenId ||
    s.template?.id === activeScreenId
  );
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentScreen = screensList[safeIndex];

  const handleNextScreen = () => {
    if (safeIndex < screensList.length - 1) {
      setActiveScreenId(screensList[safeIndex + 1].id);
    } else {
      setActiveScreenId(screensList[0].id);
    }
  };

  const handlePrevScreen = () => {
    if (safeIndex > 0) {
      setActiveScreenId(screensList[safeIndex - 1].id);
    }
  };

  const handleReset = () => {
    setSelectedImpressionId(impressionCards[0]?.id || '1');
    setTemplateAnswers({});
    setPillarRatings({ food: 5, service: 5, cleanliness: 5, welcome: 5 });
    setSelectedDishes([menuItems[0]?.id || 'm1']);
    setSelectedTags([quickTags[0]?.id || 't1']);
    if (screensList.length > 0) {
      setActiveScreenId(screensList[0].id);
    }
  };

  // Find if current screen is or has a question template
  const currentTemplate = currentScreen?.template || enabledTemplates.find(t => 
    t.id === activeScreenId || 
    `template_${t.id}` === activeScreenId
  );

  // Precise routing flags so each screen displays its exact specialized content
  const isImpressionScreen = 
    activeScreenId === 'impression' || 
    activeScreenId === 'qt_impression_stars' || 
    currentTemplate?.id === 'qt_impression_stars' ||
    currentTemplate?.id === 'qt_overall_perks';

  const isPillarsScreen = 
    activeScreenId === 'pillars' || 
    activeScreenId === 'qt_quality_pillars' || 
    currentTemplate?.id === 'qt_quality_pillars';

  const isDishesScreen = 
    activeScreenId === 'dishes' || 
    activeScreenId === 'qt_signature_dishes' || 
    currentTemplate?.id === 'qt_signature_dishes';

  const isPrizesScreen = 
    activeScreenId === 'prizes' || 
    activeScreenId === 'qt_voucher_gift' || 
    currentTemplate?.id === 'qt_voucher_gift';

  const isLanguageRollerScreen = 
    currentTemplate?.layoutType === 'language_roller' || 
    currentTemplate?.id === 'qt_language_preference';

  const isProductCatalogScreen = 
    currentTemplate?.layoutType === 'product_catalog' || 
    currentTemplate?.id === 'qt_daily_shopping_needs';

  const isGenericQuestionScreen = 
    Boolean(currentTemplate) && 
    !isImpressionScreen && 
    !isPillarsScreen && 
    !isDishesScreen && 
    !isPrizesScreen && 
    !isLanguageRollerScreen && 
    !isProductCatalogScreen;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col shadow-xl sticky top-4">
      {/* Pane Header */}
      <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Smartphone size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-100 text-xs">
                {isEnglish ? 'Live Guest Experience' : 'شاشة تجربة العميل (مباشر)'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              {isEnglish ? 'Screen-by-Screen View 🟢' : 'عرض قالب بقالب (شاشة العميل) 🟢'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Table select */}
          <select
            value={activeTableNumber}
            onChange={(e) => onTableChange(e.target.value)}
            className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-amber-300 font-bold text-[11px] rounded-lg px-2 py-1 outline-none transition-colors cursor-pointer"
            title="تغيير رقم الطاولة"
          >
            {tables.map(t => (
              <option key={t.id} value={t.tableNumber}>
                طاولة #{t.tableNumber}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isEnglish ? 'Reset View' : 'إعادة ضبط'}
          >
            <RotateCcw size={13} />
          </button>

          <button
            type="button"
            onClick={onOpenFullModal}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            title={isEnglish ? 'Full Screen' : 'تكبير ملء الشاشة'}
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Quick Stage Switcher Pills - Direct Live Sync */}
      {screensList.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none text-xs shrink-0 border-b border-slate-800/80">
          {screensList.map((screen, sIdx) => {
            const isActive = safeIndex === sIdx;
            return (
              <button
                key={screen.id + '_' + sIdx}
                type="button"
                onClick={() => setActiveScreenId(screen.id)}
                className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer select-none text-[11px] ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs font-black' 
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
                title={screen.label}
              >
                <span className="text-[10px] opacity-75">{sIdx + 1}.</span>
                <span>{screen.emoji}</span>
                <span className="truncate max-w-[100px]">{screen.shortLabel}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Realistic Mobile Mockup Device */}
      <div 
        dir="rtl"
        className="mt-3 rounded-[36px] border-[6px] border-slate-800 shadow-2xl overflow-hidden bg-white flex flex-col h-[680px] sm:h-[720px] xl:h-[760px] max-h-[calc(100vh-90px)] min-h-[580px] relative text-slate-800"
      >
        {/* Device Notch & Top Speaker */}
        <div className="w-full bg-slate-900 h-4 sm:h-4.5 flex items-center justify-center relative shrink-0 z-20">
          <div className="w-16 h-3 bg-black rounded-b-xl flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="w-1 h-1 rounded-full bg-indigo-950" />
          </div>
        </div>

        {/* 1. LUXURY VENUE HEADER BANNER (Matching Image 1 Exactly - Responsively Compact) */}
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

          {/* Top Row: Venue Switcher + Language Pill + Dark Mode */}
          <div className="absolute top-1.5 inset-x-2.5 flex items-center justify-between z-10">
            {/* Left: Venue Category Pills (🍔 مطعم | ☕ كافيه) */}
            <div className="flex items-center p-0.5 bg-black/70 backdrop-blur-md rounded-full border border-white/20 shadow-md">
              <button
                type="button"
                onClick={() => setActiveVenueType('restaurant')}
                className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                  activeVenueType === 'restaurant'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🍔</span>
                <span>مطعم</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveVenueType('cafe')}
                className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeVenueType === 'cafe'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>☕</span>
                <span>كافيه</span>
              </button>
            </div>

            {/* Right: Gold Arabic Language Badge + Moon Icon */}
            <div className="flex items-center gap-1">
              <div className="bg-black/80 backdrop-blur-md border border-amber-400 text-amber-300 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center gap-1 shadow-md">
                <span className="font-mono text-[8px] sm:text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded">SA</span>
                <span>العربية</span>
                <span className="text-[10px]">🌐</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDarkMode(prev => !prev)}
                className="w-5.5 h-5.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-[10px] hover:bg-black/80 transition-colors cursor-pointer"
                title="تفعيل الوضع الليلي"
              >
                🌙
              </button>
            </div>
          </div>

          {/* Quick Header Banner Upload Trigger on Cover */}
          <button
            type="button"
            onClick={() => phoneHeaderInputRef.current?.click()}
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
              onClick={() => phoneLogoInputRef.current?.click()}
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

          {/* Hidden Inputs for Direct Phone Mockup File Uploads */}
          <input
            type="file"
            ref={phoneHeaderInputRef}
            onChange={handlePhoneHeaderUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={phoneLogoInputRef}
            onChange={handlePhoneLogoUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* 2. PROGRESS STAGE BAR MATCHING IMAGE 1 - DYNAMICALLY SYNCED */}
        <div className="px-3.5 pt-2 pb-1.5 bg-white border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between text-[10.5px] font-black">
            <div className="flex items-center gap-1.5 text-[#E34F26]">
              <span className="truncate max-w-[200px]">
                {currentScreen 
                  ? `${currentScreen.label.replace(/^[✨\s]+|[✨\s]+$/g, '')} .${safeIndex + 1}` 
                  : `المرحلة .${safeIndex + 1}`}
              </span>
              <span>{currentScreen?.emoji || currentTemplate?.options[0]?.emoji || '🌟'}</span>
            </div>
            <span className="text-slate-500 font-bold text-[9.5px]">
              {screensList.length > 0 ? `المرحلة ${safeIndex + 1} من ${screensList.length}` : '0 من 0'}
            </span>
          </div>
          {/* Segmented Bars dynamically matching screensList */}
          <div 
            className="grid gap-1 mt-1" 
            style={{ gridTemplateColumns: `repeat(${Math.max(screensList.length, 1)}, minmax(0, 1fr))` }}
          >
            {screensList.map((s, idx) => (
              <div 
                key={s.id + '_' + idx} 
                className={`h-1 rounded-full transition-all ${
                  idx === safeIndex 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500' 
                    : idx < safeIndex 
                      ? 'bg-orange-400' 
                      : 'bg-slate-200'
                }`} 
              />
            ))}
          </div>

          {/* Back, Step Counter and Next Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handlePrevScreen}
              disabled={safeIndex === 0}
              className={`text-[10.5px] font-bold flex items-center gap-0.5 cursor-pointer ${
                safeIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ChevronRight size={12} />
              <span>العودة</span>
            </button>
            <span className="text-[9.5px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
              {screensList.length > 0 ? `${safeIndex + 1}/${screensList.length}` : '0/0'}
            </span>
            <button
              type="button"
              onClick={handleNextScreen}
              disabled={safeIndex >= screensList.length - 1}
              className={`text-[10.5px] font-bold flex items-center gap-0.5 cursor-pointer ${
                safeIndex >= screensList.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-orange-600 hover:text-orange-700 font-black'
              }`}
            >
              <span>التالي</span>
              <ChevronLeft size={12} />
            </button>
          </div>
        </div>

        {/* Guest View: ONE Template / Screen At A Time */}
        <div className="overflow-y-auto flex-1 flex flex-col justify-between text-right p-3 sm:p-3.5 scrollbar-thin bg-slate-50/40">

          {/* Empty State when no templates are enabled */}
          {screensList.length === 0 && (
            <div className="py-12 px-4 text-center my-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto text-2xl">
                📱
              </div>
              <h4 className="text-sm font-black text-slate-800">
                لا توجد قوالب مفعلة حالياً في المسار
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                قم بتفعيل القوالب من قائمة "مسار خطوات تجربة العميل" لتظهر مباشرة في هذه المعاينة التفاعلية.
              </p>
            </div>
          )}

          {/* SCREEN: OVERALL IMPRESSION (Exact Replica of Image 1 - Live Synced) */}
          {isImpressionScreen && (
            <div className="py-1 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              <div className="text-center pt-0.5 px-2 space-y-0.5">
                <h3 className="text-sm sm:text-base font-black text-[#005A2B] flex items-center justify-center gap-1.5 leading-snug">
                  <span>🌟</span>
                  <span>{currentTemplate?.titleAr || identity.overallQuestionAr || 'ما هو انطباعك العام عن زيارتك اليوم؟'}</span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  {currentTemplate?.subtitleAr || ':اختر البطاقة التي تعكس تجربتك بدقة'}
                </p>
              </div>

              {/* 4 Impression Cards Grid (2x2) Matching Image 1 */}
              <div className="grid grid-cols-2 gap-2 my-auto py-1 sm:py-1.5">
                {((currentTemplate?.options && currentTemplate.options.length >= 2)
                  ? currentTemplate.options.map((opt, i) => ({
                      id: opt.id || String(i + 1),
                      emoji: opt.emoji || impressionCards[i]?.emoji || '🌟',
                      titleAr: opt.text,
                      titleEn: opt.subtext || impressionCards[i]?.titleEn || opt.text,
                      descAr: opt.subtext || impressionCards[i]?.descAr || opt.text,
                    }))
                  : impressionCards
                ).map((card, cIdx) => {
                  const isSelected = selectedImpressionId === card.id || (currentTemplate && templateAnswers[currentTemplate.id] === card.id);
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
                      onClick={() => {
                        setSelectedImpressionId(card.id);
                        if (currentTemplate) {
                          setTemplateAnswers(prev => ({ ...prev, [currentTemplate.id]: card.id }));
                        }
                      }}
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

              {/* Bottom Action Button (Matching Image 1) */}
              <button
                type="button"
                onClick={handleNextScreen}
                className="w-full py-2.5 sm:py-3 bg-[#E34F26] hover:bg-[#D1441C] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0 mt-1.5"
              >
                <span>{currentTemplate?.actionButtonText || '✨ تأكيد ومتابعة'}</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          )}

          {/* SCREEN 2..N: INTERACTIVE QUESTION TEMPLATES */}
          {(isLanguageRollerScreen || isProductCatalogScreen || isGenericQuestionScreen) && currentTemplate && (
            <div className="py-2 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              {currentTemplate.layoutType === 'language_roller' || currentTemplate.id === 'qt_language_preference' ? (
                /* ========================================================================= */
                /* 1. EXACT REPLICA OF SCREENSHOT 1: INTERACTIVE 3D LANGUAGE ROLLER          */
                /* ========================================================================= */
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  {/* Top Bar: Corner Flag SA + Store Badge */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50/95 border border-emerald-200 text-xs font-black text-emerald-800 shadow-2xs">
                      <span>{SIM_ROLLER_LANGUAGES[simLanguageIndex]?.flag || '🇸🇦'}</span>
                      <span className="font-mono text-xs font-black">{SIM_ROLLER_LANGUAGES[simLanguageIndex]?.code || 'SA'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-orange-200/90 bg-white shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#E34F26] to-[#F77F00] text-white flex items-center justify-center text-[10px]">🍊</span>
                      <span className="text-xs font-black text-[#005A2B]">مطعم</span>
                    </div>
                  </div>

                  {/* Welcome Panda Badge */}
                  <div className="flex justify-center">
                    <div className="bg-[#EBF7F0] border border-[#C6EAD7] text-[#006837] px-3.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <span className="text-amber-500 text-xs">✨</span>
                      <span>مرحباً بك في أسواق بنده</span>
                      <span className="text-xs">🐼</span>
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="text-center space-y-0.5">
                    <h3 className="text-base sm:text-lg font-black text-[#00381C] flex items-center justify-center gap-1.5">
                      <span>اختر لغتك المفضلة</span>
                      <span className="text-[#006837]">🌐</span>
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      لتجربة تسوق ذكية وممتعة مخصصة لك
                    </p>
                  </div>

                  {/* 3D Vertical Roller with Interactive Navigation */}
                  <div className="my-auto w-full bg-white border border-slate-200/90 rounded-2xl p-2.5 space-y-1.5 select-none shadow-xs">
                    {/* Previous / Upper Language (Faded, clickable to roll up) */}
                    {(() => {
                      const prevIdx = (simLanguageIndex - 1 + SIM_ROLLER_LANGUAGES.length) % SIM_ROLLER_LANGUAGES.length;
                      const prevLang = SIM_ROLLER_LANGUAGES[prevIdx];
                      return (
                        <button
                          type="button"
                          onClick={() => setSimLanguageIndex(prevIdx)}
                          className="w-full py-1.5 px-3 rounded-lg flex items-center justify-between opacity-40 hover:opacity-75 transition-opacity text-gray-600 cursor-pointer"
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-xs">{prevLang.flag}</span>
                            <span className="text-[10px] font-bold text-gray-400 font-mono">{prevLang.code}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-gray-700 leading-tight">{prevLang.name}</span>
                            <span className="text-[9px] text-gray-400 font-medium">{prevLang.subtext}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-gray-400 font-mono">{prevLang.code}</span>
                            <span className="text-xs">{prevLang.flag}</span>
                          </div>
                        </button>
                      );
                    })()}

                    {/* ACTIVE Selected Language Item (with green vertical accent lines & mint border) */}
                    {(() => {
                      const activeLang = SIM_ROLLER_LANGUAGES[simLanguageIndex];
                      return (
                        <div className="w-full py-2.5 px-3 rounded-xl bg-[#E8F8F0] border-2 border-[#1E7E4E] shadow-[0_4px_14px_rgba(0,90,43,0.08)] flex items-center justify-between relative">
                          <div className="w-1.5 h-7 bg-[#005A2B] rounded-full shrink-0" />
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{activeLang.flag}</span>
                            <span className="text-xs font-black text-[#005A2B] font-mono">{activeLang.code}</span>
                          </div>
                          <div className="flex flex-col items-center justify-center text-center px-1">
                            <span className="text-base sm:text-lg font-black text-[#00381C] leading-tight">{activeLang.name}</span>
                            <span className="text-[10px] font-bold text-[#006837] mt-0.5">{activeLang.subtext}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-[#005A2B] font-mono">{activeLang.code}</span>
                            <span className="text-sm">{activeLang.flag}</span>
                          </div>
                          <div className="w-1.5 h-7 bg-[#005A2B] rounded-full shrink-0" />
                        </div>
                      );
                    })()}

                    {/* Next / Lower Language (Faded, clickable to roll down) */}
                    {(() => {
                      const nextIdx = (simLanguageIndex + 1) % SIM_ROLLER_LANGUAGES.length;
                      const nextLang = SIM_ROLLER_LANGUAGES[nextIdx];
                      return (
                        <button
                          type="button"
                          onClick={() => setSimLanguageIndex(nextIdx)}
                          className="w-full py-1.5 px-3 rounded-lg flex items-center justify-between opacity-40 hover:opacity-75 transition-opacity text-gray-600 cursor-pointer"
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-xs">{nextLang.flag}</span>
                            <span className="text-[10px] font-bold text-gray-400 font-mono">{nextLang.code}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-gray-700 leading-tight">{nextLang.name}</span>
                            <span className="text-[9px] text-gray-400 font-medium">{nextLang.subtext}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-gray-400 font-mono">{nextLang.code}</span>
                            <span className="text-xs">{nextLang.flag}</span>
                          </div>
                        </button>
                      );
                    })()}

                    {/* Gesture hint */}
                    <div className="text-center text-[10px] text-gray-400 font-bold pt-1">
                      ^ حرك بإصبعك للأعلى والأسفل ثم اضغط تأكيد v
                    </div>
                  </div>

                  {/* Action Button: Coral/Orange Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setTemplateAnswers(prev => ({ ...prev, [currentTemplate.id]: SIM_ROLLER_LANGUAGES[simLanguageIndex].id }));
                      handleNextScreen();
                    }}
                    className="w-full py-3.5 bg-[#E34F26] hover:bg-[#cf431d] active:scale-98 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>تأكيد ومتابعة</span>
                    <ChevronLeft size={18} />
                  </button>
                </div>
              ) : currentTemplate.layoutType === 'product_catalog' || currentTemplate.id === 'qt_daily_shopping_needs' ? (
                /* ========================================================================= */
                /* 2. EXACT REPLICA OF SCREENSHOT 2: DAILY SHOPPING BENTO PRODUCT CARDS      */
                /* ========================================================================= */
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  {/* Header: Back Button + Title & Subtitle */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <button 
                        type="button" 
                        onClick={handlePrevScreen}
                        className="flex items-center gap-1 text-xs text-gray-500 font-bold cursor-pointer hover:text-gray-800"
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gray-600">
                          <ChevronRight size={14} />
                        </span>
                        <span>رجوع</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#005A2B] text-base">❇️</span>
                        <h4 className="text-sm sm:text-base font-black text-gray-800">
                          اختر احتياجاتك لهذا اليوم
                        </h4>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium text-center">
                      اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.
                    </p>
                  </div>

                  {/* Progress & Department Section Info Row */}
                  <div className="flex items-center justify-between px-1 text-[11px] font-black">
                    <div className="flex items-center gap-1 text-[#005A2B]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      <span>القسم 1 من 4: خضار وفواكه</span>
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px]">
                      <span>مكتمل:</span> <span className="font-mono font-bold">{simSelectedProducts.length} / 4</span>
                    </div>
                  </div>

                  {/* Horizontal Department Tabs */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl text-[10px] font-black overflow-hidden select-none">
                    <button
                      type="button"
                      onClick={() => setSimActiveDepartment('veg')}
                      className={`px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                        simActiveDepartment === 'veg' ? 'bg-[#005A2B] text-white shadow-2xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      خضار وفواكه
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimActiveDepartment('food')}
                      className={`px-2 py-1 transition-all truncate shrink-0 cursor-pointer ${
                        simActiveDepartment === 'food' ? 'bg-[#005A2B] text-white shadow-2xs rounded-xl' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      مواد غذائية وت...
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimActiveDepartment('dairy')}
                      className={`px-2 py-1 transition-all truncate shrink-0 cursor-pointer ${
                        simActiveDepartment === 'dairy' ? 'bg-[#005A2B] text-white shadow-2xs rounded-xl' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      الأجبان والألبان
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimActiveDepartment('cleaning')}
                      className={`px-2 py-1 transition-all truncate shrink-0 cursor-pointer ${
                        simActiveDepartment === 'cleaning' ? 'bg-[#005A2B] text-white shadow-2xs rounded-xl' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      أدوات نظافة ...
                    </button>
                  </div>

                  {/* Interactive Asymmetrical Bento Product Cards Grid (Matching Image 2) */}
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    {/* Column 1: Cucumbers (top) & Red Onions (bottom) */}
                    <div className="space-y-2 flex flex-col justify-between">
                      {/* Card 1: Fresh Cucumbers */}
                      {(() => {
                        const isSelected = simSelectedProducts.includes('cucumber');
                        return (
                          <button
                            type="button"
                            onClick={() => setSimSelectedProducts(prev => isSelected ? prev.filter(p => p !== 'cucumber') : [...prev, 'cucumber'])}
                            className={`border-2 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between text-right relative transition-all cursor-pointer text-start ${
                              isSelected ? 'border-emerald-600 ring-2 ring-emerald-400/30' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="relative w-full h-[72px] rounded-[16px] overflow-hidden bg-slate-100">
                              <img 
                                src="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=85" 
                                alt="خيار طازج"
                                className="w-full h-full object-cover"
                              />
                              <span className={`absolute top-2 right-2 w-5 h-5 rounded-full shadow-xs flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-emerald-600 text-white' : 'bg-white/90 backdrop-blur-xs border-2 border-slate-300 text-transparent'
                              }`}>
                                <Check size={12} strokeWidth={3} />
                              </span>
                            </div>
                            <div className="mt-1 text-right px-0.5">
                              <span className="text-xs font-black text-slate-900 block">خيار طازج</span>
                              <span className="text-[9px] text-slate-400 block">{isSelected ? '✓ تم الاختيار' : 'اضغط للاختيار'}</span>
                            </div>
                          </button>
                        );
                      })()}

                      {/* Card 2: Red Onion */}
                      {(() => {
                        const isSelected = simSelectedProducts.includes('onion');
                        return (
                          <button
                            type="button"
                            onClick={() => setSimSelectedProducts(prev => isSelected ? prev.filter(p => p !== 'onion') : [...prev, 'onion'])}
                            className={`border-2 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between text-right relative transition-all cursor-pointer text-start ${
                              isSelected ? 'border-emerald-600 ring-2 ring-emerald-400/30' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="relative w-full h-[72px] rounded-[16px] overflow-hidden bg-slate-100">
                              <img 
                                src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=85" 
                                alt="بصل أحمر"
                                className="w-full h-full object-cover"
                              />
                              <span className={`absolute top-2 right-2 w-5 h-5 rounded-full shadow-xs flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-emerald-600 text-white' : 'bg-white/90 backdrop-blur-xs border-2 border-slate-300 text-transparent'
                              }`}>
                                <Check size={12} strokeWidth={3} />
                              </span>
                            </div>
                            <div className="mt-1 text-right px-0.5">
                              <span className="text-xs font-black text-slate-900 block">بصل أحمر</span>
                              <span className="text-[9px] text-slate-400 block">{isSelected ? '✓ تم الاختيار' : 'اضغط للاختيار'}</span>
                            </div>
                          </button>
                        );
                      })()}
                    </div>

                    {/* Column 2: Tall Card: Tomatoes / Local Carrots */}
                    {(() => {
                      const isSelected = simSelectedProducts.includes('tomato');
                      return (
                        <button
                          type="button"
                          onClick={() => setSimSelectedProducts(prev => isSelected ? prev.filter(p => p !== 'tomato') : [...prev, 'tomato'])}
                          className={`border-2 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between text-right relative transition-all cursor-pointer text-start ${
                            isSelected ? 'border-emerald-600 ring-2 ring-emerald-400/30' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="relative w-full flex-1 min-h-[168px] rounded-[16px] overflow-hidden bg-slate-100">
                            <img 
                              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=85" 
                              alt="طماطم محلي"
                              className="w-full h-full object-cover"
                            />
                            <span className={`absolute top-2 right-2 w-5 h-5 rounded-full shadow-xs flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-emerald-600 text-white' : 'bg-white/90 backdrop-blur-xs border-2 border-slate-300 text-transparent'
                            }`}>
                              <Check size={12} strokeWidth={3} />
                            </span>
                          </div>
                          <div className="mt-1 text-right px-0.5">
                            <span className="text-xs font-black text-slate-900 block">طماطم محلي</span>
                            <span className="text-[9px] text-slate-400 block">{isSelected ? '✓ تم الاختيار' : 'اضغط للاختيار'}</span>
                          </div>
                        </button>
                      );
                    })()}
                  </div>

                  {/* Bottom Full-Width Card: Potato Bag with "Soon" / "قريباً" */}
                  {(() => {
                    const isSelected = simSelectedProducts.includes('potato');
                    return (
                      <button
                        type="button"
                        onClick={() => setSimSelectedProducts(prev => isSelected ? prev.filter(p => p !== 'potato') : [...prev, 'potato'])}
                        className={`border-2 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between text-right relative transition-all cursor-pointer text-start ${
                          isSelected ? 'border-emerald-600 ring-2 ring-emerald-400/30' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="relative w-full h-[72px] rounded-[16px] overflow-hidden bg-slate-100">
                          <img 
                            src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=85" 
                            alt="بطاطس كيس"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-slate-800 text-[9px] font-black px-2 py-0.5 rounded-full border border-white/60 shadow-xs">
                            قريباً
                          </span>
                          <span className={`absolute top-2 right-2 w-5 h-5 rounded-full shadow-xs flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-white/90 backdrop-blur-xs border-2 border-slate-300 text-transparent'
                          }`}>
                            <Check size={12} strokeWidth={3} />
                          </span>
                        </div>
                        <div className="mt-1 text-right px-0.5">
                          <span className="text-xs font-black text-slate-900 block">بطاطس كيس</span>
                          <span className="text-[9px] text-slate-400 block">{isSelected ? '✓ تم الاختيار' : 'اضغط للاختيار'}</span>
                        </div>
                      </button>
                    );
                  })()}

                  {/* Advance Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setTemplateAnswers(prev => ({ ...prev, [currentTemplate.id]: simSelectedProducts.join(',') }));
                      handleNextScreen();
                    }}
                    className="w-full py-3 bg-[#005A2B] hover:bg-[#004722] active:scale-98 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>👉 تأكيد المنتجات ومتابعة</span>
                    <ChevronLeft size={16} />
                  </button>
                </div>
              ) : (
                /* ========================================================================= */
                /* 3. DEFAULT QUESTION TEMPLATES (2x2 Square Cards Matching Image 1)         */
                /* ========================================================================= */
                <>
                  {/* Category Badge & Titles Matching Image 1 */}
                  <div className="text-center space-y-1">
                    <span className="text-[10px] sm:text-[11px] font-black text-amber-800 bg-amber-100/90 border border-amber-300/90 px-3 py-0.5 rounded-full inline-block shadow-2xs">
                      {currentTemplate.categoryBadge}
                    </span>

                    <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug px-1">
                      {currentTemplate.titleAr}
                    </h3>

                    {currentTemplate.subtitleAr && (
                      <p className="text-[10px] sm:text-[11px] text-slate-500 px-1 leading-normal line-clamp-2">
                        {currentTemplate.subtitleAr}
                      </p>
                    )}
                  </div>

                  {/* 2x2 Square Choices Grid (Screenshot Image 1) */}
                  <div className="grid grid-cols-2 gap-2 my-auto py-1 sm:py-1.5">
                    {currentTemplate.options.map((opt, oIdx) => {
                      const isSelected = templateAnswers[currentTemplate.id] === opt.id;
                      return (
                        <button
                          key={opt.id || oIdx}
                          type="button"
                          onClick={() => setTemplateAnswers(prev => ({ ...prev, [currentTemplate.id]: opt.id }))}
                          className={`p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between text-center relative aspect-[1/0.95] sm:aspect-square shadow-2xs ${
                            isSelected
                              ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-400/40 shadow-sm'
                              : 'border-slate-200/90 bg-white hover:bg-slate-50'
                          }`}
                        >
                          {/* Corner Number Circle (1, 2, 3, 4) */}
                          <span className={`w-5 h-5 rounded-full border text-[10px] font-bold font-mono absolute top-2 right-2 flex items-center justify-center ${
                            isSelected
                              ? 'bg-orange-500 text-white border-orange-500'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}>
                            {oIdx + 1}
                          </span>

                          {/* Large Center Emoji */}
                          <span className="text-2xl sm:text-3xl my-auto pt-1">
                            {opt.emoji || '✨'}
                          </span>

                          {/* Option Text */}
                          <span className="text-[10.5px] sm:text-xs font-black text-slate-900 leading-tight block w-full line-clamp-2">
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Orange-Rose Gradient Button (Matching Image 1) */}
                  <button
                    type="button"
                    onClick={handleNextScreen}
                    className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 via-rose-500 to-red-500 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0 mt-1.5"
                  >
                    <span>{currentTemplate.actionButtonText || '✨ تأكيد ومتابعة'}</span>
                    <ChevronLeft size={16} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* SCREEN: QUALITY STANDARDS - 2x2 SQUARE CARDS (MATCHING IMAGE 1 & LIVE SYNCED) */}
          {isPillarsScreen && (
            <div className="py-2 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-black text-purple-800 bg-purple-100/90 border border-purple-300/90 px-4 py-1 rounded-full inline-block shadow-2xs">
                  معايير الجودة والضيافة ⭐
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug px-1">
                  ما هو تقييمك لمعايير الجودة وركائز الضيافة؟
                </h3>
                <p className="text-xs text-slate-500 px-2 leading-relaxed">
                  انقر لاختيار وتأكيد مستوى رضاك عن الركائز الأساسية
                </p>
              </div>

              {/* 2x2 Square Cards Grid Matching Image 1 (NO STARS!) */}
              <div className="grid grid-cols-2 gap-2 my-auto py-1 sm:py-1.5">
                {evaluationPillars.slice(0, 4).map((pillar, pIdx) => {
                  const currentScore = pillarRatings[pillar.key] ?? 5;
                  const isSelected = currentScore >= 4;
                  
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
                        const nextScore = currentScore === 5 ? 4 : currentScore === 4 ? 3 : 5;
                        setPillarRatings(prev => ({ ...prev, [pillar.key]: nextScore }));
                      }}
                      className={`p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between text-center relative aspect-[1/0.95] sm:aspect-square shadow-2xs ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-400/40 shadow-sm'
                          : 'border-slate-200/90 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {/* Corner Number Circle (1, 2, 3, 4) */}
                      <span className={`w-5 h-5 rounded-full border text-[10px] font-bold font-mono absolute top-2 right-2 flex items-center justify-center ${
                        isSelected
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}>
                        {pIdx + 1}
                      </span>

                      {/* Large Center Emoji */}
                      <span className="text-2xl sm:text-3xl my-auto pt-1">
                        {icon}
                      </span>

                      {/* Option Title and Level */}
                      <div className="w-full">
                        <span className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight block truncate">
                          {pillar.titleAr}
                        </span>
                        <span className="text-[9.5px] sm:text-[10px] font-bold text-amber-600 block mt-0.5">
                          {currentScore === 5 ? 'فائق الامتياز ✨' : currentScore === 4 ? 'جيد جداً 👍' : 'يحتاج متابعة ⚠️'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Orange-Rose Gradient Button (Matching Image 1) */}
              <button
                type="button"
                onClick={handleNextScreen}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 via-rose-500 to-red-500 text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shrink-0 mt-1.5"
              >
                <span>✨ تأكيد ومتابعة</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          )}

          {/* SCREEN: MENU DISHES & QUICK TAGS (LIVE SYNCED) */}
          {isDishesScreen && (
            <div className="py-2 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-black text-blue-800 bg-blue-100/90 border border-blue-300/90 px-4 py-1 rounded-full inline-block shadow-2xs">
                  أطباق المنيو والوسوم 🍽️
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug px-1">
                  ما الأطباق والوسوم التي نالت إعجابك اليوم؟
                </h3>
                <p className="text-xs text-slate-500 px-2">
                  اختر أطباقك المفضلة والكلمات المعبرة
                </p>
              </div>

              {/* Dishes 2x2 grid */}
              <div className="grid grid-cols-2 gap-2 my-auto py-1">
                {menuItems.slice(0, 4).map((dish) => {
                  const isSelected = selectedDishes.includes(dish.id);
                  return (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => setSelectedDishes(prev => 
                        prev.includes(dish.id) ? prev.filter(x => x !== dish.id) : [...prev, dish.id]
                      )}
                      className={`p-2.5 rounded-2xl border-2 text-right transition-all cursor-pointer flex items-center gap-2 shadow-2xs ${
                        isSelected
                          ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-400/40'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={dish.imageUrl}
                        alt={dish.nameAr}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-2xs"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-black text-slate-900 block truncate">
                          {dish.nameAr}
                        </span>
                        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {dish.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Tags Chips */}
              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-[10px] text-slate-400 block mb-1">
                  ما الكلمات التي تعبر عن زيارتك؟
                </span>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {quickTags.slice(0, 4).map((t) => {
                    const isSelected = selectedTags.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTags(prev => 
                          prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev, t.id]
                        )}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{t.emoji}</span>
                        <span className="max-w-[75px] truncate">{t.textAr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleNextScreen}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-rose-500 to-red-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
              >
                <span>🎁 إرسال التقييم واستلام الهدية</span>
                <ChevronLeft size={16} />
              </button>
            </div>
          )}

          {/* SCREEN: LOYALTY PRIZE & THANK YOU (LIVE SYNCED) */}
          {isPrizesScreen && (
            <div className="py-2 flex-1 flex flex-col justify-between animate-in fade-in duration-200 text-center">
              <div className="space-y-1.5">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-300/90 px-4 py-1 rounded-full inline-block shadow-2xs">
                  الهدية الفورية والولاء 🎁
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  شكراً لمشاركتك رأيك القيّم!
                </h3>
                <p className="text-xs text-slate-500">
                  هدية فورية جاهزة في زيارتك القادمة
                </p>
              </div>

              {/* Prize Card */}
              <div className="my-auto bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 p-4 rounded-3xl shadow-lg space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/20 text-slate-950 flex items-center justify-center mx-auto shadow-inner">
                  <Gift size={26} />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-950">
                    {loyaltyPrizes[0]?.titleAr || 'حلى تيراميسو فاخر مجاناً في زيارتك القادمة 🍰'}
                  </h4>
                  <p className="text-[10px] text-slate-900/80 font-medium">
                    {loyaltyPrizes[0]?.titleEn || 'Complimentary dessert on next visit'}
                  </p>
                </div>

                <div className="bg-slate-950 text-amber-300 font-mono text-xs font-black py-1.5 px-3 rounded-xl inline-block">
                  كود الهدية: {loyaltyPrizes[0]?.pointsBadge || 'VIP-GUEST-2026'}
                </div>
              </div>

              {/* Restart Button */}
              <button
                type="button"
                onClick={() => setActiveScreenId('impression')}
                className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-2xl shadow-md hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>إعادة تجربة المحاكي من الخطوة الأولى 🔄</span>
              </button>
            </div>
          )}

          {/* Navigation Bar at Bottom inside phone */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[10px] font-bold text-slate-400">
            <button
              type="button"
              onClick={handlePrevScreen}
              disabled={safeIndex === 0}
              className="flex items-center gap-1 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:text-slate-900"
            >
              <ChevronRight size={14} />
              <span>السابق</span>
            </button>

            <span className="text-[9px] text-slate-400">
              {screensList[safeIndex]?.label}
            </span>

            <button
              type="button"
              onClick={handleNextScreen}
              disabled={safeIndex === screensList.length - 1}
              className="flex items-center gap-1 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:text-slate-900"
            >
              <span>التالي</span>
              <ChevronLeft size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
