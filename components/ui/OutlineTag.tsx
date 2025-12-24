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
      className={`inline-block px-3.5 py-1.5 bg-transparent border border-slunch-black text-slunch-black font-sans text-xs cursor-pointer transition-all duration-150 ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

