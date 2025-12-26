import React from 'react';

interface CategoryPillProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  children,
  active = false,
  className = '',
  onClick,
}) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        padding: '10px 20px',
        borderRadius: '100px',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        backgroundColor: active ? 'var(--black)' : 'transparent',
        color: active ? 'var(--lime)' : 'var(--black)',
        border: active ? 'none' : '1px solid var(--gray-light)',
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

