import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  Sparkles, 
  Brain, 
  AlertTriangle, 
  Flame, 
  Smartphone, 
  ArrowRight, 
  ArrowLeft,
  ArrowUp,
  CheckCircle2, 
  Layers, 
  Star, 
  Copy, 
  ExternalLink, 
  X, 
  LayoutDashboard,
  Store,
  TrendingUp,
  Share2,
  Gift,
  MapPin,
  FileSpreadsheet,
  Clock,
  Gamepad2,
  Languages,
  ShieldCheck,
  BarChart3,
  Users,
  Target,
  ShoppingBasket,
  Award,
  Zap,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Send,
  MessageCircle,
  Phone,
  Mail,
  Building2,
  Coffee,
  Utensils,
  Percent,
  ThumbsUp,
  Palette,
  Type
} from 'lucide-react';
import { BrandSettings } from '../types';
import { PandaIcon } from './PandaIcon';
import { soundManager } from '../utils/audio';
import { OPEN_COLOR_PALETTES, getPaletteById, ColorPalette } from '../utils/theme';
import { ThemeColorSelector } from './ThemeColorSelector';
import { FontSelectorModal } from './FontSelectorModal';
import { getFontById, getStoredFontId, applyFontToDocument } from '../utils/fonts';

interface ShowcaseLandingViewProps {
  brandSettings: BrandSettings;
  onSaveBrandSettings?: (updated: BrandSettings) => void;
  onNavigateToDashboard: () => void;
  onNavigateToGame: () => void;
  onOpenBrandModal: () => void;
  currentLangCode: string;
  onSelectLanguage: (code: string) => void;
  totalFeedbacksCount?: number;
  averageRating?: number;
  currentFontId?: string;
  onSelectFont?: (fontId: string) => void;
}

export const ShowcaseLandingView: React.FC<ShowcaseLandingViewProps> = ({
  brandSettings,
  onSaveBrandSettings,
  onNavigateToDashboard,
  onNavigateToGame,
  onOpenBrandModal,
  currentLangCode,
  onSelectLanguage,
  totalFeedbacksCount = 842,
  averageRating = 4.9,
  currentFontId,
  onSelectFont,
}) => {
  const isEnglish = currentLangCode === 'en';
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [internalFontId, setInternalFontId] = useState<string>(() => {
    return currentFontId || brandSettings.fontFamilyId || getStoredFontId();
  });

  const activeFontId = currentFontId || internalFontId;
  const currentFont = getFontById(activeFontId);

  const handleSelectFontInternal = (fontId: string) => {
    setInternalFontId(fontId);
    applyFontToDocument(fontId);
    if (onSelectFont) {
      onSelectFont(fontId);
    } else if (onSaveBrandSettings) {
      onSaveBrandSettings({ ...brandSettings, fontFamilyId: fontId });
    }
  };
  
  // Accordion state for FAQ from Image 2
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // VIP Booking Form State from Image 2
  const [businessName, setBusinessName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [businessType, setBusinessType] = useState('Fine Dining');
  const [phoneContact, setPhoneContact] = useState('');
  const [selectedPlanName, setSelectedPlanName] = useState('المطاعم الفاخرة والبيسترو');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Interactive Pricing State from Image 1
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanId, setSelectedPlanId] = useState<'boutique' | 'bistro' | 'chains'>('bistro');
  const [showComparisonMatrix, setShowComparisonMatrix] = useState(false);

  // Keep screen strictly fixed in place when language changes
  const scrollPosRef = useRef<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      const pos = window.scrollY || document.documentElement.scrollTop || 0;
      scrollPosRef.current = pos;
      setShowScrollTop(pos > 320);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const scrollToTop = () => {
    soundManager.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    if (scrollPosRef.current > 0) {
      window.scrollTo({ top: scrollPosRef.current, left: 0, behavior: 'instant' });
      const timerA = setTimeout(() => {
        window.scrollTo({ top: scrollPosRef.current, left: 0, behavior: 'instant' });
      }, 30);
      const timerB = setTimeout(() => {
        window.scrollTo({ top: scrollPosRef.current, left: 0, behavior: 'instant' });
      }, 80);
      return () => {
        clearTimeout(timerA);
        clearTimeout(timerB);
      };
    }
  }, [currentLangCode]);

  const handleLanguageChangeWithoutMoving = (newLang: string) => {
    const currentPos = window.scrollY || document.documentElement.scrollTop || scrollPosRef.current || 0;
    soundManager.playClick();
    onSelectLanguage(newLang);

    const anchorScroll = () => {
      window.scrollTo({ top: currentPos, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = currentPos;
      if (document.body) document.body.scrollTop = currentPos;
    };

    anchorScroll();
    requestAnimationFrame(anchorScroll);
    setTimeout(anchorScroll, 20);
    setTimeout(anchorScroll, 60);
    setTimeout(anchorScroll, 120);
  };

  const bookingFormRef = useRef<HTMLDivElement>(null);

  // =========================================================================
  // DYNAMIC OPEN COLOR PALETTE SYNCHRONIZATION WITH DASHBOARD & STORE
  // =========================================================================
  const activePalette: ColorPalette = getPaletteById(brandSettings?.colorPaletteId);
  const primaryColor = brandSettings?.customPrimaryColor || activePalette.primary;
  const accentColor = activePalette.accent;
  const secondaryColor = activePalette.secondary;

  const brandName = isEnglish 
    ? (brandSettings.brandNameEn || 'Panda') 
    : (brandSettings.brandNameAr || 'بنده');

  const headerRibbonRef = useRef<HTMLDivElement>(null);

  const handleHeaderWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (headerRibbonRef.current) {
      if (Math.abs(e.deltaY) > 0) {
        headerRibbonRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    soundManager.playPop();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const scrollToBooking = (planName?: string) => {
    if (planName) {
      setSelectedPlanName(planName);
    }
    soundManager.playPop();
    bookingFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !workEmail.trim()) {
      return;
    }
    setIsSubmitting(true);
    soundManager.playPop();

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
      const generatedCode = `VIP-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingCode(generatedCode);
      soundManager.playVictory();
    }, 900);
  };

  // =========================================================================
  // 1. SERVICES DESIGNED TO EXCITE THE CLIENT AND MAKE THEM BUY & CONTACT US
  // =========================================================================
  const clientEnticingServices = [
    {
      id: 'google-maps',
      icon: Star,
      color: 'from-amber-500 to-orange-500',
      badgeLabel: isEnglish ? 'High Growth' : 'الأكثر طلباً',
      title: isEnglish ? 'Google Maps 5-Star Reviews Engine' : 'خدمة مضاعفة تقييمات خرائط جوجل 5 نجوم',
      tagline: isEnglish ? 'Automatically turn satisfied customers into verified 5-star public reviews' : 'تحويل تلقائي لانطباعات عملائك إلى تقييمات موثقة 5 نجوم',
      description: isEnglish
        ? 'Detects enthusiastic customers instantly and prompts them with one click to publish their positive feedback on Google Maps, skyrocketing your local search ranking and driving floods of new walk-in clients.'
        : 'نظام ذكي يكتشف عملائك الراضين ويوجههم بضغطة زر واحدة إلى صفحة متجرك أو نشاطك على خرائط جوجل، مما يضاعف تقييماتك العامة 5x ويجعل علامتك تتصدر نتائج البحث وتجذب آلاف العملاء الجدد أسبوعياً.',
      features: isEnglish 
        ? ['4x-6x more 5-star Google reviews monthly', 'Negative review filtering & internal recovery', 'Boost local Google Maps ranking', '+40% surge in new walk-in customers']
        : ['مضاعفة تقييمات جوجل 5 نجوم تلقائياً', 'تصفية الملاحظات السلبية لمعالجتها فوراً', 'رفع ترتيب المطعم والمتجر في خرائط جوجل', 'زيادة توافد الزبائن الجدد بأكثر من 40%'],
      actionLabel: isEnglish ? 'Book VIP Demo' : 'احجز عرض توضيحي VIP',
      action: () => scrollToBooking(isEnglish ? 'Google Maps 5-Star Multiplier' : 'مضاعفة تقييمات خرائط جوجل')
    },
    {
      id: 'survey',
      icon: ShoppingBasket,
      color: 'from-orange-500 to-rose-500',
      badgeLabel: isEnglish ? 'Proven +92%' : 'معدل إكمال 92%',
      title: isEnglish ? 'Interactive Cart & Visual Survey Experience' : 'خدمة استبيان سلة التسوق التفاعلية',
      tagline: isEnglish ? 'Intuitive Apple-like UI with over 92% survey completion rate' : 'واجهة بصرية جذابة ترفع معدل إكمال الاستبيان إلى أكثر من 92%',
      description: isEnglish
        ? 'Replaces tedious long questionnaires with a visual, cart-building survey. Shoppers tap their favorite dishes or store aisles and express ratings with joyful micro-interactions in under 30 seconds.'
        : 'استبدال الاستبيانات الورقية والإلكترونية الجافة بتجربة بصرية فريدة ممتعة تشبه تطبيقات الجوال الفاخرة؛ حيث يختار المتسوق أطباقه أو أقسامه المفضلة في أقل من 30 ثانية.',
      features: isEnglish 
        ? ['Fluid 3D-touch cart builder', 'Completed in under 30 seconds', 'Zero-friction QR scan on any phone', 'Pinpoint taste & quality sentiment analysis']
        : ['سلة مشتريات تفاعلية بلمسات حركية', 'اكتمال فوري في أقل من 30 ثانية', 'دعم كامل لكافة الجوالات عبر QR', 'قياس دقيق للمشاعر وجودة الخدمة'],
      actionLabel: isEnglish ? 'Try Interactive Survey' : 'تجربة الاستبيان الحي الآن',
      action: onNavigateToGame
    },
    {
      id: 'gamification',
      icon: Gamepad2,
      color: 'from-amber-500 to-yellow-500',
      badgeLabel: isEnglish ? 'Customer Joy' : 'ولاء ومكافآت',
      title: isEnglish ? 'Gamified Challenges & Mystery Rewards' : 'خدمة ألعاب التحدي والمكافآت الترويجية',
      tagline: isEnglish ? 'Mystery boxes & fortune spins boost repeat customer visits by +34%' : 'الصناديق السرية وعجلة الحظ لرفع ولاء عملائك وتكرار الزيارات',
      description: isEnglish
        ? 'Turns feedback into an exciting celebration. Customers catch falling items, open mystery reward boxes, and win instant dining and shopping vouchers that motivate higher basket sizes and repeat visits.'
        : 'تحويل ملء الاستبيان إلى لعبة احتفالية مشوقة يخوضها المتسوق لالتقاط المنتجات وفتح الصناديق السرية وربح قسائم تسوق فورية تدفعه لزيادة قيمة فاتورته والعودة للشراء مجدداً.',
      features: isEnglish 
        ? ['3 exciting difficulty tiers (Easy/Med/Pro)', 'Instant vouchers boosting basket size by +28%', 'Hall of fame leaderboard engagement', 'Celebratory confetti & audio thrill']
        : ['3 مستويات تحدي حماسية (سهل، متوسط، محترف)', 'قسائم فورية تزيد سلة الشراء بنسبة +28%', 'لوحة شرف للمتسوقين المتميزين', 'احتفالات بالكونفيتي ومؤثرات صوتية محفزة'],
      actionLabel: isEnglish ? 'Play Interactive Challenge' : 'خوض التحدي التفاعلي',
      action: onNavigateToGame
    },
    {
      id: 'pos-integration',
      icon: Zap,
      color: 'from-emerald-500 to-teal-500',
      badgeLabel: isEnglish ? 'POS Integration' : 'ربط الكاشير',
      title: isEnglish ? 'Direct Cashier & POS System Integration' : 'خدمة الربط المباشر مع الكاشير POS',
      tagline: isEnglish ? 'Link customer reviews directly to receipt items, shift times & staff' : 'ربط تقييم عملائك مباشرة بالطلب أو الخدمة المحددة في الفاتورة',
      description: isEnglish
        ? 'Integrates seamlessly with Foodics, Odoo, Revel, and leading cloud POS systems. Ties customer ratings to order items, kitchen prep speed, and staff performance in real-time.'
        : 'تكامل مباشر مع أشهر أنظمة نقاط البيع والكاشير السحابية (فودكس، أودو، ريفيل وغيرها) لربط تقييم عملائك برقم الفاتورة، وتحديد المنتجات الأكثر ربحية بدقة متناهية.',
      features: isEnglish 
        ? ['Live sync with POS receipt items', 'Detect preparation delays instantly', 'Identify highest-margin winning products', 'Measure individual staff & shift ratings']
        : ['ربط فوري مع فواتير الكاشير وأنظمة POS', 'كشف مباشر لأي تأخير في التحضير أو الخدمة', 'تصنيف المنتجات الأكثر مبيعاً والأعلى تقييماً', 'قياس كفاءة كل موظف في الصالة'],
      actionLabel: isEnglish ? 'Request Direct POS Link' : 'طلب الربط والتكامل المباشر',
      action: () => scrollToBooking(isEnglish ? 'POS Integration' : 'الربط المباشر مع الكاشير POS')
    },
    {
      id: 'rush-hours',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      badgeLabel: isEnglish ? 'Smart AI' : 'ذكاء اصطناعي',
      title: isEnglish ? 'Peak Hour Intelligence & Queue Management' : 'خدمة استخبارات الأعمال وتنبيهات أوقات الذروة',
      tagline: isEnglish ? 'Detect bottlenecks & convert rush hours into upsell revenue' : 'كشف فترات الضغط وطوابير الكاشير وتحويلها لفرص بيع إضافية',
      description: isEnglish
        ? 'Intelligent AI algorithms track hourly traffic flow, forecast queue bottlenecks, and alert managers to optimize staffing, eliminate customer waiting times, and maximize hourly sales.'
        : 'خوارزميات ذكية ترصد ساعات الذروة الصباحية والمسائية، وتمنحك تنبيهات مبكرة لتوزيع طاقم العمل وتخفيض وقت انتظار عملائك ورفع متوسط إنفاق العميل بنسبة 28%.',
      features: isEnglish 
        ? ['24-hour visual traffic timeline', 'Proactive rush hour bottleneck alerts', 'Instant actionable revenue upsell tips', 'Peak-time customer satisfaction tracking']
        : ['خط زمني تفاعلي لحركة الزوار 24 ساعة', 'تنبيهات استباقية قبل بدء الازدحام', 'توصيات فورية لزيادة المبيعات في أوقات الهدوء', 'مراقبة رضا العملاء أثناء فترات الضغط'],
      actionLabel: isEnglish ? 'See How To Double Revenue' : 'اكتشف كيف تضاعف مبيعاتك',
      action: () => scrollToBooking(isEnglish ? 'Peak Hour Intelligence' : 'استخبارات أوقات الذروة')
    },
    {
      id: 'customer-retention',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      badgeLabel: isEnglish ? 'Revenue Engine' : 'زيادة الأرباح',
      title: isEnglish ? 'Customer Lifetime Value & Sales Multiplier' : 'خدمة زيادة المبيعات ومضاعفة ولاء العملاء',
      tagline: isEnglish ? 'Convert first-time shoppers into loyal clients returning every week' : 'تحويل العميل العابر إلى عميل مخلص يكرر زيارته أسبوعياً',
      description: isEnglish
        ? 'Automated retention engine that collects verified customer sentiment and brings 62% of participants back within 7 days using targeted personalized incentives, generating substantial monthly revenue.'
        : 'منظومة متكاملة لجمع بيانات وانطباعات المتسوقين وبناء ولاء مستدام عبر مكافآت مخصصة تشجع 62% من عملائك على العودة خلال 7 أيام، مما يحقق زيادة مباشرة وملموسة في الأرباح.',
      features: isEnglish 
        ? ['+34% proven increase in repeat visits', 'Valuable, growing customer database', 'Smart automated re-engagement triggers', 'Proven ROI that pays for itself many times over']
        : ['زيادة تكرار الزيارات بنسبة +34% مثبتة', 'بناء قاعدة بيانات عملاء ذهبية متنامية', 'إشعارات ترويجية ذكية تزيد متوسط الإنفاق', 'عوائد استثمارية قياسية تعوض تكلفة النظام أضعافاً'],
      actionLabel: isEnglish ? 'Contact Sales & Get System' : 'تواصل مع فريق المبيعات واطلب النظام',
      action: () => scrollToBooking(isEnglish ? 'Customer Retention & Revenue' : 'مضاعفة المبيعات والولاء')
    }
  ];

  return (
    <div 
      dir={isEnglish ? 'ltr' : 'rtl'} 
      className="min-h-screen bg-[#07080B] text-white font-sans selection:text-white relative overflow-x-hidden"
    >
      {/* ========================================================================= */}
      {/* DYNAMIC AMBIENT BACKGROUND GLOWS TIED TO SELECTED OPEN PALETTE */}
      {/* ========================================================================= */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] blur-[140px] pointer-events-none -z-10 transition-all duration-700" 
        style={{ 
          background: `radial-gradient(circle, ${primaryColor}28 0%, ${accentColor}15 50%, transparent 75%)` 
        }}
      />
      <div 
        className="absolute top-[600px] right-0 w-[550px] h-[550px] blur-[160px] pointer-events-none -z-10 transition-all duration-700" 
        style={{ 
          background: `radial-gradient(circle, ${secondaryColor}22 0%, ${primaryColor}10 50%, transparent 70%)` 
        }}
      />
      <div 
        className="absolute top-[1300px] left-0 w-[550px] h-[550px] blur-[160px] pointer-events-none -z-10 transition-all duration-700" 
        style={{ 
          background: `radial-gradient(circle, ${primaryColor}20 0%, ${accentColor}12 45%, transparent 70%)` 
        }}
      />
      <div 
        className="absolute top-[2200px] right-0 w-[600px] h-[600px] blur-[180px] pointer-events-none -z-10 transition-all duration-700" 
        style={{ 
          background: `radial-gradient(circle, ${accentColor}20 0%, ${primaryColor}12 50%, transparent 70%)` 
        }}
      />

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR - Fixed Left Corner on All Languages */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07080B]/85 border-b border-white/[0.08] px-3 sm:px-8 py-2.5 sm:py-3.5 transition-all" dir="ltr">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand & Platform title (Anchored in Left Corner) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/[0.06] border flex items-center justify-center p-1 sm:p-1.5 transition-all overflow-hidden shadow-inner shrink-0"
                style={{ borderColor: `${primaryColor}40` }}
              >
                {brandSettings.logoUrl ? (
                  <img 
                    src={brandSettings.logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <PandaIcon size={20} />
                )}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-xs sm:text-sm font-black tracking-tight text-white whitespace-nowrap">
                    {brandName} CX
                  </span>
                  <span 
                    className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black text-white leading-none shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                  >
                    PRO
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium whitespace-nowrap hidden sm:block">
                  {isEnglish ? 'AI Customer Experience Platform' : 'منصة تجربة العملاء بالذكاء الاصطناعي'}
                </p>
              </div>
            </div>
          </div>

          {/* Smooth Scrollable Header Ribbon (No Zoom, Silky-Smooth Mouse-Scrollable Ribbon) */}
          <div 
            ref={headerRibbonRef}
            onWheel={handleHeaderWheel}
            className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 shrink max-w-[58vw] sm:max-w-[72vw] md:max-w-[76vw] lg:max-w-none select-none"
            dir="ltr"
          >
            {/* Quick Anchor Links (Desktop) */}
            <nav className="hidden 2xl:flex items-center gap-5 text-xs font-bold text-gray-400 shrink-0 mr-1">
              <a href="#project-services" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap py-1">
                {isEnglish ? 'Services' : 'الخدمات المميزة'}
              </a>
              <a href="#comprehensive-features" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap py-1">
                {isEnglish ? 'Comprehensive Features' : 'المزايا الشاملة'}
              </a>
              <a href="#pricing-plans" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap py-1">
                {isEnglish ? 'Pricing Plans' : 'الباقات والاشتراكات'}
              </a>
              <a href="#testimonials" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap py-1">
                {isEnglish ? 'Client Stories' : 'آراء العملاء'}
              </a>
              <a href="#faq" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap py-1">
                {isEnglish ? 'FAQ' : 'الأسئلة الشائعة'}
              </a>
            </nav>

            {/* Direct Palette Synchronization & Customizer Button (No Zoom) */}
            <button
              onClick={() => {
                soundManager.playPop();
                setShowPaletteModal(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-bold text-gray-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
              title={isEnglish ? 'Synchronize Theme Colors' : 'تنسيق ألوان الواجهة والمنصة'}
            >
              <div className="flex items-center gap-0.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: primaryColor }} />
                <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20" style={{ backgroundColor: accentColor }} />
              </div>
              <Palette size={13} style={{ color: accentColor }} className="shrink-0" />
              <span className="hidden xl:inline text-[11px] font-bold whitespace-nowrap">
                {isEnglish ? activePalette.nameEn : activePalette.nameAr}
              </span>
            </button>

            {/* Direct Font Selector Button (No Zoom) */}
            <button
              onClick={() => {
                soundManager.playPop();
                setShowFontModal(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-bold text-gray-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
              title={isEnglish ? 'Select & Change UI Font' : 'تغيير وتخصيص خط الواجهة'}
            >
              <Type size={13} style={{ color: accentColor }} className="shrink-0" />
              <span className="text-[11px] font-bold whitespace-nowrap">
                {isEnglish ? currentFont.nameEn.split('(')[0].trim() : currentFont.nameAr.split('(')[0].trim()}
              </span>
            </button>

            {/* Language Switcher with Screen Position Persistence (No Zoom) */}
            <button
              onClick={() => handleLanguageChangeWithoutMoving(isEnglish ? 'ar' : 'en')}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-bold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>🌐</span>
              <span className="whitespace-nowrap">{isEnglish ? 'العربية' : 'English'}</span>
            </button>

            {/* Mobile Experience Button - Direct Entry into Mobile Customer Experience */}
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigateToGame();
              }}
              className="bg-white/[0.08] hover:bg-white/[0.16] text-white px-3 sm:px-3.5 py-2 rounded-full font-black text-xs flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              style={{ borderColor: `${primaryColor}50` }}
              title={isEnglish ? 'Enter Mobile Customer Experience' : 'الدخول المباشر إلى تجربة العميل بالجوال'}
            >
              <Smartphone size={14} style={{ color: accentColor }} className="shrink-0" />
              <span className="hidden md:inline whitespace-nowrap">{isEnglish ? 'Live Customer Survey' : 'تجربة العميل بالجوال'}</span>
              <span className="md:hidden whitespace-nowrap">{isEnglish ? 'Survey' : 'الجوال'}</span>
            </button>

            {/* Primary Book VIP Demo button with synchronized gradient & shadow (No Zoom) */}
            <button
              onClick={() => scrollToBooking()}
              className="text-white px-3.5 sm:px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:brightness-95 whitespace-nowrap shrink-0"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 8px 24px -4px ${primaryColor}60`
              }}
            >
              <Sparkles size={14} className="shrink-0" />
              <span className="whitespace-nowrap">{isEnglish ? 'Book VIP Demo' : 'احجز عرض توضيحي'}</span>
            </button>

            {/* Subtle Admin Link */}
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigateToDashboard();
              }}
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.12] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shrink-0"
              title={isEnglish ? 'Dashboard' : 'لوحة التحكم'}
            >
              <LayoutDashboard size={14} />
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-10 sm:pb-16 px-3 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Top Pill Badge with synchronized palette styling */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-black mb-4 sm:mb-6 shadow-sm border transition-all"
            style={{ 
              backgroundColor: `${primaryColor}18`,
              borderColor: `${primaryColor}45`,
              color: accentColor 
            }}
          >
            <Sparkles size={14} className="animate-pulse" style={{ color: accentColor }} />
            <span>{isEnglish ? 'Ultra Smooth & Fast with AI 2.0' : 'الجيل القادم من أنظمة تجربة العملاء بالذكاء الاصطناعي'}</span>
          </motion.div>

          {/* Main Headline with synchronized theme gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-[1.2] mb-4 sm:mb-6 text-white"
          >
            {isEnglish ? (
              <>
                Turn Customer Impressions into the{' '}
                <span 
                  className="bg-clip-text text-transparent transition-all"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Biggest Engine for Revenue Growth
                </span>
              </>
            ) : (
              <>
                حوّل انطباعات وتقييمات عملائك إلى{' '}
                <span 
                  className="bg-clip-text text-transparent transition-all"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  أكبر محرك لنمو مبيعاتك وأرباحك
                </span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 text-balance"
          >
            {isEnglish
              ? 'Replace boring questionnaires with a captivating interactive mobile journey for your customers, celebratory instant rewards, Google Maps 5-star synchronization, and direct POS integrations.'
              : 'استبدل الاستبيانات التقليدية المملة بتجربة تفاعلية ساحرة لعملائك على الجوال، مع ألعاب المكافآت الترويجية، ومضاعفة تقييمات جوجل ماب 5 نجوم تلقائياً، والربط المباشر مع الكاشير.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mb-10 sm:mb-16"
          >
            {/* Primary VIP CTA */}
            <button
              onClick={() => scrollToBooking()}
              className="w-full sm:w-auto flex-1 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:brightness-110 active:brightness-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 14px 34px -6px ${primaryColor}60`
              }}
            >
              <span>{isEnglish ? 'Book Free VIP Demo' : 'احجز عرضك التوضيحي VIP مجاناً'}</span>
              {isEnglish ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}
            </button>

            {/* Secondary Live Interactive Demo CTA - Direct Entry */}
            <button
              onClick={() => {
                soundManager.playClick();
                onNavigateToGame();
              }}
              className="w-full sm:w-auto flex-1 bg-[#10121A] hover:bg-[#181B26] text-gray-200 hover:text-white border px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-white/30"
              style={{ borderColor: `${primaryColor}40` }}
            >
              <Smartphone size={17} style={{ color: accentColor }} />
              <span>{isEnglish ? 'Try Live Experience' : 'جرب استبيان العميل فوراً'}</span>
            </button>
          </motion.div>

          {/* 4 Hero Stats Cards (Luxurious Two-Tone Numbers & Texts) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-4xl">
            <div 
              className="bg-[#0E1017] border rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:border-white/20 shadow-sm"
              style={{ borderColor: `${primaryColor}40` }}
            >
              <div className="flex items-baseline justify-center tracking-tight mb-1 font-black text-xl sm:text-3xl md:text-4xl">
                <span className="text-white">94</span>
                <span style={{ color: accentColor }} className="drop-shadow-sm font-black">.8%</span>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-400 font-bold group-hover:text-gray-300 transition-colors">
                {isEnglish ? 'Customer Satisfaction Rate' : 'متوسط رضا المتسوقين وعملائك'}
              </span>
            </div>

            <div 
              className="bg-[#0E1017] border border-white/[0.08] hover:border-white/25 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group transition-all shadow-sm"
            >
              <div className="flex items-baseline justify-center tracking-tight mb-1 font-black text-xl sm:text-3xl md:text-4xl">
                <span className="text-white">4.8</span>
                <span style={{ color: primaryColor }} className="text-lg sm:text-2xl font-black ml-0.5">x</span>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-400 font-bold group-hover:text-gray-300 transition-colors">
                {isEnglish ? 'Higher Completion Rate' : 'أعلى في نسبة إكمال الاستبيان'}
              </span>
            </div>

            <div 
              className="bg-[#0E1017] border rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:border-white/20 shadow-sm"
              style={{ borderColor: `${secondaryColor}40` }}
            >
              <div className="flex items-baseline justify-center tracking-tight mb-1 font-black text-xl sm:text-3xl md:text-4xl">
                <span style={{ color: secondaryColor }} className="text-lg sm:text-2xl font-black mr-0.5">+</span>
                <span className="text-white">34</span>
                <span style={{ color: secondaryColor }} className="font-black">%</span>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-400 font-bold group-hover:text-gray-300 transition-colors">
                {isEnglish ? 'Surge in Repeat Visits' : 'زيادة مؤكدة في تكرار الزيارة'}
              </span>
            </div>

            <div 
              className="bg-[#0E1017] border border-white/[0.08] hover:border-white/25 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-center flex flex-col items-center justify-center relative overflow-hidden group transition-all shadow-sm"
            >
              <div className="flex items-baseline justify-center tracking-tight mb-1 font-black text-xl sm:text-3xl md:text-4xl">
                <span style={{ color: accentColor }} className="text-lg sm:text-2xl font-black mr-0.5">&gt; </span>
                <span className="text-white">1.2</span>
                <span style={{ color: accentColor }} className="text-xl sm:text-2xl font-black">M</span>
              </div>
              <span className="text-[11px] sm:text-xs text-gray-400 font-bold group-hover:text-gray-300 transition-colors">
                {isEnglish ? 'Monthly QR Scans & Interactions' : 'تفاعل ومسح QR شهرياً'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. REPLACED SERVICES SECTION (Customer-Facing & Exciting to Buy & Contact) */}
      {/* ========================================================================= */}
      <section id="project-services" className="py-20 px-4 sm:px-8 border-t border-white/[0.06] bg-[#07080B] relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black mb-3 border transition-all"
              style={{ 
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}40`,
                color: accentColor 
              }}
            >
              <Flame size={13} style={{ color: accentColor }} />
              <span>{isEnglish ? 'Premium Growth Solutions' : 'حلول وخدمات مضاعفة المبيعات'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
              {isEnglish ? (
                <>
                  <span className="text-white">6 High-Impact Services to </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    Elevate Your Brand & Boost Sales
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">6 خدمات رائدة </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    لتحويل كل زائر إلى عميل مخلص ومضاعفة إيراداتك
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
              {isEnglish
                ? 'Discover the comprehensive growth ecosystem engineered to boost customer satisfaction, multiply 5-star reviews, and scale your business effortlessly.'
                : 'اكتشف المنظومة المتكاملة المصممة خصيصاً لعملك وتجارتك ومتاجرك لمضاعفة التقييمات، وتخفيض طوابير الانتظار، وتحقيق أقصى عائد مالي.'}
            </p>
          </div>

          {/* Interactive Exciting Service Cards Grid (6 Services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientEnticingServices.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div 
                  key={srv.id}
                  className="bg-[#0E1017] border border-white/[0.08] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all group relative overflow-hidden shadow-xl hover:-translate-y-1"
                  style={{
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                  }}
                >
                  <div>
                    {/* Header: Icon and Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${srv.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComp size={20} />
                      </div>
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-black border"
                        style={{ 
                          backgroundColor: `${primaryColor}15`,
                          borderColor: `${primaryColor}40`,
                          color: accentColor 
                        }}
                      >
                        {srv.badgeLabel}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white mb-1 transition-colors group-hover:text-amber-300">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-bold mb-3" style={{ color: accentColor }}>
                      {srv.tagline}
                    </p>
                    <p className="text-xs text-gray-400 font-normal leading-relaxed mb-5">
                      {srv.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-3 border-t border-white/[0.06] mb-5">
                      {srv.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-300 font-medium">
                          <Check size={12} className="shrink-0" style={{ color: accentColor }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action button: Excites and invites the client to book or preview */}
                  <button
                    onClick={srv.action}
                    className="w-full bg-white/[0.05] hover:bg-white/[0.12] text-gray-200 hover:text-white border border-white/10 hover:border-white/20 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-102"
                  >
                    <span>{srv.actionLabel}</span>
                    {isEnglish ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 1 FROM IMAGE 1 (1.jpeg): حزمة المزايا الشاملة */}
      {/* ========================================================================= */}
      <section id="comprehensive-features" className="py-20 px-4 sm:px-8 border-t border-white/[0.06] bg-[#0A0C11]/80 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Heading matching Image 1 */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black mb-3 border transition-all"
              style={{ 
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}40`,
                color: accentColor 
              }}
            >
              <span>{isEnglish ? 'Comprehensive Feature Suite' : 'حزمة المزايا الشاملة'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              {isEnglish ? (
                <>
                  <span className="text-white">Everything Your Brand Needs </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    to Drive Customer Impressions
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">كل ما تحتاجه علامتك التجارية </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    لقيادة انطباعات العملاء
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* 6 Bento Grid Feature Cards matching Image 1 (Two-Tone Card Titles) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. منشئ استبيانات بالذكاء الاصطناعي */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0E1017] border border-white/[0.08] hover:border-purple-500/40 rounded-3xl p-6 sm:p-7 transition-all group shadow-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-950/40 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:scale-105 transition-transform">
                <Brain size={19} />
              </div>
              <h3 className="text-base font-black mb-2 transition-colors">
                <span className="text-white">{isEnglish ? 'AI Survey ' : 'منشئ استبيانات '}</span>
                <span className="text-purple-400 group-hover:text-purple-300">{isEnglish ? 'Generator' : 'بالذكاء الاصطناعي'}</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {isEnglish
                  ? 'Describe your business, store, or trade concept to the AI, and it will generate custom QR surveys, questions, and codes ready to deploy immediately.'
                  : 'صف مفهوم عملك أو تجارتك للذكاء الاصطناعي، ليولد لك استبياناً مخصصاً ورموز QR جاهزة للتطبيق.'}
              </p>
            </motion.div>

            {/* 2. مكافآت تفاعلية بالقرعة */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0E1017] border border-white/[0.08] hover:border-rose-500/40 rounded-3xl p-6 sm:p-7 transition-all group shadow-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-950/40 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20 group-hover:scale-105 transition-transform">
                <Gift size={19} />
              </div>
              <h3 className="text-base font-black mb-2 transition-colors">
                <span className="text-white">{isEnglish ? 'Interactive ' : 'مكافآت تفاعلية '}</span>
                <span className="text-rose-400 group-hover:text-rose-300">{isEnglish ? 'Lucky Draw Rewards' : 'بالقرعة والجوائز'}</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {isEnglish
                  ? 'Opening mystery boxes, spinning the wheel of fortune, and scratch cards turn participation into a genuine moment of celebration.'
                  : 'فتح الصناديق السرية، ودوران عجلة الحظ، وبطاقات الحك تحول المشاركة إلى لحظة احتفال حقيقية.'}
              </p>
            </motion.div>

            {/* 3. واجهات جوال فائقة الأناقة */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0E1017] border border-white/[0.08] hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 transition-all group shadow-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-950/40 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Smartphone size={19} />
              </div>
              <h3 className="text-base font-black mb-2 transition-colors">
                <span className="text-white">{isEnglish ? 'Ultra-Elegant ' : 'واجهات جوال '}</span>
                <span className="text-amber-400 group-hover:text-amber-300">{isEnglish ? 'Mobile Interfaces' : 'فائقة الأناقة'}</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {isEnglish
                  ? 'Refined micro-interactions and animations give your customers an enchanting experience akin to immersive Apple apps.'
                  : 'رسومات وتفاعلات حركية متقنة تمنح عملائك تجربة ساحرة تشبه تطبيقات أبل الفاخرة.'}
              </p>
            </motion.div>

            {/* 4. الربط المباشر مع الكاشير POS */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0E1017] border border-white/[0.08] hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 transition-all group shadow-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-950/40 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Zap size={19} />
              </div>
              <h3 className="text-base font-black mb-2 transition-colors">
                <span className="text-white">{isEnglish ? 'Direct POS ' : 'الربط المباشر '}</span>
                <span className="text-amber-400 group-hover:text-amber-300">{isEnglish ? 'Cashier Integration' : 'مع الكاشير POS'}</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {isEnglish
                  ? 'Integrate point-of-sale systems to link customer evaluations directly to the specific item or service listed in the receipt.'
                  : 'ربط أنظمة نقاط البيع لربط تقييم عملائك مباشرة بالطلب أو الخدمة المحددة في الفاتورة.'}
              </p>
            </motion.div>

            {/* 5. مزامنة تقييمات خرائط جوجل */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0E1017] border border-white/[0.08] hover:border-blue-500/40 rounded-3xl p-6 sm:p-7 transition-all group shadow-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-950/40 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20 group-hover:scale-105 transition-transform">
                <Star size={19} />
              </div>
              <h3 className="text-base font-black mb-2 transition-colors">
                <span className="text-white">{isEnglish ? 'Google Maps ' : 'مزامنة تقييمات '}</span>
                <span className="text-blue-400 group-hover:text-blue-300">{isEnglish ? 'Review Boost' : 'خرائط جوجل'}</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {isEnglish
                  ? 'Automatically convert 5-star ratings into public reviews on Google Maps with a single tap from the customer.'
                  : 'تحويل تقييمات 5 نجوم تلقائياً إلى مراجعات عامة على خرائط جوجل بضغطة زر واحدة من العميل.'}
              </p>
            </motion.div>

            {/* 6. مقارنة أداء الفروع المتعددة */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#0E1017] border border-white/[0.08] hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 transition-all group shadow-sm cursor-default"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <TrendingUp size={19} />
              </div>
              <h3 className="text-base font-black mb-2 transition-colors">
                <span className="text-white">{isEnglish ? 'Multi-Branch ' : 'مقارنة أداء '}</span>
                <span className="text-emerald-400 group-hover:text-emerald-300">{isEnglish ? 'Branch Comparison' : 'الفروع المتعددة'}</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {isEnglish
                  ? 'Compare satisfaction scores and customer sentiment between main branch, marina, airport, and mall outlets from a unified dashboard.'
                  : 'قارن مؤشر الرضا والانطباع بين الفرع الرئيسي وفروع مارينا والمطار والمجمعات من لوحة موحدة.'}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 2 FROM IMAGE 1 (1.jpeg): باقات اشتراك شفافة - INTERACTIVE SHOWCASE */}
      {/* ========================================================================= */}
      <section id="pricing-plans" className="py-20 px-4 sm:px-8 border-t border-white/[0.06] bg-[#07080B] relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Heading matching Image 1 */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black mb-3 border transition-all"
              style={{ 
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}40`,
                color: accentColor 
              }}
            >
              <span>{isEnglish ? 'Transparent Subscription Plans' : 'باقات اشتراك شفافة'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              {isEnglish ? (
                <>
                  <span className="text-white">Flexible Plans for Your Business, </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    Trade, and Multi-Location Groups
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">خطط مرنة لعملك أو تجارتك </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    والمجموعات المتعددة
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-xl mx-auto">
              {isEnglish
                ? 'Choose the plan tailored to your business scale with complete transparency and zero hidden fees'
                : 'اختر الخطة المصممة لحجم تجارتك ونشاطك مع شفافية تامة وبدون أي رسوم خفية'}
            </p>
          </div>

          {/* Interactive Billing Switcher (Monthly vs Annual with -20% Discount) */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#0E1017] border border-white/[0.08] p-1.5 rounded-2xl flex items-center gap-2 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setBillingCycle('monthly');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isEnglish ? 'Monthly Billing' : 'الدفع الشهري'}
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playPop();
                  setBillingCycle('annual');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={billingCycle === 'annual' ? {
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                } : {}}
              >
                <span>{isEnglish ? 'Annual Billing' : 'الدفع السنوي'}</span>
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {isEnglish ? 'Save 20%' : 'وفّر 20%'}
                </span>
              </button>
            </div>
          </div>

          {/* 3 Interactive Pricing Cards Grid matching Image 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            
            {/* Plan 1: المحمصة والمقهى البوتيك / لعملك وتجارتك الواعدة */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => {
                soundManager.playClick();
                setSelectedPlanId('boutique');
              }}
              className={`border rounded-3xl p-7 flex flex-col justify-between transition-all cursor-pointer relative ${
                selectedPlanId === 'boutique'
                  ? 'bg-[#121520] border-amber-500/60 shadow-xl'
                  : 'bg-[#0E1017] border-white/[0.08] hover:border-white/25'
              }`}
            >
              {selectedPlanId === 'boutique' && (
                <div className="absolute -top-3 right-6 bg-amber-500 text-black text-[10px] font-black px-3 py-0.5 rounded-full shadow-md">
                  {isEnglish ? 'Selected' : 'تم اختيارها'}
                </div>
              )}

              <div>
                <h3 className="text-xl font-black mb-1">
                  <span className="text-white">{isEnglish ? 'Boutique Roastery ' : 'المحمصة والمقهى '}</span>
                  <span className="text-amber-400">{isEnglish ? '& Cafe' : 'البوتيك'}</span>
                </h3>
                <p className="text-xs text-gray-400 font-medium mb-6">
                  {isEnglish ? 'For your business, trade, and boutique retail locations' : 'لعملك أو تجارتك الواعدة والمتاجر المختصة'}
                </p>

                {/* Interactive Price in Two-Tone */}
                <div className="flex items-baseline gap-1.5 mb-2 pb-2">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">$</span>
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {billingCycle === 'annual' ? '119' : '149'}
                  </span>
                  <span className="text-xs font-bold text-amber-200/70">
                    {isEnglish ? '/ month' : '/ شهر'}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 mb-6 pb-4 border-b border-white/[0.06]">
                  {billingCycle === 'annual' 
                    ? (isEnglish ? 'Billed annually ($1,428/yr - Save $360)' : 'تدفع سنوياً 1,428$ (توفر 360$)')
                    : (isEnglish ? 'Billed monthly, cancel anytime' : 'فاتورة شهرية مرنة، يمكنك الإلغاء بأي وقت')}
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Up to 2 branches or outlets' : 'حتى فرعين أو نقطتي بيع'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? '1,500 QR scans monthly' : 'شهرياً QR مسح 1,500'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Interactive food, beverage & product UI' : 'واجهة تفاعلية ممتعة للمنتجات والخدمات'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Scratch cards & instant customer rewards' : 'بطاقات الحك ومكافآت العملاء'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToBooking(isEnglish ? `Boutique Roastery & Cafe (${billingCycle === 'annual' ? '$119/mo' : '$149/mo'})` : `المحمصة والمقهى البوتيك (${billingCycle === 'annual' ? '119$ شهرياً' : '149$ شهرياً'})`);
                }}
                className="w-full bg-white/[0.06] hover:bg-white/[0.14] text-white py-3.5 rounded-2xl text-xs font-black transition-all border border-white/10 cursor-pointer shadow-sm hover:scale-102"
              >
                {isEnglish ? '14-Day Free Trial' : 'تجربة مجانية لمدة 14 يوماً'}
              </button>
            </motion.div>

            {/* Plan 2: المطاعم الفاخرة والبيسترو (الأكثر طلباً واختياراً - Synchronized with Theme Palette) */}
            <motion.div 
              whileHover={{ y: -8 }}
              onClick={() => {
                soundManager.playClick();
                setSelectedPlanId('bistro');
              }}
              className="rounded-3xl p-7 flex flex-col justify-between transition-all relative lg:-translate-y-2 border-2 cursor-pointer"
              style={{ 
                borderColor: primaryColor,
                background: selectedPlanId === 'bistro'
                  ? `linear-gradient(180deg, ${primaryColor}28 0%, #0E1017 100%)`
                  : `linear-gradient(180deg, ${primaryColor}18 0%, #0E1017 100%)`,
                boxShadow: `0 20px 45px -10px ${primaryColor}40`
              }}
            >
              
              {/* Featured Badge */}
              <div 
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[11px] font-black px-4 py-0.5 rounded-full shadow-md whitespace-nowrap"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                {isEnglish ? 'Most Popular & Requested' : 'الأكثر طلباً واختياراً'}
              </div>

              <div>
                <h3 className="text-xl font-black mb-1 mt-1">
                  <span className="text-white">{isEnglish ? 'Fine Dining ' : 'المطاعم الفاخرة '}</span>
                  <span style={{ color: accentColor }}>{isEnglish ? '& Bistro' : 'والبيسترو'}</span>
                </h3>
                <p className="text-xs font-medium mb-6" style={{ color: accentColor }}>
                  {isEnglish ? 'For upscale restaurants, cafes and growing enterprises' : 'المطاعم الراقية والبيسترو العصري وتجارتك المتنامية'}
                </p>

                {/* Interactive Price in Two-Tone */}
                <div className="flex items-baseline gap-1.5 mb-2 pb-2">
                  <span className="text-2xl sm:text-3xl font-black" style={{ color: accentColor }}>$</span>
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {billingCycle === 'annual' ? '239' : '299'}
                  </span>
                  <span className="text-xs font-bold text-gray-300">
                    {isEnglish ? '/ month' : '/ شهر'}
                  </span>
                </div>
                <div className="text-[11px] text-gray-300 mb-6 pb-4 border-b border-white/[0.08]">
                  {billingCycle === 'annual' 
                    ? (isEnglish ? 'Billed annually ($2,868/yr - Save $720)' : 'تدفع سنوياً 2,868$ (توفر 720$)')
                    : (isEnglish ? 'Billed monthly, full flexibility' : 'فاتورة شهرية، إمكانية الترقية أو الإلغاء فوراً')}
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                    <CheckCircle2 size={16} className="shrink-0" style={{ color: accentColor }} />
                    <span>{isEnglish ? 'Up to 5 branches' : 'حتى 5 فروع'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                    <CheckCircle2 size={16} className="shrink-0" style={{ color: accentColor }} />
                    <span>{isEnglish ? 'Unlimited QR customer scans' : 'مسح غير محدود لعملائك'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                    <CheckCircle2 size={16} className="shrink-0" style={{ color: accentColor }} />
                    <span>{isEnglish ? 'Complete AI analysis decision cards' : 'كروت تحليل الذكاء الاصطناعي الكاملة'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                    <CheckCircle2 size={16} className="shrink-0" style={{ color: accentColor }} />
                    <span>{isEnglish ? 'Mystery boxes & fortune wheel engine' : 'الصناديق السرية وعجلة الحظ'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                    <CheckCircle2 size={16} className="shrink-0" style={{ color: accentColor }} />
                    <span>{isEnglish ? 'Direct POS cashier integration' : 'POS ربط أنظمة نقاط البيع'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToBooking(isEnglish ? `Fine Dining & Bistro (${billingCycle === 'annual' ? '$239/mo' : '$299/mo'})` : `المطاعم الفاخرة والبيسترو (${billingCycle === 'annual' ? '239$ شهرياً' : '299$ شهرياً'})`);
                }}
                className="w-full text-white py-3.5 rounded-2xl text-xs font-black cursor-pointer transition-all hover:scale-102"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  boxShadow: `0 12px 30px -5px ${primaryColor}60`
                }}
              >
                {isEnglish ? 'Subscribe Now' : 'اشترك الآن'}
              </button>
            </motion.div>

            {/* Plan 3: سلاسل الفروع الكبرى */}
            <motion.div 
              whileHover={{ y: -6 }}
              onClick={() => {
                soundManager.playClick();
                setSelectedPlanId('chains');
              }}
              className={`border rounded-3xl p-7 flex flex-col justify-between transition-all cursor-pointer relative ${
                selectedPlanId === 'chains'
                  ? 'bg-[#121520] border-purple-500/60 shadow-xl'
                  : 'bg-[#0E1017] border-white/[0.08] hover:border-white/25'
              }`}
            >
              {selectedPlanId === 'chains' && (
                <div className="absolute -top-3 right-6 bg-purple-500 text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md">
                  {isEnglish ? 'Selected' : 'تم اختيارها'}
                </div>
              )}

              <div>
                <h3 className="text-xl font-black mb-1">
                  <span className="text-white">{isEnglish ? 'Major Branch ' : 'سلاسل الفروع '}</span>
                  <span className="text-purple-400">{isEnglish ? 'Chains' : 'الكبرى'}</span>
                </h3>
                <p className="text-xs text-gray-400 font-medium mb-6">
                  {isEnglish ? 'For regional hospitality, retail chains & commercial enterprises' : 'السلاسل الإقليمية والشركات التجارية وسلاسل الفروع'}
                </p>

                {/* Interactive Price in Two-Tone */}
                <div className="flex items-baseline gap-1.5 mb-2 pb-2">
                  <span className="text-2xl sm:text-3xl font-black text-purple-400">$</span>
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {billingCycle === 'annual' ? '479' : '599'}
                  </span>
                  <span className="text-xs font-bold text-purple-200/70">
                    {isEnglish ? '/ month' : '/ شهر'}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 mb-6 pb-4 border-b border-white/[0.06]">
                  {billingCycle === 'annual' 
                    ? (isEnglish ? 'Billed annually ($5,748/yr - Save $1,440)' : 'تدفع سنوياً 5,748$ (توفر 1,440$)')
                    : (isEnglish ? 'Billed monthly with dedicated support' : 'فاتورة شهرية مع مدير حساب مخصص')}
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Unlimited branches across all regions' : 'فروع غير محدودة في كافة المناطق'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Custom fine-tuned AI model' : 'تعديل مخصص لنموذج الذكاء الاصطناعي'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Weekly executive management reports' : 'تقارير أسبوعية للإدارة العليا'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{isEnglish ? 'Dedicated API access & enterprise SSO' : 'وتسجيل دخول موحد API واجهة برمجة'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToBooking(isEnglish ? `Major Branch Chains (${billingCycle === 'annual' ? '$479/mo' : '$599/mo'})` : `سلاسل الفروع الكبرى (${billingCycle === 'annual' ? '479$ شهرياً' : '599$ شهرياً'})`);
                }}
                className="w-full bg-white/[0.06] hover:bg-white/[0.14] text-white py-3.5 rounded-2xl text-xs font-black transition-all border border-white/10 cursor-pointer shadow-sm hover:scale-102"
              >
                {isEnglish ? 'Contact Sales Team' : 'تواصل مع فريق المبيعات'}
              </button>
            </motion.div>

          </div>

          {/* Interactive Feature Comparison Matrix Toggle */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => {
                soundManager.playPop();
                setShowComparisonMatrix(!showComparisonMatrix);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-black text-gray-200 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <span>
                {showComparisonMatrix 
                  ? (isEnglish ? 'Hide Detailed Features Comparison' : 'إخفاء جدول المقارنة التفصيلية') 
                  : (isEnglish ? 'Compare All Plan Features Side-by-Side' : 'مقارنة المزايا الكاملة بين الخطط الثلاثة')}
              </span>
              {showComparisonMatrix ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Comparison Matrix Table */}
          <AnimatePresence>
            {showComparisonMatrix && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-8"
              >
                <div className="bg-[#0E1017] border border-white/[0.08] rounded-3xl p-6 overflow-x-auto">
                  <table className="w-full text-right rtl:text-right ltr:text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-gray-400">
                        <th className="pb-4 font-black">{isEnglish ? 'Feature' : 'الميزة'}</th>
                        <th className="pb-4 font-black text-center">{isEnglish ? 'Boutique' : 'المحمصة والبوتيك'}</th>
                        <th className="pb-4 font-black text-center text-white" style={{ color: accentColor }}>
                          {isEnglish ? 'Fine Dining' : 'المطاعم والبيسترو'}
                        </th>
                        <th className="pb-4 font-black text-center">{isEnglish ? 'Enterprise Chains' : 'سلاسل الفروع'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-gray-300">
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'Branch Limit' : 'عدد الفروع'}</td>
                        <td className="py-3.5 text-center">{isEnglish ? 'Up to 2' : 'حتى فرعين'}</td>
                        <td className="py-3.5 text-center font-bold text-white">{isEnglish ? 'Up to 5' : 'حتى 5 فروع'}</td>
                        <td className="py-3.5 text-center text-emerald-400 font-bold">{isEnglish ? 'Unlimited' : 'غير محدود'}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'Customer QR Scans' : 'مسح الباركود لعملائك'}</td>
                        <td className="py-3.5 text-center">1,500 / {isEnglish ? 'mo' : 'شهر'}</td>
                        <td className="py-3.5 text-center text-emerald-400 font-bold">{isEnglish ? 'Unlimited' : 'غير محدود'}</td>
                        <td className="py-3.5 text-center text-emerald-400 font-bold">{isEnglish ? 'Unlimited' : 'غير محدود'}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'Google Maps 5-Star Engine' : 'مضاعفة تقييمات جوجل 5 نجوم'}</td>
                        <td className="py-3.5 text-center"><Check size={16} className="text-emerald-400 inline" /></td>
                        <td className="py-3.5 text-center"><Check size={16} className="text-emerald-400 inline" /></td>
                        <td className="py-3.5 text-center"><Check size={16} className="text-emerald-400 inline" /></td>
                      </tr>
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'Direct POS Cashier Integration' : 'الربط مع الكاشير POS'}</td>
                        <td className="py-3.5 text-center text-gray-500">—</td>
                        <td className="py-3.5 text-center"><Check size={16} className="text-emerald-400 inline" /></td>
                        <td className="py-3.5 text-center"><Check size={16} className="text-emerald-400 inline" /></td>
                      </tr>
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'Mystery Boxes & Fortune Wheel' : 'ألعاب الصندوق السري وعجلة الحظ'}</td>
                        <td className="py-3.5 text-center">{isEnglish ? 'Basic' : 'أساسي'}</td>
                        <td className="py-3.5 text-center font-bold text-white">{isEnglish ? 'Full Suite' : 'الباقة الكاملة'}</td>
                        <td className="py-3.5 text-center font-bold text-white">{isEnglish ? 'Customized' : 'مخصصة بالكامل'}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'AI Decision Action Cards' : 'كروت قرارات الذكاء الاصطناعي'}</td>
                        <td className="py-3.5 text-center">{isEnglish ? 'Weekly' : 'أسبوعي'}</td>
                        <td className="py-3.5 text-center font-bold text-white">{isEnglish ? 'Daily Real-time' : 'فورية يومية'}</td>
                        <td className="py-3.5 text-center font-bold text-emerald-400">{isEnglish ? 'Custom Tuned' : 'نموذج مدرب مخصص'}</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 font-bold">{isEnglish ? 'Dedicated Account Manager' : 'مدير حساب مخصص ودعم VIP'}</td>
                        <td className="py-3.5 text-center text-gray-500">—</td>
                        <td className="py-3.5 text-center">{isEnglish ? 'Priority Email/Chat' : 'دعم أولوية'}</td>
                        <td className="py-3.5 text-center text-emerald-400 font-bold">{isEnglish ? 'Dedicated VIP SLA' : 'مدير حساب مخصص 24/7'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 1 FROM IMAGE 2 (2.jpeg): آراء كبار الطهاة ومؤسسي المقاهي */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-20 px-4 sm:px-8 border-t border-white/[0.06] bg-[#0A0C11]/90 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Heading matching Image 2 */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black mb-3 border transition-all"
              style={{ 
                backgroundColor: `${primaryColor}15`,
                borderColor: `${primaryColor}40`,
                color: accentColor 
              }}
            >
              <span>{isEnglish ? 'Business Founders & Executive Feedback' : 'آراء نخبة عملائنا ورواد الأعمال'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              {isEnglish ? (
                <>
                  <span className="text-white">“The platform turned customer impressions into </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    our biggest sales growth engine”
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">“حوّلت المنصة انطباعات عملائنا إلى </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    أكبر محرك لنمو مبيعاتنا”
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* 3 Testimonials Cards Grid matching Image 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1: منى زبن */}
            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all group">
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed mb-6">
                  {isEnglish
                    ? '“The Google Maps review conversion engine generated over 340 new excellent reviews for us during the very first month alone.”'
                    : '“نظام تحويل التقييمات لخرائط جوجل حقق لنا أكثر من 340 تقييم ممتاز جديد خلال الشهر الأول فقط.”'}
                </p>
              </div>

              {/* Author Info with Avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div 
                  className="w-10 h-10 rounded-full p-0.5 shrink-0"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-xs font-black overflow-hidden" style={{ color: accentColor }}>
                    MZ
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {isEnglish ? 'Mona Zaben' : 'منى زبن'}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {isEnglish ? 'Operations Director, Caspella Lounge' : 'مديرة العمليات، كاسبيلا لاونج'}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2: فراس تلبي */}
            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all group">
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed mb-6">
                  {isEnglish
                    ? '“Tracking barista speed and peak rush-hour alerts helped us organize morning lines and reduced wait times significantly.”'
                    : '“متابعة سرعة الباريستا وتنبيهات أوقات الذروة ساعدتنا في تنظيم طوابير الصباح، وقللت وقت الانتظار بنسبة كبيرة.”'}
                </p>
              </div>

              {/* Author Info with Avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div 
                  className="w-10 h-10 rounded-full p-0.5 shrink-0"
                  style={{ background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})` }}
                >
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-xs font-black text-blue-400 overflow-hidden">
                    FT
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {isEnglish ? 'Firas Talbi' : 'فراس تلبي'}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {isEnglish ? 'Catering Quality Manager, Expresso Lounge' : 'مدير جودة التموين، إكسبريسو لاونج'}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3: تشارلز فرانك */}
            <div className="bg-[#0E1017] border border-white/[0.08] hover:border-amber-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all group">
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed mb-6">
                  {isEnglish
                    ? '“Our customers love the mystery box experience! Over 84% complete the survey right during their visit. Feedback helped us elevate kitchen and product quality immensely.”'
                    : '“يعشق عملاؤنا تجربة الصندوق السري! أكثر من 84% يكملون الاستبيان أثناء زيارتهم. ساعدتنا التعليقات في تحسين جودة المطبخ والخدمة بشكل هائل.”'}
                </p>
              </div>

              {/* Author Info with Avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div 
                  className="w-10 h-10 rounded-full p-0.5 shrink-0"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-xs font-black text-purple-400 overflow-hidden">
                    CF
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {isEnglish ? 'Charles Frank' : 'تشارلز فرانك'}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {isEnglish ? 'Head of Operations, Earlier Cafe' : 'رئيس العمليات، إرلير كافيه'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION 2 FROM IMAGE 2 (2.jpeg): الأسئلة الشائعة (FAQ Accordion) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 px-4 sm:px-8 border-t border-white/[0.06] bg-[#07080B] relative">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Heading matching Image 2 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {isEnglish ? (
                <>
                  <span className="text-white">Frequently Asked </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    Questions
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">الأسئلة </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    الشائعة
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* 4 Accordion Items exactly matching Image 2 */}
          <div className="space-y-3.5">
            {[
              {
                q: isEnglish
                  ? 'How is this platform different from Google Forms and traditional survey tools?'
                  : 'كيف يختلف هذا النظام عن استبيانات جوجل فورمز والحلول التقليدية؟',
                a: isEnglish
                  ? 'This platform is an AI-powered interactive customer experience engine custom-built for your business, trade, restaurants and enterprises. Instead of dull forms, your customers enjoy an Apple-quality mobile journey with animated micro-interactions, alongside gamified rewards like mystery boxes and lucky wheels, achieving an industry-leading completion rate over 92%.'
                  : 'هذه المنصة هي نظام تفاعلي بالذكاء الاصطناعي مصمم خصيصاً لنمو عملك وتجارتك ومطاعمك. بدلاً من الاستبيانات التقليدية المملة، يخوض العميل تجربة تطبيق جوال استثنائية وسلسة بلمسات تفاعلية ممتعة، مع مكافآت تشويقية كالصندوق السري وعجلة الحظ مما يمنح نسبة إكمال تتجاوز 92%.'
              },
              {
                q: isEnglish
                  ? 'How do AI decision cards replace traditional, complex dashboards?'
                  : 'كيف تستبدل كروت الذكاء الاصطناعي لوحات التحكم التقليدية؟',
                a: isEnglish
                  ? 'Instead of spending hours sifting through dense spreadsheets, AI algorithms synthesize every feedback rating and comment into direct, actionable decision cards (such as cashier slowdown alerts, highest margin winning dishes, or recipe consistency dips), allowing executives to take immediate operational action with a single tap.'
                  : 'بدلاً من إضاعة ساعات في تحليل جداول البيانات المعقدة، تقوم خوارزميات الذكاء الاصطناعي بقراءة كل تقييم وتعليق وتحويله فوراً إلى كروت قرارات تنفيذية مباشرة (تنبيه بطء الكاشير، الطبق الأكثر مبيعاً، انخفاض جودة صنف معين)، لتتخذ إجراءك بضغطة زر واحدة.'
              },
              {
                q: isEnglish
                  ? 'Can the system integrate directly with POS and cashier software?'
                  : 'POS هل يمكن الربط مع أنظمة نقاط البيع؟',
                a: isEnglish
                  ? 'Yes, our platform connects smoothly with leading cloud POS platforms (including Foodics, Odoo, Revel, and others) to bind customer feedback directly with the specific invoice number, ordered dishes, and assigned waiter or shift cashier.'
                  : 'نعم، تتكامل منصتنا بسلاسة مع أشهر أنظمة نقاط البيع والكاشير السحابية (مثل Foodics، Odoo، Revel، وغيرها) لربط تقييم العميل برقم الفاتورة والطلب والويتر المسؤول بدقة متناهية.'
              },
              {
                q: isEnglish
                  ? 'How does the Google Maps 5-Star review multiplier engine work?'
                  : 'كيف يعمل نظام مضاعفة تقييمات جوجل ماب 5 نجوم؟',
                a: isEnglish
                  ? 'When a customer rates their visit positively (4 or 5 stars) on the mobile survey, the system seamlessly prompts them with a single click to copy their words and publish them to your official Google Maps profile with an instant thank-you incentive, multiplying your verified public 5-star reviews by 4x to 6x monthly.'
                  : 'عندما يمنح العميل تقييماً إيجابياً (4 أو 5 نجوم) في استبيان الجوال، يقترح عليه النظام تلقائياً وبنقرة زر واحدة نسخ انطباعه ونقله مباشرة إلى صفحة متجرك أو مطعمك على خرائط Google Maps مع مكافأة رمزية، مما يضاعف تقييماتك العامة بمعدل 4 إلى 6 أضعاف شهرياً.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#0E1017] border border-white/[0.08] hover:border-white/15 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setOpenFaqIndex(isOpen ? null : idx);
                    }}
                    className="w-full p-5 sm:p-6 text-right rtl:text-right ltr:text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-black text-white">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/[0.06] text-gray-300 flex items-center justify-center shrink-0">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-gray-400 font-medium leading-relaxed border-t border-white/[0.04] pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION 3 FROM IMAGE 2 (2.jpeg): هل أنت مستعد لرفع مستوى تجربة عملائك اليوم؟ */}
      {/* ========================================================================= */}
      <section 
        id="book-demo" 
        ref={bookingFormRef}
        className="py-20 px-4 sm:px-8 border-t border-white/[0.06] relative"
        style={{
          background: `radial-gradient(ellipse at bottom, ${primaryColor}15 0%, #07080B 70%)`
        }}
      >
        <div className="max-w-2xl mx-auto">
          
          {/* Section Heading matching Image 2 */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2.5">
              {isEnglish ? (
                <>
                  <span className="text-white">Are You Ready to Elevate </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    Your Customer Experience Today?
                  </span>
                </>
              ) : (
                <>
                  <span className="text-white">هل أنت مستعد لرفع مستوى </span>
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor}, #FBBF24)` }}
                  >
                    تجربة عملائك اليوم؟
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">
              {isEnglish
                ? 'Book a comprehensive live demonstration with our team of enterprise & business AI specialists'
                : 'احجز عرضاً توضيحياً شاملاً مع فريق خبراء الذكاء الاصطناعي لنمو عملك وتجارتك'}
            </p>
          </div>

          {/* Form Container matching Image 2 */}
          <div 
            className="bg-[#0E1017] border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all"
            style={{ borderColor: `${primaryColor}40` }}
          >
            
            {bookingSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border"
                  style={{ 
                    backgroundColor: `${primaryColor}20`,
                    borderColor: `${primaryColor}40`,
                    color: accentColor 
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-black mb-3 inline-block border"
                  style={{ 
                    backgroundColor: `${primaryColor}15`,
                    borderColor: `${primaryColor}40`,
                    color: accentColor 
                  }}
                >
                  {isEnglish ? `VIP Booking Confirmed: ${bookingCode}` : `تم تأكيد حجز العرض: ${bookingCode}`}
                </span>
                <h3 className="text-xl font-black text-white mb-2">
                  {isEnglish ? 'Thank You! We Received Your Request' : 'شكراً لك! تم استلام طلب العرض بنجاح'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed max-w-md mx-auto mb-8">
                  {isEnglish
                    ? `Our dedicated hospitality AI specialist will reach out to ${workEmail} within 15 minutes to configure ${businessName || 'your brand'} with tailored live interactive surveys.`
                    : `سيتواصل معك أحد خبراء أنظمة تجربة العملاء عبر البريد (${workEmail}) وواتساب لتجهيز النظام المخصص لـ (${businessName || 'علامتكم التجارية'}) مع الباقة المختارة: ${selectedPlanName}.`}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => onNavigateToGame()}
                    className="w-full sm:w-auto text-white px-6 py-3 rounded-2xl font-black text-xs cursor-pointer shadow-lg transition-all hover:scale-102"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                  >
                    {isEnglish ? 'Try Interactive Mobile Survey Now' : 'تجربة استبيان الجوال الحي الآن 📱'}
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setBookingSuccess(false);
                      setBusinessName('');
                      setWorkEmail('');
                    }}
                    className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-gray-300 px-6 py-3 rounded-2xl font-bold text-xs cursor-pointer border border-white/10 transition-all"
                  >
                    {isEnglish ? 'Submit Another Request' : 'حجز عرض لفرع أو علامة أخرى'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                {/* 2-Column Fields matching Image 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 1: اسم المطعم / المقهى */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 text-right rtl:text-right ltr:text-left">
                      {isEnglish ? 'Restaurant / Cafe Name' : 'اسم المطعم / المقهى'}
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={isEnglish ? 'e.g. The Trail Bistro' : 'مثال: مطعم وبيسترو التريل'}
                      className="w-full bg-[#151722] border border-white/10 focus:border-white/30 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-all"
                    />
                  </div>

                  {/* Field 2: البريد الإلكتروني للعمل */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5 text-right rtl:text-right ltr:text-left">
                      {isEnglish ? 'Work Email' : 'البريد الإلكتروني للعمل'}
                    </label>
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="chef@bistro.com"
                      className="w-full bg-[#151722] border border-white/10 focus:border-white/30 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Field 3: نوع النشاط matching Image 2 */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5 text-right rtl:text-right ltr:text-left">
                    {isEnglish ? 'Business Activity Type' : 'نوع النشاط'}
                  </label>
                  <div className="relative">
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-[#151722] border border-white/10 focus:border-white/30 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Fine Dining">
                        {isEnglish ? '(Fine Dining) Upscale Restaurant & Modern Bistro' : '(Fine Dining) مطعم فاخر وبيسترو'}
                      </option>
                      <option value="Specialty Coffee">
                        {isEnglish ? '(Specialty Coffee) Boutique Roastery & Cafe' : '(Specialty Coffee) مقهى مختص ومحمصة'}
                      </option>
                      <option value="QSR">
                        {isEnglish ? '(QSR) Fast Casual & Quick Service Chain' : '(QSR) سلسلة وجبات سريعة وعصرية'}
                      </option>
                      <option value="Bakery">
                        {isEnglish ? '(Artisan Bakery) Pastry & Sweets' : '(Bakery) مخبز وحلويات فاخرة'}
                      </option>
                      <option value="Supermarket">
                        {isEnglish ? '(Retail & Supermarket) Hypermarket & Grocery' : '(Retail) هايبرماركت وسوبرماركت تجزئة'}
                      </option>
                    </select>
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto pointer-events-none text-gray-400">
                      <ChevronDown size={17} />
                    </div>
                  </div>
                </div>

                {/* Optional Selected Plan reminder */}
                <div className="pt-2 flex items-center justify-between text-xs text-gray-400 px-1">
                  <span>{isEnglish ? 'Targeted Solution:' : 'الباقة أو الخدمة المستهدفة:'}</span>
                  <span className="font-bold" style={{ color: accentColor }}>{selectedPlanName}</span>
                </div>

                {/* Primary Button matching the harmonized theme palette */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 text-white font-black py-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    boxShadow: `0 16px 36px -6px ${primaryColor}60`
                  }}
                >
                  {isSubmitting ? (
                    <span>{isEnglish ? 'Booking Your VIP Slot...' : 'جاري حجز موعدك الخاص...'}</span>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>{isEnglish ? 'Book Free VIP Demonstration' : 'VIP احجز عرض توضيحي خاص مجاناً'}</span>
                    </>
                  )}
                </button>

                {/* Privacy and Fast Reply Note */}
                <div className="text-center pt-2">
                  <p className="text-[11px] text-gray-400">
                    {isEnglish 
                      ? '🔒 No credit card required. Our hospitality specialists contact you within 15 minutes.'
                      : '🔒 بدون أي بطاقة ائتمانية. يتواصل معك فريقنا المختص لتخصيص النظام حسب هويتك.'}
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. COLOR PALETTE HARMONIZATION MODAL FOR CX PLATFORM */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showPaletteModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-2 sm:p-5 overflow-y-auto pointer-events-none bg-black/25 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-[#12141D]/95 backdrop-blur-md border border-white/20 rounded-[32px] max-w-xl w-full p-5 sm:p-6 text-right rtl:text-right ltr:text-left relative overflow-hidden shadow-2xl max-h-[88vh] overflow-y-auto pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  setShowPaletteModal(false);
                }}
                className="absolute top-5 left-5 rtl:left-5 rtl:right-auto ltr:right-5 ltr:left-auto w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Palette size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {isEnglish ? 'Coordinated Interface & CX Colors' : 'تنسيق ألوان الواجهة ومنصة العملاء CX'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {isEnglish 
                      ? 'Select any coordinated color palette. It synchronizes automatically across the CX platform and the management dashboard.'
                      : 'اختر أي نمط لوني مفتوح، وسيتم تطبيقه فوراً وحفظه على منصة العملاء الخارجية ولوحة التحكم معاً.'}
                  </p>
                </div>
              </div>

              {/* Theme Color Selector Component */}
              <div className="bg-white rounded-3xl p-4 text-gray-900 shadow-inner">
                <ThemeColorSelector
                  brandSettings={brandSettings}
                  onSaveBrandSettings={(updated) => {
                    if (onSaveBrandSettings) {
                      onSaveBrandSettings(updated);
                    }
                  }}
                  isEnglish={isEnglish}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    soundManager.playVictory();
                    setShowPaletteModal(false);
                  }}
                  className="text-white px-6 py-2.5 rounded-2xl font-black text-xs cursor-pointer shadow-md transition-all hover:scale-102"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  {isEnglish ? 'Done & Apply Everywhere' : 'تم وتطبيق على كافة الشاشات ✓'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 9.1 FONT SELECTION & TYPOGRAPHY CUSTOMIZER MODAL */}
      {/* ========================================================================= */}
      <FontSelectorModal
        isOpen={showFontModal}
        onClose={() => setShowFontModal(false)}
        currentFontId={activeFontId}
        onSelectFont={handleSelectFontInternal}
        isEnglish={isEnglish}
        primaryColor={primaryColor}
        accentColor={accentColor}
      />

      {/* ========================================================================= */}
      {/* 10. INTERACTIVE QR & MOBILE SURVEY MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#12141D] border border-white/10 rounded-[36px] max-w-md w-full p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  setShowQrModal(false);
                }}
                className="absolute top-5 left-5 rtl:left-5 rtl:right-auto ltr:right-5 ltr:left-auto w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div 
                className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ backgroundColor: `${primaryColor}25`, color: accentColor }}
              >
                <QrCode size={26} />
              </div>

              <h3 className="text-xl font-black text-white mb-1">
                {isEnglish ? 'Experience Live Guest Survey on Mobile' : 'امسح الباركود لتجربة استبيان الجوال'}
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-6">
                {isEnglish
                  ? 'Or start the interactive customer flow directly in this window'
                  : 'أو ابدأ التجربة التفاعلية المباشرة فوراً على هذه الشاشة'}
              </p>

              {/* QR Box Visual */}
              <div className="bg-white p-4 rounded-3xl mx-auto w-48 h-48 flex items-center justify-center shadow-inner mb-6 relative group">
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-800 p-2">
                  <QrCode size={110} className="text-gray-900" />
                  <span className="text-[10px] font-black mt-1 tracking-wider" style={{ color: primaryColor }}>
                    {brandName} LIVE QR
                  </span>
                </div>
              </div>

              {/* Action Buttons inside modal */}
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowQrModal(false);
                    onNavigateToGame();
                  }}
                  className="w-full text-white py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-102"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  <Smartphone size={16} />
                  <span>{isEnglish ? 'Launch Interactive Experience Now' : 'بدء التجربة التفاعلية الآن'}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-white/10 cursor-pointer transition-all"
                >
                  {copiedLink ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Copy size={15} />}
                  <span>{copiedLink ? (isEnglish ? 'Link Copied!' : 'تم نسخ الرابط بنجاح!') : (isEnglish ? 'Copy Survey Link' : 'نسخ رابط الاستبيان')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-white/[0.05] text-xs text-gray-500">
        <p>
          {isEnglish 
            ? `© 2026 ${brandName} CX PRO — All rights reserved.`
            : `© 2026 منصة تجربة العملاء بالذكاء الاصطناعي — ${brandName} جميع الحقوق محفوظة.`}
        </p>
      </footer>

      {/* Floating Scroll to Top Button (سهم العودة للأعلى عند النزول) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            title={isEnglish ? 'Scroll to Top' : 'العودة للأعلى'}
            aria-label={isEnglish ? 'Scroll to Top' : 'العودة للأعلى'}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0E1017]/90 hover:bg-[#161922] text-white border transition-all cursor-pointer flex items-center justify-center group shadow-2xl backdrop-blur-xl"
            style={{ 
              borderColor: `${primaryColor}80`,
              boxShadow: `0 12px 35px -5px rgba(0, 0, 0, 0.8), 0 0 25px -4px ${primaryColor}60`
            }}
          >
            <div className="relative flex items-center justify-center">
              <ArrowUp 
                size={22} 
                className="transition-transform duration-300 group-hover:-translate-y-1" 
                style={{ color: accentColor }} 
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
