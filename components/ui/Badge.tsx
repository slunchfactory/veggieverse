import React from 'react';

/**
 * Badge Component - Slunch Design System v2
 *
 * Variants (원형 뱃지):
 * - NEW: Corn Yellow 배경, 검정 텍스트
 * - BEST: Fresh Veggie Green 배경, 흰색 텍스트
 * - SOLD_OUT: Muted Gray 배경, 흰색 텍스트
 */

interface BadgeProps {
  variant: 'NEW' | 'BEST' | 'SOLD_OUT';
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className = '',
}) => {
  // 원형 뱃지 기본 스타일
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    fontSize: '9px',
    fontWeight: 600,
    borderRadius: '50%',
    letterSpacing: '0.02em',
    textAlign: 'center',
    lineHeight: '1.1',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    // NEW: Sky Blue - 신상품 강조
    NEW: { ...baseStyles, backgroundColor: 'var(--palette-sky)', color: '#ffffff' },
    // BEST: Fresh Veggie Green - 베스트셀러
    BEST: { ...baseStyles, backgroundColor: 'var(--primary)', color: 'var(--white-pure)' },
    // SOLD_OUT: Muted Gray - 품절 상태
    SOLD_OUT: { ...baseStyles, backgroundColor: 'var(--muted)', color: 'var(--white-pure)' },
  };

  const label = children || (variant === 'SOLD_OUT' ? 'SOLD\nOUT' : variant);

  return (
    <span
      className={className}
      style={{
        ...variantStyles[variant],
        whiteSpace: 'pre-line',
      }}
    >
      {label}
    </span>
  );
};

