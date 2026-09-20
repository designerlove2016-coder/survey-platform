export type SurveyQuestionType = 
  | 'stars_5' 
  | 'nps_10' 
  | 'csat_emojis' 
  | 'single_choice' 
  | 'multi_choice' 
  | 'text_feedback';

export type SurveyCategory = 
  | 'food_quality' 
  | 'service_speed' 
  | 'cleanliness' 
  | 'ambiance' 
  | 'pricing' 
  | 'overall' 
  | 'custom';

export interface SurveyChoiceOption {
  id: string;
  labelAr: string;
  labelEn: string;
  icon?: string;
}

export interface SurveyQuestionModel {
  id: string;
  type: SurveyQuestionType;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  isRequired: boolean;
  isEnabled: boolean;
  category: SurveyCategory;
  options?: SurveyChoiceOption[];
  lowScoreLabelAr?: string;
  highScoreLabelAr?: string;
}

export type SurveyThemePreset = 
  | 'espresso_cafe' 
  | 'luxury_dark' 
  | 'vibrant_light' 
  | 'emerald_oasis' 
  | 'royal_amber';

export interface SurveyThemeConfig {
  preset: SurveyThemePreset;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  subtextColor: string;
  fontFamily: string;
}

export interface SurveyBrandingConfig {
  restaurantName: string;
  restaurantNameEn: string;
  branchName: string;
  branchNameEn: string;
  logoUrl: string;
  coverBannerUrl?: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  thankYouTitle: string;
  thankYouSubtitle: string;
  googleMapsReviewUrl: string;
  enableGoogleMapsRedirectOn5Star: boolean;
  rewardVoucherText: string;
  requireGuestPhone: boolean;
}

export interface SurveyTableInfo {
  id: string;
  tableNumber: string;
  sectionName: string;
  qrCodeDataUrl?: string;
  active: boolean;
}

export interface SurveyResponseRecord {
  id: string;
  timestamp: string;
  createdAt: number;
  tableNumber: string;
  branchName: string;
  guestName?: string;
  guestPhone?: string;
  overallStars?: number; // 1 to 5
  npsScore?: number; // 0 to 10
  answers: Record<string, string | number | string[]>;
  comment?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentKeywords: string[];
  isFlaggedNegative: boolean;
  resolved: boolean;
  managerActionTaken?: string;
}

export interface ImpressionCardItem {
  id: string;
  num: number;
  emoji: string;
  stars: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
}

export interface QuestionTemplateOption {
  id: string;
  num: number;
  emoji?: string;
  text: string;
  subtext?: string;
}

export type QuestionTemplateLayoutType = 
  | 'grid' 
  | 'language_roller' 
  | 'product_catalog'
  | 'connected_screen'
  | 'speed_challenge'
  | 'reward_preference'
  | 'voucher_unlock'
  | 'feedback_rating'
  | 'thank_you_screen';

export interface QuestionTemplateItem {
  id: string;
  categoryBadge: string;
  optionsCountLabel: string;
  titleAr: string;
  subtitleAr?: string;
  isEnabled: boolean;
  actionButtonText: string;
  layoutType?: QuestionTemplateLayoutType;
  options: QuestionTemplateOption[];
}

export interface SurveyMenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: string;
  tag: string;
  imageUrl: string;
}

export interface EvaluationPillarItem {
  id: string;
  key: string;
  titleAr: string;
  titleEn: string;
}

export interface QuickTagItem {
  id: string;
  emoji: string;
  textAr: string;
  textEn: string;
}

export interface LoyaltyPrizeItem {
  id: string;
  pointsBadge: string;
  titleAr: string;
  titleEn: string;
}

export interface SurveyIdentitySettings {
  logoUrl: string;
  coverUrl: string;
  restaurantNameAr: string;
  restaurantNameEn: string;
  overallQuestionAr: string;
  overallQuestionEn: string;
}

export interface SurveyCustomizerSettings {
  branding: SurveyBrandingConfig;
  theme: SurveyThemeConfig;
  questions: SurveyQuestionModel[];
  tables: SurveyTableInfo[];
  impressionCards?: ImpressionCardItem[];
  questionTemplates?: QuestionTemplateItem[];
  menuItems?: SurveyMenuItem[];
  evaluationPillars?: EvaluationPillarItem[];
  quickTags?: QuickTagItem[];
  loyaltyPrizes?: LoyaltyPrizeItem[];
  identitySettings?: SurveyIdentitySettings;
  screenOrder?: string[];
}
