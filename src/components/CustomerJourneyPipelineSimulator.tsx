import React, { useState } from 'react';
import { CustomerJourneyConfig, BusinessType } from '../types';
import {
  Globe,
  Store,
  ShoppingBag,
  Handshake,
  Gift,
  Gamepad2,
  Ticket,
  Star,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Edit3,
  Eye,
  RotateCcw,
  Image as ImageIcon,
  Type,
  Phone,
  User,
  Coffee,
  Utensils,
  Check,
  ShieldCheck,
  Heart
} from 'lucide-react';

interface CustomerJourneyPipelineSimulatorProps {
  config: CustomerJourneyConfig;
  onChange: (updated: CustomerJourneyConfig) => void;
  onPreviewFullCustomerView?: () => void;
  logoUrl?: string | null;
}

export type PipelineStage = 
  | 'lang'
  | 'business'
  | 'products'
  | 'welcome'
  | 'rewards'
  | 'game'
  | 'voucher'
  | 'survey'
  | 'loyalty_end';

export const CustomerJourneyPipelineSimulator: React.FC<CustomerJourneyPipelineSimulatorProps> = ({
  config,
  onChange,
  onPreviewFullCustomerView,
  logoUrl
}) => {
  const [activeStage, setActiveStage] = useState<PipelineStage>('products');
  const [activeSurveyCard, setActiveSurveyCard] = useState<number>(1);

  const stages: Array<{
    id: PipelineStage;
    number: number;
    titleAr: string;
    titleEn: string;
    icon: React.ReactNode;
    color: string;
    desc: string;
  }> = [
    {
      id: 'lang',
      number: 1,
      titleAr: 'لغة العميل',
      titleEn: 'Language Choice',
      icon: <Globe size={18} />,
      color: 'bg-blue-500',
      desc: 'اختيار لغة العميل المفضلة (عربي، إنجليزي، هندي...)'
    },
    {
      id: 'business',
      number: 2,
      titleAr: 'نوع النشاط',
      titleEn: 'Business Type',
      icon: <Store size={18} />,
      color: 'bg-emerald-600',
      desc: 'تحديد المجال: سوبرماركت، كافيه، أو مطعم'
    },
    {
      id: 'products',
      number: 3,
      titleAr: 'قائمة الاحتياجات',
      titleEn: 'Products & Needs',
      icon: <ShoppingBag size={18} />,
      color: 'bg-indigo-600',
      desc: 'اختيار الأقسام والمنتجات بنمط البينتو 2x2 العصري'
    },
    {
      id: 'welcome',
      number: 4,
      titleAr: 'الربط والترحيب',
      titleEn: 'Connected & Welcome',
      icon: <Handshake size={18} />,
      color: 'bg-teal-600',
      desc: 'رسالة تم الربط الذكي والانتقال الفوري للتفضيلات'
    },
    {
      id: 'rewards',
      number: 5,
      titleAr: 'اختيار المكافأة',
      titleEn: 'Reward Preference',
      icon: <Gift size={18} />,
      color: 'bg-amber-500',
      desc: 'تفضيل نوع الجائزة: خصم، نقاط، هدايا أو عروض'
    },
    {
      id: 'game',
      number: 6,
      titleAr: 'تحدي الفرقعة',
      titleEn: 'Game Challenge',
      icon: <Gamepad2 size={18} />,
      color: 'bg-rose-500',
      desc: 'لعبة فرقعة الشعارات الدائرية بدون حدود وتجميع النقاط'
    },
    {
      id: 'voucher',
      number: 7,
      titleAr: 'قسيمة الخصم',
      titleEn: 'Smart Voucher',
      icon: <Ticket size={18} />,
      color: 'bg-purple-600',
      desc: 'فك قفل كود الخصم عبر إدخال الاسم ورقم الجوال'
    },
    {
      id: 'survey',
      number: 8,
      titleAr: 'كروت الاستبيان 2x2',
      titleEn: 'Survey Cards 2x2',
      icon: <Star size={18} />,
      color: 'bg-emerald-700',
      desc: 'كروت تقييم مستقلة 2x2 حسب النشاط (نظافة، خدمة، جودة)'
    },
    {
      id: 'loyalty_end',
      number: 9,
      titleAr: 'الشكر وبطاقة الولاء',
      titleEn: 'Loyalty Card & Thank You',
      icon: <Award size={18} />,
      color: 'bg-amber-600',
      desc: 'كرت الشكر وبطاقة العميل والولاء ونقاط POS'
    },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === activeStage);
  const currentStageInfo = stages[currentStageIndex];

  const goToNext = () => {
    if (currentStageIndex < stages.length - 1) {
      setActiveStage(stages[currentStageIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentStageIndex > 0) {
      setActiveStage(stages[currentStageIndex - 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Roadmap Navigation */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-black">
              <Sparkles size={14} className="text-emerald-700" />
              <span>خريطة كامل مراحل رحلة العميل من البداية للنهاية</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 mt-1">
              استعراض وتعديل جميع المراحل مع محاكاة مباشرة لشاشة العميل
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              اضغط على أي مرحلة لمعاينتها على شاشة الجوال وتعديل نصوصها وصورها فوراً
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentStageIndex === 0}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 disabled:opacity-40 cursor-pointer transition-all"
              title="المرحلة السابقة"
            >
              <ChevronRight size={18} />
            </button>
            <span className="text-xs font-black text-gray-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              المرحلة {currentStageIndex + 1} من {stages.length}
            </span>
            <button
              type="button"
              onClick={goToNext}
              disabled={currentStageIndex === stages.length - 1}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 disabled:opacity-40 cursor-pointer transition-all"
              title="المرحلة التالية"
            >
              <ChevronLeft size={18} />
            </button>
            {onPreviewFullCustomerView && (
              <button
                type="button"
                onClick={onPreviewFullCustomerView}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Eye size={14} />
                <span>تجربة حية كاملة</span>
              </button>
            )}
          </div>
        </div>

        {/* 9-Stage Progress Pipeline */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 pt-2 border-t border-slate-100">
          {stages.map((stage, idx) => {
            const isCurrent = stage.id === activeStage;
            const isPassed = idx < currentStageIndex;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage.id)}
                className={`p-2.5 rounded-2xl text-right transition-all cursor-pointer border flex flex-col justify-between min-h-[78px] ${
                  isCurrent
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-md scale-102 ring-2 ring-emerald-500/30'
                    : isPassed
                      ? 'bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-white text-gray-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-emerald-400 text-emerald-950' 
                      : isPassed 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-200 text-gray-700'
                  }`}>
                    {isPassed ? '✓' : stage.number}
                  </span>
                  <span className={isCurrent ? 'text-white' : 'text-gray-500'}>
                    {stage.icon}
                  </span>
                </div>
                <span className="text-[11px] font-black leading-tight truncate mt-2">
                  {stage.titleAr}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Stage Canvas: Live Mockup + Stage Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Live Phone Simulator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[340px] bg-slate-900 p-3.5 rounded-[44px] shadow-2xl border-4 border-slate-800 relative">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Mobile Screen Surface */}
            <div className="w-full bg-slate-50 rounded-[34px] min-h-[560px] h-[560px] overflow-y-auto p-4 flex flex-col justify-between relative shadow-inner text-right">
              {/* STAGE 1: Language */}
              {activeStage === 'lang' && (
                <div className="my-auto space-y-4 text-center">
                  <span className="text-4xl block">🌐</span>
                  <h4 className="text-lg font-black text-emerald-900">
                    اختر لغتك المفضلة / Select Language
                  </h4>
                  <div className="space-y-2 max-w-[240px] mx-auto">
                    <div className="p-3 bg-emerald-700 text-white rounded-2xl font-black text-xs shadow-sm flex items-center justify-between">
                      <span>العربية (المملكة العربية السعودية)</span>
                      <span>🇸🇦</span>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 text-gray-700 rounded-2xl font-bold text-xs flex items-center justify-between">
                      <span>English</span>
                      <span>🇬🇧</span>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 text-gray-700 rounded-2xl font-bold text-xs flex items-center justify-between">
                      <span>Filipino / Tagalog</span>
                      <span>🇵🇭</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: Business Select */}
              {activeStage === 'business' && (
                <div className="my-auto space-y-4 text-center">
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-emerald-900">
                      {config.businessSelectTitle || 'اختر وجهتك المفضلة'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {config.businessSelectSubtitle || 'اختر النشاط لتخصيص العروض والاستبيان'}
                    </p>
                  </div>
                  <div className="space-y-2.5 max-w-[260px] mx-auto">
                    <div className={`p-3 rounded-2xl border text-right flex items-center gap-3 ${
                      config.businessType === 'supermarket' ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-3xl">🛒</span>
                      <div>
                        <div className="font-black text-xs text-gray-900">أسواق بنده وتموينات</div>
                        <div className="text-[10px] text-gray-500">خضار، فواكه، أجبان ولحوم</div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl border text-right flex items-center gap-3 ${
                      config.businessType === 'cafe' ? 'bg-amber-50 border-amber-500 shadow-sm' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-3xl">☕</span>
                      <div>
                        <div className="font-black text-xs text-gray-900">كافيه ومقهى ومخبوزات</div>
                        <div className="text-[10px] text-gray-500">قهوة مختصة، حلى وكيك</div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl border text-right flex items-center gap-3 ${
                      config.businessType === 'restaurant' ? 'bg-rose-50 border-rose-500 shadow-sm' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-3xl">🍽️</span>
                      <div>
                        <div className="font-black text-xs text-gray-900">مطعم ومأكولات وضيافة</div>
                        <div className="text-[10px] text-gray-500">أطباق رئيسية، مقبلات وعصائر</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: Products 2x2 Bento */}
              {activeStage === 'products' && (
                <div className="space-y-3">
                  <div className="text-center space-y-0.5">
                    <h4 className="text-base font-black text-emerald-900">
                      {config.shoppingTitle || 'ما الذي ترغب بشرائه اليوم؟'}
                    </h4>
                    <p className="text-[10px] text-gray-500">
                      {config.shoppingSubtitle || 'اختر قسماً لفتح بطاقات المنتجات'}
                    </p>
                  </div>

                  {/* Dept tabs */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {(config.departments || []).slice(0, 3).map((dept, i) => (
                      <span key={dept.id} className={`px-2.5 py-1 rounded-xl text-[10px] font-black whitespace-nowrap ${
                        i === 0 ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-200 text-gray-700'
                      }`}>
                        {dept.icon} {dept.name}
                      </span>
                    ))}
                  </div>

                  {/* 2x2 Bento Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {((config.departments?.[0]?.products) || []).slice(0, 4).map((p, i) => (
                      <div key={p.id} className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden mb-1 flex items-center justify-center">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">{p.icon || '🛍️'}</span>
                          )}
                        </div>
                        <span className="text-[11px] font-black text-gray-900 truncate w-full">{p.name}</span>
                        <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 rounded-md mt-0.5">
                          {p.badge || 'مميز'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 4: Connected & Welcome */}
              {activeStage === 'welcome' && (
                <div className="my-auto space-y-4 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm text-emerald-700">
                    <Handshake size={36} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-emerald-900">
                      {config.connectedTitle || 'تم الاتصال بالفرع بنجاح!'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {config.connectedSubtitle || 'مرحباً بك! جاري الانتقال لمكافأتك وتحدي اللعبة...'}
                    </p>
                  </div>
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              )}

              {/* STAGE 5: Reward Preferences */}
              {activeStage === 'rewards' && (
                <div className="space-y-4 text-center my-auto">
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-emerald-900">
                      {config.preferenceTitle || 'اختر مكافأتك المفضلة'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {config.preferenceSubtitle || 'حدد المكافأة التي تفضل الفوز بها اليوم'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-center">
                      <span className="text-2xl block mb-1">🏷️</span>
                      <span className="text-xs font-black text-amber-900 block">خصم مباشر</span>
                      <span className="text-[9px] text-amber-700">وفر على فاتورتك</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl text-center">
                      <span className="text-2xl block mb-1">⭐</span>
                      <span className="text-xs font-black text-gray-800 block">نقاط ولاء</span>
                      <span className="text-[9px] text-gray-500">رصيد بنده كوينز</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl text-center">
                      <span className="text-2xl block mb-1">🎁</span>
                      <span className="text-xs font-black text-gray-800 block">هدية مجانية</span>
                      <span className="text-[9px] text-gray-500">مشروب أو صنف هدية</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl text-center">
                      <span className="text-2xl block mb-1">⚡</span>
                      <span className="text-xs font-black text-gray-800 block">عروض حصرية</span>
                      <span className="text-[9px] text-gray-500">كوبونات للأعضاء</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 6: Game Challenge & Circular Targets */}
              {activeStage === 'game' && (
                <div className="space-y-3 my-auto text-center">
                  <div className="bg-emerald-900 text-white p-2.5 rounded-2xl text-xs font-black flex justify-between items-center">
                    <span>النقاط: 12</span>
                    <span>الوقت المتبقي: 08s</span>
                  </div>

                  <div className="bg-slate-900 rounded-3xl p-4 min-h-[260px] flex flex-col items-center justify-center relative overflow-hidden">
                    <p className="text-white/60 text-[10px] absolute top-2 font-bold">
                      شاشة اللعبة التفاعلية
                    </p>

                    {/* Regular Target: Full Circle Cover without Borders! */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-18 h-18 rounded-full overflow-hidden shadow-lg flex items-center justify-center p-0 border-0 bg-white relative">
                          {config.challengeCustomImageUrl ? (
                            <img 
                              src={config.challengeCustomImageUrl} 
                              alt="Target" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <span className="text-3xl">🐼</span>
                          )}
                        </div>
                        <span className="text-[9px] text-emerald-300 font-bold">الهدف العادي (+1)</span>
                      </div>

                      {/* Bonus Target: Full Circle Cover without Borders! */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-18 h-18 rounded-full overflow-hidden shadow-xl flex items-center justify-center p-0 border-0 bg-amber-400 relative">
                          {(config.challengeSpecialBonusImageUrl || config.challengeCustomImageUrl) ? (
                            <img 
                              src={config.challengeSpecialBonusImageUrl || config.challengeCustomImageUrl} 
                              alt="Bonus" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <span className="text-3xl">👑</span>
                          )}
                          <span className="absolute bottom-1 bg-amber-300 text-amber-950 text-[8px] font-black px-1.5 rounded-full">
                            +3 بونص
                          </span>
                        </div>
                        <span className="text-[9px] text-amber-300 font-bold">الهدف الذهبي (+3)</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ تظهر كامل الدائرة وبدون حدود كما طلبت بدقة!
                  </span>
                </div>
              )}

              {/* STAGE 7: Voucher & Phone Unlock */}
              {activeStage === 'voucher' && (
                <div className="space-y-3 my-auto">
                  <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-4 rounded-3xl text-center space-y-1 shadow-md">
                    <span className="text-xs bg-emerald-500/40 px-2 py-0.5 rounded-full font-black">
                      قسيمة خصم 10%
                    </span>
                    <h5 className="text-lg font-black tracking-widest text-amber-300">
                      {config.voucherCode || 'PANDA-WIN-10'}
                    </h5>
                    <p className="text-[10px] text-emerald-100">
                      {config.voucherDiscountSubtitle || 'على كامل فاتورتك اليوم'}
                    </p>
                  </div>

                  <div className="space-y-2 bg-white p-3 rounded-2xl border border-slate-200">
                    <div className="text-[11px] font-black text-gray-800">
                      فك قفل القسيمة بالاسم ورقم الجوال:
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs text-gray-700 flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span>محمد الأحمدي</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs text-gray-700 flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span dir="ltr">050 123 4567</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 8: Survey Cards 2x2 */}
              {activeStage === 'survey' && (
                <div className="space-y-3 my-auto">
                  <div className="text-center space-y-0.5">
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                      سؤال 1 من 3
                    </span>
                    <h5 className="text-sm font-black text-gray-900 mt-1">
                      {config.businessType === 'cafe' 
                        ? '🛋️ نظافة وترتيب جلسات وطاولات الكافيه'
                        : config.businessType === 'restaurant'
                          ? '🧼 نظافة الصالة وترتيب الطاولات وأدوات المائدة'
                          : '🧹 نظافة وترتيب الممرات وأرفف البضائع'}
                    </h5>
                    <p className="text-[10px] text-gray-500">
                      اختر ما يعبر عن تجربتك بدقة
                    </p>
                  </div>

                  {/* 2x2 Survey Cards (Images 5, 6, 7) */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { num: 1, icon: '✨', title: 'نظافة فائقة وطاولات ممسوحة', grade: 'great', color: 'border-emerald-500 bg-emerald-50/70' },
                      { num: 2, icon: '👍', title: 'مكان نظيف ومرتب', grade: 'good', color: 'border-blue-400 bg-white' },
                      { num: 3, icon: '🧹', title: 'تحتاج مسح طاولات أسرع', grade: 'normal', color: 'border-amber-400 bg-white' },
                      { num: 4, icon: '⚠️', title: 'غير نظيفة وتحتاج عناية', grade: 'bad', color: 'border-rose-400 bg-white' },
                    ].map((c) => (
                      <div
                        key={c.num}
                        onClick={() => setActiveSurveyCard(c.num)}
                        className={`p-2.5 rounded-2xl border-2 text-center relative flex flex-col justify-between min-h-[90px] cursor-pointer transition-all ${
                          activeSurveyCard === c.num ? 'border-emerald-600 bg-emerald-50 shadow-sm scale-102' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[9px] font-black flex items-center justify-center">
                            #{c.num}
                          </span>
                          {activeSurveyCard === c.num && (
                            <span className="text-emerald-700 text-xs font-black">✓</span>
                          )}
                        </div>
                        <span className="text-2xl block">{c.icon}</span>
                        <span className="text-[10px] font-black text-gray-900 leading-tight">
                          {c.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 9: Thank You & Loyalty Card */}
              {activeStage === 'loyalty_end' && (
                <div className="space-y-3 my-auto">
                  {/* Thank You Card */}
                  <div className="bg-white rounded-2xl p-3 border border-slate-200 text-center space-y-1 shadow-xs">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 text-lg">
                      <CheckCircle2 size={22} />
                    </div>
                    <h5 className="text-xs font-black text-emerald-950">
                      شكراً لك، رأيك يصنع الفرق دائماً! 💚
                    </h5>
                    <p className="text-[9px] text-gray-500">
                      تم توثيق تقييمك واستحقاقك للمكافأة
                    </p>
                  </div>

                  {/* Customer Loyalty Card */}
                  <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white p-3.5 rounded-2xl shadow-md border border-emerald-500/40 space-y-2 text-right">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-black">
                        بطاقة الولاء الذهبية
                      </span>
                      <Award size={16} className="text-amber-400" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-emerald-200 font-bold">الرصيد المتاح:</div>
                      <div className="text-base font-black text-amber-300">120 نقطة ولاء ⭐</div>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] text-emerald-100">
                      <span>رقم العضوية: P-88392</span>
                      <span>كاشير POS ✓</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Phone Bar */}
              <div className="pt-2 text-center text-[9px] text-gray-400 font-bold border-t border-slate-200">
                لوحة بنده الذكية • تجربة العميل الحية
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Active Stage Settings & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className={`p-2.5 rounded-2xl text-white ${currentStageInfo.color}`}>
                {currentStageInfo.icon}
              </span>
              <div>
                <h4 className="text-base font-black text-gray-900">
                  المرحلة {currentStageInfo.number}: {currentStageInfo.titleAr}
                </h4>
                <p className="text-xs text-gray-500">
                  {currentStageInfo.desc}
                </p>
              </div>
            </div>

            <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full text-gray-700">
              {currentStageInfo.titleEn}
            </span>
          </div>

          {/* STAGE CONTROLS */}
          {activeStage === 'business' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  عنوان شاشة اختيار النشاط
                </label>
                <input
                  type="text"
                  value={config.businessSelectTitle || ''}
                  onChange={e => onChange({ ...config, businessSelectTitle: e.target.value })}
                  placeholder="اختر وجهتك المفضلة"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  العنوان الفرعي
                </label>
                <input
                  type="text"
                  value={config.businessSelectSubtitle || ''}
                  onChange={e => onChange({ ...config, businessSelectSubtitle: e.target.value })}
                  placeholder="اختر النشاط لتخصيص العروض والاستبيان"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-gray-700"
                />
              </div>

              <div className="pt-2">
                <span className="font-bold text-gray-700 block mb-2">
                  تبديل النشاط الافتراضي للمنصة:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ ...config, businessType: 'supermarket' })}
                    className={`p-2.5 rounded-xl font-black text-center cursor-pointer border ${
                      config.businessType === 'supermarket' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-slate-50 border-slate-200 text-gray-700'
                    }`}
                  >
                    🛒 سوبرماركت
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ ...config, businessType: 'cafe' })}
                    className={`p-2.5 rounded-xl font-black text-center cursor-pointer border ${
                      config.businessType === 'cafe' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 border-slate-200 text-gray-700'
                    }`}
                  >
                    ☕ كافيه ومقهى
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ ...config, businessType: 'restaurant' })}
                    className={`p-2.5 rounded-xl font-black text-center cursor-pointer border ${
                      config.businessType === 'restaurant' ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 border-slate-200 text-gray-700'
                    }`}
                  >
                    🍽️ مطعم
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'game' && (
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-black block text-sm">
                  🎯 ضبط الشعار والهدف الدائري (بدون حدود كامل الدائرة)
                </span>
                <p className="text-[11px] text-emerald-800">
                  تم ضبط الصور المرفوعة لتملأ الدائرة بنسبة 100% بدون حدود أو إطارات خارجية.
                </p>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  رابط صورة الهدف العادي (تظهر كامل الدائرة بدون إطار)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={config.challengeCustomImageUrl || ''}
                    onChange={e => onChange({ ...config, challengeCustomImageUrl: e.target.value })}
                    placeholder="الصق رابط الصورة أو اختر من جهازك..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                  {config.challengeCustomImageUrl && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, challengeCustomImageUrl: '' })}
                      className="text-red-600 hover:text-red-700 px-2 py-1 text-[11px] font-bold cursor-pointer"
                    >
                      استرجاع الافتراضي
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  رابط صورة البونص الذهبي (+3 بونص)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={config.challengeSpecialBonusImageUrl || ''}
                    onChange={e => onChange({ ...config, challengeSpecialBonusImageUrl: e.target.value })}
                    placeholder="الصق رابط صورة البونص الذهبي..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                  {config.challengeSpecialBonusImageUrl && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...config, challengeSpecialBonusImageUrl: '' })}
                      className="text-red-600 hover:text-red-700 px-2 py-1 text-[11px] font-bold cursor-pointer"
                    >
                      استرجاع الافتراضي
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <input
                  type="checkbox"
                  id="borderless-toggle"
                  checked={config.challengeTargetBorderless !== false}
                  onChange={e => onChange({ ...config, challengeTargetBorderless: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="borderless-toggle" className="font-black text-gray-800 cursor-pointer">
                  تفعيل العرض بدون حدود خارجية دائرياً (كامل الدائرة)
                </label>
              </div>
            </div>
          )}

          {activeStage === 'voucher' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  رمز القسيمة التلقائي
                </label>
                <input
                  type="text"
                  value={config.voucherCode || ''}
                  onChange={e => onChange({ ...config, voucherCode: e.target.value })}
                  placeholder="PANDA-WIN-10"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-gray-900 uppercase"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  وصف الخصم والعرض
                </label>
                <input
                  type="text"
                  value={config.voucherDiscountSubtitle || ''}
                  onChange={e => onChange({ ...config, voucherDiscountSubtitle: e.target.value })}
                  placeholder="على كامل فاتورتك وسلتك اليوم"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-gray-900"
                />
              </div>
            </div>
          )}

          {activeStage === 'survey' && (
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-emerald-900 space-y-1">
                <span className="font-black block text-sm">
                  ⭐ كروت الاستبيان المنفصلة 2x2
                </span>
                <p className="text-[11px] text-emerald-800">
                  تم فصل كل كرت ليظهر لحاله بعد قسيمة الخصم مباشرة، مع إمكانية التبديل من بنك الأسئلة الاحتياطية.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...config, surveyCardStyle: 'grid2x2' })}
                  className={`flex-1 py-2 rounded-xl font-black text-center cursor-pointer border ${
                    (config.surveyCardStyle || 'grid2x2') === 'grid2x2' ? 'bg-emerald-700 text-white' : 'bg-slate-50 text-gray-700 border-slate-200'
                  }`}
                >
                  كروت 2x2 عصرية (مطابقة للصور)
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...config, surveyCardStyle: 'compact_horizontal' })}
                  className={`flex-1 py-2 rounded-xl font-black text-center cursor-pointer border ${
                    config.surveyCardStyle === 'compact_horizontal' ? 'bg-emerald-700 text-white' : 'bg-slate-50 text-gray-700 border-slate-200'
                  }`}
                >
                  بطاقات أفقية
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentStageIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold text-xs disabled:opacity-40 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <ChevronRight size={16} />
              <span>المرحلة السابقة</span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              disabled={currentStageIndex === stages.length - 1}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs disabled:opacity-40 cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>المرحلة التالية</span>
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
