import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Check, Upload, Image as ImageIcon } from 'lucide-react';
import { SurveyMenuItem } from '../../../types/surveyPlatform';

interface OperationalMenuItemsTabProps {
  items: SurveyMenuItem[];
  onChange: (items: SurveyMenuItem[]) => void;
  isWideMode?: boolean;
  isEnglish?: boolean;
}

export const OperationalMenuItemsTab: React.FC<OperationalMenuItemsTabProps> = ({
  items,
  onChange,
  isWideMode = false,
  isEnglish = false
}) => {
  const [editingItem, setEditingItem] = useState<SurveyMenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [price, setPrice] = useState('50');
  const [tag, setTag] = useState('الأعلى طلباً');
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenEdit = (item: SurveyMenuItem) => {
    setEditingItem(item);
    setIsAddingNew(false);
    setNameAr(item.nameAr);
    setNameEn(item.nameEn);
    setPrice(item.price);
    setTag(item.tag);
    setImageUrl(item.imageUrl);
  };

  const handleOpenAdd = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    setNameAr('');
    setNameEn('');
    setPrice('45');
    setTag('طبق مميز');
    setImageUrl('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80');
  };

  const handleCloseForm = () => {
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setImageUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) return;

    if (isAddingNew) {
      const newItem: SurveyMenuItem = {
        id: `m_${Date.now()}`,
        nameAr: nameAr.trim(),
        nameEn: nameEn.trim() || nameAr.trim(),
        price: price.trim(),
        tag: tag.trim() || 'طبق مميز',
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'
      };
      onChange([...items, newItem]);
    } else if (editingItem) {
      const updated = items.map(it => 
        it.id === editingItem.id
          ? {
              ...it,
              nameAr: nameAr.trim(),
              nameEn: nameEn.trim() || nameAr.trim(),
              price: price.trim(),
              tag: tag.trim(),
              imageUrl: imageUrl.trim()
            }
          : it
      );
      onChange(updated);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (items.length <= 1) {
      alert(isEnglish ? 'At least one menu dish must remain' : 'يجب الإبقاء على طبق واحد على الأقل');
      return;
    }
    onChange(items.filter(it => it.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900">
            {isEnglish 
              ? 'Menu Items & Dining Experiences (Upload & Delete Photos) 🍴' 
              : 'أصناف وتجارب المنيو (مع خيار رفع وحذف الصور) 🍴'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isEnglish
              ? 'Dishes that guests see in the survey. You can upload images from your device, remove images, or adjust prices and tags.'
              : '.الأطباق التي يراها الضيف في الاستبيان. يمكنك رفع صورة من جهازك، حذف الصورة، أو تغيير الأسعار والوسوم'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#00875a] hover:bg-[#00744e] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>{isEnglish ? '+ Add New Dish' : '+ إضافة طبق جديد'}</span>
        </button>
      </div>

      {/* Edit / Add Modal */}
      {(editingItem || isAddingNew) && (
        <form
          onSubmit={handleSave}
          className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-xl space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <ImageIcon size={18} className="text-emerald-600" />
              <span>
                {isAddingNew 
                  ? (isEnglish ? 'Add New Menu Item' : 'إضافة طبق جديد في المنيو') 
                  : (isEnglish ? 'Edit Menu Item' : 'تعديل بيانات الطبق والصورة')}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCloseForm}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image Upload Row */}
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative shadow-2xs">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Dish Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs gap-1">
                  <ImageIcon size={24} />
                  <span>{isEnglish ? 'No image' : 'لا توجد صورة'}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1 w-full text-center sm:text-right">
              <h4 className="text-xs font-black text-slate-800">
                {isEnglish ? 'Dish Photo (Upload from device or URL)' : 'صورة الطبق (رفع من جهازك أو الرابط)'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isEnglish ? 'Recommended square or landscape format JPG/PNG' : 'يفضل صورة مربعة أو أفقية واضحة لجذب انتباه الضيف'}
              </p>

              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start pt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Upload size={13} />
                  <span>{isEnglish ? 'Upload Photo' : 'رفع صورة جديدة 📤'}</span>
                </button>

                {imageUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>{isEnglish ? 'Remove Photo' : 'حذف الصورة 🗑️'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? '* Dish Name (Arabic)' : '* اسم الصنف (عربي)'}
              </label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مكرونة الترفل الفاخرة"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Dish Name (English)' : 'اسم الصنف (إنجليزي)'}
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Luxury Truffle Pasta"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Price (SAR)' : 'السعر (ر.س)'}
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="88"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {isEnglish ? 'Badge / Tag' : 'الشارة الترويجية (مثل: الأعلى طلباً)'}
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="الأعلى طلباً"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCloseForm}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isEnglish ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00875a] hover:bg-[#00744e] text-white rounded-xl text-xs font-black shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check size={15} />
              <span>{isEnglish ? 'Save Dish ✓' : 'حفظ بيانات الطبق ✓'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid: Square Dish Cards Matching Guest Experience View */}
      <div className={`grid gap-4 ${
        isWideMode 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
      }`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-3.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Top Image Frame (Square format with tag & price badges) */}
            <div className="w-full h-36 rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-100">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.nameAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon size={28} />
                </div>
              )}
              {/* Overlay Badges */}
              <span className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-lg border border-white/10 shadow-xs">
                {item.tag}
              </span>

              <span className="absolute bottom-2 left-2 bg-emerald-600/90 backdrop-blur-xs text-white text-xs font-mono font-black px-2.5 py-0.5 rounded-lg shadow-xs">
                {item.price} ر.س
              </span>
            </div>

            {/* Dish Info in Card */}
            <div className="mt-3 px-1 space-y-1">
              <h4 className="text-sm font-black text-slate-900 truncate">
                {item.nameAr}
              </h4>
              <p className="text-[11px] font-medium text-slate-400 truncate">
                {item.nameEn}
              </p>
            </div>

            {/* In-Card Manager Actions (Edit, Delete, Appears in Step 4 tag) */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400">
                الخطوة 4 📱
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  title={isEnglish ? 'Edit Dish' : 'تعديل بيانات الطبق'}
                >
                  <Edit2 size={12} />
                  <span>{isEnglish ? 'Edit' : 'تعديل'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                  title={isEnglish ? 'Delete Dish' : 'حذف الطبق'}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
