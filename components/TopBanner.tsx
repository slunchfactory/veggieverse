import React from 'react';
import { Link } from 'react-router-dom';

interface TopBannerProps {
  onClose: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onClose }) => {
  return (
    <div 
      className="promo-bar fixed top-0 left-0 right-0 z-[60] w-full"
      style={{ 
        height: 'var(--promo-h)',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
      }}
    >
      <div 
        className="w-full flex items-center justify-center relative"
        style={{ 
          color: '#ffffff',
          fontSize: '12px',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Link 
          to="/event" 
          className="hover:underline text-center"
          style={{ 
            fontSize: '12px',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          🎁 슬런치가 처음이신 고객님은 지금 가입하고 할인쿠폰 받아가세요!
        </Link>
        <button
          onClick={onClose}
          className="absolute right-2 px-1 hover:opacity-80 flex items-center justify-center"
          style={{ 
            color: '#ffffff',
            fontSize: '14px',
            lineHeight: 1,
            minWidth: '24px',
            minHeight: '24px',
          }}
          aria-label="배너 닫기"
        >
          ×
        </button>
      </div>
    </div>
  );
};

