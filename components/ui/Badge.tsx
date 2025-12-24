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
  const baseClasses = 'inline-block px-2 py-0.5 text-[10px] font-bold uppercase';
  
  const variantClasses = {
    NEW: '', // 인라인 스타일로 적용
    BEST: '', // 인라인 스타일로 적용
    SOLD_OUT: '', // 인라인 스타일로 적용
    LIMITED: '', // 인라인 스타일로 적용
    SEASONAL: '', // 인라인 스타일로 적용
  };

  const variantStyles = {
    NEW: { backgroundColor: '#BFFF00', color: '#0D0D0D' }, // lime 배경, black 텍스트
    BEST: { backgroundColor: '#3D4A3A', color: '#FAF9F6' }, // olive 배경, white 텍스트
    SOLD_OUT: { backgroundColor: '#6B6B6B', color: '#FAF9F6' }, // gray 배경, white 텍스트
    LIMITED: { backgroundColor: '#0D0D0D', color: '#BFFF00' }, // black 배경, lime 텍스트
    SEASONAL: { backgroundColor: '#3D4A3A', color: '#BFFF00' }, // olive 배경, lime 텍스트
  };

  const label = children || (variant === 'SOLD_OUT' ? 'SOLD OUT' : variant);

  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={variantStyles[variant]}
    >
      {label}
    </span>
  );
};

