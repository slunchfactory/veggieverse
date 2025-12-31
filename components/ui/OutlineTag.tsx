import React from 'react';

/**
 * OutlineTag Component - Slunch Design System v2
 *
 * 아웃라인 태그
 * - Default: 투명 배경, 검정 테두리
 * - Hover: Primary Light 배경
 */

interface OutlineTagProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const OutlineTag: React.FC<OutlineTagProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        background: 'transparent',
        border: '1px solid var(--black)',
        color: 'var(--black)',
        fontSize: '12px',
        fontWeight: 500,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--primary-50)';
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.color = 'var(--primary-dark)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'var(--black)';
        e.currentTarget.style.color = 'var(--black)';
      }}
    >
      {children}
    </span>
  );
};

