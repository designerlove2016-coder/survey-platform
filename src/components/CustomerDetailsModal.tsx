import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Trophy, 
  Calendar, 
  Clock, 
  ShoppingBag, 
  Star, 
  Tag, 
  Sparkles, 
  History, 
  Flame,
  Award,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { CustomerFeedback } from '../types';

export interface CustomerAggregatedProfile {
  name: string;
  phone: string;
  email: string;
  totalVisits: number;
  isRepeat: boolean;
  mostChosenSection: string;
  mostChosenProducts: { name: string; count: number }[];
  latestVisitDate: string;
  latestScore: number;
  bestScore: number;
  totalScore: number;
  feedbacks: CustomerFeedback[];
}

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerAggregatedProfile | null;
  isEnglish?: boolean;
  currentLangCode?: string;
}

export const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  isOpen,
  onClose,
  customer,
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  if (!isOpen || !customer) return null;
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';

  return (
    <AnimatePresence>
      <div 
        dir={isRTL ? "rtl" : "ltr"} 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-3xl rounded-[36px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 bg-gradient-to-r from-emerald-800 via-[#005A2B] to-emerald-900 text-white relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-3xl shadow-inner">
                {customer.isRepeat ? '👑' : '👤'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black">{customer.name}</h3>
                  {customer.isRepeat ? (
                    <span className="bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Flame size={12} /> {isEnglish ? `Loyal Customer (${customer.totalVisits} visits)` : `عميل متكرر (${customer.totalVisits} مشاركات)`}
                    </span>
                  ) : (
                    <span className="bg-white/20 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                      {isEnglish ? 'New Participant (1st visit)' : 'مشارك جديد (أول زيارة)'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-white/80 text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <Phone size={13} className="text-emerald-300" />
                    {customer.phone || (isEnglish ? 'Unregistered' : 'غير مسجل')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="relative z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Quick KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-2xl text-center">
                <span className="text-2xl font-black text-[#005A2B]">{customer.totalVisits}</span>
                <span className="block text-xs font-bold text-emerald-800 mt-0.5">
                  {isEnglish ? 'Total Visits' : 'عدد المشاركات'}
                </span>
              </div>
              <div className="bg-amber-50/70 border border-amber-100 p-4 rounded-2xl text-center">
                <span className="text-2xl font-black text-amber-700">{customer.bestScore}</span>
                <span className="block text-xs font-bold text-amber-900 mt-0.5">
                  {isEnglish ? 'Best Score' : 'أعلى نقاط باللعبة'}
                </span>
              </div>
              <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl text-center">
                <span className="text-2xl font-black text-blue-700">{customer.totalScore}</span>
                <span className="block text-xs font-bold text-blue-900 mt-0.5">
                  {isEnglish ? 'Total Points' : 'مجموع النقاط'}
                </span>
              </div>
              <div className="bg-purple-50/70 border border-purple-100 p-4 rounded-2xl text-center">
                <span className="text-2xl font-black text-purple-700">
                  {Math.round(customer.totalScore / customer.totalVisits)}
                </span>
                <span className="block text-xs font-bold text-purple-900 mt-0.5">
                  {isEnglish ? 'Avg. Points' : 'متوسط النقاط'}
                </span>
              </div>
            </div>

            {/* Most chosen section & items */}
            <div className="bg-gray-50/80 border border-gray-100 rounded-3xl p-5 space-y-3">
              <h4 className="font-black text-sm text-gray-800 flex items-center gap-2">
                <ShoppingBag size={16} className="text-[#005A2B]" />
                <span>{isEnglish ? 'Customer Preferences & Choices:' : 'اهتمامات العميل وأكثر ما يختاره:'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs">
                  <span className="text-xs text-gray-400 block font-bold mb-1">
                    {isEnglish ? 'Most Visited Department:' : 'القسم المفضل الأكثر تكراراً:'}
                  </span>
                  <span className="text-sm font-black text-[#005A2B] bg-emerald-50 px-3 py-1 rounded-xl inline-block">
                    🏷️ {customer.mostChosenSection || (isEnglish ? 'General' : 'عام')}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs">
                  <span className="text-xs text-gray-400 block font-bold mb-1">
                    {isEnglish ? 'Top Chosen Products:' : 'المنتجات الأكثر اختياراً:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {customer.mostChosenProducts.length > 0 ? (
                      customer.mostChosenProducts.slice(0, 4).map((p, idx) => (
                        <span key={idx} className="text-xs font-bold bg-green-50 text-green-900 border border-green-100 px-2.5 py-0.5 rounded-lg">
                          {p.name} {p.count > 1 && `(${p.count})`}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">{isEnglish ? 'No products recorded' : 'لا توجد منتجات مسجلة'}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Timeline / History */}
            <div className="space-y-3">
              <h4 className="font-black text-sm text-gray-800 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <History size={16} className="text-[#E34F26]" />
                  {isEnglish 
                    ? `Complete Visit History (${customer.feedbacks.length})` 
                    : `سجل الزيارات والمشاركات الكاملة (${customer.feedbacks.length})`}
                </span>
                <span className="text-xs text-gray-400 font-normal">
                  {isEnglish ? 'Sorted newest to oldest' : 'مرتبة من الأحدث إلى الأقدم'}
                </span>
              </h4>

              <div className="space-y-3">
                {customer.feedbacks.map((fb, idx) => (
                  <div 
                    key={fb.id || idx}
                    className="p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50/70 transition-all shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#005A2B] flex items-center justify-center font-black text-xs">
                          #{customer.feedbacks.length - idx}
                        </span>
                        <span className="font-bold text-xs text-gray-700 flex items-center gap-1">
                          <Calendar size={13} className="text-gray-400" />
                          {fb.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {fb.ratingLabel}
                        </span>
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#005A2B]">
                          {fb.score || 0} {isEnglish ? 'pts' : 'نقطة'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-50 flex-wrap gap-2">
                      <div>
                        <span className="font-bold text-gray-700">{isEnglish ? 'Department: ' : 'القسم: '}</span>
                        <span>{fb.section || fb.preference || (isEnglish ? 'General' : 'عام')}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-bold text-gray-700">{isEnglish ? 'Products: ' : 'المنتجات: '}</span>
                        {fb.selectedProducts && fb.selectedProducts.length > 0 ? (
                          fb.selectedProducts.map((p, pIdx) => (
                            <span key={pIdx} className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded text-[11px] font-bold">
                              {p}
                            </span>
                          ))
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </div>

                    {fb.comment && (
                      <p className="text-xs text-gray-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60 mt-1">
                        💬 "{fb.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-bold">
              {isEnglish ? `Latest entry: ${customer.latestVisitDate}` : `آخر مشاركة مسجلة: ${customer.latestVisitDate}`}
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-xs transition-colors cursor-pointer"
            >
              {isEnglish ? 'Close' : 'إغلاق الملف'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
