import React from 'react';

/**
 * Hashtag Component - Slunch Design System v2
 *
 * 해시태그 칩
 * - Default: 검정 배경, 흰색 텍스트
 * - Hover: Fresh Veggie Green 배경, 흰색 텍스트
 */

interface HashtagProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Hashtag: React.FC<HashtagProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <span
      className={className}
      style={{
        padding: '10px 18px',
        background: 'var(--black)',
        color: 'var(--white-pure)',
        fontSize: '13px',
        fontWeight: 500,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--primary)';
        e.currentTarget.style.color = 'var(--white-pure)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--black)';
        e.currentTarget.style.color = 'var(--white-pure)';
      }}
    >
      {children}
    </span>
  );
};

