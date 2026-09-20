import React from 'react';
import { 
  LayoutGrid, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Gamepad2, 
  HelpCircle, 
  Ticket, 
  Trophy, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Palette, 
  Store, 
  ArrowUpRight, 
  FileSpreadsheet, 
  FileJson, 
  X,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Award,
  ClipboardCheck
} from 'lucide-react';
import { getDashboardTexts } from '../utils/dashboardTranslations';

export type DashboardNavSection = 
  | 'overview'
  | 'customers'
  | 'surveys'
  | 'analytics'
  | 'ai'
  | 'journey'
  | 'vouchers'
  | 'loyalty'
  | 'leaderboard'
  | 'rbac'
  | 'audit'
  | 'brand';

interface DashboardSidebarProps {
  activeSection: DashboardNavSection;
  onSelectSection: (section: DashboardNavSection) => void;
  feedbacksCount?: number;
  onPreviewCustomerJourney: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onCloseDashboard: () => void;
  isEnglish?: boolean;
  currentLangCode?: string;
  branchName?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSelectSection,
  feedbacksCount = 0,
  onPreviewCustomerJourney,
  onExportCSV,
  onExportJSON,
  onCloseDashboard,
  isEnglish = false,
  currentLangCode,
  branchName,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const activeCode = currentLangCode || (isEnglish ? 'en' : 'ar');
  const texts = getDashboardTexts(activeCode);
  const isRTL = activeCode === 'ar' || activeCode === 'ur';

  const displayBranch = branchName || texts.sidebar.defaultBranch;
  const navItems: Array<{
    id: DashboardNavSection;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeType?: 'ai' | 'count' | 'neutral';
  }> = [
    {
      id: 'overview',
      label: texts.sidebar.nav.overview,
      icon: <LayoutGrid size={18} />
    },
    {
      id: 'customers',
      label: texts.sidebar.nav.customers,
      icon: <UserCheck size={18} />,
      badge: feedbacksCount > 0 ? feedbacksCount.toString() : undefined,
      badgeType: 'count'
    },
    {
      id: 'surveys',
      label: texts.sidebar.nav.surveys,
      icon: <ClipboardCheck size={18} className="text-amber-500" />,
      badge: 'NEW',
      badgeType: 'ai'
    },
    {
      id: 'analytics',
      label: texts.sidebar.nav.analytics,
      icon: <TrendingUp size={18} />
    },
    {
      id: 'ai',
      label: texts.sidebar.nav.ai,
      icon: <Sparkles size={18} className="text-amber-500" />,
      badge: 'AI',
      badgeType: 'ai'
    },
    {
      id: 'journey',
      label: texts.sidebar.nav.journey,
      icon: <Layers size={18} />
    },
    {
      id: 'vouchers',
      label: texts.sidebar.nav.vouchers,
      icon: <Ticket size={18} />
    },
    {
      id: 'loyalty',
      label: texts.sidebar.nav.loyalty,
      icon: <Award size={18} className="text-emerald-600" />,
      badge: 'NEW',
      badgeType: 'ai'
    },
    {
      id: 'leaderboard',
      label: texts.sidebar.nav.leaderboard,
      icon: <Trophy size={18} />
    },
    {
      id: 'rbac',
      label: texts.sidebar.nav.rbac,
      icon: <ShieldCheck size={18} />
    },
    {
      id: 'audit',
      label: texts.sidebar.nav.audit,
      icon: <FileText size={18} />
    },
    {
      id: 'brand',
      label: texts.sidebar.nav.brand,
      icon: <Palette size={18} />
    }
  ];

  return (
    <aside 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`bg-white border-l border-r border-slate-200/90 shadow-sm flex flex-col justify-between transition-all duration-300 select-none z-30 ${
        isCollapsed ? 'w-20' : 'w-72 lg:w-80'
      } h-full min-h-[calc(100vh-4rem)] sticky top-0`}
    >
      {/* Top Header */}
      <div className="p-4 border-b border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#005A2B] shrink-0 shadow-2xs">
              <Store size={18} />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h2 className="text-sm font-black text-slate-800 truncate">
                  {texts.sidebar.adminPanel}
                </h2>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="truncate">{displayBranch}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {!isCollapsed && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-300/80 flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>{texts.sidebar.storeName}</span>
              </span>
            )}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title={isCollapsed ? texts.sidebar.expandTooltip : texts.sidebar.collapseTooltip}
              >
                {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer group ${isRTL ? 'text-right' : 'text-left'} ${
                isActive
                  ? 'bg-emerald-50/90 text-[#005A2B] border border-emerald-200/90 shadow-2xs font-black'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
              title={item.label}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-[#005A2B]' : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="truncate">
                    {item.label}
                  </span>
                )}
              </div>

              {!isCollapsed && item.badge && (
                <div className="shrink-0 mx-1">
                  {item.badgeType === 'ai' ? (
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-2xs tracking-wider">
                      {item.badge}
                    </span>
                  ) : item.badgeType === 'count' ? (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-[#005A2B] text-white' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {item.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Footer Area */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
        {/* Customer Experience Preview Button */}
        <button
          type="button"
          onClick={onPreviewCustomerJourney}
          className="w-full py-2.5 px-3 bg-[#005A2B] hover:bg-[#004A26] text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
          title={texts.sidebar.previewJourney}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {!isCollapsed && <span>{texts.sidebar.previewJourney}</span>}
          <ArrowUpRight size={14} className={isRTL ? 'rotate-[-90deg]' : ''} />
        </button>

        {/* Export Buttons Row */}
        {!isCollapsed && (
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={onExportCSV}
              className="py-1.5 px-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title={texts.banner.exportCsv}
            >
              <FileSpreadsheet size={13} className="text-emerald-600" />
              <span>{texts.sidebar.excel}</span>
            </button>

            <button
              type="button"
              onClick={onExportJSON}
              className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title={texts.banner.exportJson}
            >
              <FileJson size={13} className="text-slate-500" />
              <span>{texts.sidebar.json}</span>
            </button>
          </div>
        )}

        {/* Close Admin Panel Button */}
        <button
          type="button"
          onClick={onCloseDashboard}
          className="w-full py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          title={texts.sidebar.closeDashboard}
        >
          <X size={13} />
          {!isCollapsed && <span>{texts.sidebar.closeDashboard}</span>}
        </button>
      </div>
    </aside>
  );
};
