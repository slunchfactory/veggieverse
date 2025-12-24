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
  // Ghost 버튼은 size 적용 안함 (padding: 8px 0 고정)
  const sizeClasses = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-[13px]',
    lg: 'px-8 py-4 text-sm',
    xl: 'px-12 py-5 text-base',
  };

  const ghostClasses = 'px-0 py-2'; // Ghost는 항상 고정 패딩

  const baseClasses = variant === 'ghost' 
    ? `${ghostClasses} font-bold transition-all duration-150 focus-lime`
    : `${sizeClasses[size]} font-bold transition-all duration-150 focus-lime`;
  
  const variantClasses = {
    // Primary: black bg, white text → hover: lime text
    primary: 'bg-slunch-black text-slunch-white-pure hover:text-slunch-lime hover-lift',
    // Primary Lime: lime bg, black text → hover: dark lime bg
    'primary-lime': 'bg-slunch-lime text-slunch-black hover:bg-slunch-lime-dark hover-lift',
    // Secondary: transparent bg, black outline → hover: black bg, white text
    secondary: 'bg-transparent border-2 border-slunch-black text-slunch-black hover:bg-slunch-black hover:text-slunch-white-pure hover-lift',
    // Secondary Olive: transparent bg, olive outline → hover: olive bg, white text
    'secondary-olive': 'bg-transparent border-2 border-slunch-olive text-slunch-olive hover:bg-slunch-olive hover:text-slunch-white-pure hover-lift',
    // Secondary Gray: gray bg, white text
    'secondary-gray': 'bg-slunch-gray text-slunch-white-pure hover-lift',
    // Ghost: transparent, underline → hover: lime text/border (padding: 8px 0)
    ghost: 'bg-transparent text-slunch-black border-0 border-b border-slunch-black px-0 py-2 hover:text-slunch-lime hover:border-slunch-lime',
    // Olive Accent: olive bg, white text
    olive: 'bg-slunch-olive text-slunch-white-pure hover-lift',
  };

  const disabledClasses = disabled
    ? 'bg-slunch-gray-light text-slunch-white-pure opacity-60 cursor-not-allowed'
    : '';

  return (
    <button
      className={`${baseClasses} ${disabled ? disabledClasses : variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

