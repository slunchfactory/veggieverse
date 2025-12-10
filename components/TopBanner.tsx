import React from 'react';
import { Link } from 'react-router-dom';

interface TopBannerProps {
  onClose: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] w-full h-8 flex items-center" 
      style={{ backgroundColor: '#2E9E39' }}
    >
      <div className="w-full flex items-center justify-center text-white text-xs font-medium relative">
        <Link to="/event" className="hover:underline text-center">
          🎁 슬런치가 처음이신 고객님은 지금 가입하고 할인쿠폰 받아가세요!
        </Link>
        <button
          onClick={onClose}
          className="absolute right-2 text-white text-sm px-1 hover:opacity-80"
          aria-label="배너 닫기"
        >
          ×
        </button>
      </div>
    </div>
  );
};

