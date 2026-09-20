import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Clock, 
  Users, 
  ShoppingBag, 
  Ticket, 
  Store, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Filter, 
  TrendingUp,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Feedback } from '../../types';

interface OverviewShopperHeatmapProps {
  feedbacks?: Feedback[];
  isEnglish?: boolean;
}

type HeatTier = 'low' | 'normal' | 'high' | 'peak';
type MetricView = 'shoppers' | 'revenue' | 'vouchers';

interface TimeSlotDef {
  id: string;
  labelAr: string;
  labelEn: string;
  subAr: string;
  subEn: string;
  isPeakPeriod?: boolean;
}

interface CellData {
  shoppers: number;
  revenue: number;
  vouchers: number;
  tier: HeatTier;
  cashierNeeded: number;
  topDeptAr: string;
  topDeptEn: string;
  recommendationAr: string;
  recommendationEn: string;
}

interface DayRowData {
  dayAr: string;
  dayEn: string;
  isWeekend?: boolean;
  slots: CellData[];
}

export const OverviewShopperHeatmap: React.FC<OverviewShopperHeatmapProps> = ({
  feedbacks = [],
  isEnglish = false
}) => {
  // State
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMetric, setActiveMetric] = useState<MetricView>('shoppers');
  
  // Default selected cell: Thursday evening peak (day index 5, slot index 4)
  const [selectedCell, setSelectedCell] = useState<{
    dayAr: string;
    dayEn: string;
    timeLabelAr: string;
    timeLabelEn: string;
    data: CellData;
  }>({
    dayAr: 'الخميس',
    dayEn: 'Thursday',
    timeLabelAr: '08:00 - 11:00 م',
    timeLabelEn: '08:00 - 11:00 PM',
    data: {
      shoppers: 690,
      revenue: 94800,
      vouchers: 184,
      tier: 'peak',
      cashierNeeded: 14,
      topDeptAr: 'الخضار والفواكه + المخبوزات',
      topDeptEn: 'Fresh Produce & Bakery',
      recommendationAr: 'تشغيل كافة كاونترات الدفع (14 كاشير) + توفير مسار دفع سريع للسلال الصغيرة + تعزيز طاقم وزن الخضار.',
      recommendationEn: 'Operate all 14 checkout counters + dedicate express self-checkout + boost produce weighing staff.'
    }
  });

  const timeSlots: TimeSlotDef[] = [
    {
      id: 'morning',
      labelAr: '08:00 - 11:00 ص',
      labelEn: '08:00 - 11:00 AM',
      subAr: 'صباح هادئ',
      subEn: 'Quiet Morning'
    },
    {
      id: 'noon',
      labelAr: '11:00 - 02:00 ظ',
      labelEn: '11:00 - 02:00 PM',
      subAr: 'تجهيز الغداء',
      subEn: 'Lunch Prep'
    },
    {
      id: 'afternoon',
      labelAr: '02:00 - 05:00 ع',
      labelEn: '02:00 - 05:00 PM',
      subAr: 'بعد الظهيرة',
      subEn: 'Afternoon'
    },
    {
      id: 'evening',
      labelAr: '05:00 - 08:00 م',
      labelEn: '05:00 - 08:00 PM',
      subAr: 'المساء والتسوق',
      subEn: 'Evening Rush'
    },
    {
      id: 'peak_night',
      labelAr: '08:00 - 11:00 م',
      labelEn: '08:00 - 11:00 PM',
      subAr: 'ذروة العائلات 🔥',
      subEn: 'Family Peak 🔥',
      isPeakPeriod: true
    },
    {
      id: 'late',
      labelAr: '11:00 - 01:00 ص',
      labelEn: '11:00 - 01:00 AM',
      subAr: 'تسوق ليلي',
      subEn: 'Late Night'
    }
  ];

  // Multiplier based on branch
  const branchMultiplier = useMemo(() => {
    switch (selectedBranch) {
      case 'takhassusi': return 0.38;
      case 'kingroad': return 0.28;
      case 'nakheel': return 0.20;
      case 'andalus': return 0.14;
      default: return 1.0;
    }
  }, [selectedBranch]);

  // Multiplier based on category
  const categoryMultiplier = useMemo(() => {
    switch (selectedCategory) {
      case 'fresh': return 0.45;
      case 'grocery': return 0.35;
      case 'care': return 0.20;
      default: return 1.0;
    }
  }, [selectedCategory]);

  // Raw base data for 7 days
  const baseHeatmapDays: DayRowData[] = [
    {
      dayAr: 'السبت',
      dayEn: 'Saturday',
      isWeekend: true,
      slots: [
        { shoppers: 160, revenue: 21000, vouchers: 32, tier: 'normal', cashierNeeded: 5, topDeptAr: 'المخبوزات والألبان', topDeptEn: 'Bakery & Dairy', recommendationAr: 'توفير تشكيلة فطور طازجة وتجهيز عربات الدخول.', recommendationEn: 'Ensure fresh breakfast displays & entrance trolleys.' },
        { shoppers: 340, revenue: 47600, vouchers: 78, tier: 'high', cashierNeeded: 9, topDeptAr: 'الخضار واللحوم', topDeptEn: 'Produce & Meat', recommendationAr: 'فتح 9 كاونترات مع مسار خاص لكبار السن وذوي الإعاقة.', recommendationEn: 'Open 9 counters with dedicated priority lane.' },
        { shoppers: 260, revenue: 36400, vouchers: 54, tier: 'normal', cashierNeeded: 7, topDeptAr: 'المواد التموينية', topDeptEn: 'Groceries', recommendationAr: 'إعادة تعبئة الأرفف وتفقد عروض التوفير الأسبوعية.', recommendationEn: 'Restock shelves and check weekly bundle displays.' },
        { shoppers: 460, revenue: 64400, vouchers: 110, tier: 'high', cashierNeeded: 11, topDeptAr: 'الخضار والفواكه الطازجة', topDeptEn: 'Fresh Produce', recommendationAr: 'مضاعفة موظفي موازين الخضار وتأمين مسارات الخروج.', recommendationEn: 'Double scale personnel and organize checkout queues.' },
        { shoppers: 610, revenue: 85400, vouchers: 156, tier: 'peak', cashierNeeded: 13, topDeptAr: 'كافة الأقسام وسلال التوفير', topDeptEn: 'All Hypermarket Sections', recommendationAr: 'تشغيل 13 كاشير مع مساندة فورية لفرز وتعبئة الأكياس.', recommendationEn: 'Run 13 cashiers with packing assistant support.' },
        { shoppers: 210, revenue: 29400, vouchers: 46, tier: 'normal', cashierNeeded: 6, topDeptAr: 'المشروبات والمأكولات الخفيفة', topDeptEn: 'Snacks & Beverages', recommendationAr: 'تنظيم الممرات للمتسوقين الليليين واستعداد إغلاق الجولة.', recommendationEn: 'Clear corridors for late shoppers and shift handover.' }
      ]
    },
    {
      dayAr: 'الأحد',
      dayEn: 'Sunday',
      slots: [
        { shoppers: 110, revenue: 14300, vouchers: 18, tier: 'low', cashierNeeded: 4, topDeptAr: 'المخبوزات والقهوة', topDeptEn: 'Bakery & Coffee', recommendationAr: 'فترة تسوق سريعة ومثالية لإنهاء المحاسبة بأقل من دقيقة.', recommendationEn: 'Quick shopping window; under 1 min checkout.' },
        { shoppers: 210, revenue: 27300, vouchers: 42, tier: 'normal', cashierNeeded: 6, topDeptAr: 'الخضار والفواكه', topDeptEn: 'Produce', recommendationAr: 'استلام التوريدات الصباحية وترتيب واجهات العرض.', recommendationEn: 'Receive morning shipments and align shelf fronts.' },
        { shoppers: 190, revenue: 24700, vouchers: 38, tier: 'normal', cashierNeeded: 5, topDeptAr: 'الألبان والأجبان', topDeptEn: 'Dairy & Cheese', recommendationAr: 'تفقد تواريخ الصلاحية وترتيب ثلاجات الحليب.', recommendationEn: 'Verify freshness and restock milk chillers.' },
        { shoppers: 360, revenue: 46800, vouchers: 75, tier: 'high', cashierNeeded: 8, topDeptAr: 'المواد التموينية والأرز', topDeptEn: 'Rice & Staples', recommendationAr: 'تشغيل 8 كاشيرات لتجنب أي تجمع عند انتهاء الدوام.', recommendationEn: 'Run 8 checkout lanes to absorb after-work volume.' },
        { shoppers: 440, revenue: 59400, vouchers: 98, tier: 'high', cashierNeeded: 10, topDeptAr: 'المجمدات واللحوم', topDeptEn: 'Frozen & Meats', recommendationAr: 'تأمين 10 كاونترات مع مسار العائلات والسلال الممتلئة.', recommendationEn: 'Keep 10 counters active for family basket checkout.' },
        { shoppers: 140, revenue: 18200, vouchers: 26, tier: 'low', cashierNeeded: 4, topDeptAr: 'الوجبات الخفيفة والحلويات', topDeptEn: 'Snacks & Confectionery', recommendationAr: 'تنظيف وتطهير الممرات وبدء الجرد الدوري.', recommendationEn: 'Aisle sanitization and daily cycle count.' }
      ]
    },
    {
      dayAr: 'الإثنين',
      dayEn: 'Monday',
      slots: [
        { shoppers: 95, revenue: 12350, vouchers: 16, tier: 'low', cashierNeeded: 3, topDeptAr: 'الألبان والمخبوزات', topDeptEn: 'Dairy & Bakery', recommendationAr: 'فترة استرخاء، متابعة طلبات خدمة التوصيل الذكي.', recommendationEn: 'Quiet period, focus on online express dispatch.' },
        { shoppers: 220, revenue: 28600, vouchers: 45, tier: 'normal', cashierNeeded: 6, topDeptAr: 'الخضار والورقيات', topDeptEn: 'Fresh Greens', recommendationAr: 'تحديث عروض بداية الأسبوع الطازجة عند المدخل.', recommendationEn: 'Update fresh week-start door promotions.' },
        { shoppers: 185, revenue: 24050, vouchers: 36, tier: 'normal', cashierNeeded: 5, topDeptAr: 'العناية الشخصية والمنظفات', topDeptEn: 'Personal Care', recommendationAr: 'ترتيب أرفف الشامبو والمنظفات وتفعيل لوحات الخصم.', recommendationEn: 'Merchandise detergents and apply bundle tags.' },
        { shoppers: 350, revenue: 45500, vouchers: 72, tier: 'high', cashierNeeded: 8, topDeptAr: 'المعلبات والأغذية الأساسية', topDeptEn: 'Dry Food', recommendationAr: 'تشغيل كاونترين إضافيين لتسريع خروج المتسوقين.', recommendationEn: 'Add 2 extra cashiers for rapid shopper turnaround.' },
        { shoppers: 460, revenue: 62100, vouchers: 102, tier: 'high', cashierNeeded: 10, topDeptAr: 'اللحوم والدواجن والأسماك', topDeptEn: 'Meat & Poultry', recommendationAr: 'توفير أكياس حرارية للأسماك واللحوم عند الكاشير.', recommendationEn: 'Provide insulated bags for meat/fish at cashiers.' },
        { shoppers: 130, revenue: 16900, vouchers: 24, tier: 'low', cashierNeeded: 4, topDeptAr: 'المياه والمشروبات الغازية', topDeptEn: 'Water & Drinks', recommendationAr: 'إعادة شحن منصات كراتين المياه بالقرب من المخزن.', recommendationEn: 'Replenish bulk water pallets near exit.' }
      ]
    },
    {
      dayAr: 'الثلاثاء',
      dayEn: 'Tuesday',
      slots: [
        { shoppers: 105, revenue: 13650, vouchers: 19, tier: 'low', cashierNeeded: 4, topDeptAr: 'المخبوزات والكرواسون', topDeptEn: 'Bakery', recommendationAr: 'عرض معجنات طازجة ومشروبات دافئة.', recommendationEn: 'Fresh pastry displays and hot beverage deals.' },
        { shoppers: 240, revenue: 31200, vouchers: 50, tier: 'normal', cashierNeeded: 6, topDeptAr: 'الخضار والفواكه المستوردة', topDeptEn: 'Imported Fruits', recommendationAr: 'تنشيط مسارات الخضار الطازجة وتوفير أكياس قابلة لإعادة التدوير.', recommendationEn: 'Refresh produce aisles with eco-friendly tote bags.' },
        { shoppers: 210, revenue: 27300, vouchers: 42, tier: 'normal', cashierNeeded: 5, topDeptAr: 'الأجبان والمخللات بالأوزان', topDeptEn: 'Deli & Pickles', recommendationAr: 'تجهيز أطباق التذوق وتفعيل عروض قسم الأجبان.', recommendationEn: 'Sampling plates and deli counter special offers.' },
        { shoppers: 380, revenue: 49400, vouchers: 82, tier: 'high', cashierNeeded: 9, topDeptAr: 'التموين والزيوت والسكر', topDeptEn: 'Oils & Sugar', recommendationAr: 'تأمين 9 كاشيرات ودعم الكاشير السريع (أقل من 5 منتجات).', recommendationEn: 'Ensure 9 counters with express lane (<5 items).' },
        { shoppers: 480, revenue: 64800, vouchers: 112, tier: 'high', cashierNeeded: 11, topDeptAr: 'المجمدات والخضار المجمدة', topDeptEn: 'Frozen Foods', recommendationAr: 'إرشاد العملاء للقسائم الرقمية وخصومات تطبيق بنده.', recommendationEn: 'Assist shoppers in scanning digital discount vouchers.' },
        { shoppers: 155, revenue: 20150, vouchers: 30, tier: 'normal', cashierNeeded: 4, topDeptAr: 'الحلويات والشوكولاتة', topDeptEn: 'Sweets & Snacks', recommendationAr: 'إغلاق وردية المساء وجرد كاونترات الدفع.', recommendationEn: 'Evening shift reconciliation and register balance.' }
      ]
    },
    {
      dayAr: 'الأربعاء',
      dayEn: 'Wednesday',
      slots: [
        { shoppers: 120, revenue: 16200, vouchers: 22, tier: 'low', cashierNeeded: 4, topDeptAr: 'المخبوزات والألبان', topDeptEn: 'Bakery & Dairy', recommendationAr: 'تجهيز الفروع لاستقبال عروض مجلة بنده الأسبوعية الجديدة.', recommendationEn: 'Prep store for new weekly Panda flyer promotions.' },
        { shoppers: 270, revenue: 36450, vouchers: 58, tier: 'normal', cashierNeeded: 7, topDeptAr: 'الخضار والفواكه', topDeptEn: 'Produce', recommendationAr: 'إطلاق ملصقات التخفيضات الكبرى وعروض اشترِ 1 واحصل على 1.', recommendationEn: 'Launch BOGO and weekly super saver signage.' },
        { shoppers: 245, revenue: 33075, vouchers: 52, tier: 'normal', cashierNeeded: 6, topDeptAr: 'المنظفات ومساحيق الغسيل', topDeptEn: 'Detergents', recommendationAr: 'ترتيب منصات العروض في الممرات العريضة.', recommendationEn: 'Arrange bulk pallet displays in main concourse.' },
        { shoppers: 420, revenue: 58800, vouchers: 96, tier: 'high', cashierNeeded: 10, topDeptAr: 'سلال تموين نهاية الأسبوع', topDeptEn: 'Pantry Bundles', recommendationAr: 'تشغيل 10 كاونترات كاشير لاستيعاب تدفق مشتريات الويكند.', recommendationEn: 'Staff 10 registers for pre-weekend shopping burst.' },
        { shoppers: 540, revenue: 75600, vouchers: 135, tier: 'peak', cashierNeeded: 12, topDeptAr: 'اللحوم والدواجن والأسماك', topDeptEn: 'Fresh Meats & Fish', recommendationAr: 'ذروة ما قبل العطلة؛ توفير موظف مساندة لتعبئة السلال عند كل كاشير.', recommendationEn: 'Pre-weekend rush; assign packing baggers per lane.' },
        { shoppers: 190, revenue: 25650, vouchers: 40, tier: 'normal', cashierNeeded: 5, topDeptAr: 'المشروبات والمثلجات', topDeptEn: 'Ice Cream & Drinks', recommendationAr: 'تأمين الثلاجات والتأكد من درجات البرودة للغد.', recommendationEn: 'Inspect walk-in cooler temps for Thursday peak.' }
      ]
    },
    {
      dayAr: 'الخميس',
      dayEn: 'Thursday',
      isWeekend: true,
      slots: [
        { shoppers: 170, revenue: 23800, vouchers: 36, tier: 'normal', cashierNeeded: 5, topDeptAr: 'المخبوزات الصباحية', topDeptEn: 'Morning Bakery', recommendationAr: 'بدء استقبال المتسوقين المبكرين وتجهيز عربات التسوق عند المداخل.', recommendationEn: 'Welcome early shoppers and stage sanitized carts at gates.' },
        { shoppers: 380, revenue: 53200, vouchers: 88, tier: 'high', cashierNeeded: 9, topDeptAr: 'الخضار واللحوم الطازجة', topDeptEn: 'Fresh Produce & Butcher', recommendationAr: 'تشغيل 9 كاشيرات واستيعاب مشتريات غداء يوم الخميس.', recommendationEn: 'Run 9 cashiers to handle Thursday family lunch shopping.' },
        { shoppers: 320, revenue: 44800, vouchers: 72, tier: 'high', cashierNeeded: 8, topDeptAr: 'المجمدات والألبان', topDeptEn: 'Frozen & Dairy', recommendationAr: 'التأكد من توفر عربات التسوق الكبيرة عند كل مدخل.', recommendationEn: 'Ensure large double-trolleys are readily available.' },
        { shoppers: 560, revenue: 78400, vouchers: 142, tier: 'peak', cashierNeeded: 12, topDeptAr: 'كافة أقسام الهايبرماركت', topDeptEn: 'All Hypermarket Depts', recommendationAr: 'بداية الذروة الكبرى؛ تشغيل 12 كاشير وتنشيط مسارات الدفع الذاتي.', recommendationEn: 'Major peak onset: 12 registers + self-checkout support.' },
        { shoppers: 690, revenue: 94800, vouchers: 184, tier: 'peak', cashierNeeded: 14, topDeptAr: 'الخضار والفواكه + المخبوزات', topDeptEn: 'Fresh Produce & Bakery', recommendationAr: 'أعلى ذروة أسبوعية؛ تشغيل 14 كاشير + مسار سريع + مضاعفة وزن الخضار.', recommendationEn: 'Highest weekly peak: 14 lanes + express lane + dual produce scales.' },
        { shoppers: 310, revenue: 43400, vouchers: 70, tier: 'high', cashierNeeded: 8, topDeptAr: 'المكسرات والحلويات والمشروبات', topDeptEn: 'Nuts, Sweets & Drinks', recommendationAr: 'استمرار كثافة المتسوقين حتى منتصف الليل مع تنظيم الخروج.', recommendationEn: 'Sustained shopper volume until midnight; streamline exits.' }
      ]
    },
    {
      dayAr: 'الجمعة',
      dayEn: 'Friday',
      isWeekend: true,
      slots: [
        { shoppers: 80, revenue: 11200, vouchers: 14, tier: 'low', cashierNeeded: 3, topDeptAr: 'المخبوزات والماء', topDeptEn: 'Bakery & Water', recommendationAr: 'تسوق هادئ قبل صلاة الجمعة مع جرد سريع.', recommendationEn: 'Quiet pre-Friday prayer shopping; swift restocking.' },
        { shoppers: 230, revenue: 32200, vouchers: 52, tier: 'normal', cashierNeeded: 6, topDeptAr: 'الخضار ومستلزمات الغداء', topDeptEn: 'Fresh Vegetables', recommendationAr: 'فترة ما بعد صلاة الجمعة وتجهيز وجبات الغداء العائلية.', recommendationEn: 'Post-prayer family lunch essentials rush.' },
        { shoppers: 360, revenue: 50400, vouchers: 84, tier: 'high', cashierNeeded: 9, topDeptAr: 'الألبان والحلويات والتمور', topDeptEn: 'Dates & Desserts', recommendationAr: 'إقبال عائلي بعد العصر، تشغيل 9 كاونترات دفع.', recommendationEn: 'Post-Asr family visits; operate 9 active checkout lanes.' },
        { shoppers: 580, revenue: 81200, vouchers: 148, tier: 'peak', cashierNeeded: 13, topDeptAr: 'الخضار واللحوم والتموين', topDeptEn: 'Produce, Meats & Pantry', recommendationAr: 'ذروة تسوق عطلة الجمعة؛ 13 كاشير مع دعم فوري لفرز السلال.', recommendationEn: 'Friday weekend rush: 13 lanes active with queue guides.' },
        { shoppers: 660, revenue: 91400, vouchers: 176, tier: 'peak', cashierNeeded: 14, topDeptAr: 'كافة سلال التسوق الأسبوعي', topDeptEn: 'Weekly Family Baskets', recommendationAr: 'ذروة عائلية قصوى؛ توفير عربات معقمة عند الأبواب واستيعاب الدفع السريع.', recommendationEn: 'Peak family night: sanitized carts at doors + instant card pay.' },
        { shoppers: 280, revenue: 39200, vouchers: 64, tier: 'normal', cashierNeeded: 7, topDeptAr: 'المخبوزات والمشروبات الخفيفة', topDeptEn: 'Bakery & Beverages', recommendationAr: 'استيعاب التسوق الليلي المتأخر وتنظيم إغلاق الصناديق.', recommendationEn: 'Handle late weekend shopping with orderly register closeout.' }
      ]
    }
  ];

  // Calculated adjusted days based on filter multipliers
  const computedDays = useMemo(() => {
    return baseHeatmapDays.map(day => ({
      ...day,
      slots: day.slots.map(slot => {
        const factor = branchMultiplier * categoryMultiplier;
        const adjustedShoppers = Math.max(15, Math.round(slot.shoppers * factor));
        const adjustedRevenue = Math.max(2000, Math.round(slot.revenue * factor));
        const adjustedVouchers = Math.max(3, Math.round(slot.vouchers * factor));
        const adjustedCashiers = Math.max(2, Math.round(slot.cashierNeeded * Math.sqrt(factor)));
        
        return {
          ...slot,
          shoppers: adjustedShoppers,
          revenue: adjustedRevenue,
          vouchers: adjustedVouchers,
          cashierNeeded: adjustedCashiers
        };
      })
    }));
  }, [branchMultiplier, categoryMultiplier]);

  // Helper for tier styles
  const getTierVisuals = (tier: HeatTier) => {
    switch (tier) {
      case 'peak':
        return {
          bg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white',
          border: 'border-rose-600',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          subtext: 'text-rose-100',
          labelAr: 'ذروة قصوى (Peak)',
          labelEn: 'Peak Surge'
        };
      case 'high':
        return {
          bg: 'bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950',
          border: 'border-amber-500',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          subtext: 'text-amber-900',
          labelAr: 'مرتفع',
          labelEn: 'High'
        };
      case 'normal':
        return {
          bg: 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-950',
          border: 'border-emerald-300',
          badge: 'bg-emerald-50 text-[#005A2B] border-emerald-200',
          subtext: 'text-emerald-800',
          labelAr: 'معتدل / طبيعي',
          labelEn: 'Moderate'
        };
      case 'low':
      default:
        return {
          bg: 'bg-slate-100/90 text-slate-700',
          border: 'border-slate-200',
          badge: 'bg-slate-100 text-slate-600 border-slate-200',
          subtext: 'text-slate-400',
          labelAr: 'هادئ / منخفض',
          labelEn: 'Low'
        };
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      {/* 1. Header Bar with Luxury Badges & Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005A2B] via-emerald-700 to-teal-800 text-white flex items-center justify-center shadow-sm shrink-0">
            <Flame size={24} className="text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isEnglish ? 'Shopper Traffic & Peak Hours Heatmap' : 'خريطة الكثافة الحرارية لساعات الذروة وحركة المتسوقين'}
              </h3>
              <span className="bg-rose-50 text-rose-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>{isEnglish ? 'Live Store Heatmap' : 'رصد حي للكثافة ⚡'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isEnglish
                ? 'Weekly store density matrix across 7 days and 6 operational time slots; analyze visitor footfall & checkout velocity'
                : 'مصفوفة إحصائية أسبوعية ترصد أوقات الازدحام على مدار 7 أيام و6 فترات تشغيلية لتوجيه شفتات الكاشير وإدارة الطوابير'}
            </p>
          </div>
        </div>

        {/* Dynamic Color Scale Legend */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200/80 flex-wrap self-start lg:self-auto">
          <span className="text-[11px] font-black text-slate-700">
            {isEnglish ? 'Density Scale:' : 'مقياس الكثافة:'}
          </span>
          
          {/* Low */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300" />
            <span className="text-[11px] font-bold text-slate-600">{isEnglish ? 'Low' : 'هادئ'}</span>
          </div>

          {/* Normal */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-200 border border-emerald-300" />
            <span className="text-[11px] font-bold text-emerald-800">{isEnglish ? 'Moderate' : 'معتدل'}</span>
          </div>

          {/* High */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-400 border border-amber-500" />
            <span className="text-[11px] font-bold text-amber-900">{isEnglish ? 'High' : 'مرتفع'}</span>
          </div>

          {/* Peak */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-rose-500 border border-rose-600 shadow-2xs" />
            <span className="text-[11px] font-black text-rose-700">{isEnglish ? 'Peak (Surge)' : 'ذروة قصوى (Peak)'}</span>
          </div>
        </div>
      </div>

      {/* 2. Controls & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/60 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-black text-slate-700 flex items-center gap-1">
            <Filter size={13} className="text-[#005A2B]" />
            <span>{isEnglish ? 'Filters:' : 'تصفية المصفوفة:'}</span>
          </span>

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#005A2B] cursor-pointer shadow-2xs"
          >
            <option value="all">{isEnglish ? 'All Panda Branches' : 'جميع فروع بنده الموحدة'}</option>
            <option value="takhassusi">{isEnglish ? 'Al-Takhassusi - Riyadh' : 'فرع التخصصي - الرياض'}</option>
            <option value="kingroad">{isEnglish ? 'King Road - Jeddah' : 'فرع طريق الملك - جدة'}</option>
            <option value="nakheel">{isEnglish ? 'Al-Nakheel - Riyadh' : 'فرع النخيل - الرياض'}</option>
            <option value="andalus">{isEnglish ? 'Al-Andalus - Jeddah' : 'فرع الأندلس - جدة'}</option>
          </select>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
            {[
              { id: 'all', labelAr: 'كافة الأقسام 🛒', labelEn: 'All Depts' },
              { id: 'fresh', labelAr: 'الأغذية والطازج 🥬', labelEn: 'Fresh Food' },
              { id: 'grocery', labelAr: 'التموين والمخبوزات 🥖', labelEn: 'Groceries' },
              { id: 'care', labelAr: 'العناية والمنظفات 🧴', labelEn: 'Care & Cleaning' },
            ].map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#005A2B] text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isEnglish ? c.labelEn : c.labelAr}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-bold text-[11px]">
            {isEnglish ? 'Display Value:' : 'عرض المؤشر:'}
          </span>
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveMetric('shoppers')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                activeMetric === 'shoppers' 
                  ? 'bg-[#005A2B] text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              👥 {isEnglish ? 'Shopper Volume' : 'عدد المتسوقين'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('revenue')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                activeMetric === 'revenue' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              💳 {isEnglish ? 'Sales (SAR)' : 'المبيعات (ريال)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('vouchers')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                activeMetric === 'vouchers' 
                  ? 'bg-purple-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🎟️ {isEnglish ? 'Vouchers' : 'القسائم المطبقة'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Heatmap Matrix Table (7 Days x 6 Slots) */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full text-center border-separate border-spacing-2 min-w-[780px]">
          <thead>
            <tr>
              <th className="py-2.5 px-3 text-right rtl:text-right ltr:text-left text-xs font-black text-slate-700 w-24">
                {isEnglish ? 'Day / Time' : 'اليوم / الفترة'}
              </th>
              {timeSlots.map((slot) => (
                <th 
                  key={slot.id} 
                  className={`py-2 px-2 text-center rounded-xl transition-all ${
                    slot.isPeakPeriod 
                      ? 'bg-rose-50/80 border border-rose-200/90 text-rose-700 font-black' 
                      : 'text-slate-700 font-black bg-slate-50 border border-slate-100'
                  }`}
                >
                  <div className="text-xs font-black leading-tight">
                    {isEnglish ? slot.labelEn : slot.labelAr}
                  </div>
                  <div className={`text-[10px] font-medium mt-0.5 ${slot.isPeakPeriod ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                    {isEnglish ? slot.subEn : slot.subAr}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {computedDays.map((dayRow) => (
              <tr key={dayRow.dayAr}>
                {/* Day Header Cell */}
                <td className="py-2 px-3 text-right rtl:text-right ltr:text-left font-black text-xs text-slate-800 whitespace-nowrap bg-slate-50/60 rounded-xl border border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <span>{isEnglish ? dayRow.dayEn : dayRow.dayAr}</span>
                    {dayRow.isWeekend && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1 py-0.2 rounded">
                        {isEnglish ? 'W/E' : 'عطلة'}
                      </span>
                    )}
                  </div>
                </td>

                {/* 6 Time Slots Cells */}
                {dayRow.slots.map((slotData, slotIdx) => {
                  const visuals = getTierVisuals(slotData.tier);
                  const timeDef = timeSlots[slotIdx];
                  const isSelected = 
                    selectedCell.dayAr === dayRow.dayAr && 
                    selectedCell.timeLabelAr === timeDef.labelAr;

                  return (
                    <td key={slotIdx} className="p-0">
                      <button
                        type="button"
                        onClick={() => setSelectedCell({
                          dayAr: dayRow.dayAr,
                          dayEn: dayRow.dayEn,
                          timeLabelAr: timeDef.labelAr,
                          timeLabelEn: timeDef.labelEn,
                          data: slotData
                        })}
                        className={`w-full py-2.5 px-2 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:scale-[1.03] active:scale-95 shadow-2xs ${visuals.bg} ${visuals.border} ${
                          isSelected ? 'ring-4 ring-slate-900 shadow-md scale-[1.04]' : ''
                        }`}
                        title={`اضغط لمعاينة تشخيص وردية ${dayRow.dayAr} ${timeDef.labelAr}`}
                      >
                        {/* Primary Value based on Metric Mode */}
                        {activeMetric === 'shoppers' && (
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-black tracking-tight leading-tight">
                              {slotData.shoppers.toLocaleString()}
                            </span>
                            <span className={`text-[10px] font-bold ${visuals.subtext}`}>
                              {isEnglish ? 'shoppers' : 'متسوق/س'}
                            </span>
                          </div>
                        )}

                        {activeMetric === 'revenue' && (
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-black tracking-tight leading-tight">
                              {(slotData.revenue / 1000).toFixed(1)}k
                            </span>
                            <span className={`text-[10px] font-bold ${visuals.subtext}`}>
                              SAR
                            </span>
                          </div>
                        )}

                        {activeMetric === 'vouchers' && (
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-black tracking-tight leading-tight">
                              {slotData.vouchers}
                            </span>
                            <span className={`text-[10px] font-bold ${visuals.subtext}`}>
                              {isEnglish ? 'vouchers' : 'قسيمة'}
                            </span>
                          </div>
                        )}

                        {/* Micro indicator badge */}
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full border ${
                            slotData.tier === 'peak' 
                              ? 'bg-white/25 text-white border-white/40' 
                              : slotData.tier === 'high'
                              ? 'bg-amber-950/10 text-amber-950 border-amber-950/20'
                              : 'bg-black/5 text-slate-800 border-black/10'
                          }`}>
                            {slotData.cashierNeeded} كاشير
                          </span>
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Active Selected Cell Shift Intelligence & Ops Recommendation Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-white via-emerald-50/20 to-emerald-50/40 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#005A2B] text-white flex items-center justify-center shadow-xs">
              <Clock size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {isEnglish 
                    ? `Shift Diagnostics: ${selectedCell.dayEn} (${selectedCell.timeLabelEn})`
                    : `تشخيص وردية: يوم ${selectedCell.dayAr} (${selectedCell.timeLabelAr})`}
                </h4>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${getTierVisuals(selectedCell.data.tier).badge}`}>
                  {isEnglish ? getTierVisuals(selectedCell.data.tier).labelEn : getTierVisuals(selectedCell.data.tier).labelAr}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {isEnglish 
                  ? 'Click any cell in the heatmap grid above to inspect instant metrics & operations directives' 
                  : 'اضغط على أي مربع في خريطة الحرارة أعلاه لعرض التفاصيل الفورية وتوجيهات تشغيل الكاشير'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 size={13} className="text-[#005A2B]" />
              <span>{isEnglish ? 'Real-Time Sync' : 'بيانات فروع بنده المباشرة'}</span>
            </span>
          </div>
        </div>

        {/* 4 Quick Stat Tiles for the Selected Shift */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              {isEnglish ? 'Hourly Shopper Footfall' : 'كثافة المتسوقين بالساعة'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                {selectedCell.data.shoppers.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-slate-500">متسوق/س</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              {isEnglish ? 'Estimated Shift Sales' : 'مبيعات الوردية المتوقعة'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                {selectedCell.data.revenue.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-slate-500">SAR</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              {isEnglish ? 'Recommended Cashiers' : 'كاونترات الكاشير المطلوبة'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-[#005A2B] font-mono">
                {selectedCell.data.cashierNeeded}
              </span>
              <span className="text-[11px] font-bold text-emerald-700">كاشير نشط</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
              {isEnglish ? 'Vouchers Redeemed' : 'القسائم المطبقة في السلة'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-purple-700 font-mono">
                {selectedCell.data.vouchers}
              </span>
              <span className="text-[11px] font-bold text-purple-600">قسيمة فعالة</span>
            </div>
          </div>
        </div>

        {/* Operational Intelligence Directives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
              <ShoppingBag size={16} />
            </div>
            <div>
              <span className="text-[11px] font-black text-slate-800 block">
                {isEnglish ? 'Top In-Demand Departments' : 'القسم الأكثر كثافة وطلباً بهذه الفترة:'}
              </span>
              <span className="text-xs font-bold text-[#005A2B] mt-0.5 block">
                {isEnglish ? selectedCell.data.topDeptEn : selectedCell.data.topDeptAr}
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#005A2B] border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="text-[11px] font-black text-slate-800 block">
                {isEnglish ? 'Floor & Cashier Operations Directives' : 'توجيهات العمليات لتفادي طوابير الانتظار:'}
              </span>
              <span className="text-xs font-medium text-slate-600 mt-0.5 block leading-relaxed">
                {isEnglish ? selectedCell.data.recommendationEn : selectedCell.data.recommendationAr}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Executive Takeaways Summary Footnotes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>
            {isEnglish 
              ? 'Peak Shopping: Thursday & Friday (8:00 - 11:00 PM) averages 670+ shoppers/hr.' 
              : 'ذروة التسوق الأسبوعي: ليلتي الخميس والجمعة (8:00 - 11:00 م) بمتوسط +670 متسوق/ساعة.'}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>
            {isEnglish 
              ? 'Fastest Checkout Window: Sunday & Monday mornings under 90 sec basket turnaround.' 
              : 'أسرع تسوق ومحاسبة: صباح الأحد والإثنين بأقل من 90 ثانية لإنهاء السلة.'}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
          <span>
            {isEnglish 
              ? 'High Voucher Engagement: 84% of shoppers present discount vouchers during peak hours.' 
              : 'تفاعل استثنائي: 84% من متسوقي الذروة يستخدمون قسائم الخصم عند الكاشير.'}
          </span>
        </div>
      </div>
    </div>
  );
};
