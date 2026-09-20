import React, { useState } from 'react';
import { FileText, Shield, Download, Edit3, UserCheck, Clock, Search, Filter } from 'lucide-react';

interface SecurityAuditLogPanelProps {
  isEnglish?: boolean;
  currentLangCode?: string;
}

interface AuditLogEntry {
  id: string;
  timestampAr: string;
  timestampEn: string;
  userAr: string;
  userEn: string;
  roleAr: string;
  roleEn: string;
  actionAr: string;
  actionEn: string;
  category: 'export' | 'config' | 'auth' | 'ai';
  ipAddress: string;
}

export const SecurityAuditLogPanel: React.FC<SecurityAuditLogPanelProps> = ({
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [filterCategory, setFilterCategory] = useState<'all' | 'export' | 'config' | 'ai'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const logs: AuditLogEntry[] = [
    {
      id: 'log-1',
      timestampAr: 'قبل 4 دقائق',
      timestampEn: '4 minutes ago',
      userAr: 'أحمد الغامدي',
      userEn: 'Ahmed Al-Ghamdi',
      roleAr: 'مدير الفرع',
      roleEn: 'Branch Manager',
      actionAr: 'تصدير جدول المتسوقين والتقييمات بصيغة Excel',
      actionEn: 'Exported customer evaluations directory as Excel',
      category: 'export',
      ipAddress: '10.240.12.84'
    },
    {
      id: 'log-2',
      timestampAr: 'قبل 18 دقيقة',
      timestampEn: '18 minutes ago',
      userAr: 'سارة الشريف',
      userEn: 'Sarah Al-Sharif',
      roleAr: 'مشرف التجربة',
      roleEn: 'CX Supervisor',
      actionAr: 'رفع صور جماعية لقسم الخضار واستخدام الذكاء الاصطناعي للتسمية',
      actionEn: 'Bulk uploaded produce photos & triggered AI product naming',
      category: 'ai',
      ipAddress: '10.240.12.92'
    },
    {
      id: 'log-3',
      timestampAr: 'قبل 42 دقيقة',
      timestampEn: '42 minutes ago',
      userAr: 'خالد باوزير',
      userEn: 'Khaled Ba-Wazir',
      roleAr: 'مسؤول النظام',
      roleEn: 'Super Admin',
      actionAr: 'تحديث قيمة قسيمة الخصم الترويجية إلى 15% وتعيين كود PANDA15',
      actionEn: 'Updated promotional voucher discount to 15% (PANDA15)',
      category: 'config',
      ipAddress: '10.240.10.15'
    },
    {
      id: 'log-4',
      timestampAr: 'قبل ساعة و10 دقائق',
      timestampEn: '1 hour 10 mins ago',
      userAr: 'منى القحطاني',
      userEn: 'Mona Al-Qahtani',
      roleAr: 'أخصائية الجودة',
      roleEn: 'QA Specialist',
      actionAr: 'تصدير نسخة احتياطية من قواعد بيانات التجربة بصيغة JSON',
      actionEn: 'Exported complete journey database backup as JSON',
      category: 'export',
      ipAddress: '10.240.12.44'
    },
    {
      id: 'log-5',
      timestampAr: 'قبل ساعتين',
      timestampEn: '2 hours ago',
      userAr: 'النظام السحابي الذكي',
      userEn: 'Smart Cloud AI Worker',
      roleAr: 'مساعد الذكاء الاصطناعي',
      roleEn: 'AI Assistant',
      actionAr: 'توليد توصيات تشغيلية بناءً على كثافة المتسوقين لساعات الذروة',
      actionEn: 'Generated smart operational recommendations based on peak footfall',
      category: 'ai',
      ipAddress: 'Cloud Worker'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesSearch = searchTerm.trim() === '' ||
      log.userAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="section-audit" dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center shadow-xs">
            <FileText size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                {isEnglish ? 'Security Audit Log & Activity Trace' : 'سجل الرقابة الأمنية وتتبع العمليات السحابية (Audit Log)'}
              </h3>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-300">
                {isEnglish ? 'Immutable Trail' : 'سجل مشفر غير قابل للتعديل'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isEnglish 
                ? 'Tamper-proof real-time audit trail tracking all administrative exports and config updates'
                : 'رصد فوري لكافة عمليات التصدير، تغيير الإعدادات، ومعالجة الصور بالذكاء الاصطناعي'}
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'export', 'config', 'ai'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? (isEnglish ? 'All Events' : 'كافة السجلات') :
               cat === 'export' ? (isEnglish ? 'Exports' : 'التصدير') :
               cat === 'config' ? (isEnglish ? 'Config Changes' : 'تعديل الإعدادات') :
               (isEnglish ? 'AI Operations' : 'عمليات الذكاء')}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto border border-slate-200/90 rounded-xl">
        <table className={`w-full text-xs ${isEnglish ? 'text-left' : 'text-right'}`}>
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className={`p-3 font-black ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Timestamp' : 'الوقت والتاريخ'}</th>
              <th className={`p-3 font-black ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'User & Role' : 'المستخدم والدور'}</th>
              <th className={`p-3 font-black ${isEnglish ? 'text-left' : 'text-right'}`}>{isEnglish ? 'Action Description' : 'تفاصيل الإجراء الحساس'}</th>
              <th className="p-3 text-center font-black">{isEnglish ? 'IP / Origin' : 'عنوان IP / المصدر'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 text-slate-500 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-400" />
                    <span>{isEnglish ? log.timestampEn : log.timestampAr}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <div className="font-bold text-slate-800">{isEnglish ? log.userEn : log.userAr}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{isEnglish ? log.roleEn : log.roleAr}</div>
                </td>
                <td className="p-3">
                  <div className="font-bold text-slate-800">
                    {isEnglish ? log.actionEn : log.actionAr}
                  </div>
                </td>
                <td className="p-3 text-center whitespace-nowrap">
                  <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                    {log.ipAddress}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
