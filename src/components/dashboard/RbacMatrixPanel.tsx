import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Key, Lock, Check, X, ShieldAlert } from 'lucide-react';

interface RbacMatrixPanelProps {
  isEnglish?: boolean;
  currentLangCode?: string;
}

interface RolePermission {
  key: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  roles: {
    superAdmin: boolean;
    storeManager: boolean;
    cxSupervisor: boolean;
    cashier: boolean;
  };
}

export const RbacMatrixPanel: React.FC<RbacMatrixPanelProps> = ({
  isEnglish: isEnglishProp = false,
  currentLangCode
}) => {
  const isEnglish = currentLangCode ? (currentLangCode !== 'ar' && currentLangCode !== 'ur') : isEnglishProp;
  const isRTL = currentLangCode === 'ar' || currentLangCode === 'ur';
  const [permissions, setPermissions] = useState<RolePermission[]>([
    {
      key: 'edit_journey',
      nameAr: 'تعديل مسار وتجربة العميل (الأسئلة والأقسام)',
      nameEn: 'Edit Customer Journey (Questions & Sections)',
      descAr: 'صلاحية إضافة وتعديل أقسام المتجر وصور المنتجات',
      descEn: 'Permission to add or edit store sections and product photos',
      roles: { superAdmin: true, storeManager: true, cxSupervisor: true, cashier: false }
    },
    {
      key: 'bulk_upload',
      nameAr: 'الرفع الجماعي وتسمية المنتجات بالذكاء الاصطناعي',
      nameEn: 'Bulk Image Upload & AI Auto-Naming',
      descAr: 'رفع صور المنتجات دفعة واحدة واستخدام المساعد الذكي',
      descEn: 'Batch uploading images and executing AI product scanner',
      roles: { superAdmin: true, storeManager: true, cxSupervisor: true, cashier: false }
    },
    {
      key: 'manage_vouchers',
      nameAr: 'تخصيص نسب ورموز القسائم الترويجية',
      nameEn: 'Manage Promo Vouchers & Discount Rates',
      descAr: 'تحديد كود الخصم ونسبة التخفيض وشروط الاستخدام',
      descEn: 'Define discount codes, percentages and unlock rules',
      roles: { superAdmin: true, storeManager: true, cxSupervisor: false, cashier: false }
    },
    {
      key: 'export_data',
      nameAr: 'تصدير بيانات العملاء والتقييمات (Excel & JSON)',
      nameEn: 'Export Customer Directory (Excel & JSON)',
      descAr: 'تحميل جداول المتسوقين والتقارير المالية والتحليلية',
      descEn: 'Download raw customer tables, financial and analytical reports',
      roles: { superAdmin: true, storeManager: true, cxSupervisor: false, cashier: false }
    },
    {
      key: 'view_phone_numbers',
      nameAr: 'الاطلاع على أرقام هواتف وإيميلات المتسوقين',
      nameEn: 'View Full Customer Phone & Email Directory',
      descAr: 'كشف البيانات الحساسة لأغراض خدمة العملاء وإعادة الاستهداف',
      descEn: 'Reveal sensitive contact info for customer care and retargeting',
      roles: { superAdmin: true, storeManager: true, cxSupervisor: true, cashier: false }
    },
    {
      key: 'audit_log',
      nameAr: 'مراجعة سجلات الرقابة الأمنية والنشاط السحابي',
      nameEn: 'Review Security Audit Logs & Cloud Activity',
      descAr: 'متابعة من قام بالتصدير أو تعديل مسار التجربة',
      descEn: 'Track who exported data or changed journey configurations',
      roles: { superAdmin: true, storeManager: false, cxSupervisor: false, cashier: false }
    }
  ]);

  const togglePermission = (permKey: string, roleKey: 'superAdmin' | 'storeManager' | 'cxSupervisor' | 'cashier') => {
    // Keep superAdmin always true for safety
    if (roleKey === 'superAdmin') return;

    setPermissions(prev => prev.map(p => {
      if (p.key === permKey) {
        return {
          ...p,
          roles: {
            ...p.roles,
            [roleKey]: !p.roles[roleKey]
          }
        };
      }
      return p;
    }));
  };

  return (
    <div id="section-rbac" dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-800">
                {isEnglish ? 'Role-Based Access Control Matrix (RBAC)' : 'مصفوفة الصلاحيات والحوكمة الأمنية (RBAC)'}
              </h3>
              <span className="bg-indigo-50 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200">
                {isEnglish ? 'ISO 27001 Ready' : 'حوكمة معتمدة'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isEnglish 
                ? 'Manage granular permissions across admin, store managers, supervisors and cashiers'
                : 'إدارة وتخصيص صلاحيات الوصول الممنوحة للمدراء، المشرفين، وموظفي الكاشير'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Lock size={13} className="text-indigo-600" />
          <span>{isEnglish ? '4 Active Store Roles' : '4 أدوار تشغيلية نشطة'}</span>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="overflow-x-auto border border-slate-200/90 rounded-xl">
        <table className={`w-full text-xs ${isEnglish ? 'text-left' : 'text-right'}`}>
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className={`p-3.5 font-black ${isEnglish ? 'text-left' : 'text-right'}`}>
                {isEnglish ? 'Permission / Action' : 'الصلاحية / العملية الحساسة'}
              </th>
              <th className="p-3.5 text-center font-black text-indigo-700">
                {isEnglish ? 'Super Admin' : 'مسؤول النظام'}
              </th>
              <th className="p-3.5 text-center font-black text-emerald-800">
                {isEnglish ? 'Branch Manager' : 'مدير الفرع'}
              </th>
              <th className="p-3.5 text-center font-black text-blue-700">
                {isEnglish ? 'CX Supervisor' : 'مشرف التجربة'}
              </th>
              <th className="p-3.5 text-center font-black text-amber-700">
                {isEnglish ? 'Cashier' : 'الكاشير'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {permissions.map((perm) => (
              <tr key={perm.key} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3.5">
                  <div className="font-black text-slate-800">
                    {isEnglish ? perm.nameEn : perm.nameAr}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {isEnglish ? perm.descEn : perm.descAr}
                  </div>
                </td>

                {/* Super Admin */}
                <td className="p-3.5 text-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold" title={isEnglish ? 'Always enabled' : 'دائماً مفعل'}>
                    <Check size={16} />
                  </span>
                </td>

                {/* Store Manager */}
                <td className="p-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.key, 'storeManager')}
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer ${
                      perm.roles.storeManager 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {perm.roles.storeManager ? <Check size={16} /> : <X size={16} />}
                  </button>
                </td>

                {/* CX Supervisor */}
                <td className="p-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.key, 'cxSupervisor')}
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer ${
                      perm.roles.cxSupervisor 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {perm.roles.cxSupervisor ? <Check size={16} /> : <X size={16} />}
                  </button>
                </td>

                {/* Cashier */}
                <td className="p-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.key, 'cashier')}
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors cursor-pointer ${
                      perm.roles.cashier 
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {perm.roles.cashier ? <Check size={16} /> : <X size={16} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
