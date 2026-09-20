import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  UtensilsCrossed, 
  ShoppingBag, 
  Check, 
  QrCode, 
  Award, 
  Sparkles, 
  X, 
  Copy, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Gift
} from 'lucide-react';
import { 
  LoyaltyProgramConfig, 
  getStoredLoyaltyConfig, 
  SectorType 
} from '../../utils/loyaltyConfig';

interface CustomerLoyaltyCardsEndSectionProps {
  customerName?: string;
  isEnglish?: boolean;
  activeBusinessType?: 'supermarket' | 'cafe' | 'restaurant' | 'cafe_restaurant';
  configOverride?: LoyaltyProgramConfig;
  showSectorSwitcher?: boolean;
}

export const CustomerLoyaltyCardsEndSection: React.FC<CustomerLoyaltyCardsEndSectionProps> = ({
  customerName = '',
  isEnglish = false,
  activeBusinessType = 'supermarket',
  configOverride,
  showSectorSwitcher = false
}) => {
  const [config, setConfig] = useState<LoyaltyProgramConfig>(() => configOverride || getStoredLoyaltyConfig());
  const [activeSector, setActiveSector] = useState<SectorType>(() => {
    if (activeBusinessType === 'cafe') return 'cafe';
    if (activeBusinessType === 'restaurant') return 'restaurant';
    return 'supermarket';
  });
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Sync if activeBusinessType changes
  useEffect(() => {
    if (activeBusinessType === 'cafe') {
      setActiveSector('cafe');
    } else if (activeBusinessType === 'restaurant') {
      setActiveSector('restaurant');
    } else if (activeBusinessType === 'supermarket') {
      setActiveSector('supermarket');
    }
  }, [activeBusinessType]);

  // Sync if configOverride is provided or listen for local storage changes
  useEffect(() => {
    if (configOverride) {
      setConfig(configOverride);
      return;
    }
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setConfig(e.detail);
      } else {
        setConfig(getStoredLoyaltyConfig());
      }
    };
    window.addEventListener('panda_loyalty_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('panda_loyalty_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [configOverride]);

  // Adjust active sector if current one is disabled and switcher is enabled
  useEffect(() => {
    if (showSectorSwitcher) {
      const enabledSectors: SectorType[] = [];
      if (config.cafe.isEnabled) enabledSectors.push('cafe');
      if (config.restaurant.isEnabled) enabledSectors.push('restaurant');
      if (config.supermarket.isEnabled) enabledSectors.push('supermarket');

      if (enabledSectors.length > 0 && !enabledSectors.includes(activeSector)) {
        setActiveSector(enabledSectors[0]);
      }
    }
  }, [config, activeSector, showSectorSwitcher]);

  const enabledSectors: SectorType[] = [];
  if (config.cafe.isEnabled) enabledSectors.push('cafe');
  if (config.restaurant.isEnabled) enabledSectors.push('restaurant');
  if (config.supermarket.isEnabled) enabledSectors.push('supermarket');

  // If all sectors are disabled and switcher is enabled, render nothing
  if (showSectorSwitcher && enabledSectors.length === 0) {
    return null;
  }

  // Generate card ID for customer
  const cleanNameSlug = customerName ? customerName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '').slice(0, 8) : 'VIP';
  const loyaltyCardId = `PND-${activeSector.toUpperCase()}-${cleanNameSlug || 'VIP'}-8829`;

  const copyCardId = () => {
    navigator.clipboard.writeText(loyaltyCardId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Mock progress numbers for visual rendering matching user reference
  // Cafe: 5 out of 8 stamps
  // Restaurant: 3 out of 5 visits
  // Supermarket: 1,250 points
  const cafeCurrentStamps = Math.min(5, config.cafe.stampsRequired);
  const restaurantCurrentVisits = Math.min(3, config.restaurant.requiredVisits);
  const supermarketCurrentPoints = 1250;

  return (
    <div className="w-full space-y-3">
      {/* Sector switcher pill tabs (ONLY when showSectorSwitcher is enabled, e.g. in Admin Preview) */}
      {showSectorSwitcher && enabledSectors.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl max-w-sm mx-auto border border-slate-200/80 shadow-2xs">
          {config.cafe.isEnabled && (
            <button
              type="button"
              onClick={() => setActiveSector('cafe')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeSector === 'cafe'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coffee size={14} className={activeSector === 'cafe' ? 'text-[#005A2B]' : 'text-slate-400'} />
              <span>{isEnglish ? 'Café' : 'المقهى'}</span>
            </button>
          )}

          {config.restaurant.isEnabled && (
            <button
              type="button"
              onClick={() => setActiveSector('restaurant')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeSector === 'restaurant'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UtensilsCrossed size={14} className={activeSector === 'restaurant' ? 'text-[#005A2B]' : 'text-slate-400'} />
              <span>{isEnglish ? 'Restaurant' : 'المطعم'}</span>
            </button>
          )}

          {config.supermarket.isEnabled && (
            <button
              type="button"
              onClick={() => setActiveSector('supermarket')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeSector === 'supermarket'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag size={14} className={activeSector === 'supermarket' ? 'text-[#005A2B]' : 'text-slate-400'} />
              <span>{isEnglish ? 'Supermarket' : 'الهايبرماركت'}</span>
            </button>
          )}
        </div>
      )}

      {/* 1. CAFÉ LOYALTY CARD (Exact matching user's Image 2 reference) */}
      {activeSector === 'cafe' && (config.cafe.isEnabled !== false || !showSectorSwitcher) && (
        <motion.div
          key="cafe-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-xl relative overflow-hidden"
        >
          {/* Top Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Reward Name Pill on the left in RTL (or right in LTR) */}
            <div className="order-2 rtl:order-1 ltr:order-2">
              <span className="inline-block bg-[#eafaf1] text-[#00873e] text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border border-emerald-200/70 shadow-2xs whitespace-nowrap">
                {isEnglish ? config.cafe.rewardNameEn : config.cafe.rewardNameAr}
              </span>
            </div>

            {/* Title & Icon on the right in RTL (or left in LTR) */}
            <div className="flex items-center gap-2.5 order-1 rtl:order-2 ltr:order-1 rtl:text-right ltr:text-left">
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                  {isEnglish ? config.cafe.programNameEn : config.cafe.programNameAr}
                </h4>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
                  {isEnglish 
                    ? `${cafeCurrentStamps}/${config.cafe.stampsRequired} Stamps Completed` 
                    : `${cafeCurrentStamps}/${config.cafe.stampsRequired} أختام مكتملة`}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#009E49] text-white flex items-center justify-center shadow-xs shrink-0">
                <Coffee size={20} className="stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Dynamic Stamp Grid: slots formatted in 2 rows like in reference */}
          <div className="mt-4 mb-3">
            {(() => {
              const totalStamps = Math.max(4, Math.min(16, config.cafe.stampsRequired || 8));
              const slots = Array.from({ length: totalStamps }, (_, i) => i + 1);
              const half = Math.ceil(totalStamps / 2);
              const row1 = slots.slice(0, half);
              const row2 = slots.slice(half);

              const renderStampPill = (num: number) => {
                const isCompleted = num <= cafeCurrentStamps;
                return (
                  <div
                    key={num}
                    className={`h-9 sm:h-10 flex-1 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#009E49] text-white shadow-xs'
                        : 'bg-white border-2 border-dashed border-slate-200 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={18} className="stroke-[3]" />
                    ) : (
                      <span className="text-xs font-bold font-mono">
                        {num.toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                );
              };

              return (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {row1.map(renderStampPill)}
                  </div>
                  <div className="flex items-center gap-2">
                    {row2.map(renderStampPill)}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Dynamic Rule & Explanation */}
          <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 text-[11px] text-slate-600 font-medium flex items-center justify-between gap-2">
            <span>
              {isEnglish 
                ? `Every ${config.cafe.spendAmountPerStamp} SAR = 1 Stamp • ${config.cafe.rewardDescriptionEn}` 
                : `كل ${config.cafe.spendAmountPerStamp} ريال = ختم واحد • ${config.cafe.rewardDescriptionAr}`}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md shrink-0">
              {isEnglish ? 'Active Card' : 'بطاقة فعالة'}
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="w-full mt-3 bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] border border-emerald-300/80 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <QrCode size={15} />
            <span>{isEnglish ? config.cafe.buttonTextEn : config.cafe.buttonTextAr}</span>
          </button>
        </motion.div>
      )}

      {/* 2. RESTAURANT LOYALTY CARD */}
      {activeSector === 'restaurant' && (config.restaurant.isEnabled !== false || !showSectorSwitcher) && (
        <motion.div
          key="restaurant-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-xl relative overflow-hidden"
        >
          {/* Top Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="order-2 rtl:order-1 ltr:order-2">
              <span className="inline-block bg-[#fff5eb] text-[#d96500] text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border border-amber-200 shadow-2xs whitespace-nowrap">
                {isEnglish ? config.restaurant.rewardNameEn : config.restaurant.rewardNameAr}
              </span>
            </div>

            <div className="flex items-center gap-2.5 order-1 rtl:order-2 ltr:order-1 rtl:text-right ltr:text-left">
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                  {isEnglish ? config.restaurant.programNameEn : config.restaurant.programNameAr}
                </h4>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
                  {isEnglish 
                    ? `${restaurantCurrentVisits}/${config.restaurant.requiredVisits} Visits Completed` 
                    : `${restaurantCurrentVisits}/${config.restaurant.requiredVisits} زيارات مكتملة`}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <UtensilsCrossed size={20} className="stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Visits Stamp Slots */}
          <div className="mt-4 mb-3">
            {(() => {
              const totalVisits = Math.max(3, Math.min(12, config.restaurant.requiredVisits || 5));
              const slots = Array.from({ length: totalVisits }, (_, i) => i + 1);

              return (
                <div className="flex items-center gap-2">
                  {slots.map((num) => {
                    const isCompleted = num <= restaurantCurrentVisits;
                    return (
                      <div
                        key={num}
                        className={`h-10 flex-1 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs'
                            : 'bg-white border-2 border-dashed border-slate-200 text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={18} className="stroke-[3]" />
                        ) : (
                          <span className="text-xs font-bold font-mono">
                            {num.toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Dynamic Rule & Explanation */}
          <div className="bg-amber-50/60 rounded-xl p-2.5 border border-amber-100 text-[11px] text-amber-900 font-medium flex items-center justify-between gap-2">
            <span>
              {isEnglish 
                ? `Min order ${config.restaurant.minimumOrderAmount} SAR • ${config.restaurant.rewardDescriptionEn}` 
                : `حد أدنى للطلب ${config.restaurant.minimumOrderAmount} ريال • ${config.restaurant.rewardDescriptionAr}`}
            </span>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md shrink-0">
              {isEnglish ? 'Dining Rewards' : 'مكافآت الوجبات'}
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="w-full mt-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <QrCode size={15} />
            <span>{isEnglish ? config.restaurant.buttonTextEn : config.restaurant.buttonTextAr}</span>
          </button>
        </motion.div>
      )}

      {/* 3. SUPERMARKET LOYALTY CARD (Points System) */}
      {activeSector === 'supermarket' && (config.supermarket.isEnabled !== false || !showSectorSwitcher) && (
        <motion.div
          key="supermarket-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-xl relative overflow-hidden"
        >
          {/* Top Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="order-2 rtl:order-1 ltr:order-2">
              <span className="inline-block bg-emerald-100 text-[#005A2B] text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border border-emerald-300 shadow-2xs whitespace-nowrap">
                {isEnglish ? 'Points Club' : 'نادي نقاط بنده'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 order-1 rtl:order-2 ltr:order-1 rtl:text-right ltr:text-left">
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-800 leading-tight">
                  {isEnglish ? config.supermarket.programNameEn : config.supermarket.programNameAr}
                </h4>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">
                  {isEnglish ? config.supermarket.descriptionEn : config.supermarket.descriptionAr}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#005A2B] to-emerald-700 text-white flex items-center justify-center shadow-xs shrink-0">
                <ShoppingBag size={20} className="stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Points Progress Gauge Box */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 rounded-2xl p-3.5 border border-emerald-200/70 my-3">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-black text-slate-700">
                {isEnglish ? 'Your Points Balance' : 'رصيد نقاطك المتاحة'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-[#005A2B] font-mono">
                  {supermarketCurrentPoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {isEnglish ? 'pts' : 'نقطة'}
                </span>
              </div>
            </div>

            {/* Progress bar to next reward tier (e.g. 2,500) */}
            <div className="w-full bg-emerald-200/60 h-2.5 rounded-full overflow-hidden mb-2">
              <div 
                className="bg-gradient-to-r from-[#005A2B] to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (supermarketCurrentPoints / 2500) * 100)}%` }}
              />
            </div>

            {/* Reward Catalog Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {(config.supermarket.catalog || []).map((cat) => (
                <div 
                  key={cat.id} 
                  className={`text-[10px] font-black px-2 py-1 rounded-lg border flex items-center gap-1 whitespace-nowrap ${
                    supermarketCurrentPoints >= cat.requiredPoints
                      ? 'bg-[#005A2B] text-white border-emerald-700 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  <Gift size={11} className={supermarketCurrentPoints >= cat.requiredPoints ? 'text-amber-300' : 'text-slate-400'} />
                  <span>{cat.requiredPoints} {isEnglish ? 'pts' : 'نقطة'} = {cat.rewardValueSAR} {isEnglish ? 'SAR' : 'ريال'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Rule & Multiplier */}
          <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 text-[11px] text-slate-600 font-medium flex items-center justify-between gap-2">
            <span>
              {isEnglish 
                ? `Every ${config.supermarket.sarRequiredPerPoint} SAR = 1 Point • ${config.supermarket.categoryMultipliersEn}` 
                : `كل ${config.supermarket.sarRequiredPerPoint} ريال = 1 نقطة • ${config.supermarket.categoryMultipliersAr}`}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md shrink-0">
              +{config.supermarket.welcomeBonusPoints} {isEnglish ? 'bonus' : 'نقطة ترحيب'}
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="w-full mt-3 bg-emerald-50 hover:bg-emerald-100 text-[#005A2B] border border-emerald-300/80 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <QrCode size={15} />
            <span>{isEnglish ? config.supermarket.buttonTextEn : config.supermarket.buttonTextAr}</span>
          </button>
        </motion.div>
      )}

      {/* POS / Digital QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              className="bg-white rounded-[32px] p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center relative"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#005A2B] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <Award size={26} />
              </div>

              <h3 className="text-lg font-black text-slate-900">
                {isEnglish ? 'Digital Loyalty Card' : 'بطاقة الولاء الرقمية المعتمدة'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                {isEnglish 
                  ? 'Present this QR code or card number at the cashier POS to redeem rewards' 
                  : 'أظهر رمز الـ QR أو رقم البطاقة لموظف الكاشير عند المحاسبة لتطبيق الأختام والمكافآت'}
              </p>

              {/* QR Code container */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mb-3">
                <div className="w-44 h-44 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-2">
                  <QrCode size={130} className="text-slate-900" />
                  <span className="text-[10px] font-black text-slate-500 font-mono tracking-wider">
                    {loyaltyCardId}
                  </span>
                </div>
              </div>

              {/* Card Code Copy */}
              <div className="flex items-center justify-between gap-2 bg-slate-100 px-3 py-2 rounded-xl text-xs font-mono text-slate-700 mb-4 border border-slate-200">
                <span className="truncate">{loyaltyCardId}</span>
                <button
                  type="button"
                  onClick={copyCardId}
                  className="text-emerald-700 hover:text-emerald-800 font-sans font-black flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedCode ? <CheckCircle2 size={14} className="text-[#005A2B]" /> : <Copy size={14} />}
                  <span>{copiedCode ? (isEnglish ? 'Copied' : 'تم النسخ') : (isEnglish ? 'Copy' : 'نسخ')}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full bg-[#005A2B] hover:bg-[#004A23] text-white py-3 rounded-xl text-xs font-black shadow-xs cursor-pointer"
              >
                {isEnglish ? 'Done / Close' : 'إغلاق والعودة'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
