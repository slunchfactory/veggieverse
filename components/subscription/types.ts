// 제외 필터 카테고리
export type ExclusionCategory =
  | 'dairy'      // 유제품
  | 'shellfish'  // 갑각류
  | 'nuts'       // 견과류
  | 'gluten'     // 글루텐
  | 'pork'       // 돼지고기
  | 'fish'       // 생선
  | 'spicy';     // 매운맛

export interface ExclusionOption {
  id: ExclusionCategory;
  label: string;
  ingredients: string[];
}

export const EXCLUSION_OPTIONS: ExclusionOption[] = [
  { id: 'dairy', label: '유제품', ingredients: ['치즈', '우유', '크림', '버터', '요거트'] },
  { id: 'shellfish', label: '갑각류', ingredients: ['새우', '랍스터', '게', '관자'] },
  { id: 'nuts', label: '견과류', ingredients: ['땅콩', '아몬드', '호두', '캐슈넛'] },
  { id: 'gluten', label: '글루텐', ingredients: ['밀가루', '빵', '파스타', '우동'] },
  { id: 'pork', label: '돼지고기', ingredients: ['베이컨', '햄', '삼겹살'] },
  { id: 'fish', label: '생선', ingredients: ['연어', '참치', '고등어', '도미'] },
  { id: 'spicy', label: '매운맛', ingredients: ['고추장', '청양고추', '스리라차'] },
];

// 식단 타입
export type MealPlanType = 'recovery' | 'glow' | 'clean' | 'light' | 'balance';

export interface MealPlanInfo {
  id: MealPlanType;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  menus: MenuItem[];
  pricePerMeal: number;
  mealsCount: number; // 5끼
}

export const MEAL_PLAN_INFOS: Omit<MealPlanInfo, 'menus'>[] = [
  {
    id: 'recovery',
    name: '리커버리',
    nameEn: 'RECOVERY',
    tagline: '피로회복·재충전',
    description: '고단백·저탄수화물 식단으로 구성되어 있어요. 운동 후 회복이나 체력 보충이 필요할 때 추천해요.',
    pricePerMeal: 6500,
    mealsCount: 5,
  },
  {
    id: 'glow',
    name: '글로우',
    nameEn: 'GLOW',
    tagline: '피부 광채·탄력',
    description: '콜라겐과 항산화 성분이 풍부한 재료로 구성했어요. 피부 관리가 필요할 때 추천해요.',
    pricePerMeal: 6500,
    mealsCount: 5,
  },
  {
    id: 'clean',
    name: '클린',
    nameEn: 'CLEAN',
    tagline: '저염·무가공',
    description: '자연 그대로의 재료만 사용한 깨끗한 식단이에요. 디톡스나 장 건강이 필요할 때 추천해요.',
    pricePerMeal: 6000,
    mealsCount: 5,
  },
  {
    id: 'light',
    name: '라이트',
    nameEn: 'LIGHT',
    tagline: '400kcal 이하',
    description: '가볍지만 포만감 있는 구성으로 칼로리를 관리해요. 체중 관리가 필요할 때 추천해요.',
    pricePerMeal: 5500,
    mealsCount: 5,
  },
  {
    id: 'balance',
    name: '밸런스',
    nameEn: 'BALANCE',
    tagline: '영양 균형',
    description: '탄수화물, 단백질, 지방이 균형 잡힌 정식 스타일이에요. 매일 건강하게 먹고 싶을 때 추천해요.',
    pricePerMeal: 6000,
    mealsCount: 5,
  },
];

// 식이 유형 필터
export type DietType = 'all' | 'vegan' | 'pescatarian' | 'pollo';

// 메뉴 아이템
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  dietType: DietType[];
  excludeTags: ExclusionCategory[]; // 이 메뉴에 포함된 제외 카테고리
  calories?: number;
  description?: string;
}

// 샘플 메뉴 데이터
export const SAMPLE_MENUS: MenuItem[] = [
  // 리커버리 메뉴
  { id: 'm1', name: '연어 콩피', price: 6500, dietType: ['pescatarian'], excludeTags: ['fish'] },
  { id: 'm2', name: '치킨 콩피', price: 6500, dietType: ['pollo'], excludeTags: [] },
  { id: 'm3', name: '닭곰탕', price: 6000, dietType: ['pollo'], excludeTags: [] },
  { id: 'm4', name: '도미 구이', price: 6500, dietType: ['pescatarian'], excludeTags: ['fish'] },
  { id: 'm5', name: '오리 스테이크', price: 7000, dietType: ['all'], excludeTags: [] },

  // 글로우 메뉴
  { id: 'm6', name: '관자 소테', price: 7000, dietType: ['pescatarian'], excludeTags: ['shellfish'] },
  { id: 'm7', name: '아보카도 덮밥', price: 5500, dietType: ['vegan', 'pescatarian', 'pollo'], excludeTags: [] },
  { id: 'm8', name: '연어회 샐러드', price: 6500, dietType: ['pescatarian'], excludeTags: ['fish'] },
  { id: 'm9', name: '베리 스무디볼', price: 5000, dietType: ['vegan'], excludeTags: ['dairy'] },
  { id: 'm10', name: '콜라겐 수프', price: 6000, dietType: ['all'], excludeTags: [] },

  // 클린 메뉴
  { id: 'm11', name: '퀴노아 필라프', price: 5500, dietType: ['vegan'], excludeTags: [] },
  { id: 'm12', name: '그릴 채소 플레이트', price: 5000, dietType: ['vegan'], excludeTags: [] },
  { id: 'm13', name: '두부 스테이크', price: 5500, dietType: ['vegan'], excludeTags: [] },
  { id: 'm14', name: '렌틸 수프', price: 5000, dietType: ['vegan'], excludeTags: [] },
  { id: 'm15', name: '통곡물 리조또', price: 6000, dietType: ['vegan'], excludeTags: ['gluten'] },

  // 라이트 메뉴
  { id: 'm16', name: '그린 샐러드 볼', price: 5000, dietType: ['vegan'], excludeTags: [], calories: 320 },
  { id: 'm17', name: '미소 수프', price: 4500, dietType: ['vegan', 'pescatarian'], excludeTags: [], calories: 180 },
  { id: 'm18', name: '포케 볼', price: 6000, dietType: ['pescatarian'], excludeTags: ['fish'], calories: 380 },
  { id: 'm19', name: '치킨 샐러드', price: 5500, dietType: ['pollo'], excludeTags: [], calories: 350 },
  { id: 'm20', name: '채소 쌈밥', price: 5000, dietType: ['vegan'], excludeTags: [], calories: 300 },

  // 밸런스 메뉴
  { id: 'm21', name: '한식 정식', price: 6500, dietType: ['all'], excludeTags: [] },
  { id: 'm22', name: '지중해 플레이트', price: 6500, dietType: ['pescatarian', 'pollo'], excludeTags: [] },
  { id: 'm23', name: '일식 도시락', price: 6000, dietType: ['pescatarian'], excludeTags: ['fish'] },
  { id: 'm24', name: '비빔밥', price: 5500, dietType: ['all'], excludeTags: [] },
  { id: 'm25', name: '덮밥 세트', price: 6000, dietType: ['all'], excludeTags: [] },

  // 추가 메뉴
  { id: 'm26', name: '트러플 리조또', price: 7000, dietType: ['all'], excludeTags: ['dairy', 'gluten'] },
  { id: 'm27', name: '바오 버거', price: 5500, dietType: ['all'], excludeTags: ['pork', 'gluten'] },
  { id: 'm28', name: '치킨 마요 덮밥', price: 5500, dietType: ['pollo'], excludeTags: [] },
  { id: 'm29', name: '새우 볶음밥', price: 6000, dietType: ['pescatarian'], excludeTags: ['shellfish'] },
  { id: 'm30', name: '베이컨 파스타', price: 6000, dietType: ['all'], excludeTags: ['pork', 'gluten', 'dairy'] },
];

// 식단별 메뉴 매핑
export const MEAL_PLAN_MENUS: Record<MealPlanType, string[]> = {
  recovery: ['m1', 'm2', 'm3', 'm4', 'm5'],
  glow: ['m6', 'm7', 'm8', 'm9', 'm10'],
  clean: ['m11', 'm12', 'm13', 'm14', 'm15'],
  light: ['m16', 'm17', 'm18', 'm19', 'm20'],
  balance: ['m21', 'm22', 'm23', 'm24', 'm25'],
};

// 장바구니 아이템
export interface CartItem {
  type: 'mealPlan' | 'single';
  id: string; // mealPlan type인 경우 MealPlanType, single인 경우 MenuItem id
  quantity: number;
  excludedMenus?: string[]; // 식단에서 제외한 메뉴 ID
}

// 할인 계산
export const MEAL_PLAN_DISCOUNTS: { count: number; rate: number }[] = [
  { count: 5, rate: 0.18 },
  { count: 4, rate: 0.15 },
  { count: 3, rate: 0.12 },
  { count: 2, rate: 0.10 },
  { count: 1, rate: 0.05 },
];

export const SINGLE_ITEM_DISCOUNTS: { count: number; rate: number }[] = [
  { count: 10, rate: 0.10 },
  { count: 7, rate: 0.05 },
];

export const getDiscountRate = (mealPlanCount: number, singleItemCount: number): number => {
  // 식단이 있으면 식단 기준 할인
  if (mealPlanCount > 0) {
    const tier = MEAL_PLAN_DISCOUNTS.find(d => mealPlanCount >= d.count);
    return tier?.rate || 0;
  }

  // 낱개만 있으면 낱개 기준 할인
  const tier = SINGLE_ITEM_DISCOUNTS.find(d => singleItemCount >= d.count);
  return tier?.rate || 0;
};

export const getNextDiscountInfo = (mealPlanCount: number, singleItemCount: number): { needed: number; rate: number } | null => {
  if (mealPlanCount > 0) {
    const nextTier = MEAL_PLAN_DISCOUNTS.slice().reverse().find(d => d.count > mealPlanCount);
    if (nextTier) {
      return { needed: nextTier.count - mealPlanCount, rate: nextTier.rate };
    }
  } else if (singleItemCount > 0) {
    const nextTier = SINGLE_ITEM_DISCOUNTS.slice().reverse().find(d => d.count > singleItemCount);
    if (nextTier) {
      return { needed: nextTier.count - singleItemCount, rate: nextTier.rate };
    }
  }
  return null;
};
