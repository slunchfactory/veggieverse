import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import {
  MealPlanType,
  MEAL_PLAN_INFOS,
  ExclusionCategory,
  EXCLUSION_OPTIONS,
  SAMPLE_MENUS,
  MEAL_PLAN_MENUS,
} from './types';

const DAYS_OF_WEEK = [
  { id: 'mon', label: '월' },
  { id: 'tue', label: '화' },
  { id: 'wed', label: '수' },
  { id: 'thu', label: '목' },
  { id: 'fri', label: '금' },
  { id: 'sat', label: '토' },
  { id: 'sun', label: '일' },
] as const;

// 라인별 컬러
const LINE_COLORS: Record<MealPlanType, { main: string; bg: string; light: string }> = {
  recovery: { main: '#2563EB', bg: '#EFF6FF', light: '#DBEAFE' },
  glow: { main: '#DB2777', bg: '#FDF2F8', light: '#FCE7F3' },
  clean: { main: '#059669', bg: '#ECFDF5', light: '#D1FAE5' },
  light: { main: '#F59E0B', bg: '#FFFBEB', light: '#FEF3C7' },
  balance: { main: '#7C3AED', bg: '#F5F3FF', light: '#EDE9FE' },
};

interface WeeklyMealBuilderProps {
  selectedSlots: (string | null)[];
  onSelectSlot: (dayIndex: number, menuId: string | null) => void;
  excludedCategories: ExclusionCategory[];
  onExcludedChange: (categories: ExclusionCategory[]) => void;
}

export const WeeklyMealBuilder: React.FC<WeeklyMealBuilderProps> = ({
  selectedSlots,
  onSelectSlot,
  excludedCategories,
  onExcludedChange,
}) => {
  const [selectedLine, setSelectedLine] = useState<MealPlanType>('balance');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [showExcludePanel, setShowExcludePanel] = useState(false);

  const currentLineInfo = MEAL_PLAN_INFOS.find((p) => p.id === selectedLine)!;
  const colors = LINE_COLORS[selectedLine];

  // 현재 라인에서 사용 가능한 메뉴 (제외 재료 필터링)
  const availableMenus = useMemo(() => {
    const lineMenuIds = MEAL_PLAN_MENUS[selectedLine];
    return SAMPLE_MENUS.filter((menu) => {
      const inLine = lineMenuIds.includes(menu.id);
      const notExcluded = !menu.excludeTags.some((tag) => excludedCategories.includes(tag));
      return inLine && notExcluded;
    });
  }, [selectedLine, excludedCategories]);

  // 전체 메뉴에서 제외 재료 필터링된 것
  const allAvailableMenus = useMemo(() => {
    return SAMPLE_MENUS.filter(
      (menu) => !menu.excludeTags.some((tag) => excludedCategories.includes(tag))
    );
  }, [excludedCategories]);

  const toggleExclusion = (category: ExclusionCategory) => {
    if (excludedCategories.includes(category)) {
      onExcludedChange(excludedCategories.filter((c) => c !== category));
    } else {
      onExcludedChange([...excludedCategories, category]);
    }
  };

  const getMenuById = (id: string | null) => {
    if (!id) return null;
    return SAMPLE_MENUS.find((m) => m.id === id);
  };

  const handleSlotClick = (index: number) => {
    setActiveSlot(activeSlot === index ? null : index);
  };

  const handleMenuSelect = (menuId: string) => {
    if (activeSlot !== null) {
      onSelectSlot(activeSlot, menuId);
      setActiveSlot(null);
    }
  };

  const filledCount = selectedSlots.filter((s) => s !== null).length;
  const totalPrice = selectedSlots.reduce((sum, id) => {
    const menu = getMenuById(id);
    return sum + (menu?.price || 0);
  }, 0);

  return (
    <div
      style={{
        border: '2px solid var(--palette-text)',
        marginBottom: '40px',
        background: colors.bg,
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 24px 16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
          나의 1주일 식단 구성하기
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--warm-gray)' }}>
          라인을 선택하고, 원하는 도시락을 요일별로 배치해보세요
        </p>
      </div>

      {/* Line Selection Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          padding: '0 24px 16px',
          flexWrap: 'wrap',
        }}
      >
        {MEAL_PLAN_INFOS.map((plan) => {
          const lineColor = LINE_COLORS[plan.id];
          const isSelected = selectedLine === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedLine(plan.id)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 500,
                border: `2px solid ${lineColor.main}`,
                background: isSelected ? lineColor.main : '#fff',
                color: isSelected ? '#fff' : lineColor.main,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {plan.nameEn}
            </button>
          );
        })}
      </div>

      {/* Current Line Info */}
      <div
        style={{
          textAlign: 'center',
          padding: '16px 24px',
          borderTop: '1px solid rgba(26, 10, 5, 0.1)',
          borderBottom: '1px solid rgba(26, 10, 5, 0.1)',
        }}
      >
        <p style={{ fontSize: '18px', fontWeight: 500, color: colors.main, marginBottom: '4px' }}>
          {currentLineInfo.name}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--warm-gray)' }}>{currentLineInfo.tagline}</p>
      </div>

      {/* Exclude Ingredients Panel */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(26, 10, 5, 0.1)' }}>
        <button
          onClick={() => setShowExcludePanel(!showExcludePanel)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'var(--warm-gray)',
          }}
        >
          제외할 재료 선택
          {excludedCategories.length > 0 && (
            <span
              style={{
                background: '#ef4444',
                color: '#fff',
                borderRadius: '10px',
                padding: '2px 8px',
                fontSize: '12px',
              }}
            >
              {excludedCategories.length}
            </span>
          )}
          {showExcludePanel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showExcludePanel && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginTop: '12px',
            }}
          >
            {EXCLUSION_OPTIONS.map((option) => {
              const isExcluded = excludedCategories.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleExclusion(option.id)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '13px',
                    borderRadius: '20px',
                    border: isExcluded ? '2px solid #ef4444' : '1px solid var(--border-divider)',
                    background: isExcluded ? '#fef2f2' : '#fff',
                    color: isExcluded ? '#ef4444' : 'var(--warm-gray)',
                    cursor: 'pointer',
                  }}
                >
                  {option.label}
                  {isExcluded && ' ✕'}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Weekly Slots */}
      <div style={{ padding: '20px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
          }}
        >
          {DAYS_OF_WEEK.map((day, index) => {
            const menu = getMenuById(selectedSlots[index]);
            const isActive = activeSlot === index;

            return (
              <div
                key={day.id}
                onClick={() => handleSlotClick(index)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* Day Label */}
                <div
                  style={{
                    textAlign: 'center',
                    padding: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: colors.main,
                    color: '#fff',
                  }}
                >
                  {day.label}
                </div>

                {/* Slot */}
                <div
                  style={{
                    aspectRatio: '1',
                    background: '#fff',
                    border: isActive ? `3px solid ${colors.main}` : '2px dashed var(--border-color-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    transition: 'all 0.2s',
                  }}
                >
                  {menu ? (
                    <>
                      <div
                        style={{
                          width: '100%',
                          height: '50%',
                          background: colors.light,
                          marginBottom: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}
                      >
                        🍱
                      </div>
                      <p
                        style={{
                          fontSize: '11px',
                          textAlign: 'center',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {menu.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '24px', color: 'var(--border-color-light)' }}>+</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>추가</span>
                    </>
                  )}
                </div>

                {/* Remove button */}
                {menu && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSlot(index, null);
                    }}
                    style={{
                      position: 'absolute',
                      top: '32px',
                      right: '-4px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu Selection Panel (when slot is active) */}
      {activeSlot !== null && (
        <div
          style={{
            borderTop: '1px solid rgba(26, 10, 5, 0.1)',
            padding: '20px 24px',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--warm-gray)', marginBottom: '12px', textAlign: 'center' }}>
            <strong>{DAYS_OF_WEEK[activeSlot].label}요일</strong>에 배치할 도시락을 선택하세요
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {allAvailableMenus.map((menu) => (
              <div
                key={menu.id}
                onClick={() => handleMenuSelect(menu.id)}
                style={{
                  padding: '10px',
                  background: '#fff',
                  border:
                    selectedSlots[activeSlot] === menu.id ? `2px solid ${colors.main}` : '1px solid var(--border-hairline)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    aspectRatio: '1',
                    background: 'var(--palette-bg-2)',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}
                >
                  🍱
                </div>
                <p style={{ fontSize: '11px', lineHeight: 1.2, marginBottom: '4px' }}>{menu.name}</p>
                <p style={{ fontSize: '11px', color: 'var(--warm-gray)' }}>{menu.price.toLocaleString()}원</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div
        style={{
          borderTop: '1px solid rgba(26, 10, 5, 0.1)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '14px', color: 'var(--warm-gray)' }}>선택한 도시락</span>
          <span style={{ fontSize: '18px', fontWeight: 600, marginLeft: '8px', color: colors.main }}>
            {filledCount}/7개
          </span>
        </div>
        <div>
          <span style={{ fontSize: '14px', color: 'var(--warm-gray)' }}>예상 금액</span>
          <span style={{ fontSize: '20px', fontWeight: 600, marginLeft: '8px' }}>
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMealBuilder;
