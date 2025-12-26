import React from 'react';

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
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--lime)';
        e.currentTarget.style.color = 'var(--black)';
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

