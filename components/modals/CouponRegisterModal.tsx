import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

interface CouponRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (code: string) => void;
}

export const CouponRegisterModal: React.FC<CouponRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      setStatus('error');
      setMessage('쿠폰 코드를 입력해주세요.');
      return;
    }

    // 쿠폰 코드 검증 시뮬레이션
    if (couponCode.toUpperCase() === 'WELCOME10' || couponCode.toUpperCase() === 'VEGGIE2026') {
      setStatus('success');
      setMessage('쿠폰이 등록되었습니다!');
      if (onRegister) {
        onRegister(couponCode);
      }
      setTimeout(() => {
        onClose();
        setCouponCode('');
        setStatus('idle');
        setMessage('');
      }, 1500);
    } else {
      setStatus('error');
      setMessage('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const handleClose = () => {
    onClose();
    setCouponCode('');
    setStatus('idle');
    setMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(26, 10, 5, 0.4)' }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#FFFFFF',
          border: '1px solid var(--palette-text)',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative',
          margin: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label="닫기"
        >
          <X size={20} strokeWidth={1} color="var(--palette-text)" />
        </button>

        {/* 헤더 */}
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--palette-text)',
        }}>
          쿠폰 등록
        </h2>

        {/* 설명 */}
        <p style={{
          fontSize: '13px',
          fontWeight: 400,
          color: 'var(--warm-gray)',
          textAlign: 'center',
          marginBottom: '24px',
          lineHeight: '1.5',
        }}>
          보유하신 쿠폰 코드를 입력해주세요.
        </p>

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="쿠폰 코드 입력"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setStatus('idle');
              setMessage('');
            }}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '12px',
              border: status === 'error' ? '1px solid var(--palette-orange)' : '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              outline: 'none',
              boxSizing: 'border-box',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          />

          {/* 상태 메시지 */}
          {message && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: 400,
                color: status === 'success' ? 'var(--status-success-icon)' : 'var(--palette-orange)',
              }}
            >
              {status === 'success' ? (
                <Check size={16} strokeWidth={1.5} />
              ) : (
                <AlertCircle size={16} strokeWidth={1.5} />
              )}
              {message}
            </div>
          )}

          {/* 등록 버튼 */}
          <button
            type="submit"
            disabled={status === 'success'}
            style={{
              width: '100%',
              padding: '14px',
              background: status === 'success' ? 'var(--palette-mint)' : 'var(--palette-text)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: status === 'success' ? 'var(--palette-text)' : 'var(--primary)',
              cursor: status === 'success' ? 'default' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {status === 'success' ? '등록 완료' : '쿠폰 등록하기'}
          </button>
        </form>

        {/* 안내 */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'var(--palette-bg-2)',
          borderRadius: '8px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 400,
            color: 'var(--muted)',
            lineHeight: '1.6',
          }}>
            • 쿠폰은 중복 사용이 불가합니다.<br />
            • 유효기간이 지난 쿠폰은 사용할 수 없습니다.<br />
            • 일부 상품은 쿠폰 적용이 제외될 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponRegisterModal;
