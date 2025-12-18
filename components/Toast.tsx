import React, { useEffect } from 'react';
import { X, Trophy, Gift, CheckCircle } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'badge' | 'coupon' | 'success' | 'info';
  title: string;
  message: string;
  badgeEmoji?: string;
  couponCode?: string;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  badgeEmoji,
  couponCode,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'badge':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'coupon':
        return <Gift className="w-5 h-5 text-pink-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'badge':
        return 'bg-amber-50 border-amber-200';
      case 'coupon':
        return 'bg-pink-50 border-pink-200';
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-stone-50 border-stone-200';
    }
  };

  return (
    <div
      className={`${getBgColor()} border-2 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md animate-slideInRight`}
    >
      <div className="flex items-start gap-3">
        {badgeEmoji && (
          <span className="text-3xl flex-shrink-0">{badgeEmoji}</span>
        )}
        {!badgeEmoji && getIcon()}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-stone-900 text-sm">{title}</h4>
            <button
              onClick={() => onClose(id)}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-stone-700 mb-1">{message}</p>
          {couponCode && (
            <p className="text-xs text-stone-600 mt-2">
              쿠폰 코드: <span className="font-bold">{couponCode}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[2000] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

