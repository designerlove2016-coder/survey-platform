export interface DashboardTranslations {
  header: {
    experienceNo: string;
    previewExperience: string;
    honorBoard: string;
    manageBrand: string;
    brandButton: string;
    defaultBrandTitle: string;
    defaultBrandSubtitle: string;
  };
  sidebar: {
    adminPanel: string;
    defaultBranch: string;
    storeName: string;
    collapseTooltip: string;
    expandTooltip: string;
    nav: {
      overview: string;
      customers: string;
      surveys: string;
      analytics: string;
      ai: string;
      journey: string;
      vouchers: string;
      loyalty: string;
      leaderboard: string;
      rbac: string;
      audit: string;
      brand: string;
    };
    previewJourney: string;
    closeDashboard: string;
    excel: string;
    json: string;
  };
  banner: {
    title: string;
    subtitle: string;
    exportCsv: string;
    exportJson: string;
    copySummary: string;
    customersDirectory: string;
    journeyEditor: string;
    openColors: string;
    cxShowcase: string;
    backToOverview: string;
    activeSectionView: string;
  };
  kpis: {
    totalReviews: string;
    registeredResponses: string;
    positiveSatisfaction: string;
    excellentImpression: string;
    avgGameScore: string;
    activeEngagement: string;
    difficultyLevel: string;
    currentMode: string;
    diffEasy: string;
    diffMedium: string;
    diffHard: string;
  };
  funnel: {
    title: string;
    liveConversion: string;
    subtitle: string;
    fullAnalyticsView: string;
    totalShoppers: string;
    verifiedScans: string;
    vouchersUnlocked: string;
    conversionRate: string;
    instantDiscount: string;
    retention: string;
    excellent: string;
    shoppersSubmitted: string;
    avgJourneyTime: string;
    minUnit: string;
    smoothExperience: string;
    funnelStagesTitle: string;
    clickToInspect: string;
    shoppersUnit: string;
    durationLabel: string;
    dropRateLabel: string;
    stageOfFive: (id: number) => string;
    shopperCount: string;
    stageDropRate: string;
    steps: Array<{
      id: number;
      title: string;
      subtitle: string;
      avgTime: string;
      insight: string;
    }>;
  };
  directory: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    colCustomer: string;
    colPhone: string;
    colBranch: string;
    colRating: string;
    colDepartment: string;
    colScore: string;
    colDate: string;
    colAction: string;
    viewProfile: string;
    allBranches: string;
    allLanguages: string;
    notRegistered: string;
    defaultCustomerName: string;
  };
  branches: Record<string, string>;
}

const DASHBOARD_TRANSLATIONS: Record<string, DashboardTranslations> = {
  ar: {
    header: {
      experienceNo: 'تجربة رقم #01',
      previewExperience: 'معاينة تجربة العميل',
      honorBoard: 'لوحة الشرف',
      manageBrand: 'إدارة هوية المتجر والشعار',
      brandButton: 'الهوية والشعار',
      defaultBrandTitle: 'بنده معك تفرق',
      defaultBrandSubtitle: 'عالم من المزايا',
    },
    sidebar: {
      adminPanel: 'لوحة الإدارة السحابية',
      defaultBranch: 'فرع الأندلس - جدة',
      storeName: 'بنده',
      collapseTooltip: 'طي القائمة',
      expandTooltip: 'توسيع القائمة',
      nav: {
        overview: 'نظرة عامة ومؤشرات الأداء',
        customers: 'سجل العملاء المتكامل',
        surveys: 'إدارة وتخصيص استبيانات رضا العملاء',
        analytics: 'التحليلات وقمع التحويل',
        ai: 'توصيات الذكاء الاصطناعي',
        journey: 'مسار خطوات التجربة',
        vouchers: 'محرك القسائم الذكية',
        loyalty: 'إدارة برامج الولاء (Loyalty)',
        leaderboard: 'لوحة صدارة العملاء',
        rbac: 'مصفوفة الصلاحيات (RBAC)',
        audit: 'سجل الرقابة الأمنية (Audit)',
        brand: 'تخصيص الهوية والشعارات',
      },
      previewJourney: 'معاينة تجربة العميل',
      closeDashboard: 'إغلاق لوحة الإدارة ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'لوحة المراقبة الذكية وإدارة الآراء',
      subtitle: 'البيانات المباشرة، التصدير، وتفاعل المتسوقين',
      exportCsv: 'تصدير Excel (CSV)',
      exportJson: 'تصدير JSON',
      copySummary: 'نسخ الملخص',
      customersDirectory: 'سجل العملاء المتكامل',
      journeyEditor: 'محرر التجربة والأسئلة 🛠️',
      openColors: 'ألوان الواجهة 🎨',
      cxShowcase: 'منصة العملاء CX',
      backToOverview: 'العودة إلى نظرة عامة ومؤشرات الأداء',
      activeSectionView: 'عرض القسم المحدد',
    },
    kpis: {
      totalReviews: 'إجمالي التقييمات',
      registeredResponses: 'استجابة مسجلة',
      positiveSatisfaction: 'نسبة الرضا الإيجابي',
      excellentImpression: 'انطباع ممتاز',
      avgGameScore: 'متوسط نقاط اللعبة',
      activeEngagement: 'تفاعل حماسي',
      difficultyLevel: 'مستوى الصعوبة',
      currentMode: 'المستوى الحالي',
      diffEasy: 'سهل 🟢',
      diffMedium: 'متوسط ⚡',
      diffHard: 'محترف 🔥',
    },
    funnel: {
      title: 'التحليلات التنفيذية وقمع التحويل التفاعلي',
      liveConversion: 'معدل إتمام التجربة: 79%',
      subtitle: 'تتبع تفاعلي فوري لمسار انتقال المتسوقين من مسح الباركود إلى استلام القسيمة وتقييم الرضا',
      fullAnalyticsView: 'عرض كافة التحليلات التفصيلية',
      totalShoppers: 'إجمالي المتسوقين المتفاعلين',
      verifiedScans: 'مسح مباشر عبر الباركود',
      vouchersUnlocked: 'القسائم المفتوحة بنجاح',
      conversionRate: 'نسبة تحويل 83%',
      instantDiscount: 'خصم فوري مطبق بالسلة',
      retention: 'معدل إكمال الرحلة بالكامل',
      excellent: 'ممتاز ⭐',
      shoppersSubmitted: '1,118 متسوق أكمل التقييم',
      avgJourneyTime: 'متوسط وقت التجربة',
      minUnit: 'دقيقة',
      smoothExperience: 'تجربة خفيفة وسلسة وسريعة',
      funnelStagesTitle: 'قمع مراحل تجربة المتسوق والتحويل',
      clickToInspect: 'اضغط على أي مرحلة لمعاينة تفاصيلها',
      shoppersUnit: 'متسوق',
      durationLabel: 'المدة:',
      dropRateLabel: 'معدل التسرب:',
      stageOfFive: (id) => `المرحلة ${id} من 5`,
      shopperCount: 'عدد المتسوقين بالخطوة',
      stageDropRate: 'معدل التسرب بالخطوة',
      steps: [
        {
          id: 1,
          title: 'مسح الباركود والترحيب',
          subtitle: 'فتح تجربة بنده الذكية عبر الكود',
          avgTime: '12 ثانية',
          insight: 'نسبة وصول قياسية عبر كروت الستاند والباركود المطبوع عند المداخل وعربات التسوق.',
        },
        {
          id: 2,
          title: 'تحديد الاحتياج وأقسام التسوق',
          subtitle: 'اختيار الأقسام المفضلة وعروض السلة',
          avgTime: '24 ثانية',
          insight: '95% من المتسوقين يحددون أقسامهم فوراً، ويتصدر قسم الخضار والفواكه بنسبة 38%.',
        },
        {
          id: 3,
          title: 'تحدي بنده التفاعلي وفرقعة النقاط',
          subtitle: 'اللعبة السريعة لكسب نقاط التأهيل',
          avgTime: '30 ثانية',
          insight: 'أعلى مرحلة من حيث التفاعل والاندماج؛ 91% من اللاعبين يحققون نقاط فتح القسيمة.',
        },
        {
          id: 4,
          title: 'فتح وتفعيل قسيمة الخصم',
          subtitle: 'إدخال رقم الجوال وكشف كود التوفير',
          avgTime: '18 ثانية',
          insight: 'معدل فك قفل استثنائي بنسبة 93% من المؤهلين، مسجلاً رقماً قياسياً في جمع بيانات الجوال.',
        },
        {
          id: 5,
          title: 'تقييم التجربة وتأكيد الرضا',
          subtitle: 'تقديم النجوم والملاحظات الصوتية',
          avgTime: '15 ثانية',
          insight: '79% معدل إتمام شامل لكل الخطوات؛ 94% من التقييمات تمنح 5 نجوم (ممتاز).',
        },
      ],
    },
    directory: {
      title: 'سجل العملاء التفاعلي',
      subtitle: 'قاعدة بيانات متسوقي بنده وسجل التقييمات والقسائم',
      searchPlaceholder: 'بحث بالاسم، رقم الجوال، أو القسم...',
      colCustomer: 'العميل',
      colPhone: 'رقم الجوال',
      colBranch: 'الفرع',
      colRating: 'التقييم',
      colDepartment: 'القسم المفضل',
      colScore: 'النقاط',
      colDate: 'التاريخ',
      colAction: 'الإجراء',
      viewProfile: 'عرض الملف',
      allBranches: 'جميع الفروع',
      allLanguages: 'جميع اللغات',
      notRegistered: 'غير مسجل',
      defaultCustomerName: 'عميل بنده',
    },
    branches: {
      all: 'جميع الفروع والقنوات',
      andalus: 'فرع الأندلس - جدة',
      rawdah: 'فرع الروضة - جدة',
      olaya: 'فرع العليا - الرياض',
      online: 'بنده كليك والتوصيل الإلكتروني',
      express: 'بنده إكسبريس (الخدمة السريعة)',
    },
  },

  en: {
    header: {
      experienceNo: 'Experience #01',
      previewExperience: 'Preview Customer Experience',
      honorBoard: 'Honor Board',
      manageBrand: 'Manage store brand & logo',
      brandButton: 'Brand & Logo',
      defaultBrandTitle: 'Panda Makes the Difference',
      defaultBrandSubtitle: 'A World of Benefits',
    },
    sidebar: {
      adminPanel: 'Cloud Admin Panel',
      defaultBranch: 'Al-Andalus Branch - Jeddah',
      storeName: 'Panda',
      collapseTooltip: 'Collapse sidebar',
      expandTooltip: 'Expand sidebar',
      nav: {
        overview: 'Overview & KPIs',
        customers: 'Customer Directory',
        surveys: 'Customer Survey & Table QR',
        analytics: 'Analytics & Funnel',
        ai: 'AI Recommendations',
        journey: 'Journey Flow & Steps',
        vouchers: 'Smart Vouchers Engine',
        loyalty: 'Loyalty Management',
        leaderboard: 'Customer Leaderboard',
        rbac: 'Access Control (RBAC)',
        audit: 'Security Audit Log',
        brand: 'Branding & Themes',
      },
      previewJourney: 'Preview Customer Journey',
      closeDashboard: 'Close Dashboard ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'Smart Monitoring & Feedback Management',
      subtitle: 'Real-time data, exports, and customer engagement',
      exportCsv: 'Export Excel (CSV)',
      exportJson: 'Export JSON',
      copySummary: 'Copy Summary',
      customersDirectory: 'Customers Directory',
      journeyEditor: 'Journey Editor 🛠️',
      openColors: 'Open Colors 🎨',
      cxShowcase: 'CX Platform Showcase',
      backToOverview: 'Back to Overview & KPIs',
      activeSectionView: 'Active Section View',
    },
    kpis: {
      totalReviews: 'Total Reviews',
      registeredResponses: 'registered responses',
      positiveSatisfaction: 'Positive Satisfaction',
      excellentImpression: 'Excellent impression',
      avgGameScore: 'Average Game Score',
      activeEngagement: 'Active engagement',
      difficultyLevel: 'Difficulty Level',
      currentMode: 'Current mode',
      diffEasy: 'Easy 🟢',
      diffMedium: 'Medium ⚡',
      diffHard: 'Pro 🔥',
    },
    funnel: {
      title: 'Executive Analytics & Conversion Funnel',
      liveConversion: 'Live Conversion: 79%',
      subtitle: 'Interactive real-time conversion stages, drop-off analytics, and shopper dynamics',
      fullAnalyticsView: 'Full Analytics View',
      totalShoppers: 'Total Engaged Shoppers',
      verifiedScans: '100% verified QR scans',
      vouchersUnlocked: 'Vouchers Unlocked',
      conversionRate: '83% Conversion',
      instantDiscount: 'Instant in-cart discount',
      retention: 'End-to-End Retention',
      excellent: 'Excellent ⭐',
      shoppersSubmitted: '1,118 shoppers submitted',
      avgJourneyTime: 'Avg Journey Time',
      minUnit: 'min',
      smoothExperience: 'Frictionless & smooth',
      funnelStagesTitle: 'Customer Journey Funnel Stages',
      clickToInspect: 'Click any step to inspect',
      shoppersUnit: 'shoppers',
      durationLabel: 'Duration:',
      dropRateLabel: 'Drop:',
      stageOfFive: (id) => `Stage ${id} of 5`,
      shopperCount: 'Shopper Count',
      stageDropRate: 'Stage Drop Rate',
      steps: [
        {
          id: 1,
          title: 'Scan & Welcome',
          subtitle: 'Accessing Panda interactive experience via QR',
          avgTime: '12s',
          insight: 'Exceptional onboarding velocity through entrance stands and trolley QR codes.',
        },
        {
          id: 2,
          title: 'Shopping Need & Category',
          subtitle: 'Selecting favorite departments and personalized basket deals',
          avgTime: '24s',
          insight: '95% of shoppers pick their needs immediately, led by fresh produce at 38%.',
        },
        {
          id: 3,
          title: 'Panda Interactive Challenge',
          subtitle: 'Quick gamified challenge to score points and qualify',
          avgTime: '30s',
          insight: 'Highest engagement stage; 91% of players achieve the voucher unlock score.',
        },
        {
          id: 4,
          title: 'Promo Voucher Unlock',
          subtitle: 'Entering phone number and unlocking the instant discount code',
          avgTime: '18s',
          insight: 'Outstanding 93% unlock rate among qualifiers, generating rich verified customer leads.',
        },
        {
          id: 5,
          title: 'Experience Rating & Retention',
          subtitle: 'Submitting satisfaction stars and voice sentiment',
          avgTime: '15s',
          insight: '79% full end-to-end completion rate; 94% of submitted ratings award 5 stars.',
        },
      ],
    },
    directory: {
      title: 'Customer Directory',
      subtitle: 'Panda shoppers database, satisfaction records and unlocked vouchers',
      searchPlaceholder: 'Search by name, phone, or department...',
      colCustomer: 'Customer',
      colPhone: 'Phone',
      colBranch: 'Branch',
      colRating: 'Rating',
      colDepartment: 'Favorite Department',
      colScore: 'Score',
      colDate: 'Date',
      colAction: 'Action',
      viewProfile: 'View Profile',
      allBranches: 'All Branches',
      allLanguages: 'All Languages',
      notRegistered: 'Not registered',
      defaultCustomerName: 'Panda Shopper',
    },
    branches: {
      all: 'All Branches & Channels',
      andalus: 'Al-Andalus Branch - Jeddah',
      rawdah: 'Al-Rawdah Branch - Jeddah',
      olaya: 'Olaya Branch - Riyadh',
      online: 'Panda Click & Online Delivery',
      express: 'Panda Express Quick Mart',
    },
  },

  am: {
    header: {
      experienceNo: 'ልምድ #01',
      previewExperience: 'የደንበኛ ተሞክሮን ይመልከቱ',
      honorBoard: 'የክብር ሰሌዳ',
      manageBrand: 'የመደብር መለያ እና አርማ ያቀናብሩ',
      brandButton: 'መለያ እና አርማ',
      defaultBrandTitle: 'ከፓንዳ ጋር ልዩነት አለ',
      defaultBrandSubtitle: 'የጥቅማጥቅሞች ዓለም',
    },
    sidebar: {
      adminPanel: 'የደመና አስተዳዳሪ ፓነል',
      defaultBranch: 'የአል-አንዳሉስ ቅርንጫፍ - ጅዳ',
      storeName: 'ፓንዳ',
      collapseTooltip: 'ፓነሉን አሳንስ',
      expandTooltip: 'ፓነሉን አስፋ',
      nav: {
        overview: 'አጠቃላይ እይታ እና ዋና መለኪያዎች',
        customers: 'የደንበኞች መዝገብ',
        surveys: 'የደንበኞች ጥናት እና ጠረጴዛ QR',
        analytics: 'ትንታኔዎች እና የልወጣ ሂደት',
        ai: 'የ AI ምክሮች',
        journey: 'የልምድ ፍሰት እና ደረጃዎች',
        vouchers: 'ብልህ የኩፖኖች ሞተር',
        loyalty: 'የታማኝነት ፕሮግራም አስተዳደር',
        leaderboard: 'የደንበኞች የክብር ሰሌዳ',
        rbac: 'የተጠቃሚ ፈቃዶች እና ሚናዎች (RBAC)',
        audit: 'የደህንነት ኦዲት መዝገብ',
        brand: 'የምርት መለያ እና ገጽታዎች',
      },
      previewJourney: 'የደንበኛውን ጉዞ ይመልከቱ',
      closeDashboard: 'ዳሽቦርዱን ዝጋ ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'ብልህ ክትትል እና የአስተያየት አስተዳደር',
      subtitle: 'የእውነተኛ ጊዜ ውሂብ፣ ኤክስፖርት እና የተጠቃሚ ተሳትፎ',
      exportCsv: 'ኤክስፖርት Excel (CSV)',
      exportJson: 'ኤክስፖርት JSON',
      copySummary: 'ማጠቃለያ ቅዳ',
      customersDirectory: 'የደንበኞች ማውጫ',
      journeyEditor: 'የጉዞ አርታኢ 🛠️',
      openColors: 'ቀለሞች ክፈት 🎨',
      cxShowcase: 'የደንበኛ ልምድ መድረክ',
      backToOverview: 'ወደ አጠቃላይ እይታ እና መለኪያዎች ተመለስ',
      activeSectionView: 'የተመረጠውን ክፍል እይታ',
    },
    kpis: {
      totalReviews: 'አጠቃላይ ግምገማዎች',
      registeredResponses: 'የተመዘገቡ ምላሾች',
      positiveSatisfaction: 'አዎንታዊ እርካታ',
      excellentImpression: 'እጅግ በጣም ጥሩ ስሜት',
      avgGameScore: 'አማካይ የጨዋታ ውጤት',
      activeEngagement: 'ንቁ ተሳትፎ',
      difficultyLevel: 'የከበደ ደረጃ',
      currentMode: 'የአሁኑ ሁነታ',
      diffEasy: 'ቀላል 🟢',
      diffMedium: 'መካከለኛ ⚡',
      diffHard: 'ባለሙያ 🔥',
    },
    funnel: {
      title: 'አስፈፃሚ ትንታኔዎች እና የልወጣ ሂደት',
      liveConversion: 'የቀጥታ ልወጣ: 79%',
      subtitle: 'የእውነተኛ ጊዜ የልወጣ ደረጃዎች፣ የማቋረጥ ትንታኔዎች እና የተጠቃሚ እንቅስቃሴ',
      fullAnalyticsView: 'ሙሉ የትንታኔ እይታ',
      totalShoppers: 'አጠቃላይ የተሳተፉ ሸማቾች',
      verifiedScans: '100% የተረጋገጡ የ QR ቅኝቶች',
      vouchersUnlocked: 'የተከፈቱ ኩፖኖች',
      conversionRate: '83% የልወጣ መጠን',
      instantDiscount: 'ፈጣን የጋሪ ቅናሽ',
      retention: 'የተጠቃሚዎች ቆይታ (Retention)',
      excellent: 'እጅግ በጣም ጥሩ ⭐',
      shoppersSubmitted: '1,118 ሸማቾች አጠናቀዋል',
      avgJourneyTime: 'አማካይ የጉዞ ጊዜ',
      minUnit: 'ደቂቃ',
      smoothExperience: 'ፈጣን እና ምቹ',
      funnelStagesTitle: 'የደንበኛ ጉዞ ደረጃዎች',
      clickToInspect: 'ለዝርዝር ማንኛውንም ደረጃ ይጫኑ',
      shoppersUnit: 'ሸማቾች',
      durationLabel: 'የፈጀው ጊዜ:',
      dropRateLabel: 'የማቋረጥ መጠን:',
      stageOfFive: (id) => `ደረጃ ${id} ከ 5`,
      shopperCount: 'የሸማቾች ብዛት',
      stageDropRate: 'የማቋረጥ መጠን',
      steps: [
        {
          id: 1,
          title: 'የባርኮድ ቅኝት እና አቀባበል',
          subtitle: 'የፓንዳ ዘመናዊ መስተጋብርን በኮድ ይክፈቱ',
          avgTime: '12 ሰከንድ',
          insight: 'በመግቢያዎች እና በግዢ ጋሪዎች ላይ ባሉ ባርኮዶች ፈጣን ተሳትፎ።',
        },
        {
          id: 2,
          title: 'ፍላጎትን እና ክፍሎችን መምረጥ',
          subtitle: 'ተወዳጅ ክፍሎችን እና የግል ቅናሾችን ይምረጡ',
          avgTime: '24 ሰከንድ',
          insight: '95% ሸማቾች ምርጫቸውን ወዲያውኑ ይወስናሉ፣ አትክልትና ፍራፍሬ በ 38% ይመራል።',
        },
        {
          id: 3,
          title: 'የፓንዳ መስተጋብራዊ ውድድር',
          subtitle: 'ነጥብ ለማግኘት እና ለመመረጥ ፈጣን ጨዋታ',
          avgTime: '30 ሰከንድ',
          insight: 'ከፍተኛ የተሳትፎ ደረጃ፤ 91% ተጫዋቾች የኩፖን መክፈቻ ነጥብ ያገኛሉ።',
        },
        {
          id: 4,
          title: 'የቅናሽ ኩፖን መክፈት',
          subtitle: 'የስልክ ቁጥር በማስገባት የቁጠባ ኮድ ማግኘት',
          avgTime: '18 ሰከንድ',
          insight: 'በ 93% ብቁ ሰዎች ዘንድ የላቀ የመክፈቻ ምጣኔ ተመዝግቧል።',
        },
        {
          id: 5,
          title: 'ልምድን መገምገም እና እርካታን ማረጋገጥ',
          subtitle: 'ኮከቦችን እና አስተያየቶችን ማስገባት',
          avgTime: '15 ሰከንድ',
          insight: '79% አጠቃላይ የሂደት ማጠናቀቂያ ምጣኔ፤ 94% ግምገማዎች 5 ኮከብ ተሰጥተዋል።',
        },
      ],
    },
    directory: {
      title: 'የደንበኞች መዝገብ',
      subtitle: 'የፓንዳ ሸማቾች ውሂብ ጎታ፣ የግምገማ መዝገቦች እና ኩፖኖች',
      searchPlaceholder: 'በስም፣ ስልክ ቁጥር ወይም ክፍል ይፈልጉ...',
      colCustomer: 'ደንበኛ',
      colPhone: 'ስልክ ቁጥር',
      colBranch: 'ቅርንጫፍ',
      colRating: 'ደረጃ / ግምገማ',
      colDepartment: 'ተመራጭ ክፍል',
      colScore: 'ነጥብ',
      colDate: 'ቀን',
      colAction: 'እርምጃ',
      viewProfile: 'መገለጫ ይመልከቱ',
      allBranches: 'ሁሉም ቅርንጫፎች',
      allLanguages: 'ሁሉም ቋንቋዎች',
      notRegistered: 'ያልተመዘገበ',
      defaultCustomerName: 'የፓንዳ ደንበኛ',
    },
    branches: {
      all: 'ሁሉም ቅርንጫፎች እና ቻናሎች',
      andalus: 'የአል-አንዳሉስ ቅርንጫፍ - ጅዳ',
      rawdah: 'የአል-ረውዳህ ቅርንጫፍ - ጅዳ',
      olaya: 'የኦላያ ቅርንጫፍ - ሪያድ',
      online: 'ፓንዳ ክሊክ እና የመስመር ላይ ማድረስ',
      express: 'ፓንዳ ኤክስፕረስ (ፈጣን አገልግሎት)',
    },
  },

  ur: {
    header: {
      experienceNo: 'تجربہ نمبر #01',
      previewExperience: 'کسٹمر کے تجربے کا جائزہ لیں',
      honorBoard: 'اعزازی بورڈ',
      manageBrand: 'اسٹور برانڈ اور لوگو کا نظم کریں',
      brandButton: 'برانڈ اور لوگو',
      defaultBrandTitle: 'پاندا کے ساتھ فرق پڑتا ہے',
      defaultBrandSubtitle: 'فوائد کی ایک دنیا',
    },
    sidebar: {
      adminPanel: 'کلاؤڈ ایڈمن پینل',
      defaultBranch: 'الاندلس برانچ - جدہ',
      storeName: 'پاندا',
      collapseTooltip: 'سائیڈبار سکیڑیں',
      expandTooltip: 'سائیڈبار پھیلائیں',
      nav: {
        overview: 'جائزہ اور اہم کارکردگی کے اشارے',
        customers: 'جامع کسٹمر ڈائرکٹری',
        surveys: 'کسٹمر سروے اور ٹیبل کیو آر',
        analytics: 'تجزیات اور تبادلوں کا فینل',
        ai: 'مصنوعی ذہانت کی تجاویز',
        journey: 'سفر کا بہاؤ اور مراحل',
        vouchers: 'اسمارٹ واؤچر انجن',
        loyalty: 'وفاداری پروگرام کا انتظام',
        leaderboard: 'کسٹمر لیڈر بورڈ',
        rbac: 'رسائی کا کنٹرول (RBAC)',
        audit: 'سیکیورٹی آڈٹ لاگ',
        brand: 'برانڈنگ اور تھیمز',
      },
      previewJourney: 'کسٹمر کے سفر کا جائزہ لیں',
      closeDashboard: 'ڈیش بورڈ بند کریں ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'اسمارٹ نگرانی اور آراء کا انتظام',
      subtitle: 'حقیقی وقت کا ڈیٹا، برآمدات اور کسٹمر کی شمولیت',
      exportCsv: 'ایکسل (CSV) برآمد کریں',
      exportJson: 'JSON برآمد کریں',
      copySummary: 'خلاصہ کاپی کریں',
      customersDirectory: 'کسٹمر ڈائرکٹری',
      journeyEditor: 'سفر کا ایڈیٹر 🛠️',
      openColors: 'انٹرفیس کے رنگ 🎨',
      cxShowcase: 'CX پلیٹ فارم شوکیس',
      backToOverview: 'جائزہ اور اشارے پر واپس جائیں',
      activeSectionView: 'منتخب سیکشن کا منظر',
    },
    kpis: {
      totalReviews: 'کل جائزے',
      registeredResponses: 'درج شدہ جوابات',
      positiveSatisfaction: 'مثبت اطمینان',
      excellentImpression: 'شاندار تاثر',
      avgGameScore: 'کھیل کا اوسط سکور',
      activeEngagement: 'سرگرم شمولیت',
      difficultyLevel: 'مشکل کی سطح',
      currentMode: 'موجودہ موڈ',
      diffEasy: 'آسان 🟢',
      diffMedium: 'درمیانہ ⚡',
      diffHard: 'ماہر 🔥',
    },
    funnel: {
      title: 'ایگزیکٹو تجزیات اور تبادلوں کا فینل',
      liveConversion: 'براہ راست تبادلہ: 79%',
      subtitle: 'بارکوڈ اسکین سے لے کر واؤچر وصول کرنے تک گاہکوں کے سفر کی براہ راست نگرانی',
      fullAnalyticsView: 'مکمل تفصیلی تجزیات دیکھیں',
      totalShoppers: 'کل منسلک خریدار',
      verifiedScans: '100% تصدیق شدہ کیو آر اسکین',
      vouchersUnlocked: 'کھولے گئے واؤچرز',
      conversionRate: '83% تبادلوں کی شرح',
      instantDiscount: 'ٹوکری میں فوری رعایت',
      retention: 'مکمل سفر کی تکمیل کی شرح',
      excellent: 'شاندار ⭐',
      shoppersSubmitted: '1,118 خریداروں نے فیڈ بیک مکمل کیا',
      avgJourneyTime: 'اوسط وقت',
      minUnit: 'منٹ',
      smoothExperience: 'آسان اور ہموار تجربہ',
      funnelStagesTitle: 'کسٹمر کے سفر کے مراحل کا فینل',
      clickToInspect: 'تفصیلات دیکھنے کے لیے کسی مرحلے پر کلک کریں',
      shoppersUnit: 'خریدار',
      durationLabel: 'دورانیہ:',
      dropRateLabel: 'ڈراپ کی شرح:',
      stageOfFive: (id) => `مرحلہ ${id} از 5`,
      shopperCount: 'خریداروں کی تعداد',
      stageDropRate: 'مرحلے کے ڈراپ کی شرح',
      steps: [
        {
          id: 1,
          title: 'اسکین اور خوش آمدید',
          subtitle: 'کیو آر کوڈ کے ذریعے پاندا کے سمارٹ تجربے تک رسائی',
          avgTime: '12 سیکنڈ',
          insight: 'داخلی راستوں اور شاپنگ ٹرالیوں پر بارکوڈز کے ذریعے غیر معمولی شمولیت۔',
        },
        {
          id: 2,
          title: 'ضرورت اور حصوں کا تعین',
          subtitle: 'پسندیدہ حصوں اور خصوصی رعایتوں کا انتخاب',
          avgTime: '24 سیکنڈ',
          insight: '95% خریدار اپنی ضروریات کا فوری انتخاب کرتے ہیں، جس میں سبزیاں اور پھل 38% کے ساتھ سرفہرست ہیں۔',
        },
        {
          id: 3,
          title: 'پاندا کا تفاعلی چیلنج',
          subtitle: 'پوائنٹس حاصل کرنے اور اہل ہونے کے لیے تیز رفتار کھیل',
          avgTime: '30 سیکنڈ',
          insight: 'سب سے زیادہ شمولیت والا مرحلہ؛ 91% کھلاڑی واؤچر انلاک سکور حاصل کرتے ہیں۔',
        },
        {
          id: 4,
          title: 'ڈسکاؤنٹ واؤچر انلاک',
          subtitle: 'موبائل نمبر درج کر کے بچت کوڈ ظاہر کرنا',
          avgTime: '18 سیکنڈ',
          insight: 'اہل افراد میں 93% کا غیر معمولی انلاک ریٹ۔',
        },
        {
          id: 5,
          title: 'تجربے کی درجہ بندی اور اطمینان کی تصدیق',
          subtitle: 'ستارے اور صوتی آراء جمع کروانا',
          avgTime: '15 سیکنڈ',
          insight: '79% مکمل تکمیل کی شرح؛ 94% ریٹنگز 5 ستارے ہیں۔',
        },
      ],
    },
    directory: {
      title: 'کسٹمر ڈائرکٹری',
      subtitle: 'پاندا شاپرز ڈیٹا بیس، فیڈ بیک ریکارڈز اور واؤچرز',
      searchPlaceholder: 'نام، موبائل نمبر یا سیکشن کے ذریعے تلاش کریں...',
      colCustomer: 'خریدار',
      colPhone: 'فون نمبر',
      colBranch: 'برانچ',
      colRating: 'ریٹنگ',
      colDepartment: 'پسندیدہ شعبہ',
      colScore: 'پوائنٹس',
      colDate: 'تاریخ',
      colAction: 'کارروائی',
      viewProfile: 'پروفائل دیکھیں',
      allBranches: 'تمام برانچز',
      allLanguages: 'تمام زبانیں',
      notRegistered: 'غیر درج شدہ',
      defaultCustomerName: 'پاندا خریدار',
    },
    branches: {
      all: 'تمام برانچز اور چینلز',
      andalus: 'الاندلس برانچ - جدہ',
      rawdah: 'الروضہ برانچ - جدہ',
      olaya: 'العلیہ برانچ - ریاض',
      online: 'پاندا کلک اور آن لائن ڈیلیوری',
      express: 'پاندا ایکسپریس (فوری سروس)',
    },
  },

  hi: {
    header: {
      experienceNo: 'अनुभव #01',
      previewExperience: 'ग्राहक अनुभव का पूर्वावलोकन',
      honorBoard: 'सम्मान पटल',
      manageBrand: 'स्टोर ब्रांड और लोगो प्रबंधित करें',
      brandButton: 'ब्रांड और लोगो',
      defaultBrandTitle: 'पांडा के साथ फर्क पड़ता है',
      defaultBrandSubtitle: 'फायदों की एक दुनिया',
    },
    sidebar: {
      adminPanel: 'क्लाउड एडमिन पैनल',
      defaultBranch: 'अल-अंदलूस शाखा - जेद्दा',
      storeName: 'पांडा',
      collapseTooltip: 'साइडबार छोटा करें',
      expandTooltip: 'साइडबार बड़ा करें',
      nav: {
        overview: 'अवलोकन और मुख्य प्रदर्शन संकेतक',
        customers: 'व्यापक ग्राहक निर्देशिका',
        surveys: 'ग्राहक सर्वेक्षण और टेबल क्यूआर',
        analytics: 'एनालिटिक्स और रूपांतरण फ़नल',
        ai: 'एआई सिफारिशें',
        journey: 'यात्रा प्रवाह और चरण',
        vouchers: 'स्मार्ट वाउचर इंजन',
        loyalty: 'लॉयल्टी प्रबंधन',
        leaderboard: 'ग्राहक लीडरबोर्ड',
        rbac: 'पहुंच नियंत्रण (RBAC)',
        audit: 'सुरक्षा ऑडिट लॉग',
        brand: 'ब्रांडिंग और थीम',
      },
      previewJourney: 'ग्राहक यात्रा का पूर्वावलोकन',
      closeDashboard: 'डैशबोर्ड बंद करें ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'स्मार्ट निगरानी और प्रतिक्रिया प्रबंधन',
      subtitle: 'वास्तविक समय डेटा, निर्यात और ग्राहक सहभागिता',
      exportCsv: 'एक्सेल (CSV) निर्यात करें',
      exportJson: 'JSON निर्यात करें',
      copySummary: 'सारांश कॉपी करें',
      customersDirectory: 'ग्राहक निर्देशिका',
      journeyEditor: 'यात्रा संपादक 🛠️',
      openColors: 'इंटरफ़ेस रंग 🎨',
      cxShowcase: 'CX प्लेटफ़ॉर्म शोकेस',
      backToOverview: 'अवलोकन और संकेतकों पर वापस जाएं',
      activeSectionView: 'सक्रिय अनुभाग दृश्य',
    },
    kpis: {
      totalReviews: 'कुल समीक्षाएं',
      registeredResponses: 'दर्ज प्रतिक्रियाएं',
      positiveSatisfaction: 'सकारात्मक संतुष्टि',
      excellentImpression: 'उत्कृष्ट प्रभाव',
      avgGameScore: 'औसत खेल स्कोर',
      activeEngagement: 'सक्रिय सहभागिता',
      difficultyLevel: 'कठिनाई स्तर',
      currentMode: 'वर्तमान मोड',
      diffEasy: 'आसान 🟢',
      diffMedium: 'मध्यम ⚡',
      diffHard: 'प्रो 🔥',
    },
    funnel: {
      title: 'कार्यकारी विश्लेषण और रूपांतरण फ़नल',
      liveConversion: 'लाइव रूपांतरण: 79%',
      subtitle: 'बारकोड स्कैन से लेकर वाउचर प्राप्ति और संतुष्टि रेटिंग तक ग्राहकों की यात्रा की रीयल-टाइम ट्रैकिंग',
      fullAnalyticsView: 'पूर्ण विश्लेषण दृश्य',
      totalShoppers: 'कुल सक्रिय खरीदार',
      verifiedScans: '100% सत्यापित क्यूआर स्कैन',
      vouchersUnlocked: 'अनलॉक किए गए वाउचर',
      conversionRate: '83% रूपांतरण दर',
      instantDiscount: 'कार्ट में तत्काल छूट',
      retention: 'पूरी यात्रा पूर्णता दर',
      excellent: 'उत्कृष्ट ⭐',
      shoppersSubmitted: '1,118 खरीदारों ने समीक्षा पूरी की',
      avgJourneyTime: 'औसत यात्रा समय',
      minUnit: 'मिनट',
      smoothExperience: 'सहज और निर्बाध अनुभव',
      funnelStagesTitle: 'ग्राहक यात्रा फ़नल चरण',
      clickToInspect: 'विवरण देखने के लिए किसी भी चरण पर क्लिक करें',
      shoppersUnit: 'खरीदार',
      durationLabel: 'अवधि:',
      dropRateLabel: 'छोड़ने की दर:',
      stageOfFive: (id) => `चरण ${id} / 5`,
      shopperCount: 'खरीदारों की संख्या',
      stageDropRate: 'चरण ड्रॉप दर',
      steps: [
        {
          id: 1,
          title: 'स्कैन और स्वागत',
          subtitle: 'क्यूआर कोड के माध्यम से पांडा स्मार्ट अनुभव तक पहुंचें',
          avgTime: '12 सेकंड',
          insight: 'प्रवेश द्वार और शॉपिंग ट्रॉलियों पर मुद्रित बारकोड के माध्यम से असाधारण भागीदारी।',
        },
        {
          id: 2,
          title: 'ज़रूरत और विभागों का चयन',
          subtitle: 'पसंदीदा विभाग और व्यक्तिगत सौदे चुनें',
          avgTime: '24 सेकंड',
          insight: '95% खरीदार अपनी ज़रूरतें तुरंत चुनते हैं, ताजे फल और सब्जियां 38% पर शीर्ष हैं।',
        },
        {
          id: 3,
          title: 'पांडा इंटरएक्टिव चैलेंज',
          subtitle: 'अंक अर्जित करने और वाउचर पाने के लिए तेज़ खेल',
          avgTime: '30 सेकंड',
          insight: 'उच्चतम सहभागिता चरण; 91% खिलाड़ी वाउचर अनलॉक स्कोर प्राप्त करते हैं।',
        },
        {
          id: 4,
          title: 'छूट वाउचर अनलॉक',
          subtitle: 'मोबाइल नंबर दर्ज करें और बचत कोड पाएं',
          avgTime: '18 सेकंड',
          insight: 'योग्य खरीदारों में 93% की असाधारण अनलॉक दर।',
        },
        {
          id: 5,
          title: 'अनुभव रेटिंग और संतुष्टि पुष्टि',
          subtitle: 'स्टार और वॉयस फीडबैक सबमिट करें',
          avgTime: '15 सेकंड',
          insight: '79% पूर्ण यात्रा पूर्णता दर; 94% समीक्षाएं 5 स्टार हैं।',
        },
      ],
    },
    directory: {
      title: 'ग्राहक निर्देशिका',
      subtitle: 'पांडा खरीदार डेटाबेस, फीडबैक रिकॉर्ड और वाउचर',
      searchPlaceholder: 'नाम, फोन या विभाग द्वारा खोजें...',
      colCustomer: 'ग्राहक',
      colPhone: 'फ़ोन',
      colBranch: 'शाखा',
      colRating: 'रेटिंग',
      colDepartment: 'पसंदीदा विभाग',
      colScore: 'अंक',
      colDate: 'तारीख',
      colAction: 'कार्रवाई',
      viewProfile: 'प्रोफ़ाइल देखें',
      allBranches: 'सभी शाखाएं',
      allLanguages: 'सभी भाषाएं',
      notRegistered: 'दर्ज नहीं',
      defaultCustomerName: 'पांडा खरीदार',
    },
    branches: {
      all: 'सभी शाखाएं और चैनल',
      andalus: 'अल-अंदलूस शाखा - जेद्दा',
      rawdah: 'अल-रौदा शाखा - जेद्दा',
      olaya: 'ओलाया शाखा - रियाद',
      online: 'पांडा क्लिक और ऑनलाइन डिलीवरी',
      express: 'पांडा एक्सप्रेस (त्वरित सेवा)',
    },
  },

  fr: {
    header: {
      experienceNo: 'Expérience #01',
      previewExperience: "Aperçu de l'expérience client",
      honorBoard: "Tableau d'honneur",
      manageBrand: 'Gérer la marque et le logo',
      brandButton: 'Marque & Logo',
      defaultBrandTitle: 'Avec Panda ça change tout',
      defaultBrandSubtitle: 'Un monde d’avantages',
    },
    sidebar: {
      adminPanel: "Panneau d'administration cloud",
      defaultBranch: 'Succursale Al-Andalus - Djeddah',
      storeName: 'Panda',
      collapseTooltip: 'Réduire le menu',
      expandTooltip: 'Agrandir le menu',
      nav: {
        overview: 'Vue générale & Indicateurs',
        customers: 'Répertoire des clients',
        surveys: 'Enquête client & QR table',
        analytics: 'Analyses & Entonnoir',
        ai: 'Recommandations IA',
        journey: 'Flux et étapes du parcours',
        vouchers: 'Moteur de bons intelligents',
        loyalty: 'Gestion de la fidélité',
        leaderboard: 'Classement des clients',
        rbac: "Contrôle d'accès (RBAC)",
        audit: 'Journal de sécurité',
        brand: 'Image de marque et thèmes',
      },
      previewJourney: 'Aperçu du parcours client',
      closeDashboard: 'Fermer le tableau de bord ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'Surveillance intelligente & Gestion des avis',
      subtitle: 'Données en direct, exports et engagement client',
      exportCsv: 'Exporter Excel (CSV)',
      exportJson: 'Exporter JSON',
      copySummary: 'Copier le résumé',
      customersDirectory: 'Répertoire des clients',
      journeyEditor: 'Éditeur de parcours 🛠️',
      openColors: "Couleurs de l'interface 🎨",
      cxShowcase: 'Vitrine de la plateforme CX',
      backToOverview: 'Retour à la vue générale',
      activeSectionView: 'Vue de la section active',
    },
    kpis: {
      totalReviews: 'Total des avis',
      registeredResponses: 'réponses enregistrées',
      positiveSatisfaction: 'Satisfaction positive',
      excellentImpression: 'Excellente impression',
      avgGameScore: 'Score moyen au jeu',
      activeEngagement: 'Engagement actif',
      difficultyLevel: 'Niveau de difficulté',
      currentMode: 'Mode actuel',
      diffEasy: 'Facile 🟢',
      diffMedium: 'Moyen ⚡',
      diffHard: 'Pro 🔥',
    },
    funnel: {
      title: 'Analyses exécutives & Entonnoir de conversion',
      liveConversion: 'Conversion en direct: 79%',
      subtitle: 'Étapes de conversion interactives en direct, analyse des abandons et dynamique des clients',
      fullAnalyticsView: 'Vue détaillée des analyses',
      totalShoppers: 'Total des acheteurs engagés',
      verifiedScans: '100% scans QR vérifiés',
      vouchersUnlocked: 'Bons débloqués',
      conversionRate: 'Conversion 83%',
      instantDiscount: 'Remise immédiate au panier',
      retention: 'Rétention de bout en bout',
      excellent: 'Excellent ⭐',
      shoppersSubmitted: '1 118 avis soumis',
      avgJourneyTime: 'Durée moyenne du parcours',
      minUnit: 'min',
      smoothExperience: 'Fluide et sans friction',
      funnelStagesTitle: 'Étapes du parcours client',
      clickToInspect: 'Cliquez sur une étape pour inspecter',
      shoppersUnit: 'acheteurs',
      durationLabel: 'Durée:',
      dropRateLabel: 'Abandon:',
      stageOfFive: (id) => `Étape ${id} sur 5`,
      shopperCount: "Nombre d'acheteurs",
      stageDropRate: "Taux d'abandon",
      steps: [
        {
          id: 1,
          title: 'Scan QR & Bienvenue',
          subtitle: 'Accès à l’expérience intelligente Panda via QR code',
          avgTime: '12s',
          insight: 'Excellente vitesse d’intégration grâce aux bornes d’entrée et chariots.',
        },
        {
          id: 2,
          title: 'Besoins & Rayons préférés',
          subtitle: 'Sélection des rayons et offres personnalisées',
          avgTime: '24s',
          insight: '95% des clients choisissent immédiatement, en tête fruits et légumes à 38%.',
        },
        {
          id: 3,
          title: 'Défi interactif Panda',
          subtitle: 'Jeu rapide pour marquer des points et se qualifier',
          avgTime: '30s',
          insight: 'Étape avec le plus haut engagement; 91% des joueurs débloquent le bon.',
        },
        {
          id: 4,
          title: 'Déblocage du bon de réduction',
          subtitle: 'Saisie du numéro de téléphone et révélation du code promo',
          avgTime: '18s',
          insight: 'Taux de déblocage exceptionnel de 93% parmi les personnes qualifiées.',
        },
        {
          id: 5,
          title: 'Évaluation & Confirmation de satisfaction',
          subtitle: 'Envoi des étoiles et remarques vocales',
          avgTime: '15s',
          insight: '79% de taux de complétion intégrale; 94% des notes attribuent 5 étoiles.',
        },
      ],
    },
    directory: {
      title: 'Répertoire des clients',
      subtitle: 'Base de données clients Panda, avis et bons débloqués',
      searchPlaceholder: 'Recherche par nom, téléphone ou rayon...',
      colCustomer: 'Client',
      colPhone: 'Téléphone',
      colBranch: 'Succursale',
      colRating: 'Note',
      colDepartment: 'Rayon préféré',
      colScore: 'Score',
      colDate: 'Date',
      colAction: 'Action',
      viewProfile: 'Voir le profil',
      allBranches: 'Toutes les succursales',
      allLanguages: 'Toutes les langues',
      notRegistered: 'Non enregistré',
      defaultCustomerName: 'Client Panda',
    },
    branches: {
      all: 'Toutes les succursales et canaux',
      andalus: 'Succursale Al-Andalus - Djeddah',
      rawdah: 'Succursale Al-Rawdah - Djeddah',
      olaya: 'Succursale Olaya - Riyad',
      online: 'Panda Click & Livraison en ligne',
      express: 'Panda Express (Service rapide)',
    },
  },

  tl: {
    header: {
      experienceNo: 'Karanasan #01',
      previewExperience: 'Silipin ang Karanasan ng Customer',
      honorBoard: 'Lupon ng Karangalan',
      manageBrand: 'Pamahalaan ang brand at logo ng tindahan',
      brandButton: 'Brand at Logo',
      defaultBrandTitle: 'May pinagkaiba sa Panda',
      defaultBrandSubtitle: 'Mundo ng mga benepisyo',
    },
    sidebar: {
      adminPanel: 'Cloud Admin Panel',
      defaultBranch: 'Al-Andalus Branch - Jeddah',
      storeName: 'Panda',
      collapseTooltip: 'I-collapse ang sidebar',
      expandTooltip: 'I-expand ang sidebar',
      nav: {
        overview: 'Pangkalahatang-ideya at Mga KPI',
        customers: 'Direktoryo ng Customer',
        surveys: 'Sarbey ng Customer at Table QR',
        analytics: 'Analytics at Funnel',
        ai: 'Mga Rekomendasyon ng AI',
        journey: 'Daloy at Mga Hakbang ng Paglalakbay',
        vouchers: 'Smart Vouchers Engine',
        loyalty: 'Pamamahala ng Katapatan',
        leaderboard: 'Leaderboard ng Customer',
        rbac: 'Access Control (RBAC)',
        audit: 'Security Audit Log',
        brand: 'Branding at Mga Tema',
      },
      previewJourney: 'Silipin ang Paglalakbay ng Customer',
      closeDashboard: 'Isara ang Dashboard ✕',
      excel: 'Excel',
      json: 'JSON',
    },
    banner: {
      title: 'Matalinong Pagsubaybay at Pamamahala ng Feedback',
      subtitle: 'Real-time data, pag-export, at pakikipag-ugnayan ng customer',
      exportCsv: 'I-export ang Excel (CSV)',
      exportJson: 'I-export ang JSON',
      copySummary: 'Kopyahin ang Buod',
      customersDirectory: 'Direktoryo ng mga Customer',
      journeyEditor: 'Editor ng Paglalakbay 🛠️',
      openColors: 'Mga Kulay ng Interface 🎨',
      cxShowcase: 'CX Platform Showcase',
      backToOverview: 'Bumalik sa Pangkalahatang-ideya at Mga KPI',
      activeSectionView: 'View ng Aktibong Seksyon',
    },
    kpis: {
      totalReviews: 'Kabuuang mga Review',
      registeredResponses: 'nakarehistrong mga tugon',
      positiveSatisfaction: 'Positibong Kasiyahan',
      excellentImpression: 'Napakahusay na impresyon',
      avgGameScore: 'Average na Iskor sa Laro',
      activeEngagement: 'Aktibong pakikipag-ugnayan',
      difficultyLevel: 'Antas ng Kahirapan',
      currentMode: 'Kasalukuyang mode',
      diffEasy: 'Madali 🟢',
      diffMedium: 'Katamtaman ⚡',
      diffHard: 'Pro 🔥',
    },
    funnel: {
      title: 'Executive Analytics at Conversion Funnel',
      liveConversion: 'Live Conversion: 79%',
      subtitle: 'Interactive real-time conversion stages, drop-off analytics, at dynamics ng mga mamimili',
      fullAnalyticsView: 'Buong View ng Analytics',
      totalShoppers: 'Kabuuang mga Nakikibahaging Mamimili',
      verifiedScans: '100% na-verify na mga pag-scan ng QR',
      vouchersUnlocked: 'Na-unlock na mga Voucher',
      conversionRate: '83% Conversion',
      instantDiscount: 'Agarang diskwento sa basket',
      retention: 'End-to-End Retention',
      excellent: 'Napakahusay ⭐',
      shoppersSubmitted: '1,118 mamimili ang nagsumite',
      avgJourneyTime: 'Average na Oras ng Paglalakbay',
      minUnit: 'min',
      smoothExperience: 'Magaan at maayos',
      funnelStagesTitle: 'Mga Hakbang ng Funnel ng Paglalakbay ng Customer',
      clickToInspect: 'Mag-click ng anumang hakbang upang suriin',
      shoppersUnit: 'mga mamimili',
      durationLabel: 'Tagal:',
      dropRateLabel: 'Drop:',
      stageOfFive: (id) => `Yugto ${id} ng 5`,
      shopperCount: 'Bilang ng Mamimili',
      stageDropRate: 'Rate ng Pag-drop ng Yugto',
      steps: [
        {
          id: 1,
          title: 'I-scan at Maligayang Pagdating',
          subtitle: 'Pag-access sa interactive na karanasan ng Panda sa pamamagitan ng QR',
          avgTime: '12 seg',
          insight: 'Pambihirang bilis ng onboarding sa pamamagitan ng mga QR code sa cart at pasukan.',
        },
        {
          id: 2,
          title: 'Kailangan sa Pamimili at Kategorya',
          subtitle: 'Pagpili ng mga paboritong departamento at mga personal na deal',
          avgTime: '24 seg',
          insight: '95% ng mga mamimili ay agad pumipili, nangunguna ang sariwang ani sa 38%.',
        },
        {
          id: 3,
          title: 'Interactive Challenge ng Panda',
          subtitle: 'Mabilis na laro upang makakuha ng mga puntos at maging kwalipikado',
          avgTime: '30 seg',
          insight: 'Pinakamataas na pakikipag-ugnayan; 91% ay nakakamit ang iskor para sa voucher.',
        },
        {
          id: 4,
          title: 'I-unlock ang Promo Voucher',
          subtitle: 'Paglalagay ng numero ng telepono at pagbubunyag ng discount code',
          avgTime: '18 seg',
          insight: 'Natatanging 93% rate ng pag-unlock sa mga kwalipikadong customer.',
        },
        {
          id: 5,
          title: 'Rating ng Karanasan at Kumpirmasyon',
          subtitle: 'Pagsusumite ng mga bituin ng kasiyahan at puna',
          avgTime: '15 seg',
          insight: '79% kabuuang rate ng pagkumpleto; 94% ng mga rating ay nagbibigay ng 5 bituin.',
        },
      ],
    },
    directory: {
      title: 'Direktoryo ng Customer',
      subtitle: 'Database ng mga mamimili sa Panda, mga tala ng puna at na-unlock na voucher',
      searchPlaceholder: 'Maghanap ayon sa pangalan, telepono, o departamento...',
      colCustomer: 'Customer',
      colPhone: 'Telepono',
      colBranch: 'Sangay',
      colRating: 'Rating',
      colDepartment: 'Paboritong Departamento',
      colScore: 'Iskor',
      colDate: 'Petsa',
      colAction: 'Aksyon',
      viewProfile: 'Tingnan ang Profile',
      allBranches: 'Lahat ng Sangay',
      allLanguages: 'Lahat ng Wika',
      notRegistered: 'Hindi nakarehistro',
      defaultCustomerName: 'Mamimili ng Panda',
    },
    branches: {
      all: 'Lahat ng Sangay at Channel',
      andalus: 'Al-Andalus Branch - Jeddah',
      rawdah: 'Al-Rawdah Branch - Jeddah',
      olaya: 'Olaya Branch - Riyadh',
      online: 'Panda Click at Online Delivery',
      express: 'Panda Express (Mabilisang Serbisyo)',
    },
  },
};

export function getDashboardTexts(langCode: string): DashboardTranslations {
  return DASHBOARD_TRANSLATIONS[langCode] || DASHBOARD_TRANSLATIONS.en || DASHBOARD_TRANSLATIONS.ar;
}

export function getDirectoryTableHeaders(langCode: string) {
  const headers: Record<string, {
    col1: string; col2: string; col3: string; col4: string;
    col5: string; col6: string; col7: string; col8: string;
    viewProfile: string;
  }> = {
    ar: {
      col1: '١. العميل (اسمه)',
      col2: '٢. رقم الجوال',
      col3: '٣. القسم الذي اختاره',
      col4: '٤. المنتج / المنتجات',
      col5: '٥. هل شارك أكثر من مرة؟',
      col6: '٦. أكثر شيء اختار',
      col7: '٧. آخر زيارة (رقم وتاريخ)',
      col8: '٨. كم نقطة',
      viewProfile: 'كامل تفاصيل العميل'
    },
    en: {
      col1: '1. Customer Name',
      col2: '2. Mobile Number',
      col3: '3. Selected Department',
      col4: '4. Product(s)',
      col5: '5. Repeat Customer?',
      col6: '6. Most Chosen',
      col7: '7. Last Visit',
      col8: '8. Score',
      viewProfile: 'Full Profile'
    },
    hi: {
      col1: '1. ग्राहक का नाम',
      col2: '2. मोबाइल नंबर',
      col3: '3. चुना गया विभाग',
      col4: '4. उत्पाद',
      col5: '5. दोहराव ग्राहक?',
      col6: '6. सबसे पसंदीदा',
      col7: '7. अंतिम विज़िट',
      col8: '8. अंक',
      viewProfile: 'पूर्ण विवरण'
    },
    ur: {
      col1: '١. گاہک کا نام',
      col2: '٢. موبائل نمبر',
      col3: '٣. منتخب کردہ شعبہ',
      col4: '٤. پروڈکٹس',
      col5: '٥. کیا بار بار آیا؟',
      col6: '٦. سب سے زیادہ منتخب',
      col7: '٧. آخری دورہ',
      col8: '٨. پوائنٹس',
      viewProfile: 'مکمل پروفائل'
    },
    am: {
      col1: '1. የደንበኛ ስም',
      col2: '2. የስልክ ቁጥር',
      col3: '3. የተመረጠው ክፍል',
      col4: '4. ምርቶች',
      col5: '5. ተደጋጋሚ ደንበኛ?',
      col6: '6. በጣም የተመረጠው',
      col7: '7. የመጨረሻ ጉብኝት',
      col8: '8. ነጥቦች',
      viewProfile: 'ሙሉ መገለጫ'
    },
    fr: {
      col1: '1. Nom du client',
      col2: '2. Numéro de portable',
      col3: '3. Département choisi',
      col4: '4. Produit(s)',
      col5: '5. Client fidèle?',
      col6: '6. Plus choisi',
      col7: '7. Dernière visite',
      col8: '8. Score',
      viewProfile: 'Profil complet'
    },
    tl: {
      col1: '1. Pangalan ng Customer',
      col2: '2. Numero ng Mobile',
      col3: '3. Napiling Departamento',
      col4: '4. (Mga) Produkto',
      col5: '5. Bumabalik na Customer?',
      col6: '6. Pinaka-napili',
      col7: '7. Huling Bisita',
      col8: '8. Iskor',
      viewProfile: 'Buong Profile'
    }
  };
  return headers[langCode] || headers.en || headers.ar;
}

export function getLanguageAnalyticsTexts(langCode: string) {
  const data: Record<string, {
    title: string;
    subtitle: string;
    liveBadge: string;
    timeframeLabel: string;
    rankingHint: string;
    resetFilter: string;
    customersTitle: string;
    customersSubtitle: string;
    colName: string;
    colId: string;
    colLastVisit: string;
    colVisits: string;
    colLanguage: string;
    colStatus: string;
    statusActive: string;
    statusClosed: string;
    languagesTitle: string;
    languagesSubtitle: string;
    showTop5: string;
    viewAll: string;
    showLess: string;
    colLang: string;
    colCode: string;
    colCount: string;
    colPercent: string;
    colClassification: string;
    statusDominant: string;
    statusHigh: string;
    statusActiveLang: string;
    statusSecondary: string;
    selectedBadge: string;
    selectBtn: string;
  }> = {
    ar: {
      title: 'ترتيب أكثر اللغات اختياراً وقائمة العملاء الأكثر استخداماً',
      subtitle: 'إحصائيات وأرقام تساعدك على فهم سلوك العملاء وتحسين تجربة المستخدم',
      liveBadge: 'جميع البيانات محدثة بشكل لحظي',
      timeframeLabel: 'فترة التقرير والتفاعل:',
      rankingHint: 'نسبة ترتيب اللغات حسب نسبة الإكمال واختبار وتفاعل العملاء',
      resetFilter: 'إعادة ضبط فلتر اللغة',
      customersTitle: 'سجل العملاء الأكثر استخداماً',
      customersSubtitle: 'مرتب بحسب تكرار الزيارات',
      colName: 'اسم العميل',
      colId: 'رقم العميل',
      colLastVisit: 'تاريخ آخر زيارة',
      colVisits: 'الزيارات',
      colLanguage: 'اللغة',
      colStatus: 'الحالة',
      statusActive: 'نشط',
      statusClosed: 'مغلق',
      languagesTitle: 'أكثر اللغات اختياراً',
      languagesSubtitle: 'جدول إحصائي عريض وشامل بجميع الأعمدة والنسب',
      showTop5: 'عرض أهم 5',
      viewAll: 'عرض الكل (7)',
      showLess: 'عرض أقل',
      colLang: 'اللغة المختارة',
      colCode: 'رمز اللغة',
      colCount: 'عدد مرات الاختيار',
      colPercent: 'النسبة المئوية والمشاركة',
      colClassification: 'التصنيف',
      statusDominant: 'الأكثر طلباً',
      statusHigh: 'مرتفع',
      statusActiveLang: 'نشطة',
      statusSecondary: 'ثانوية',
      selectedBadge: 'محدد ✓',
      selectBtn: 'عرض'
    },
    en: {
      title: 'Language Popularity Ranking & Top Customers',
      subtitle: 'Analytics and insights to understand customer behavior and enhance user experience',
      liveBadge: 'Live updated data',
      timeframeLabel: 'Timeframe Period:',
      rankingHint: 'Ranked by completion rate and customer engagement',
      resetFilter: 'Reset language filter',
      customersTitle: 'Top Active Customers Register',
      customersSubtitle: 'Sorted by visit frequency',
      colName: 'Customer Name',
      colId: 'Customer ID',
      colLastVisit: 'Last Visit',
      colVisits: 'Visits',
      colLanguage: 'Language',
      colStatus: 'Status',
      statusActive: 'Active',
      statusClosed: 'Closed',
      languagesTitle: 'Most Selected Languages',
      languagesSubtitle: 'Full comprehensive breakdown with percentages & counts',
      showTop5: 'Show Top 5',
      viewAll: 'View All (7)',
      showLess: 'Show Less',
      colLang: 'Language',
      colCode: 'Code',
      colCount: 'Selections Count',
      colPercent: 'Percentage & Share',
      colClassification: 'Status',
      statusDominant: 'Dominant',
      statusHigh: 'High',
      statusActiveLang: 'Active',
      statusSecondary: 'Secondary',
      selectedBadge: 'Selected ✓',
      selectBtn: 'Select'
    },
    hi: {
      title: 'भाषा लोकप्रियता रैंकिंग और शीर्ष सक्रिय ग्राहक',
      subtitle: 'ग्राहकों के व्यवहार को समझने और अनुभव बेहतर बनाने के आंकड़े',
      liveBadge: 'लाइव अपडेटेड डेटा',
      timeframeLabel: 'समय अवधि:',
      rankingHint: 'पूर्णता दर और ग्राहक जुड़ाव के आधार पर रैंकिंग',
      resetFilter: 'भाषा फ़िल्टर रीसेट करें',
      customersTitle: 'शीर्ष सक्रिय ग्राहक रजिस्टर',
      customersSubtitle: 'विज़िट आवृत्ति के अनुसार क्रमबद्ध',
      colName: 'ग्राहक का नाम',
      colId: 'ग्राहक आईडी',
      colLastVisit: 'अंतिम विज़िट',
      colVisits: 'विज़िट्स',
      colLanguage: 'भाषा',
      colStatus: 'स्थिति',
      statusActive: 'सक्रिय',
      statusClosed: 'बंद',
      languagesTitle: 'सर्वाधिक चुनी गई भाषाएँ',
      languagesSubtitle: 'प्रतिशत और गणना के साथ व्यापक विश्लेषण',
      showTop5: 'शीर्ष 5 दिखाएं',
      viewAll: 'सभी 7 देखें',
      showLess: 'कम दिखाएं',
      colLang: 'भाषा',
      colCode: 'कोड',
      colCount: 'चयन संख्या',
      colPercent: 'प्रतिशत और हिस्सा',
      colClassification: 'स्थिति',
      statusDominant: 'प्रमुख',
      statusHigh: 'उच्च',
      statusActiveLang: 'सक्रिय',
      statusSecondary: 'द्वितीयक',
      selectedBadge: 'चयनित ✓',
      selectBtn: 'देखें'
    },
    ur: {
      title: 'زبان کی مقبولیت کی درجہ بندی اور سرکردہ صارفین',
      subtitle: 'صارفین کے رجحان کو سمجھنے اور تجربہ بہتر بنانے کے شماریات',
      liveBadge: 'براہ راست اپ ڈیٹ شدہ ڈیٹا',
      timeframeLabel: 'رپورٹ کا دورانیہ:',
      rankingHint: 'تکمیل کی شرح اور گاہکوں کی شمولیت کے لحاظ سے درجہ بندی',
      resetFilter: 'زبان کا فلٹر ری سیٹ کریں',
      customersTitle: 'سب سے زیادہ فعال صارفین کا ریکارڈ',
      customersSubtitle: 'دوروں کے تناسب سے ترتیب دیا گیا',
      colName: 'صارف کا نام',
      colId: 'صارف کا آئی ڈی',
      colLastVisit: 'آخری وزٹ',
      colVisits: 'وزٹ',
      colLanguage: 'زبان',
      colStatus: 'حالت',
      statusActive: 'فعال',
      statusClosed: 'بند',
      languagesTitle: 'سب سے زیادہ منتخب کردہ زبانیں',
      languagesSubtitle: 'فیصد اور تعداد کے ساتھ جامع شماریاتی جدول',
      showTop5: 'اہم 5 دکھائیں',
      viewAll: 'تمام 7 دیکھیں',
      showLess: 'کم دکھائیں',
      colLang: 'منتخب زبان',
      colCode: 'کوڈ',
      colCount: 'انتخاب کی تعداد',
      colPercent: 'فیصد اور حصہ',
      colClassification: 'درجہ بندی',
      statusDominant: 'سب سے زیادہ مقبول',
      statusHigh: 'زیادہ',
      statusActiveLang: 'فعال',
      statusSecondary: 'ثانوی',
      selectedBadge: 'منتخب شدہ ✓',
      selectBtn: 'دیکھیں'
    },
    am: {
      title: 'የቋንቋ ተወዳጅነት ደረጃ እና ከፍተኛ ደንበኞች',
      subtitle: 'የደንበኞችን ባህሪ ለመረዳት እና የተጠቃሚ ተሞክሮን ለማሻሻል ስታቲስቲክስ',
      liveBadge: 'በቀጥታ የዘመነ መረጃ',
      timeframeLabel: 'የጊዜ ገደብ:',
      rankingHint: 'በማጠናቀቂያ መጠን እና በደንበኛ ተሳትፎ ደረጃ የተሰጠው',
      resetFilter: 'የቋንቋ ማጣሪያን ዳግም አስጀምር',
      customersTitle: 'ከፍተኛ ንቁ ደንበኞች መዝገብ',
      customersSubtitle: 'በጉብኝት ድግግሞሽ የተደረደረ',
      colName: 'የደንበኛ ስም',
      colId: 'የደንበኛ መታወቂያ',
      colLastVisit: 'የመጨረሻ ጉብኝት',
      colVisits: 'ጉብኝቶች',
      colLanguage: 'ቋንቋ',
      colStatus: 'ሁኔታ',
      statusActive: 'ንቁ',
      statusClosed: 'የተዘጋ',
      languagesTitle: 'በጣም የተመረጡ ቋንቋዎች',
      languagesSubtitle: 'ሙሉ አጠቃላይ ዝርዝር በመቶኛ እና በቁጥር',
      showTop5: 'ከፍተኛ 5 አሳይ',
      viewAll: 'ሁሉንም 7 አሳይ',
      showLess: 'በትንሹ አሳይ',
      colLang: 'ቋንቋ',
      colCode: 'ኮድ',
      colCount: 'የምርጫ ብዛት',
      colPercent: 'መቶኛ እና ድርሻ',
      colClassification: 'ደረጃ',
      statusDominant: 'ዋነኛ',
      statusHigh: 'ከፍተኛ',
      statusActiveLang: 'ንቁ',
      statusSecondary: 'ሁለተኛ ደረጃ',
      selectedBadge: 'ተመርጧል ✓',
      selectBtn: 'ይምረጡ'
    },
    fr: {
      title: 'Popularité des langues et meilleurs clients',
      subtitle: 'Statistiques pour comprendre le comportement des clients et améliorer leur expérience',
      liveBadge: 'Données en direct',
      timeframeLabel: 'Période du rapport :',
      rankingHint: 'Classé par taux d\'achèvement et engagement client',
      resetFilter: 'Réinitialiser le filtre de langue',
      customersTitle: 'Registre des clients les plus actifs',
      customersSubtitle: 'Trié par fréquence de visite',
      colName: 'Nom du client',
      colId: 'ID client',
      colLastVisit: 'Dernière visite',
      colVisits: 'Visites',
      colLanguage: 'Langue',
      colStatus: 'Statut',
      statusActive: 'Actif',
      statusClosed: 'Fermé',
      languagesTitle: 'Langues les plus sélectionnées',
      languagesSubtitle: 'Répartition complète avec pourcentages et totaux',
      showTop5: 'Top 5',
      viewAll: 'Voir tout (7)',
      showLess: 'Voir moins',
      colLang: 'Langue',
      colCode: 'Code',
      colCount: 'Nombre de sélections',
      colPercent: 'Pourcentage et part',
      colClassification: 'Statut',
      statusDominant: 'Dominante',
      statusHigh: 'Élevée',
      statusActiveLang: 'Active',
      statusSecondary: 'Secondaire',
      selectedBadge: 'Sélectionné ✓',
      selectBtn: 'Afficher'
    },
    tl: {
      title: 'Ranggo ng Popularidad ng Wika at Nangungunang Customer',
      subtitle: 'Mga estadistika upang maunawaan ang gawi ng customer at mapabuti ang karanasan',
      liveBadge: 'Live na na-update na data',
      timeframeLabel: 'Panahon ng Ulat:',
      rankingHint: 'Niraranggo ayon sa rate ng pagkumpleto at pakikipag-ugnayan ng customer',
      resetFilter: 'I-reset ang filter ng wika',
      customersTitle: 'Talaan ng Nangungunang Aktibong Customer',
      customersSubtitle: 'Nakaayos ayon sa dalas ng pagbisita',
      colName: 'Pangalan ng Customer',
      colId: 'Customer ID',
      colLastVisit: 'Huling Bisita',
      colVisits: 'Mga Bisita',
      colLanguage: 'Wika',
      colStatus: 'Katayuan',
      statusActive: 'Aktibo',
      statusClosed: 'Sarado',
      languagesTitle: 'Pinaka-napiling mga Wika',
      languagesSubtitle: 'Buong komprehensibong breakdown na may mga porsyento at bilang',
      showTop5: 'Ipakita ang Nangungunang 5',
      viewAll: 'Tingnan Lahat (7)',
      showLess: 'Ipakita nang Mas Kaunti',
      colLang: 'Wika',
      colCode: 'Kodigo',
      colCount: 'Bilang ng Pagpili',
      colPercent: 'Porsyento at Bahagi',
      colClassification: 'Katayuan',
      statusDominant: 'Pangunahin',
      statusHigh: 'Mataas',
      statusActiveLang: 'Aktibo',
      statusSecondary: 'Pangalawa',
      selectedBadge: 'Napili ✓',
      selectBtn: 'Piliin'
    }
  };
  return data[langCode] || data.en || data.ar;
}

