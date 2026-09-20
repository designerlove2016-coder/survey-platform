import React, { useState } from 'react';
import {
  SurveyQuestionItem,
  SurveyQuestionOption,
  CustomerJourneyConfig,
  BusinessType
} from '../../types';
import {
  SPARE_SURVEY_QUESTION_BANK,
  CAFE_QUESTION_ITEMS,
  RESTAURANT_QUESTION_ITEMS,
  SUPERMARKET_QUESTION_ITEMS,
} from '../../utils/journeyConfig';
import {
  Sparkles,
  Plus,
  ArrowRightLeft,
  Edit3,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Sliders,
  HelpCircle,
  Eye,
  Wand2,
  Coffee,
  Utensils,
  ShoppingBag,
  Hotel,
  Scissors,
  Check,
  LayoutGrid,
  List,
  Smile,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

interface SurveyQuestionManagerProps {
  config: CustomerJourneyConfig;
  onChange: (updated: CustomerJourneyConfig) => void;
  onPreviewQuestion?: (question: SurveyQuestionItem) => void;
}

export const SurveyQuestionManager: React.FC<SurveyQuestionManagerProps> = ({
  config,
  onChange,
  onPreviewQuestion
}) => {
  const activeQuestions: SurveyQuestionItem[] = config.surveyQuestionItems && config.surveyQuestionItems.length > 0
    ? config.surveyQuestionItems
    : (config.businessType === 'cafe' 
        ? CAFE_QUESTION_ITEMS 
        : config.businessType === 'restaurant' 
          ? RESTAURANT_QUESTION_ITEMS 
          : SUPERMARKET_QUESTION_ITEMS);

  const [activeTab, setActiveTab] = useState<'active' | 'spare'>('active');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(activeQuestions[0]?.id || '');
  const [editingOption, setEditingOption] = useState<{ qId: string; option: SurveyQuestionOption } | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<SurveyQuestionItem | null>(null);
  const [customIndustryInput, setCustomIndustryInput] = useState<string>('');
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const selectedQuestion = activeQuestions.find(q => q.id === selectedQuestionId) || activeQuestions[0];

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // 1-Click Smart Assistant presets
  const applySmartPreset = (type: BusinessType | 'hotel' | 'salon' | 'custom', customName?: string) => {
    setAiGenerating(true);
    setTimeout(() => {
      let newQuestions: SurveyQuestionItem[] = [];

      if (type === 'cafe') {
        newQuestions = JSON.parse(JSON.stringify(CAFE_QUESTION_ITEMS));
      } else if (type === 'restaurant') {
        newQuestions = JSON.parse(JSON.stringify(RESTAURANT_QUESTION_ITEMS));
      } else if (type === 'supermarket') {
        newQuestions = JSON.parse(JSON.stringify(SUPERMARKET_QUESTION_ITEMS));
      } else if (type === 'hotel') {
        newQuestions = [
          {
            id: 'hotel_cleanliness',
            titleAr: 'نظافة الغرفة والسرير وتجهيزات الحمام',
            titleEn: 'Room, bedding and bathroom cleanliness',
            icon: '🛏️',
            isEnabled: true,
            category: 'cleanliness',
            options: [
              { id: 'h1', number: 1, icon: '✨', title: 'نظافة استثنائية ورائحة منعشة', titleEn: 'Exceptional cleanliness & fresh scent', grade: 'great' },
              { id: 'h2', number: 2, icon: '👍', title: 'غرفة نظيفة ومريحة', titleEn: 'Clean and comfortable room', grade: 'good' },
              { id: 'h3', number: 3, icon: '🧹', title: 'تحتاج تجديد مناشف ومفارش', titleEn: 'Needs towel/linen renewal', grade: 'normal' },
              { id: 'h4', number: 4, icon: '⚠️', title: 'تحتاج عناية فورية من الإدارة', titleEn: 'Needs immediate attention', grade: 'bad' },
            ]
          },
          {
            id: 'hotel_staff',
            titleAr: 'سرعة تسجيل الدخول ولطافة موظفي الاستقبال',
            titleEn: 'Check-in speed and reception courtesy',
            icon: '🛎️',
            isEnabled: true,
            category: 'staff',
            options: [
              { id: 'hs1', number: 1, icon: '⚡', title: 'استقبال فوري وضيافة راقية', titleEn: 'Instant check-in & VIP hospitality', grade: 'great' },
              { id: 'hs2', number: 2, icon: '😊', title: 'موظفون بشوشون ومتعاونون', titleEn: 'Friendly & helpful staff', grade: 'good' },
              { id: 'hs3', number: 3, icon: '⏱️', title: 'إجراءات عادية ووقت معتاد', titleEn: 'Standard procedure & time', grade: 'normal' },
              { id: 'hs4', number: 4, icon: '⚠️', title: 'تأخير في تسليم الغرفة', titleEn: 'Delay in handing over room', grade: 'bad' },
            ]
          },
          {
            id: 'hotel_comfort',
            titleAr: 'الهدوء والعزل وجودة بوفيه الإفطار',
            titleEn: 'Quietness, soundproofing and breakfast buffet',
            icon: '🥐',
            isEnabled: true,
            category: 'ambiance',
            options: [
              { id: 'hc1', number: 1, icon: '😋', title: 'بوفيه فاخر ونوم هادئ جداً', titleEn: 'Luxurious buffet & peaceful sleep', grade: 'great' },
              { id: 'hc2', number: 2, icon: '☕', title: 'إفطار منوع وإقامة طيبة', titleEn: 'Varied breakfast & pleasant stay', grade: 'good' },
              { id: 'hc3', number: 3, icon: '🍳', title: 'خيارات الإفطار مقبولة', titleEn: 'Acceptable breakfast options', grade: 'normal' },
              { id: 'hc4', number: 4, icon: '⚠️', title: 'إزعاج أو بوفيه محدود', titleEn: 'Noise or limited buffet', grade: 'bad' },
            ]
          }
        ];
      } else if (type === 'salon') {
        newQuestions = [
          {
            id: 'salon_service',
            titleAr: 'جودة الخدمة ودقة واحترافية الأخصائي',
            titleEn: 'Service quality and specialist skills',
            icon: '✂️',
            isEnabled: true,
            category: 'service',
            options: [
              { id: 'sl1', number: 1, icon: '✨', title: 'إتقان تام ونتيجة تفوق التوقعات', titleEn: 'Flawless execution & amazing result', grade: 'great' },
              { id: 'sl2', number: 2, icon: '👍', title: 'خدمة جميلة ومتقنة', titleEn: 'Beautiful & neat service', grade: 'good' },
              { id: 'sl3', number: 3, icon: '⏱️', title: 'مستوى جيد ووقت معتاد', titleEn: 'Good level & standard time', grade: 'normal' },
              { id: 'sl4', number: 4, icon: '⚠️', title: 'لم تكن بالدقة المطلوبة', titleEn: 'Did not meet expectations', grade: 'bad' },
            ]
          },
          {
            id: 'salon_hygiene',
            titleAr: 'تعقيم الأدوات ونظافة الصالون والراحة',
            titleEn: 'Tool sterilization, hygiene and comfort',
            icon: '🧼',
            isEnabled: true,
            category: 'cleanliness',
            options: [
              { id: 'sh1', number: 1, icon: '💎', title: 'تعقيم مغلف ونظافة مثالية', titleEn: 'Packaged sterilization & spotless', grade: 'great' },
              { id: 'sh2', number: 2, icon: '😊', title: 'أدوات نظيفة ومكان مرتب', titleEn: 'Clean tools & tidy salon', grade: 'good' },
              { id: 'sh3', number: 3, icon: '🧹', title: 'نظافة مقبولة', titleEn: 'Acceptable hygiene', grade: 'normal' },
              { id: 'sh4', number: 4, icon: '⚠️', title: 'تحتاج حرص أكبر على التعقيم', titleEn: 'Needs greater sterilization care', grade: 'bad' },
            ]
          },
          {
            id: 'salon_hospitality',
            titleAr: 'الاستقبال والالتزام بالمواعيد والأسعار',
            titleEn: 'Reception, punctuality and pricing',
            icon: '☕',
            isEnabled: true,
            category: 'hospitality',
            options: [
              { id: 'sp1', number: 1, icon: '👑', title: 'دخول بموعد وضيافة ملكية', titleEn: 'On-time start & royal hospitality', grade: 'great' },
              { id: 'sp2', number: 2, icon: '🌸', title: 'تعامل راقي وأسعار مناسبة', titleEn: 'Classy staff & reasonable price', grade: 'good' },
              { id: 'sp3', number: 3, icon: '⏱️', title: 'انتظار قصير ومقبول', titleEn: 'Short wait time', grade: 'normal' },
              { id: 'sp4', number: 4, icon: '⚠️', title: 'تأخر في بدء الموعد', titleEn: 'Noticeable delay in starting', grade: 'bad' },
            ]
          }
        ];
      } else {
        // Custom field AI generated
        const sector = customName || 'النشاط التجاري';
        newQuestions = [
          {
            id: `custom_cleanliness_${Date.now()}`,
            titleAr: `نظافة وترتيب وتنظيم صالة ${sector}`,
            titleEn: `Cleanliness and organization of ${sector}`,
            icon: '🧼',
            isEnabled: true,
            category: 'cleanliness',
            options: [
              { id: 'cq1_1', number: 1, icon: '✨', title: 'نظافة فائقة وتنظيم مثالي', titleEn: 'Spotless & perfectly organized', grade: 'great' },
              { id: 'cq1_2', number: 2, icon: '👍', title: 'مكان مرتب وجميل', titleEn: 'Tidy and pleasant space', grade: 'good' },
              { id: 'cq1_3', number: 3, icon: '🧹', title: 'ترتيب جيد ومقبول', titleEn: 'Good and acceptable', grade: 'normal' },
              { id: 'cq1_4', number: 4, icon: '⚠️', title: 'يحتاج تحسين وعناية', titleEn: 'Needs improvement', grade: 'bad' },
            ]
          },
          {
            id: `custom_service_${Date.now()}`,
            titleAr: `سرعة الخدمة واحترافية فريق عمل ${sector}`,
            titleEn: `Service speed and team professionalism`,
            icon: '⚡',
            isEnabled: true,
            category: 'staff',
            options: [
              { id: 'cq2_1', number: 1, icon: '⚡', title: 'سرعة قياسية وتعامل احترافي', titleEn: 'Record speed & professional staff', grade: 'great' },
              { id: 'cq2_2', number: 2, icon: '😊', title: 'فريق بشوش ومتعاون', titleEn: 'Cheerful and helpful team', grade: 'good' },
              { id: 'cq2_3', number: 3, icon: '⏱️', title: 'وقت انتظار طبيعي', titleEn: 'Standard wait time', grade: 'normal' },
              { id: 'cq2_4', number: 4, icon: '⚠️', title: 'تأخر وبطء في الخدمة', titleEn: 'Slow service and delays', grade: 'bad' },
            ]
          },
          {
            id: `custom_satisfaction_${Date.now()}`,
            titleAr: `مستوى الرضا العام عن جودة المنتجات والأسعار`,
            titleEn: `Overall satisfaction with quality and price`,
            icon: '⭐',
            isEnabled: true,
            category: 'overall',
            options: [
              { id: 'cq3_1', number: 1, icon: '💎', title: 'قيمة استثنائية وجودة عالية', titleEn: 'Exceptional value & high quality', grade: 'great' },
              { id: 'cq3_2', number: 2, icon: '🏷️', title: 'سعر مناسب وجودة ممتازة', titleEn: 'Fair price & great quality', grade: 'good' },
              { id: 'cq3_3', number: 3, icon: '👍', title: 'تجربة طيبة ومرضية', titleEn: 'Pleasant & satisfactory', grade: 'normal' },
              { id: 'cq3_4', number: 4, icon: '⚠️', title: 'تحتاج مراجعة وتطوير', titleEn: 'Needs review and improvement', grade: 'bad' },
            ]
          }
        ];
      }

      onChange({
        ...config,
        surveyQuestionItems: newQuestions,
        surveyCardStyle: 'grid2x2'
      });
      setSelectedQuestionId(newQuestions[0].id);
      setAiGenerating(false);
      triggerToast('تم توليد الأسئلة والكروت الذكية وتطبيقها بضغطة واحدة بنجاح! ✨');
    }, 400);
  };

  // Add reserve question to active
  const handleAddSpareToActive = (spareQuestion: SurveyQuestionItem) => {
    const existing = activeQuestions.find(q => q.id === spareQuestion.id);
    if (existing) {
      triggerToast('هذا السؤال مضاف بالفعل في الأسئلة النشطة!');
      return;
    }
    const updated = [...activeQuestions, { ...spareQuestion, isEnabled: true }];
    onChange({ ...config, surveyQuestionItems: updated });
    setSelectedQuestionId(spareQuestion.id);
    setActiveTab('active');
    triggerToast(`تمت إضافة "${spareQuestion.titleAr}" إلى استبيان العميل بنجاح! ➕`);
  };

  // Swap active question with a reserve question
  const handleSwapActiveWithSpare = (activeId: string, spare: SurveyQuestionItem) => {
    const updated = activeQuestions.map(q => {
      if (q.id === activeId) {
        return { ...spare, isEnabled: true };
      }
      return q;
    });
    onChange({ ...config, surveyQuestionItems: updated });
    setSelectedQuestionId(spare.id);
    triggerToast(`تم استبدال السؤال بـ "${spare.titleAr}" بنجاح! 🔄`);
  };

  // Move active question to spare / remove from active
  const handleMoveActiveToSpare = (qId: string) => {
    if (activeQuestions.length <= 1) {
      triggerToast('يجب أن يحتوي الاستبيان على سؤال واحد على الأقل!');
      return;
    }
    const updated = activeQuestions.filter(q => q.id !== qId);
    onChange({ ...config, surveyQuestionItems: updated });
    setSelectedQuestionId(updated[0].id);
    triggerToast('تم نقل السؤال إلى بنك الاحتياط! 📦');
  };

  // Swap two cards within a question
  const handleSwapOptions = (qId: string, idx1: number, idx2: number) => {
    const question = activeQuestions.find(q => q.id === qId);
    if (!question) return;
    const newOptions = [...question.options];
    const temp = newOptions[idx1];
    newOptions[idx1] = newOptions[idx2];
    newOptions[idx2] = temp;
    // Renumber
    newOptions.forEach((opt, i) => { opt.number = i + 1; });

    const updatedQuestions = activeQuestions.map(q => q.id === qId ? { ...q, options: newOptions } : q);
    onChange({ ...config, surveyQuestionItems: updatedQuestions });
    triggerToast(`تم تبديل الكرت #${idx1 + 1} مع الكرت #${idx2 + 1} بنجاح! 🔄`);
  };

  // Save edited card
  const handleSaveOption = () => {
    if (!editingOption) return;
    const { qId, option } = editingOption;
    const updatedQuestions = activeQuestions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map(o => o.id === option.id ? option : o)
        };
      }
      return q;
    });
    onChange({ ...config, surveyQuestionItems: updatedQuestions });
    setEditingOption(null);
    triggerToast('تم تحديث الكرت بنجاح! ✅');
  };

  // Save edited question title & icon
  const handleSaveQuestion = () => {
    if (!editingQuestion) return;
    const updatedQuestions = activeQuestions.map(q => q.id === editingQuestion.id ? editingQuestion : q);
    onChange({ ...config, surveyQuestionItems: updatedQuestions });
    setEditingQuestion(null);
    triggerToast('تم تحديث السؤال بنجاح! ✅');
  };

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between text-sm font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="opacity-80 hover:opacity-100 cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}

      {/* 1. Smart Assistant Bar (المساعد الذكي بضغطة واحدة) */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-5 shadow-xl border border-emerald-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-emerald-700/80 px-3 py-1 rounded-full text-xs font-black text-emerald-200 border border-emerald-500/40">
              <Sparkles size={14} className="text-amber-300 animate-spin" />
              <span>المساعد الذكي لتوليد الأسئلة بضغطة واحدة ✨</span>
            </div>
            <h3 className="text-lg font-black text-white">
              اختر نوع نشاطك أو اكتبه ليقوم الذكاء الاصطناعي بتجهيز 4 كروت مطابقة
            </h3>
            <p className="text-xs text-emerald-100/80 font-medium">
              يولد أسئلة دقيقة وكروت 2x2 ملونة وجذابة بدون عناء الكتابة المتعبة
            </p>
          </div>

          {/* Quick industry 1-click buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applySmartPreset('cafe')}
              disabled={aiGenerating}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
            >
              <Coffee size={14} className="text-amber-400" />
              <span>كافيه ومقهى</span>
            </button>

            <button
              type="button"
              onClick={() => applySmartPreset('restaurant')}
              disabled={aiGenerating}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
            >
              <Utensils size={14} className="text-rose-400" />
              <span>مطعم وضيافة</span>
            </button>

            <button
              type="button"
              onClick={() => applySmartPreset('supermarket')}
              disabled={aiGenerating}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
            >
              <ShoppingBag size={14} className="text-emerald-400" />
              <span>سوبرماركت</span>
            </button>

            <button
              type="button"
              onClick={() => applySmartPreset('hotel')}
              disabled={aiGenerating}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
            >
              <Hotel size={14} className="text-blue-400" />
              <span>فندق وشقق</span>
            </button>

            <button
              type="button"
              onClick={() => applySmartPreset('salon')}
              disabled={aiGenerating}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
            >
              <Scissors size={14} className="text-purple-400" />
              <span>صالون وتجميل</span>
            </button>
          </div>
        </div>

        {/* Custom Industry Input */}
        <div className="mt-4 pt-3 border-t border-emerald-700/50 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={customIndustryInput}
              onChange={e => setCustomIndustryInput(e.target.value)}
              placeholder="أو اكتب اسم أي مجال تجاري آخر (مثلاً: عيادة أسنان، مغسلة سيارات، متجر ملابس...)"
              className="w-full bg-emerald-950/60 border border-emerald-600/60 rounded-xl px-4 py-2 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (!customIndustryInput.trim()) return;
              applySmartPreset('custom', customIndustryInput.trim());
            }}
            disabled={!customIndustryInput.trim() || aiGenerating}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 text-xs font-black px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <Wand2 size={15} />
            <span>{aiGenerating ? 'جارٍ التوليد الذكي...' : 'توليد ذكي فوري ⚡'}</span>
          </button>
        </div>
      </div>

      {/* 2. Style Selector: Presentation Layout */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
            <LayoutGrid size={17} className="text-emerald-700" />
            <span>شكل وطريقة عرض كروت الاستبيان للعميل</span>
          </h4>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            حدد كيف تظهر الخيارات للعميل (كروت 2x2 الكبيرة كصور العميل 5 و 6 و 7 هي الموصى بها)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => onChange({ ...config, surveyCardStyle: 'grid2x2' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              (config.surveyCardStyle || 'grid2x2') === 'grid2x2'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutGrid size={14} />
            <span>كروت 2x2 عصرية (كبيرة)</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...config, surveyCardStyle: 'compact_horizontal' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              config.surveyCardStyle === 'compact_horizontal'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List size={14} />
            <span>بطاقات أفقية</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...config, surveyCardStyle: 'stars_faces' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              config.surveyCardStyle === 'stars_faces'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smile size={14} />
            <span>شريط وجوه سريع</span>
          </button>
        </div>
      </div>

      {/* 3. Main Tabs: Active Questions vs. Reserve Question Bank */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('active')}
          className={`pb-2 text-sm font-black flex items-center gap-2 cursor-pointer border-b-2 transition-all ${
            activeTab === 'active'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>الأسئلة النشطة في الاستبيان ({activeQuestions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('spare')}
          className={`pb-2 text-sm font-black flex items-center gap-2 cursor-pointer border-b-2 transition-all ${
            activeTab === 'spare'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <ArrowRightLeft size={16} className="text-amber-500" />
          <span>بنك الأسئلة الاحتياطية للتبديل ({SPARE_SURVEY_QUESTION_BANK.length})</span>
          <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-black">
            احتياط متاح
          </span>
        </button>
      </div>

      {/* TAB 1: ACTIVE QUESTIONS */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {/* Question Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {activeQuestions.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setSelectedQuestionId(q.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
                  selectedQuestionId === q.id
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-md scale-102'
                    : 'bg-white text-gray-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">{q.icon || '⭐'}</span>
                <span>سؤال {idx + 1}: {q.titleAr}</span>
              </button>
            ))}
          </div>

          {/* Selected Question Header & Actions */}
          {selectedQuestion && (
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                    {selectedQuestion.icon || '⭐'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-gray-900">
                        {selectedQuestion.titleAr}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingQuestion(selectedQuestion)}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200"
                      >
                        <Edit3 size={12} />
                        <span>تعديل العنوان</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {selectedQuestion.titleEn || 'Customer survey question'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('spare')}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRightLeft size={13} />
                    <span>تبديل بسؤال من الاحتياط 🔄</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveActiveToSpare(selectedQuestion.id)}
                    className="bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={13} className="text-red-500" />
                    <span>نقل للاحتياط</span>
                  </button>
                </div>
              </div>

              {/* 2x2 MIRRORED CUSTOMER CARDS PREVIEW */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-black text-gray-700 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-700" />
                    <span>معاينة الكروت الأربعة تماماً كما يراها العميل (اضغط للتعديل أو التبديل):</span>
                  </span>
                  <span className="text-[11px] font-bold text-gray-500">
                    4 خيارات تقييم ملونة
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {selectedQuestion.options.map((opt, idx) => {
                    const gradeColors: Record<string, { border: string; bg: string; badge: string; text: string }> = {
                      great: { border: 'border-emerald-300', bg: 'bg-emerald-50/40', badge: 'bg-emerald-100 text-emerald-800', text: 'ممتاز' },
                      good: { border: 'border-blue-300', bg: 'bg-blue-50/40', badge: 'bg-blue-100 text-blue-800', text: 'جيد' },
                      normal: { border: 'border-amber-300', bg: 'bg-amber-50/40', badge: 'bg-amber-100 text-amber-800', text: 'مقبول' },
                      bad: { border: 'border-rose-300', bg: 'bg-rose-50/40', badge: 'bg-rose-100 text-rose-800', text: 'يحتاج تحسين' },
                    };
                    const color = gradeColors[opt.grade || 'great'] || gradeColors.great;

                    return (
                      <div
                        key={opt.id}
                        className={`bg-white rounded-2xl p-4 border-2 ${color.border} shadow-sm relative overflow-hidden transition-all hover:shadow-md flex flex-col justify-between`}
                      >
                        {/* Number badge top right */}
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                            #{opt.number || idx + 1}
                          </span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${color.badge}`}>
                            {color.text}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="text-center py-2 space-y-1">
                          <span className="text-3xl block filter drop-shadow-xs">
                            {opt.icon || '✨'}
                          </span>
                          <h5 className="text-sm font-black text-gray-900 leading-tight">
                            {opt.title}
                          </h5>
                          {opt.titleEn && (
                            <p className="text-[11px] text-gray-500 font-medium">
                              {opt.titleEn}
                            </p>
                          )}
                        </div>

                        {/* Quick Card Controls */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => setEditingOption({ qId: selectedQuestion.id, option: { ...opt } })}
                            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                          >
                            <Edit3 size={11} />
                            <span>تعديل الكرت</span>
                          </button>

                          {/* Swap button */}
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-400 font-bold">تبديل مع:</span>
                            {[0, 1, 2, 3].filter(i => i !== idx).map(targetIdx => (
                              <button
                                key={targetIdx}
                                type="button"
                                onClick={() => handleSwapOptions(selectedQuestion.id, idx, targetIdx)}
                                className="w-5 h-5 rounded-md bg-slate-100 hover:bg-slate-200 text-gray-700 text-[10px] font-black flex items-center justify-center cursor-pointer"
                                title={`تبديل مع الكرت #${targetIdx + 1}`}
                              >
                                #{targetIdx + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RESERVE QUESTION BANK */}
      {activeTab === 'spare' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-black text-sm">
                📦 بنك الأسئلة الاحتياطية المجهزة باحترافية
              </p>
              <p className="text-amber-800 font-medium">
                يمكنك بضغطة زر إضافة أي سؤال احتياطي للاستبيان أو استبداله مكان أحد الأسئلة الحالية.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPARE_SURVEY_QUESTION_BANK.map((spareQ) => {
              const isAlreadyActive = activeQuestions.some(q => q.id === spareQ.id);

              return (
                <div
                  key={spareQ.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-2 bg-slate-50 rounded-2xl border border-slate-200">
                        {spareQ.icon}
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-gray-900">
                          {spareQ.titleAr}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {spareQ.titleEn}
                        </p>
                      </div>
                    </div>

                    {isAlreadyActive && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check size={10} />
                        <span>نشط حالياً</span>
                      </span>
                    )}
                  </div>

                  {/* 4 Cards Mini Strip */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                    {spareQ.options.map((opt) => (
                      <div key={opt.id} className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                        <span className="text-base block">{opt.icon}</span>
                        <span className="text-[10px] font-black text-gray-800 block truncate">{opt.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAddSpareToActive(spareQ)}
                      disabled={isAlreadyActive}
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                    >
                      <Plus size={14} />
                      <span>إضافة للاستبيان النشط ➕</span>
                    </button>

                    {selectedQuestion && !isAlreadyActive && (
                      <button
                        type="button"
                        onClick={() => handleSwapActiveWithSpare(selectedQuestion.id, spareQ)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all"
                        title="تبديل مع السؤال النشط المحدد حالياً"
                      >
                        <ArrowRightLeft size={13} />
                        <span>تبديل بالسؤال الحالي</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: EDIT CARD OPTION */}
      {editingOption && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <Edit3 size={16} className="text-emerald-700" />
                <span>تعديل كرت التقييم #{editingOption.option.number}</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingOption(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  أيقونة الكرت (إيموجي)
                </label>
                <input
                  type="text"
                  value={editingOption.option.icon || ''}
                  onChange={e => setEditingOption({
                    ...editingOption,
                    option: { ...editingOption.option, icon: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center text-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  عنوان الكرت الرئيسي (عربي)
                </label>
                <input
                  type="text"
                  value={editingOption.option.title}
                  onChange={e => setEditingOption({
                    ...editingOption,
                    option: { ...editingOption.option, title: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  العنوان الفرعي / بالإنجليزية
                </label>
                <input
                  type="text"
                  value={editingOption.option.titleEn || ''}
                  onChange={e => setEditingOption({
                    ...editingOption,
                    option: { ...editingOption.option, titleEn: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-gray-700"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  درجة التقييم
                </label>
                <select
                  value={editingOption.option.grade || 'great'}
                  onChange={e => setEditingOption({
                    ...editingOption,
                    option: { ...editingOption.option, grade: e.target.value as any }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-gray-800 cursor-pointer"
                >
                  <option value="great">ممتاز (5 نجوم) 🤩</option>
                  <option value="good">جيد (4 نجوم) 😊</option>
                  <option value="normal">مقبول (3 نجوم) 😐</option>
                  <option value="bad">سيء (نجمة واحدة) ☹️</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSaveOption}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-black py-2.5 rounded-xl cursor-pointer shadow-sm text-xs"
              >
                حفظ التعديلات ✅
              </button>
              <button
                type="button"
                onClick={() => setEditingOption(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold rounded-xl cursor-pointer text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT QUESTION TITLE */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <Edit3 size={16} className="text-emerald-700" />
                <span>تعديل عنوان السؤال والأيقونة</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  أيقونة السؤال (إيموجي)
                </label>
                <input
                  type="text"
                  value={editingQuestion.icon || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, icon: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center text-2xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  نص السؤال (بالعربية)
                </label>
                <input
                  type="text"
                  value={editingQuestion.titleAr}
                  onChange={e => setEditingQuestion({ ...editingQuestion, titleAr: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  نص السؤال (بالإنجليزية)
                </label>
                <input
                  type="text"
                  value={editingQuestion.titleEn || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, titleEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSaveQuestion}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-black py-2.5 rounded-xl cursor-pointer shadow-sm text-xs"
              >
                حفظ التعديل ✅
              </button>
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold rounded-xl cursor-pointer text-xs"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
