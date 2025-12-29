import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';

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
  offsetTop?: number | string;
}

export const Header: React.FC<HeaderProps> = ({ 
  userProfile, 
  onProfileMenuToggle, 
  showProfileMenu, 
  onResetProfile,
  offsetTop = 0,
}) => {
  // offsetTop이 CSS 변수 문자열인 경우 그대로 사용, 숫자인 경우 px 변환
  const topValue = typeof offsetTop === 'string' ? offsetTop : `${offsetTop}px`;
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 선택된 카테고리 확인
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || (location.pathname === '/store' ? 'ALL' : null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileStoreOpen, setIsMobileStoreOpen] = useState(false);
  
  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Store', path: '/store', hasDropdown: true },
    { name: 'Recipe', path: '/recipe' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Event', path: '/event' },
  ];

  // 식품 특화 카테고리 (새 구조)
  const productTypeCategories = ['전체', '밀키트', '베이커리', '소스/오일', '세트', '구독'];
  const dietCategories = ['전체', '비건', '락토', '오보', '플렉시', '글루텐프리'];
  const cuisineCategories = ['전체', '한식', '양식', '디저트'];

  return (
    <header
      className="site-header fixed left-0 right-0 z-[9999]"
      style={{ 
        top: topValue,
        backgroundColor: 'var(--white-pure)',
        borderBottom: '1px solid var(--gray-lighter)',
        height: 'var(--header-h)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <nav className="inner h-full flex items-center justify-between max-w-[1400px] mx-auto min-w-[320px] w-full">
        {/* 왼쪽 로고 */}
        <Link 
          to="/" 
          className="flex items-center flex-shrink-0"
          style={{ flex: '0 0 auto', maxWidth: 'calc(50% - 80px)' }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}common/logo.png`}
            alt="SLUNCH FACTORY" 
            className="logo-img w-auto"
            style={{ 
              height: 'calc(var(--header-h) * 0.38)',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Link>
        
        {/* 가운데 메뉴 - 데스크톱 */}
        <div className="hidden lg:flex items-center h-full flex-shrink-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === '/store' && location.pathname.startsWith('/store')) ||
              (item.path === '/recipe' && location.pathname.startsWith('/recipe')) ||
              (item.path === '/newsletter' && location.pathname.startsWith('/newsletter')) ||
              (item.path === '/event' && location.pathname.startsWith('/event')) ||
              (item.path === '/about' && location.pathname.startsWith('/about'));
            const isStore = item.hasDropdown;
            if (!isStore) {
              return (
                <button
                  key={item.path}
                  className="bg-transparent border-none p-0"
                  style={{
<<<<<<< HEAD
                    padding: '10px 12px',
                    fontSize: '15px',
=======
                    padding: 'var(--header-nav-padding-y) var(--header-nav-padding-x)',
                    fontSize: 'var(--header-nav-font-size)',
>>>>>>> 5007cdf0408d3e34bc296e1e165a9e6e6e78284e
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--black)',
                    lineHeight: 1,
                  }}
                >
                  <Link 
                    to={item.path} 
                    className={`nav-item-text ${isActive ? 'active' : ''}`}
                    style={{ color: 'inherit', lineHeight: 1 }}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.name}
                  </Link>
                </button>
              );
            }

            return (
              <div
                key={item.path}
                className="relative"
              >
                <button
                  className={`nav-item-btn bg-transparent border-none p-0 ${isActive || openMenu === 'store' ? 'active' : ''}`}
                  style={{
<<<<<<< HEAD
                    padding: '10px 12px',
                    fontSize: '15px',
=======
                    padding: 'var(--header-nav-padding-y) var(--header-nav-padding-x)',
                    fontSize: 'var(--header-nav-font-size)',
>>>>>>> 5007cdf0408d3e34bc296e1e165a9e6e6e78284e
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--black)',
                    lineHeight: 1,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu((prev) => (prev === 'store' ? null : 'store'));
                  }}
                >
                  <span 
                    className={`nav-item-text ${isActive || openMenu === 'store' ? 'active' : ''}`}
                  >
                    {item.name}
                  </span>
                  <span 
                    className="nav-item-arrow"
                    style={{
                      fontSize: '8px',
                      transform: openMenu === 'store' ? 'rotate(180deg)' : 'none',
                      transition: 'none',
                    }}
                  >
                    ▼
                  </span>
                </button>

                {isStore && openMenu === 'store' && (
                  <div 
                    className="absolute z-50"
                    style={{ 
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--white-pure)',
                      border: '1px solid var(--gray-lighter)',
                      padding: '16px 24px',
                      minWidth: '120px',
                    }}
                  >
                    {/* 제품 형태만 */}
                    <div className="flex flex-col gap-1">
                      {productTypeCategories.map((cat) => (
                        <a
                          key={cat}
                          href="#"
                          className="dropdown-item"
                          style={{
                            fontSize: 'clamp(11px, 1.2vw, 13px)',
                            fontWeight: 400,
                            color: 'var(--black)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            padding: '6px 0',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenMenu(null);
                            setIsMobileMenuOpen(false);
                            if (cat === '전체') {
                              navigate('/store');
                            } else {
                              navigate(`/store?productType=${encodeURIComponent(cat)}`);
                            }
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                            e.currentTarget.style.textUnderlineOffset = '4px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          {cat}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 오른쪽 아이콘 + 모바일 메뉴 버튼 */}
        <div className="icons flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0" style={{ flex: '0 0 auto', minWidth: 'fit-content' }}>
          <span className="text-xs sm:text-sm whitespace-nowrap font-bold text-stone-600 hidden sm:inline" style={{ lineHeight: 1 }}>KR</span>
>>>>>>> 5007cdf0408d3e34bc296e1e165a9e6e6e78284e
          
          {/* 마이페이지 버튼 */}
          <div className="relative profile-menu-container flex-shrink-0">
            <button 
              onClick={onProfileMenuToggle}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ 
                width: '36px',
                height: '36px',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
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
          
          <Link 
            to="/cart" 
            className="transition-colors relative text-stone-700 hover:text-stone-900 flex-shrink-0"
            style={{ 
              width: '36px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <ShoppingCart style={{ width: '20px', height: '20px' }} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold" style={{ lineHeight: 1 }}>0</span>
          </Link>
          <button 
            className="transition-colors text-stone-700 hover:text-stone-900 hidden sm:inline-flex items-center justify-center flex-shrink-0" 
            style={{ 
              width: '36px',
              height: '36px',
              padding: 0,
            }}
          >
            <Search style={{ width: '20px', height: '20px' }} />
          </button>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden transition-colors text-stone-700 hover:text-stone-900 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              width: '36px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <Menu style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 드롭다운 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-stone-200 shadow-sm">
          <div className="space-y-2" style={{
            padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px)',
          }}>
            {navItems.map((item) => {
              const isStore = item.hasDropdown;
              const isActive = location.pathname === item.path || 
                (item.path === '/store' && location.pathname.startsWith('/store')) ||
                (item.path === '/recipe' && location.pathname.startsWith('/recipe')) ||
                (item.path === '/newsletter' && location.pathname.startsWith('/newsletter')) ||
                (item.path === '/event' && location.pathname.startsWith('/event')) ||
                (item.path === '/about' && location.pathname.startsWith('/about'));
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
                    className={`block py-1 uppercase ${
                      isActive 
                        ? 'text-stone-900 font-extrabold underline underline-offset-4' 
                        : 'text-stone-700 font-medium'
                    }`}
                    style={{
                      fontSize: 'clamp(12px, 1.8vw, 14px)',
                    }}
                  >
                    {item.name}
                  </Link>
                  {isStore && isMobileStoreOpen && (
                    <div className="ml-3 mt-1 space-y-1">
                      {/* 제품 형태만 */}
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
                          className="block text-left w-full text-stone-600 py-1 hover:text-stone-900"
                          style={{
                            fontSize: 'clamp(11px, 1.5vw, 13px)',
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
          </div>
        </div>
      )}
    </header>
  );
};

