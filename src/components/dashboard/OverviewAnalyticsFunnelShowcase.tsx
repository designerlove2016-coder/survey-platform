import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ArrowDown, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Gamepad2, 
  Ticket, 
  Star, 
  ShoppingBasket, 
  Clock, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Percent,
  Layers,
  Award
} from 'lucide-react';
import { Feedback } from '../../types';
import { getDashboardTexts } from '../../utils/dashboardTranslations';

interface OverviewAnalyticsFunnelShowcaseProps {
  feedbacks?: Feedback[];
  onOpenFullAnalytics?: () => void;
  isEnglish?: boolean;
  currentLangCode?: string;
}

interface FunnelStep {
  id: number;
  title: string;
  subtitle: string;
  count: number;
  percentage: number;
  dropRate: string;
  avgTime: string;
  icon: React.ReactNode;
  gradient: string;
  bgBadge: string;
  insight: string;
}

export const OverviewAnalyticsFunnelShowcase: React.FC<OverviewAnalyticsFunnelShowcaseProps> = ({
  feedbacks = [],
  onOpenFullAnalytics,
  isEnglish = false,
  currentLangCode
}) => {
  const [activeStepId, setActiveStepId] = useState<number>(3); // default highlight challenge

  const activeCode = currentLangCode || (isEnglish ? 'en' : 'ar');
  const texts = getDashboardTexts(activeCode);
  const isRTL = activeCode === 'ar' || activeCode === 'ur';

  const funnelStepMetas = [
    { id: 1, count: 1420, percentage: 100, dropRate: '0%', icon: <Users size={16} />, gradient: 'from-emerald-600 to-teal-600', bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 2, count: 1348, percentage: 95, dropRate: '5%', icon: <ShoppingBasket size={16} />, gradient: 'from-teal-600 to-cyan-600', bgBadge: 'bg-teal-50 text-teal-800 border-teal-200' },
    { id: 3, count: 1260, percentage: 89, dropRate: '6%', icon: <Gamepad2 size={16} />, gradient: 'from-cyan-600 to-blue-600', bgBadge: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    { id: 4, count: 1175, percentage: 83, dropRate: '6%', icon: <Ticket size={16} />, gradient: 'from-blue-600 to-indigo-600', bgBadge: 'bg-blue-50 text-blue-800 border-blue-200' },
    { id: 5, count: 1118, percentage: 79, dropRate: '4%', icon: <Star size={16} />, gradient: 'from-indigo-600 to-purple-600', bgBadge: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  ];

  const funnelSteps: FunnelStep[] = texts.funnel.steps.map((st) => {
    const meta = funnelStepMetas.find(m => m.id === st.id) || funnelStepMetas[0];
    return {
      id: st.id,
      title: st.title,
      subtitle: st.subtitle,
      count: meta.count,
      percentage: meta.percentage,
      dropRate: meta.dropRate,
      avgTime: st.avgTime,
      icon: meta.icon,
      gradient: meta.gradient,
      bgBadge: meta.bgBadge,
      insight: st.insight,
    };
  });

  const selectedStep = funnelSteps.find(s => s.id === activeStepId) || funnelSteps[2];

  // Top departments breakdown localized
  const departmentBreakdown = [
    { 
      name: activeCode === 'ar' ? 'قسم الخضار والفواكه الطازجة' : (activeCode === 'en' ? 'Fresh Fruits & Vegetables' : (activeCode === 'am' ? 'ትኩስ ፍራፍሬዎችና አትክልቶች' : (activeCode === 'ur' ? 'تازہ پھل اور سبزیاں' : (activeCode === 'hi' ? 'ताजे फल और सब्जियां' : (activeCode === 'fr' ? 'Fruits & Légumes frais' : 'Sariwang Prutas at Gulay'))))),
      percent: 38, 
      count: '1,480', 
      color: 'bg-[#005A2B]' 
    },
    { 
      name: activeCode === 'ar' ? 'قسم الألبان والأجبان والبيض' : (activeCode === 'en' ? 'Dairy, Cheese & Eggs' : (activeCode === 'am' ? 'የወተት ምርቶች እና አይብ' : (activeCode === 'ur' ? 'ڈیری اور پنیر' : (activeCode === 'hi' ? 'डेयरी, पनीर और अंडे' : (activeCode === 'fr' ? 'Produits laitiers & Fromages' : 'Gatas, Keso at Itlog'))))),
      percent: 26, 
      count: '1,014', 
      color: 'bg-teal-600' 
    },
    { 
      name: activeCode === 'ar' ? 'قسم المخبوزات والحلويات' : (activeCode === 'en' ? 'Bakery & Sweets' : (activeCode === 'am' ? 'ዳቦ እና ጣፋጮች' : (activeCode === 'ur' ? 'بیکری اور مٹھائیاں' : (activeCode === 'hi' ? 'बेकरी और मिठाइयां' : (activeCode === 'fr' ? 'Boulangerie & Pâtisserie' : 'Panaderya at Matamis'))))),
      percent: 18, 
      count: '702', 
      color: 'bg-amber-500' 
    },
    { 
      name: activeCode === 'ar' ? 'المواد التموينية والأغذية' : (activeCode === 'en' ? 'Grocery & Dry Food' : (activeCode === 'am' ? 'ግሮሰሪ እና ደረቅ ምግቦች' : (activeCode === 'ur' ? 'کریانہ اور بنیادی خوراک' : (activeCode === 'hi' ? 'किराना और सूखा भोजन' : (activeCode === 'fr' ? 'Épicerie & Produits secs' : 'Grocery at Tuyong Pagkain'))))),
      percent: 12, 
      count: '468', 
      color: 'bg-blue-600' 
    },
    { 
      name: activeCode === 'ar' ? 'العناية الشخصية والمنظفات' : (activeCode === 'en' ? 'Personal Care & Cleaning' : (activeCode === 'am' ? 'የግል እንክብካቤ እና ማጽጃዎች' : (activeCode === 'ur' ? 'ذاتی نگہداشت اور صفائی' : (activeCode === 'hi' ? 'व्यक्तिगत देखभाल और सफाई' : (activeCode === 'fr' ? 'Soins personnels & Entretien' : 'Personal Care at Paglilinis'))))),
      percent: 6, 
      count: '234', 
      color: 'bg-purple-600' 
    }
  ];

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6"
    >
      {/* 1. Header Bar with Luxury Badges and Direct CTA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005A2B] via-emerald-700 to-teal-800 text-white flex items-center justify-center shadow-sm shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {texts.funnel.title}
              </h3>
              <span className="bg-emerald-50 text-[#005A2B] text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <Sparkles size={11} />
                <span>{texts.funnel.liveConversion}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {texts.funnel.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          {onOpenFullAnalytics && (
            <button
              type="button"
              onClick={onOpenFullAnalytics}
              className="px-3.5 py-2 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <BarChart3 size={14} className="text-emerald-400" />
              <span>{texts.funnel.fullAnalyticsView}</span>
              {isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Executive KPI Highlights Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
            {texts.funnel.totalShoppers}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">1,420</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              +14.2% 📈
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
            {texts.funnel.verifiedScans}
          </span>
        </div>

        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
            {texts.funnel.vouchersUnlocked}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">1,175</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
              {texts.funnel.conversionRate}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
            {texts.funnel.instantDiscount}
          </span>
        </div>

        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
            {texts.funnel.retention}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-[#005A2B] font-mono">79%</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
              {texts.funnel.excellent}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
            {texts.funnel.shoppersSubmitted}
          </span>
        </div>

        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
            {texts.funnel.avgJourneyTime}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">1:40</span>
            <span className="text-[11px] font-bold text-slate-500">{texts.funnel.minUnit}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
            {texts.funnel.smoothExperience}
          </span>
        </div>
      </div>

      {/* 3. Main Grid: 5-Stage Interactive Funnel (Left) + Stage Intelligence & Departments (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main: The 5 Funnel Stages */}
        <div className="lg:col-span-7 bg-gradient-to-b from-slate-50/70 to-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h4 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
              <Layers size={16} className="text-[#005A2B]" />
              <span>{texts.funnel.funnelStagesTitle}</span>
            </h4>
            <span className="text-[10px] font-bold text-slate-400">
              {texts.funnel.clickToInspect}
            </span>
          </div>

          <div className="space-y-2.5">
            {funnelSteps.map((step) => {
              const isSelected = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepId(step.id)}
                  className={`w-full p-3 rounded-2xl border transition-all cursor-pointer group ${isRTL ? 'text-right' : 'text-left'} ${
                    isSelected
                      ? 'bg-white border-[#005A2B] shadow-md ring-2 ring-[#005A2B]/15'
                      : 'bg-white/90 border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                        isSelected 
                          ? 'bg-[#005A2B] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}>
                        {step.id}
                      </span>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <span className="font-black text-slate-900 block leading-tight">
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {step.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        {step.count.toLocaleString()} {texts.funnel.shoppersUnit}
                      </span>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-lg border font-mono ${
                        isSelected 
                          ? 'bg-emerald-50 text-[#005A2B] border-emerald-300' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {step.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Gradient Retention Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/70">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-700 shadow-2xs`}
                      style={{ width: `${step.percentage}%` }}
                    />
                  </div>

                  {/* Drop-off & Avg Time micro-strip */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1.5 px-0.5">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock size={11} className="text-slate-400" />
                      <span>{texts.funnel.durationLabel} {step.avgTime}</span>
                    </span>
                    <span className="text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-100">
                      {texts.funnel.dropRateLabel} {step.dropRate}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right / Secondary: Selected Step Deep-Dive + Department Demand Mix */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Step Deep-Dive Card */}
          <div className="p-4 rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/50 to-white shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-emerald-100/80 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#005A2B] text-white flex items-center justify-center shadow-xs">
                  {selectedStep.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    {texts.funnel.stageOfFive(selectedStep.id)}
                  </span>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                    {selectedStep.title}
                  </h5>
                </div>
              </div>
              <span className="text-base font-black text-[#005A2B] font-mono">
                {selectedStep.percentage}%
              </span>
            </div>

            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              {selectedStep.insight}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block">
                  {texts.funnel.shopperCount}
                </span>
                <span className="text-sm font-black text-slate-900 font-mono">
                  {selectedStep.count.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block">
                  {texts.funnel.stageDropRate}
                </span>
                <span className="text-sm font-black text-rose-600 font-mono">
                  {selectedStep.dropRate}
                </span>
              </div>
            </div>
          </div>

          {/* Department Demand Mix (توزيع اختيارات الأقسام التفاعلي) */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <ShoppingBasket size={14} className="text-[#005A2B]" />
                <span>
                  {activeCode === 'ar' ? 'توزيع اختيارات الأقسام والاحتياجات' : (activeCode === 'en' ? 'Shopper Demand by Category' : (activeCode === 'am' ? 'የሸማቾች ምርጫ በክፍል' : (activeCode === 'ur' ? 'شعبہ جات کے لحاظ سے خریداروں کی ترجیحات' : (activeCode === 'hi' ? 'विभाग द्वारा ग्राहकों की मांग' : (activeCode === 'fr' ? 'Demande par rayon' : 'Demand ng Mamimili ayon sa Kategorya')))))}
                </span>
              </h5>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {activeCode === 'ar' ? '100% واقعي' : (activeCode === 'en' ? '100% Verified' : '100%')}
              </span>
            </div>

            <div className="space-y-2">
              {departmentBreakdown.map((dept, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 text-[11px]">
                      {dept.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400">
                        {dept.count}
                      </span>
                      <span className="text-xs font-black text-[#005A2B] font-mono">
                        {dept.percent}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${dept.color} transition-all duration-500`}
                      style={{ width: `${dept.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

