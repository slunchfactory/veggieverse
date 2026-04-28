import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import MyPageLayout from '../../../components/MyPageLayout';
import { getProductThumbnailImages } from '../../../utils/productImages';

// 관심상품 타입
interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  spectrum: string;
  description: string;
  addedAt: string;
}

// 샘플 관심상품 데이터
const SAMPLE_WISHLIST: WishlistProduct[] = [
  {
    id: 1,
    name: '볶음김치',
    price: 12000,
    category: '캔 제품',
    spectrum: '비건',
    description: '젓갈이 들어가지 않은 비건 볶음김치',
    addedAt: '2024.12.18',
  },
  {
    id: 2,
    name: '김치볶음밥',
    price: 12000,
    originalPrice: 15000,
    category: '밀키트',
    spectrum: '비건',
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트',
    addedAt: '2024.12.15',
  },
  {
    id: 4,
    name: '블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
    category: '베이커리',
    spectrum: '비건',
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    addedAt: '2024.12.12',
  },
  {
    id: 6,
    name: '잠봉뵈르',
    price: 8000,
    originalPrice: 12000,
    category: '밀키트',
    spectrum: '비건',
    description: '슬런치 팩토리의 베스트 셀러',
    addedAt: '2024.12.10',
  },
  {
    id: 3,
    name: '시금치 뇨끼',
    price: 18000,
    category: '밀키트',
    spectrum: '비건',
    description: '신선한 시금치를 넣은 수제 뇨끼',
    addedAt: '2024.12.08',
  },
  {
    id: 5,
    name: '비건 라자냐',
    price: 24000,
    category: '밀키트',
    spectrum: '비건',
    description: '식물성 치즈로 만든 정통 이탈리안 라자냐',
    addedAt: '2024.12.05',
  },
];

// 카테고리 필터
const CATEGORIES = ['전체', '밀키트', '베이커리', '캔 제품', '소스'];

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [wishlist, setWishlist] = useState<WishlistProduct[]>(SAMPLE_WISHLIST);

  const filteredWishlist = selectedCategory === '전체'
    ? wishlist
    : wishlist.filter(p => p.category === selectedCategory);

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '900px' }}>

          {/* 카테고리 필터 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: selectedCategory === cat ? 'var(--palette-text)' : 'var(--warm-gray)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: selectedCategory === cat ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--palette-text)'; }}
                onMouseLeave={(e) => { if (selectedCategory !== cat) e.currentTarget.style.color = 'var(--warm-gray)'; }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 관심상품 그리드 */}
          {filteredWishlist.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredWishlist.map((product) => {
                const images = getProductThumbnailImages(product.id);
                const mainImage = images[0] || '/veggieverse/store/thumbnails/placeholder.jpg';

                return (
                  <div key={product.id} style={{ position: 'relative' }}>
                    {/* 삭제 버튼 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                      aria-label={`${product.name} 찜 목록에서 삭제`}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '28px',
                        height: '28px',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                      }}
                    >
                      <X size={14} color="var(--warm-gray)" />
                    </button>

                    {/* 카드 */}
                    <div
                      onClick={() => navigate(`/store/product/${product.id}`)}
                      style={{ cursor: 'pointer', background: 'var(--cream)' }}
                    >
                      <div
                        style={{
                          aspectRatio: '1/1',
                          overflow: 'hidden',
                          background: 'var(--palette-bg-2)',
                          borderRadius: '4px',
                        }}
                      >
                        <img
                          src={mainImage}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/veggieverse/store/thumbnails/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div style={{ paddingTop: '12px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '4px' }}>
                          {product.category}
                        </p>
                        <h4 style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '6px', lineHeight: 1.3 }}>
                          {product.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)', textDecoration: 'line-through' }}>
                              {product.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)' }}>
                            {product.price.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <Heart size={40} color="var(--gray-lighter)" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '16px' }}>
                관심상품이 없습니다.
              </p>
              <Link
                to="/store"
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--palette-text)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                상품 둘러보기
              </Link>
            </div>
          )}
        </div>
      </MyPageLayout>
  );
};

export default WishlistPage;
