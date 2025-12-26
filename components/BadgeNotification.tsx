import React, { useEffect, useState } from 'react';
import { X, Trophy, Gift } from 'lucide-react';
import { Badge, Coupon } from '../contexts/UserContext';

interface BadgeNotificationProps {
  badge: Badge | null;
  coupon: Coupon | null;
  onClose: () => void;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, coupon, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge || coupon) {
      setIsVisible(true);
      // 5초 후 자동 닫기
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, coupon, onClose]);

  if (!badge && !coupon) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-[100] transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className="bg-white rounded-none shadow-2xl border-2 border-emerald-200 max-w-sm w-full p-6">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-2 right-2 p-1 hover:bg-stone-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-4 h-4 text-stone-400" />
        </button>

        {badge && (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-emerald-50 rounded-none flex items-center justify-center">
                <span className="text-4xl">{badge.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-stone-900">배지 획득!</span>
                </div>
                <h3 className="text-lg font-semibold text-stone-900">{badge.name}</h3>
                <p className="text-sm text-stone-600">{badge.description}</p>
              </div>
            </div>
          </div>
        )}

        {coupon && (
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 rounded-none flex items-center justify-center">
                <Gift className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-stone-900 mb-1">스토어 쿠폰 발급!</p>
                <p className="text-sm text-stone-600 mb-2">
                  {coupon.discount}{coupon.type === 'percentage' ? '%' : '원'} 할인 쿠폰
                </p>
                <div className="px-3 py-2 bg-stone-100 rounded-none">
                  <p className="font-mono text-sm font-bold text-stone-900">{coupon.code}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

