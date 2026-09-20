/**
 * Auto-Translator utility: Translates Arabic text into natural English instantly.
 * Covers retail, supermarket, cafe, restaurant, surveys, menus, and general business terms.
 */

const EXACT_PHRASE_DICTIONARY: Record<string, string> = {
  // Supermarket & Store Titles
  'منتجات ممكن تفضلها وتجربها': 'Products you might like and try',
  'اختر طلباتك المفضلة لتجهيز عروضك وقسيمتك الحصرية': 'Select your favorite items to prepare your exclusive perks and voucher',
  'اختر احتياجاتك لهذا اليوم': 'Choose your needs for today',
  'اختر طلباتك المفضلة': 'Choose your favorite items',
  'اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة': 'Tap the products you plan to purchase to customize your perks',
  'اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.': 'Tap the products you plan to purchase to customize your perks.',
  '✓ تم اختيار المنتج! جاري المتابعة تلقائياً...': '✓ Item selected! Proceeding automatically...',
  'اضغط للاختيار': 'Tap to select',
  'اختر لغتك المفضلة': 'Choose your preferred language',
  'لتجربة تسوق ذكية وممتعة مخصصة لك': 'For a personalized and delightful shopping experience',
  'تأكيد ومتابعة': 'Confirm and continue',
  'تم الربط!': 'Connected successfully!',
  'استعد لتجربة تسوق ذكية مع بنده': 'Get ready for a smart shopping experience with Panda',
  'ماذا تفضل؟': 'What do you prefer?',
  'من تجربتك نحسن أداءنا وتطوير خدماتنا لكم': 'Your experience helps us enhance our services for you',
  'نقاط في التطبيق': 'App reward points',
  'كاش باك': 'Instant Cashback',
  'خصومات حصرية': 'Exclusive discounts',
  'عروض حصرية': 'Exclusive offers',
  'قسائم مجانية': 'Free vouchers',
  'هدايا وقسائم': 'Gifts and vouchers',
  'نقاط إضافية': 'Bonus points',
  'تحدي بنده السريع': 'Panda Speed Challenge',
  'فرقع شعارات بنده واجمع النقاط لربح قسائم خصم فورية!': 'Pop Panda logos and earn points to win instant discount vouchers!',
  'تقييم تجربتك معنا': 'Rate your experience with us',
  'رأيك يهمنا لتطوير وتحسين خدماتنا باستمرار': 'Your feedback helps us continuously improve our services',
  'شكراً لك على مشاركتك في تطوير خدماتنا': 'Thank you for helping us improve our services',
  'استلام الهدية الآن': 'Claim your gift now',
  'قسيمة خصم بنده الحصرية ✨': 'Exclusive Panda Discount Voucher ✨',
  'خصم فوري': 'Instant discount',
  'على كامل سلتك': 'On your entire basket',
  'صالح في قسم': 'Valid in department',
  'صالح لمدة 48 ساعة ⏳': 'Valid for 48 hours ⏳',
  'مرحباً بك في أسواق بنده': 'Welcome to Panda Markets',
  'نظافة وترتيب المكان': 'Cleanliness and organization of the place',
  'سرعة وتعامل موظفي المكان': 'Speed and friendliness of the staff',
  'التقييم العام للمشروع والزيارة': 'Overall experience and visit rating',
  'تسوق ممتع مع بنده لا يفوّت': 'Enjoyable shopping with Panda not to be missed',
  'نسعد دائماً بخدمتك في كل زيارة!': 'Always delighted to serve you on every visit!',
  'بنده معك تفرق': 'Panda makes the difference',
  'عالم من المزايا': 'A world of benefits',

  // Cafe specific
  'مشروبات وحلويات الكافيه': 'Cafe Drinks & Desserts Menu',
  'اختر مشروبك المفضل وحلاك': 'Choose your favorite drink and dessert',
  'مشروبات ساخنة': 'Hot Drinks',
  'مشروبات باردة': 'Cold Beverages',
  'حلويات ومخبوزات': 'Desserts & Pastries',
  'ساندوتشات ووجبات خفيفة': 'Sandwiches & Light Bites',
  'قهوة مختصة': 'Specialty Coffee',
  'شاي وأعشاب': 'Tea & Herbal Infusions',
  'عصائر طازجة': 'Fresh Juices',
  'كيك وكوكيز': 'Cakes & Cookies',

  // Restaurant specific
  'قائمة أطباق المطعم': 'Restaurant Dishes Menu',
  'اختر وجبتك وأطباقك المفضلة': 'Select your favorite meal and dishes',
  'أطباق رئيسية': 'Main Courses',
  'مقبلات وشوربات': 'Appetizers & Soups',
  'مشويات ولحوم': 'Grills & Meats',
  'أطباق بحرية': 'Seafood Dishes',
  'باستا وبيتزا': 'Pasta & Pizza',
  'سلطات طازجة': 'Fresh Salads',
  'وجبات أطفال': 'Kids Meals',
  'مشروبات منعشة': 'Refreshing Drinks',

  // Departments
  'خضار وفواكه': 'Fresh Fruits & Vegetables',
  'خضروات وفواكه': 'Fresh Vegetables & Fruits',
  'الأجبان والألبان': 'Dairy & Cheese',
  'ألبان وأجبان': 'Dairy & Cheese',
  'المواد الغذائية': 'Grocery & Food Staples',
  'مواد غذائية': 'Food & Pantry Essentials',
  'أدوات نظافة': 'Cleaning & Household Supplies',
  'عناية ونظافة': 'Personal Care & Hygiene',
  'سناك وحلويات': 'Snacks & Confectionery',
  'مخبوزات وحلويات': 'Bakery & Sweets',
  'لحوم ودواجن': 'Meat & Poultry',
  'مجمدات وسناك': 'Frozen Foods & Snacks',
  'مشروبات وعصائر': 'Beverages & Juices',

  // Ratings
  'رائع جداً': 'Excellent / Outstanding',
  'جيد': 'Good',
  'جيد ومُرضي': 'Good and satisfying',
  'عادي': 'Average / Normal',
  'عادي / متوسط': 'Average / Fair',
  'غير مرضي': 'Unsatisfactory',
  'غير مُرضي': 'Unsatisfactory',
  'ممتاز': 'Excellent',
};

const WORD_DICTIONARY: Record<string, string> = {
  // Common Retail / Action
  'منتجات': 'products',
  'منتج': 'product',
  'خدمات': 'services',
  'خدمة': 'service',
  'قائمة': 'menu',
  'قسم': 'department',
  'أقسام': 'departments',
  'ممكن': 'you may',
  'تفضلها': 'prefer',
  'وتجربها': 'and try',
  'اختر': 'choose',
  'اختيار': 'selection',
  'اختيارات': 'choices',
  'طلباتك': 'your orders',
  'طلب': 'order',
  'المفضلة': 'favorite',
  'المفضل': 'favorite',
  'لتجهيز': 'to prepare',
  'تجهيز': 'preparation',
  'عروضك': 'your offers',
  'عروض': 'offers',
  'عرض': 'offer',
  'وقسيمتك': 'and voucher',
  'قسيمتك': 'your voucher',
  'قسيمة': 'voucher',
  'قسائم': 'vouchers',
  'الحصرية': 'exclusive',
  'حصري': 'exclusive',
  'حصرية': 'exclusive',
  'لهذا': 'for this',
  'اليوم': 'day',
  'احتياجاتك': 'your needs',
  'احتياجات': 'needs',
  'نص': 'text',
  'عنوان': 'title',
  'سؤال': 'question',
  'رئيسي': 'main',
  'توضيحي': 'explanatory',
  'رسالة': 'message',
  'تلميح': 'hint',
  'بطاقة': 'card',
  'اضغط': 'tap',
  'للاختيار': 'to select',
  'تم': 'completed',
  'تحديد': 'selected',
  'جاري': 'currently',
  'المتابعة': 'proceeding',
  'تلقائيا': 'automatically',
  'تلقائياً': 'automatically',
  'جديد': 'new',
  'جديدة': 'new',
  'طازج': 'fresh',
  'طازجة': 'fresh',
  'فاخر': 'luxury',
  'فاخرة': 'premium',
  'خاص': 'special',
  'خاصة': 'special',
  'سريع': 'quick',
  'سريعة': 'express',
  'ممتاز': 'excellent',
  'جيد': 'good',
  'رائع': 'great',

  // Food / Supermarket
  'طماطم': 'tomatoes',
  'خيار': 'cucumber',
  'بصل': 'onion',
  'بطاطس': 'potatoes',
  'تفاح': 'apples',
  'موز': 'bananas',
  'برتقال': 'oranges',
  'عنب': 'grapes',
  'فراولة': 'strawberries',
  'أرز': 'rice',
  'سكر': 'sugar',
  'زيت': 'oil',
  'دقيق': 'flour',
  'حليب': 'milk',
  'لبن': 'buttermilk',
  'زبادي': 'yogurt',
  'لبنة': 'labneh',
  'جبن': 'cheese',
  'أجبان': 'cheese',
  'شيدر': 'cheddar',
  'موزاريلا': 'mozzarella',
  'لحم': 'meat',
  'لحوم': 'meats',
  'دجاج': 'chicken',
  'سمك': 'fish',
  'تونة': 'tuna',
  'خبز': 'bread',
  'كرواسون': 'croissant',
  'كعك': 'cake',
  'بسكويت': 'biscuit',
  'شوكولاتة': 'chocolate',
  'شيبس': 'chips',
  'عصير': 'juice',
  'ماء': 'water',
  'مياه': 'water',
  'شاي': 'tea',
  'قهوة': 'coffee',
  'مكسرات': 'nuts',

  // Cafe / Drinks
  'كابتشينو': 'cappuccino',
  'لاتيه': 'latte',
  'إسبريسو': 'espresso',
  'اسبريسو': 'espresso',
  'سبانش': 'spanish',
  'فلات': 'flat',
  'وايت': 'white',
  'موكا': 'mocha',
  'كراميل': 'caramel',
  'فانيلا': 'vanilla',
  'ماتشا': 'matcha',
  'ايس': 'iced',
  'مثلج': 'iced',
  'بارد': 'cold',
  'باردة': 'cold',
  'ساخن': 'hot',
  'ساخنة': 'hot',
  'كوكيز': 'cookies',
  'براونيز': 'brownies',
  'تشيز': 'cheese',
  'كيك': 'cake',
  'دونات': 'donut',
  'بانكيك': 'pancake',
  'وافل': 'waffle',

  // Restaurant / Meals
  'برجر': 'burger',
  'بيتزا': 'pizza',
  'باستا': 'pasta',
  'شاورما': 'shawarma',
  'مشاوي': 'grills',
  'كباب': 'kebab',
  'شيش': 'shish',
  'طاووق': 'tawook',
  'سلطة': 'salad',
  'شوربة': 'soup',
  'مقبلات': 'appetizers',
  'وجبة': 'meal',
  'وجبات': 'meals',
  'عشاء': 'dinner',
  'غداء': 'lunch',
  'فطور': 'breakfast',
  'حلا': 'dessert',
  'حلوى': 'dessert',
  'حلويات': 'sweets',

  // Store & Panda Brand
  'بنده': 'Panda',
  'هايبر': 'Hyper',
  'سوبرماركت': 'Supermarket',
  'كافيه': 'Cafe',
  'مطعم': 'Restaurant',
  'متجر': 'Store',
  'تسوق': 'Shopping',
  'عميل': 'Customer',
  'عملاء': 'Customers',
  'زائر': 'Visitor',
  'تقييم': 'Rating',
  'آراء': 'Reviews',
  'رأي': 'Opinion',
  'نظافة': 'Cleanliness',
  'ترتيب': 'Organization',
  'سرعة': 'Speed',
  'موظفين': 'Staff',
  'موظفي': 'Staff of',
  'المكان': 'Venue',
  'تجربة': 'Experience',
  'تحدي': 'Challenge',
  'نقاط': 'Points',
  'هدية': 'Gift',
  'هدايا': 'Gifts',
  'خصم': 'Discount',
  'كوبون': 'Coupon',
};

/**
 * Strips Arabic definite article 'ال' for matching dictionary entries
 */
function cleanArabicWord(w: string): string {
  let cleaned = w.trim().replace(/[.,!؟?()،"']/g, '');
  return cleaned;
}

/**
 * Translates an Arabic text into English.
 * 1. Checks exact phrase dictionary
 * 2. Translates word-by-word with grammatical heuristics
 * 3. Formats into natural title case
 */
export function translateArabicToEnglish(arabicText: string): string {
  if (!arabicText) return '';
  const trimmed = arabicText.trim();
  if (!trimmed) return '';

  // 1. Exact phrase match
  if (EXACT_PHRASE_DICTIONARY[trimmed]) {
    return EXACT_PHRASE_DICTIONARY[trimmed];
  }

  // Check without trailing punctuation
  const noPunct = trimmed.replace(/[.!?؟،]$/, '').trim();
  if (EXACT_PHRASE_DICTIONARY[noPunct]) {
    return EXACT_PHRASE_DICTIONARY[noPunct];
  }

  // 2. Tokenize words
  const words = trimmed.split(/\s+/);
  const translatedWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const rawWord = words[i];
    const cleaned = cleanArabicWord(rawWord);

    // Direct match
    if (WORD_DICTIONARY[cleaned]) {
      translatedWords.push(WORD_DICTIONARY[cleaned]);
      continue;
    }

    // Try stripping 'ال' prefix (if word has at least 4 letters: ال + 2 letters)
    if (cleaned.startsWith('ال') && cleaned.length >= 4) {
      const stripped = cleaned.substring(2);
      if (WORD_DICTIONARY[stripped]) {
        translatedWords.push(WORD_DICTIONARY[stripped]);
        continue;
      }
    }

    // Try stripping 'و' prefix (and)
    if (cleaned.startsWith('و') && cleaned.length >= 3) {
      const stripped = cleaned.substring(1);
      if (WORD_DICTIONARY[stripped]) {
        translatedWords.push('and ' + WORD_DICTIONARY[stripped]);
        continue;
      }
      if (stripped.startsWith('ال') && stripped.length >= 4) {
        const withoutAl = stripped.substring(2);
        if (WORD_DICTIONARY[withoutAl]) {
          translatedWords.push('and ' + WORD_DICTIONARY[withoutAl]);
          continue;
        }
      }
    }

    // Try stripping 'ب' or 'ل' or 'ك' prefix
    if ((cleaned.startsWith('ب') || cleaned.startsWith('ل')) && cleaned.length >= 3) {
      const stripped = cleaned.substring(1);
      if (WORD_DICTIONARY[stripped]) {
        translatedWords.push(WORD_DICTIONARY[stripped]);
        continue;
      }
    }

    // If English or numbers, keep as is
    if (/^[A-Za-z0-9_\-–+/%$#@!]+$/.test(rawWord)) {
      translatedWords.push(rawWord);
      continue;
    }

    // Fallback transliteration or keep word
    translatedWords.push(cleaned);
  }

  if (translatedWords.length === 0) {
    return arabicText;
  }

  let result = translatedWords.join(' ');
  // Clean up double spaces or weird punctuation
  result = result.replace(/\s+/g, ' ').trim();

  // Capitalize first letter of sentence or title
  return result.charAt(0).toUpperCase() + result.slice(1);
}
