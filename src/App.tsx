/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Wallet, 
  Percent, 
  Coins, 
  Leaf, 
  Milk, 
  Sparkles, 
  ShoppingBasket,
  Check,
  Star,
  PartyPopper,
  Heart,
  User,
  Mail,
  Ticket,
  Phone,
  Gift,
  Send,
  Volume2,
  VolumeX,
  Flame,
  FileSpreadsheet,
  FileJson,
  Copy,
  Download,
  RotateCcw,
  Medal,
  Award,
  Zap,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';
import { 
  Step, 
  Difficulty, 
  DifficultyConfig, 
  LeaderboardEntry, 
  CustomerFeedback,
  LanguageItem,
  BrandSettings,
  CustomerJourneyConfig,
  ProductItemConfig,
  DepartmentConfig
} from './types';
import { 
  DEFAULT_LANGUAGES, 
  getStoredLanguages, 
  saveStoredLanguages, 
  getStoredLangCode,
  saveStoredLangCode,
  getProductTranslatedName,
  getDepartmentTranslatedName,
  getShoppingTitleAndSubtitle,
  getFeedbackTitleAndSubtitle,
  getSurveyQuestionTranslated,
  getRatingLabel,
  getUIString
} from './utils/languages';
import { getStoredBrandSettings, saveStoredBrandSettings } from './utils/brand';
import { 
  getStoredJourneyConfig, 
  saveStoredJourneyConfig, 
  resetStoredJourneyConfig, 
  applyBusinessPreset,
  CAFE_QUESTION_ITEMS,
  RESTAURANT_QUESTION_ITEMS,
  SUPERMARKET_QUESTION_ITEMS
} from './utils/journeyConfig';
import { triggerConfetti, triggerCelebration, triggerStarBurst } from './utils/confetti';
import { soundManager } from './utils/audio';
import { exportFeedbackToCSV, exportFeedbackToJSON, copyFeedbackSummary } from './utils/export';
import { LeaderboardModal } from './components/LeaderboardModal';
import { DashboardView } from './components/DashboardView';
import { LanguageSelector } from './components/LanguageSelector';
import { LanguageSelectionView } from './components/LanguageSelectionView';
import { BusinessSelectView } from './components/BusinessSelectView';
import { PandaIcon } from './components/PandaIcon';
import { BrandCustomizationModal } from './components/BrandCustomizationModal';
import { ShowcaseLandingView } from './components/ShowcaseLandingView';
import { getPaletteById } from './utils/theme';
import { getStoredFontId, applyFontToDocument } from './utils/fonts';
import { ModernProductCard } from './components/ModernProductCard';
import { ToastNotification, ToastItem, ToastType } from './components/ToastNotification';
import { CustomerLoyaltyCardsEndSection } from './components/loyalty/CustomerLoyaltyCardsEndSection';

interface Logo {
  id: number;
  x: number;
  y: number;
  scale: number;
  isSpecial?: boolean;
  isBomb?: boolean;
}

const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  easy: {
    id: 'easy',
    label: 'سهل',
    sublabel: '١٥ ثانية وسرعة مريحة مع شعارات بنده الذهبية ✨',
    duration: 15,
    spawnInterval: 750,
    floatDuration: 5.5,
    scoreMultiplier: 1,
    hasBombs: false,
    color: '#10B981',
  },
  medium: {
    id: 'medium',
    label: 'متوسط',
    sublabel: 'التحدي الكلاسيكي (١٠ ثواني) وسرعة متوازنة ⚡',
    duration: 10,
    spawnInterval: 500,
    floatDuration: 4.0,
    scoreMultiplier: 1,
    hasBombs: false,
    color: '#F59E0B',
  },
  hard: {
    id: 'hard',
    label: 'محترف',
    sublabel: '٨ ثوانٍ فائقة السرعة مع فلفل حار 💣 (-٢ نقطة)',
    duration: 8,
    spawnInterval: 380,
    floatDuration: 2.6,
    scoreMultiplier: 2,
    hasBombs: true,
    color: '#E34F26',
  },
};

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb-1', name: 'سارة القحطاني', score: 32, difficulty: 'hard', date: 'اليوم، 14:10', avatarEmoji: '👑' },
  { id: 'lb-2', name: 'خالد الغامدي', score: 28, difficulty: 'hard', date: 'اليوم، 13:45', avatarEmoji: '⚡' },
  { id: 'lb-3', name: 'عبدالله السعيد', score: 23, difficulty: 'medium', date: 'أمس، 20:15', avatarEmoji: '🐼' },
  { id: 'lb-4', name: 'نورة التميمي', score: 19, difficulty: 'medium', date: 'أمس، 17:30', avatarEmoji: '🌟' },
  { id: 'lb-5', name: 'فيصل الشمري', score: 17, difficulty: 'easy', date: 'منذ يومين', avatarEmoji: '🎯' },
  { id: 'lb-6', name: 'مها الحربي', score: 15, difficulty: 'easy', date: 'منذ يومين', avatarEmoji: '🍃' },
];

const INITIAL_FEEDBACKS: CustomerFeedback[] = [
  {
    id: 'fb-01',
    customerName: 'فهد العتيبي',
    customerPhone: '0551234567',
    customerEmail: 'fahad.o@gmail.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'خضار وفواكه',
    preference: 'عروض حصرية',
    selectedProducts: ['طماطم محلي', 'خيار طازج'],
    score: 24,
    difficulty: 'hard',
    timestamp: '2026-09-06 20:45',
    createdAt: new Date('2026-09-06T20:45:00').getTime(),
    comment: 'عروض الخضار ممتازة جداً وتنظيم الفرع رائع، الزيارة الثالثة لي هذا الأسبوع.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-02',
    customerName: 'فهد العتيبي',
    customerPhone: '0551234567',
    customerEmail: 'fahad.o@gmail.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'خضار وفواكه',
    preference: 'نقاط إضافية',
    selectedProducts: ['طماطم محلي', 'تفاح أحمر'],
    score: 22,
    difficulty: 'medium',
    timestamp: '2026-09-05 20:15',
    createdAt: new Date('2026-09-05T20:15:00').getTime(),
    comment: 'تحدي مسلي وسريع أثناء التسوق.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-03',
    customerName: 'فهد العتيبي',
    customerPhone: '0551234567',
    customerEmail: 'fahad.o@gmail.com',
    rating: 'good',
    ratingLabel: 'جيد 😊',
    section: 'خضار وفواكه',
    preference: 'خصم مباشر',
    selectedProducts: ['خيار طازج', 'خس محلي'],
    score: 18,
    difficulty: 'easy',
    timestamp: '2026-09-03 11:30',
    createdAt: new Date('2026-09-03T11:30:00').getTime(),
    comment: 'أول مشاركة لي في لعبة بنده.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-04',
    customerName: 'سارة الدوسري',
    customerPhone: '0509876543',
    customerEmail: 'sara.d@outlook.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'المواد الغذائية',
    preference: 'نقاط إضافية',
    selectedProducts: ['أرز بسمتي', 'زيت دوار الشمس'],
    score: 21,
    difficulty: 'medium',
    timestamp: '2026-09-06 20:10',
    createdAt: new Date('2026-09-06T20:10:00').getTime(),
    comment: 'التطبيق ممتع للأطفال وربحنا قسيمة الخصم فوراً.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-05',
    customerName: 'سارة الدوسري',
    customerPhone: '0509876543',
    customerEmail: 'sara.d@outlook.com',
    rating: 'good',
    ratingLabel: 'جيد 😊',
    section: 'المواد الغذائية',
    preference: 'قسائم مجانية',
    selectedProducts: ['سكر ناعم', 'أرز بسمتي'],
    score: 16,
    difficulty: 'easy',
    timestamp: '2026-09-04 10:15',
    createdAt: new Date('2026-09-04T10:15:00').getTime(),
    comment: 'تجربة لطيفة وسلسة.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-06',
    customerName: 'خالد المنصور',
    customerPhone: '0543322114',
    customerEmail: 'khaled.m@gmail.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'الأجبان والألبان',
    preference: 'قسائم مجانية',
    selectedProducts: ['حليب طازج', 'أجبان بيضاء'],
    score: 29,
    difficulty: 'hard',
    timestamp: '2026-09-06 20:35',
    createdAt: new Date('2026-09-06T20:35:00').getTime(),
    comment: 'تحدي بنده بمستوى المحترف حماسي جداً!',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-07',
    customerName: 'نورة الشمري',
    customerPhone: '0567891234',
    customerEmail: 'noura.sh@yahoo.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'سناك وحلويات',
    preference: 'عروض حصرية',
    selectedProducts: ['بسكويت شاي', 'شوكولاتة بنده'],
    score: 21,
    difficulty: 'medium',
    timestamp: '2026-09-06 21:05',
    createdAt: new Date('2026-09-06T21:05:00').getTime(),
    comment: 'قسم السناك عروضه لا تفوت.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-08',
    customerName: 'نورة الشمري',
    customerPhone: '0567891234',
    customerEmail: 'noura.sh@yahoo.com',
    rating: 'good',
    ratingLabel: 'جيد 😊',
    section: 'خضار وفواكه',
    preference: 'نقاط إضافية',
    selectedProducts: ['موز فلبيني', 'تفاح أحمر'],
    score: 17,
    difficulty: 'easy',
    timestamp: '2026-09-01 17:40',
    createdAt: new Date('2026-09-01T17:40:00').getTime(),
    comment: 'الفواكه طازجة دائماً.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-09',
    customerName: 'عبدالمحسن القحطاني',
    customerPhone: '0531122334',
    customerEmail: 'غير مسجل',
    rating: 'normal',
    ratingLabel: 'عادي 😐',
    section: 'أدوات نظافة',
    preference: 'خصم مباشر',
    selectedProducts: ['مسحوق غسيل', 'مناديل ورقية'],
    score: 15,
    difficulty: 'easy',
    timestamp: '2026-09-05 14:20',
    createdAt: new Date('2026-09-05T14:20:00').getTime(),
    comment: 'الأسعار مناسبة وأتمنى زيادة خيارات مساحيق الغسيل.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-10',
    customerName: 'ريم الحربي',
    customerPhone: '0501239876',
    customerEmail: 'reem.h@gmail.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'خضار وفواكه',
    preference: 'عروض حصرية',
    selectedProducts: ['طماطم محلي', 'بطاطس قصيمي'],
    score: 25,
    difficulty: 'hard',
    timestamp: '2026-09-06 20:50',
    createdAt: new Date('2026-09-06T20:50:00').getTime(),
    comment: 'تنوع رائع بالمنتجات المحلية الطازجة وسرعة بالكاشير.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-11',
    customerName: 'عمر الغامدي',
    customerPhone: '0559988776',
    customerEmail: 'omar.g@gmail.com',
    rating: 'good',
    ratingLabel: 'جيد 😊',
    section: 'الأجبان والألبان',
    preference: 'نقاط إضافية',
    selectedProducts: ['لبنة تركية', 'زبادي كامل الدسم'],
    score: 20,
    difficulty: 'medium',
    timestamp: '2026-09-06 18:20',
    createdAt: new Date('2026-09-06T18:20:00').getTime(),
    comment: 'كل شيء ممتاز ومرتب.',
    languageCode: 'ar',
    languageName: 'العربية'
  },
  {
    id: 'fb-12',
    customerName: 'David Miller',
    customerPhone: '0591234567',
    customerEmail: 'david.m@gmail.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'خضار وفواكه',
    preference: 'عروض حصرية',
    selectedProducts: ['تفاح أحمر', 'موز فلبيني'],
    score: 26,
    difficulty: 'hard',
    timestamp: '2026-09-06 20:25',
    createdAt: new Date('2026-09-06T20:25:00').getTime(),
    comment: 'Great store layout and friendly staff! Loved the interactive challenge.',
    languageCode: 'en',
    languageName: 'English'
  },
  {
    id: 'fb-13',
    customerName: 'David Miller',
    customerPhone: '0591234567',
    customerEmail: 'david.m@gmail.com',
    rating: 'good',
    ratingLabel: 'جيد 😊',
    section: 'المواد الغذائية',
    preference: 'نقاط إضافية',
    selectedProducts: ['أرز بسمتي'],
    score: 21,
    difficulty: 'medium',
    timestamp: '2026-09-04 16:30',
    createdAt: new Date('2026-09-04T16:30:00').getTime(),
    comment: 'Smooth shopping experience.',
    languageCode: 'en',
    languageName: 'English'
  },
  {
    id: 'fb-14',
    customerName: 'Sarah Jenkins',
    customerPhone: '0587654321',
    customerEmail: 'sarah.j@outlook.com',
    rating: 'great',
    ratingLabel: 'رائع جداً 🤩',
    section: 'الأجبان والألبان',
    preference: 'هدايا وقسائم',
    selectedProducts: ['حليب طازج', 'أجبان بيضاء'],
    score: 23,
    difficulty: 'medium',
    timestamp: '2026-09-06 19:15',
    createdAt: new Date('2026-09-06T19:15:00').getTime(),
    comment: 'The voucher reward was great, fresh dairy products as always.',
    languageCode: 'en',
    languageName: 'English'
  }
];

const BackButton = ({ onClick, label }: { onClick: () => void; label?: string }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="absolute top-4 right-4 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto flex items-center gap-1.5 text-gray-400 hover:text-[#005A2B] font-bold transition-colors z-20 cursor-pointer"
    title={label || "رجوع"}
  >
    <div className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 shadow-xs flex items-center justify-center border border-slate-200">
      <ChevronRight size={16} className="rtl:block ltr:hidden text-gray-600" />
      <ChevronLeft size={16} className="ltr:block rtl:hidden text-gray-600" />
    </div>
    <span className="text-xs text-gray-500">{label || "رجوع"}</span>
  </motion.button>
);

// --- Constants ---
const PRIMARY_GREEN = '#005A2B';
const ACCENT_RED = '#E34F26';

const PRODUCTS = {
  veg: [
    { id: 'v1', name: 'طماطم محلي', icon: '🍅' },
    { id: 'v2', name: 'خيار طازج', icon: '🥒' },
    { id: 'v3', name: 'بصل أحمر', icon: '🧅' },
    { id: 'v4', name: 'بطاطس كيس', icon: '🥔' },
  ],
  food: [
    { id: 'f1', name: 'أرز بسمتي', icon: '🍚' },
    { id: 'f2', name: 'زيت دوار الشمس', icon: '🌻' },
    { id: 'f3', name: 'مكرونة إيطالية', icon: '🍝' },
    { id: 'f4', name: 'دجاج مبرد', icon: '🍗' },
  ],
  cheese: [
    { id: 'c1', name: 'أجبان بيضاء', icon: '🧀' },
    { id: 'c2', name: 'حليب طازج', icon: '🥛' },
    { id: 'c3', name: 'زبادي يوناني', icon: '🍶' },
    { id: 'c4', name: 'لبنة فاخرة', icon: '🥣' },
  ],
  clean: [
    { id: 'cl1', name: 'منظف أواني', icon: '🧼' },
    { id: 'cl2', name: 'مناديل ورقية', icon: '🧻' },
    { id: 'cl3', name: 'مطهر أرضيات', icon: '🧴' },
    { id: 'cl4', name: 'صابون يدين', icon: '🧼' },
  ],
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'game'>('landing');
  const [step, setStep] = useState<Step>('welcome');
  const [preference, setPreference] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('veg');
  const [rating, setRating] = useState<string | null>(null);
  const [cleanlinessRating, setCleanlinessRating] = useState<string>('great');
  const [staffRating, setStaffRating] = useState<string>('great');
  const [overallRating, setOverallRating] = useState<string | null>(null);
  const [surveyQuestionIndex, setSurveyQuestionIndex] = useState<number>(0);
  const [surveyCardSelection, setSurveyCardSelection] = useState<Record<string, string>>({});
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => getStoredBrandSettings());
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const logoUrl = brandSettings.logoUrl;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePalette = getPaletteById(brandSettings?.colorPaletteId);
  const primaryColor = brandSettings?.customPrimaryColor || activePalette.primary;
  const accentColor = activePalette.accent;

  const [currentFontId, setCurrentFontId] = useState<string>(() => {
    return brandSettings.fontFamilyId || getStoredFontId();
  });

  useEffect(() => {
    applyFontToDocument(currentFontId);
  }, [currentFontId]);

  const handleSelectFont = (fontId: string) => {
    setCurrentFontId(fontId);
    const updated = { ...brandSettings, fontFamilyId: fontId };
    setBrandSettings(updated);
    saveStoredBrandSettings(updated);
    applyFontToDocument(fontId);
  };

  const handleSaveBrandSettings = (updated: BrandSettings) => {
    setBrandSettings(updated);
    saveStoredBrandSettings(updated);
    if (updated.fontFamilyId) {
      setCurrentFontId(updated.fontFamilyId);
      applyFontToDocument(updated.fontFamilyId);
    }
  };
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [shakingProducts, setShakingProducts] = useState<{ [id: string]: boolean }>({});
  const [advancingDeptInfo, setAdvancingDeptInfo] = useState<{ id?: string; name: string; nameEn?: string } | null>(null);
  const [isAllDeptsCompleted, setIsAllDeptsCompleted] = useState<boolean>(false);
  
  // Game & Difficulty States
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Language State
  const [languages, setLanguages] = useState<LanguageItem[]>(() => getStoredLanguages());
  const [currentLangCode, setCurrentLangCode] = useState<string>(() => getStoredLangCode());

  const handleSelectLanguage = useCallback((code: string) => {
    soundManager.playClick();
    setCurrentLangCode(code);
    saveStoredLangCode(code);
  }, []);

  const currentLang = useMemo(() => {
    return languages.find(l => l.code === currentLangCode) || languages[0] || DEFAULT_LANGUAGES[0];
  }, [languages, currentLangCode]);

  const handleUpdateLanguages = (updated: LanguageItem[]) => {
    setLanguages(updated);
    saveStoredLanguages(updated);
  };

  // Staff/Admin secret shortcut to toggle dashboard without showing UI to the customer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd')) {
        setCurrentView(prev => (prev === 'game' ? 'dashboard' : 'game'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sound State
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundManager.isMuted());

  // Leaderboard & Modal States
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [savedToLeaderboard, setSavedToLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      const stored = localStorage.getItem('panda_leaderboard');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_LEADERBOARD;
  });

  // Feedback State & Customer Details with Strict Validation
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [phoneWarning, setPhoneWarning] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type, duration }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Customer Journey Config State (محرر تجربة العميل والأسئلة والأقسام باحترافية ومرونة)
  const [journeyConfig, setJourneyConfig] = useState<CustomerJourneyConfig>(() => getStoredJourneyConfig());

  const handleSaveJourneyConfig = (updated: CustomerJourneyConfig) => {
    setJourneyConfig(updated);
    saveStoredJourneyConfig(updated);
  };

  const handleResetJourneyConfig = () => {
    const def = resetStoredJourneyConfig();
    setJourneyConfig(def);
  };

  // 1. Name validation: Letters & spaces only, strictly no numbers (0-9 or ٠-٩)
  const handleNameChange = (raw: string) => {
    // Strip all numbers (standard digits, Arabic-Indic, and Eastern Arabic digits)
    const cleaned = raw.replace(/[0-9\u0660-\u0669\u06F0-\u06F9]/g, '');
    setCustomerName(cleaned);
  };
  const isNameValid = useMemo(() => customerName.trim().length >= 2, [customerName]);

  // 2. Phone validation: Digits only, 9 digits max, auto-correct 05 to 5, starts with 5
  const handlePhoneChange = (raw: string) => {
    // Convert Arabic/Eastern numerals to English numerals
    let converted = raw
      .replace(/[٠-٩]/g, d => (d.charCodeAt(0) - 1632).toString())
      .replace(/[۰-۹]/g, d => (d.charCodeAt(0) - 1776).toString());
    
    // Remove all non-digits
    let digits = converted.replace(/\D/g, '');

    // Strip country prefix 966 if entered or pasted
    if (digits.startsWith('966')) {
      digits = digits.slice(3);
    }

    // Auto-correct '05' to '5'
    if (digits.startsWith('05')) {
      digits = '5' + digits.slice(2);
    } else if (digits === '0') {
      digits = '';
    } else if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }

    // Immediate warning if first entered digit is not 5
    if (digits.length > 0 && !digits.startsWith('5')) {
      setPhoneWarning(currentLang.translations.phoneWarningText || 'يجب أن يبدأ رقم الجوال بالرقم 5 (مثال: 5XXXXXXXX)');
    } else {
      setPhoneWarning(null);
    }

    // Max 9 digits
    digits = digits.slice(0, 9);
    setCustomerPhone(digits);
  };
  const isPhoneValid = useMemo(() => customerPhone.length === 9 && customerPhone.startsWith('5'), [customerPhone]);

  // 3. Email validation: Required & strict format (name@example.com)
  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(customerEmail.trim());
  }, [customerEmail]);

  // Locked Voucher logic: Unlocks automatically only when Name and Mobile are valid!
  const isVoucherUnlocked = useMemo(() => {
    return isNameValid && isPhoneValid;
  }, [isNameValid, isPhoneValid]);

  const [hasCelebratedUnlock, setHasCelebratedUnlock] = useState(false);
  useEffect(() => {
    if (isVoucherUnlocked && !hasCelebratedUnlock) {
      setHasCelebratedUnlock(true);
      soundManager.playCelebration();
      triggerStarBurst();
    } else if (!isVoucherUnlocked && hasCelebratedUnlock) {
      setHasCelebratedUnlock(false);
    }
  }, [isVoucherUnlocked, hasCelebratedUnlock]);

  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(() => {
    try {
      const stored = localStorage.getItem('panda_feedbacks');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_FEEDBACKS;
  });

  // Helper to determine the dynamic valid department label based on business sector and user selection
  const getVoucherDepartmentDisplay = useCallback(() => {
    const depts = journeyConfig.departments || [];
    let matchedDept = depts.find(d => d.id === section || d.name === section);
    if (!matchedDept && selectedProducts.length > 0) {
      matchedDept = depts.find(d => d.products.some(p => selectedProducts.includes(p.id)));
    }
    if (!matchedDept && depts.length > 0) {
      matchedDept = depts[0];
    }

    if (matchedDept) {
      const name = getDepartmentTranslatedName(
        matchedDept.id,
        currentLangCode === 'en' && matchedDept.nameEn ? matchedDept.nameEn : matchedDept.name,
        currentLangCode
      );
      const icon = matchedDept.icon || (journeyConfig.businessType === 'cafe' ? '☕' : journeyConfig.businessType === 'restaurant' ? '🍽️' : '🛍️');
      return `${name} ${icon}`;
    }

    if (journeyConfig.businessType === 'cafe') {
      return currentLangCode === 'en' ? 'Specialty Coffee & Drinks ☕' : 'القهوة والمشروبات المختصة ☕';
    } else if (journeyConfig.businessType === 'restaurant') {
      return currentLangCode === 'en' ? 'Main Courses & Dining 🥩' : 'الأطباق الرئيسية والوجبات 🥩';
    } else {
      return currentLangCode === 'en' ? 'Fresh Fruits & Veggies 🍎' : 'الخضار والفواكه الطازجة 🍎';
    }
  }, [journeyConfig.departments, journeyConfig.businessType, section, selectedProducts, currentLangCode]);

  const getVoucherDiscountSubtitle = useCallback(() => {
    if (journeyConfig.businessType === 'cafe') {
      return currentLangCode === 'en' ? 'On all drinks & treats' : (journeyConfig.voucherDiscountSubtitle || 'على جميع المشروبات والحلى');
    } else if (journeyConfig.businessType === 'restaurant') {
      return currentLangCode === 'en' ? 'On your entire dining bill' : (journeyConfig.voucherDiscountSubtitle || 'على كامل الفاتورة والوجبات');
    }
    return currentLangCode === 'en' ? 'On your entire basket' : (journeyConfig.voucherDiscountSubtitle || 'على كامل سلتك');
  }, [journeyConfig.businessType, journeyConfig.voucherDiscountSubtitle, currentLangCode]);

  const getVoucherCodeDisplay = useCallback(() => {
    if (journeyConfig.businessType === 'cafe') {
      return journeyConfig.voucherCode && !journeyConfig.voucherCode.includes('PANDA') ? journeyConfig.voucherCode : 'CAFE-WIN-10';
    } else if (journeyConfig.businessType === 'restaurant') {
      return journeyConfig.voucherCode && !journeyConfig.voucherCode.includes('PANDA') ? journeyConfig.voucherCode : 'REST-WIN-10';
    }
    return journeyConfig.voucherCode || 'PANDA-WIN-10';
  }, [journeyConfig.businessType, journeyConfig.voucherCode]);

  // --- Step Handlers ---
  const handleSelectBusiness = (type: 'supermarket' | 'cafe' | 'restaurant') => {
    soundManager.playClick();
    const updated = applyBusinessPreset(journeyConfig, type);
    setJourneyConfig(updated);
    saveStoredJourneyConfig(updated);
    setSelectedProducts([]);
    setAdvancingDeptInfo(null);
    setIsAllDeptsCompleted(false);
    if (updated.departments && updated.departments.length > 0) {
      setActiveTab(updated.departments[0].id);
      setSection(updated.departments[0].name);
    }
    setStep('connected');
  };

  const handleNextStep = useCallback(() => {
    soundManager.playClick();
    setStep(prev => {
      if (prev === 'welcome') {
        if (journeyConfig.customerSelectsBusinessAfterLanguage !== false) {
          return 'business_select';
        }
        return 'connected';
      }
      if (prev === 'business_select') return 'connected';
      if (prev === 'connected') {
        const firstDeptId = journeyConfig.departments?.[0]?.id || 'veg';
        setActiveTab(firstDeptId);
        setSelectedProducts([]);
        setAdvancingDeptInfo(null);
        setIsAllDeptsCompleted(false);
        return 'shopping';
      }
      if (prev === 'shopping') return 'preference';
      if (prev === 'preference') return 'challenge_splash';
      if (prev === 'challenge_splash') return 'game';
      if (prev === 'result') return 'voucher_form';
      if (prev === 'voucher_form') return 'feedback';
      if (prev === 'feedback') return 'thank_you';
      if (prev === 'thank_you') {
        setSelectedProducts([]);
        setAdvancingDeptInfo(null);
        setIsAllDeptsCompleted(false);
        return 'welcome';
      }
      return prev;
    });
  }, [journeyConfig]);

  const handleBackStep = useCallback(() => {
    soundManager.playClick();
    setStep(prev => {
      if (prev === 'business_select') return 'welcome';
      if (prev === 'connected') {
        if (journeyConfig.customerSelectsBusinessAfterLanguage !== false) {
          return 'business_select';
        }
        return 'welcome';
      }
      if (prev === 'shopping') return 'connected';
      if (prev === 'preference') return 'shopping';
      if (prev === 'challenge_splash') return 'preference';
      if (prev === 'voucher_form') return 'result';
      if (prev === 'feedback') return 'voucher_form';
      return prev;
    });
  }, [journeyConfig]);

  // Auto-advance for connected step (as requested: remove confirm button and advance smoothly after ~1.2s)
  useEffect(() => {
    if (step === 'connected') {
      const timer = setTimeout(() => {
        handleNextStep();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [step, handleNextStep]);

  const toggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setSoundMuted(nextMuted);
  };

  // --- Game Logic ---
  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameInterval.current) clearInterval(gameInterval.current);

    const cfg = DIFFICULTIES[difficulty];
    setScore(0);
    setTimeLeft(cfg.duration);
    setLogos([]);
    setSavedToLeaderboard(false);

    // Spawn logos with lane distribution to prevent clumping/overlapping
    const availableLanes = [20, 35, 50, 65, 80];
    let lastLaneIndex = 2;

    gameInterval.current = setInterval(() => {
      const isBomb = cfg.hasBombs && Math.random() < 0.20;
      const isSpecial = !isBomb && Math.random() < 0.22;

      // Select a lane that avoids clumping with recent spawns
      let nextLane = Math.floor(Math.random() * availableLanes.length);
      if (nextLane === lastLaneIndex) {
        nextLane = (nextLane + 1 + Math.floor(Math.random() * (availableLanes.length - 1))) % availableLanes.length;
      }
      lastLaneIndex = nextLane;
      const posX = availableLanes[nextLane] + (Math.random() * 4 - 2);

      const newLogo: Logo = {
        id: Date.now() + Math.random(),
        x: posX,
        y: 100,
        scale: isSpecial ? 1.05 : isBomb ? 0.95 : (0.88 + Math.random() * 0.18),
        isSpecial,
        isBomb,
      };
      setLogos(prev => [...prev.slice(-8), newLogo]);
    }, cfg.spawnInterval);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (gameInterval.current) clearInterval(gameInterval.current);
          if (timerRef.current) clearInterval(timerRef.current);
          setStep('result');
          soundManager.playVictory();
          triggerConfetti();
          return 0;
        }
        if (prev <= 4) {
          soundManager.playTick(true);
        }
        return prev - 1;
      });
    }, 1000);
  }, [difficulty]);

  useEffect(() => {
    if (step === 'game') {
      startGame();
    }
    let connTimer: NodeJS.Timeout;
    if (step === 'connected') {
      connTimer = setTimeout(() => {
        handleNextStep();
      }, 2500);
    }
    let thankYouTimer: NodeJS.Timeout;
    if (step === 'thank_you') {
      thankYouTimer = setTimeout(() => {
        setStep('welcome');
      }, 35000);
    }
    return () => {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
        gameInterval.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (connTimer) clearTimeout(connTimer);
      if (thankYouTimer) clearTimeout(thankYouTimer);
    };
  }, [step, startGame, handleNextStep]);

  const popLogo = (id: number) => {
    const target = logos.find(l => l.id === id);
    if (!target) return;

    if (target.isBomb) {
      soundManager.playBomb();
      setIsScreenShaking(true);
      setTimeout(() => setIsScreenShaking(false), 300);
      setScore(prev => Math.max(0, prev - 2));
    } else if (target.isSpecial) {
      soundManager.playGoldenBonus();
      setScore(prev => prev + (difficulty === 'hard' ? 3 : 2));
    } else {
      soundManager.playPop();
      setScore(prev => prev + 1);
    }
    setLogos(prev => prev.filter(l => l.id !== id));
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleProductClick = (id: string) => {
    if (shakingProducts[id]) return;

    // Trigger audible wobble and visual shake animation
    soundManager.playWobble();
    setShakingProducts(prev => ({ ...prev, [id]: true }));

    // Wait for the shake animation to play before toggling selection
    setTimeout(() => {
      toggleProduct(id);
      soundManager.playClick();
      setShakingProducts(prev => ({ ...prev, [id]: false }));
    }, 320);
  };

  // Mandatory selection flow: Customer selects one product from each department, advances sequentially, and then transitions mandatorily
  const handleSelectProductInShopping = (
    product: ProductItemConfig,
    activeDept: DepartmentConfig,
    departmentsList: DepartmentConfig[]
  ) => {
    if (shakingProducts[product.id] || advancingDeptInfo || isAllDeptsCompleted) return;

    // Trigger visual shake and audio feedback
    soundManager.playWobble();
    setShakingProducts(prev => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setShakingProducts(prev => ({ ...prev, [product.id]: false }));
    }, 280);

    // Keep selections from other departments, set this department's selection to product.id
    const currentDeptProductIds = new Set((activeDept.products || []).map(p => p.id));
    const otherDeptSelections = selectedProducts.filter(id => !currentDeptProductIds.has(id));
    const nextSelections = [...otherDeptSelections, product.id];
    setSelectedProducts(nextSelections);
    soundManager.playClick();

    // Check which departments in departmentsList are still unselected
    const unselectedDepts = departmentsList.filter(d => 
      !d.products.some(p => nextSelections.includes(p.id))
    );

    if (unselectedDepts.length > 0) {
      // Find the next department in sequence or first unselected
      const currentIdx = departmentsList.findIndex(d => d.id === activeDept.id);
      const nextSequential = departmentsList.slice(currentIdx + 1).find(d => 
        !d.products.some(p => nextSelections.includes(p.id))
      );
      const targetDept = nextSequential || unselectedDepts[0];

      setAdvancingDeptInfo({
        id: targetDept.id,
        name: targetDept.name,
        nameEn: targetDept.nameEn,
      });

      setTimeout(() => {
        setActiveTab(targetDept.id);
        setAdvancingDeptInfo(null);
        soundManager.playTick(true);
      }, 650);
    } else {
      // All departments are fulfilled! Mandatory transition to the next step
      setIsAllDeptsCompleted(true);
      soundManager.playCelebration();
      triggerStarBurst();

      setTimeout(() => {
        setIsAllDeptsCompleted(false);
        handleNextStep();
      }, 950);
    }
  };

  const handleSaveToLeaderboard = () => {
    if (!playerName.trim()) return;
    const newEntry: LeaderboardEntry = {
      id: `lb-${Date.now()}`,
      name: playerName.trim(),
      score,
      difficulty,
      date: 'اليوم، ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      avatarEmoji: difficulty === 'hard' ? '🔥' : difficulty === 'medium' ? '⚡' : '🐼',
    };
    const updated = [newEntry, ...leaderboard];
    setLeaderboard(updated);
    try {
      localStorage.setItem('panda_leaderboard', JSON.stringify(updated));
    } catch {}
    setSavedToLeaderboard(true);
    soundManager.playVictory();
    triggerStarBurst();
    setShowLeaderboard(true);
  };

  const handleFeedbackSubmit = (
    selectedRating?: string, 
    customCleanliness?: string, 
    customStaff?: string, 
    customOverall?: string
  ) => {
    const finalRating = selectedRating || rating || overallRating || 'great';
    const ratingLabels: Record<string, string> = {
      great: 'رائع جداً 🤩',
      good: 'جيد 😊',
      normal: 'عادي 😐',
      bad: 'سيء ☹️',
      very_bad: 'سيء جداً 😡',
    };
    const newFeedback: CustomerFeedback = {
      id: `fb-${Date.now()}`,
      customerName: customerName || (brandSettings.brandNameAr ? `عميل ${brandSettings.brandNameAr}` : 'عميل المتجر'),
      customerEmail: customerEmail || 'غير مسجل',
      customerPhone: customerPhone || 'غير مسجل',
      rating: finalRating,
      ratingLabel: ratingLabels[finalRating] || finalRating,
      cleanlinessRating: customCleanliness || cleanlinessRating,
      staffRating: customStaff || staffRating,
      overallRating: customOverall || overallRating || finalRating,
      businessType: journeyConfig.businessType || 'supermarket',
      section: section ? (section === 'veg' ? 'خضار وفواكه' : section === 'food' ? 'مواد غذائية' : section === 'cheese' ? 'أجبان وألبان' : 'أدوات نظافة') : 'عام',
      preference: preference === 'discount' ? 'خصم مباشر' : preference === 'points' ? 'نقاط إضافية' : preference === 'gifts' ? 'هدايا وقسائم' : 'عروض حصرية',
      selectedProducts: selectedProducts.map(pid => {
        for (const dept of journeyConfig.departments) {
          const item = dept.products.find(p => p.id === pid);
          if (item) return item.name;
        }
        for (const cat of Object.values(PRODUCTS)) {
          const item = cat.find(p => p.id === pid);
          if (item) return item.name;
        }
        return pid;
      }),
      score,
      difficulty,
      createdAt: Date.now(),
      languageCode: currentLangCode || 'ar',
      languageName: currentLang.name || 'العربية',
      timestamp: (() => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
      })(),
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    try {
      localStorage.setItem('panda_feedbacks', JSON.stringify(updatedFeedbacks));
    } catch {}

    soundManager.playVictory();
    triggerCelebration();
    showToast(
      currentLangCode === 'en' ? 'New customer feedback submitted successfully! 🎉' : 'تم استلام وتوثيق تقييم العميل بنجاح! 🎉',
      'success'
    );
    setStep('thank_you');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...brandSettings, logoUrl: reader.result as string };
        setBrandSettings(updated);
        saveStoredBrandSettings(updated);
        showToast(
          currentLangCode === 'en' ? 'Brand logo updated successfully! 🖼️' : 'تم تحديث وحفظ شعار المتجر بنجاح! 🖼️',
          'success'
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleExportCSV = () => {
    soundManager.playClick();
    if (feedbacks.length === 0) {
      const msg = currentLangCode === 'en' ? 'No feedback records to export' : 'لا توجد بيانات آراء لتصديرها حالياً';
      setExportNotice(msg);
      showToast(msg, 'warning');
      setTimeout(() => setExportNotice(null), 3500);
      return;
    }
    const success = exportFeedbackToCSV(feedbacks);
    if (success) {
      const msg = currentLangCode === 'en' ? 'Excel / CSV exported successfully! 📥' : 'تم تصدير ملف Excel / CSV بنجاح! 📥';
      setExportNotice(msg);
      showToast(msg, 'success');
      setTimeout(() => setExportNotice(null), 3500);
    }
  };

  const handleExportJSON = () => {
    soundManager.playClick();
    if (feedbacks.length === 0) {
      const msg = currentLangCode === 'en' ? 'No feedback records to export' : 'لا توجد بيانات آراء لتصديرها حالياً';
      setExportNotice(msg);
      showToast(msg, 'warning');
      setTimeout(() => setExportNotice(null), 3500);
      return;
    }
    const success = exportFeedbackToJSON(feedbacks);
    if (success) {
      const msg = currentLangCode === 'en' ? 'JSON file exported successfully! 💾' : 'تم تصدير ملف JSON بنجاح! 💾';
      setExportNotice(msg);
      showToast(msg, 'success');
      setTimeout(() => setExportNotice(null), 3500);
    }
  };

  const handleCopySummary = async () => {
    soundManager.playClick();
    if (feedbacks.length === 0) {
      const msg = currentLangCode === 'en' ? 'No feedback records to copy' : 'لا توجد بيانات آراء لنسخها حالياً';
      setExportNotice(msg);
      showToast(msg, 'warning');
      setTimeout(() => setExportNotice(null), 3500);
      return;
    }
    const ok = await copyFeedbackSummary(feedbacks);
    if (ok) {
      const msg = currentLangCode === 'en' ? 'Summary copied to clipboard! 📋' : 'تم نسخ ملخص الآراء إلى الحافظة بنجاح! 📋';
      setExportNotice(msg);
      showToast(msg, 'success');
      setTimeout(() => setExportNotice(null), 3500);
    } else {
      const msg = currentLangCode === 'en' ? 'Failed to copy to clipboard' : 'تعذر النسخ إلى الحافظة';
      setExportNotice(msg);
      showToast(msg, 'error');
      setTimeout(() => setExportNotice(null), 3500);
    }
  };

  // --- Render Helpers ---
  const renderProgress = () => {
    const steps: Step[] = ['welcome', 'connected', 'shopping', 'preference', 'challenge_splash'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex === -1 && step !== 'game') return null;

    return (
      <div className="flex items-center gap-2 select-none pointer-events-none" aria-hidden="true">
        {steps.map((s, i) => (
          <div 
            key={s}
            className={`h-3 rounded-full transition-all duration-300 pointer-events-none select-none ${
              i <= currentIndex || (step === 'game' && i < steps.length) ? 'w-12 bg-[#005A2B]' : 'w-5 bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  if (currentView === 'landing') {
    return (
      <>
        <ShowcaseLandingView
          brandSettings={brandSettings}
          onSaveBrandSettings={handleSaveBrandSettings}
          onNavigateToDashboard={() => {
            soundManager.playClick();
            setCurrentView('dashboard');
          }}
          onNavigateToGame={() => {
            soundManager.playClick();
            setCurrentView('game');
            setStep('welcome');
          }}
          onOpenBrandModal={() => {
            soundManager.playClick();
            setIsBrandModalOpen(true);
          }}
          currentLangCode={currentLangCode}
          onSelectLanguage={(code) => {
            const currentScrollY = typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop || 0) : 0;
            handleSelectLanguage(code);
            if (typeof window !== 'undefined' && currentScrollY > 0) {
              requestAnimationFrame(() => {
                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              });
              setTimeout(() => {
                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              }, 40);
            }
          }}
          totalFeedbacksCount={feedbacks.length}
          currentFontId={currentFontId}
          onSelectFont={handleSelectFont}
        />
        <BrandCustomizationModal
          isOpen={isBrandModalOpen}
          onClose={() => setIsBrandModalOpen(false)}
          brandSettings={brandSettings}
          onSaveBrandSettings={handleSaveBrandSettings}
          languages={languages}
          onUpdateLanguages={handleUpdateLanguages}
          isEnglish={currentLangCode === 'en'}
        />
        <LeaderboardModal
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          entries={leaderboard}
          currentDifficulty={difficulty}
        />
      </>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <>
        <DashboardView
          feedbacks={feedbacks}
          leaderboard={leaderboard}
          difficulty={difficulty}
          soundMuted={soundMuted}
          exportNotice={exportNotice}
          onClearNotice={() => setExportNotice(null)}
          onToggleSound={toggleSound}
          onOpenLeaderboard={() => {
            soundManager.playClick();
            setShowLeaderboard(true);
          }}
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
          onCopySummary={handleCopySummary}
          onPreviewGame={() => {
            soundManager.playClick();
            setCurrentView('game');
            setStep('welcome');
          }}
          onNavigateToShowcase={() => {
            soundManager.playClick();
            setCurrentView('landing');
          }}
          logoUrl={brandSettings.logoUrl}
          onLogoClick={triggerUpload}
          languages={languages}
          currentLangCode={currentLangCode}
          onSelectLanguage={handleSelectLanguage}
          onUpdateLanguages={handleUpdateLanguages}
          brandSettings={brandSettings}
          onSaveBrandSettings={handleSaveBrandSettings}
          journeyConfig={journeyConfig}
          onSaveJourneyConfig={handleSaveJourneyConfig}
          onResetJourneyConfig={handleResetJourneyConfig}
          onOpenBrandModal={() => {
            soundManager.playClick();
            setIsBrandModalOpen(true);
          }}
        />
        <LeaderboardModal
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          entries={leaderboard}
          currentDifficulty={difficulty}
        />
        <BrandCustomizationModal
          isOpen={isBrandModalOpen}
          onClose={() => setIsBrandModalOpen(false)}
          brandSettings={brandSettings}
          onSaveBrandSettings={handleSaveBrandSettings}
          languages={languages}
          onUpdateLanguages={handleUpdateLanguages}
          isEnglish={currentLangCode === 'en'}
        />
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleLogoUpload} 
          accept="image/*" 
          className="hidden" 
        />
        <ToastNotification
          toasts={toasts}
          onDismiss={dismissToast}
          isEnglish={currentLangCode === 'en'}
        />
      </>
    );
  }

  return (
    <div 
      dir={currentLang.dir} 
      className={`min-h-screen font-sans text-gray-800 flex flex-col items-center select-none overflow-x-hidden relative transition-colors duration-500 ${
        journeyConfig.businessType === 'cafe_restaurant'
          ? 'bg-[#FAF7F2]' 
          : 'bg-[#FDFDFD]'
      }`}
    >
      {/* Dynamic Project Ambiance in Background (متغير حسب كافيه ومطعم أو سوبر ماركت) */}
      {journeyConfig.businessType === 'cafe_restaurant' ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-700/10 via-amber-500/5 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
          <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-orange-200/15 blur-3xl" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-emerald-800/8 via-emerald-500/4 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-teal-200/15 blur-3xl" />
        </div>
      )}

      {/* Top Sticky Preview Bar with Return to Dashboard Button */}
      <div 
        dir="ltr"
        className="w-full bg-[#001D11] border-b border-emerald-800/50 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold shadow-md sticky top-0 z-50"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-black">
            {currentLang.translations.customerPreviewTitle || 'وضع معاينة تجربة العميل (Customer Preview)'}
          </span>
          <span className="text-gray-400 text-[11px] hidden md:inline">• Panda Interactive Screen</span>
        </div>
        <motion.button
          id="return-to-dashboard-btn"
          onClick={() => {
            soundManager.playClick();
            setCurrentView('dashboard');
          }}
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 0 0 rgba(52, 211, 153, 0.5)',
              '0 0 0 6px rgba(52, 211, 153, 0)',
              '0 0 0 0 rgba(52, 211, 153, 0)'
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="bg-[#005A2B] hover:bg-emerald-600 text-white px-4 py-1.5 rounded-xl flex items-center gap-2 transition-colors text-xs font-black shadow-md cursor-pointer border border-emerald-400/50"
          title={currentLang.translations.returnToDashboard || "العودة للوحة التحكم"}
        >
          <LayoutDashboard size={15} />
          <span>{currentLang.translations.returnToDashboard || 'العودة للوحة التحكم ↩'}</span>
        </motion.button>
      </div>

      <div className="w-full flex flex-col items-center px-2 sm:px-4 py-1.5 sm:py-5 max-w-5xl">
        {/* Header (Clean Branded for Customer - Anchored Controls on Left on all languages) */}
        <header 
          dir="ltr"
          className="w-full max-w-4xl flex justify-between items-center mb-1.5 sm:mb-5 gap-1.5 sm:gap-4 flex-wrap"
        >
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <div 
                className="bg-white border border-gray-100 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-xs text-[11px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5"
              >
                <span className="text-gray-500">{currentLang.translations.experienceNo || 'تجربة رقم #01'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Language Selector in Customer Header - hide on welcome since welcome has roller */}
              {step !== 'welcome' && (
                <LanguageSelector
                  variant="header"
                  languages={languages}
                  currentLangCode={currentLangCode}
                  onSelectLanguage={handleSelectLanguage}
                />
              )}

              {/* Sound Toggle Button */}
              <button
                id="sound-toggle-btn"
                onClick={toggleSound}
                className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer shadow-xs ${
                  soundMuted
                    ? 'bg-gray-100 border-gray-200 text-gray-400 hover:text-gray-600'
                    : 'bg-emerald-50 border-emerald-200 text-[#005A2B] hover:bg-emerald-100'
                }`}
                title={soundMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
              >
                {soundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Leaderboard Button in Header */}
              <button
                id="header-leaderboard-btn"
                onClick={() => {
                  soundManager.playClick();
                  setShowLeaderboard(true);
                }}
                className="p-1 sm:p-2 px-2 sm:px-3 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] sm:text-xs font-black flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer shadow-xs"
                title="لوحة المتصدرين"
              >
                <Trophy size={13} className="text-amber-600" />
                <span className="hidden sm:inline">{currentLang.translations.honorBoard || 'لوحة الشرف'}</span>
              </button>

              {/* Showcase Landing Button */}
              <button
                id="header-showcase-btn"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentView('landing');
                }}
                className="p-1 sm:p-2 px-2.5 sm:px-3.5 rounded-full text-white text-[11px] sm:text-xs font-black flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-102"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  boxShadow: `0 4px 14px -2px ${primaryColor}50`
                }}
                title="الواجهة التقديمية CX"
              >
                <Sparkles size={12} />
                <span>منصة CX ⚡</span>
              </button>
            </div>
            {step !== 'welcome' && renderProgress()}
          </div>
          
          {/* Customer Clean Brand Header - shown only when not on welcome step */}
          {step !== 'welcome' && (
            <div className="flex flex-col items-end gap-1.5 sm:gap-2" dir={currentLang.dir}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right rtl:text-right ltr:text-left p-0.5">
                  <h1 className="text-lg sm:text-2xl font-black leading-none transition-colors" style={{ color: primaryColor }}>
                    {currentLang.translations.brandTitle || (currentLangCode === 'en' ? brandSettings.brandTitleEn : brandSettings.brandTitleAr)}
                  </h1>
                  <p className="text-[10px] sm:text-xs font-bold transition-colors mt-0.5" style={{ color: accentColor }}>
                    {currentLang.translations.brandSubtitle || (currentLangCode === 'en' ? brandSettings.brandSubtitleEn : brandSettings.brandSubtitleAr)}
                  </p>
                </div>

                <div className="flex flex-col items-center select-none">
                  <div className="bg-white p-1 sm:p-2 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14">
                    {brandSettings.logoUrl ? (
                      <img 
                        src={brandSettings.logoUrl} 
                        alt="Brand Logo" 
                        className="w-full h-full object-contain rounded-xl drop-shadow-2xs"
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <PandaIcon size={36} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

      <main className="w-full max-w-md mx-auto px-2 sm:px-4 flex-1 flex flex-col items-center justify-center relative py-1 sm:py-3">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center w-full"
            >
              <LanguageSelectionView
                languages={languages}
                currentLangCode={currentLangCode}
                onSelectLanguage={handleSelectLanguage}
                onConfirm={handleNextStep}
                logoUrl={brandSettings.logoUrl}
                brandNameAr={brandSettings.brandNameAr}
                brandNameEn={brandSettings.brandNameEn}
                titleAr={journeyConfig.languageSelectTitleAr}
                titleEn={journeyConfig.languageSelectTitleEn}
                subtitleAr={journeyConfig.languageSelectSubtitleAr}
                subtitleEn={journeyConfig.languageSelectSubtitleEn}
                badgeAr={journeyConfig.languageSelectBadgeAr}
                badgeEn={journeyConfig.languageSelectBadgeEn}
              />
            </motion.div>
          )}

          {step === 'business_select' && (
            <motion.div 
              key="business_select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center w-full"
            >
              <BusinessSelectView
                currentLangCode={currentLangCode}
                isRTL={currentLang.direction === 'rtl' || currentLangCode === 'ar'}
                onSelectBusiness={handleSelectBusiness}
                onBack={handleBackStep}
                brandNameAr={brandSettings.brandNameAr}
                brandNameEn={brandSettings.brandNameEn}
                logoUrl={brandSettings.logoUrl}
                selectedBusiness={journeyConfig.businessType}
              />
            </motion.div>
          )}

          {step === 'connected' && (
            <motion.div 
              key="connected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <BackButton onClick={handleBackStep} label={currentLang.translations.backBtn} />
              
              <div className="flex-1 flex flex-col items-center justify-center gap-4 my-auto w-full">
                <div className="relative mt-1">
                  <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                     className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-emerald-100/60 relative overflow-hidden"
                  >
                     <div className="w-16 h-16 rounded-full border-4 border-[#005A2B] flex items-center justify-center z-10 bg-white shadow-xs">
                        <Check size={28} strokeWidth={3.5} className="text-[#005A2B]" />
                     </div>
                  </motion.div>
                  
                  {/* Visual feedback rings */}
                  <motion.div 
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border-2 border-[#005A2B]/20" 
                  />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-800">
                    {journeyConfig.connectedTitleAr || currentLang.translations.connectedTitle || 'تم الربط بنجاح!'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {journeyConfig.connectedSubtitleAr || currentLang.translations.connectedSubtitle || (currentLangCode === 'en' ? `Get ready for a smart shopping experience with ${brandSettings.brandNameEn || 'Panda'}` : `استعد لتجربة تسوق ذكية مع ${brandSettings.brandNameAr || 'بنده'}`)}
                  </p>
                </div>

                {/* مؤشر المتابعة التلقائية الفورية بدون أزرار تأكيد */}
                <div className="mt-4 flex items-center gap-2 text-xs font-black text-emerald-800 bg-emerald-50/95 border border-emerald-200/80 px-4 py-2 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{currentLangCode === 'en' ? 'Connected! Moving forward automatically...' : (journeyConfig.connectedNoticeAr || 'تم الربط! جاري المتابعة تلقائياً...')}</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'preference' && (
            <motion.div 
              key="preference"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <BackButton onClick={handleBackStep} label={currentLang.translations.backBtn} />
              
              <div className="w-full flex-1 flex flex-col justify-center">
                <div className="text-center space-y-1 mb-4 mt-1">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-800">
                    {currentLang.translations.preferenceTitle || journeyConfig.preferenceQuestionTitle || 'ماذا تفضل؟'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xs mx-auto">
                    {currentLang.translations.preferenceSubtitle || journeyConfig.preferenceQuestionSubtitle || 'اختر مكافأتك المفضلة لتخصيص عروضك القادمة'}
                  </p>
                </div>

                {/* Choice Cards Grid: 4 items (2x2 grid) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-4">
                  {[
                    { id: 'points', label: currentLang.translations.prefPoints || 'نقاط في التطبيق', icon: <Coins className="text-amber-500" />, bg: 'bg-amber-50', border: 'border-amber-200' },
                    { id: 'cashback', label: currentLang.translations.prefCashback || 'كاش باك فوري', icon: <Wallet className="text-emerald-500" />, bg: 'bg-emerald-50', border: 'border-emerald-200' },
                    { id: 'discount', label: currentLang.translations.prefDiscount || 'خصومات حصرية', icon: <Percent className="text-orange-500" />, bg: 'bg-orange-50', border: 'border-orange-200' },
                    { id: 'gift', label: currentLang.translations.prefGift || 'هدايا وقسائم مجانية', icon: <Gift className="text-purple-500" />, bg: 'bg-purple-50', border: 'border-purple-200' },
                  ].map((opt) => {
                    const isSelected = preference === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        whileHover={{ scale: 1.035, y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onClick={() => {
                          soundManager.playClick();
                          setPreference(opt.id);
                          // Auto advance after 800ms as requested (بدون زر تأكيد ومتابعة)
                          setTimeout(() => {
                            handleNextStep();
                          }, 800);
                        }}
                        className={`w-full min-h-[122px] sm:min-h-[134px] rounded-2xl p-3.5 sm:p-4 flex flex-col items-center justify-between cursor-pointer select-none transition-all relative overflow-hidden group ${
                          isSelected 
                            ? 'border-2 border-[#005A2B] bg-gradient-to-b from-emerald-50/95 via-white to-green-50/80 shadow-[0_12px_26px_-4px_rgba(0,90,43,0.25),inset_0_1px_1px_rgba(255,255,255,1)] ring-3 ring-[#005A2B]/20' 
                            : 'border-[1.5px] border-slate-200/90 hover:border-emerald-300 bg-gradient-to-b from-white via-[#FCFDFD] to-[#F5F8F7] shadow-[0_4px_14px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_12px_22px_-6px_rgba(0,0,0,0.09)]'
                        }`}
                      >
                        {/* Selected Checkmark Badge */}
                        {isSelected && (
                          <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#005A2B] to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/30">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}

                        <div className={`w-12 h-12 rounded-2xl ${opt.bg} border ${opt.border} shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_10px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                          {React.cloneElement(opt.icon as React.ReactElement, { size: 26 })}
                        </div>

                        <span className="font-black text-xs sm:text-sm text-center line-clamp-2 text-gray-800 leading-tight">
                          {opt.label}
                        </span>

                        <div className="mt-0.5">
                          {isSelected ? (
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <Check size={10} strokeWidth={3} />
                              <span>{currentLang.translations.selectedBadge || 'تم الاختيار'}</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-emerald-700 transition-colors bg-white/80 px-2 py-0.5 rounded-full border border-slate-200/60 shadow-2xs">
                              {currentLang.translations.chooseThisOffer || 'اختر هذا العرض'}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Auto-advance notification instead of confirm button */}
                {preference ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-2 flex items-center justify-center gap-2 text-emerald-800 text-xs font-black bg-emerald-50/95 border border-emerald-200/90 rounded-2xl shadow-2xs mt-1"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>{currentLangCode === 'en' ? 'Choice confirmed! Continuing...' : '✓ تم اختيار مكافأتك! جاري المتابعة...'}</span>
                  </motion.div>
                ) : (
                  <div className="w-full py-1 text-center text-xs font-bold text-gray-400">
                    {currentLangCode === 'en' ? 'Tap an option to proceed directly' : 'اضغط على مكافأتك المفضلة للمتابعة مباشرة'}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'challenge_splash' && (
            <motion.div 
              key="challenge_splash"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <BackButton onClick={handleBackStep} label={currentLang.translations.backBtn} />
              
              <div className="w-full flex-1 flex flex-col items-center justify-center gap-3 my-auto">
                <div className="relative mt-0.5">
                  <div className="bg-white p-2.5 rounded-2xl shadow-md border border-slate-100 select-none">
                    <PandaIcon size={64} customImageUrl={logoUrl} />
                  </div>
                  <motion.div 
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1.5 -right-1.5 bg-yellow-400 p-1.5 rounded-full shadow-md"
                  >
                    <Star fill="white" stroke="none" size={14} />
                  </motion.div>
                </div>

                <div className="space-y-0.5">
                  <h2 className="text-xl sm:text-2xl font-black text-[#005A2B]">
                    {currentLang.translations.challengeSplashTitle || (currentLangCode === 'en' ? `${brandSettings.brandNameEn || 'Panda'} Speed Challenge` : `تحدي ${brandSettings.brandNameAr || 'بنده'} السريع`)}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium leading-relaxed max-w-xs">
                    {currentLang.translations.challengeSplashSubtitle || 'فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية!'}
                  </p>
                </div>

                {/* Difficulty Selection */}
                <div className="w-full space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black text-gray-600">
                      {currentLang.translations.diffDifficulty || 'مستوى الصعوبة:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setShowLeaderboard(true);
                      }}
                      className="text-[10px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 cursor-pointer shadow-2xs"
                    >
                      <Trophy size={12} className="text-amber-600" />
                      <span>{currentLang.translations.leaderboardModalTitle || 'لوحة المتصدرين'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full">
                    {(Object.keys(DIFFICULTIES) as Difficulty[]).map((dKey) => {
                      const cfg = DIFFICULTIES[dKey];
                      const isSelected = difficulty === dKey;
                      const localizedLabel = dKey === 'easy' 
                        ? (currentLang.translations.diffEasy || cfg.label)
                        : dKey === 'medium'
                        ? (currentLang.translations.diffMedium || cfg.label)
                        : (currentLang.translations.diffHard || cfg.label);
                      return (
                        <motion.button
                          key={dKey}
                          type="button"
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={() => {
                            soundManager.playClick();
                            setDifficulty(dKey);
                          }}
                          className={`h-full min-h-[86px] sm:min-h-[94px] p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-between cursor-pointer select-none transition-all relative overflow-hidden group ${
                            isSelected
                              ? 'border-2 border-[#005A2B] bg-gradient-to-b from-emerald-50/95 via-white to-green-50/80 shadow-[0_8px_20px_-4px_rgba(0,90,43,0.22),inset_0_1px_1px_rgba(255,255,255,1)] ring-3 ring-[#005A2B]/20'
                              : 'border-[1.5px] border-slate-200/90 hover:border-emerald-300 bg-gradient-to-b from-white via-[#FCFDFD] to-[#F5F8F7] shadow-[0_3px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_8px_18px_-4px_rgba(0,0,0,0.08)]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-[#005A2B] to-emerald-600 text-white flex items-center justify-center shadow-xs">
                              <Check size={10} strokeWidth={3} />
                            </div>
                          )}

                          <span className="text-2xl group-hover:scale-115 transition-transform">
                            {dKey === 'easy' ? '🟢' : dKey === 'medium' ? '⚡' : '🔥'}
                          </span>
                          <span className={`font-black text-xs sm:text-sm text-center line-clamp-1 ${isSelected ? 'text-[#005A2B]' : 'text-gray-800'}`}>
                            {localizedLabel}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-gray-500'}`}>
                            {cfg.duration} {currentLang.translations.secondsShort || 'ثوانٍ'}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  <p className="text-[10px] text-gray-600 font-bold bg-slate-50 p-2 rounded-xl border border-slate-200/70 text-center">
                    {difficulty === 'easy' 
                      ? (currentLang.translations.diffEasyDesc || DIFFICULTIES[difficulty].sublabel)
                      : difficulty === 'medium'
                      ? (currentLang.translations.diffMediumDesc || DIFFICULTIES[difficulty].sublabel)
                      : (currentLang.translations.diffHardDesc || DIFFICULTIES[difficulty].sublabel)}
                  </p>

                  {/* Department Specific Prize Section (قسم الجائزة المحددة لكل قسم: خصم الكاش للمطعم، قسيمة مجانية للكافيه) */}
                  <div className="w-full bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-300/80 rounded-2xl p-2.5 flex items-center justify-between gap-2.5 text-right shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-xs shrink-0 font-bold text-sm">
                        {journeyConfig.businessType === 'cafe' ? '☕' : journeyConfig.businessType === 'restaurant' ? '🍽️' : '🎁'}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-1.5 py-0.2 rounded-md">
                            {currentLangCode === 'en' ? 'Challenge Reward' : 'الجائزة المحددة للقسم'}
                          </span>
                          <span className="text-[10px] font-black text-emerald-800">
                            {journeyConfig.businessType === 'cafe'
                              ? (currentLangCode === 'en' ? 'Cafe & Drinks' : 'قسم الكافيه والمشروبات')
                              : journeyConfig.businessType === 'restaurant'
                              ? (currentLangCode === 'en' ? 'Restaurant & Dining' : 'قسم المطعم والوجبات')
                              : (currentLangCode === 'en' ? 'Market & Grocery' : 'قسم السوبرماركت والسلة')}
                          </span>
                        </div>
                        <p className="text-[11px] font-black text-slate-900 mt-0.5 leading-snug">
                          {journeyConfig.businessType === 'cafe'
                            ? (currentLangCode === 'en' ? 'Free Drink Voucher / Specialty Coffee' : 'قسيمة قهوة ومشروب مجاني عند الفوز')
                            : journeyConfig.businessType === 'restaurant'
                            ? (currentLangCode === 'en' ? '20% Direct Cash Discount on Dining Bill' : 'خصم كاش فوري 20% على الفاتورة')
                            : (currentLangCode === 'en' ? 'Immediate SAR 25 Cart Voucher' : 'قسيمة مشتريات نقدية وخصم فوري 25 ريال')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-black text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg shrink-0 border border-emerald-300">
                      {journeyConfig.businessType === 'cafe' ? 'FREE ☕' : journeyConfig.businessType === 'restaurant' ? '-20% 💵' : '-25 SAR 🛒'}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleNextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-[#E34F26] via-[#ea5a32] to-[#cf421b] text-white py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black shadow-[0_8px_22px_rgba(227,79,38,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] border-t border-white/35 w-full flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_12px_28px_rgba(227,79,38,0.45)] transition-all"
              >
                <span>
                  {currentLang.translations.startChallenge || 'ابدأ التحدي'} (
                  {difficulty === 'easy' 
                    ? (currentLang.translations.diffEasy || DIFFICULTIES[difficulty].label)
                    : difficulty === 'medium'
                    ? (currentLang.translations.diffMedium || DIFFICULTIES[difficulty].label)
                    : (currentLang.translations.diffHard || DIFFICULTIES[difficulty].label)}
                  )
                </span>
                <Sparkles size={17} />
              </motion.button>
            </motion.div>
          )}

          {step === 'shopping' && (() => {
            const departmentsToSelect = (journeyConfig.departments || []).slice(0, 4);
            const activeDept = departmentsToSelect.find(d => d.id === activeTab) || departmentsToSelect[0] || journeyConfig.departments[0];
            const activeDeptIndex = departmentsToSelect.findIndex(d => d.id === activeDept.id);
            const isBento = (journeyConfig.productsLayout || 'bento') === 'bento';
            
            // Count completed departments with at least one selected product
            const completedDeptsCount = departmentsToSelect.filter(d => 
              d.products.some(p => selectedProducts.includes(p.id))
            ).length;

            const localizedTitles = getShoppingTitleAndSubtitle(journeyConfig.businessType, currentLangCode);
            const shoppingTitleText = (currentLangCode === 'ar' && journeyConfig.shoppingTitle) 
              ? journeyConfig.shoppingTitle 
              : (currentLangCode === 'en' && journeyConfig.shoppingTitleEn)
              ? journeyConfig.shoppingTitleEn
              : (currentLang.translations.shoppingTitle || localizedTitles.title);
            
            const shoppingSubtitleText = (currentLangCode === 'ar' && journeyConfig.shoppingSubtitle)
              ? journeyConfig.shoppingSubtitle
              : (currentLangCode === 'en' && journeyConfig.shoppingSubtitleEn)
              ? journeyConfig.shoppingSubtitleEn
              : (currentLang.translations.shoppingSubtitle || localizedTitles.subtitle);

            const activeDeptLocalizedName = getDepartmentTranslatedName(
              activeDept.id, 
              (currentLangCode === 'en' && activeDept.nameEn ? activeDept.nameEn : activeDept.name), 
              currentLangCode
            );

            return (
              <motion.div 
                key="shopping"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-3.5 sm:p-5 min-h-[580px] sm:min-h-[610px] h-[580px] sm:h-[610px] flex flex-col items-center justify-between text-center relative overflow-hidden"
              >
                {/* Back Button: steps back to previous department or previous screen */}
                <BackButton 
                  onClick={() => {
                    if (activeDeptIndex > 0) {
                      soundManager.playClick();
                      setActiveTab(departmentsToSelect[activeDeptIndex - 1].id);
                    } else {
                      handleBackStep();
                    }
                  }} 
                  label={currentLang.translations.backBtn} 
                />
                
                <div className="w-full flex-1 flex flex-col justify-center">
                  {/* Header Title */}
                  <div className="text-center space-y-0.5 mb-1 mt-0.5">
                    <div className="flex items-center justify-center gap-1.5">
                       <Sparkles size={18} className="text-[#005A2B]" />
                       <h2 className="text-base sm:text-lg font-black text-gray-800">
                         {shoppingTitleText}
                       </h2>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium line-clamp-1">
                      {shoppingSubtitleText}
                    </p>
                  </div>

                  {/* Section Step Progress Bar: Shows active section & completed count */}
                  <div className="flex items-center justify-between gap-2 px-1 mb-1.5 text-[10px] sm:text-[11px] font-black">
                    <div className="flex items-center gap-1.5 text-[#005A2B]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>
                        {getUIString('sectionProgress', currentLangCode, {
                          cur: activeDeptIndex + 1,
                          total: departmentsToSelect.length,
                          dept: activeDeptLocalizedName
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px]">
                      <span>{getUIString('completed', currentLangCode)}:</span>
                      <span className="font-mono font-black">{completedDeptsCount} / {departmentsToSelect.length}</span>
                    </div>
                  </div>

                  {/* Department Tabs: 4 Complete Departments with Checkmarks */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100/90 rounded-2xl flex-1 select-none">
                      {departmentsToSelect.map((dept) => {
                        const isTabActive = activeDept?.id === dept.id;
                        const hasSelectedInDept = dept.products.some(p => selectedProducts.includes(p.id));
                        const deptLocalizedName = getDepartmentTranslatedName(
                          dept.id,
                          (currentLangCode === 'en' && dept.nameEn ? dept.nameEn : dept.name),
                          currentLangCode
                        );

                        return (
                          <button 
                            key={dept.id}
                            type="button"
                            onClick={() => {
                              soundManager.playClick();
                              setActiveTab(dept.id);
                            }}
                            className={`w-full py-1.5 px-0.5 rounded-xl text-[10px] sm:text-xs font-black transition-all cursor-pointer text-center relative flex items-center justify-center gap-1 ${
                              isTabActive 
                                ? 'bg-[#005A2B] text-white shadow-xs' 
                                : hasSelectedInDept
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/80 hover:bg-emerald-100'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                            }`}
                            title={deptLocalizedName}
                          >
                            <span className="truncate">{deptLocalizedName}</span>
                            {hasSelectedInDept && (
                              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${
                                isTabActive ? 'bg-white text-[#005A2B]' : 'bg-emerald-600 text-white'
                              }`}>
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Item Cards Grid: All 4 products rendered according to selected layout (Bento or 2x2 Grid) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full p-0.5 overflow-hidden">
                    {(activeDept?.products || [])
                      .filter(product => product.isVisible !== false)
                      .slice(0, 4)
                      .map((product, idx) => {
                        const isSelected = selectedProducts.includes(product.id);
                        const cardVariant = isBento
                          ? (product.cardType || (idx === 0 ? 'tall' : idx === 3 ? 'wide' : 'standard'))
                          : 'compact';

                        return (
                          <ModernProductCard
                            key={product.id}
                            product={product}
                            layoutVariant={cardVariant}
                            isSelected={isSelected}
                            onToggle={() => {
                              handleSelectProductInShopping(product, activeDept, departmentsToSelect);
                            }}
                            isEnglish={currentLang.code === 'en'}
                            currentLangCode={currentLangCode}
                            selectedBadgeText={currentLangCode === 'ar' ? (journeyConfig.shoppingSelectedBadgeAr || currentLang.translations.selectedBadge) : currentLang.translations.selectedBadge}
                            tapToSelectText={currentLangCode === 'ar' ? (journeyConfig.shoppingTapToSelectAr || currentLang.translations.tapToSelect) : currentLang.translations.tapToSelect}
                          />
                        );
                      })}
                  </div>
                </div>

                {/* Status Notice & Auto-advance Feedback */}
                {isAllDeptsCompleted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-2 flex items-center justify-center gap-2 text-emerald-950 text-xs font-black bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 border border-emerald-300 rounded-2xl shadow-xs mt-1"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                    <span>{getUIString('allSectionsCompleted', currentLangCode)}</span>
                  </motion.div>
                ) : advancingDeptInfo ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-2 flex items-center justify-center gap-2 text-emerald-800 text-xs font-black bg-emerald-50/95 border border-emerald-200/90 rounded-2xl shadow-2xs mt-1"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>
                      {getUIString('movingToNextSection', currentLangCode, {
                        dept: getDepartmentTranslatedName(
                          advancingDeptInfo.id || '',
                          (currentLangCode === 'en' && advancingDeptInfo.nameEn ? advancingDeptInfo.nameEn : advancingDeptInfo.name),
                          currentLangCode
                        )
                      })}
                    </span>
                  </motion.div>
                ) : (
                  <div className="w-full py-1 text-center text-[11px] font-bold text-gray-500 flex items-center justify-center gap-1">
                    <span>👉</span>
                    <span>
                      {getUIString('selectFromSection', currentLangCode, {
                        dept: activeDeptLocalizedName
                      })}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })()}

          {step === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={isScreenShaking ? { 
                opacity: 1, 
                x: [-6, 6, -4, 4, -2, 2, 0], 
                backgroundColor: ['#fee2e2', '#ffffff'] 
              } : { opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-[500px] sm:min-h-[580px] h-[78vh] max-h-[640px] bg-white rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden flex flex-col items-center"
            >
              {/* Game Stats HUD */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                 <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center min-w-[80px]">
                    <div className="flex items-center gap-1 text-gray-500 font-bold mb-0.5">
                      <Clock size={12} />
                      <span className="text-[9px]">{currentLang.translations.timeRemaining || 'الوقت'}</span>
                    </div>
                    <motion.span 
                      animate={timeLeft <= 3 ? { 
                        color: "#E34F26",
                        scale: [1, 1.15, 1]
                      } : { 
                        color: "#005A2B",
                        scale: 1 
                      }}
                      transition={timeLeft <= 3 ? { 
                        scale: { repeat: Infinity, duration: 0.5 },
                        color: { duration: 0.2 }
                      } : { duration: 0.2 }}
                      className="text-xl sm:text-2xl font-black font-mono leading-none"
                    >
                      0:{timeLeft.toString().padStart(2, '0')}
                    </motion.span>
                 </div>

                 {/* Center Difficulty Pill */}
                 <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DIFFICULTIES[difficulty].color }} />
                    <span className="text-xs font-black text-gray-700">
                      {difficulty === 'easy' 
                        ? (currentLang.translations.diffEasy || DIFFICULTIES[difficulty].label)
                        : difficulty === 'medium'
                        ? (currentLang.translations.diffMedium || DIFFICULTIES[difficulty].label)
                        : (currentLang.translations.diffHard || DIFFICULTIES[difficulty].label)}
                    </span>
                    {difficulty === 'hard' && (
                      <span className="text-[9px] text-red-600 font-bold">
                        {currentLang.translations.avoidBombs || '💣 تجنّب'}
                      </span>
                    )}
                 </div>

                 <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center min-w-[80px]">
                    <div className="flex items-center gap-1 text-gray-500 font-bold mb-0.5">
                      <Trophy size={12} />
                      <span className="text-[9px]">{currentLang.translations.gameScore || 'النقاط'}</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-[#005A2B] font-mono leading-none">
                      {score}
                    </span>
                 </div>
              </div>

              {/* Game Play Area - bubbles strictly float through the middle of the screen */}
              <div className="absolute top-20 bottom-3 left-0 right-0 overflow-hidden">
                <AnimatePresence>
                  {logos.map((logo) => (
                    <motion.div
                      key={logo.id}
                      initial={{ y: 530, scale: 0.25, opacity: 0 }}
                      animate={{ 
                        y: -80, 
                        scale: logo.scale, 
                        opacity: [0, 1, 1, 1, 0]
                      }}
                      exit={{ scale: 1.6, opacity: 0 }}
                      transition={{ 
                        y: { duration: DIFFICULTIES[difficulty].floatDuration, ease: 'linear' },
                        opacity: { duration: DIFFICULTIES[difficulty].floatDuration, times: [0, 0.1, 0.75, 0.95, 1] },
                        scale: { duration: 0.25 }
                      }}
                      onMouseDownCapture={() => popLogo(logo.id)}
                      onTouchStartCapture={() => popLogo(logo.id)}
                      className="absolute cursor-pointer select-none group -translate-x-1/2"
                      style={{ left: `${logo.x}%` }}
                    >
                      {logo.isBomb ? (
                        <div className="relative">
                          <div className="bg-white w-20 h-20 rounded-full border-[4px] border-red-500 shadow-[0_8px_20px_rgba(239,68,68,0.4)] flex flex-col items-center justify-center p-1.5 transition-transform group-active:scale-95 relative overflow-hidden">
                            {/* Glass reflection */}
                            <div className="absolute top-1 left-2 w-7 h-3 bg-white/60 rounded-full rotate-[-30deg] blur-[0.5px] pointer-events-none" />
                            <span className="text-2xl animate-bounce">💣</span>
                            <span className="text-[8px] font-black text-red-600 uppercase bg-red-100 px-1.5 py-0.2 rounded-full mt-0.5 shadow-2xs">
                              {currentLang.translations.bombDeduct || '-2 نقطة'}
                            </span>
                          </div>
                        </div>
                      ) : logo.isSpecial ? (
                        <div className="relative">
                          {(journeyConfig.challengeSpecialBonusImageUrl || journeyConfig.challengeCustomImageUrl) ? (
                            <div className="w-20 h-20 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.55)] flex items-center justify-center p-0 transition-transform group-active:scale-95 relative overflow-hidden bg-gradient-to-b from-amber-200 to-amber-400">
                              <img 
                                src={journeyConfig.challengeSpecialBonusImageUrl || journeyConfig.challengeCustomImageUrl || ''} 
                                alt="Special Target" 
                                className="w-full h-full object-cover filter drop-shadow-sm transition-transform group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              {/* Glass reflection */}
                              <div className="absolute top-1.5 left-2.5 w-8 h-3.5 bg-white/60 rounded-full rotate-[-25deg] blur-[0.5px] pointer-events-none" />
                              
                              <span className="absolute bottom-1 bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 text-[9px] font-black px-2 py-0.5 rounded-full shadow-md z-10 border border-amber-200/80">
                                {difficulty === 'hard' 
                                  ? (currentLang.translations.bonusPointsHard || '+3 بونص ✨') 
                                  : (currentLang.translations.bonusPoints || '+2 بونص ✨')}
                              </span>
                            </div>
                          ) : (
                            <div className="bg-gradient-to-b from-amber-100 via-amber-50 to-yellow-100 w-22 h-22 rounded-full border-[5px] border-amber-400 shadow-[0_10px_25px_rgba(245,158,11,0.5),inset_0_2px_6px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center p-2 transition-transform group-active:scale-95 ring-4 ring-yellow-300/60 relative overflow-hidden">
                              <div className="absolute top-1.5 left-2.5 w-8 h-3.5 bg-white/80 rounded-full rotate-[-25deg] blur-[0.5px] pointer-events-none" />
                              <PandaIcon size={44} customImageUrl={logoUrl} />
                              <span className="text-[8px] font-black text-amber-950 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 px-2 py-0.5 rounded-full -mt-1 shadow-xs border border-amber-400/60">
                                {difficulty === 'hard' 
                                  ? (currentLang.translations.bonusPointsHard || '+3 بونص ✨') 
                                  : (currentLang.translations.bonusPoints || '+2 بونص ✨')}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          {journeyConfig.challengeCustomImageUrl ? (
                            <div className="w-20 h-20 rounded-full shadow-[0_10px_22px_-4px_rgba(0,0,0,0.35)] flex items-center justify-center p-0 transition-transform group-active:scale-95 relative overflow-hidden bg-slate-100">
                              <img 
                                src={journeyConfig.challengeCustomImageUrl} 
                                alt="Challenge Target" 
                                className="w-full h-full object-cover filter drop-shadow-sm transition-transform group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              {/* Glass bubble specular reflection */}
                              <div className="absolute top-1.5 left-2.5 w-7 h-3 bg-white/60 rounded-full rotate-[-25deg] blur-[0.5px] pointer-events-none" />
                            </div>
                          ) : (
                            <div className="bg-gradient-to-b from-white via-white to-emerald-50/70 w-20 h-20 rounded-full border-[4px] border-[#005A2B] shadow-[0_10px_22px_-4px_rgba(0,90,43,0.35),inset_0_2px_5px_rgba(255,255,255,1)] flex items-center justify-center p-2 transition-transform group-active:scale-95 ring-2 ring-emerald-600/20 relative overflow-hidden">
                              <div className="absolute top-1.5 left-2.5 w-7 h-3 bg-white/80 rounded-full rotate-[-25deg] blur-[0.5px] pointer-events-none" />
                              <PandaIcon size={48} customImageUrl={logoUrl} />
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <div className="w-full flex-1 flex flex-col items-center justify-center gap-2.5 my-auto">
                <div className="text-[#E34F26] mt-0.5">
                  <PartyPopper size={44} strokeWidth={1.5} />
                </div>
                
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black border"
                       style={{ 
                         borderColor: DIFFICULTIES[difficulty].color,
                         color: DIFFICULTIES[difficulty].color,
                         backgroundColor: `${DIFFICULTIES[difficulty].color}15` 
                       }}>
                    <span>
                      {currentLang.translations.diffDifficulty || 'مستوى التحدي:'} {
                        difficulty === 'easy' 
                          ? (currentLang.translations.diffEasy || DIFFICULTIES[difficulty].label)
                          : difficulty === 'medium'
                          ? (currentLang.translations.diffMedium || DIFFICULTIES[difficulty].label)
                          : (currentLang.translations.diffHard || DIFFICULTIES[difficulty].label)
                      }
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#005A2B]">
                    {currentLang.translations.timeUpTitle || 'انتهى الوقت!'}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                    <span className="text-gray-700">{currentLang.translations.totalScoreLabel || 'مجموع نقاطك:'}</span>
                    <span className="text-[#E34F26] text-2xl sm:text-3xl font-mono">{score}</span>
                  </div>
                </div>

                {/* Professional Achievement & Score Breakdown Card - fills the empty gap */}
                <div className="w-full max-w-xs bg-gradient-to-b from-amber-50/80 via-slate-50 to-emerald-50/70 border border-amber-200/80 rounded-2xl p-3 shadow-xs text-center space-y-2 my-1">
                  <div className="inline-flex items-center gap-1.5 bg-white border border-amber-300/80 px-2.5 py-0.5 rounded-full text-[11px] font-black text-amber-800 shadow-2xs">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span>
                      {score >= 80 
                        ? (currentLang.translations.perfLegendary || 'أداء أسطوري استثنائي 🚀')
                        : score >= 40 
                        ? (currentLang.translations.perfHero || 'بطل السرعة والتركيز ⚡')
                        : score > 0 
                        ? (currentLang.translations.perfGreat || 'مشاركة رائعة ومميزة 🌟')
                        : (currentLang.translations.perfGood || 'محاولة مشجعة ومميزة 🎯')}
                    </span>
                  </div>

                  {/* 3 Metrics Box */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="bg-white/90 border border-gray-150 rounded-xl p-1.5 shadow-2xs">
                      <span className="text-[10px] text-gray-500 font-bold block">{currentLang.translations.gameScore || 'النقاط'}</span>
                      <span className="text-sm font-black text-[#E34F26]">{score}</span>
                    </div>
                    <div className="bg-white/90 border border-gray-150 rounded-xl p-1.5 shadow-2xs">
                      <span className="text-[10px] text-gray-500 font-bold block">{currentLang.translations.timeMetricLabel || 'الزمن'}</span>
                      <span className="text-sm font-black text-[#005A2B]">{DIFFICULTIES[difficulty].duration} {currentLang.translations.secondsShort || 'ثوانٍ'}</span>
                    </div>
                    <div className="bg-white/90 border border-gray-150 rounded-xl p-1.5 shadow-2xs">
                      <span className="text-[10px] text-gray-500 font-bold block">{currentLang.translations.rewardMetricLabel || 'المكافأة'}</span>
                      <span className="text-sm font-black text-amber-600">{currentLang.translations.rewardDiscountVal || 'خصم 10%'}</span>
                    </div>
                  </div>

                  {/* Instant Reward Qualified Banner */}
                  <div className="bg-emerald-100/80 border border-emerald-300/90 text-emerald-900 rounded-xl p-2 text-center text-xs font-black flex items-center justify-center gap-1.5 shadow-2xs">
                    <Gift size={14} className="text-[#005A2B] shrink-0" />
                    <span>{currentLang.translations.qualifiedForVoucherBanner || 'تأهلت للحصول على قسيمة الخصم الفورية! 🎁'}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundManager.playClick();
                    setStep('voucher_form');
                  }}
                  className="w-full bg-gradient-to-r from-[#E34F26] via-[#ea5a32] to-[#cf421b] text-white py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black shadow-[0_8px_22px_rgba(227,79,38,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] border-t border-white/35 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_12px_28px_rgba(227,79,38,0.45)]"
                >
                  <Gift size={18} className="text-white" />
                  <span>{currentLang.translations.claimVoucherGift || 'استلام القسيمة والهدية'}</span>
                </motion.button>

                <div className="flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setShowLeaderboard(true);
                    }}
                    className="flex-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold py-2.5 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    <Trophy size={13} className="text-amber-600" />
                    <span>{currentLang.translations.leaderboardModalTitle || 'لوحة المتصدرين'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep('challenge_splash');
                    }}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-gray-700 font-bold py-2.5 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    <RotateCcw size={13} />
                    <span>{currentLang.translations.playAgain || 'إعادة التحدي'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'voucher_form' && (
            <motion.div 
              key="voucher_form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <BackButton onClick={handleBackStep} label={currentLang.translations.backBtn} />
              
              <div className="w-full flex flex-col items-center flex-1 justify-center overflow-y-auto custom-scrollbar">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#005A2B] shadow-inner mb-2">
                  <Heart size={24} fill="#005A2B" stroke="none" />
                </div>
                
                <div className="space-y-1 w-full mb-3">
                  <h2 className="text-xl sm:text-2xl font-black text-[#005A2B] flex items-center justify-center gap-1.5">
                    {currentLang.translations.congratsWon || (journeyConfig.voucherCongratsHeading || '🎉 مبروك! لقد ربحت')}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-bold">
                    {currentLang.translations.voucherSubheading || (journeyConfig.voucherCongratsSubtitle || 'هدية فورية تقديراً لمشاركتك في التحدي')}
                  </p>
                </div>

                {/* Voucher Card: Locked initially, Unlocked when all valid! */}
                <div className="w-full mb-3">
                  {!isVoucherUnlocked ? (
                    <motion.div 
                      key="locked-voucher"
                      initial={{ scale: 0.97, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full relative bg-gradient-to-b from-amber-50/70 via-slate-50 to-amber-50/50 border-2 border-dashed border-amber-300 rounded-2xl p-3.5 sm:p-4 text-center shadow-xs overflow-hidden"
                    >
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <div className="w-11 h-11 rounded-2xl bg-amber-100/90 text-amber-700 flex items-center justify-center shadow-inner animate-pulse">
                          <Lock size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                          <span className="font-black text-sm sm:text-base text-gray-800 block">
                            {currentLang.translations.voucherLockedTitle || (journeyConfig.voucherLockedNotice || 'قسيمة الهدية مقفلة 🔐')}
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-500 font-semibold block mt-0.5 max-w-xs mx-auto">
                            {currentLang.translations.voucherLockedInstruction || (journeyConfig.voucherLockedDesc || 'أدخل بياناتك بالأسفل (الاسم ورقم الجوال) لفك القفل واستلام القسيمة فوراً!')}
                          </span>
                        </div>
                        
                        {/* Interactive Requirements Checklist */}
                        <div className="flex items-center justify-center gap-1.5 mt-1.5 flex-wrap">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                            isNameValid ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {isNameValid ? <Check size={11} strokeWidth={3} /> : '○'} {currentLang.translations.nameLabel || 'الاسم'}
                          </span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                            isPhoneValid ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {isPhoneValid ? <Check size={11} strokeWidth={3} /> : '○'} {currentLang.translations.phoneLabel || 'الجوال'} ({customerPhone.length}/9)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* 10% Discount Voucher Card - Unlocked & Revealed */
                    <motion.div 
                      key="unlocked-voucher"
                      initial={{ scale: 0.92, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full relative bg-gradient-to-b from-amber-50 via-white to-amber-50/80 border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 shadow-lg overflow-hidden text-center ring-2 ring-amber-300/50"
                    >
                      <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-0.5 rounded-full text-[11px] font-black shadow-2xs mb-1.5">
                        <Unlock size={12} className="text-emerald-700" />
                        <span>{currentLang.translations.voucherUnlockedTitle || (journeyConfig.voucherUnlockedNotice || 'تم فك قفل قسيمتك بنجاح! 🎁✨')}</span>
                      </div>

                      <div className="flex items-center justify-center gap-3 my-0.5">
                        <span className="text-3xl sm:text-4xl font-black text-[#005A2B] tracking-tight">
                          {journeyConfig.voucherDiscountPercent || '10%'}
                        </span>
                        <div className="flex flex-col text-right">
                          <span className="text-base sm:text-lg font-black text-[#E34F26] leading-none">
                            {currentLang.translations.instantDiscount || (journeyConfig.voucherDiscountTitle || 'خصم فوري')}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 mt-0.5">
                            {getVoucherDiscountSubtitle()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-1 inline-flex items-center gap-1.5 bg-white/95 border border-amber-200 px-2.5 py-0.5 rounded-xl text-[11px]">
                        <span className="text-gray-500 font-bold">{currentLang.translations.validInSection || 'صالح في قسم:'}</span>
                        <span className="font-black text-[#005A2B]">
                          {getVoucherDepartmentDisplay()}
                        </span>
                      </div>

                      <div className="w-full border-t border-dashed border-amber-300/80 my-2" />

                      <div className="flex items-center justify-between px-1 text-[11px]">
                        <span className="font-mono bg-amber-100 text-amber-950 font-black px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1 shadow-2xs">
                          <Ticket size={12} className="text-amber-700" />
                          <span>{getVoucherCodeDisplay()}</span>
                        </span>
                        <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {currentLang.translations.validFor48h || (journeyConfig.voucherValidityText || 'صالح لمدة 48 ساعة ⏳')}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Form Inputs */}
                <div className="space-y-2.5 w-full">
                  {/* 1. Name Input: Letters & spaces only, strictly no numbers */}
                  <div className="relative group">
                    <input 
                      id="customer-input-name"
                      type="text" 
                      value={customerName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      onKeyDown={(e) => {
                        // Prevent numbers 0-9 and Arabic/Eastern numerals from being typed
                        if (/[0-9\u0660-\u0669\u06F0-\u06F9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      placeholder={currentLang.translations.fullNamePlaceholder || (journeyConfig.voucherInputNamePlaceholder || "الاسم بالكامل")}
                      className={`w-full bg-white border-2 rounded-xl py-2.5 sm:py-3 pr-10 pl-10 text-right font-bold text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 transition-all outline-none ${
                        isNameValid 
                          ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/20' 
                          : 'border-amber-200 hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100'
                      }`}
                    />
                    <User className={`absolute top-1/2 right-3 -translate-y-1/2 transition-colors ${isNameValid ? 'text-emerald-600' : 'text-amber-500'}`} size={18} />
                    {isNameValid && (
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-emerald-600 flex items-center gap-0.5 text-xs font-black">
                        <Check size={16} strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  {/* 2. Phone Input: Numbers only, +966 fixed badge, starts with 5, max 9 digits, live counter */}
                  <div className="space-y-1 w-full">
                    <div className={`relative flex items-center rounded-xl border-2 transition-all overflow-hidden bg-white ${
                      isPhoneValid 
                        ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/20' 
                        : phoneWarning 
                          ? 'border-red-400 ring-2 ring-red-100' 
                          : 'border-amber-200 hover:border-amber-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100'
                    }`}>
                      {/* Fixed Saudi Flag & Code Badge */}
                      <div className="bg-slate-100 border-l border-slate-200 px-2.5 py-2.5 sm:py-3 flex items-center gap-1 select-none shrink-0" dir="ltr">
                        <span className="text-base leading-none">🇸🇦</span>
                        <span className="text-xs font-black text-gray-700">+966</span>
                      </div>

                      <input 
                        id="customer-input-phone"
                        type="tel"
                        inputMode="numeric"
                        value={customerPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={currentLang.translations.phonePlaceholder || "5XXXXXXXX (9 أرقام)"}
                        maxLength={9}
                        className="w-full bg-transparent py-2.5 sm:py-3 px-3 text-right font-bold text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                        dir="ltr"
                      />

                      {/* Interactive Counter & Status */}
                      <div className="pl-3 pr-2 flex items-center gap-1.5 shrink-0 select-none">
                        {isPhoneValid ? (
                          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check size={13} strokeWidth={3} />
                            <span>9/9</span>
                          </span>
                        ) : (
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-full transition-colors ${
                            phoneWarning ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {customerPhone.length}/9
                          </span>
                        )}
                        <Phone className={`transition-colors ${isPhoneValid ? 'text-emerald-600' : 'text-amber-500'}`} size={17} />
                      </div>
                    </div>

                    {phoneWarning && (
                      <div className="flex items-center gap-1 text-[11px] font-black text-red-600 px-1 text-right">
                        <AlertCircle size={13} />
                        <span>{phoneWarning}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action Button - positioned down nicely to eliminate empty gap */}
              <motion.button
                disabled={!isVoucherUnlocked}
                whileHover={isVoucherUnlocked ? { scale: 1.02 } : {}}
                whileTap={isVoucherUnlocked ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (!isVoucherUnlocked) return;
                  soundManager.playClick();
                  setStep('feedback');
                }}
                animate={isVoucherUnlocked ? {
                  scale: [1, 1.02, 1],
                  boxShadow: ["0px 6px 14px rgba(227, 79, 38, 0.25)", "0px 10px 22px rgba(227, 79, 38, 0.4)", "0px 6px 14px rgba(227, 79, 38, 0.25)"]
                } : {}}
                transition={isVoucherUnlocked ? {
                  scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                  boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                } : {}}
                className={`w-full py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black transition-all flex items-center justify-center gap-2 mt-4 border-t border-white/35 shadow-[0_8px_22px_rgba(227,79,38,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] ${
                  isVoucherUnlocked
                    ? 'bg-gradient-to-r from-[#E34F26] via-[#ea5a32] to-[#cf421b] hover:shadow-[0_12px_28px_rgba(227,79,38,0.45)] text-white cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-none shadow-none'
                }`}
              >
                <span>{isVoucherUnlocked ? (currentLang.translations.claimGiftNow || (journeyConfig.voucherSubmitButtonText || 'استلام الهدية الآن')) : (currentLang.translations.completeFieldsToUnlock || 'أكمل البيانات أعلاه لفك قفل القسيمة')}</span>
                {isVoucherUnlocked ? <Gift size={18} /> : <Lock size={16} />}
              </motion.button>
            </motion.div>
          )}

          {step === 'feedback' && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-4 sm:p-5 min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <BackButton onClick={handleBackStep} label={currentLang.translations.backBtn} />
              
              <div className="w-full flex-1 flex flex-col justify-center gap-2 sm:gap-2.5 max-w-sm mx-auto">
                {(() => {
                  const localizedFeedback = getFeedbackTitleAndSubtitle(journeyConfig.businessType, currentLangCode);
                  const fTitle = (currentLangCode === 'ar' && journeyConfig.feedbackTitle) 
                    ? journeyConfig.feedbackTitle 
                    : localizedFeedback.title;
                  const fSub = (currentLangCode === 'ar' && journeyConfig.feedbackSubtitle) 
                    ? journeyConfig.feedbackSubtitle 
                    : localizedFeedback.subtitle;
                  return (
                    <div className="text-center space-y-0.5 mt-0.5">
                      <h2 className="text-lg sm:text-xl font-black text-[#004A26]">
                        {fTitle}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                        {fSub}
                      </p>
                    </div>
                  );
                })()}
                
                {/* 1. سؤال نظافة وترتيب المكان */}
                {journeyConfig.surveyQuestions?.cleanliness?.isEnabled !== false && (
                  <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2.5 text-right space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-black text-gray-800">
                      <span className="flex items-center gap-1.5">
                        <span className="text-sm">
                          {journeyConfig.businessType === 'cafe' ? '🛋️' : journeyConfig.businessType === 'restaurant' ? '🧼' : '🧹'}
                        </span>
                        <span>
                          {getSurveyQuestionTranslated(
                            'cleanliness',
                            journeyConfig.businessType,
                            currentLangCode,
                            journeyConfig.surveyQuestions?.cleanliness?.titleAr,
                            journeyConfig.surveyQuestions?.cleanliness?.titleEn
                          )}
                        </span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        {cleanlinessRating === 'great' ? '🤩 ' : cleanlinessRating === 'good' ? '😊 ' : cleanlinessRating === 'normal' ? '😐 ' : '☹️ '}
                        {getRatingLabel(cleanlinessRating as any, currentLangCode, false)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { id: 'great', emoji: '🤩', label: getRatingLabel('great', currentLangCode, false) },
                        { id: 'good', emoji: '😊', label: getRatingLabel('good', currentLangCode, false) },
                        { id: 'normal', emoji: '😐', label: getRatingLabel('normal', currentLangCode, false) },
                        { id: 'bad', emoji: '☹️', label: getRatingLabel('bad', currentLangCode, false) },
                      ].map((item) => {
                        const isSelected = cleanlinessRating === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              soundManager.playClick();
                              setCleanlinessRating(item.id);
                            }}
                            className={`py-1 px-1 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                              isSelected 
                                ? 'bg-[#005A2B] text-white border-[#005A2B] shadow-xs' 
                                : 'bg-white text-gray-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-sm block">{item.emoji}</span>
                            <span className="text-[9px] block truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. سؤال سرعة وتعامل موظفي المكان */}
                {journeyConfig.surveyQuestions?.staff?.isEnabled !== false && (
                  <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-2.5 text-right space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-black text-gray-800">
                      <span className="flex items-center gap-1.5">
                        <span className="text-sm">
                          {journeyConfig.businessType === 'cafe' ? '☕' : journeyConfig.businessType === 'restaurant' ? '🧑‍🍳' : '👨‍💼'}
                        </span>
                        <span>
                          {getSurveyQuestionTranslated(
                            'staff',
                            journeyConfig.businessType,
                            currentLangCode,
                            journeyConfig.surveyQuestions?.staff?.titleAr,
                            journeyConfig.surveyQuestions?.staff?.titleEn
                          )}
                        </span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        {staffRating === 'great' ? '🤩 ' : staffRating === 'good' ? '😊 ' : staffRating === 'normal' ? '😐 ' : '☹️ '}
                        {getRatingLabel(staffRating as any, currentLangCode, false)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { id: 'great', emoji: '🤩', label: getRatingLabel('great', currentLangCode, false) },
                        { id: 'good', emoji: '😊', label: getRatingLabel('good', currentLangCode, false) },
                        { id: 'normal', emoji: '😐', label: getRatingLabel('normal', currentLangCode, false) },
                        { id: 'bad', emoji: '☹️', label: getRatingLabel('bad', currentLangCode, false) },
                      ].map((item) => {
                        const isSelected = staffRating === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              soundManager.playClick();
                              setStaffRating(item.id);
                            }}
                            className={`py-1 px-1 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                              isSelected 
                                ? 'bg-[#005A2B] text-white border-[#005A2B] shadow-xs' 
                                : 'bg-white text-gray-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-sm block">{item.emoji}</span>
                            <span className="text-[9px] block truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. التقييم العام للمشروع والزيارة */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between text-xs font-black text-gray-800 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-amber-500">
                        {journeyConfig.businessType === 'cafe' ? '☕' : journeyConfig.businessType === 'restaurant' ? '🍽️' : '⭐'}
                      </span>
                      <span>
                        {getSurveyQuestionTranslated(
                          'overall',
                          journeyConfig.businessType,
                          currentLangCode,
                          journeyConfig.surveyQuestions?.overall?.titleAr,
                          journeyConfig.surveyQuestions?.overall?.titleEn
                        )}
                      </span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      {getUIString('tapToSubmit', currentLangCode)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                    {[
                      { id: 'great', emoji: '🤩', label: getRatingLabel('great', currentLangCode, true) },
                      { id: 'good', emoji: '😊', label: getRatingLabel('good', currentLangCode, true) },
                      { id: 'normal', emoji: '😐', label: getRatingLabel('normal', currentLangCode, true) },
                      { id: 'bad', emoji: '☹️', label: getRatingLabel('bad', currentLangCode, true) },
                    ].map((item) => {
                      const isSelected = (rating === item.id) || (overallRating === item.id);
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            soundManager.playClick();
                            setRating(item.id);
                            setOverallRating(item.id);
                            // Auto advance after 750ms as requested by user (بدون زر تأكيد)
                            setTimeout(() => {
                              handleFeedbackSubmit(item.id, cleanlinessRating, staffRating, item.id);
                            }, 750);
                          }}
                          className={`w-full py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 cursor-pointer select-none transition-all relative overflow-hidden ${
                            isSelected 
                              ? 'border-2 border-[#005A2B] bg-gradient-to-b from-emerald-50 via-white to-green-50 shadow-md ring-2 ring-[#005A2B]/20' 
                              : 'border border-slate-200 hover:border-emerald-300 bg-white shadow-2xs hover:shadow-sm'
                          }`}
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <span className={`font-black text-xs ${isSelected ? 'text-[#005A2B]' : 'text-gray-800'}`}>
                            {item.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Auto-advance status banner instead of confirm button */}
                {overallRating ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-2 flex items-center justify-center gap-2 text-emerald-800 text-xs font-black bg-emerald-50/95 border border-emerald-200/90 rounded-2xl shadow-2xs mt-0.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>{getUIString('ratingRecorded', currentLangCode)}</span>
                  </motion.div>
                ) : (
                  <div className="w-full py-0.5 text-center text-[10px] font-bold text-gray-400">
                    {getUIString('selectOverallPrompt', currentLangCode)}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'thank_you' && (
             <motion.div 
              key="thank_you"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              className="w-full max-w-md mx-auto space-y-4 pb-8"
            >
              {/* Card 1: Existing Customer Thank You Card (كرت الشكر والتقدير الأساسي) */}
              <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-7 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="w-full flex-1 flex flex-col items-center justify-center gap-3.5 my-auto">
                {brandSettings.logoUrl ? (
                  <div className="w-16 h-16 p-2 bg-white rounded-2xl shadow-md border border-emerald-100 flex items-center justify-center mt-0.5">
                    <img 
                      src={brandSettings.logoUrl} 
                      alt="Store Logo" 
                      className="w-full h-full object-contain rounded-xl" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                ) : (
                  <div className="text-5xl mt-0.5">😊</div>
                )}

                {/* Personalized Customer Name Card in large, interactive beautiful typography - Only name and smile emoji as requested */}
                {customerName ? (
                  <motion.div 
                    initial={{ scale: 0.85, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="w-full max-w-xs bg-gradient-to-b from-emerald-50 via-white to-amber-50/70 border-2 border-emerald-400/60 rounded-3xl p-3.5 shadow-md text-center relative overflow-hidden"
                  >
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full mb-1.5 border border-emerald-300/60">
                      <Sparkles size={12} className="text-amber-500 animate-pulse" />
                      <span>{currentLang.translations.dearCustomerBadge || 'عميلنا العزيز والمميز'}</span>
                      <Sparkles size={12} className="text-amber-500 animate-pulse" />
                    </div>

                    {/* Customer Name and Smile Emoji - ONLY name and smile emoji */}
                    <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-[#005A2B] tracking-wide my-1 py-0.5 drop-shadow-2xs">
                      <bdi>{customerName}</bdi>
                      <span className="text-2xl sm:text-3xl select-none inline-block hover:scale-110 transition-transform" role="img" aria-label="smiling face">😊</span>
                    </div>

                    <div className="mt-1 text-[10px] sm:text-[11px] text-gray-500 font-bold">
                      {currentLang.translations.voucherConfirmedNotice || 'تم تأكيد هديتك وقسيمة الخصم بنجاح 🎁✨'}
                    </div>
                  </motion.div>
                ) : null}
                
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-xl font-black text-[#004A26] leading-tight max-w-sm mx-auto">
                      {customerName ? (
                        (() => {
                          const template = currentLang.translations.thankYouPersonalized || 'شكراً لك يا {name}! سعدنا جداً بمشاركتك معنا';
                          if (template.includes('{name}')) {
                            const parts = template.split('{name}');
                            return (
                              <span>
                                {parts[0]}
                                <bdi className="inline-block text-[#005A2B]">{customerName}</bdi>
                                {parts[1]}
                              </span>
                            );
                          }
                          return template;
                        })()
                      ) : (
                        currentLang.translations.thankYouHeading || 'شكراً لك على مشاركتك في تطوير خدماتنا'
                      )}
                  </h2>
                  
                  <div className="space-y-0.5">
                      <p className="text-sm sm:text-base font-black text-[#E34F26]">
                        {journeyConfig.businessType === 'cafe'
                          ? (currentLangCode === 'en' ? 'Enjoy the finest coffee & sweets on every visit ☕' : (journeyConfig.thankYouSubheading || 'استمتع بأشهى كوب قهوة وحلى في كل زيارة ☕'))
                          : journeyConfig.businessType === 'restaurant'
                          ? (currentLangCode === 'en' ? 'Wishing you delicious dishes & joyful moments always 🍽️' : (journeyConfig.thankYouSubheading || 'نتمنى لكم دائماً أشهى الوجبات وأطيب الأوقات 🍽️'))
                          : (currentLang.translations.funShoppingPanda || (currentLangCode === 'en' ? `Enjoyable shopping with ${brandSettings.brandNameEn || 'Panda'}, not to be missed` : `تسوق ممتع مع ${brandSettings.brandNameAr || 'بنده'} لا يفوّت`))}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-400 font-bold">
                        {currentLang.translations.alwaysHappyServe || 'نسعد دائماً بخدمتك في كل زيارة!'}
                      </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                      <Sparkles key={i} className="text-orange-400" size={18} />
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Loyalty Card (كرت الولاء بعد كرت الشكر مباشرة) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full"
            >
              <CustomerLoyaltyCardsEndSection
                customerName={customerName}
                isEnglish={currentLangCode === 'en'}
                activeBusinessType={journeyConfig.businessType}
                showSectorSwitcher={false}
              />
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('welcome')}
                className="w-full bg-gradient-to-r from-[#E34F26] via-[#ea5a32] to-[#cf421b] text-white py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black shadow-[0_8px_22px_rgba(227,79,38,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] border-t border-white/35 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_12px_28px_rgba(227,79,38,0.45)]"
              >
                <span>{currentLang.translations.backToHome || 'العودة للرئيسية'}</span>
              </motion.button>
            </motion.div>
          )}

          {step === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full space-y-8"
            >
              {/* Notification Banner */}
              <AnimatePresence>
                {exportNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#005A2B] text-white px-6 py-3.5 rounded-2xl shadow-lg flex items-center justify-between text-sm font-bold border border-green-700"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-300" />
                      <span>{exportNotice}</span>
                    </div>
                    <button 
                      onClick={() => setExportNotice(null)} 
                      className="text-white/80 hover:text-white text-xs bg-white/10 px-2 py-1 rounded-lg cursor-pointer"
                    >
                      إغلاق
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dashboard Top Header & Quick Action Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="bg-green-100 p-3.5 rounded-2xl text-[#005A2B]">
                      <Sparkles size={28} />
                   </div>
                   <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-800">لوحة المراقبة الذكية وإدارة الآراء</h2>
                    <p className="text-gray-400 text-sm font-medium">البيانات المباشرة، التصدير، وتفاعل المتسوقين</p>
                   </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    id="export-csv-btn"
                    onClick={handleExportCSV}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    title="تصدير بصيغة Excel CSV مع دعم كامل للعربية"
                  >
                    <FileSpreadsheet size={16} />
                    <span>تصدير Excel (CSV)</span>
                  </button>

                  <button 
                    id="export-json-btn"
                    onClick={handleExportJSON}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="تصدير كملف JSON"
                  >
                    <FileJson size={16} />
                    <span>تصدير JSON</span>
                  </button>

                  <button 
                    id="copy-summary-btn"
                    onClick={handleCopySummary}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="نسخ ملخص الآراء إلى الحافظة"
                  >
                    <Copy size={16} />
                    <span>نسخ الملخص</span>
                  </button>

                  <button 
                    onClick={() => {
                      soundManager.playClick();
                      setShowLeaderboard(true);
                    }}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Trophy size={16} className="text-amber-600" />
                    <span>المتصدرين</span>
                  </button>

                  <button 
                    onClick={() => {
                      soundManager.playClick();
                      setStep('welcome');
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-2xl font-black text-xs transition-all border border-red-100 cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { 
                    label: 'إجمالي التقييمات', 
                    value: feedbacks.length.toString(), 
                    trend: `${feedbacks.length} استجابة مسجلة`, 
                    up: true 
                  },
                  { 
                    label: 'نسبة الرضا الإيجابي', 
                    value: feedbacks.length > 0 
                      ? `${Math.round((feedbacks.filter(f => f.rating === 'great' || f.rating === 'good').length / feedbacks.length) * 100)}٪`
                      : '٩٤٪', 
                    trend: 'انطباع ممتاز', 
                    up: true 
                  },
                  { 
                    label: 'متوسط نقاط اللعبة', 
                    value: feedbacks.length > 0 
                      ? Math.round(feedbacks.reduce((acc, f) => acc + (f.score || 0), 0) / feedbacks.length).toString()
                      : '١٨', 
                    trend: 'تفاعل حماسي', 
                    up: true 
                  },
                  { 
                    label: 'أعلى مستوى مشارك', 
                    value: difficulty === 'hard' ? 'محترف 🔥' : difficulty === 'medium' ? 'متوسط ⚡' : 'سهل 🟢', 
                    trend: 'المستوى الحالي', 
                    up: true 
                  },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[30px] flex flex-col items-center gap-2 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-2 h-full bg-[#005A2B]/15 group-hover:bg-[#005A2B]/30 transition-all" />
                    <span className="text-4xl font-black text-gray-800 tracking-tight">{stat.value}</span>
                    <span className="text-sm font-bold text-gray-500">{stat.label}</span>
                    <div className="mt-1 px-3 py-1 rounded-full text-xs font-black bg-green-50 text-green-700 border border-green-100">
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedbacks Export & Live Records Section */}
              <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-2.5 rounded-2xl text-[#E34F26]">
                      <Download size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-800">سجل آراء وتقييمات العملاء المباشرة</h3>
                      <p className="text-xs text-gray-400 font-medium">بيانات حية وموثقة جاهزة للتصدير والتحليل</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                      {feedbacks.length} تقييم مسجل
                    </span>
                    <button
                      onClick={handleExportCSV}
                      className="bg-[#005A2B] hover:bg-[#004722] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <FileSpreadsheet size={15} />
                      <span>تصدير CSV للـ Excel</span>
                    </button>
                  </div>
                </div>

                {/* Feedbacks Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold">
                        <th className="pb-3 px-3">العميل</th>
                        <th className="pb-3 px-3">التقييم</th>
                        <th className="pb-3 px-3">القسم المفضل</th>
                        <th className="pb-3 px-3">المنتجات المختارة</th>
                        <th className="pb-3 px-3">نقاط اللعبة</th>
                        <th className="pb-3 px-3">التاريخ والوقت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {feedbacks.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-3">
                            <div className="font-black text-gray-800">{item.customerName || 'عميل بنده'}</div>
                            <div className="text-[11px] text-gray-400 font-mono">{item.customerPhone || 'غير مسجل'}</div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-gray-50 border border-gray-200 text-gray-700">
                              {item.ratingLabel}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-gray-600 text-xs">
                            {item.section || item.preference || 'عام'}
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {item.selectedProducts && item.selectedProducts.length > 0 ? (
                                item.selectedProducts.slice(0, 3).map((prod, pIdx) => (
                                  <span key={pIdx} className="text-[10px] bg-green-50 text-green-800 px-2 py-0.5 rounded-md font-bold">
                                    {prod}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-gray-400 font-medium">-</span>
                              )}
                              {item.selectedProducts && item.selectedProducts.length > 3 && (
                                <span className="text-[10px] text-gray-400 font-bold">
                                  +{item.selectedProducts.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="font-black text-[#005A2B]">{item.score || 0} نقطة</div>
                            <div className="text-[10px] text-gray-400">
                              {item.difficulty === 'hard' ? 'محترف 🔥' : item.difficulty === 'medium' ? 'متوسط ⚡' : 'سهل 🟢'}
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-xs text-gray-400 font-medium">
                            {item.timestamp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics & Product Popularity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Ratings Breakdown */}
                <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[40px] border border-gray-100 shadow-xl relative">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-2xl font-black text-gray-800">توزيع التقييمات</h3>
                     <Star size={26} className="text-yellow-400 animate-pulse" />
                  </div>

                  <div className="space-y-6">
                    {[
                      { 
                        emoji: '🤩', 
                        label: 'رائع جداً',
                        count: feedbacks.filter(f => f.rating === 'great').length, 
                        color: 'bg-[#005A2B]' 
                      },
                      { 
                        emoji: '😊', 
                        label: 'جيد',
                        count: feedbacks.filter(f => f.rating === 'good').length, 
                        color: 'bg-blue-400' 
                      },
                      { 
                        emoji: '😐', 
                        label: 'عادي',
                        count: feedbacks.filter(f => f.rating === 'normal').length, 
                        color: 'bg-orange-400' 
                      },
                      { 
                        emoji: '☹️', 
                        label: 'سيء',
                        count: feedbacks.filter(f => f.rating === 'bad' || f.rating === 'very_bad').length, 
                        color: 'bg-red-400' 
                      },
                    ].map((row, i) => {
                      const total = feedbacks.length || 1;
                      const percent = Math.round((row.count / total) * 100);
                      return (
                        <div key={i} className="flex items-center gap-4">
                          <span className="text-2xl filter drop-shadow-xs">{row.emoji}</span>
                          <span className="text-xs font-black text-gray-600 w-16">{row.label}</span>
                          <div className="flex-1 bg-gray-50 h-4 rounded-full overflow-hidden border border-gray-100 p-0.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percent}%` }}
                              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                              className={`${row.color} h-full rounded-full shadow-inner`} 
                            />
                          </div>
                          <span className="text-xs font-black text-gray-500 w-8 text-left">{percent}%</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 font-bold text-xs">إجمالي الآراء في النظام</p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                         <span className="text-3xl font-black text-[#005A2B]">{feedbacks.length}</span>
                         <span className="text-sm font-bold text-gray-400">تقييم موثق</span>
                      </div>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="text-xs font-black text-[#005A2B] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Download size={14} />
                      <span>تصدير فوري</span>
                    </button>
                  </div>
                </div>

                {/* Popular Products Row Section */}
                <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[40px] border border-gray-100 shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-2xl font-black text-gray-800">الأقسام والمنتجات الأكثر اختياراً</h3>
                     <div className="bg-orange-50 px-3 py-1.5 rounded-xl text-[#E34F26] font-black text-xs">شائع الآن 🔥</div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: 'خضار وفواكه طازجة', percent: 84, color: 'bg-[#005A2B]' },
                      { label: 'لحوم ودواجن', percent: 68, color: 'bg-[#E34F26]' },
                      { label: 'ألبان وأجبان صفا', percent: 58, color: 'bg-blue-400' },
                      { label: 'سناك ومخبوزات', percent: 49, color: 'bg-yellow-500' },
                      { label: 'منظفات وعناية منزلية', percent: 36, color: 'bg-purple-400' },
                    ].map((row, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between mb-2 px-1">
                           <span className="text-sm font-black text-gray-700">{row.label}</span>
                           <span className="text-sm font-black text-gray-400">{row.percent}%</span>
                        </div>
                        <div className="bg-gray-50 h-4 rounded-full overflow-hidden border border-gray-100 p-0.5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${row.percent}%` }}
                            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                            className={`${row.color} h-full rounded-full opacity-90 group-hover:opacity-100 transition-opacity`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        entries={leaderboard}
        currentDifficulty={difficulty}
        translations={currentLang.translations}
        dir={currentLang.dir}
      />

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.5,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{ 
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className={`absolute rounded-full blur-2xl ${
              i % 3 === 0 ? 'bg-green-100' : i % 3 === 1 ? 'bg-orange-50' : 'bg-yellow-50'
            }`}
            style={{ 
              width: Math.random() * 300 + 100, 
              height: Math.random() * 300 + 100 
            }}
          />
        ))}
      </div>
      <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-green-50 rounded-full blur-3xl -z-10 opacity-50" />
      <div className="fixed -top-20 -right-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl -z-10 opacity-50" />
      </div>

      <ToastNotification
        toasts={toasts}
        onDismiss={dismissToast}
        isEnglish={currentLangCode === 'en'}
      />
    </div>
  );
}
