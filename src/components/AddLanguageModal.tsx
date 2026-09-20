import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Check, Globe, Sparkles, AlertCircle } from 'lucide-react';
import { LanguageItem } from '../types';
import { DEFAULT_LANGUAGES } from '../utils/languages';

interface AddLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  languages: LanguageItem[];
  onSaveLanguages: (updated: LanguageItem[]) => void;
}

export const AddLanguageModal: React.FC<AddLanguageModalProps> = ({
  isOpen,
  onClose,
  languages,
  onSaveLanguages
}) => {
  const [localLangs, setLocalLangs] = useState<LanguageItem[]>(languages);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [name, setName] = useState('');
  const [nativeSublabel, setNativeSublabel] = useState('');
  const [flag, setFlag] = useState('🌐');
  const [dir, setDir] = useState<'rtl' | 'ltr'>('ltr');
  const [brandTitle, setBrandTitle] = useState('');
  const [startBtn, setStartBtn] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleActive = (code: string) => {
    setLocalLangs(prev => 
      prev.map(l => l.code === code ? { ...l, isActive: !l.isActive } : l)
    );
  };

  const handleDelete = (code: string) => {
    // Don't delete Arabic
    if (code === 'ar') return;
    setLocalLangs(prev => prev.filter(l => l.code !== code));
  };

  const handleCreateLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanCode = code.trim().toLowerCase();
    if (!cleanCode) {
      setErrorMessage('يرجى إدخال رمز اللغة (مثلاً es أو fil)');
      return;
    }
    if (localLangs.some(l => l.code === cleanCode)) {
      setErrorMessage('هذا الرمز موجود بالفعل!');
      return;
    }
    if (!name.trim()) {
      setErrorMessage('يرجى إدخال اسم اللغة بلغتها الأصلية');
      return;
    }

    const newLang: LanguageItem = {
      code: cleanCode,
      countryCode: (countryCode.trim() || cleanCode).toUpperCase(),
      englishName: englishName.trim() || cleanCode.toUpperCase(),
      name: name.trim(),
      nativeSublabel: nativeSublabel.trim() || `${name.trim()} • International`,
      flag: flag.trim() || '🌐',
      dir,
      isActive: true,
      translations: {
        ...(DEFAULT_LANGUAGES[1]?.translations || DEFAULT_LANGUAGES[0].translations),
        brandTitle: brandTitle.trim() || 'Panda Makes the Difference',
        startChallengeBtn: startBtn.trim() || 'Start Now',
      }
    };

    const updated = [...localLangs, newLang];
    setLocalLangs(updated);
    onSaveLanguages(updated);

    // Reset Form
    setCode('');
    setCountryCode('');
    setEnglishName('');
    setName('');
    setNativeSublabel('');
    setFlag('🌐');
    setBrandTitle('');
    setStartBtn('');
    setShowAddForm(false);
  };

  const handleSaveAll = () => {
    onSaveLanguages(localLangs);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-[32px] max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-50/40">
          <div className="flex items-center gap-3">
            <div className="bg-[#005A2B] text-white p-2.5 rounded-2xl shadow-xs">
              <Globe size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-800">إدارة لغات تجربة العميل</h3>
              <p className="text-xs text-gray-500 font-medium">التحكم في اللغات الحالية وإضافة لغات جديدة تظهر للعملاء فوراً</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-500">
              اللغات المفعلة حالياً ({localLangs.filter(l => l.isActive).length} من {localLangs.length})
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus size={16} />
              <span>{showAddForm ? 'إلغاء الإضافة' : 'إضافة لغة جديدة'}</span>
            </button>
          </div>

          {/* Add Language Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateLanguage}
                className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-black border-b border-gray-200 pb-2">
                  <Sparkles size={16} />
                  <span>بيانات اللغة الجديدة</span>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 text-red-600 p-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-red-100">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">رمز اللغة (مثلاً: es أو fil)</label>
                    <input
                      type="text"
                      placeholder="es"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-emerald-500"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">علم / إيموجي (مثلاً: 🇪🇸 أو 🇵🇭)</label>
                    <input
                      type="text"
                      placeholder="🇪🇸"
                      value={flag}
                      onChange={e => setFlag(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-emerald-500"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">الاسم بلغتها الأصلية (Native)</label>
                    <input
                      type="text"
                      placeholder="Español"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">الاسم بالإنجليزية (English)</label>
                    <input
                      type="text"
                      placeholder="Spanish"
                      value={englishName}
                      onChange={e => setEnglishName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">اتجاه الكتابة</label>
                    <select
                      value={dir}
                      onChange={e => setDir(e.target.value as 'rtl' | 'ltr')}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-emerald-500"
                    >
                      <option value="ltr">من اليسار لليمين (LTR)</option>
                      <option value="rtl">من اليمين لليسار (RTL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">نص زر البدء</label>
                    <input
                      type="text"
                      placeholder="Comenzar ahora"
                      value={startBtn}
                      onChange={e => setStartBtn(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#005A2B] hover:bg-[#004722] text-white text-xs font-black py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check size={16} />
                  <span>تأكيد وإضافة اللغة للقائمة</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Languages List */}
          <div className="space-y-2">
            {localLangs.map((lang) => {
              const isDefault = lang.code === 'ar';
              return (
                <div
                  key={lang.code}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    lang.isActive
                      ? 'bg-white border-gray-200 shadow-xs'
                      : 'bg-gray-50/60 border-gray-200/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-gray-800">{lang.name}</span>
                        <span className="text-xs text-gray-400 font-medium">({lang.englishName})</span>
                        {isDefault && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-200">
                            الافتراضية
                          </span>
                        )}
                        <span className="text-[10px] bg-gray-100 text-gray-600 font-mono px-1.5 py-0.5 rounded">
                          {lang.dir.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-mono">Code: {lang.code}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Active Toggle */}
                    <button
                      onClick={() => handleToggleActive(lang.code)}
                      disabled={isDefault}
                      className={`text-xs font-black px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        lang.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      } ${isDefault ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {lang.isActive ? 'مفعلة ✓' : 'معطلة'}
                    </button>

                    {/* Delete Custom Language */}
                    {!isDefault && (
                      <button
                        onClick={() => handleDelete(lang.code)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="حذف اللغة"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={handleSaveAll}
            className="bg-[#005A2B] hover:bg-[#004722] text-white font-black text-xs px-6 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Check size={16} />
            <span>حفظ وتطبيق التغييرات</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
