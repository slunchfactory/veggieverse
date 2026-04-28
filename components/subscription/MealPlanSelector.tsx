import React from 'react';
import { MealPlanType, MEAL_PLAN_INFOS, ExclusionCategory } from './types';
import { MealPlanCard } from './MealPlanCard';

interface MealPlanSelectorProps {
  selectedPlans: MealPlanType[];
  onPlanToggle: (planId: MealPlanType) => void;
  onClearAll: () => void;
  excludedCategories: ExclusionCategory[];
  excludedMenusFromPlan: Record<MealPlanType, string[]>;
  onExcludeMenuFromPlan: (planId: MealPlanType, menuId: string) => void;
}

export const MealPlanSelector: React.FC<MealPlanSelectorProps> = ({
  selectedPlans,
  onPlanToggle,
  onClearAll,
  excludedCategories,
  excludedMenusFromPlan,
  onExcludeMenuFromPlan,
}) => {
  return (
    <section style={{ padding: '24px 0' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '6px' }}>
            추천 식단
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--warm-gray)' }}>
            원하는 식단을 선택하세요. 여러 개를 담을 수 있어요.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedPlans.length > 0 && (
            <>
              <span style={{ fontSize: '14px', color: 'var(--palette-text)', fontWeight: 500 }}>
                {selectedPlans.length}개 선택 중
              </span>
              <button
                onClick={onClearAll}
                style={{
                  fontSize: '13px',
                  color: 'var(--gray-light)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                전체 해제
              </button>
            </>
          )}
        </div>
      </div>

      {/* Large Meal Plan Cards - Vertical Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {MEAL_PLAN_INFOS.map((plan) => {
          const isSelected = selectedPlans.includes(plan.id);
          const excludedMenus = excludedMenusFromPlan[plan.id] || [];

          return (
            <MealPlanCard
              key={plan.id}
              planId={plan.id}
              isSelected={isSelected}
              onToggle={() => onPlanToggle(plan.id)}
              excludedCategories={excludedCategories}
              excludedMenus={excludedMenus}
              onExcludeMenu={(menuId) => onExcludeMenuFromPlan(plan.id, menuId)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MealPlanSelector;
