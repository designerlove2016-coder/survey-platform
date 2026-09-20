import { LanguageItem, LanguageTranslations } from '../types';

export const ALLOWED_LANG_CODES = ['ar', 'en', 'hi', 'ur', 'am', 'fr', 'tl'] as const;

const RAW_DEFAULT_LANGUAGES: LanguageItem[] = [
  {
    "code": "ar",
    "countryCode": "SA",
    "name": "العربية",
    "englishName": "Arabic",
    "nativeSublabel": "العربية • المملكة العربية السعودية",
    "flag": "🇸🇦",
    "dir": "rtl",
    "isDefault": true,
    "isActive": true,
    "translations": {
      "brandTitle": "بنده معك تفرق",
      "brandSubtitle": "عالم من المزايا",
      "experienceNo": "تجربة رقم #01",
      "adminDashboard": "لوحة التحكم",
      "honorBoard": "لوحة الشرف",
      "changeLogoText": "اضغط لتغيير الشعار",
      "backBtn": "رجوع",
      "welcomeBadge": "مرحباً بك في أسواق بنده",
      "chooseLanguageTitle": "اختر لغتك المفضلة",
      "chooseLanguageSubtitle": "لتجربة تسوق ذكية وممتعة مخصصة لك",
      "scrollHint": "حرك بإصبعك لأعلى ولأسفل ثم اضغط تأكيد",
      "confirmAndContinue": "تأكيد ومتابعة",
      "connectedTitle": "تم الربط!",
      "connectedSubtitle": "استعد لتجربة تسوق ذكية مع بنده",
      "whatDoYouPreferTitle": "ماذا تفضل؟",
      "preferenceSubtitle": "من تجربتك نحسن أداءنا وتطوير خدماتنا لكم",
      "prefPoints": "نقاط في التطبيق",
      "prefCashback": "كاش باك",
      "prefDiscounts": "خصومات حصرية",
      "selectOptionToContinue": "اختر خياراً للمتابعة",
      "myChoicesBtn": "اختياراتي",
      "shoppingTitle": "اختر احتياجاتك لهذا اليوم",
      "shoppingSubtitle": "اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.",
      "favDepartment": "قسمك المفضل:",
      "deptVeg": "خضار وفواكه",
      "deptFood": "مواد غذائية",
      "deptCheese": "الأجبان والألبان",
      "deptClean": "أدوات نظافة",
      "itemSelected": "تم التحديد ✓",
      "itemSelecting": "جارِ التحديد...",
      "selectAtLeastOne": "اختر منتجاً واحداً على الأقل",
      "challengeTitle": "تحدي بنده السريع",
      "challengeDesc": "فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية!",
      "difficultyLevel": "مستوى الصعوبة:",
      "diffEasy": "سهلة",
      "diffEasyDesc": "سرعة هادئة ومريحة لجمع النقاط بدون قنابل",
      "diffMedium": "متوسطة",
      "diffMediumDesc": "سرعة معتدلة مع شعارات ذهبية بونص",
      "diffHard": "صعبة",
      "diffHardDesc": "سرعة فائقة مع ظهور قنابل فلفل حارسة",
      "seconds": "ثوانٍ",
      "startChallengeBtn": "ابدأ التحدي",
      "gameScore": "النقاط",
      "timeRemaining": "الوقت المتبقي",
      "levelLabel": "المستوى:",
      "avoidBombs": "💣 تجنّب الفلفل والقنابل",
      "bombDeduct": "-2 نقطة",
      "bonusPoints": "+2 بونص ✨",
      "bonusPointsHard": "+3 بونص ✨",
      "timeUpTitle": "انتهى الوقت!",
      "totalScoreLabel": "مجموع نقاطك:",
      "saveScorePrompt": "سجّل نتيجتك في لوحة شرف بنده!",
      "enterNamePlaceholder": "اكتب اسمك هنا...",
      "saveBtn": "حفظ",
      "scoreSavedSuccess": "تم حفظ نتيجتك في لوحة الشرف! 🏆",
      "claimVoucherGift": "استلام القسيمة والهدية",
      "playAgain": "إعادة التحدي",
      "congratsWon": "مبروك! لقد ربحت",
      "voucherSubheading": "هدية فورية تقديراً لمشاركتك في تحدي بنده",
      "exclusiveVoucher": "قسيمة خصم بنده الحصرية ✨",
      "instantDiscount": "خصم فوري",
      "onWholeCart": "على كامل سلتك",
      "validInSection": "صالح في قسم:",
      "validFor48h": "صالح لمدة 48 ساعة ⏳",
      "enterDetailsPrompt": "أدخل بياناتك لاستلام القسيمة فوراً",
      "fullNamePlaceholder": "الاسم بالكامل",
      "emailPlaceholder": "البريد الإلكتروني (example@domain.com)",
      "phonePlaceholder": "رقم الجوال (05xxxxxxxx)",
      "claimGiftNow": "استلام الهدية الآن",
      "feedbackTitle": "كيف كانت تجربتك معنا اليوم؟",
      "ratingGreat": "رائع جداً",
      "ratingGood": "جيد",
      "ratingNormal": "عادي",
      "ratingBad": "سيء",
      "ratingVeryBad": "سيء جداً",
      "submitFinalFeedback": "إرسال التقييم النهائي",
      "thankYouHeading": "شكراً لك على مشاركتك في تطوير خدماتنا",
      "funShoppingPanda": "تسوق ممتع مع بنده لاتفوت",
      "alwaysHappyServe": "نسعد دائماً بخدمتك في كل زيارة!",
      "backToHome": "العودة للرئيسية",
      "leaderboardModalTitle": "لوحة الشرف والمتصدرين",
      "leaderboardSubtitle": "أفضل المتسابقين في تحدي بنده الذكي",
      "rankCol": "المركز",
      "playerCol": "المتسابق",
      "scoreCol": "النقاط",
      "difficultyCol": "المستوى",
      "closeBtn": "إغلاق",
      "prefGift": "هدايا وقسائم مجانية",
      "selectedBadge": "تم الاختيار",
      "chooseThisOffer": "اختر هذا العرض",
      "confirmPreferenceBtn": "تأكيد التفضيل والمتابعة",
      "tapToSelect": "اضغط للاختيار",
      "favItemBadge": "منتج مفضل ⭐",
      "selectedCountLabel": "منتجات مختارة",
      "voucherLockedTitle": "قسيمة الهدية مقفلة 🔐",
      "voucherLockedInstruction": "أدخل بياناتك بالأسفل (الاسم ورقم الجوال) لفك القفل واستلام القسيمة فوراً!",
      "voucherUnlockedTitle": "تم فك قفل قسيمتك بنجاح! 🎁✨",
      "nameLabel": "الاسم",
      "phoneLabel": "الجوال",
      "phoneWarningText": "رقم الجوال يجب أن يبدأ بـ 5 ويتكون من 9 أرقام",
      "completeFieldsToUnlock": "أكمل البيانات أعلاه لفك قفل القسيمة",
      "feedbackSubtitleText": "رأيك يهمنا لتطوير وتحسين خدماتنا",
      "dearCustomerBadge": "عميلنا العزيز والمميز",
      "voucherConfirmedNotice": "تم تأكيد هديتك وقسيمة الخصم بنجاح 🎁✨",
      "thankYouPersonalized": "شكراً لك يا {name}! سعدنا جداً بمشاركتك معنا",
      "timeMetricLabel": "الزمن",
      "rewardMetricLabel": "المكافأة",
      "rewardDiscountVal": "خصم 10%",
      "qualifiedForVoucherBanner": "تأهلت للحصول على قسيمة الخصم الفورية! 🎁",
      "perfLegendary": "أداء أسطوري استثنائي 🚀",
      "perfHero": "بطل السرعة والتركيز ⚡",
      "perfGreat": "مشاركة رائعة ومميزة 🌟",
      "perfGood": "محاولة مشجعة ومميزة 🎯",
      "breadSection": "المخبوزات والحلويات 🥐",
      "customerPreviewTitle": "وضع معاينة تجربة العميل (Customer Preview)",
      "returnToDashboard": "العودة للوحة التحكم ↩"
    }
  },
  {
    "code": "en",
    "countryCode": "GB",
    "name": "English",
    "englishName": "English",
    "nativeSublabel": "English • International",
    "flag": "🇬🇧",
    "dir": "ltr",
    "isActive": true,
    "translations": {
      "brandTitle": "Panda Makes the Difference",
      "brandSubtitle": "A World of Benefits",
      "experienceNo": "Experience #01",
      "adminDashboard": "Admin Dashboard",
      "honorBoard": "Leaderboard",
      "changeLogoText": "Click to change logo",
      "backBtn": "Back",
      "welcomeBadge": "Welcome to Panda Stores",
      "chooseLanguageTitle": "Choose Your Language",
      "chooseLanguageSubtitle": "For a personalized and delightful shopping journey",
      "scrollHint": "Swipe up or down, then press confirm",
      "confirmAndContinue": "Confirm & Continue",
      "connectedTitle": "Connected!",
      "connectedSubtitle": "Get ready for a smart shopping experience with Panda",
      "whatDoYouPreferTitle": "What Do You Prefer?",
      "preferenceSubtitle": "Your choices help us tailor our services just for you",
      "prefPoints": "App Points",
      "prefCashback": "Cashback",
      "prefDiscounts": "Exclusive Discounts",
      "selectOptionToContinue": "Select an option to continue",
      "myChoicesBtn": "My Choices",
      "shoppingTitle": "Select Your Essentials for Today",
      "shoppingSubtitle": "Tap items you plan to buy to analyze your customized offers.",
      "favDepartment": "Favorite Department:",
      "deptVeg": "Fruits & Vegetables",
      "deptFood": "Groceries & Foods",
      "deptCheese": "Dairy & Cheeses",
      "deptClean": "Cleaning & Care",
      "itemSelected": "Selected ✓",
      "itemSelecting": "Selecting...",
      "selectAtLeastOne": "Select at least one product",
      "challengeTitle": "Panda Speed Challenge",
      "challengeDesc": "Pop Panda logos and earn points to win instant discount vouchers!",
      "difficultyLevel": "Difficulty Level:",
      "diffEasy": "Easy",
      "diffEasyDesc": "Gentle pace to collect points safely without bombs",
      "diffMedium": "Medium",
      "diffMediumDesc": "Balanced speed with shiny golden bonus logos",
      "diffHard": "Hard",
      "diffHardDesc": "Lightning fast with tricky chili bomb traps",
      "seconds": "seconds",
      "startChallengeBtn": "Start Challenge",
      "gameScore": "Score",
      "timeRemaining": "Time Left",
      "levelLabel": "Level:",
      "avoidBombs": "💣 Avoid bombs and chili",
      "bombDeduct": "-2 pts",
      "bonusPoints": "+2 Bonus ✨",
      "bonusPointsHard": "+3 Bonus ✨",
      "timeUpTitle": "Time's Up!",
      "totalScoreLabel": "Your Total Score:",
      "saveScorePrompt": "Save your score to the Panda Leaderboard!",
      "enterNamePlaceholder": "Type your name here...",
      "saveBtn": "Save",
      "scoreSavedSuccess": "Score saved to Leaderboard! 🏆",
      "claimVoucherGift": "Claim Voucher & Gift",
      "playAgain": "Play Again",
      "congratsWon": "Congratulations! You Won",
      "voucherSubheading": "Instant reward for participating in the Panda Challenge",
      "exclusiveVoucher": "Exclusive Panda Discount Voucher ✨",
      "instantDiscount": "Instant Discount",
      "onWholeCart": "on your entire basket",
      "validInSection": "Valid in section:",
      "validFor48h": "Valid for 48 hours ⏳",
      "enterDetailsPrompt": "Enter your details to receive your voucher immediately",
      "fullNamePlaceholder": "Full Name",
      "emailPlaceholder": "Email (example@domain.com)",
      "phonePlaceholder": "Mobile Number (05xxxxxxxx)",
      "claimGiftNow": "Claim Gift Now",
      "feedbackTitle": "How was your experience with us today?",
      "ratingGreat": "Amazing",
      "ratingGood": "Good",
      "ratingNormal": "Average",
      "ratingBad": "Poor",
      "ratingVeryBad": "Very Poor",
      "submitFinalFeedback": "Submit Final Feedback",
      "thankYouHeading": "Thank you for helping us improve our services",
      "funShoppingPanda": "Always enjoy shopping at Panda",
      "alwaysHappyServe": "We are delighted to serve you on every visit!",
      "backToHome": "Back to Home",
      "leaderboardModalTitle": "Leaderboard & Top Players",
      "leaderboardSubtitle": "Top scorers in Panda Smart Challenge",
      "rankCol": "Rank",
      "playerCol": "Player",
      "scoreCol": "Score",
      "difficultyCol": "Level",
      "closeBtn": "Close",
      "prefGift": "Free Gifts & Vouchers",
      "selectedBadge": "Selected",
      "chooseThisOffer": "Choose this offer",
      "confirmPreferenceBtn": "Confirm preference & continue",
      "tapToSelect": "Tap to select",
      "favItemBadge": "Favorite Item ⭐",
      "selectedCountLabel": "items selected",
      "voucherLockedTitle": "Gift Voucher Locked 🔐",
      "voucherLockedInstruction": "Enter your details below (name and mobile) to unlock and receive your voucher immediately!",
      "voucherUnlockedTitle": "Your voucher is unlocked successfully! 🎁✨",
      "nameLabel": "Name",
      "phoneLabel": "Mobile",
      "phoneWarningText": "Mobile number must start with 5 and be 9 digits",
      "completeFieldsToUnlock": "Complete details above to unlock voucher",
      "feedbackSubtitleText": "Your feedback helps us develop and improve our services",
      "dearCustomerBadge": "Our Valued & Special Customer",
      "voucherConfirmedNotice": "Your gift and discount voucher have been confirmed! 🎁✨",
      "thankYouPersonalized": "Thank you, {name}! We loved having you join us",
      "timeMetricLabel": "Time",
      "rewardMetricLabel": "Reward",
      "rewardDiscountVal": "10% Discount",
      "qualifiedForVoucherBanner": "Qualified for the instant discount voucher! 🎁",
      "perfLegendary": "Exceptional legendary performance 🚀",
      "perfHero": "Speed and focus champion ⚡",
      "perfGreat": "Wonderful and special participation 🌟",
      "perfGood": "Encouraging and great effort 🎯",
      "breadSection": "Bakery & Sweets 🥐",
      "customerPreviewTitle": "Customer Experience Preview Mode",
      "returnToDashboard": "Return to Dashboard ↩"
    }
  },
  {
    "code": "hi",
    "countryCode": "IN",
    "name": "हिन्दी",
    "englishName": "Hindi",
    "nativeSublabel": "हिन्दी • الهند (India)",
    "flag": "🇮🇳",
    "dir": "ltr",
    "isActive": true,
    "translations": {
      "brandTitle": "पांडा के साथ खास अनुभव",
      "brandSubtitle": "असीमित लाभों की दुनिया",
      "experienceNo": "अनुभव #01",
      "adminDashboard": "डैशबोर्ड",
      "honorBoard": "लीडरबोर्ड",
      "changeLogoText": "लोगो बदलें",
      "backBtn": "वापस",
      "welcomeBadge": "पांडा स्टोर्स में आपका स्वागत है",
      "chooseLanguageTitle": "अपनी पसंदीदा भाषा चुनें",
      "chooseLanguageSubtitle": "स्मार्ट और व्यक्तिगत खरीदारी अनुभव के लिए",
      "scrollHint": "ऊपर या नीचे स्वाइप करें और पुष्टि करें",
      "confirmAndContinue": "पुष्टि करें और आगे बढ़ें",
      "connectedTitle": "सफलतापूर्वक जुड़ा!",
      "connectedSubtitle": "पांडा के साथ स्मार्ट शॉपिंग के लिए तैयार हो जाइए",
      "whatDoYouPreferTitle": "आप क्या पसंद करते हैं?",
      "preferenceSubtitle": "आपकी पसंद से हम अपनी सेवा बेहतर बनाते हैं",
      "prefPoints": "ऐप पॉइंट्स",
      "prefCashback": "कैशबैक",
      "prefDiscounts": "विशेष छूट",
      "selectOptionToContinue": "जारी रखने के लिए एक विकल्प चुनें",
      "myChoicesBtn": "मेरी पसंद",
      "shoppingTitle": "आज की अपनी जरूरतें चुनें",
      "shoppingSubtitle": "अनुकूलित ऑफ़र का विश्लेषण करने के लिए उत्पादों पर टैप करें।",
      "favDepartment": "पसंदीदा विभाग:",
      "deptVeg": "फल और सब्जियां",
      "deptFood": "किराना और खाद्य",
      "deptCheese": "डेयरी और पनीर",
      "deptClean": "सफाई उत्पाद",
      "itemSelected": "चयनित ✓",
      "itemSelecting": "चयन जारी...",
      "selectAtLeastOne": "कम से कम एक उत्पाद चुनें",
      "challengeTitle": "पांडा स्पीड चैलेंज",
      "challengeDesc": "पांडा लोगो फोड़ें और त्वरित छूट वाउचर जीतें!",
      "difficultyLevel": "कठिनाई स्तर:",
      "diffEasy": "सरल",
      "diffEasyDesc": "बिना बम के शांत गति",
      "diffMedium": "मध्यम",
      "diffMediumDesc": "गोल्डन बोनस लोगो के साथ संतुलित गति",
      "diffHard": "कठिन",
      "diffHardDesc": "तीव्र गति और मिर्च बम जाल",
      "seconds": "सेकंड",
      "startChallengeBtn": "चुनौती शुरू करें",
      "gameScore": "अंक",
      "timeRemaining": "शेष समय",
      "levelLabel": "स्तर:",
      "avoidBombs": "💣 बम और मिर्च से बचें",
      "bombDeduct": "-2 अंक",
      "bonusPoints": "+2 बोनस ✨",
      "bonusPointsHard": "+3 बोनस ✨",
      "timeUpTitle": "समय समाप्त!",
      "totalScoreLabel": "आपका कुल स्कोर:",
      "saveScorePrompt": "अपना स्कोर पांडा लीडरबोर्ड में सुरक्षित करें!",
      "enterNamePlaceholder": "अपना नाम यहाँ लिखें...",
      "saveBtn": "सुरक्षित करें",
      "scoreSavedSuccess": "स्कोर लीडरबोर्ड में सहेजा गया! 🏆",
      "claimVoucherGift": "वाउचर और उपहार प्राप्त करें",
      "playAgain": "फिर से खेलें",
      "congratsWon": "बधाई हो! आप जीत गए",
      "voucherSubheading": "पांडा चैलेंज में भाग लेने के लिए तत्काल उपहार",
      "exclusiveVoucher": "विशेष पांडा डिस्काउंट वाउचर ✨",
      "instantDiscount": "त्वरित छूट",
      "onWholeCart": "आपकी पूरी टोकरी पर",
      "validInSection": "इस विभाग में मान्य:",
      "validFor48h": "48 घंटे के लिए मान्य ⏳",
      "enterDetailsPrompt": "वाउचर प्राप्त करने के लिए अपना विवरण दर्ज करें",
      "fullNamePlaceholder": "पूरा नाम",
      "emailPlaceholder": "ईमेल (example@domain.com)",
      "phonePlaceholder": "मोबाइल नंबर (05xxxxxxxx)",
      "claimGiftNow": "अभी उपहार प्राप्त करें",
      "feedbackTitle": "आज हमारे साथ आपका अनुभव कैसा रहा?",
      "ratingGreat": "उत्कृष्ट",
      "ratingGood": "अच्छा",
      "ratingNormal": "सामान्य",
      "ratingBad": "खराब",
      "ratingVeryBad": "बहुत खराब",
      "submitFinalFeedback": "अंतिम प्रतिक्रिया भेजें",
      "thankYouHeading": "सेवाओं को बेहतर बनाने में मदद के लिए धन्यवाद",
      "funShoppingPanda": "पांडा के साथ हमेशा मजेदार खरीदारी",
      "alwaysHappyServe": "हर यात्रा में आपकी सेवा करने में हमें खुशी है!",
      "backToHome": "होमपेज पर लौटें",
      "leaderboardModalTitle": "लीडरबोर्ड और शीर्ष खिलाड़ी",
      "leaderboardSubtitle": "पांडा स्मार्ट चैलेंज के शीर्ष स्कोरर",
      "rankCol": "रैंक",
      "playerCol": "खिलाड़ी",
      "scoreCol": "स्कोर",
      "difficultyCol": "स्तर",
      "closeBtn": "बंद करें",
      "prefGift": "मुफ्त उपहार और वाउचर",
      "selectedBadge": "चयनित",
      "chooseThisOffer": "यह ऑफ़र चुनें",
      "confirmPreferenceBtn": "पसंद की पुष्टि करें और आगे बढ़ें",
      "tapToSelect": "चुनने के लिए टैप करें",
      "favItemBadge": "पसंदीदा उत्पाद ⭐",
      "selectedCountLabel": "उत्पाद चयनित",
      "voucherLockedTitle": "उपहार वाउचर लॉक है 🔐",
      "voucherLockedInstruction": "अनलॉक करने और वाउचर तुरंत प्राप्त करने के लिए नीचे अपना विवरण (नाम और मोबाइल) दर्ज करें!",
      "voucherUnlockedTitle": "आपका वाउचर सफलतापूर्वक अनलॉक हो गया! 🎁✨",
      "nameLabel": "नाम",
      "phoneLabel": "मोबाइल",
      "phoneWarningText": "मोबाइल नंबर 5 से शुरू होना चाहिए और 9 अंकों का होना चाहिए",
      "completeFieldsToUnlock": "वाउचर अनलॉक करने के लिए ऊपर विवरण पूरा करें",
      "feedbackSubtitleText": "हमारी सेवाओं को बेहतर बनाने के लिए आपकी राय महत्वपूर्ण है",
      "dearCustomerBadge": "हमारे सम्मानित और विशेष ग्राहक",
      "voucherConfirmedNotice": "आपका उपहार और छूट वाउचर सफलतापूर्वक पुष्ट हो गया! 🎁✨",
      "thankYouPersonalized": "धन्यवाद {name}! हमारे साथ जुड़ने के लिए हमें बहुत खुशी हुई",
      "timeMetricLabel": "समय",
      "rewardMetricLabel": "पुरस्कार",
      "rewardDiscountVal": "10% छूट",
      "qualifiedForVoucherBanner": "आप त्वरित छूट वाउचर के पात्र हैं! 🎁",
      "perfLegendary": "शानदार और उत्कृष्ट प्रदर्शन 🚀",
      "perfHero": "गति और एकाग्रता के चैंपियन ⚡",
      "perfGreat": "अद्भुत और विशेष भागीदारी 🌟",
      "perfGood": "सराहनीय और उत्साहजनक प्रयास 🎯",
      "breadSection": "बेकरी और मिठाई 🥐",
      "customerPreviewTitle": "ग्राहक अनुभव पूर्वावलोकन मोड",
      "returnToDashboard": "डैशबोर्ड पर वापस जाएं ↩"
    }
  },
  {
    "code": "ur",
    "countryCode": "PK",
    "name": "اردو",
    "englishName": "Urdu",
    "nativeSublabel": "اردو • باكستان (Pakistan)",
    "flag": "🇵🇰",
    "dir": "rtl",
    "isActive": true,
    "translations": {
      "brandTitle": "پانڈا کے ساتھ فرق محسوس کریں",
      "brandSubtitle": "فوائد کی ایک نئی دنیا",
      "experienceNo": "تجربہ نمبر #01",
      "adminDashboard": "ڈیش بورڈ",
      "honorBoard": "اعزازی بورڈ",
      "changeLogoText": "لوگو تبدیل کریں",
      "backBtn": "واپس",
      "welcomeBadge": "پانڈا اسٹورز میں خوش آمدید",
      "chooseLanguageTitle": "اپنی پسندیدہ زبان منتخب کریں",
      "chooseLanguageSubtitle": "اپنے شاپنگ کے تجربے کو شاندار اور آسان بنائیں",
      "scrollHint": "اوپر یا نیچے سکرول کریں اور تصدیق دبائیں",
      "confirmAndContinue": "تصدیق اور جاری رکھیں",
      "connectedTitle": "کامیابی سے منسلک!",
      "connectedSubtitle": "پانڈا کے ساتھ سمارٹ شاپنگ کے لیے تیار ہو جائیں",
      "whatDoYouPreferTitle": "آپ کیا ترجیح دیتے ہیں؟",
      "preferenceSubtitle": "آپ کے انتخاب سے ہم اپنی خدمات کو مزید بہتر بناتے ہیں",
      "prefPoints": "ایپ پوائنٹس",
      "prefCashback": "کیش بیک",
      "prefDiscounts": "خصوصی رعایت",
      "selectOptionToContinue": "جاری رکھنے کے لیے ایک آپشن منتخب کریں",
      "myChoicesBtn": "میرے انتخاب",
      "shoppingTitle": "آج کی اپنی ضروریات منتخب کریں",
      "shoppingSubtitle": "مخصوص پیشکشوں کے تجزیے کے لیے مصنوعات پر کلک کریں۔",
      "favDepartment": "آپ کا پسندیدہ شعبہ:",
      "deptVeg": "سبزیاں اور پھل",
      "deptFood": "غذائی اشیاء",
      "deptCheese": "ڈیری اور پنیر",
      "deptClean": "صفائی کا سامان",
      "itemSelected": "منتخب شدہ ✓",
      "itemSelecting": "انتخاب جاری ہے...",
      "selectAtLeastOne": "کم از کم ایک پروڈکٹ منتخب کریں",
      "challengeTitle": "پانڈا اسپیڈ چیلنج",
      "challengeDesc": "پانڈا لوگو کو پوپ کریں اور فوری ڈسکاؤنٹ واؤچر جیتیں!",
      "difficultyLevel": "مشکل کی سطح:",
      "diffEasy": "آسان",
      "diffEasyDesc": "بغیر بم کے آرام دہ رفتار",
      "diffMedium": "درمیانہ",
      "diffMediumDesc": "سنہری بونس لوگو کے ساتھ متوازن رفتار",
      "diffHard": "مشکل",
      "diffHardDesc": "تیز رفتار اور مرچ بم جال",
      "seconds": "سیکنڈ",
      "startChallengeBtn": "چیلنج شروع کریں",
      "gameScore": "اسکور",
      "timeRemaining": "باقی وقت",
      "levelLabel": "لیول:",
      "avoidBombs": "💣 بم اور مرچوں سے بچیں",
      "bombDeduct": "-2 پوائنٹس",
      "bonusPoints": "+2 بونس ✨",
      "bonusPointsHard": "+3 بونس ✨",
      "timeUpTitle": "وقت ختم ہو گیا!",
      "totalScoreLabel": "آپ کا کل اسکور:",
      "saveScorePrompt": "اپنا اسکور پانڈا آنر بورڈ میں محفوظ کریں!",
      "enterNamePlaceholder": "اپنا نام یہاں لکھیں...",
      "saveBtn": "محفوظ کریں",
      "scoreSavedSuccess": "اسکور آنر بورڈ میں محفوظ ہو گیا! 🏆",
      "claimVoucherGift": "واؤچر اور تحفہ وصول کریں",
      "playAgain": "دوبارہ کھیلیں",
      "congratsWon": "مبارک ہو! آپ جیت گئے",
      "voucherSubheading": "پانڈا چیلنج میں شرکت پر فوری انعام",
      "exclusiveVoucher": "خصوصی پانڈا ڈسکاؤنٹ واؤچر ✨",
      "instantDiscount": "فوری رعایت",
      "onWholeCart": "آپ کی پوری ٹوکری پر",
      "validInSection": "اس شعبے میں کارآمد:",
      "validFor48h": "48 گھنٹے کے لیے کارآمد ⏳",
      "enterDetailsPrompt": "واؤچر حاصل کرنے کے لیے اپنی معلومات درج کریں",
      "fullNamePlaceholder": "مکمل نام",
      "emailPlaceholder": "ای میل (example@domain.com)",
      "phonePlaceholder": "موبائل نمبر (05xxxxxxxx)",
      "claimGiftNow": "ابھی تحفہ حاصل کریں",
      "feedbackTitle": "آج ہمارے ساتھ آپ کا تجربہ کیسا رہا؟",
      "ratingGreat": "بہت بہترین",
      "ratingGood": "اچھا",
      "ratingNormal": "عام",
      "ratingBad": "برا",
      "ratingVeryBad": "بہت برا",
      "submitFinalFeedback": "حتمی رائے جمع کروائیں",
      "thankYouHeading": "ہماری خدمات کو بہتر بنانے میں مدد کا شکریہ",
      "funShoppingPanda": "پانڈا کے ساتھ خریداری ہمیشہ لطف اندوز رہے گی",
      "alwaysHappyServe": "ہر وزٹ پر آپ کی خدمت کرنا ہمارے لیے باعث فخر ہے!",
      "backToHome": "ہوم پیج پر واپس جائیں",
      "leaderboardModalTitle": "اعزازی بورڈ اور ٹاپ پلیئرز",
      "leaderboardSubtitle": "پانڈا سمارٹ چیلنج کے بہترین کھلاڑی",
      "rankCol": "درجہ",
      "playerCol": "کھلاڑی",
      "scoreCol": "اسکور",
      "difficultyCol": "لیول",
      "closeBtn": "بند کریں",
      "prefGift": "مفت تحائف اور واؤچرز",
      "selectedBadge": "منتخب",
      "chooseThisOffer": "یہ پیشکش منتخب کریں",
      "confirmPreferenceBtn": "ترجیح کی تصدیق کریں اور جاری رکھیں",
      "tapToSelect": "منتخب کرنے کے لیے دبائیں",
      "favItemBadge": "پسندیدہ پروڈکٹ ⭐",
      "selectedCountLabel": "مصنوعات منتخب",
      "voucherLockedTitle": "گفٹ واؤچر مقفل ہے 🔐",
      "voucherLockedInstruction": "انلاک کرنے اور فوری واؤچر حاصل کرنے کے لیے نیچے اپنی تفصیلات (نام اور موبائل) درج کریں!",
      "voucherUnlockedTitle": "آپ کا واؤچر کامیابی کے ساتھ انلاک ہو گیا! 🎁✨",
      "nameLabel": "نام",
      "phoneLabel": "موبائل",
      "phoneWarningText": "موبائل نمبر 5 سے شروع ہونا چاہیے اور 9 ہندسوں پر مشتمل ہونا چاہیے",
      "completeFieldsToUnlock": "واؤچر انلاک کرنے کے لیے اوپر تفصیلات مکمل کریں",
      "feedbackSubtitleText": "ہماری خدمات کو بہتر بنانے کے لیے آپ کی رائے اہم ہے",
      "dearCustomerBadge": "ہمارے معزز اور خاص گاہک",
      "voucherConfirmedNotice": "آپ کا تحفہ اور ڈسکاؤنٹ واؤچر تصدیق ہو گیا! 🎁✨",
      "thankYouPersonalized": "شکریہ {name}! ہمارے ساتھ شامل ہونے پر ہمیں خوشی ہوئی",
      "timeMetricLabel": "وقت",
      "rewardMetricLabel": "انعام",
      "rewardDiscountVal": "10% رعایت",
      "qualifiedForVoucherBanner": "آپ فوری ڈسکاؤنٹ واؤچر کے اہل ہیں! 🎁",
      "perfLegendary": "شاندار اور بے مثال کارکردگی 🚀",
      "perfHero": "رفتار اور توجہ کے چیمپئن ⚡",
      "perfGreat": "شاندار اور خصوصی شرکت 🌟",
      "perfGood": "حوصلہ افزا اور عمدہ کوشش 🎯",
      "breadSection": "بیکری اور مٹھائیاں 🥐",
      "customerPreviewTitle": "کسٹمر تجربہ پیش منظر موڈ",
      "returnToDashboard": "ڈیش بورڈ پر واپس جائیں ↩"
    }
  },
  {
    "code": "am",
    "countryCode": "ET",
    "name": "አማርኛ",
    "englishName": "Amharic",
    "nativeSublabel": "አማርኛ • إثيوبيا (Ethiopia)",
    "flag": "🇪🇹",
    "dir": "ltr",
    "isActive": true,
    "translations": {
      "brandTitle": "ከፓንዳ ጋር ልዩነት አለ",
      "brandSubtitle": "የጥቅማጥቅሞች ዓለም",
      "experienceNo": "ልምድ #01",
      "adminDashboard": "ዳሽቦርድ",
      "honorBoard": "የክብር ሰሌዳ",
      "changeLogoText": "አርማ ለመቀየር ይጫኑ",
      "backBtn": "ተመለስ",
      "welcomeBadge": "ወደ ፓንዳ መደብሮች እንኳን በደህና መጡ",
      "chooseLanguageTitle": "ተመራጭ ቋንቋዎን ይምረጡ",
      "chooseLanguageSubtitle": "ለዘመናዊ እና ግላዊ የገበያ ልምድ",
      "scrollHint": "ወደ ላይ ወይም ወደ ታች ያንሸራትቱ እና አረጋግጥን ይጫኑ",
      "confirmAndContinue": "አረጋግጥ እና ቀጥል",
      "connectedTitle": "በተሳካ ሁኔታ ተገናኝቷል!",
      "connectedSubtitle": "ከፓንዳ ጋር ለዘመናዊ ግብይት ይዘጋጁ",
      "whatDoYouPreferTitle": "ምን ይመርጣሉ?",
      "preferenceSubtitle": "የእርስዎ ምርጫ አገልግሎታችንን ለማሻሻል ይረዳናል",
      "prefPoints": "የመተግበሪያ ነጥቦች",
      "prefCashback": "የገንዘብ ተመላሽ (Cashback)",
      "prefDiscounts": "ልዩ ቅናሾች",
      "selectOptionToContinue": "ለመቀጠል አንዱን ይምረጡ",
      "myChoicesBtn": "የእኔ ምርጫዎች",
      "shoppingTitle": "የዛሬ ፍላጎቶችዎን ይምረጡ",
      "shoppingSubtitle": "ልዩ ቅናሾችን ለመተንተን እቃዎችን ይጫኑ።",
      "favDepartment": "ተመራጭ ክፍል:",
      "deptVeg": "አትክልትና ፍራፍሬ",
      "deptFood": "የምግብ ሸቀጦች",
      "deptCheese": "የወተት እና አይብ ምርቶች",
      "deptClean": "የጽዳት እቃዎች",
      "itemSelected": "ተመርጧል ✓",
      "itemSelecting": "በመምረጥ ላይ...",
      "selectAtLeastOne": "ቢያንስ አንድ ምርት ይምረጡ",
      "challengeTitle": "የፓንዳ ፈጣን ውድድር",
      "challengeDesc": "የፓንዳ አርማዎችን በመንካት ነጥቦችን ሰብስበው የቅናሽ ኩፖን ያሸንፉ!",
      "difficultyLevel": "የከበደበት ደረጃ:",
      "diffEasy": "ቀላል",
      "diffEasyDesc": "ያለ ቦምብ የተረጋጋ ፍጥነት",
      "diffMedium": "መካከለኛ",
      "diffMediumDesc": "ከወርቃማ ቦነስ አርማዎች ጋር",
      "diffHard": "ከባድ",
      "diffHardDesc": "ፈጣን ፍጥነት እና የቃሪያ ቦምቦች",
      "seconds": "ሰከንዶች",
      "startChallengeBtn": "ውድድሩን ጀምር",
      "gameScore": "ነጥብ",
      "timeRemaining": "የቀረው ጊዜ",
      "levelLabel": "ደረጃ:",
      "avoidBombs": "💣 ቦምቦችን እና ቃሪያዎችን ያስወግዱ",
      "bombDeduct": "-2 ነጥብ",
      "bonusPoints": "+2 ቦነስ ✨",
      "bonusPointsHard": "+3 ቦነስ ✨",
      "timeUpTitle": "ጊዜው አልቋል!",
      "totalScoreLabel": "አጠቃላይ ነጥብዎ:",
      "saveScorePrompt": "ነጥብዎን በፓንዳ የክብር ሰሌዳ ላይ ይመዝግቡ!",
      "enterNamePlaceholder": "ስምዎን እዚህ ይፃፉ...",
      "saveBtn": "አስቀምጥ",
      "scoreSavedSuccess": "ውጤትዎ በክብር ሰሌዳው ላይ ተመዝግቧል! 🏆",
      "claimVoucherGift": "ኩፖን እና ስጦታ ተቀበል",
      "playAgain": "እንደገና ተጫወት",
      "congratsWon": "እንኳን ደስ አለዎት! አሸንፈዋል",
      "voucherSubheading": "በውድድሩ ስለተሳተፉ የተዘጋጀ ፈጣን ስጦታ",
      "exclusiveVoucher": "ልዩ የፓንዳ ቅናሽ ኩፖን ✨",
      "instantDiscount": "ፈጣን ቅናሽ",
      "onWholeCart": "በሙሉ ግዢዎ ላይ",
      "validInSection": "የሚሰራበት ክፍል:",
      "validFor48h": "ለ 48 ሰዓታት የሚሰራ ⏳",
      "enterDetailsPrompt": "ኩፖኑን ለመቀበል መረጃዎን ያስገቡ",
      "fullNamePlaceholder": "ሙሉ ስም",
      "emailPlaceholder": "ኢሜይል (example@domain.com)",
      "phonePlaceholder": "ስልክ ቁጥር (05xxxxxxxx)",
      "claimGiftNow": "ስጦታውን አሁን ተቀበል",
      "feedbackTitle": "የዛሬው ቆይታዎ እንዴት ነበር?",
      "ratingGreat": "በጣም ምርጥ",
      "ratingGood": "ጥሩ",
      "ratingNormal": "መካከለኛ",
      "ratingBad": "መጥፎ",
      "ratingVeryBad": "በጣም መጥፎ",
      "submitFinalFeedback": "አስተያየትን ላክ",
      "thankYouHeading": "አገልግሎታችንን ለማሻሻል ስለረዱን እናመሰግናለን",
      "funShoppingPanda": "ከፓንዳ ጋር ሁልጊዜ አስደሳች ግብይት",
      "alwaysHappyServe": "በእያንዳንዱ ጉብኝትዎ እርስዎን በማገልገላችን ደስተኞች ነን!",
      "backToHome": "ወደ መነሻ ገጽ ተመለስ",
      "leaderboardModalTitle": "የክብር ሰሌዳ እና ከፍተኛ ተጫዋቾች",
      "leaderboardSubtitle": "የፓንዳ ስማርት ውድድር ከፍተኛ ውጤት ያስመዘገቡ",
      "rankCol": "ደረጃ",
      "playerCol": "ተጫዋች",
      "scoreCol": "ነጥብ",
      "difficultyCol": "ደረጃ",
      "closeBtn": "ዝጋ",
      "prefGift": "ነፃ ስጦታዎች እና ኩፖኖች",
      "selectedBadge": "ተመርጧል",
      "chooseThisOffer": "ይህንን ቅናሽ ይምረጡ",
      "confirmPreferenceBtn": "ምርጫን አረጋግጥ እና ቀጥል",
      "tapToSelect": "ለመምረጥ ይጫኑ",
      "favItemBadge": "ተወዳጅ ዕቃ ⭐",
      "selectedCountLabel": "ዕቃዎች ተመርጠዋል",
      "voucherLockedTitle": "የስጦታ ኩፖኑ ተቆልፏል 🔐",
      "voucherLockedInstruction": "መቆለፊያውን ለመክፈት እና ኩፖንዎን ወዲያውኑ ለመቀበል ዝርዝርዎን ከታች ያስገቡ!",
      "voucherUnlockedTitle": "ኩፖንዎ በተሳካ ሁኔታ ተከፍቷል! 🎁✨",
      "nameLabel": "ስም",
      "phoneLabel": "ሞባይል",
      "phoneWarningText": "የሞባይል ቁጥሩ በ 5 መጀመር አለበት እና 9 አሃዞች መሆን አለበት",
      "completeFieldsToUnlock": "ኩፖኑን ለመክፈት ከላይ ያሉትን ዝርዝሮች ያሟሉ",
      "feedbackSubtitleText": "አገልግሎታችንን ለማሻሻል የእርስዎ አስተያየት አስፈላጊ ነው",
      "dearCustomerBadge": "የተከበሩ እና ልዩ ደንበኛችን",
      "voucherConfirmedNotice": "የስጦታዎ እና የቅናሽ ኩፖንዎ በተሳካ ሁኔታ ተረጋግጧል! 🎁✨",
      "thankYouPersonalized": "አመሰግናለሁ {name}! ከእኛ ጋር ስለተቀላቀሉ በጣም ደስ ብሎናል",
      "timeMetricLabel": "ጊዜ",
      "rewardMetricLabel": "ሽልማት",
      "rewardDiscountVal": "10% ቅናሽ",
      "qualifiedForVoucherBanner": "ለፈጣን የቅናሽ ኩፖን ብቁ ሆነዋል! 🎁",
      "perfLegendary": "አስደናቂ እና ልዩ አፈፃፀም 🚀",
      "perfHero": "የፍጥነት እና የትኩረት ሻምፒዮን ⚡",
      "perfGreat": "ድንቅ እና ልዩ ተሳትፎ 🌟",
      "perfGood": "አበረታች እና ጥሩ ጥረት 🎯",
      "breadSection": "ዳቦ እና ጣፋጮች 🥐",
      "customerPreviewTitle": "የደንበኛ ተሞክሮ ቅድመ-እይታ ሁነታ",
      "returnToDashboard": "ወደ ዳሽቦርድ ተመለስ ↩"
    }
  },
  {
    "code": "fr",
    "countryCode": "FR",
    "name": "Français",
    "englishName": "French",
    "nativeSublabel": "Français • فرنسا (France)",
    "flag": "🇫🇷",
    "dir": "ltr",
    "isActive": true,
    "translations": {
      "brandTitle": "Panda fait la différence",
      "brandSubtitle": "Un monde d’avantages",
      "experienceNo": "Expérience #01",
      "adminDashboard": "Tableau de bord",
      "honorBoard": "Tableau d’honneur",
      "changeLogoText": "Changer le logo",
      "backBtn": "Retour",
      "welcomeBadge": "Bienvenue chez Panda Stores",
      "chooseLanguageTitle": "Choisissez votre langue",
      "chooseLanguageSubtitle": "Pour une expérience shopping intelligente et sur-mesure",
      "scrollHint": "Faites glisser vers le haut ou le bas, puis confirmez",
      "confirmAndContinue": "Confirmer et continuer",
      "connectedTitle": "Connecté !",
      "connectedSubtitle": "Préparez-vous à une expérience shopping intelligente",
      "whatDoYouPreferTitle": "Que préférez-vous ?",
      "preferenceSubtitle": "Vos choix nous aident à perfectionner nos services",
      "prefPoints": "Points fidélité",
      "prefCashback": "Cashback",
      "prefDiscounts": "Remises exclusives",
      "selectOptionToContinue": "Sélectionnez une option pour continuer",
      "myChoicesBtn": "Mes choix",
      "shoppingTitle": "Sélectionnez vos besoins du jour",
      "shoppingSubtitle": "Touchez les articles pour analyser vos offres personnalisées.",
      "favDepartment": "Rayon préféré :",
      "deptVeg": "Fruits et Légumes",
      "deptFood": "Épicerie",
      "deptCheese": "Fromages et Produits Laitiers",
      "deptClean": "Produits d’entretien",
      "itemSelected": "Sélectionné ✓",
      "itemSelecting": "Sélection...",
      "selectAtLeastOne": "Sélectionnez au moins un produit",
      "challengeTitle": "Défi Rapide Panda",
      "challengeDesc": "Éclatez les logos Panda pour gagner des bons de réduction immédiats !",
      "difficultyLevel": "Niveau de difficulté :",
      "diffEasy": "Facile",
      "diffEasyDesc": "Rythme doux sans pièges ni bombes",
      "diffMedium": "Moyen",
      "diffMediumDesc": "Vitesse modérée avec logos bonus dorés",
      "diffHard": "Difficile",
      "diffHardDesc": "Ultra rapide avec pièges pimentés",
      "seconds": "secondes",
      "startChallengeBtn": "Commencer le défi",
      "gameScore": "Score",
      "timeRemaining": "Temps restant",
      "levelLabel": "Niveau :",
      "avoidBombs": "💣 Évitez les bombes et piments",
      "bombDeduct": "-2 pts",
      "bonusPoints": "+2 Bonus ✨",
      "bonusPointsHard": "+3 Bonus ✨",
      "timeUpTitle": "Temps écoulé !",
      "totalScoreLabel": "Votre score total :",
      "saveScorePrompt": "Enregistrez votre score sur le tableau d’honneur !",
      "enterNamePlaceholder": "Écrivez votre nom ici...",
      "saveBtn": "Enregistrer",
      "scoreSavedSuccess": "Score enregistré au tableau d’honneur ! 🏆",
      "claimVoucherGift": "Recevoir le bon et le cadeau",
      "playAgain": "Rejouer",
      "congratsWon": "Félicitations ! Vous avez gagné",
      "voucherSubheading": "Cadeau instantané pour votre participation",
      "exclusiveVoucher": "Bon de réduction exclusif Panda ✨",
      "instantDiscount": "Remise immédiate",
      "onWholeCart": "sur tout votre panier",
      "validInSection": "Valable dans le rayon :",
      "validFor48h": "Valable pendant 48 heures ⏳",
      "enterDetailsPrompt": "Entrez vos coordonnées pour recevoir votre bon",
      "fullNamePlaceholder": "Nom complet",
      "emailPlaceholder": "E-mail (exemple@domaine.com)",
      "phonePlaceholder": "Numéro de mobile (05xxxxxxxx)",
      "claimGiftNow": "Obtenir le cadeau maintenant",
      "feedbackTitle": "Comment s’est passée votre visite ?",
      "ratingGreat": "Excellent",
      "ratingGood": "Bien",
      "ratingNormal": "Moyen",
      "ratingBad": "Insatisfait",
      "ratingVeryBad": "Très insatisfait",
      "submitFinalFeedback": "Envoyer l’avis final",
      "thankYouHeading": "Merci de nous aider à nous améliorer",
      "funShoppingPanda": "Faites toujours de bonnes affaires chez Panda",
      "alwaysHappyServe": "Au plaisir de vous servir à chaque visite !",
      "backToHome": "Retour à l’accueil",
      "leaderboardModalTitle": "Tableau d’honneur & Meilleurs scores",
      "leaderboardSubtitle": "Les meilleurs participants au Défi Panda",
      "rankCol": "Rang",
      "playerCol": "Joueur",
      "scoreCol": "Score",
      "difficultyCol": "Niveau",
      "closeBtn": "Fermer",
      "prefGift": "Cadeaux et bons gratuits",
      "selectedBadge": "Sélectionné",
      "chooseThisOffer": "Choisir cette offre",
      "confirmPreferenceBtn": "Confirmer et continuer",
      "tapToSelect": "Appuyez pour choisir",
      "favItemBadge": "Article préféré ⭐",
      "selectedCountLabel": "articles sélectionnés",
      "voucherLockedTitle": "Bon cadeau verrouillé 🔐",
      "voucherLockedInstruction": "Entrez vos coordonnées ci-dessous pour débloquer et recevoir votre bon !",
      "voucherUnlockedTitle": "Votre bon a été débloqué avec succès ! 🎁✨",
      "nameLabel": "Nom",
      "phoneLabel": "Mobile",
      "phoneWarningText": "Le numéro de mobile doit commencer par 5 et comporter 9 chiffres",
      "completeFieldsToUnlock": "Complétez les champs ci-dessus pour débloquer",
      "feedbackSubtitleText": "Votre avis compte pour améliorer nos services",
      "dearCustomerBadge": "Notre client estimé et spécial",
      "voucherConfirmedNotice": "Votre cadeau et bon de réduction sont confirmés avec succès ! 🎁✨",
      "thankYouPersonalized": "Merci, {name} ! Nous sommes ravis de votre participation",
      "timeMetricLabel": "Temps",
      "rewardMetricLabel": "Récompense",
      "rewardDiscountVal": "10% de réduction",
      "qualifiedForVoucherBanner": "Qualifié pour le bon de réduction immédiat ! 🎁",
      "perfLegendary": "Performance légendaire exceptionnelle 🚀",
      "perfHero": "Champion de vitesse et de concentration ⚡",
      "perfGreat": "Participation merveilleuse et spéciale 🌟",
      "perfGood": "Effort encourageant et remarquable 🎯",
      "breadSection": "Boulangerie & Pâtisserie 🥐",
      "customerPreviewTitle": "Mode d'aperçu de l'expérience client",
      "returnToDashboard": "Retour au tableau de bord ↩"
    }
  },
  {
    "code": "tl",
    "countryCode": "PH",
    "name": "Filipino",
    "englishName": "Tagalog",
    "nativeSublabel": "Filipino • الفلبين (Philippines)",
    "flag": "🇵🇭",
    "dir": "ltr",
    "isActive": true,
    "translations": {
      "brandTitle": "Panda ang Nagbibigay ng Pagbabago",
      "brandSubtitle": "Mundo ng mga Pribilehiyo",
      "experienceNo": "Karanasan #01",
      "adminDashboard": "Dashboard ng Admin",
      "honorBoard": "Lupon ng Karangalan",
      "changeLogoText": "Pindutin upang palitan ang logo",
      "backBtn": "Bumalik",
      "welcomeBadge": "Maligayang pagdating sa Panda Stores",
      "chooseLanguageTitle": "Piliin ang Iyong Wika",
      "chooseLanguageSubtitle": "Para sa personal at masayang pamimili",
      "scrollHint": "I-swipe pataas o pababa, pagkatapos ay kumpirmahin",
      "confirmAndContinue": "Kumpirmahin at Magpatuloy",
      "connectedTitle": "Matagumpay na Nakakonekta!",
      "connectedSubtitle": "Maghanda para sa matalinong karanasan sa Panda",
      "whatDoYouPreferTitle": "Ano ang Mas Gusto Mo?",
      "preferenceSubtitle": "Tinutulungan mo kaming pagbutihin ang aming serbisyo",
      "prefPoints": "Puntos sa App",
      "prefCashback": "Cashback",
      "prefDiscounts": "Eksklusibong Diskwento",
      "selectOptionToContinue": "Pumili ng opsyon para magpatuloy",
      "myChoicesBtn": "Aking mga Pagpipilian",
      "shoppingTitle": "Piliin ang Kailangan Mo Ngayong Araw",
      "shoppingSubtitle": "Pindutin ang mga produkto para sa pasadyang alok.",
      "favDepartment": "Paboritong Seksyon:",
      "deptVeg": "Gulay at Prutas",
      "deptFood": "Mga Pagkain at Groceries",
      "deptCheese": "Gatas at Keso",
      "deptClean": "Panlinis sa Bahay",
      "itemSelected": "Napili ✓",
      "itemSelecting": "Pinipili...",
      "selectAtLeastOne": "Pumili ng kahit isang produkto",
      "challengeTitle": "Panda Speed Challenge",
      "challengeDesc": "I-pop ang mga logo ng Panda at manalo ng agarang vouchers!",
      "difficultyLevel": "Antas ng Hirap:",
      "diffEasy": "Madali",
      "diffEasyDesc": "Banayad na bilis nang walang bomba",
      "diffMedium": "Katamtaman",
      "diffMediumDesc": "Balanseng bilis na may gintong bonus logo",
      "diffHard": "Mahirap",
      "diffHardDesc": "Napakabilis na may sili at bomb traps",
      "seconds": "segundo",
      "startChallengeBtn": "Simulan ang Hamon",
      "gameScore": "Puntos",
      "timeRemaining": "Natitirang Oras",
      "levelLabel": "Antas:",
      "avoidBombs": "💣 Iwasan ang mga bomba at sili",
      "bombDeduct": "-2 puntos",
      "bonusPoints": "+2 Bonus ✨",
      "bonusPointsHard": "+3 Bonus ✨",
      "timeUpTitle": "Tapos na ang Oras!",
      "totalScoreLabel": "Kabuuang Puntos:",
      "saveScorePrompt": "I-save ang iyong score sa Panda Leaderboard!",
      "enterNamePlaceholder": "I-type ang iyong pangalan dito...",
      "saveBtn": "I-save",
      "scoreSavedSuccess": "Matagumpay na na-save ang iyong puntos! 🏆",
      "claimVoucherGift": "Kunin ang Voucher at Regalo",
      "playAgain": "Maglaro Muli",
      "congratsWon": "Maligayang Bati! Nanalo Ka",
      "voucherSubheading": "Regalo para sa iyong pagsali sa Panda Challenge",
      "exclusiveVoucher": "Eksklusibong Panda Discount Voucher ✨",
      "instantDiscount": "Agarang Diskwento",
      "onWholeCart": "sa buong basket mo",
      "validInSection": "Bisa sa seksyon:",
      "validFor48h": "May bisa sa loob ng 48 oras ⏳",
      "enterDetailsPrompt": "Ipasok ang detalye para makuha agad ang voucher",
      "fullNamePlaceholder": "Buong Pangalan",
      "emailPlaceholder": "Email (example@domain.com)",
      "phonePlaceholder": "Numero ng Telepono (05xxxxxxxx)",
      "claimGiftNow": "Kunin ang Regalo Ngayon",
      "feedbackTitle": "Kumusta ang karanasan mo sa amin ngayon?",
      "ratingGreat": "Napakaganda",
      "ratingGood": "Maganda",
      "ratingNormal": "Katamtaman",
      "ratingBad": "Hindi Maganda",
      "ratingVeryBad": "Napakasama",
      "submitFinalFeedback": "Ipadala ang Pagsusuri",
      "thankYouHeading": "Salamat sa pagtulong na mapabuti ang aming serbisyo",
      "funShoppingPanda": "Palaging masaya ang pamimili sa Panda",
      "alwaysHappyServe": "Ikinagagalak naming maglingkod sa iyo!",
      "backToHome": "Bumalik sa Simula",
      "leaderboardModalTitle": "Lupon ng Karangalan at Nangungunang Manlalaro",
      "leaderboardSubtitle": "Pinakamataas na puntos sa Panda Smart Challenge",
      "rankCol": "Ranggo",
      "playerCol": "Manlalaro",
      "scoreCol": "Puntos",
      "difficultyCol": "Antas",
      "closeBtn": "Isara",
      "prefGift": "Libreng Regalo at Vouchers",
      "selectedBadge": "Napili",
      "chooseThisOffer": "Piliin ang alok na ito",
      "confirmPreferenceBtn": "Kumpirmahin at magpatuloy",
      "tapToSelect": "Pindutin para piliin",
      "favItemBadge": "Paboritong Produkto ⭐",
      "selectedCountLabel": "napiling aytem",
      "voucherLockedTitle": "Naka-lock ang Gift Voucher 🔐",
      "voucherLockedInstruction": "Ilagay ang iyong detalye sa ibaba upang i-unlock at matanggap agad ang voucher!",
      "voucherUnlockedTitle": "Matagumpay na na-unlock ang iyong voucher! 🎁✨",
      "nameLabel": "Pangalan",
      "phoneLabel": "Mobile",
      "phoneWarningText": "Dapat magsimula sa 5 ang mobile number at may 9 na numero",
      "completeFieldsToUnlock": "Kumpletuhin ang detalye sa itaas para ma-unlock ang voucher",
      "feedbackSubtitleText": "Mahalaga ang iyong opinyon upang mapabuti ang aming serbisyo",
      "dearCustomerBadge": "Ang Aming Mahalaga at Espesyal na Customer",
      "voucherConfirmedNotice": "Matagumpay na nakumpirma ang iyong regalo at discount voucher! 🎁✨",
      "thankYouPersonalized": "Salamat, {name}! Natuwa kaming makasama ka",
      "timeMetricLabel": "Oras",
      "rewardMetricLabel": "Gantimpala",
      "rewardDiscountVal": "10% Diskwento",
      "qualifiedForVoucherBanner": "Kwalipikado para sa agarang discount voucher! 🎁",
      "perfLegendary": "Pambihirang maalamat na pagganap 🚀",
      "perfHero": "Kampeon sa bilis at pokus ⚡",
      "perfGreat": "Kahanga-hanga at espesyal na paglahok 🌟",
      "perfGood": "Nakapagpapatibay at mahusay na pagsisikap 🎯",
      "breadSection": "Tinapay at Matamis 🥐",
      "customerPreviewTitle": "Customer Experience Preview Mode",
      "returnToDashboard": "Bumalik sa Dashboard ↩"
    }
  }
];

export const DEFAULT_LANGUAGES: LanguageItem[] = RAW_DEFAULT_LANGUAGES.map((lang) => {
  const t = lang.translations;
  return {
    ...lang,
    translations: {
      ...t,
      preferenceTitle: t.preferenceTitle || t.whatDoYouPreferTitle,
      prefDiscount: t.prefDiscount || t.prefDiscounts,
      challengeSplashTitle: t.challengeSplashTitle || t.challengeTitle,
      challengeSplashSubtitle: t.challengeSplashSubtitle || t.challengeDesc,
      diffDifficulty: t.diffDifficulty || t.difficultyLevel,
      secondsShort: t.secondsShort || t.seconds,
      startChallenge: t.startChallenge || t.startChallengeBtn,
      chooseOptionToContinue: t.chooseOptionToContinue || t.selectOptionToContinue,
    }
  };
});

export const PRODUCT_TRANSLATIONS: Record<string, Record<string, string>> = {
  "v1": {
    "ar": "طماطم محلي",
    "en": "Local Tomato",
    "am": "የአካባቢ ቲማቲም",
    "fr": "Tomates locales",
    "hi": "स्थानीय टमाटर",
    "ur": "مقامی ٹماٹر",
    "tl": "Lokal na Kamatis"
  },
  "v2": {
    "ar": "خيار طازج",
    "en": "Fresh Cucumber",
    "am": "ትኩስ ኪያር",
    "fr": "Concombre frais",
    "hi": "ताजा खीरा",
    "ur": "تازہ کھیرا",
    "tl": "Sariwang Pipino"
  },
  "v3": {
    "ar": "بصل أحمر",
    "en": "Red Onion",
    "am": "ቀይ ሽንኩርት",
    "fr": "Oignon rouge",
    "hi": "लाल प्याज",
    "ur": "لال پیاز",
    "tl": "Pulang Sibuyas"
  },
  "v4": {
    "ar": "بطاطس كيس",
    "en": "Potato Bag",
    "am": "የድንች ከረጢት",
    "fr": "Sac de pommes de terre",
    "hi": "आलू की थैली",
    "ur": "آلو کا بیگ",
    "tl": "Supot ng Patatas"
  },
  "v5": {
    "ar": "جزر طازج",
    "en": "Fresh Carrot",
    "am": "ትኩስ ካሮት",
    "fr": "Carotte fraîche",
    "hi": "ताजी गाजर",
    "ur": "تازہ گاجر",
    "tl": "Sariwang Karot"
  },
  "f1": {
    "ar": "أرز بسمتي",
    "en": "Basmati Rice",
    "am": "ባስማቲ ሩዝ",
    "fr": "Riz Basmati",
    "hi": "बासमती चावल",
    "ur": "باسمتی چاول",
    "tl": "Basmati Rice"
  },
  "f2": {
    "ar": "زيت دوار الشمس",
    "en": "Sunflower Oil",
    "am": "የሱፍ አበባ ዘይት",
    "fr": "Huile de tournesol",
    "hi": "सूरजमुखी का तेल",
    "ur": "سورج مکھی کا تیل",
    "tl": "Mantikang Sunflower"
  },
  "f3": {
    "ar": "مكرونة إيطالية",
    "en": "Italian Pasta",
    "am": "የጣሊያን ፓስታ",
    "fr": "Pâtes italiennes",
    "hi": "इतालवी पास्ता",
    "ur": "اطالوی پاستا",
    "tl": "Italian Pasta"
  },
  "f4": {
    "ar": "دجاج مبرد",
    "en": "Chilled Chicken",
    "am": "ቀዝቃዛ ዶሮ",
    "fr": "Poulet réfrigéré",
    "hi": "चिल्ड चिकन",
    "ur": "ٹھنڈا چکن",
    "tl": "Pinalamig na Manok"
  },
  "f5": {
    "ar": "صلصة طماطم",
    "en": "Tomato Paste",
    "am": "የቲማቲም ድልህ",
    "fr": "Purée de tomates",
    "hi": "टमाटर का पेस्ट",
    "ur": "ٹماٹر کی چٹنی",
    "tl": "Tomato Paste"
  },
  "c1": {
    "ar": "أجبان بيضاء",
    "en": "White Cheese",
    "am": "ነጭ አይብ",
    "fr": "Fromage blanc",
    "hi": "सफेद पनीर",
    "ur": "سفید پنیر",
    "tl": "Puting Keso"
  },
  "c2": {
    "ar": "حليب طازج",
    "en": "Fresh Milk",
    "am": "ትኩስ ወተት",
    "fr": "Lait frais",
    "hi": "ताजा दूध",
    "ur": "تازہ دودھ",
    "tl": "Sariwang Gatas"
  },
  "c3": {
    "ar": "زبادي يوناني",
    "en": "Greek Yogurt",
    "am": "የግሪክ እርጎ",
    "fr": "Yaourt grec",
    "hi": "ग्रीक दही",
    "ur": "یونانی دہی",
    "tl": "Greek Yogurt"
  },
  "c4": {
    "ar": "لبنة فاخرة",
    "en": "Premium Labneh",
    "am": "ልዩ እርጎ (Labneh)",
    "fr": "Labneh premium",
    "hi": "प्रीमियम लबनेह",
    "ur": "عمدہ لبنہ",
    "tl": "Espesyal na Labneh"
  },
  "cl1": {
    "ar": "منظف أواني",
    "en": "Dishwashing Liquid",
    "am": "የዕቃ ሳሙና",
    "fr": "Liquide vaisselle",
    "hi": "डिशवॉशिंग लिक्विड",
    "ur": "برتن دھونے کا صابن",
    "tl": "Panghugas ng Pinggan"
  },
  "cl2": {
    "ar": "مناديل ورقية",
    "en": "Facial Tissues",
    "am": "የወረቀት ሶፍት",
    "fr": "Mouchoirs en papier",
    "hi": "टिशू पेपर",
    "ur": "ٹشو پیپر",
    "tl": "Tissue Paper"
  },
  "cl3": {
    "ar": "مطهر أرضيات",
    "en": "Floor Cleaner",
    "am": "የወለል ማጽጃ",
    "fr": "Nettoyant pour sol",
    "hi": "फर्श क्लीनर",
    "ur": "فرش کلینر",
    "tl": "Panlinis ng Sahig"
  },
  "cl4": {
    "ar": "صابون يدين",
    "en": "Hand Soap",
    "am": "የእጅ ሳሙና",
    "fr": "Savon pour les mains",
    "hi": "हैंड सोप",
    "ur": "ہاتھ دھونے کا صابن",
    "tl": "Sabon sa Kamay"
  },
  // Cafe: Hot Drinks
  "hd1": {
    "ar": "قهوة مختصة V60",
    "en": "Specialty V60 Coffee",
    "am": "ልዩ V60 ቡና",
    "fr": "Café de spécialité V60",
    "hi": "स्पेशलिटी V60 कॉफी",
    "ur": "اسپیشلٹی V60 کافی",
    "tl": "Specialty V60 Coffee"
  },
  "hd2": {
    "ar": "فلات وايت كريمي",
    "en": "Creamy Flat White",
    "am": "ክሬሚ ፍላት ዋይት",
    "fr": "Flat White onctueux",
    "hi": "क्रीमी फ्लैट व्हाइट",
    "ur": "کریمی فلیٹ وائٹ",
    "tl": "Creamy Flat White"
  },
  "hd3": {
    "ar": "كابتشينو إيطالي",
    "en": "Italian Cappuccino",
    "am": "የጣሊያን ካፑቺኖ",
    "fr": "Cappuccino italien",
    "hi": "इतालवी कैपुचीनो",
    "ur": "اطالوی کیپوچینو",
    "tl": "Italian Cappuccino"
  },
  "hd4": {
    "ar": "شاي كرك بالزعفران",
    "en": "Saffron Karak Tea",
    "am": "የሻፍሮን ካራክ ሻይ",
    "fr": "Thé Karak au safran",
    "hi": "केसर कड़क चाय",
    "ur": "زعفرانی کڑک چائے",
    "tl": "Saffron Karak Tea"
  },
  // Cafe: Cold Drinks
  "cd1": {
    "ar": "آيس سبانش لاتيه",
    "en": "Iced Spanish Latte",
    "am": "አይስድ ስፓኒሽ ላቴ",
    "fr": "Latte espagnol glacé",
    "hi": "आइस स्पैनिश लाते",
    "ur": "آئسڈ اسپینش لاٹے",
    "tl": "Iced Spanish Latte"
  },
  "cd2": {
    "ar": "موهيتو توت منعش",
    "en": "Fresh Berry Mojito",
    "am": "ትኩስ ቤሪ ሞሂቶ",
    "fr": "Mojito aux fruits rouges",
    "hi": "ताज़ा बेरी मोहीतो",
    "ur": "تازہ بیری موجیتو",
    "tl": "Fresh Berry Mojito"
  },
  "cd3": {
    "ar": "آيس ماتشا لاتيه",
    "en": "Iced Matcha Latte",
    "am": "አይስድ ማትቻ ላቴ",
    "fr": "Matcha latte glacé",
    "hi": "आइस माचा लाते",
    "ur": "آئسڈ ماچا لاٹے",
    "tl": "Iced Matcha Latte"
  },
  "cd4": {
    "ar": "عصير برتقال طبيعي",
    "en": "Fresh Orange Juice",
    "am": "ትኩስ የብርቱካን ጭማቂ",
    "fr": "Jus d’orange frais",
    "hi": "ताजा संतरे का जूस",
    "ur": "تازہ مالٹے کا رس",
    "tl": "Sariwang Katas ng Dalandan"
  },
  // Cafe: Sweets & Bakery
  "s1": {
    "ar": "فرنش توست كراميل",
    "en": "Caramel French Toast",
    "am": "ካራሜል ፈረንሳይ ቶስት",
    "fr": "Pain perdu au caramel",
    "hi": "कारमेल फ्रेंच टोस्ट",
    "ur": "کیریمل فرینچ ٹوسٹ",
    "tl": "Caramel French Toast"
  },
  "s2": {
    "ar": "تشيز كيك نيويورك",
    "en": "NY Cheesecake",
    "am": "ኒው ዮርክ ቺዝ ኬክ",
    "fr": "Cheesecake new-yorkais",
    "hi": "न्यूयॉर्क चीज़केक",
    "ur": "نیویارک چیز کیک",
    "tl": "New York Cheesecake"
  },
  "s3": {
    "ar": "كرواسون زبدة فرنسي",
    "en": "Butter Croissant",
    "am": "የቅቤ ክሮሶንት",
    "fr": "Croissant au beurre français",
    "hi": "बटर क्रोइसैंट",
    "ur": "فرانسیسی مکھن کروسینٹ",
    "tl": "French Butter Croissant"
  },
  "s4": {
    "ar": "كوكيز شوكولاتة دافئ",
    "en": "Warm Choco Cookie",
    "am": "ሞቅ ያለ ቸኮሌት ኩኪ",
    "fr": "Cookie chaud au chocolat",
    "hi": "वार्म चोको कुकी",
    "ur": "گرم چاکلیٹ کوکی",
    "tl": "Mainit na Choco Cookie"
  },
  // Cafe: Specialty Beans
  "sb1": {
    "ar": "محصول إثيوبي مجفف",
    "en": "Ethiopian Natural Beans",
    "am": "የኢትዮጵያ ተፈጥሯዊ ቡና ፍሬዎች",
    "fr": "Grains d’Éthiopie naturels",
    "hi": "इथियोपियन नेचुरल बीन्स",
    "ur": "ایتھوپین نیچرل بینز",
    "tl": "Ethiopian Natural Beans"
  },
  "sb2": {
    "ar": "محصول كولومبي مغسول",
    "en": "Colombian Washed Beans",
    "am": "የኮሎምቢያ የታጠበ ቡና ፍሬዎች",
    "fr": "Grains de Colombie lavés",
    "hi": "कोलंबियाई वाश्ड बीन्स",
    "ur": "کولمبین واشڈ بینز",
    "tl": "Colombian Washed Beans"
  },
  "sb3": {
    "ar": "بلند إسبريسو مميز",
    "en": "Signature Espresso Blend",
    "am": "ልዩ የኤስፕሬሶ ቅልቅል",
    "fr": "Mélange signature expresso",
    "hi": "सिग्नेचर एस्प्रेसो ब्लेंड",
    "ur": "خاص ایسپریسو بلینڈ",
    "tl": "Signature Espresso Blend"
  },
  "sb4": {
    "ar": "أظرف قهوة سريعة التحضير",
    "en": "Drip Bag Coffee Pouches",
    "am": "የድሪፕ ባግ የቡና ፓኬቶች",
    "fr": "Sachets de café goutte à goutte",
    "hi": "ड्रिप बैग कॉफी पाउच",
    "ur": "ڈرپ بیگ کافی پاؤچز",
    "tl": "Drip Bag Coffee Pouches"
  },
  // Restaurant: Main Courses
  "m1": {
    "ar": "برجر أنجوس كلاسيك",
    "en": "Classic Angus Burger",
    "am": "ክላሲክ አንጉስ በርገር",
    "fr": "Burger Angus classique",
    "hi": "क्लासिक एंगस बर्गर",
    "ur": "کلاسک اینگس برگر",
    "tl": "Classic Angus Burger"
  },
  "m2": {
    "ar": "ستيك ريب آي بريميوم",
    "en": "Premium Ribeye Steak",
    "am": "ልዩ ሪብአይ ስቴክ",
    "fr": "Steak Ribeye d’exception",
    "hi": "प्रीमियम रिबाई स्टेक",
    "ur": "پریمیم رب آئی اسٹیک",
    "tl": "Premium Ribeye Steak"
  },
  "m3": {
    "ar": "باستا تروفل كريمية",
    "en": "Creamy Truffle Pasta",
    "am": "ክሬሚ ትሩፍል ፓስታ",
    "fr": "Pâtes crémeuses à la truffe",
    "hi": "क्रीमी ट्रफल पास्ता",
    "ur": "کریمی ٹرفل پاستا",
    "tl": "Creamy Truffle Pasta"
  },
  "m4": {
    "ar": "دجاج مشوي بالأعشاب",
    "en": "Herb Roasted Chicken",
    "am": "በቅመማ ቅመም የተጠበሰ ዶሮ",
    "fr": "Poulet rôti aux herbes",
    "hi": "हर्ब रोस्टेड चिकन",
    "ur": "جڑی بوٹیوں سے روسٹڈ چکن",
    "tl": "Herb Roasted Chicken"
  },
  // Restaurant: Appetizers & Soups
  "ap1": {
    "ar": "سلطة سيزر بالدجاج",
    "en": "Chicken Caesar Salad",
    "am": "የዶሮ ሲዛር ሰላጣ",
    "fr": "Salade César au poulet",
    "hi": "चिकन सीज़र सलाद",
    "ur": "چکن سیزر سلاد",
    "tl": "Chicken Caesar Salad"
  },
  "ap2": {
    "ar": "شوربة كريمة الفطر",
    "en": "Cream of Mushroom Soup",
    "am": "የእንጉዳይ ክሬም ሾርባ",
    "fr": "Velouté crémeux de champignons",
    "hi": "मशरूम क्रीम सूप",
    "ur": "مشروم کریم سوپ",
    "tl": "Cream of Mushroom Soup"
  },
  "ap3": {
    "ar": "بطاطس مقرمشة مبهرة",
    "en": "Seasoned Crispy Fries",
    "am": "ጣፋጭ የተጠበሰ ድንች (ፍራይስ)",
    "fr": "Frites croustillantes assaisonnées",
    "hi": "सीजन्ड क्रिस्पी फ्राइज",
    "ur": "مصالحہ دار کرسپی فرائز",
    "tl": "Seasoned Crispy Fries"
  },
  "ap4": {
    "ar": "أجنحة دجاج بوفالو المقرمشة",
    "en": "Crispy Buffalo Wings",
    "am": "የሚቃጠል ቡፋሎ የዶሮ ክንፎች",
    "fr": "Ailes de poulet Buffalo croustillantes",
    "hi": "क्रिस्पी बफ़ेलो विंग्स",
    "ur": "کرسپی بفیلو ونگز",
    "tl": "Crispy Buffalo Wings"
  },
  // Restaurant: Beverages
  "bv1": {
    "ar": "عصير ليمون بالنعناع",
    "en": "Fresh Mint Lemonade",
    "am": "የሎሚ እና ናና ጭማቂ",
    "fr": "Limonade fraîche à la menthe",
    "hi": "पुदीना नींबू पानी",
    "ur": "لیموں اور پودینہ جوس",
    "tl": "Fresh Mint Lemonade"
  },
  "bv2": {
    "ar": "موهيتو فراولة مثلج",
    "en": "Iced Strawberry Mojito",
    "am": "አይስድ እንጆሪ ሞሂቶ",
    "fr": "Mojito glacé à la fraise",
    "hi": "आइस स्ट्रॉबेरी मोहीतो",
    "ur": "آئسڈ اسٹرابیری موجیتو",
    "tl": "Iced Strawberry Mojito"
  },
  "bv3": {
    "ar": "سموذي مانجو استوائي",
    "en": "Tropical Mango Smoothie",
    "am": "ትሮፒካል የማንጎ ስሙዚ",
    "fr": "Smoothie tropical à la mangue",
    "hi": "ट्रॉपिकल मैंगो स्मूदी",
    "ur": "ٹراپیکل مینگو اسمتھی",
    "tl": "Tropical Mango Smoothie"
  },
  "bv4": {
    "ar": "مشروب غازي مثلج بالليمون",
    "en": "Iced Lemon Soda",
    "am": "ቀዝቃዛ የሎሚ ሶዳ",
    "fr": "Soda glacé au citron",
    "hi": "आइस लेमन सोडा",
    "ur": "آئسڈ لیمن سوڈا",
    "tl": "Iced Lemon Soda"
  },
  // Restaurant: Fine Desserts
  "rs1": {
    "ar": "كيك الشوكولاتة الذائب فوندان",
    "en": "Molten Chocolate Fondant",
    "am": "ቀልጦ የወጣ ቸኮሌት ኬክ",
    "fr": "Fondant au chocolat coulant",
    "hi": "मॉल्टन चॉकलेट फोंडेंट",
    "ur": "مولٹن چاکلیٹ فونڈنٹ",
    "tl": "Molten Chocolate Fondant"
  },
  "rs2": {
    "ar": "كريم بروليه فانيلا",
    "en": "Vanilla Creme Brulee",
    "am": "ቫኒላ ክሬም ብሩሌ",
    "fr": "Crème brûlée à la vanille",
    "hi": "वेनिला क्रीम ब्रूली",
    "ur": "وینیلا کریم برولے",
    "tl": "Vanilla Creme Brulee"
  },
  "rs3": {
    "ar": "تشيز كيك توت بري نيويورك",
    "en": "Berry Cheesecake",
    "am": "የዱር ፍሬዎች ቺዝ ኬክ",
    "fr": "Cheesecake aux baies sauvages",
    "hi": "बेरी चीज़केक",
    "ur": "بیری چیز کیک",
    "tl": "Berry Cheesecake"
  },
  "rs4": {
    "ar": "أم علي ملكية بالمكسرات",
    "en": "Royal Umm Ali with Nuts",
    "am": "ሮያል ኡም አሊ ከለውዝ ጋር",
    "fr": "Oumm Ali royale aux fruits secs",
    "hi": "रॉयल उम अली नट्स के साथ",
    "ur": "شاہی ام علی مع ڈرائی فروٹس",
    "tl": "Royal Umm Ali na may Nuts"
  }
};

export const PRODUCT_LOOKUP_BY_NAME: Array<{
  keywords: string[];
  translations: Record<string, string>;
}> = [
  {
    keywords: ['جزر', 'carrot', 'carrots'],
    translations: {
      ar: 'جزر طازج',
      en: 'Fresh Carrot',
      tl: 'Sariwang Karot',
      hi: 'ताजी गाजर',
      ur: 'تازہ گاجر',
      fr: 'Carotte fraîche',
      am: 'ትኩስ ካሮት'
    }
  },
  {
    keywords: ['زيت ذرة', 'corn oil', 'زيت الذرة'],
    translations: {
      ar: 'زيت ذرة نقي',
      en: 'Pure Corn Oil',
      tl: 'Purong Mantikang Mais',
      hi: 'शुद्ध मक्के का तेल',
      ur: 'خالص مکئی کا تیل',
      fr: 'Huile de maïs pure',
      am: 'ንጹህ የበቆሎ ዘይት'
    }
  },
  {
    keywords: ['دقيق', 'طحين', 'flour', 'fom'],
    translations: {
      ar: 'دقيق فاخر متعدد الاستخدام',
      en: 'Premium All-Purpose Flour',
      tl: 'All-Purpose Harina',
      hi: 'प्रीमियम बहुउद्देशीय आटा',
      ur: 'عمدہ آل پرپز میدہ',
      fr: 'Farine tout usage',
      am: 'የተጣራ የዳቦ ዱቄት'
    }
  },
  {
    keywords: ['بطاطس', 'بطاطا', 'potato', 'potatoes'],
    translations: {
      ar: 'بطاطس كيس',
      en: 'Potato Bag',
      tl: 'Supot ng Patatas',
      hi: 'आलू की थैली',
      ur: 'آلو کا بیگ',
      fr: 'Sac de pommes de terre',
      am: 'የድንች ከረጢት'
    }
  },
  {
    keywords: ['طماطم', 'طماطه', 'tomato', 'tomatoes'],
    translations: {
      ar: 'طماطم محلي',
      en: 'Local Tomato',
      tl: 'Lokal na Kamatis',
      hi: 'स्थानीय टमाटर',
      ur: 'مقامی ٹماٹر',
      fr: 'Tomates locales',
      am: 'የአካባቢ ቲማቲም'
    }
  },
  {
    keywords: ['خيار', 'cucumber', 'cucumbers'],
    translations: {
      ar: 'خيار طازج',
      en: 'Fresh Cucumber',
      tl: 'Sariwang Pipino',
      hi: 'ताजा खीरा',
      ur: 'تازہ کھیرا',
      fr: 'Concombre frais',
      am: 'ትኩስ ኪያር'
    }
  },
  {
    keywords: ['بصل', 'onion', 'onions'],
    translations: {
      ar: 'بصل أحمر',
      en: 'Red Onion',
      tl: 'Pulang Sibuyas',
      hi: 'लाल प्याज',
      ur: 'لال پیاز',
      fr: 'Oignon rouge',
      am: 'ቀይ ሽንኩርት'
    }
  },
  {
    keywords: ['أرز', 'رز', 'rice', 'basmati'],
    translations: {
      ar: 'أرز بسمتي',
      en: 'Basmati Rice',
      tl: 'Basmati Rice',
      hi: 'बासमती चावल',
      ur: 'باسمتی چاول',
      fr: 'Riz Basmati',
      am: 'ባስማቲ ሩዝ'
    }
  },
  {
    keywords: ['زيت دوار', 'زيت', 'oil', 'sunflower'],
    translations: {
      ar: 'زيت دوار الشمس',
      en: 'Sunflower Oil',
      tl: 'Mantikang Sunflower',
      hi: 'सूरजमुखी तेल',
      ur: 'سورج مکھی تیل',
      fr: 'Huile de tournesol',
      am: 'የሱፍ አበባ ዘይት'
    }
  },
  {
    keywords: ['مكرونة', 'معكرونة', 'pasta', 'spaghetti'],
    translations: {
      ar: 'مكرونة إيطالية',
      en: 'Italian Pasta',
      tl: 'Pastang Italyano',
      hi: 'इटैलियन पास्ता',
      ur: 'اطالوی پاستا',
      fr: 'Pâtes italiennes',
      am: 'የጣሊያን ፓስታ'
    }
  },
  {
    keywords: ['دجاج', 'chicken', 'poulet'],
    translations: {
      ar: 'دجاج مبرد',
      en: 'Chilled Chicken',
      tl: 'Pinalamig na Manok',
      hi: 'चिल्ड चिकन',
      ur: 'ٹھنڈا چکن',
      fr: 'Poulet frais',
      am: 'ቀዝቃዛ ዶሮ'
    }
  },
  {
    keywords: ['أجبان', 'جبن', 'جبنة', 'cheese'],
    translations: {
      ar: 'أجبان بيضاء',
      en: 'White Cheese',
      tl: 'Puting Keso',
      hi: 'सफेद पनीर',
      ur: 'سفید پنیر',
      fr: 'Fromage blanc',
      am: 'ነጭ አይብ'
    }
  },
  {
    keywords: ['حليب', 'لبن', 'milk'],
    translations: {
      ar: 'حليب طازج',
      en: 'Fresh Milk',
      tl: 'Sariwang Gatas',
      hi: 'ताजा दूध',
      ur: 'تازہ دودھ',
      fr: 'Lait frais',
      am: 'ትኩስ ወተት'
    }
  },
  {
    keywords: ['زبادي', 'روب', 'yogurt'],
    translations: {
      ar: 'زبادي يوناني',
      en: 'Greek Yogurt',
      tl: 'Griyegong Yogurt',
      hi: 'ग्रीक दही',
      ur: 'یونانی دہی',
      fr: 'Yaourt grec',
      am: 'የግሪክ እርጎ'
    }
  },
  {
    keywords: ['لبنة', 'labneh'],
    translations: {
      ar: 'لبنة فاخرة',
      en: 'Premium Labneh',
      tl: 'Espesyal na Labneh',
      hi: 'प्रीमियम लबनेह',
      ur: 'عمدہ لبنہ',
      fr: 'Labneh supérieur',
      am: 'ልዩ እርጎ'
    }
  },
  {
    keywords: ['منظف', 'صحون', 'أواني', 'dishwash'],
    translations: {
      ar: 'منظف أواني',
      en: 'Dishwashing Liquid',
      tl: 'Panghugas ng Pinggan',
      hi: 'डिशवॉशिंग लिक्विड',
      ur: 'برتن دھونے کا صابن',
      fr: 'Liquide vaisselle',
      am: 'የዕቃ ሳሙና'
    }
  },
  {
    keywords: ['مناديل', 'فاين', 'tissue'],
    translations: {
      ar: 'مناديل ورقية',
      en: 'Facial Tissues',
      tl: 'Tissue Paper',
      hi: 'टिशू पेपर',
      ur: 'ٹشو پیپر',
      fr: 'Mouchoirs en papier',
      am: 'የወረቀት ሶፍት'
    }
  },
  {
    keywords: ['مطهر', 'أرضيات', 'floor'],
    translations: {
      ar: 'مطهر أرضيات',
      en: 'Floor Cleaner',
      tl: 'Panlinis ng Sahig',
      hi: 'फर्श क्लीनر',
      ur: 'فرش کلینر',
      fr: 'Nettoyant pour sol',
      am: 'የወለል ማጽጃ'
    }
  },
  {
    keywords: ['صابون', 'يدين', 'soap'],
    translations: {
      ar: 'صابون يدين',
      en: 'Hand Soap',
      tl: 'Sabon sa Kamay',
      hi: 'हैंड सोप',
      ur: 'ہاتھ دھونے کا صابن',
      fr: 'Savon pour les mains',
      am: 'የእጅ ሳሙና'
    }
  }
];

export function getProductTranslatedName(productId: string, fallbackName: string, langCode: string): string {
  if (langCode === 'ar') {
    if (PRODUCT_TRANSLATIONS[productId] && PRODUCT_TRANSLATIONS[productId]['ar']) {
      return PRODUCT_TRANSLATIONS[productId]['ar'];
    }
    return fallbackName;
  }

  // 1. Direct ID match
  if (PRODUCT_TRANSLATIONS[productId] && PRODUCT_TRANSLATIONS[productId][langCode]) {
    return PRODUCT_TRANSLATIONS[productId][langCode];
  }

  // 2. Lookup by fallbackName in product dictionary
  const lowerName = (fallbackName || '').toLowerCase().trim();
  for (const item of PRODUCT_LOOKUP_BY_NAME) {
    const isMatched = item.keywords.some(k => lowerName.includes(k.toLowerCase()));
    if (isMatched) {
      if (item.translations[langCode]) {
        return item.translations[langCode];
      }
      if (item.translations['en']) {
        return item.translations['en'];
      }
    }
  }

  // 3. Fallback to English from ID if available
  if (PRODUCT_TRANSLATIONS[productId] && PRODUCT_TRANSLATIONS[productId]['en']) {
    return PRODUCT_TRANSLATIONS[productId]['en'];
  }

  return fallbackName;
}

const STORAGE_KEY = 'panda_selected_7_languages_v2';

export function getStoredLanguages(): LanguageItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter strictly to the 7 allowed languages
        const validParsed = parsed.filter((item: any) => ALLOWED_LANG_CODES.includes(item.code));
        if (validParsed.length > 0) {
          const merged = DEFAULT_LANGUAGES.map((def): LanguageItem => {
            const match = validParsed.find((item: any) => item.code === def.code);
            if (match) {
              const baseTrans = def.translations;
              const matchTrans = match.translations || {};
              return {
                ...def,
                ...match,
                isActive: match.isActive !== undefined ? match.isActive : def.isActive,
                translations: {
                  ...baseTrans,
                  ...matchTrans,
                  preferenceTitle: matchTrans.preferenceTitle || matchTrans.whatDoYouPreferTitle || baseTrans.whatDoYouPreferTitle,
                  prefDiscount: matchTrans.prefDiscount || matchTrans.prefDiscounts || baseTrans.prefDiscounts,
                  challengeSplashTitle: matchTrans.challengeSplashTitle || matchTrans.challengeTitle || baseTrans.challengeTitle,
                  challengeSplashSubtitle: matchTrans.challengeSplashSubtitle || matchTrans.challengeDesc || baseTrans.challengeDesc,
                  diffDifficulty: matchTrans.diffDifficulty || matchTrans.difficultyLevel || baseTrans.difficultyLevel,
                  secondsShort: matchTrans.secondsShort || matchTrans.seconds || baseTrans.seconds,
                  startChallenge: matchTrans.startChallenge || matchTrans.startChallengeBtn || baseTrans.startChallengeBtn,
                  chooseOptionToContinue: matchTrans.chooseOptionToContinue || matchTrans.selectOptionToContinue || baseTrans.selectOptionToContinue,
                },
                countryCode: match.countryCode || def.countryCode,
                nativeSublabel: match.nativeSublabel || def.nativeSublabel,
              };
            }
            return def;
          });
          return merged;
        }
      }
    }
  } catch (e) {
    console.error('Error loading languages:', e);
  }
  return DEFAULT_LANGUAGES;
}

export function saveStoredLanguages(languages: LanguageItem[]): void {
  try {
    const filtered = languages.filter(l => ALLOWED_LANG_CODES.includes(l.code as any));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error saving languages:', e);
  }
}

// -------------------------------------------------------------
// SYSTEM-WIDE UNIFIED TRANSLATION HELPERS (7 LANGUAGES SUPPORT)
// -------------------------------------------------------------

export const BADGE_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Soon': {
    ar: 'قريباً',
    en: 'Soon',
    am: 'በቅርቡ',
    fr: 'Bientôt',
    hi: 'जल्द',
    ur: 'عنقریب',
    tl: 'Malapit Na',
  },
  'قريباً': {
    ar: 'قريباً',
    en: 'Soon',
    am: 'በቅርቡ',
    fr: 'Bientôt',
    hi: 'जल्द',
    ur: 'عنقریب',
    tl: 'Malapit Na',
  },
  'عروض حصرية': {
    ar: 'عروض حصرية',
    en: 'Exclusive Offer',
    am: 'ልዩ ቅናሽ',
    fr: 'Offre exclusive',
    hi: 'विशेष ऑफर',
    ur: 'خصوصی پیشکش',
    tl: 'Eksklusibong Alok',
  },
  'Exclusive Offer': {
    ar: 'عروض حصرية',
    en: 'Exclusive Offer',
    am: 'ልዩ ቅናሽ',
    fr: 'Offre exclusive',
    hi: 'विशेष ऑफर',
    ur: 'خصوصی پیشکش',
    tl: 'Eksklusibong Alok',
  },
  'الأعلى تقييماً': {
    ar: 'الأعلى تقييماً',
    en: 'Top Rated',
    am: 'ከፍተኛ ደረጃ',
    fr: 'Mieux noté',
    hi: 'शीर्ष दर्जा',
    ur: 'اعلیٰ درجہ بندی',
    tl: 'Nangungunang Na-rate',
  },
  'Top Rated': {
    ar: 'الأعلى تقييماً',
    en: 'Top Rated',
    am: 'ከፍተኛ ደረጃ',
    fr: 'Mieux noté',
    hi: 'शीर्ष दर्जा',
    ur: 'اعلیٰ درجہ بندی',
    tl: 'Nangungunang Na-rate',
  },
  'الأكثر طلباً': {
    ar: 'الأكثر طلباً',
    en: 'Most Popular',
    am: 'በጣም ተወዳጅ',
    fr: 'Plus populaire',
    hi: 'सबसे लोकप्रिय',
    ur: 'سب سے زیادہ مقبول',
    tl: 'Pinakasikat',
  },
  'Most Popular': {
    ar: 'الأكثر طلباً',
    en: 'Most Popular',
    am: 'በጣም ተወዳጅ',
    fr: 'Plus populaire',
    hi: 'सबसे लोकप्रिय',
    ur: 'سب سے زیادہ مقبول',
    tl: 'Pinakasikat',
  },
  'طازج 100%': {
    ar: 'طازج 100%',
    en: '100% Fresh',
    am: '100% ትኩስ',
    fr: '100% Frais',
    hi: '100% ताजा',
    ur: '100% تازہ',
    tl: '100% Sariwa',
  },
  '100% Fresh': {
    ar: 'طازج 100%',
    en: '100% Fresh',
    am: '100% ትኩስ',
    fr: '100% Frais',
    hi: '100% ताजा',
    ur: '100% تازہ',
    tl: '100% Sariwa',
  },
  'جديد': {
    ar: 'جديد',
    en: 'New',
    am: 'አዲስ',
    fr: 'Nouveau',
    hi: 'नया',
    ur: 'نیا',
    tl: 'Bago',
  },
  'New': {
    ar: 'جديد',
    en: 'New',
    am: 'አዲስ',
    fr: 'Nouveau',
    hi: 'नया',
    ur: 'نیا',
    tl: 'Bago',
  },
  'طبق الشيف': {
    ar: 'طبق الشيف',
    en: "Chef's Special",
    am: 'የሼፍ ልዩ',
    fr: 'Spécialité du chef',
    hi: 'शेफ स्पेशल',
    ur: 'شیف اسپیشل',
    tl: "Chef's Special",
  },
  "Chef's Special": {
    ar: 'طبق الشيف',
    en: "Chef's Special",
    am: 'የሼፍ ልዩ',
    fr: 'Spécialité du chef',
    hi: 'शेफ स्पेशल',
    ur: 'شیف اسپیشل',
    tl: "Chef's Special",
  },
  'مقرمش حار': {
    ar: 'مقرمش حار',
    en: 'Crispy Spicy',
    am: 'የሚቃጠል ቆንጆ',
    fr: 'Croustillant épicé',
    hi: 'कुरकुरा मसालेदार',
    ur: 'کرسپی مسالیدار',
    tl: 'Malutong at Maanghang',
  },
  'منعش': {
    ar: 'منعش',
    en: 'Refreshing',
    am: 'መንፈስን የሚያድስ',
    fr: 'Rafraîchissant',
    hi: 'ताज़ा',
    ur: 'تازہ دم',
    tl: 'Nakakapresko',
  },
  'فاخر': {
    ar: 'فاخر',
    en: 'Premium',
    am: 'ልዩ ደረጃ',
    fr: 'Premium',
    hi: 'प्रीमियम',
    ur: 'پریمیم',
    tl: 'Premium',
  },
};

export function translateBadge(badge: string | undefined | null, langCode: string): string {
  if (!badge) return '';
  const trimmed = badge.trim();
  const match = BADGE_TRANSLATIONS[trimmed];
  if (match) {
    return match[langCode] || match['en'] || trimmed;
  }
  return trimmed;
}

export const DEPARTMENT_TRANSLATIONS: Record<string, Record<string, string>> = {
  veg: {
    ar: 'خضار وفواكه',
    en: 'Fruits & Vegetables',
    am: 'አትክልትና ፍራፍሬ',
    fr: 'Fruits et légumes',
    hi: 'फल और सब्जियां',
    ur: 'پھل اور سبزیاں',
    tl: 'Mga Prutas at Gulay',
  },
  food: {
    ar: 'مواد غذائية وتموين',
    en: 'Groceries & Staples',
    am: 'የምግብ ሸቀጦች',
    fr: 'Épicerie et provisions',
    hi: 'किराना और आवश्यक वस्तुएं',
    ur: 'اشیائے خوردونوش',
    tl: 'Mga Groseri at Pagkain',
  },
  cheese: {
    ar: 'الأجبان والألبان',
    en: 'Dairy & Cheese',
    am: 'የወተት እና አይብ ምርቶች',
    fr: 'Produits laitiers et fromages',
    hi: 'डेयरी और पनीर',
    ur: 'ڈیری اور پنیر',
    tl: 'Dairy at Keso',
  },
  clean: {
    ar: 'أدوات نظافة وعناية',
    en: 'Cleaning & Home Care',
    am: 'የጽዳት እቃዎች',
    fr: 'Entretien et hygiène',
    hi: 'सफाई और देखभाल',
    ur: 'صفائی کی اشیاء',
    tl: 'Panlinis at Pangangalaga',
  },
  hot_drinks: {
    ar: 'مشروبات ساخنة',
    en: 'Hot Drinks',
    am: 'ትኩስ መጠጦች',
    fr: 'Boissons chaudes',
    hi: 'गर्म पेय पदार्थ',
    ur: 'گرم مشروبات',
    tl: 'Mainit na Inumin',
  },
  cold_drinks: {
    ar: 'مشروبات باردة',
    en: 'Cold Drinks',
    am: 'ቀዝቃዛ መጠጦች',
    fr: 'Boissons fraîches',
    hi: 'ठंडे पेय पदार्थ',
    ur: 'سرد مشروبات',
    tl: 'Malamig na Inumin',
  },
  cafe_sweets: {
    ar: 'حلى ومخبوزات',
    en: 'Desserts & Bakery',
    am: 'ጣፋጮች እና ዳቦ',
    fr: 'Pâtisseries et douceurs',
    hi: 'मिठाइयाँ और बेकरी',
    ur: 'مٹھائیاں اور بیکری',
    tl: 'Panghimagas at Tinapay',
  },
  specialty_beans: {
    ar: 'بن ومحاصيل مختصة',
    en: 'Specialty Beans',
    am: 'ልዩ የቡና ፍሬዎች',
    fr: "Grains d'exception",
    hi: 'विशेष कॉफी बीन्स',
    ur: 'خاص کافی بیج',
    tl: 'Espesyal na Butil ng Kape',
  },
  main_courses: {
    ar: 'وجبات وأطباق رئيسية',
    en: 'Main Courses',
    am: 'ዋና ዋና ምግቦች',
    fr: 'Plats principaux',
    hi: 'मुख्य व्यंजन',
    ur: 'بنیادی کھانے اور ڈشز',
    tl: 'Pangunahing Ulam',
  },
  appetizers: {
    ar: 'مقبلات وشوربات',
    en: 'Appetizers & Soups',
    am: 'መክሰስ እና ሾርባዎች',
    fr: 'Entrées et potages',
    hi: 'स्टार्टर्स और सूप',
    ur: 'اسٹارٹرز اور سوپ',
    tl: 'Pampagana at Sabaw',
  },
  beverages: {
    ar: 'عصائر ومشروبات',
    en: 'Beverages & Drinks',
    am: 'ጭማቂዎች እና መጠጦች',
    fr: 'Jus et rafraîchissements',
    hi: 'जूस और पेय',
    ur: 'جوس اور مشروبات',
    tl: 'Mga Inumin at Katas',
  },
  restaurant_sweets: {
    ar: 'حلويات فاخرة',
    en: 'Fine Desserts',
    am: 'ልዩ ጣፋጮች',
    fr: 'Desserts gourmands',
    hi: 'स्वादिष्ट डेसर्ट',
    ur: 'عمدہ میٹھے',
    tl: 'Masasarap na Panghimagas',
  },
};

export function getDepartmentTranslatedName(deptId: string, fallbackName: string, langCode: string): string {
  const match = DEPARTMENT_TRANSLATIONS[deptId];
  if (match) {
    return match[langCode] || match['en'] || fallbackName;
  }
  return fallbackName;
}

export function getShoppingTitleAndSubtitle(businessType: string, langCode: string): { title: string; subtitle: string } {
  if (businessType === 'cafe') {
    const titles: Record<string, string> = {
      ar: 'قائمة مشروبات وحلويات الكافيه',
      en: 'Cafe Drinks & Desserts Menu',
      am: 'የካፌ መጠጦች እና ጣፋጮች ዝርዝር',
      fr: 'Menu Boissons et Gourmandises du Café',
      hi: 'कैफे ड्रिंक्स और डेसर्ट मेनू',
      ur: 'کیفے ڈرنکس اور میٹھے کا مینو',
      tl: 'Menu ng Inumin at Panghimagas sa Cafe',
    };
    const subtitles: Record<string, string> = {
      ar: 'اختر طلباتك المفضلة لتجهيز عروضك وقسيمتك الحصرية',
      en: 'Select your favorite coffee & treats for exclusive perks',
      am: 'ለልዩ ቅናሾች እና ኩፖኖች የሚወዷቸውን ትዕዛዞች ይምረጡ',
      fr: "Sélectionnez vos boissons et douceurs pour vos offres exclusives",
      hi: 'विशेष ऑफर और कूपन के लिए अपनी पसंदीदा चीजें चुनें',
      ur: 'اپنی پسندیدہ کافی اور میٹھے منتخب کر کے خصوصی کوپن حاصل کریں',
      tl: 'Piliin ang paboritong kape at pagkain para sa eksklusibong diskwento',
    };
    return {
      title: titles[langCode] || titles['en'] || titles['ar'],
      subtitle: subtitles[langCode] || subtitles['en'] || subtitles['ar'],
    };
  }

  if (businessType === 'restaurant') {
    const titles: Record<string, string> = {
      ar: 'قائمة وجبات ومأكولات المطعم',
      en: 'Restaurant Menu & Courses',
      am: 'የሬስቶራንት ምግቦች እና ምናሌ',
      fr: 'Menu et Plats du Restaurant',
      hi: 'रेस्तरां मेनू और स्वादिष्ट व्यंजन',
      ur: 'ریستوراں مینو اور لذیذ کھانے',
      tl: 'Menu at mga Pagkain sa Restawran',
    };
    const subtitles: Record<string, string> = {
      ar: 'اختر أطباقك المفضلة لتخصيص أفضل العروض وقسيمتك',
      en: 'Choose your favorite dishes to tailor special offers',
      am: 'ምርጥ ቅናሾችን እና ኩፖኖችን ለማበጀት የሚወዷቸውን ምግቦች ይምረጡ',
      fr: 'Choisissez vos plats préférés pour adapter vos offres spéciales',
      hi: 'विशेष ऑफ़र और कूपن प्राप्त करने के लिए अपनी पसंदीदा डिश चुनें',
      ur: 'بہترین آفرز اور کوپن کے لیے اپنی پسندیدہ ڈشز منتخب کریں',
      tl: 'Piliin ang iyong paboritong ulam para sa mga espesyal na alok',
    };
    return {
      title: titles[langCode] || titles['en'] || titles['ar'],
      subtitle: subtitles[langCode] || subtitles['en'] || subtitles['ar'],
    };
  }

  // Default: Supermarket
  const titles: Record<string, string> = {
    ar: 'اختر احتياجاتك لهذا اليوم',
    en: 'Select Your Essentials for Today',
    am: 'የዛሬ ፍላጎቶችዎን ይምረጡ',
    fr: 'Choisissez vos produits du jour',
    hi: 'आज के लिए अपनी जरूरतें चुनें',
    ur: 'آج کی اپنی ضروریات منتخب کریں',
    tl: 'Pumili ng mga Pangangailangan Ngayong Araw',
  };
  const subtitles: Record<string, string> = {
    ar: 'اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.',
    en: 'Tap items you plan to buy to analyze your customized offers.',
    am: 'ልዩ ቅናሾችን ለመተንተን እቃዎችን ይጫኑ።',
    fr: 'Sélectionnez les articles prévus pour voir vos offres exclusives.',
    hi: 'विशेष ऑफर्स का विश्लेषण करने के लिए उत्पाद चुनें।',
    ur: 'خصوصی پیشکشوں کے تجزیے کے لیے مصنوعات کو منتخب کریں۔',
    tl: 'I-tap ang mga produktong bibilhin upang maihanda ang iyong mga alok.',
  };
  return {
    title: titles[langCode] || titles['en'] || titles['ar'],
    subtitle: subtitles[langCode] || subtitles['en'] || subtitles['ar'],
  };
}

export function getFeedbackTitleAndSubtitle(businessType: string, langCode: string): { title: string; subtitle: string } {
  if (businessType === 'cafe') {
    const titles: Record<string, string> = {
      ar: 'كيف كانت تجربتك في الكافيه اليوم؟',
      en: 'How was your café experience today?',
      am: 'የዛሬው የካፌ ተሞክሮዎ እንዴት ነበር?',
      fr: 'Comment s’est passée votre visite au café ?',
      hi: 'आज कैफे में आपका अनुभव कैसा रहा?',
      ur: 'آج کیفے میں آپ کا تجربہ کیسا رہا؟',
      tl: 'Kumusta ang iyong karanasan sa cafe ngayon?',
    };
    const subtitles: Record<string, string> = {
      ar: 'رأيك يهمنا لتطوير جودة القهوة وسرعة الخدمة والجلسات',
      en: 'Your feedback helps us improve coffee quality, service, and ambiance',
      am: 'አስተያየትዎ የቡናውን ጥራት እና አገልግሎት ለማሻሻል ይረዳናል',
      fr: 'Votre avis nous aide à perfectionner le café et l’accueil',
      hi: 'आपकी राय कॉफी की गुणवत्ता और सेवा सुधारने में मदद करती है',
      ur: 'آپ کی رائے کافی کے معیار اور سروس کو بہتر بنانے میں مدد دیتی ہے',
      tl: 'Nakatutulong ang iyong puna upang mapabuti ang kape at serbisyo',
    };
    return {
      title: titles[langCode] || titles['en'] || titles['ar'],
      subtitle: subtitles[langCode] || subtitles['en'] || subtitles['ar'],
    };
  }

  if (businessType === 'restaurant') {
    const titles: Record<string, string> = {
      ar: 'كيف كانت تجربة تناول الطعام معنا اليوم؟',
      en: 'How was your dining experience today?',
      am: 'የዛሬው የምግብ ተሞክሮዎ እንዴት ነበር?',
      fr: 'Comment s’est passée votre expérience au restaurant ?',
      hi: 'आज रेस्तरां में भोजन का अनुभव कैसा रहा?',
      ur: 'آج ہمارے ہاں کھانے کا تجربہ کیسا رہا؟',
      tl: 'Kumusta ang iyong karanasan sa pagkain ngayon?',
    };
    const subtitles: Record<string, string> = {
      ar: 'رأيك يهمنا لتطوير جودة المأكولات وحسن الضيافة والخدمة',
      en: 'Your feedback helps us refine food quality, hospitality, and service',
      am: 'አስተያየትዎ የምግብ ጥራት እና የእንግዳ ተቀባይነትን ለማሻሻል ይረዳል',
      fr: 'Votre avis nous aide à parfaire la qualité des plats et le service',
      hi: 'आपकी राय भोजन और आतिथ्य सत्कार को और बेहतर बनाने में मदद करती है',
      ur: 'آپ کی رائے کھانوں کے ذائقے اور مہمان نوازی کو بہتر بناتی ہے',
      tl: 'Nakatutulong ang iyong puna para mapasarap ang mga putahe at serbisyo',
    };
    return {
      title: titles[langCode] || titles['en'] || titles['ar'],
      subtitle: subtitles[langCode] || subtitles['en'] || subtitles['ar'],
    };
  }

  // Supermarket
  const titles: Record<string, string> = {
    ar: 'التقييم العام لتجربة التسوق في أسواق بنده',
    en: 'How was your shopping experience at Panda today?',
    am: 'በፓንዳ የገበያ ተሞክሮዎ እንዴት ነበር?',
    fr: 'Comment s’est passée votre expérience shopping chez Panda ?',
    hi: 'पांडा में खरीदारी का आपका अनुभव कैसा रहा?',
    ur: 'پانڈا میں خریداری کا تجربہ کیسا رہا؟',
    tl: 'Kumusta ang iyong karanasan sa pamimili sa Panda?',
  };
  const subtitles: Record<string, string> = {
    ar: 'رأيك يهمنا لتطوير وتحسين خدماتنا وعروضنا باستمرار',
    en: 'Your feedback helps us continuously improve our services and offers',
    am: 'አስተያየትዎ አገልግሎታችንን እና ቅናሾቻችንን ለማሻሻል ይረዳል',
    fr: 'Vos retours nous aident à améliorer constamment nos services',
    hi: 'आपकी प्रतिक्रिया हमारी सेवाओं को बेहतर बनाने में मदद करती है',
    ur: 'آپ کی رائے ہماری سروسز اور آفرز کو بہتر بنانے میں مدد دیتی ہے',
    tl: 'Nakatutulong ang iyong opinyon upang patuloy naming mapabuti ang serbisyo',
  };
  return {
    title: titles[langCode] || titles['en'] || titles['ar'],
    subtitle: subtitles[langCode] || subtitles['en'] || subtitles['ar'],
  };
}

export function getSurveyQuestionTranslated(
  questionType: 'cleanliness' | 'staff' | 'overall',
  businessType: string,
  langCode: string,
  fallbackAr?: string,
  fallbackEn?: string
): string {
  const dictionary: Record<'cleanliness' | 'staff' | 'overall', Record<string, Record<string, string>>> = {
    cleanliness: {
      supermarket: {
        ar: 'ما رأيك في نظافة وترتيب الممرات والأرفف؟',
        en: 'How clean and organized were the aisles and shelves?',
        am: 'የመተላለፊያ መንገዶች እና መደርደሪያዎች ንፅህና እንዴት ነበር?',
        fr: 'Comment évaluez-vous la propreté et le rangement des rayons ?',
        hi: 'दुकान के गलियारों और अलमारियों की सफाई और व्यवस्था कैसी थी?',
        ur: 'گلیاروں اور شیلفوں کی صفائی اور ترتیب کیسی لگی؟',
        tl: 'Gaano kalinis at kaayos ang mga pasilyo at istante?',
      },
      cafe: {
        ar: 'ما رأيك في نظافة وهدوء الجلسات وأجواء الكافيه؟',
        en: 'How do you rate the seating cleanliness, quiet ambiance, and decor?',
        am: 'የካፌው መቀመጫዎች ንፅህና፣ ፀጥታ እና ድባብ እንዴት ነበር?',
        fr: 'Comment trouvez-vous la propreté, le calme et l’ambiance du café ?',
        hi: 'कैफे के बैठने की जगह की सफाई और शांत वातावरण कैसा था?',
        ur: 'کیفے کی بیٹھک، سکون اور ماحول کی صفائی کیسی لگی؟',
        tl: 'Kumusta ang kalinisan, tahimik na kapaligiran, at ayos ng cafe?',
      },
      restaurant: {
        ar: 'ما رأيك في نظافة الصالة وترتيب الطاولات وأدوات المائدة؟',
        en: 'How do you rate dining hall cleanliness, table setup, and cutlery?',
        am: 'የአዳራሹ ንፅህና፣ የጠረጴዛዎች እና የእቃዎች አቀማመጥ እንዴት ነበር?',
        fr: 'Comment évaluez-vous la propreté de la salle et la mise en table ?',
        hi: 'डाइनिंग हॉल की सफाई और टेबल व्यवस्था कैसी थी?',
        ur: 'ڈائننگ ہال کی صفائی اور میزوں کی ترتیب کیسی تھی؟',
        tl: 'Kumusta ang kalinisan ng bulwagan at pagkakaayos ng mga mesa?',
      },
    },
    staff: {
      supermarket: {
        ar: 'كيف تقيّم سرعة الكاشير وتعامل موظفي الفروع؟',
        en: 'How do you rate cashier speed and branch staff service?',
        am: 'የገንዘብ ተቀባዩ ፍጥነት እና የሰራተኞች አገልግሎት እንዴት ነበር?',
        fr: 'Comment évaluez-vous la rapidité en caisse et l’amabilité du personnel ?',
        hi: 'कैशियर की गति और स्टाफ के व्यवहार को आप क्या रेटिंग देंगे?',
        ur: 'کیشیئر کی رفتار اور عملے کے رویے کو آپ کیسا درجہ دیتے ہیں؟',
        tl: 'Paano mo irarate ang bilis ng kahera at pakikitungo ng kawani?',
      },
      cafe: {
        ar: 'كيف تقيّم سرعة تحضير الطلب واحترافية وبشاشة الباريستا؟',
        en: 'How do you rate order preparation speed and barista hospitality?',
        am: 'የትዕዛዝ ዝግጅት ፍጥነት እና የባሪስታው አቀባበል እንዴት ነበር?',
        fr: 'Comment évaluez-vous la rapidité de préparation et l’accueil du barista ?',
        hi: 'ऑर्डर तैयार करने की गति और बरिस्ता के आतिथ्य को आप कैसे आंकते हैं?',
        ur: 'آرڈر تیار کرنے کی رفتار اور بارسٹا کی مہمان نوازی کیسی لگی؟',
        tl: 'Paano mo irarate ang bilis ng paghahanda at pagiging magiliw ng barista?',
      },
      restaurant: {
        ar: 'كيف تقيّم سرعة تقديم الطعام ولطافة وحسن ضيافة طاقم الخدمة؟',
        en: 'How do you rate food serving speed and waitstaff hospitality?',
        am: 'የምግብ ማቅረቢያ ፍጥነት እና የአገልጋዮች እንክብካቤ እንዴት ነበር?',
        fr: 'Comment évaluez-vous la rapidité du service et la courtoisie des serveurs ?',
        hi: 'खाना परोसने की गति और सर्विस स्टाफ का आतिथ्य कैसा था?',
        ur: 'کھانا پیش کرنے کی رفتار اور ویٹرز کی مہمان نوازی کیسی رہی؟',
        tl: 'Paano mo irarate ang bilis ng pagsisilbi at pagiging maasikaso ng waiter?',
      },
    },
    overall: {
      supermarket: {
        ar: 'التقييم العام لتجربة التسوق في أسواق بنده',
        en: 'Overall supermarket shopping experience rating',
        am: 'የአጠቃላይ የገበያ ልምድ ደረጃ አሰጣጥ',
        fr: 'Évaluation générale de votre expérience en magasin',
        hi: 'खरीदारी के अनुभव की समग्र रेटिंग',
        ur: 'شاپنگ کے تجربے کی مجموعی درجہ بندی',
        tl: 'Pangkalahatang rating ng karanasan sa pamimili',
      },
      cafe: {
        ar: 'التقييم العام لتجربة الكافيه وجودة القهوة',
        en: 'Overall cafe visit rating and coffee quality',
        am: 'የካፌው ጉብኝት አጠቃላይ ደረጃ እና የቡናው ጥራት',
        fr: 'Évaluation globale de votre visite au café et qualité du café',
        hi: 'कैफे विजिट और कॉफी की गुणवत्ता की समग्र रेटिंग',
        ur: 'کیفے کے دورے اور کافی کے معیار کی مجموعی درجہ بندی',
        tl: 'Pangkalahatang rating ng pagbisita sa cafe at kalidad ng kape',
      },
      restaurant: {
        ar: 'التقييم العام لتجربة تناول الطعام في المطعم ومذاق الأطباق',
        en: 'Overall restaurant dining and hospitality experience rating',
        am: 'በሬስቶራንቱ ውስጥ የምግብ አጠቃላይ ደረጃ እና ጣዕም',
        fr: 'Évaluation globale de votre repas et de la saveur des plats',
        hi: 'रेस्तरां में भोजन और स्वाद की समग्र रेटिंग',
        ur: 'ریستوراں میں کھانے کے مجموعی تجربے اور ذائقے کی درجہ بندی',
        tl: 'Pangkalahatang rating ng pagkain sa restawran at sarap ng ulam',
      },
    },
  };

  const bKey = businessType === 'cafe' ? 'cafe' : businessType === 'restaurant' ? 'restaurant' : 'supermarket';
  const match = dictionary[questionType]?.[bKey];
  if (match) {
    return match[langCode] || match['en'] || match['ar'] || fallbackAr || fallbackEn || '';
  }
  return langCode === 'en' ? (fallbackEn || fallbackAr || '') : (fallbackAr || fallbackEn || '');
}

export function getRatingLabel(ratingId: 'great' | 'good' | 'normal' | 'bad', langCode: string, isOverall = false): string {
  const map: Record<string, Record<string, { short: string; full: string }>> = {
    great: {
      ar: { short: 'ممتاز', full: 'رائع جداً' },
      en: { short: 'Excellent', full: 'Amazing' },
      am: { short: 'በጣም ምርጥ', full: 'ድንቅ' },
      fr: { short: 'Excellent', full: 'Fantastique' },
      hi: { short: 'उत्कृष्ट', full: 'अति उत्तम' },
      ur: { short: 'بہترین', full: 'شاندار' },
      tl: { short: 'Napakagaling', full: 'Kamangha-mangha' },
    },
    good: {
      ar: { short: 'جيد', full: 'جيد ومُرضي' },
      en: { short: 'Good', full: 'Good & Satisfying' },
      am: { short: 'ጥሩ', full: 'ጥሩ እና አጥጋቢ' },
      fr: { short: 'Bon', full: 'Bon et satisfaisant' },
      hi: { short: 'अच्छा', full: 'संतोषजनक' },
      ur: { short: 'اچھا', full: 'تسلی بخش' },
      tl: { short: 'Mabuti', full: 'Kasiya-siya' },
    },
    normal: {
      ar: { short: 'عادي', full: 'عادي / متوسط' },
      en: { short: 'Average', full: 'Fair / Average' },
      am: { short: 'ተራ', full: 'መካከለኛ' },
      fr: { short: 'Moyen', full: 'Correct' },
      hi: { short: 'सामान्य', full: 'मध्यम' },
      ur: { short: 'عام', full: 'درمیانہ' },
      tl: { short: 'Karaniwan', full: 'Katamtaman' },
    },
    bad: {
      ar: { short: 'غير مرضي', full: 'غير مُرضي' },
      en: { short: 'Poor', full: 'Unsatisfied' },
      am: { short: 'አላረካም', full: 'መጥፎ' },
      fr: { short: 'Insatisfaisant', full: 'Mauvais' },
      hi: { short: 'खराब', full: 'असंतोषजनक' },
      ur: { short: 'غیر تسلی بخش', full: 'خراب' },
      tl: { short: 'Hindi Kasiya-siya', full: 'Masama' },
    },
  };

  const entry = map[ratingId]?.[langCode] || map[ratingId]?.['en'] || map[ratingId]?.['ar'];
  if (!entry) return ratingId;
  return isOverall ? entry.full : entry.short;
}

export function getUIString(key: string, langCode: string, params?: Record<string, string | number>): string {
  const dictionary: Record<string, Record<string, string>> = {
    connectedNotice: {
      ar: 'تم الربط! جاري المتابعة تلقائياً...',
      en: 'Connected! Moving forward automatically...',
      am: 'ተገናኝቷል! በቀጥታ እየቀጠለ ነው...',
      fr: 'Connecté ! Redirection automatique...',
      hi: 'जुड़ गया! स्वतः आगे बढ़ रहे हैं...',
      ur: 'منسلک ہو گیا! خود بخود آگے بڑھ رہے ہیں...',
      tl: 'Konektado na! Awtomatikong nagpapatuloy...',
    },
    choiceConfirmed: {
      ar: '✓ تم اختيار مكافأتك! جاري المتابعة...',
      en: '✓ Choice confirmed! Continuing...',
      am: '✓ ምርጫዎ ተረጋግጧል! በመቀጠል ላይ...',
      fr: '✓ Choix confirmé ! Redirection en cours...',
      hi: '✓ आपकी पसंद की पुष्टि हो गई! जारी है...',
      ur: '✓ آپ کا انتخاب منتخب ہو گیا! جاری ہے...',
      tl: '✓ Nakumpirma ang pagpili! Nagpapatuloy...',
    },
    tapRewardPrompt: {
      ar: 'اضغط على مكافأتك المفضلة للمتابعة مباشرة',
      en: 'Tap an option to proceed directly',
      am: 'ወዲያውኑ ለመቀጠል የሚፈልጉትን ሽልማት ይጫኑ',
      fr: 'Appuyez sur votre récompense préférée pour continuer',
      hi: 'सीधे आगे बढ़ने के लिए अपने पसंदीदा इनाम पर टैप करें',
      ur: 'براہ راست آگے بڑھنے کے لیے اپنے پسندیدہ انعام پر ٹیپ کریں',
      tl: 'I-tap ang iyong paboritong gantimpala upang magpatuloy',
    },
    sectionProgress: {
      ar: 'القسم {cur} من {total}: {dept}',
      en: 'Section {cur} of {total}: {dept}',
      am: 'ክፍል {cur} ከ {total}: {dept}',
      fr: 'Section {cur} sur {total} : {dept}',
      hi: 'अनुभाग {cur} / {total}: {dept}',
      ur: 'سیکشن {cur} از {total}: {dept}',
      tl: 'Seksyon {cur} ng {total}: {dept}',
    },
    completed: {
      ar: 'مكتمل:',
      en: 'Completed:',
      am: 'የተጠናቀቀ:',
      fr: 'Terminé :',
      hi: 'पूर्ण:',
      ur: 'مکمل:',
      tl: 'Kumpleto:',
    },
    allSectionsCompleted: {
      ar: '✓ اكتملت اختياراتك من جميع الأقسام بنجاح! جاري المتابعة تلقائياً... ✨',
      en: '✓ All sections completed! Proceeding automatically... ✨',
      am: '✓ ሁሉም ክፍሎች ተጠናቀዋል! በቀጥታ እየቀጠለ ነው... ✨',
      fr: '✓ Toutes les sections sont complétées ! Redirection automatique... ✨',
      hi: '✓ सभी अनुभाग पूरे हुए! स्वतः आगे बढ़ रहे हैं... ✨',
      ur: '✓ تمام سیکشنز مکمل ہو گئے! ازخود آگے بڑھ رہے ہیں... ✨',
      tl: '✓ Kumpleto na ang lahat ng seksyon! Awtomatikong nagpapatuloy... ✨',
    },
    selectFromSection: {
      ar: 'اختر طلبك من قسم "{dept}" للانتقال للقسم التالي',
      en: 'Select your choice from "{dept}" to proceed to the next section',
      am: 'ወደ ቀጣዩ ክፍል ለመሸጋገር ከ"{dept}" ይምረጡ',
      fr: 'Sélectionnez votre article dans « {dept} » pour passer à la suite',
      hi: 'अगले अनुभाग पर जाने के लिए "{dept}" से चुनें',
      ur: 'اگلے حصے پر جانے کے لیے "{dept}" سے اپنا انتخاب کریں',
      tl: 'Pumili sa "{dept}" upang pumunta sa susunod na seksyon',
    },
    movingToNextSection: {
      ar: '✓ تم الاختيار! جاري الانتقال إلى قسم "{dept}"... ⏳',
      en: '✓ Selected! Moving to {dept}... ⏳',
      am: '✓ ተመርጧል! ወደ {dept} በመሸጋገር ላይ... ⏳',
      fr: '✓ Choisi ! Passage à {dept}... ⏳',
      hi: '✓ चुना गया! {dept} पर आगे बढ़ रहे हैं... ⏳',
      ur: '✓ منتخب ہو گیا! سیکشن "{dept}" پر جا رہے ہیں... ⏳',
      tl: '✓ Napili na! Lilipat sa {dept}... ⏳',
    },
    tapToSubmit: {
      ar: 'اضغط للإرسال مباشرة',
      en: 'Tap to submit',
      am: 'በቀጥታ ለመላክ ይጫኑ',
      fr: 'Appuyez pour envoyer',
      hi: 'जमा करने के लिए टैप करें',
      ur: 'براہ راست بھیجنے کے لیے ٹیپ کریں',
      tl: 'I-tap upang ipadala',
    },
    selectOverallPrompt: {
      ar: 'اختر التقييم العام لإتمام الزيارة مباشرة بدون أزرار تأكيد',
      en: 'Select overall rating to complete visit directly',
      am: 'ያለ ማረጋገጫ ቁልፍ ጉብኝቱን በቀጥታ ለማጠናቀቅ አጠቃላይ ደረጃን ይምረጡ',
      fr: 'Sélectionnez l’évaluation générale pour terminer directement',
      hi: 'बिना पुष्टि बटन के विज़िट पूरी करने के लिए समग्र रेटिंग चुनें',
      ur: 'بغیر تصدیقی بٹن کے دورہ مکمل کرنے کے لیے مجموعی درجہ بندی منتخب کریں',
      tl: 'Piliin ang pangkalahatang rating upang tapusin agad ang pagbisita',
    },
    ratingRecorded: {
      ar: '✓ شكراً لتقييمك! جاري إتمام الزيارة...',
      en: '✓ Rating recorded! Finishing up...',
      am: '✓ ስለ ደረጃ አሰጣጥዎ እናመሰግናለን! እየተጠናቀቀ ነው...',
      fr: '✓ Évaluation enregistrée ! Finalisation en cours...',
      hi: '✓ आपकी रेटिंग दर्ज हो गई! समापन हो रहा है...',
      ur: '✓ آپ کی رائے درج ہو گئی! اختتام ہو رہا ہے...',
      tl: '✓ Naitala ang iyong rating! Tinatapos na...',
    },
    selectedBadge: {
      ar: 'تم الاختيار ✓',
      en: 'Selected ✓',
      am: 'ተመርጧል ✓',
      fr: 'Sélectionné ✓',
      hi: 'चुना गया ✓',
      ur: 'منتخب شدہ ✓',
      tl: 'Napili ✓',
    },
    tapToSelect: {
      ar: 'اضغط للاختيار',
      en: 'Tap to select',
      am: 'ለመምረጥ ይጫኑ',
      fr: 'Appuyez pour choisir',
      hi: 'चुनने के लिए टैप करें',
      ur: 'منتخب کرنے کے لیے ٹیپ کریں',
      tl: 'I-tap upang piliin',
    },
    noImage: {
      ar: 'لا توجد صورة',
      en: 'No image',
      am: 'ምስል የለም',
      fr: 'Aucune image',
      hi: 'कोई छवि नहीं',
      ur: 'کوئی تصویر نہیں',
      tl: 'Walang larawan',
    },
  };

  let str = dictionary[key]?.[langCode] || dictionary[key]?.['en'] || dictionary[key]?.['ar'] || key;
  if (params) {
    for (const [pKey, pVal] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
    }
  }
  return str;
}

export function getStoredLangCode(): string {
  try {
    const saved = localStorage.getItem('panda_current_lang');
    if (saved && (ALLOWED_LANG_CODES as readonly string[]).includes(saved)) {
      return saved;
    }
  } catch {}
  return 'ar';
}

export function saveStoredLangCode(code: string): void {
  try {
    localStorage.setItem('panda_current_lang', code);
  } catch {}
}

