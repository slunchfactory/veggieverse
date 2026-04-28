import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import {
  MealPlanType,
  MEAL_PLAN_INFOS,
  ExclusionCategory,
  SAMPLE_MENUS,
  MEAL_PLAN_MENUS,
} from './types';

// 라인별 컬러
const LINE_COLORS: Record<MealPlanType, { main: string; bg: string }> = {
  recovery: { main: '#2563EB', bg: '#EFF6FF' },
  glow: { main: '#DB2777', bg: '#FDF2F8' },
  clean: { main: '#059669', bg: '#ECFDF5' },
  light: { main: '#F59E0B', bg: '#FFFBEB' },
  balance: { main: '#7C3AED', bg: '#F5F3FF' },
};

interface MenuProductGridProps {
  excludedCategories: ExclusionCategory[];
  onAddToSlot: (menuId: string) => void;
}

export const MenuProductGrid: React.FC<MenuProductGridProps> = ({
  excludedCategories,
  onAddToSlot,
}) => {
  const [filterLine, setFilterLine] = useState<MealPlanType | 'all'>('all');

  // 필터링된 메뉴
  const filteredMenus = useMemo(() => {
    let menus = SAMPLE_MENUS;

    // 제외 재료 필터
    menus = menus.filter(
      (menu) => !menu.excludeTags.some((tag) => excludedCategories.includes(tag))
    );

    // 라인 필터
    if (filterLine !== 'all') {
      const lineMenuIds = MEAL_PLAN_MENUS[filterLine];
      menus = menus.filter((menu) => lineMenuIds.includes(menu.id));
    }

    return menus;
  }, [excludedCategories, filterLine]);

  // 메뉴가 속한 라인들 찾기
  const getMenuLines = (menuId: string): MealPlanType[] => {
    const lines: MealPlanType[] = [];
    (Object.entries(MEAL_PLAN_MENUS) as [MealPlanType, string[]][]).forEach(([lineId, menuIds]) => {
      if (menuIds.includes(menuId)) {
        lines.push(lineId);
      }
    });
    return lines;
  };

  return (
    <section>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0 16px',
          marginBottom: '20px',
          borderBottom: '2px solid var(--palette-text)',
        }}
      >
        <h2 style={{ fontSize: '20px', fontWeight: 500 }}>전체 도시락 메뉴</h2>
        <span style={{ fontSize: '14px', color: 'var(--warm-gray)' }}>총 {SAMPLE_MENUS.length}개</span>
      </div>

      {/* Line Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setFilterLine('all')}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            border: filterLine === 'all' ? '2px solid var(--palette-text)' : '1px solid var(--border-divider)',
            background: filterLine === 'all' ? 'var(--palette-text)' : '#fff',
            color: filterLine === 'all' ? '#fff' : 'var(--warm-gray)',
            cursor: 'pointer',
          }}
        >
          전체
        </button>
        {MEAL_PLAN_INFOS.map((plan) => {
          const colors = LINE_COLORS[plan.id];
          const isSelected = filterLine === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setFilterLine(plan.id)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                border: `2px solid ${colors.main}`,
                background: isSelected ? colors.main : '#fff',
                color: isSelected ? '#fff' : colors.main,
                cursor: 'pointer',
              }}
            >
              {plan.name}
            </button>
          );
        })}
      </div>

      {/* Menu Grid - ProductCard style (4 columns) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}
      >
        {filteredMenus.map((menu) => {
          const menuLines = getMenuLines(menu.id);

          return (
            <div
              key={menu.id}
              style={{
                background: 'var(--cream)',
                border: '1px solid var(--palette-text)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              className="hover-scale"
            >
              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  background: 'var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                }}
              >
                🍱
                {/* Line Tags */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                  }}
                >
                  {menuLines.slice(0, 2).map((lineId) => {
                    const lineInfo = MEAL_PLAN_INFOS.find((p) => p.id === lineId);
                    const colors = LINE_COLORS[lineId];
                    return (
                      <span
                        key={lineId}
                        style={{
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: 500,
                          background: colors.main,
                          color: '#fff',
                        }}
                      >
                        {lineInfo?.name}
                      </span>
                    );
                  })}
                </div>

                {/* Hover Add Button */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToSlot(menu.id);
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(26, 10, 5, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                  className="hover-overlay"
                >
                  + 식단에 추가
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '16px' }}>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    marginBottom: '6px',
                    lineHeight: 1.3,
                  }}
                >
                  {menu.name}
                </h3>

                {/* Diet Type Tags */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {menu.dietType.slice(0, 2).map((diet) => (
                    <span
                      key={diet}
                      style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        background: 'var(--palette-bg-2)',
                        color: 'var(--warm-gray)',
                      }}
                    >
                      {diet === 'vegan' && '비건'}
                      {diet === 'pescatarian' && '페스코'}
                      {diet === 'pollo' && '폴로'}
                      {diet === 'all' && '올'}
                    </span>
                  ))}
                  {menu.calories && (
                    <span
                      style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        background: 'var(--palette-bg-2)',
                        color: 'var(--warm-gray)',
                      }}
                    >
                      {menu.calories}kcal
                    </span>
                  )}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 400 }}>
                    {menu.price.toLocaleString()}원
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToSlot(menu.id);
                    }}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      border: '1px solid var(--palette-text)',
                      background: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Plus size={12} />
                    담기
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMenus.length === 0 && (
        <div
          style={{
            padding: '60px',
            textAlign: 'center',
            color: 'var(--gray-light)',
          }}
        >
          조건에 맞는 메뉴가 없어요
        </div>
      )}

      {/* Hover styles */}
      <style>{`
        .hover-scale:hover {
          transform: scale(1.02);
        }
        .hover-scale:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default MenuProductGrid;
