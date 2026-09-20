import React, { useRef } from 'react';
import { 
  Palette, 
  Sparkles, 
  Upload, 
  MapPin, 
  Gift, 
  CheckCircle2, 
  Heart, 
  ExternalLink,
  Store,
  Compass,
  Check
} from 'lucide-react';
import { 
  SurveyBrandingConfig, 
  SurveyThemeConfig, 
  SurveyThemePreset 
} from '../../../types/surveyPlatform';
import { THEME_PRESETS } from '../../../utils/surveyDefaults';

interface SurveyBrandingStylingProps {
  branding: SurveyBrandingConfig;
  theme: SurveyThemeConfig;
  onUpdateBranding: (updated: SurveyBrandingConfig) => void;
  onUpdateTheme: (updated: SurveyThemeConfig) => void;
  isEnglish?: boolean;
}

export const SurveyBrandingStyling: React.FC<SurveyBrandingStylingProps> = ({
  branding,
  theme,
  onUpdateBranding,
  onUpdateTheme,
  isEnglish = false
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateBranding({
          ...branding,
          logoUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (presetKey: SurveyThemePreset) => {
    const preset = THEME_PRESETS[presetKey];
    if (preset) {
      onUpdateTheme(preset);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Restaurant & Branch Identity */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Store size={18} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800">
              {isEnglish ? 'Restaurant & Branch Identity' : 'هوية المطعم والفرع في ترويسة الاستبيان'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEnglish ? 'Appears prominently in the mobile survey header' : 'تظهر في أعلى شاشة التقييم للعميل مع الشعار والترحيب'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Logo upload box */}
          <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors text-center">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden mb-3">
              {branding.logoUrl ? (
                <img 
                  src={branding.logoUrl} 
                  alt="Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              ) : (
                <Store size={32} className="text-slate-300" />
              )}
            </div>
            <input 
              type="file" 
              ref={logoInputRef} 
              onChange={handleLogoUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <Upload size={13} />
              <span>{isEnglish ? 'Upload Logo' : 'رفع شعار المطعم'}</span>
            </button>
            <span className="text-[10px] text-slate-400 mt-1.5">PNG / JPG / WEBP</span>
          </div>

          {/* Names & Branch */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  {isEnglish ? 'Restaurant / Cafe Name (Arabic)' : 'اسم المطعم أو الكافيه (بالعربية)'}
                </label>
                <input
                  type="text"
                  value={branding.restaurantName}
                  onChange={(e) => onUpdateBranding({ ...branding, restaurantName: e.target.value })}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  {isEnglish ? 'Branch Name' : 'اسم الفرع المحدد'}
                </label>
                <input
                  type="text"
                  value={branding.branchName}
                  onChange={(e) => onUpdateBranding({ ...branding, branchName: e.target.value })}
                  placeholder="فرع التحلية - جدة"
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                />
              </div>
            </div>

            {/* Welcome message */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                {isEnglish ? 'Welcome Greeting Headline' : 'رسالة الترحيب الأولى للضيف'}
              </label>
              <input
                type="text"
                value={branding.welcomeTitle}
                onChange={(e) => onUpdateBranding({ ...branding, welcomeTitle: e.target.value })}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                {isEnglish ? 'Welcome Subtitle & Incentive' : 'الوصف التشجيعي للاستبيان (الحافز)'}
              </label>
              <input
                type="text"
                value={branding.welcomeSubtitle}
                onChange={(e) => onUpdateBranding({ ...branding, welcomeSubtitle: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Color Themes & Atmosphere Presets */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Palette size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800">
                {isEnglish ? 'Color Palette & Atmosphere Presets' : 'طابع الألوان وأجواء الاستبيان الفاخرة'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEnglish ? 'Select a curated color palette for your brand vibe' : 'اختر الهوية البصرية الأنسب لهوية علامتك (داكن فاخر، كافيه، زمردي، حيوي)'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            {
              id: 'espresso_cafe',
              titleAr: 'قهوة وكافيه دافئ',
              titleEn: 'Warm Espresso Cafe',
              bgClass: 'bg-[#FAF5EE]',
              primaryColor: '#78350F',
              accentColor: '#D97706',
              textColor: '#29180C',
              desc: 'درجات البن والأخشاب العطرية'
            },
            {
              id: 'luxury_dark',
              titleAr: 'فخامة ليلية داكنة',
              titleEn: 'Luxury Dark VIP',
              bgClass: 'bg-[#0F172A]',
              primaryColor: '#F59E0B',
              accentColor: '#10B981',
              textColor: '#F8FAFC',
              desc: 'خلفية سوداء راقية مع ذهبي'
            },
            {
              id: 'emerald_oasis',
              titleAr: 'واحة الزمرد والأخضر',
              titleEn: 'Emerald Oasis',
              bgClass: 'bg-[#F0FDF4]',
              primaryColor: '#005A2B',
              accentColor: '#10B981',
              textColor: '#064E3B',
              desc: 'نضارة طبيعية وهوية بنده'
            },
            {
              id: 'vibrant_light',
              titleAr: 'عصري ووردي مشرق',
              titleEn: 'Vibrant Light Bistro',
              bgClass: 'bg-[#FFF5F5]',
              primaryColor: '#E11D48',
              accentColor: '#F97316',
              textColor: '#1E293B',
              desc: 'ألوان حيوية للحلويات والمأكولات'
            },
            {
              id: 'royal_amber',
              titleAr: 'العنبر الملكي الذهبي',
              titleEn: 'Royal Amber Gold',
              bgClass: 'bg-[#FFFBEB]',
              primaryColor: '#B45309',
              accentColor: '#F59E0B',
              textColor: '#451A03',
              desc: 'فخامة كلاسيكية للمطاعم الراقية'
            }
          ].map(preset => {
            const isSelected = theme.preset === preset.id;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id as SurveyThemePreset)}
                className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#005A2B] ring-2 ring-[#005A2B]/20 shadow-md bg-white' 
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                {/* Mini preview card */}
                <div 
                  className={`w-full h-14 rounded-xl mb-2.5 p-2 flex flex-col justify-between border border-black/5 ${preset.bgClass}`}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-3.5 h-3.5 rounded-full" 
                      style={{ backgroundColor: preset.primaryColor }}
                    />
                    <div 
                      className="w-8 h-2 rounded-full" 
                      style={{ backgroundColor: preset.accentColor }}
                    />
                  </div>
                  <div 
                    className="h-1.5 rounded-full w-2/3" 
                    style={{ backgroundColor: preset.primaryColor, opacity: 0.6 }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800">
                      {preset.titleAr}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#005A2B] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {preset.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Google Maps 5-Star Conversion & Smart Redirection */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/40 p-6 rounded-2xl border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-800">
                  {isEnglish ? 'Google Maps 5-Star Review Booster' : 'ميزة توجيه التقييمات الإيجابية لـ Google Maps'}
                </h3>
                <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                  PRO BOOST
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isEnglish 
                  ? 'Guests who rate 5 stars will be prompted to post a review on your Google Maps page!' 
                  : 'العملاء السعداء (الذين يقيمون 5 نجوم) يُعرض عليهم فوراً زر لنشر إشادتهم مباشرة في صفحة المطعم على خرائط جوجل!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enableGoogleMaps"
              checked={branding.enableGoogleMapsRedirectOn5Star}
              onChange={(e) => onUpdateBranding({ ...branding, enableGoogleMapsRedirectOn5Star: e.target.checked })}
              className="w-4 h-4 text-[#005A2B] rounded-sm focus:ring-[#005A2B]"
            />
            <label htmlFor="enableGoogleMaps" className="text-xs font-bold text-slate-700 cursor-pointer">
              {isEnglish ? 'Active' : 'تفعيل'}
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {isEnglish ? 'Google Maps Place Review Link' : 'رابط صفحة تقييم الفرع على خرائط جوجل (Google Maps Link)'}
            </label>
            <div className="relative">
              <input
                type="url"
                value={branding.googleMapsReviewUrl}
                onChange={(e) => onUpdateBranding({ ...branding, googleMapsReviewUrl: e.target.value })}
                placeholder="https://g.page/r/your-restaurant-id/review"
                className="w-full text-xs p-2.5 pl-8 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden font-mono"
              />
              <MapPin size={14} className="absolute left-2.5 top-3 text-slate-400" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isEnglish ? 'Get your short review link from Google Business Profile' : 'يمكنك نسخ رابط المراجعات السريع من حساب نشاطك التجاري في Google'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {isEnglish ? 'Instant Reward Voucher Text' : 'نص قسيمة المكافأة الفورية للعميل'}
            </label>
            <input
              type="text"
              value={branding.rewardVoucherText}
              onChange={(e) => onUpdateBranding({ ...branding, rewardVoucherText: e.target.value })}
              placeholder="كود الخصم: GUEST15 (خصم 15% على زيارتك القادمة)"
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isEnglish ? 'Displayed on the final thank you screen' : 'تظهر في شاشة الشكر بعد إتمام الاستبيان لحث العميل على العودة مجدداً'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
