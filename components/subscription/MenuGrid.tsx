import React, { useState, useMemo } from 'react';
import { Plus, Check } from 'lucide-react';
import {
  DietType,
  ExclusionCategory,
  MenuItem,
  SAMPLE_MENUS,
  MealPlanType,
  MEAL_PLAN_MENUS,
} from './types';

interface MenuGridProps {
  excludedCategories: ExclusionCategory[];
  selectedMealPlans: MealPlanType[];
  singleItems: Map<string, number>; // menuId -> quantity
  onAddSingleItem: (menuId: string) => void;
  onRemoveSingleItem: (menuId: string) => void;
}

const DIET_FILTERS: { id: DietType; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'vegan', label: '비건' },
  { id: 'pescatarian', label: '페스코' },
  { id: 'pollo', label: '폴로' },
];

export const MenuGrid: React.FC<MenuGridProps> = ({
  excludedCategories,
  selectedMealPlans,
  singleItems,
  onAddSingleItem,
  onRemoveSingleItem,
}) => {
  const [dietFilter, setDietFilter] = useState<DietType>('all');

  // 선택된 식단에 포함된 메뉴 ID 목록
  const menuIdsInMealPlans = useMemo(() => {
    const ids = new Set<string>();
    selectedMealPlans.forEach((planId) => {
      MEAL_PLAN_MENUS[planId].forEach((menuId) => ids.add(menuId));
    });
    return ids;
  }, [selectedMealPlans]);

  // 필터링된 메뉴 목록
  const filteredMenus = useMemo(() => {
    return SAMPLE_MENUS.filter((menu) => {
      // 제외 카테고리 필터
      if (menu.excludeTags.some((tag) => excludedCategories.includes(tag))) {
        return false;
      }

      // 식이 유형 필터
      if (dietFilter !== 'all' && !menu.dietType.includes(dietFilter)) {
        return false;
      }

      return true;
    });
  }, [excludedCategories, dietFilter]);

  const getItemQuantity = (menuId: string): number => {
    return singleItems.get(menuId) || 0;
  };

  const isInMealPlan = (menuId: string): boolean => {
    return menuIdsInMealPlans.has(menuId);
  };

  return (
    <section style={{ padding: '24px', background: 'var(--palette-bg-2)' }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '4px' }}>
          전체 메뉴
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--warm-gray)' }}>
          낱개로 추가할 수 있어요
        </p>
      </div>

      {/* Diet Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          overflowX: 'auto',
        }}
      >
        {DIET_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setDietFilter(filter.id)}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              border: dietFilter === filter.id ? '2px solid var(--palette-text)' : '1px solid var(--border-divider)',
              borderRadius: '20px',
              background: dietFilter === filter.id ? 'var(--palette-text)' : '#fff',
              color: dietFilter === filter.id ? '#fff' : 'var(--charcoal)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Sort indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '12px',
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--gray-light)' }}>추천순</span>
      </div>

      {/* Menu Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}
      >
        {filteredMenus.map((menu) => {
          const quantity = getItemQuantity(menu.id);
          const inMealPlan = isInMealPlan(menu.id);

          return (
            <div
              key={menu.id}
              style={{
                background: '#fff',
                border: quantity > 0 ? '2px solid var(--palette-text)' : '1px solid var(--border-hairline)',
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: 'var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  position: 'relative',
                }}
              >
                IMG
                {/* 식단 포함 표시 */}
                {inMealPlan && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'var(--palette-text)',
                      color: '#fff',
                      fontSize: '10px',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <Check size={10} />
                    식단포함
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '12px' }}>
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '4px',
                  }}
                >
                  {menu.name}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--palette-text)',
                    marginBottom: '8px',
                  }}
                >
                  {menu.price.toLocaleString()}원
                </p>

                {/* Add button or quantity control */}
                {quantity > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                    }}
                  >
                    <button
                      onClick={() => onRemoveSingleItem(menu.id)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '1px solid var(--border-divider)',
                        background: '#fff',
                        fontSize: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => onAddSingleItem(menu.id)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '1px solid var(--palette-text)',
                        background: 'var(--palette-text)',
                        color: '#fff',
                        fontSize: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddSingleItem(menu.id)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid var(--palette-text)',
                      background: '#fff',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <Plus size={14} />
                    담기
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredMenus.length === 0 && (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--gray-light)',
          }}
        >
          조건에 맞는 메뉴가 없어요
        </div>
      )}
    </section>
  );
};

export default MenuGrid;
