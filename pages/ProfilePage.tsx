import React, { useState, useEffect } from 'react';
import { MapPin, Settings, Edit3 } from 'lucide-react';
import { useUser, BadgeType } from '../contexts/UserContext';
import { ActivityBadgeSection } from '../components/Badge';
import { ProfileStats } from '../components/Profile';
import { CouponRegisterModal, EventDetailModal, BadgeDetailModal, OrderDetailModal } from '../components/modals';

// 탭 타입 정의
type TabType = 'HOME' | 'ORDER' | 'WISHLIST' | 'REVIEW' | 'INFO';

// 스피릿 이미지 타입
interface SpiritProfile {
  profileImage: string | null;
  veganType: string | null;
  savedAt: string | null;
}

const ProfilePage: React.FC = () => {
  const { user, coupons } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [spiritProfile, setSpiritProfile] = useState<SpiritProfile | null>(null);

  // Modal states
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState<BadgeType | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'ongoing' | 'upcoming' | 'ended';
    reward?: string;
    condition?: string;
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string;
    orderDate: string;
    status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
    items: { id: number; name: string; price: number; quantity: number }[];
    totalPrice: number;
    shippingFee: number;
    address?: string;
    trackingNumber?: string;
  } | null>(null);

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

  // 상단 메뉴바 아이템
  const navItems: { key: TabType; label: string }[] = [
    { key: 'HOME', label: '홈' },
    { key: 'ORDER', label: '주문/배송' },
    { key: 'WISHLIST', label: '레시피/관심' },
    { key: 'REVIEW', label: '리뷰' },
    { key: 'INFO', label: '내 정보' },
  ];

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
          <a
            href="/"
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
          </a>
        </div>
      </div>
    );
  }

  const unusedCoupons = coupons.filter(c => !c.used);
  const points = 1500;

  // 회원 등급
  const getUserLevel = () => {
    const totalSpent = 0;
    const orderCount = 0;
    if (totalSpent >= 200000) return 'HARVEST';
    if (totalSpent >= 50000 || orderCount >= 2) return 'GREEN';
    return 'FRESH';
  };

  const userLevel = getUserLevel();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* Sub Navigation (탭 메뉴바) */}
      <div
        style={{
          position: 'sticky',
          top: '56px',
          zIndex: 40,
          background: '#fff',
          borderBottom: '1px solid #000',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>
          <nav style={{ display: 'flex', gap: '24px' }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`py-3.5 text-sm border-b hover:border-b hover:border-black ${
                  activeTab === item.key
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500'
                }`}
                style={{
                  fontWeight: 400,
                  background: 'transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 16px 80px' }}>

        {/* [TAB 1] HOME: 메인 대시보드 */}
        {activeTab === 'HOME' && (
          <div className="animate-fade-in">

            {/* 환영 메시지 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: 400, color: '#000' }}>
                  {user.name || user.email?.split('@')[0] || 'Guest'}님, 어서오세요
                </h1>
                {spiritProfile?.veganType && (
                  <p style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', marginTop: '4px' }}>
                    {spiritProfile.veganType}
                  </p>
                )}
              </div>
              {/* 프로필 사진 (우측) */}
              {spiritProfile?.profileImage && (
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid #000',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={spiritProfile.profileImage}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            {/* 0. 회원 정보 (등급/쿠폰/포인트) */}
            <ProfileStats
              grade={userLevel}
              couponCount={unusedCoupons.length}
              points={points}
            />

            {/* 1. 이벤트 배너 */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div
                className="bg-gray-50 p-6 flex flex-col justify-between h-32 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setSelectedEvent({
                    id: 1,
                    title: '새해를 여는 첫 선택',
                    description: '새해를 맞이하여 매일 낮 12시에 특별한 할인 쿠폰을 드립니다. 최대 50% 할인의 행운을 잡아보세요! 매일 선착순 100명에게 제공됩니다.',
                    startDate: '2026.01.01',
                    endDate: '2026.01.31',
                    status: 'ongoing',
                    reward: '최대 50% 할인 쿠폰',
                    condition: '회원 누구나 참여 가능 (1일 1회)',
                  });
                  setIsEventModalOpen(true);
                }}
              >
                <div>
                  <h3 className="text-sm font-medium mb-1">새해를 여는 첫 선택</h3>
                  <p className="text-xs text-gray-500 font-light">매일 낮 12시, 최대 50% 행운</p>
                </div>
                <span className="text-xs text-gray-400 underline">쿠폰 받으러가기 &gt;</span>
              </div>
              <div
                className="bg-gray-50 p-6 flex flex-col justify-between h-32 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setSelectedEvent({
                    id: 2,
                    title: '친구 초대 이벤트',
                    description: '첫 주문을 완료하신 고객님께서 친구를 초대하시면, 친구와 본인 모두에게 3,000원 적립금을 드립니다.',
                    startDate: '2026.01.01',
                    endDate: '2026.03.31',
                    status: 'ongoing',
                    reward: '3,000원 적립금 (초대자 + 피초대자)',
                    condition: '첫 주문 완료 후 친구 초대 시',
                  });
                  setIsEventModalOpen(true);
                }}
              >
                <div>
                  <h3 className="text-sm font-medium mb-1">친구 초대 이벤트</h3>
                  <p className="text-xs text-gray-500 font-light">첫 주문 후 친구 초대하면 3,000원</p>
                </div>
                <span className="text-xs text-gray-400 underline">이벤트 보러가기 &gt;</span>
              </div>
            </div>

            {/* 2. 내 쿠폰 */}
            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 400, color: '#000', marginBottom: '12px' }}>
                내 쿠폰
              </h2>
              <div
                style={{
                  maxWidth: 'calc(50% - 16px)',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '8px',
                  background: '#3D3D3D',
                  padding: '16px 20px 16px 28px',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* 좌측 반원 네거티브 공간 */}
                <div
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '10px',
                    height: '20px',
                    borderRadius: '0 10px 10px 0',
                    background: 'var(--cream)',
                  }}
                />
                {/* 할인율 */}
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginRight: '16px' }}>
                  10%
                </p>
                {/* 쿠폰 정보 */}
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#fff', marginBottom: '4px' }}>
                    [Beginner] 이달의 장바구니 10% 쿠폰
                  </h3>
                  <p style={{ fontSize: '11px', fontWeight: 400, color: '#A0A0A0' }}>
                    최소주문 20,000원 | 2026.02.01까지
                  </p>
                </div>
              </div>
            </section>

            {/* 3. 최근 주문 */}
            <div className="mb-12">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>최근 주문</h3>
                <button
                  onClick={() => setActiveTab('ORDER')}
                  style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  전체보기 &gt;
                </button>
              </div>
              <div className="py-10 text-center bg-gray-50 text-xs text-gray-400 font-light">
                최근 1개월 내 주문 내역이 없습니다.
              </div>
            </div>

            {/* 4. 활동 뱃지 */}
            <ActivityBadgeSection
              earnedBadges={user.badges || []}
              title="활동 뱃지"
              onBadgeClick={(badgeId) => {
                setSelectedBadgeId(badgeId);
                setIsBadgeModalOpen(true);
              }}
            />

          </div>
        )}

        {/* [TAB 2] ORDER: 주문/배송 */}
        {activeTab === 'ORDER' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#000', marginBottom: '24px' }}>
              주문/배송 내역
            </h2>

            {/* 필터 탭 */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {['3개월', '6개월', '1년', '전체'].map((period, idx) => (
                <button
                  key={period}
                  style={{
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: 400,
                    border: idx === 0 ? '1px solid #000' : '1px solid #E5E5E5',
                    background: idx === 0 ? '#000' : 'transparent',
                    color: idx === 0 ? '#fff' : '#6B6B6B',
                    cursor: 'pointer',
                  }}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* 주문 리스트 */}
            <div style={{ borderTop: '1px solid #000' }}>
              {[1, 2].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #E5E5E5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedOrder({
                      id: `ORD-20241215-${item}`,
                      orderDate: '2024년 12월 15일 14:32',
                      status: 'delivered',
                      items: [
                        { id: 1, name: '비건 김치 볶음밥 키트', price: 12000, quantity: 1 },
                        { id: 2, name: '두부 스테이크 세트', price: 8000, quantity: 1 },
                        { id: 3, name: '콩고기 패티', price: 4000, quantity: 1 },
                      ],
                      totalPrice: 24000,
                      shippingFee: 0,
                      address: '서울시 강남구 테헤란로 123 비건빌딩 4층',
                      trackingNumber: '1234567890',
                    });
                    setIsOrderModalOpen(true);
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', background: '#F5F5F5', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 400, color: '#6B6B6B', marginBottom: '4px' }}>
                        2024.12.15 (ORD-20241215-{item})
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: '#000', marginBottom: '4px' }}>
                        비건 김치 볶음밥 키트 외 2건
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>24,000원</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 400, color: '#4CAF50' }}>배송완료</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 400,
                          border: '1px solid #E5E5E5',
                          background: 'transparent',
                          color: '#6B6B6B',
                          cursor: 'pointer',
                        }}
                      >
                        배송조회
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: '6px 12px',
                          fontSize: '11px',
                          fontWeight: 400,
                          border: '1px solid #E5E5E5',
                          background: 'transparent',
                          color: '#6B6B6B',
                          cursor: 'pointer',
                        }}
                      >
                        리뷰쓰기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [TAB 3] WISHLIST: 레시피 북마크 + 관심상품 */}
        {activeTab === 'WISHLIST' && (
          <div>
            {/* 서브 탭 */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', borderBottom: '1px solid #E5E5E5' }}>
              <button
                style={{
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#000',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #000',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                }}
              >
                레시피 북마크
              </button>
              <button
                style={{
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#6B6B6B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                관심 상품
              </button>
            </div>

            {/* 그리드 레이아웃 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={{ cursor: 'pointer' }}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      background: '#F5F5F5',
                      marginBottom: '8px',
                    }}
                  />
                  <p style={{ fontSize: '11px', fontWeight: 400, color: '#6B6B6B', marginBottom: '2px' }}>
                    Category
                  </p>
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#000',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    맛있는 비건 레시피 제목 {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [TAB 4] REVIEW: 리뷰 */}
        {activeTab === 'REVIEW' && (
          <div>
            {/* 서브 탭 */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', borderBottom: '1px solid #E5E5E5' }}>
              <button
                style={{
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#000',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #000',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                }}
              >
                작성 가능한 리뷰 (1)
              </button>
              <button
                style={{
                  padding: '12px 0',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#6B6B6B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                작성한 리뷰
              </button>
            </div>

            <div
              style={{
                padding: '48px',
                border: '1px solid #E5E5E5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Edit3 size={32} strokeWidth={1} color="#E5E5E5" />
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>
                작성 가능한 리뷰가 1건 있습니다.
              </p>
              <button
                style={{
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 400,
                  background: '#000',
                  color: '#fff',
                  border: '1px solid #000',
                  cursor: 'pointer',
                }}
              >
                지금 작성하고 포인트 받기
              </button>
            </div>
          </div>
        )}

        {/* [TAB 5] INFO: 내 정보 */}
        {activeTab === 'INFO' && (
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#000', marginBottom: '32px', textAlign: 'center' }}>
              회원 정보 관리
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid #E5E5E5',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Settings size={18} strokeWidth={1} color="#6B6B6B" />
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>개인정보 수정</span>
                </div>
                <span style={{ color: '#E5E5E5' }}>&gt;</span>
              </button>

              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid #E5E5E5',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={18} strokeWidth={1} color="#6B6B6B" />
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>배송지 관리</span>
                </div>
                <span style={{ color: '#E5E5E5' }}>&gt;</span>
              </button>

              <div style={{ paddingTop: '24px', textAlign: 'center' }}>
                <button
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    background: 'transparent',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  로그아웃
                </button>
                <span style={{ margin: '0 8px', color: '#E5E5E5' }}>|</span>
                <button
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    background: 'transparent',
                    border: 'none',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modals */}
      <CouponRegisterModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
      />

      <EventDetailModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent || undefined}
      />

      <BadgeDetailModal
        isOpen={isBadgeModalOpen}
        onClose={() => {
          setIsBadgeModalOpen(false);
          setSelectedBadgeId(null);
        }}
        badgeId={selectedBadgeId || undefined}
        earnedBadge={user.badges?.find(b => b.id === selectedBadgeId)}
      />

      <OrderDetailModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder || undefined}
      />
    </div>
  );
};

export default ProfilePage;
