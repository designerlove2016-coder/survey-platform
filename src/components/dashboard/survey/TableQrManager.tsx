import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Eye, 
  Store, 
  Sparkles, 
  Layers, 
  Check, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import { SurveyTableInfo, SurveyBrandingConfig } from '../../../types/surveyPlatform';
import { generateTableQRCode } from '../../../utils/surveyDefaults';

interface TableQrManagerProps {
  tables: SurveyTableInfo[];
  branding: SurveyBrandingConfig;
  onUpdateTables: (updated: SurveyTableInfo[]) => void;
  onPreviewTableGuest: (tableNumber: string) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

export const TableQrManager: React.FC<TableQrManagerProps> = ({
  tables,
  branding,
  onUpdateTables,
  onPreviewTableGuest,
  isWideMode = false,
  isEnglish = false
}) => {
  const [selectedTableForPrint, setSelectedTableForPrint] = useState<SurveyTableInfo | null>(null);
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newSectionName, setNewSectionName] = useState('الصالة الداخلية');
  const [copiedLinkTableId, setCopiedLinkTableId] = useState<string | null>(null);

  // Auto-generate QR codes for any table missing qrCodeDataUrl
  useEffect(() => {
    let isMounted = true;

    async function ensureQRCodes() {
      const missing = tables.filter(t => !t.qrCodeDataUrl);
      if (missing.length === 0) return;

      const updated = await Promise.all(
        tables.map(async (tbl) => {
          if (tbl.qrCodeDataUrl) return tbl;
          const qr = await generateTableQRCode(tbl.tableNumber, branding.branchName);
          return { ...tbl, qrCodeDataUrl: qr };
        })
      );

      if (isMounted) {
        onUpdateTables(updated);
      }
    }

    ensureQRCodes();

    return () => {
      isMounted = false;
    };
  }, [tables, branding.branchName]);

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber.trim()) return;

    const qr = await generateTableQRCode(newTableNumber.trim(), branding.branchName);
    const newTbl: SurveyTableInfo = {
      id: `tbl_${Date.now()}`,
      tableNumber: newTableNumber.trim(),
      sectionName: newSectionName,
      qrCodeDataUrl: qr,
      active: true
    };

    onUpdateTables([...tables, newTbl]);
    setShowAddTableModal(false);
    setNewTableNumber('');
  };

  const handleDeleteTable = (id: string) => {
    if (tables.length <= 1) {
      alert(isEnglish ? 'You must have at least one table configured.' : 'يجب الإبقاء على طاولة واحدة على الأقل.');
      return;
    }
    onUpdateTables(tables.filter(t => t.id !== id));
  };

  const handleCopyTableUrl = (tbl: SurveyTableInfo) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guest-survey.app';
    const url = `${origin}/?mode=guest_survey&table=${encodeURIComponent(tbl.tableNumber)}&branch=${encodeURIComponent(branding.branchName)}`;
    navigator.clipboard.writeText(url);
    setCopiedLinkTableId(tbl.id);
    setTimeout(() => setCopiedLinkTableId(null), 2500);
  };

  const handleDownloadQrImage = (tbl: SurveyTableInfo) => {
    if (!tbl.qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = tbl.qrCodeDataUrl;
    a.download = `QR-Table-${tbl.tableNumber}-${branding.branchName}.png`;
    a.click();
  };

  const handlePrintAllStands = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="text-base font-black text-slate-800">
              {isEnglish ? 'Smart Tables & Dynamic QR Codes' : 'إدارة طاولات المطعم وأكواد الـ QR الذكية'}
            </h3>
            <span className="bg-indigo-50 text-indigo-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-indigo-200">
              {tables.length} {isEnglish ? 'Tables' : 'طاولات مجهزة'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish 
              ? 'Each table has a dedicated QR code. Scanning automatically records the table and branch without manual input.' 
              : 'لكل طاولة باركود فريد يحدد رقمها وقسمها آلياً لحظة مسح العميل للباركود دون الحاجة لكتابتها يدوياً.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowAddTableModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#005A2B] hover:bg-[#004722] text-white rounded-xl font-black text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>{isEnglish ? 'Add Table' : 'إضافة طاولة جديدة'}</span>
          </button>

          <button
            onClick={handlePrintAllStands}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-xs shadow-xs transition-all cursor-pointer"
          >
            <Printer size={15} />
            <span>{isEnglish ? 'Print Table Stands' : 'طباعة ستاندات الطاولات'}</span>
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className={`grid gap-4 ${
        isWideMode 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
      }`}>
        {tables.map(tbl => (
          <div
            key={tbl.id}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all p-4 flex flex-col justify-between group"
          >
            {/* Top table info */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {tbl.sectionName}
                  </span>
                  <h4 className="text-base font-black text-slate-900">
                    {isEnglish ? `Table ${tbl.tableNumber}` : `طاولة #${tbl.tableNumber}`}
                  </h4>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {isEnglish ? 'Active' : 'نشطة'}
                </span>
              </div>

              {/* QR Code Center Box */}
              <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center border border-slate-100 group-hover:bg-indigo-50/40 transition-colors">
                {tbl.qrCodeDataUrl ? (
                  <img 
                    src={tbl.qrCodeDataUrl} 
                    alt={`QR Table ${tbl.tableNumber}`} 
                    className="w-32 h-32 object-contain mix-blend-multiply" 
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-slate-300">
                    <QrCode size={48} />
                  </div>
                )}
                <span className="text-[10px] font-mono text-slate-500 mt-1">
                  ?table={tbl.tableNumber}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1">
              <button
                onClick={() => onPreviewTableGuest(tbl.tableNumber)}
                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title={isEnglish ? 'Live Mobile Preview as this Table' : 'معاينة تجربة العميل لهذه الطاولة'}
              >
                <Eye size={14} />
                <span className="text-[11px]">{isEnglish ? 'Test' : 'معاينة'}</span>
              </button>

              <button
                onClick={() => setSelectedTableForPrint(tbl)}
                className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title={isEnglish ? 'Preview Table Tent Stand' : 'عرض ستاند الطاولة الجاهز للطباعة'}
              >
                <Printer size={14} />
                <span className="text-[11px]">{isEnglish ? 'Stand' : 'ستاند'}</span>
              </button>

              <button
                onClick={() => handleCopyTableUrl(tbl)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title={isEnglish ? 'Copy Table Survey Link' : 'نسخ رابط الاستبيان المباشر للطاولة'}
              >
                {copiedLinkTableId === tbl.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>

              <button
                onClick={() => handleDownloadQrImage(tbl)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title={isEnglish ? 'Download QR Image' : 'تنزيل صورة الباركود'}
              >
                <Download size={14} />
              </button>

              <button
                onClick={() => handleDeleteTable(tbl.id)}
                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                title={isEnglish ? 'Delete Table' : 'حذف الطاولة'}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add table modal */}
      {showAddTableModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-800">
                {isEnglish ? 'Add New Dining Table' : 'إضافة طاولة أو قسم جديد'}
              </h3>
              <button
                onClick={() => setShowAddTableModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTable} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  {isEnglish ? 'Table Number / Code *' : 'رقم الطاولة أو كود الجلسة *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: 09 أو VIP-3 أو T-12"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  {isEnglish ? 'Section / Area' : 'القسم أو منطقة الجلوس'}
                </label>
                <select
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 focus:border-[#005A2B] focus:ring-1 focus:ring-[#005A2B] outline-hidden bg-white"
                >
                  <option value="الصالة الداخلية">الصالة الداخلية (Indoor)</option>
                  <option value="التيراس الخارجي">التيراس الخارجي (Terrace)</option>
                  <option value="الصالون الخاص (VIP)">الصالون الخاص (VIP)</option>
                  <option value="طاولة البار والمشروبات">طاولة البار والمشروبات (Bar)</option>
                  <option value="جلسات العوائل">جلسات العوائل (Family Area)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTableModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {isEnglish ? 'Cancel' : 'إلغاء'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#005A2B] hover:bg-[#004722] text-white rounded-xl text-xs font-black shadow-sm"
                >
                  {isEnglish ? 'Create & Generate QR' : 'إنشاء وتوليد الـ QR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Stand Preview Modal (ستاند الطاولة الفاخر للطباعة) */}
      {selectedTableForPrint && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center relative my-8">
            <button
              onClick={() => setSelectedTableForPrint(null)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-700 font-black p-1"
            >
              ✕
            </button>

            {/* Printable Stand Preview Card */}
            <div 
              id="printable-stand"
              className="border-2 border-slate-800 rounded-2xl p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl flex flex-col items-center justify-center space-y-4"
            >
              <div className="flex items-center gap-2">
                {branding.logoUrl ? (
                  <img 
                    src={branding.logoUrl} 
                    alt="Logo" 
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-amber-400/40" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                    ☕
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-black text-white">
                    {branding.restaurantName}
                  </h4>
                  <span className="text-[10px] text-amber-400/90 block">
                    {branding.branchName}
                  </span>
                </div>
              </div>

              {/* Table Number Badge */}
              <div className="bg-amber-500/20 border border-amber-500/40 px-4 py-1 rounded-full text-amber-300 font-mono text-xs font-black tracking-wide">
                TABLE • طاولة #{selectedTableForPrint.tableNumber}
              </div>

              {/* White QR Code container */}
              <div className="bg-white p-3 rounded-2xl shadow-md">
                {selectedTableForPrint.qrCodeDataUrl ? (
                  <img 
                    src={selectedTableForPrint.qrCodeDataUrl} 
                    alt="QR" 
                    className="w-40 h-40 object-contain" 
                  />
                ) : (
                  <QrCode size={160} className="text-slate-800" />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-black text-amber-300">
                  امسح الباركود بكاميرا جوالك 📱
                </p>
                <p className="text-[11px] text-slate-300">
                  شاركنا رأيك في دقيقة واحدة واحصل على قسيمة قهوة أو خصم فوري!
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 w-full text-[9px] text-slate-400 font-mono">
                {selectedTableForPrint.sectionName}
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => handleDownloadQrImage(selectedTableForPrint)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>{isEnglish ? 'Download QR' : 'تنزيل الباركود'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Printer size={14} />
                <span>{isEnglish ? 'Print Stand' : 'طباعة الستاند'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
