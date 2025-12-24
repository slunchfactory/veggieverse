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
      className={`inline-block px-4 py-2 bg-slunch-black text-slunch-white-pure font-sans text-sm hover-lime cursor-pointer transition-all duration-150 ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

