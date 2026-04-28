import React from 'react';
import { Package, RefreshCcw, MessageSquare, Heart, Bookmark, MapPin, UserCog, Gift } from 'lucide-react';

const menuItems = [
  { icon: Package, label: '주문내역' },
  { icon: RefreshCcw, label: '취소/반품' },
  { icon: Heart, label: '찜한 상품' },
  { icon: Bookmark, label: '북마크' },
  { icon: MessageSquare, label: '나의 리뷰' },
  { icon: Gift, label: '이벤트' },
  { icon: MapPin, label: '배송지 관리' },
  { icon: UserCog, label: '정보 수정' },
];

const QuickMenu: React.FC = () => {
  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '12px' }}>Quick Menu</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid var(--palette-text)',
          borderBottom: '1px solid var(--palette-text)',
          padding: '20px 0',
        }}
      >
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              aria-label={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 0',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--palette-bg-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconComponent size={18} strokeWidth={1} color="var(--palette-text)" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--warm-gray)' }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickMenu;
