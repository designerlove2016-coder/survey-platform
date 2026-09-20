import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Star, 
  CheckSquare, 
  CircleDot, 
  MessageSquare, 
  Award, 
  Sparkles, 
  Check, 
  Eye, 
  EyeOff, 
  AlertCircle,
  HelpCircle,
  GripVertical
} from 'lucide-react';
import { 
  SurveyQuestionModel, 
  SurveyQuestionType, 
  SurveyCategory, 
  SurveyChoiceOption 
} from '../../../types/surveyPlatform';

interface InteractiveSurveyBuilderProps {
  questions: SurveyQuestionModel[];
  onChange: (updatedQuestions: SurveyQuestionModel[]) => void;
  isEnglish?: boolean;
}

export const InteractiveSurveyBuilder: React.FC<InteractiveSurveyBuilderProps> = ({
  questions,
  onChange,
  isEnglish = false
}) => {
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New question draft state
  const [newType, setNewType] = useState<SurveyQuestionType>('stars_5');
  const [newCategory, setNewCategory] = useState<SurveyCategory>('food_quality');
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newSubtitleAr, setNewSubtitleAr] = useState('');
  const [newIsRequired, setNewIsRequired] = useState(true);
  const [newOptionsText, setNewOptionsText] = useState('خيار أول, خيار ثاني, خيار ثالث');

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= questions.length) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[targetIndex];
    newQuestions[targetIndex] = temp;
    onChange(newQuestions);
  };

  const toggleEnabled = (id: string) => {
    onChange(
      questions.map(q => q.id === id ? { ...q, isEnabled: !q.isEnabled } : q)
    );
  };

  const toggleRequired = (id: string) => {
    onChange(
      questions.map(q => q.id === id ? { ...q, isRequired: !q.isRequired } : q)
    );
  };

  const deleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      alert(isEnglish ? 'You must have at least one question in the survey.' : 'يجب أن يحتوي الاستبيان على سؤال واحد على الأقل.');
      return;
    }
    onChange(questions.filter(q => q.id !== id));
  };

  const handleUpdateQuestion = (id: string, updates: Partial<SurveyQuestionModel>) => {
    onChange(
      questions.map(q => q.id === id ? { ...q, ...updates } : q)
    );
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleAr.trim()) return;

    let options: SurveyChoiceOption[] | undefined;
    if (newType === 'single_choice' || newType === 'multi_choice') {
      const parts = newOptionsText.split(/,|\n/).map(s => s.trim()).filter(Boolean);
      options = parts.map((label, idx) => ({
        id: `opt_${Date.now()}_${idx}`,
        labelAr: label,
        labelEn: `Option ${idx + 1}`
      }));
    }

    const newQuestion: SurveyQuestionModel = {
      id: `q_${Date.now()}`,
      type: newType,
      category: newCategory,
      titleAr: newTitleAr.trim(),
      titleEn: newTitleEn.trim() || newTitleAr.trim(),
      subtitleAr: newSubtitleAr.trim() || undefined,
      isRequired: newIsRequired,
      isEnabled: true,
      options
    };

    onChange([...questions, newQuestion]);
    setShowAddModal(false);
    // Reset form
    setNewTitleAr('');
    setNewTitleEn('');
    setNewSubtitleAr('');
    setNewOptionsText('خيار أول, خيار ثاني, خيار ثالث');
  };

  const getTypeBadge = (type: SurveyQuestionType) => {
    switch (type) {
      case 'stars_5':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Star size={13} className="fill-amber-400 text-amber-500" />
            <span>{isEnglish ? 'Star Rating (1-5)' : 'تقييم النجوم (1-5)'}</span>
          </span>
        );
      case 'nps_10':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Award size={13} className="text-indigo-600" />
            <span>{isEnglish ? 'NPS Score (0-10)' : 'مؤشر الترويج (NPS 0-10)'}</span>
          </span>
        );
      case 'csat_emojis':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span>😊</span>
            <span>{isEnglish ? 'CSAT Emojis' : 'مؤشر المشاعر بالوجوه'}</span>
          </span>
        );
      case 'single_choice':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
            <CircleDot size={13} className="text-sky-600" />
            <span>{isEnglish ? 'Single Choice' : 'اختيار مفرد (Single)'}</span>
          </span>
        );
      case 'multi_choice':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
            <CheckSquare size={13} className="text-purple-600" />
            <span>{isEnglish ? 'Multi Choice' : 'اختيار من متعدد (Multi)'}</span>
          </span>
        );
      case 'text_feedback':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <MessageSquare size={13} className="text-slate-600" />
            <span>{isEnglish ? 'Open Feedback' : 'ملاحظات نصية مفتوحة'}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#005A2B] animate-pulse" />
            <h3 className="text-base font-black text-slate-800">
              {isEnglish ? 'Interactive Survey Questions Builder' : 'مصمم أسئلة استبيان رضا الضيوف'}
            </h3>
            <span className="bg-emerald-50 text-[#005A2B] text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
              {questions.length} {isEnglish ? 'Questions' : 'أسئلة'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish 
              ? 'Customize questions, ordering, mandatory flags and question types to fit your restaurant or cafe.' 
              : 'خصص الأسئلة ورتبها بمرونة، وحدد الإلزامية ونوع التقييم بما يلائم طابع مطعمك أو مقهاك.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#005A2B] hover:bg-[#004722] text-white rounded-xl font-black text-xs shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>{isEnglish ? 'Add New Question' : 'إضافة سؤال جديد'}</span>
        </button>
      </div>

      {/* Questions list */}
      <div className="space-y-3">
        {questions.map((q, index) => {
          const isEditing = editingQuestionId === q.id;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                q.isEnabled 
                  ? 'border-slate-200/90 shadow-xs hover:border-emerald-300' 
                  : 'border-slate-200/50 bg-slate-50/70 opacity-60'
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Drag handle & Order & Title */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-1 pt-1 shrink-0">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 font-mono text-xs font-bold flex items-center justify-center text-slate-700">
                      {index + 1}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {getTypeBadge(q.type)}
                      {q.isRequired ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                          {isEnglish ? 'Mandatory *' : 'إلزامي *'}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {isEnglish ? 'Optional' : 'اختياري'}
                        </span>
                      )}
                      {!q.isEnabled && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-200 text-gray-700">
                          {isEnglish ? 'Disabled' : 'معطل'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-slate-800 leading-snug">
                      {q.titleAr}
                    </h4>
                    {q.subtitleAr && (
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {q.subtitleAr}
                      </p>
                    )}

                    {/* Preview of options if choice type */}
                    {q.options && q.options.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {q.options.map(opt => (
                          <span 
                            key={opt.id}
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 px-2 py-0.5 rounded-lg text-slate-700"
                          >
                            {opt.icon && <span>{opt.icon}</span>}
                            <span>{opt.labelAr}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & controls */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 justify-end">
                  {/* Move Up */}
                  <button
                    disabled={index === 0}
                    onClick={() => moveQuestion(index, 'up')}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title={isEnglish ? 'Move Up' : 'تحريك لأعلى'}
                  >
                    <ArrowUp size={15} />
                  </button>

                  {/* Move Down */}
                  <button
                    disabled={index === questions.length - 1}
                    onClick={() => moveQuestion(index, 'down')}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title={isEnglish ? 'Move Down' : 'تحريك لأسفل'}
                  >
                    <ArrowDown size={15} />
                  </button>

                  {/* Toggle Required */}
                  <button
                    onClick={() => toggleRequired(q.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      q.isRequired 
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {q.isRequired ? (isEnglish ? 'Required' : 'إلزامي') : (isEnglish ? 'Optional' : 'اختياري')}
                  </button>

                  {/* Toggle Enabled */}
                  <button
                    onClick={() => toggleEnabled(q.id)}
                    className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                      q.isEnabled 
                        ? 'bg-emerald-50 text-[#005A2B] hover:bg-emerald-100' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                    title={q.isEnabled ? (isEnglish ? 'Disable' : 'تعطيل') : (isEnglish ? 'Enable' : 'تفعيل')}
                  >
                    {q.isEnabled ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  {/* Edit toggle */}
                  <button
                    onClick={() => setEditingQuestionId(isEditing ? null : q.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                      isEditing 
                        ? 'bg-[#005A2B] text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isEditing ? (isEnglish ? 'Close' : 'إغلاق') : (isEnglish ? 'Edit' : 'تعديل')}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    title={isEnglish ? 'Delete Question' : 'حذف السؤال'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Inline edit panel */}
              {isEditing && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isEnglish ? 'Question Title (Arabic)' : 'نص السؤال (بالعربية)'}
                      </label>
                      <input
                        type="text"
                        value={q.titleAr}
                        onChange={(e) => handleUpdateQuestion(q.id, { titleAr: e.target.value })}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isEnglish ? 'Subline / Guidance (Arabic)' : 'التوضيح المساعد (بالعربية)'}
                      </label>
                      <input
                        type="text"
                        value={q.subtitleAr || ''}
                        onChange={(e) => handleUpdateQuestion(q.id, { subtitleAr: e.target.value })}
                        placeholder={isEnglish ? 'e.g. Fresh, hot and delicious' : 'مثال: طازجة، ساخنة، وبنفس الطعم المتوقع'}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                      />
                    </div>
                  </div>

                  {/* If single or multi choice, edit options */}
                  {(q.type === 'single_choice' || q.type === 'multi_choice') && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isEnglish ? 'Choice Options (comma separated)' : 'خيارات الإجابة (مفصولة بفواصل)'}
                      </label>
                      <input
                        type="text"
                        value={q.options?.map(o => o.labelAr).join(', ') || ''}
                        onChange={(e) => {
                          const parts = e.target.value.split(/,/).map(s => s.trim()).filter(Boolean);
                          const newOpts: SurveyChoiceOption[] = parts.map((lbl, i) => ({
                            id: `opt_${i}`,
                            labelAr: lbl,
                            labelEn: `Option ${i + 1}`
                          }));
                          handleUpdateQuestion(q.id, { options: newOpts });
                        }}
                        className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                      />
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setEditingQuestionId(null)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#005A2B] text-white rounded-xl text-xs font-black shadow-xs cursor-pointer"
                    >
                      <Check size={14} />
                      <span>{isEnglish ? 'Done Editing' : 'اعتماد التعديل'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add question modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#005A2B] flex items-center justify-center font-bold">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800">
                    {isEnglish ? 'Add New Survey Question' : 'إضافة سؤال تقييم جديد'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {isEnglish ? 'Select question type and customize title' : 'اختر نوع السؤال وصيغته بدقة'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 font-black text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestionSubmit} className="space-y-4 pt-4">
              {/* Question Type Selection */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  {isEnglish ? 'Question Type' : 'نوع السؤال'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'stars_5', label: 'تقييم النجوم (1-5 ⭐)', icon: <Star size={14} /> },
                    { type: 'nps_10', label: 'مؤشر NPS (0-10 🏆)', icon: <Award size={14} /> },
                    { type: 'csat_emojis', label: 'مؤشر الرضا (وجوه 😊)', icon: <span>😊</span> },
                    { type: 'single_choice', label: 'اختيار مفرد 🔘', icon: <CircleDot size={14} /> },
                    { type: 'multi_choice', label: 'اختيار متعدد ☑️', icon: <CheckSquare size={14} /> },
                    { type: 'text_feedback', label: 'ملاحظات نصية 💬', icon: <MessageSquare size={14} /> }
                  ].map(item => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setNewType(item.type as SurveyQuestionType)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        newType === item.type
                          ? 'border-[#005A2B] bg-emerald-50 text-[#005A2B] shadow-2xs font-black'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Arabic */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  {isEnglish ? 'Question Title (Arabic) *' : 'نص السؤال (بالعربية) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: كيف تقيم سرعة تجاوب طاقم الخدمة معك اليوم؟"
                  value={newTitleAr}
                  onChange={(e) => setNewTitleAr(e.target.value)}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  {isEnglish ? 'Helper Subtitle (Optional)' : 'توضيح مساعد تحت السؤال (اختياري)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: ابتسامة الطاقم، الدقة، والترحيب بالدخول"
                  value={newSubtitleAr}
                  onChange={(e) => setNewSubtitleAr(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                />
              </div>

              {/* Options if choice */}
              {(newType === 'single_choice' || newType === 'multi_choice') && (
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    {isEnglish ? 'Choice Options (comma separated)' : 'خيارات الإجابة (مفصولة بفواصل)'}
                  </label>
                  <textarea
                    rows={2}
                    value={newOptionsText}
                    onChange={(e) => setNewOptionsText(e.target.value)}
                    placeholder="فطور, غداء عمل, قهوة وحلى, عشاء"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden"
                  />
                </div>
              )}

              {/* Mandatory flag */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-600" />
                  <span className="text-xs font-bold text-slate-700">
                    {isEnglish ? 'Make this question mandatory' : 'جعل هذا السؤال إلزامياً لإتمام التقييم'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={newIsRequired}
                  onChange={(e) => setNewIsRequired(e.target.checked)}
                  className="w-4 h-4 text-[#005A2B] rounded-sm focus:ring-[#005A2B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  {isEnglish ? 'Cancel' : 'إلغاء'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#005A2B] hover:bg-[#004722] text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer"
                >
                  {isEnglish ? 'Add to Survey' : 'إضافة إلى الاستبيان'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
