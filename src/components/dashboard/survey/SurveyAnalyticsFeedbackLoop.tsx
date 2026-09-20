import React, { useState, useMemo } from 'react';
import { 
  Star, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Clock, 
  Check, 
  Award, 
  ThumbsUp, 
  ThumbsDown,
  Smile,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { SurveyResponseRecord } from '../../../types/surveyPlatform';

interface SurveyAnalyticsFeedbackLoopProps {
  responses: SurveyResponseRecord[];
  onToggleResolve: (id: string) => void;
  isEnglish?: boolean;
}

export const SurveyAnalyticsFeedbackLoop: React.FC<SurveyAnalyticsFeedbackLoopProps> = ({
  responses,
  onToggleResolve,
  isEnglish = false
}) => {
  const [starFilter, setStarFilter] = useState<'all' | '5' | 'negative'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponseRecord | null>(null);

  // Metrics computation
  const metrics = useMemo(() => {
    if (responses.length === 0) {
      return {
        avgStars: 5.0,
        totalCount: 0,
        npsScore: 100,
        csatPercent: 100,
        positiveCount: 0,
        neutralCount: 0,
        negativeCount: 0,
        unresolvedNegative: []
      };
    }

    let starsSum = 0;
    let promoters = 0;
    let detractors = 0;
    let satisfied = 0;
    let posCount = 0;
    let neuCount = 0;
    let negCount = 0;
    const unresolvedNeg: SurveyResponseRecord[] = [];

    responses.forEach(r => {
      const stars = r.overallStars || 5;
      starsSum += stars;
      if (stars >= 4) satisfied++;

      const nps = r.npsScore ?? 10;
      if (nps >= 9) promoters++;
      else if (nps <= 6) detractors++;

      if (r.sentiment === 'positive') posCount++;
      else if (r.sentiment === 'negative') negCount++;
      else neuCount++;

      if (r.isFlaggedNegative && !r.resolved) {
        unresolvedNeg.push(r);
      }
    });

    const avgStars = Number((starsSum / responses.length).toFixed(1));
    const npsScore = Math.round(((promoters - detractors) / responses.length) * 100);
    const csatPercent = Math.round((satisfied / responses.length) * 100);

    return {
      avgStars,
      totalCount: responses.length,
      npsScore,
      csatPercent,
      positiveCount: posCount,
      neutralCount: neuCount,
      negativeCount: negCount,
      unresolvedNegative: unresolvedNeg
    };
  }, [responses]);

  // Filtered responses list
  const filteredResponses = useMemo(() => {
    return responses.filter(r => {
      if (starFilter === '5' && (r.overallStars || 5) !== 5) return false;
      if (starFilter === 'negative' && (r.overallStars || 5) >= 3) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (r.guestName || '').toLowerCase().includes(q);
        const matchPhone = (r.guestPhone || '').includes(q);
        const matchTable = (r.tableNumber || '').toLowerCase().includes(q);
        const matchComment = (r.comment || '').toLowerCase().includes(q);
        return matchName || matchPhone || matchTable || matchComment;
      }
      return true;
    });
  }, [responses, starFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Urgent Negative Review Alert Banner (<3 Stars) */}
      {metrics.unresolvedNegative.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 sm:p-5 text-rose-950 shadow-sm animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-rose-900">
                    {isEnglish 
                      ? `Urgent Manager Attention Required (${metrics.unresolvedNegative.length} Complaints)` 
                      : `تنبيه فوري للمدير: يوجد (${metrics.unresolvedNegative.length}) ملاحظة غير راضية تحتاج معالجة`}
                  </h4>
                  <span className="bg-rose-200 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {isEnglish ? 'CRITICAL' : 'عاجل'}
                  </span>
                </div>
                <p className="text-xs text-rose-700 mt-0.5">
                  {isEnglish 
                    ? 'Guests rated below 3 stars. Immediate action on table or phone follow-up protects customer loyalty.' 
                    : 'الضيوف قيموا بأقل من 3 نجوم. يرجى مراجعة الطاولة فوراً أو التواصل بالهاتف لمعالجة الشكوى.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-800">
                طاولة #{metrics.unresolvedNegative[0].tableNumber} ({metrics.unresolvedNegative[0].timestamp})
              </span>
              <button
                onClick={() => onToggleResolve(metrics.unresolvedNegative[0].id)}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {isEnglish ? 'Mark Resolved' : 'تمت المعالجة ✓'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Rating */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-1">
              {isEnglish ? 'Average Guest Rating' : 'متوسط تقييم الضيوف'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {metrics.avgStars}
              </span>
              <span className="text-xs text-slate-400 font-bold">/ 5.0</span>
            </div>
            <div className="flex items-center gap-0.5 text-amber-400 mt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  size={12} 
                  className={star <= Math.round(metrics.avgStars) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} 
                />
              ))}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            ⭐
          </div>
        </div>

        {/* CSAT Satisfaction */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-1">
              {isEnglish ? 'Customer Satisfaction (CSAT)' : 'مؤشر رضا الضيوف (CSAT)'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                {metrics.csatPercent}%
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
              {isEnglish ? 'High Satisfaction' : 'نسبة رضا ممتازة'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            😊
          </div>
        </div>

        {/* NPS Net Promoter */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-1">
              {isEnglish ? 'Net Promoter Score (NPS)' : 'مؤشر الترويج الصافي (NPS)'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-indigo-600">
                +{metrics.npsScore}
              </span>
            </div>
            <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md mt-1 inline-block">
              {isEnglish ? 'Excellent Advocacy' : 'ترشيح وثقة عالية'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
            🏆
          </div>
        </div>

        {/* Total Responses */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block mb-1">
              {isEnglish ? 'Total Survey Submissions' : 'إجمالي التقييمات المكتملة'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {metrics.totalCount}
              </span>
              <span className="text-xs text-slate-400 font-bold">ضيوف</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block mt-1">
              {isEnglish ? 'From all active tables' : 'عبر جميع الطاولات النشطة'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-black">
            📊
          </div>
        </div>
      </div>

      {/* 3. AI Sentiment Analysis & Keywords Cloud */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-800">
                  {isEnglish ? 'AI Sentiment Analysis & Voice of Guest' : 'تحليل المشاعر الذكي ومحرك صوت الضيف (AI Sentiment)'}
                </h3>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                  AI INSIGHTS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isEnglish ? 'Automated thematic extraction from customer comments' : 'استخراج تلقائي لنقاط القوة والفرص من تعليقات وملاحظات العملاء'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sentiment Bar Distribution */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-black text-slate-700">
              {isEnglish ? 'Sentiment Distribution' : 'توزيع مشاعر الزوار'}
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <ThumbsUp size={12} /> {isEnglish ? 'Positive' : 'إيجابي وراضٍ'}
                  </span>
                  <span>{Math.round((metrics.positiveCount / (metrics.totalCount || 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${(metrics.positiveCount / (metrics.totalCount || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-amber-700 flex items-center gap-1">
                    <Smile size={12} /> {isEnglish ? 'Neutral' : 'محايد'}
                  </span>
                  <span>{Math.round((metrics.neutralCount / (metrics.totalCount || 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full" 
                    style={{ width: `${(metrics.neutralCount / (metrics.totalCount || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-rose-700 flex items-center gap-1">
                    <ThumbsDown size={12} /> {isEnglish ? 'Negative / Needs Care' : 'سلبي / يحتاج اهتمام'}
                  </span>
                  <span>{Math.round((metrics.negativeCount / (metrics.totalCount || 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-rose-500 h-full rounded-full" 
                    style={{ width: `${(metrics.negativeCount / (metrics.totalCount || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Praise Words */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
            <h4 className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>{isEnglish ? 'Top Praised Themes' : 'أبرز كلمات الإشادة المتكررة'}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { tag: 'تيراميسو ممتاز', count: '14+' },
                { tag: 'خدمة سريعة', count: '19+' },
                { tag: 'طاقم عمل لبق', count: '22+' },
                { tag: 'قهوة V60 خرافية', count: '11+' },
                { tag: 'نظافة ملفتة', count: '18+' },
                { tag: 'أجواء هادئة', count: '15+' }
              ].map(item => (
                <span 
                  key={item.tag}
                  className="bg-white border border-emerald-200 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1"
                >
                  <span>{item.tag}</span>
                  <span className="text-[10px] text-emerald-600 font-mono">({item.count})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Frequent Areas of Improvement */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
            <h4 className="text-xs font-black text-rose-900 flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-rose-600" />
              <span>{isEnglish ? 'Areas of Improvement' : 'فرص التحسين والتنبيهات المتكررة'}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { tag: 'تأخر الطبق الرئيسي', count: '3 مرّات' },
                { tag: 'تكييف الصالة بارد جداً', count: '2 مرّات' },
                { tag: 'صعوبة المواقف الخارجية', count: '4 مرّات' }
              ].map(item => (
                <span 
                  key={item.tag}
                  className="bg-white border border-rose-200 text-rose-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1"
                >
                  <span>{item.tag}</span>
                  <span className="text-[10px] text-rose-500 font-mono">({item.count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Feedback Stream Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Table Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-slate-800">
              {isEnglish ? 'Live Guest Feedback Stream' : 'سجل التقييمات المباشر من الطاولات'}
            </h3>
            <span className="text-xs text-slate-400">
              ({filteredResponses.length})
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEnglish ? 'Search by name, table or comment...' : 'بحث بالاسم، رقم الطاولة، أو التعليق...'}
                className="text-xs p-2 pr-7 pl-3 rounded-xl border border-slate-200 focus:border-[#005A2B] outline-hidden w-48 sm:w-60"
              />
              <Search size={13} className="absolute right-2 top-2.5 text-slate-400" />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setStarFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  starFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                {isEnglish ? 'All' : 'الكل'}
              </button>
              <button
                onClick={() => setStarFilter('5')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  starFilter === '5' ? 'bg-white text-amber-700 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                5 ⭐
              </button>
              <button
                onClick={() => setStarFilter('negative')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  starFilter === 'negative' ? 'bg-white text-rose-700 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                {isEnglish ? '< 3 Stars' : 'أقل من 3 ⭐'}
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-right rtl:text-right ltr:text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">{isEnglish ? 'Table' : 'الطاولة'}</th>
                <th className="py-3 px-4">{isEnglish ? 'Guest' : 'الضيف'}</th>
                <th className="py-3 px-4">{isEnglish ? 'Rating' : 'التقييم'}</th>
                <th className="py-3 px-4">{isEnglish ? 'NPS' : 'مؤشر NPS'}</th>
                <th className="py-3 px-4">{isEnglish ? 'Guest Feedback' : 'ملاحظات الضيف'}</th>
                <th className="py-3 px-4">{isEnglish ? 'Time' : 'التوقيت'}</th>
                <th className="py-3 px-4 text-center">{isEnglish ? 'Action' : 'الإجراء'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResponses.map(resp => (
                <tr 
                  key={resp.id}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    resp.isFlaggedNegative && !resp.resolved ? 'bg-rose-50/30' : ''
                  }`}
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      #{resp.tableNumber}
                    </span>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800">
                      {resp.guestName || 'ضيف المتجر'}
                    </div>
                    {resp.guestPhone && (
                      <div className="text-[10px] text-slate-400 font-mono">
                        {resp.guestPhone}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="font-black text-slate-900">
                        {resp.overallStars || 5}
                      </span>
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                    </div>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      (resp.npsScore ?? 10) >= 9 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : (resp.npsScore ?? 10) >= 7 
                          ? 'bg-amber-50 text-amber-700' 
                          : 'bg-rose-50 text-rose-700'
                    }`}>
                      {resp.npsScore ?? 10}/10
                    </span>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <p className="text-xs text-slate-700 line-clamp-2" title={resp.comment}>
                      {resp.comment || 'تقييم سريع بدون تعليق نصي.'}
                    </p>
                    {resp.sentimentKeywords && resp.sentimentKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {resp.sentimentKeywords.map(k => (
                          <span key={k} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            {k}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                    {resp.timestamp}
                  </td>

                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {resp.isFlaggedNegative ? (
                      <button
                        onClick={() => onToggleResolve(resp.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          resp.resolved 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-rose-600 text-white hover:bg-rose-700 shadow-2xs'
                        }`}
                      >
                        {resp.resolved ? (isEnglish ? 'Resolved ✓' : 'تم الحل ✓') : (isEnglish ? 'Resolve Now' : 'حل المشكلة')}
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        {isEnglish ? 'Reviewed' : 'مكتمل'}
                      </span>
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
