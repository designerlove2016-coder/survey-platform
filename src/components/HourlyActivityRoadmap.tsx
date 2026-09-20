import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Flame, 
  TrendingUp, 
  Sun, 
  Sunset, 
  Moon, 
  Sparkles, 
  Filter, 
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { CustomerFeedback } from '../types';

interface HourlyActivityRoadmapProps {
  feedbacks: CustomerFeedback[];
  selectedHour: number | null;
  onSelectHour: (hour: number | null) => void;
  isEnglish?: boolean;
}

export const HourlyActivityRoadmap: React.FC<HourlyActivityRoadmapProps> = ({
  feedbacks,
  selectedHour,
  onSelectHour,
  isEnglish = false,
}) => {
  // Extract hours from feedbacks
  // Helper to extract hour (0-23) from string timestamp or createdAt
  const hourlyData = useMemo(() => {
    const counts = new Array(24).fill(0);
    const hourFeedbacks: Record<number, CustomerFeedback[]> = {};
    for (let i = 0; i < 24; i++) {
      hourFeedbacks[i] = [];
    }

    feedbacks.forEach(f => {
      let hour: number | null = null;

      if (f.createdAt) {
        hour = new Date(f.createdAt).getHours();
      } else if (f.timestamp) {
        // Try extracting from timestamp like "2026-09-05 11:42" or "11:42:00" or ISO
        const timeMatch = f.timestamp.match(/(\d{1,2}):(\d{2})/);
        if (timeMatch) {
          let h = parseInt(timeMatch[1], 10);
          // Check for PM/AM in Arabic or English
          const isPM = f.timestamp.includes('م') || f.timestamp.toLowerCase().includes('pm');
          const isAM = f.timestamp.includes('ص') || f.timestamp.toLowerCase().includes('am');
          if (isPM && h < 12) h += 12;
          if (isAM && h === 12) h = 0;
          hour = h >= 0 && h < 24 ? h : null;
        } else {
          const parsed = Date.parse(f.timestamp);
          if (!isNaN(parsed)) {
            hour = new Date(parsed).getHours();
          }
        }
      }

      // Default fallback if not parseable
      if (hour === null) {
        hour = 17; // default evening shopping hour
      }

      counts[hour] += 1;
      hourFeedbacks[hour].push(f);
    });

    const maxCount = Math.max(...counts, 1);
    
    // Find peak hour
    let peakHour = 0;
    let peakCount = 0;
    counts.forEach((c, h) => {
      if (c > peakCount) {
        peakCount = c;
        peakHour = h;
      }
    });

    // Time-of-day periods
    const morningCount = counts.slice(6, 12).reduce((a, b) => a + b, 0); // 6 AM - 12 PM
    const afternoonCount = counts.slice(12, 17).reduce((a, b) => a + b, 0); // 12 PM - 5 PM
    const eveningCount = counts.slice(17, 23).reduce((a, b) => a + b, 0); // 5 PM - 11 PM
    const nightCount = (counts[23] || 0) + counts.slice(0, 6).reduce((a, b) => a + b, 0); // 11 PM - 6 AM

    return {
      counts,
      hourFeedbacks,
      maxCount,
      peakHour,
      peakCount,
      morningCount,
      afternoonCount,
      eveningCount,
      nightCount,
    };
  }, [feedbacks]);

  // Format hour for display: e.g. 19 -> 7:00 م or 7 PM
  const formatHourLabel = (h: number) => {
    if (isEnglish) {
      if (h === 0) return '12 AM';
      if (h < 12) return `${h} AM`;
      if (h === 12) return '12 PM';
      return `${h - 12} PM`;
    }
    if (h === 0) return '12 ص';
    if (h < 12) return `${h} ص`;
    if (h === 12) return '12 م';
    return `${h - 12} م`;
  };

  const formatHourRange = (h: number) => {
    const next = (h + 1) % 24;
    return `${formatHourLabel(h)} - ${formatHourLabel(next)}`;
  };

  const totalParticipations = feedbacks.length;
  const peakPercentage = totalParticipations > 0 
    ? Math.round((hourlyData.peakCount / totalParticipations) * 100) 
    : 0;

  return (
    <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100/70 p-3 rounded-2xl text-amber-700">
            <Clock size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-black text-gray-800">
                {isEnglish ? 'Hourly Activity Roadmap' : 'خريطة رود ماب أوقات المشاركة بالساعات (Hourly Roadmap)'}
              </h3>
              <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                {isEnglish ? 'Peak Activity' : 'ذروة النشاط'}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {isEnglish 
                ? 'Detailed analysis of customer engagement hours and daily peak activity'
                : 'تحليل دقيق لأوقات إقبال العملاء على تجربة بنده وتحديد ساعات الذروة اليومية'
              }
            </p>
          </div>
        </div>

        {selectedHour !== null && (
          <button
            onClick={() => onSelectHour(null)}
            className="self-start sm:self-auto bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-200"
          >
            <RotateCcw size={14} />
            <span>
              {isEnglish 
                ? `Show all hours (Clear ${formatHourLabel(selectedHour)})` 
                : `عرض كل الساعات (إلغاء تصفية ${formatHourLabel(selectedHour)})`
              }
            </span>
          </button>
        )}
      </div>

      {/* Peak Hour Spotlight Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-[#E34F26] rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner shrink-0">
            <Flame size={32} className="animate-pulse text-yellow-200" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-100 block">
              {isEnglish ? 'Most Active Hour (Daily Peak 🔥)' : 'الساعة الأكثر إقبالاً وتفاعلاً (الذروة اليومية 🔥)'}
            </span>
            <h4 className="text-2xl sm:text-3xl font-black mt-0.5">
              {formatHourRange(hourlyData.peakHour)}
            </h4>
            <p className="text-xs text-white/90 font-medium mt-1">
              {isEnglish ? (
                <>Recorded <strong className="underline decoration-yellow-300 font-black">{hourlyData.peakCount} entries</strong> ({peakPercentage}% of all shoppers)</>
              ) : (
                <>سجلت هذه الساعة <strong className="underline decoration-yellow-300 font-black">{hourlyData.peakCount} مشاركة</strong> ({peakPercentage}% من إجمالي المتسوقين)</>
              )}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
          <Zap size={22} className="text-yellow-300 shrink-0" />
          <div className="text-xs">
            <span className="font-black block text-yellow-200">
              {isEnglish ? 'Store Operational Recommendation:' : 'توصية تشغيلية للمتجر:'}
            </span>
            <span className="text-white/90">
              {isEnglish 
                ? 'Deploy additional staff and feature flash promotions during this peak hour'
                : 'تكثيف العروض المباشرة وسرعة الكاشير خلال هذه الساعة'
              }
            </span>
          </div>
        </div>

        <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 24-Hour Interactive Timeline Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1 font-bold">
          <span>{isEnglish ? '24-Hour Shopper Activity Timeline (00:00 - 23:59)' : 'المخطط الزمني الكامل لمشاركات المتسوقين (00:00 - 23:59)'}</span>
          <span className="text-gray-400 font-normal">{isEnglish ? 'Click any hour to filter customer records' : 'اضغط على أي ساعة لتصفية سجل العملاء'}</span>
        </div>

        <div className="bg-gray-50/80 p-4 sm:p-5 rounded-3xl border border-gray-100 overflow-x-auto">
          <div className="min-w-[700px] flex items-end gap-1.5 h-44 pt-6 pb-2">
            {hourlyData.counts.map((count, hour) => {
              const isPeak = hour === hourlyData.peakHour && count > 0;
              const isSelected = selectedHour === hour;
              const heightPercent = hourlyData.maxCount > 0 
                ? Math.max(12, Math.round((count / hourlyData.maxCount) * 100)) 
                : 12;

              // Color based on participation volume
              let barColor = 'bg-gray-200 hover:bg-gray-300 text-gray-500';
              if (count > 0) {
                if (isPeak) {
                  barColor = 'bg-gradient-to-t from-orange-500 to-amber-400 text-white shadow-md ring-2 ring-amber-300';
                } else if (count >= hourlyData.maxCount * 0.6) {
                  barColor = 'bg-emerald-600 text-white hover:bg-emerald-500';
                } else {
                  barColor = 'bg-emerald-300 text-emerald-950 hover:bg-emerald-400';
                }
              }

              if (isSelected) {
                barColor += ' ring-4 ring-[#005A2B] scale-105';
              }

              return (
                <div 
                  key={hour} 
                  onClick={() => onSelectHour(isSelected ? null : hour)}
                  className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group relative transition-all"
                  title={isEnglish ? `Hour ${formatHourRange(hour)}: ${count} entries` : `الساعة ${formatHourRange(hour)}: ${count} مشاركة`}
                >
                  {/* Tooltip / Badge */}
                  <span className={`text-[10px] font-black transition-all ${
                    count > 0 ? (isPeak ? 'text-[#E34F26] font-black text-xs scale-110' : 'text-gray-700') : 'text-gray-300'
                  }`}>
                    {count > 0 ? count : '-'}
                  </span>

                  {/* Vertical bar */}
                  <div className="w-full flex items-end justify-center h-28 bg-white/70 rounded-xl p-1 shadow-2xs border border-gray-100">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${count === 0 ? 8 : heightPercent}%` }}
                      transition={{ duration: 0.5, delay: hour * 0.02 }}
                      className={`w-full rounded-lg transition-all flex items-center justify-center ${barColor}`}
                    >
                      {isPeak && (
                        <span className="text-[10px] animate-bounce">🔥</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Hour label */}
                  <span className={`text-[10px] font-bold whitespace-nowrap mt-1 ${
                    isSelected ? 'text-[#005A2B] font-black underline' : isPeak ? 'text-orange-600 font-black' : 'text-gray-400'
                  }`}>
                    {formatHourLabel(hour)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time-of-Day Periods Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Sun size={20} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">
              {isEnglish ? 'Morning (6 AM - 12 PM)' : 'فترة الصباح (6ص-12م)'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-blue-900">{hourlyData.morningCount}</span>
              <span className="text-[10px] text-gray-400">{isEnglish ? 'entries' : 'مشاركة'}</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50/60 border border-amber-100 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Sun size={20} className="text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">
              {isEnglish ? 'Afternoon (12 PM - 5 PM)' : 'الظهيرة والعصر (12م-5م)'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-amber-900">{hourlyData.afternoonCount}</span>
              <span className="text-[10px] text-gray-400">{isEnglish ? 'entries' : 'مشاركة'}</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/60 border border-orange-100 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
            <Sunset size={20} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">
              {isEnglish ? 'Evening & Peak (5 PM - 11 PM)' : 'المساء والذروة (5م-11م)'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-orange-900">{hourlyData.eveningCount}</span>
              <span className="text-[10px] text-gray-400">{isEnglish ? 'entries' : 'مشاركة'}</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50/60 border border-purple-100 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Moon size={20} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 block">
              {isEnglish ? 'Late Night (11 PM - 6 AM)' : 'الليل المتأخر (11م-6ص)'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-purple-900">{hourlyData.nightCount}</span>
              <span className="text-[10px] text-gray-400">{isEnglish ? 'entries' : 'مشاركة'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
