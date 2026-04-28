import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Minus, X } from 'lucide-react';

interface SubItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  path: string;
  subItems?: SubItem[];
}

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSearchClick: () => void;
  onLogoutClick: () => void;
  showTopBanner?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'About', path: '/about' },
  {
    name: 'Store',
    path: '/store',
    subItems: [
      { name: '전체', path: '/store' },
      { name: '밀키트', path: '/store?productType=밀키트' },
      { name: '베이커리', path: '/store?productType=베이커리' },
      { name: '소스/오일', path: '/store?productType=소스/오일' },
      { name: '세트', path: '/store?productType=세트' },
    ],
  },
  { name: 'Subscription', path: '/subscribe' },
  { name: 'Recipe', path: '/recipe' },
  { name: 'Newsletter', path: '/newsletter' },
  { name: 'Event', path: '/event' },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginClick,
  onSearchClick,
  onLogoutClick,
  showTopBanner = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      setExpandedMenu(expandedMenu === item.name ? null : item.name);
    } else {
      navigate(item.path);
      onClose();
    }
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  /** 스토어 하위 경로: /store vs /store?productType=… */
  const isStoreSubActive = (path: string) => {
    const [pathOnly, qs] = path.split('?');
    if (location.pathname !== pathOnly) return false;
    if (!qs) {
      const cur = new URLSearchParams(location.search).get('productType');
      return cur === null || cur === '';
    }
    const wanted = new URLSearchParams(qs).get('productType');
    return new URLSearchParams(location.search).get('productType') === wanted;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop - 투명, 클릭시 닫힘 */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Drawer Panel - 그림자/블러 없는 flat 스타일, 배너 유무에 따라 top 위치 조정 */}
      <div
        style={{
          position: 'absolute',
          top: showTopBanner ? 'var(--promo-h)' : 0,
          left: 0,
          bottom: 0,
          width: '80vw',
          maxWidth: '400px',
          background: '#FFFFFF',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          borderRight: '1px solid var(--palette-text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 영역 - 헤더와 동일한 높이로 줄맞춤, X버튼은 햄버거 버튼 위치와 동일 */}
        <div
          style={{
            height: 'var(--header-h)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 16px',
            borderBottom: '1px solid var(--palette-text)',
            flexShrink: 0,
          }}
        >
          {/* X 아이콘 닫기 버튼 - 햄버거 버튼과 같은 위치 */}
          <button
            onClick={onClose}
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
            aria-label="메뉴 닫기"
          >
            <X size={24} strokeWidth={1} color="var(--palette-text)" />
          </button>
        </div>

        {/* Menu Items */}
        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <div key={item.name}>
              {/* Main Menu Item */}
              <div
                className="ui-drawer-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: '1px solid var(--palette-text)',
                  cursor: 'pointer',
                }}
                onClick={() => handleMenuClick(item)}
              >
                <span
                  className={`ui-drawer-nav-primary ${isActive(item.path) ? 'ui-drawer-nav-primary--active' : ''}`}
                >
                  {item.name}
                </span>
                {item.subItems && (
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedMenu(expandedMenu === item.name ? null : item.name);
                    }}
                  >
                    {expandedMenu === item.name ? (
                      <Minus size={18} color="var(--palette-text)" strokeWidth={1} />
                    ) : (
                      <Plus size={18} color="var(--palette-text)" strokeWidth={1} />
                    )}
                  </button>
                )}
              </div>

              {/* Sub Menu Items (Accordion) */}
              {item.subItems && (
                <div
                  style={{
                    maxHeight: expandedMenu === item.name ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-out',
                    background: '#FFFFFF',
                  }}
                >
                  {item.subItems.map((subItem) => (
                    <button
                      type="button"
                      key={subItem.path}
                      className="ui-nav-tab ui-nav-tab--block"
                      data-ui-active={isStoreSubActive(subItem.path) ? 'true' : 'false'}
                      style={{
                        padding: '14px 24px 14px 40px',
                        border: 'none',
                        borderBottom: '1px solid var(--palette-text)',
                        borderRadius: 0,
                        background: '#FFFFFF',
                      }}
                      onClick={() => handleSubItemClick(subItem.path)}
                    >
                      <span className="ui-nav-tab__label">{subItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section - Search, Login/Logout */}
        <div
          style={{
            padding: '24px',
            borderTop: '1px solid var(--palette-text)',
            marginTop: 'auto',
          }}
        >
          {/* Search */}
          <button
            className="ui-text-action"
            onClick={() => {
              onClose();
              onSearchClick();
            }}
            style={{
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: 0,
              marginBottom: '16px',
            }}
          >
            Search
          </button>

          {isLoggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link
                to="/mypage"
                onClick={onClose}
                className="link-plain"
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--palette-text)',
                  textDecoration: 'none',
                }}
              >
                My Page
              </Link>
              <button
                type="button"
                className="ui-text-action"
                onClick={() => {
                  onClose();
                  onLogoutClick();
                }}
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--warm-gray)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="ui-text-action"
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'var(--palette-text)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
              }}
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
