import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Gift, Sparkles } from 'lucide-react';
import { LoyaltyPrizeItem } from '../../../types/surveyPlatform';

interface OperationalLoyaltyPrizesTabProps {
  prizes: LoyaltyPrizeItem[];
  onChange: (prizes: LoyaltyPrizeItem[]) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

export const OperationalLoyaltyPrizesTab: React.FC<OperationalLoyaltyPrizesTabProps> = ({
  prizes,
  onChange,
  isWideMode = false,
  isEnglish = false
}) => {
  const [editingPrize, setEditingPrize] = useState<LoyaltyPrizeItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [pointsBadge, setPointsBadge] = useState('نقطة ولاء 50+');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');

  const handleOpenEdit = (p: LoyaltyPrizeItem) => {
    setEditingPrize(p);
    setIsAddingNew(false);
    setPointsBadge(p.pointsBadge);
    setTitleAr(p.titleAr);
    setTitleEn(p.titleEn);
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingPrize(null);
    setPointsBadge('نقطة ولاء 60+');
    setTitleAr('');
    setTitleEn('');
  };

  const handleCloseForm = () => {
    setEditingPrize(null);
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim()) return;

    if (isAddingNew) {
      const newPrize: LoyaltyPrizeItem = {
        id: `pz_${Date.now()}`,
        pointsBadge: pointsBadge.trim() || 'نقطة ولاء 50+',
        titleAr: titleAr.trim(),
        titleEn: titleEn.trim() || titleAr.trim()
      };
      onChange([...prizes, newPrize]);
    } else if (editingPrize) {
      const updated = prizes.map(p => 
        p.id === editingPrize.id
          ? {
              ...p,
              pointsBadge: pointsBadge.trim() || p.pointsBadge,
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
    if (prizes.length <= 1) {
      alert(isEnglish ? 'At least one loyalty prize must remain' : 'يجب الإبقاء على جائزة واحدة على الأقل');
      return;
    }
    onChange(prizes.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            {isEnglish 
              ? 'Gift Box & Instant Loyalty Rewards (Survey Incentive) 🎁' 
              : 'صندوق الهدايا وجوائز الولاء الفورية (حافز التقييم) 🎁'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish
              ? 'Rewards that appear in the surprise gift box for guests upon completing the survey.'
              : '.الجوائز التي تظهر في عجلة الحظ أو الصندوق المفاجئ للضيف عند إتمام الاستبيان'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#00875a] hover:bg-[#00744e] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>{isEnglish ? '+ Add New Prize' : '+ إضافة جائزة جديدة'}</span>
        </button>
      </div>

      {/* Edit / Add Modal */}
      {(editingPrize || isAddingNew) && (
        <form
          onSubmit={handleSave}
          className="bg-white border-2 border-purple-400 rounded-3xl p-6 shadow-xl space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Gift size={16} className="text-purple-600" />
              <span>
                {isAddingNew 
                  ? (isEnglish ? 'Add Loyalty Prize' : 'إضافة جائزة ولاء جديدة') 
                  : (isEnglish ? 'Edit Loyalty Prize' : 'تعديل جائزة الولاء')}
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
                {isEnglish ? 'Loyalty Points Badge' : 'شارة نقاط الولاء'}
              </label>
              <input
                type="text"
                value={pointsBadge}
                onChange={(e) => setPointsBadge(e.target.value)}
                placeholder="نقطة ولاء 75+"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-purple-500 font-bold"
                required
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? '* Reward Title (Arabic)' : '* عنوان الجائزة أو الخصم (عربي)'}
              </label>
              <input
                type="text"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="حلى تيراميسو فاخر مجاناً في زيارتك القادمة 🍰"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-purple-500 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? 'Reward Title (English)' : 'عنوان الجائزة (إنجليزي)'}
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="Complimentary Tiramisu on your next visit 🍰"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-purple-500"
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
              <span>{isEnglish ? 'Save Prize ✓' : 'حفظ الجائزة ✓'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid: Square Prize Cards Matching Guest Experience View */}
      <div className={`grid gap-4 ${
        isWideMode 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
      }`}>
        {prizes.map((prize) => (
          <div
            key={prize.id}
            className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center group"
          >
            {/* Top row: Points Badge & Actions */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="bg-purple-100 text-purple-900 border border-purple-200 text-[10px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Sparkles size={10} />
                <span>{prize.pointsBadge}</span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(prize)}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  title={isEnglish ? 'Edit' : 'تعديل'}
                >
                  <Edit2 size={12} />
                  <span>{isEnglish ? 'Edit' : 'تعديل'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(prize.id)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                  title={isEnglish ? 'Delete' : 'حذف'}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Prize Square Content */}
            <div className="py-4 space-y-2 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-2xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Gift size={28} />
              </div>

              <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 px-1">
                {prize.titleAr}
              </h4>
              <p className="text-[11px] font-medium text-slate-400 truncate w-full px-1">
                {prize.titleEn}
              </p>

              {/* Promo code badge preview */}
              <div className="mt-1 px-3 py-1 rounded-xl bg-slate-900 text-amber-300 text-xs font-mono font-bold">
                كود: {prize.promoCode || 'GUEST-VIP'}
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                الخطوة 5: هدية الشكر والولاء 🎁
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
