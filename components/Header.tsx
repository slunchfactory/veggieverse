import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

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
  const location = useLocation();
  const navigate = useNavigate();
  
  // 메뉴 오버레이의 top 위치 계산 (배너가 있으면 배너 높이 + 헤더 높이)
  const menuTopValue = showTopBanner 
    ? 'calc(var(--promo-h) + var(--header-h))'
    : 'var(--header-h)';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileStoreOpen, setIsMobileStoreOpen] = useState(false);

  // 모바일 메뉴 열림 시 body 스크롤 잠금
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Store', path: '/store', hasDropdown: true },
    { name: 'Recipe', path: '/recipe' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Event', path: '/event' },
  ];

  // 식품 특화 카테고리
  const productTypeCategories = ['전체', '밀키트', '베이커리', '소스/오일', '세트', '구독'];

  // 활성 메뉴 확인
  const isActive = (path: string) => {
    return location.pathname === path || 
      (path === '/store' && location.pathname.startsWith('/store')) ||
      (path === '/recipe' && location.pathname.startsWith('/recipe')) ||
      (path === '/newsletter' && location.pathname.startsWith('/newsletter')) ||
      (path === '/event' && location.pathname.startsWith('/event')) ||
      (path === '/about' && location.pathname.startsWith('/about'));
  };

  return (
    <header
      className="relative bg-white border-b border-gray-200"
      style={{ 
        height: 'var(--header-h)',
        zIndex: 50,
      }}
    >
      {/* === MOBILE VIEW (< 768px) === */}
      <div className="flex md:hidden items-center justify-between px-4 h-full relative">
        {/* Left: Hamburger Icon (transforms to X when open) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center text-stone-700 hover:text-stone-900 transition-colors"
          style={{ 
            width: '36px',
            height: '36px',
          }}
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMobileMenuOpen ? (
            <X style={{ width: '24px', height: '24px' }} />
          ) : (
            <Menu style={{ width: '24px', height: '24px' }} />
          )}
        </button>

        {/* Center: Logo (Absolute Centered) */}
        <Link 
          to="/" 
          className="absolute left-1/2 transform -translate-x-1/2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img 
            src={`${import.meta.env.BASE_URL}common/logo.png`}
            alt="SLUNCH FACTORY" 
            className="w-auto"
            style={{ 
              height: '24px', // Mobile Logo Size
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={onProfileMenuToggle}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '36px',
                height: '36px',
                padding: 0,
              }}
            >
              {userProfile.profileImage ? (
                <div className="rounded-full overflow-hidden border-2 border-stone-300 shadow-sm" style={{ width: '28px', height: '28px' }}>
                  <img 
                    src={userProfile.profileImage} 
                    alt="My Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-full bg-stone-200 flex items-center justify-center" style={{ width: '28px', height: '28px' }}>
                  <User className="text-stone-600" style={{ width: '16px', height: '16px' }} />
                </div>
              )}
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-none shadow-lg border border-stone-200 py-2 z-50">
                {userProfile.profileImage ? (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-400">나의 비건 유형</p>
                      <p className="text-sm font-semibold text-stone-800">{userProfile.veganType}</p>
                    </div>
                    <Link 
                      to="/profile"
                      className="block w-full px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50"
                    >
                      마이페이지
                    </Link>
                    <button 
                      onClick={onResetProfile}
                      className="w-full px-4 py-2 text-left text-sm text-stone-400 hover:bg-stone-50"
                    >
                      프로필 초기화
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-3 text-center">
                    <p className="text-sm text-stone-500 mb-2">아직 프로필이 없어요</p>
                    <p className="text-xs text-stone-400">비건 테스트를 완료하고<br/>나만의 프로필을 만들어보세요!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="relative text-stone-700 hover:text-stone-900 transition-colors"
            style={{ 
              width: '36px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingCart style={{ width: '20px', height: '20px' }} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold" style={{ lineHeight: 1 }}>0</span>
          </Link>
        </div>
      </div>

      {/* === DESKTOP VIEW (>= 768px) === */}
      <div className="hidden md:flex items-center justify-between px-8 h-full max-w-[1400px] mx-auto">
        {/* Left: Logo */}
        <Link 
          to="/" 
          className="flex items-center flex-shrink-0"
        >
          <img 
            src={`${import.meta.env.BASE_URL}common/logo.png`}
            alt="SLUNCH FACTORY" 
            className="w-auto"
            style={{ 
              height: '32px', // Desktop Logo Size (Larger)
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const isStore = item.hasDropdown;
            
            if (!isStore) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? 'text-black' : 'text-stone-700 hover:text-black'
                  }`}
                  style={{ lineHeight: 1 }}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div key={item.path} className="relative">
                <button
                  className={`px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1 ${
                    active || openMenu === 'store' ? 'text-black' : 'text-stone-700 hover:text-black'
                  }`}
                  style={{ lineHeight: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu((prev) => (prev === 'store' ? null : 'store'));
                  }}
                >
                  <span>{item.name}</span>
                  <span 
                    style={{
                      fontSize: '8px',
                      transform: openMenu === 'store' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    ▼
                  </span>
                </button>

                {openMenu === 'store' && (
                  <div 
                    className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-stone-200 shadow-lg py-2 min-w-[120px]"
                  >
                    {productTypeCategories.map((cat) => (
                      <button
                        key={cat}
                        className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-black transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenMenu(null);
                          if (cat === '전체') {
                            navigate('/store');
                          } else {
                            navigate(`/store?productType=${encodeURIComponent(cat)}`);
                          }
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-stone-600 whitespace-nowrap">KR</span>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={onProfileMenuToggle}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '36px',
                height: '36px',
                padding: 0,
              }}
            >
              {userProfile.profileImage ? (
                <div className="rounded-full overflow-hidden border-2 border-stone-300 shadow-sm" style={{ width: '28px', height: '28px' }}>
                  <img 
                    src={userProfile.profileImage} 
                    alt="My Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-full bg-stone-200 flex items-center justify-center" style={{ width: '28px', height: '28px' }}>
                  <User className="text-stone-600" style={{ width: '16px', height: '16px' }} />
                </div>
              )}
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-none shadow-lg border border-stone-200 py-2 z-50">
                {userProfile.profileImage ? (
                  <>
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-400">나의 비건 유형</p>
                      <p className="text-sm font-semibold text-stone-800">{userProfile.veganType}</p>
                    </div>
                    <Link 
                      to="/profile"
                      className="block w-full px-4 py-2 text-left text-sm text-stone-600 hover:bg-stone-50"
                    >
                      마이페이지
                    </Link>
                    <button 
                      onClick={onResetProfile}
                      className="w-full px-4 py-2 text-left text-sm text-stone-400 hover:bg-stone-50"
                    >
                      프로필 초기화
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-3 text-center">
                    <p className="text-sm text-stone-500 mb-2">아직 프로필이 없어요</p>
                    <p className="text-xs text-stone-400">비건 테스트를 완료하고<br/>나만의 프로필을 만들어보세요!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="relative text-stone-700 hover:text-stone-900 transition-colors"
            style={{ 
              width: '36px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingCart style={{ width: '20px', height: '20px' }} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold" style={{ lineHeight: 1 }}>0</span>
          </Link>

          {/* Search */}
          <button 
            className="text-stone-700 hover:text-stone-900 transition-colors"
            style={{ 
              width: '36px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Search style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>

      {/* === MOBILE MENU OVERLAY (The Drawer) === */}
      <div 
        className={`fixed bg-white transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-full pointer-events-none'
        }`}
        style={{
          top: menuTopValue,
          left: 0,
          right: 0,
          bottom: 0,
          height: showTopBanner
            ? 'calc(100vh - var(--promo-h) - var(--header-h))'
            : 'calc(100vh - var(--header-h))',
          zIndex: 45, // 헤더(z-50)보다 낮게 설정하여 헤더 뒤로 가도록
        }}
      >
        <div className="h-full overflow-y-auto" style={{ paddingTop: '0', paddingBottom: '48px' }}>
          <div className="px-5">
            {/* Mobile Menu Links (Vertical Stack) */}
            <nav className="flex flex-col gap-0" style={{ fontFamily: "'Inter', sans-serif" }}>
              {navItems.map((item) => {
                const active = isActive(item.path);
                const isStore = item.hasDropdown;
                
                return (
                  <div key={item.path}>
                    <Link 
                      to={item.path} 
                      onClick={(e) => {
                        if (isStore) {
                          e.preventDefault();
                          setIsMobileStoreOpen((prev) => !prev);
                        } else {
                          setIsMobileStoreOpen(false);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`block py-4 px-5 text-left border-b border-black ${
                        active 
                          ? 'text-black font-medium' 
                          : 'text-black font-normal'
                      }`}
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.5',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item.name}
                    </Link>
                    {isStore && isMobileStoreOpen && (
                      <div className="ml-4 mt-2 space-y-0 pb-4">
                        {productTypeCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setIsMobileStoreOpen(false);
                              setIsMobileMenuOpen(false);
                              if (cat === '전체') {
                                navigate('/store');
                              } else {
                                navigate(`/store?productType=${encodeURIComponent(cat)}`);
                              }
                            }}
                            className="block text-left w-full text-gray-600 py-3 px-5 hover:text-black transition-colors border-b border-black"
                            style={{
                              fontSize: '16px',
                              fontWeight: 400,
                              minHeight: '44px',
                              display: 'flex',
                              alignItems: 'center',
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
