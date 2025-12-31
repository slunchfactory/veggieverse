import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { TopControlBar, TabItem } from '../components/TopControlBar';

// 스피릿 이미지 타입
interface SpiritProfile {
  profileImage: string | null;
  veganType: string | null;
  savedAt: string | null;
}

const myPageTabs: TabItem[] = [
  { id: 'home', label: '홈' },
  { id: 'orders', label: '주문/배송' },
  { id: 'bookmarks', label: '레시피 북마크' },
  { id: 'wishlist', label: '관심상품' },
  { id: 'reviews', label: '리뷰' },
  { id: 'info', label: '내정보' },
];

const ProfilePage: React.FC = () => {
  const { user, coupons } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [spiritProfile, setSpiritProfile] = useState<SpiritProfile | null>(null);

  // localStorage에서 스피릿 프로필 로드
  useEffect(() => {
    const savedProfile = localStorage.getItem('veggieverse-profile');
    if (savedProfile) {
      try {
        setSpiritProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to load spirit profile:', e);
      }
    }
  }, []);

  // 탭 변경시 해당 페이지로 이동
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigate('/mypage');
    } else if (tabId === 'orders') {
      navigate('/mypage/orders');
    } else if (tabId === 'bookmarks') {
      navigate('/mypage/bookmarks');
    } else if (tabId === 'wishlist') {
      navigate('/mypage/wishlist');
    } else if (tabId === 'reviews') {
      navigate('/mypage/reviews');
    } else if (tabId === 'info') {
      navigate('/mypage/edit');
    }
  };

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--cream)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 400, color: '#6B6B6B', marginBottom: '16px' }}>
            로그인이 필요합니다.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 400,
              background: '#000000',
              color: '#fff',
              border: '1px solid #000000',
              textDecoration: 'none',
            }}
          >
            테스트 시작하기
          </Link>
        </div>
      </div>
    );
  }

  const unusedCoupons = coupons.filter(c => !c.used);

  // Mock 데이터: 최근 주문 내역 (최대 2개만 표시)
  const recentOrders = [
    {
      id: 1,
      date: '2024.12.15',
      productName: '볶음김치 외 1건',
      thumbnail: '/veggieverse/store/thumbnails/kimchi.jpg',
      orderNumber: 'ORD-241215-001',
      price: 24000,
      status: '배송중',
    },
    {
      id: 2,
      date: '2024.12.10',
      productName: '김치볶음밥',
      thumbnail: '/veggieverse/store/thumbnails/kimchi-fried-rice.jpg',
      orderNumber: 'ORD-241210-003',
      price: 12000,
      status: '배송완료',
    },
  ];

  // 회원 등급
  const getUserLevel = () => {
    const totalSpent = 0;
    const orderCount = 0;
    if (totalSpent >= 200000) return { name: 'HARVEST', desc: '최고 등급', color: '#DAA520' };
    if (totalSpent >= 50000 || orderCount >= 2) return { name: 'GREEN', desc: '성장 등급', color: '#4CAF50' };
    return { name: 'FRESH', desc: '시작 등급', color: '#8BC34A' };
  };

  const userLevel = getUserLevel();
  const points = 1500;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* TopControlBar - KBP Style */}
      <TopControlBar
        tabs={myPageTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Content */}
      <main className="w-full max-w-[900px] mx-auto p-4 md:p-6 lg:p-8" style={{ paddingTop: '80px' }}>

        {/* 스피릿 프로필 */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* 스피릿 이미지 */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#F5F5F5',
                border: '1px solid #E5E5E5',
                flexShrink: 0,
              }}
            >
              {spiritProfile?.profileImage ? (
                <img
                  src={spiritProfile.profileImage}
                  alt="My Spirit"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                  }}
                >
                  🌱
                </div>
              )}
            </div>
            {/* 인사말 */}
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 400, color: '#000000', marginBottom: '4px' }}>
                반갑습니다, {user.spiritName || user.username}님
              </h1>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>
                {user.spiritName} 스피릿
              </p>
            </div>
          </div>
        </section>

        {/* 회원등급 / 쿠폰 / 포인트 */}
        <section style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid #000',
              borderBottom: '1px solid #000',
            }}
          >
            {[
              { label: '회원등급', value: userLevel.name, path: '/mypage/level' },
              { label: '보유쿠폰', value: `${unusedCoupons.length}장`, path: '/mypage/coupons' },
              { label: '포인트', value: `${points.toLocaleString()}P`, path: '/mypage/points' },
            ].map((item, idx) => (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  borderLeft: idx > 0 ? '1px solid #E5E5E5' : 'none',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>{item.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>{item.value}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 최근 주문 */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 400, color: '#000000' }}>최근 주문</h2>
            <Link
              to="/mypage/orders"
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#6B6B6B',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              전체보기 <ChevronRight size={14} />
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div style={{ borderTop: '1px solid #000' }}>
              {/* 테이블 헤더 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 1fr 120px',
                  padding: '12px 0',
                  borderBottom: '1px solid #E5E5E5',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>주문일</span>
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>주문내역</span>
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>주문번호</span>
                <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', textAlign: 'right' }}>결제금액</span>
              </div>
              {/* 테이블 바디 */}
              {recentOrders.map((order, idx) => (
                <div
                  key={order.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 1fr 120px',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: idx < recentOrders.length - 1 ? '1px solid #E5E5E5' : '1px solid #000',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>{order.date}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        background: '#F5F5F5',
                        flexShrink: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={order.thumbnail}
                        alt={order.productName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/veggieverse/store/thumbnails/placeholder.jpg';
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>{order.productName}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#6B6B6B' }}>{order.orderNumber}</span>
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000', textAlign: 'right' }}>{order.price.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px 0', borderTop: '1px solid #000', borderBottom: '1px solid #000', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>주문 내역이 없습니다.</p>
            </div>
          )}
        </section>

        {/* 활동 뱃지 */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 400, color: '#000000', marginBottom: '12px' }}>
            활동 뱃지
          </h2>
          {user.badges && user.badges.length > 0 ? (
            <div style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
              {user.badges.map((badge, idx) => (
                <div
                  key={badge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    borderBottom: idx < user.badges.length - 1 ? '1px solid #E5E5E5' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{badge.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>{badge.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B' }}>
                    {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString('ko-KR') : ''}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px 0', borderTop: '1px solid #000', borderBottom: '1px solid #000', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>
                아직 획득한 뱃지가 없습니다.
              </p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default ProfilePage;
