import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  Sparkles, 
  HelpCircle, 
  UtensilsCrossed, 
  Star, 
  Tag, 
  Gift, 
  Settings2,
  QrCode,
  TrendingUp,
  Save
} from 'lucide-react';
import { 
  SurveyCustomizerSettings, 
  SurveyResponseRecord,
  ImpressionCardItem,
  QuestionTemplateItem,
  SurveyMenuItem,
  EvaluationPillarItem,
  QuickTagItem,
  LoyaltyPrizeItem,
  SurveyIdentitySettings,
  SurveyBrandingConfig,
  SurveyThemeConfig,
  SurveyTableInfo
} from '../../types/surveyPlatform';
import { 
  getStoredSurveySettings, 
  saveStoredSurveySettings, 
  getStoredSurveyResponses, 
  saveStoredSurveyResponses,
  DEFAULT_SURVEY_SETTINGS,
  DEFAULT_IMPRESSION_CARDS,
  DEFAULT_QUESTION_TEMPLATES,
  DEFAULT_MENU_ITEMS,
  DEFAULT_EVALUATION_PILLARS,
  DEFAULT_QUICK_TAGS,
  DEFAULT_LOYALTY_PRIZES,
  DEFAULT_IDENTITY_SETTINGS
} from '../../utils/surveyDefaults';

import { OperationalImpressionCardsTab } from './survey/OperationalImpressionCardsTab';
import { OperationalQuestionTemplatesTab } from './survey/OperationalQuestionTemplatesTab';
import { OperationalMenuItemsTab } from './survey/OperationalMenuItemsTab';
import { OperationalEvaluationPillarsTab } from './survey/OperationalEvaluationPillarsTab';
import { OperationalQuickTagsTab } from './survey/OperationalQuickTagsTab';
import { OperationalLoyaltyPrizesTab } from './survey/OperationalLoyaltyPrizesTab';
import { OperationalIdentityTab } from './survey/OperationalIdentityTab';
import { TableQrManager } from './survey/TableQrManager';
import { SurveyAnalyticsFeedbackLoop } from './survey/SurveyAnalyticsFeedbackLoop';
import { MobileGuestSimulatorModal } from './survey/MobileGuestSimulatorModal';
import { LiveGuestSimulatorPane } from './survey/LiveGuestSimulatorPane';

interface SurveyCustomizerPlatformProps {
  isEnglish?: boolean;
  currentLangCode?: string;
}

type OperationalTabId = 
  | 'impression_cards' 
  | 'question_templates' 
  | 'menu_items' 
  | 'evaluation_pillars' 
  | 'quick_tags' 
  | 'loyalty_prizes' 
  | 'identity'
  | 'tables_qr'
  | 'analytics';

export const SurveyCustomizerPlatform: React.FC<SurveyCustomizerPlatformProps> = ({
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [settings, setSettings] = useState<SurveyCustomizerSettings>(getStoredSurveySettings);
  const [responses, setResponses] = useState<SurveyResponseRecord[]>(getStoredSurveyResponses);
  const [activeTab, setActiveTab] = useState<OperationalTabId>('impression_cards');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorTableNumber, setSimulatorTableNumber] = useState('04');
  const [showLivePane, setShowLivePane] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  // Sync state whenever settings change
  const updateSettingsAndPersist = (updater: (prev: SurveyCustomizerSettings) => SurveyCustomizerSettings) => {
    setSettings((prev) => {
      const next = updater(prev);
      saveStoredSurveySettings(next);
      return next;
    });
    showSaveNotification();
  };

  const showSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleUpdateImpressionCards = (cards: ImpressionCardItem[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, impressionCards: cards }));
  };

  const handleUpdateQuestionTemplates = (templates: QuestionTemplateItem[]) => {
    updateSettingsAndPersist(prev => {
      const activeTemplateIds = templates.filter(t => t.isEnabled).map(t => `template_${t.id}`);
      const currentOrder = prev.screenOrder || [];
      const nonTemplateKeys = currentOrder.filter(k => !k.startsWith('template_'));
      
      // Preserve impression first, then active question templates in their exact order, then other screens
      const otherScreens = nonTemplateKeys.filter(k => k !== 'impression');
      const fallbackOthers = ['pillars', 'dishes', 'prizes'].filter(k => !otherScreens.includes(k));
      
      const newScreenOrder = [
        'impression',
        ...activeTemplateIds,
        ...otherScreens,
        ...fallbackOthers
      ];

      return {
        ...prev,
        questionTemplates: templates,
        screenOrder: newScreenOrder
      };
    });
  };

  const handleUpdateMenuItems = (items: SurveyMenuItem[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, menuItems: items }));
  };

  const handleUpdateEvaluationPillars = (pillars: EvaluationPillarItem[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, evaluationPillars: pillars }));
  };

  const handleUpdateQuickTags = (tags: QuickTagItem[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, quickTags: tags }));
  };

  const handleUpdateLoyaltyPrizes = (prizes: LoyaltyPrizeItem[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, loyaltyPrizes: prizes }));
  };

  const handleUpdateIdentity = (identity: SurveyIdentitySettings) => {
    updateSettingsAndPersist(prev => ({
      ...prev,
      identitySettings: identity,
      branding: {
        ...prev.branding,
        restaurantName: identity.restaurantNameAr,
        restaurantNameEn: identity.restaurantNameEn,
        logoUrl: identity.logoUrl,
        coverBannerUrl: identity.coverUrl
      }
    }));
  };

  const handleUpdateTables = (tables: SurveyTableInfo[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, tables }));
  };

  const handleUpdateScreenOrder = (screenOrder: string[]) => {
    updateSettingsAndPersist(prev => ({ ...prev, screenOrder }));
  };

  const handleToggleResolveResponse = (id: string) => {
    setResponses(prev => {
      const next = prev.map(r => r.id === id ? { ...r, resolved: !r.resolved } : r);
      saveStoredSurveyResponses(next);
      return next;
    });
  };

  const handleAddNewResponseFromSimulator = (newRecord: SurveyResponseRecord) => {
    setResponses(prev => {
      const next = [newRecord, ...prev];
      saveStoredSurveyResponses(next);
      return next;
    });
  };

  const handleResetDefaults = () => {
    if (confirm(isEnglish ? 'Reset all survey customizer configurations to default?' : 'هل تود استعادة كافة الإعدادات والبطاقات الافتراضية؟')) {
      setSettings(DEFAULT_SURVEY_SETTINGS);
      saveStoredSurveySettings(DEFAULT_SURVEY_SETTINGS);
      showSaveNotification();
    }
  };

  const impressionCount = settings.impressionCards?.length || DEFAULT_IMPRESSION_CARDS.length;
  const templatesCount = settings.questionTemplates?.length || DEFAULT_QUESTION_TEMPLATES.length;
  const menuItemsCount = settings.menuItems?.length || DEFAULT_MENU_ITEMS.length;
  const pillarsCount = settings.evaluationPillars?.length || DEFAULT_EVALUATION_PILLARS.length;
  const quickTagsCount = settings.quickTags?.length || DEFAULT_QUICK_TAGS.length;
  const prizesCount = settings.loyaltyPrizes?.length || DEFAULT_LOYALTY_PRIZES.length;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Top Banner (Screenshot 1 & Header) */}
      <div className="bg-[#0c1527] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
        {/* Ambient background glows */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Title & Badge */}
          <div className="flex items-start gap-3.5">
            {/* Orange Squircle with Sliders Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shrink-0 shadow-md shadow-amber-500/20">
              <Sliders size={22} strokeWidth={2.5} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {isEnglish ? 'Survey Management & Customization' : 'قسم إدارة وتخصيص الاستبيان'}
                </h2>
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-[10px] px-2.5 py-0.5 rounded-lg">
                  {isEnglish ? 'Operational Menus - Edit, Add, Delete' : 'القوائم التشغيلية - تعديل وإضافة وحذف'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                {isEnglish
                  ? 'Complete administrative control over impression cards, menu items, quality standards, rewards, and photo uploads/removals.'
                  : 'تحكم إداري كامل في بطاقات التقييم، أصناف المنيو، معايير الجودة، الهدايا، ورفع وحذف الصور'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setShowLivePane(prev => !prev)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95 border ${
                showLivePane
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/50 shadow-emerald-900/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <Smartphone size={16} />
              <span>
                {showLivePane 
                  ? (isEnglish ? 'Live Preview Pane Active 🟢' : 'شاشة المعاينة المباشرة نشطة 🟢')
                  : (isEnglish ? 'Show Live Preview Pane 📱' : 'إظهار شاشة المعاينة المباشرة 📱')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSimulatorTableNumber('04');
                setIsSimulatorOpen(true);
              }}
              className="px-4 py-2.5 bg-[#1d6eed] hover:bg-[#165bc7] text-white rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <span>{isEnglish ? 'Fullscreen Simulator 🔍' : 'محاكي ملء الشاشة 🔍'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-2.5 bg-[#131f37] hover:bg-[#1a2b4c] text-slate-300 hover:text-white rounded-xl font-bold text-xs border border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isEnglish ? 'Reset to Defaults' : 'استعادة الافتراضي'}
            >
              <RotateCcw size={15} />
              <span>{isEnglish ? 'Defaults 🔄' : 'استعادة الافتراضي 🔄'}</span>
            </button>
          </div>
        </div>

        {/* Save Toast */}
        {saveToast && (
          <div className="absolute bottom-3 left-6 z-20 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 size={14} />
            <span>{isEnglish ? 'Changes saved!' : 'تم حفظ التعديلات بنجاح!'}</span>
          </div>
        )}
      </div>

      {/* The 7 Horizontal Tabs (Screenshots 1-10) + Secondary Utility Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {/* Tab 1: بطاقات الانطباع */}
          <button
            type="button"
            onClick={() => setActiveTab('impression_cards')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'impression_cards'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles size={14} className={activeTab === 'impression_cards' ? 'text-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? `Impression Cards (${impressionCount})` : `بطاقات الانطباع (${impressionCount} بطاقات) ✨`}</span>
          </button>

          {/* Tab 2: قوالب الأسئلة التفاعلية */}
          <button
            type="button"
            onClick={() => setActiveTab('question_templates')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'question_templates'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle size={14} className={activeTab === 'question_templates' ? 'text-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? 'Interactive Questions (Ready) ❔' : 'قوالب الأسئلة التفاعلية (جاهزة للتفعيل) ❔'}</span>
          </button>

          {/* Tab 3: أصناف وتجارب المنيو */}
          <button
            type="button"
            onClick={() => setActiveTab('menu_items')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'menu_items'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UtensilsCrossed size={14} className={activeTab === 'menu_items' ? 'text-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? `Menu Dishes (${menuItemsCount})` : `أصناف وتجارب المنيو (رفع وحذف الصور) 🍴 ${menuItemsCount}`}</span>
          </button>

          {/* Tab 4: محاور التقييم */}
          <button
            type="button"
            onClick={() => setActiveTab('evaluation_pillars')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'evaluation_pillars'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Star size={14} className={activeTab === 'evaluation_pillars' ? 'text-amber-400 fill-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? `Evaluation Pillars (${pillarsCount})` : `محاور التقييم (الخدمة والطعام) ⭐ ${pillarsCount}`}</span>
          </button>

          {/* Tab 5: الوسوم السريعة */}
          <button
            type="button"
            onClick={() => setActiveTab('quick_tags')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'quick_tags'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Tag size={14} className={activeTab === 'quick_tags' ? 'text-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? `Quick Tags (${quickTagsCount})` : `الوسوم السريعة 🏷️ ${quickTagsCount}`}</span>
          </button>

          {/* Tab 6: صندوق الهدايا والولاء */}
          <button
            type="button"
            onClick={() => setActiveTab('loyalty_prizes')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'loyalty_prizes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Gift size={14} className={activeTab === 'loyalty_prizes' ? 'text-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? `Gifts & Loyalty (${prizesCount})` : `صندوق الهدايا والولاء 🎁 ${prizesCount}`}</span>
          </button>

          {/* Tab 7: الهوية والشعار والأسئلة */}
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`min-w-fit px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'identity'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Settings2 size={14} className={activeTab === 'identity' ? 'text-amber-400' : 'text-slate-400'} />
            <span>{isEnglish ? 'Identity, Logo & Titles' : 'الهوية والشعار والأسئلة ⚙️'}</span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 mx-1 shrink-0" />

          {/* Tab 8: أكواد QR للطاولات */}
          <button
            type="button"
            onClick={() => setActiveTab('tables_qr')}
            className={`min-w-fit px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'tables_qr'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70'
            }`}
          >
            <QrCode size={14} />
            <span>{isEnglish ? 'Tables Smart QR' : 'أكواد QR للطاولات 📱'}</span>
          </button>

          {/* Tab 9: التحليلات وملاحظات الضيوف */}
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`min-w-fit px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-blue-800 bg-blue-50/70 hover:bg-blue-100/70'
            }`}
          >
            <TrendingUp size={14} />
            <span>{isEnglish ? 'Feedback & Analytics' : 'تحليلات ورأي الضيوف 📊'}</span>
            {responses.some(r => r.isFlaggedNegative && !r.resolved) && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Content Display & Live Guest Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Cards View */}
        <div className={showLivePane ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'}>
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs min-h-[450px]">
            {activeTab === 'impression_cards' && (
              <OperationalImpressionCardsTab
                cards={settings.impressionCards || DEFAULT_IMPRESSION_CARDS}
                onChange={handleUpdateImpressionCards}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'question_templates' && (
              <OperationalQuestionTemplatesTab
                templates={settings.questionTemplates || DEFAULT_QUESTION_TEMPLATES}
                onChange={handleUpdateQuestionTemplates}
                onOpenMobilePreview={() => {
                  setSimulatorTableNumber('04');
                  setIsSimulatorOpen(true);
                }}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'menu_items' && (
              <OperationalMenuItemsTab
                items={settings.menuItems || DEFAULT_MENU_ITEMS}
                onChange={handleUpdateMenuItems}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'evaluation_pillars' && (
              <OperationalEvaluationPillarsTab
                pillars={settings.evaluationPillars || DEFAULT_EVALUATION_PILLARS}
                onChange={handleUpdateEvaluationPillars}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'quick_tags' && (
              <OperationalQuickTagsTab
                tags={settings.quickTags || DEFAULT_QUICK_TAGS}
                onChange={handleUpdateQuickTags}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'loyalty_prizes' && (
              <OperationalLoyaltyPrizesTab
                prizes={settings.loyaltyPrizes || DEFAULT_LOYALTY_PRIZES}
                onChange={handleUpdateLoyaltyPrizes}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'identity' && (
              <OperationalIdentityTab
                identity={settings.identitySettings || DEFAULT_IDENTITY_SETTINGS}
                onChange={handleUpdateIdentity}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'tables_qr' && (
              <TableQrManager
                tables={settings.tables}
                branding={settings.branding}
                onUpdateTables={handleUpdateTables}
                onPreviewTableGuest={(tblNum) => {
                  setSimulatorTableNumber(tblNum);
                  setIsSimulatorOpen(true);
                }}
                isEnglish={isEnglish}
              />
            )}

            {activeTab === 'analytics' && (
              <SurveyAnalyticsFeedbackLoop
                responses={responses}
                onToggleResolve={handleToggleResolveResponse}
                isEnglish={isEnglish}
              />
            )}
          </div>
        </div>

        {/* Live Guest Experience Simulator Pane (Shows instant updates) */}
        {showLivePane && (
          <div className="lg:col-span-5 xl:col-span-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <LiveGuestSimulatorPane
              settings={settings}
              activeTableNumber={simulatorTableNumber}
              onTableChange={(t) => setSimulatorTableNumber(t)}
              onOpenFullModal={() => setIsSimulatorOpen(true)}
              onUpdateScreenOrder={handleUpdateScreenOrder}
              onUpdateIdentity={handleUpdateIdentity}
              highlightSection={
                activeTab === 'impression_cards' ? 'impression' :
                activeTab === 'question_templates' ? 'questions' :
                activeTab === 'menu_items' ? 'dishes' :
                activeTab === 'evaluation_pillars' ? 'pillars' :
                activeTab === 'quick_tags' ? 'tags' :
                activeTab === 'loyalty_prizes' ? 'prizes' :
                'identity'
              }
              isEnglish={isEnglish}
            />
          </div>
        )}
      </div>

      {/* Mobile Guest Simulator Modal */}
      <MobileGuestSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        settings={settings}
        activeTableNumber={simulatorTableNumber}
        onTableChange={(t) => setSimulatorTableNumber(t)}
        onSubmitNewResponse={handleAddNewResponseFromSimulator}
        onUpdateIdentity={handleUpdateIdentity}
        isEnglish={isEnglish}
      />
    </div>
  );
};
