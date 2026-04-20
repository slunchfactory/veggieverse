import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SubscribeShell } from './SubscribeShell';

type DurationType = 1 | 2;
type ExcludeCategory = 'dairy' | 'shellfish' | 'fish' | 'nuts' | 'chicken' | 'egg' | 'gluten' | 'spicy';
type MenuCategory = 'slim' | 'protein';
type PurchaseType = 'once' | 'subscription';
type DeliveryCycle = '1month' | '2month';
type PackComposition = '14day' | '14day+random7' | '14day+random14' | '14day+random21';

const DELIVERY_CYCLE_OPTIONS: { value: DeliveryCycle; label: string }[] = [
  { value: '1month', label: '1달마다 배송' },
  { value: '2month', label: '2달마다 배송' },
];

const PACK_COMPOSITION_OPTIONS: { value: PackComposition; label: string }[] = [
  { value: '14day', label: '슬런치 (식단구성) 14일팩' },
  { value: '14day+random7', label: '슬런치 (식단구성) 14일팩 + 이후 랜덤 7일팩' },
  { value: '14day+random14', label: '슬런치 (식단구성) 14일팩 + 이후 랜덤 14일팩' },
  { value: '14day+random21', label: '슬런치 (식단구성) 14일팩 + 이후 랜덤 21일팩' },
];

const SUBSCRIPTION_DISCOUNT_RATE = 0.10;

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
const EXCLUDE_CATEGORIES: Record<ExcludeCategory, { label: string; keywords: string[]; mark: string }> = {
  dairy: { label: '유제품', keywords: ['치즈', '크림', '버터', '우유', '파르미지아노'], mark: '유' },
  shellfish: { label: '갑각류', keywords: ['새우', '관자', '랍스터', '해물'], mark: '갑' },
  fish: { label: '생선', keywords: ['연어', '참치', '도미', '고등어'], mark: '어' },
  nuts: { label: '견과류', keywords: ['땅콩', '아몬드', '호두', '캐슈넛'], mark: '견' },
  chicken: { label: '닭고기', keywords: ['닭', '치킨', '닭가슴살'], mark: '닭' },
  egg: { label: '계란', keywords: ['달걀', '계란', '오야코'], mark: '난' },
  gluten: { label: '글루텐', keywords: ['파스타', '우동', '뇨끼', '또띠아'], mark: '밀' },
  spicy: { label: '매운맛', keywords: ['고추장', '청양고추', '스리라차'], mark: '매' },
};

// 2가지 플랜 타입
const PLAN_TYPES = [
  {
    id: 'slim',
    name: '슬림 밸런스',
    subtitle: 'SLIM BALANCE',
    description: '저칼로리·저탄수 중심의 가벼운 식단. 샐러드·랩·채소 볼로 포만감은 유지하면서 체중 관리.',
    image: '/veggieverse/images/menus/example.png',
    color: '#EEF6EF',
    accent: '#4A7F52',
    filterTags: ['저칼로리', '저탄수'],
  },
  {
    id: 'protein',
    name: '헬시 프로틴',
    subtitle: 'HEALTHY PROTEIN',
    description: '두부·해산물·견과류 등 고단백 재료 중심. 근육 유지와 든든한 포만감이 필요한 날에.',
    image: '/veggieverse/images/menus/example2.png',
    color: '#FBF1E8',
    accent: '#8B5A2B',
    filterTags: ['고단백'],
  },
];

// 33개 메뉴 데이터
const MENUS: Record<string, MenuData> = {
  // 슬림밸런스 (13개) - 저칼로리·가벼운 채소 중심
  'S01': { id: 'S01', name: '로스티드 비트 카르파초', category: 'slim', cost: 3800, price: 7500, image: '/veggieverse/images/menus/01_roasted_beet_carpaccio.png', description: '구운 비트의 선명한 맛', excludable: ['nuts'] },
  'S02': { id: 'S02', name: '케일 월도프 샐러드', category: 'slim', cost: 3400, price: 7200, image: '/veggieverse/images/menus/04_kale_waldorf_salad.png', description: '아삭한 케일과 사과의 월도프', excludable: ['nuts'] },
  'S03': { id: 'S03', name: '지중해식 퀴노아 샐러드', category: 'slim', cost: 3200, price: 7500, image: '/veggieverse/images/menus/05_mediterranean_quinoa_salad.png', description: '올리브와 허브의 지중해 샐러드', excludable: [] },
  'S04': { id: 'S04', name: '지중해 후무스 랩', category: 'slim', cost: 3000, price: 6900, image: '/veggieverse/images/menus/16_mediterranean_hummus_wrap.png', description: '후무스와 신선한 채소의 랩', excludable: ['gluten'] },
  'S05': { id: 'S05', name: '버섯 잡채', category: 'slim', cost: 3100, price: 7100, image: '/veggieverse/images/menus/18_mushroom_japchae.png', description: '담백한 버섯 잡채', excludable: [] },
  'S06': { id: 'S06', name: '스파이시 콜리플라워 타코', category: 'slim', cost: 3200, price: 7300, image: '/veggieverse/images/menus/19_spicy_cauliflower_tacos.png', description: '훈제 파프리카 콜리플라워', excludable: ['gluten', 'spicy'] },
  'S07': { id: 'S07', name: '지중해 채소 파스타', category: 'slim', cost: 3200, price: 7500, image: '/veggieverse/images/menus/20_mediterranean_vegetable_pasta.png', description: '가지·주키니 올리브오일 파스타', excludable: ['gluten'] },
  'S08': { id: 'S08', name: '칠리 두부 스크램블', category: 'slim', cost: 3000, price: 6900, image: '/veggieverse/images/menus/21_chili_tofu_scramble.png', description: '가벼운 두부 스크램블', excludable: [] },
  'S09': { id: 'S09', name: '아보카도 스시 볼', category: 'slim', cost: 3300, price: 7400, image: '/veggieverse/images/menus/22_avocado_sushi_bowl.png', description: '아보카도와 에다마메 볼', excludable: [] },
  'S10': { id: 'S10', name: '케일 시저 샐러드', category: 'slim', cost: 3000, price: 6900, image: '/veggieverse/images/menus/23_kale_caesar_salad.png', description: '비건 시저 드레싱의 케일', excludable: ['gluten'] },
  'S11': { id: 'S11', name: '퓨전 콩나물 비빔면', category: 'slim', cost: 3100, price: 7000, image: '/veggieverse/images/menus/26_fusion_bean_sprout_noodles.png', description: '매콤 콩나물 비빔면', excludable: ['gluten', 'spicy'] },
  'S12': { id: 'S12', name: '구운 채소 퀴노아 샐러드', category: 'slim', cost: 3400, price: 7400, image: '/veggieverse/images/menus/27_roasted_vegetable_quinoa_salad.png', description: '단호박과 아루굴라 퀴노아', excludable: [] },
  'S13': { id: 'S13', name: '지중해 채소 구이 랩', category: 'slim', cost: 3000, price: 6900, image: '/veggieverse/images/menus/30_mediterranean_grilled_veg_wrap.png', description: '가지·주키니 구이 랩', excludable: ['gluten'] },

  // 프로틴파워 (20개) - 고단백·든든한 한 끼
  'P01': { id: 'P01', name: '렌틸 볼로네제', category: 'protein', cost: 2500, price: 7900, image: '/veggieverse/images/menus/02_lentil_bolognese.png', description: '고단백 렌틸 토마토 파스타', excludable: ['gluten'] },
  'P02': { id: 'P02', name: '크리스피 두부 스테이크', category: 'protein', cost: 3000, price: 6900, image: '/veggieverse/images/menus/07_crispy_tofu_steak.png', description: '바삭한 두부 스테이크', excludable: [] },
  'P03': { id: 'P03', name: '해바라기씨 페스토 파스타', category: 'protein', cost: 3200, price: 7900, image: '/veggieverse/images/menus/03_sunflower_seed_pesto_pasta.png', description: '해바라기씨 페스토 파스타', excludable: ['nuts', 'gluten'] },
  'P04': { id: 'P04', name: '아시안 피넛 누들', category: 'protein', cost: 3100, price: 7800, image: '/veggieverse/images/menus/06_asian_peanut_noodles.png', description: '땅콩 소스 쌀국수', excludable: ['nuts', 'spicy'] },
  'P05': { id: 'P05', name: '구운 채소 라자냐', category: 'protein', cost: 3500, price: 8500, image: '/veggieverse/images/menus/08_roasted_vegetable_lasagna.png', description: '채소와 캐슈넛 리코타 라자냐', excludable: ['nuts', 'gluten'] },
  'P06': { id: 'P06', name: '관자 버터 소테', category: 'protein', cost: 8500, price: 12000, image: '/veggieverse/images/menus/09_scallop_butter_saute.png', description: '버터에 구운 홋카이도 관자', excludable: ['shellfish', 'dairy'] },
  'P07': { id: 'P07', name: '미소 글레이즈드 삼치', category: 'protein', cost: 6200, price: 9800, image: '/veggieverse/images/menus/10_miso_glazed_mackerel.png', description: '미소 글레이즈 삼치', excludable: ['fish'] },
  'P08': { id: 'P08', name: '그릴드 옥토퍼스', category: 'protein', cost: 7500, price: 11500, image: '/veggieverse/images/menus/11_grilled_octopus.png', description: '구운 문어 다리', excludable: ['shellfish'] },
  'P09': { id: 'P09', name: '레몬 허브 농어 구이', category: 'protein', cost: 6500, price: 10200, image: '/veggieverse/images/menus/12_lemon_herb_sea_bass.png', description: '레몬 허브 농어', excludable: ['fish', 'dairy'] },
  'P10': { id: 'P10', name: '해물 짬뽕 리조또', category: 'protein', cost: 5500, price: 9900, image: '/veggieverse/images/menus/13_seafood_jjambong_risotto.png', description: '고춧가루 해물 리조또', excludable: ['shellfish', 'spicy'] },
  'P11': { id: 'P11', name: '피쉬 타코', category: 'protein', cost: 5000, price: 9500, image: '/veggieverse/images/menus/14_fish_tacos.png', description: '흰살 생선 타코', excludable: ['fish', 'gluten', 'egg'] },
  'P12': { id: 'P12', name: '고추장 두부 덮밥', category: 'protein', cost: 2800, price: 6900, image: '/veggieverse/images/menus/15_gochujang_tofu_bowl.png', description: '매콤 고추장 두부', excludable: ['spicy'] },
  'P13': { id: 'P13', name: '마라 두부 볶음', category: 'protein', cost: 3000, price: 7100, image: '/veggieverse/images/menus/17_mala_tofu_stir_fry.png', description: '마라 소스 두부 볶음', excludable: ['nuts', 'spicy'] },
  'P14': { id: 'P14', name: '흑임자 두부 샐러드', category: 'protein', cost: 2900, price: 7000, image: '/veggieverse/images/menus/24_black_sesame_tofu_salad.png', description: '흑임자 드레싱의 두부', excludable: [] },
  'P15': { id: 'P15', name: '카레 두부 라이스', category: 'protein', cost: 3100, price: 7200, image: '/veggieverse/images/menus/25_curry_tofu_rice.png', description: '코코넛 카레 두부', excludable: ['spicy'] },
  'P16': { id: 'P16', name: '반미 샌드위치 비건', category: 'protein', cost: 3000, price: 6900, image: '/veggieverse/images/menus/28_vegan_banh_mi.png', description: '두부 반미 샌드위치', excludable: ['gluten', 'spicy'] },
  'P17': { id: 'P17', name: '두부 포케 볼', category: 'protein', cost: 3200, price: 7300, image: '/veggieverse/images/menus/29_tofu_poke_bowl.png', description: '두부 포케 볼', excludable: ['spicy'] },
  'P18': { id: 'P18', name: '연어 아보카도 덮밥', category: 'protein', cost: 4500, price: 8900, image: '/veggieverse/images/menus/31_salmon_avocado_bowl.png', description: '연어와 아보카도 덮밥', excludable: ['fish'] },
  'P19': { id: 'P19', name: '새우 아보카도 롤', category: 'protein', cost: 4800, price: 9200, image: '/veggieverse/images/menus/32_shrimp_avocado_roll.png', description: '새우 아보카도 롤', excludable: ['shellfish', 'gluten', 'egg'] },
  'P20': { id: 'P20', name: '참치 샐러드 랩', category: 'protein', cost: 3400, price: 7900, image: '/veggieverse/images/menus/33_tuna_salad_wrap.png', description: '참치 마요 랩', excludable: ['fish', 'gluten', 'egg'] },
};

const MENU_VARIATIONS: Record<string, Partial<Record<ExcludeCategory, { name: string; badge: string }>>> = {};

const getDisplayMenu = (menuId: string, excludeCategories: ExcludeCategory[]): DisplayMenuData => {
  const menu = MENUS[menuId];
  if (!menu) {
    return { id: menuId, name: '', category: 'slim', cost: 0, price: 0, image: '', description: '', excludable: [], displayName: '', isVariation: false };
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

/** 결제 요일 기반 배송 시작 가능일 */
const getEarliestStartDate = (today: Date): Date => {
  const dow = today.getDay(); // 0=Sun, 1=Mon, ...
  const result = new Date(today);
  result.setHours(0, 0, 0, 0);
  if (dow >= 1 && dow <= 3) {
    // 월/화/수 결제: 다음날부터 가능
    result.setDate(result.getDate() + 1);
    return result;
  }
  // 목/금/토/일 결제: 다음 주 화요일부터
  let delta: number;
  if (dow === 4) delta = 5;
  else if (dow === 5) delta = 4;
  else if (dow === 6) delta = 3;
  else delta = 2; // Sunday
  result.setDate(result.getDate() + delta);
  return result;
};

const isFlexibleToday = (today: Date): boolean => {
  const dow = today.getDay();
  return dow >= 1 && dow <= 3;
};

const formatDateLabel = (date: Date): { dayName: string; dayNum: number; isHoliday: boolean } => {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = date.getDay();
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

const WEEKDAY_EN = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
const WEEKDAY_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

const getHolidayMeta = (d: Date): { labelKo?: string; noteEn?: string } => {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (m === 1 && day === 1) return { labelKo: '신정', noteEn: 'HAPPY NEW YEAR!' };
  if (m === 3 && day === 1) return { labelKo: '삼일절', noteEn: 'MARCH 1ST' };
  if (m === 5 && day === 5) return { labelKo: '어린이날', noteEn: "CHILDREN'S DAY" };
  if (m === 8 && day === 15) return { labelKo: '광복절', noteEn: 'LIBERATION DAY' };
  if (m === 10 && day === 3) return { labelKo: '개천절', noteEn: 'NATIONAL FOUNDATION DAY' };
  if (m === 10 && day === 9) return { labelKo: '한글날', noteEn: 'HANGUL DAY' };
  if (m === 12 && day === 25) return { labelKo: '성탄절', noteEn: 'MERRY CHRISTMAS!' };
  return {};
};

const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar { display: none; }
  .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const DatePickerCalendar: React.FC<{
  selected: Date;
  minDate: Date;
  onSelect: (d: Date) => void;
}> = ({ selected, minDate, onSelect }) => {
  const [month, setMonth] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1));
  const firstDay = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const minTime = stripTime(minDate);
  const selectedTime = stripTime(selected);
  const minMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1).getTime();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const canPrev = month.getTime() > minMonth;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canPrev && setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          disabled={!canPrev}
          className={`bg-transparent border-none px-2 text-[16px] leading-none ${canPrev ? 'cursor-pointer text-gray-800 hover:text-black' : 'cursor-not-allowed text-gray-300'}`}
        >
          ‹
        </button>
        <span className="text-[13px] font-semibold">
          {month.getFullYear()}.{String(month.getMonth() + 1).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="bg-transparent border-none px-2 text-[16px] leading-none text-gray-800 hover:text-black cursor-pointer"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {['일', '월', '화', '수', '목', '금', '토'].map((w, i) => (
          <div
            key={w}
            className={`py-1 text-center text-[10px] font-semibold ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-500'
            }`}
          >
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const date = new Date(month.getFullYear(), month.getMonth(), d);
          const t = stripTime(date);
          const disabled = t < minTime;
          const isSelected = t === selectedTime;
          const dow = date.getDay();
          const tone = dow === 0 ? 'text-red-400' : dow === 6 ? 'text-blue-400' : 'text-gray-800';
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`flex aspect-square items-center justify-center bg-transparent border-none text-[13px] ${
                disabled
                  ? 'cursor-not-allowed text-gray-300'
                  : isSelected
                  ? 'bg-black text-white cursor-pointer'
                  : `${tone} cursor-pointer hover:bg-gray-100`
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const SubscriptionPage: React.FC = () => {
  const [duration, setDuration] = useState<DurationType>(1);
  const [selectedExcludes, setSelectedExcludes] = useState<ExcludeCategory[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [mealPlan, setMealPlan] = useState<Record<string, DisplayMenuData>>({});
  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('once');
  const [deliveryCycle, setDeliveryCycle] = useState<DeliveryCycle | ''>('');
  const [packComposition, setPackComposition] = useState<PackComposition | ''>('');
  const [subscriptionSheetOpen, setSubscriptionSheetOpen] = useState<boolean>(false);
  const [hoveredMeal, setHoveredMeal] = useState<{ meal: DisplayMenuData; x: number; y: number; placement: 'right' | 'left' } | null>(null);
  const [draggingMealId, setDraggingMealId] = useState<string | null>(null);
  const [dragOverDayKey, setDragOverDayKey] = useState<string | null>(null);
  const [allMenuSheetOpen, setAllMenuSheetOpen] = useState<boolean>(false);
  const [wheelCenterIdx, setWheelCenterIdx] = useState<number>(0);
  const [wheelDragDelta, setWheelDragDelta] = useState<number>(0);
  const wheelPointerRef = useRef<{
    startX: number;
    startY: number;
    startIdx: number;
    moved: boolean;
    direction: 'none' | 'horizontal' | 'vertical-up';
  } | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const earliestStart = useMemo(() => getEarliestStartDate(today), [today]);
  const flexible = useMemo(() => isFlexibleToday(today), [today]);
  const [startDate, setStartDate] = useState<Date>(earliestStart);
  const [calendarOpen, setCalendarOpen] = useState(false);

  /** 1주↔2주가 바뀌면 플래너 초기화 */
  const prevDurationRef = useRef<DurationType | null>(null);
  useEffect(() => {
    if (prevDurationRef.current === null) {
      prevDurationRef.current = duration;
      return;
    }
    if (prevDurationRef.current === duration) return;
    prevDurationRef.current = duration;
    setMealPlan({});
    setSelectedSlotId(null);
    setSelectedPlanType(null);
  }, [duration]);

  /** 제외 재료가 바뀌면 캘린더에 있는 해당 재료 포함 식단도 함께 제거 */
  useEffect(() => {
    if (selectedExcludes.length === 0) return;
    setMealPlan(prev => {
      const next: Record<string, DisplayMenuData> = {};
      let changed = false;
      for (const slotId of Object.keys(prev)) {
        const meal = prev[slotId];
        const hasExcluded = meal.excludable.some(e => selectedExcludes.includes(e));
        if (hasExcluded) {
          changed = true;
          continue;
        }
        next[slotId] = meal;
      }
      return changed ? next : prev;
    });
  }, [selectedExcludes]);

  /** 배송 시작일이 바뀌면 플래너 초기화 + 리스트 최상단 스크롤 (날짜 키가 달라짐) */
  const prevStartRef = useRef<string | null>(null);
  const listScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const key = startDate.toISOString().split('T')[0];
    if (prevStartRef.current === null) {
      prevStartRef.current = key;
      return;
    }
    if (prevStartRef.current === key) return;
    prevStartRef.current = key;
    setMealPlan({});
    setSelectedSlotId(null);
    setSelectedPlanType(null);
    listScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [startDate]);

  /** 배송 시작 가능일부터 7일치 옵션 */
  const startDateOptions = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(earliestStart);
      d.setDate(earliestStart.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, [earliestStart]);

  const generateWeekDays = (weekStartDate: Date) => {
    const days: { date: Date; dateKey: string; dateLabel: { dayName: string; dayNum: number; isHoliday: boolean }; slots: { slotId: string; index: 0 | 1 }[] }[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStartDate);
      date.setDate(weekStartDate.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dateKey,
        dateLabel: formatDateLabel(date),
        slots: [
          { slotId: `${dateKey}-0`, index: 0 },
          { slotId: `${dateKey}-1`, index: 1 },
        ],
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

  const allDays = useMemo(
    () => (duration === 1 ? week1Days : [...week1Days, ...week2Days]),
    [duration, week1Days, week2Days]
  );

  const filteredMeals = useMemo(() => {
    const menuIds = Object.keys(MENUS);
    let displayMenus: DisplayMenuData[] = menuIds.map(id => {
      const menu = MENUS[id];
      return { ...menu, displayName: menu.name, isVariation: false };
    });

    if (selectedExcludes.length > 0) {
      displayMenus = displayMenus.filter(menu => {
        return !menu.excludable.some(exc => selectedExcludes.includes(exc));
      });
    }

    return displayMenus;
  }, [selectedExcludes]);

  const planMeals = useMemo(() => {
    if (!selectedPlanType) return { primary: [] as DisplayMenuData[], others: filteredMeals };
    const primary = filteredMeals.filter(m => m.category === selectedPlanType);
    const others = filteredMeals.filter(m => m.category !== selectedPlanType);
    return { primary, others };
  }, [filteredMeals, selectedPlanType]);

  const totalPrice = useMemo(() => {
    return Object.values(mealPlan).reduce((sum: number, meal: DisplayMenuData) => sum + meal.price, 0);
  }, [mealPlan]);

  const filledSlots = Object.keys(mealPlan).length;
  const totalSlots = duration === 1 ? 14 : 28;

  const toggleExclude = (category: ExcludeCategory) => {
    setSelectedExcludes(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const variationCount = useMemo(() => {
    return Object.values(mealPlan).filter((meal: DisplayMenuData) => meal.isVariation).length;
  }, [mealPlan]);

  const handleSlotClick = (slotId: string) => {
    setSelectedSlotId(prev => prev === slotId ? null : slotId);
  };

  const handleAddMeal = (meal: DisplayMenuData) => {
    const allSlots = allDays.flatMap(day => day.slots);

    // 2주차 + 슬롯 미선택: 빈 슬롯 일괄 채우기
    if (duration === 2 && !selectedSlotId) {
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
    const nextPlan = selectedPlanType === planId ? null : planId;
    setSelectedPlanType(nextPlan);
    if (!nextPlan) {
      setMealPlan({});
      setSelectedSlotId(null);
      return;
    }

    const menuIds = Object.keys(MENUS).filter(id => MENUS[id].category === (planId as MenuCategory));
    const mealsForPlan = menuIds.map(id => getDisplayMenu(id, selectedExcludes));
    if (mealsForPlan.length === 0) return;

    const newMealPlan: Record<string, DisplayMenuData> = {};
    let mealIndex = 0;
    allDays.forEach(day => {
      day.slots.forEach(slot => {
        const meal = mealsForPlan[mealIndex % mealsForPlan.length];
        newMealPlan[slot.slotId] = meal;
        mealIndex++;
      });
    });

    setMealPlan(newMealPlan);
    setSelectedSlotId(null);
  };

  const renderDayListRow = (day: typeof allDays[number]) => {
    const dow = day.date.getDay();
    const meta = getHolidayMeta(day.date);
    const isSunday = dow === 0;
    const isSaturday = dow === 6;
    const isHoliday = Boolean(meta.labelKo);
    const dowKo = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][dow];
    const dowShort = ['일', '월', '화', '수', '목', '금', '토'][dow];
    const mm = String(day.date.getMonth() + 1).padStart(2, '0');
    const dd = String(day.date.getDate()).padStart(2, '0');
    const hasMeal = day.slots.some(s => Boolean(mealPlan[s.slotId]));
    const dateTone = isSunday || isHoliday ? 'text-red-400' : isSaturday ? 'text-blue-400' : hasMeal ? 'text-gray-900' : 'text-gray-400';
    const dowTone = isSunday || isHoliday ? 'text-red-500' : isSaturday ? 'text-blue-500' : 'text-gray-700';
    const mealEntries: { slot: typeof day.slots[number]; meal: DisplayMenuData }[] = [];
    for (const slot of day.slots) {
      const meal = mealPlan[slot.slotId];
      if (meal) mealEntries.push({ slot, meal });
    }

    return (
      <article
        key={day.dateKey}
        onDragOver={(e) => {
          if (!draggingMealId) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
          if (dragOverDayKey !== day.dateKey) setDragOverDayKey(day.dateKey);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget.contains(e.relatedTarget as Node)) return;
          if (dragOverDayKey === day.dateKey) setDragOverDayKey(null);
        }}
        onDrop={(e) => {
          e.preventDefault();
          const mealId = e.dataTransfer.getData('text/plain');
          if (!mealId || !MENUS[mealId]) return;
          const displayMenu = getDisplayMenu(mealId, selectedExcludes);
          const emptySlot = day.slots.find(s => !mealPlan[s.slotId]);
          const targetSlotId = emptySlot ? emptySlot.slotId : day.slots[0]?.slotId;
          if (!targetSlotId) return;
          setMealPlan(prev => ({ ...prev, [targetSlotId]: displayMenu }));
          setDraggingMealId(null);
          setDragOverDayKey(null);
        }}
        className={`flex min-h-0 flex-1 flex-row items-center gap-10 overflow-hidden border-0 border-b border-solid border-gray-300 px-5 last:border-b-0 transition-colors ${
          dragOverDayKey === day.dateKey ? 'bg-blue-50' : 'bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setStartDate(day.date)}
          title="이 날짜부터 배송 시작"
          className="flex shrink-0 flex-row lg:flex-col items-baseline lg:items-center gap-1.5 lg:gap-0.5 bg-transparent border-none p-0 hover:opacity-70"
        >
          <span className={`font-sans text-[22px] font-bold leading-tight tracking-tight ${dateTone}`}>
            {mm}.{dd}
          </span>
          <span className={`font-sans text-[12px] font-bold leading-tight ${dowTone}`}>
            {dowShort}
          </span>
        </button>
        {mealEntries.length > 0 ? (
          <div
            className="min-w-0 flex-1 flex items-center gap-2 font-sans text-[14px] leading-tight text-gray-800"
            style={{ color: selectedPlan ? selectedPlan.accent : undefined }}
          >
            {mealEntries.map(({ slot, meal }, idx) => (
              <React.Fragment key={slot.slotId}>
                {idx > 0 && <span className="text-gray-300 shrink-0">·</span>}
                <span className="inline-flex items-center gap-1 min-w-0 group/meal">
                  <span
                    className="truncate hover:underline underline-offset-2 decoration-gray-400 cursor-pointer"
                    onClick={() => handleSlotClick(slot.slotId)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const popupWidth = 280;
                      const spaceOnRight = window.innerWidth - rect.right;
                      const placement = spaceOnRight > popupWidth + 24 ? 'right' : 'left';
                      setHoveredMeal({
                        meal,
                        x: placement === 'right' ? rect.right + 12 : rect.left - 12,
                        y: rect.top + rect.height / 2,
                        placement,
                      });
                    }}
                    onMouseLeave={() => setHoveredMeal(null)}
                  >
                    {meal.displayName}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveMeal(slot.slotId, e)}
                    aria-label={`${meal.displayName} 삭제`}
                    title="삭제"
                    className="shrink-0 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-gray-400 hover:text-black hover:bg-gray-100 bg-transparent border-0 cursor-pointer transition-colors"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </React.Fragment>
            ))}
          </div>
        ) : (() => {
          const firstSlot = day.slots[0];
          const isSelected = firstSlot ? selectedSlotId === firstSlot.slotId : false;
          return (
            <button
              type="button"
              onClick={() => {
                if (!firstSlot) return;
                if (selectedSlotId !== firstSlot.slotId) {
                  setSelectedSlotId(firstSlot.slotId);
                }
              }}
              className={`group min-w-0 flex-1 flex items-center gap-2 cursor-pointer text-left py-1.5 px-3 border border-dashed transition-all ${
                isSelected
                  ? 'border-black bg-gray-50 text-black'
                  : 'border-gray-300 bg-transparent text-gray-400 hover:border-gray-900 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`inline-flex shrink-0 items-center justify-center w-5 h-5 rounded-full border text-[13px] leading-none transition-colors ${
                isSelected
                  ? 'border-black bg-black text-white'
                  : 'border-gray-400 text-gray-400 group-hover:border-gray-900 group-hover:text-gray-900'
              }`}>
                +
              </span>
              <span className="font-sans text-[13px] whitespace-nowrap">
                메뉴 추가하기
              </span>
            </button>
          );
        })()}
      </article>
    );
  };

  const getAllergens = (excludable: ExcludeCategory[]) => excludable.filter(c => c !== 'spicy');
  const getAllergyLabel = (excludable: ExcludeCategory[]) => {
    const list = getAllergens(excludable);
    return list.length ? list.map(c => EXCLUDE_CATEGORIES[c].label).join(', ') : '';
  };

  const renderMealCard = (meal: DisplayMenuData) => (
    <div
      key={meal.id}
      onClick={() => handleAddMeal(meal)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', meal.id);
        setDraggingMealId(meal.id);
      }}
      onDragEnd={() => {
        setDraggingMealId(null);
        setDragOverDayKey(null);
      }}
      className={`group cursor-pointer transition-opacity ${
        draggingMealId === meal.id ? 'opacity-40' : ''
      }`}
    >
      <div
        className="relative aspect-square overflow-hidden rounded-[4px]"
        style={{ background: '#F5F5F5' }}
      >
        <img
          src={meal.image}
          alt={meal.displayName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {meal.isVariation && (
          <div className="absolute left-2 top-2 rounded bg-blue-500 px-2 py-0.5 text-[10px] text-white">
            🔄 변형
          </div>
        )}
        {getAllergens(meal.excludable).length > 0 && (
          <div className="absolute right-0 bottom-0 rounded-tl bg-white/90 px-1 py-0.5 text-[9px] font-medium leading-tight text-gray-900 backdrop-blur-sm">
            Allergy: {getAllergyLabel(meal.excludable)}
          </div>
        )}
      </div>
      <div className="pt-4">
        <h3 className="mb-1 text-[15px] font-semibold leading-tight text-black group-hover:underline">
          {meal.displayName}
        </h3>
        {meal.isVariation && (
          <p className="mb-1 text-[11px] text-blue-500">{meal.badge}</p>
        )}
        <p className="mb-3 truncate text-[13px] font-normal leading-relaxed text-gray-500">
          {meal.description}
        </p>
        <div>
          <span className="text-[16px] font-medium text-black">{meal.price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );

  const selectedPlan = selectedPlanType ? PLAN_TYPES.find(p => p.id === selectedPlanType) : null;

  return (
    <>
      <style>{scrollbarStyles}</style>

      {hoveredMeal && createPortal(
        <div
          className="fixed z-[1000] pointer-events-none"
          style={{
            left: hoveredMeal.x,
            top: hoveredMeal.y,
            transform: hoveredMeal.placement === 'right'
              ? 'translateY(-50%)'
              : 'translate(-100%, -50%)',
          }}
        >
          <img
            src={hoveredMeal.meal.image}
            alt={hoveredMeal.meal.displayName}
            className="w-[160px] h-[160px] object-cover border border-solid border-black bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </div>,
        document.body
      )}

      {/* 모바일 전체 메뉴 바텀시트 (휠에서 위로 스와이프 시 열림) */}
      {allMenuSheetOpen && (
        <>
          <style>{`@keyframes slideUpSheetAll { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
          <div
            className="lg:hidden fixed inset-0 z-[100] bg-black/40"
            onClick={() => setAllMenuSheetOpen(false)}
            aria-hidden="true"
          />
          <div
            className="lg:hidden fixed left-0 right-0 bottom-0 z-[101] bg-white border-0 border-t border-solid border-black flex flex-col max-h-[65dvh]"
            style={{ animation: 'slideUpSheetAll 0.25s ease-out' }}
            role="dialog"
          >
            <button
              type="button"
              onClick={() => setAllMenuSheetOpen(false)}
              aria-label="닫기"
              className="shrink-0 flex items-center justify-center py-2 bg-transparent border-0 cursor-pointer"
            >
              <span className="block w-10 h-1 rounded-full bg-gray-300" />
            </button>
            <div className="shrink-0 flex items-center justify-between px-4 pb-2">
              <h3 className="text-[13px] font-bold">전체 메뉴</h3>
              <span className="text-[11px] text-gray-400">
                {filteredMeals.length}개
              </span>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-4">
              {filteredMeals.length === 0 ? (
                <div className="flex h-full items-center justify-center text-[13px] text-gray-400">
                  조건에 맞는 메뉴가 없습니다
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {filteredMeals.map((meal, idx) => {
                    const active = idx === wheelCenterIdx;
                    return (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => {
                          setWheelCenterIdx(idx);
                          setAllMenuSheetOpen(false);
                        }}
                        className="flex flex-col items-center gap-1.5 p-2 bg-transparent border-0 cursor-pointer transition-all"
                      >
                        <div
                          className={`w-full aspect-square rounded-full overflow-hidden bg-gray-100 border-solid ${
                            active ? 'border-2 border-black' : 'border border-gray-200'
                          }`}
                        >
                          <img
                            src={meal.image}
                            alt={meal.displayName}
                            className="w-full h-full object-cover scale-[1.35]"
                            draggable={false}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                        <span className={`text-[12px] leading-tight text-center truncate w-full ${
                          active ? 'font-semibold text-black' : 'text-gray-700'
                        }`}>
                          {meal.displayName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex min-h-0 flex-1 flex-col relative">
        <SubscribeShell
          mobilePlanTabs={
            <div
              className="grid border-0 border-b border-solid border-black bg-white"
              style={{ gridTemplateColumns: `repeat(${PLAN_TYPES.length}, minmax(0, 1fr))` }}
            >
              {PLAN_TYPES.map((plan, idx) => {
                const active = selectedPlanType === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => handlePlanTypeSelect(plan.id)}
                    className={`py-3 text-[13px] bg-transparent border-0 border-solid cursor-pointer transition-colors underline-offset-4 ${
                      idx < PLAN_TYPES.length - 1 ? 'border-r border-black' : ''
                    } ${active ? 'text-black font-semibold underline' : 'text-gray-500'}`}
                  >
                    {plan.name}
                  </button>
                );
              })}
            </div>
          }
          mobileWheel={
            <div>
              {/* 가로 휠 (iOS picker 스타일) */}
              <div
                className="relative h-[150px] overflow-visible select-none"
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => {
                  if ((e.target as HTMLElement).closest('[data-wheel-ui]')) return;
                  wheelPointerRef.current = {
                    startX: e.clientX,
                    startY: e.clientY,
                    startIdx: wheelCenterIdx,
                    moved: false,
                    direction: 'none',
                  };
                  setWheelDragDelta(0);
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  const s = wheelPointerRef.current;
                  if (!s) return;
                  const dx = e.clientX - s.startX;
                  const dy = e.clientY - s.startY;
                  if (!s.moved && Math.hypot(dx, dy) > 6) s.moved = true;
                  if (!s.moved) return;
                  if (s.direction === 'none') {
                    if (Math.abs(dy) > Math.abs(dx) && dy < 0) {
                      s.direction = 'vertical-up';
                    } else {
                      s.direction = 'horizontal';
                    }
                  }
                  if (s.direction === 'horizontal') {
                    setWheelDragDelta(dx);
                  }
                }}
                onPointerUp={(e) => {
                  const s = wheelPointerRef.current;
                  try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
                  if (!s) { setWheelDragDelta(0); return; }
                  if (!s.moved) {
                    const el = document.elementFromPoint(e.clientX, e.clientY);
                    const btn = (el as HTMLElement | null)?.closest('[data-meal-id]');
                    const mealId = btn?.getAttribute('data-meal-id');
                    if (mealId) {
                      const idx = filteredMeals.findIndex(m => m.id === mealId);
                      if (idx >= 0) {
                        if (idx === wheelCenterIdx) {
                          handleAddMeal(filteredMeals[idx]);
                        } else {
                          setWheelCenterIdx(idx);
                        }
                      }
                    }
                  } else if (s.direction === 'vertical-up') {
                    const dy = e.clientY - s.startY;
                    if (dy < -30) setAllMenuSheetOpen(true);
                  } else {
                    // 드래그 snap (무한 루프)
                    const SPACING = 120;
                    const count = filteredMeals.length;
                    const steps = Math.round(-wheelDragDelta / SPACING);
                    const next = count > 0 ? (((s.startIdx + steps) % count) + count) % count : 0;
                    setWheelCenterIdx(next);
                  }
                  setWheelDragDelta(0);
                  wheelPointerRef.current = null;
                }}
                onPointerCancel={(e) => {
                  try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
                  wheelPointerRef.current = null;
                  setWheelDragDelta(0);
                }}
              >
                {filteredMeals.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-[12px] text-gray-400">
                    조건에 맞는 메뉴가 없습니다
                  </div>
                ) : (
                  <>
                    {(() => {
                      const SPACING = 120;
                      const OUTER_SPACING = 55;
                      const count = filteredMeals.length;
                      const half = count / 2;
                      return filteredMeals.map((meal, idx) => {
                        let delta = idx - wheelCenterIdx;
                        if (count > 1) {
                          if (delta > half) delta -= count;
                          else if (delta <= -half) delta += count;
                        }
                        const pos = delta + wheelDragDelta / SPACING;
                        const absPos = Math.abs(pos);
                        const signPos = pos < 0 ? -1 : 1;
                        const displayX = absPos <= 1
                          ? pos * SPACING
                          : signPos * (SPACING + (absPos - 1) * OUTER_SPACING);
                        const absDist = absPos;
                        const scale = absDist < 0.5 ? 1 : absDist < 1.5 ? 0.7 : absDist < 2.5 ? 0.5 : 0.4;
                        const opacity = absDist < 2.5 ? 1 : 0;
                        const interactive = absDist < 2.5;
                        return (
                          <button
                            key={meal.id}
                            type="button"
                            data-meal-id={meal.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.effectAllowed = 'copy';
                              e.dataTransfer.setData('text/plain', meal.id);
                              setDraggingMealId(meal.id);
                            }}
                            onDragEnd={() => {
                              setDraggingMealId(null);
                              setDragOverDayKey(null);
                            }}
                            className={`absolute bg-transparent border-0 flex flex-col items-center gap-1.5 ${
                              draggingMealId === meal.id ? 'opacity-40' : ''
                            }`}
                            style={{
                              left: '50%',
                              bottom: 8,
                              width: 130,
                              transform: `translate(calc(-50% + ${displayX}px), 0) scale(${scale})`,
                              transformOrigin: 'center bottom',
                              opacity,
                              pointerEvents: interactive ? 'auto' : 'none',
                              cursor: interactive ? 'pointer' : 'default',
                              transition: wheelPointerRef.current?.moved
                                ? 'none'
                                : 'transform 0.2s, opacity 0.2s',
                              zIndex: absDist < 0.5 ? 5 : absDist < 1.5 ? 3 : 1,
                            }}
                          >
                            <div
                              className={`w-[130px] h-[130px] rounded-full overflow-hidden border-solid bg-gray-100 pointer-events-none ${
                                absDist < 0.5
                                  ? 'border-2 border-black shadow-xl'
                                  : 'border border-gray-200'
                              }`}
                            >
                              <img
                                src={meal.image}
                                alt={meal.displayName}
                                className="w-full h-full object-cover scale-[1.35]"
                                draggable={false}
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                              />
                            </div>
                            <span
                              className={`text-center leading-tight truncate pointer-events-none ${
                                absDist < 0.5
                                  ? 'text-[13px] font-semibold text-black w-[130px]'
                                  : absDist < 1.5
                                    ? 'text-[11px] text-gray-500 w-[110px]'
                                    : 'text-[11px] text-gray-500 w-[100px] opacity-0'
                              }`}
                            >
                              {meal.displayName}
                            </span>
                          </button>
                        );
                      });
                    })()}

                  </>
                )}
              </div>
            </div>
          }
          menuColumn={
            <aside className="flex h-full min-h-0 flex-col" aria-label="구독 식단">
              {/* Sticky Filter Header */}
              <div className="shrink-0 border-0 border-b border-solid border-black bg-white">
                <div className="px-6 pt-5 pb-4">
                  <h2 className="text-[18px] font-normal tracking-tight text-black">구독 식단</h2>
                </div>
                {/* 플랜 선택 탭 */}
                <div
                  className="grid border-0 border-t border-solid border-black"
                  style={{ gridTemplateColumns: `repeat(${PLAN_TYPES.length}, minmax(0, 1fr))` }}
                >
                  {PLAN_TYPES.map((plan, idx) => {
                    const active = selectedPlanType === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => handlePlanTypeSelect(plan.id)}
                        aria-pressed={active}
                        className={`py-3 text-[13px] text-center bg-transparent border-0 border-solid cursor-pointer transition-colors underline-offset-4 ${
                          idx < PLAN_TYPES.length - 1 ? 'border-r border-black' : ''
                        } ${
                          active ? 'text-black font-semibold underline' : 'text-gray-400 hover:text-gray-700'
                        }`}
                      >
                        {plan.name}
                      </button>
                    );
                  })}
                </div>
                {(() => {
                  const categories = Object.keys(EXCLUDE_CATEGORIES) as ExcludeCategory[];
                  const resetDisabled = selectedExcludes.length === 0;
                  return (
                    <div className="relative flex items-center justify-center gap-8 py-3 border-0 border-t border-solid border-black">
                      {categories.map((category) => {
                        const excluded = selectedExcludes.includes(category);
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleExclude(category)}
                            aria-pressed={!excluded}
                            className={`text-[13px] bg-transparent border-none cursor-pointer transition-colors whitespace-nowrap ${
                              excluded
                                ? 'text-gray-400 line-through'
                                : 'text-gray-700 hover:text-black'
                            }`}
                          >
                            {EXCLUDE_CATEGORIES[category].label}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setSelectedExcludes([])}
                        disabled={resetDisabled}
                        aria-label="초기화"
                        title="초기화"
                        className={`absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors ${
                          resetDisabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
                          <polyline points="1 4 1 10 7 10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Scrollable Menu Grid */}
              <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto pb-20 lg:pb-0">
                {filteredMeals.length === 0 ? (
                  <div className="flex h-full items-center justify-center p-5 text-[14px] text-gray-400">
                    조건에 맞는 메뉴가 없습니다
                  </div>
                ) : selectedPlan ? (
                  <>
                    {/* 선택된 플랜 대표 식단 섹션 (배경색 구분) */}
                    <div
                      className="border-0 border-b border-solid border-black px-5 pb-6 pt-5"
                      style={{ background: selectedPlan.color }}
                    >
                      <div className="mb-4 flex items-baseline justify-between gap-3">
                        <div>
                          <p
                            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                            style={{ color: selectedPlan.accent }}
                          >
                            {selectedPlan.subtitle}
                          </p>
                          <h3 className="text-[18px] font-bold text-black">{selectedPlan.name}</h3>
                        </div>
                        <span className="shrink-0 text-[11px] font-medium text-gray-500">
                          {planMeals.primary.length}개 식단 · 자동 구성
                        </span>
                      </div>
                      <p className="mb-5 text-[12px] leading-relaxed text-gray-700">
                        {selectedPlan.description}
                      </p>
                      {planMeals.primary.length > 0 ? (
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                          {planMeals.primary.map(meal => renderMealCard(meal))}
                        </div>
                      ) : (
                        <p className="text-[12px] text-gray-500">제외 재료 필터에 맞는 식단이 없습니다.</p>
                      )}
                    </div>

                    {/* 그 외 식단 섹션 */}
                    {planMeals.others.length > 0 && (
                      <div className="px-5 pb-5 pt-6">
                        <div className="mb-4 flex items-center gap-3">
                          <h4 className="text-[13px] font-semibold text-gray-500">그 외 식단</h4>
                          <span className="text-[11px] text-gray-400">
                            다른 플랜 메뉴도 개별 추가 가능
                          </span>
                        </div>
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                          {planMeals.others.map(meal => renderMealCard(meal))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-5">
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMeals.map(meal => renderMealCard(meal))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          }
          plannerTopColumn={
            <section
              className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white"
              aria-label="구독 일정 플래너"
              data-subscribe-planner="top"
            >
              {/* 기간: 중앙 정렬 */}
              <div className="shrink-0 flex items-stretch justify-center gap-10 border-0 border-b border-solid border-black bg-white h-12">
                <button
                  type="button"
                  onClick={() => setDuration(1)}
                  className={`flex items-center justify-center bg-transparent border-none px-2 text-[14px] font-normal whitespace-nowrap transition-colors underline-offset-4 ${
                    duration === 1 ? 'text-black underline' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  1주 · 14끼
                </button>
                <button
                  type="button"
                  onClick={() => setDuration(2)}
                  className={`flex items-center justify-center bg-transparent border-none px-2 text-[14px] font-normal whitespace-nowrap transition-colors underline-offset-4 ${
                    duration === 2 ? 'text-black underline' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  2주 · 28끼
                </button>
              </div>

              {/* 배송 시작일: ‹ 날짜 › (날짜 클릭 시 달력) */}
              <div className="shrink-0 relative flex items-stretch justify-center border-0 border-b border-solid border-black bg-white h-12">
                {(() => {
                  const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
                  const atMin = stripTime(startDate) <= stripTime(earliestStart);
                  const shift = (days: number) => {
                    const next = new Date(startDate);
                    next.setDate(next.getDate() + days);
                    if (stripTime(next) < stripTime(earliestStart)) return;
                    setStartDate(next);
                  };
                  return (
                    <>
                      <button
                        type="button"
                        onClick={() => shift(-1)}
                        disabled={atMin}
                        aria-label="하루 전"
                        className={`flex items-center justify-center bg-transparent border-none px-3 text-[18px] leading-none ${atMin ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer text-gray-700 hover:text-black'}`}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarOpen(v => !v)}
                        className="flex items-center justify-center bg-transparent border-none px-2 text-[14px] font-semibold text-black whitespace-nowrap cursor-pointer underline underline-offset-4"
                      >
                        {startDate.getMonth() + 1}/{startDate.getDate()}({WEEKDAY_KO[startDate.getDay()]})
                      </button>
                      <button
                        type="button"
                        onClick={() => shift(1)}
                        aria-label="하루 후"
                        className="flex items-center justify-center bg-transparent border-none px-3 text-[18px] leading-none cursor-pointer text-gray-700 hover:text-black"
                      >
                        ›
                      </button>
                    </>
                  );
                })()}
                {calendarOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setCalendarOpen(false)}
                    />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 bg-white border border-solid border-black shadow-lg p-4 w-[280px]">
                      <DatePickerCalendar
                        selected={startDate}
                        minDate={earliestStart}
                        onSelect={(d) => {
                          setStartDate(d);
                          setCalendarOpen(false);
                        }}
                      />
                    </div>
                  </>
                )}
                {filledSlots > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!confirm('선택한 식단을 모두 삭제할까요?')) return;
                      setMealPlan({});
                      setSelectedSlotId(null);
                      setSelectedPlanType(null);
                    }}
                    aria-label="식단 초기화"
                    title="식단 초기화"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-transparent border-none text-gray-400 hover:text-black cursor-pointer transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
                      <polyline points="1 4 1 10 7 10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>

              {/* 일정 리스트 — 스크롤 없음, 남은 세로 공간 균등 분배 */}
              <div ref={listScrollRef} className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
                {allDays.map(day => renderDayListRow(day))}
              </div>
            </section>
          }
          plannerBottomColumn={
            <section
              className="relative flex shrink-0 flex-col overflow-hidden bg-white"
              aria-label="구매 옵션 및 결제"
              data-subscribe-planner="bottom"
            >
              {/* 구매 옵션 영역 - 스크린샷 레이아웃 (라벨 / 콘텐츠) */}
              <div className="shrink-0 border-0 border-t border-solid border-black bg-white overflow-y-auto custom-scrollbar" style={{ maxHeight: '50%' }}>
                <div className="px-4 py-4 flex flex-col gap-3">
                  {/* 배송비 */}
                  <div className="flex items-center gap-3">
                    <span className="w-16 shrink-0 text-[11px] text-gray-500">배송비</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-black">조건부 무료</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 border border-solid border-[#7C8BBF] text-[#7C8BBF] text-[10px]">배송비할인</span>
                    </div>
                  </div>

                  {/* 구매방법 */}
                  <div className="flex items-start gap-3">
                    <span className="w-16 shrink-0 text-[11px] text-gray-500 pt-0.5">구매방법</span>
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="purchaseType"
                            checked={purchaseType === 'once'}
                            onChange={() => {
                              setPurchaseType('once');
                              setDeliveryCycle('');
                              setPackComposition('');
                            }}
                            style={{ accentColor: '#000', width: 14, height: 14 }}
                          />
                          <span className="text-[12px] text-black">1회구매</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="purchaseType"
                            checked={purchaseType === 'subscription'}
                            onChange={() => setPurchaseType('subscription')}
                            style={{ accentColor: '#000', width: 14, height: 14 }}
                          />
                          <span className="text-[12px] text-black">정기배송</span>
                        </label>
                      </div>

                      {/* 정기배송 선택 시: 배송주기 드롭다운 */}
                      {purchaseType === 'subscription' && (
                        <div className="relative">
                          <select
                            value={deliveryCycle}
                            onChange={(e) => setDeliveryCycle(e.target.value as DeliveryCycle | '')}
                            className="w-full appearance-none bg-white border border-solid border-gray-300 pl-3 pr-9 py-2.5 text-[12px] cursor-pointer"
                            style={{ color: deliveryCycle ? '#000' : '#888', borderRadius: 0 }}
                          >
                            <option value="">[필수] 배송주기를 선택해 주세요.</option>
                            {DELIVERY_CYCLE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 정기배송 선택 시: 배송주기 할인 안내 */}
                  {purchaseType === 'subscription' && (
                    <div className="flex items-start gap-3">
                      <span className="w-16 shrink-0 text-[11px] text-gray-500 pt-0.5">배송주기</span>
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] text-black">정기배송 할인</span>
                          <span className="inline-flex items-center px-1.5 py-0.5 border border-solid border-[#E57373] text-[#E57373] text-[10px]">save</span>
                        </div>
                        <div className="text-[11px] text-gray-600">
                          1회 결제 시 : <span className="text-[#E57373]">{Math.round(SUBSCRIPTION_DISCOUNT_RATE * 100)}%({formatPrice(Math.round(totalPrice * SUBSCRIPTION_DISCOUNT_RATE))}) ↓</span>
                        </div>
                        <div className="text-[11px] text-gray-600">
                          3회 결제 시 : <span className="text-[#E57373]">{Math.round(SUBSCRIPTION_DISCOUNT_RATE * 2 * 100)}%({formatPrice(Math.round(totalPrice * SUBSCRIPTION_DISCOUNT_RATE * 2))}) ↓</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 정기배송 선택 시: 상품구성 드롭다운 */}
                  {purchaseType === 'subscription' && (
                    <div className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-[11px] text-gray-500">상품구성</span>
                      <div className="flex-1 min-w-0 relative">
                        <select
                          value={packComposition}
                          onChange={(e) => setPackComposition(e.target.value as PackComposition | '')}
                          className="w-full appearance-none bg-white border border-solid border-gray-300 pl-3 pr-9 py-2.5 text-[12px] cursor-pointer"
                          style={{ color: packComposition ? '#000' : '#888', borderRadius: 0 }}
                        >
                          <option value="">- [필수] 옵션을 선택해 주세요 -</option>
                          {PACK_COMPOSITION_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 가격 + 결제 버튼 */}
              <div className="flex h-[64px] shrink-0 items-center gap-3 border-0 border-t border-solid border-gray-200 bg-white px-4">
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  {totalPrice > 0 && purchaseType === 'once' && (
                    <span className="inline-flex w-fit items-center gap-0.5 px-2 py-0.5 bg-[#E6F0FB] text-[#4A8CCB] text-[10px] rounded-full font-medium whitespace-nowrap">
                      정기배송 시 최대 {Math.round(SUBSCRIPTION_DISCOUNT_RATE * 100)}%({formatPrice(Math.round(totalPrice * SUBSCRIPTION_DISCOUNT_RATE))}) ↓
                    </span>
                  )}
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    {(() => {
                      const finalPrice = purchaseType === 'subscription'
                        ? Math.round(totalPrice * (1 - SUBSCRIPTION_DISCOUNT_RATE))
                        : totalPrice;
                      return (
                        <>
                          <p className="text-[18px] font-bold tracking-tight">{formatPrice(finalPrice)}</p>
                          {totalPrice > 0 && purchaseType === 'subscription' && (
                            <>
                              <span className="text-[11px] text-gray-400 line-through">{formatPrice(totalPrice)}</span>
                              <span className="text-[10px] font-medium text-red-500">{Math.round(SUBSCRIPTION_DISCOUNT_RATE * 100)}%</span>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
                {filledSlots > 0 && purchaseType === 'once' && (
                  <button className="flex h-9 shrink-0 items-center justify-center gap-0.5 bg-[#03C75A] px-3 text-[12px] font-bold text-white transition-colors hover:bg-[#02b351]">
                    <span className="font-black">N</span>Pay
                  </button>
                )}
                {(() => {
                  const subscriptionReady = purchaseType === 'subscription'
                    ? (deliveryCycle !== '' && packComposition !== '')
                    : true;
                  const disabled = filledSlots === 0 || !subscriptionReady;
                  let label: string;
                  if (filledSlots === 0) {
                    label = '식단을 먼저 구성해주세요';
                  } else if (purchaseType === 'subscription' && !subscriptionReady) {
                    label = '정기배송 옵션을 선택해주세요';
                  } else if (purchaseType === 'subscription') {
                    label = '정기배송 신청하기';
                  } else if (filledSlots === totalSlots) {
                    label = '결제하기';
                  } else {
                    label = '구독 시작';
                  }
                  return (
                    <button
                      disabled={disabled}
                      onClick={() => {
                        if (disabled) return;
                        if (purchaseType === 'subscription') {
                          const compLabel = PACK_COMPOSITION_OPTIONS.find(o => o.value === packComposition)?.label;
                          const cycleLabel = DELIVERY_CYCLE_OPTIONS.find(o => o.value === deliveryCycle)?.label;
                          alert(`정기배송 신청 완료\n상품구성: ${compLabel}\n배송주기: ${cycleLabel}`);
                        } else {
                          alert(`${formatPrice(totalPrice)} 결제를 진행합니다.`);
                        }
                      }}
                      className={`h-9 shrink-0 px-4 text-[12px] font-bold transition-all ${
                        disabled
                          ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                          : 'bg-black text-white hover:bg-gray-900'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })()}
              </div>
            </section>
          }
        />
      </div>
    </>
  );
};

export default SubscriptionPage;
