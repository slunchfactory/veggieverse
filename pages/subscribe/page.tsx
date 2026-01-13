import React, { useState, useMemo } from 'react';

type DurationType = 1 | 2;
type ExcludeCategory = 'dairy' | 'shellfish' | 'fish' | 'nuts' | 'chicken' | 'egg' | 'gluten' | 'spicy';
type MenuCategory = 'glow' | 'recovery' | 'clean' | 'light' | 'balance';

interface MenuData {
  id: string;
  name: string;
  category: MenuCategory;
  cost: number;
  price: number;
  image: string;
  description: string;
  excludable: ExcludeCategory[];
}

interface DisplayMenuData extends MenuData {
  displayName: string;
  isVariation: boolean;
  originalName?: string;
  badge?: string;
}

// 제외 재료 카테고리 (8개)
const EXCLUDE_CATEGORIES: Record<ExcludeCategory, { label: string; keywords: string[] }> = {
  dairy: { label: '유제품', keywords: ['치즈', '크림', '버터', '우유', '파르미지아노'] },
  shellfish: { label: '갑각류', keywords: ['새우', '관자', '랍스터', '해물'] },
  fish: { label: '생선', keywords: ['연어', '참치', '도미', '고등어'] },
  nuts: { label: '견과류', keywords: ['땅콩', '아몬드', '호두', '캐슈넛'] },
  chicken: { label: '닭고기', keywords: ['닭', '치킨', '닭가슴살'] },
  egg: { label: '계란', keywords: ['달걀', '계란', '오야코'] },
  gluten: { label: '글루텐', keywords: ['파스타', '우동', '뇨끼', '또띠아'] },
  spicy: { label: '매운맛', keywords: ['고추장', '청양고추', '스리라차'] },
};

// Diet options removed - now using PLAN_TYPES category system

// 식단 유형 인덱스 데이터
const PLAN_TYPES = [
  {
    id: 'glow',
    name: '글로우',
    subtitle: 'GLOW',
    description: '피부 건강과 안티에이징에 집중한 식단. 항산화 성분이 풍부한 채소와 과일, 오메가-3가 풍부한 식재료로 구성됩니다.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    color: '#FFE4E1',
    filterTags: ['저칼로리', '비건'],
  },
  {
    id: 'wellness',
    name: '웰니스',
    subtitle: 'WELLNESS',
    description: '전반적인 건강 증진을 위한 균형 잡힌 식단. 면역력 강화와 에너지 부스팅에 초점을 맞춥니다.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    color: '#E8F5E9',
    filterTags: ['고단백', '비건'],
  },
  {
    id: 'balance',
    name: '밸런스',
    subtitle: 'BALANCE',
    description: '탄수화물, 단백질, 지방의 완벽한 균형. 바쁜 일상 속에서도 건강한 식습관을 유지할 수 있습니다.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    color: '#FFF8E1',
    filterTags: ['비건'],
  },
  {
    id: 'light',
    name: '라이트',
    subtitle: 'LIGHT',
    description: '칼로리 컨트롤에 최적화된 저칼로리 식단. 포만감은 유지하면서 체중 관리를 도와줍니다.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
    color: '#E3F2FD',
    filterTags: ['저칼로리'],
  },
  {
    id: 'clean',
    name: '클린',
    subtitle: 'CLEAN',
    description: '가공식품 없이 자연 그대로의 식재료만 사용. 디톡스와 클린 이팅을 추구하는 분들께 추천합니다.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop',
    color: '#F3E5F5',
    filterTags: ['비건', '저칼로리'],
  },
];

// 30개 메뉴 데이터
const MENUS: Record<string, MenuData> = {
  // 글로우 (6개) - 피부 광채·탄력
  'G01': { id: 'G01', name: '노르웨이 연어 콩피', category: 'glow', cost: 6500, price: 9500, image: '/veggieverse/images/menus/example.png', description: '저온에서 천천히 익힌 프리미엄 연어', excludable: ['fish'] },
  'G02': { id: 'G02', name: '홋카이도 관자 버터 소테', category: 'glow', cost: 8500, price: 12000, image: '/veggieverse/images/menus/example2.png', description: '버터에 구운 홋카이도산 관자', excludable: ['shellfish', 'dairy'] },
  'G03': { id: 'G03', name: '연어 아보카도 덮밥', category: 'glow', cost: 4500, price: 8900, image: '/veggieverse/images/menus/example3.png', description: '신선한 연어와 아보카도의 조합', excludable: ['fish'] },
  'G04': { id: 'G04', name: '아보카도 타르타르', category: 'glow', cost: 4000, price: 7900, image: '/veggieverse/images/menus/example4.png', description: '크리미한 아보카도 타르타르', excludable: [] },
  'G05': { id: 'G05', name: '로스티드 비트 카르파초', category: 'glow', cost: 3800, price: 7500, image: '/veggieverse/images/menus/example5.png', description: '구운 비트의 선명한 맛', excludable: [] },
  'G06': { id: 'G06', name: '미소 글레이즈드 연어', category: 'glow', cost: 6000, price: 9900, image: '/veggieverse/images/menus/example6.png', description: '미소 소스로 글레이즈한 연어', excludable: ['fish'] },

  // 리커버리 (6개) - 피로회복·재충전
  'R01': { id: 'R01', name: '치킨 콩피', category: 'recovery', cost: 5500, price: 9500, image: '/veggieverse/images/menus/example.png', description: '저온에서 천천히 익힌 닭다리살', excludable: ['chicken'] },
  'R02': { id: 'R02', name: '치킨 마르살라', category: 'recovery', cost: 5200, price: 9200, image: '/veggieverse/images/menus/example2.png', description: '마르살라 와인 소스 치킨', excludable: ['chicken'] },
  'R03': { id: 'R03', name: '치킨 마요 덮밥', category: 'recovery', cost: 2800, price: 6900, image: '/veggieverse/images/menus/example3.png', description: '부드러운 치킨과 마요네즈의 조화', excludable: ['chicken', 'egg'] },
  'R04': { id: 'R04', name: '닭갈비 덮밥', category: 'recovery', cost: 3200, price: 7500, image: '/veggieverse/images/menus/example4.png', description: '매콤달콤한 닭갈비 덮밥', excludable: ['chicken', 'spicy'] },
  'R05': { id: 'R05', name: '크리스피 두부 스테이크', category: 'recovery', cost: 3000, price: 6900, image: '/veggieverse/images/menus/example5.png', description: '바삭하게 구운 두부 스테이크', excludable: [] },
  'R06': { id: 'R06', name: '오야코동', category: 'recovery', cost: 2800, price: 6900, image: '/veggieverse/images/menus/example6.png', description: '부드러운 계란과 닭고기 덮밥', excludable: ['chicken', 'egg'] },

  // 클린 (6개) - 저염·무가공
  'C01': { id: 'C01', name: '사프란 퀴노아 필라프', category: 'clean', cost: 3500, price: 7900, image: '/veggieverse/images/menus/example.png', description: '사프란 향이 깃든 퀴노아 필라프', excludable: [] },
  'C02': { id: 'C02', name: '지중해식 퀴노아 샐러드', category: 'clean', cost: 3200, price: 7500, image: '/veggieverse/images/menus/example2.png', description: '올리브와 허브의 지중해 샐러드', excludable: [] },
  'C03': { id: 'C03', name: '구운 콜리플라워 스테이크', category: 'clean', cost: 3200, price: 7500, image: '/veggieverse/images/menus/example3.png', description: '통째로 구운 콜리플라워', excludable: [] },
  'C04': { id: 'C04', name: '아쿠아파차 스타일 도미', category: 'clean', cost: 6800, price: 10500, image: '/veggieverse/images/menus/example4.png', description: '토마토 브로스에 익힌 도미', excludable: ['fish'] },
  'C05': { id: 'C05', name: '라따뚜이', category: 'clean', cost: 3000, price: 6900, image: '/veggieverse/images/menus/example5.png', description: '프로방스식 채소 스튜', excludable: [] },
  'C06': { id: 'C06', name: '스터프드 피망', category: 'clean', cost: 3500, price: 7900, image: '/veggieverse/images/menus/example6.png', description: '퀴노아와 야채를 채운 피망', excludable: [] },

  // 라이트 (6개) - 400kcal 이하
  'L01': { id: 'L01', name: '당근 오렌지 수프', category: 'light', cost: 2800, price: 6500, image: '/veggieverse/images/menus/example.png', description: '상큼한 당근 오렌지 수프', excludable: [] },
  'L02': { id: 'L02', name: '그린 파파야 샐러드', category: 'light', cost: 2500, price: 6200, image: '/veggieverse/images/menus/example2.png', description: '태국식 그린 파파야 샐러드', excludable: ['nuts', 'spicy'] },
  'L03': { id: 'L03', name: '비건 포케 볼', category: 'light', cost: 2800, price: 6900, image: '/veggieverse/images/menus/example3.png', description: '두부와 채소로 만든 비건 포케', excludable: [] },
  'L04': { id: 'L04', name: '참치 타르타르', category: 'light', cost: 7500, price: 11500, image: '/veggieverse/images/menus/example4.png', description: '신선한 참치 타르타르', excludable: ['fish'] },
  'L05': { id: 'L05', name: '닭가슴살 샐러드 볼', category: 'light', cost: 3200, price: 7500, image: '/veggieverse/images/menus/example5.png', description: '그릴드 닭가슴살 샐러드', excludable: ['chicken'] },
  'L06': { id: 'L06', name: '렌틸콩 수프', category: 'light', cost: 2600, price: 6500, image: '/veggieverse/images/menus/example6.png', description: '고단백 렌틸콩 수프', excludable: [] },

  // 밸런스 (6개) - 영양 균형
  'B01': { id: 'B01', name: '트러플 크림 리조또', category: 'balance', cost: 4200, price: 8900, image: '/veggieverse/images/menus/example.png', description: '트러플 향 크리미 리조또', excludable: ['dairy'] },
  'B02': { id: 'B02', name: '코코뱅', category: 'balance', cost: 6800, price: 10500, image: '/veggieverse/images/menus/example2.png', description: '와인에 조린 프랑스식 닭요리', excludable: ['chicken'] },
  'B03': { id: 'B03', name: '채소 카레 덮밥', category: 'balance', cost: 2800, price: 6900, image: '/veggieverse/images/menus/example3.png', description: '향신료 가득한 채소 카레', excludable: ['spicy'] },
  'B04': { id: 'B04', name: '새우 볶음밥', category: 'balance', cost: 3200, price: 7500, image: '/veggieverse/images/menus/example4.png', description: '탱글탱글한 새우 볶음밥', excludable: ['shellfish', 'egg'] },
  'B05': { id: 'B05', name: '버섯 리조또', category: 'balance', cost: 4000, price: 8500, image: '/veggieverse/images/menus/example5.png', description: '다양한 버섯의 크리미 리조또', excludable: ['dairy'] },
  'B06': { id: 'B06', name: '해물 파에야', category: 'balance', cost: 7500, price: 11500, image: '/veggieverse/images/menus/example6.png', description: '해산물 가득 스페인 파에야', excludable: ['shellfish', 'fish'] },
};

// 메뉴 변형 규칙 (17개 메뉴)
const MENU_VARIATIONS: Record<string, Partial<Record<ExcludeCategory, { name: string; badge: string }>>> = {
  'G01': { fish: { name: '두부 콩피', badge: '연어 → 두부' } },
  'G02': {
    shellfish: { name: '새송이버섯 버터 소테', badge: '관자 → 새송이' },
    dairy: { name: '관자 올리브 소테', badge: '버터 → 올리브오일' }
  },
  'G03': { fish: { name: '아보카도 덮밥', badge: '연어 → 제외' } },
  'G06': { fish: { name: '미소 글레이즈드 두부', badge: '연어 → 두부' } },
  'R01': { chicken: { name: '두부 콩피', badge: '치킨 → 두부' } },
  'R02': { chicken: { name: '버섯 마르살라', badge: '치킨 → 버섯' } },
  'R03': { chicken: { name: '두부 마요 덮밥', badge: '치킨 → 두부' } },
  'R04': { chicken: { name: '버섯갈비 덮밥', badge: '닭 → 버섯' } },
  'R06': {
    chicken: { name: '야채 덮밥', badge: '닭 → 야채' },
    egg: { name: '치킨 덮밥', badge: '계란 → 제외' }
  },
  'C04': { fish: { name: '아쿠아파차 스타일 두부', badge: '도미 → 두부' } },
  'L04': { fish: { name: '비트 타르타르', badge: '참치 → 비트' } },
  'L05': { chicken: { name: '두부 샐러드 볼', badge: '닭가슴살 → 두부' } },
  'B01': { dairy: { name: '트러플 코코넛크림 리조또', badge: '크림 → 코코넛크림' } },
  'B02': { chicken: { name: '버섯 코코뱅', badge: '치킨 → 버섯' } },
  'B04': { shellfish: { name: '야채 볶음밥', badge: '새우 → 야채' } },
  'B05': { dairy: { name: '버섯 코코넛크림 리조또', badge: '크림 → 코코넛크림' } },
  'B06': { shellfish: { name: '야채 파에야', badge: '해물 → 야채' } },
};

// 메뉴 표시용 변환 함수
const getDisplayMenu = (menuId: string, excludeCategories: ExcludeCategory[]): DisplayMenuData => {
  const menu = MENUS[menuId];
  if (!menu) {
    return { id: menuId, name: '', category: 'balance', cost: 0, price: 0, image: '', description: '', excludable: [], displayName: '', isVariation: false };
  }

  const variations = MENU_VARIATIONS[menuId];

  if (!variations) {
    return { ...menu, displayName: menu.name, isVariation: false };
  }

  for (const category of excludeCategories) {
    if (variations[category]) {
      return {
        ...menu,
        displayName: variations[category]!.name,
        badge: variations[category]!.badge,
        isVariation: true,
        originalName: menu.name,
      };
    }
  }

  return { ...menu, displayName: menu.name, isVariation: false };
};

// 변형 표시용 키워드 추출 함수
const extractKeyword = (name?: string): string => {
  if (!name) return '';
  const words = name.split(' ');
  return words[0] || '';
};

const getNextMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 7 : 8 - dayOfWeek;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);
  return nextMonday;
};

const formatDateLabel = (date: Date): { dayName: string; dayNum: number; isHoliday: boolean } => {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = date.getDay();
  // 일요일(0)은 공휴일 표시
  const isHoliday = dayOfWeek === 0;
  return {
    dayName: dayNames[dayOfWeek],
    dayNum: date.getDate(),
    isHoliday,
  };
};

const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR') + '원';
};

// Custom scrollbar styles - hidden
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const SubscriptionPage: React.FC = () => {
  const [duration, setDuration] = useState<DurationType>(1);
  const [selectedExcludes, setSelectedExcludes] = useState<ExcludeCategory[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [mealPlan, setMealPlan] = useState<Record<string, DisplayMenuData>>({});
  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null);
  const [durationSelected, setDurationSelected] = useState<boolean>(false);
  const [hoveredPlanType, setHoveredPlanType] = useState<string | null>(null);

  const startDate = useMemo(() => getNextMonday(), []);

  const MEAL_TIMES = ['점심', '저녁'] as const;

  const generateWeekDays = (weekStartDate: Date) => {
    const days: { date: Date; dateKey: string; dateLabel: { dayName: string; dayNum: number; isHoliday: boolean }; slots: { slotId: string; mealTime: string }[] }[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStartDate);
      date.setDate(weekStartDate.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dateKey,
        dateLabel: formatDateLabel(date),
        slots: MEAL_TIMES.map(time => ({
          slotId: `${dateKey}-${time}`,
          mealTime: time,
        })),
      });
    }
    return days;
  };

  const week1Days = useMemo(() => generateWeekDays(startDate), [startDate]);
  const week2Days = useMemo(() => {
    const week2Start = new Date(startDate);
    week2Start.setDate(startDate.getDate() + 7);
    return generateWeekDays(week2Start);
  }, [startDate]);

  // 메뉴 리스트를 DisplayMenuData로 변환 (제외 필터 적용)
  const filteredMeals = useMemo(() => {
    const menuIds = Object.keys(MENUS);
    // 모든 메뉴를 DisplayMenuData 형식으로 변환 (변형 없이)
    let displayMenus: DisplayMenuData[] = menuIds.map(id => {
      const menu = MENUS[id];
      return { ...menu, displayName: menu.name, isVariation: false };
    });

    // 제외 재료 선택 시 해당 메뉴 숨김 (필터링)
    if (selectedExcludes.length > 0) {
      displayMenus = displayMenus.filter(menu => {
        // excludable 배열에 선택된 제외 카테고리가 포함되어 있으면 숨김
        return !menu.excludable.some(exc => selectedExcludes.includes(exc));
      });
    }

    // 선택된 식단 유형(카테고리)에 따라 필터링 (selectedPlanType이 null이면 전체 표시)
    if (selectedPlanType) {
      const categoryMap: Record<string, MenuCategory> = {
        'glow': 'glow',
        'wellness': 'recovery',
        'balance': 'balance',
        'light': 'light',
        'clean': 'clean',
      };
      const targetCategory = categoryMap[selectedPlanType];
      if (targetCategory) {
        displayMenus = displayMenus.filter(menu => menu.category === targetCategory);
      }
    }
    // selectedPlanType이 null이면 모든 메뉴 표시 (카테고리 필터링 안함)

    return displayMenus;
  }, [selectedExcludes, selectedPlanType]);

  const totalPrice = useMemo(() => {
    return Object.values(mealPlan).reduce((sum: number, meal: DisplayMenuData) => sum + meal.price, 0);
  }, [mealPlan]);

  const filledSlots = Object.keys(mealPlan).length;
  const totalSlots = duration === 1 ? 14 : 28; // 7일 x 2끼 or 14일 x 2끼

  const toggleExclude = (category: ExcludeCategory) => {
    setSelectedExcludes(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // 플래너에서 변형된 메뉴 수 계산
  const variationCount = useMemo(() => {
    return Object.values(mealPlan).filter((meal: DisplayMenuData) => meal.isVariation).length;
  }, [mealPlan]);


  const handleSlotClick = (slotId: string) => {
    setSelectedSlotId(prev => prev === slotId ? null : slotId);
  };

  const handleAddMeal = (meal: DisplayMenuData) => {
    const allDays = duration === 1 ? week1Days : [...week1Days, ...week2Days];
    const allSlots = allDays.flatMap(day => day.slots);

    // 2주차: 클릭하면 모든 빈 슬롯에 채우기
    if (duration === 2) {
      const newMealPlan: Record<string, DisplayMenuData> = { ...mealPlan };
      allSlots.forEach(slot => {
        if (!newMealPlan[slot.slotId]) {
          newMealPlan[slot.slotId] = meal;
        }
      });
      setMealPlan(newMealPlan);
      setSelectedSlotId(null);
      return;
    }

    // 1주차: 기존 방식 (하나씩 추가)
    if (selectedSlotId) {
      setMealPlan(prev => ({ ...prev, [selectedSlotId]: meal }));
      const currentIndex = allSlots.findIndex(s => s.slotId === selectedSlotId);
      const nextEmptySlot = allSlots.slice(currentIndex + 1).find(s => !mealPlan[s.slotId]);
      setSelectedSlotId(nextEmptySlot?.slotId || null);
    } else {
      const firstEmptySlot = allSlots.find(s => !mealPlan[s.slotId]);
      if (firstEmptySlot) {
        setMealPlan(prev => ({ ...prev, [firstEmptySlot.slotId]: meal }));
      }
    }
  };

  const handleRemoveMeal = (slotId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMealPlan(prev => {
      const newPlan = { ...prev };
      delete newPlan[slotId];
      return newPlan;
    });
  };

  const handlePlanTypeSelect = (planId: string) => {
    setSelectedPlanType(planId);
    setHoveredPlanType(null);

    // PLAN_TYPES의 id와 MENUS의 category 매핑
    const categoryMap: Record<string, MenuCategory> = {
      'glow': 'glow',
      'wellness': 'recovery',
      'balance': 'balance',
      'light': 'light',
      'clean': 'clean',
    };
    const targetCategory = categoryMap[planId];
    if (!targetCategory) return;

    // 해당 카테고리의 메뉴 가져오기 (제외 필터 적용)
    const menuIds = Object.keys(MENUS).filter(id => MENUS[id].category === targetCategory);
    const mealsForPlan = menuIds.map(id => getDisplayMenu(id, selectedExcludes));

    if (mealsForPlan.length === 0) return;

    // Get all days based on duration
    const allDays = duration === 1 ? week1Days : [...week1Days, ...week2Days];

    // Auto-fill the calendar (2 meals per day)
    const newMealPlan: Record<string, DisplayMenuData> = {};
    let mealIndex = 0;
    allDays.forEach((day) => {
      day.slots.forEach((slot) => {
        const meal = mealsForPlan[mealIndex % mealsForPlan.length];
        newMealPlan[slot.slotId] = meal;
        mealIndex++;
      });
    });

    setMealPlan(newMealPlan);
    setSelectedSlotId(null);
  };

  // 달력 셀 렌더링 (달력식 레이아웃)
  const renderCalendarCell = (
    day: { dateKey: string; dateLabel: { dayName: string; dayNum: number; isHoliday: boolean }; slots: { slotId: string; mealTime: string }[] }
  ) => {
    return (
      <div
        key={day.dateKey}
        className="border-r border-b border-gray-200 last:border-r-0 flex flex-col"
      >
        {/* Date Header */}
        <div className={`text-center py-1 border-b border-gray-100 ${day.dateLabel.isHoliday ? 'bg-red-50' : 'bg-gray-50'}`}>
          <span className={`text-[12px] font-semibold ${day.dateLabel.isHoliday ? 'text-red-500' : 'text-gray-700'}`}>
            {day.dateLabel.dayNum}
          </span>
        </div>

        {/* Meal Slots (점심, 저녁 세로 배치) */}
        <div className="flex-1 flex flex-col">
          {day.slots.map((slot, slotIndex) => {
            const meal = mealPlan[slot.slotId];
            const isSelected = selectedSlotId === slot.slotId;

            return (
              <div
                key={slot.slotId}
                onClick={() => handleSlotClick(slot.slotId)}
                className={`flex-1 p-1 cursor-pointer min-h-[60px] ${slotIndex === 0 ? 'border-b border-gray-100' : ''} ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                {meal ? (
                  <div className="flex flex-col items-center gap-0.5 group/meal h-full">
                    <div className="relative w-full">
                      <img src={meal.image} alt={meal.displayName} className="w-full h-10 object-cover rounded" />
                      <button
                        onClick={(e) => handleRemoveMeal(slot.slotId, e)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-[8px] hover:bg-gray-700 transition-all opacity-0 group-hover/meal:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[9px] font-medium text-center leading-tight line-clamp-2">{meal.displayName}</p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-[9px] text-gray-300">{slot.mealTime}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{scrollbarStyles}</style>

      {/* Fixed Viewport Container - No Page Scroll */}
      <div className="w-full flex overflow-hidden border-t border-black" style={{ height: 'calc(100vh - var(--header-h, 64px))' }}>

        {/* ════════════════════════════════════════════════════════════════════
            LEFT PANEL: Calendar + Checkout (50%)
            ════════════════════════════════════════════════════════════════════ */}
        <section className="w-1/2 h-full flex flex-col border-r border-black relative">

          {/* A. Duration Tabs (1주/2주) - Full Width Like Category Tabs */}
          <div className="shrink-0 flex border-b border-black bg-white">
            <button
              onClick={() => { setDuration(1); setDurationSelected(true); }}
              className={`flex-1 py-3 text-[12px] font-semibold tracking-tight transition-all border-r border-black ${
                durationSelected && duration === 1 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              1주
            </button>
            <button
              onClick={() => { setDuration(2); setDurationSelected(true); }}
              className={`flex-1 py-3 text-[12px] font-semibold tracking-tight transition-all ${
                durationSelected && duration === 2 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              2주
            </button>
          </div>

          {/* B. Plan Type Tabs (Horizontal) */}
          <div className="shrink-0 flex border-b border-black bg-white">
            {PLAN_TYPES.map((plan, index) => (
              <button
                key={plan.id}
                onClick={() => durationSelected && handlePlanTypeSelect(plan.id)}
                onMouseEnter={() => durationSelected && setHoveredPlanType(plan.id)}
                onMouseLeave={() => setHoveredPlanType(null)}
                disabled={!durationSelected}
                className={`flex-1 py-3 text-[12px] font-semibold tracking-tight transition-all ${
                  index < PLAN_TYPES.length - 1 ? 'border-r border-black' : ''
                } ${
                  !durationSelected
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : selectedPlanType === plan.id
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>

          {/* C. Scrollable Calendar Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="min-h-full flex flex-col">

              {/* Guide Message - Show when no meals selected */}
              {filledSlots === 0 && (
                <div className="flex-1 flex items-center justify-center py-20">
                  <div className="text-center">
                    <p className="text-[16px] text-gray-500 leading-relaxed">
                      {!durationSelected
                        ? '구독할 기간을 선택하신 후'
                        : '내가 원하는 타입을 골라주세요!'
                      }
                    </p>
                    {!durationSelected && (
                      <p className="text-[16px] text-gray-500 leading-relaxed">
                        내가 원하는 타입을 골라주세요!
                      </p>
                    )}
                    <div className="mt-4 text-[13px] text-gray-400">
                      {!durationSelected
                        ? '👆 위에서 1주 또는 2주를 선택해주세요'
                        : '👆 위에서 식단 타입을 선택해주세요'
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar Grid - 7 Column Layout */}
              {filledSlots > 0 && (
              <div className="flex-1 flex flex-col">
                {/* Day Header Row */}
                <div className="grid grid-cols-7 border-b border-gray-300 bg-gray-100">
                  {['월', '화', '수', '목', '금', '토', '일'].map((dayName, index) => (
                    <div
                      key={dayName}
                      className={`py-2 text-center text-[11px] font-semibold ${
                        index === 6 ? 'text-red-500' : index === 5 ? 'text-blue-500' : 'text-gray-600'
                      } ${index < 6 ? 'border-r border-gray-200' : ''}`}
                    >
                      {dayName}
                    </div>
                  ))}
                </div>

                {/* Week 1 Row */}
                <div className="grid grid-cols-7 flex-1">
                  {week1Days.map((day) => renderCalendarCell(day))}
                </div>

                {/* Week 2 Row */}
                {duration === 2 && (
                  <div className="grid grid-cols-7 flex-1 border-t border-gray-300">
                    {week2Days.map((day) => renderCalendarCell(day))}
                  </div>
                )}
              </div>
              )}
            </div>
          </div>

          {/* Hover Popup Banner - 3:5 Ratio, Right Side */}
          {hoveredPlanType && (
            <div
              className="absolute top-0 right-0 translate-x-full h-full border-l border-black z-50"
              style={{ aspectRatio: '3/5' }}
              onMouseEnter={() => setHoveredPlanType(hoveredPlanType)}
              onMouseLeave={() => setHoveredPlanType(null)}
            >
              {(() => {
                const plan = PLAN_TYPES.find(p => p.id === hoveredPlanType);
                if (!plan) return null;
                return (
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${plan.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-6 right-6">
                      <p className="text-[11px] text-white/70 tracking-[0.25em] mb-2">{plan.subtitle}</p>
                      <h3 className="text-[32px] font-bold text-white leading-tight mb-3">{plan.name}</h3>
                      <p className="text-[13px] text-white/90 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* C. Sticky Bottom Checkout Bar - Full Width */}
          <div className="shrink-0 h-[90px] border-t border-black bg-white flex items-center justify-between px-8">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">예상 결제 금액</p>
              <div className="flex items-baseline gap-2">
                <p className="text-[28px] font-bold tracking-tight">{formatPrice(totalPrice)}</p>
                {totalPrice > 0 && (
                  <>
                    <span className="text-[14px] text-gray-400 line-through">{formatPrice(Math.round(totalPrice / 0.9))}</span>
                    <span className="text-[12px] text-red-500 font-medium">10% 할인</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-gray-400 font-medium">
                {filledSlots} / {totalSlots}
                {variationCount > 0 && (
                  <span className="ml-2 text-blue-500">🔄 변형 {variationCount}개</span>
                )}
              </span>
              <button className="h-[50px] px-6 bg-[#03C75A] text-white font-bold text-[14px] flex items-center gap-1.5 hover:bg-[#02b351] transition-colors">
                <span className="font-black">N</span>Pay
              </button>
              <button
                disabled={filledSlots === 0}
                className={`h-[50px] px-10 font-bold text-[15px] transition-all ${
                  filledSlots === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {filledSlots === totalSlots ? '결제하기' : '구독 시작'}
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            RIGHT PANEL: Menu + Filters (40%)
            ════════════════════════════════════════════════════════════════════ */}
        <aside className="w-1/2 h-full flex flex-col bg-[#FAFAFA]">

          {/* A. Sticky Filter Header */}
          <div className="shrink-0 p-6 border-b border-black bg-white">
            <h2 className="text-[18px] font-bold mb-5">메뉴 라이브러리</h2>

            {/* Exclude Category Filters */}
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-2.5">제외 재료 (메뉴 자동 변환)</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(EXCLUDE_CATEGORIES) as ExcludeCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleExclude(category)}
                    className={`px-3 py-1.5 text-[11px] rounded-full transition-all ${
                      selectedExcludes.includes(category)
                        ? 'bg-blue-50 text-blue-500 border border-blue-200'
                        : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {selectedExcludes.includes(category) && '✕ '}{EXCLUDE_CATEGORIES[category].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* B. Scrollable Menu Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
            {filteredMeals.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-[14px]">
                조건에 맞는 메뉴가 없습니다
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredMeals.map((meal) => {
                  // cost와 price로 할인율 계산
                  const hasDiscount = meal.cost < meal.price;
                  const discountRate = hasDiscount
                    ? Math.round(((meal.price - meal.cost) / meal.price) * 100)
                    : 0;

                  return (
                    <div
                      key={meal.id}
                      onClick={() => handleAddMeal(meal)}
                      style={{
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                      className="group"
                    >
                      {/* Image Container */}
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '1 / 1',
                          background: '#F5F5F5',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={meal.image}
                          alt={meal.displayName}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                          className="group-hover:scale-105"
                        />
                        {/* Variation Badge on Image */}
                        {meal.isVariation && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded">
                            🔄 변형
                          </div>
                        )}
                      </div>

                      {/* Content - StorePage Style */}
                      <div style={{ padding: '16px 0 0 0' }}>
                        {/* Product Name - Bold + Hover Underline */}
                        <h3
                          className="group-hover:underline"
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            lineHeight: '1.3',
                            color: '#000',
                            margin: '0 0 4px 0',
                            textDecorationColor: '#000',
                          }}
                        >
                          {meal.displayName}
                        </h3>

                        {/* Variation Info */}
                        {meal.isVariation && (
                          <p style={{
                            fontSize: '11px',
                            color: '#3B82F6',
                            margin: '0 0 4px 0',
                          }}>
                            {meal.badge}
                          </p>
                        )}

                        {/* Description - Gray, 1 line */}
                        <p style={{
                          fontSize: '13px',
                          fontWeight: 400,
                          color: '#6B6B6B',
                          margin: '0 0 12px 0',
                          lineHeight: '1.5',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {meal.description}
                        </p>

                        {/* Price Section */}
                        <div>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#000',
                          }}>
                            {meal.price.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default SubscriptionPage;
