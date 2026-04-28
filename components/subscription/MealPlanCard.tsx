import React, { useMemo } from 'react';
import { Check, Plus } from 'lucide-react';
import {
  MealPlanType,
  MEAL_PLAN_INFOS,
  MEAL_PLAN_MENUS,
  SAMPLE_MENUS,
  ExclusionCategory,
  MenuItem,
} from './types';

interface MealPlanCardProps {
  planId: MealPlanType;
  isSelected: boolean;
  onToggle: () => void;
  excludedCategories: ExclusionCategory[];
  excludedMenus: string[];
  onExcludeMenu: (menuId: string) => void;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({
  planId,
  isSelected,
  onToggle,
  excludedCategories,
  excludedMenus,
  onExcludeMenu,
}) => {
  const planInfo = MEAL_PLAN_INFOS.find((p) => p.id === planId);

  // 해당 식단의 메뉴 목록
  const planMenus = useMemo(() => {
    const menuIds = MEAL_PLAN_MENUS[planId] || [];
    return menuIds
      .map((id) => SAMPLE_MENUS.find((m) => m.id === id))
      .filter((m): m is MenuItem => m !== undefined);
  }, [planId]);

  // 제외 카테고리에 해당하는 메뉴 필터링
  const availableMenus = useMemo(() => {
    return planMenus.filter(
      (menu) => !menu.excludeTags.some((tag) => excludedCategories.includes(tag))
    );
  }, [planMenus, excludedCategories]);

  // 실제 포함될 메뉴 개수 (제외된 메뉴 빼고)
  const activeMenuCount = availableMenus.filter(
    (menu) => !excludedMenus.includes(menu.id)
  ).length;

  // 총 가격 계산
  const totalPrice = planInfo ? planInfo.pricePerMeal * activeMenuCount : 0;

  if (!planInfo) return null;

  return (
    <div
      style={{
        background: '#fff',
        border: isSelected ? '2px solid var(--palette-text)' : '1px solid var(--border-divider)',
        marginBottom: '24px',
        overflow: 'hidden',
      }}
    >
      {/* 대형 이미지 영역 (16:9) */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, var(--palette-bg-2) 0%, #e8e8e8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
          {planInfo.nameEn} MEAL PLAN IMAGE
        </span>

        {/* 선택됨 표시 */}
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'var(--palette-text)',
              color: '#fff',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Check size={16} />
            선택됨
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div style={{ padding: '24px' }}>
        {/* 헤더: 이름 + 선택 버튼 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              {planInfo.name}
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--gray-light)',
                letterSpacing: '1px',
              }}
            >
              {planInfo.nameEn}
            </p>
          </div>

          <button
            onClick={onToggle}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 500,
              border: isSelected ? '2px solid var(--palette-text)' : '2px solid var(--palette-text)',
              background: isSelected ? '#fff' : 'var(--palette-text)',
              color: isSelected ? 'var(--palette-text)' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            {isSelected ? (
              <>
                <Check size={16} />
                선택됨
              </>
            ) : (
              <>
                <Plus size={16} />
                선택하기
              </>
            )}
          </button>
        </div>

        {/* 태그라인 */}
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: 'var(--palette-bg-2)',
            fontSize: '13px',
            fontWeight: 500,
            marginBottom: '12px',
          }}
        >
          {planInfo.tagline}
        </div>

        {/* 설명 */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: 'var(--charcoal)',
            marginBottom: '24px',
          }}
        >
          {planInfo.description}
        </p>

        {/* 구분선 */}
        <div
          style={{
            height: '1px',
            background: 'var(--border-hairline)',
            margin: '0 0 20px 0',
          }}
        />

        {/* 이번 주 구성 */}
        <div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--warm-gray)',
              marginBottom: '16px',
            }}
          >
            이번 주 구성 ({planInfo.mealsCount}끼)
          </h4>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {planMenus.map((menu) => {
              const isExcludedByCategory = menu.excludeTags.some((tag) =>
                excludedCategories.includes(tag)
              );
              const isExcludedManually = excludedMenus.includes(menu.id);
              const isExcluded = isExcludedByCategory || isExcludedManually;

              return (
                <div
                  key={menu.id}
                  onClick={() => {
                    if (!isExcludedByCategory && isSelected) {
                      onExcludeMenu(menu.id);
                    }
                  }}
                  style={{
                    flexShrink: 0,
                    width: '100px',
                    opacity: isExcluded ? 0.4 : 1,
                    cursor: isExcludedByCategory ? 'not-allowed' : isSelected ? 'pointer' : 'default',
                    position: 'relative',
                  }}
                >
                  {/* 메뉴 이미지 */}
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'var(--border-hairline)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: 'var(--muted)',
                      marginBottom: '8px',
                      position: 'relative',
                    }}
                  >
                    IMG
                    {/* 제외됨 표시 */}
                    {isExcluded && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(255,255,255,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#e53935',
                        }}
                      >
                        {isExcludedByCategory ? '필터 제외' : '제외됨'}
                      </div>
                    )}
                  </div>

                  {/* 메뉴 이름 */}
                  <p
                    style={{
                      fontSize: '12px',
                      textAlign: 'center',
                      color: isExcluded ? 'var(--muted)' : 'var(--charcoal)',
                      textDecoration: isExcluded ? 'line-through' : 'none',
                    }}
                  >
                    {menu.name}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 선택된 경우 안내 메시지 */}
          {isSelected && (
            <p
              style={{
                fontSize: '12px',
                color: 'var(--gray-light)',
                marginTop: '12px',
              }}
            >
              * 메뉴를 클릭하면 개별 제외할 수 있어요
            </p>
          )}
        </div>

        {/* 구분선 */}
        <div
          style={{
            height: '1px',
            background: 'var(--border-hairline)',
            margin: '20px 0',
          }}
        />

        {/* 가격 정보 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '14px',
                color: 'var(--warm-gray)',
              }}
            >
              {activeMenuCount}끼 /{' '}
            </span>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {totalPrice.toLocaleString()}원
            </span>
          </div>

          <span
            style={{
              fontSize: '13px',
              color: 'var(--gray-light)',
            }}
          >
            끼당 {planInfo.pricePerMeal.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
