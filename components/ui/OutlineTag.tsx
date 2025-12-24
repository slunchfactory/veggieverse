import React from 'react';

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
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--lime)';
        e.currentTarget.style.color = 'var(--black)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--black)';
      }}
    >
      {children}
    </span>
  );
};

