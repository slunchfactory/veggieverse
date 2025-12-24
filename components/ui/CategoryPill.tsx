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
  const baseClasses = 'inline-block px-5 py-2.5 rounded-full font-sans text-sm font-medium cursor-pointer transition-all duration-150';
  
  const activeClasses = active
    ? 'bg-slunch-black text-slunch-lime'
    : 'bg-transparent border border-slunch-gray-light text-slunch-black';

  return (
    <span
      className={`${baseClasses} ${activeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

