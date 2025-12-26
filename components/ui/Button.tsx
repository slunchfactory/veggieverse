import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'primary-lime' | 'secondary' | 'secondary-olive' | 'secondary-gray' | 'ghost' | 'olive';
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
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-[13px]',
    lg: 'px-8 py-4 text-sm',
    xl: 'px-12 py-5 text-base',
  };

  const ghostClasses = 'px-0 py-2'; // Ghost는 항상 고정 패딩

  const baseClasses = variant === 'ghost' 
    ? `${ghostClasses} font-bold transition-all duration-150`
    : `${sizeClasses[size]} font-bold transition-all duration-150`;
  
  const variantStyles: Record<string, React.CSSProperties> = {
    // Primary: black bg, white text → hover: lime bg, black text
    primary: {
      background: 'var(--black)',
      color: 'var(--white-pure)',
    },
    // Primary Lime: lime bg, black text → hover: dark lime bg
    'primary-lime': {
      background: 'var(--lime)',
      color: 'var(--black)',
    },
    // Secondary: transparent bg, black outline (1px) → hover: black bg, white text
    secondary: {
      background: 'transparent',
      border: '1px solid var(--black)',
      color: 'var(--black)',
    },
    // Secondary Olive: transparent bg, olive outline → hover: olive bg, white text
    'secondary-olive': {
      background: 'transparent',
      border: '1px solid var(--olive)',
      color: 'var(--olive)',
    },
    // Secondary Gray: gray bg, white text
    'secondary-gray': {
      background: 'var(--gray)',
      color: 'var(--white-pure)',
    },
    // Ghost: transparent, underline → hover: underline (text only)
    ghost: {
      background: 'transparent',
      color: 'var(--black)',
      border: 'none',
    },
    // Olive Accent: olive bg, white text
    olive: {
      background: 'var(--olive)',
      color: 'var(--white-pure)',
    },
  };

  const buttonStyle = disabled
    ? { background: 'var(--gray-light)', color: 'var(--white-pure)', opacity: 0.6, cursor: 'not-allowed' }
    : variantStyles[variant] || variantStyles.primary;

  return (
    <button
      className={`${baseClasses} ${className}`}
      style={buttonStyle}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.background = 'var(--lime)';
          e.currentTarget.style.color = 'var(--black)';
        } else if (!disabled && variant === 'primary-lime') {
          e.currentTarget.style.background = 'var(--lime-dark)';
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.background = 'var(--black)';
          e.currentTarget.style.color = 'var(--white-pure)';
        } else if (!disabled && variant === 'secondary-olive') {
          e.currentTarget.style.background = 'var(--olive)';
          e.currentTarget.style.color = 'var(--white-pure)';
        } else if (!disabled && variant === 'ghost') {
          e.currentTarget.style.textDecoration = 'underline';
          e.currentTarget.style.textUnderlineOffset = '4px';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const defaultStyle = variantStyles[variant] || variantStyles.primary;
          e.currentTarget.style.background = defaultStyle.background as string || '';
          e.currentTarget.style.color = defaultStyle.color as string || '';
          e.currentTarget.style.border = (defaultStyle.border as string) || '';
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

