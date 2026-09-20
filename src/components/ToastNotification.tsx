import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  isEnglish?: boolean;
  currentLangCode?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
  isEnglish = false,
  currentLangCode
}) => {
  const isRTL = currentLangCode ? (currentLangCode === 'ar' || currentLangCode === 'ur') : !isEnglish;
  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none`}
    >
      <AnimatePresence>
        {toasts.map(toast => {
          const type = toast.type || 'success';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md ${
                type === 'success'
                  ? 'bg-emerald-900/95 text-white border-emerald-500/40 shadow-emerald-950/20'
                  : type === 'warning'
                  ? 'bg-amber-900/95 text-white border-amber-500/40 shadow-amber-950/20'
                  : type === 'error'
                  ? 'bg-rose-900/95 text-white border-rose-500/40 shadow-rose-950/20'
                  : 'bg-slate-900/95 text-white border-slate-700 shadow-slate-950/20'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                {type === 'warning' && <AlertCircle size={18} className="text-amber-400 shrink-0" />}
                {type === 'error' && <AlertCircle size={18} className="text-rose-400 shrink-0" />}
                {type === 'info' && <Info size={18} className="text-blue-400 shrink-0" />}
                <p className="text-xs font-bold leading-snug truncate">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
