import { CustomerJourneyConfig, DepartmentConfig, SurveyQuestionsConfig, SurveyQuestionItem } from '../types';

export const SUPERMARKET_SURVEY_QUESTIONS: SurveyQuestionsConfig = {
  cleanliness: {
    titleAr: 'ما رأيك في نظافة وترتيب الممرات والأرفف؟',
    titleEn: 'How clean and organized were the aisles and shelves?',
    isEnabled: true,
  },
  staff: {
    titleAr: 'كيف تقيّم سرعة الكاشير وتعامل موظفي الفروع؟',
    titleEn: 'How do you rate cashier speed and branch staff service?',
    isEnabled: true,
  },
  overall: {
    titleAr: 'التقييم العام لتجربة التسوق في أسواق بنده',
    titleEn: 'Overall supermarket shopping experience rating',
    isEnabled: true,
  },
};

export const CAFE_SURVEY_QUESTIONS: SurveyQuestionsConfig = {
  cleanliness: {
    titleAr: 'ما رأيك في نظافة وهدوء الجلسات وأجواء الكافيه؟',
    titleEn: 'How do you rate the seating cleanliness, quiet ambiance, and decor?',
    isEnabled: true,
  },
  staff: {
    titleAr: 'كيف تقيّم سرعة تحضير الطلب واحترافية وبشاشة الباريستا؟',
    titleEn: 'How do you rate order preparation speed and barista hospitality?',
    isEnabled: true,
  },
  overall: {
    titleAr: 'التقييم العام لتجربة الكافيه وجودة القهوة',
    titleEn: 'Overall cafe visit rating and coffee quality',
    isEnabled: true,
  },
};

export const RESTAURANT_SURVEY_QUESTIONS: SurveyQuestionsConfig = {
  cleanliness: {
    titleAr: 'ما رأيك في نظافة الصالة وترتيب الطاولات وأدوات المائدة؟',
    titleEn: 'How do you rate dining hall cleanliness, table setup, and cutlery?',
    isEnabled: true,
  },
  staff: {
    titleAr: 'كيف تقيّم سرعة تقديم الطعام ولطافة وحسن ضيافة طاقم الخدمة؟',
    titleEn: 'How do you rate food serving speed and waitstaff hospitality?',
    isEnabled: true,
  },
  overall: {
    titleAr: 'التقييم العام لتجربة تناول الطعام في المطعم ومذاق الأطباق',
    titleEn: 'Overall restaurant dining and hospitality experience rating',
    isEnabled: true,
  },
};

// 🎯 بنك كروت الاستبيان الدقيقة (مطابقة لصور العميل 5 و 6 و 7)
export const CAFE_QUESTION_ITEMS: SurveyQuestionItem[] = [
  {
    id: 'cafe_cleanliness',
    titleAr: 'نظافة وترتيب جلسات وطاولات الكافيه',
    titleEn: 'Cafe tables and seating cleanliness',
    icon: '🛋️',
    isEnabled: true,
    category: 'cleanliness',
    options: [
      { id: 'c1', number: 1, icon: '✨', title: 'نظافة فائقة وطاولات ممسوحة', titleEn: 'Spotless & sanitized tables', grade: 'great' },
      { id: 'c2', number: 2, icon: '👍', title: 'مكان نظيف ومرتب', titleEn: 'Clean and tidy space', grade: 'good' },
      { id: 'c3', number: 3, icon: '🧹', title: 'تحتاج مسح طاولات أسرع', titleEn: 'Needs faster table wiping', grade: 'normal' },
      { id: 'c4', number: 4, icon: '⚠️', title: 'غير نظيفة وتحتاج عناية', titleEn: 'Not clean, needs attention', grade: 'bad' },
    ]
  },
  {
    id: 'cafe_staff',
    titleAr: 'سرعة تحضير وبشاشة باريستا الكافيه',
    titleEn: 'Barista speed and hospitality',
    icon: '⚡',
    isEnabled: true,
    category: 'staff',
    options: [
      { id: 's1', number: 1, icon: '⚡', title: 'استخلاص متقن وسرعة مذهلة', titleEn: 'Master extraction & fast speed', grade: 'great' },
      { id: 's2', number: 2, icon: '😊', title: 'باريستا بشوش وخبير وودود', titleEn: 'Cheerful and welcoming barista', grade: 'good' },
      { id: 's3', number: 3, icon: '⏱️', title: 'تحضير جيد ووقت معتاد', titleEn: 'Good prep & standard time', grade: 'normal' },
      { id: 's4', number: 4, icon: '⚠️', title: 'تأخر في استلام الطلب', titleEn: 'Delay in receiving order', grade: 'bad' },
    ]
  },
  {
    id: 'cafe_ambiance',
    titleAr: 'الجلسات والراحة والموسيقى والإنترنت',
    titleEn: 'Seating comfort, music and Wi-Fi',
    icon: '🎵',
    isEnabled: true,
    category: 'ambiance',
    options: [
      { id: 'a1', number: 1, icon: '🎵', title: 'موسيقى هادئة وجو ملهم', titleEn: 'Soothing music & inspiring vibe', grade: 'great' },
      { id: 'a2', number: 2, icon: '🛋️', title: 'جلسات مريحة وتكييف منعش', titleEn: 'Cozy seating & crisp AC', grade: 'good' },
      { id: 'a3', number: 3, icon: '✨', title: 'ديكور عصري وإضاءة مريحة', titleEn: 'Modern decor & soft lighting', grade: 'good' },
      { id: 'a4', number: 4, icon: '💻', title: 'إنترنت سريع وأفياش متوفرة', titleEn: 'High-speed Wi-Fi & power outlets', grade: 'great' },
    ]
  }
];

export const RESTAURANT_QUESTION_ITEMS: SurveyQuestionItem[] = [
  {
    id: 'rest_cleanliness',
    titleAr: 'نظافة الصالة وترتيب الطاولات وأدوات المائدة',
    titleEn: 'Dining room and table setting cleanliness',
    icon: '🧼',
    isEnabled: true,
    category: 'cleanliness',
    options: [
      { id: 'rc1', number: 1, icon: '✨', title: 'نظافة فائقة وطاولات مجهزة بامتياز', titleEn: 'Spotless setup and cutlery', grade: 'great' },
      { id: 'rc2', number: 2, icon: '👍', title: 'طاولات نظيفة وصالة مرتبة', titleEn: 'Clean tables & neat dining room', grade: 'good' },
      { id: 'rc3', number: 3, icon: '🧹', title: 'تحتاج تجهيز طاولات أسرع', titleEn: 'Needs quicker table preparation', grade: 'normal' },
      { id: 'rc4', number: 4, icon: '⚠️', title: 'غير نظيفة وتحتاج عناية', titleEn: 'Needs immediate cleaning care', grade: 'bad' },
    ]
  },
  {
    id: 'rest_staff',
    titleAr: 'لباقة وحسن ضيافة طاقم الخدمة والويتر',
    titleEn: 'Waitstaff service and hospitality',
    icon: '🧑‍🍳',
    isEnabled: true,
    category: 'staff',
    options: [
      { id: 'rs1', number: 1, icon: '⚡', title: 'ترحيب ملكي وسرعة تقديم رائعة', titleEn: 'Royal welcome & quick serving', grade: 'great' },
      { id: 'rs2', number: 2, icon: '😊', title: 'طاقم بشوش ولبق في التعامل', titleEn: 'Polite, smiling and helpful team', grade: 'good' },
      { id: 'rs3', number: 3, icon: '⏱️', title: 'خدمة جيدة ووقت تقديم معتاد', titleEn: 'Standard prompt service', grade: 'normal' },
      { id: 'rs4', number: 4, icon: '⚠️', title: 'تأخر في نزول الطلبات', titleEn: 'Noticeable delay in dishes', grade: 'bad' },
    ]
  },
  {
    id: 'rest_taste',
    titleAr: 'مذاق وحرارة الأطباق الرئيسية والمقبلات',
    titleEn: 'Food taste and dish temperature',
    icon: '🍽️',
    isEnabled: true,
    category: 'taste',
    options: [
      { id: 'rt1', number: 1, icon: '😋', title: 'أطباق ساخنة ومذاق استثنائي', titleEn: 'Hot dishes & exceptional flavor', grade: 'great' },
      { id: 'rt2', number: 2, icon: '🍲', title: 'طعم لذيذ ومكونات طازجة', titleEn: 'Delicious taste & fresh ingredients', grade: 'good' },
      { id: 'rt3', number: 3, icon: '🥣', title: 'مذاق جيد يحتاج لمسة تميز', titleEn: 'Good, but needs a special touch', grade: 'normal' },
      { id: 'rt4', number: 4, icon: '⚠️', title: 'دون المتوقع وتتطلب تحسين', titleEn: 'Below expectations', grade: 'bad' },
    ]
  }
];

export const SUPERMARKET_QUESTION_ITEMS: SurveyQuestionItem[] = [
  {
    id: 'super_cleanliness',
    titleAr: 'نظافة وترتيب الممرات وأرفف البضائع',
    titleEn: 'Aisles and product shelves cleanliness',
    icon: '🧹',
    isEnabled: true,
    category: 'cleanliness',
    options: [
      { id: 'sc1', number: 1, icon: '✨', title: 'ممرات واسعة ونظافة تامة', titleEn: 'Wide, spotless aisles', grade: 'great' },
      { id: 'sc2', number: 2, icon: '👍', title: 'أرفف مرتبة ونظيفة', titleEn: 'Well-organized, clean shelves', grade: 'good' },
      { id: 'sc3', number: 3, icon: '🧹', title: 'تحتاج ترتيب ممرات أسرع', titleEn: 'Requires faster aisle tidying', grade: 'normal' },
      { id: 'sc4', number: 4, icon: '⚠️', title: 'تحتاج عناية وتنظيف', titleEn: 'Needs cleaning care', grade: 'bad' },
    ]
  },
  {
    id: 'super_staff',
    titleAr: 'سرعة الكاشير وتعامل موظفي الفروع',
    titleEn: 'Cashier checkout speed & staff helpfulness',
    icon: '👨‍💼',
    isEnabled: true,
    category: 'staff',
    options: [
      { id: 'ss1', number: 1, icon: '⚡', title: 'كاشير سريع وتعامل راقي', titleEn: 'Quick checkout & polite service', grade: 'great' },
      { id: 'ss2', number: 2, icon: '😊', title: 'موظفون متعاونون وبشوشون', titleEn: 'Helpful & cheerful floor staff', grade: 'good' },
      { id: 'ss3', number: 3, icon: '⏱️', title: 'وقت انتظار معتاد', titleEn: 'Normal wait time', grade: 'normal' },
      { id: 'ss4', number: 4, icon: '⚠️', title: 'ازدحام وتأخر في المحاسبة', titleEn: 'Long queue delay at cashier', grade: 'bad' },
    ]
  },
  {
    id: 'super_products',
    titleAr: 'وفرة الأصناف وتنوع العروض والأسعار',
    titleEn: 'Product availability and promotions variety',
    icon: '🛒',
    isEnabled: true,
    category: 'products',
    options: [
      { id: 'sp1', number: 1, icon: '🛍️', title: 'كل الأصناف متوفرة وعروض قوية', titleEn: 'All items in stock & great deals', grade: 'great' },
      { id: 'sp2', number: 2, icon: '🏷️', title: 'تنوع ممتاز للأقسام والأسعار', titleEn: 'Excellent section variety', grade: 'good' },
      { id: 'sp3', number: 3, icon: '🔍', title: 'بعض الأصناف غير متوفرة', titleEn: 'Some items out of stock', grade: 'normal' },
      { id: 'sp4', number: 4, icon: '⚠️', title: 'نقص في العروض المطلوبة', titleEn: 'Lacking requested promotions', grade: 'bad' },
    ]
  }
];

// 📦 بنك الأسئلة الاحتياطية المتاحة للتبديل والإضافة ("حطها احتياط ممكن اختار ابدل كروت")
export const SPARE_SURVEY_QUESTION_BANK: SurveyQuestionItem[] = [
  {
    id: 'spare_ambiance',
    titleAr: 'الراحة والديكور والإضاءة والموسيقى',
    titleEn: 'Atmosphere, decor, lighting and music',
    icon: '🎵',
    isEnabled: false,
    category: 'ambiance',
    options: [
      { id: 'spa1', number: 1, icon: '🎵', title: 'موسيقى هادئة وجو ملهم', titleEn: 'Relaxing music & inspiring vibe', grade: 'great' },
      { id: 'spa2', number: 2, icon: '🛋️', title: 'جلسات مريحة وتكييف منعش', titleEn: 'Comfortable seating & fresh AC', grade: 'good' },
      { id: 'spa3', number: 3, icon: '✨', title: 'ديكور عصري وإضاءة مريحة', titleEn: 'Contemporary aesthetic & lighting', grade: 'good' },
      { id: 'spa4', number: 4, icon: '💻', title: 'إنترنت سريع وأفياش متوفرة', titleEn: 'Fast Wi-Fi & available outlets', grade: 'great' },
    ]
  },
  {
    id: 'spare_pricing',
    titleAr: 'الأسعار والقيمة والعروض الترويجية',
    titleEn: 'Pricing, value and promotional deals',
    icon: '🏷️',
    isEnabled: false,
    category: 'pricing',
    options: [
      { id: 'spp1', number: 1, icon: '🏷️', title: 'عروض مذهلة وقيمة استثنائية', titleEn: 'Amazing offers & supreme value', grade: 'great' },
      { id: 'spp2', number: 2, icon: '💵', title: 'أسعار مناسبة ومعقولة جداً', titleEn: 'Fair and affordable pricing', grade: 'good' },
      { id: 'spp3', number: 3, icon: '📈', title: 'الأسعار مرتفعة قليلاً', titleEn: 'Slightly high prices', grade: 'normal' },
      { id: 'spp4', number: 4, icon: '❌', title: 'عروض غير كافية وأسعار غالية', titleEn: 'Overpriced, insufficient offers', grade: 'bad' },
    ]
  },
  {
    id: 'spare_accessibility',
    titleAr: 'سهولة الوصول والمواقف والموقع',
    titleEn: 'Accessibility, parking and location ease',
    icon: '🚗',
    isEnabled: false,
    category: 'accessibility',
    options: [
      { id: 'sac1', number: 1, icon: '🚗', title: 'مواقف متوفرة وسهولة وصول فائقة', titleEn: 'Ample parking & effortless access', grade: 'great' },
      { id: 'sac2', number: 2, icon: '📍', title: 'موقع مميز ومريح', titleEn: 'Great, convenient location', grade: 'good' },
      { id: 'sac3', number: 3, icon: '⏳', title: 'صعوبة بسيطة في إيجاد موقف', titleEn: 'Minor parking congestion', grade: 'normal' },
      { id: 'sac4', number: 4, icon: '🚫', title: 'ازدحام شديد وصعوبة في الوصول', titleEn: 'Heavy traffic & hard to reach', grade: 'bad' },
    ]
  },
  {
    id: 'spare_products',
    titleAr: 'طزاجة المكونات وجودة التحضير',
    titleEn: 'Ingredient freshness and preparation quality',
    icon: '🥗',
    isEnabled: false,
    category: 'taste',
    options: [
      { id: 'spr1', number: 1, icon: '🌟', title: 'مكونات طازجة 100% وفاخرة', titleEn: '100% fresh, top-tier ingredients', grade: 'great' },
      { id: 'spr2', number: 2, icon: '👌', title: 'جودة ممتازة وتحضير نظيف', titleEn: 'Great quality & hygienic prep', grade: 'good' },
      { id: 'spr3', number: 3, icon: '🥣', title: 'طزاجة مقبولة تحتاج تدقيق', titleEn: 'Acceptable freshness', grade: 'normal' },
      { id: 'spr4', number: 4, icon: '⚠️', title: 'المكونات غير طازجة بالشكل الكافي', titleEn: 'Not fresh enough', grade: 'bad' },
    ]
  }
];

export const SUPERMARKET_DEPARTMENTS: DepartmentConfig[] = [
  {
    id: 'veg',
    name: 'خضار وفواكه',
    nameEn: 'Fruits & Vegetables',
    icon: '🥦',
    products: [
      { id: 'v1', name: 'طماطم محلي طازج', nameEn: 'Fresh Local Tomatoes', icon: '🍅', imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'v2', name: 'خيار طازج', nameEn: 'Fresh Cucumbers', icon: '🥒', imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'v3', name: 'بصل أحمر بلدي', nameEn: 'Red Onions', icon: '🧅', imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'v4', name: 'بطاطس كيس فاخر', nameEn: 'Premium Potato Bag', icon: '🥔', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'Soon', order: 3, isVisible: true },
    ]
  },
  {
    id: 'food',
    name: 'مواد غذائية وتموين',
    nameEn: 'Groceries & Staples',
    icon: '🍚',
    products: [
      { id: 'f1', name: 'أرز بسمتي فاخر', nameEn: 'Basmati Rice', icon: '🍚', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'f2', name: 'زيت دوار الشمس', nameEn: 'Sunflower Oil', icon: '🌻', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'f3', name: 'مكرونة إيطالية', nameEn: 'Italian Pasta', icon: '🍝', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d62816e8?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'f4', name: 'دجاج مبرد طازج', nameEn: 'Chilled Chicken', icon: '🍗', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'عروض حصرية', order: 3, isVisible: true },
    ]
  },
  {
    id: 'cheese',
    name: 'الأجبان والألبان',
    nameEn: 'Dairy & Cheese',
    icon: '🧀',
    products: [
      { id: 'c1', name: 'حليب طازج كامل الدسم', nameEn: 'Fresh Whole Milk', icon: '🥛', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'c2', name: 'أجبان بيضاء فاخرة', nameEn: 'White Cheese', icon: '🧀', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'c3', name: 'زبادي يوناني طبيعي', nameEn: 'Greek Yogurt', icon: '🍶', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'c4', name: 'لبنة تركية طازجة', nameEn: 'Turkish Labneh', icon: '🥣', imageUrl: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'Soon', order: 3, isVisible: true },
    ]
  },
  {
    id: 'clean',
    name: 'أدوات نظافة وعناية',
    nameEn: 'Cleaning & Home Care',
    icon: '🧼',
    products: [
      { id: 'cl1', name: 'منظف أواني مركز', nameEn: 'Dishwashing Liquid', icon: '🧼', imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'cl2', name: 'مناديل ورقية فائقة النعومة', nameEn: 'Facial Tissues', icon: '🧻', imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'cl3', name: 'مطهر ومعقم أرضيات', nameEn: 'Floor Cleaner', icon: '🧴', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'cl4', name: 'صابون يدين رغوي', nameEn: 'Foaming Hand Soap', icon: '🧼', imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'الأعلى تقييماً', order: 3, isVisible: true },
    ]
  }
];

export const CAFE_DEPARTMENTS: DepartmentConfig[] = [
  {
    id: 'hot_drinks',
    name: 'مشروبات ساخنة',
    nameEn: 'Hot Drinks',
    icon: '☕',
    products: [
      { id: 'hd1', name: 'قهوة مختصة V60', nameEn: 'Specialty V60 Coffee', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'hd2', name: 'فلات وايت كريمي', nameEn: 'Creamy Flat White', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'hd3', name: 'كابتشينو إيطالي', nameEn: 'Italian Cappuccino', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'hd4', name: 'شاي كرك بالزعفران', nameEn: 'Saffron Karak Tea', icon: '🫖', imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'الأكثر طلباً', order: 3, isVisible: true },
    ]
  },
  {
    id: 'cold_drinks',
    name: 'مشروبات باردة',
    nameEn: 'Cold Drinks',
    icon: '🥤',
    products: [
      { id: 'cd1', name: 'آيس سبانش لاتيه', nameEn: 'Iced Spanish Latte', icon: '🧊', imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'cd2', name: 'موهيتو توت منعش', nameEn: 'Fresh Berry Mojito', icon: '🍹', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'cd3', name: 'آيس ماتشا لاتيه', nameEn: 'Iced Matcha Latte', icon: '🍵', imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'cd4', name: 'عصير برتقال طبيعي', nameEn: 'Fresh Orange Juice', icon: '🍊', imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'طازج 100%', order: 3, isVisible: true },
    ]
  },
  {
    id: 'cafe_sweets',
    name: 'حلى ومخبوزات',
    nameEn: 'Desserts & Bakery',
    icon: '🍰',
    products: [
      { id: 's1', name: 'فرنش توست كراميل', nameEn: 'Caramel French Toast', icon: '🥞', imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 's2', name: 'تشيز كيك نيويورك', nameEn: 'NY Cheesecake', icon: '🍰', imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 's3', name: 'كرواسون زبدة فرنسي', nameEn: 'Butter Croissant', icon: '🥐', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 's4', name: 'كوكيز شوكولاتة دافئ', nameEn: 'Warm Choco Cookie', icon: '🍪', imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'Soon', order: 3, isVisible: true },
    ]
  },
  {
    id: 'specialty_beans',
    name: 'بن ومحاصيل مختصة',
    nameEn: 'Specialty Beans',
    icon: '🫘',
    products: [
      { id: 'sb1', name: 'محصول إثيوبي مجفف', nameEn: 'Ethiopian Natural Beans', icon: '🫘', imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'sb2', name: 'محصول كولومبي مغسول', nameEn: 'Colombian Washed Beans', icon: '🫘', imageUrl: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'sb3', name: 'بلند إسبريسو مميز', nameEn: 'Signature Espresso Blend', icon: '🫘', imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'sb4', name: 'أظرف قهوة سريعة التحضير', nameEn: 'Drip Bag Coffee Pouches', icon: '☕', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'جديد', order: 3, isVisible: true },
    ]
  }
];

export const RESTAURANT_DEPARTMENTS: DepartmentConfig[] = [
  {
    id: 'main_courses',
    name: 'وجبات وأطباق رئيسية',
    nameEn: 'Main Courses',
    icon: '🥩',
    products: [
      { id: 'm1', name: 'برجر أنجوس كلاسيك', nameEn: 'Classic Angus Burger', icon: '🍔', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'm2', name: 'ستيك ريب آي بريميوم', nameEn: 'Premium Ribeye Steak', icon: '🥩', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'm3', name: 'باستا تروفل كريمية', nameEn: 'Creamy Truffle Pasta', icon: '🍝', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d62816e8?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'm4', name: 'دجاج مشوي بالأعشاب', nameEn: 'Herb Roasted Chicken', icon: '🍗', imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'طبق الشيف', order: 3, isVisible: true },
    ]
  },
  {
    id: 'appetizers',
    name: 'مقبلات وشوربات',
    nameEn: 'Appetizers & Soups',
    icon: '🥗',
    products: [
      { id: 'ap1', name: 'سلطة سيزر بالدجاج', nameEn: 'Chicken Caesar Salad', icon: '🥗', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'ap2', name: 'شوربة كريمة الفطر', nameEn: 'Cream of Mushroom Soup', icon: '🥣', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'ap3', name: 'بطاطس مقرمشة مبهرة', nameEn: 'Seasoned Crispy Fries', icon: '🍟', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'ap4', name: 'أجنحة دجاج بوفالو المقرمشة', nameEn: 'Crispy Buffalo Wings', icon: '🍗', imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'مقرمش حار', order: 3, isVisible: true },
    ]
  },
  {
    id: 'beverages',
    name: 'عصائر ومشروبات',
    nameEn: 'Beverages & Drinks',
    icon: '🍹',
    products: [
      { id: 'bv1', name: 'عصير ليمون بالنعناع', nameEn: 'Fresh Mint Lemonade', icon: '🍋', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'bv2', name: 'موهيتو فراولة مثلج', nameEn: 'Iced Strawberry Mojito', icon: '🍓', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'bv3', name: 'سموذي مانجو استوائي', nameEn: 'Tropical Mango Smoothie', icon: '🥭', imageUrl: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'bv4', name: 'مشروب غازي مثلج بالليمون', nameEn: 'Iced Lemon Soda', icon: '🥤', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'منعش', order: 3, isVisible: true },
    ]
  },
  {
    id: 'restaurant_sweets',
    name: 'حلويات فاخرة',
    nameEn: 'Fine Desserts',
    icon: '🍮',
    products: [
      { id: 'rs1', name: 'كيك الشوكولاتة الذائب فوندان', nameEn: 'Molten Chocolate Fondant', icon: '🍫', imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=85', cardType: 'tall', order: 0, isVisible: true },
      { id: 'rs2', name: 'كريم بروليه فانيلا', nameEn: 'Vanilla Creme Brulee', icon: '🍮', imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 1, isVisible: true },
      { id: 'rs3', name: 'تشيز كيك توت بري نيويورك', nameEn: 'Berry Cheesecake', icon: '🍰', imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=85', cardType: 'standard', order: 2, isVisible: true },
      { id: 'rs4', name: 'أم علي ملكية بالمكسرات', nameEn: 'Royal Umm Ali with Nuts', icon: '🥣', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=85', cardType: 'wide', badge: 'فاخر', order: 3, isVisible: true },
    ]
  }
];

export const CAFE_RESTAURANT_DEPARTMENTS: DepartmentConfig[] = CAFE_DEPARTMENTS;

export const DEFAULT_JOURNEY_CONFIG: CustomerJourneyConfig = {
  // Business Project Type
  businessType: 'supermarket',

  // Customer selects business type (Supermarket, Cafe, Restaurant) after language selection
  customerSelectsBusinessAfterLanguage: true,

  // Layout choice for products: 'bento' (Image 1) or 'grid_2x2' (Image 2)
  productsLayout: 'bento',

  // 0. Language Selection Step (شاشة اختيار اللغة)
  languageSelectTitleAr: 'اختر لغتك المفضلة',
  languageSelectTitleEn: 'Choose Your Preferred Language',
  languageSelectSubtitleAr: 'لتجربة تسوق ذكية وممتعة مخصصة لك',
  languageSelectSubtitleEn: 'For a personalized and smart shopping experience',
  languageSelectBadgeAr: 'مرحباً بك في أسواق بنده',
  languageSelectBadgeEn: 'Welcome to Panda Stores',

  // 1. Welcome Step
  welcomeBadgeAr: 'تحدي تفاعلي سريع',
  welcomeTitleAr: 'تجربة تسوق ذكية وممتعة',
  welcomeSubtitleAr: 'اختر لغتك المفضلة للمتابعة',
  startButtonTextAr: 'تأكيد ومتابعة',

  // 2. Connected Step
  connectedTitleAr: 'تم الربط بنجاح!',
  connectedSubtitleAr: 'استعد لتجربة تسوق ذكية وعروض حصرية مصممة لك',
  connectedButtonTextAr: 'متابعة التجربة',
  connectedNoticeAr: 'تم الربط! جاري المتابعة تلقائياً...',

  // 3. Preference Step
  preferenceQuestionTitle: 'ماذا تفضل؟',
  preferenceQuestionSubtitle: 'اختر مكافأتك المفضلة لتخصيص عروضك القادمة',
  preferenceButtonText: 'تأكيد ومتابعة',
  preferenceNoticeAr: '✓ تم اختيار مكافأتك! جاري المتابعة...',
  preferenceOptions: [
    { id: 'points', label: 'نقاط في التطبيق', iconType: 'coins', bgClass: 'bg-amber-50' },
    { id: 'cashback', label: 'كاش باك فوري', iconType: 'wallet', bgClass: 'bg-emerald-50' },
    { id: 'discount', label: 'خصومات حصرية', iconType: 'discount', bgClass: 'bg-orange-50' },
    { id: 'gift', label: 'هدايا وقسائم مجانية', iconType: 'gift', bgClass: 'bg-purple-50' },
  ],

  // 4. Shopping / Needs Step (احتياجاتك اليوم)
  shoppingTitle: 'اختر احتياجاتك لهذا اليوم',
  shoppingSubtitle: 'اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.',
  shoppingTitleEn: 'Choose your needs today',
  shoppingSubtitleEn: 'Tap the products you intend to purchase to tailor your exclusive offers.',
  shoppingButtonTextPrefix: 'متابعة',
  shoppingNoticeAr: '✓ تم اختيار المنتج! جاري المتابعة تلقائياً...',
  shoppingSelectedBadgeAr: 'مختار ✓',
  shoppingTapToSelectAr: 'اضغط للاختيار',
  departments: SUPERMARKET_DEPARTMENTS,
  supermarketDepartments: SUPERMARKET_DEPARTMENTS,
  cafeDepartments: CAFE_DEPARTMENTS,
  restaurantDepartments: RESTAURANT_DEPARTMENTS,

  // 5. Challenge Splash & Game Step
  challengeTitle: 'تحدي بنده السريع',
  challengeSubtitle: 'فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية!',
  challengeButtonText: 'ابدأ التحدي',
  challengeTargetType: 'logo',
  challengeCustomImageUrl: '',
  challengeCustomImageName: 'شعار بنده الرسمي',
  challengeSpecialBonusImageUrl: '',
  challengeTargetFit: 'cover',
  challengeTargetBorderless: true,
  gameDifficulty: 'medium',
  gameDuration: 30,
  gameTargetScore: 500,
  gameDropSpeed: 'normal',

  // 6. Voucher / Gift Step
  voucherCongratsHeading: '🎉 مبروك! لقد ربحت',
  voucherCongratsSubtitle: 'هدية فورية تقديراً لمشاركتك في التحدي',
  voucherBadgeText: 'قسيمة خصم بنده الحصرية ✨',
  voucherDiscountPercent: '10%',
  voucherDiscountTitle: 'خصم فوري',
  voucherDiscountSubtitle: 'على كامل سلتك',
  voucherCode: 'PANDA-WIN-10',
  voucherValidityText: 'صالح لمدة 48 ساعة ⏳',
  voucherLockedNotice: 'قسيمة الهدية مقفلة 🔐',
  voucherLockedDesc: 'أدخل اسمك ورقم جوالك بالأسفل لفك قفل القسيمة وإظهار كود الخصم فوراً!',
  voucherUnlockedNotice: 'تم فك قفل قسيمتك بنجاح! 🎁✨',
  voucherInputNamePlaceholder: 'الاسم بالكامل',
  voucherInputPhonePlaceholder: '(05xxxxxxxx) رقم الجوال',
  voucherSubmitButtonText: 'استلام الهدية الآن',

  // 7. Feedback Step
  feedbackTitle: 'كيف كانت تجربتك معنا؟',
  feedbackSubtitle: 'رأيك يهمنا لتطوير وتحسين خدماتنا',
  feedbackSubmitButtonText: 'إرسال التقييم',
  surveyCardStyle: 'cards_2x2',
  ratingOptions: [
    { id: 'great', emoji: '🤩', label: 'رائع جداً' },
    { id: 'good', emoji: '😊', label: 'جيد ومُرضي' },
    { id: 'normal', emoji: '😐', label: 'عادي / متوسط' },
    { id: 'bad', emoji: '☹️', label: 'غير مُرضي' },
  ],
  surveyQuestions: SUPERMARKET_SURVEY_QUESTIONS,
  supermarketQuestions: SUPERMARKET_SURVEY_QUESTIONS,
  cafeQuestions: CAFE_SURVEY_QUESTIONS,
  restaurantQuestions: RESTAURANT_SURVEY_QUESTIONS,
  surveyQuestionItems: SUPERMARKET_QUESTION_ITEMS,
  surveySpareQuestions: SPARE_SURVEY_QUESTION_BANK,
  supermarketQuestionItems: SUPERMARKET_QUESTION_ITEMS,
  cafeQuestionItems: CAFE_QUESTION_ITEMS,
  restaurantQuestionItems: RESTAURANT_QUESTION_ITEMS,

  // 8. Thank You Step
  thankYouHeading: 'شكراً لك على مشاركتك في تطوير خدماتنا',
  thankYouSubheading: 'تسوق ممتع مع بنده لا يفوّت',
  thankYouFooterNotice: 'نسعد دائماً بخدمتك في كل زيارة!',
  backToHomeText: 'العودة للرئيسية',
};

export function sanitizeDepartments(rawDepts: any[], fallbackDepts: DepartmentConfig[]): DepartmentConfig[] {
  if (!Array.isArray(rawDepts) || rawDepts.length === 0) return fallbackDepts;
  return rawDepts.map((storedDept: any, deptIdx: number) => {
    const defaultDept = fallbackDepts[deptIdx] || fallbackDepts[0];
    return {
      id: storedDept.id || defaultDept?.id || `dept-${deptIdx}`,
      name: storedDept.name || defaultDept?.name || `قسم ${deptIdx + 1}`,
      nameEn: storedDept.nameEn || defaultDept?.nameEn || '',
      icon: storedDept.icon || defaultDept?.icon || '🛍️',
      products: (storedDept.products || []).map((p: any, pIdx: number) => {
        const defaultProd = defaultDept?.products?.[pIdx];
        return {
          id: p.id || `prod-${pIdx}`,
          name: p.name || defaultProd?.name || `منتج ${pIdx + 1}`,
          nameEn: p.nameEn || defaultProd?.nameEn || '',
          icon: p.icon || defaultProd?.icon || '🛍️',
          imageUrl: p.imageUrl || defaultProd?.imageUrl || '',
          cardType: p.cardType || defaultProd?.cardType || (pIdx === 0 ? 'tall' : pIdx === 3 ? 'wide' : 'standard'),
          badge: p.badge !== undefined ? p.badge : (defaultProd?.badge || ''),
          isVisible: p.isVisible !== undefined ? p.isVisible : true,
          order: typeof p.order === 'number' ? p.order : pIdx,
        };
      }).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
    };
  });
}

export function applyBusinessPreset(
  currentConfig: CustomerJourneyConfig, 
  preset: 'supermarket' | 'cafe' | 'restaurant' | 'cafe_restaurant'
): CustomerJourneyConfig {
  const currentType = currentConfig.businessType || 'supermarket';
  
  // Preserve current departments in their specific business slot
  const preservedSupermarket = currentType === 'supermarket' 
    ? (currentConfig.departments || SUPERMARKET_DEPARTMENTS) 
    : (currentConfig.supermarketDepartments || SUPERMARKET_DEPARTMENTS);
  const preservedCafe = currentType === 'cafe' 
    ? (currentConfig.departments || CAFE_DEPARTMENTS) 
    : (currentConfig.cafeDepartments || CAFE_DEPARTMENTS);
  const preservedRestaurant = currentType === 'restaurant' 
    ? (currentConfig.departments || RESTAURANT_DEPARTMENTS) 
    : (currentConfig.restaurantDepartments || RESTAURANT_DEPARTMENTS);

  if (preset === 'cafe' || preset === 'cafe_restaurant') {
    const cafeQ = currentConfig.cafeQuestions || CAFE_SURVEY_QUESTIONS;
    const targetDepts = preservedCafe;
    return {
      ...currentConfig,
      businessType: 'cafe',
      shoppingTitle: 'قائمة مشروبات وحلويات الكافيه',
      shoppingTitleEn: 'Cafe Drinks & Desserts Menu',
      shoppingSubtitle: 'اختر طلباتك المفضلة لتجهيز عروضك وقسيمتك الحصرية',
      shoppingSubtitleEn: 'Select your favorite coffee & treats for exclusive perks',
      departments: targetDepts,
      supermarketDepartments: preservedSupermarket,
      cafeDepartments: targetDepts,
      restaurantDepartments: preservedRestaurant,
      feedbackTitle: 'كيف كانت تجربتك في الكافيه اليوم؟',
      feedbackSubtitle: 'رأيك يهمنا لتطوير جودة القهوة وسرعة الخدمة والجلسات',
      voucherCode: 'CAFE-WIN-10',
      voucherDiscountSubtitle: 'على جميع المشروبات والحلى',
      challengeTitle: 'تحدي كافيه بنده السريع ☕',
      challengeSubtitle: 'فرقع أكواب القهوة واجمع النقاط لربح قسيمة مجانية!',
      thankYouHeading: 'شكراً لزيارتك كافيه بنده',
      thankYouSubheading: 'استمتع بأشهى كوب قهوة وحلى في كل زيارة',
      surveyQuestions: cafeQ,
      cafeQuestions: cafeQ,
      surveyQuestionItems: currentConfig.cafeQuestionItems || CAFE_QUESTION_ITEMS,
      cafeQuestionItems: currentConfig.cafeQuestionItems || CAFE_QUESTION_ITEMS,
    };
  } else if (preset === 'restaurant') {
    const restQ = currentConfig.restaurantQuestions || RESTAURANT_SURVEY_QUESTIONS;
    const targetDepts = preservedRestaurant;
    return {
      ...currentConfig,
      businessType: 'restaurant',
      shoppingTitle: 'قائمة وجبات ومأكولات المطعم',
      shoppingTitleEn: 'Restaurant Menu & Courses',
      shoppingSubtitle: 'اختر أطباقك المفضلة لتخصيص أفضل العروض وقسيمتك',
      shoppingSubtitleEn: 'Choose your favorite dishes to tailor special offers',
      departments: targetDepts,
      supermarketDepartments: preservedSupermarket,
      cafeDepartments: preservedCafe,
      restaurantDepartments: targetDepts,
      feedbackTitle: 'كيف كانت تجربة تناول الطعام معنا اليوم؟',
      feedbackSubtitle: 'رأيك يهمنا لتطوير جودة المأكولات وحسن الضيافة والخدمة',
      voucherCode: 'REST-WIN-10',
      voucherDiscountSubtitle: 'على كامل الفاتورة والوجبات',
      challengeTitle: 'تحدي مطعم بنده الشهي 🍽️',
      challengeSubtitle: 'فرقع أطباق الشيف واجمع النقاط لربح قسيمة وجبة مجانية!',
      thankYouHeading: 'شكراً لزيارتك مطعم بنده',
      thankYouSubheading: 'نتمنى لكم دائماً أشهى الوجبات وأطيب الأوقات',
      surveyQuestions: restQ,
      restaurantQuestions: restQ,
      surveyQuestionItems: currentConfig.restaurantQuestionItems || RESTAURANT_QUESTION_ITEMS,
      restaurantQuestionItems: currentConfig.restaurantQuestionItems || RESTAURANT_QUESTION_ITEMS,
    };
  } else {
    const smQ = currentConfig.supermarketQuestions || SUPERMARKET_SURVEY_QUESTIONS;
    const targetDepts = preservedSupermarket;
    return {
      ...currentConfig,
      businessType: 'supermarket',
      shoppingTitle: 'اختر احتياجاتك لهذا اليوم',
      shoppingTitleEn: 'Choose your needs today',
      shoppingSubtitle: 'اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.',
      shoppingSubtitleEn: 'Tap the products you intend to purchase to tailor your exclusive offers.',
      departments: targetDepts,
      supermarketDepartments: targetDepts,
      cafeDepartments: preservedCafe,
      restaurantDepartments: preservedRestaurant,
      feedbackTitle: 'التقييم العام لتجربة التسوق في أسواق بنده',
      feedbackSubtitle: 'رأيك يهمنا لتطوير وتحسين خدماتنا باستمرار',
      voucherCode: 'PANDA-WIN-10',
      voucherDiscountSubtitle: 'على كامل سلتك',
      challengeTitle: 'تحدي بنده السريع 🛒',
      challengeSubtitle: 'فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية!',
      thankYouHeading: 'شكراً لك على مشاركتك في تطوير خدماتنا',
      thankYouSubheading: 'تسوق ممتع مع بنده لا يفوّت',
      surveyQuestions: smQ,
      supermarketQuestions: smQ,
      surveyQuestionItems: currentConfig.supermarketQuestionItems || SUPERMARKET_QUESTION_ITEMS,
      supermarketQuestionItems: currentConfig.supermarketQuestionItems || SUPERMARKET_QUESTION_ITEMS,
    };
  }
}

const STORAGE_KEY = 'panda_customer_journey_config';

export function getStoredJourneyConfig(): CustomerJourneyConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_JOURNEY_CONFIG;
    const parsed = JSON.parse(raw);
    const bType = parsed.businessType || 'supermarket';

    const supermarketDepts = sanitizeDepartments(
      parsed.supermarketDepartments || (bType === 'supermarket' ? parsed.departments : SUPERMARKET_DEPARTMENTS),
      SUPERMARKET_DEPARTMENTS
    );
    const cafeDepts = sanitizeDepartments(
      parsed.cafeDepartments || (bType === 'cafe' ? parsed.departments : CAFE_DEPARTMENTS),
      CAFE_DEPARTMENTS
    );
    const restaurantDepts = sanitizeDepartments(
      parsed.restaurantDepartments || (bType === 'restaurant' ? parsed.departments : RESTAURANT_DEPARTMENTS),
      RESTAURANT_DEPARTMENTS
    );

    const currentDepts = bType === 'cafe' ? cafeDepts : bType === 'restaurant' ? restaurantDepts : supermarketDepts;

    const currentQuestions = bType === 'cafe'
      ? (parsed.cafeQuestions || CAFE_SURVEY_QUESTIONS)
      : bType === 'restaurant'
      ? (parsed.restaurantQuestions || RESTAURANT_SURVEY_QUESTIONS)
      : (parsed.supermarketQuestions || parsed.surveyQuestions || SUPERMARKET_SURVEY_QUESTIONS);

    return {
      ...DEFAULT_JOURNEY_CONFIG,
      ...parsed,
      businessType: bType,
      departments: currentDepts,
      supermarketDepartments: supermarketDepts,
      cafeDepartments: cafeDepts,
      restaurantDepartments: restaurantDepts,
      preferenceOptions: Array.isArray(parsed.preferenceOptions) && parsed.preferenceOptions.length > 0
        ? parsed.preferenceOptions
        : DEFAULT_JOURNEY_CONFIG.preferenceOptions,
      ratingOptions: Array.isArray(parsed.ratingOptions) && parsed.ratingOptions.length > 0
        ? parsed.ratingOptions
        : DEFAULT_JOURNEY_CONFIG.ratingOptions,
      surveyQuestions: currentQuestions,
      customerSelectsBusinessAfterLanguage: parsed.customerSelectsBusinessAfterLanguage !== undefined 
        ? parsed.customerSelectsBusinessAfterLanguage 
        : true,
      supermarketQuestions: parsed.supermarketQuestions || SUPERMARKET_SURVEY_QUESTIONS,
      cafeQuestions: parsed.cafeQuestions || CAFE_SURVEY_QUESTIONS,
      restaurantQuestions: parsed.restaurantQuestions || RESTAURANT_SURVEY_QUESTIONS,
    };
  } catch {
    return DEFAULT_JOURNEY_CONFIG;
  }
}

export function saveStoredJourneyConfig(config: CustomerJourneyConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save customer journey config', err);
  }
}

export function resetStoredJourneyConfig(): CustomerJourneyConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset customer journey config', err);
  }
  return DEFAULT_JOURNEY_CONFIG;
}
