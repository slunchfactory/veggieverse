import React from 'react';

interface BadgeProps {
  variant: 'NEW' | 'BEST' | 'SOLD_OUT' | 'LIMITED' | 'SEASONAL';
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className = '',
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 700,
  };
  
  const variantStyles: Record<string, React.CSSProperties> = {
    NEW: { ...baseStyles, backgroundColor: 'var(--lime)', color: 'var(--black)' },
    BEST: { ...baseStyles, backgroundColor: 'var(--olive)', color: 'var(--white-pure)' },
    SOLD_OUT: { ...baseStyles, backgroundColor: 'var(--gray)', color: 'var(--white-pure)' },
    LIMITED: { ...baseStyles, backgroundColor: 'var(--black)', color: 'var(--lime)' },
    SEASONAL: { ...baseStyles, backgroundColor: 'var(--olive)', color: 'var(--lime)' },
  };

  const label = children || (variant === 'SOLD_OUT' ? 'SOLD OUT' : variant);

  return (
    <span 
      className={className}
      style={variantStyles[variant]}
    >
      {label}
    </span>
  );
};

