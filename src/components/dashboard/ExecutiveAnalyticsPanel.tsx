import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Star, 
  Award, 
  AlertCircle, 
  Filter, 
  Download, 
  Search, 
  Share2, 
  Sliders, 
  Sparkles, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Coffee, 
  Utensils, 
  ShoppingBag, 
  Smartphone, 
  QrCode, 
  Wifi, 
  MessageSquare, 
  ArrowUpRight, 
  Eye,
  Layers,
  FileSpreadsheet,
  Grid,
  Check,
  Percent,
  X,
  Building2,
  Table,
  UserCheck,
  Smile,
  ThumbsUp,
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { CustomerFeedback, CustomerJourneyConfig, BrandSettings, DepartmentConfig } from '../../types';

export interface ExecutiveAnalyticsPanelProps {
  feedbacks: CustomerFeedback[];
  journeyConfig?: CustomerJourneyConfig;
  brandSettings?: BrandSettings;
  isEnglish?: boolean;
  onExportCSV?: () => void;
  onOpenCustomerModal?: (feedback: CustomerFeedback) => void;
}

type TabType = 'overview_charts' | 'hourly_heatmap' | 'funnel' | 'pivot_table' | 'service_restaurant' | 'voter_register';

interface HeatmapCell {
  revenue: number;
  orders: number;
  tier: 'low' | 'normal' | 'medium' | 'peak';
}

export const ExecutiveAnalyticsPanel: React.FC<ExecutiveAnalyticsPanelProps> = ({
  feedbacks = [],
  journeyConfig,
  brandSettings,
  isEnglish = false,
  onExportCSV,
  onOpenCustomerModal,
}) => {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<TabType>('overview_charts');
  const [showAllInOnePage, setShowAllInOnePage] = useState<boolean>(false);

  // Heatmap interactive states
  const [heatmapBranch, setHeatmapBranch] = useState<string>('all');
  const [heatmapCategory, setHeatmapCategory] = useState<'all' | 'restaurant' | 'cafe' | 'supermarket'>('all');
  const [heatmapMetric, setHeatmapMetric] = useState<'both' | 'revenue' | 'orders'>('both');
  const [selectedHeatCell, setSelectedHeatCell] = useState<{
    day: string;
    dayEn: string;
    time: string;
    revenue: number;
    orders: number;
    tier: 'low' | 'normal' | 'medium' | 'peak';
  } | null>(null);

  // Voter register filters & search
  const [voterRatingFilter, setVoterRatingFilter] = useState<string>('all');
  const [voterBranchFilter, setVoterBranchFilter] = useState<string>('all');
  const [voterSearch, setVoterSearch] = useState<string>('');

  // Project business name & brand
  const brandName = isEnglish 
    ? (brandSettings?.brandNameEn || 'Sahaab Cafe & Restaurant')
    : (brandSettings?.brandNameAr || 'كافيه ومطعم سحاب');

  // Baseline data blended with real customer feedbacks
  const realCount = feedbacks.length;
  const totalResponses = 7850 + realCount;
  const activeSurveysCount = 8;
  const completionRate = 94.8;
  const averageRating = 4.9;

  // 1. Dynamic product voting calculations from journeyConfig + real feedbacks
  const topProductsList = useMemo(() => {
    // Extract products from journeyConfig departments
    const configuredProducts: { name: string; nameEn?: string; icon: string; count: number; category: string }[] = [];
    
    if (journeyConfig?.departments && journeyConfig.departments.length > 0) {
      journeyConfig.departments.forEach((dept: DepartmentConfig) => {
        (dept.products || []).forEach(p => {
          configuredProducts.push({
            name: p.name,
            nameEn: p.nameEn,
            icon: p.icon || '🛍️',
            count: 0,
            category: dept.name
          });
        });
      });
    }

    // Default rich food & coffee products as in the reference image
    const baseList = [
      { name: 'كولد برو مقطر (قهوة مختصة)', nameEn: 'Drip Cold Brew (Specialty)', icon: '☕', count: 918, percent: 84, category: 'مقهى' },
      { name: 'ستيك ريب آي بريميوم', nameEn: 'Premium Ribeye Steak', icon: '🥩', count: 765, percent: 70, category: 'مطعم' },
      { name: 'كوردون بلو كرسبي (دجاج مقرمش)', nameEn: 'Crispy Cordon Bleu', icon: '🍗', count: 672, percent: 61, category: 'مطعم' },
      { name: 'واغيو برجر فاخر (لحم أنجوس)', nameEn: 'Luxury Wagyu Burger', icon: '🍔', count: 618, percent: 56, category: 'مطعم' },
      { name: 'ترافل تاغلياتيل باستا', nameEn: 'Truffle Tagliatelle Pasta', icon: '🍝', count: 590, percent: 53, category: 'مطعم' },
      { name: 'كولد برو جوز الهند المنعش', nameEn: 'Coconut Cold Brew', icon: '🥥', count: 541, percent: 49, category: 'مقهى' },
    ];

    // If customer selected products in live feedbacks, augment counts
    feedbacks.forEach(f => {
      (f.selectedProducts || []).forEach(prodName => {
        const found = baseList.find(b => b.name === prodName || b.name.includes(prodName));
        if (found) {
          found.count += 1;
        }
      });
    });

    return baseList;
  }, [journeyConfig, feedbacks]);

  // 2. Heatmap Matrix Data (Exact numbers and tiers matching Image 2)
  const heatmapTimes = [
    { id: '08:00 AM', label: '08:00 AM' },
    { id: '11:00 AM', label: '11:00 AM' },
    { id: '02:00 PM', label: '02:00 PM' },
    { id: '05:00 PM', label: '05:00 PM' },
    { id: '08:00 PM', label: '08:00 PM (Peak)' },
    { id: '11:00 PM', label: '11:00 PM' },
  ];

  const heatmapDays = [
    {
      dayAr: 'الأحد',
      dayEn: 'Sunday',
      slots: [
        { revenue: 1925, orders: 49, tier: 'low' },
        { revenue: 2246, orders: 57, tier: 'normal' },
        { revenue: 2808, orders: 71, tier: 'medium' },
        { revenue: 3690, orders: 94, tier: 'medium' },
        { revenue: 3690, orders: 94, tier: 'medium' },
        { revenue: 1925, orders: 49, tier: 'normal' },
      ] as HeatmapCell[]
    },
    {
      dayAr: 'الإثنين',
      dayEn: 'Monday',
      slots: [
        { revenue: 1925, orders: 49, tier: 'low' },
        { revenue: 2406, orders: 61, tier: 'normal' },
        { revenue: 3048, orders: 77, tier: 'medium' },
        { revenue: 3931, orders: 100, tier: 'medium' },
        { revenue: 3931, orders: 100, tier: 'medium' },
        { revenue: 1925, orders: 49, tier: 'normal' },
      ] as HeatmapCell[]
    },
    {
      dayAr: 'الثلاثاء',
      dayEn: 'Tuesday',
      slots: [
        { revenue: 1925, orders: 49, tier: 'low' },
        { revenue: 2567, orders: 65, tier: 'normal' },
        { revenue: 3209, orders: 82, tier: 'medium' },
        { revenue: 4171, orders: 106, tier: 'medium' },
        { revenue: 4171, orders: 106, tier: 'medium' },
        { revenue: 2086, orders: 53, tier: 'normal' },
      ] as HeatmapCell[]
    },
    {
      dayAr: 'الأربعاء',
      dayEn: 'Wednesday',
      slots: [
        { revenue: 1925, orders: 49, tier: 'low' },
        { revenue: 2808, orders: 71, tier: 'normal' },
        { revenue: 3529, orders: 90, tier: 'medium' },
        { revenue: 4652, orders: 118, tier: 'medium' },
        { revenue: 4652, orders: 118, tier: 'medium' },
        { revenue: 2326, orders: 59, tier: 'normal' },
      ] as HeatmapCell[]
    },
    {
      dayAr: 'الخميس',
      dayEn: 'Thursday',
      slots: [
        { revenue: 2487, orders: 63, tier: 'low' },
        { revenue: 3690, orders: 94, tier: 'normal' },
        { revenue: 4572, orders: 116, tier: 'medium' },
        { revenue: 6016, orders: 153, tier: 'peak' },
        { revenue: 6016, orders: 153, tier: 'peak' },
        { revenue: 2968, orders: 75, tier: 'normal' },
      ] as HeatmapCell[]
    },
    {
      dayAr: 'الجمعة',
      dayEn: 'Friday',
      slots: [
        { revenue: 2808, orders: 71, tier: 'low' },
        { revenue: 4091, orders: 104, tier: 'normal' },
        { revenue: 5134, orders: 130, tier: 'medium' },
        { revenue: 6738, orders: 171, tier: 'peak' },
        { revenue: 6738, orders: 171, tier: 'peak' },
        { revenue: 3289, orders: 84, tier: 'normal' },
      ] as HeatmapCell[]
    },
    {
      dayAr: 'السبت',
      dayEn: 'Saturday',
      slots: [
        { revenue: 2166, orders: 55, tier: 'low' },
        { revenue: 3289, orders: 84, tier: 'normal' },
        { revenue: 4091, orders: 104, tier: 'medium' },
        { revenue: 5294, orders: 135, tier: 'peak' },
        { revenue: 5294, orders: 135, tier: 'peak' },
        { revenue: 2647, orders: 67, tier: 'normal' },
      ] as HeatmapCell[]
    },
  ];

  // Helper function for Heatmap cell styling matching Image 2
  const getHeatmapTierStyles = (tier: 'low' | 'normal' | 'medium' | 'peak') => {
    switch (tier) {
      case 'low':
        return {
          bg: 'bg-[#f1f5f9] text-[#334155]',
          border: 'border-slate-200/90',
          badge: isEnglish ? 'Low' : 'منخفض',
          subtext: 'text-slate-500 font-bold',
          colorDot: 'bg-slate-400'
        };
      case 'normal':
        return {
          bg: 'bg-[#d1fae5] text-[#065f46]',
          border: 'border-emerald-300/80',
          badge: isEnglish ? 'Normal' : 'طبيعي',
          subtext: 'text-emerald-700 font-bold',
          colorDot: 'bg-emerald-500'
        };
      case 'medium':
        return {
          bg: 'bg-[#fbbf24] text-[#78350f]',
          border: 'border-amber-400/90',
          badge: isEnglish ? 'Medium-High' : 'متوسط مرتفع',
          subtext: 'text-amber-900 font-black',
          colorDot: 'bg-amber-500'
        };
      case 'peak':
        return {
          bg: 'bg-[#f43f5e] text-white',
          border: 'border-rose-600',
          badge: isEnglish ? 'Peak' : 'ذروة قصوى (Peak)',
          subtext: 'text-white font-black',
          colorDot: 'bg-rose-600 animate-pulse'
        };
    }
  };

  // 3. Voter Register List matching Image 1
  const votersList = useMemo(() => {
    const baseVoters = [
      {
        id: 'v-1',
        name: 'أحمد العتيبي',
        phone: '055****321',
        typeBadge: 'مقهى ☕',
        rating: 5,
        dishName: 'كولد برو مقطر (قهوة)',
        dishCategory: 'مقهى',
        branch: 'فرع التخصصي - الرياض',
        date: '2024-05-18 • 10:45 AM',
        comment: 'القهوة رائعة جداً وإيحاءات الفواكه واضحة. التريث هنا يريح النفس وجلسة العمل ممتازة ومثالية للإنتاجية.',
        replyNote: 'حضور مميز! تم منح العميل كود خصم إضافي للقهوة المقطرة في الزيارات القادمة 🎁'
      },
      {
        id: 'v-2',
        name: 'سارة الشمري',
        phone: '059****654',
        typeBadge: 'مطعم 🍽️',
        rating: 5,
        dishName: 'معكرونة الترافل والبارميزان (Tagliatelle)',
        dishCategory: 'مطعم',
        branch: 'فرع طريق الملك - جدة',
        date: '2024-05-18 • 10:25 AM',
        comment: 'طبق الترافل خيال وفريد جداً! الصوص كريمي وغني واللحم مستوي ومطبوخ بطريقة ممتازة وخدمة راقية جداً.',
        replyNote: 'ملاحظة التقديم: تم إرسال رسالة شكر للعميلة مع حسم خاص للوجبة القادمة ✨'
      },
      {
        id: 'v-3',
        name: 'خالد الغامدي',
        phone: '050****882',
        typeBadge: 'كافيه ☕',
        rating: 5,
        dishName: 'كولد برو سحاب الشوان',
        dishCategory: 'مقهى',
        branch: 'فرع التخصصي - الرياض',
        date: '2024-05-18 • 09:12 AM',
        comment: 'الكولد برو منعش جداً ولذيذ، والمكان هادئ ومناسب للعمل واجتماعات الصباح مع الأصدقاء.',
        replyNote: 'تم تسجيل العميل ضمن قائمة رواد الفترات الصباحية المعتمدة ☀️'
      },
      {
        id: 'v-4',
        name: 'نورة السبيعي',
        phone: '054****119',
        typeBadge: 'مطعم 🍽️',
        rating: 5,
        dishName: 'ستيك ريب آي بريميوم مشوي',
        dishCategory: 'مطعم',
        branch: 'فرع النخيل - الرياض',
        date: '2024-05-17 • 08:30 PM',
        comment: 'الستيك مطهو بدرجة استواء مثالية medium well، وصوص الفلفل الأسود مع البطاطا المهروسة لا يُعلى عليه!',
        replyNote: 'تمت مشاركة الإشادة مع شيف الشواء الرئيسي 👨‍🍳'
      }
    ];

    // Merge real feedbacks if available
    feedbacks.forEach((fb, idx) => {
      baseVoters.unshift({
        id: fb.id || `live-${idx}`,
        name: fb.customerName || (isEnglish ? 'Valued Customer' : 'عميل متميز'),
        phone: fb.customerPhone ? fb.customerPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2') : '05********',
        typeBadge: fb.businessType === 'restaurant' ? 'مطعم 🍽️' : fb.businessType === 'cafe' ? 'مقهى ☕' : 'سوبرماركت 🛒',
        rating: (fb.rating === 'great' || fb.overallRating === 'great' || (fb.score && fb.score > 200)) ? 5 : 4,
        dishName: (fb.selectedProducts && fb.selectedProducts.length > 0) ? fb.selectedProducts.join(' + ') : 'اختيار قسم المفضلة',
        dishCategory: fb.section || 'عام',
        branch: 'فرع التخصصي - الرياض',
        date: fb.timestamp || 'اليوم',
        comment: fb.comment || 'تجربة تسوق وتناول ممتازة، تنظيم احترافي وتطبيق سهل وتفاعلي للغاية.',
        replyNote: 'تقييم موثق عبر تجربة العميل التفاعلية مباشرة'
      });
    });

    return baseVoters;
  }, [feedbacks, isEnglish]);

  // Filtered voters
  const filteredVoters = useMemo(() => {
    return votersList.filter(v => {
      const matchRating = voterRatingFilter === 'all' || (voterRatingFilter === '5' && v.rating === 5) || (voterRatingFilter === '4' && v.rating === 4);
      const matchBranch = voterBranchFilter === 'all' || v.branch.includes(voterBranchFilter);
      const matchSearch = !voterSearch.trim() || 
        v.name.toLowerCase().includes(voterSearch.toLowerCase()) || 
        v.phone.includes(voterSearch) || 
        v.dishName.toLowerCase().includes(voterSearch.toLowerCase()) ||
        v.comment.toLowerCase().includes(voterSearch.toLowerCase());
      return matchRating && matchBranch && matchSearch;
    });
  }, [votersList, voterRatingFilter, voterBranchFilter, voterSearch]);

  return (
    <div className="space-y-6 sm:space-y-8 font-sans text-gray-800">
      {/* 1. TOP SUB-NAVIGATION TABS BAR (مطابق للأزرار العلوية بالصورتين 1 و 2) */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Tabs Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-nowrap">
            {/* Tab 1: التقرير الموسع والرسوم البيانية */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('overview_charts');
                setShowAllInOnePage(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === 'overview_charts' && !showAllInOnePage
                  ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-gray-700 hover:bg-slate-100 border-gray-200'
              }`}
            >
              <BarChart3 size={15} className="shrink-0" />
              <span>{isEnglish ? 'Expanded Report & Charts' : 'التقرير الموسع والرسوم البيانية'}</span>
            </button>

            {/* Tab 2: مصفوفة الكثافة الحرارية لساعات الذروة (Heatmap) 🔥 (Image 2) */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('hourly_heatmap');
                setShowAllInOnePage(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === 'hourly_heatmap' && !showAllInOnePage
                  ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-[#005A2B] text-white border-emerald-600 shadow-xs ring-2 ring-emerald-300'
                  : 'bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100 border-emerald-200'
              }`}
            >
              <Flame size={15} className="text-amber-300 shrink-0" />
              <span>{isEnglish ? 'Hourly Heatmap' : 'مصفوفة الكثافة الحرارية لساعات الذروة (Heatmap) 🔥'}</span>
            </button>

            {/* Tab: قمع التحويل والمسار 🎯 */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('funnel');
                setShowAllInOnePage(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === 'funnel' && !showAllInOnePage
                  ? 'bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-800 text-white border-teal-600 shadow-xs ring-2 ring-teal-300'
                  : 'bg-slate-50 text-gray-700 hover:bg-slate-100 border-gray-200'
              }`}
            >
              <TrendingUp size={15} className="shrink-0" />
              <span>{isEnglish ? 'Conversion Funnel' : 'قمع التحويل ومسار العملاء 🎯'}</span>
            </button>

            {/* Tab 3: جدول بيفوت المحوري للأرقام 📊 */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('pivot_table');
                setShowAllInOnePage(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === 'pivot_table' && !showAllInOnePage
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-gray-700 hover:bg-slate-100 border-gray-200'
              }`}
            >
              <Table size={15} className="shrink-0" />
              <span>{isEnglish ? 'Pivot Table Matrix' : 'جدول بيفوت المحوري للأرقام 📊'}</span>
            </button>

            {/* Tab 4: تقرير المطعم والأكل والخدمة 🍽️ */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('service_restaurant');
                setShowAllInOnePage(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === 'service_restaurant' && !showAllInOnePage
                  ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-50 text-gray-700 hover:bg-slate-100 border-gray-200'
              }`}
            >
              <Utensils size={15} className="shrink-0" />
              <span>{isEnglish ? 'Restaurant & Food Report' : 'تقرير المطعم والأكل والخدمة 🍽️'}</span>
            </button>

            {/* Tab 5: سجل المصوتين التفصيلي (عين صوت) 👤 */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('voter_register');
                setShowAllInOnePage(false);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === 'voter_register' && !showAllInOnePage
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white border-purple-600 shadow-xs'
                  : 'bg-slate-50 text-gray-700 hover:bg-slate-100 border-gray-200'
              }`}
            >
              <Users size={15} className="shrink-0" />
              <span>{isEnglish ? 'Detailed Voter Register (Voice)' : 'سجل المصوتين التفصيلي (عين صوت) 👤'}</span>
            </button>
          </div>

          {/* Quick Actions (All-in-One view + Export CSV) */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowAllInOnePage(!showAllInOnePage)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                showAllInOnePage
                  ? 'bg-slate-900 text-white border-slate-950 shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
              }`}
              title="عرض جميع التقارير والمصفوفات والبيفوت في صفحة واحدة متكاملة"
            >
              <Layers size={13} />
              <span>{showAllInOnePage ? (isEnglish ? 'Tabs Mode' : 'الرجوع للتبويبات') : (isEnglish ? 'Full View (All)' : 'عرض الكل متكامل')}</span>
            </button>

            {onExportCSV && (
              <button
                type="button"
                onClick={onExportCSV}
                className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                title="تصدير بيانات الاستبيانات والتحليلات إلى ملف Excel / CSV"
              >
                <Download size={13} />
                <span>{isEnglish ? 'Export CSV' : 'تصدير الأرقام'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. TOP 4 KPI CARDS (مطابق للأربع بطاقات العلوية بالصورة 1) */}
      {(showAllInOnePage || activeTab === 'overview_charts' || activeTab === 'pivot_table') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: إجمالي الاستبيانات النشطة */}
          <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block mb-1">
                {isEnglish ? 'Total Active Surveys' : 'إجمالي الاستبيانات النشطة'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {isEnglish ? `${activeSurveysCount} Surveys` : `استبيانات ${activeSurveysCount}`}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                {isEnglish ? 'Active in all branches now' : 'استبيانات وقنوات فعالة حالياً'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100 shrink-0">
              <FileSpreadsheet size={22} />
            </div>
          </div>

          {/* Card 2: الاستبيانات المكتملة والردود */}
          <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block mb-1">
                {isEnglish ? 'Completed Surveys & Responses' : 'الاستبيانات المكتملة والردود'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {isEnglish ? `${totalResponses.toLocaleString()} Responses` : `${totalResponses.toLocaleString()} رد`}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 block mt-1">
                {isEnglish ? '100% verified complete responses' : 'ردود مكتملة بالكامل ومحققة'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Card 3: معدل إكمال الاستبيانات */}
          <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block mb-1">
                {isEnglish ? 'Survey Completion Rate' : 'معدل إكمال الاستبيانات'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {completionRate}%
                </span>
              </div>
              <span className="text-[11px] font-bold text-teal-600 block mt-1">
                {isEnglish ? 'Very high retention & completion' : 'نسبة إكمال واستجابة عالية جداً'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shrink-0">
              <Percent size={22} />
            </div>
          </div>

          {/* Card 4: متوسط تقييم الاستبيانات */}
          <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-sm transition-all flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block mb-1">
                {isEnglish ? 'Average Survey Rating' : 'متوسط تقييم الاستبيانات'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">
                  {averageRating} / 5
                </span>
              </div>
              <span className="text-[11px] font-bold text-amber-600 block mt-1 flex items-center gap-1">
                <Star size={12} className="fill-amber-400 text-amber-500" />
                <span>{isEnglish ? 'High Customer CSAT & Loyalty' : 'درجة رضا العملاء (ممتاز)'}</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
              <Star size={22} className="fill-amber-400 text-amber-500" />
            </div>
          </div>
        </div>
      )}

      {/* 3. NINE ANALYTICAL CHARTS GRID (شبكة الـ 9 بطاقات بيانية من الصورة 1) */}
      {(showAllInOnePage || activeTab === 'overview_charts') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* ROW 1 - CARD 1: حالة الاستبيانات وتوزيع الردود (Donut Chart) */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Survey Status & Response Distribution' : 'حالة الاستبيانات وتوزيع الردود'}
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Total responses by completion status' : 'توزيع إجمالي ردود الاستبيانات حسب اكتمال العميل'}
                </p>
              </div>

              {/* Donut Visual */}
              <div className="py-5 flex flex-col items-center justify-center relative">
                <div className="w-40 h-40 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    {/* مكتملة 78% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#005A2B" strokeWidth="12" strokeDasharray="186.2 238.7" strokeDashoffset="0" />
                    {/* قيد الانتظار 14% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="33.4 238.7" strokeDashoffset="-186.2" />
                    {/* مستمرة 8% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="19.1 238.7" strokeDashoffset="-219.6" />
                  </svg>
                  <div className="absolute text-center flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-400">{isEnglish ? 'Total Responses' : 'إجمالي الردود'}</span>
                    <span className="text-lg font-black text-gray-900 leading-tight">7,850</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-3 text-[11px] font-bold flex-wrap">
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#005A2B]" />
                  <span>مكتملة (78%)</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>معلقة (14%)</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>مستمرة (8%)</span>
                </span>
              </div>
            </div>

            {/* ROW 1 - CARD 2: نمو حجم التصويت حسب الشهور (Bar Chart) */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Monthly Voting Volume Growth' : 'نمو حجم التصويت حسب الشهور'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    +159.2% 📈
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Completed votes evolution by month' : 'تطور عدد الأصوات والردود المكتملة شهرياً'}
                </p>
              </div>

              {/* Vertical Bars */}
              <div className="py-4">
                <div className="h-40 flex items-end justify-between gap-3 px-2 border-b border-gray-200/70 pb-2">
                  {[
                    { month: 'مايو', value: 780, height: '26%' },
                    { month: 'يونيو', value: 1980, height: '64%' },
                    { month: 'يوليو', value: 2050, height: '67%' },
                    { month: 'أغسطس', value: 3180, height: '98%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-black text-indigo-700 opacity-80 group-hover:opacity-100">
                        {bar.value.toLocaleString()}
                      </span>
                      <div 
                        style={{ height: bar.height }} 
                        className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-indigo-700 to-indigo-500 group-hover:from-blue-600 group-hover:to-indigo-400 transition-all shadow-xs"
                      />
                      <span className="text-[11px] font-bold text-gray-500 pt-1">
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  نمو ملحوظ بالشهر الحالي +159.2%
                </span>
                <span className="text-gray-400 font-bold">أغسطس 2024</span>
              </div>
            </div>

            {/* ROW 1 - CARD 3: الأصوات حسب الأسابيع الأخيرة (Horizontal Bar Chart) */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Votes in Recent Weeks' : 'الأصوات حسب الأسابيع الأخيرة'}
                  </h4>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    ذروة التفاعل
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Weekly engagement volume with QR codes' : 'حجم التفاعل الأسبوعي مع كروت الباركود'}
                </p>
              </div>

              {/* Horizontal Bars */}
              <div className="py-3 space-y-2.5">
                {[
                  { week: 'الأسبوع 4', value: 2270, percent: 92 },
                  { week: 'الأسبوع 3', value: 2420, percent: 100 },
                  { week: 'الأسبوع 2', value: 1950, percent: 79 },
                  { week: 'الأسبوع 1', value: 1210, percent: 50 },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-gray-600">{item.week}</span>
                      <span className="text-indigo-700 font-mono">{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-700" 
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500 font-bold">ذروة التفاعل: الخميس والجمعة</span>
                <span className="text-indigo-600 font-black">معدل مرتفع ⚡</span>
              </div>
            </div>

            {/* ROW 2 - CARD 4: أكثر المشروبات والوجبات طلباً وتصويتاً */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Top Ordered & Voted Items' : 'أكثر المشروبات والوجبات طلباً وتصويتاً'}
                  </h4>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    الأكثر طلباً 🔥
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Ranked by customer voting & preferences' : 'ترتيب الأصناف بحسب رغبات العملاء المصوتين'}
                </p>
              </div>

              <div className="py-2.5 space-y-2">
                {topProductsList.slice(0, 5).map((prod, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center text-[11px] font-bold mb-1">
                      <span className="text-gray-800 flex items-center gap-1 truncate">
                        <span>{prod.icon}</span>
                        <span className="truncate">{prod.name}</span>
                      </span>
                      <span className="text-emerald-700 font-mono text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                        {prod.count} صوت
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-[#005A2B] h-full rounded-full transition-all duration-700" 
                        style={{ width: `${Math.min(100, Math.max(25, (prod.count / 918) * 100))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#005A2B]">الأولى: كولد برو مقطر (قهوة مختصة) ☕</span>
                <span className="text-gray-400 font-bold">ارتقاء بنسبة الإقبال</span>
              </div>
            </div>

            {/* ROW 2 - CARD 5: توزيع الأصوات حسب الفروع (Grouped Double Bars) */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Votes Distribution by Branch' : 'توزيع الأصوات حسب الفروع'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    مقارنة الفروع
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Branch share across both store & restaurant' : 'مقارنة حصة الفروع في كلا نوعي النشاط والطلب'}
                </p>
              </div>

              {/* Grouped Bars */}
              <div className="py-3">
                <div className="h-44 flex items-end justify-between gap-2 px-1 border-b border-gray-200 pb-2">
                  {[
                    { branch: 'فرع التخصصي', foodCount: 850, nonFoodCount: 650, foodH: '85%', nonFoodH: '65%' },
                    { branch: 'فرع طريق الملك', foodCount: 720, nonFoodCount: 510, foodH: '72%', nonFoodH: '51%' },
                    { branch: 'فرع النخيل', foodCount: 610, nonFoodCount: 380, foodH: '61%', nonFoodH: '38%' },
                    { branch: 'فرع الأندلس', foodCount: 460, nonFoodCount: 290, foodH: '46%', nonFoodH: '29%' },
                  ].map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="flex items-end justify-center gap-1.5 w-full h-full">
                        {/* Food / Fresh Section Bar (Green) */}
                        <div className="flex flex-col items-center justify-end h-full">
                          <span className="text-[9px] font-mono font-black text-[#005A2B] mb-0.5">
                            {b.foodCount}
                          </span>
                          <div 
                            style={{ height: b.foodH }} 
                            className="w-3.5 sm:w-4 rounded-t-md bg-[#005A2B] shadow-2xs hover:brightness-110 transition-all" 
                            title={`قسم الأغذية والطازج: ${b.foodCount}`} 
                          />
                        </div>
                        {/* Non-Food / Care Section Bar (Teal) */}
                        <div className="flex flex-col items-center justify-end h-full">
                          <span className="text-[9px] font-mono font-black text-teal-700 mb-0.5">
                            {b.nonFoodCount}
                          </span>
                          <div 
                            style={{ height: b.nonFoodH }} 
                            className="w-3.5 sm:w-4 rounded-t-md bg-teal-500 shadow-2xs hover:brightness-110 transition-all" 
                            title={`قسم العناية والمنزلية: ${b.nonFoodCount}`} 
                          />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 truncate max-w-[65px] text-center pt-1">
                        {b.branch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px] font-bold">
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#005A2B]" />
                  <span>الأغذية والطازج</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-teal-500" />
                  <span>العناية والمنزلية</span>
                </span>
              </div>
            </div>

            {/* ROW 2 - CARD 6: قنوات دخول ومشاركة الاستبيان (Channels Donut) */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Survey Channels & Sources' : 'قنوات دخول ومشاركة الاستبيان'}
                  </h4>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    QR & NFC
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Breakdown by QR, NFC, WhatsApp & SMS' : 'الباركود QR، NFC، واتساب، دخول مباشر للاستبيان'}
                </p>
              </div>

              {/* Mini Donut + Breakdown */}
              <div className="py-2.5 flex items-center justify-center">
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="11" />
                    {/* QR Code: 49.8% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#6366f1" strokeWidth="11" strokeDasharray="118.9 238.7" strokeDashoffset="0" />
                    {/* NFC: 22.8% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#005A2B" strokeWidth="11" strokeDasharray="54.4 238.7" strokeDashoffset="-118.9" />
                    {/* WhatsApp: 16.9% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#06b6d4" strokeWidth="11" strokeDasharray="40.3 238.7" strokeDashoffset="-173.3" />
                    {/* Direct link: 6.5% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="11" strokeDasharray="15.5 238.7" strokeDashoffset="-213.6" />
                    {/* SMS: 4.0% */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f43f5e" strokeWidth="11" strokeDasharray="9.5 238.7" strokeDashoffset="-229.1" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[11px] font-black text-gray-800">49.8%</span>
                    <span className="text-[9px] font-bold text-gray-400 block">الطاولة QR</span>
                  </div>
                </div>
              </div>

              {/* Chips */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] font-bold flex-wrap">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">الباركود QR: 49.8%</span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">الكاشير NFC: 22.8%</span>
                <span className="bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-full border border-cyan-200">واتساب: 16.9%</span>
              </div>
            </div>

            {/* ROW 3 - CARD 7: تقييم تعامل الموظفين والخدمة */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Staff Hospitality & Service Rating' : 'تقييم تعامل الموظفين والخدمة'}
                  </h4>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    <Star size={13} className="fill-amber-400" />
                    <span className="text-xs font-black">4.91</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Staff performance, friendliness & hospitality' : 'تقييم كفاءة أداء طاقم العمل والترحيب والاستقبال'}
                </p>
              </div>

              <div className="py-2.5 space-y-2">
                {[
                  { label: 'لباقة طاقم خدمة العملاء والتجاوب السريع', score: '4.95', percent: 98 },
                  { label: 'الالتزام بالمعايير والنظافة وترتيب الممرات', score: '4.92', percent: 96 },
                  { label: 'استقبال الكاشير وسرعة الدفع والمحاسبة', score: '4.91', percent: 95 },
                  { label: 'توفر المنتجات الطازجة وتنوع عروض بنده', score: '4.88', percent: 93 },
                ].map((row, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-gray-700 truncate">{row.label}</span>
                      <span className="text-indigo-700 font-mono shrink-0 font-bold">{row.score} ⭐</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full" 
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-gray-700">المعدل الإجمالي العام للخدمة:</span>
                <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">97% ممتاز</span>
              </div>
            </div>

            {/* ROW 3 - CARD 8: مؤشر الرضا العام ومعدل النجاح */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Overall CSAT & Success Index' : 'مؤشر الرضا العام ومعدل النجاح'}
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    راضي بالكامل
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Customer satisfaction and net recommendation' : 'نسبة رضا العملاء الشامل وتوصيتهم بالمكان'}
                </p>
              </div>

              {/* Big Percentage Showcase */}
              <div className="py-4 text-center">
                <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight block">
                  96.4%
                </span>
                <span className="text-xs font-bold text-gray-500 mt-1 block">
                  من الزوار أبدوا رضاهم الكامل وتوصيتهم بالمكان
                </span>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <TrendingUp size={13} />
                    <span>راضي بالكامل +1.6% 📈</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">مقارنة بـ 2024</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="text-gray-500 font-bold">المستهدف المحدد: 90%</span>
                <span className="text-emerald-700 font-black">+6.4% فوق المستهدف</span>
              </div>
            </div>

            {/* ROW 3 - CARD 9: أبرز مقترحات وتحسينات العملاء */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">
                    {isEnglish ? 'Top Customer Suggestions' : 'أبرز مقترحات وتحسينات العملاء'}
                  </h4>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    قسم العمليات
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  {isEnglish ? 'Key operational insights requested by visitors' : 'أبرز نقاط التطوير المطلوبة من الزوار'}
                </p>
              </div>

              {/* Suggestion items */}
              <div className="py-2 space-y-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 flex items-start gap-2">
                  <Clock size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-800">تسريع كاونترات المحاسبة والكاشير</span>
                      <span className="text-[10px] font-bold text-blue-700">44%</span>
                    </div>
                    <span className="text-[10px] text-gray-500 block">في ساعات الذروة المسائية (الخميس والجمعة) لتفادي طوابير العربات</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 flex items-start gap-2">
                  <MapPin size={16} className="text-purple-600 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-800">توفير عربات تسوق إضافية عند المداخل</span>
                      <span className="text-[10px] font-bold text-purple-700">31%</span>
                    </div>
                    <span className="text-[10px] text-gray-500 block">تأمين عربات معقمة وسلسة الحركة بالقرب من البوابات</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 flex items-start gap-2">
                  <Utensils size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-800">زيادة تنوع المنتجات العضوية والطازجة</span>
                      <span className="text-[10px] font-bold text-emerald-700">25%</span>
                    </div>
                    <span className="text-[10px] text-gray-500 block">طلب بدائل صحية وعضوية في قسم الأغذية الصحية والطازجة</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-gray-600">أولويات قسم العمليات</span>
                <span className="text-emerald-700 font-bold hover:underline cursor-pointer">مراجعة كفاءة خدمة الفروع ←</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. HOURLY HEATMAP (IMAGE 2) - مصفوفة الكثافة الحرارية لساعات الذروة */}
      {(showAllInOnePage || activeTab === 'hourly_heatmap') && (
        <div id="hourly-heatmap-section" className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/90 shadow-xs space-y-6">
          {/* Header Row: Title & Color Legend (Image 2 Top Right) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#005A2B] border border-emerald-200">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <span>(Hourly Heatmap) مصفوفة الكثافة الحرارية لساعات الذروة</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    {isEnglish 
                      ? 'In-depth daily peak hours analysis, checkout staff planning, and shopper service velocity' 
                      : 'تحليل دقيق لأوقات الازدحام اليومية، توزيع موظفي الكاشير والأقسام الطازجة وسرعة خدمة المتسوقين في الفروع'}
                  </p>
                </div>
              </div>
            </div>

            {/* COLOR LEGEND (مطابق لليجند الموجود أعلى يمين الصورة 2) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200/80 flex-wrap">
              <span className="text-[11px] font-black text-gray-700">مقياس الكثافة:</span>
              
              {/* منخفض */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#f1f5f9] border border-slate-300" />
                <span className="text-[11px] font-bold text-gray-600">منخفض</span>
              </div>

              {/* طبيعي */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#d1fae5] border border-emerald-300" />
                <span className="text-[11px] font-bold text-emerald-800">طبيعي</span>
              </div>

              {/* متوسط مرتفع */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#fbbf24] border border-amber-400" />
                <span className="text-[11px] font-bold text-amber-900">متوسط مرتفع</span>
              </div>

              {/* ذروة قصوى (Peak) */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#f43f5e] border border-rose-600 shadow-2xs" />
                <span className="text-[11px] font-black text-rose-700">ذروة قصوى (Peak)</span>
              </div>
            </div>
          </div>

          {/* Controls & Filters Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/60 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-gray-700 flex items-center gap-1">
                <Filter size={13} className="text-[#005A2B]" />
                <span>فرز المصفوفة:</span>
              </span>

              {/* Branch Filter */}
              <select
                value={heatmapBranch}
                onChange={(e) => setHeatmapBranch(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-2.5 py-1 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#005A2B] cursor-pointer"
              >
                <option value="all">جميع الفروع الموحدة</option>
                <option value="takhassusi">فرع التخصصي - الرياض</option>
                <option value="kingroad">فرع طريق الملك - جدة</option>
                <option value="nakheel">فرع النخيل - الرياض</option>
                <option value="airport">فرع المطار الدولي</option>
              </select>

              {/* Category Filter */}
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-gray-200">
                {[
                  { id: 'all', label: 'كافة الأقسام 🛒' },
                  { id: 'fresh', label: 'الأغذية والطازج 🥬' },
                  { id: 'general', label: 'التموين والمنزلية 🧴' },
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setHeatmapCategory(c.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heatmapCategory === c.id
                        ? 'bg-[#005A2B] text-white shadow-2xs'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Display Mode */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-bold">عرض الأرقام:</span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setHeatmapMetric('both')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${heatmapMetric === 'both' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                >
                  المبيعات + الطلبات
                </button>
                <button
                  type="button"
                  onClick={() => setHeatmapMetric('revenue')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${heatmapMetric === 'revenue' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                >
                  ريال SAR فقط
                </button>
                <button
                  type="button"
                  onClick={() => setHeatmapMetric('orders')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${heatmapMetric === 'orders' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                >
                  الطلبات فقط
                </button>
              </div>
            </div>
          </div>

          {/* THE HEATMAP MATRIX TABLE (Image 2) */}
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-center border-separate border-spacing-2 min-w-[760px]">
              {/* Header: Times */}
              <thead>
                <tr>
                  <th className="py-2 px-3 text-right rtl:text-right ltr:text-left text-xs font-black text-gray-700 w-24">
                    {isEnglish ? 'Day' : 'اليوم'}
                  </th>
                  {heatmapTimes.map((time) => (
                    <th 
                      key={time.id} 
                      className={`py-2 px-3 text-xs font-black ${
                        time.id.includes('Peak') ? 'text-rose-600 bg-rose-50/70 rounded-xl' : 'text-gray-700'
                      }`}
                    >
                      {time.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows: 7 Days */}
              <tbody>
                {heatmapDays.map((row) => (
                  <tr key={row.dayAr}>
                    {/* Day Name */}
                    <td className="py-2.5 px-3 text-right rtl:text-right ltr:text-left font-black text-xs text-gray-800 whitespace-nowrap">
                      {isEnglish ? row.dayEn : row.dayAr}
                    </td>

                    {/* 6 Time Slots */}
                    {row.slots.map((slot, slotIdx) => {
                      const styles = getHeatmapTierStyles(slot.tier);
                      const timeHeader = heatmapTimes[slotIdx]?.label || '';
                      const isSelected = selectedHeatCell?.day === row.dayAr && selectedHeatCell?.time === timeHeader;

                      return (
                        <td key={slotIdx} className="p-0">
                          <button
                            type="button"
                            onClick={() => setSelectedHeatCell({
                              day: row.dayAr,
                              dayEn: row.dayEn,
                              time: timeHeader,
                              revenue: slot.revenue,
                              orders: slot.orders,
                              tier: slot.tier
                            })}
                            className={`w-full py-2.5 px-2 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:scale-[1.03] active:scale-95 shadow-2xs ${styles.bg} ${styles.border} ${
                              isSelected ? 'ring-4 ring-slate-900 shadow-md scale-[1.04]' : ''
                            }`}
                            title={`اضغط لمعاينة تشخيص وردية ${row.dayAr} الساعة ${timeHeader}`}
                          >
                            {/* Revenue */}
                            {(heatmapMetric === 'both' || heatmapMetric === 'revenue') && (
                              <span className={`text-xs font-black tracking-tight ${slot.tier === 'peak' ? 'text-white' : 'text-gray-900'}`}>
                                {slot.revenue.toLocaleString()} SAR
                              </span>
                            )}
                            {/* Orders count */}
                            {(heatmapMetric === 'both' || heatmapMetric === 'orders') && (
                              <span className={`text-[11px] font-bold ${slot.tier === 'peak' ? 'text-rose-100' : styles.subtext}`}>
                                {slot.orders} طلب
                              </span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Heatmap Insights & Shift Planning */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                🔥
              </div>
              <div>
                <span className="text-[11px] font-black text-rose-900 block">ساعات الذروة القصوى (Peak Hours)</span>
                <span className="text-xs font-bold text-rose-700">الخميس والجمعة والسبت من 05:00 إلى 08:00 مساءً</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                🛒
              </div>
              <div>
                <span className="text-[11px] font-black text-amber-900 block">توزيع كاونترات الكاشير وعربات التسوق</span>
                <span className="text-xs font-bold text-amber-800">تشغيل كافة كاونترات الدفع وتوفير 14 موظف كاشير ومساندة وقت الذروة</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                ⚡
              </div>
              <div>
                <span className="text-[11px] font-black text-emerald-900 block">زمن المحاسبة المستهدف بالسلة</span>
                <span className="text-xs font-bold text-emerald-800">أقل من 2.5 دقيقة لإتمام محاسبة السلة الكاملة للعميل</span>
              </div>
            </div>
          </div>

          {/* Cell Inspection Detail Modal / Box (if user clicked any heat cell) */}
          {selectedHeatCell && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-sm font-black text-white">
                    تشخيص الوردية: يوم {selectedHeatCell.day} - توقيت {selectedHeatCell.time}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    selectedHeatCell.tier === 'peak' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {selectedHeatCell.tier === 'peak' ? 'ذروة قصوى (Peak)' : selectedHeatCell.tier === 'medium' ? 'متوسط مرتفع' : 'طبيعي'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHeatCell(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">المبيعات المتوقعة:</span>
                  <span className="text-emerald-400 font-mono font-black text-sm">{selectedHeatCell.revenue.toLocaleString()} SAR</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">عدد الطلبات المتوقعة:</span>
                  <span className="text-white font-mono font-black text-sm">{selectedHeatCell.orders} طلب</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">متوسط الفاتورة (AOV):</span>
                  <span className="text-amber-400 font-mono font-black text-sm">
                    {Math.round(selectedHeatCell.revenue / selectedHeatCell.orders)} SAR
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px] block">الطاقم الموصى به:</span>
                  <span className="text-cyan-400 font-bold text-sm">
                    {selectedHeatCell.tier === 'peak' ? '14 موظف' : selectedHeatCell.tier === 'medium' ? '9 موظفين' : '5 موظفين'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. PIVOT TABLE SECTION (جدول البيانات المحوري من الصورة 1) */}
      {(showAllInOnePage || activeTab === 'pivot_table') && (
        <div className="space-y-6">
          {/* Main Branches Pivot Table */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/90 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    لأصوات المقهى والمطعم [Pivot Table] جدول البيانات المحوري 📊
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    تقرير الفروع التراكمي
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  عرض الأرقام التراكمية المجمعة لفرز القائم بالأرقام ومعدلات الرضا وفق جدول محوري تفصيلي حسب الفروع والشهور والقنوات
                </p>
              </div>

              <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0">
                <span>إجمالي الأصوات المسجلة: </span>
                <span className="font-black text-emerald-400 font-mono">7,850 صوت</span>
              </div>
            </div>

            {/* Table 1: جدول بيفوت الفروع */}
            <div className="overflow-x-auto">
              <table className="w-full text-right rtl:text-right ltr:text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-gray-600 font-bold border-b border-gray-200 text-[11px]">
                  <tr>
                    <th className="py-3 px-3">اسم الفرع / المدينة</th>
                    <th className="py-3 px-3 text-center bg-amber-50/60 text-amber-900">أصوات كافيه ☕</th>
                    <th className="py-3 px-3 text-center bg-emerald-50/60 text-emerald-900">أصوات مطعم 🍽️</th>
                    <th className="py-3 px-3 text-center">إجمالي الأصوات</th>
                    <th className="py-3 px-3 text-center">النسبة من الإجمالي</th>
                    <th className="py-3 px-3 text-center">معدل الرضا ⭐</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-black text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#005A2B]" />
                      <span>فرع التخصصي (الرياض)</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-900 bg-amber-50/30">1,450</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-900 bg-emerald-50/30">1,820</td>
                    <td className="py-3 px-3 text-center font-mono font-black text-gray-900">3,270</td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-700">41.6%</td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                        ⭐ 98.4%
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-black text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>فرع طريق الملك (جدة)</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-900 bg-amber-50/30">1,050</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-900 bg-emerald-50/30">1,460</td>
                    <td className="py-3 px-3 text-center font-mono font-black text-gray-900">2,510</td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-700">31.9%</td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                        ⭐ 97.2%
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-black text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      <span>فرع النخيل (الرياض)</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-900 bg-amber-50/30">480</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-900 bg-emerald-50/30">1,230</td>
                    <td className="py-3 px-3 text-center font-mono font-black text-gray-900">1,710</td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-700">21.8%</td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                        ⭐ 96.8%
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-black text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>فرع المطار</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-900 bg-amber-50/30">410</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-900 bg-emerald-50/30">950</td>
                    <td className="py-3 px-3 text-center font-mono font-black text-gray-900">1,360</td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-700">14.7%</td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                        ⭐ 95.1%
                      </span>
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-slate-100/90 font-black border-t-2 border-slate-300">
                    <td className="py-3 px-3 text-gray-900 text-sm">المجموع الكلي للفروع</td>
                    <td className="py-3 px-3 text-center font-mono text-amber-950 text-sm">3,390</td>
                    <td className="py-3 px-3 text-center font-mono text-emerald-950 text-sm">5,460</td>
                    <td className="py-3 px-3 text-center font-mono text-indigo-950 text-sm">8,850</td>
                    <td className="py-3 px-3 text-center text-indigo-950 text-sm">100.0%</td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-black text-xs">
                        ⭐ 96.9%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DUAL TABLES: Monthly Growth Pivot + Access Sources Pivot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {/* Table A: جدول بيفوت النمو الشهري للأصوات */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-indigo-50 text-indigo-700">
                    <TrendingUp size={16} />
                  </div>
                  <h4 className="text-sm font-black text-gray-900">
                    جدول بيفوت النمو الشهري للأصوات 📈
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-gray-400">تحديث شهري</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right rtl:text-right ltr:text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-gray-600 font-bold border-b border-gray-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">الشهر</th>
                      <th className="py-2.5 px-3 text-center">عدد الأصوات</th>
                      <th className="py-2.5 px-3 text-center">معدل النمو الشهري</th>
                      <th className="py-2.5 px-3 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { month: 'مايو 2024', count: 1250, growth: '-', status: 'مكتمل 100%' },
                      { month: 'يونيو 2024', count: 1980, growth: '+58.4%', status: 'مكتمل 100%' },
                      { month: 'يوليو 2024', count: 2050, growth: '+23.7%', status: 'مكتمل 100%' },
                      { month: 'أغسطس 2024', count: 3180, growth: '+36.2%', status: 'مكتمل 100%' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-bold text-gray-900">{row.month}</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-gray-800">{row.count.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-center font-bold text-emerald-700">
                          {row.growth !== '-' ? (
                            <span className="bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                              {row.growth} 📈
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table B: جدول بيفوت مصادر دخول الاستبيان */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-teal-50 text-teal-700">
                    <QrCode size={16} />
                  </div>
                  <h4 className="text-sm font-black text-gray-900">
                    جدول بيفوت مصادر دخول الاستبيان 🔗
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-gray-400">القنوات والمشاركات</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right rtl:text-right ltr:text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-gray-600 font-bold border-b border-gray-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">مصدر القناة</th>
                      <th className="py-2.5 px-3 text-center">عدد المشاركات</th>
                      <th className="py-2.5 px-3 text-center">النسبة المئوية</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { source: 'الطاولة QR Code', icon: '📱', count: 4380, percent: '49.8%', color: 'bg-indigo-600' },
                      { source: 'الكاشير NFC Card', icon: '💳', count: 1850, percent: '22.8%', color: 'bg-emerald-600' },
                      { source: 'المباشر WhatsApp', icon: '💬', count: 1380, percent: '16.9%', color: 'bg-cyan-600' },
                      { source: '(الشاشة) رابط مباشر', icon: '🖥️', count: 880, percent: '6.5%', color: 'bg-amber-500' },
                      { source: 'SMS رسائل نصية', icon: '✉️', count: 370, percent: '4.0%', color: 'bg-rose-500' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-2">
                          <span>{row.icon}</span>
                          <span>{row.source}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-gray-800">
                          {row.count.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-black text-gray-900 font-mono">{row.percent}</span>
                            <div className="w-16 bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className={`${row.color} h-full rounded-full`} style={{ width: row.percent }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. DETAILED VOTER REGISTER (سجل المصوتين التفصيلي - عين صوت من الصورة 1) */}
      {(showAllInOnePage || activeTab === 'voter_register') && (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/90 shadow-xs space-y-5">
          {/* Header & Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-purple-50 text-purple-800">
                  <Users size={18} />
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  سجل المصوتين التفصيلي (عين صوت) 👤
                </h3>
                <span className="text-[11px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  قائمة حية بالآراء
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                قائمة كاملة بكل عميل صوت، صوته المسجل للمقهى أو المطعم، تقييمه لكل صنف، ورأيه التفصيلي والملاحظات
              </p>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Rating Filter */}
              <select
                value={voterRatingFilter}
                onChange={(e) => setVoterRatingFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 cursor-pointer focus:outline-none focus:border-purple-600"
              >
                <option value="all">جميع التقييمات ⭐</option>
                <option value="5">5 نجوم (رائع)</option>
                <option value="4">4 نجوم (جيد)</option>
              </select>

              {/* Department/Branch Filter */}
              <select
                value={voterBranchFilter}
                onChange={(e) => setVoterBranchFilter(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 cursor-pointer focus:outline-none focus:border-purple-600"
              >
                <option value="all">جميع الأقسام والفروع</option>
                <option value="التخصصي">فرع التخصصي</option>
                <option value="طريق الملك">فرع طريق الملك</option>
                <option value="النخيل">فرع النخيل</option>
              </select>

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  value={voterSearch}
                  onChange={(e) => setVoterSearch(e.target.value)}
                  placeholder="باسم المصوت، رقم الهاتف، الصنف..."
                  className="bg-slate-50 border border-gray-200 focus:bg-white focus:border-purple-600 rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-gray-800 outline-none w-52"
                />
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Detailed Voter Cards (Matching the bottom design of Image 1) */}
          <div className="space-y-3.5">
            {filteredVoters.map((voter) => (
              <div
                key={voter.id}
                className="p-4 rounded-2xl border border-gray-200/90 bg-white hover:border-purple-300 hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                  {/* Customer Info & Avatar */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                      {voter.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-gray-900 text-xs sm:text-sm">{voter.name}</span>
                        <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.2 rounded">
                          {voter.phone}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {voter.typeBadge}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                        {voter.branch} • {voter.date}
                      </span>
                    </div>
                  </div>

                  {/* Rating Score & Badge */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <div className="flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      <span className="text-emerald-800 font-mono font-black text-xs">{voter.rating} / 5</span>
                      <Star size={12} className="fill-amber-400 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Voted Dish / Product Pill */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-gray-500">الصنف المفضل والمصوت له:</span>
                  <span className="text-xs font-black text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200">
                    {voter.dishName}
                  </span>
                </div>

                {/* Review Bubble */}
                <div className="bg-slate-50/90 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <p className="text-xs text-gray-800 font-medium leading-relaxed">
                    "{voter.comment}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-bold text-purple-700 pt-1 border-t border-slate-200/60">
                    <span>{voter.replyNote}</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>صوت موثق</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. RESTAURANT & FOOD REPORT (تقرير المطعم والأكل والخدمة) */}
      {(showAllInOnePage || activeTab === 'service_restaurant') && (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                <Utensils size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  تقرير المطعم والأكل والخدمة 🍽️
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  تفاصيل جودة الأطباق وسرعة التقديم ودرجات التقييم المتخصصة لكل صنف وقسم
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              98.2% جودة الطعم والطهو
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProductsList.map((dish, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-gray-200/80 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{dish.icon}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {dish.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-sm text-gray-900">{dish.name}</h4>
                  <span className="text-[11px] text-gray-400 font-medium">{dish.nameEn}</span>
                </div>
                <div className="pt-2 border-t border-gray-200/70 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-bold">إجمالي الأصوات:</span>
                  <span className="font-black text-emerald-800 font-mono">{dish.count} صوت</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 8. CONVERSION FUNNEL SECTION (قمع التحويل ومسار العملاء) */}
      {(showAllInOnePage || activeTab === 'funnel') && (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-gray-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  قمع التحويل ومسار انتقال العملاء 🎯
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  معدل انتقال العملاء بين محطات الاستبيان ونقاط التسرب ومؤشرات الإكمال
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                معدل التحويل الإجمالي: 87.3% 🚀
              </span>
            </div>
          </div>

          {/* Funnel KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-gray-400 font-bold block">إجمالي زوار الباركود</span>
              <span className="text-2xl font-black text-gray-900 font-mono mt-1 block">8,260</span>
              <span className="text-[11px] text-emerald-600 font-bold">100% قاعدة الانطلاق</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-gray-400 font-bold block">الاستبيانات المكتملة</span>
              <span className="text-2xl font-black text-teal-700 font-mono mt-1 block">7,215</span>
              <span className="text-[11px] text-teal-600 font-bold">87.3% معدل وصول نهائي</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-gray-400 font-bold block">متوسط زمن المسار</span>
              <span className="text-2xl font-black text-indigo-700 font-mono mt-1 block">48 ثانية</span>
              <span className="text-[11px] text-indigo-600 font-bold">سريع وسلس للغاية</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-gray-400 font-bold block">أعلى نقطة تسرب</span>
              <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">3.7%</span>
              <span className="text-[11px] text-amber-700 font-bold">أثناء اختيار الصنف</span>
            </div>
          </div>

          {/* Visual Funnel Bars */}
          <div className="space-y-4 pt-2">
            {[
              {
                step: 1,
                name: 'مسح الباركود / NFC / الرابط المباشر',
                desc: 'دخول العميل لشاشة الاستبيان والتفاعل',
                count: '8,260',
                percent: 100,
                drop: '0%',
                color: 'from-blue-600 to-indigo-600'
              },
              {
                step: 2,
                name: 'اختيار اللغة ونوع النشاط',
                desc: 'تحديد لغة الواجهة والقسم المناسب',
                count: '7,980',
                percent: 96.6,
                drop: '3.4%',
                color: 'from-indigo-600 to-teal-600'
              },
              {
                step: 3,
                name: 'استعراض الأقسام وتحديد المنتجات والرغبات',
                desc: 'اختيار العميل للصنف أو وجبته وتفاصيل الزيارة',
                count: '7,680',
                percent: 92.9,
                drop: '3.7%',
                color: 'from-teal-600 to-emerald-600'
              },
              {
                step: 4,
                name: 'فتح قسيمة الخصم الترويجية والمكافأة',
                desc: 'استلام كود الخصم الفوري والمفاجأة الترويجية',
                count: '7,490',
                percent: 90.6,
                drop: '2.3%',
                color: 'from-emerald-600 to-amber-600'
              },
              {
                step: 5,
                name: 'إرسال التقييم النهائي ورأي العميل (مكتمل)',
                desc: 'توثيق الرأي والملاحظات ومستوى الرضا الكامل',
                count: '7,215',
                percent: 87.3,
                drop: '3.3%',
                color: 'from-amber-600 to-[#005A2B]'
              }
            ].map((fStep) => (
              <div key={fStep.step} className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0">
                      {fStep.step}
                    </span>
                    <div>
                      <span className="font-black text-gray-900">{fStep.name}</span>
                      <span className="text-[10px] text-gray-400 block">{fStep.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto font-mono">
                    <span className="text-gray-900 font-black">{fStep.count} زائر</span>
                    <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {fStep.percent}%
                    </span>
                    {fStep.step > 1 && (
                      <span className="text-rose-600 text-[10px] font-bold">
                        تسرب {fStep.drop}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full bg-slate-200/80 h-3.5 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`bg-gradient-to-r ${fStep.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${fStep.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
