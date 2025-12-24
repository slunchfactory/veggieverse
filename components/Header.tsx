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
  offsetTop?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  userProfile, 
  onProfileMenuToggle, 
  showProfileMenu, 
  onResetProfile,
  offsetTop = 0,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileStoreOpen, setIsMobileStoreOpen] = useState(false);
  
  const navItems = [
    { name: 'About', path: '/brand' },
    { name: 'Store', path: '/store', hasDropdown: true },
    { name: 'Recipe', path: '/recipe' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Event', path: '/event' },
  ];

  // 식품 특화 카테고리 (단일 레벨)
  const primaryCategories = ['ALL', 'NEW'];
  const secondaryCategories = ['슬런치 위클리', '소스와 오일', '밀키트', '베이커리'];

  return (
    <header
      className="fixed left-0 right-0 z-[9999]"
      style={{ 
        top: offsetTop,
        backgroundColor: 'var(--white-pure)',
        borderBottom: '1px solid var(--gray-lighter)',
        height: 'auto'
      }}
    >
      <nav className="h-full flex items-center justify-between px-8 max-w-[1400px] mx-auto min-w-[320px]">
        {/* 왼쪽 로고 */}
        <Link 
          to="/" 
          className="flex items-center gap-3 flex-shrink-0 min-w-[100px]"
        >
          <img 
            src={`${import.meta.env.BASE_URL}common/logo.png`}
            alt="SLUNCH FACTORY" 
            className="h-7 sm:h-8 lg:h-9 w-auto flex-shrink-0"
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
              (item.path === '/brand' && location.pathname.startsWith('/brand'));
            const isStore = item.hasDropdown;
            if (!isStore) {
              return (
                <button
                  key={item.path}
                  className="bg-transparent border-none p-0"
                  style={{
                    padding: '24px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--black)',
                  }}
                >
                  <Link 
                    to={item.path} 
                    className={`nav-item-text ${isActive ? 'active' : ''}`}
                    style={{
                      textDecoration: isActive ? 'underline' : 'none',
                      textUnderlineOffset: '4px',
                      color: 'inherit',
                    }}
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
                  className="bg-transparent border-none p-0"
                  style={{
                    padding: '24px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--black)',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu((prev) => (prev === 'store' ? null : 'store'));
                  }}
                >
                  <Link 
                    to={item.path} 
                    className={`nav-item-text ${isActive || openMenu === 'store' ? 'active' : ''}`}
                    style={{
                      textDecoration: isActive || openMenu === 'store' ? 'underline' : 'none',
                      textUnderlineOffset: '4px',
                      color: 'inherit',
                      pointerEvents: 'none',
                    }}
                  >
                    {item.name}
                  </Link>
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
                    className="fixed left-0 right-0 z-50"
                    style={{ 
                      top: (64 + offsetTop) + 'px',
                      backgroundColor: 'var(--white-pure)',
                      borderTop: '1px solid var(--gray-lighter)',
                      padding: '24px 32px',
                      paddingLeft: '200px',
                      display: 'flex',
                      gap: '80px',
                    }}
                  >
                    <div className="flex flex-col gap-4">
                      {primaryCategories.map((cat) => (
                        <a
                          key={cat}
                          href="#"
                          className="dropdown-item category"
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--black)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenMenu(null);
                            setIsMobileMenuOpen(false);
                            if (cat === 'ALL') {
                              navigate('/store');
                            } else {
                              navigate(`/store?category=${encodeURIComponent(cat)}`);
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
                    <div className="flex flex-col gap-4">
                      {secondaryCategories.map((cat) => (
                        <a
                          key={cat}
                          href="#"
                          className="dropdown-item"
                          style={{
                            fontSize: '13px',
                            fontWeight: 400,
                            color: 'var(--black)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenMenu(null);
                            setIsMobileMenuOpen(false);
                            if (cat === '슬런치 위클리') {
                              navigate('/store/product/15');
                            } else {
                              navigate(`/store?category=${encodeURIComponent(cat)}`);
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
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-xs sm:text-sm whitespace-nowrap font-bold text-stone-600">KR</span>
          
          {/* 마이페이지 버튼 */}
          <div className="relative profile-menu-container">
            <button 
              onClick={onProfileMenuToggle}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {userProfile.profileImage ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-300 shadow-sm">
                  <img 
                    src={userProfile.profileImage} 
                    alt="My Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-stone-600" />
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
            className="transition-colors relative text-stone-700 hover:text-stone-900"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">0</span>
          </Link>
          <button className="transition-colors text-stone-700 hover:text-stone-900">
            <Search className="w-5 h-5" />
          </button>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden transition-colors text-stone-700 hover:text-stone-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 드롭다운 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-stone-200 shadow-sm">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const isStore = item.hasDropdown;
              const isActive = location.pathname === item.path || 
                (item.path === '/store' && location.pathname.startsWith('/store')) ||
                (item.path === '/recipe' && location.pathname.startsWith('/recipe')) ||
                (item.path === '/newsletter' && location.pathname.startsWith('/newsletter')) ||
                (item.path === '/event' && location.pathname.startsWith('/event')) ||
                (item.path === '/brand' && location.pathname.startsWith('/brand'));
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
                    className={`block text-sm py-1 ${
                      isActive 
                        ? 'text-stone-900 font-extrabold underline underline-offset-4' 
                        : 'text-stone-700 font-medium'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {isStore && isMobileStoreOpen && (
                    <div className="ml-3 mt-1 space-y-1">
                      {[...primaryCategories, ...secondaryCategories].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setIsMobileStoreOpen(false);
                            setIsMobileMenuOpen(false);
                            if (cat === 'ALL') {
                              navigate('/store');
                            } else if (cat === '슬런치 위클리') {
                              // 슬런치 위클리는 상품 상세 페이지로 바로 이동
                              navigate('/store/product/15');
                            } else {
                              navigate(`/store?category=${encodeURIComponent(cat)}`);
                            }
                          }}
                          className="block text-left w-full text-sm text-stone-600 py-1 hover:text-stone-900"
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

