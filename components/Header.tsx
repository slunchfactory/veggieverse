import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

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
}

export const Header: React.FC<HeaderProps> = ({ 
  userProfile, 
  onProfileMenuToggle, 
  showProfileMenu, 
  onResetProfile 
}) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'About', path: '/brand' },
    { name: 'Store', path: '/store' },
    { name: 'Event', path: '/event' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Review', path: '/review' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#D8D262' }}>
      <nav className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-w-[320px]">
        {/* 왼쪽 로고 */}
        <Link to="/shop" className="flex items-center gap-3 flex-shrink-0 min-w-[100px]">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="SLUNCH FACTORY" 
            className="h-7 sm:h-8 lg:h-9 w-auto flex-shrink-0"
          />
        </Link>
        
        {/* 가운데 메뉴 - 데스크톱 */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-xs sm:text-sm font-semibold transition-colors uppercase ${
                location.pathname === item.path 
                  ? 'text-black' 
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* 오른쪽 아이콘 + 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-stone-500 text-xs sm:text-sm whitespace-nowrap">KR</span>
          
          {/* 마이페이지 버튼 */}
          <div className="relative profile-menu-container">
            <button 
              onClick={onProfileMenuToggle}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {userProfile.profileImage ? (
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-800 shadow-sm">
                  <img 
                    src={userProfile.profileImage} 
                    alt="My Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-stone-500" />
                </div>
              )}
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50">
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
          
          <Link to="/cart" className="text-stone-600 hover:text-black transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">0</span>
          </Link>
          <button className="text-stone-600 hover:text-black transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {/* 모바일 메뉴 버튼 */}
          <button 
            className="lg:hidden text-stone-700 hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 드롭다운 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#D8D262] border-t border-stone-200 shadow-sm">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm py-1 ${
                  location.pathname === item.path 
                    ? 'text-black font-semibold' 
                    : 'text-stone-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

