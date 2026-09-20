import QRCode from 'qrcode';
import { 
  SurveyCustomizerSettings, 
  SurveyQuestionModel, 
  SurveyResponseRecord,
  SurveyThemeConfig,
  ImpressionCardItem,
  QuestionTemplateItem,
  SurveyMenuItem,
  EvaluationPillarItem,
  QuickTagItem,
  LoyaltyPrizeItem,
  SurveyIdentitySettings
} from '../types/surveyPlatform';

export const DEFAULT_IMPRESSION_CARDS: ImpressionCardItem[] = [
  {
    id: '1',
    num: 1,
    emoji: '🤩',
    stars: 5,
    titleAr: 'Unforgettable! ✨',
    titleEn: 'Unforgettable! ✨',
    descAr: 'خدمة خيالية ونكهات تفوق التوقعات'
  },
  {
    id: '2',
    num: 2,
    emoji: '😄',
    stars: 4,
    titleAr: 'Great Delight 😄',
    titleEn: 'Great Delight 😄',
    descAr: 'أطباق لذيذة وضيافة مميزة جداً'
  },
  {
    id: '3',
    num: 3,
    emoji: '😐',
    stars: 3,
    titleAr: 'It was OK 😐',
    titleEn: 'It was OK 😐',
    descAr: 'تجربة مقبولة مع ملاحظات نرجو تحسينها'
  },
  {
    id: '4',
    num: 4,
    emoji: '😞',
    stars: 2,
    titleAr: 'Disappointing 😞',
    titleEn: 'Disappointing 😞',
    descAr: 'أقل من المأمول ونتطلع لحل مشكلتك'
  }
];

export const CORE_JOURNEY_PREVIEW_IDS = [
  'qt_language_preference',
  'qt_connected_success',
  'qt_daily_shopping_needs',
  'qt_reward_preference',
  'qt_speed_game_challenge',
  'qt_voucher_gift',
  'qt_shopping_overall_eval',
  'qt_thank_you_screen'
];

export const CORE_PREVIEW_TEMPLATE_IDS = CORE_JOURNEY_PREVIEW_IDS;

export const DEFAULT_QUESTION_TEMPLATES: QuestionTemplateItem[] = [
  // Stage 1: Language Preference (عجلة التقليب 3D - الشاشة 1)
  {
    id: 'qt_language_preference',
    categoryBadge: '✨ 1. اختيار لغتك المفضلة 🌐 ✨',
    optionsCountLabel: 'عجلة تقليب عمودية 3D',
    titleAr: 'اختر لغتك المفضلة لتجربة تسوق ذكية وممتعة مخصصة لك 🌐',
    subtitleAr: 'حرك بإصبعك للأعلى والأسفل لاختيار اللغة ثم اضغط تأكيد ومتابعة',
    isEnabled: true,
    actionButtonText: 'تأكيد ومتابعة >',
    layoutType: 'language_roller',
    options: [
      { id: 'opt_lng_1', num: 1, emoji: '🇸🇦', text: 'العربية', subtext: 'المملكة العربية السعودية' },
      { id: 'opt_lng_2', num: 2, emoji: '🇬🇧', text: 'English', subtext: 'International Experience' },
      { id: 'opt_lng_3', num: 3, emoji: '🇵🇭', text: 'Filipino', subtext: 'Philippines (الفلبين)' },
      { id: 'opt_lng_4', num: 4, emoji: '🌍', text: 'Urdu & More', subtext: 'Multilingual support' }
    ]
  },
  // Stage 2: Connected Screen (تم الربط بنجاح - الشاشة 2)
  {
    id: 'qt_connected_success',
    categoryBadge: '✨ 2. تأكيد الربط الذكي 🟢 ✨',
    optionsCountLabel: 'شاشة تفاعلية ذكية',
    titleAr: 'تم الربط بنجاح! 🟢',
    subtitleAr: 'استعد لتجربة تسوق ذكية وعروض حصرية مصممة خصيصاً لك',
    isEnabled: true,
    actionButtonText: '✨ جاري المتابعة تلقائياً...',
    layoutType: 'connected_screen',
    options: [
      { id: 'opt_con_1', num: 1, emoji: '🛒', text: 'ربط العربة الذكية', subtext: 'مزامنة مباشرة مع سلة المشتريات' },
      { id: 'opt_con_2', num: 2, emoji: '🏷️', text: 'عروض حصرية مخصصة', subtext: 'خصومات فورية على منتجاتك' },
      { id: 'opt_con_3', num: 3, emoji: '🪙', text: 'كاش باك ونقاط فورية', subtext: 'مكافآت مع كل عملية تسوق' }
    ]
  },
  // Stage 3: Daily Shopping Needs & Catalog (الكتالوج والأقسام - الشاشة 3)
  {
    id: 'qt_daily_shopping_needs',
    categoryBadge: '✨ 3. قائمة الأقسام والاحتياجات اليومية 🛍️ ✨',
    optionsCountLabel: 'كتالوج أقسام وبنتو كاردز',
    titleAr: 'اختر احتياجاتك لهذا اليوم ❇️',
    subtitleAr: 'اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة',
    isEnabled: true,
    actionButtonText: '👉 اختر طلبك من قسم "الأجبان والألبان" للمتابعة',
    layoutType: 'product_catalog',
    options: [
      { id: 'opt_dly_1', num: 1, emoji: '🧀', text: 'أجبان بيضاء فاخرة', subtext: 'طازجة يومياً' },
      { id: 'opt_dly_2', num: 2, emoji: '🥛', text: 'حليب كامل الدسم', subtext: 'مزارع محلية' },
      { id: 'opt_dly_3', num: 3, emoji: '🧈', text: 'لبنة تركية طازجة', subtext: 'قريباً Soon' },
      { id: 'opt_dly_4', num: 4, emoji: '🥣', text: 'زبادي يوناني طبيعي', subtext: 'غني بالبروتين' }
    ]
  },
  // Stage 4: Reward Preference (ماذا تفضل؟ المكافآت - الشاشة 4)
  {
    id: 'qt_reward_preference',
    categoryBadge: '✨ 4. تفضيل نوع المكافأة والهدية 🎁 ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'ماذا تفضل؟ اختر مكافأتك المفضلة 🎁',
    subtitleAr: 'من تجربتك نحسن أداءنا وتطوير خدماتنا لكم بصفة مستمرة',
    isEnabled: true,
    actionButtonText: '🎁 تأكيد المكافأة والمتابعة',
    layoutType: 'reward_preference',
    options: [
      { id: 'opt_rwd_1', num: 1, emoji: '🪙', text: 'نقاط في التطبيق', subtext: 'رصيد ولاء دائم +50 نقطة' },
      { id: 'opt_rwd_2', num: 2, emoji: '👛', text: 'كاش باك فوري', subtext: 'استرداد نقدي 10% بالسلة' },
      { id: 'opt_rwd_3', num: 3, emoji: '🏷️', text: 'خصومات حصرية', subtext: 'كوبونات توفير خاصة 15%' },
      { id: 'opt_rwd_4', num: 4, emoji: '🎁', text: 'هدايا وقسائم مجانية', subtext: 'مشتريات وضيافة مجانية' }
    ]
  },
  // Stage 5: Speed Game Challenge (تحدي السرعة - الشاشة 5)
  {
    id: 'qt_speed_game_challenge',
    categoryBadge: '✨ 5. تحدي بنده والسرعة ⚡ ✨',
    optionsCountLabel: 'مستويات التحدي',
    titleAr: 'تحدي بنده السريع: ما مستوى التحدي الذي تفضله؟ ⚡',
    subtitleAr: 'فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية وكاش باك!',
    isEnabled: true,
    actionButtonText: '🎮 ابدأ التحدي (متوسطة) ✨',
    layoutType: 'speed_challenge',
    options: [
      { id: 'opt_spd_1', num: 1, emoji: '🟢', text: 'سهلة (15 ثانية)', subtext: 'قسيمة خصم 10% فورية' },
      { id: 'opt_spd_2', num: 2, emoji: '⚡', text: 'متوسطة (10 ثوانٍ)', subtext: 'قسيمة خصم 15% + نقاط بونص' },
      { id: 'opt_spd_3', num: 3, emoji: '🔥', text: 'صعبة (8 ثوانٍ)', subtext: 'قسيمة مشتريات نقدية 25 ريال' }
    ]
  },
  // Stage 6: Voucher Unlock & Gift (مبروك! لقد ربحت - الشاشتان 6 و 7)
  {
    id: 'qt_voucher_gift',
    categoryBadge: '✨ 6. قسيمة الهدية الفورية 🎟️ ✨',
    optionsCountLabel: 'كوبون وهدية مقفلة',
    titleAr: 'مبروك! لقد ربحت 🎟️ هدية فورية جاهزة في زيارتك',
    subtitleAr: 'أدخل بياناتك لفك قفل قسيمتك واستلام كود الخصم الفوري 10%',
    isEnabled: true,
    actionButtonText: '🎁 استلام كود القسيمة وتأكيد البيانات',
    layoutType: 'voucher_unlock',
    options: [
      { id: 'opt_vch_1', num: 1, emoji: '🎟️', text: 'كود خصم فوري PANDA-WIN-10', subtext: 'خصم 10% على إجمالي الفاتورة' },
      { id: 'opt_vch_2', num: 2, emoji: '🥐', text: 'صالح في قسم المخبوزات والحلويات', subtext: 'ساري لمدة 48 ساعة' },
      { id: 'opt_vch_3', num: 3, emoji: '📱', text: 'إرسال مباشر لهاتفك', subtext: 'حفظ الكود بسهولة واستخدامه فوراً' }
    ]
  },
  // Stage 7: Feedback & Overall Evaluation (كيف كانت تجربتك معنا؟ - الشاشة 8)
  {
    id: 'qt_shopping_overall_eval',
    categoryBadge: '✨ 7. تقييم التجربة الشامل 🌟 ✨',
    optionsCountLabel: 'معايير وتقييم 4',
    titleAr: 'كيف كانت تجربتك معنا اليوم؟ 🌟',
    subtitleAr: 'رأيك يهمنا لتطوير وتحسين خدماتنا وتقديم الأفضل دائماً',
    isEnabled: true,
    actionButtonText: '🚀 إرسال التقييم النهائي فوراً',
    layoutType: 'feedback_rating',
    options: [
      { id: 'opt_shpe_1', num: 1, emoji: '🤩', text: 'رائع جداً', subtext: 'تسوق ممتع وعروض مميزة' },
      { id: 'opt_shpe_2', num: 2, emoji: '😊', text: 'جيد', subtext: 'خدمة سريعة ومنظمة' },
      { id: 'opt_shpe_3', num: 3, emoji: '😐', text: 'عادي', subtext: 'تجربة معتادة' },
      { id: 'opt_shpe_4', num: 4, emoji: '😞', text: 'سيء', subtext: 'واجهت ملاحظات بالفرع' }
    ]
  },
  // Stage 8: Thank You Screen (عميلنا العزيز والمميز - الشاشة 9)
  {
    id: 'qt_thank_you_screen',
    categoryBadge: '✨ 8. شاشة الشكر وتأكيد الهدية 🎉 ✨',
    optionsCountLabel: 'شاشة إتمام التجربة',
    titleAr: 'عميلنا العزيز والمميز 🎉 شكراً لمشاركتك معنا',
    subtitleAr: 'تم تأكيد هديتك وقسيمة الخصم بنجاح، سعدنا جداً بخدمتك!',
    isEnabled: true,
    actionButtonText: 'العودة للرئيسية ↩',
    layoutType: 'thank_you_screen',
    options: [
      { id: 'opt_ty_1', num: 1, emoji: '🎟️', text: 'كود القسيمة: PANDA-WIN-10', subtext: 'جاهز للاستخدام عند الكاشير' },
      { id: 'opt_ty_2', num: 2, emoji: '💚', text: 'تسوق ممتع مع بنده', subtext: 'نسعد دائماً بخدمتكم في كل زيارة' }
    ]
  },

  // Additional Restaurant & Survey Template Library (متاحة للتفعيل أو الاستبدال بضغطة زر)
  {
    id: 'qt_impression_stars',
    categoryBadge: '✨ الانطباع العام والنجوم 🌟 ✨',
    optionsCountLabel: 'بطاقات 4',
    titleAr: 'ما هو انطباعك العام عن زيارتك وتجربتك اليوم؟ 🌟',
    subtitleAr: 'اختر البطاقة التي تعكس مستوى رضاك بدقة لتطوير خدماتنا',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_imp_1', num: 1, emoji: '🤩', text: 'Unforgettable! ✨', subtext: 'خدمة خيالية ونكهات تفوق التوقعات' },
      { id: 'opt_imp_2', num: 2, emoji: '😄', text: 'Great Delight 😄', subtext: 'أطباق لذيذة وضيافة مميزة جداً' },
      { id: 'opt_imp_3', num: 3, emoji: '😐', text: 'It was OK 😐', subtext: 'تجربة مقبولة مع ملاحظات نرجو تحسينها' },
      { id: 'opt_imp_4', num: 4, emoji: '😞', text: 'Disappointing 😞', subtext: 'أقل من المأمول ونتطلع لحل مشكلتك' }
    ]
  },
  {
    id: 'qt_quality_pillars',
    categoryBadge: '✨ معايير الجودة والضيافة ⭐ ✨',
    optionsCountLabel: 'معايير 4',
    titleAr: 'ما هو تقييمك لمعايير الجودة وركائز الضيافة؟',
    subtitleAr: 'انقر لتأكيد مستوى رضاك عن الركائز الأساسية',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_pil_1', num: 1, emoji: '🍽️', text: 'جودة المذاق والطهي', subtext: 'نكهات طازجة ومميزة' },
      { id: 'opt_pil_2', num: 2, emoji: '⚡', text: 'سرعة واحترافية الخدمة', subtext: 'استجابة سريعة للطلب' },
      { id: 'opt_pil_3', num: 3, emoji: '🧼', text: 'نظافة وترتيب الصالة', subtext: 'طاولات معقمة ومريحة' },
      { id: 'opt_pil_4', num: 4, emoji: '🤝', text: 'كرم الضيافة والترحيب', subtext: 'ابتسامة وبشاشة الطاقم' }
    ]
  },
  {
    id: 'qt_signature_dishes',
    categoryBadge: '✨ الأطباق المميزة والمنيو 🍽️ ✨',
    optionsCountLabel: 'أطباق 4',
    titleAr: 'ما هي الأطباق أو المشروبات التي نالت إعجابك اليوم؟',
    subtitleAr: 'اختر الأصناف والوسوم المفضلة لديك من قائمتنا المميزة',
    isEnabled: false,
    actionButtonText: '🍽️ تأكيد اختيارات المنيو',
    options: [
      { id: 'opt_dsh_1', num: 1, emoji: '🍝', text: 'مكرونة الترفل الفاخرة', subtext: 'الأعلى طلباً' },
      { id: 'opt_dsh_2', num: 2, emoji: '🥩', text: 'لحم أنجوس معتق', subtext: 'توقيع الشيف' },
      { id: 'opt_dsh_3', num: 3, emoji: '☕', text: 'إثيوبي V60 قهوة مختصة', subtext: 'محمصة مميزة' },
      { id: 'opt_dsh_4', num: 4, emoji: '🍰', text: 'كيكة التمر بالكراميل', subtext: 'حلى ساخن' }
    ]
  },
  {
    id: 'qt_welcome',
    categoryBadge: '✨ بوابة الترحيب وبدء التجربة 🚪 ✨',
    optionsCountLabel: 'مزايا 4',
    titleAr: 'مرحباً بك في تجربة التسوق والضيافة التفاعلية',
    subtitleAr: 'ابدأ تجربتك واستمتع بعروض حصرية وقسائم فورية مخصصة لك',
    isEnabled: false,
    actionButtonText: '🚀 ابدأ التجربة الآن',
    options: [
      { id: 'opt_wlc_1', num: 1, emoji: '⚡', text: 'تحدي فرقعة الشعارات السريع', subtext: 'جوائز ونقاط فورية' },
      { id: 'opt_wlc_2', num: 2, emoji: '🎁', text: 'قسيمة خصم ترويجية فورية', subtext: 'كود خصم فوري 15%' },
      { id: 'opt_wlc_3', num: 3, emoji: '🛒', text: 'تحديد احتياجاتك وأقسامك', subtext: 'عروض تسوق مخصصة' },
      { id: 'opt_wlc_4', num: 4, emoji: '⭐', text: 'تقييم فوري لتجربتك', subtext: 'رأيك يطور فروعنا' }
    ]
  },
  {
    id: 'qt_hall_cleanliness',
    categoryBadge: '✨ نظافة الصالة والطاولات ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'ما هو تقييمك لمستوى نظافة صالة الطعام والطاولات والترتيب؟',
    subtitleAr: 'انقر لتأكيد مستوى نظافة الطاولات والترتيب العام',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_hall_1', num: 1, emoji: '✨', text: 'نظافة استثنائية وتعقيم فائق' },
      { id: 'opt_hall_2', num: 2, emoji: '👍', text: 'نظيف ومرتب ومهيأ تماماً' },
      { id: 'opt_hall_3', num: 3, emoji: '🧹', text: 'نظافة مقبولة ولكن تحتاج متابعة' },
      { id: 'opt_hall_4', num: 4, emoji: '⚠️', text: 'غير نظيفة وتحتاج عناية فورية' }
    ]
  },
  {
    id: 'qt_ambiance',
    categoryBadge: '✨ أجواء وراحة المكان ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'ما أكثر ما ميز أجواء المكان وراحة الجلسات لديك؟',
    subtitleAr: 'اختر الجانب الأكثر تميزاً في أجواء الصالة',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_amb_1', num: 1, emoji: '🎵', text: 'موسيقى وإضاءة رايقة وهادئة' },
      { id: 'opt_amb_2', num: 2, emoji: '🛋️', text: 'جلسات فاخرة ومريحة جداً' },
      { id: 'opt_amb_3', num: 3, emoji: '✨', text: 'ديكور أنيق وتصميم عصري' },
      { id: 'opt_amb_4', num: 4, emoji: '❄️', text: 'تكييف وجو منعش ومثالي' }
    ]
  },
  {
    id: 'qt_overall_perks',
    categoryBadge: '✨ الانطباع العام والمكافآت ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'كيف كانت تجربتك في مقهى ومطعم العائلة اليوم؟',
    subtitleAr: 'اكتب لنا أي اقتراح أو ملاحظة تسعدنا وتطور خدماتنا',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_ovr_1', num: 1, emoji: '🏛️', text: 'نقاط في التطبيق', subtext: '+نقطة 50' },
      { id: 'opt_ovr_2', num: 2, emoji: '💳', text: 'كاش باك فوري', subtext: '10%' },
      { id: 'opt_ovr_3', num: 3, emoji: '🏷️', text: 'خصومات حصرية', subtext: '15%' },
      { id: 'opt_ovr_4', num: 4, emoji: '🎁', text: 'ضيافة مجانية' }
    ]
  },
  {
    id: 'qt_recommend',
    categoryBadge: '✨ التوصية والولاء ✨',
    optionsCountLabel: 'خيارين',
    titleAr: 'هل ترغب في زيارتنا مجدداً والتوصية بمطعمنا لأحبائك وأصدقائك؟',
    subtitleAr: 'رأيك يهمنا لتطوير وتحسين خدماتنا',
    isEnabled: false,
    actionButtonText: '🚀 إرسال التقييم النهائي',
    options: [
      { id: 'opt_rec_yes', num: 1, emoji: '👍', text: 'نعم، بكل تأكيد' },
      { id: 'opt_rec_no', num: 2, emoji: '👎', text: 'لا، واجهت تقصيراً' }
    ]
  },
  {
    id: 'qt_restrooms',
    categoryBadge: '✨ نظافة دورات المياه ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'كيف وجدت مستوى نظافة وتعقيم دورات المياه وجاهزيتها؟',
    subtitleAr: 'تقييمك المباشر يساعدنا في الحفاظ على أعلى معايير النظافة والتعقيم',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_rest_1', num: 1, emoji: '🧼', text: 'معقمة ونظيفة وذات رائحة عطرة' },
      { id: 'opt_rest_2', num: 2, emoji: '👍', text: 'جاهزة ونظيفة ومرتبة' },
      { id: 'opt_rest_3', num: 3, emoji: '⚠️', text: 'ينقصها بعض المستلزمات', subtext: 'مناديل/صابون' },
      { id: 'opt_rest_4', num: 4, emoji: '🚫', text: 'تحتاج تنظيفاً وتعقيماً فورياً' }
    ]
  },
  {
    id: 'qt_staff_service',
    categoryBadge: '✨ طاقم العمل والخدمة ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'كيف تقيم تعامل وترحيب طاقم الموظفين وسرعة خدمتهم؟',
    subtitleAr: 'اختر الوصف الأقرب لتجربتك مع فريق الخدمة اليوم',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_stf_1', num: 1, emoji: '⚡', text: 'استجابة فائقة السرعة وقمة اللباقة' },
      { id: 'opt_stf_2', num: 2, emoji: '😄', text: 'بشوشين ومرحبين جداً' },
      { id: 'opt_stf_3', num: 3, emoji: '⏱️', text: 'خدمة عادية ومقبولة' },
      { id: 'opt_stf_4', num: 4, emoji: '⚠️', text: 'تأخر ملحوظ في تلبية الطلب' }
    ]
  },
  {
    id: 'qt_supermarket_shelves',
    categoryBadge: '✨ نظافة وترتيب الممرات والأرفف ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'ما رأيك في نظافة وترتيب الممرات والأرفف وتوافر المنتجات؟',
    subtitleAr: 'تقييمك المباشر يعزز تجربة تسوق مريحة وسلسة في جميع الأقسام',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_shv_1', num: 1, emoji: '😍', text: 'ممتاز ومرتب ومنظم جداً', subtext: 'ممرات واسعة وبضائع متوفرة' },
      { id: 'opt_shv_2', num: 2, emoji: '🙂', text: 'جيد ومقبول ومريح', subtext: 'سهولة إيجاد الأصناف' },
      { id: 'opt_shv_3', num: 3, emoji: '😐', text: 'عادي ويحتاج عناية', subtext: 'بعض الأصناف غير مرتبة' },
      { id: 'opt_shv_4', num: 4, emoji: '🙁', text: 'غير مرضي وغير منظم', subtext: 'ازدحام وعدم توفر منتجات' }
    ]
  },
  {
    id: 'qt_cashier_speed',
    categoryBadge: '✨ سرعة الكاشير والخدمة ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'كيف تقيم سرعة المحاسبة عند الكاشير وتعامل موظفي الفروع؟',
    subtitleAr: 'اختر التقييم الأنسب لسرعة إنهاء الحساب ولطافة الكاشير',
    isEnabled: false,
    actionButtonText: '✨ تأكيد ومتابعة',
    options: [
      { id: 'opt_csh_1', num: 1, emoji: '⚡', text: 'ممتاز وفائق السرعة وبشوش', subtext: 'إنجاز فوري بدون انتظار' },
      { id: 'opt_csh_2', num: 2, emoji: '😄', text: 'جيد ولبق ومحترف', subtext: 'تعامل محترم وسريع' },
      { id: 'opt_csh_3', num: 3, emoji: '😐', text: 'عادي ووقت انتظار متوسط', subtext: 'طابور كاشير معتاد' },
      { id: 'opt_csh_4', num: 4, emoji: '⚠️', text: 'بطيء وتأخير ملحوظ', subtext: 'ازدحام ونقص بالمسارات' }
    ]
  },
  {
    id: 'qt_destination_type',
    categoryBadge: '✨ تخصيص التجربة والنشاط ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'اختر نوع نشاط زيارتك اليوم لتخصيص الاستبيان والمنتجات',
    subtitleAr: 'سيتم تكييف المنتجات والأسئلة بالكامل حسب نوع نشاطك المختار',
    isEnabled: false,
    actionButtonText: '✨ متابعة حسب النشاط المختار',
    options: [
      { id: 'opt_dst_1', num: 1, emoji: '🛒', text: 'سوبر ماركت وتموين', subtext: 'أقسام غذائية وسرعة كاشير' },
      { id: 'opt_dst_2', num: 2, emoji: '☕', text: 'كافيه ومقهى مختص', subtext: 'هدوء وجلسات وبشاشة الباريستا' },
      { id: 'opt_dst_3', num: 3, emoji: '🍽️', text: 'مطعم ومأكولات فاخرة', subtext: 'أطباق شهية ولطافة طاقم العمل' },
      { id: 'opt_dst_4', num: 4, emoji: '📦', text: 'طلبات وتوصيل سريع', subtext: 'تجهيز فوري وسرعة تسليم' }
    ]
  },
  {
    id: 'qt_rewards_club_points',
    categoryBadge: '✨ نادي مكافآت ونقاط الولاء ✨',
    optionsCountLabel: 'خيارات 4',
    titleAr: 'كيف تود الاستفادة من رصيد نقاطك المتاحة (1,250 نقطة)؟',
    subtitleAr: 'اجمع نقاطاً مع كل عملية شراء واستبدلها بقسائم نقدية وخصومات فورية',
    isEnabled: false,
    actionButtonText: '💳 عرض نقاطي ومكافآتي',
    options: [
      { id: 'opt_clb_1', num: 1, emoji: '💵', text: '500 نقطة = 5 ريال خصم', subtext: 'خصم مباشر عند الدفع' },
      { id: 'opt_clb_2', num: 2, emoji: '🎁', text: '1000 نقطة = 10 ريال', subtext: 'قسيمة مشتريات نقدية' },
      { id: 'opt_clb_3', num: 3, emoji: '🏆', text: '2500 نقطة = 50 ريال', subtext: 'مضاعفة النقاط 2x' },
      { id: 'opt_clb_4', num: 4, emoji: '📱', text: 'تحويل النقاط للمحفظة', subtext: 'رصيد شراء دائم' }
    ]
  },
  {
    id: 'qt_quick_tags',
    categoryBadge: '✨ وسوم الانطباع السريع 🏷️ ✨',
    optionsCountLabel: 'وسوم 4',
    titleAr: 'اختر الوسوم التي تصف زيارتك وتجربتك اليوم بلمسة واحدة',
    subtitleAr: 'حدد كل ما ينطبق على زيارتك لنعزز النقاط الإيجابية ونعالج أي ملاحظة',
    isEnabled: false,
    actionButtonText: '🏷️ تأكيد الوسوم المختارة',
    options: [
      { id: 'opt_tag_1', num: 1, emoji: '🏷️', text: 'عروض وخصومات ممتازة', subtext: 'أسعار موفرة ومنافسة' },
      { id: 'opt_tag_2', num: 2, emoji: '🌿', text: 'بضائع ومنتجات طازجة', subtext: 'جودة عالية وتنوع كبير' },
      { id: 'opt_tag_3', num: 3, emoji: '⚡', text: 'خدمة راقية وسريعة', subtext: 'محاسبة دون انتظار' },
      { id: 'opt_tag_4', num: 4, emoji: '🏢', text: 'فرع نظيف وواسع ومرتب', subtext: 'ممرات واسعة ومريحة' }
    ]
  }
];

export const DEFAULT_MENU_ITEMS: SurveyMenuItem[] = [
  {
    id: 'm1',
    nameAr: 'مكرونة الترفل الفاخرة',
    nameEn: 'Luxury Truffle Pasta',
    price: '88',
    tag: 'الأعلى طلباً',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm2',
    nameAr: 'لحم أنجوس معتق',
    nameEn: 'Aged Angus Steak',
    price: '145',
    tag: 'توقيع الشيف',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm3',
    nameAr: 'إثيوبي V60 قهوة',
    nameEn: 'Ethiopian V60 Coffee',
    price: '26',
    tag: 'محمصة مختصة',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm4',
    nameAr: 'كيكة التمر بالكراميل',
    nameEn: 'Caramel Date Cake',
    price: '38',
    tag: 'حلى ساخن',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80'
  }
];

export const DEFAULT_EVALUATION_PILLARS: EvaluationPillarItem[] = [
  {
    id: 'p1',
    key: 'food',
    titleAr: 'جودة الطعام ونكهة الأطباق',
    titleEn: 'Food Quality & Flavor'
  },
  {
    id: 'p2',
    key: 'service',
    titleAr: 'سرعة ولباقة طاقم الضيافة',
    titleEn: 'Service Speed & Courtesy'
  },
  {
    id: 'p3',
    key: 'ambiance',
    titleAr: 'نظافة المكان والديكور والأجواء',
    titleEn: 'Atmosphere & Cleanliness'
  },
  {
    id: 'p4',
    key: 'welcome',
    titleAr: 'حفاوة الاستقبال والترحيب',
    titleEn: 'Hospitality & Warm Welcome'
  }
];

export const DEFAULT_QUICK_TAGS: QuickTagItem[] = [
  { id: 't1', emoji: '😋', textAr: 'الأطباق ساخنة ولذيذة', textEn: 'Delicious & Hot Dishes' },
  { id: 't2', emoji: '⚡', textAr: 'الخدمة فائقة السرعة', textEn: 'Super Fast Service' },
  { id: 't3', emoji: '🎶', textAr: 'الأجواء راقية ومريحة', textEn: 'Cozy & Refined Vibe' },
  { id: 't4', emoji: '👏', textAr: 'طاقم العمل بشوش وودود', textEn: 'Friendly & Welcoming' },
  { id: 't5', emoji: '🧼', textAr: 'المكان نظيف ومرتب', textEn: 'Clean & Spotless' },
  { id: 't6', emoji: '💰', textAr: 'الأسعار مناسبة ومنافسة', textEn: 'Fair & Worth Value' }
];

export const DEFAULT_LOYALTY_PRIZES: LoyaltyPrizeItem[] = [
  {
    id: 'pz1',
    pointsBadge: 'نقطة ولاء 75+',
    titleAr: 'حلى تيراميسو فاخر مجاناً في زيارتك القادمة 🍰',
    titleEn: 'Complimentary Tiramisu on your next visit 🍰'
  },
  {
    id: 'pz2',
    pointsBadge: 'نقطة ولاء 50+',
    titleAr: 'كوب قهوة مختصة مجاناً مع أي طلب ☕',
    titleEn: 'Free Specialty Coffee with any order ☕'
  },
  {
    id: 'pz3',
    pointsBadge: 'نقطة ولاء 100+',
    titleAr: 'خصم فوري 15% على فاتورتك القادمة 🎟️',
    titleEn: '15% Instant Discount Coupon 🎟️'
  },
  {
    id: 'pz4',
    pointsBadge: 'نقطة ولاء 80+',
    titleAr: 'مقبلات ديناميت شرمب مجانية 🍤',
    titleEn: 'Free Dynamite Shrimp Appetizer 🍤'
  }
];

export const DEFAULT_IDENTITY_SETTINGS: SurveyIdentitySettings = {
  logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80',
  coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
  restaurantNameAr: 'مطعم ومقهى السفير • عالم من المزايا',
  restaurantNameEn: 'Al Safeer Restaurant & Cafe • World of Perks',
  overallQuestionAr: 'ما هو انطباعك العام عن زيارتك اليوم؟ 🌟',
  overallQuestionEn: 'How was your overall experience today? 🌟'
};

export const THEME_PRESETS: Record<string, SurveyThemeConfig> = {
  espresso_cafe: {
    preset: 'espresso_cafe',
    primaryColor: '#78350F', // Amber 900 / Warm Espresso
    accentColor: '#D97706', // Amber 600
    backgroundColor: '#FAF5EE',
    cardBackgroundColor: '#FFFFFF',
    textColor: '#29180C',
    subtextColor: '#786C65',
    fontFamily: 'Cairo, sans-serif'
  },
  luxury_dark: {
    preset: 'luxury_dark',
    primaryColor: '#F59E0B', // Gold Amber
    accentColor: '#10B981',
    backgroundColor: '#0F172A', // Slate 900
    cardBackgroundColor: '#1E293B', // Slate 800
    textColor: '#F8FAFC',
    subtextColor: '#94A3B8',
    fontFamily: 'Cairo, sans-serif'
  },
  vibrant_light: {
    preset: 'vibrant_light',
    primaryColor: '#E11D48', // Rose 600
    accentColor: '#F97316', // Orange 500
    backgroundColor: '#FFF5F5',
    cardBackgroundColor: '#FFFFFF',
    textColor: '#1E293B',
    subtextColor: '#64748B',
    fontFamily: 'Cairo, sans-serif'
  },
  emerald_oasis: {
    preset: 'emerald_oasis',
    primaryColor: '#005A2B', // Emerald Green
    accentColor: '#10B981',
    backgroundColor: '#F0FDF4',
    cardBackgroundColor: '#FFFFFF',
    textColor: '#064E3B',
    subtextColor: '#047857',
    fontFamily: 'Cairo, sans-serif'
  },
  royal_amber: {
    preset: 'royal_amber',
    primaryColor: '#B45309',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
    cardBackgroundColor: '#FFFFFF',
    textColor: '#451A03',
    subtextColor: '#78350F',
    fontFamily: 'Cairo, sans-serif'
  }
};

export const DEFAULT_SURVEY_QUESTIONS: SurveyQuestionModel[] = [
  {
    id: 'q_food_quality',
    type: 'stars_5',
    titleAr: 'كيف تقيم جودة ومذاق الأطباق والمشروبات؟',
    titleEn: 'How would you rate food & drink quality?',
    subtitleAr: 'طازجة، ساخنة، وبنفس الطعم المتوقع',
    subtitleEn: 'Fresh, delicious and cooked to perfection',
    isRequired: true,
    isEnabled: true,
    category: 'food_quality'
  },
  {
    id: 'q_service_speed',
    type: 'stars_5',
    titleAr: 'ما مدى رضاك عن سرعة استلام الطلب وتجاوب الطاقم؟',
    titleEn: 'How satisfied are you with service speed & staff?',
    subtitleAr: 'من وقت الجلوس حتى تقديم الطلب بابتسامة',
    subtitleEn: 'Attentive, friendly and prompt assistance',
    isRequired: true,
    isEnabled: true,
    category: 'service_speed'
  },
  {
    id: 'q_cleanliness',
    type: 'stars_5',
    titleAr: 'مستوى نظافة الطاولة والأجواء العامة بالمكان',
    titleEn: 'Table cleanliness and venue ambiance',
    subtitleAr: 'الترتيب، الإضاءة، والموسيقى الهادئة',
    subtitleEn: 'Tidiness, atmosphere, and music volume',
    isRequired: true,
    isEnabled: true,
    category: 'cleanliness'
  },
  {
    id: 'q_visit_time',
    type: 'single_choice',
    titleAr: 'ما هو توقيت ونوع زيارتك اليوم؟',
    titleEn: 'What was your visit time & type today?',
    isRequired: false,
    isEnabled: true,
    category: 'custom',
    options: [
      { id: 'opt_breakfast', labelAr: 'إفطار صباحي رايق ☀️', labelEn: 'Morning Breakfast', icon: '🍳' },
      { id: 'opt_lunch', labelAr: 'غداء عمل أو عائلة 🍽️', labelEn: 'Lunch & Family', icon: '🥩' },
      { id: 'opt_coffee', labelAr: 'قهوة وحلى العصرية ☕', labelEn: 'Afternoon Coffee & Sweets', icon: '🍰' },
      { id: 'opt_dinner', labelAr: 'عشاء مسائي هادئ 🌙', labelEn: 'Evening Dinner', icon: '🍕' }
    ]
  },
  {
    id: 'q_favorite_dish',
    type: 'multi_choice',
    titleAr: 'ما أكثر ما نال إعجابك في قائمتنا اليوم؟',
    titleEn: 'What did you enjoy most from our menu?',
    isRequired: false,
    isEnabled: true,
    category: 'custom',
    options: [
      { id: 'fav_coffee', labelAr: 'القهوة المختصة والـ V60 ☕', labelEn: 'Specialty Coffee', icon: '☕' },
      { id: 'fav_dessert', labelAr: 'الحلويات والمخبوزات الطازجة 🥐', labelEn: 'Pastries & Desserts', icon: '🥐' },
      { id: 'fav_signature', labelAr: 'طبق الشيف المميز (Signature) 🌟', labelEn: 'Chef Signature Dish', icon: '⭐' },
      { id: 'fav_beverages', labelAr: 'الموهيتو والعصائر المنعشة 🍹', labelEn: 'Refreshing Drinks', icon: '🍹' }
    ]
  },
  {
    id: 'q_nps',
    type: 'nps_10',
    titleAr: 'ما مدى احتمالية ترشيحك لمطعمنا/مقهانا لأصدقائك وزملائك؟',
    titleEn: 'How likely are you to recommend us to friends?',
    subtitleAr: 'مؤشر صافي الترويج (0 = مستبعد تماماً | 10 = أوصي به بكل ثقة)',
    subtitleEn: 'Net Promoter Score (0 = Unlikely | 10 = Extremely Likely)',
    isRequired: true,
    isEnabled: true,
    category: 'overall',
    lowScoreLabelAr: 'غير محتمل أبداً (0)',
    highScoreLabelAr: 'بالتأكيد سأرشحه (10)'
  },
  {
    id: 'q_text_comment',
    type: 'text_feedback',
    titleAr: 'رأيك يهمنا، هل لديك أي اقتراح أو ملاحظة لفريقنا؟',
    titleEn: 'Any suggestions or feedback for our team?',
    subtitleAr: 'نقرأ كل رسالة ونهتم بأدق التفاصيل لتطوير تجربتك',
    subtitleEn: 'We read every note carefully to elevate your visit',
    isRequired: false,
    isEnabled: true,
    category: 'custom'
  }
];

export const DEFAULT_TABLES = [
  { id: 'tbl_01', tableNumber: '01', sectionName: 'الصالة الداخلية', active: true },
  { id: 'tbl_02', tableNumber: '02', sectionName: 'الصالة الداخلية', active: true },
  { id: 'tbl_03', tableNumber: '03', sectionName: 'الصالة الداخلية', active: true },
  { id: 'tbl_04', tableNumber: '04', sectionName: 'التيراس الخارجي', active: true },
  { id: 'tbl_05', tableNumber: '05', sectionName: 'التيراس الخارجي', active: true },
  { id: 'tbl_06', tableNumber: 'VIP-1', sectionName: 'الصالون الخاص (VIP)', active: true },
  { id: 'tbl_07', tableNumber: 'VIP-2', sectionName: 'الصالون الخاص (VIP)', active: true },
  { id: 'tbl_08', tableNumber: 'BAR-01', sectionName: 'طاولة البار والمشروبات', active: true }
];

export const DEFAULT_SURVEY_SETTINGS: SurveyCustomizerSettings = {
  branding: {
    restaurantName: 'مطعم ومقهى السفير • عالم من المزايا',
    restaurantNameEn: 'Al Safeer Restaurant & Cafe • World of Perks',
    branchName: 'فرع التحلية - جدة',
    branchNameEn: 'Tahlia Branch - Jeddah',
    logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80',
    coverBannerUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    welcomeTitle: 'يسعدنا وجودك معنا اليوم! ☕✨',
    welcomeSubtitle: 'رأيك يصنع الفرق، شاركنا تقييمك خلال دقيقة واحصل على قسيمة قهوة مجانية لزيارتك القادمة.',
    thankYouTitle: 'شكراً جزيلاً لوقتك وتقييمك الثمين! ❤️',
    thankYouSubtitle: 'تم حفظ إجاباتك بنجاح، ويسرنا تقديم كود الخصم الفوري لزيارتك القادمة.',
    googleMapsReviewUrl: 'https://maps.google.com/?cid=1234567890',
    enableGoogleMapsRedirectOn5Star: true,
    rewardVoucherText: 'كود الخصم الحصري: GUEST15 (خصم 15% على إجمالي فاتورتك القادمة)',
    requireGuestPhone: false
  },
  theme: THEME_PRESETS.espresso_cafe,
  questions: DEFAULT_SURVEY_QUESTIONS,
  tables: DEFAULT_TABLES,
  impressionCards: DEFAULT_IMPRESSION_CARDS,
  questionTemplates: DEFAULT_QUESTION_TEMPLATES,
  menuItems: DEFAULT_MENU_ITEMS,
  evaluationPillars: DEFAULT_EVALUATION_PILLARS,
  quickTags: DEFAULT_QUICK_TAGS,
  loyaltyPrizes: DEFAULT_LOYALTY_PRIZES,
  identitySettings: DEFAULT_IDENTITY_SETTINGS,
  screenOrder: DEFAULT_QUESTION_TEMPLATES.filter(t => t.isEnabled).map(t => t.id)
};

export const INITIAL_MOCK_RESPONSES: SurveyResponseRecord[] = [
  {
    id: 'resp_01',
    timestamp: 'منذ 15 دقيقة',
    createdAt: Date.now() - 15 * 60 * 1000,
    tableNumber: '04',
    branchName: 'فرع التحلية - جدة',
    guestName: 'سلطان الشمري',
    guestPhone: '0558912344',
    overallStars: 5,
    npsScore: 10,
    answers: {
      q_food_quality: 5,
      q_service_speed: 5,
      q_cleanliness: 5,
      q_visit_time: 'opt_coffee',
      q_favorite_dish: ['fav_coffee', 'fav_dessert'],
      q_nps: 10,
      q_text_comment: 'أفضل كيمكس وتيراميسو ذقته في جدة! الخدمة سريعة جداً وطاقم العمل قمة في اللباقة.'
    },
    comment: 'أفضل كيمكس وتيراميسو ذقته في جدة! الخدمة سريعة جداً وطاقم العمل قمة في اللباقة.',
    sentiment: 'positive',
    sentimentKeywords: ['تيراميسو ممتاز', 'خدمة سريعة', 'لباقة الموظفين', 'قهوة خرافية'],
    isFlaggedNegative: false,
    resolved: true
  },
  {
    id: 'resp_02',
    timestamp: 'منذ 40 دقيقة',
    createdAt: Date.now() - 40 * 60 * 1000,
    tableNumber: '02',
    branchName: 'فرع التحلية - جدة',
    guestName: 'منى القحطاني',
    guestPhone: '0501122334',
    overallStars: 2,
    npsScore: 3,
    answers: {
      q_food_quality: 3,
      q_service_speed: 1,
      q_cleanliness: 4,
      q_visit_time: 'opt_dinner',
      q_favorite_dish: ['fav_signature'],
      q_nps: 3,
      q_text_comment: 'تأخر الطبق الرئيسي أكثر من 35 دقيقة وجاء بارد بعض الشيء، نتمنى الاهتمام بسرعة التقديم.'
    },
    comment: 'تأخر الطبق الرئيسي أكثر من 35 دقيقة وجاء بارد بعض الشيء، نتمنى الاهتمام بسرعة التقديم.',
    sentiment: 'negative',
    sentimentKeywords: ['تأخر الطلب', 'طبق بارد', 'بطء الخدمة'],
    isFlaggedNegative: true,
    resolved: false
  },
  {
    id: 'resp_03',
    timestamp: 'منذ ساعتين',
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    tableNumber: 'VIP-1',
    branchName: 'فرع التحلية - جدة',
    guestName: 'د. خالد الزهراني',
    guestPhone: '0543322119',
    overallStars: 5,
    npsScore: 10,
    answers: {
      q_food_quality: 5,
      q_service_speed: 5,
      q_cleanliness: 5,
      q_visit_time: 'opt_lunch',
      q_favorite_dish: ['fav_signature', 'fav_beverages'],
      q_nps: 10,
      q_text_comment: 'تجربة فاخرة وهدوء ممتاز لعقد اجتماعات العمل، نظافة المكان ملفتة للنظر.'
    },
    comment: 'تجربة فاخرة وهدوء ممتاز لعقد اجتماعات العمل، نظافة المكان ملفتة للنظر.',
    sentiment: 'positive',
    sentimentKeywords: ['تجربة فاخرة', 'هدوء ممتاز', 'نظافة ملفتة'],
    isFlaggedNegative: false,
    resolved: true
  },
  {
    id: 'resp_04',
    timestamp: 'منذ 3 ساعات',
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    tableNumber: '05',
    branchName: 'فرع التحلية - جدة',
    guestName: 'ريما العتيبي',
    guestPhone: '0567788990',
    overallStars: 4,
    npsScore: 8,
    answers: {
      q_food_quality: 4,
      q_service_speed: 4,
      q_cleanliness: 4,
      q_visit_time: 'opt_coffee',
      q_favorite_dish: ['fav_dessert'],
      q_nps: 8,
      q_text_comment: 'الأجواء لطيفة والموسيقى هادئة، الفرنش توست لذيذ وسأكرر الزيارة بالتأكيد.'
    },
    comment: 'الأجواء لطيفة والموسيقى هادئة، الفرنش توست لذيذ وسأكرر الزيارة بالتأكيد.',
    sentiment: 'positive',
    sentimentKeywords: ['فرنش توست لذيذ', 'موسيقى هادئة', 'أجواء لطيفة'],
    isFlaggedNegative: false,
    resolved: true
  },
  {
    id: 'resp_05',
    timestamp: 'منذ 5 ساعات',
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
    tableNumber: 'BAR-01',
    branchName: 'فرع التحلية - جدة',
    guestName: 'طارق عبد العزيز',
    guestPhone: '0594455667',
    overallStars: 3,
    npsScore: 6,
    answers: {
      q_food_quality: 4,
      q_service_speed: 3,
      q_cleanliness: 3,
      q_visit_time: 'opt_coffee',
      q_favorite_dish: ['fav_coffee'],
      q_nps: 6,
      q_text_comment: 'القهوة ممتازة ولكن تكييف الصالة كان بارداً جداً ومزعج.'
    },
    comment: 'القهوة ممتازة ولكن تكييف الصالة كان بارداً جداً ومزعج.',
    sentiment: 'neutral',
    sentimentKeywords: ['مكيف بارد جداً', 'قهوة ممتازة'],
    isFlaggedNegative: false,
    resolved: true
  }
];

export async function generateTableQRCode(tableNumber: string, branchName: string): Promise<string> {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guest-survey.app';
    const targetUrl = `${origin}/?mode=guest_survey&table=${encodeURIComponent(tableNumber)}&branch=${encodeURIComponent(branchName)}`;
    return await QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#1E293B',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}

export function getStoredSurveySettings(): SurveyCustomizerSettings {
  try {
    const data = localStorage.getItem('guest_survey_customizer_settings');
    if (data) {
      const parsed = JSON.parse(data);

      // Legacy ID normalization map
      const LEGACY_ID_MAP: Record<string, string> = {
        impression: 'qt_impression_stars',
        pillars: 'qt_quality_pillars',
        dishes: 'qt_signature_dishes',
        prizes: 'qt_voucher_gift',
        template_qt_impression_stars: 'qt_impression_stars',
        template_qt_quality_pillars: 'qt_quality_pillars',
        template_qt_signature_dishes: 'qt_signature_dishes',
        template_qt_voucher_gift: 'qt_voucher_gift'
      };

      // Screen order strictly adheres to CORE_JOURNEY_PREVIEW_IDS
      const CORE_SET = new Set(CORE_JOURNEY_PREVIEW_IDS);
      let normalizedScreenOrder = [...CORE_JOURNEY_PREVIEW_IDS];
      if (Array.isArray(parsed.screenOrder) && parsed.screenOrder.length > 0) {
        const filteredOrder = parsed.screenOrder
          .map((id: string) => LEGACY_ID_MAP[id] || id)
          .filter((id: string) => CORE_SET.has(id));
        if (filteredOrder.length > 0) {
          // Keep the order, append missing core journey ids
          const missing = CORE_JOURNEY_PREVIEW_IDS.filter(id => !filteredOrder.includes(id));
          normalizedScreenOrder = [...filteredOrder, ...missing];
        }
      }

      // Ensure all templates from DEFAULT_QUESTION_TEMPLATES are present
      let mergedTemplates = DEFAULT_QUESTION_TEMPLATES;
      if (parsed.questionTemplates && parsed.questionTemplates.length > 0) {
        const existingIds = new Set(parsed.questionTemplates.map((t: QuestionTemplateItem) => t.id));
        const missingDefaults = DEFAULT_QUESTION_TEMPLATES.filter(dt => !existingIds.has(dt.id));
        
        mergedTemplates = [...parsed.questionTemplates, ...missingDefaults].map(t => {
          // Strictly: ONLY templates in CORE_JOURNEY_PREVIEW_IDS can be enabled in customer experience
          const isCoreJourney = CORE_SET.has(t.id);
          const isEnabled = isCoreJourney && (normalizedScreenOrder.includes(t.id) ? true : false);

          if (t.id === 'qt_language_preference') {
            return { ...t, layoutType: 'language_roller' as const, isEnabled };
          }
          if (t.id === 'qt_connected_success') {
            return { ...t, layoutType: 'connected_screen' as const, isEnabled };
          }
          if (t.id === 'qt_speed_game_challenge') {
            return { ...t, layoutType: 'speed_challenge' as const, isEnabled };
          }
          if (t.id === 'qt_daily_shopping_needs') {
            return { ...t, layoutType: 'product_catalog' as const, isEnabled };
          }
          if (t.id === 'qt_reward_preference') {
            return { ...t, layoutType: 'reward_preference' as const, isEnabled };
          }
          if (t.id === 'qt_voucher_gift') {
            return { ...t, layoutType: 'voucher_unlock' as const, isEnabled };
          }
          if (t.id === 'qt_shopping_overall_eval') {
            return { ...t, layoutType: 'feedback_rating' as const, isEnabled };
          }
          if (t.id === 'qt_thank_you_screen') {
            return { ...t, layoutType: 'thank_you_screen' as const, isEnabled };
          }
          // Any other template that is not in the live customer journey MUST be disabled and placed in the library below
          return { ...t, isEnabled: false };
        });

        // Ensure all 8 core templates are sorted in active list according to normalizedScreenOrder
        const activeCore = normalizedScreenOrder
          .map(id => mergedTemplates.find(t => t.id === id))
          .filter((t): t is QuestionTemplateItem => Boolean(t))
          .map(t => ({ ...t, isEnabled: true }));
        const inactiveRest = mergedTemplates
          .filter(t => !CORE_SET.has(t.id))
          .map(t => ({ ...t, isEnabled: false }));

        mergedTemplates = [...activeCore, ...inactiveRest];
      }

      return {
        ...DEFAULT_SURVEY_SETTINGS,
        ...parsed,
        branding: { ...DEFAULT_SURVEY_SETTINGS.branding, ...(parsed.branding || {}) },
        theme: { ...DEFAULT_SURVEY_SETTINGS.theme, ...(parsed.theme || {}) },
        impressionCards: parsed.impressionCards && parsed.impressionCards.length > 0 ? parsed.impressionCards : DEFAULT_IMPRESSION_CARDS,
        questionTemplates: mergedTemplates,
        screenOrder: normalizedScreenOrder,
        menuItems: parsed.menuItems && parsed.menuItems.length > 0 ? parsed.menuItems : DEFAULT_MENU_ITEMS,
        evaluationPillars: parsed.evaluationPillars && parsed.evaluationPillars.length > 0 ? parsed.evaluationPillars : DEFAULT_EVALUATION_PILLARS,
        quickTags: parsed.quickTags && parsed.quickTags.length > 0 ? parsed.quickTags : DEFAULT_QUICK_TAGS,
        loyaltyPrizes: parsed.loyaltyPrizes && parsed.loyaltyPrizes.length > 0 ? parsed.loyaltyPrizes : DEFAULT_LOYALTY_PRIZES,
        identitySettings: parsed.identitySettings ? parsed.identitySettings : DEFAULT_IDENTITY_SETTINGS
      };
    }
  } catch {}
  return DEFAULT_SURVEY_SETTINGS;
}

export function saveStoredSurveySettings(settings: SurveyCustomizerSettings) {
  try {
    localStorage.setItem('guest_survey_customizer_settings', JSON.stringify(settings));
  } catch {}
}

export function getStoredSurveyResponses(): SurveyResponseRecord[] {
  try {
    const data = localStorage.getItem('guest_survey_responses');
    if (data) {
      return JSON.parse(data);
    }
  } catch {}
  return INITIAL_MOCK_RESPONSES;
}

export function saveStoredSurveyResponses(responses: SurveyResponseRecord[]) {
  try {
    localStorage.setItem('guest_survey_responses', JSON.stringify(responses));
  } catch {}
}
