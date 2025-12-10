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
    { name: 'Event', path: '/event' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Recipe', path: '/recipe' },
  ];

  // 식품 특화 카테고리 (단일 레벨)
  const primaryCategories = ['ALL', 'NEW'];
  const secondaryCategories = ['샐러드', '수프와 메인요리', '소스와 오일', '밀키트', '베이커리'];

  // 블렌드 스타일 - 흰색 텍스트가 difference로 인해 흰 배경에선 검은색, 어두운 배경에선 흰색으로 보임
  const blendStyle: React.CSSProperties = {
    color: '#ffffff',
    mixBlendMode: 'difference',
  };

  return (
    <header
      className="fixed left-0 right-0 z-50"
      style={{ top: offsetTop }}
    >
      <nav className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-w-[320px]">
        {/* 왼쪽 로고 */}
        <Link 
          to="/shop" 
          className="flex items-center gap-3 flex-shrink-0 min-w-[100px]"
          style={{ mixBlendMode: 'difference' }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="SLUNCH FACTORY" 
            className="h-7 sm:h-8 lg:h-9 w-auto flex-shrink-0"
            style={{ filter: 'invert(1)' }}
          />
        </Link>
        
        {/* 가운데 메뉴 - 데스크톱 */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isStore = item.hasDropdown;
            if (!isStore) {
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-xs sm:text-sm font-bold uppercase flex items-center gap-1"
                  style={blendStyle}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <div
                key={item.path}
                className="relative"
              >
                <Link 
                  to={item.path} 
                  className="text-xs sm:text-sm font-bold uppercase flex items-center gap-1"
                  style={blendStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu((prev) => (prev === 'store' ? null : 'store'));
                  }}
                >
                  {item.name}
                  <ChevronDown className={`w-3 h-3 transition-transform ${openMenu === 'store' ? 'rotate-180' : ''}`} />
                </Link>

                {isStore && openMenu === 'store' && (
                  <div 
                    className="fixed left-0 right-0 bg-white border-b border-stone-200 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] z-50"
                    style={{ top: 64 + offsetTop }}
                  >
                    <div className="max-w-[900px] mx-auto px-6 py-5">
                      <div className="flex flex-wrap gap-8 text-sm text-stone-800">
                        <div className="flex flex-col gap-3 min-w-[140px]">
                          {primaryCategories.map((cat) => (
                            <button
                              key={cat}
                              className="text-left text-[13px] text-stone-800 pb-[2px] border-b border-transparent hover:border-stone-900 transition-colors w-fit"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setOpenMenu(null);
                                setIsMobileMenuOpen(false);
                                // ALL은 전체 상품, 나머지는 카테고리 필터
                                if (cat === 'ALL') {
                                  navigate('/store');
                                } else {
                                  navigate(`/store?category=${encodeURIComponent(cat)}`);
                                }
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-col gap-3 min-w-[180px]">
                          {secondaryCategories.map((cat) => (
                            <button
                              key={cat}
                              className="text-left text-[13px] text-stone-800 pb-[2px] border-b border-transparent hover:border-stone-900 transition-colors w-fit"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setOpenMenu(null);
                                setIsMobileMenuOpen(false);
                                navigate(`/store?category=${encodeURIComponent(cat)}`);
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 오른쪽 아이콘 + 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span 
            className="text-xs sm:text-sm whitespace-nowrap font-bold"
            style={blendStyle}
          >KR</span>
          
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
                      to="/mypage"
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
            className="relative"
            style={blendStyle}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E54B1A] text-white text-[10px] rounded-full flex items-center justify-center" style={{ mixBlendMode: 'normal' }}>0</span>
          </Link>
          <button style={blendStyle}>
            <Search className="w-5 h-5" />
          </button>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden"
            style={blendStyle}
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
                      location.pathname === item.path 
                        ? 'text-stone-900 font-semibold' 
                        : 'text-stone-700'
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

