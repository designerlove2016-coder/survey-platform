export type Step = 
  | 'welcome' 
  | 'business_select'
  | 'connected' 
  | 'preference' 
  | 'shopping' 
  | 'challenge_splash' 
  | 'game' 
  | 'result' 
  | 'voucher_form' 
  | 'feedback' 
  | 'thank_you' 
  | 'dashboard';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  id: Difficulty;
  label: string;
  sublabel: string;
  duration: number; // in seconds
  spawnInterval: number; // in ms
  floatDuration: number; // in seconds
  scoreMultiplier: number;
  hasBombs: boolean;
  color: string;
}

export interface LogoItem {
  id: number;
  x: number;
  scale: number;
  isSpecial?: boolean;
  isBomb?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  difficulty: Difficulty;
  date: string;
  avatarEmoji: string;
}

export interface CustomerFeedback {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  rating: string;
  ratingLabel: string;
  section?: string;
  preference?: string;
  selectedProducts: string[];
  score: number;
  difficulty: Difficulty;
  timestamp: string;
  createdAt?: number;
  visitNumber?: number;
  comment?: string;
  languageCode?: string;
  languageName?: string;
  cleanlinessRating?: string;
  staffRating?: string;
  overallRating?: string;
  businessType?: 'supermarket' | 'cafe' | 'restaurant' | 'cafe_restaurant';
}

export type Feedback = CustomerFeedback;

export interface LanguageTranslations {
  // Brand & General
  brandTitle: string;
  brandSubtitle: string;
  experienceNo: string;
  adminDashboard: string;
  honorBoard: string;
  changeLogoText: string;
  backBtn: string;

  // Welcome / Language Selection
  welcomeBadge: string;
  chooseLanguageTitle: string;
  chooseLanguageSubtitle: string;
  scrollHint: string;
  confirmAndContinue: string;

  // Connected
  connectedTitle: string;
  connectedSubtitle: string;

  // Preference
  whatDoYouPreferTitle: string;
  preferenceSubtitle: string;
  prefPoints: string;
  prefCashback: string;
  prefDiscounts: string;
  selectOptionToContinue: string;
  myChoicesBtn: string;

  // Shopping & Departments
  shoppingTitle: string;
  shoppingSubtitle: string;
  favDepartment: string;
  deptVeg: string;
  deptFood: string;
  deptCheese: string;
  deptClean: string;
  itemSelected: string;
  itemSelecting: string;
  selectAtLeastOne: string;

  // Challenge Splash
  challengeTitle: string;
  challengeDesc: string;
  difficultyLevel: string;
  diffEasy: string;
  diffEasyDesc: string;
  diffMedium: string;
  diffMediumDesc: string;
  diffHard: string;
  diffHardDesc: string;
  seconds: string;
  startChallengeBtn: string;

  // Game
  gameScore: string;
  timeRemaining: string;
  levelLabel: string;
  avoidBombs: string;
  bombDeduct: string;
  bonusPoints: string;
  bonusPointsHard: string;

  // Result
  timeUpTitle: string;
  totalScoreLabel: string;
  saveScorePrompt: string;
  enterNamePlaceholder: string;
  saveBtn: string;
  scoreSavedSuccess: string;
  claimVoucherGift: string;
  playAgain: string;

  // Voucher Form
  congratsWon: string;
  voucherSubheading: string;
  exclusiveVoucher: string;
  instantDiscount: string;
  onWholeCart: string;
  validInSection: string;
  validFor48h: string;
  enterDetailsPrompt: string;
  fullNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  claimGiftNow: string;

  // Feedback
  feedbackTitle: string;
  ratingGreat: string;
  ratingGood: string;
  ratingNormal: string;
  ratingBad: string;
  ratingVeryBad: string;
  submitFinalFeedback: string;

  // Thank You
  thankYouHeading: string;
  funShoppingPanda: string;
  alwaysHappyServe: string;
  backToHome: string;

  // Additional Customer Journey & Localization Keys
  preferenceTitle?: string;
  prefDiscount?: string;
  challengeSplashTitle?: string;
  challengeSplashSubtitle?: string;
  diffDifficulty?: string;
  secondsShort?: string;
  startChallenge?: string;
  chooseOptionToContinue?: string;
  prefGift?: string;
  selectedBadge?: string;
  chooseThisOffer?: string;
  confirmPreferenceBtn?: string;
  tapToSelect?: string;
  favItemBadge?: string;
  selectedCountLabel?: string;
  voucherLockedTitle?: string;
  voucherLockedInstruction?: string;
  voucherUnlockedTitle?: string;
  nameLabel?: string;
  phoneLabel?: string;
  phoneWarningText?: string;
  completeFieldsToUnlock?: string;
  feedbackSubtitleText?: string;
  dearCustomerBadge?: string;
  voucherConfirmedNotice?: string;
  thankYouPersonalized?: string;
  timeMetricLabel?: string;
  rewardMetricLabel?: string;
  rewardDiscountVal?: string;
  qualifiedForVoucherBanner?: string;
  perfLegendary?: string;
  perfHero?: string;
  perfGreat?: string;
  perfGood?: string;
  breadSection?: string;
  customerPreviewTitle?: string;
  returnToDashboard?: string;

  // Leaderboard Modal
  leaderboardModalTitle: string;
  leaderboardSubtitle: string;
  rankCol: string;
  playerCol: string;
  scoreCol: string;
  difficultyCol: string;
  closeBtn: string;
}

export interface LanguageItem {
  code: string;
  countryCode: string;
  name: string;
  englishName: string;
  nativeSublabel: string;
  flag: string;
  dir: 'rtl' | 'ltr';
  isDefault?: boolean;
  isActive: boolean;
  translations: LanguageTranslations;
}

export interface BrandSettings {
  logoUrl: string | null;
  brandNameAr: string;
  brandNameEn: string;
  brandTitleAr: string;
  brandTitleEn: string;
  brandSubtitleAr: string;
  brandSubtitleEn: string;
  colorPaletteId?: string;
  customPrimaryColor?: string;
  customBgColor?: string;
  fontFamilyId?: string;
}

export interface FontOption {
  id: string;
  nameAr: string;
  nameEn: string;
  tagAr: string;
  tagEn: string;
  fontFamily: string;
  googleFontFamily: string;
  descriptionAr: string;
  descriptionEn: string;
  sampleHeadline: string;
  sampleSubline: string;
  isImageRequested?: 1 | 2;
  category: 'image-match' | 'geometric' | 'display' | 'sans';
}

export interface ProductItemConfig {
  id: string;
  name: string;
  nameEn?: string;
  icon?: string;
  imageUrl?: string;
  cardType?: 'tall' | 'wide' | 'standard';
  badge?: string;
  isVisible?: boolean;
  order?: number;
}

export interface DepartmentConfig {
  id: string;
  name: string;
  nameEn?: string;
  icon?: string;
  products: ProductItemConfig[];
}

export interface PreferenceOptionConfig {
  id: string;
  label: string;
  sublabel?: string;
  iconType: 'coins' | 'wallet' | 'discount' | 'gift';
  bgClass: string;
}

export interface RatingOptionConfig {
  id: string;
  emoji: string;
  label: string;
}

export type BusinessProjectType = 'supermarket' | 'cafe' | 'restaurant' | 'cafe_restaurant';
export type BusinessType = BusinessProjectType;

export interface SurveyQuestionOption {
  id: string;
  number?: number;
  icon: string;
  title: string;
  titleEn?: string;
  grade?: 'great' | 'good' | 'normal' | 'bad';
}

export interface SurveyQuestionItem {
  id: string;
  titleAr: string;
  titleEn: string;
  icon?: string;
  isEnabled: boolean;
  category?: 'cleanliness' | 'staff' | 'ambiance' | 'taste' | 'products' | 'pricing' | 'accessibility' | 'custom' | 'service' | 'hospitality' | 'overall';
  options: SurveyQuestionOption[];
}

export interface SurveyQuestionsConfig {
  cleanliness: {
    titleAr: string;
    titleEn: string;
    isEnabled: boolean;
  };
  staff: {
    titleAr: string;
    titleEn: string;
    isEnabled: boolean;
  };
  overall: {
    titleAr: string;
    titleEn: string;
    isEnabled: boolean;
  };
}

export interface CustomerJourneyConfig {
  // Business Project Type (سوبر ماركت، كافيه ومقهى، أو مطعم ومأكولات)
  businessType?: BusinessProjectType;

  // Whether customer selects business category (Supermarket / Cafe / Restaurant) after language selection
  customerSelectsBusinessAfterLanguage?: boolean;

  // Products Step Layout Choice (تصميم بينتو العصري أو تصميم الشبكة 2x2 المتناظرة)
  productsLayout?: 'bento' | 'grid_2x2';

  // 0. Language Selection Step (شاشة اختيار اللغة)
  languageSelectTitleAr?: string;
  languageSelectTitleEn?: string;
  languageSelectSubtitleAr?: string;
  languageSelectSubtitleEn?: string;
  languageSelectBadgeAr?: string;
  languageSelectBadgeEn?: string;

  // 1. Welcome Step
  welcomeBadgeAr: string;
  welcomeTitleAr: string;
  welcomeSubtitleAr: string;
  startButtonTextAr: string;

  // 2. Connected Step
  connectedTitleAr: string;
  connectedSubtitleAr: string;
  connectedButtonTextAr: string;
  connectedNoticeAr?: string;

  // 3. Preference Step
  preferenceQuestionTitle: string;
  preferenceQuestionSubtitle: string;
  preferenceOptions: PreferenceOptionConfig[];
  preferenceButtonText: string;
  preferenceNoticeAr?: string;

  // 4. Shopping / Needs Step (احتياجاتك اليوم)
  shoppingTitle: string;
  shoppingSubtitle: string;
  shoppingTitleEn?: string;
  shoppingSubtitleEn?: string;
  departments: DepartmentConfig[];
  supermarketDepartments?: DepartmentConfig[];
  cafeDepartments?: DepartmentConfig[];
  restaurantDepartments?: DepartmentConfig[];
  shoppingButtonTextPrefix: string;
  shoppingNoticeAr?: string;
  shoppingSelectedBadgeAr?: string;
  shoppingTapToSelectAr?: string;

  // 5. Challenge Splash & Game Step
  challengeTitle: string;
  challengeSubtitle: string;
  challengeButtonText: string;
  challengeTargetType?: 'logo' | 'custom_image';
  challengeCustomImageUrl?: string;
  challengeCustomImageName?: string;
  challengeSpecialBonusImageUrl?: string;
  challengeTargetFit?: 'cover' | 'contain';
  challengeTargetBorderless?: boolean;
  gameDifficulty?: Difficulty;
  gameDuration?: number;
  gameTargetScore?: number;
  gameDropSpeed?: 'slow' | 'normal' | 'fast';

  // 6. Voucher / Gift Step
  voucherCongratsHeading: string;
  voucherCongratsSubtitle: string;
  voucherBadgeText: string;
  voucherDiscountPercent: string;
  voucherDiscountTitle: string;
  voucherDiscountSubtitle: string;
  voucherCode: string;
  voucherValidityText: string;
  voucherLockedNotice: string;
  voucherLockedDesc: string;
  voucherUnlockedNotice: string;
  voucherInputNamePlaceholder: string;
  voucherInputPhonePlaceholder: string;
  voucherSubmitButtonText: string;

  // 7. Feedback Step
  feedbackTitle: string;
  feedbackSubtitle: string;
  ratingOptions: RatingOptionConfig[];
  feedbackSubmitButtonText: string;
  feedbackNoticeAr?: string;
  surveyCardStyle?: 'cards_2x2' | 'compact_bars' | 'stars';
  surveyQuestions?: SurveyQuestionsConfig;
  supermarketQuestions?: SurveyQuestionsConfig;
  cafeQuestions?: SurveyQuestionsConfig;
  restaurantQuestions?: SurveyQuestionsConfig;
  surveyQuestionItems?: SurveyQuestionItem[];
  surveySpareQuestions?: SurveyQuestionItem[];
  supermarketQuestionItems?: SurveyQuestionItem[];
  cafeQuestionItems?: SurveyQuestionItem[];
  restaurantQuestionItems?: SurveyQuestionItem[];

  // 8. Thank You Step
  thankYouHeading: string;
  thankYouSubheading: string;
  thankYouFooterNotice: string;
  backToHomeText: string;
}

