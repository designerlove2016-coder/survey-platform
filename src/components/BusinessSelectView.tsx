import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Coffee, Utensils, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BusinessProjectType } from '../types';

interface BusinessSelectViewProps {
  currentLangCode: string;
  isRTL: boolean;
  onSelectBusiness: (type: 'supermarket' | 'cafe' | 'restaurant') => void;
  onBack: () => void;
  brandNameAr?: string;
  brandNameEn?: string;
  logoUrl?: string;
  selectedBusiness?: BusinessProjectType;
}

export const BusinessSelectView: React.FC<BusinessSelectViewProps> = ({
  currentLangCode,
  isRTL,
  onSelectBusiness,
  onBack,
  selectedBusiness = 'supermarket'
}) => {
  const lang = currentLangCode || 'ar';

  const t = (key: string): string => {
    const dict: Record<string, Record<string, string>> = {
      back: {
        ar: 'رجوع',
        en: 'Back',
        am: 'ተመለስ',
        fr: 'Retour',
        hi: 'वापस',
        ur: 'واپس',
        tl: 'Bumalik',
      },
      backTitle: {
        ar: 'رجوع لاختيار اللغة',
        en: 'Back to Language Selection',
        am: 'ወደ ቋንቋ ምርጫ ተመለስ',
        fr: 'Retour au choix de la langue',
        hi: 'भाषा चयन पर वापस जाएं',
        ur: 'زبان کے انتخاب پر واپس جائیں',
        tl: 'Bumalik sa Pagpili ng Wika',
      },
      personalizedBadge: {
        ar: 'تخصيص التجربة والنشاط',
        en: 'Personalized Experience Selection',
        am: 'የተበጀ ልምድ እና እንቅስቃሴ',
        fr: 'Personnalisation de l’expérience',
        hi: 'व्यक्तिगत अनुभव चयन',
        ur: 'تجربے اور سرگرمی کی تخصیص',
        tl: 'Pagpili ng Personal na Karanasan',
      },
      title: {
        ar: 'اختر وجهتك / نوع التجربة',
        en: 'Choose Your Destination / Activity',
        am: 'መድረሻዎን / የተሞክሮ አይነት ይምረጡ',
        fr: 'Choisissez votre destination / activité',
        hi: 'अपनी मंजिल / गतिविधि का प्रकार चुनें',
        ur: 'اپنی منزل / سرگرمی کی قسم منتخب کریں',
        tl: 'Piliin ang Iyong Patutunguhan / Aktibidad',
      },
      subtitle: {
        ar: 'اختر نوع النشاط لعرض المنتجات والأسئلة الخاصة بتجربتك بدقة',
        en: 'Select a business category to customize your products, offers, and dedicated survey',
        am: 'ምርቶችን እና ጥያቄዎችን በትክክል ለማበጀት የእንቅስቃሴውን አይነት ይምረጡ',
        fr: 'Sélectionnez une catégorie pour personnaliser vos produits et votre questionnaire',
        hi: 'अपने उत्पादों, प्रस्तावों और सर्वेक्षण को अनुकूलित करने के लिए श्रेणी चुनें',
        ur: 'مصنوعات، آفرز اور سروے کو اپنی مرضی کے مطابق بنانے کے لیے زمرہ منتخب کریں',
        tl: 'Pumili ng kategorya upang i-customize ang iyong mga produkto, alok, at survey',
      },
      footerNotice: {
        ar: '• سيتم تكييف المنتجات والأسئلة بالكامل حسب اختيارك',
        en: '• Products and questions will be customized based on your selection',
        am: '• ምርቶች እና ጥያቄዎች በምርጫዎ መሰረት ሙሉ በሙሉ ይስተካከላሉ',
        fr: '• Les produits et questions seront entièrement adaptés à votre choix',
        hi: '• आपके चयन के आधार पर उत्पाद और प्रश्न पूरी तरह अनुकूलित होंगे',
        ur: '• مصنوعات اور سوالات آپ کے انتخاب کے مطابق مکمل طور پر ڈھالے جائیں گے',
        tl: '• Ang mga produkto at tanong ay ganap na iaangkop batay sa iyong napili',
      },
    };
    return dict[key]?.[lang] || dict[key]?.['en'] || dict[key]?.['ar'] || key;
  };

  const businessOptions = [
    {
      id: 'supermarket' as const,
      icon: <ShoppingCart size={24} className="text-emerald-600" />,
      emoji: '🛒',
      title: {
        ar: 'سوبر ماركت',
        en: 'Supermarket',
        am: 'ሱፐርማርኬት',
        fr: 'Supermarché',
        hi: 'सुपरमार्केट',
        ur: 'سپر مارکیٹ',
        tl: 'Supermarket',
      }[lang] || 'Supermarket',
      desc: {
        ar: 'تسوق الأقسام الغذائية، المنتجات الطازجة، وعروض السلة الكاملة',
        en: 'Shop fresh grocery, food departments, and complete cart savings',
        am: 'ትኩስ የምግብ ሸቀጦች፣ አትክልቶች እና የጋሪ ቅናሾች ይሸምቱ',
        fr: 'Courses alimentaires, produits frais et économies sur votre panier',
        hi: 'ताजा किराना, खाद्य विभाग और पूरी टोकरी पर बचत की खरीदारी करें',
        ur: 'تازہ اشیائے خوردونوش، فوڈ سیکشنز اور پوری ٹوکری کی بچت کی خریداری کریں',
        tl: 'Bumili ng sariwang groseri, mga pagkain, at tipid sa buong cart',
      }[lang] || 'Shop fresh grocery, food departments, and complete cart savings',
      tag: {
        ar: 'تسوق وتموين',
        en: 'Grocery & Shopping',
        am: 'ግዢ እና ሸቀጥ',
        fr: 'Courses et épicerie',
        hi: 'किराना व खरीदारी',
        ur: 'خریداری اور راشن',
        tl: 'Groseri at Pamimili',
      }[lang] || 'Grocery & Shopping',
      colorClass: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 hover:border-emerald-500 hover:shadow-emerald-500/15',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      survey: {
        ar: 'استبيان: نظافة الممرات والأرفف • سرعة الكاشير • التقييم العام',
        en: 'Survey: Aisles cleanliness • Cashier speed • Overall shopping',
        am: 'ዳሰሳ ጥናት፡ የመተላለፊያ መንገዶች ንፅህና • የካሽየር ፍጥነት • አጠቃላይ ደረጃ',
        fr: 'Sondage : Propreté des rayons • Rapidité caisse • Avis global',
        hi: 'सर्वेक्षण: अलमारियों की सफाई • कैशियर की गति • समग्र खरीदारी',
        ur: 'سروے: شیلفوں کی صفائی • کیشیئر کی رفتار • مجموعی درجہ بندی',
        tl: 'Survey: Kalinisan ng istante • Bilis ng kahera • Pangkalahatang karanasan',
      }[lang] || 'Survey: Aisles cleanliness • Cashier speed • Overall shopping',
    },
    {
      id: 'cafe' as const,
      icon: <Coffee size={24} className="text-amber-600" />,
      emoji: '☕',
      title: {
        ar: 'كافيه ومقهى',
        en: 'Specialty Cafe',
        am: 'ካፌ እና ቡና',
        fr: 'Café de spécialité',
        hi: 'स्पेशलिटी कैफे',
        ur: 'اسپیشلٹی کیفے',
        tl: 'Specialty Cafe',
      }[lang] || 'Specialty Cafe',
      desc: {
        ar: 'أجود أنواع القهوة المختصة، المشروبات الباردة والحلويات والجلسات',
        en: 'Artisan specialty coffee, cold sips, pastries & cozy seating',
        am: 'ልዩ የቡና ዝርያዎች፣ ቀዝቃዛ መጠጦች፣ ጣፋጮች እና ምቹ መቀመጫዎች',
        fr: 'Café d’exception, boissons fraîches, pâtisseries et ambiance chaleureuse',
        hi: 'उत्कृष्ट विशेष कॉफी, ठंडे पेय, स्वादिष्ट पेस्ट्री और आरामदायक माहौल',
        ur: 'بہترین اسپیشلٹی کافی، ٹھنڈے مشروبات، پیسٹری اور پرسکون بیٹھک',
        tl: 'Artisan specialty coffee, malamig na inumin, pastry at maaliwalas na upuan',
      }[lang] || 'Artisan specialty coffee, cold sips, pastries & cozy seating',
      tag: {
        ar: 'قهوة ومشروبات',
        en: 'Coffee & Sips',
        am: 'ቡና እና መጠጦች',
        fr: 'Café et boissons',
        hi: 'कॉफी और पेय',
        ur: 'کافی اور مشروبات',
        tl: 'Kape at Inumin',
      }[lang] || 'Coffee & Sips',
      colorClass: 'from-amber-500/10 to-orange-500/10 border-amber-200 hover:border-amber-500 hover:shadow-amber-500/15',
      badgeBg: 'bg-amber-100 text-amber-900',
      survey: {
        ar: 'استبيان: هدوء وجلسات الكافيه • بشاشة الباريستا • مذاق القهوة',
        en: 'Survey: Seating ambiance • Barista hospitality • Coffee quality',
        am: 'ዳሰሳ ጥናት፡ የመቀመጫ ድባብ • የባሪስታ መስተንግዶ • የቡና ጥራት',
        fr: 'Sondage : Ambiance et confort • Accueil barista • Qualité du café',
        hi: 'सर्वेक्षण: बैठने का माहौल • बरिस्ता का आतिथ्य • कॉफी की गुणवत्ता',
        ur: 'سروے: بیٹھنے کا ماحول • بارسٹا کی مہمان نوازی • کافی کا معیار',
        tl: 'Survey: Ambiance ng upuan • Pagtanggap ng barista • Kalidad ng kape',
      }[lang] || 'Survey: Seating ambiance • Barista hospitality • Coffee quality',
    },
    {
      id: 'restaurant' as const,
      icon: <Utensils size={24} className="text-rose-600" />,
      emoji: '🍽️',
      title: {
        ar: 'مطعم ومأكولات',
        en: 'Restaurant & Dining',
        am: 'ሬስቶራንት እና ምግቦች',
        fr: 'Restaurant et gastronomie',
        hi: 'रेस्तरां और भोजन',
        ur: 'ریستوراں اور کھانے',
        tl: 'Restawran at Pagkain',
      }[lang] || 'Restaurant & Dining',
      desc: {
        ar: 'تشكيلة شهية من الوجبات الرئيسية، الأطباق الفاخرة، المقبلات وحسن الضيافة',
        en: 'Gourmet main courses, appetizing starters, desserts & fine hospitality',
        am: 'ጣፋጭ ዋና ዋና ምግቦች፣ ምርጥ መክሰሶች፣ ጣፋጮች እና የከበረ መስተንግዶ',
        fr: 'Plats gourmets, entrées raffinées, desserts et service chaleureux',
        hi: 'स्वादिष्ट मुख्य व्यंजन, ऐपेटाइज़र, लज़ीज़ डेसर्ट और बेहतरीन आतिथ्य',
        ur: 'لذیذ بنیادی کھانے، اشتہا انگیز اسٹارٹرز، میٹھے اور شاندار مہمان نوازی',
        tl: 'Masasarap na pangunahing ulam, pampagana, panghimagas at mainit na serbisyo',
      }[lang] || 'Gourmet main courses, appetizing starters, desserts & fine hospitality',
      tag: {
        ar: 'أطباق ووجبات',
        en: 'Dining & Meals',
        am: 'ምግቦች እና ምሳ',
        fr: 'Plats et repas',
        hi: 'भोजन और व्यंजन',
        ur: 'کھانے اور پکوان',
        tl: 'Mga Pagkain at Ulam',
      }[lang] || 'Dining & Meals',
      colorClass: 'from-rose-500/10 to-red-500/10 border-rose-200 hover:border-rose-500 hover:shadow-rose-500/15',
      badgeBg: 'bg-rose-100 text-rose-900',
      survey: {
        ar: 'استبيان: نظافة الصالة والطاولات • لطافة طاقم الخدمة • جودة المأكولات',
        en: 'Survey: Dining hall cleanliness • Waitstaff courtesy • Food taste',
        am: 'ዳሰሳ ጥናት፡ የአዳራሽ ንፅህና • የአገልጋዮች ጨዋነት • የምግብ ጣዕም',
        fr: 'Sondage : Propreté de la salle • Courtoisie du service • Saveur des mets',
        hi: 'सर्वेक्षण: हॉल की सफाई • स्टाफ की विनम्रता • भोजन का स्वाद',
        ur: 'سروے: ڈائننگ ہال کی صفائی • ویٹرز کی شائستگی • کھانے کا ذائقہ',
        tl: 'Survey: Kalinisan ng bulwagan • Kabaitan ng kawani • Sarap ng pagkain',
      }[lang] || 'Survey: Dining hall cleanliness • Waitstaff courtesy • Food taste',
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-3.5 sm:p-6 min-h-[500px] sm:min-h-[580px] flex flex-col justify-between text-center relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto flex items-center gap-1.5 text-gray-400 hover:text-[#005A2B] font-bold transition-colors z-20 cursor-pointer"
        title={t('backTitle')}
      >
        <div className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 shadow-2xs flex items-center justify-center border border-slate-200">
          {isRTL ? <ChevronRight size={16} className="text-gray-600" /> : <ChevronLeft size={16} className="text-gray-600" />}
        </div>
        <span className="text-xs text-gray-500">{t('back')}</span>
      </button>

      {/* Top Header */}
      <div className="flex flex-col items-center pt-2 select-none">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-black px-3 py-1 rounded-full mb-2">
          <Sparkles size={12} className="text-emerald-600" />
          <span>{t('personalizedBadge')}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-800 leading-tight">
          {t('title')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-sm mt-1">
          {t('subtitle')}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="space-y-2.5 my-3 w-full max-w-sm mx-auto">
        {businessOptions.map((opt) => {
          const isSelected = selectedBusiness === opt.id;
          return (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectBusiness(opt.id)}
              className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 text-right rtl:text-right ltr:text-left transition-all flex items-center gap-3 cursor-pointer bg-gradient-to-r ${opt.colorClass} ${
                isSelected ? 'ring-2 ring-[#005A2B] border-transparent shadow-md' : 'shadow-2xs'
              }`}
            >
              {/* Icon / Emoji badge */}
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center shrink-0 text-2xl">
                {opt.emoji}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-sm sm:text-base font-black text-gray-800">
                    {opt.title}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${opt.badgeBg}`}>
                    {opt.tag}
                  </span>
                </div>

                <p className="text-[11px] text-gray-600 line-clamp-1 font-medium">
                  {opt.desc}
                </p>

                <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500 font-semibold truncate">
                  <span className="text-xs">📋</span>
                  <span className="truncate">{opt.survey}</span>
                </div>
              </div>

              {/* Selection Checkmark */}
              <div className="shrink-0 text-emerald-600">
                {isSelected ? (
                  <CheckCircle2 size={20} className="fill-emerald-600 text-white" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center pb-1">
        <p className="text-[11px] text-gray-400 font-medium">
          {t('footerNotice')}
        </p>
      </div>
    </div>
  );
};

