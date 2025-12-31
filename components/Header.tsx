import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Menu } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { NavigationDrawer } from './NavigationDrawer';
import { SearchModal } from './SearchModal';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { useUser } from '../contexts/UserContext';

interface UserProfile {
  profileImage: string | null;
  veganType: string | null;
  savedAt: string | null;
}

interface HeaderProps {
  userProfile: UserProfile;
  onProfileMenuToggle: () => void;
  showProfileMenu: boolean;
  onResetProfile: () => void;
  showTopBanner?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onProfileMenuToggle,
  showProfileMenu,
  onResetProfile,
  showTopBanner = false,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isLoggedIn = !!user;

  // 스피릿 이름을 기반으로 이미지 경로 생성
  const getSpiritImageUrl = (spiritName: string | null): string | null => {
    if (!spiritName) return null;
    const spiritSlug = spiritName.toLowerCase().replace(/\s+/g, '-');
    return `/veggieverse/spirits/${spiritSlug}.png`;
  };

  const spiritImageUrl = user?.spiritName ? getSpiritImageUrl(user.spiritName) : null;

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <header
        style={{
          height: 'var(--header-h)',
          zIndex: 50,
          borderBottom: '1px solid #000',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* 통합 레이아웃: Left - Center - Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 16px',
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Left: Hamburger Menu */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="메뉴 열기"
          >
            <Menu size={24} strokeWidth={1} color="#000" />
          </button>

          {/* Center: Logo (Absolute Centered) */}
          <Link
            to="/"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}common/logo.png`}
              alt="SLUNCH FACTORY"
              style={{
                height: '36px',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </Link>

          {/* Right: Utility Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Cart - 숫자만 표시 */}
            <Link
              to="/cart"
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#000',
                textDecoration: 'none',
              }}
              aria-label="장바구니"
            >
              (0)
            </Link>

            {/* User Profile */}
            <Link
              to={isLoggedIn ? '/mypage' : '#'}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  setIsLoginModalOpen(true);
                }
              }}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={isLoggedIn ? '마이페이지' : '로그인'}
            >
              {isLoggedIn && spiritImageUrl ? (
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid #000',
                  }}
                >
                  <img
                    src={spiritImageUrl}
                    alt={user?.spiritName || 'Profile'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#E5E5E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={16} strokeWidth={1} color="#666" />
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
        onLogoutClick={() => setIsLogoutModalOpen(true)}
        showTopBanner={showTopBanner}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Logout Confirm Modal */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};
