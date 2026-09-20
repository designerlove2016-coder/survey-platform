import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  FileSpreadsheet, 
  FileJson, 
  Copy, 
  Trophy, 
  Download, 
  Star, 
  Volume2, 
  VolumeX, 
  CheckCircle2,
  Gamepad2,
  ExternalLink,
  Globe,
  Plus,
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Repeat,
  Flame,
  UserCheck,
  Eye,
  RotateCcw,
  Clock,
  Phone,
  Layers,
  ChevronDown,
  User,
  ShoppingBag,
  Award,
  Languages,
  TrendingUp,
  Users,
  Crown,
  Store,
  Palette,
  Sliders,
  ArrowLeft
} from 'lucide-react';
import { CustomerFeedback, LeaderboardEntry, Difficulty, LanguageItem, BrandSettings, CustomerJourneyConfig } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { CustomerDetailsModal, CustomerAggregatedProfile } from './CustomerDetailsModal';
import { HourlyActivityRoadmap } from './HourlyActivityRoadmap';
import { ThemeColorSelector } from './ThemeColorSelector';
import { CustomerJourneyEditor } from './CustomerJourneyEditor';
import { DashboardSidebar, DashboardNavSection } from './DashboardSidebar';
import { AiRecommendationsPanel } from './dashboard/AiRecommendationsPanel';
import { RbacMatrixPanel } from './dashboard/RbacMatrixPanel';
import { SecurityAuditLogPanel } from './dashboard/SecurityAuditLogPanel';
import { OverviewAnalyticsFunnelShowcase } from './dashboard/OverviewAnalyticsFunnelShowcase';
import { VouchersEnginePanel } from './dashboard/VouchersEnginePanel';
import { CustomerLeaderboardPanel } from './dashboard/CustomerLeaderboardPanel';
import { OverviewShopperHeatmap } from './dashboard/OverviewShopperHeatmap';
import { ProductsPieChartPanel } from './dashboard/ProductsPieChartPanel';
import { ExecutiveAnalyticsPanel } from './dashboard/ExecutiveAnalyticsPanel';
import { LoyaltyManagementPanel } from './dashboard/LoyaltyManagementPanel';
import { SurveyCustomizerPlatform } from './dashboard/SurveyCustomizerPlatform';
import { getPaletteById } from '../utils/theme';
import { DEFAULT_BRAND_SETTINGS } from '../utils/brand';
import { DEFAULT_JOURNEY_CONFIG } from '../utils/journeyConfig';
import { getDashboardTexts, getDirectoryTableHeaders, getLanguageAnalyticsTexts } from '../utils/dashboardTranslations';

interface DashboardViewProps {
  feedbacks: CustomerFeedback[];
  leaderboard: LeaderboardEntry[];
  difficulty: Difficulty;
  soundMuted: boolean;
  exportNotice: string | null;
  onClearNotice: () => void;
  onToggleSound: () => void;
  onOpenLeaderboard: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onCopySummary: () => void;
  onPreviewGame: () => void;
  onNavigateToShowcase?: () => void;
  logoUrl?: string | null;
  onLogoClick?: () => void;
  languages: LanguageItem[];
  currentLangCode: string;
  onSelectLanguage: (code: string) => void;
  onUpdateLanguages: (updated: LanguageItem[]) => void;
  brandSettings?: BrandSettings;
  onOpenBrandModal?: () => void;
  onSaveBrandSettings?: (updated: BrandSettings) => void;
  journeyConfig?: CustomerJourneyConfig;
  onSaveJourneyConfig?: (updated: CustomerJourneyConfig) => void;
  onResetJourneyConfig?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  feedbacks,
  difficulty,
  soundMuted,
  exportNotice,
  onClearNotice,
  onToggleSound,
  onOpenLeaderboard,
  onExportCSV,
  onExportJSON,
  onCopySummary,
  onPreviewGame,
  onNavigateToShowcase,
  logoUrl,
  onLogoClick,
  languages,
  currentLangCode,
  onSelectLanguage,
  onUpdateLanguages,
  brandSettings,
  onOpenBrandModal,
  onSaveBrandSettings,
  journeyConfig = DEFAULT_JOURNEY_CONFIG,
  onSaveJourneyConfig,
  onResetJourneyConfig,
}) => {
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];
  const isEnglish = currentLangCode !== 'ar';
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const texts = getDashboardTexts(currentLangCode);
  const dirTableHeaders = getDirectoryTableHeaders(currentLangCode);
  const langAnalyticsTexts = getLanguageAnalyticsTexts(currentLangCode);

  // Journey Editor state
  const [showJourneyEditor, setShowJourneyEditor] = useState(true);

  // Sidebar navigation state (لوحة جانبية زي هذه وزبط اللوحة باحترافية)
  const [activeSidebarSection, setActiveSidebarSection] = useState<DashboardNavSection>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSelectSidebarSection = (section: DashboardNavSection) => {
    setActiveSidebarSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionTitle = (section: DashboardNavSection) => {
    return texts.sidebar.nav[section] || texts.sidebar.nav.overview;
  };

  // Color palette state
  const [showColorPalettePanel, setShowColorPalettePanel] = useState(false);
  const activePalette = getPaletteById(brandSettings?.colorPaletteId);

  // Time and Roadmap filtering states
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [customDate, setCustomDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest_score' | 'most_visits' | 'highest_rating'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Customer details modal state
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAggregatedProfile | null>(null);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  // Aggregated customer profile map
  const customerProfilesMap = useMemo(() => {
    const map = new Map<string, CustomerAggregatedProfile>();

    feedbacks.forEach(f => {
      const key = (f.customerPhone && f.customerPhone !== 'غير مسجل') 
        ? f.customerPhone.trim() 
        : (f.customerName?.trim() || 'عميل مجهول');

      if (!map.has(key)) {
        map.set(key, {
          name: f.customerName || 'عميل بنده',
          phone: f.customerPhone || 'غير مسجل',
          email: f.customerEmail || 'غير مسجل',
          totalVisits: 0,
          isRepeat: false,
          mostChosenSection: '',
          mostChosenProducts: [],
          latestVisitDate: f.timestamp,
          latestScore: f.score || 0,
          bestScore: f.score || 0,
          totalScore: 0,
          feedbacks: []
        });
      }

      const prof = map.get(key)!;
      prof.totalVisits += 1;
      prof.totalScore += (f.score || 0);
      if ((f.score || 0) > prof.bestScore) {
        prof.bestScore = f.score || 0;
      }
      prof.feedbacks.push(f);
    });

    // Compute sections and products frequencies
    map.forEach(prof => {
      prof.isRepeat = prof.totalVisits > 1;

      const secCounts: Record<string, number> = {};
      const prodCounts: Record<string, number> = {};

      prof.feedbacks.forEach(fb => {
        const sec = fb.section || fb.preference || 'عام';
        secCounts[sec] = (secCounts[sec] || 0) + 1;
        (fb.selectedProducts || []).forEach(p => {
          prodCounts[p] = (prodCounts[p] || 0) + 1;
        });
      });

      let topSec = 'عام';
      let maxSec = 0;
      Object.entries(secCounts).forEach(([s, c]) => {
        if (c > maxSec) {
          maxSec = c;
          topSec = s;
        }
      });
      prof.mostChosenSection = topSec;

      prof.mostChosenProducts = Object.entries(prodCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      // Sort chronological newest first
      prof.feedbacks.sort((a, b) => {
        const tA = a.createdAt || (Date.parse(a.timestamp) || 0);
        const tB = b.createdAt || (Date.parse(b.timestamp) || 0);
        return tB - tA;
      });

      if (prof.feedbacks[0]) {
        prof.latestVisitDate = prof.feedbacks[0].timestamp;
        prof.latestScore = prof.feedbacks[0].score || 0;
        if (prof.feedbacks[0].customerName && prof.feedbacks[0].customerName !== 'عميل بنده') {
          prof.name = prof.feedbacks[0].customerName;
        }
      }
    });

    return map;
  }, [feedbacks]);

  // Helper to extract timestamp date
  const parseFeedbackDate = useCallback((fb: CustomerFeedback): Date => {
    if (fb.createdAt) return new Date(fb.createdAt);
    if (fb.timestamp) {
      const match = fb.timestamp.match(/(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        return new Date(`${match[1]}-${match[2]}-${match[3]}T12:00:00`);
      }
      const parsed = Date.parse(fb.timestamp);
      if (!isNaN(parsed)) return new Date(parsed);
    }
    return new Date();
  }, []);

  // Filter feedbacks by time and search
  const filteredFeedbacks = useMemo(() => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const thisMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return feedbacks.filter(fb => {
      const fbDate = parseFeedbackDate(fb);
      const fbDateStr = `${fbDate.getFullYear()}-${String(fbDate.getMonth() + 1).padStart(2, '0')}-${String(fbDate.getDate()).padStart(2, '0')}`;
      const fbMonthStr = `${fbDate.getFullYear()}-${String(fbDate.getMonth() + 1).padStart(2, '0')}`;

      // Time period filter
      if (timeFilter === 'today') {
        if (fbDateStr !== todayStr) return false;
      } else if (timeFilter === 'week') {
        if (fbDate < sevenDaysAgo) return false;
      } else if (timeFilter === 'month') {
        if (fbMonthStr !== thisMonthStr) return false;
      } else if (timeFilter === 'custom' && customDate) {
        if (fbDateStr !== customDate) return false;
      }

      // Hourly roadmap filter
      if (selectedHour !== null) {
        let hour: number = fbDate.getHours();
        if (fb.createdAt) {
          hour = new Date(fb.createdAt).getHours();
        } else if (fb.timestamp) {
          const m = fb.timestamp.match(/(\d{1,2}):(\d{2})/);
          if (m) {
            let h = parseInt(m[1], 10);
            if (fb.timestamp.includes('م') && h < 12) h += 12;
            if (fb.timestamp.includes('ص') && h === 12) h = 0;
            hour = h;
          }
        }
        if (hour !== selectedHour) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const nameMatch = (fb.customerName || '').toLowerCase().includes(q);
        const phoneMatch = (fb.customerPhone || '').toLowerCase().includes(q);
        const secMatch = (fb.section || fb.preference || '').toLowerCase().includes(q);
        const prodMatch = (fb.selectedProducts || []).some(p => p.toLowerCase().includes(q));
        if (!nameMatch && !phoneMatch && !secMatch && !prodMatch) return false;
      }

      return true;
    });
  }, [feedbacks, timeFilter, customDate, selectedHour, searchQuery, parseFeedbackDate]);

  // Sort filtered feedbacks
  const sortedFeedbacks = useMemo(() => {
    const list = [...filteredFeedbacks];

    list.sort((a, b) => {
      const keyA = (a.customerPhone && a.customerPhone !== 'غير مسجل') ? a.customerPhone.trim() : (a.customerName?.trim() || '');
      const keyB = (b.customerPhone && b.customerPhone !== 'غير مسجل') ? b.customerPhone.trim() : (b.customerName?.trim() || '');
      const profA = customerProfilesMap.get(keyA);
      const profB = customerProfilesMap.get(keyB);

      if (sortBy === 'newest') {
        const tA = a.createdAt || (Date.parse(a.timestamp) || 0);
        const tB = b.createdAt || (Date.parse(b.timestamp) || 0);
        return tB - tA;
      } else if (sortBy === 'oldest') {
        const tA = a.createdAt || (Date.parse(a.timestamp) || 0);
        const tB = b.createdAt || (Date.parse(b.timestamp) || 0);
        return tA - tB;
      } else if (sortBy === 'highest_score') {
        return (b.score || 0) - (a.score || 0);
      } else if (sortBy === 'most_visits') {
        const vA = profA ? profA.totalVisits : 1;
        const vB = profB ? profB.totalVisits : 1;
        return vB - vA;
      } else if (sortBy === 'highest_rating') {
        const rank: Record<string, number> = { great: 5, good: 4, normal: 3, bad: 2, very_bad: 1 };
        return (rank[b.rating] || 0) - (rank[a.rating] || 0);
      }
      return 0;
    });

    return list;
  }, [filteredFeedbacks, sortBy, customerProfilesMap]);

  // Store Branches list for multi-branch filtering & analytics
  const STORE_BRANCHES = [
    { id: 'all', nameAr: 'جميع الفروع والقنوات', nameEn: 'All Branches & Channels', factor: 1.0 },
    { id: 'riyadh-nakheel', nameAr: 'فرع الرياض - النخيل مول', nameEn: 'Riyadh - Al Nakheel', factor: 0.24 },
    { id: 'riyadh-olaya', nameAr: 'فرع الرياض - العليا', nameEn: 'Riyadh - Al Olaya', factor: 0.18 },
    { id: 'jeddah-kingroad', nameAr: 'فرع جدة - طريق الملك', nameEn: 'Jeddah - King Road', factor: 0.16 },
    { id: 'jeddah-redsea', nameAr: 'فرع جدة - رد سي مول', nameEn: 'Jeddah - Red Sea Mall', factor: 0.22 },
    { id: 'dammam-shati', nameAr: 'فرع الدمام - الشاطئ', nameEn: 'Dammam - Al Shati', factor: 0.14 },
    { id: 'makkah-aziziyah', nameAr: 'فرع مكة المكرمة - العزيزية', nameEn: 'Makkah - Al Aziziyah', factor: 0.15 },
    { id: 'madinah-sultana', nameAr: 'فرع المدينة المنورة - سلطانة', nameEn: 'Madinah - Sultana', factor: 0.12 },
    { id: 'kiosk', nameAr: 'أجهزة الكيوسك الذكية', nameEn: 'Self-Service Kiosks', factor: 0.28 },
    { id: 'online', nameAr: 'تطبيق بنده أونلاين', nameEn: 'Panda Online App', factor: 0.32 },
  ];

  type LangTimeframe = 'today' | 'yesterday' | '7d' | '30d' | 'all';

  // Language stats and customer ranking filter & search states
  const [selectedLangRankingFilter, setSelectedLangRankingFilter] = useState<string>('all');
  const [langTimeframeFilter, setLangTimeframeFilter] = useState<LangTimeframe>('today');
  const [langBranchFilter, setLangBranchFilter] = useState<string>('all');
  const [showAllCustomersTable, setShowAllCustomersTable] = useState<boolean>(false);
  const [showAllLanguagesTable, setShowAllLanguagesTable] = useState<boolean>(false);
  const [langCustomerSearch, setLangCustomerSearch] = useState('');

  // Language Ranking & Top Customers Analytics (ترتيب أكثر اللغات اختياراً ومن هم العملاء الأكثر اختياراً)
  const languageAnalytics = useMemo(() => {
    const total = feedbacks.length || 1;

    // Aggregate customers for a language
    const aggregateCustomers = (list: CustomerFeedback[], langCode: string, langName: string) => {
      const map = new Map<string, {
        customerKey: string;
        name: string;
        phone: string;
        email: string;
        languageCode: string;
        languageName: string;
        selectionCount: number;
        avgScore: number;
        bestScore: number;
        latestDate: string;
        topSection: string;
        latestRating: string;
        latestRatingLabel: string;
        feedbacks: CustomerFeedback[];
      }>();

      list.forEach(fb => {
        const key = (fb.customerPhone && fb.customerPhone !== 'غير مسجل')
          ? fb.customerPhone.trim()
          : (fb.customerName?.trim() || 'عميل مجهول');

        const existing = map.get(key);
        if (!existing) {
          map.set(key, {
            customerKey: key,
            name: fb.customerName || (currentLangCode === 'en' ? 'Panda Shopper' : 'عميل بنده'),
            phone: fb.customerPhone || (currentLangCode === 'en' ? 'Not registered' : 'غير مسجل'),
            email: fb.customerEmail || (currentLangCode === 'en' ? 'Not registered' : 'غير مسجل'),
            languageCode: langCode,
            languageName: langName,
            selectionCount: 1,
            avgScore: fb.score || 0,
            bestScore: fb.score || 0,
            latestDate: fb.timestamp,
            topSection: fb.section || fb.preference || 'عام',
            latestRating: fb.rating,
            latestRatingLabel: fb.ratingLabel || 'رائع 🤩',
            feedbacks: [fb],
          });
        } else {
          existing.selectionCount += 1;
          existing.feedbacks.push(fb);
          existing.avgScore = Math.round((existing.avgScore * (existing.selectionCount - 1) + (fb.score || 0)) / existing.selectionCount);
          if ((fb.score || 0) > existing.bestScore) existing.bestScore = fb.score || 0;
          if (fb.timestamp > existing.latestDate) {
            existing.latestDate = fb.timestamp;
            existing.latestRating = fb.rating;
            existing.latestRatingLabel = fb.ratingLabel || existing.latestRatingLabel;
          }
        }
      });

      return Array.from(map.values()).sort((a, b) => {
        if (b.selectionCount !== a.selectionCount) return b.selectionCount - a.selectionCount;
        return b.bestScore - a.bestScore;
      });
    };

    // Build customers for each active language
    const allLangsCustomers: Record<string, ReturnType<typeof aggregateCustomers>> = {};
    languages.forEach(l => {
      const lFeedbacks = feedbacks.filter(f => (f.languageCode || 'ar') === l.code);
      allLangsCustomers[l.code] = aggregateCustomers(lFeedbacks, l.code, l.name);
    });

    // Ordered ranking of languages by selection popularity
    const rankedLanguages = languages.map(l => {
      const lFeedbacks = feedbacks.filter(f => (f.languageCode || 'ar') === l.code);
      const lCusts = allLangsCustomers[l.code] || [];
      return {
        code: l.code,
        name: l.name,
        englishName: l.englishName,
        flag: l.flag,
        count: lFeedbacks.length,
        percentage: Math.round((lFeedbacks.length / total) * 100),
        uniqueCustomersCount: lCusts.length,
        topCustomers: lCusts,
        avgScore: lFeedbacks.length > 0 ? Math.round(lFeedbacks.reduce((s, f) => s + (f.score || 0), 0) / lFeedbacks.length) : 0,
      };
    }).sort((a, b) => b.count - a.count).map((item, idx) => ({ ...item, rank: idx + 1 }));

    // Displayed customers based on filter
    let displayedCustomers: ReturnType<typeof aggregateCustomers> = [];
    if (selectedLangRankingFilter !== 'all' && allLangsCustomers[selectedLangRankingFilter]) {
      displayedCustomers = allLangsCustomers[selectedLangRankingFilter];
    } else {
      const combined = Object.values(allLangsCustomers).flat();
      displayedCustomers = combined.sort((a, b) => {
        if (b.selectionCount !== a.selectionCount) return b.selectionCount - a.selectionCount;
        return b.bestScore - a.bestScore;
      });
    }

    if (langCustomerSearch.trim()) {
      const q = langCustomerSearch.trim().toLowerCase();
      displayedCustomers = displayedCustomers.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.topSection.toLowerCase().includes(q) ||
        c.languageName.toLowerCase().includes(q)
      );
    }

    // Timeframe and Branch Multipliers & Profiles (تفاعل اليوم والأمس والتواريخ والفروع)
    const selectedBranchObj = STORE_BRANCHES.find(b => b.id === langBranchFilter) || STORE_BRANCHES[0];
    const bFactor = selectedBranchObj.factor;

    const getTimeframeVisitDate = (offsetDays: number = 0) => {
      if (langTimeframeFilter === 'today') {
        return isEnglish ? 'Today' : 'اليوم';
      }
      if (langTimeframeFilter === 'yesterday') {
        return isEnglish ? 'Yesterday' : 'أمس';
      }
      const d = new Date();
      if (langTimeframeFilter === '7d') {
        d.setDate(d.getDate() - (offsetDays % 6 + 1));
      } else if (langTimeframeFilter === '30d') {
        d.setDate(d.getDate() - (offsetDays * 3 + 2));
      } else {
        d.setDate(d.getDate() - (offsetDays * 12 + 5));
      }
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const getTimeframeVisits = (baseVisits: number) => {
      if (langTimeframeFilter === 'today') return Math.max(1, Math.round(baseVisits * 0.25 * bFactor));
      if (langTimeframeFilter === 'yesterday') return Math.max(1, Math.round(baseVisits * 0.4 * bFactor));
      if (langTimeframeFilter === '7d') return Math.max(1, Math.round(baseVisits * 0.7 * bFactor));
      if (langTimeframeFilter === '30d') return Math.max(1, Math.round(baseVisits * bFactor));
      return Math.max(1, Math.round(baseVisits * 2.2 * bFactor));
    };

    // Realistic reference customers from the executive mockup
    const referenceMockCustomers = [
      {
        customerKey: 'ref-c1001',
        name: isEnglish ? 'Ahmed Mohammed' : 'أحمد محمد',
        phone: '0551234567',
        customerId: 'C1001',
        lastVisit: getTimeframeVisitDate(0),
        visitCount: getTimeframeVisits(12),
        languageCode: 'ar',
        languageName: isEnglish ? 'Arabic' : 'العربية',
        languageCodeDisplay: 'AR',
        flag: '🇸🇦',
        status: 'active' as const,
      },
      {
        customerKey: 'ref-c1002',
        name: 'Sarah Johnson',
        phone: '0591234567',
        customerId: 'C1002',
        lastVisit: getTimeframeVisitDate(1),
        visitCount: getTimeframeVisits(8),
        languageCode: 'en',
        languageName: 'English',
        languageCodeDisplay: 'EN',
        flag: '🇬🇧',
        status: 'active' as const,
      },
      {
        customerKey: 'ref-c1003',
        name: isEnglish ? 'Mohammed Ali' : 'محمد علي',
        phone: '0509876543',
        customerId: 'C1003',
        lastVisit: getTimeframeVisitDate(2),
        visitCount: getTimeframeVisits(6),
        languageCode: 'ar',
        languageName: isEnglish ? 'Arabic' : 'العربية',
        languageCodeDisplay: 'AR',
        flag: '🇸🇦',
        status: 'active' as const,
      },
      {
        customerKey: 'ref-c1004',
        name: 'Fatima Zahra',
        phone: '0567891234',
        customerId: 'C1004',
        lastVisit: getTimeframeVisitDate(3),
        visitCount: getTimeframeVisits(5),
        languageCode: 'fr',
        languageName: isEnglish ? 'French' : 'Français',
        languageCodeDisplay: 'FR',
        flag: '🇫🇷',
        status: 'active' as const,
      },
      {
        customerKey: 'ref-c1005',
        name: isEnglish ? 'Hassan Abdullah' : 'حسن عبدالله',
        phone: '0544444444',
        customerId: 'C1005',
        lastVisit: getTimeframeVisitDate(4),
        visitCount: getTimeframeVisits(3),
        languageCode: 'en',
        languageName: 'English',
        languageCodeDisplay: 'EN',
        flag: '🇬🇧',
        status: 'closed' as const,
      },
    ];

    // Real customers mapped to table row structure
    const realCustomerRows = displayedCustomers.map((c, idx) => {
      const lItem = languages.find(l => l.code === c.languageCode);
      return {
        customerKey: c.customerKey,
        name: c.name,
        phone: c.phone,
        customerId: `C${1001 + idx}`,
        lastVisit: getTimeframeVisitDate(idx % 4),
        visitCount: getTimeframeVisits(c.selectionCount),
        languageCode: c.languageCode,
        languageName: lItem ? (isEnglish ? lItem.englishName : lItem.name) : c.languageName,
        languageCodeDisplay: c.languageCode.toUpperCase(),
        flag: lItem?.flag || '🇸🇦',
        status: (c.selectionCount >= 2 ? 'active' : 'active') as 'active' | 'closed',
      };
    });

    let customerTableRows = [...realCustomerRows];
    if (customerTableRows.length < 5) {
      const filteredRef = selectedLangRankingFilter === 'all'
        ? referenceMockCustomers
        : referenceMockCustomers.filter(rc => rc.languageCode === selectedLangRankingFilter);
      
      filteredRef.forEach(rc => {
        if (!customerTableRows.some(c => c.phone === rc.phone || c.name === rc.name)) {
          customerTableRows.push(rc);
        }
      });
    }

    if (langCustomerSearch.trim()) {
      const q = langCustomerSearch.trim().toLowerCase();
      customerTableRows = customerTableRows.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.customerId.toLowerCase().includes(q) ||
        c.languageName.toLowerCase().includes(q)
      );
    }

    // Baseline statistical profiles per timeframe (اليوم، الأمس، آخر 7 أيام، آخر 30 يوم، جميع الأوقات)
    const baselineProfiles: Record<LangTimeframe, {
      arCount: number;
      enCount: number;
      hiCount: number;
      urCount: number;
      amCount: number;
      tlCount: number;
      frCount: number;
      tagCount: number;
      arDate: string;
      enDate: string;
      otherDate: string;
      arLastSel: string;
      enLastSel: string;
      otherLastSel: string;
      arPercent: number;
      enPercent: number;
    }> = {
      today: {
        arCount: 138,
        enCount: 29,
        hiCount: 4,
        urCount: 3,
        amCount: 1,
        tlCount: 1,
        frCount: 1,
        tagCount: 0,
        arDate: isEnglish ? 'Today | 05:00 PM' : 'اليوم | 05:00 م',
        enDate: isEnglish ? 'Today | 04:30 PM' : 'اليوم | 04:30 م',
        otherDate: isEnglish ? 'Today | 02:15 PM' : 'اليوم | 02:15 م',
        arLastSel: isEnglish ? '5m ago' : 'منذ 5 دقائق',
        enLastSel: isEnglish ? '25m ago' : 'منذ 25 دقيقة',
        otherLastSel: isEnglish ? 'Today' : 'اليوم',
        arPercent: 78,
        enPercent: 17,
      },
      yesterday: {
        arCount: 245,
        enCount: 54,
        hiCount: 6,
        urCount: 4,
        amCount: 2,
        tlCount: 1,
        frCount: 1,
        tagCount: 0,
        arDate: isEnglish ? 'Yesterday | 11:30 PM' : 'أمس | 11:30 م',
        enDate: isEnglish ? 'Yesterday | 10:45 PM' : 'أمس | 10:45 م',
        otherDate: isEnglish ? 'Yesterday | 08:20 PM' : 'أمس | 08:20 م',
        arLastSel: isEnglish ? 'Yesterday' : 'أمس',
        enLastSel: isEnglish ? 'Yesterday' : 'أمس',
        otherLastSel: isEnglish ? 'Yesterday' : 'أمس',
        arPercent: 78,
        enPercent: 17,
      },
      '7d': {
        arCount: 840,
        enCount: 210,
        hiCount: 24,
        urCount: 15,
        amCount: 8,
        tlCount: 5,
        frCount: 4,
        tagCount: 1,
        arDate: isEnglish ? '12 Sep | 05:00 PM' : '12 سبتمبر | 05:00 م',
        enDate: isEnglish ? '11 Sep | 04:00 PM' : '11 سبتمبر | 04:00 م',
        otherDate: isEnglish ? '10 Sep | 02:00 PM' : '10 سبتمبر | 02:00 م',
        arLastSel: isEnglish ? 'Today' : 'اليوم',
        enLastSel: isEnglish ? 'Today' : 'اليوم',
        otherLastSel: isEnglish ? 'Yesterday' : 'أمس',
        arPercent: 76,
        enPercent: 19,
      },
      '30d': {
        arCount: 1272,
        enCount: 26,
        hiCount: 2,
        urCount: 1,
        amCount: 1,
        tlCount: 1,
        frCount: 1,
        tagCount: 0,
        arDate: isEnglish ? '12 Sep | 05:00 PM' : '12 سبتمبر | 05:00 م',
        enDate: isEnglish ? '01 Sep | 05:00 PM' : '1 سبتمبر | 05:00 م',
        otherDate: isEnglish ? '01 Sep | 05:00 PM' : '1 سبتمبر | 05:00 م',
        arLastSel: isEnglish ? 'Today' : 'اليوم',
        enLastSel: '--',
        otherLastSel: '--',
        arPercent: 79,
        enPercent: 21,
      },
      all: {
        arCount: 4850,
        enCount: 1180,
        hiCount: 120,
        urCount: 75,
        amCount: 35,
        tlCount: 22,
        frCount: 28,
        tagCount: 10,
        arDate: isEnglish ? '12 Sep | 05:00 PM' : '12 سبتمبر | 05:00 م',
        enDate: isEnglish ? '12 Sep | 05:00 PM' : '12 سبتمبر | 05:00 م',
        otherDate: isEnglish ? '10 Sep | 02:00 PM' : '10 سبتمبر | 02:00 م',
        arLastSel: isEnglish ? 'Today' : 'اليوم',
        enLastSel: isEnglish ? 'Today' : 'اليوم',
        otherLastSel: isEnglish ? 'Yesterday' : 'أمس',
        arPercent: 78,
        enPercent: 19,
      },
    };

    const tfProfile = baselineProfiles[langTimeframeFilter] || baselineProfiles['today'];

    // Dynamic count scaled by branch factor and actual feedback items
    const calcCount = (base: number, code: string) => {
      const realCount = feedbacks.filter(f => (f.languageCode || 'ar') === code).length;
      const scaled = Math.round(base * bFactor) + (langBranchFilter === 'all' ? realCount : Math.round(realCount * bFactor));
      return Math.max(code === 'tag' && base === 0 ? 0 : 1, scaled);
    };

    const finalArCount = calcCount(tfProfile.arCount, 'ar');
    const finalEnCount = calcCount(tfProfile.enCount, 'en');
    const finalHiCount = calcCount(tfProfile.hiCount, 'hi');
    const finalUrCount = calcCount(tfProfile.urCount, 'ur');
    const finalAmCount = calcCount(tfProfile.amCount, 'am');
    const finalTlCount = calcCount(tfProfile.tlCount, 'tl');
    const finalFrCount = calcCount(tfProfile.frCount, 'fr');
    const finalTagCount = calcCount(tfProfile.tagCount, 'tag');

    const totalDynamic = finalArCount + finalEnCount + finalHiCount + finalUrCount + finalAmCount + finalTlCount + finalFrCount + finalTagCount || 1;
    const finalArPercent = Math.round((finalArCount / totalDynamic) * 100);
    const finalEnPercent = Math.round((finalEnCount / totalDynamic) * 100);
    const finalFrPercent = Math.max(1, Math.round((finalFrCount / totalDynamic) * 100));
    const finalHiPercent = Math.max(1, Math.round((finalHiCount / totalDynamic) * 100));
    const finalUrPercent = Math.max(1, Math.round((finalUrCount / totalDynamic) * 100));
    const finalAmPercent = Math.max(1, Math.round((finalAmCount / totalDynamic) * 100));
    const finalTlPercent = Math.max(1, Math.round((finalTlCount / totalDynamic) * 100));

    // Languages analytical table data (Most Selected Languages - أكثر اللغات اختياراً)
    const baseLangData = [
      { code: 'ar', name: isEnglish ? 'Arabic' : 'العربية', codeDisplay: 'AR', flag: '🇸🇦', count: finalArCount, percentage: finalArPercent, color: 'bg-emerald-500' },
      { code: 'en', name: 'English', codeDisplay: 'EN', flag: '🇬🇧', count: finalEnCount, percentage: finalEnPercent, color: 'bg-sky-500' },
      { code: 'fr', name: isEnglish ? 'French' : 'Français', codeDisplay: 'FR', flag: '🇫🇷', count: finalFrCount, percentage: finalFrPercent, color: 'bg-purple-500' },
      { code: 'hi', name: isEnglish ? 'Hindi' : 'हिन्दी', codeDisplay: 'IN', flag: '🇮🇳', count: finalHiCount, percentage: finalHiPercent, color: 'bg-amber-500' },
      { code: 'ur', name: isEnglish ? 'Urdu' : 'اردو', codeDisplay: 'PK', flag: '🇵🇰', count: finalUrCount, percentage: finalUrPercent, color: 'bg-gray-400' },
      { code: 'am', name: isEnglish ? 'Amharic' : 'አمارኛ', codeDisplay: 'ET', flag: '🇪🇹', count: finalAmCount, percentage: finalAmPercent, color: 'bg-teal-500' },
      { code: 'tl', name: isEnglish ? 'Filipino' : 'Filipino', codeDisplay: 'PH', flag: '🇵🇭', count: finalTlCount, percentage: finalTlPercent, color: 'bg-rose-400' },
    ];

    const languagesTableData = baseLangData.sort((a, b) => b.count - a.count).map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));

    // 8 Grid Cards Data matching top section
    const summaryCards = [
      {
        id: 'ar',
        rankTag: '01',
        name: isEnglish ? 'Arabic' : 'العربية',
        flag: '🇸🇦',
        date: tfProfile.arDate,
        percentage: finalArPercent,
        selectionCount: finalArCount,
        badgeNumber: '22',
        lastSelection: tfProfile.arLastSel,
      },
      {
        id: 'en',
        rankTag: '02',
        name: 'English',
        flag: '🇬🇧',
        date: tfProfile.enDate,
        percentage: finalEnPercent,
        selectionCount: finalEnCount,
        badgeNumber: '22',
        lastSelection: tfProfile.enLastSel,
      },
      {
        id: 'hi',
        rankTag: '03',
        name: isEnglish ? 'Hindi' : 'हिन्दी',
        flag: '🇮🇳',
        date: tfProfile.otherDate,
        percentage: finalHiPercent > 1 ? finalHiPercent : (langTimeframeFilter === '30d' ? 0 : finalHiPercent),
        selectionCount: finalHiCount,
        badgeNumber: '02',
        lastSelection: tfProfile.otherLastSel,
      },
      {
        id: 'ur',
        rankTag: '04',
        name: isEnglish ? 'Urdu' : 'أردو',
        flag: '🇵🇰',
        date: tfProfile.otherDate,
        percentage: finalUrPercent > 1 ? finalUrPercent : (langTimeframeFilter === '30d' ? 0 : finalUrPercent),
        selectionCount: finalUrCount,
        badgeNumber: '01',
        lastSelection: tfProfile.otherLastSel,
      },
      {
        id: 'am',
        rankTag: '05',
        name: isEnglish ? 'Amharic' : 'አمارኛ',
        flag: '🇪🇹',
        date: tfProfile.otherDate,
        percentage: finalAmPercent > 1 ? finalAmPercent : (langTimeframeFilter === '30d' ? 0 : finalAmPercent),
        selectionCount: finalAmCount,
        badgeNumber: '02',
        lastSelection: tfProfile.otherLastSel,
      },
      {
        id: 'tl',
        rankTag: '06',
        name: isEnglish ? 'Filipino' : 'Filipino',
        flag: '🇵🇭',
        date: tfProfile.otherDate,
        percentage: finalTlPercent > 1 ? finalTlPercent : (langTimeframeFilter === '30d' ? 0 : finalTlPercent),
        selectionCount: finalTlCount,
        badgeNumber: '02',
        lastSelection: tfProfile.otherLastSel,
      },
      {
        id: 'fr',
        rankTag: '07',
        name: isEnglish ? 'French' : 'Français',
        flag: '🇫🇷',
        date: tfProfile.otherDate,
        percentage: finalFrPercent > 1 ? finalFrPercent : (langTimeframeFilter === '30d' ? 0 : finalFrPercent),
        selectionCount: finalFrCount,
        badgeNumber: '03',
        lastSelection: tfProfile.otherLastSel,
      },
      {
        id: 'tag',
        rankTag: '08',
        name: isEnglish ? 'Tagalog' : 'Tagalog',
        flag: '🇵🇭',
        date: tfProfile.otherDate,
        percentage: 0,
        selectionCount: finalTagCount,
        badgeNumber: '01',
        lastSelection: '--',
      },
    ];

    const arCount = (allLangsCustomers['ar'] || []).length;
    const enCount = (allLangsCustomers['en'] || []).length;

    return {
      rankedLanguages,
      displayedCustomers,
      customerTableRows,
      languagesTableData,
      summaryCards,
      arCount,
      enCount,
      totalFeedbackCount: feedbacks.length,
      selectedBranchName: isEnglish ? selectedBranchObj.nameEn : selectedBranchObj.nameAr,
      selectedTimeframeLabel: isEnglish ? tfProfile.labelEn : tfProfile.labelAr,
    };
  }, [feedbacks, languages, currentLangCode, selectedLangRankingFilter, langCustomerSearch, isEnglish, langTimeframeFilter, langBranchFilter]);

  // Open customer profile modal
  const handleOpenCustomerModal = (fb: CustomerFeedback) => {
    const key = (fb.customerPhone && fb.customerPhone !== 'غير مسجل') ? fb.customerPhone.trim() : (fb.customerName?.trim() || '');
    const prof = customerProfilesMap.get(key);
    if (prof) {
      setSelectedCustomer(prof);
      setIsCustomerModalOpen(true);
    }
  };

  const handleOpenCustomerModalByKey = (customerKey: string) => {
    const prof = customerProfilesMap.get(customerKey);
    if (prof) {
      setSelectedCustomer(prof);
      setIsCustomerModalOpen(true);
    } else {
      const refCustomer = languageAnalytics.customerTableRows.find(c => c.customerKey === customerKey);
      if (refCustomer) {
        setSelectedCustomer({
          name: refCustomer.name,
          phone: refCustomer.phone,
          email: `${refCustomer.customerId.toLowerCase()}@panda.com.sa`,
          totalVisits: refCustomer.visitCount,
          isRepeat: refCustomer.visitCount > 1,
          mostChosenSection: currentLangCode === 'en' ? 'Fresh Produce & Bakery' : 'الأغذية الطازجة والمخبوزات',
          mostChosenProducts: [
            { name: currentLangCode === 'en' ? 'Fresh Croissant' : 'كرواسون طازج', count: 4 },
            { name: currentLangCode === 'en' ? 'Organic Milk' : 'حليب عضوي طازج', count: 3 }
          ],
          latestVisitDate: refCustomer.lastVisit,
          latestScore: 100,
          bestScore: 100,
          totalScore: refCustomer.visitCount * 95,
          feedbacks: []
        });
        setIsCustomerModalOpen(true);
      }
    }
  };

  return (
    <div 
      dir={isRTL ? "rtl" : "ltr"} 
      style={{ backgroundColor: activePalette.bgLight || '#F8FAFC' }}
      className="w-full min-h-screen font-sans text-gray-800 flex flex-col md:flex-row select-none overflow-x-hidden relative transition-colors duration-300"
    >
      {/* Background soft blurs matching the open palette */}
      <div 
        className="fixed -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl -z-10 pointer-events-none transition-colors duration-500" 
        style={{ backgroundColor: activePalette.secondary, opacity: 0.12 }}
      />
      <div 
        className="fixed -top-20 -right-20 w-80 h-80 rounded-full blur-3xl -z-10 pointer-events-none transition-colors duration-500" 
        style={{ backgroundColor: activePalette.accent, opacity: 0.15 }}
      />

      {/* Sticky / Fixed Side Panel (لوحة جانبية زي هذه وزبط اللوحة باحترافية) */}
      <DashboardSidebar
        activeSection={activeSidebarSection}
        onSelectSection={handleSelectSidebarSection}
        feedbacksCount={feedbacks.length}
        onPreviewCustomerJourney={onPreviewGame}
        onExportCSV={onExportCSV}
        onExportJSON={onExportJSON}
        onCloseDashboard={onPreviewGame}
        isEnglish={isEnglish}
        currentLangCode={currentLangCode}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />

      {/* Main Dashboard Content Area */}
      <div className="flex-1 min-w-0 p-3 sm:p-5 lg:p-7 flex flex-col items-center overflow-y-auto">
        {/* Top Header - Anchored on the Left and Never Flips */}
        <header className="w-full max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-4 mb-8" dir="ltr">
        {/* Right side: Experience ID, Language Selector, Sound, Honor Board */}
        <div className="flex items-center gap-2 order-2 sm:order-1 flex-wrap">
          <div className="bg-white border border-gray-100 rounded-full px-3.5 py-1.5 shadow-xs text-xs sm:text-sm font-medium flex items-center gap-2">
            <span className="text-gray-500">{texts.header.experienceNo}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Language Selector for ALL Available Languages in Dashboard */}
          <LanguageSelector
            id="dashboard-language-selector-btn"
            variant="header"
            languages={languages}
            currentLangCode={currentLangCode}
            onSelectLanguage={onSelectLanguage}
          />

          {/* Sound Toggle */}
          <button
            id="dashboard-sound-toggle-btn"
            onClick={onToggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer shadow-xs ${
              soundMuted
                ? 'bg-gray-100 border-gray-200 text-gray-400 hover:text-gray-600'
                : 'bg-emerald-50 border-emerald-200 text-[#005A2B] hover:bg-emerald-100'
            }`}
            title={soundMuted ? (isEnglish ? 'Unmute sound effects' : 'تشغيل المؤثرات الصوتية') : (isEnglish ? 'Mute sound effects' : 'كتم المؤثرات الصوتية')}
          >
            {soundMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Leaderboard Button */}
          <button
            id="dashboard-leaderboard-btn"
            onClick={onOpenLeaderboard}
            className="p-2 px-3 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title={texts.header.honorBoard}
          >
            <Trophy size={15} className="text-amber-600" />
            <span className="hidden sm:inline">{texts.header.honorBoard}</span>
          </button>
        </div>

        {/* Center: Highly Prominent Customer Preview Button (في النص وواضحة جداً) */}
        <div className="flex justify-center items-center order-1 sm:order-2">
          <button
            id="preview-customer-game-center-btn"
            onClick={onPreviewGame}
            className="bg-gradient-to-r from-emerald-600 via-[#005A2B] to-emerald-700 hover:from-emerald-500 hover:to-[#004722] text-white px-6 py-3 rounded-full font-black text-sm md:text-base flex items-center gap-3 shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-emerald-300/40 group animate-bounce-short"
            title={texts.header.previewExperience}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
            <span className="text-base tracking-wide">
              {texts.header.previewExperience}
            </span>
            <span className="text-amber-300 text-lg group-hover:scale-125 transition-transform">⚡</span>
            <ExternalLink size={17} className={`text-emerald-200 ${isEnglish ? 'group-hover:translate-x-[2px]' : 'group-hover:translate-x-[-2px]'} group-hover:translate-y-[-2px] transition-transform`} />
          </button>
        </div>

        {/* Brand Side */}
        <div className="flex items-center gap-3 order-3">
          <div className={isEnglish ? "text-left p-1" : "text-right p-1"}>
            <h1 className="text-2xl font-black text-[#005A2B] leading-none">
              {currentLangCode === 'ar' 
                ? (brandSettings?.brandTitleAr || texts.header.defaultBrandTitle) 
                : (brandSettings?.brandTitleEn || texts.header.defaultBrandTitle)}
            </h1>
            <p className="text-xs text-[#E34F26] font-bold">
              {currentLangCode === 'ar' 
                ? (brandSettings?.brandSubtitleAr || texts.header.defaultBrandSubtitle) 
                : (brandSettings?.brandSubtitleEn || texts.header.defaultBrandSubtitle)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div 
              onClick={onOpenBrandModal || onLogoClick}
              className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center w-[64px] h-[64px]"
              title={texts.header.manageBrand}
            >
              {(brandSettings?.logoUrl || logoUrl) ? (
                <img 
                  src={brandSettings?.logoUrl || logoUrl!} 
                  alt="Store Logo" 
                  className="w-full h-full object-contain rounded-xl drop-shadow-2xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-50 rounded-xl">
                  <span className="text-3xl">🐼</span>
                </div>
              )}
            </div>
            <button
              onClick={onOpenBrandModal || onLogoClick}
              className="bg-white hover:bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs cursor-pointer hover:border-emerald-500 transition-all whitespace-nowrap flex items-center gap-1"
            >
              <Store size={11} className="text-emerald-600" />
              <span>{texts.header.brandButton}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[1440px] space-y-8">
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
                onClick={onClearNotice} 
                className="text-white/80 hover:text-white text-xs bg-white/10 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                {isEnglish ? 'Dismiss' : 'إغلاق'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Top Header & Quick Action Bar - Shown only in Overview & Analytics sections */}
        {(activeSidebarSection === 'overview' || activeSidebarSection === 'analytics') && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3.5 rounded-2xl text-[#005A2B]">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800">
                  {texts.banner.title}
                </h2>
                <p className="text-gray-400 text-sm font-medium">
                  {texts.banner.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button 
                id="export-csv-btn"
                onClick={onExportCSV}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title={texts.banner.exportCsv}
              >
                <FileSpreadsheet size={16} />
                <span>{texts.banner.exportCsv}</span>
              </button>

              <button 
                id="export-json-btn"
                onClick={onExportJSON}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title={texts.banner.exportJson}
              >
                <FileJson size={16} />
                <span>{texts.banner.exportJson}</span>
              </button>

              <button 
                id="copy-summary-btn"
                onClick={onCopySummary}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title={texts.banner.copySummary}
              >
                <Copy size={16} />
                <span>{texts.banner.copySummary}</span>
              </button>

              {/* Quick Button for Customer Directory */}
              <button
                id="dashboard-customers-directory-btn"
                onClick={() => handleSelectSidebarSection('customers')}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                  activeSidebarSection === 'customers'
                    ? 'bg-[#005A2B] text-white border-green-800 shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
                title={texts.banner.customersDirectory}
              >
                <UserCheck size={16} className={activeSidebarSection === 'customers' ? 'text-amber-300' : 'text-[#005A2B]'} />
                <span>{texts.banner.customersDirectory}</span>
              </button>

              {/* Quick Button for Customer Journey Editor */}
              <button
                id="dashboard-journey-editor-btn"
                onClick={() => handleSelectSidebarSection('journey')}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                  activeSidebarSection === 'journey' || activeSidebarSection === 'questions'
                    ? 'bg-[#005A2B] text-white border-green-800 shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
                title={texts.banner.journeyEditor}
              >
                <Sliders size={16} className={activeSidebarSection === 'journey' ? 'text-amber-300' : 'text-[#005A2B]'} />
                <span>{texts.banner.journeyEditor}</span>
              </button>

              {/* Quick Button for Open Colors Panel */}
              <button
                id="dashboard-theme-colors-btn"
                onClick={() => handleSelectSidebarSection('brand')}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                  activeSidebarSection === 'brand'
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                }`}
                title={texts.banner.openColors}
              >
                <Palette size={16} className={activeSidebarSection === 'brand' ? 'text-white' : 'text-purple-600'} />
                <span>{texts.banner.openColors}</span>
              </button>

              {onNavigateToShowcase && (
                <button 
                  onClick={onNavigateToShowcase}
                  className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-3.5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title={texts.banner.cxShowcase}
                >
                  <Sparkles size={16} />
                  <span>{texts.banner.cxShowcase}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Section Navigation Header / Return to Overview Banner when viewing any non-overview section */}
        {activeSidebarSection !== 'overview' && (
          <div className="bg-white px-5 py-3.5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleSelectSidebarSection('overview')}
                className="text-xs font-bold text-slate-700 hover:text-[#005A2B] bg-slate-100 hover:bg-emerald-50 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ArrowLeft size={14} className={isEnglish ? '' : 'rotate-180'} />
                <span>{texts.banner.backToOverview}</span>
              </button>
              <span className="text-gray-300 font-light">/</span>
              <span className="text-xs font-black text-gray-800">
                {getSectionTitle(activeSidebarSection)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{texts.banner.activeSectionView}</span>
            </div>
          </div>
        )}

        {/* 1. Overview & KPIs Section (Default Visible View) */}
        {activeSidebarSection === 'overview' && (
          <div id="section-overview" className="space-y-6">
            {/* Dynamic Stats Grid - 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { 
                  label: texts.kpis.totalReviews, 
                  value: feedbacks.length.toString(), 
                  trend: `${feedbacks.length} ${texts.kpis.registeredResponses}`, 
                  accent: '#005A2B',
                  sec: '#E34F26',
                  up: true 
                },
                { 
                  label: texts.kpis.positiveSatisfaction, 
                  value: feedbacks.length > 0 
                    ? `${Math.round((feedbacks.filter(f => f.rating === 'great' || f.rating === 'good').length / feedbacks.length) * 100)}%`
                    : '75%', 
                  trend: texts.kpis.excellentImpression, 
                  accent: '#059669',
                  sec: '#D97706',
                  up: true 
                },
                { 
                  label: texts.kpis.avgGameScore, 
                  value: feedbacks.length > 0 
                    ? Math.round(feedbacks.reduce((acc, f) => acc + (f.score || 0), 0) / feedbacks.length).toString()
                    : '21', 
                  trend: texts.kpis.activeEngagement, 
                  accent: '#7C3AED',
                  sec: '#F59E0B',
                  up: true 
                },
                { 
                  label: texts.kpis.difficultyLevel, 
                  value: difficulty === 'hard' 
                    ? texts.kpis.diffHard 
                    : difficulty === 'medium' 
                      ? texts.kpis.diffMedium 
                      : texts.kpis.diffEasy, 
                  trend: texts.kpis.currentMode, 
                  accent: '#EA580C',
                  sec: '#005A2B',
                  up: true 
                },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[30px] flex flex-col items-center gap-2 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div 
                    className="absolute top-0 left-0 w-2.5 h-full transition-all" 
                    style={{ background: `linear-gradient(180deg, ${stat.accent}, ${stat.sec})` }}
                  />
                  <span 
                    className="text-4xl sm:text-5xl font-black tracking-tight"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm font-black text-gray-700">
                    {stat.label}
                  </span>
                  <div 
                    className="mt-1 px-3.5 py-1 rounded-full text-xs font-black border"
                    style={{ 
                      backgroundColor: `${stat.accent}12`,
                      borderColor: `${stat.accent}30`,
                      color: stat.accent 
                    }}
                  >
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Executive Analytics & Conversion Funnel Showcase (التحليلات وقمع التحويل التفاعلي الفخم) */}
            <OverviewAnalyticsFunnelShowcase
              feedbacks={feedbacks}
              onOpenFullAnalytics={() => handleSelectSidebarSection('analytics')}
              isEnglish={isEnglish}
              currentLangCode={currentLangCode}
            />

            {/* Shopper Traffic & Peak Hours Heatmap Matrix (خريطة الكثافة الحرارية لحركة المتسوقين وساعات الذروة) */}
            <OverviewShopperHeatmap feedbacks={feedbacks} isEnglish={isEnglish} />
          </div>
        )}

        {/* 2. Customer Experience Journey Editor Section */}
        {activeSidebarSection === 'journey' && (
          <div id="section-journey">
            <CustomerJourneyEditor
              config={journeyConfig}
              onSaveConfig={onSaveJourneyConfig || (() => {})}
              onResetConfig={onResetJourneyConfig || (() => {})}
              onPreviewCustomerJourney={onPreviewGame}
              onClose={() => handleSelectSidebarSection('overview')}
              isEnglish={isEnglish}
              initialTab="shopping"
            />
          </div>
        )}

        {/* 3. Branding, Logos & Interface Colors Section */}
        {activeSidebarSection === 'brand' && (
          <div id="section-brand" className="bg-white p-6 md:p-8 rounded-[36px] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: activePalette.primary }}
              >
                <Palette size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800">
                  {isEnglish ? 'Interface Colors & Branding Customization' : 'تخصيص الهوية والشعارات وألوان الواجهة المفتوحة 🎨'}
                </h3>
                <p className="text-gray-400 text-xs font-medium">
                  {isEnglish 
                    ? 'Pick coordinated color palettes and customize brand identity across dashboard and survey flows.' 
                    : 'اختر التدرج اللوني المناسب والشعارات ليتم حفظها وتطبيقها فوراً على لوحة التحكم وشاشات التسوق.'}
                </p>
              </div>
            </div>
            <ThemeColorSelector
              brandSettings={brandSettings || DEFAULT_BRAND_SETTINGS}
              onSaveBrandSettings={onSaveBrandSettings || (() => {})}
              isEnglish={isEnglish}
            />
          </div>
        )}

        {/* 4. AI Diagnostic Recommendations Section */}
        {activeSidebarSection === 'ai' && (
          <AiRecommendationsPanel feedbacks={feedbacks} isEnglish={isEnglish} />
        )}

        {/* 5. Customer Records Section (سجل العملاء المتكامل - قسم مخصص ومستقل) */}
        {activeSidebarSection === 'customers' && (
          <div id="section-customers" className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-6">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2.5 rounded-2xl text-[#005A2B]">
                  <UserCheck size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-gray-800">
                      {texts.directory.title}
                    </h3>
                    <span className="bg-emerald-100 text-[#005A2B] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {sortedFeedbacks.length} / {feedbacks.length}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {texts.directory.subtitle}
                  </p>
                </div>
              </div>

            {/* Export and Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onExportCSV}
                className="bg-[#005A2B] hover:bg-[#004722] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <FileSpreadsheet size={15} />
                <span>{texts.banner.exportCsv}</span>
              </button>

              <button
                onClick={onExportJSON}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileJson size={15} />
                <span>JSON</span>
              </button>

              <button
                onClick={onCopySummary}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                title={texts.banner.copySummary}
              >
                <Copy size={15} />
                <span>{texts.banner.copySummary}</span>
              </button>
            </div>
          </div>

          {/* Filter & Sorting Controls Bar (رتب التقييمات بالشهور والايام والاسابيع والتواريخ خاتياري) */}
          <div className="bg-gray-50/70 p-4 rounded-3xl border border-gray-100 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className={`absolute ${isEnglish ? 'left-3.5' : 'right-3.5'} top-1/2 -translate-y-1/2 text-gray-400`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={texts.directory.searchPlaceholder}
                  className={`w-full bg-white border border-gray-200 focus:border-[#005A2B] focus:ring-2 focus:ring-[#005A2B]/20 rounded-xl ${
                    isEnglish ? 'pl-10 pr-3' : 'pr-10 pl-3'
                  } py-2 text-xs font-medium text-gray-800 placeholder-gray-400 outline-none transition-all`}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className={`absolute ${isEnglish ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer`}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Time Period Tabs (الشهور / الأيام / الأسابيع / التواريخ) */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-gray-200 shadow-2xs overflow-x-auto">
                <button
                  onClick={() => setTimeFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    timeFilter === 'all'
                      ? 'bg-[#005A2B] text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {isEnglish ? 'All' : 'الكل'}
                </button>
                <button
                  onClick={() => setTimeFilter('today')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    timeFilter === 'today'
                      ? 'bg-[#005A2B] text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {isEnglish ? '📅 Today' : '📅 اليوم'}
                </button>
                <button
                  onClick={() => setTimeFilter('week')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    timeFilter === 'week'
                      ? 'bg-[#005A2B] text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {isEnglish ? '📆 This Week' : '📆 هذا الأسبوع'}
                </button>
                <button
                  onClick={() => setTimeFilter('month')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    timeFilter === 'month'
                      ? 'bg-[#005A2B] text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {isEnglish ? '🗓️ This Month' : '🗓️ هذا الشهر'}
                </button>
                <button
                  onClick={() => setTimeFilter('custom')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    timeFilter === 'custom'
                      ? 'bg-[#005A2B] text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Calendar size={13} />
                  <span>{isEnglish ? 'Custom Date' : 'تاريخ اختياري'}</span>
                </button>
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                  {isEnglish ? 'Sort:' : 'الترتيب:'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-gray-200 text-xs font-bold text-gray-700 py-2 px-3 rounded-xl focus:border-[#005A2B] outline-none cursor-pointer shadow-2xs"
                >
                  <option value="newest">{isEnglish ? '🕒 Newest First' : '🕒 الأحدث تاريخاً'}</option>
                  <option value="oldest">{isEnglish ? '⏳ Oldest First' : '⏳ الأقدم تاريخاً'}</option>
                  <option value="highest_score">{isEnglish ? '🏆 Highest Points' : '🏆 الأكثر نقاطاً'}</option>
                  <option value="most_visits">{isEnglish ? '🔄 Most Frequent Visits' : '🔄 الأكثر تكراراً ومشاركة'}</option>
                  <option value="highest_rating">{isEnglish ? '⭐ Highest Rating' : '⭐ التقييم الأعلى'}</option>
                </select>
              </div>
            </div>

            {/* Custom Date Picker Bar (shown when 'custom' is selected) */}
            {timeFilter === 'custom' && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2 border-t border-gray-200/60 flex items-center gap-3 flex-wrap text-xs font-medium text-gray-600"
              >
                <span className="font-bold flex items-center gap-1 text-emerald-800">
                  <Calendar size={14} />
                  {isEnglish ? 'Select participation date:' : 'اختر تاريخ المشاركات:'}
                </span>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-xs font-bold text-gray-800 focus:border-[#005A2B] outline-none cursor-pointer"
                />
                <span className="text-[11px] text-gray-400">
                  {isEnglish ? '(Displaying all reviews logged on this selected date)' : '(يتم عرض جميع التقييمات المسجلة في هذا التاريخ المحدد)'}
                </span>
              </motion.div>
            )}

            {/* Active Hour Filter Chip */}
            {selectedHour !== null && (
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 border border-amber-200">
                    <Clock size={13} className="text-amber-700" />
                    {isEnglish 
                      ? `Active Filter: Hour ${selectedHour === 0 ? '12 AM' : selectedHour < 12 ? `${selectedHour} AM` : selectedHour === 12 ? '12 PM' : `${selectedHour - 12} PM`}`
                      : `تصفية نشطة: الساعة ${selectedHour === 0 ? '12 ص' : selectedHour < 12 ? `${selectedHour} ص` : selectedHour === 12 ? '12 م' : `${selectedHour - 12} م`}`}
                  </span>
                  <span className="text-gray-500">
                    {isEnglish ? `(${sortedFeedbacks.length} customers in this hour)` : `(${sortedFeedbacks.length} عميل في هذه الساعة)`}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedHour(null)}
                  className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  {isEnglish ? 'Clear hour filter' : 'إلغاء تصفية الساعة'}
                </button>
              </div>
            )}
          </div>

          {/* Customer Records Table (بالترتيب المحدد نصاً من العميل) */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className={`w-full ${isRTL ? 'text-right' : 'text-left'} text-xs`}>
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 text-[11px] font-black uppercase tracking-wider">
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col1}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col2}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col3}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col4}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col5}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col6}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col7}</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">{dirTableHeaders.col8}</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">{dirTableHeaders.viewProfile}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {sortedFeedbacks.length > 0 ? (
                  sortedFeedbacks.map((item) => {
                    const key = (item.customerPhone && item.customerPhone !== 'غير مسجل' && item.customerPhone !== 'Unregistered')
                      ? item.customerPhone.trim()
                      : (item.customerName?.trim() || '');
                    const prof = customerProfilesMap.get(key);
                    const totalVisits = prof ? prof.totalVisits : 1;
                    const isRepeat = totalVisits > 1;
                    const visitIndex = prof 
                      ? (prof.feedbacks.length - prof.feedbacks.findIndex(f => f.id === item.id))
                      : 1;
                    const topSection = prof?.mostChosenSection || item.section || (isEnglish ? 'General' : 'عام');
                    const topProduct = prof?.mostChosenProducts[0]?.name || item.selectedProducts[0] || (isEnglish ? 'Assorted' : 'متنوع');

                    return (
                      <tr 
                        key={item.id} 
                        className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                        onClick={() => handleOpenCustomerModal(item)}
                      >
                        {/* 1. Customer Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                              isRepeat 
                                ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-300' 
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.customerName ? item.customerName.charAt(0) : (isEnglish ? 'P' : 'ب')}
                            </div>
                            <div>
                              <div className="font-black text-gray-800 group-hover:text-[#005A2B] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                                <span>{item.customerName || texts.directory.defaultCustomerName}</span>
                                {isRepeat && (
                                  <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-black">
                                    {isEnglish ? 'Loyal' : 'دائم'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Customer Phone */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono text-gray-700 font-bold text-xs" dir="ltr">
                            <Phone size={11} className="text-gray-400" />
                            <span>{item.customerPhone || texts.directory.notRegistered}</span>
                          </div>
                        </td>

                        {/* 3. Section Chosen */}
                        <td className="py-3.5 px-4 font-bold text-gray-700 whitespace-nowrap">
                          <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg text-[11px] font-black inline-block">
                            {item.section || item.preference || (isEnglish ? 'General' : 'عام')}
                          </span>
                        </td>

                        {/* 4. Products */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[280px]">
                            {item.selectedProducts && item.selectedProducts.length > 0 ? (
                              item.selectedProducts.slice(0, 3).map((prod, pIdx) => (
                                <span key={pIdx} className="text-[10px] bg-green-50 text-green-800 px-2 py-0.5 rounded-md font-bold border border-green-100 whitespace-nowrap">
                                  {prod}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                            {item.selectedProducts && item.selectedProducts.length > 3 && (
                              <span className="text-[9px] text-gray-500 font-black bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                +{item.selectedProducts.length - 3}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 5. Repeated Visits Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {isRepeat ? (
                            <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-2xs">
                              <Repeat size={11} />
                              <span>{isEnglish ? `Visited ${totalVisits} times` : `شارك ${totalVisits} مرات`}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                              <span>{isEnglish ? 'First Visit' : 'أول زيارة'}</span>
                            </span>
                          )}
                        </td>

                        {/* 6. What he chose the most across his visits */}
                        <td className="py-3.5 px-4">
                          <div className="text-[11px] font-bold text-gray-800 whitespace-nowrap">
                            <span className="text-[#005A2B] font-black">{topSection}</span>
                          </div>
                          <div className="text-[10px] text-gray-500 truncate max-w-[160px]" title={topProduct}>
                            🛒 {topProduct}
                          </div>
                        </td>

                        {/* 7. Last visit by number and date */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-black text-gray-800 text-[11px]">
                            {isEnglish ? `Visit #${visitIndex}` : `الزيارة #${visitIndex}`}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {prof?.latestVisitDate || item.timestamp}
                          </div>
                        </td>

                        {/* 8. Points */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-black text-[#005A2B] text-sm">
                            {item.score || 0} {isEnglish ? 'pts' : 'نقطة'}
                          </div>
                          <div className="text-[10px] text-gray-400 font-bold">
                            {item.difficulty === 'hard' 
                              ? (isEnglish ? 'Pro 🔥' : 'محترف 🔥') 
                              : item.difficulty === 'medium' 
                                ? (isEnglish ? 'Medium ⚡' : 'متوسط ⚡') 
                                : (isEnglish ? 'Easy 🟢' : 'سهل 🟢')}
                          </div>
                        </td>

                        {/* 9. Full customer details button */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleOpenCustomerModal(item)}
                            className="bg-emerald-50 hover:bg-[#005A2B] text-[#005A2B] hover:text-white border border-emerald-200 px-3 py-1.5 rounded-xl font-black text-[11px] flex items-center justify-center gap-1 transition-all mx-auto shadow-2xs cursor-pointer"
                          >
                            <User size={13} />
                            <span>{texts.directory.viewProfile}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search size={32} className="text-gray-300" />
                        <span className="font-bold text-sm">
                          {isEnglish ? 'No reviews match the selected filter or search' : 'لا توجد تقييمات مطابقة للفترة أو البحث المحدد'}
                        </span>
                        <button
                          onClick={() => {
                            setTimeFilter('all');
                            setSelectedHour(null);
                            setSearchQuery('');
                          }}
                          className="text-xs text-[#005A2B] font-bold underline cursor-pointer mt-1"
                        >
                          {isEnglish ? 'Reset all filters and show all' : 'إعادة تعيين جميع الفلاتر وعرض الكل'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

        {/* Customer Satisfaction Surveys & Table QR Platform */}
        {activeSidebarSection === 'surveys' && (
          <div id="section-surveys" className="space-y-6">
            <SurveyCustomizerPlatform isEnglish={isEnglish} />
          </div>
        )}

        {/* 7. Analytics & Product Popularity + Language Breakdown Section */}
        {activeSidebarSection === 'analytics' && (
          <div id="section-analytics" className="space-y-8">
            {/* New Comprehensive Executive Analytics & Funnel & Heatmap Dashboard */}
            <ExecutiveAnalyticsPanel
              feedbacks={feedbacks}
              journeyConfig={journeyConfig}
              brandSettings={brandSettings}
              isEnglish={isEnglish}
              onExportCSV={onExportCSV}
              onOpenCustomerModal={handleOpenCustomerModal}
            />

        {/* Languages Popularity Ranking & Top Customers Section (ترتيب أكثر اللغات اختياراً وقائمة العملاء الأكثر استخداماً) */}
        <div className="bg-white p-4 sm:p-6 rounded-[28px] border border-gray-200/80 shadow-xs space-y-5">
          {/* Section Main Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#005A2B] flex items-center justify-center border border-emerald-100/80 shrink-0">
                <Globe size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-gray-800 tracking-tight">
                    {langAnalyticsTexts.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                    {languageAnalytics.selectedBranchName}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {langAnalyticsTexts.subtitle}
                </p>
              </div>
            </div>

            {/* Header Right Filters & Live Indicator */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Real-time badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{langAnalyticsTexts.liveBadge}</span>
              </div>

              {/* Branch Filter Dropdown (تفعيل الفروع والقنوات) */}
              <div className="relative">
                <select
                  value={langBranchFilter}
                  onChange={(e) => setLangBranchFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-8 pl-3 text-xs font-bold text-gray-700 hover:border-gray-300 focus:outline-none focus:border-[#005A2B] cursor-pointer shadow-2xs"
                >
                  {STORE_BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>
                      {isEnglish ? b.nameEn : b.nameAr}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rtl:left-2.5 rtl:right-auto ltr:right-2.5 ltr:left-auto" />
              </div>
            </div>
          </div>

          {/* Timeframe Filter Buttons Toolbar (تفعيل كل أزرار التواريخ وتفاعل اليوم والأمس) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/70 p-2.5 sm:p-3 rounded-2xl border border-gray-200/60">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-emerald-100/60 text-[#005A2B]">
                <TrendingUp size={15} />
              </div>
              <span className="text-xs font-black text-gray-700">
                {langAnalyticsTexts.timeframeLabel}
              </span>
            </div>

            {/* Timeframe interactive buttons: اليوم، الأمس، 7 أيام، 30 يوم، جميع الأوقات */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'today', labelAr: 'اليوم', labelEn: 'Today', icon: '⚡' },
                { id: 'yesterday', labelAr: 'الأمس', labelEn: 'Yesterday', icon: '⏮️' },
                { id: '7d', labelAr: 'آخر 7 أيام', labelEn: 'Last 7 Days', icon: '📅' },
                { id: '30d', labelAr: 'آخر 30 يوم', labelEn: 'Last 30 Days', icon: '🗓️' },
                { id: 'all', labelAr: 'جميع الأوقات', labelEn: 'All Time', icon: '♾️' },
              ].map((tf) => {
                const isActive = langTimeframeFilter === tf.id;
                return (
                  <button
                    key={tf.id}
                    onClick={() => setLangTimeframeFilter(tf.id as LangTimeframe)}
                    className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                      isActive
                        ? 'bg-[#005A2B] text-white shadow-xs scale-[1.02]'
                        : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <span>{tf.icon}</span>
                    <span>{isEnglish ? tf.labelEn : tf.labelAr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Header info note */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-bold">
              <span>{langAnalyticsTexts.rankingHint}</span>
              <span className="text-gray-400 font-normal">({isEnglish ? `Showing for: ${langTimeframeFilter.toUpperCase()}` : `الفترة المحددة: ${langTimeframeFilter === 'today' ? 'اليوم' : langTimeframeFilter === 'yesterday' ? 'الأمس' : langTimeframeFilter === '7d' ? 'آخر 7 أيام' : langTimeframeFilter === '30d' ? 'آخر 30 يوم' : 'جميع الأوقات'}`})</span>
            </div>
            {selectedLangRankingFilter !== 'all' && (
              <button
                onClick={() => setSelectedLangRankingFilter('all')}
                className="text-[11px] font-bold text-[#005A2B] hover:underline cursor-pointer"
              >
                {langAnalyticsTexts.resetFilter}
              </button>
            )}
          </div>

          {/* 8 Compact Language Cards Grid (صغر طول الكروت لتوفير المساحة) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2.5">
            {languageAnalytics.summaryCards.map((card) => {
              const isSelected = selectedLangRankingFilter === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedLangRankingFilter(isSelected ? 'all' : card.id)}
                  className={`bg-white rounded-xl border p-2 sm:p-2.5 flex flex-col justify-between transition-all hover:shadow-xs cursor-pointer ${
                    isSelected 
                      ? 'border-[#005A2B] ring-2 ring-[#005A2B]/20 bg-emerald-50/30 shadow-2xs' 
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  {/* Card Top: Percentage & Rank Badge */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-base font-black text-gray-900 leading-tight">
                      {card.percentage}%
                    </span>
                    <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                      {card.badgeNumber}
                    </span>
                  </div>

                  {/* Card Flag & Name */}
                  <div className="my-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm leading-none">{card.flag}</span>
                      <span className="font-bold text-xs text-gray-900 truncate">{card.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-gray-400 font-medium mt-0.5 truncate">
                      <Calendar size={9} className="text-gray-400 shrink-0" />
                      <span className="truncate">{card.date}</span>
                    </div>
                  </div>

                  {/* Card Metric Row */}
                  <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10px]">
                    <div>
                      <span className="text-gray-400 text-[9px] block">
                        {isEnglish ? 'Count' : 'المرات'}
                      </span>
                      <span className="font-black text-emerald-700 text-xs leading-tight">
                        {card.selectionCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-left rtl:text-left ltr:text-right">
                      <span className="text-gray-400 text-[9px] block">
                        {isEnglish ? 'Latest' : 'أحدث'}
                      </span>
                      <span className="font-bold text-gray-600 text-[10px] leading-tight">
                        {card.lastSelection}
                      </span>
                    </div>
                  </div>

                  {/* Compact Quick Select Indicator */}
                  <div className="mt-1.5 pt-1 border-t border-gray-50 text-center">
                    <span className={`text-[10px] font-bold block transition-colors ${
                      isSelected ? 'text-[#005A2B]' : 'text-gray-400 hover:text-gray-600'
                    }`}>
                      {isSelected ? langAnalyticsTexts.selectedBadge : langAnalyticsTexts.selectBtn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Dual Tables Grid - Wide and fully visible columns */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start pt-1">
            {/* Table 1: Top Active Customers Register (سجل العملاء الأكثر استخداماً) */}
            <div className="xl:col-span-6 bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-[#005A2B]">
                    <UserCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800">
                      {langAnalyticsTexts.customersTitle}
                    </h4>
                    <span className="text-[10px] text-gray-400 block font-medium">
                      {langAnalyticsTexts.customersSubtitle}
                    </span>
                  </div>
                  {selectedLangRankingFilter !== 'all' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                      {isEnglish ? `Lang: ${selectedLangRankingFilter.toUpperCase()}` : `لغة: ${selectedLangRankingFilter.toUpperCase()}`}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedLangRankingFilter !== 'all' && (
                    <button
                      onClick={() => setSelectedLangRankingFilter('all')}
                      className="text-[11px] font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                      {langAnalyticsTexts.resetFilter}
                    </button>
                  )}
                  <button
                    onClick={() => setShowAllCustomersTable(!showAllCustomersTable)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/60 transition-colors cursor-pointer"
                  >
                    {showAllCustomersTable 
                      ? langAnalyticsTexts.showLess 
                      : langAnalyticsTexts.viewAll}
                  </button>
                </div>
              </div>

              <div className="mt-3.5 overflow-x-auto">
                <table className={`w-full ${isRTL ? 'text-right' : 'text-left'} text-xs border-collapse`}>
                  <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-100 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-2.5">#</th>
                      <th className="py-2.5 px-2.5">{langAnalyticsTexts.colName}</th>
                      <th className="py-2.5 px-2.5">{langAnalyticsTexts.colId}</th>
                      <th className="py-2.5 px-2.5">{langAnalyticsTexts.colLastVisit}</th>
                      <th className="py-2.5 px-2.5 text-center">{langAnalyticsTexts.colVisits}</th>
                      <th className="py-2.5 px-2.5">{langAnalyticsTexts.colLanguage}</th>
                      <th className="py-2.5 px-2.5 text-center">{langAnalyticsTexts.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(showAllCustomersTable 
                      ? languageAnalytics.customerTableRows 
                      : languageAnalytics.customerTableRows.slice(0, 5)
                    ).map((cust, idx) => (
                      <tr
                        key={cust.customerKey || idx}
                        onClick={() => handleOpenCustomerModalByKey(cust.customerKey)}
                        className="hover:bg-emerald-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-2.5 px-2.5 font-bold text-gray-400 group-hover:text-gray-600">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-2.5 font-bold text-gray-900 group-hover:text-[#005A2B]">
                          {cust.name}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-[11px] font-semibold text-gray-500">
                          {cust.customerId}
                        </td>
                        <td className="py-2.5 px-2.5 font-medium text-gray-600">
                          <span className={cust.lastVisit === 'اليوم' || cust.lastVisit === 'Today' ? 'text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded' : (cust.lastVisit === 'أمس' || cust.lastVisit === 'Yesterday' ? 'text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded' : '')}>
                            {cust.lastVisit}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 font-black text-gray-800 text-center">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[11px]">
                            {cust.visitCount}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-50 border border-gray-200/60 text-[10px] font-medium text-gray-700">
                            <span>{cust.flag}</span>
                            <span className="font-bold text-gray-500">{cust.languageCodeDisplay}</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 text-center">
                          {cust.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {langAnalyticsTexts.statusActive}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              {langAnalyticsTexts.statusClosed}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Most Selected Languages (مربع أكثر اللغات اختياراً - عريض ومظهر لجميع الأعمدة) */}
            <div className="xl:col-span-6 bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-2xs min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-[#005A2B]">
                    <Globe size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800">
                      {langAnalyticsTexts.languagesTitle}
                    </h4>
                    <span className="text-[10px] text-gray-400 block font-medium">
                      {langAnalyticsTexts.languagesSubtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAllLanguagesTable(!showAllLanguagesTable)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/60 transition-colors cursor-pointer"
                  >
                    {showAllLanguagesTable 
                      ? langAnalyticsTexts.showTop5 
                      : langAnalyticsTexts.viewAll}
                  </button>
                </div>
              </div>

              {/* Wide Table with all columns clearly displayed */}
              <div className="mt-3.5 overflow-x-auto">
                <table className={`w-full ${isRTL ? 'text-right' : 'text-left'} text-xs border-collapse`}>
                  <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-100 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3 w-8 text-center">#</th>
                      <th className="py-2.5 px-3 min-w-[130px]">{langAnalyticsTexts.colLang}</th>
                      <th className="py-2.5 px-3 w-14 text-center">{langAnalyticsTexts.colCode}</th>
                      <th className="py-2.5 px-3 text-center min-w-[100px]">{langAnalyticsTexts.colCount}</th>
                      <th className="py-2.5 px-3 min-w-[140px]">{langAnalyticsTexts.colPercent}</th>
                      <th className="py-2.5 px-3 text-center min-w-[80px]">{langAnalyticsTexts.colClassification}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(showAllLanguagesTable 
                      ? languageAnalytics.languagesTableData 
                      : languageAnalytics.languagesTableData.slice(0, 5)
                    ).map((langRow) => {
                      const isFilterActive = selectedLangRankingFilter === langRow.code;
                      return (
                        <tr
                          key={langRow.code}
                          onClick={() => setSelectedLangRankingFilter(isFilterActive ? 'all' : langRow.code)}
                          className={`hover:bg-emerald-50/40 transition-colors cursor-pointer ${
                            isFilterActive ? 'bg-emerald-50/70 font-bold' : ''
                          }`}
                        >
                          {/* Rank # */}
                          <td className="py-2.5 px-3 text-center">
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                              langRow.rank === 1 ? 'bg-amber-100 text-amber-800' :
                              langRow.rank === 2 ? 'bg-sky-100 text-sky-800' :
                              langRow.rank === 3 ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {langRow.rank}
                            </span>
                          </td>

                          {/* Language with Flag & Native Name */}
                          <td className="py-2.5 px-3 font-bold text-gray-900">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none">{langRow.flag}</span>
                              <span className="truncate">{langRow.name}</span>
                            </div>
                          </td>

                          {/* Code */}
                          <td className="py-2.5 px-3 text-center">
                            <span className="font-mono text-[11px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                              {langRow.codeDisplay}
                            </span>
                          </td>

                          {/* Selections Count */}
                          <td className="py-2.5 px-3 text-center font-black text-gray-800">
                            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md font-mono text-xs">
                              {langRow.count.toLocaleString()}
                            </span>
                          </td>

                          {/* Percentage + Progress Bar */}
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <span className="font-black text-gray-900 min-w-[32px] text-xs">
                                {langRow.percentage}%
                              </span>
                              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden min-w-[60px]">
                                <div
                                  className={`h-full rounded-full ${langRow.color}`}
                                  style={{ width: `${Math.max(langRow.percentage, 2)}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-2.5 px-3 text-center">
                            {langRow.rank === 1 ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                {langAnalyticsTexts.statusDominant}
                              </span>
                            ) : langRow.rank === 2 ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                                {langAnalyticsTexts.statusHigh}
                              </span>
                            ) : langRow.percentage >= 2 ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {langAnalyticsTexts.statusActiveLang}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-500 border border-gray-200">
                                {langAnalyticsTexts.statusSecondary}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

        {/* 8. Smart Vouchers Engine Section */}
        {activeSidebarSection === 'vouchers' && (
          <VouchersEnginePanel isEnglish={isEnglish} />
        )}

        {/* 8.5. Loyalty Management Section (إدارة برامج الولاء والمكافآت) */}
        {activeSidebarSection === 'loyalty' && (
          <LoyaltyManagementPanel isEnglish={isEnglish} />
        )}

        {/* 9. Customer Leaderboard & Champions Section */}
        {activeSidebarSection === 'leaderboard' && (
          <CustomerLeaderboardPanel 
            feedbacks={feedbacks} 
            onOpenCustomerModal={handleOpenCustomerModal} 
            onTriggerFullModal={onOpenLeaderboard} 
            isEnglish={isEnglish} 
          />
        )}

        {/* 10. RBAC Matrix Section (#section-rbac) */}
        {activeSidebarSection === 'rbac' && (
          <RbacMatrixPanel isEnglish={isEnglish} />
        )}

        {/* 12. Security Audit Log Section (#section-audit) */}
        {activeSidebarSection === 'audit' && (
          <SecurityAuditLogPanel isEnglish={isEnglish} />
        )}
      </main>
      </div>

      {/* Customer Comprehensive Profile Modal (الملف الشامل لتفاصيل العميل) */}
      <CustomerDetailsModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        customer={selectedCustomer}
        isEnglish={isEnglish}
      />
    </div>
  );
};
