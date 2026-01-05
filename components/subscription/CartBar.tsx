import React, { useState, useMemo } from 'react';
import { Package, ChevronUp, ChevronDown, X, Gift } from 'lucide-react';
import {
  MealPlanType,
  MEAL_PLAN_INFOS,
  SAMPLE_MENUS,
  getDiscountRate,
  getNextDiscountInfo,
} from './types';

interface CartBarProps {
  selectedMealPlans: MealPlanType[];
  excludedMenusFromPlan: Record<MealPlanType, string[]>;
  singleItems: Map<string, number>;
  onRemoveMealPlan: (planId: MealPlanType) => void;
  onRemoveSingleItem: (menuId: string) => void;
  onCheckout: () => void;
}

export const CartBar: React.FC<CartBarProps> = ({
  selectedMealPlans,
  excludedMenusFromPlan,
  singleItems,
  onRemoveMealPlan,
  onRemoveSingleItem,
  onCheckout,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cartData = useMemo(() => {
    // 식단 가격 계산
    let mealPlanTotal = 0;
    let mealPlanMealsCount = 0;
    selectedMealPlans.forEach((planId) => {
      const plan = MEAL_PLAN_INFOS.find((p) => p.id === planId);
      if (plan) {
        const excludedCount = (excludedMenusFromPlan[planId] || []).length;
        const mealsCount = plan.mealsCount - excludedCount;
        mealPlanTotal += plan.pricePerMeal * mealsCount;
        mealPlanMealsCount += mealsCount;
      }
    });

    // 낱개 가격 계산
    let singleItemTotal = 0;
    let singleItemCount = 0;
    singleItems.forEach((quantity, menuId) => {
      const menu = SAMPLE_MENUS.find((m) => m.id === menuId);
      if (menu) {
        singleItemTotal += menu.price * quantity;
        singleItemCount += quantity;
      }
    });

    const originalTotal = mealPlanTotal + singleItemTotal;
    const discountRate = getDiscountRate(selectedMealPlans.length, singleItemCount);
    const discountAmount = Math.round(originalTotal * discountRate);
    const finalTotal = originalTotal - discountAmount;
    const nextDiscount = getNextDiscountInfo(selectedMealPlans.length, singleItemCount);

    return {
      mealPlanCount: selectedMealPlans.length,
      mealPlanMealsCount,
      singleItemCount,
      originalTotal,
      discountRate,
      discountAmount,
      finalTotal,
      nextDiscount,
      hasItems: selectedMealPlans.length > 0 || singleItemCount > 0,
    };
  }, [selectedMealPlans, excludedMenusFromPlan, singleItems]);

  if (!cartData.hasItems) {
    return null;
  }

  const getSummaryText = () => {
    const parts = [];
    if (cartData.mealPlanCount > 0) {
      parts.push(`식단 ${cartData.mealPlanCount}개 (${cartData.mealPlanMealsCount}끼)`);
    }
    if (cartData.singleItemCount > 0) {
      parts.push(`낱개 ${cartData.singleItemCount}개`);
    }
    return parts.join(' + ');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #000',
        zIndex: 100,
        maxHeight: isExpanded ? '70vh' : 'auto',
        transition: 'max-height 0.3s',
        overflow: isExpanded ? 'auto' : 'visible',
      }}
    >
      {/* Collapsed Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Package size={20} />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>
              {getSummaryText()}
            </p>
            {cartData.discountRate > 0 && (
              <p style={{ fontSize: '12px', color: '#e57373' }}>
                {Math.round(cartData.discountRate * 100)}% 할인 적용
              </p>
            )}
          </div>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            {cartData.discountRate > 0 && (
              <p
                style={{
                  fontSize: '12px',
                  color: '#999',
                  textDecoration: 'line-through',
                }}
              >
                {cartData.originalTotal.toLocaleString()}원
              </p>
            )}
            <p style={{ fontSize: '16px', fontWeight: 500 }}>
              {cartData.finalTotal.toLocaleString()}원
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCheckout();
            }}
            style={{
              padding: '12px 24px',
              background: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      {/* Expanded Detail */}
      {isExpanded && (
        <div style={{ padding: '0 24px 24px', borderTop: '1px solid #eee' }}>
          {/* 추천 식단 목록 */}
          {selectedMealPlans.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                — 추천 식단 —
              </p>
              {selectedMealPlans.map((planId) => {
                const plan = MEAL_PLAN_INFOS.find((p) => p.id === planId);
                if (!plan) return null;
                const excludedCount = (excludedMenusFromPlan[planId] || []).length;
                const mealsCount = plan.mealsCount - excludedCount;
                const price = plan.pricePerMeal * mealsCount;

                return (
                  <div
                    key={planId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '14px' }}>
                        ✓ {plan.name} ({mealsCount}끼)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px' }}>
                        {price.toLocaleString()}원
                      </span>
                      <button
                        onClick={() => onRemoveMealPlan(planId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <X size={16} color="#888" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 낱개 목록 */}
          {cartData.singleItemCount > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                — 낱개 —
              </p>
              {Array.from(singleItems.entries()).map(([menuId, quantity]) => {
                const menu = SAMPLE_MENUS.find((m) => m.id === menuId);
                if (!menu || quantity === 0) return null;
                const price = menu.price * quantity;

                return (
                  <div
                    key={menuId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '14px' }}>
                        + {menu.name} x {quantity}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px' }}>
                        {price.toLocaleString()}원
                      </span>
                      <button
                        onClick={() => onRemoveSingleItem(menuId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <X size={16} color="#888" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 가격 요약 */}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #000' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#666' }}>소계</span>
              <span style={{ fontSize: '14px' }}>
                {cartData.originalTotal.toLocaleString()}원
              </span>
            </div>

            {cartData.discountRate > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontSize: '14px', color: '#e57373' }}>
                  할인 ({Math.round(cartData.discountRate * 100)}%)
                </span>
                <span style={{ fontSize: '14px', color: '#e57373' }}>
                  -{cartData.discountAmount.toLocaleString()}원
                </span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #eee',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 500 }}>결제 금액</span>
              <span style={{ fontSize: '16px', fontWeight: 500 }}>
                {cartData.finalTotal.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* 다음 할인 넛지 */}
          {cartData.nextDiscount && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                background: '#fff8e1',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Gift size={16} color="#ff9800" />
              <span style={{ fontSize: '13px', color: '#e65100' }}>
                {cartData.nextDiscount.needed}개 더 담으면{' '}
                {Math.round(cartData.nextDiscount.rate * 100)}% 할인!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartBar;
