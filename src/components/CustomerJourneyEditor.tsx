import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Smartphone, 
  CheckCircle2, 
  ExternalLink, 
  RotateCcw, 
  Eye, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { CustomerJourneyConfig } from '../types';
import { 
  SurveyCustomizerSettings, 
  QuestionTemplateItem, 
  SurveyIdentitySettings,
  SurveyResponseRecord
} from '../types/surveyPlatform';
import { 
  getStoredSurveySettings, 
  saveStoredSurveySettings, 
  DEFAULT_QUESTION_TEMPLATES,
  CORE_JOURNEY_PREVIEW_IDS
} from '../utils/surveyDefaults';
import { OperationalQuestionTemplatesTab } from './dashboard/survey/OperationalQuestionTemplatesTab';
import { CustomerExperienceLivePhone } from './dashboard/survey/CustomerExperienceLivePhone';
import { MobileGuestSimulatorModal } from './dashboard/survey/MobileGuestSimulatorModal';

interface CustomerJourneyEditorProps {
  config: CustomerJourneyConfig;
  onSaveConfig: (updated: CustomerJourneyConfig) => void;
  onResetConfig: () => void;
  onPreviewCustomerJourney: () => void;
  onClose?: () => void;
  isEnglish?: boolean;
  currentLangCode?: string;
  initialTab?: string;
}

export const CustomerJourneyEditor: React.FC<CustomerJourneyEditorProps> = ({
  config,
  onSaveConfig,
  onResetConfig,
  onPreviewCustomerJourney,
  onClose,
  isEnglish = false
}) => {
  // Load settings from persistent storage or defaults
  const [settings, setSettings] = useState<SurveyCustomizerSettings>(() => {
    const loaded = getStoredSurveySettings();
    // Ensure questionTemplates has at least the default items if empty
    if (!loaded.questionTemplates || loaded.questionTemplates.length === 0) {
      loaded.questionTemplates = DEFAULT_QUESTION_TEMPLATES;
    }
    return loaded;
  });

  // Selected active template for bi-directional linking with the live customer phone
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('qt_language_preference');

  // Simulator state
  const [simulatorTableNumber, setSimulatorTableNumber] = useState<string>(() => {
    return settings.tables?.[0]?.number || '01';
  });

  // Full-screen mobile modal
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);

  // Toggle mobile pane visibility for responsive wide-mode editing
  const [showLivePhone, setShowLivePhone] = useState(true);

  // Toast notification notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Update question templates handler
  const handleUpdateQuestionTemplates = useCallback((newTemplates: QuestionTemplateItem[]) => {
    setSettings(prev => {
      const activeTemplateIds = newTemplates.filter(t => t.isEnabled).map(t => t.id);

      const updated: SurveyCustomizerSettings = {
        ...prev,
        questionTemplates: newTemplates,
        screenOrder: activeTemplateIds
      };

      // Persist to local storage immediately
      saveStoredSurveySettings(updated);
      return updated;
    });

    // Also sync the CustomerJourneyConfig if provided
    if (onSaveConfig && config) {
      const welcome = newTemplates.find(t => t.id === 'qt_welcome');
      const reward = newTemplates.find(t => t.id === 'qt_reward_preference');
      const speed = newTemplates.find(t => t.id === 'qt_speed_game_challenge');
      const voucher = newTemplates.find(t => t.id === 'qt_voucher_gift');
      const shopping = newTemplates.find(t => t.id === 'qt_daily_shopping_needs');
      const feedback = newTemplates.find(t => t.id === 'qt_shopping_overall_eval');

      onSaveConfig({
        ...config,
        welcomeTitleAr: welcome?.titleAr || config.welcomeTitleAr,
        welcomeSubtitleAr: welcome?.subtitleAr || config.welcomeSubtitleAr,
        preferenceQuestionTitle: reward?.titleAr || config.preferenceQuestionTitle,
        preferenceQuestionSubtitle: reward?.subtitleAr || config.preferenceQuestionSubtitle,
        challengeTitle: speed?.titleAr || config.challengeTitle,
        challengeSubtitle: speed?.subtitleAr || config.challengeSubtitle,
        voucherDiscountTitle: voucher?.titleAr || config.voucherDiscountTitle,
        voucherDiscountSubtitle: voucher?.subtitleAr || config.voucherDiscountSubtitle,
        shoppingTitle: shopping?.titleAr || config.shoppingTitle,
        shoppingSubtitle: shopping?.subtitleAr || config.shoppingSubtitle,
        feedbackTitle: feedback?.titleAr || config.feedbackTitle,
        feedbackSubtitle: feedback?.subtitleAr || config.feedbackSubtitle,
      });
    }

    showToast(isEnglish ? 'Journey sequence and live simulator updated!' : 'تم تحديث ترتيب مسار التجربة وشاشة الجوال فوراً! ✨');
  }, [config, onSaveConfig, isEnglish, showToast]);

  // Update screen order from simulator
  const handleUpdateScreenOrder = useCallback((order: string[]) => {
    setSettings(prev => {
      const currentTemplates = prev.questionTemplates || [];
      const enabledMap = new Map<string, QuestionTemplateItem>();
      const disabledList: QuestionTemplateItem[] = [];

      currentTemplates.forEach(t => {
        if (t.isEnabled) {
          enabledMap.set(t.id, t);
        } else {
          disabledList.push(t);
        }
      });

      const reorderedEnabled: QuestionTemplateItem[] = [];
      order.forEach(id => {
        const cleanId = id.replace(/^template_/, '');
        const found = enabledMap.get(cleanId) || enabledMap.get(id);
        if (found) {
          reorderedEnabled.push(found);
          enabledMap.delete(cleanId);
          enabledMap.delete(id);
        }
      });

      enabledMap.forEach(t => reorderedEnabled.push(t));
      const updatedTemplates = [...reorderedEnabled, ...disabledList];

      const updated: SurveyCustomizerSettings = {
        ...prev,
        questionTemplates: updatedTemplates,
        screenOrder: reorderedEnabled.map(t => t.id)
      };
      saveStoredSurveySettings(updated);
      return updated;
    });
    showToast(isEnglish ? 'Screen sequence updated!' : 'تم تحديث ترتيب مسار الخطوات والشاشات بنجاح! ✓');
  }, [isEnglish, showToast]);

  // Update identity settings
  const handleUpdateIdentity = useCallback((identity: SurveyIdentitySettings) => {
    setSettings(prev => {
      const updated: SurveyCustomizerSettings = {
        ...prev,
        identitySettings: identity,
        branding: {
          ...prev.branding,
          restaurantName: identity.restaurantNameAr,
          restaurantNameEn: identity.restaurantNameEn,
          logoUrl: identity.logoUrl,
          coverBannerUrl: identity.coverUrl
        }
      };
      saveStoredSurveySettings(updated);
      return updated;
    });
  }, []);

  // Handle new response submission in simulator modal
  const handleNewSimulatorResponse = useCallback((newRecord: SurveyResponseRecord) => {
    showToast(isEnglish ? 'Test response submitted from simulator!' : 'تم إرسال تجربة استبيان تجريبية من الجوال بنجاح! 📱');
  }, [isEnglish, showToast]);

  // Reset journey to the 8 unified live customer journey preview templates
  const handleResetToCoreTemplates = useCallback(() => {
    setSettings(prev => {
      const coreIds = CORE_JOURNEY_PREVIEW_IDS;
      const currentTemplates = prev.questionTemplates && prev.questionTemplates.length > 0 
        ? prev.questionTemplates 
        : DEFAULT_QUESTION_TEMPLATES;
      
      const updatedTemplates = currentTemplates.map(t => ({
        ...t,
        isEnabled: coreIds.includes(t.id)
      }));

      // Ensure the core templates come first in exact order
      updatedTemplates.sort((a, b) => {
        const aIdx = coreIds.indexOf(a.id);
        const bIdx = coreIds.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return 0;
      });

      const updated: SurveyCustomizerSettings = {
        ...prev,
        questionTemplates: updatedTemplates,
        screenOrder: coreIds
      };
      saveStoredSurveySettings(updated);
      return updated;
    });
    showToast(isEnglish ? 'Synchronized with all 8 live journey templates!' : 'تمت مزامنة مسار خطوات التجربة بالكامل مع قوالب المعاينة الحية (8 مراحل)! ✨');
  }, [isEnglish, showToast]);

  const activeTemplates = useMemo(() => {
    return (settings.questionTemplates || []).filter(t => t.isEnabled);
  }, [settings.questionTemplates]);

  const activeTemplatesCount = activeTemplates.length;

  return (
    <div className="w-full space-y-6 select-none" dir={isEnglish ? 'ltr' : 'rtl'}>
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#005A2B] text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-emerald-400 flex items-center gap-3 font-black text-sm"
          >
            <CheckCircle2 size={20} className="text-emerald-300 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Header Bar */}
      <div className="bg-white rounded-[28px] p-5 md:p-6 border border-slate-200/80 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#005A2B] to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 shrink-0">
            <Layers size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {isEnglish ? 'Customer Journey Stages & Interactive Question Templates' : 'مسار خطوات تجربة العميل وقوالب الأسئلة التفاعلية'}
              </h2>
              <span className="bg-emerald-100 text-[#005A2B] text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{isEnglish ? `${activeTemplatesCount} Active Stages` : `${activeTemplatesCount} مراحل مفعلة بالمسار ✨`}</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
              {isEnglish 
                ? 'Order journey stages directly with mouse drag or move buttons, toggle templates on/off, and watch live updates directly on the mobile screen.'
                : 'نظام قوالب الأسئلة التفاعلية الجاهزة للتفعيل: رتب مراحل التجربة بالماوس أو أزرار التقديم والتأخير، وتابع التغيير فوراً على شاشة الجوال التفاعلية.'}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto justify-end">
          {/* Toggle Live Mobile Phone Simulator */}
          <button
            type="button"
            id="journey-toggle-mobile-pane-btn"
            onClick={() => setShowLivePhone(prev => !prev)}
            className={`px-3.5 py-2 rounded-xl font-black text-xs flex items-center gap-2 border transition-all cursor-pointer ${
              showLivePhone 
                ? 'bg-emerald-50 text-[#005A2B] border-emerald-200 hover:bg-emerald-100' 
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
            title={showLivePhone ? (isEnglish ? 'Hide Mobile Screen' : 'إخفاء شاشة الجوال') : (isEnglish ? 'Show Mobile Screen' : 'إظهار شاشة الجوال')}
          >
            <Smartphone size={15} />
            <span>{showLivePhone ? (isEnglish ? 'Mobile Preview Active' : 'شاشة الجوال مفعلة 📱') : (isEnglish ? 'Show Mobile Preview' : 'عرض شاشة الجوال 📱')}</span>
          </button>

          {/* Open Full Mobile Modal */}
          <button
            type="button"
            id="journey-open-mobile-modal-btn"
            onClick={() => setIsSimulatorModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hover:scale-105"
            title={isEnglish ? 'Open Full Mobile Simulator' : 'فتح محاكي الجوال في نافذة كاملة'}
          >
            <Maximize2 size={14} />
            <span>{isEnglish ? 'Full Simulator 📱' : 'محاكي الجوال الكامل 📱'}</span>
          </button>

          {/* Full Customer Experience Preview */}
          <button
            type="button"
            id="journey-preview-customer-experience-btn"
            onClick={onPreviewCustomerJourney}
            className="bg-[#005A2B] hover:bg-[#004722] text-white px-5 py-2 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-900/20 cursor-pointer hover:scale-105 active:scale-95"
            title={isEnglish ? 'Preview Full Customer Journey Flow' : 'معاينة تجربة العميل المباشرة الكاملة'}
          >
            <Sparkles size={15} className="text-amber-300" />
            <span>{isEnglish ? 'Live Customer Flow' : 'معاينة تجربة العميل 🚀'}</span>
            <ExternalLink size={13} className="text-emerald-200" />
          </button>
        </div>
      </div>

      {/* Live Preview Active Templates Status Bar (توضيح القوالب المباشرة المعروضة في المعاينة) */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-4 shadow-md border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                {isEnglish ? 'Live in Simulator & Preview:' : 'القوالب المعروضة حالياً في معاينة تجربة العميل:'}
              </span>
              <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                {isEnglish ? `${activeTemplatesCount} Active Screen${activeTemplatesCount !== 1 ? 's' : ''}` : `${activeTemplatesCount} قوالب مباشرة في المعاينة`}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {activeTemplates.map((t, idx) => (
                <span 
                  key={t.id}
                  className="bg-white/10 hover:bg-white/15 text-white text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <span className="text-amber-300 font-mono text-[10px]">{idx + 1}.</span>
                  <span>{t.options[0]?.emoji || '✨'}</span>
                  <span className="line-clamp-1">{t.categoryBadge.replace(/^[✨\s]+|[✨\s]+$/g, '').trim() || t.titleAr.slice(0, 20)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          id="journey-sync-core-templates-btn"
          onClick={handleResetToCoreTemplates}
          className="self-end md:self-auto shrink-0 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-sm cursor-pointer border border-emerald-400/30"
          title={isEnglish ? 'Restore All 8 Live Customer Journey Templates' : 'مزامنة وتوحيد جميع قوالب تجربة العميل (8 خطوات متكاملة)'}
        >
          <RotateCcw size={13} />
          <span>{isEnglish ? 'Sync 8 Journey Steps 🔄' : 'مزامنة مسار خطوات المعاينة (8 خطوات) 🔄'}</span>
        </button>
      </div>

      {/* Main Dual-Column Workspace: Templates Editor + Live Mobile Simulator Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Column: The Exact Operational Question Templates Tab */}
        <div className={showLivePhone ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'}>
          <OperationalQuestionTemplatesTab
            templates={settings.questionTemplates || DEFAULT_QUESTION_TEMPLATES}
            onChange={handleUpdateQuestionTemplates}
            onOpenMobilePreview={() => setIsSimulatorModalOpen(true)}
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={setSelectedTemplateId}
            isWideMode={!showLivePhone}
            isEnglish={isEnglish}
          />
        </div>

        {/* Right Column: Unified Live Customer Experience Phone (معاينة تجربة العميل المباشرة الموحدة مع المسار) */}
        {showLivePhone && (
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <CustomerExperienceLivePhone
              config={config}
              settings={settings}
              activeTemplateId={selectedTemplateId}
              onSelectTemplateId={setSelectedTemplateId}
              onOpenFullScreen={onPreviewCustomerJourney}
              isEnglish={isEnglish}
            />
          </div>
        )}
      </div>

      {/* Full-Screen Interactive Guest Mobile Simulator Modal */}
      <MobileGuestSimulatorModal
        isOpen={isSimulatorModalOpen}
        onClose={() => setIsSimulatorModalOpen(false)}
        settings={settings}
        activeTableNumber={simulatorTableNumber}
        onTableChange={(tableNum) => setSimulatorTableNumber(tableNum)}
        onSubmitNewResponse={handleNewSimulatorResponse}
        onUpdateIdentity={handleUpdateIdentity}
        isEnglish={isEnglish}
      />
    </div>
  );
};
