import React, { useState, useRef } from 'react';
import { Upload, Trash2, Check, Sparkles, Image as ImageIcon, Camera, RefreshCw } from 'lucide-react';
import { SurveyIdentitySettings } from '../../../types/surveyPlatform';

interface OperationalIdentityTabProps {
  identity: SurveyIdentitySettings;
  onChange: (identity: SurveyIdentitySettings) => void;
  isEnglish?: boolean;
}

// Curated high quality presets matching luxury restaurants and cafes
const PRESET_COVERS = [
  {
    name: 'مطعم وبار دافئ فاخر (الصورة المطابقة)',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85'
  },
  {
    name: 'صالة طعام ومقهى راقي',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=85'
  },
  {
    name: 'كافيه مختص عصري',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop&q=85'
  },
  {
    name: 'أسواق وبقالة ومخبز',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=85'
  }
];

const PRESET_LOGOS = [
  {
    name: 'طاولات فاخرة ذهبية',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&auto=format&fit=crop&q=85'
  },
  {
    name: 'شعار ضيافة ومأكولات',
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&auto=format&fit=crop&q=85'
  },
  {
    name: 'كوب قهوة لاتيه آرت',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=85'
  },
  {
    name: 'برجر وشيف ستايل',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=85'
  }
];

export const OperationalIdentityTab: React.FC<OperationalIdentityTabProps> = ({
  identity,
  onChange,
  isEnglish = false
}) => {
  const [logoUrl, setLogoUrl] = useState(identity.logoUrl);
  const [coverUrl, setCoverUrl] = useState(identity.coverUrl);
  const [restaurantNameAr, setRestaurantNameAr] = useState(identity.restaurantNameAr);
  const [restaurantNameEn, setRestaurantNameEn] = useState(identity.restaurantNameEn);
  const [overallQuestionAr, setOverallQuestionAr] = useState(identity.overallQuestionAr);
  const [overallQuestionEn, setOverallQuestionEn] = useState(identity.overallQuestionEn);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) {
        setLogoUrl(result);
        const updated = { ...identity, logoUrl: result };
        onChange(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) {
        setCoverUrl(result);
        const updated = { ...identity, coverUrl: result };
        onChange(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SurveyIdentitySettings = {
      logoUrl,
      coverUrl,
      restaurantNameAr: restaurantNameAr.trim(),
      restaurantNameEn: restaurantNameEn.trim(),
      overallQuestionAr: overallQuestionAr.trim(),
      overallQuestionEn: overallQuestionEn.trim()
    };
    onChange(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold text-lg">✨</span>
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              {isEnglish 
                ? 'Venue Header Photo & Small Logo Customization ⚙️' 
                : 'تخصيص صورة الهيدر ولوقو المكان الصغير وعناوين المنشأة ⚙️'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish
              ? 'Upload your venue banner cover photo and circular logo to show in the guest phone header.'
              : 'ارفع صورة غلاف الهيدر ولوقو المكان الصغير ليظهرا فوراً في أعلى شاشة جوال العميل كما بالصورة.'}
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Check size={15} strokeWidth={3} />
          <span>{isEnglish ? 'Save Settings' : 'حفظ التغييرات'}</span>
        </button>
      </div>

      {/* Upload Cards: Logo & Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1. Small Circular Venue Logo Card (Matching Image 1) */}
        <div className="bg-white border-2 border-amber-200/80 rounded-3xl p-5 shadow-2xs space-y-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">📷</span>
              <span>{isEnglish ? 'Small Venue Logo (Circular Avatar)' : 'لوقو المكان الصغير (الدائري ببرواز ذهبي)'}</span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              في منتصف الهيدر
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Circular Preview with Gold Double Frame matching Phone Header */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 ring-4 ring-amber-500/30 bg-slate-900 shrink-0 flex items-center justify-center relative shadow-md">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-center text-slate-400 text-[10px]">
                  <Camera size={20} className="mx-auto mb-0.5 text-slate-400" />
                  <span>بدون لوقو</span>
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Upload size={13} />
                  <span>{isEnglish ? 'Upload Logo' : 'رفع لوقو المكان الصغير 📤'}</span>
                </button>

                {logoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoUrl('');
                      onChange({ ...identity, logoUrl: '' });
                    }}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>{isEnglish ? 'Delete' : 'حذف'}</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-500">
                {isEnglish ? 'Displays in center with double gold border.' : 'يظهر في منتصف هيدر الجوال بإطار ذهبي لامع.'}
              </p>
            </div>
          </div>

          {/* Quick presets for logo */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
              أو اختر نموذج لوقو جاهز بنقرة واحدة:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {PRESET_LOGOS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setLogoUrl(p.url);
                    onChange({ ...identity, logoUrl: p.url });
                  }}
                  className={`p-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    logoUrl === p.url ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-400' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                  title={p.name}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-300">
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 truncate w-full">{p.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Venue Cover Banner Photo Card (Matching Image 1) */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">🖼️</span>
              <span>{isEnglish ? 'Venue Header Cover Photo' : 'صورة غلاف الهيدر (المكان والمطعم)'}</span>
            </div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              خلفية الهيدر
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-28 h-20 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 flex items-center justify-center relative shadow-md">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-center text-slate-400 text-[10px]">
                  <ImageIcon size={20} className="mx-auto mb-0.5 text-slate-400" />
                  <span>بدون صورة</span>
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Upload size={13} />
                  <span>{isEnglish ? 'Upload Cover' : 'رفع صورة الهيدر 📤'}</span>
                </button>

                {coverUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverUrl('');
                      onChange({ ...identity, coverUrl: '' });
                    }}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>{isEnglish ? 'Delete' : 'حذف'}</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-500">
                {isEnglish ? 'Spans the top header of the phone screen.' : 'يمتد بكامل عرض هيدر الجوال مع تدرج داكن فخم.'}
              </p>
            </div>
          </div>

          {/* Quick presets for cover */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
              أو اختر صورة هيدر جاهزة عالية الدقة:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {PRESET_COVERS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCoverUrl(p.url);
                    onChange({ ...identity, coverUrl: p.url });
                  }}
                  className={`p-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    coverUrl === p.url ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-400' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                  title={p.name}
                >
                  <div className="w-full h-8 rounded-lg overflow-hidden border border-slate-200">
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[8px] font-bold text-slate-700 truncate w-full">{p.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Text Inputs & Capsule */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="text-sm">🏷️</span>
          <h4 className="text-xs sm:text-sm font-black text-slate-900">
            {isEnglish ? 'Brand Names & Question Titles' : 'اسم المنشأة وشريط كبسولة الهيدر وسؤال الانطباع العام'}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? '* Restaurant / Cafe Name (Arabic)' : '* اسم المطعم / المقهى (يظهر في كبسولة الهيدر السوداء الذهبية)'}
            </label>
            <input
              type="text"
              value={restaurantNameAr}
              onChange={(e) => setRestaurantNameAr(e.target.value)}
              placeholder="مطعم ومقهى السفير"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500 font-bold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? 'Restaurant / Cafe Name (English)' : 'اسم المطعم / المقهى (إنجليزي)'}
            </label>
            <input
              type="text"
              value={restaurantNameEn}
              onChange={(e) => setRestaurantNameEn(e.target.value)}
              placeholder="Al Safeer Restaurant & Cafe"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? '* Overall Impression Question (Arabic)' : '* سؤال الانطباع العام (يظهر باللون الأخضر المميز أعلى البطاقات)'}
            </label>
            <input
              type="text"
              value={overallQuestionAr}
              onChange={(e) => setOverallQuestionAr(e.target.value)}
              placeholder="ما هو انطباعك العام عن زيارتك اليوم؟ 🌟"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500 font-bold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isEnglish ? 'Overall Impression Question (English)' : 'سؤال الانطباع العام (إنجليزي)'}
            </label>
            <input
              type="text"
              value={overallQuestionEn}
              onChange={(e) => setOverallQuestionEn(e.target.value)}
              placeholder="How was your overall experience today? 🌟"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        {savedSuccess ? (
          <div className="text-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <Check size={16} />
            <span>{isEnglish ? 'Settings saved successfully!' : 'تم حفظ إعدادات الهوية وصور الهيدر بنجاح!'}</span>
          </div>
        ) : <div />}

        <button
          type="submit"
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Check size={16} strokeWidth={3} />
          <span>{isEnglish ? 'Save Identity & Branding Settings ✓' : 'حفظ إعدادات الهوية والشعار ✓'}</span>
        </button>
      </div>
    </form>
  );
};

