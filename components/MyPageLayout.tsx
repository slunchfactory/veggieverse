import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

// 상단 탭바용 메뉴 (평면화된 구조)
const MYPAGE_TABS = [
  { path: '/mypage', label: '홈' },
  { path: '/mypage/orders', label: '주문 내역' },
  { path: '/mypage/bookmarks', label: '레시피 북마크' },
  { path: '/mypage/wishlist', label: '관심상품' },
  { path: '/mypage/reviews', label: '상품 리뷰' },
  { path: '/mypage/edit', label: '회원정보' },
];

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout: React.FC<MyPageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 현재 경로에 맞는 탭인지 확인
  const isActive = (path: string) => {
    if (path === '/mypage') {
      return location.pathname === '/mypage';
    }
    return location.pathname.startsWith(path);
  };

  // 활성 탭이 보이도록 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      const activeTab = MYPAGE_TABS.find(tab => isActive(tab.path));
      if (activeTab) {
        const activeElement = scrollRef.current.querySelector(`[data-path="${activeTab.path}"]`);
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }
  }, [location.pathname]);

  // 로그인 필요 체크
  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 400, color: '#6B6B6B', marginBottom: '16px' }}>로그인이 필요합니다.</p>
          <Link to="/" style={{ fontSize: '14px', fontWeight: 400, color: '#000000', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            테스트 시작하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 상단 탭바 - TopControlBar 스타일 */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--header-area-h, 72px)',
          left: 0,
          right: 0,
          zIndex: 45,
          background: '#FFFFFF',
          borderBottom: '1px solid #000',
        }}
      >
        <div
          className="px-5 md:px-8 lg:px-14"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px',
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          {/* 탭 리스트 (중앙 정렬) */}
          <div
            ref={scrollRef}
            className="no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              overflowX: 'auto',
              overflowY: 'visible',
              height: '100%',
            }}
          >
            {MYPAGE_TABS.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                data-path={tab.path}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '48px',
                  color: isActive(tab.path) ? '#000' : '#666',
                  textDecoration: isActive(tab.path) ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '80px 20px 32px 20px',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MyPageLayout;
