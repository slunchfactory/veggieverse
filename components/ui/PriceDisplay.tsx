import React from 'react';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  className = '',
}) => {
  const discountRate = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {originalPrice && originalPrice > price ? (
        <>
          {/* 원래 가격 - 14px, 더 연한 gray, line-through (위) */}
          <span className="line-through font-sans"
            style={{ 
              fontSize: '14px',
              color: '#CCCCCC' // 더 연한 회색
            }}
          >
            {originalPrice.toLocaleString()}원
          </span>
          {/* 할인율 | 할인된 가격 (아래, 가로 배치, 높이 맞춤) */}
          <div className="flex items-center gap-2">
            {/* 할인율 뱃지 - 11px, lime 배경, black 텍스트, 높이 맞춤 */}
            {discountRate > 0 && (
              <span className="inline-flex items-center justify-center font-bold font-mono"
                style={{ 
                  fontSize: '11px', 
                  padding: '2px 8px',
                  backgroundColor: '#BFFF00',
                  color: '#000000',
                  lineHeight: '1.2',
                  height: '20px' // 할인된 가격과 높이 맞춤
                }}
              >
                {discountRate}%
              </span>
            )}
            {/* 할인된 가격 - 18px, bold, black */}
            <span className="font-mono font-bold text-slunch-black"
              style={{ 
                fontSize: '18px', 
                fontWeight: 700,
                lineHeight: '1.2'
              }}
            >
              {price.toLocaleString()}원
            </span>
          </div>
        </>
      ) : (
        /* 할인이 없을 때 - 현재 가격만 18px, bold, black */
        <span className="font-mono font-bold text-slunch-black"
          style={{ fontSize: '18px', fontWeight: 700 }}
        >
          {price.toLocaleString()}원
        </span>
      )}
    </div>
  );
};

