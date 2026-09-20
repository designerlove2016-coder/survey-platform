import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Star } from 'lucide-react';
import { EvaluationPillarItem } from '../../../types/surveyPlatform';

interface OperationalEvaluationPillarsTabProps {
  pillars: EvaluationPillarItem[];
  onChange: (pillars: EvaluationPillarItem[]) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

export const OperationalEvaluationPillarsTab: React.FC<OperationalEvaluationPillarsTabProps> = ({
  pillars,
  onChange,
  isWideMode = false,
  isEnglish = false
}) => {
  const [editingPillar, setEditingPillar] = useState<EvaluationPillarItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [key, setKey] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');

  const handleOpenEdit = (p: EvaluationPillarItem) => {
    setEditingPillar(p);
    setIsAddingNew(false);
    setKey(p.key);
    setTitleAr(p.titleAr);
    setTitleEn(p.titleEn);
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingPillar(null);
    setKey(`pillar_${Date.now().toString().slice(-4)}`);
    setTitleAr('');
    setTitleEn('');
  };

  const handleCloseForm = () => {
    setEditingPillar(null);
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim()) return;

    if (isAddingNew) {
      const newPillar: EvaluationPillarItem = {
        id: `p_${Date.now()}`,
        key: key.trim().toLowerCase() || `p_${Date.now()}`,
        titleAr: titleAr.trim(),
        titleEn: titleEn.trim() || titleAr.trim()
      };
      onChange([...pillars, newPillar]);
    } else if (editingPillar) {
      const updated = pillars.map(p => 
        p.id === editingPillar.id
          ? {
              ...p,
              key: key.trim().toLowerCase() || p.key,
              titleAr: titleAr.trim(),
              titleEn: titleEn.trim() || titleAr.trim()
            }
          : p
      );
      onChange(updated);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (pillars.length <= 1) {
      alert(isEnglish ? 'At least one pillar must remain' : 'يجب الإبقاء على ركيزة تقييم واحدة على الأقل');
      return;
    }
    onChange(pillars.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            {isEnglish 
              ? 'Evaluation Pillars & Criteria (Step 3 in Mobile) ⭐' 
              : 'محاور وركائز التقييم (الخطوة 3 في الجوال) ⭐'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish
              ? 'The four or customized core criteria (Food, Cleanliness, Service, Hospitality) guests rate with 1 to 5 stars.'
              : '.المحاور الأربعة أو المخصصة (الطعام، النظافة، الخدمة، الاستقبال) التي يمنحها الضيف نجوماً من 1 إلى 5'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#00875a] hover:bg-[#00744e] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>{isEnglish ? '+ Add Evaluation Pillar' : '+ إضافة ركيزة تقييم'}</span>
        </button>
      </div>

      {/* Edit / Add Modal */}
      {(editingPillar || isAddingNew) && (
        <form
          onSubmit={handleSave}
          className="bg-white border-2 border-amber-400 rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span>
                {isAddingNew 
                  ? (isEnglish ? 'Add New Evaluation Pillar' : 'إضافة ركيزة تقييم جديدة') 
                  : (isEnglish ? 'Edit Evaluation Pillar' : 'تعديل ركيزة التقييم')}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCloseForm}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'System Key / Code' : 'رمز النظام (Key)'}
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="food, service, cleanliness..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-amber-500 font-mono"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? '* Pillar Title (Arabic)' : '* عنوان الركيزة (عربي)'}
              </label>
              <input
                type="text"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="جودة الطعام ونكهة الأطباق"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-amber-500 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? 'Pillar Subtitle (English)' : 'العنوان بالإنجليزية (English Subtitle)'}
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="Food Quality & Flavor"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCloseForm}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isEnglish ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00875a] hover:bg-[#00744e] text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check size={15} />
              <span>{isEnglish ? 'Save Pillar ✓' : 'حفظ الركيزة ✓'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid: Square Pillar Cards Matching Guest Experience View */}
      <div className={`grid gap-4 ${
        isWideMode 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
      }`}>
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center group"
          >
            {/* Top row: Key Badge & Action Buttons */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg">
                {pillar.key}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pillar)}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  title={isEnglish ? 'Edit' : 'تعديل'}
                >
                  <Edit2 size={12} />
                  <span>{isEnglish ? 'Edit' : 'تعديل'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(pillar.id)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                  title={isEnglish ? 'Delete' : 'حذف'}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Pillar Information & Stars Matching Guest Experience */}
            <div className="py-4 space-y-2 w-full">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-2xs group-hover:scale-105 transition-transform">
                <Star size={24} className="fill-amber-400 text-amber-500" />
              </div>

              <h4 className="text-sm font-black text-slate-900 leading-snug">
                {pillar.titleAr}
              </h4>
              <p className="text-[11px] font-medium text-slate-400">
                {pillar.titleEn}
              </p>

              {/* 5-Star Row */}
              <div className="flex items-center justify-center gap-1 pt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                الخطوة 3: معايير الجودة والخدمة 📱
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
