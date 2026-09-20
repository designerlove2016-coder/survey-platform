import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Smartphone, 
  RotateCcw, 
  Search, 
  Check, 
  Edit2, 
  Copy, 
  Trash2, 
  X, 
  Sparkles,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Layers,
  ChevronRight,
  ChevronLeft,
  Globe
} from 'lucide-react';
import { QuestionTemplateItem, QuestionTemplateOption } from '../../../types/surveyPlatform';
import { DEFAULT_QUESTION_TEMPLATES } from '../../../utils/surveyDefaults';

interface OperationalQuestionTemplatesTabProps {
  templates: QuestionTemplateItem[];
  onChange: (templates: QuestionTemplateItem[]) => void;
  onOpenMobilePreview: () => void;
  selectedTemplateId?: string;
  onSelectTemplate?: (id: string) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

export const OperationalQuestionTemplatesTab: React.FC<OperationalQuestionTemplatesTabProps> = ({
  templates,
  onChange,
  onOpenMobilePreview,
  selectedTemplateId,
  onSelectTemplate,
  isWideMode = false,
  isEnglish = false
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'enabled' | 'disabled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardDensity, setCardDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [layoutMode, setLayoutMode] = useState<'sequential' | 'grid'>('sequential');

  // Drag and drop states for active stages
  const [draggedStageId, setDraggedStageId] = useState<string | null>(null);
  const [dragOverStageId, setDragOverStageId] = useState<string | null>(null);

  // Modal states
  const [editingTemplate, setEditingTemplate] = useState<QuestionTemplateItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [formCategory, setFormCategory] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formActionBtnText, setFormActionBtnText] = useState('✨ تأكيد ومتابعة');
  const [formOptions, setFormOptions] = useState<QuestionTemplateOption[]>([]);

  // Split templates into active (enabled) and inactive (disabled) while keeping order
  const activeTemplates = useMemo(() => {
    return templates.filter(t => t.isEnabled);
  }, [templates]);

  const inactiveTemplates = useMemo(() => {
    return templates.filter(t => !t.isEnabled);
  }, [templates]);

  const enabledCount = activeTemplates.length;
  const disabledCount = inactiveTemplates.length;

  // Filter with search
  const filterBySearch = (list: QuestionTemplateItem[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(t => {
      const matchTitle = t.titleAr.toLowerCase().includes(q);
      const matchCat = t.categoryBadge.toLowerCase().includes(q);
      const matchSubtitle = t.subtitleAr ? t.subtitleAr.toLowerCase().includes(q) : false;
      return matchTitle || matchCat || matchSubtitle;
    });
  };

  const filteredActive = useMemo(() => filterBySearch(activeTemplates), [activeTemplates, searchQuery]);
  const filteredInactive = useMemo(() => filterBySearch(inactiveTemplates), [inactiveTemplates, searchQuery]);

  // Toggle activation
  const handleToggleEnabled = (id: string) => {
    const target = templates.find(t => t.id === id);
    if (!target) return;

    if (target.isEnabled) {
      // Deactivate: move to disabled list at the bottom
      const remainingActive = templates.filter(t => t.id !== id && t.isEnabled);
      const remainingDisabled = templates.filter(t => t.id !== id && !t.isEnabled);
      const updatedTarget: QuestionTemplateItem = { ...target, isEnabled: false };
      onChange([...remainingActive, ...remainingDisabled, updatedTarget]);
    } else {
      // Activate: append to active list as the next numbered stage
      const currentActive = templates.filter(t => t.isEnabled);
      const remainingDisabled = templates.filter(t => t.id !== id && !t.isEnabled);
      const updatedTarget: QuestionTemplateItem = { ...target, isEnabled: true };
      onChange([...currentActive, updatedTarget, ...remainingDisabled]);
    }
  };

  // Reorder active templates
  const handleMoveActiveStage = (templateId: string, direction: 'up' | 'down' | 'first' | 'last') => {
    const activeList = [...templates.filter(t => t.isEnabled)];
    const disabledList = templates.filter(t => !t.isEnabled);

    const currentIndex = activeList.findIndex(t => t.id === templateId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex;
    if (direction === 'up') {
      targetIndex = Math.max(0, currentIndex - 1);
    } else if (direction === 'down') {
      targetIndex = Math.min(activeList.length - 1, currentIndex + 1);
    } else if (direction === 'first') {
      targetIndex = 0;
    } else if (direction === 'last') {
      targetIndex = activeList.length - 1;
    }

    if (targetIndex === currentIndex) return;

    const [moved] = activeList.splice(currentIndex, 1);
    activeList.splice(targetIndex, 0, moved);

    onChange([...activeList, ...disabledList]);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedStageId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStageId !== id) {
      setDragOverStageId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedStageId || draggedStageId === targetId) {
      setDraggedStageId(null);
      setDragOverStageId(null);
      return;
    }

    const activeList = [...templates.filter(t => t.isEnabled)];
    const disabledList = templates.filter(t => !t.isEnabled);

    const fromIdx = activeList.findIndex(t => t.id === draggedStageId);
    const toIdx = activeList.findIndex(t => t.id === targetId);

    if (fromIdx !== -1 && toIdx !== -1) {
      const [moved] = activeList.splice(fromIdx, 1);
      activeList.splice(toIdx, 0, moved);
      onChange([...activeList, ...disabledList]);
    }

    setDraggedStageId(null);
    setDragOverStageId(null);
  };

  const handleDragEnd = () => {
    setDraggedStageId(null);
    setDragOverStageId(null);
  };

  const handleDuplicate = (template: QuestionTemplateItem) => {
    const newTemplate: QuestionTemplateItem = {
      ...template,
      id: `qt_${Date.now()}`,
      titleAr: `${template.titleAr} (${isEnglish ? 'Copy' : 'نسخة'})`,
      isEnabled: false
    };
    onChange([...templates, newTemplate]);
  };

  const handleDelete = (id: string) => {
    if (templates.length <= 1) {
      alert(isEnglish ? 'At least one template must remain' : 'يجب الإبقاء على قالب واحد على الأقل');
      return;
    }
    onChange(templates.filter(t => t.id !== id));
  };

  const handleResetOriginal = () => {
    if (confirm(isEnglish ? 'Reset question templates to default?' : 'هل تود استعادة قوالب الأسئلة الأصلية؟')) {
      onChange(DEFAULT_QUESTION_TEMPLATES);
    }
  };

  const handleOpenEdit = (t: QuestionTemplateItem) => {
    setEditingTemplate(t);
    setIsAddingNew(false);
    setFormCategory(t.categoryBadge);
    setFormTitle(t.titleAr);
    setFormSubtitle(t.subtitleAr || '');
    setFormActionBtnText(t.actionButtonText || '✨ تأكيد ومتابعة');
    setFormOptions([...t.options]);
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingTemplate(null);
    setFormCategory('✨ قسم مخصص ✨');
    setFormTitle('');
    setFormSubtitle('');
    setFormActionBtnText('✨ تأكيد ومتابعة');
    setFormOptions([
      { id: `opt_${Date.now()}_1`, num: 1, emoji: '👍', text: 'ممتاز وراضٍ تماماً' },
      { id: `opt_${Date.now()}_2`, num: 2, emoji: '👌', text: 'جيد ومقبول' },
      { id: `opt_${Date.now()}_3`, num: 3, emoji: '⚠️', text: 'يحتاج إلى تحسين' },
      { id: `opt_${Date.now()}_4`, num: 4, emoji: '👎', text: 'غير راضٍ' }
    ]);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const optionsCountLabel = formOptions.length === 2 ? 'خيارين' : `خيارات ${formOptions.length}`;

    if (isAddingNew) {
      const newTemplate: QuestionTemplateItem = {
        id: `qt_${Date.now()}`,
        categoryBadge: formCategory.trim() || '✨ قسم مخصص ✨',
        optionsCountLabel,
        titleAr: formTitle.trim(),
        subtitleAr: formSubtitle.trim(),
        isEnabled: true,
        actionButtonText: formActionBtnText.trim() || '✨ تأكيد ومتابعة',
        options: formOptions
      };
      // Place newly active template at end of active list
      const activeList = templates.filter(t => t.isEnabled);
      const disabledList = templates.filter(t => !t.isEnabled);
      onChange([...activeList, newTemplate, ...disabledList]);
    } else if (editingTemplate) {
      const updated = templates.map(t => 
        t.id === editingTemplate.id
          ? {
              ...t,
              categoryBadge: formCategory.trim() || t.categoryBadge,
              optionsCountLabel,
              titleAr: formTitle.trim(),
              subtitleAr: formSubtitle.trim(),
              actionButtonText: formActionBtnText.trim() || t.actionButtonText,
              options: formOptions
            }
          : t
      );
      onChange(updated);
    }
    setEditingTemplate(null);
    setIsAddingNew(false);
  };

  // Reusable card renderer
  const renderTemplateCard = (template: QuestionTemplateItem, stageNumber?: number, totalStages?: number) => {
    const isAct = template.isEnabled;
    const isDragged = draggedStageId === template.id;
    const isDragOver = dragOverStageId === template.id;
    const isSelected = selectedTemplateId === template.id;

    return (
      <div
        key={template.id}
        id={`card_${template.id}`}
        draggable={isAct}
        onDragStart={(e) => isAct && handleDragStart(e, template.id)}
        onDragOver={(e) => isAct && handleDragOver(e, template.id)}
        onDrop={(e) => isAct && handleDrop(e, template.id)}
        onDragEnd={handleDragEnd}
        onClick={() => onSelectTemplate?.(template.id)}
        className={`bg-white border-2 rounded-3xl p-5 shadow-2xs flex flex-col justify-between transition-all relative cursor-pointer ${
          isDragged
            ? 'opacity-40 scale-95 border-amber-500 border-dashed'
            : isDragOver
            ? 'border-amber-500 ring-4 ring-amber-400/30 scale-[1.02]'
            : isSelected
            ? 'border-[#005A2B] ring-4 ring-[#005A2B]/20 bg-emerald-50/15 shadow-md'
            : isAct 
            ? 'border-emerald-500/80 ring-2 ring-emerald-500/10 hover:shadow-md hover:border-emerald-500' 
            : 'border-slate-200/90 hover:border-slate-300'
        }`}
      >
        <div>
          {/* Top Row: Clean Organized Header (Stage Badge + Category + Activation + Reorder) */}
          <div className="flex flex-col gap-2.5 border-b border-slate-100 pb-3">
            {/* Row 1: Badges & Activation Toggle Button */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                {isAct && stageNumber !== undefined ? (
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-mono font-black text-xs px-3 py-1 rounded-xl shadow-xs flex items-center gap-1.5 border border-emerald-800 shrink-0">
                    <span className="w-5 h-5 rounded-full bg-white text-emerald-800 text-[11px] font-black flex items-center justify-center">
                      {stageNumber}
                    </span>
                    <span>{isEnglish ? `Stage #${stageNumber}` : `المرحلة #${stageNumber}`}</span>
                    {stageNumber === 1 && (
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                        {isEnglish ? 'Start 🚀' : 'البداية 🚀'}
                      </span>
                    )}
                    {totalStages && stageNumber === totalStages && (
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md">
                        {isEnglish ? 'Finish 🏁' : 'الختام 🏁'}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-600 font-bold text-xs px-2.5 py-1 rounded-xl border border-slate-200 shrink-0">
                    {isEnglish ? 'Inactive' : 'غير مفعل'}
                  </span>
                )}

                {isSelected && (
                  <span className="bg-[#005A2B] text-white font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-xs shrink-0 ring-2 ring-emerald-400 animate-pulse">
                    <Smartphone size={13} />
                    <span>{isEnglish ? 'Live on Customer Phone 📱' : 'معروضة على جوال العميل الآن 📱'}</span>
                  </span>
                )}

                <span className="text-[11px] font-black text-amber-800 bg-[#fef9c3] border border-[#fde047] px-2.5 py-1 rounded-xl inline-block shadow-2xs shrink-0">
                  {template.categoryBadge}
                </span>

                <span className="text-[10px] font-bold text-slate-400">
                  {template.optionsCountLabel}
                </span>
              </div>

              {/* Activation Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleEnabled(template.id);
                }}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs shrink-0 ${
                  isAct
                    ? 'bg-[#00875a] hover:bg-[#00744e] text-white ring-2 ring-emerald-600/20'
                    : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200'
                }`}
                title={isAct ? (isEnglish ? 'Click to disable and move to bottom' : 'انقر لإلغاء التفعيل ونقله للأسفل') : (isEnglish ? 'Click to enable and add to survey' : 'انقر للتفعيل ونقله لتسلسل العميل بالأعلى')}
              >
                {isAct ? (
                  <>
                    <Check size={13} strokeWidth={3} />
                    <span>{isEnglish ? 'Active in Survey ✓' : 'مفعل بالاستبيان ✓'}</span>
                  </>
                ) : (
                  <>
                    <Plus size={13} strokeWidth={2.5} />
                    <span>{isEnglish ? '+ Add to Survey' : '+ إضافة للاستبيان'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Row 2: Order Controls & Mouse Drag Handle (for active cards) */}
            {isAct && stageNumber !== undefined && totalStages !== undefined && (
              <div className="flex items-center justify-between gap-1.5 text-xs font-bold text-slate-700 bg-slate-50/90 p-2 rounded-2xl border border-slate-200/90 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-600 font-black">
                    {isEnglish ? `Sequence (${stageNumber} of ${totalStages}):` : `الترتيب المباشر (${stageNumber} من ${totalStages}):`}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveActiveStage(template.id, 'up');
                    }}
                    disabled={stageNumber === 1}
                    className="px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 disabled:opacity-25 disabled:pointer-events-none transition-all border border-slate-200/80 shadow-2xs cursor-pointer flex items-center gap-1 text-xs font-black"
                    title={isEnglish ? 'Move 1 step earlier' : 'تقديم خطوة للأمام في رحلة العميل'}
                  >
                    <ArrowUp size={12} strokeWidth={2.5} />
                    <span>{isEnglish ? 'Earlier' : 'تقديم ⬆️'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveActiveStage(template.id, 'down');
                    }}
                    disabled={stageNumber === totalStages}
                    className="px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 disabled:opacity-25 disabled:pointer-events-none transition-all border border-slate-200/80 shadow-2xs cursor-pointer flex items-center gap-1 text-xs font-black"
                    title={isEnglish ? 'Move 1 step later' : 'تأخير خطوة للخلف في رحلة العميل'}
                  >
                    <ArrowDown size={12} strokeWidth={2.5} />
                    <span>{isEnglish ? 'Later' : 'تأخير ⬇️'}</span>
                  </button>
                  {stageNumber > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveActiveStage(template.id, 'first');
                      }}
                      className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-black transition-colors cursor-pointer border border-amber-300/80"
                      title={isEnglish ? 'Make first stage' : 'جعله المرحلة الأولى مباشرة في بداية الرحلة'}
                    >
                      #1 الأولى 🔝
                    </button>
                  )}
                  {stageNumber < totalStages && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveActiveStage(template.id, 'last');
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-black transition-colors cursor-pointer border border-slate-300/80"
                      title={isEnglish ? 'Make last stage' : 'جعله المرحلة الأخيرة في نهاية الرحلة'}
                    >
                      #{totalStages} الأخيرة 🔚
                    </button>
                  )}
                </div>

                <div 
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 hover:text-slate-900 cursor-grab active:cursor-grabbing shadow-2xs font-bold"
                  title={isEnglish ? 'Drag with mouse to reorder' : 'اسحب بالماوس لتغيير الترتيب'}
                >
                  <GripVertical size={13} className="text-slate-400" />
                  <span>اسحب بالماوس ⠿</span>
                </div>
              </div>
            )}
          </div>

          {/* Card Content: Custom Specialized Layouts vs Default 2x2 Grid */}
          {template.layoutType === 'language_roller' || template.id === 'qt_language_preference' ? (
            /* ========================================================================= */
            /* 1. EXACT REPLICA OF SCREENSHOT 1: LANGUAGE SELECTION 3D ROLLER            */
            /* ========================================================================= */
            <div className="mt-2 space-y-2">
              {/* Top Row: Store Badge + Corner Flag Pill */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200 text-xs font-black text-emerald-800 shadow-2xs">
                  <span>🇸🇦</span>
                  <span className="font-mono text-xs font-black">SA</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-orange-200/90 bg-white shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#E34F26] to-[#F77F00] text-white flex items-center justify-center text-[10px]">🍊</span>
                  <span className="text-xs font-black text-[#005A2B]">مطعم</span>
                </div>
              </div>

              {/* Welcome Badge Pill */}
              <div className="flex justify-center">
                <div className="bg-[#EBF7F0] border border-[#C6EAD7] text-[#006837] px-3.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <span className="text-amber-500 text-xs">✨</span>
                  <span>مرحباً بك في أسواق بنده</span>
                  <span className="text-xs">🐼</span>
                </div>
              </div>

              {/* Headings */}
              <div className="text-center">
                <h4 className="text-base sm:text-lg font-black text-[#00381C] flex items-center justify-center gap-1.5">
                  <span>اختر لغتك المفضلة</span>
                  <span className="text-[#006837]">🌐</span>
                </h4>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                  لتجربة تسوق ذكية وممتعة مخصصة لك
                </p>
              </div>

              {/* 3D Vertical Roller Widget */}
              <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-2.5 space-y-1.5 select-none shadow-xs">
                {/* Faded Upper: Filipino */}
                <div className="w-full py-1 px-3 rounded-lg flex items-center justify-between opacity-40 text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">🇵🇭</span>
                    <span className="text-[10px] font-bold text-gray-400 font-mono">PH</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-700 leading-tight">Filipino</span>
                    <span className="text-[9px] text-gray-400 font-medium">(Philippines) Filipino - الفلبين</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 font-mono">PH</span>
                    <span className="text-xs">🇵🇭</span>
                  </div>
                </div>

                {/* ACTIVE Selected: Arabic (with vertical green accent bars & mint background) */}
                <div className="w-full py-2 px-3 rounded-xl bg-[#E8F8F0] border-2 border-[#1E7E4E] shadow-[0_4px_14px_rgba(0,90,43,0.08)] flex items-center justify-between relative">
                  <div className="w-1.5 h-6 bg-[#005A2B] rounded-full shrink-0" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">🇸🇦</span>
                    <span className="text-xs font-black text-[#005A2B] font-mono">SA</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center px-1">
                    <span className="text-sm sm:text-base font-black text-[#00381C] leading-tight">العربية</span>
                    <span className="text-[10px] font-bold text-[#006837] mt-0.5">العربية • المملكة العربية السعودية</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#005A2B] font-mono">SA</span>
                    <span className="text-xs">🇸🇦</span>
                  </div>
                  <div className="w-1.5 h-6 bg-[#005A2B] rounded-full shrink-0" />
                </div>

                {/* Faded Lower: English */}
                <div className="w-full py-1 px-3 rounded-lg flex items-center justify-between opacity-40 text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">🇬🇧</span>
                    <span className="text-[10px] font-bold text-gray-400 font-mono">GB</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-700 leading-tight">English</span>
                    <span className="text-[9px] text-gray-400 font-medium">English - International</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 font-mono">GB</span>
                    <span className="text-xs">🇬🇧</span>
                  </div>
                </div>

                {/* Gesture hint */}
                <div className="text-center text-[10px] text-gray-400 font-bold pt-1">
                  ^ حرك بإصبعك للأعلى والأسفل ثم اضغط تأكيد v
                </div>
              </div>

              {/* Action Button: Exact Red-Orange Gradient from Screenshot 1 */}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full py-3.5 bg-[#E34F26] hover:bg-[#cf431d] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>تأكيد ومتابعة</span>
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          ) : template.layoutType === 'product_catalog' || template.id === 'qt_daily_shopping_needs' ? (
            /* ========================================================================= */
            /* 2. EXACT REPLICA OF SCREENSHOT 2: DAILY SHOPPING BENTO PRODUCT CARDS      */
            /* ========================================================================= */
            <div className="mt-2 space-y-2">
              {/* Header: Back Button + Title & Subtitle */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-bold">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-gray-600">
                      <ChevronRight size={14} />
                    </span>
                    <span>رجوع</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#005A2B] text-base">❇️</span>
                    <h4 className="text-sm sm:text-base font-black text-gray-800">
                      اختر احتياجاتك لهذا اليوم
                    </h4>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 font-medium text-center">
                  اضغط على المنتجات التي تنوي شراءها لتحليل عروضك المخصصة.
                </p>
              </div>

              {/* Progress & Department Section Info Row */}
              <div className="flex items-center justify-between px-1 text-[11px] font-black">
                <div className="flex items-center gap-1 text-[#005A2B]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>القسم 1 من 4: خضار وفواكه</span>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px]">
                  <span>مكتمل:</span> <span className="font-mono font-bold">0 / 4</span>
                </div>
              </div>

              {/* Horizontal Department Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl text-[10px] font-black overflow-hidden select-none">
                <span className="px-3 py-1.5 rounded-xl bg-[#005A2B] text-white shadow-2xs shrink-0">
                  خضار وفواكه
                </span>
                <span className="px-2 py-1 text-gray-500 truncate">مواد غذائية وت...</span>
                <span className="px-2 py-1 text-gray-500 truncate">الأجبان والألبان</span>
                <span className="px-2 py-1 text-gray-500 truncate">أدوات نظافة ...</span>
              </div>

              {/* Asymmetrical Bento Product Cards Grid (Matching Image 2) */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* Column 1: Cucumbers (top) & Red Onions (bottom) */}
                <div className="space-y-2 flex flex-col justify-between">
                  {/* Card 1: Fresh Cucumbers */}
                  <div className="border border-slate-200 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
                    <div className="relative w-full h-[76px] rounded-[16px] overflow-hidden bg-slate-100">
                      <img 
                        src="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=85" 
                        alt="خيار طازج"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 backdrop-blur-xs border-2 border-slate-300 shadow-xs flex items-center justify-center" />
                    </div>
                    <div className="mt-1 text-right px-0.5">
                      <span className="text-xs font-black text-slate-900 block">خيار طازج</span>
                      <span className="text-[9px] text-slate-400 block">اضغط للاختيار</span>
                    </div>
                  </div>

                  {/* Card 2: Red Onion */}
                  <div className="border border-slate-200 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
                    <div className="relative w-full h-[76px] rounded-[16px] overflow-hidden bg-slate-100">
                      <img 
                        src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=85" 
                        alt="بصل أحمر"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 backdrop-blur-xs border-2 border-slate-300 shadow-xs flex items-center justify-center" />
                    </div>
                    <div className="mt-1 text-right px-0.5">
                      <span className="text-xs font-black text-slate-900 block">بصل أحمر</span>
                      <span className="text-[9px] text-slate-400 block">اضغط للاختيار</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Tall Card: Tomatoes / Local Carrots */}
                <div className="border border-slate-200 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
                  <div className="relative w-full flex-1 min-h-[175px] rounded-[16px] overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=85" 
                      alt="طماطم محلي"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 backdrop-blur-xs border-2 border-slate-300 shadow-xs flex items-center justify-center" />
                  </div>
                  <div className="mt-1 text-right px-0.5">
                    <span className="text-xs font-black text-slate-900 block">طماطم محلي</span>
                    <span className="text-[9px] text-slate-400 block">اضغط للاختيار</span>
                  </div>
                </div>
              </div>

              {/* Bottom Full-Width Card: Potato Bag with "Soon" / "قريباً" */}
              <div className="border border-slate-200 rounded-[20px] p-2 bg-white shadow-2xs flex flex-col justify-between relative group hover:border-emerald-400 transition-all">
                <div className="relative w-full h-[76px] rounded-[16px] overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=85" 
                    alt="بطاطس كيس"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-slate-800 text-[9px] font-black px-2 py-0.5 rounded-full border border-white/60 shadow-xs">
                    قريباً
                  </span>
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 backdrop-blur-xs border-2 border-slate-300 shadow-xs flex items-center justify-center" />
                </div>
                <div className="mt-1 text-right px-0.5">
                  <span className="text-xs font-black text-slate-900 block">بطاطس كيس</span>
                  <span className="text-[9px] text-slate-400 block">اضغط للاختيار</span>
                </div>
              </div>

              {/* Bottom Tip Bar */}
              <div className="pt-1 text-center text-[10px] font-bold text-gray-500 flex items-center justify-center gap-1">
                <span>👉 اختر طلبك من قسم "خضار وفواكه" للانتقال للقسم التالي</span>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* 3. DEFAULT STANDARD TEMPLATES: 2x2 EMOJI SQUARES GRID                     */
            /* ========================================================================= */
            <>
              {/* Title & Subtitle Centered (Matching Image) */}
              <div className="mt-2.5 text-center space-y-1">
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {template.titleAr}
                </h4>
                {template.subtitleAr && (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {template.subtitleAr}
                  </p>
                )}
              </div>

              {/* 2x2 Square Choices Grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                {template.options.map((opt, oIdx) => (
                  <div
                    key={opt.id || oIdx}
                    className={`bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-amber-400 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-between text-center relative shadow-2xs transition-all group/opt ${
                      cardDensity === 'compact' ? 'min-h-[82px]' : 'min-h-[96px]'
                    }`}
                  >
                    {/* Number circle top right */}
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full border border-slate-200 text-slate-400 group-hover/opt:text-amber-600 group-hover/opt:border-amber-300 text-[10px] font-bold font-mono flex items-center justify-center bg-slate-50">
                      {oIdx + 1}
                    </span>

                    {/* Large Center Emoji */}
                    <div className={`my-auto group-hover/opt:scale-110 transition-transform ${
                      cardDensity === 'compact' ? 'text-2xl pt-1' : 'text-3xl pt-2'
                    }`}>
                      {opt.emoji || '✨'}
                    </div>

                    {/* Option Text */}
                    <div className="w-full">
                      <span className="text-[11px] font-black text-slate-900 leading-snug line-clamp-2 block">
                        {opt.text}
                      </span>
                      {opt.subtext && (
                        <span className="text-[9px] text-slate-400 block mt-0.5 truncate">
                          {opt.subtext}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Action Button in Card (Orange-Rose gradient matching Image) */}
              <div className="mt-4 pt-2">
                <div className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-center font-black text-xs rounded-2xl shadow-md">
                  {template.actionButtonText || '✨ تأكيد ومتابعة'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Card Utilities: Edit, Duplicate, Show on Mobile, Delete */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs gap-1 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate?.(template.id);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                isSelected
                  ? 'bg-[#005A2B] text-white border-emerald-700 shadow-2xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] border-emerald-200'
              }`}
            >
              <Smartphone size={12} />
              <span>{isSelected ? (isEnglish ? 'On Phone 📱' : 'معروض الآن 📱') : (isEnglish ? 'Show on Phone 📱' : 'عرض على الجوال 📱')}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEdit(template);
              }}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer border border-blue-200/60"
            >
              <Edit2 size={12} />
              <span>{isEnglish ? 'Edit' : 'تعديل'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDuplicate(template);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200"
              title={isEnglish ? 'Duplicate' : 'تكرار'}
            >
              <Copy size={12} />
              <span>{isEnglish ? 'Duplicate' : 'تكرار'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(template.id);
            }}
            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer border border-rose-200/60"
            title={isEnglish ? 'Delete' : 'حذف'}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Yellow Banner */}
      <div className="bg-[#fef9e8] border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Badges on the right/left */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-amber-100/90 text-amber-900 border border-amber-300/80 font-black text-xs px-3 py-1 rounded-xl shadow-2xs">
              {isEnglish ? 'Interactive Survey Stage Templates 🌟' : 'قوالب مراحل استبيان العميل 🌟'}
            </span>

            <span className="bg-emerald-100/80 text-emerald-900 border border-emerald-300/80 font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {isEnglish 
                  ? `${enabledCount} of ${templates.length} active in customer survey 🟢` 
                  : `من ${templates.length} مفعلة في تسلسل رحلة العميل ${enabledCount} 🟢`}
              </span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-3.5 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>{isEnglish ? '+ Create New Template' : '+ إنشاء قالب سؤال جديد'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenMobilePreview}
              className="px-3.5 py-2 bg-[#121c2e] hover:bg-slate-900 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Smartphone size={15} />
              <span>{isEnglish ? 'Preview Guest (Mobile) 📱' : 'معاينة تجربة العميل (الجوال) 📱'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetOriginal}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300/80 flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
              title={isEnglish ? 'Restore Original Templates' : 'استعادة القوالب الأصلية'}
            >
              <RotateCcw size={14} />
              <span>{isEnglish ? 'Defaults 🔄' : 'استعادة القوالب الأصلية 🔄'}</span>
            </button>
          </div>
        </div>

        {/* Banner Texts */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {isEnglish 
              ? 'Order Customer Journey Stages Directly & Toggle Activations' 
              : 'ترتيب مراحل تجربة العميل مباشرة بالماوس والأرقام وتفعيل القوالب'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
            {isEnglish
              ? 'Active stages appear at the top in their exact numbered sequence (Stage #1, Stage #2...). Drag by mouse or use move buttons to reorder stages instantly. Inactive templates sit below and can be added with 1 click.'
              : 'المراحل المفعلة تظهر في الأعلى مرتبة بتسلسلها الرقمي (المرحلة #1، المرحلة #2...). يمكنك سحب أي قالب بالماوس أو نقله بالأزرار ليصبح رقم 1 أو 2 فوراً، والقوالب غير المفعلة تستقر تلقائياً بالأسفل وجاهزة للإضافة بنقرة واحدة.'}
          </p>
        </div>

        {/* Customer Journey Roadmap Bar - Dynamic Unified Stepper */}
        <div className="bg-white/95 border-2 border-emerald-500/40 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 font-black text-slate-800">
              <Sparkles size={16} className="text-emerald-600" />
              <span className="text-sm font-black">{isEnglish ? 'Live Customer Journey Flow (Numbered Sequence):' : 'مسار رحلة العميل بالتسلسل الرقمي المباشر المفعل:'}</span>
              <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
                {isEnglish ? '(Click any stage to view on phone & edit)' : '(انقر على أي مرحلة لعرضها على شاشة الجوال وتعديلها فوراً)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{enabledCount} {isEnglish ? 'Active Stages' : 'مراحل مفعلة في التجربة 🟢'}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {activeTemplates.map((t, idx) => {
              const isSelected = selectedTemplateId === t.id;
              const cleanTitle = t.categoryBadge.replace(/^[✨\s]+|[✨\s]+$/g, '');
              return (
                <React.Fragment key={t.id}>
                  <div
                    onClick={() => {
                      onSelectTemplate?.(t.id);
                      const el = document.getElementById(`card_${t.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`group relative px-3 py-2 rounded-xl text-xs font-black cursor-pointer transition-all border flex items-center gap-2 shrink-0 ${
                      isSelected
                        ? 'bg-[#005A2B] text-white border-emerald-800 shadow-md ring-2 ring-emerald-400 scale-[1.03]'
                        : 'bg-white hover:bg-emerald-50/80 text-slate-800 border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                    title={isEnglish ? `Stage #${idx + 1}: Click to preview on phone` : `المرحلة #${idx + 1}: انقر للعرض في الجوال والذهاب للبطاقة`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="truncate max-w-[130px] sm:max-w-[180px]">{cleanTitle}</span>
                    {isSelected && (
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white animate-pulse flex items-center gap-0.5">
                        <Smartphone size={11} />
                        <span>الجوال</span>
                      </span>
                    )}

                    {/* Quick Move Buttons right on stepper */}
                    <div className="hidden group-hover:flex items-center gap-0.5 ms-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveActiveStage(t.id, 'up');
                        }}
                        disabled={idx === 0}
                        className="w-4 h-4 rounded bg-black/10 hover:bg-black/25 flex items-center justify-center disabled:opacity-20 transition-colors"
                        title={isEnglish ? 'Move Earlier' : 'تقديم'}
                      >
                        <ChevronRight size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveActiveStage(t.id, 'down');
                        }}
                        disabled={idx === activeTemplates.length - 1}
                        className="w-4 h-4 rounded bg-black/10 hover:bg-black/25 flex items-center justify-center disabled:opacity-20 transition-colors"
                        title={isEnglish ? 'Move Later' : 'تأخير'}
                      >
                        <ChevronLeft size={10} />
                      </button>
                    </div>
                  </div>

                  {idx < activeTemplates.length - 1 && (
                    <span className="text-emerald-400 font-black text-sm shrink-0">➔</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Filter Pills, Card Density Switcher & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-amber-200/60">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-amber-200/60'
              }`}
            >
              {isEnglish ? `All (${templates.length})` : `كافة القوالب (${templates.length})`}
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('enabled')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'enabled'
                  ? 'bg-[#00875a] text-white shadow-2xs'
                  : 'bg-white/80 text-emerald-800 hover:bg-white border border-amber-200/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{isEnglish ? `Active Stages (${enabledCount})` : `المفعلة في الاستبيان (${enabledCount})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMode('disabled')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'disabled'
                  ? 'bg-slate-700 text-white shadow-2xs'
                  : 'bg-white/80 text-slate-600 hover:bg-white border border-amber-200/60'
              }`}
            >
              <span>{isEnglish ? `Inactive (${disabledCount})` : `غير المفعلة (${disabledCount})`}</span>
            </button>
          </div>

          {/* Density and Search */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Card Density Toggle for comfortable reading without zooming */}
            <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-amber-200/70 shadow-2xs">
              <button
                type="button"
                onClick={() => setCardDensity('comfortable')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  cardDensity === 'comfortable'
                    ? 'bg-amber-500 text-white shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={isEnglish ? 'Comfortable spacious cards' : 'عرض مريح وواضح للبطاقات'}
              >
                {isEnglish ? 'Spacious 🖥️' : 'عرض مريح 🖥️'}
              </button>
              <button
                type="button"
                onClick={() => setCardDensity('compact')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  cardDensity === 'compact'
                    ? 'bg-amber-500 text-white shadow-2xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={isEnglish ? 'Compact cards' : 'عرض مدمج للبطاقات'}
              >
                {isEnglish ? 'Compact 📐' : 'عرض مدمج 📐'}
              </button>
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEnglish ? 'Search questions & templates...' : '...بحث في الأسئلة والقوالب'}
              className="w-full bg-white border border-amber-300/80 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-amber-500 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {(editingTemplate || isAddingNew) && (
        <form
          onSubmit={handleSaveForm}
          className="bg-white border-2 border-amber-400 rounded-3xl p-6 shadow-xl space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Sparkles size={18} className="text-amber-500" />
              <span>
                {isAddingNew 
                  ? (isEnglish ? 'Create New Question Template' : 'إنشاء قالب سؤال تفاعلي جديد') 
                  : (isEnglish ? 'Edit Question Template' : 'تعديل قالب السؤال التفاعلي')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingTemplate(null);
                setIsAddingNew(false);
              }}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Category Tag Badge' : 'شارة وتصنيف القالب'}
              </label>
              <input
                type="text"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="✨ نظافة دورات المياه ✨"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Bottom Action Button Text' : 'نص زر التأكيد والمتابعة السفلي'}
              </label>
              <input
                type="text"
                value={formActionBtnText}
                onChange={(e) => setFormActionBtnText(e.target.value)}
                placeholder="✨ تأكيد ومتابعة"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Main Question Title' : 'عنوان السؤال الرئيسي'}
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="ما هو تقييمك لمستوى نظافة صالة الطعام والطاولات والترتيب؟"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Descriptive Subtitle' : 'الوصف التوضيحي المساعد'}
              </label>
              <input
                type="text"
                value={formSubtitle}
                onChange={(e) => setFormSubtitle(e.target.value)}
                placeholder="انقر لتأكيد مستوى نظافة الطاولات والترتيب العام"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Options Editor */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                {isEnglish ? 'Options & Choices (2x2 Grid)' : 'خيارات الإجابة (شبكة الكروت 2x2)'}
              </label>
              {formOptions.length < 4 && (
                <button
                  type="button"
                  onClick={() => {
                    const nextNum = formOptions.length + 1;
                    setFormOptions(prev => [
                      ...prev,
                      { id: `opt_${Date.now()}`, num: nextNum, emoji: '✨', text: `خيار ${nextNum}` }
                    ]);
                  }}
                  className="text-xs text-amber-600 hover:text-amber-700 font-bold cursor-pointer"
                >
                  + إضافة خيار
                </button>
              )}
            </div>

            <div className="space-y-2">
              {formOptions.map((opt, idx) => (
                <div key={opt.id || idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold flex items-center justify-center text-slate-500 shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={opt.emoji}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormOptions(prev => prev.map((o, i) => i === idx ? { ...o, emoji: val } : o));
                    }}
                    className="w-12 text-center text-lg bg-white border border-slate-300 rounded-lg py-0.5"
                    maxLength={2}
                  />
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormOptions(prev => prev.map((o, i) => i === idx ? { ...o, text: val } : o));
                    }}
                    placeholder="نص الخيار..."
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                  />
                  <input
                    type="text"
                    value={opt.subtext || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormOptions(prev => prev.map((o, i) => i === idx ? { ...o, subtext: val } : o));
                    }}
                    placeholder="توضيح فرعي (اختياري)..."
                    className="w-36 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                  />
                  {formOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setFormOptions(prev => prev.filter((_, i) => i !== idx))}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setEditingTemplate(null);
                setIsAddingNew(false);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isEnglish ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00875a] hover:bg-[#00744e] text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check size={15} />
              <span>{isEnglish ? 'Save Template ✓' : 'حفظ القالب ✓'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: مراحل رحلة العميل المفعلة (مرتبة بالأرقام #1, #2, #3...)       */}
      {/* ========================================================================= */}
      {filterMode !== 'disabled' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-emerald-500/30 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#005A2B] text-white font-black text-sm flex items-center justify-center shadow-xs">
                {filteredActive.length}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <span>{isEnglish ? 'Active Customer Journey Stages (Numbered Direct Flow)' : 'مراحل رحلة العميل المفعلة (بالتسلسل الرقمي المباشر)'}</span>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-100/90 px-2.5 py-0.5 rounded-lg border border-emerald-300 shadow-2xs">
                    {isEnglish ? 'Live Journey 🟢' : 'رحلة العميل الحية 🟢'}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isEnglish 
                    ? 'Guests experience these questions in this exact order. Drag with mouse or use the move buttons to reorder.' 
                    : 'يخوض العميل هذه المراحل بالتسلسل الرقمي المباشر التالي (1 إلى 8). يمكنك النقر على أي مرحلة لعرضها في الجوال، أو إعادة ترتيبها بسهولة.'}
                </p>
              </div>
            </div>

            {/* Layout Mode Switcher (Sequential List vs Grid) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setLayoutMode('sequential')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  layoutMode === 'sequential'
                    ? 'bg-[#005A2B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title={isEnglish ? 'Linear single-column vertical flow (1 to 8)' : 'تسلسل رأسي مباشر (1 إلى 8) - الأوضح للمتابعة والترتيب'}
              >
                <span>تسلسل رأسي مباشر (1 ➔ 8) ⬇️</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  layoutMode === 'grid'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title={isEnglish ? '2-Column Grid' : 'شبكة بطاقات (أعمدة)'}
              >
                <span>شبكة بطاقات (أعمدة) ▦</span>
              </button>
            </div>
          </div>

          {filteredActive.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <p className="text-xs text-slate-500">
                {isEnglish ? 'No active question stages found.' : 'لا توجد قوالب مفعلة حالياً في استبيان العميل. يمكنك تفعيل أي قالب من الأسفل!'}
              </p>
            </div>
          ) : layoutMode === 'sequential' ? (
            /* Sequential Vertical Flow (1 to 8 in a single column with clear step connectors) */
            <div className="space-y-4 max-w-4xl mx-auto pt-2">
              {filteredActive.map((template, idx) => {
                const stageNum = idx + 1;
                const totalStages = filteredActive.length;
                return (
                  <React.Fragment key={template.id}>
                    {renderTemplateCard(template, stageNum, totalStages)}
                    {idx < totalStages - 1 && (
                      <div className="flex items-center justify-center py-2 select-none">
                        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-black shadow-2xs">
                          <span className="text-base animate-bounce">⬇️</span>
                          <span>
                            {isEnglish 
                              ? `Next Stage in Customer Flow: #${stageNum + 1}` 
                              : `المرحلة التالية في رحلة العميل: #${stageNum + 1}`}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            /* Multi-column Grid Layout */
            <div className={`grid gap-6 ${isWideMode ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 xl:grid-cols-2'}`}>
              {filteredActive.map((template, idx) => {
                return renderTemplateCard(template, idx + 1, filteredActive.length);
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: قوالب إضافية جاهزة للإضافة والتفعيل (الغير مفعلة تلقائياً بالأسفل) */}
      {/* ========================================================================= */}
      {filterMode !== 'enabled' && (
        <div className="space-y-4 pt-6 border-t-2 border-slate-200/80">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-slate-300 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-slate-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                {filteredInactive.length}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                  <span>{isEnglish ? 'Available Additional Templates (Inactive)' : 'قوالب إضافية جاهزة للإضافة والتفعيل (+)'}</span>
                  <span className="text-xs text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {isEnglish ? 'Sit below until activated' : 'تلقائياً بالأسفل ⬇️'}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isEnglish 
                    ? 'Click (+ Add to Survey) to activate and automatically move to the top customer journey stages.' 
                    : 'انقر على (+ إضافة للاستبيان) لنقل القالب فوراً للأعلى ليصبح مرحلة جديدة في تجربة العميل!'}
                </p>
              </div>
            </div>
          </div>

          {filteredInactive.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <p className="text-xs text-slate-500">
                {isEnglish ? 'All templates are currently active in the survey!' : 'كافة القوالب مفعلة حالياً في استبيان العميل!'}
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${isWideMode ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 xl:grid-cols-2'}`}>
              {filteredInactive.map((template) => {
                return renderTemplateCard(template);
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
