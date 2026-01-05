import React, { useState, useCallback } from 'react';
import { SidebarFilter } from '../components/subscription/SidebarFilter';
import { MealPlanSelector } from '../components/subscription/MealPlanSelector';
import { MenuGrid } from '../components/subscription/MenuGrid';
import { CartBar } from '../components/subscription/CartBar';
import { ExclusionCategory, MealPlanType } from '../components/subscription/types';

export const SubscriptionPage: React.FC = () => {
  // 제외 필터 상태
  const [excludedCategories, setExcludedCategories] = useState<ExclusionCategory[]>([]);

  // 선택된 식단 상태
  const [selectedMealPlans, setSelectedMealPlans] = useState<MealPlanType[]>([]);

  // 식단에서 제외한 메뉴 상태
  const [excludedMenusFromPlan, setExcludedMenusFromPlan] = useState<
    Record<MealPlanType, string[]>
  >({
    recovery: [],
    glow: [],
    clean: [],
    light: [],
    balance: [],
  });

  // 낱개 아이템 상태
  const [singleItems, setSingleItems] = useState<Map<string, number>>(new Map());

  // 식단 선택/해제
  const handlePlanToggle = useCallback((planId: MealPlanType) => {
    setSelectedMealPlans((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((p) => p !== planId);
      } else {
        return [...prev, planId];
      }
    });
  }, []);

  // 식단 전체 해제
  const handleClearAllPlans = useCallback(() => {
    setSelectedMealPlans([]);
  }, []);

  // 식단에서 메뉴 제외/복구
  const handleExcludeMenuFromPlan = useCallback((planId: MealPlanType, menuId: string) => {
    setExcludedMenusFromPlan((prev) => {
      const current = prev[planId] || [];
      if (current.includes(menuId)) {
        return {
          ...prev,
          [planId]: current.filter((id) => id !== menuId),
        };
      } else {
        return {
          ...prev,
          [planId]: [...current, menuId],
        };
      }
    });
  }, []);

  // 낱개 추가
  const handleAddSingleItem = useCallback((menuId: string) => {
    setSingleItems((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(menuId) || 0;
      newMap.set(menuId, current + 1);
      return newMap;
    });
  }, []);

  // 낱개 제거
  const handleRemoveSingleItem = useCallback((menuId: string) => {
    setSingleItems((prev) => {
      const newMap = new Map(prev);
      const current = newMap.get(menuId) || 0;
      if (current <= 1) {
        newMap.delete(menuId);
      } else {
        newMap.set(menuId, current - 1);
      }
      return newMap;
    });
  }, []);

  // 장바구니에서 식단 제거
  const handleRemoveMealPlan = useCallback((planId: MealPlanType) => {
    setSelectedMealPlans((prev) => prev.filter((p) => p !== planId));
  }, []);

  // 장바구니에서 낱개 전체 제거
  const handleRemoveSingleItemFromCart = useCallback((menuId: string) => {
    setSingleItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(menuId);
      return newMap;
    });
  }, []);

  // 주문하기
  const handleCheckout = useCallback(() => {
    const mealPlanCount = selectedMealPlans.length;
    const singleItemCount = Array.from(singleItems.values()).reduce((sum, qty) => sum + qty, 0);
    alert(
      `주문 내역:\n- 추천 식단: ${mealPlanCount}개\n- 낱개: ${singleItemCount}개\n\n결제 페이지로 이동합니다.`
    );
  }, [selectedMealPlans, singleItems]);

  // 장바구니에 아이템이 있는지 확인 (하단 패딩용)
  const hasCartItems =
    selectedMealPlans.length > 0 ||
    Array.from(singleItems.values()).some((qty) => qty > 0);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        paddingBottom: hasCartItems ? '80px' : '0',
      }}
    >
      {/* 2-Column Layout */}
      <div
        style={{
          display: 'flex',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* LEFT SIDEBAR: 제외 필터 (Sticky) */}
        <SidebarFilter
          excluded={excludedCategories}
          onExcludedChange={setExcludedCategories}
        />

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* SECTION 1: 추천 식단 선택 */}
          <div style={{ padding: '0 24px' }}>
            <MealPlanSelector
              selectedPlans={selectedMealPlans}
              onPlanToggle={handlePlanToggle}
              onClearAll={handleClearAllPlans}
              excludedCategories={excludedCategories}
              excludedMenusFromPlan={excludedMenusFromPlan}
              onExcludeMenuFromPlan={handleExcludeMenuFromPlan}
            />
          </div>

          {/* SECTION 2: 전체 메뉴 */}
          <MenuGrid
            excludedCategories={excludedCategories}
            selectedMealPlans={selectedMealPlans}
            singleItems={singleItems}
            onAddSingleItem={handleAddSingleItem}
            onRemoveSingleItem={handleRemoveSingleItem}
          />
        </main>
      </div>

      {/* SECTION 3: 하단 장바구니 바 */}
      <CartBar
        selectedMealPlans={selectedMealPlans}
        excludedMenusFromPlan={excludedMenusFromPlan}
        singleItems={singleItems}
        onRemoveMealPlan={handleRemoveMealPlan}
        onRemoveSingleItem={handleRemoveSingleItemFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default SubscriptionPage;
