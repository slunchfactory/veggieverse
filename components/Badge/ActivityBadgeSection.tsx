import React, { useState } from 'react';
import { Lock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge, ALL_BADGES, BadgeType, BadgeCategory } from '../../contexts/UserContext';

// ============================================
// 설정값 상수
// ============================================
const COLS_DESKTOP = 7;
const COLLAPSED_ROWS = 1;
const EXPANDED_ROWS = 4;

const ITEMS_COLLAPSED = COLS_DESKTOP * COLLAPSED_ROWS; // 7
const ITEMS_PER_PAGE = COLS_DESKTOP * EXPANDED_ROWS;   // 24

// ============================================
// Props
// ============================================
interface ActivityBadgeSectionProps {
  earnedBadges: Badge[];
  title?: string;
  onBadgeClick?: (badgeId: BadgeType) => void;
}

// ============================================
// Badge Item Component
// ============================================
interface BadgeItemProps {
  badge: { id: BadgeType; name: string; description: string; icon: string; category: BadgeCategory };
  isLocked: boolean;
  earnedAt?: string;
  onClick?: () => void;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge, isLocked, earnedAt, onClick }) => {
  const isHidden = badge.category === 'hidden';

  return (
    <div className="flex flex-col items-center text-center group cursor-pointer" onClick={onClick}>
      {/* Badge Circle */}
      <div
        className={`
          relative w-16 h-16 mb-2 rounded-full
          flex items-center justify-center border transition-all duration-300
          ${isLocked ? 'border-[color:var(--border-hairline)] bg-cream' : 'border-black bg-white group-hover:scale-105'}
          ${isHidden && isLocked ? 'border-dashed' : ''}
        `}
      >
        {isLocked ? (
          isHidden ? (
            <span className="text-gray-light text-lg" style={{ fontWeight: 400 }}>?</span>
          ) : (
            <Lock strokeWidth={1} className="w-4 h-4 text-gray-light" />
          )
        ) : (
          <span className="text-2xl">{badge.icon}</span>
        )}
      </div>

      {/* Text Info */}
      <div className="w-full px-0.5">
        <h3
          className={`text-[11px] truncate mb-0.5 tracking-tight ${isLocked ? 'text-muted' : 'text-black'}`}
          style={{ fontWeight: 400 }}
        >
          {badge.name}
        </h3>
        <p className="text-[10px] text-muted leading-tight truncate" style={{ fontWeight: 400 }}>
          {isLocked ? badge.description : earnedAt ? new Date(earnedAt).toLocaleDateString('ko-KR') : ''}
        </p>
      </div>
    </div>
  );
};

// ============================================
// Main Component
// ============================================
const ActivityBadgeSection: React.FC<ActivityBadgeSectionProps> = ({
  earnedBadges,
  title = '활동 뱃지',
  onBadgeClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 모든 뱃지 목록 생성 (획득 여부 포함)
  const allBadgesList = Object.values(ALL_BADGES).map(badge => {
    const earned = earnedBadges.find(eb => eb.id === badge.id);
    return {
      ...badge,
      isLocked: !earned,
      earnedAt: earned?.earnedAt,
    };
  });

  const totalPages = Math.ceil(allBadgesList.length / ITEMS_PER_PAGE);
  const unlockedCount = allBadgesList.filter(b => !b.isLocked).length;
  const totalCount = allBadgesList.length;

  // 현재 보여줄 뱃지 계산
  const getVisibleBadges = () => {
    if (!isExpanded) {
      return allBadgesList.slice(0, ITEMS_COLLAPSED);
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allBadgesList.slice(startIndex, endIndex);
  };

  const visibleBadges = getVisibleBadges();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
    setCurrentPage(1);
  };

  return (
    <section style={{ marginBottom: '32px' }}>
      {/* Header - 최근 주문과 동일한 구조 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)' }}>
          {title} <span style={{ color: 'var(--warm-gray)' }}>({unlockedCount}/{totalCount})</span>
        </h2>
        {allBadgesList.length > ITEMS_COLLAPSED && (
          <button
            onClick={toggleExpand}
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {isExpanded ? '접기' : '전체보기'}
            {isExpanded ? (
              <ChevronUp size={14} strokeWidth={1} />
            ) : (
              <ChevronDown size={14} strokeWidth={1} />
            )}
          </button>
        )}
      </div>

      {/* Badge Grid - 모바일 3열, PC 7열 */}
      <div className="grid grid-cols-3 md:grid-cols-7 gap-x-2 gap-y-6">
        {visibleBadges.map(badge => (
          <BadgeItem
            key={badge.id}
            badge={badge}
            isLocked={badge.isLocked}
            earnedAt={badge.earnedAt}
            onClick={() => onBadgeClick?.(badge.id)}
          />
        ))}
      </div>

      {/* 페이지네이션 (펼친 상태 + 2페이지 이상일 때만) */}
      {isExpanded && totalPages > 1 && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '4px',
                border: 'none',
                background: 'transparent',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.3 : 1,
              }}
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isActive ? '1px solid var(--palette-text)' : '1px solid transparent',
                      background: isActive ? 'var(--palette-text)' : 'transparent',
                      color: isActive ? '#fff' : '#9CA3AF',
                      fontSize: '12px',
                      fontWeight: 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '4px',
                border: 'none',
                background: 'transparent',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.3 : 1,
              }}
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivityBadgeSection;
