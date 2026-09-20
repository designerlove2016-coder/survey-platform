import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Search, 
  Crown, 
  Flame, 
  UserCheck, 
  ExternalLink,
  Gift,
  Award
} from 'lucide-react';
import { Feedback } from '../../types';

interface CustomerLeaderboardPanelProps {
  feedbacks: Feedback[];
  onOpenCustomerModal?: (feedback: Feedback) => void;
  onTriggerFullModal?: () => void;
  isEnglish?: boolean;
  currentLangCode?: string;
}

export const CustomerLeaderboardPanel: React.FC<CustomerLeaderboardPanelProps> = ({
  feedbacks,
  onOpenCustomerModal,
  onTriggerFullModal,
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [search, setSearch] = useState('');

  // Sort feedbacks by score desc
  const sorted = [...feedbacks].sort((a, b) => (b.score || 0) - (a.score || 0));

  const filtered = sorted.filter(f => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      f.name?.toLowerCase().includes(q) ||
      f.phone?.toLowerCase().includes(q) ||
      f.department?.toLowerCase().includes(q)
    );
  });

  return (
    <div id="section-leaderboard" dir={isRTL ? 'rtl' : 'ltr'} className="bg-white p-6 md:p-8 rounded-[36px] border border-gray-100 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs">
            <Trophy size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-gray-800">
                {isEnglish ? 'Customer Leaderboard & Champions' : 'لوحة صدارة المتسوقين وتكريم الأبطال'}
              </h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Crown size={12} />
                <span>{isEnglish ? 'Top Shoppers' : 'المتصدرون'}</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {isEnglish 
                ? 'Recognize top active shoppers, high scores in Panda challenge, and loyalty rewards' 
                : 'تكريم المتسوقين الأكثر تفاعلاً وأعلى درجات التحدي ومتابعة مكافآت الولاء'}
            </p>
          </div>
        </div>

        {/* Action button */}
        {onTriggerFullModal && (
          <button
            type="button"
            onClick={onTriggerFullModal}
            className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Crown size={15} />
            <span>{isEnglish ? 'Open Full Honor Board' : 'فتح منصة التكريم الكاملة 🏆'}</span>
          </button>
        )}
      </div>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sorted.slice(0, 3).map((champion, idx) => {
          const isFirst = idx === 0;
          const isSecond = idx === 1;
          const isThird = idx === 2;

          return (
            <div 
              key={champion.id}
              className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between gap-3 relative overflow-hidden ${
                isFirst 
                  ? 'border-amber-300 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/30 shadow-md ring-2 ring-amber-200/50' 
                  : isSecond
                    ? 'border-slate-300 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/30 shadow-xs'
                    : 'border-orange-300 bg-gradient-to-b from-orange-50/80 via-white to-orange-50/30 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shadow-xs ${
                  isFirst ? 'bg-amber-400 text-amber-950' : isSecond ? 'bg-slate-300 text-slate-800' : 'bg-orange-300 text-orange-950'
                }`}>
                  {isFirst ? '🥇' : isSecond ? '🥈' : '🥉'}
                </div>
                <span className="text-xs font-black text-slate-500 bg-white/90 px-2.5 py-1 rounded-full border border-slate-200">
                  {isFirst ? (isEnglish ? 'Rank #1 Champion' : 'المركز الأول 👑') : isSecond ? (isEnglish ? 'Rank #2' : 'المركز الثاني') : (isEnglish ? 'Rank #3' : 'المركز الثالث')}
                </span>
              </div>

              <div>
                <h4 className="font-black text-base text-slate-800 line-clamp-1">
                  {champion.name || (isEnglish ? 'Anonymous Shopper' : 'متسوق بنده')}
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {champion.phone || '05xxxxxxxx'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {champion.department || (isEnglish ? 'Fresh Section' : 'قسم الطازج')}
                </span>
                <span className="text-lg font-black text-[#005A2B]">
                  {champion.score || 25} {isEnglish ? 'pts' : 'نقطة'}
                </span>
              </div>

              {onOpenCustomerModal && (
                <button
                  type="button"
                  onClick={() => onOpenCustomerModal(champion)}
                  className="w-full py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <UserCheck size={13} />
                  <span>{isEnglish ? 'Profile Details' : 'ملف المتسوق'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Search & Full Rankings Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isEnglish ? 'left-3' : 'right-3'}`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isEnglish ? 'Search champions by name or mobile...' : 'بحث في قائمة الأبطال بالاسم أو الجوال...'}
              className={`w-full py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 font-medium focus:outline-hidden focus:border-emerald-500 transition-all ${
                isEnglish ? 'pl-9 pr-3' : 'pr-9 pl-3'
              }`}
            />
          </div>

          <span className="text-xs font-bold text-slate-500">
            {filtered.length} {isEnglish ? 'participations recorded' : 'مشارك مسجل'}
          </span>
        </div>

        <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-2xs">
          <table className={`w-full text-xs ${isEnglish ? 'text-left' : 'text-right'}`}>
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 text-center w-14">#</th>
                <th className="py-3 px-4">{isEnglish ? 'Customer Name' : 'اسم المتسوق'}</th>
                <th className="py-3 px-4">{isEnglish ? 'Mobile' : 'رقم الجوال'}</th>
                <th className="py-3 px-4">{isEnglish ? 'Favorite Dept' : 'القسم المفضل'}</th>
                <th className="py-3 px-4 text-center">{isEnglish ? 'Score' : 'نقاط التحدي'}</th>
                <th className="py-3 px-4 text-center">{isEnglish ? 'Rating' : 'التقييم'}</th>
                <th className="py-3 px-4 text-center">{isEnglish ? 'Action' : 'الإجراء'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.slice(0, 10).map((f, i) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-center font-black text-slate-700">
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 font-black text-slate-800">
                    {f.name || (isEnglish ? 'Shopper' : 'متسوق')}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    {f.phone || '05xxxxxxxx'}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {f.department || (isEnglish ? 'General' : 'عام')}
                  </td>
                  <td className="py-3 px-4 text-center font-black text-[#005A2B]">
                    {f.score || 0}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {f.rating === 'great' ? (isEnglish ? 'Great' : 'ممتاز') : f.rating === 'good' ? (isEnglish ? 'Good' : 'جيد') : (isEnglish ? 'Neutral' : 'مقبول')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {onOpenCustomerModal && (
                      <button
                        type="button"
                        onClick={() => onOpenCustomerModal(f)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        {isEnglish ? 'View' : 'عرض'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
