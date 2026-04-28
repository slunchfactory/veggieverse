import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface BadgeAcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  spiritName?: string;
  badgeEmoji?: string;
  couponCode?: string;
  couponName?: string;
}

export const BadgeAcquisitionModal: React.FC<BadgeAcquisitionModalProps> = ({
  isOpen,
  onClose,
  spiritName,
  badgeEmoji = '🏆',
  couponCode,
  couponName = '슬런치 팩토리 10% 할인 쿠폰',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-[3000]"
        onClick={onClose}
        style={{
          background: 'rgba(26, 10, 5, 0.4)',
        }}
      />

      {/* 모달 컨테이너 */}
      <div
        className="fixed inset-0 z-[3001] flex items-center justify-center p-4 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-auto"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--palette-text)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '400px',
            padding: '48px 32px',
            position: 'relative',
            transform: isAnimating ? 'translateY(0)' : 'translateY(8px)',
            opacity: isAnimating ? 1 : 0,
            transition: 'all 0.3s ease-out',
          }}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
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

          {/* 콘텐츠 */}
          <div>
            {/* 상단: 축하 영역 */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              {/* 배지 아이콘 */}
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    border: '1px solid var(--palette-text)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--palette-bg-2)',
                  }}
                >
                  <span style={{ fontSize: '40px' }}>{badgeEmoji}</span>
                </div>
              </div>

              {/* 축하 메시지 */}
              <h2 style={{
                fontSize: '20px',
                fontWeight: 400,
                color: 'var(--palette-text)',
                marginBottom: '8px',
              }}>
                미션 완료!
              </h2>
              {spiritName && (
                <p style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--warm-gray)',
                }}>
                  {spiritName} 배지를 획득했습니다
                </p>
              )}
            </div>

            {/* 중앙: 보상 영역 */}
            {couponCode && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  border: '1px solid var(--palette-text)',
                  borderRadius: '8px',
                  padding: '20px',
                }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--warm-gray)',
                    marginBottom: '4px',
                  }}>
                    {couponName} 발급 완료
                  </p>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'var(--gray-light)',
                    marginBottom: '16px',
                  }}>
                    쿠폰 코드
                  </p>
                  <div style={{
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-divider)',
                  }}>
                    <p style={{
                      fontSize: '20px',
                      fontWeight: 400,
                      color: 'var(--palette-text)',
                      textAlign: 'center',
                      letterSpacing: '0.1em',
                    }}>
                      {couponCode}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 하단: 액션 버튼 */}
            <div>
              {/* 메인 버튼 */}
              <Link
                to="/profile"
                onClick={onClose}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px',
                  background: 'var(--palette-text)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#fff',
                  textAlign: 'center',
                  textDecoration: 'none',
                  marginBottom: '12px',
                  boxSizing: 'border-box',
                }}
              >
                내 프로필에서 배지 확인하기
              </Link>

              {/* 보조 링크 */}
              <button
                onClick={onClose}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'var(--gray-light)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                계속 레시피 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
