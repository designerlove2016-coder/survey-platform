import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Tag } from 'lucide-react';
import { QuickTagItem } from '../../../types/surveyPlatform';

interface OperationalQuickTagsTabProps {
  tags: QuickTagItem[];
  onChange: (tags: QuickTagItem[]) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

export const OperationalQuickTagsTab: React.FC<OperationalQuickTagsTabProps> = ({
  tags,
  onChange,
  isWideMode = false,
  isEnglish = false
}) => {
  const [editingTag, setEditingTag] = useState<QuickTagItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [emoji, setEmoji] = useState('😋');
  const [textAr, setTextAr] = useState('');
  const [textEn, setTextEn] = useState('');

  const handleOpenEdit = (t: QuickTagItem) => {
    setEditingTag(t);
    setIsAddingNew(false);
    setEmoji(t.emoji);
    setTextAr(t.textAr);
    setTextEn(t.textEn);
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingTag(null);
    setEmoji('✨');
    setTextAr('');
    setTextEn('');
  };

  const handleCloseForm = () => {
    setEditingTag(null);
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textAr.trim()) return;

    if (isAddingNew) {
      const newTag: QuickTagItem = {
        id: `t_${Date.now()}`,
        emoji: emoji.trim() || '✨',
        textAr: textAr.trim(),
        textEn: textEn.trim() || textAr.trim()
      };
      onChange([...tags, newTag]);
    } else if (editingTag) {
      const updated = tags.map(t => 
        t.id === editingTag.id
          ? {
              ...t,
              emoji: emoji.trim() || t.emoji,
              textAr: textAr.trim(),
              textEn: textEn.trim() || textAr.trim()
            }
          : t
      );
      onChange(updated);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (tags.length <= 1) {
      alert(isEnglish ? 'At least one tag must remain' : 'يجب الإبقاء على وسم واحد على الأقل');
      return;
    }
    onChange(tags.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            {isEnglish 
              ? 'Quick Feedback Tags (Frictionless for Guests) 🏷️' 
              : 'الوسوم السريعة للإشادة والملاحظات (تسهل على العميل) 🏷️'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish
              ? 'One-tap praise and feedback pills for guests (e.g., Hot dishes, Super fast service).'
              : '.كلمات ووسوم بنقرة واحدة لاختيار ما أعجب الضيف (مثل: الأطباق ساخنة، الخدمة سريعة)'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#00875a] hover:bg-[#00744e] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>{isEnglish ? '+ Add New Tag' : '+ إضافة وسم جديد'}</span>
        </button>
      </div>

      {/* Edit / Add Modal */}
      {(editingTag || isAddingNew) && (
        <form
          onSubmit={handleSave}
          className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Tag size={16} className="text-emerald-600" />
              <span>
                {isAddingNew 
                  ? (isEnglish ? 'Add Quick Feedback Tag' : 'إضافة وسم تقييم سريع جديد') 
                  : (isEnglish ? 'Edit Feedback Tag' : 'تعديل الوسم السريع')}
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

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Emoji' : 'الإيموجي'}
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="😋"
                className="w-full text-center bg-slate-50 border border-slate-200 rounded-xl py-2 text-lg outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-9 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? '* Tag Text (Arabic)' : '* نص الوسم (عربي)'}
              </label>
              <input
                type="text"
                value={textAr}
                onChange={(e) => setTextAr(e.target.value)}
                placeholder="الأطباق ساخنة ولذيذة"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? 'Tag Text (English)' : 'نص الوسم (إنجليزي)'}
            </label>
            <input
              type="text"
              value={textEn}
              onChange={(e) => setTextEn(e.target.value)}
              placeholder="Delicious & Hot Dishes"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
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
              <span>{isEnglish ? 'Save Tag ✓' : 'حفظ الوسم ✓'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid: Square Tag Cards Matching Guest Experience View */}
      <div className={`grid gap-4 ${
        isWideMode 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
      }`}>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center group"
          >
            {/* Top row: Category tag & Action Buttons */}
            <div className="w-full flex items-center justify-between pb-2.5 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                وسم سريع
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(tag)}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  title={isEnglish ? 'Edit' : 'تعديل'}
                >
                  <Edit2 size={12} />
                  <span>{isEnglish ? 'Edit' : 'تعديل'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(tag.id)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                  title={isEnglish ? 'Delete' : 'حذف'}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Tag Square Content */}
            <div className="py-4 space-y-2 w-full flex flex-col items-center">
              <span className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-200/80 flex items-center justify-center text-3xl shadow-2xs group-hover:scale-110 transition-transform">
                {tag.emoji}
              </span>

              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2 px-1">
                {tag.textAr}
              </h4>
              <p className="text-[11px] font-medium text-slate-400 truncate w-full px-1">
                {tag.textEn}
              </p>

              {/* Guest Chip Simulation Preview */}
              <div className="mt-1 px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs">
                <span>{tag.emoji}</span>
                <span className="truncate max-w-[130px]">{tag.textAr}</span>
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="w-full pt-2.5 border-t border-slate-100 flex items-center justify-center">
              <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                الخطوة 4: الوسوم السريعة 📱
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
