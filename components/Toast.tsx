import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #000',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '300px',
        maxWidth: '380px',
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {badgeEmoji && (
          <span style={{ fontSize: '28px', flexShrink: 0 }}>{badgeEmoji}</span>
        )}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#000',
              margin: 0,
            }}>
              {title}
            </h4>
            <button
              onClick={() => onClose(id)}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              aria-label="닫기"
            >
              <X size={16} strokeWidth={1} color="#000" />
            </button>
          </div>
          <p style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#666',
            margin: '0 0 4px 0',
          }}>
            {message}
          </p>
          {couponCode && (
            <p style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#888',
              margin: '8px 0 0 0',
            }}>
              쿠폰 코드: <span style={{ color: '#000' }}>{couponCode}</span>
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
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
