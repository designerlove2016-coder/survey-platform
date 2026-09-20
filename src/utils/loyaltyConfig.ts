export type SectorType = 'cafe' | 'restaurant' | 'supermarket';

export interface CafeLoyaltySettings {
  isEnabled: boolean;
  programNameAr: string;
  programNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  spendAmountPerStamp: number; // e.g. 20 SAR
  stampsRequired: number; // e.g. 8 stamps
  rewardNameAr: string;
  rewardNameEn: string;
  rewardDescriptionAr: string;
  rewardDescriptionEn: string;
  eligibleProducts: string[];
  eligibleCategories: string[];
  stampExpirationDays: number;
  rewardExpirationDays: number;
  allowBonusStamps: boolean;
  bonusStampRulesAr: string;
  bonusStampRulesEn: string;
  customerMessageAr: string;
  customerMessageEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
}

export interface RestaurantLoyaltySettings {
  isEnabled: boolean;
  programNameAr: string;
  programNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  requiredVisits: number; // e.g. 5
  minimumOrderAmount: number; // e.g. 50 SAR
  rewardNameAr: string;
  rewardNameEn: string;
  rewardDescriptionAr: string;
  rewardDescriptionEn: string;
  eligibleMenuCategories: string[];
  eligibleProducts: string[];
  expirationDays: number;
  bonusVisitRulesAr: string;
  bonusVisitRulesEn: string;
  customerMessageAr: string;
  customerMessageEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
}

export interface SupermarketRewardCatalogItem {
  id: string;
  requiredPoints: number; // e.g. 500, 1000, 2500
  rewardValueSAR: number; // e.g. 5, 10, 25
  rewardNameAr: string;
  rewardNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  isActive: boolean;
}

export interface SupermarketLoyaltySettings {
  isEnabled: boolean;
  programNameAr: string;
  programNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sarRequiredPerPoint: number; // e.g. 1 SAR = 1 Point
  catalog: SupermarketRewardCatalogItem[];
  allowBonusPoints: boolean;
  welcomeBonusPoints: number;
  categoryMultipliersAr: string;
  categoryMultipliersEn: string;
  excludedProducts: string[];
  excludedCategories: string[];
  pointExpirationDays: number;
  minimumRedemptionPoints: number;
  customerMessageAr: string;
  customerMessageEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
}

export interface MasterRewardItem {
  id: string;
  sector: SectorType;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  requiredRequirement: number; // stamps, visits, or points
  requirementType: 'stamps' | 'visits' | 'points';
  rewardType: 'free_coffee' | 'free_dessert' | 'voucher_sar' | 'custom_item';
  eligibleCategories: string[];
  expirationDays: number;
  isActive: boolean;
}

export interface LoyaltyProgramConfig {
  version: number;
  lastUpdated: string;
  isPublished: boolean;
  cafe: CafeLoyaltySettings;
  restaurant: RestaurantLoyaltySettings;
  supermarket: SupermarketLoyaltySettings;
  rewards: MasterRewardItem[];
}

export const DEFAULT_LOYALTY_CONFIG: LoyaltyProgramConfig = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  isPublished: true,

  // 1. CAFÉ SETTINGS
  cafe: {
    isEnabled: true,
    programNameAr: 'المقهى والقهوة المختصة',
    programNameEn: 'Specialty Café & Coffee',
    descriptionAr: 'اكسب معنا في كل زيارة ☕',
    descriptionEn: 'Earn with us on every visit ☕',
    spendAmountPerStamp: 20,
    stampsRequired: 8,
    rewardNameAr: 'مشروب قهوة مجاني',
    rewardNameEn: 'Free Coffee Drink',
    rewardDescriptionAr: 'احصل على مشروب قهوة مختصة مجاناً عند إكمال 8 أختام',
    rewardDescriptionEn: 'Get a free specialty coffee on completing 8 stamps',
    eligibleProducts: ['قهوة مقطرة V60', 'اسبريسو مزدوج', 'كورتادو', 'فلات وايت', 'لاتيه مثلج', 'كرواسون زبدة'],
    eligibleCategories: ['القهوة الساخنة', 'القهوة الباردة والمثلجة', 'المخبوزات والكرواسون'],
    stampExpirationDays: 90,
    rewardExpirationDays: 30,
    allowBonusStamps: true,
    bonusStampRulesAr: 'ختم إضافي عند الطلب الصباحي قبل 11:00 ص أو أيام الأحد',
    bonusStampRulesEn: 'Bonus stamp for morning orders before 11:00 AM or on Sundays',
    customerMessageAr: 'شكراً لك ❤️ اكسب معنا في كل زيارة ☕ كل 20 ريال = ختم واحد. اجمع 8 أختام واحصل على مشروب مجاني!',
    customerMessageEn: 'Thank you ❤️ Earn with us on every visit ☕ Every 20 SAR = 1 Stamp. Collect 8 stamps and enjoy a free drink!',
    buttonTextAr: 'عرض بطاقة الولاء',
    buttonTextEn: 'View Loyalty Card'
  },

  // 2. RESTAURANT SETTINGS
  restaurant: {
    isEnabled: true,
    programNameAr: 'مطعم ومطبخ بنده العائلي',
    programNameEn: 'Panda Family Dining',
    descriptionAr: 'اجمع أختامك مع كل زيارة 🍽️',
    descriptionEn: 'Collect stamps with every visit 🍽️',
    requiredVisits: 5,
    minimumOrderAmount: 50,
    rewardNameAr: 'حلوى فاخرة أو طبق مقبلات مجاني',
    rewardNameEn: 'Free Dessert or Appetizer',
    rewardDescriptionAr: 'أكمل 5 زيارات واحصل على طبق تحلية فاخر مجاناً',
    rewardDescriptionEn: 'Complete 5 visits and get a complimentary dessert',
    eligibleMenuCategories: ['الأطباق الرئيسية', 'المشويات والفرن', 'المقبلات والشوربات', 'الحلويات'],
    eligibleProducts: ['مشاوي مشكلة عائلية', 'برياني دجاج', 'سلطة سيزر مقرمشة', 'تشيز كيك فستق'],
    expirationDays: 60,
    bonusVisitRulesAr: 'زيارة مضاعفة للطلبات العائلية في عطلة نهاية الأسبوع (فوق 120 ريال)',
    bonusVisitRulesEn: 'Double visit credit for weekend family orders over 120 SAR',
    customerMessageAr: 'شكراً لك ❤️ اجمع أختامك مع كل زيارة 🍽️ أكمل 5 زيارات واحصل على مكافأة مجانية فاخرة!',
    customerMessageEn: 'Thank you ❤️ Collect your stamps with every visit 🍽️ Complete 5 visits and receive a free reward!',
    buttonTextAr: 'عرض بطاقة الولاء',
    buttonTextEn: 'View Loyalty Card'
  },

  // 3. SUPERMARKET SETTINGS (Points System)
  supermarket: {
    isEnabled: true,
    programNameAr: 'نقاط مكافآت هايبر بنده',
    programNameEn: 'Panda Hypermarket Points',
    descriptionAr: 'اجمع نقاطًا مع كل عملية شراء 🛒',
    descriptionEn: 'Collect points with every purchase 🛒',
    sarRequiredPerPoint: 1, // 1 SAR = 1 Point
    catalog: [
      {
        id: 'rew-5sar',
        requiredPoints: 500,
        rewardValueSAR: 5,
        rewardNameAr: 'قسيمة مشتريات 5 ريال',
        rewardNameEn: '5 SAR Shopping Voucher',
        descriptionAr: 'خصم مباشر من فاتورة السلة عند الكاشير',
        descriptionEn: 'Instant deduction at checkout counters',
        isActive: true
      },
      {
        id: 'rew-10sar',
        requiredPoints: 1000,
        rewardValueSAR: 10,
        rewardNameAr: 'قسيمة مشتريات 10 ريال',
        rewardNameEn: '10 SAR Shopping Voucher',
        descriptionAr: 'خصم فوري لكافة أقسام الهايبرماركت',
        descriptionEn: 'Instant discount across all hypermarket depts',
        isActive: true
      },
      {
        id: 'rew-25sar',
        requiredPoints: 2500,
        rewardValueSAR: 25,
        rewardNameAr: 'قسيمة مشتريات 25 ريال',
        rewardNameEn: '25 SAR Shopping Voucher',
        descriptionAr: 'خصم تسوق فاخر للمشتريات الكبرى والسلال العائلية',
        descriptionEn: 'Premium discount for large family baskets',
        isActive: true
      }
    ],
    allowBonusPoints: true,
    welcomeBonusPoints: 50,
    categoryMultipliersAr: '2x نقاط مضاعفة على أقسام الخضار، الفواكه الطازجة واللحوم',
    categoryMultipliersEn: '2x points multiplier on Fresh Produce, Fruits and Butchery',
    excludedProducts: ['بطاقات الهدايا والشحن الإلكتروني', 'خدمات الدفع وتجديد الاشتراكات'],
    excludedCategories: ['بطاقات الاتصالات مسبقة الدفع'],
    pointExpirationDays: 365,
    minimumRedemptionPoints: 500,
    customerMessageAr: 'شكراً لك ❤️ اجمع نقاطًا مع كل عملية شراء 🛒 كل 1 ريال = 1 نقطة. استبدل نقاطك بالمكافآت!',
    customerMessageEn: 'Thank you ❤️ Collect points with every purchase 🛒 1 SAR = 1 Point. Redeem points for rewards!',
    buttonTextAr: 'عرض نقاطي ومكافآتي',
    buttonTextEn: 'View My Points'
  },

  // 4. MASTER REWARDS LIST
  rewards: [
    {
      id: 'rew-cafe-coffee',
      sector: 'cafe',
      nameAr: 'مشروب قهوة مختصة مجاني',
      nameEn: 'Free Specialty Coffee',
      descriptionAr: 'أي مشروب ساخن أو بارد من القائمة عند استكمال 8 أختام',
      descriptionEn: 'Any hot or cold beverage from menu upon 8 stamps',
      requiredRequirement: 8,
      requirementType: 'stamps',
      rewardType: 'free_coffee',
      eligibleCategories: ['القهوة الساخنة', 'القهوة الباردة'],
      expirationDays: 30,
      isActive: true
    },
    {
      id: 'rew-cafe-pastry',
      sector: 'cafe',
      nameAr: 'قطعة حلى أو كرواسون مجاني',
      nameEn: 'Free Pastry or Croissant',
      descriptionAr: 'كرواسون طازج أو دونات عند استكمال 5 أختام إضافية',
      descriptionEn: 'Fresh croissant or donut upon 5 additional stamps',
      requiredRequirement: 5,
      requirementType: 'stamps',
      rewardType: 'custom_item',
      eligibleCategories: ['المخبوزات والحلويات'],
      expirationDays: 30,
      isActive: true
    },
    {
      id: 'rew-rest-dessert',
      sector: 'restaurant',
      nameAr: 'طبق حلى أو مقبلات مجانية',
      nameEn: 'Free Dessert or Gourmet Appetizer',
      descriptionAr: 'طبق تحلية أو مقبلات مميزة عند إكمال 5 زيارات',
      descriptionEn: 'Dessert or appetizer upon completing 5 visits',
      requiredRequirement: 5,
      requirementType: 'visits',
      rewardType: 'free_dessert',
      eligibleCategories: ['الحلويات', 'المقبلات'],
      expirationDays: 60,
      isActive: true
    },
    {
      id: 'rew-rest-meal',
      sector: 'restaurant',
      nameAr: 'وجبة عائلية مجانية كاملة',
      nameEn: 'Free Full Family Meal',
      descriptionAr: 'وجبة رئيسية مجانية عند إكمال 10 زيارات',
      descriptionEn: 'Free main meal upon completing 10 visits',
      requiredRequirement: 10,
      requirementType: 'visits',
      rewardType: 'custom_item',
      eligibleCategories: ['الأطباق الرئيسية'],
      expirationDays: 90,
      isActive: true
    },
    {
      id: 'rew-super-500',
      sector: 'supermarket',
      nameAr: 'قسيمة خصم 5 ريال فورية',
      nameEn: '5 SAR Cash Voucher',
      descriptionAr: 'خصم مباشر عند الوصول إلى 500 نقطة',
      descriptionEn: 'Instant discount upon reaching 500 points',
      requiredRequirement: 500,
      requirementType: 'points',
      rewardType: 'voucher_sar',
      eligibleCategories: ['كافة أقسام الهايبرماركت'],
      expirationDays: 365,
      isActive: true
    },
    {
      id: 'rew-super-1000',
      sector: 'supermarket',
      nameAr: 'قسيمة خصم 10 ريال فورية',
      nameEn: '10 SAR Cash Voucher',
      descriptionAr: 'خصم مباشر عند الوصول إلى 1,000 نقطة',
      descriptionEn: 'Instant discount upon reaching 1,000 points',
      requiredRequirement: 1000,
      requirementType: 'points',
      rewardType: 'voucher_sar',
      eligibleCategories: ['كافة أقسام الهايبرماركت'],
      expirationDays: 365,
      isActive: true
    },
    {
      id: 'rew-super-2500',
      sector: 'supermarket',
      nameAr: 'قسيمة خصم 25 ريال فورية',
      nameEn: '25 SAR Cash Voucher',
      descriptionAr: 'خصم مباشر عند الوصول إلى 2,500 نقطة',
      descriptionEn: 'Instant discount upon reaching 2,500 points',
      requiredRequirement: 2500,
      requirementType: 'points',
      rewardType: 'voucher_sar',
      eligibleCategories: ['كافة أقسام الهايبرماركت'],
      expirationDays: 365,
      isActive: true
    }
  ]
};

const LOYALTY_STORAGE_KEY = 'panda_loyalty_settings_v1';

export function getStoredLoyaltyConfig(): LoyaltyProgramConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_LOYALTY_CONFIG;
  }

  try {
    const raw = localStorage.getItem(LOYALTY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(DEFAULT_LOYALTY_CONFIG));
      return DEFAULT_LOYALTY_CONFIG;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_LOYALTY_CONFIG,
      ...parsed,
      cafe: { ...DEFAULT_LOYALTY_CONFIG.cafe, ...(parsed.cafe || {}) },
      restaurant: { ...DEFAULT_LOYALTY_CONFIG.restaurant, ...(parsed.restaurant || {}) },
      supermarket: {
        ...DEFAULT_LOYALTY_CONFIG.supermarket,
        ...(parsed.supermarket || {}),
        catalog: Array.isArray(parsed.supermarket?.catalog) 
          ? parsed.supermarket.catalog 
          : DEFAULT_LOYALTY_CONFIG.supermarket.catalog
      },
      rewards: Array.isArray(parsed.rewards) && parsed.rewards.length > 0 
        ? parsed.rewards 
        : DEFAULT_LOYALTY_CONFIG.rewards
    };
  } catch (err) {
    console.error('Error loading loyalty config from storage:', err);
    return DEFAULT_LOYALTY_CONFIG;
  }
}

export function saveStoredLoyaltyConfig(config: LoyaltyProgramConfig): void {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      ...config,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(toSave));
    window.dispatchEvent(new CustomEvent('panda_loyalty_updated', { detail: toSave }));
  } catch (err) {
    console.error('Error saving loyalty config:', err);
  }
}

export function publishLoyaltyConfig(config: LoyaltyProgramConfig): void {
  const publishedConfig = {
    ...config,
    isPublished: true,
    lastUpdated: new Date().toISOString()
  };
  saveStoredLoyaltyConfig(publishedConfig);
}
