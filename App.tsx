import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { BrandPage } from './pages/BrandPage';
import { CommunityPage } from './pages/CommunityPage';
import { NewsletterPage } from './pages/NewsletterPage';
import { VeganTestPage } from './pages/VeganTestPage';
import RecipePage from './pages/RecipePage';
import RecipeHallOfFamePage from './pages/RecipeHallOfFamePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import { ChatWidget } from './components/ChatWidget';
import { TopBanner } from './components/TopBanner';

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
}> = ({ children, userProfile, showProfileMenu, onProfileMenuToggle, onResetProfile, showTopBanner, onCloseBanner }) => {
  const bannerHeight = showTopBanner ? 32 : 0;
  
  return (
    <div className="min-h-screen min-w-[360px] flex flex-col overflow-auto">
      {/* 최상단 가입유도 배너 */}
      {showTopBanner && <TopBanner onClose={onCloseBanner} />}
      <Header 
        userProfile={userProfile}
        showProfileMenu={showProfileMenu}
        onProfileMenuToggle={onProfileMenuToggle}
        onResetProfile={onResetProfile}
        offsetTop={bannerHeight}
      />
      <main
        className="flex-1 pb-8 overflow-auto"
        style={{ paddingTop: 64 + bannerHeight }}
      >
        {children}
      </main>
      <Footer />
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
  const location = useLocation();

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

  return (
    <Layout 
      userProfile={userProfile}
      showProfileMenu={showProfileMenu}
      onProfileMenuToggle={toggleProfileMenu}
      onResetProfile={resetProfile}
      showTopBanner={showTopBanner}
      onCloseBanner={() => setShowTopBanner(false)}
    >
      <Routes>
        {/* 메인 페이지 = 비건 테스트 */}
        <Route path="/" element={<VeganTestPage onSaveProfile={saveProfile} headerOffset={showTopBanner ? 96 : 64} />} />
        {/* 쇼핑몰 메인 */}
        <Route path="/shop" element={<HomePage headerOffset={showTopBanner ? 96 : 64} />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipe/hall-of-fame" element={<RecipeHallOfFamePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/event" element={<ComingSoonPage title="이벤트" />} />
        <Route path="/cart" element={<ComingSoonPage title="장바구니" />} />
        <Route path="/mypage" element={<ComingSoonPage title="마이페이지" />} />
      </Routes>
      <ChatWidget />
    </Layout>
  );
};

// Coming Soon 페이지
const ComingSoonPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-stone-800 mb-4">{title}</h1>
      <p className="text-stone-500">페이지 준비 중입니다.</p>
    </div>
  </div>
);

// 최상위 App 컴포넌트
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/veggieverse">
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
