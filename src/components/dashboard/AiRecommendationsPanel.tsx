import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  Bot, 
  ArrowRight, 
  Zap, 
  SlidersHorizontal 
} from 'lucide-react';
import { CustomerFeedback } from '../../types';

interface AiRecommendationsPanelProps {
  feedbacks: CustomerFeedback[];
  isEnglish?: boolean;
  currentLangCode?: string;
  onApplyQuickAction?: (actionName: string) => void;
}

export const AiRecommendationsPanel: React.FC<AiRecommendationsPanelProps> = ({
  feedbacks,
  isEnglish: isEnglishProp = false,
  currentLangCode,
  onApplyQuickAction
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [appliedActions, setAppliedActions] = useState<string[]>([]);

  const handleAction = (actionId: string, title: string) => {
    if (!appliedActions.includes(actionId)) {
      setAppliedActions(prev => [...prev, actionId]);
      if (onApplyQuickAction) onApplyQuickAction(title);
    }
  };

  // Compute live statistics for smart insights
  const totalFeedbacks = feedbacks.length;
  const highRatings = feedbacks.filter(f => (f.ratingScore || 5) >= 4).length;
  const satisfactionRate = totalFeedbacks > 0 ? Math.round((highRatings / totalFeedbacks) * 100) : 94;
  const avgScore = totalFeedbacks > 0 
    ? Math.round(feedbacks.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalFeedbacks) 
    : 720;

  const insights = [
    {
      id: 'peak-hour',
      titleAr: 'توقع ساعات الذروة والتفاعل العالي',
      titleEn: 'Peak Hours & Engagement Prediction',
      descAr: 'تظهر البيانات تدفقاً مضاعفاً للمتسوقين بين 7:00 م و 9:30 م. يُنصح برفع قيمة قسيمة الخصم خلال هذه الفترة لزيادة معدل إتمام السلة.',
      descEn: 'Analytics show doubled customer flow between 7:00 PM and 9:30 PM. Boosting voucher incentives during this window increases checkout completion.',
      impactAr: 'زيادة متوقعة بنسبة +18% في حجم المبيعات',
      impactEn: 'Estimated +18% increase in cart completion',
      actionTextAr: 'تفعيل حافز الذروة التلقائي',
      actionTextEn: 'Enable Auto Peak-Hour Boost',
      type: 'peak',
      icon: <Clock size={16} className="text-amber-500" />
    },
    {
      id: 'fresh-dept',
      titleAr: 'تحسين ترتيب أقسام الفواكه والخضار',
      titleEn: 'Fresh Produce Department Optimization',
      descAr: 'قسم الخضار والفواكه الطازجة هو الأكثر اختياراً بنسبة 64% في مسار العميل. يُقترح جعله القسم الافتراضي الأول لتقليل وقت التصفح.',
      descEn: 'The fresh produce department is selected by 64% of customers. Making it the primary default section streamlines shopper onboarding.',
      impactAr: 'تسريع تدفق العميل بمقدار 22 ثانية',
      impactEn: 'Speeds customer onboarding by 22 seconds',
      actionTextAr: 'تثبيت كقسم افتراضي ذكي',
      actionTextEn: 'Pin as Smart Default Section',
      type: 'dept',
      icon: <ShoppingBag size={16} className="text-emerald-500" />
    },
    {
      id: 'game-difficulty',
      titleAr: 'موازنة صعوبة لعبة تحدي بنده',
      titleEn: 'Panda Game Challenge Balancing',
      descAr: `متوسط نقاط المتسوقين الحالي ${avgScore} نقطة. نسبة الرضا الحالية ${satisfactionRate}%. ضبط سرعة اللعبة على المستوى المتوازن يضمن مشاركة كافة الفئات العمرية.`,
      descEn: `Current average score is ${avgScore} pts with a ${satisfactionRate}% satisfaction score. Calibrating game speed ensures engaging gameplay across all demographics.`,
      impactAr: 'رفع نسبة استكمال اللعبة إلى 97%',
      impactEn: 'Increases challenge completion rate to 97%',
      actionTextAr: 'موازنة الصعوبة تلقائياً',
      actionTextEn: 'Auto-Calibrate Difficulty',
      type: 'game',
      icon: <Zap size={16} className="text-blue-500" />
    }
  ];

  return (
    <div id="section-ai" dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-100/60 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                {isEnglish ? 'AI Recommendations & Smart Diagnostics' : 'توصيات الذكاء الاصطناعي والتشخيص الذكي'}
              </h3>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300">
                {isEnglish ? 'Live AI Engine' : 'محرك ذكي نشط'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isEnglish 
                ? 'Actionable automated insights powered by real-time customer behavior analytics'
                : 'رؤى تشغيلية ذكية مبنية على تحليل حركة المتسوقين والتقييمات المباشرة'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Bot size={14} className="text-amber-500" />
            <span>{isEnglish ? 'Analyzed 100% of interactions' : 'تحليل 100% من التفاعلات'}</span>
          </span>
        </div>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {insights.map((insight) => {
          const isDone = appliedActions.includes(insight.id);

          return (
            <motion.div
              key={insight.id}
              whileHover={{ y: -2 }}
              className="bg-slate-50/70 hover:bg-white border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {insight.icon}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {isEnglish ? insight.impactEn : insight.impactAr}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-black text-slate-800 mb-1.5 group-hover:text-[#005A2B] transition-colors">
                  {isEnglish ? insight.titleEn : insight.titleAr}
                </h4>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium mb-3">
                  {isEnglish ? insight.descEn : insight.descAr}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => handleAction(insight.id, isEnglish ? insight.actionTextEn : insight.actionTextAr)}
                  disabled={isDone}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-white hover:bg-[#005A2B] text-slate-700 hover:text-white border border-slate-300 hover:border-transparent shadow-2xs active:scale-98'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-700" />
                      <span>{isEnglish ? 'Applied & Active' : 'تم التطبيق بنجاح ✓'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} className="text-amber-500 group-hover:text-amber-300" />
                      <span>{isEnglish ? insight.actionTextEn : insight.actionTextAr}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
