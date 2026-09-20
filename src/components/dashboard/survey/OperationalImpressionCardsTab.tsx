import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Star } from 'lucide-react';
import { ImpressionCardItem } from '../../../types/surveyPlatform';

interface OperationalImpressionCardsTabProps {
  cards: ImpressionCardItem[];
  onChange: (cards: ImpressionCardItem[]) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

const EMOJI_LIST = ['🤩', '😍', '😊', '😋', '😐', '😕', '😔', '😡', '🔥', '👑', '🥳', '🤤', '⚡', '🪐', '❤️', '🥺', '💔'];

export const OperationalImpressionCardsTab: React.FC<OperationalImpressionCardsTabProps> = ({
  cards,
  onChange,
  isWideMode = false,
  isEnglish = false
}) => {
  const [editingCard, setEditingCard] = useState<ImpressionCardItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state
  const [selectedEmoji, setSelectedEmoji] = useState('🤩');
  const [selectedStars, setSelectedStars] = useState(5);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descAr, setDescAr] = useState('');

  const handleOpenEdit = (card: ImpressionCardItem) => {
    setEditingCard(card);
    setIsAddingNew(false);
    setSelectedEmoji(card.emoji);
    setSelectedStars(card.stars);
    setTitleAr(card.titleAr);
    setTitleEn(card.titleEn);
    setDescAr(card.descAr);
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingCard(null);
    setSelectedEmoji('🤩');
    setSelectedStars(5);
    setTitleAr('');
    setTitleEn('');
    setDescAr('');
  };

  const handleCloseForm = () => {
    setEditingCard(null);
    setIsAddingNew(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim()) return;

    if (isAddingNew) {
      const newCard: ImpressionCardItem = {
        id: `card_${Date.now()}`,
        num: cards.length + 1,
        emoji: selectedEmoji,
        stars: selectedStars,
        titleAr: titleAr.trim(),
        titleEn: titleEn.trim() || titleAr.trim(),
        descAr: descAr.trim()
      };
      onChange([...cards, newCard]);
    } else if (editingCard) {
      const updated = cards.map(c => 
        c.id === editingCard.id
          ? {
              ...c,
              emoji: selectedEmoji,
              stars: selectedStars,
              titleAr: titleAr.trim(),
              titleEn: titleEn.trim() || titleAr.trim(),
              descAr: descAr.trim()
            }
          : c
      );
      onChange(updated);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (cards.length <= 1) {
      alert(isEnglish ? 'At least one impression card is required' : 'يجب الإبقاء على بطاقة انطباع واحدة على الأقل');
      return;
    }
    const updated = cards.filter(c => c.id !== id).map((c, idx) => ({ ...c, num: idx + 1 }));
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            {isEnglish 
              ? 'Overall Impression Rating Cards (Appears to guests in Step 1)' 
              : 'بطاقات تقييم الانطباع العام (تظهر للضيف في الخطوة الأولى)'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish
              ? 'Customize emoji, titles, descriptions, and star levels or add new cards.'
              : '.يمكنك تعديل أي بطاقة (الإيموجي، العناوين، الوصف، والنجوم) أو إضافة بطاقة جديدة أو مسح ما لا تحتاجه'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#00875a] hover:bg-[#00744e] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>{isEnglish ? '+ Add New Card' : '+ إضافة بطاقة جديدة'}</span>
        </button>
      </div>

      {/* Dark Edit / Add Form (Screenshot 10) */}
      {(editingCard || isAddingNew) && (
        <form 
          onSubmit={handleSave}
          className="bg-[#0c1527] border border-amber-500/40 rounded-2xl p-5 sm:p-6 text-white shadow-xl space-y-5 animate-in fade-in duration-200"
        >
          {/* Header of modal */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
              <Edit2 size={16} />
              <span>
                {isAddingNew 
                  ? (isEnglish ? 'Add New Impression Card' : 'إضافة بطاقة انطباع جديدة')
                  : (isEnglish ? 'Edit Impression Card' : 'تعديل بطاقة الانطباع')}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCloseForm}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Top row: Emoji Picker + Star Level Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Emojis list (left in LTR, right in RTL) */}
            <div className="lg:col-span-7 space-y-2">
              <label className="text-[11px] font-bold text-slate-300 block">
                {isEnglish ? 'Expressive Emoji' : 'الإيموجي التعبيري'}
              </label>
              <div className="flex items-center gap-1.5 flex-wrap bg-[#060c18] p-2.5 rounded-xl border border-slate-800">
                {EMOJI_LIST.map((emoji) => {
                  const isSelected = selectedEmoji === emoji;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/25 border-2 border-amber-500 scale-110 shadow-sm' 
                          : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                      }`}
                    >
                      {emoji}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Star selector (⭐ 5 to ⭐ 1) */}
            <div className="lg:col-span-5 space-y-2">
              <label className="text-[11px] font-bold text-slate-300 block">
                {isEnglish ? 'Equivalent Star Rating' : 'التقييم المقابل بالنجوم'}
              </label>
              <div className="flex items-center gap-1.5 justify-between bg-[#060c18] p-2 rounded-xl border border-slate-800">
                {[5, 4, 3, 2, 1].map((starNum) => {
                  const isSelected = selectedStars === starNum;
                  return (
                    <button
                      key={starNum}
                      type="button"
                      onClick={() => setSelectedStars(starNum)}
                      className={`flex-1 py-2 px-1 text-xs font-black rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500 text-slate-950 shadow-md font-black scale-102' 
                          : 'bg-[#131f37] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                      }`}
                    >
                      <Star size={12} className={isSelected ? 'fill-slate-950' : 'fill-amber-400 text-amber-400'} />
                      <span>{starNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form fields: Arabic Title & English Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">
                {isEnglish ? '* Title (Arabic)' : '* العنوان (عربي)'}
              </label>
              <input
                type="text"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="Unforgettable! ✨"
                className="w-full bg-[#060c18] border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">
                {isEnglish ? 'Title (English)' : 'العنوان (إنجليزي)'}
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Unforgettable! ✨"
                className="w-full bg-[#060c18] border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 block">
              {isEnglish ? 'Description (Arabic)' : 'الوصف التوضيحي (عربي)'}
            </label>
            <input
              type="text"
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              placeholder="خدمة خيالية ونكهات تفوق التوقعات"
              className="w-full bg-[#060c18] border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
            />
          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={handleCloseForm}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isEnglish ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00875a] hover:bg-[#00744e] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Check size={15} />
              <span>{isEnglish ? 'Save Changes ✓' : 'حفظ التعديل ✓'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Cards Grid: Square Cards Matching Guest Experience View */}
      <div className={`grid gap-5 ${
        isWideMode 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
      }`}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all relative flex flex-col justify-between items-center text-center group"
          >
            {/* Top row in card: number & stars + action buttons */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center font-mono">
                #{card.num}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(card)}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  title={isEnglish ? 'Edit Card' : 'تعديل البطاقة'}
                >
                  <Edit2 size={12} />
                  <span>{isEnglish ? 'Edit' : 'تعديل'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(card.id)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                  title={isEnglish ? 'Delete Card' : 'حذف البطاقة'}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Square Guest Preview Content */}
            <div className="py-4 flex flex-col items-center gap-2 w-full">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-200/80 flex items-center justify-center text-3xl shadow-2xs group-hover:scale-105 transition-transform">
                {card.emoji}
              </div>

              <div className="space-y-1 w-full px-2">
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {card.titleAr}
                </h4>
                <p className="text-[11px] font-medium text-slate-400">
                  {card.titleEn}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {card.descAr}
                </p>
              </div>

              {/* Star Rating Row */}
              <div className="flex items-center justify-center gap-1 mt-1 bg-amber-50/80 px-3 py-1 rounded-full border border-amber-200/60">
                {[...Array(card.stars)].map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-500" />
                ))}
                <span className="text-[10px] font-black text-amber-800 mr-1">
                  ({card.stars} نجوم)
                </span>
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-center">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>تظهر في الخطوة 1 لاستبيان الضيف 📱</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
