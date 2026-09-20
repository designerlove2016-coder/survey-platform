import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, Flame, Award, Filter } from 'lucide-react';
import { LeaderboardEntry, Difficulty, LanguageTranslations } from '../types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentScore?: number;
  highlightId?: string;
  translations?: LanguageTranslations;
  dir?: 'rtl' | 'ltr';
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  entries,
  highlightId,
  translations,
  dir = 'rtl',
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');

  const filteredEntries = entries
    .filter(entry => filterDifficulty === 'all' || entry.difficulty === filterDifficulty)
    .sort((a, b) => b.score - a.score);

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl shadow-xs border border-amber-300">
          🥇
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xl shadow-xs border border-slate-300">
          🥈
        </div>
      );
    }
    if (index === 2) {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-xl shadow-xs border border-amber-200">
          🥉
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center font-black text-base">
        {index + 1}
      </div>
    );
  };

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return (
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {translations?.diffEasy || 'سهل'}
          </span>
        );
      case 'medium':
        return (
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
            {translations?.diffMedium || 'متوسط'}
          </span>
        );
      case 'hard':
        return (
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold flex items-center gap-1">
            <Flame size={12} /> {translations?.diffHard || 'محترف'}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          dir={dir}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-800 to-[#005A2B] text-white flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  <Trophy className="text-yellow-300 animate-pulse" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black">
                    {translations?.leaderboardModalTitle || 'لوحة المتصدرين'}
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    {translations?.leaderboardSubtitle || 'أبطال تحدي فرقعة شعارات بنده'}
                  </p>
                </div>
              </div>

              <button
                id="close-leaderboard-btn"
                onClick={onClose}
                className="relative z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Filter Tabs */}
            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50/70">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Filter size={16} className="text-gray-400 mx-1 shrink-0" />
                {[
                  { id: 'all', label: dir === 'rtl' ? 'جميع المستويات' : 'All Levels' },
                  { id: 'easy', label: `${translations?.diffEasy || 'سهل'} 🟢` },
                  { id: 'medium', label: `${translations?.diffMedium || 'متوسط'} 🟡` },
                  { id: 'hard', label: `${translations?.diffHard || 'محترف'} 🔴` },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterDifficulty(tab.id as Difficulty | 'all')}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                      filterDifficulty === tab.id
                        ? 'bg-[#005A2B] text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-bold space-y-2">
                  <Award size={48} className="mx-auto text-gray-300" />
                  <p>{dir === 'rtl' ? 'لا توجد سجلات في هذا المستوى بعد!' : 'No records for this level yet!'}</p>
                </div>
              ) : (
                filteredEntries.map((entry, idx) => {
                  const isHighlighted = entry.id === highlightId;
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isHighlighted
                          ? 'bg-green-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                          : idx < 3
                          ? 'bg-white border-gray-200 hover:shadow-xs'
                          : 'bg-gray-50/50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getRankBadge(idx)}
                        <div className="text-2xl">{entry.avatarEmoji || '🐼'}</div>
                        <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-800 text-base">{entry.name}</span>
                            {isHighlighted && (
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-600 text-white font-black animate-pulse">
                                ⭐
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 block">{entry.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getDifficultyBadge(entry.difficulty)}
                        <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                          <div className="text-xl sm:text-2xl font-black text-[#005A2B] font-mono leading-none">
                            {entry.score}
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold">
                            {translations?.gameScore || 'نقطة'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold">
              <span>{filteredEntries.length} {dir === 'rtl' ? 'لاعب' : 'players'}</span>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black transition-colors cursor-pointer"
              >
                {translations?.closeBtn || 'إغلاق'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
