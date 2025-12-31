import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare } from 'lucide-react';
import MyPageLayout from '../../components/MyPageLayout';

// 리뷰 타입
interface Review {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

// 작성 가능한 리뷰 타입
interface PendingReview {
  orderId: string;
  orderDate: string;
  productId: number;
  productName: string;
  productImage: string;
  expiresAt: string;
}

// 샘플 작성 완료 리뷰
const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    productName: '볶음김치',
    productImage: '/veggieverse/store/thumbnails/kimchi.jpg',
    rating: 5,
    content: '정말 맛있어요! 젓갈이 없어서 걱정했는데 감칠맛이 살아있네요. 김치찌개 끓여먹으니 최고였습니다. 재구매 의사 100%입니다.',
    images: [],
    createdAt: '2024.12.10',
    helpful: 12,
  },
  {
    id: 2,
    productId: 3,
    productName: '시금치 뇨끼',
    productImage: '/veggieverse/store/thumbnails/gnocchi.jpg',
    rating: 4,
    content: '뇨끼가 쫄깃쫄깃하고 시금치 향이 은은해서 좋았어요. 소스도 맛있었는데 양이 조금 더 많았으면 좋겠네요.',
    images: [],
    createdAt: '2024.11.28',
    helpful: 8,
  },
  {
    id: 3,
    productId: 4,
    productName: '블루베리 타르트',
    productImage: '/veggieverse/store/thumbnails/blueberry-tart.jpg',
    rating: 5,
    content: '비건 디저트라고 믿기지 않을 정도로 맛있어요! 블루베리도 신선하고 타르트 크러스트도 바삭해요. 선물용으로도 좋을 것 같아요.',
    images: [],
    createdAt: '2024.11.15',
    helpful: 24,
  },
];

// 샘플 작성 가능 리뷰
const SAMPLE_PENDING_REVIEWS: PendingReview[] = [
  {
    orderId: 'ORD-2024121501',
    orderDate: '2024.12.15',
    productId: 3,
    productName: '시금치 뇨끼',
    productImage: '/veggieverse/store/thumbnails/gnocchi.jpg',
    expiresAt: '2025.01.15',
  },
  {
    orderId: 'ORD-2024120501',
    orderDate: '2024.12.05',
    productId: 5,
    productName: '비건 라자냐',
    productImage: '/veggieverse/store/thumbnails/lasagna.jpg',
    expiresAt: '2025.01.05',
  },
];

const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'written' | 'pending'>('written');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#000000' : '#D4D4D4', fontSize: '14px' }}>★</span>
    ));
  };

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '800px' }}>
          {/* 탭 */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTab('written')}
              style={{
                padding: '0',
                fontSize: '14px',
                fontWeight: 400,
                color: activeTab === 'written' ? '#000000' : '#6B6B6B',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: activeTab === 'written' ? 'underline' : 'none',
                textUnderlineOffset: '4px',
              }}
            >
              작성한 리뷰 ({SAMPLE_REVIEWS.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              style={{
                padding: '0',
                fontSize: '14px',
                fontWeight: 400,
                color: activeTab === 'pending' ? '#000000' : '#6B6B6B',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: activeTab === 'pending' ? 'underline' : 'none',
                textUnderlineOffset: '4px',
              }}
            >
              작성 가능 ({SAMPLE_PENDING_REVIEWS.length})
            </button>
          </div>

          {/* 작성한 리뷰 목록 */}
          {activeTab === 'written' && (
            <div className="space-y-4">
              {SAMPLE_REVIEWS.length > 0 ? (
                SAMPLE_REVIEWS.map((review) => (
                  <div key={review.id} style={{ background: '#F7F4EF', borderRadius: '6px', padding: '20px' }}>
                    {/* 상품 정보 */}
                    <div className="flex gap-3 mb-4">
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          background: '#E5E5E0',
                          borderRadius: '4px',
                          flexShrink: 0,
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={review.productImage}
                          alt={review.productName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 400, color: '#000000', marginBottom: '4px' }}>
                          {review.productName}
                        </p>
                        <div style={{ marginBottom: '4px' }}>{renderStars(review.rating)}</div>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>{review.createdAt}</p>
                      </div>
                    </div>

                    {/* 리뷰 내용 */}
                    <p style={{ fontSize: '14px', fontWeight: 400, color: '#000000', lineHeight: 1.6, marginBottom: '12px' }}>
                      {review.content}
                    </p>

                    {/* 리뷰 이미지 */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: '80px',
                              height: '80px',
                              background: '#E5E5E0',
                              borderRadius: '4px',
                              overflow: 'hidden',
                            }}
                          >
                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 푸터 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>
                        {review.helpful}명에게 도움이 됨
                      </span>
                      <button
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#6B6B6B',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        수정
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                  <MessageSquare size={40} color="#D4D4D4" style={{ marginBottom: '16px' }} />
                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#6B6B6B' }}>작성한 리뷰가 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 작성 가능한 리뷰 목록 */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {SAMPLE_PENDING_REVIEWS.length > 0 ? (
                SAMPLE_PENDING_REVIEWS.map((item) => (
                  <div key={item.orderId + item.productId} style={{ background: '#F7F4EF', borderRadius: '6px', padding: '20px' }}>
                    <div className="flex gap-3 items-center">
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          background: '#E5E5E0',
                          borderRadius: '4px',
                          flexShrink: 0,
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', fontWeight: 400, color: '#000000', marginBottom: '4px' }}>
                          {item.productName}
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>
                          주문일: {item.orderDate}
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: '#D64545' }}>
                          {item.expiresAt}까지 작성 가능
                        </p>
                      </div>
                      <button
                        style={{
                          padding: '10px 16px',
                          fontSize: '13px',
                          fontWeight: 400,
                          background: '#000000',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        리뷰 쓰기
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                  <Star size={40} color="#D4D4D4" style={{ marginBottom: '16px' }} />
                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#6B6B6B' }}>작성 가능한 리뷰가 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </MyPageLayout>
  );
};

export default ReviewsPage;
