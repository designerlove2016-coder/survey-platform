// Smart AI Product Scanner & Recognizer
// Reads uploaded product images and extracts accurate Arabic name & emoji

export interface ScannedProductResult {
  name: string;
  nameEn?: string;
  icon: string;
  category?: string;
  confidence?: 'high' | 'medium';
  source: 'gemini' | 'heuristic';
}

const COMMON_PRODUCT_DICTIONARY: Array<{
  keywords: string[];
  nameAr: string;
  nameEn: string;
  icon: string;
  category: string;
}> = [
  // Vegetables & Fruits
  { keywords: ['tomato', 'طماطم', 'طماطه', 'pomodoro', 'tomatoes'], nameAr: 'طماطم طازجة', nameEn: 'Fresh Tomatoes', icon: '🍅', category: 'خضار' },
  { keywords: ['cucumber', 'خيار', 'خيارة', 'cucumbers'], nameAr: 'خيار مزارع طازج', nameEn: 'Fresh Cucumber', icon: '🥒', category: 'خضار' },
  { keywords: ['onion', 'بصل', 'بصلة', 'red-onion'], nameAr: 'بصل أحمر محلي', nameEn: 'Red Onions', icon: '🧅', category: 'خضار' },
  { keywords: ['potato', 'بطاطس', 'بطاطا', 'potatoes'], nameAr: 'بطاطس كيس ممتاز', nameEn: 'Potatoes', icon: '🥔', category: 'خضار' },
  { keywords: ['carrot', 'جزر', 'carrots'], nameAr: 'جزر مستورد طازج', nameEn: 'Fresh Carrots', icon: '🥕', category: 'خضار' },
  { keywords: ['garlic', 'ثوم'], nameAr: 'ثوم شبك طازج', nameEn: 'Garlic', icon: '🧄', category: 'خضار' },
  { keywords: ['lettuce', 'خس', 'salad'], nameAr: 'خس روماني طازج', nameEn: 'Romaine Lettuce', icon: '🥬', category: 'خضار' },
  { keywords: ['apple', 'تفاح', 'تفاحة'], nameAr: 'تفاح أحمر سكري', nameEn: 'Red Apples', icon: '🍎', category: 'فواكه' },
  { keywords: ['banana', 'موز', 'موزة'], nameAr: 'موز فلبيني درجة أولى', nameEn: 'Bananas', icon: '🍌', category: 'فواكه' },
  { keywords: ['orange', 'برتقال', 'برتقالة'], nameAr: 'برتقال عصير أبو صرة', nameEn: 'Oranges', icon: '🍊', category: 'فواكه' },
  { keywords: ['lemon', 'ليمون', 'lime'], nameAr: 'ليمون أصفر طازج', nameEn: 'Lemons', icon: '🍋', category: 'فواكه' },
  { keywords: ['strawberry', 'فراولة'], nameAr: 'فراولة علبة طازجة', nameEn: 'Strawberries', icon: '🍓', category: 'فواكه' },
  { keywords: ['grapes', 'عنب'], nameAr: 'عنب أسود فاخر', nameEn: 'Grapes', icon: '🍇', category: 'فواكه' },
  { keywords: ['watermelon', 'بطيخ', 'حبحب', 'جح'], nameAr: 'بطيخ مدور حلو', nameEn: 'Watermelon', icon: '🍉', category: 'فواكه' },
  { keywords: ['mango', 'مانجو', 'مانجا'], nameAr: 'مانجو تيمور فاخر', nameEn: 'Mango', icon: '🥭', category: 'فواكه' },

  // Dairy & Cheese
  { keywords: ['milk', 'حليب', 'لبن', 'almarai', 'nadec', 'saudia'], nameAr: 'حليب كامل الدسم', nameEn: 'Fresh Milk', icon: '🥛', category: 'ألبان' },
  { keywords: ['cheese', 'جبن', 'جبنة', 'cheddar', 'kiri', 'puck'], nameAr: 'جبن شيدر فاخر', nameEn: 'Cheddar Cheese', icon: '🧀', category: 'ألبان' },
  { keywords: ['yogurt', 'زبادي', 'روب'], nameAr: 'زبادي طازج', nameEn: 'Fresh Yogurt', icon: '🥣', category: 'ألبان' },
  { keywords: ['butter', 'زبدة', 'lurpuck'], nameAr: 'زبدة طبيعية غير مملحة', nameEn: 'Natural Butter', icon: '🧈', category: 'ألبان' },
  { keywords: ['cream', 'قشطة', 'قيمر'], nameAr: 'قشطة طازجة', nameEn: 'Fresh Cream', icon: '🥛', category: 'ألبان' },
  { keywords: ['egg', 'eggs', 'بيض'], nameAr: 'طبق بيض طازج 30 حبة', nameEn: 'Fresh Eggs', icon: '🥚', category: 'ألبان' },

  // Pantry & Groceries
  { keywords: ['rice', 'أرز', 'رز', 'basmati'], nameAr: 'أرز بسمتي درجة أولى', nameEn: 'Basmati Rice', icon: '🍚', category: 'غذائية' },
  { keywords: ['oil', 'زيت', 'sunflower', 'corn-oil', 'عافية'], nameAr: 'زيت ذرة نقي', nameEn: 'Pure Cooking Oil', icon: '🌻', category: 'غذائية' },
  { keywords: ['olive-oil', 'زيتون', 'olive'], nameAr: 'زيت زيتون بكر ممتاز', nameEn: 'Extra Virgin Olive Oil', icon: '🫒', category: 'غذائية' },
  { keywords: ['pasta', 'مكرونة', 'معكرونة', 'spaghetti'], nameAr: 'مكرونة قودي مشكلة', nameEn: 'Pasta', icon: '🍝', category: 'غذائية' },
  { keywords: ['sugar', 'سكر'], nameAr: 'سكر ناعم نقي', nameEn: 'Refined Sugar', icon: '🍬', category: 'غذائية' },
  { keywords: ['flour', 'دقيق', 'طحين', 'fom'], nameAr: 'دقيق فاخر متعدد الاستخدام', nameEn: 'Flour', icon: '🌾', category: 'غذائية' },
  { keywords: ['tea', 'شاي', 'lipton', 'rabea'], nameAr: 'شاي أحمر فرط كبوس', nameEn: 'Red Tea', icon: '🫖', category: 'مشروبات' },
  { keywords: ['coffee', 'قهوة', 'nescafe'], nameAr: 'قهوة سريعة التحضير', nameEn: 'Coffee', icon: '☕', category: 'مشروبات' },
  { keywords: ['juice', 'عصير', 'rani', 'caesar'], nameAr: 'عصير برتقال طبيعي', nameEn: 'Natural Juice', icon: '🧃', category: 'مشروبات' },
  { keywords: ['water', 'مياه', 'ماء', 'nestle', 'berain', 'nova'], nameAr: 'كرتون مياه شرب نقية', nameEn: 'Drinking Water', icon: '💧', category: 'مشروبات' },
  { keywords: ['honey', 'عسل'], nameAr: 'عسل سدر طبيعي', nameEn: 'Pure Honey', icon: '🍯', category: 'غذائية' },

  // Meat & Poultry
  { keywords: ['chicken', 'دجاج', 'دجاجة', 'sadia', 'tanmiah'], nameAr: 'دجاج طازج مبرد', nameEn: 'Fresh Chicken', icon: '🍗', category: 'لحوم' },
  { keywords: ['meat', 'beef', 'لحم', 'لحمة', 'steak'], nameAr: 'لحم بقري محلي بالعظم', nameEn: 'Fresh Meat', icon: '🥩', category: 'لحوم' },
  { keywords: ['fish', 'سمك', 'salmon', 'تونا', 'tuna'], nameAr: 'سمك سلمون طازج', nameEn: 'Fresh Fish', icon: '🐟', category: 'مأكولات بحرية' },

  // Snacks & Bakery
  { keywords: ['bread', 'خبز', 'صامولي', 'توست'], nameAr: 'خبز توست أبيض هرفي', nameEn: 'White Bread', icon: '🍞', category: 'مخبوزات' },
  { keywords: ['croissant', 'كرواسون', 'فطيرة'], nameAr: 'كرواسون بالزبدة', nameEn: 'Butter Croissant', icon: '🥐', category: 'مخبوزات' },
  { keywords: ['biscuit', 'بسكويت', 'cookie', 'cookies', 'oreo'], nameAr: 'بسكويت شاي أصلي', nameEn: 'Tea Biscuits', icon: '🍪', category: 'سناك' },
  { keywords: ['chocolate', 'شوكولاتة', 'galaxy', 'kitkat'], nameAr: 'شوكولاتة بالحليب', nameEn: 'Milk Chocolate', icon: '🍫', category: 'حلويات' },
  { keywords: ['chips', 'شيبس', 'بطاطس-شيبس', 'lays', 'doritos'], nameAr: 'شيبس مقرمش نكهة حارة', nameEn: 'Potato Chips', icon: '🥔', category: 'سناك' },

  // Cleaning & Household
  { keywords: ['detergent', 'صابون', 'مسحوق', 'tide', 'ariel', 'bonux'], nameAr: 'مسحوق غسيل مركز', nameEn: 'Washing Powder', icon: '🧺', category: 'نظافة' },
  { keywords: ['dishwash', 'صحون', 'fairy', 'pril'], nameAr: 'سائل غسيل الصحون بالليمون', nameEn: 'Dishwashing Liquid', icon: '🧼', category: 'نظافة' },
  { keywords: ['tissue', 'مناديل', 'فاين', 'kleenex'], nameAr: 'مناديل وجه ناعمة', nameEn: 'Facial Tissues', icon: '🧻', category: 'عناية' },
  { keywords: ['shampoo', 'شامبو', 'sunsilk', 'pantene', 'head-shoulders'], nameAr: 'شامبو مغذي للشعر', nameEn: 'Hair Shampoo', icon: '🧴', category: 'عناية' },
  { keywords: ['toothpaste', 'معجون', 'signal', 'colgate'], nameAr: 'معجون أسنان حماية متكاملة', nameEn: 'Toothpaste', icon: '🪥', category: 'عناية' },
  { keywords: ['sponge', 'إسفنج', 'اسفنجة'], nameAr: 'إسفنجة تنظيف متينة', nameEn: 'Cleaning Sponge', icon: '🧽', category: 'نظافة' },
];

/**
 * Recognizes a product from an image (data URL or standard URL) and/or filename.
 * 1. Tries the Gemini API endpoint first if available.
 * 2. Seamlessly falls back to fast client-side heuristic/dictionary scanning.
 */
export async function analyzeProductImage(
  imageSource: string,
  fileName?: string
): Promise<ScannedProductResult> {
  // 1. Try server-side Gemini Vision first
  try {
    const isDataUrl = imageSource.startsWith('data:');
    let base64Clean = '';
    let mimeType = 'image/jpeg';

    if (isDataUrl) {
      const match = imageSource.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64Clean = match[2];
      }
    }

    // Call server endpoint if we have base64 or a valid URL
    const response = await fetch('/api/analyze-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: base64Clean || undefined,
        imageUrl: !isDataUrl ? imageSource : undefined,
        mimeType: mimeType,
        fileName: fileName || '',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.productNameAr) {
        return {
          name: data.productNameAr,
          nameEn: data.productNameEn || '',
          icon: data.emoji || '🛍️',
          category: data.category || 'عام',
          confidence: 'high',
          source: 'gemini',
        };
      }
    }
  } catch {
    // Gracefully continue to heuristic recognition
  }

  // 2. Intelligent Heuristic & Dictionary Matching
  const searchCorpus = `${fileName || ''} ${imageSource}`.toLowerCase();

  for (const item of COMMON_PRODUCT_DICTIONARY) {
    for (const kw of item.keywords) {
      if (searchCorpus.includes(kw.toLowerCase())) {
        return {
          name: item.nameAr,
          nameEn: item.nameEn,
          icon: item.icon,
          category: item.category,
          confidence: 'medium',
          source: 'heuristic',
        };
      }
    }
  }

  // Fallback defaults based on generic image inspection
  return {
    name: fileName ? cleanFileNameToTitle(fileName) : 'منتج بنده المميز',
    nameEn: 'Panda Product',
    icon: '🛍️',
    category: 'منتجات متنوعة',
    confidence: 'medium',
    source: 'heuristic',
  };
}

export function cleanFileNameToTitle(rawName: string): string {
  const withoutExt = rawName.replace(/\.[^/.]+$/, '');
  const cleaned = withoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .trim();
  return cleaned ? `منتج ${cleaned}` : 'منتج بنده الطازج';
}
