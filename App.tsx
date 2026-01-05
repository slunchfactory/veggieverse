import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { BrandPage } from './pages/BrandPage';
import { CommunityPage } from './pages/CommunityPage';
import { NewsletterPage } from './pages/NewsletterPage';
import AboutPage from './pages/AboutPage';
import { VeganTestPage } from './pages/VeganTestPage';
import RecipePage from './pages/RecipePage';
import RecipeHallOfFamePage from './pages/RecipeHallOfFamePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeCategoryPage from './pages/RecipeCategoryPage';
import ProfilePage from './pages/ProfilePage';
import EventPage from './pages/EventPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import OrdersPage from './pages/mypage/OrdersPage';
import BookmarksPage from './pages/mypage/BookmarksPage';
import WishlistPage from './pages/mypage/WishlistPage';
import ReviewsPage from './pages/mypage/ReviewsPage';
import ProfileEditPage from './pages/mypage/ProfileEditPage';
import { ChatWidget, ChatTrigger, ChatPanel } from './components/ChatWidget';
import { TopBanner } from './components/TopBanner';
import { ScrollToTop } from './components/ScrollToTop';
import { UserProvider } from './contexts/UserContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// 유저 프로필 타입
interface UserProfile {
  profileImage: string | null;
  veganType: string | null;
  savedAt: string | null;
}

// 레이아웃 컴포넌트
const Layout: React.FC<{
  children: React.ReactNode;
  userProfile: UserProfile;
  showProfileMenu: boolean;
  onProfileMenuToggle: () => void;
  onResetProfile: () => void;
  showTopBanner: boolean;
  onCloseBanner: () => void;
  isChatOpen: boolean;
  chatPanel: React.ReactNode;
  shouldShowFooter: boolean;
}> = ({ children, userProfile, showProfileMenu, onProfileMenuToggle, onResetProfile, showTopBanner, onCloseBanner, isChatOpen, chatPanel, shouldShowFooter }) => {
  // CSS 변수로 현재 고정 헤더 전체 높이 설정 (프로모 바 + 헤더)
  const headerAreaStyle = {
    '--header-area-h': showTopBanner
      ? 'calc(var(--promo-h) + var(--header-h))'
      : 'var(--header-h)',
  } as React.CSSProperties;

  // 기존 레이아웃 (About 포함 - 스크롤 체이닝 패턴)
  return (
    <div className="min-h-screen min-w-[360px] flex flex-col" style={{ backgroundColor: 'var(--cream)', ...headerAreaStyle }}>
      {/* === FIXED TOP CONTAINER === */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'var(--cream)' }}
      >
        {/* 1. Promo Banner (Conditional) */}
        {showTopBanner && <TopBanner onClose={onCloseBanner} />}

        {/* 2. Main Header */}
        <Header
          userProfile={userProfile}
          showProfileMenu={showProfileMenu}
          onProfileMenuToggle={onProfileMenuToggle}
          onResetProfile={onResetProfile}
          showTopBanner={showTopBanner}
        />
      </div>

      {/* === PAGE CONTENT === */}
      {/* 메인 콘텐츠 - 고정 헤더 높이만큼 상단 여백 추가 */}
      <main
        className="flex-1 flex flex-col"
        style={{
          zIndex: 0,
          overflow: 'visible',
          paddingTop: showTopBanner ? 'calc(var(--promo-h) + var(--header-h))' : 'var(--header-h)',
        }}
      >
        {children}
      </main>
      {/* 챗봇 패널은 ChatPanel 컴포넌트 내부에서 fixed position으로 렌더링됨 */}
      {/* Footer - Sticky Footer 패턴 (VeganTestPage 제외) */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

// 메인 앱 컴포넌트
const AppContent: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    profileImage: null,
    veganType: null,
    savedAt: null,
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  
  // VeganTestPage는 자체 스크롤을 가지고 있어 Footer를 표시하지 않음
  const shouldShowFooter = location.pathname !== '/';

  // localStorage에서 프로필 불러오기
  useEffect(() => {
    const savedProfile = localStorage.getItem('veggieverse-profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // ScrollToTop 컴포넌트에서 처리하므로 여기서는 제거

  // 프로필 저장 함수
  const saveProfile = useCallback((profileImage: string, veganType: string) => {
    const newProfile: UserProfile = {
      profileImage,
      veganType,
      savedAt: new Date().toISOString(),
    };
    setUserProfile(newProfile);
    localStorage.setItem('veggieverse-profile', JSON.stringify(newProfile));
    setShowProfileMenu(false);
  }, []);

  // 프로필 초기화
  const resetProfile = useCallback(() => {
    localStorage.removeItem('veggieverse-profile');
    setUserProfile({ profileImage: null, veganType: null, savedAt: null });
    setShowProfileMenu(false);
  }, []);

  // 프로필 메뉴 토글
  const toggleProfileMenu = useCallback(() => {
    setShowProfileMenu(prev => !prev);
  }, []);

  // 프로필 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };
    
    if (showProfileMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu]);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Layout 
      userProfile={userProfile}
      showProfileMenu={showProfileMenu}
      onProfileMenuToggle={toggleProfileMenu}
      onResetProfile={resetProfile}
      showTopBanner={showTopBanner}
      onCloseBanner={() => setShowTopBanner(false)}
      isChatOpen={isChatOpen}
      chatPanel={null}
      shouldShowFooter={shouldShowFooter}
    >
      <Routes>
        {/* 메인 페이지 = 비건 테스트 */}
        <Route path="/" element={<VeganTestPage onSaveProfile={saveProfile} headerOffset={showTopBanner ? 96 : 64} />} />
        {/* 쇼핑몰 메인 */}
        <Route path="/shop" element={<HomePage headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/product/:productId" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipe/category/:categoryId" element={<RecipeCategoryPage />} />
        <Route path="/recipe/hall-of-fame" element={<RecipeHallOfFamePage />} />
        <Route 
          path="/recipe/:id" 
          element={
            <ErrorBoundary>
              <RecipeDetailPage />
            </ErrorBoundary>
          } 
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/cart" element={<ComingSoonPage title="장바구니" />} />
        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/mypage/orders" element={<OrdersPage />} />
        <Route path="/mypage/bookmarks" element={<BookmarksPage />} />
        <Route path="/mypage/wishlist" element={<WishlistPage />} />
        <Route path="/mypage/reviews" element={<ReviewsPage />} />
        <Route path="/mypage/edit" element={<ProfileEditPage />} />
        <Route path="/mypage/cancel-return" element={<ComingSoonPage title="취소/반품" />} />
        <Route path="/mypage/receipt" element={<ComingSoonPage title="영수증 발급" />} />
        <Route path="/mypage/inquiry" element={<ComingSoonPage title="1:1 문의 내역" />} />
        <Route path="/mypage/address" element={<ComingSoonPage title="배송지 관리" />} />
        <Route path="/mypage/level" element={<ComingSoonPage title="회원 등급" />} />
      </Routes>
      <ChatTrigger isOpen={isChatOpen} onToggle={toggleChat} />
      <ChatPanel isOpen={isChatOpen} onToggle={toggleChat} />
    </Layout>
    </>
  );
};

// Coming Soon 페이지
const ComingSoonPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <p className="text-stone-500" style={{ fontSize: '14px', lineHeight: '1.6' }}>페이지 준비 중입니다.</p>
    </div>
  </div>
);

// 최상위 App 컴포넌트
const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter basename="/veggieverse">
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
