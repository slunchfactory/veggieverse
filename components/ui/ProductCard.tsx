import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './Badge';

interface ProductCardProps {
  id: number;
  title: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  badge?: 'NEW' | 'BEST' | 'SOLD_OUT';
  href?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  originalPrice,
  image,
  badge,
  href,
  onClick,
}) => {
  const cardContent = (
    <div
      className="bg-cream border border-black rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Image Container */}
      {image && (
        <div className="relative w-full aspect-square overflow-hidden mb-[13px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {badge && (
            <div className="absolute top-2 left-2">
              <Badge variant={badge} />
            </div>
          )}
        </div>
      )}

      {/* Content - 넉넉한 패딩 */}
      <div className="p-6">
        <h3 className="font-normal text-slunch-black mb-[8px] leading-tight" style={{ fontSize: '16px' }}>
          {title}
        </h3>
        {description && (
          <p className="font-sans text-slunch-gray text-sm mb-[13px] leading-relaxed">
            {description}
          </p>
        )}
        {price !== undefined && (
          <div className="flex items-baseline gap-2">
            {originalPrice && originalPrice > price && (
              <span className="font-sans text-slunch-gray-light line-through text-sm">
                {originalPrice.toLocaleString()}원
              </span>
            )}
            <span className="font-mono font-normal text-slunch-black" style={{ fontSize: '15px', fontWeight: 400 }}>
              {price.toLocaleString()}원
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};





