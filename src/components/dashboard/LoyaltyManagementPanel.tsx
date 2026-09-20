import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Coffee, 
  UtensilsCrossed, 
  ShoppingBag, 
  Gift, 
  Eye, 
  Check, 
  Plus, 
  Trash2, 
  Save, 
  Send, 
  Smartphone, 
  Languages, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Sliders, 
  Clock, 
  Ticket, 
  DollarSign, 
  X,
  Edit3
} from 'lucide-react';
import { 
  LoyaltyProgramConfig, 
  getStoredLoyaltyConfig, 
  saveStoredLoyaltyConfig, 
  publishLoyaltyConfig, 
  DEFAULT_LOYALTY_CONFIG,
  SectorType,
  SupermarketRewardCatalogItem,
  MasterRewardItem
} from '../../utils/loyaltyConfig';
import { CustomerLoyaltyCardsEndSection } from '../loyalty/CustomerLoyaltyCardsEndSection';

interface LoyaltyManagementPanelProps {
  isEnglish?: boolean;
  currentLangCode?: string;
}

type LoyaltyTab = 'cafe' | 'restaurant' | 'supermarket' | 'rewards';

export const LoyaltyManagementPanel: React.FC<LoyaltyManagementPanelProps> = ({
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  // Config state
  const [config, setConfig] = useState<LoyaltyProgramConfig>(() => getStoredLoyaltyConfig());
  const [activeTab, setActiveTab] = useState<LoyaltyTab>('cafe');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'published'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Live preview state
  const [previewLanguage, setPreviewLanguage] = useState<'ar' | 'en'>(isEnglish ? 'en' : 'ar');
  const [previewSector, setPreviewSector] = useState<SectorType>('cafe');

  // Master Reward Modal state
  const [isRewardModalOpen, setIsRewardModalOpen] = useState<boolean>(false);
  const [editingReward, setEditingReward] = useState<MasterRewardItem | null>(null);

  // New Supermarket Catalog item temp form
  const [newCatPoints, setNewCatPoints] = useState<number>(500);
  const [newCatSar, setNewCatSar] = useState<number>(5);
  const [newCatNameAr, setNewCatNameAr] = useState<string>('قسيمة مشتريات 5 ريال');
  const [newCatNameEn, setNewCatNameEn] = useState<string>('5 SAR Shopping Voucher');

  // Listen for storage changes
  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setConfig(e.detail);
      }
    };
    window.addEventListener('panda_loyalty_updated', handleUpdate);
    return () => window.removeEventListener('panda_loyalty_updated', handleUpdate);
  }, []);

  // Update handlers
  const updateCafe = (key: keyof typeof config.cafe, value: any) => {
    setConfig(prev => ({
      ...prev,
      cafe: { ...prev.cafe, [key]: value }
    }));
    setHasUnsavedChanges(true);
    setSaveStatus('idle');
  };

  const updateRestaurant = (key: keyof typeof config.restaurant, value: any) => {
    setConfig(prev => ({
      ...prev,
      restaurant: { ...prev.restaurant, [key]: value }
    }));
    setHasUnsavedChanges(true);
    setSaveStatus('idle');
  };

  const updateSupermarket = (key: keyof typeof config.supermarket, value: any) => {
    setConfig(prev => ({
      ...prev,
      supermarket: { ...prev.supermarket, [key]: value }
    }));
    setHasUnsavedChanges(true);
    setSaveStatus('idle');
  };

  // Validation
  const validateConfig = (): boolean => {
    if (config.cafe.stampsRequired <= 0) {
      setValidationError(isEnglish ? 'Café required stamps must be greater than 0' : 'عدد أختام المقهى المطلوبة يجب أن يكون أكبر من 0');
      return false;
    }
    if (config.cafe.spendAmountPerStamp <= 0) {
      setValidationError(isEnglish ? 'Café spend per stamp must be greater than 0' : 'قيمة الشراء لكل ختم في المقهى يجب أن تكون أكبر من 0');
      return false;
    }
    if (config.restaurant.requiredVisits <= 0) {
      setValidationError(isEnglish ? 'Restaurant required visits must be greater than 0' : 'عدد زيارات المطعم المطلوبة يجب أن يكون أكبر من 0');
      return false;
    }
    if (config.supermarket.sarRequiredPerPoint <= 0) {
      setValidationError(isEnglish ? 'Supermarket SAR per point must be greater than 0' : 'قيمة الريال لكل نقطة في السوبرماركت يجب أن تكون موجبة');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSave = () => {
    if (!validateConfig()) return;
    saveStoredLoyaltyConfig(config);
    setHasUnsavedChanges(false);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handlePublish = () => {
    if (!validateConfig()) return;
    publishLoyaltyConfig(config);
    setHasUnsavedChanges(false);
    setSaveStatus('published');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleResetToDefaults = () => {
    if (window.confirm(isEnglish ? 'Reset all loyalty settings to factory defaults?' : 'هل تريد استعادة الإعدادات الافتراضية لبرامج الولاء؟')) {
      setConfig(DEFAULT_LOYALTY_CONFIG);
      saveStoredLoyaltyConfig(DEFAULT_LOYALTY_CONFIG);
      setHasUnsavedChanges(false);
      setSaveStatus('saved');
    }
  };

  // Supermarket Catalog Actions
  const handleAddCatalogItem = () => {
    if (newCatPoints <= 0 || newCatSar <= 0) return;
    const newItem: SupermarketRewardCatalogItem = {
      id: `cat-${Date.now()}`,
      requiredPoints: newCatPoints,
      rewardValueSAR: newCatSar,
      rewardNameAr: newCatNameAr || `قسيمة مشتريات ${newCatSar} ريال`,
      rewardNameEn: newCatNameEn || `${newCatSar} SAR Voucher`,
      descriptionAr: `خصم مباشر بقيمة ${newCatSar} ريال عند الكاشير`,
      descriptionEn: `Direct ${newCatSar} SAR deduction at cashier`,
      isActive: true
    };
    setConfig(prev => ({
      ...prev,
      supermarket: {
        ...prev.supermarket,
        catalog: [...prev.supermarket.catalog, newItem]
      }
    }));
    setHasUnsavedChanges(true);
    setNewCatPoints(500);
    setNewCatSar(5);
  };

  const handleDeleteCatalogItem = (id: string) => {
    setConfig(prev => ({
      ...prev,
      supermarket: {
        ...prev.supermarket,
        catalog: prev.supermarket.catalog.filter(c => c.id !== id)
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Master Reward Actions
  const handleToggleRewardStatus = (id: string) => {
    setConfig(prev => ({
      ...prev,
      rewards: prev.rewards.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    }));
    setHasUnsavedChanges(true);
  };

  const handleDeleteMasterReward = (id: string) => {
    if (window.confirm(isEnglish ? 'Delete this reward?' : 'هل أنت متأكد من حذف هذه المكافأة؟')) {
      setConfig(prev => ({
        ...prev,
        rewards: prev.rewards.filter(r => r.id !== id)
      }));
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveMasterReward = (reward: MasterRewardItem) => {
    setConfig(prev => {
      const exists = prev.rewards.some(r => r.id === reward.id);
      if (exists) {
        return {
          ...prev,
          rewards: prev.rewards.map(r => r.id === reward.id ? reward : r)
        };
      } else {
        return {
          ...prev,
          rewards: [...prev.rewards, reward]
        };
      }
    });
    setHasUnsavedChanges(true);
    setIsRewardModalOpen(false);
    setEditingReward(null);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="space-y-6">
      {/* 1. Master Header & Save Bar */}
      <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005A2B] via-emerald-700 to-teal-800 text-white flex items-center justify-center shadow-sm shrink-0">
              <Award size={24} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {isEnglish ? 'Loyalty & Rewards Program Management' : 'إدارة برامج الولاء والمكافآت الموحدة'}
                </h3>
                <span className="bg-emerald-50 text-[#005A2B] text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>{isEnglish ? 'One Source of Truth' : 'المصدر الموحد للبيانات'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isEnglish 
                  ? 'Complete control over Café, Restaurant, and Supermarket loyalty cards, stamps, and points. Real-time sync with customer end screen.' 
                  : 'تحكم كامل وشامل في برامج ولاء المقهى، المطعم، ونقاط السوبرماركت مع ظهور فوري وتلقائي في شاشة نهاية تجربة العميل.'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Save & Publish */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
            {hasUnsavedChanges && (
              <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 animate-pulse">
                {isEnglish ? 'Unsaved changes' : 'تعديلات غير محفوظة'}
              </span>
            )}

            {saveStatus === 'saved' && (
              <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>{isEnglish ? 'Saved to Draft' : 'تم الحفظ بنجاح'}</span>
              </span>
            )}

            {saveStatus === 'published' && (
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-300 flex items-center gap-1">
                <Sparkles size={13} className="text-amber-500" />
                <span>{isEnglish ? 'Published Live to Customers!' : 'تم النشر مباشرة للعملاء! 🚀'}</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetToDefaults}
              className="p-2.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
              title={isEnglish ? 'Reset to factory defaults' : 'استعادة الإعدادات الأصلية'}
            >
              <RotateCcw size={16} />
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <Save size={15} />
              <span>{isEnglish ? 'Save Changes' : 'حفظ التعديلات'}</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              className="bg-gradient-to-r from-[#005A2B] to-emerald-700 hover:from-[#004822] hover:to-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Send size={15} className="text-amber-300" />
              <span>{isEnglish ? 'Publish Changes' : 'نشر للعملاء فوراً ⚡'}</span>
            </button>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-rose-700 text-xs font-bold">
            <AlertCircle size={16} className="shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* 2. Top Sector Tabs (Café, Restaurant, Supermarket, Rewards) */}
        <div className="flex items-center gap-2 mt-5 border-b border-slate-100 pb-3 overflow-x-auto">
          {[
            { id: 'cafe', labelAr: '☕ المقهى والقهوة المختصة', labelEn: '☕ Café Settings', enabled: config.cafe.isEnabled },
            { id: 'restaurant', labelAr: '🍽️ المطعم والوجبات', labelEn: '🍽️ Restaurant Settings', enabled: config.restaurant.isEnabled },
            { id: 'supermarket', labelAr: '🛒 السوبرماركت والتموين (نقاط)', labelEn: '🛒 Supermarket (Points)', enabled: config.supermarket.isEnabled },
            { id: 'rewards', labelAr: '🎁 كتالوج إدارة المكافآت', labelEn: '🎁 Rewards Catalog', enabled: true },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as LoyaltyTab);
                if (tab.id !== 'rewards') setPreviewSector(tab.id as SectorType);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#005A2B] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{isEnglish ? tab.labelEn : tab.labelAr}</span>
              {tab.id !== 'rewards' && (
                <span className={`w-2 h-2 rounded-full ${tab.enabled ? 'bg-emerald-400' : 'bg-slate-300'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Grid: Settings on Left, Live Customer End-Screen Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Sector Settings (Span 7) */}
        <div className="lg:col-span-7 space-y-6">

          {/* ======================= TAB 1: CAFÉ SETTINGS ======================= */}
          {activeTab === 'cafe' && (
            <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#005A2B] flex items-center justify-center">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {isEnglish ? 'Specialty Café Loyalty Program' : 'برنامج ولاء المقهى والقهوة المختصة (نظام الأختام)'}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {isEnglish ? 'Stamp-based loyalty card for drinks & pastries' : 'بطاقة أختام رقمية لمشروبات القهوة والكرواسون'}
                    </span>
                  </div>
                </div>

                {/* ON / OFF Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-700">
                    {config.cafe.isEnabled ? (isEnglish ? 'Active' : 'مفعل') : (isEnglish ? 'Disabled' : 'معطل')}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCafe('isEnabled', !config.cafe.isEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      config.cafe.isEnabled ? 'bg-[#005A2B] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Program Name AR */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">اسم البرنامج (بالعربية)</label>
                  <input
                    type="text"
                    value={config.cafe.programNameAr}
                    onChange={(e) => updateCafe('programNameAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Program Name EN */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">Program Name (English)</label>
                  <input
                    type="text"
                    value={config.cafe.programNameEn}
                    onChange={(e) => updateCafe('programNameEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Description AR */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">وصف البرنامج (بالعربية)</label>
                  <input
                    type="text"
                    value={config.cafe.descriptionAr}
                    onChange={(e) => updateCafe('descriptionAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Description EN */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">Description (English)</label>
                  <input
                    type="text"
                    value={config.cafe.descriptionEn}
                    onChange={(e) => updateCafe('descriptionEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Spend per stamp */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">قيمة المشتريات لكل ختم (ريال سعودي SAR)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      value={config.cafe.spendAmountPerStamp}
                      onChange={(e) => updateCafe('spendAmountPerStamp', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none font-mono"
                    />
                    <span className="absolute left-3 rtl:left-3 ltr:right-3 top-2 text-slate-400 font-bold">SAR</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">مثال: كل 20 ريال تعادل ختم واحد</span>
                </div>

                {/* Stamps required */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">عدد الأختام المطلوبة للمكافأة</label>
                  <input
                    type="number"
                    min={2}
                    max={16}
                    value={config.cafe.stampsRequired}
                    onChange={(e) => updateCafe('stampsRequired', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">المعيار الذهبي: 8 أختام (كما بالصورة)</span>
                </div>

                {/* Reward Name AR */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">اسم المكافأة (بالعربية)</label>
                  <input
                    type="text"
                    value={config.cafe.rewardNameAr}
                    onChange={(e) => updateCafe('rewardNameAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Reward Name EN */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">Reward Name (English)</label>
                  <input
                    type="text"
                    value={config.cafe.rewardNameEn}
                    onChange={(e) => updateCafe('rewardNameEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Reward Description AR */}
                <div className="sm:col-span-2">
                  <label className="block font-black text-slate-700 mb-1">تفاصيل ومزايا المكافأة (بالعربية)</label>
                  <input
                    type="text"
                    value={config.cafe.rewardDescriptionAr}
                    onChange={(e) => updateCafe('rewardDescriptionAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Expirations */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">مدة صلاحية الأختام (أيام)</label>
                  <input
                    type="number"
                    value={config.cafe.stampExpirationDays}
                    onChange={(e) => updateCafe('stampExpirationDays', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">مدة صلاحية استلام المكافأة (أيام)</label>
                  <input
                    type="number"
                    value={config.cafe.rewardExpirationDays}
                    onChange={(e) => updateCafe('rewardExpirationDays', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 font-mono"
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">نص زر البطاقة (بالعربية)</label>
                  <input
                    type="text"
                    value={config.cafe.buttonTextAr}
                    onChange={(e) => updateCafe('buttonTextAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">Button Text (English)</label>
                  <input
                    type="text"
                    value={config.cafe.buttonTextEn}
                    onChange={(e) => updateCafe('buttonTextEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* Allow Bonus Stamps Toggle */}
                <div className="sm:col-span-2 flex items-center justify-between p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                  <div>
                    <span className="font-black text-slate-800 block">تفعيل الأختام الإضافية (Bonus Stamps)</span>
                    <span className="text-[11px] text-slate-500">منح ختم مضاعف في فترات الصباح أو للطلبات السريعة</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateCafe('allowBonusStamps', !config.cafe.allowBonusStamps)}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      config.cafe.allowBonusStamps ? 'bg-[#005A2B] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 2: RESTAURANT SETTINGS ======================= */}
          {activeTab === 'restaurant' && (
            <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <UtensilsCrossed size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {isEnglish ? 'Restaurant & Dining Loyalty Program' : 'برنامج ولاء مطعم بنده العائلي (نظام الزيارات والوجبات)'}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {isEnglish ? 'Visits/Orders based loyalty card for free meals & desserts' : 'بطاقة زيارات ووجبات للحصول على أطباق تحلية ووجبات مجانية'}
                    </span>
                  </div>
                </div>

                {/* ON / OFF Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-700">
                    {config.restaurant.isEnabled ? (isEnglish ? 'Active' : 'مفعل') : (isEnglish ? 'Disabled' : 'معطل')}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateRestaurant('isEnabled', !config.restaurant.isEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      config.restaurant.isEnabled ? 'bg-[#005A2B] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Program Name AR */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">اسم البرنامج (بالعربية)</label>
                  <input
                    type="text"
                    value={config.restaurant.programNameAr}
                    onChange={(e) => updateRestaurant('programNameAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Program Name EN */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">Program Name (English)</label>
                  <input
                    type="text"
                    value={config.restaurant.programNameEn}
                    onChange={(e) => updateRestaurant('programNameEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:bg-white focus:border-[#005A2B] outline-none"
                  />
                </div>

                {/* Required Visits */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">عدد الزيارات أو الطلبات المطلوبة</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={config.restaurant.requiredVisits}
                    onChange={(e) => updateRestaurant('requiredVisits', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">يمكنك تغييرها في أي وقت (مثلاً 5 زيارات أو 3 زيارات)</span>
                </div>

                {/* Min Order Amount */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">الحد الأدنى لقيمة الفاتورة لاحتساب الزيارة (SAR)</label>
                  <input
                    type="number"
                    min={10}
                    value={config.restaurant.minimumOrderAmount}
                    onChange={(e) => updateRestaurant('minimumOrderAmount', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 font-mono"
                  />
                </div>

                {/* Reward Name AR */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">اسم المكافأة (بالعربية)</label>
                  <input
                    type="text"
                    value={config.restaurant.rewardNameAr}
                    onChange={(e) => updateRestaurant('rewardNameAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* Reward Name EN */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">Reward Name (English)</label>
                  <input
                    type="text"
                    value={config.restaurant.rewardNameEn}
                    onChange={(e) => updateRestaurant('rewardNameEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* Reward Description AR */}
                <div className="sm:col-span-2">
                  <label className="block font-black text-slate-700 mb-1">تفاصيل ووصف المكافأة</label>
                  <input
                    type="text"
                    value={config.restaurant.rewardDescriptionAr}
                    onChange={(e) => updateRestaurant('rewardDescriptionAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">نص زر البطاقة (بالعربية)</label>
                  <input
                    type="text"
                    value={config.restaurant.buttonTextAr}
                    onChange={(e) => updateRestaurant('buttonTextAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">Button Text (English)</label>
                  <input
                    type="text"
                    value={config.restaurant.buttonTextEn}
                    onChange={(e) => updateRestaurant('buttonTextEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 3: SUPERMARKET SETTINGS ======================= */}
          {activeTab === 'supermarket' && (
            <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#005A2B] flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {isEnglish ? 'Supermarket Points Program' : 'برنامج نقاط مكافآت السوبرماركت والهايبر (Points Engine)'}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {isEnglish ? 'Dynamic SAR-to-points engine and tiered cash reward vouchers' : 'محرك تحويل المشتريات إلى نقاط وكتالوج استبدال القسائم النقدية'}
                    </span>
                  </div>
                </div>

                {/* ON / OFF Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-700">
                    {config.supermarket.isEnabled ? (isEnglish ? 'Active' : 'مفعل') : (isEnglish ? 'Disabled' : 'معطل')}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateSupermarket('isEnabled', !config.supermarket.isEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      config.supermarket.isEnabled ? 'bg-[#005A2B] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Program Name AR */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">اسم برنامج النقاط (بالعربية)</label>
                  <input
                    type="text"
                    value={config.supermarket.programNameAr}
                    onChange={(e) => updateSupermarket('programNameAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* Program Name EN */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">Points Program Name (English)</label>
                  <input
                    type="text"
                    value={config.supermarket.programNameEn}
                    onChange={(e) => updateSupermarket('programNameEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* SAR Required Per Point */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">معدل احتساب النقاط (كم ريال = 1 نقطة)</label>
                  <input
                    type="number"
                    min={1}
                    value={config.supermarket.sarRequiredPerPoint}
                    onChange={(e) => updateSupermarket('sarRequiredPerPoint', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">مثال: 1 ريال = 1 نقطة (أو 10 ريال = 1 نقطة)</span>
                </div>

                {/* Welcome Bonus Points */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">نقاط ترحيبية فورية عند أول استبيان</label>
                  <input
                    type="number"
                    value={config.supermarket.welcomeBonusPoints}
                    onChange={(e) => updateSupermarket('welcomeBonusPoints', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 font-mono"
                  />
                </div>

                {/* Category Multipliers */}
                <div className="sm:col-span-2">
                  <label className="block font-black text-slate-700 mb-1">مضاعفات النقاط للأقسام الطازجة (Multipliers)</label>
                  <input
                    type="text"
                    value={config.supermarket.categoryMultipliersAr}
                    onChange={(e) => updateSupermarket('categoryMultipliersAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                {/* Button Text */}
                <div>
                  <label className="block font-black text-slate-700 mb-1">نص زر البطاقة (بالعربية)</label>
                  <input
                    type="text"
                    value={config.supermarket.buttonTextAr}
                    onChange={(e) => updateSupermarket('buttonTextAr', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">Button Text (English)</label>
                  <input
                    type="text"
                    value={config.supermarket.buttonTextEn}
                    onChange={(e) => updateSupermarket('buttonTextEn', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Reward Catalog Management for Supermarket */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-slate-800">كتالوج قسائم استبدال النقاط (Rewards Catalog)</h5>
                    <span className="text-[11px] text-slate-500">مثال: 500 نقطة = 5 ريال، 1000 نقطة = 10 ريال</span>
                  </div>
                </div>

                {/* Existing Catalog List */}
                <div className="space-y-2">
                  {(config.supermarket.catalog || []).map((cat) => (
                    <div
                      key={cat.id}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#005A2B] font-black font-mono flex items-center justify-center shrink-0">
                          {cat.rewardValueSAR}
                        </span>
                        <div>
                          <span className="font-black text-slate-800 block">
                            {cat.requiredPoints} نقطة ⟵ {cat.rewardNameAr}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {cat.descriptionAr}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCatalogItem(cat.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                        title="حذف القسيمة من الكتالوج"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new catalog item box */}
                <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs items-end">
                  <div>
                    <label className="block font-black text-slate-700 mb-1">النقاط المطلوبة</label>
                    <input
                      type="number"
                      value={newCatPoints}
                      onChange={(e) => setNewCatPoints(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-black text-slate-700 mb-1">قيمة الخصم (SAR)</label>
                    <input
                      type="number"
                      value={newCatSar}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setNewCatSar(val);
                        setNewCatNameAr(`قسيمة مشتريات ${val} ريال`);
                        setNewCatNameEn(`${val} SAR Voucher`);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-black text-slate-700 mb-1">اسم القسيمة</label>
                    <input
                      type="text"
                      value={newCatNameAr}
                      onChange={(e) => setNewCatNameAr(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCatalogItem}
                    className="bg-[#005A2B] hover:bg-[#004822] text-white py-1.5 px-3 rounded-xl font-black flex items-center justify-center gap-1 cursor-pointer shadow-2xs h-[34px]"
                  >
                    <Plus size={14} />
                    <span>إضافة للكتالوج</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 4: REWARD MANAGEMENT ======================= */}
          {activeTab === 'rewards' && (
            <div className="bg-white rounded-[32px] border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Gift size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {isEnglish ? 'Master Rewards & Gifts Management' : 'إدارة ومراقبة كافة مكافآت القطاعات (Rewards Manager)'}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {isEnglish ? 'Add, edit, deactivate, or customize rewards for Café, Restaurant, and Supermarket' : 'إضافة، تعديل، تفعيل أو إلغاء تنشيط المكافآت لجميع الفروع والقطاعات'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingReward({
                      id: `rew-${Date.now()}`,
                      sector: 'cafe',
                      nameAr: 'مكافأة جديدة',
                      nameEn: 'New Reward',
                      descriptionAr: 'وصف المكافأة وشروط استحقاقها',
                      descriptionEn: 'Reward description and terms',
                      requiredRequirement: 8,
                      requirementType: 'stamps',
                      rewardType: 'custom_item',
                      eligibleCategories: ['كافة الأقسام'],
                      expirationDays: 30,
                      isActive: true
                    });
                    setIsRewardModalOpen(true);
                  }}
                  className="bg-[#005A2B] hover:bg-[#004822] text-white px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus size={14} />
                  <span>{isEnglish ? 'Add Reward' : 'إضافة مكافأة جديدة'}</span>
                </button>
              </div>

              {/* Master Rewards Table */}
              <div className="space-y-2.5">
                {(config.rewards || []).map((reward) => (
                  <div
                    key={reward.id}
                    className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        reward.sector === 'cafe' 
                          ? 'bg-emerald-100 text-[#005A2B]' 
                          : reward.sector === 'restaurant'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}>
                        {reward.sector === 'cafe' && <Coffee size={18} />}
                        {reward.sector === 'restaurant' && <UtensilsCrossed size={18} />}
                        {reward.sector === 'supermarket' && <ShoppingBag size={18} />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">
                            {isEnglish ? reward.nameEn : reward.nameAr}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {reward.sector === 'cafe' ? 'المقهى ☕' : reward.sector === 'restaurant' ? 'المطعم 🍽️' : 'الهايبرماركت 🛒'}
                          </span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-[#005A2B]">
                            {reward.requiredRequirement} {reward.requirementType === 'stamps' ? 'أختام' : reward.requirementType === 'visits' ? 'زيارات' : 'نقطة'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isEnglish ? reward.descriptionEn : reward.descriptionAr}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Active toggle, edit, delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleToggleRewardStatus(reward.id)}
                        className={`text-[11px] font-black px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                          reward.isActive
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-slate-200 text-slate-500 border-slate-300'
                        }`}
                      >
                        {reward.isActive ? (isEnglish ? 'Active' : 'نشطة') : (isEnglish ? 'Inactive' : 'معطلة')}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingReward(reward);
                          setIsRewardModalOpen(true);
                        }}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 cursor-pointer"
                        title="تعديل المكافأة"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteMasterReward(reward.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                        title="حذف المكافأة"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Customer End-Screen Mobile Preview (Span 5) */}
        <div className="lg:col-span-5 sticky top-6 space-y-3">
          <div className="bg-slate-900 text-white rounded-[32px] p-5 shadow-lg border border-slate-800">
            
            {/* Live Preview Header Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-emerald-400" />
                <span className="text-xs font-black tracking-wide">
                  {isEnglish ? 'Customer Survey End Preview' : 'معاينة تجربة العميل المباشرة'}
                </span>
              </div>

              {/* Language Switcher for Preview */}
              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-xl text-[11px]">
                <button
                  type="button"
                  onClick={() => setPreviewLanguage('ar')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    previewLanguage === 'ar' ? 'bg-[#005A2B] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  عربي
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLanguage('en')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    previewLanguage === 'en' ? 'bg-[#005A2B] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              {isEnglish 
                ? 'This is the exact loyalty card and stamps grid customers will see at the end of the survey:' 
                : 'هذا هو المظهر الحقيقي لبطاقة الولاء والأختام التي ستظهر للعميل فور إكمال الاستبيان:'}
            </p>

            {/* Simulated Customer End Screen (Mobile Frame) */}
            <div className="bg-slate-50 rounded-[28px] p-4 border-4 border-slate-800 shadow-inner text-slate-800 min-h-[380px]">
              
              {/* Micro Survey End simulation header */}
              <div className="text-center space-y-1 mb-2">
                <div className="inline-block bg-emerald-100 text-[#005A2B] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  {previewLanguage === 'en' ? 'Valued Customer' : 'عميلنا العزيز والمميز'}
                </div>
                <div className="text-base font-black text-[#005A2B] flex items-center justify-center gap-1">
                  <span>{previewLanguage === 'en' ? 'Sara Al-Ahmad' : 'يلايسس'}</span>
                  <span>😊</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold">
                  {previewLanguage === 'en' ? 'Voucher Confirmed Successfully 🎁✨' : 'تم تأكيد هديتك وقسيمة الخصم بنجاح 🎁✨'}
                </div>
              </div>

              {/* The Live Loyalty Card Component rendered with the current draft config! */}
              <CustomerLoyaltyCardsEndSection
                customerName={previewLanguage === 'en' ? 'Sara Al-Ahmad' : 'يلايسس'}
                isEnglish={previewLanguage === 'en'}
                activeBusinessType={previewSector}
                configOverride={config}
              />

              {/* Back to Home Button simulation */}
              <div className="mt-3">
                <div className="w-full bg-[#E34F26] text-white py-2.5 rounded-xl text-xs font-black text-center shadow-xs">
                  {previewLanguage === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
                </div>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-[10px] text-slate-400 font-medium">
                ⚡ {isEnglish ? 'Real-time sync: changes reflect instantly without code deploy' : 'تحديث فوري: تظهر التعديلات تلقائياً للمتسوقين دون الحاجة لكتابة كود'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Edit/Add Master Reward Modal */}
      <AnimatePresence>
        {isRewardModalOpen && editingReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white rounded-[32px] p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-base font-black text-slate-900">
                  {isEnglish ? 'Configure Reward Details' : 'تخصيص بيانات وشروط المكافأة'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsRewardModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-black text-slate-700 mb-1">القطاع التابع له</label>
                  <select
                    value={editingReward.sector}
                    onChange={(e) => setEditingReward({ ...editingReward, sector: e.target.value as SectorType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="cafe">☕ المقهى (Café)</option>
                    <option value="restaurant">🍽️ المطعم (Restaurant)</option>
                    <option value="supermarket">🛒 السوبرماركت (Supermarket)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">اسم المكافأة (بالعربية)</label>
                  <input
                    type="text"
                    value={editingReward.nameAr}
                    onChange={(e) => setEditingReward({ ...editingReward, nameAr: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">Reward Name (English)</label>
                  <input
                    type="text"
                    value={editingReward.nameEn}
                    onChange={(e) => setEditingReward({ ...editingReward, nameEn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-black text-slate-700 mb-1">المتطلب للاستحقاق</label>
                    <input
                      type="number"
                      value={editingReward.requiredRequirement}
                      onChange={(e) => setEditingReward({ ...editingReward, requiredRequirement: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-black text-slate-700 mb-1">نوع المعيار</label>
                    <select
                      value={editingReward.requirementType}
                      onChange={(e) => setEditingReward({ ...editingReward, requirementType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    >
                      <option value="stamps">أختام (Stamps)</option>
                      <option value="visits">زيارات (Visits)</option>
                      <option value="points">نقاط (Points)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">صلاحية الاستلام (أيام)</label>
                  <input
                    type="number"
                    value={editingReward.expirationDays}
                    onChange={(e) => setEditingReward({ ...editingReward, expirationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSaveMasterReward(editingReward)}
                  className="flex-1 bg-[#005A2B] hover:bg-[#004822] text-white py-2.5 rounded-xl font-black text-xs cursor-pointer shadow-xs"
                >
                  {isEnglish ? 'Save Reward' : 'حفظ المكافأة'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRewardModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
                >
                  {isEnglish ? 'Cancel' : 'إلغاء'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
