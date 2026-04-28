import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Heart, MessageSquare, ChevronRight } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import MyPageLayout from '../../components/MyPageLayout';

// 최근 주문 mock 데이터
const RECENT_ORDERS = [
  { id: 'ORD-2024-001', name: '김치볶음밥 밀키트', date: '2024.12.28', status: '배송완료' as const, price: 12000 },
  { id: 'ORD-2024-002', name: '시금치 뇨끼', date: '2024.12.25', status: '배송중' as const, price: 18000 },
];

const MyHome: React.FC = () => {
  const { user } = useUser();

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '900px' }}>
        {/* 프로필 요약 카드 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '4px',
            border: '1px solid rgba(26, 10, 5, 0.08)',
            marginBottom: '32px',
          }}
        >
          {/* 프로필 이미지 */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {user?.profileImage ? (
              <img src={user.profileImage} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={32} color="var(--muted)" />
            )}
          </div>

          {/* 사용자 정보 */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '4px' }}>
              {user?.username || 'Guest'}
            </p>
            {user?.spiritName && (
              <p style={{ fontSize: '13px', fontWeight: 400, color: 'var(--warm-gray)', marginBottom: '4px' }}>
                {user.spiritName} · {user.spiritType}
              </p>
            )}
            <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>
              배지 {user?.badges.length || 0}개
            </p>
          </div>

          {/* 프로필 수정 링크 */}
          <Link
            to="/mypage/edit"
            style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            프로필 수정
          </Link>
        </div>

        {/* 활동 통계 */}
        <div
          className="grid grid-cols-3 gap-4"
          style={{ marginBottom: '32px' }}
        >
          {[
            { label: '레시피', value: user?.recipes || 0, icon: <MessageSquare size={18} color="var(--muted)" /> },
            { label: '댓글', value: user?.comments || 0, icon: <MessageSquare size={18} color="var(--muted)" /> },
            { label: '좋아요', value: user?.likes || 0, icon: <Heart size={18} color="var(--muted)" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                padding: '20px 12px',
                background: '#FFFFFF',
                borderRadius: '4px',
                border: '1px solid rgba(26, 10, 5, 0.08)',
              }}
            >
              <p style={{ fontSize: '20px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '4px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 최근 주문 */}
        <SectionCard title="최근 주문" moreLink="/mypage/orders">
          {RECENT_ORDERS.length === 0 ? (
            <p style={{ fontSize: '14px', color: 'var(--muted)', textAlign: 'center', padding: '24px 0' }}>
              주문 내역이 없습니다.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(26, 10, 5, 0.05)',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '4px' }}>
                      {order.name}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {order.date}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <OrderStatusBadge status={order.status} />
                    <p style={{ fontSize: '13px', fontWeight: 400, color: 'var(--palette-text)', marginTop: '4px' }}>
                      {order.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* 빠른 메뉴 */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {[
              { label: '관심상품', path: '/mypage/wishlist', icon: <Heart size={16} color="var(--warm-gray)" /> },
              { label: '레시피 북마크', path: '/mypage/bookmarks', icon: <ShoppingBag size={16} color="var(--warm-gray)" /> },
              { label: '상품 리뷰', path: '/mypage/reviews', icon: <MessageSquare size={16} color="var(--warm-gray)" /> },
              { label: '회원정보', path: '/mypage/info', icon: <User size={16} color="var(--warm-gray)" /> },
            ].map((menu) => (
              <Link
                key={menu.path}
                to={menu.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: '#FFFFFF',
                  textDecoration: 'none',
                  border: '1px solid rgba(26, 10, 5, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {menu.icon}
                  <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)' }}>{menu.label}</span>
                </div>
                <ChevronRight size={16} color="var(--muted)" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MyPageLayout>
  );
};

// 섹션 카드 컴포넌트
const SectionCard: React.FC<{
  title: string;
  moreLink: string;
  children: React.ReactNode;
}> = ({ title, moreLink, children }) => (
  <div
    style={{
      background: '#FFFFFF',
      borderRadius: '4px',
      border: '1px solid rgba(26, 10, 5, 0.08)',
      padding: '20px',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      <h3 style={{ fontSize: '15px', fontWeight: 400, color: 'var(--palette-text)' }}>{title}</h3>
      <Link
        to={moreLink}
        style={{
          fontSize: '13px',
          fontWeight: 400,
          color: 'var(--warm-gray)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        더보기
        <ChevronRight size={14} />
      </Link>
    </div>
    {children}
  </div>
);

// 주문 상태 뱃지
const OrderStatusBadge: React.FC<{ status: '배송중' | '배송완료' | '준비중' }> = ({ status }) => {
  const colorMap = {
    '배송중': 'var(--status-progress-icon)',
    '배송완료': 'var(--muted)',
    '준비중': 'var(--palette-text)',
  };

  return (
    <span
      style={{
        fontSize: '12px',
        fontWeight: 400,
        color: colorMap[status],
        padding: '2px 8px',
        border: `1px solid ${colorMap[status]}`,
        borderRadius: '2px',
      }}
    >
      {status}
    </span>
  );
};

export default MyHome;
