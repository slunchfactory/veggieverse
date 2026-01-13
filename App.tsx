import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// ============================================
// Home & Root pages - App Router style
// ============================================
import { HomePage } from './pages/home/page';
import { BrandPage } from './pages/brand/page';
import { CommunityPage } from './pages/community/page';
import ProfilePage from './pages/profile/page';

// ============================================
// About pages - App Router style
// ============================================
import AboutLayout from './pages/about/layout';
import AboutStoryPage from './pages/about/story/page';
import AboutBranchPage from './pages/about/branch/page';
import AboutB2BPage from './pages/about/b2b/page';

// ============================================
// Spirit pages - App Router style
// ============================================
import SpiritFinder from './pages/spirit/page';
import SpiritFinderStep from './pages/spirit/step/page';

// ============================================
// Store pages - App Router style
// ============================================
import { StorePage } from './pages/store/page';
import StoreList from './pages/store/list/page';
import StoreDetail from './pages/store/detail/page';
import { ProductDetailPage } from './pages/store/product/page';

// ============================================
// Recipe pages - App Router style
// ============================================
import RecipePage from './pages/recipe/page';
import RecipeList from './pages/recipe/list/page';
import RecipeDetail from './pages/recipe/detail/page';
import RecipeCategoryPage from './pages/recipe/category/page';
import RecipeHallOfFamePage from './pages/recipe/hall-of-fame/page';
import RecipeDetailPage from './pages/recipe/detail-legacy/page';

// ============================================
// Event pages - App Router style
// ============================================
import EventPage from './pages/event/page';
import EventList from './pages/event/list/page';
import EventDetail from './pages/event/detail/page';

// ============================================
// Newsletter pages - App Router style
// ============================================
import { NewsletterPage } from './pages/newsletter/page';
import NewsletterList from './pages/newsletter/list/page';
import NewsletterDetail from './pages/newsletter/detail/page';

// ============================================
// Subscribe pages - App Router style
// ============================================
import { SubscriptionPage } from './pages/subscribe/page';

// ============================================
// MyPage pages - App Router style
// ============================================
import MyHome from './pages/mypage/page';
import MyOrders from './pages/mypage/orders/page';
import BookmarksPage from './pages/mypage/bookmarks/page';
import WishlistPage from './pages/mypage/wishlist/page';
import ReviewsPage from './pages/mypage/reviews/page';
import MyInfo from './pages/mypage/info/page';
import ProfileEditPage from './pages/mypage/info/edit-profile/page';

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
    <div className="min-h-screen min-w-[360px] flex flex-col" style={{ backgroundColor: '#D7D7D7', ...headerAreaStyle }}>
      {/* === FIXED TOP CONTAINER === */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: '#D7D7D7' }}
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
        {/* ============================================
            1. 온보딩 - 나의 스피릿 찾기
            ============================================ */}
        <Route path="/" element={<HomePage headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/spirit" element={<SpiritFinder headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/spirit/intro" element={<SpiritFinder headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/spirit/question/:stepId" element={<SpiritFinderStep headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/spirit/result" element={<SpiritFinderStep headerOffset={showTopBanner ? 96 : 64} />} />
        {/* Legacy route for backwards compatibility */}
        <Route path="/spirit/step" element={<SpiritFinderStep headerOffset={showTopBanner ? 96 : 64} />} />

        {/* ============================================
            2. About
            ============================================ */}
        <Route path="/about" element={<AboutLayout />}>
          <Route index element={<AboutStoryPage />} />
          <Route path="story" element={<AboutStoryPage />} />
          <Route path="branch" element={<AboutBranchPage />} />
          <Route path="b2b" element={<AboutB2BPage />} />
        </Route>
        <Route path="/brand" element={<BrandPage />} />

        {/* ============================================
            3. 상업적 경험 및 개인화 쇼핑 (Store)
            ============================================ */}
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/list" element={<StoreList />} />
        <Route path="/store/ai-recommendation" element={<ComingSoonPage title="AI 상품 추천" description="사용자 취향 및 알러지 필터링 기반 추천" />} />
        <Route path="/store/goal-based" element={<ComingSoonPage title="목표별 큐레이션" description="저염/저당/제로미트 등 목표별 상품 추천" />} />
        <Route path="/store/detail/:id" element={<StoreDetail />} />
        <Route path="/store/product/:productId" element={<ProductDetailPage />} />
        <Route path="/store/inquiry-guide" element={<ComingSoonPage title="상품문의 방법" />} />

        {/* ============================================
            4. 구독 (Subscribe)
            ============================================ */}
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/subscribe/home" element={<ComingSoonPage title="구독 홈" description="타겟별 구독 서비스 관문" />} />
        <Route path="/subscribe/office" element={<ComingSoonPage title="오피스 팩" description="직장인 타겟: 간편 고영양 식단" />} />
        <Route path="/subscribe/silver" element={<ComingSoonPage title="실버 케어" description="독거 노인/효도 선물: 맞춤 영양 식단" />} />
        <Route path="/subscribe/diet" element={<ComingSoonPage title="챌린지 다이어트" description="3040 여성: 단기 체중 관리" />} />
        <Route path="/subscribe/detail/:id" element={<ComingSoonPage title="구독 상세" />} />
        {/* 기존 subscription 경로도 유지 (하위 호환성) */}
        <Route path="/subscription" element={<SubscriptionPage />} />

        {/* ============================================
            5. 콘텐츠 및 정보 제공 (Recipe)
            ============================================ */}
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipe/list" element={<RecipeList />} />
        <Route path="/recipe/ai-diet-planner" element={<ComingSoonPage title="AI 맞춤 식단" description="목표 달성별 레시피 추천" />} />
        <Route path="/recipe/allergy-free" element={<ComingSoonPage title="알러지 프리 레시피" description="개인 프로필 기반 자동 필터링" />} />
        <Route path="/recipe/category/:categoryId" element={<RecipeCategoryPage />} />
        <Route path="/recipe/hall-of-fame" element={<RecipeHallOfFamePage />} />
        <Route
          path="/recipe/:id"
          element={
            <ErrorBoundary>
              <RecipeDetail />
            </ErrorBoundary>
          }
        />
        {/* 기존 RecipeDetailPage 경로도 유지 */}
        <Route path="/recipe/detail/:id" element={<RecipeDetailPage />} />

        {/* ============================================
            6. 이벤트 및 뉴스레터
            ============================================ */}
        <Route path="/event" element={<EventPage />} />
        <Route path="/event/list" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetail />} />
        
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/newsletter/list" element={<NewsletterList />} />
        <Route path="/newsletter/:id" element={<NewsletterDetail />} />

        {/* ============================================
            7. 개인화 관리 및 보상 (MyPage)
            ============================================ */}
        <Route path="/mypage" element={<MyHome />} />
        <Route path="/mypage/home" element={<MyHome />} />
        <Route path="/mypage/ai-analysis" element={<ComingSoonPage title="AI 분석 리포트" description="식습관 분석 및 건강 지표 피드백" />} />
        <Route path="/mypage/orders" element={<MyOrders />} />
        <Route path="/mypage/delivery" element={<ComingSoonPage title="배송 관리" />} />
        <Route path="/mypage/favorites" element={<BookmarksPage />} />
        <Route path="/mypage/bookmarks" element={<BookmarksPage />} />
        <Route path="/mypage/wishlist" element={<WishlistPage />} />
        <Route path="/mypage/reviews" element={<ReviewsPage />} />
        <Route path="/mypage/info" element={<MyInfo />} />
        <Route path="/mypage/info/edit-profile" element={<ProfileEditPage />} />
        <Route path="/mypage/info/addresses" element={<ComingSoonPage title="배송지 관리" />} />
        <Route path="/mypage/info/health-profile" element={<ComingSoonPage title="취향/건강 프로필" description="채식 단계 및 알러지 관리" />} />
        <Route path="/mypage/badges" element={<ComingSoonPage title="활동배지 리스트" />} />
        <Route path="/mypage/badges/criteria" element={<ComingSoonPage title="배지 지급 조건 안내" />} />

        {/* ============================================
            기타 페이지 (하위 호환성 유지)
            ============================================ */}
        <Route path="/shop" element={<HomePage headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/cart" element={<ComingSoonPage title="장바구니" />} />
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
const ComingSoonPage: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#3D3A36' }}>{title}</h1>
      {description && (
        <p className="text-stone-500 mb-2" style={{ fontSize: '14px', lineHeight: '1.6' }}>{description}</p>
      )}
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
