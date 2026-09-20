import React, { useState } from 'react';
import { 
  Ticket, 
  Percent, 
  Check, 
  Copy, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Users, 
  Gift,
  RefreshCw,
  Settings,
  ShieldAlert
} from 'lucide-react';

interface VouchersEnginePanelProps {
  isEnglish?: boolean;
  currentLangCode?: string;
}

export const VouchersEnginePanel: React.FC<VouchersEnginePanelProps> = ({
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [minScore, setMinScore] = useState<number>(15);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [isVoucherActive, setIsVoucherActive] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const vouchers = [
    {
      id: 'v-1',
      code: 'PANDA20',
      titleAr: 'خصم أبطال تحدي بنده 20%',
      titleEn: 'Panda Challenge Champion 20%',
      discount: `${discountPercent}%`,
      minScore: minScore,
      usageCount: 142,
      maxUsage: 500,
      expiryDate: '2026-12-31',
      status: isVoucherActive ? 'active' : 'paused',
      badgeAr: 'الأكثر استخداماً 🔥',
      badgeEn: 'Most Popular 🔥'
    },
    {
      id: 'v-2',
      code: 'FRESH15',
      titleAr: 'خصم قسم الخضار والطازج 15%',
      titleEn: 'Fresh & Veggies Section 15%',
      discount: '15%',
      minScore: 10,
      usageCount: 88,
      maxUsage: 300,
      expiryDate: '2026-10-30',
      status: 'active',
      badgeAr: 'خاص بالطازج 🥬',
      badgeEn: 'Fresh Only 🥬'
    },
    {
      id: 'v-3',
      code: 'VIPGIFT',
      titleAr: 'هدية مجانية للمتسوقين المميزين',
      titleEn: 'VIP Shopper Free Gift',
      discountAr: 'هدية فورية',
      discountEn: 'Instant Gift',
      discount: discountPercent > 0 ? `${discountPercent}%` : '20%',
      minScore: 25,
      usageCount: 39,
      maxUsage: 100,
      expiryDate: '2026-11-15',
      status: 'active',
      badgeAr: 'حصري للمحترفين 🏆',
      badgeEn: 'Pro Exclusive 🏆'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div id="section-vouchers" dir={isRTL ? 'rtl' : 'ltr'} className="bg-white p-6 md:p-8 rounded-[36px] border border-gray-100 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Ticket size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-gray-800">
                {isEnglish ? 'Smart Vouchers & Rewards Engine' : 'محرك القسائم الذكية والمكافآت الترويجية'}
              </h3>
              <span className="bg-emerald-100 text-[#005A2B] text-xs font-black px-2.5 py-0.5 rounded-full">
                {isEnglish ? 'Live Engine' : 'المحرك نشط'}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {isEnglish 
                ? 'Configure promo codes, game qualification scores, and shopping basket discounts' 
                : 'ضبط وتخصيص أكواد الخصم، نقاط التأهيل باللعبة، ونسب التوفير لعملاء بنده'}
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5">
            <TrendingUp size={15} />
            <span>269 {isEnglish ? 'Vouchers Redeemed' : 'قسيمة تم استخدامها'}</span>
          </div>
          <div className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5">
            <Percent size={15} />
            <span>78% {isEnglish ? 'Conversion Rate' : 'معدل التحويل بالمتجر'}</span>
          </div>
        </div>
      </div>

      {/* Active Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vouchers.map((v) => (
          <div 
            key={v.id}
            className="p-5 rounded-3xl border-2 border-slate-100 hover:border-emerald-300 bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {isEnglish ? v.badgeEn : v.badgeAr}
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
                {(v as any).discountEn ? (isEnglish ? (v as any).discountEn : (v as any).discountAr) : v.discount}
              </span>
            </div>

            <div>
              <h4 className="font-black text-sm text-slate-800 line-clamp-1">
                {isEnglish ? v.titleEn : v.titleAr}
              </h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span>{isEnglish ? 'Minimum Score:' : 'الحد الأدنى لنقاط التحدي:'}</span>
                <strong className="text-[#005A2B]">{v.minScore} {isEnglish ? 'pts' : 'نقطة'}</strong>
              </p>
            </div>

            {/* Code Box */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">
                  {isEnglish ? 'Promo Code' : 'رمز القسيمة'}
                </span>
                <span className="font-mono font-black text-base text-[#005A2B] tracking-wider">
                  {v.code}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(v.code)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-all cursor-pointer"
                title={isEnglish ? 'Copy Code' : 'نسخ الرمز'}
              >
                {copiedCode === v.code ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
              <span className="flex items-center gap-1">
                <Users size={12} />
                <span>{v.usageCount}/{v.maxUsage} {isEnglish ? 'used' : 'استخدام'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{v.expiryDate}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rules & Tuning Controls */}
      <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2">
          <Settings size={18} className="text-slate-700" />
          <h4 className="text-sm font-black text-slate-800">
            {isEnglish ? 'Voucher Rules & Qualification Tuning' : 'ضبط شروط وقواعد استحقاق القسيمة التلقائية'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <label className="text-xs font-bold text-slate-600 block mb-1.5">
              {isEnglish ? 'Min Score to Unlock (Points):' : 'الحد الأدنى للنقاط لفتح القسيمة:'}
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={minScore} 
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="flex-1 accent-[#005A2B] cursor-pointer" 
              />
              <span className="font-black text-sm text-[#005A2B] w-10 text-center">
                {minScore}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <label className="text-xs font-bold text-slate-600 block mb-1.5">
              {isEnglish ? 'Default Discount Percentage (%):' : 'نسبة الخصم الافتراضية (%):'}
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="5"
                value={discountPercent} 
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="flex-1 accent-[#005A2B] cursor-pointer" 
              />
              <span className="font-black text-sm text-[#005A2B] w-10 text-center">
                {discountPercent}%
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Vouchers Status' : 'حالة إصدار القسائم'}
              </span>
              <span className="text-[11px] text-slate-400">
                {isVoucherActive ? (isEnglish ? 'Enabled in Customer View' : 'مفعلة في استبيان العميل') : (isEnglish ? 'Paused' : 'متوقفة مؤقتاً')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsVoucherActive(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                isVoucherActive ? 'bg-[#005A2B] text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isVoucherActive ? (isEnglish ? 'Active' : 'نشط ✓') : (isEnglish ? 'Paused' : 'معطل')}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {savedSuccess ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check size={14} />
                <span>{isEnglish ? 'Settings saved successfully' : 'تم حفظ الإعدادات بنجاح'}</span>
              </span>
            ) : (
              isEnglish ? 'Changes apply instantly to the customer reward step.' : 'يتم تطبيق التعديلات فوراً على شاشة الهدية في تجربة العميل.'
            )}
          </span>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="bg-[#005A2B] hover:bg-[#004722] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>{isEnglish ? 'Apply Vouchers Config' : 'تطبيق وحفظ إعدادات القسائم'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
