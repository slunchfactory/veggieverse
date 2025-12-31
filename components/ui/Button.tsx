import React from 'react';

/**
 * Button Component - Slunch Design System v2
 *
 * Variants:
 * - primary: Fresh Veggie Green 배경, 흰색 텍스트
 * - secondary: 투명 배경, 검정 실선 테두리
 * - ghost: 투명 배경, 텍스트만 (호버 시 밑줄)
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  // Size configurations (padding / font-size)
  const sizeClasses = {
    sm: 'px-4 py-2 text-[12px]',
    md: 'px-6 py-3 text-[13px]',
    lg: 'px-8 py-4 text-sm',
    xl: 'px-12 py-5 text-base',
  };

  const ghostClasses = 'px-0 py-2';

  const baseClasses = variant === 'ghost'
    ? `${ghostClasses} font-medium transition-all duration-200`
    : `${sizeClasses[size]} font-semibold transition-all duration-200 rounded-md`;

  const variantStyles: Record<string, React.CSSProperties> = {
    // Primary: Fresh Veggie Green bg, white text
    primary: {
      background: 'var(--primary)',
      color: 'var(--white-pure)',
      border: 'none',
      borderRadius: '6px',
    },
    // Secondary: transparent bg, black border
    secondary: {
      background: 'transparent',
      border: '1px solid var(--black)',
      color: 'var(--black)',
      borderRadius: '6px',
    },
    // Ghost: transparent, no border
    ghost: {
      background: 'transparent',
      color: 'var(--warm-gray)',
      border: 'none',
    },
  };

  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary-dark)',
      color: 'var(--white-pure)',
    },
    secondary: {
      background: 'var(--black)',
      color: 'var(--white-pure)',
    },
    ghost: {
      color: 'var(--primary)',
    },
  };

  const buttonStyle = disabled
    ? {
        background: 'var(--gray-lighter)',
        color: 'var(--warm-gray)',
        cursor: 'not-allowed',
        border: 'none',
        borderRadius: '6px',
      }
    : variantStyles[variant] || variantStyles.primary;

  return (
    <button
      className={`${baseClasses} ${className}`}
      style={buttonStyle}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          const hover = hoverStyles[variant];
          if (hover) {
            if (hover.background) e.currentTarget.style.background = hover.background as string;
            if (hover.color) e.currentTarget.style.color = hover.color as string;
            if (variant === 'ghost') {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const defaultStyle = variantStyles[variant] || variantStyles.primary;
          e.currentTarget.style.background = defaultStyle.background as string || '';
          e.currentTarget.style.color = defaultStyle.color as string || '';
          if (variant === 'ghost') {
            e.currentTarget.style.textDecoration = 'none';
          }
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
