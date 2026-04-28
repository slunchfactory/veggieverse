import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { ChevronUp, ChevronLeft, Calendar, FileText, Sparkles, Share2, Download, UserCircle, Check, X, Link2 } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { VegetableItem } from '../../../types';
import { useUser } from '../../../contexts/UserContext';
import { DietGridSelect } from '../../../components/DietGridSelect';

interface SpiritFinderStepProps {
  headerOffset?: number;
}

// 질문 데이터
interface DietOption {
  label: string;
  description: string;
  value: string;
}

interface DietCategory {
  category: string;
  options: DietOption[];
}

// 첫 번째 질문 (식단)의 카테고리별 옵션
const DIET_CATEGORIES: DietCategory[] = [
  {
    category: '기본 옵션',
    options: [
      { label: '일반', description: '특별히 가리는 거 없어요', value: 'none' },
    ]
  },
  {
    category: '채식 관련',
    options: [
      { label: '비건', description: '동물성은 안 먹어요', value: 'vegan' },
      { label: '락토비건', description: '유제품만 OK', value: 'lacto' },
      { label: '오보', description: '달걀만 OK', value: 'ovo' },
      { label: '락토오보', description: '유제품, 달걀 OK', value: 'lacto-ovo' },
      { label: '플렉시', description: '가끔은 먹어요', value: 'flexitarian' },
      { label: '페스코', description: '생선은 OK', value: 'pescatarian' },
      { label: '폴로', description: '닭고기는 OK', value: 'pollo' },
    ]
  },
  {
    category: '건강/알레르기 관련',
    options: [
      { label: '글루텐 프리', description: '', value: 'gluten-free' },
      { label: '유당 프리', description: '', value: 'lactose-free' },
    ]
  },
  {
    category: '종교/문화적 식단',
    options: [
      { label: '할랄', description: '', value: 'halal' },
      { label: '코셔', description: '', value: 'kosher' },
    ]
  },
];

// 주 식단 옵션 (하나만 선택 가능)
const PRIMARY_DIET_VALUES = ['none', 'vegan', 'lacto', 'ovo', 'lacto-ovo', 'flexitarian', 'pescatarian', 'pollo'];
// 추가 옵션 (다중 선택 가능)
const ADDITIONAL_DIET_VALUES = ['gluten-free', 'lactose-free', 'halal', 'kosher'];

// 상충하는 조합 체크
const checkDietConflict = (selections: string[]): string | null => {
  const hasLactose = selections.includes('lactose-free');
  const hasLacto = selections.includes('lacto') || selections.includes('lacto-ovo');
  
  if (hasLactose && hasLacto) {
    return '⚠️ 락토비건/락토오보는 유제품을 섭취하는데, 유당불내증은 유제품을 피합니다. 조합을 확인해주세요.';
  }
  return null;
};

// 타로 카드 스타일 질문 데이터
const QUESTIONS = [
  {
    id: 1,
    question: '당신의 식단 유형은?',
    options: [
      { label: '만찬', description: '고기, 생선, 채소 가리지 않고 다양하게 즐겨요', value: 'none', tarot: { number: 'I', title: 'The Feast.', image: '/veggieverse/images/tarot/diet-type/feast.png' } },
      { label: '정원', description: '동물성 식품 없이 식물성으로만 먹어요', value: 'vegan', tarot: { number: 'II', title: 'The Garden.', image: '/veggieverse/images/tarot/diet-type/garden.png' } },
      { label: '바다', description: '육류는 안 먹지만 해산물은 먹어요', value: 'pescatarian', tarot: { number: 'III', title: 'The Ocean.', image: '/veggieverse/images/tarot/diet-type/ocean.png' } },
      { label: '새벽', description: '육류는 안 먹지만 가금류는 먹어요', value: 'pollo', tarot: { number: 'IV', title: 'The Dawn.', image: '/veggieverse/images/tarot/diet-type/dawn.png' } },
      { label: '균형', description: '평소엔 채식, 가끔은 유연하게 먹어요', value: 'flexitarian', tarot: { number: 'V', title: 'The Balance.', image: '/veggieverse/images/tarot/diet-type/balance.png' } },
    ]
  },
  {
    id: 2,
    question: '추가 옵션이 있나요?',
    options: [
      { label: '곡물', description: '밀, 보리 등 글루텐을 피해요', value: 'gluten-free', tarot: { number: 'VI', title: 'The Grain.', image: '/veggieverse/images/tarot/diet-option/grain.png' } },
      { label: '은하수', description: '우유, 치즈 등 유제품을 피해요', value: 'lactose-free', tarot: { number: 'VII', title: 'The Milkyway.', image: '/veggieverse/images/tarot/diet-option/milkyway.png' } },
      { label: '없음', description: '추가 옵션 없이 진행해요', value: 'none', tarot: { number: '', title: '없음', image: '/veggieverse/images/tarot/card-back.png' } },
    ]
  },
  {
    id: 3,
    question: '끌리는 요리 무드는?',
    options: [
      { label: '전통', description: '오래 검증된 레시피, 익숙한 맛이 좋아요', value: 'traditional', tarot: { number: 'VIII', title: 'The Heritage.', image: '/veggieverse/images/tarot/food-mood/heritage.png' } },
      { label: '연금술', description: '장르의 경계 없이 섞인 맛이 좋아요', value: 'fusion', tarot: { number: 'IX', title: 'The Alchemy.', image: '/veggieverse/images/tarot/food-mood/alchemy.png' } },
      { label: '고요', description: '재료 본연의 맛, 심플한 구성이 좋아요', value: 'simple', tarot: { number: 'X', title: 'The Silence.', image: '/veggieverse/images/tarot/food-mood/silence.png' } },
      { label: '장인', description: '섬세하고 정교한 스타일이 좋아요', value: 'gourmet', tarot: { number: 'XI', title: 'The Artisan.', image: '/veggieverse/images/tarot/food-mood/artisan.png' } },
    ]
  },
  {
    id: 4,
    question: '요리에서 가장 중요한 건?',
    options: [
      { label: '저울', description: '탄단지, 영양소 균형이 맞아야 해요', value: 'nutrition', tarot: { number: 'XII', title: 'The Scale.', image: '/veggieverse/images/tarot/priority/scale.png' } },
      { label: '혀', description: '뭐니뭐니해도 맛있어야 해요', value: 'taste', tarot: { number: 'XIII', title: 'The Tongue.', image: '/veggieverse/images/tarot/priority/tongue.png' } },
      { label: '바람', description: '빠르고 간편하게 먹을 수 있어야 해요', value: 'convenience', tarot: { number: 'XIV', title: 'The Wind.', image: '/veggieverse/images/tarot/priority/wind.png' } },
      { label: '나침반', description: '새로운 맛을 시도하고 싶어요', value: 'novelty', tarot: { number: 'XV', title: 'The Compass.', image: '/veggieverse/images/tarot/priority/compass.png' } },
    ]
  },
  {
    id: 5,
    question: '식사 시간, 어떤 의미예요?',
    options: [
      { label: '원탁', description: '누군가와 함께 나누는 시간이에요', value: 'family', tarot: { number: 'XVI', title: 'The Table.', image: '/veggieverse/images/tarot/meal-meaning/table.png' } },
      { label: '생명나무', description: '몸과 마음을 돌보는 시간이에요', value: 'health', tarot: { number: 'XVII', title: 'The Tree.', image: '/veggieverse/images/tarot/meal-meaning/tree.png' } },
      { label: '모래시계', description: '빠르게 해결하고 다른 일에 집중해요', value: 'quick', tarot: { number: 'XVIII', title: 'The Hourglass.', image: '/veggieverse/images/tarot/meal-meaning/hourglass.png' } },
      { label: '지도', description: '새로운 맛을 발견하는 탐험이에요', value: 'experience', tarot: { number: 'XIX', title: 'The Map.', image: '/veggieverse/images/tarot/meal-meaning/map.png' } },
    ]
  },
  {
    id: 6,
    question: '평소 식사 패턴은?',
    options: [
      { label: '시계', description: '정해진 시간에 규칙적으로 먹어요', value: 'regular', tarot: { number: 'XX', title: 'The Clock.', image: '/veggieverse/images/tarot/meal-pattern/clock.png' } },
      { label: '새', description: '배고플 때 자유롭게 먹어요', value: 'flexible', tarot: { number: 'XXI', title: 'The Bird.', image: '/veggieverse/images/tarot/meal-pattern/bird.png' } },
      { label: '설계자', description: '일주일 식단을 미리 계획해요', value: 'planned', tarot: { number: 'XXII', title: 'The Architect.', image: '/veggieverse/images/tarot/meal-pattern/architect.png' } },
      { label: '불꽃', description: '그때그때 끌리는 대로 정해요', value: 'spontaneous', tarot: { number: 'XXIII', title: 'The Spark.', image: '/veggieverse/images/tarot/meal-pattern/spark.png' } },
    ]
  },
  {
    id: 7,
    question: '채식을 선택한 이유는?',
    isConditional: true,
    condition: (answers: Record<number, string | string[]>) => {
      const dietAnswer = answers[1];
      return dietAnswer && dietAnswer !== 'none'; // 일반 식단이 아닐 때만 표시
    },
    options: [
      { label: '심장', description: '내 몸의 건강을 위해 선택했어요', value: 'health', tarot: { number: 'XXIV', title: 'The Heart.', image: '/veggieverse/images/tarot/veg-reason/heart.png' } },
      { label: '대지', description: '환경과 지구를 위해 선택했어요', value: 'environment', tarot: { number: 'XXV', title: 'The Earth.', image: '/veggieverse/images/tarot/veg-reason/earth.png' } },
      { label: '숨결', description: '동물의 생명을 위해 선택했어요', value: 'animal', tarot: { number: 'XXVI', title: 'The Breath.', image: '/veggieverse/images/tarot/veg-reason/breath.png' } },
      { label: '문', description: '새로운 도전으로 시작했어요', value: 'curiosity', tarot: { number: 'XXVII', title: 'The Door.', image: '/veggieverse/images/tarot/veg-reason/door.png' } },
    ]
  },
];

// 조건에 맞는 질문만 필터링하는 함수
const getAvailableQuestions = (answers: Record<number, string | string[]>): typeof QUESTIONS => {
  return QUESTIONS.filter((q: any) => {
    if (!q.isConditional) return true;
    if (q.condition) {
      return q.condition(answers);
    }
    return true;
  }) as typeof QUESTIONS;
};

// URL Slug 매핑 (Question ID <-> Slug)
const QUESTION_SLUGS: Record<number, string> = {
  1: 'diet',      // 당신의 식단 유형은?
  2: 'option',    // 추가 옵션이 있나요?
  3: 'mood',      // 끌리는 요리 무드는?
  4: 'priority',  // 요리에서 가장 중요한 건?
  5: 'meaning',   // 식사 시간, 어떤 의미예요?
  6: 'pattern',   // 평소 식사 패턴은?
  7: 'reason',    // 채식을 선택한 이유는?
};

// Slug -> Question ID 역매핑
const SLUG_TO_QUESTION_ID: Record<string, number> = Object.fromEntries(
  Object.entries(QUESTION_SLUGS).map(([id, slug]) => [slug, parseInt(id)])
);

// Slug 배열 (순서대로)
const QUESTION_SLUG_ORDER = ['diet', 'option', 'mood', 'priority', 'meaning', 'pattern', 'reason'];

// public/images/tarot 기준 URL (base 한 번만 붙이기)
const getTarotImageSrc = (imagePath: string): string => {
  const pathWithoutBase = imagePath.replace(/^\/veggieverse\/?/, '').replace(/^\//, '');
  const base = import.meta.env.BASE_URL || '/veggieverse/';
  return base.endsWith('/') ? `${base}${pathWithoutBase}` : `${base}/${pathWithoutBase}`;
};

// 16가지 비건 유형
const VEGAN_TYPES = [
  { mbti: 'ENFP', name: 'Bloomist', emoji: '🌻', description: '새로운 거 시도하고 나누는 거 좋아해요', color: '#F3B562' },
  { mbti: 'INFP', name: 'Mindgrower', emoji: '🌿', description: '내 기준이 확실해요. 조용히 생각 많은 편', color: '#A3C585' },
  { mbti: 'INFJ', name: 'Quiet Root', emoji: '🌱', description: '말보다 행동으로 보여주는 타입이에요', color: '#6A8A6B' },
  { mbti: 'ENFJ', name: 'Lightgiver', emoji: '🌼', description: '주변 사람들 챙기는 거 좋아해요. 리더 기질', color: '#F4C97E' },
  { mbti: 'ENTJ', name: 'Forger', emoji: '🔥', description: '효율 중시. 뭐든 체계적으로 해요', color: '#8B7055' },
  { mbti: 'ESTJ', name: 'Groundtype', emoji: '🥦', description: '원칙대로 하는 게 편해요. 현실적인 편', color: '#BCA97E' },
  { mbti: 'ISTJ', name: 'Planter', emoji: '🌰', description: '계획 세워두는 거 좋아해요. 루틴형', color: '#9E8961' },
  { mbti: 'INTJ', name: 'Strategreen', emoji: '🌲', description: '분석하고 설계하는 게 재밌어요', color: '#5D7264' },
  { mbti: 'ISFP', name: 'Floret', emoji: '🌸', description: '예쁜 거, 감각적인 거 좋아해요', color: '#E6B7C1' },
  { mbti: 'ESFP', name: 'Joybean', emoji: '🍑', description: '재밌는 게 최고예요. 분위기 메이커', color: '#F6A880' },
  { mbti: 'ESFJ', name: 'Careleaf', emoji: '🌺', description: '다 같이 잘 먹어야 해요. 배려형', color: '#F2D68A' },
  { mbti: 'ISFJ', name: 'Nurturer', emoji: '🌾', description: '티 안 내고 챙기는 타입이에요', color: '#D6C6A5' },
  { mbti: 'INTP', name: 'Thinkroot', emoji: '🌴', description: '왜 그런지 알아야 해요. 탐구형', color: '#7F9B8A' },
  { mbti: 'ENTP', name: 'Sparknut', emoji: '🍋', description: '다르게 생각하는 거 좋아해요. 아이디어형', color: '#E8D26E' },
  { mbti: 'ISTP', name: 'Craftbean', emoji: '🫘', description: '직접 만들어봐야 알아요. 실험형', color: '#8D8570' },
  { mbti: 'ESTP', name: 'Wildgrain', emoji: '🌶️', description: '일단 해보는 타입. 현장에서 즐겨요', color: '#C19F7B' },
];

// 스피릿별 맞춤 큐레이션 메시지
const getSpiritCurationMessage = (spiritName: string): string => {
  const messages: Record<string, string> = {
    'Bloomist': '새로운 조합 좋아할 것 같아요',
    'Mindgrower': '깔끔하고 건강한 거 모았어요',
    'Quiet Root': '정성 들어간 레시피예요',
    'Lightgiver': '같이 먹으면 더 좋은 거예요',
    'Forger': '빠르고 효율적인 거 모았어요',
    'Groundtype': '영양 밸런스 좋은 거예요',
    'Planter': '검증된 레시피만 모았어요',
    'Strategreen': '효율 좋은 레시피예요',
    'Floret': '예쁘고 감각적인 거예요',
    'Joybean': '만들면서 재밌는 거예요',
    'Careleaf': '푸짐하게 나눠 먹기 좋아요',
    'Nurturer': '속 편하고 건강한 거예요',
    'Thinkroot': '원리 이해하면 쉬운 거예요',
    'Sparknut': '독특한 조합이에요',
    'Craftbean': '직접 만들기 좋은 거예요',
    'Wildgrain': '일단 해보기 좋은 거예요',
  };
  
  return messages[spiritName] || `${spiritName}에게 어울리는 레시피 모아봤어요.`;
};

// 몬스터 이름 생성 함수
const generateMonsterName = (items: VegetableItem[]): string => {
  if (items.length === 0) return 'Veggie Monster';
  
  // 선택한 야채 이름들을 조합해서 몬스터 이름 생성
  const names = items.map(item => item.name);
  const prefixes = ['Mighty', 'Ancient', 'Mystic', 'Cosmic', 'Wild', 'Sacred', 'Primal'];
  const suffixes = ['Guardian', 'Spirit', 'Beast', 'Titan', 'Golem', 'Dragon', 'Phoenix'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  // 야채 이름들의 첫 글자를 조합
  const veggiePart = names.map(n => n.slice(0, 3)).join('');
  
  return `${prefix} ${veggiePart}${suffix}`;
};

// 몬스터 설명 생성 함수
const generateMonsterDescription = (items: VegetableItem[]): string => {
  if (items.length === 0) return '';
  
  const names = items.map(item => item.name).join(', ');
  const descriptions = [
    `${names}의 힘을 흡수하여 탄생한 신비로운 채소 정령입니다.`,
    `${names}가 융합되어 만들어진 강력한 비건 수호자입니다.`,
    `${names}의 에센스가 결합된 자연의 화신입니다.`,
    `${names}의 영혼이 깃든 채소계의 전설적인 존재입니다.`,
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// 잔잔한 전문가 톤의 성격 설명 생성 (이솝 스타일) - 유형 연동 + 랜덤 + 볼륨 확대
interface PersonalityDescription {
  text: string;
}

// 랜덤 선택 헬퍼
const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generatePersonalityDescription = (
  answers: Record<number, string | string[]>, 
  veganType: { mbti: string; name: string; description: string }
): PersonalityDescription => {
  const dietSelections = Array.isArray(answers[1]) ? answers[1] : (answers[1] ? [answers[1]] : []);
  const primaryDiet = dietSelections.find(v => PRIMARY_DIET_VALUES.includes(v)) || 'none';
  const cookingStyle = (answers[2] as string) || '';
  const priority = (answers[3] as string) || '';
  const mealTime = (answers[4] as string) || '';
  const motivation = (answers[5] as string) || '';
  
  // 유형별 핵심 특성 문장 (랜덤)
  const typeIntros: Record<string, string[]> = {
    'ENFP': [
      '늘 새로운 것에 마음이 끌리고, 그 설렘을 주변과 나누고 싶어하는 분입니다.',
      '호기심 가득한 눈으로 세상을 바라보며, 발견의 기쁨을 함께 나누는 것을 좋아합니다.',
      '에너지 넘치는 탐험가의 마음으로 매일의 식탁을 새롭게 채워가는 분입니다.',
    ],
    'INFP': [
      '조용히 자신만의 가치를 지키며, 깊은 생각 속에서 의미를 찾아가는 분입니다.',
      '내면의 신념을 소중히 여기며, 작은 선택에도 진심을 담는 사려 깊은 분입니다.',
      '감성적인 시선으로 일상을 바라보며, 자신만의 철학을 조용히 실천합니다.',
    ],
    'INFJ': [
      '깊은 통찰력으로 본질을 꿰뚫어 보며, 묵묵히 자신의 길을 걸어가는 분입니다.',
      '겉으로 드러나지 않지만 단단한 신념을 품고, 의미 있는 삶을 추구합니다.',
      '조용한 확신 속에서 자신만의 가치를 천천히 뿌리내리는 분입니다.',
    ],
    'ENFJ': [
      '따뜻한 마음으로 주변을 보살피며, 함께하는 순간을 소중히 여기는 분입니다.',
      '사람들에게 좋은 영향을 주고 싶어하며, 나눔의 기쁨을 아는 분입니다.',
      '밝은 에너지로 주변을 환하게 만들며, 모두가 행복한 식탁을 꿈꿉니다.',
    ],
    'ENTJ': [
      '명확한 목표를 향해 나아가며, 효율적인 방식을 추구하는 분입니다.',
      '체계적인 사고로 최선의 결과를 이끌어내는 것을 좋아합니다.',
      '뚜렷한 비전을 가지고 자신만의 길을 개척해 나가는 분입니다.',
    ],
    'ESTJ': [
      '현실적인 시선으로 일상을 관리하며, 명확한 기준을 중요하게 생각합니다.',
      '책임감 있게 자신의 역할을 수행하며, 안정적인 일상을 만들어갑니다.',
      '실용적인 접근으로 효과적인 결과를 만들어내는 것을 선호합니다.',
    ],
    'ISTJ': [
      '꾸준함의 가치를 알고, 묵묵히 자신만의 루틴을 지켜가는 분입니다.',
      '신뢰할 수 있는 방식을 선호하며, 검증된 길 위에서 안정감을 느낍니다.',
      '계획적인 일상 속에서 편안함을 찾으며, 작은 성취를 쌓아가는 분입니다.',
    ],
    'INTJ': [
      '깊은 사고와 분석을 바탕으로, 장기적인 관점에서 선택을 내리는 분입니다.',
      '효율성과 논리를 중시하며, 지속 가능한 방향을 모색합니다.',
      '데이터와 근거를 토대로 최적의 답을 찾아가는 전략적인 분입니다.',
    ],
    'ISFP': [
      '섬세한 감각으로 아름다움을 포착하며, 일상에서 예술을 발견하는 분입니다.',
      '조용히 자신만의 미학을 추구하며, 감성적인 경험을 소중히 여깁니다.',
      '오감으로 세상을 느끼며, 작은 것에서 큰 기쁨을 찾는 분입니다.',
    ],
    'ESFP': [
      '순간의 즐거움을 만끽하며, 삶의 활력을 주변과 나누는 분입니다.',
      '유쾌한 에너지로 일상을 밝히며, 맛있는 순간을 함께 즐기고 싶어합니다.',
      '지금 이 순간을 충분히 누리며, 기쁨을 나누는 것을 좋아합니다.',
    ],
    'ESFJ': [
      '주변 사람들의 안녕을 살피며, 따뜻한 돌봄을 실천하는 분입니다.',
      '함께하는 식탁의 가치를 알고, 조화로운 분위기를 만들어갑니다.',
      '배려심 깊은 마음으로 주변을 챙기며, 공동체의 행복을 생각합니다.',
    ],
    'ISFJ': [
      '조용히 곁을 지키며, 세심한 배려로 주변을 편안하게 만드는 분입니다.',
      '묵묵히 자신의 자리에서 최선을 다하며, 소중한 것들을 지켜갑니다.',
      '따뜻한 마음을 담아 작은 정성을 실천하는 분입니다.',
    ],
    'INTP': [
      '끊임없이 질문하고 탐구하며, 원리를 이해하는 것을 좋아하는 분입니다.',
      '논리적인 사고로 현상의 본질을 파악하고, 깊이 있는 이해를 추구합니다.',
      '지적 호기심을 따라 새로운 지식의 세계를 탐험하는 분입니다.',
    ],
    'ENTP': [
      '기존의 틀을 넘어 새로운 가능성을 모색하며, 창의적인 발상을 즐깁니다.',
      '다양한 관점에서 문제를 바라보며, 색다른 해결책을 찾아내는 분입니다.',
      '고정관념에 얽매이지 않고, 자유로운 사고로 새로움을 추구합니다.',
    ],
    'ISTP': [
      '직접 손으로 만들고 경험하며, 실질적인 결과를 중시하는 분입니다.',
      '차분하게 상황을 관찰하고, 필요한 순간에 정확히 행동하는 분입니다.',
      '실용적인 기술과 감각으로 자신만의 방식을 구현해 나갑니다.',
    ],
    'ESTP': [
      '현장에서 직접 부딪히며, 생생한 경험을 통해 배워가는 분입니다.',
      '즉흥적인 순간을 즐기며, 새로운 도전을 두려워하지 않습니다.',
      '활동적인 에너지로 다양한 경험을 쌓아가는 모험가입니다.',
    ],
  };
  
  // 식단 기반 문장 (랜덤)
  const dietTexts: Record<string, string[]> = {
    'vegan': [
      '식물이 주는 순수한 생명력을 온전히 받아들이며, 자연과 하나 되는 식탁을 추구합니다.',
      '동물성 식품 없이도 풍요롭고 다채로운 맛의 세계를 탐험합니다.',
      '식물의 힘만으로 완성되는 건강한 식탁의 가능성을 믿습니다.',
    ],
    'lacto': [
      '부드러운 유제품의 풍미를 곁들여, 식물성 식단에 깊이를 더합니다.',
      '크리미한 질감과 식물의 신선함이 어우러진 균형 잡힌 식탁을 꾸려갑니다.',
      '유제품이 선사하는 부드러움과 채소의 생기를 조화롭게 즐깁니다.',
    ],
    'ovo': [
      '달걀이 가진 고소한 풍미를 활용해, 식물성 식단을 더욱 풍성하게 만듭니다.',
      '단백질이 풍부한 달걀과 신선한 채소의 조합으로 영양 균형을 맞춥니다.',
      '달걀의 다양한 변신과 함께 채식의 즐거움을 누립니다.',
    ],
    'lacto-ovo': [
      '유제품과 달걀을 포함한 유연한 채식으로, 실천 가능한 균형을 찾아갑니다.',
      '다양한 재료의 조합을 통해 채식의 문턱을 낮추고 즐거움을 높입니다.',
      '현실적이면서도 의미 있는 선택으로 자신만의 채식 여정을 걸어갑니다.',
    ],
    'flexitarian': [
      '유연한 시선으로 식탁을 바라보며, 상황에 맞는 현명한 선택을 합니다.',
      '완벽하지 않아도 괜찮다는 것을 알기에, 자신만의 속도로 나아갑니다.',
      '때로는 가볍게, 때로는 풍성하게. 균형의 미학을 실천합니다.',
    ],
    'pescatarian': [
      '바다가 품은 신선함을 즐기며, 육지의 채소와 조화로운 식탁을 완성합니다.',
      '해산물의 담백한 맛과 채소의 싱그러움이 어우러진 식단을 선호합니다.',
      '오메가가 풍부한 생선과 다채로운 채소로 건강한 지중해식 식탁을 지향합니다.',
    ],
    'pollo': [
      '담백한 가금류와 신선한 채소의 조합으로 균형 잡힌 식탁을 추구합니다.',
      '붉은 고기 대신 가벼운 선택을 선호하며, 자신만의 기준을 세워갑니다.',
      '건강과 맛 사이에서 적절한 균형점을 찾아 실천합니다.',
    ],
    'none': [
      '열린 마음으로 다양한 맛의 세계를 받아들이며, 음식 앞에서 자유로움을 누립니다.',
      '특별한 제한 없이 세상의 모든 맛을 경험하는 것을 즐깁니다.',
      '편견 없는 시선으로 각 재료가 가진 고유의 가치를 음미합니다.',
    ],
  };
  
  // 요리 스타일 + 우선순위 기반 문장 (랜덤)
  const styleAndPriorityTexts: Record<string, Record<string, string[]>> = {
    'traditional': {
      'nutrition': [
        '오랜 시간 검증된 조리법에서 신뢰를 느끼며, 영양학적 균형을 섬세하게 고려합니다.',
        '전통이 담긴 레시피를 따르되, 현대적인 영양 지식을 더해 완성도를 높입니다.',
      ],
      'taste': [
        '세월이 증명한 맛의 공식을 존중하며, 입 안에 퍼지는 익숙한 풍미에서 행복을 찾습니다.',
        '전통 레시피가 주는 깊은 맛을 소중히 여기며, 그 정통성을 지켜갑니다.',
      ],
      'convenience': [
        '검증된 방식의 효율성을 알기에, 번거로움 없이 안정적인 결과를 만들어냅니다.',
        '익숙한 조리법으로 시간을 아끼면서도 만족스러운 식탁을 완성합니다.',
      ],
      'novelty': [
        '전통을 기반으로 하되, 새로운 재료나 변형을 시도하는 것을 두려워하지 않습니다.',
        '클래식한 베이스 위에 자신만의 해석을 더하는 것을 즐깁니다.',
      ],
    },
    'fusion': {
      'nutrition': [
        '다양한 문화의 조합에서 영감을 얻으며, 영양적으로도 완벽한 밸런스를 추구합니다.',
        '동서양의 지혜를 융합해 건강하면서도 흥미로운 식탁을 만들어갑니다.',
      ],
      'taste': [
        '경계를 넘나드는 맛의 조합에서 새로운 즐거움을 발견합니다.',
        '예상치 못한 재료의 만남이 만들어내는 하모니를 탐구합니다.',
      ],
      'convenience': [
        '다양한 문화의 간편 요리법을 조합해 효율적이면서도 특별한 한 끼를 완성합니다.',
        '퓨전의 자유로움 속에서 빠르고 맛있는 해답을 찾아냅니다.',
      ],
      'novelty': [
        '익숙한 것들의 새로운 조합을 통해 매번 다른 경험을 추구합니다.',
        '창의적인 실험을 즐기며, 나만의 시그니처 레시피를 만들어갑니다.',
      ],
    },
    'simple': {
      'nutrition': [
        '최소한의 재료로 최대한의 영양을 이끌어내는 미니멀한 접근을 선호합니다.',
        '단순함 속에서 본질적인 영양 가치를 놓치지 않습니다.',
      ],
      'taste': [
        '재료 본연의 맛을 살리는 담백한 조리법을 추구합니다.',
        '복잡하지 않아도 충분히 맛있을 수 있다는 것을 알고 있습니다.',
      ],
      'convenience': [
        '간결한 조리 과정을 통해 시간과 에너지를 효율적으로 사용합니다.',
        '단순하지만 완성도 있는 한 끼의 가치를 알고 있습니다.',
      ],
      'novelty': [
        '적은 재료로도 새로운 조합을 시도하며 창의성을 발휘합니다.',
        '미니멀한 접근 속에서도 늘 새로운 가능성을 모색합니다.',
      ],
    },
    'gourmet': {
      'nutrition': [
        '정교한 조리법과 영양학적 지식을 결합해 완벽에 가까운 식탁을 추구합니다.',
        '세련된 플레이팅 뒤에는 치밀하게 계산된 영양 밸런스가 있습니다.',
      ],
      'taste': [
        '섬세한 풍미의 층위를 쌓아가며, 미식의 정점을 향해 나아갑니다.',
        '요리를 예술의 경지로 끌어올리며, 깊고 복합적인 맛을 추구합니다.',
      ],
      'convenience': [
        '효율적인 동선 안에서도 퀄리티를 포기하지 않는 현명함을 지녔습니다.',
        '시간이 부족해도 디테일을 놓치지 않는 안목이 있습니다.',
      ],
      'novelty': [
        '파인 다이닝의 트렌드를 집에서 재현하며, 새로운 기법을 익히는 것을 즐깁니다.',
        '끊임없이 진화하는 미식의 세계에서 영감을 받습니다.',
      ],
    },
  };
  
  // 클로징 문장 (동기 + 식사 시간 기반, 랜덤)
  const closingTexts: Record<string, Record<string, string[]>> = {
    'health': {
      'family': [
        '사랑하는 이들과 건강한 식탁을 나누며, 함께하는 시간의 소중함을 알고 있습니다. 당신의 선택 하나하나가 가족의 내일을 더 밝게 만듭니다.',
        '건강한 음식을 함께 나누는 것이야말로 가장 따뜻한 사랑의 표현임을 믿습니다.',
      ],
      'health': [
        '매 끼니를 자신을 위한 다정한 돌봄으로 여기며, 오늘의 선택이 내일의 활력이 됨을 알고 있습니다.',
        '건강한 식습관은 가장 확실한 자기 투자라는 것을 깊이 이해하고 계십니다.',
      ],
      'quick': [
        '바쁜 일상 속에서도 건강을 놓치지 않는 현명함을 지녔습니다. 효율과 웰빙, 두 마리 토끼를 모두 잡는 분입니다.',
        '시간은 아끼되 건강은 양보하지 않는, 영리한 선택을 하는 분입니다.',
      ],
      'experience': [
        '새로운 건강식을 탐험하며, 맛있으면서도 몸에 좋은 것들을 발굴하는 즐거움을 알고 있습니다.',
        '건강한 미식의 세계를 개척하며, 웰빙과 즐거움이 공존할 수 있음을 증명합니다.',
      ],
    },
    'environment': {
      'family': [
        '다음 세대에게 물려줄 지구를 생각하며, 식탁에서부터 작은 실천을 시작합니다. 가족과 함께 나누는 친환경 식탁이 더 나은 미래의 씨앗이 됩니다.',
        '사랑하는 이들과 함께 지속 가능한 식탁을 만들어가며, 환경을 생각하는 가치를 나눕니다.',
      ],
      'health': [
        '건강한 지구가 건강한 나를 만든다는 것을 알기에, 환경과 웰빙을 함께 고려합니다.',
        '자연이 건강해야 우리도 건강할 수 있다는 연결고리를 이해하는 분입니다.',
      ],
      'quick': [
        '바쁜 와중에도 환경을 생각하는 선택을 포기하지 않습니다. 작은 실천의 힘을 믿습니다.',
        '효율적인 방식으로 지속 가능한 식생활을 실천하는 현명함을 지녔습니다.',
      ],
      'experience': [
        '친환경 식재료의 새로운 맛을 탐험하며, 지구를 위한 선택이 즐거울 수 있음을 보여줍니다.',
        '지속 가능한 미식의 가능성을 탐구하며, 새로운 길을 개척합니다.',
      ],
    },
    'animal': {
      'family': [
        '모든 생명을 존중하는 마음을 가족과 함께 나누며, 따뜻한 식탁 문화를 만들어갑니다.',
        '생명에 대한 사랑을 식탁에서부터 실천하며, 그 가치를 다음 세대에 전합니다.',
      ],
      'health': [
        '생명을 해치지 않으면서도 건강하게 살 수 있다는 것을 몸소 증명합니다.',
        '동물과 공존하며 건강도 챙기는, 균형 잡힌 삶을 살아갑니다.',
      ],
      'quick': [
        '바쁜 일상에서도 자신의 신념을 지키며, 간편하면서도 윤리적인 선택을 합니다.',
        '효율성을 추구하면서도 생명 존중의 가치는 결코 타협하지 않습니다.',
      ],
      'experience': [
        '비건 미식의 새로운 지평을 열며, 동물 없이도 풍요로운 식탁이 가능함을 탐구합니다.',
        '생명을 존중하는 마음으로 새로운 맛의 세계를 개척해 나갑니다.',
      ],
    },
    'curiosity': {
      'family': [
        '새로운 맛의 발견을 사랑하는 이들과 함께 나누며, 식탁을 모험의 공간으로 만듭니다.',
        '호기심 가득한 시선으로 가족과 함께 미식의 세계를 탐험합니다.',
      ],
      'health': [
        '건강에 좋은 새로운 식재료를 발굴하는 즐거움을 알고 있습니다. 탐험과 웰빙이 만나는 지점을 찾습니다.',
        '몸에 좋은 것들 중에서도 새롭고 흥미로운 것을 찾아 나서는 탐험가입니다.',
      ],
      'quick': [
        '빠르게 변화하는 푸드 트렌드를 따라가며, 새로운 것을 효율적으로 시도합니다.',
        '호기심과 효율성을 모두 갖춘, 스마트한 미식가입니다.',
      ],
      'experience': [
        '끝없는 호기심으로 미식의 세계를 탐험하며, 매 순간 새로운 발견에 설렙니다. 당신의 식탁은 늘 열려 있는 모험의 문입니다.',
        '새로운 맛을 향한 여정에서 끊임없이 영감을 받으며, 매일이 새로운 발견입니다.',
      ],
    },
  };
  
  // 문장 조합
  const typeIntro = pickRandom(typeIntros[veganType.mbti] || typeIntros['ENFP']);
  const dietText = pickRandom(dietTexts[primaryDiet] || dietTexts['none']);
  const styleAndPriority = pickRandom(
    styleAndPriorityTexts[cookingStyle]?.[priority] || 
    styleAndPriorityTexts['simple']?.['taste'] || 
    ['자신만의 방식으로 맛있는 한 끼를 완성해 나갑니다.']
  );
  const closing = pickRandom(
    closingTexts[motivation]?.[mealTime] || 
    closingTexts['curiosity']?.['experience'] || 
    ['당신의 식탁은 늘 새로운 이야기로 가득합니다.']
  );
  
  return {
    text: `${typeIntro}\n\n${dietText} ${styleAndPriority}\n\n${closing}`
  };
};

const SpiritFinderStep: React.FC<SpiritFinderStepProps> = ({ headerOffset = 96 }) => {
  const navigate = useNavigate();
  const { stepId } = useParams<{ stepId: string }>();
  const location = useLocation();
  const { login, user } = useUser();

  // 현재 경로가 결과 페이지인지 확인
  const isResultPage = location.pathname.includes('/spirit/result');

  // localStorage에서 선택된 아이템 읽기
  const [selectedItems, setSelectedItems] = useState<VegetableItem[]>(() => {
    try {
      const saved = localStorage.getItem('spirit-finder-selected-items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('Failed to load selected items:', e);
      }
    }
    return [];
  });

  // 프로필 저장 함수
  const onSaveProfile = useCallback((profileImage: string, veganType: string) => {
    const profile = {
      profileImage,
      veganType,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('veggieverse-profile', JSON.stringify(profile));
  }, []);

  const [started, setStarted] = useState(true);

  // localStorage에서 답변 읽기 (URL 기반 네비게이션을 위한 persistence)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>(() => {
    try {
      const saved = localStorage.getItem('spirit-finder-answers');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('Failed to load answers:', e);
      }
    }
    return {};
  });

  // 답변이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('spirit-finder-answers', JSON.stringify(answers));
    }
  }, [answers]);

  // 조건에 맞는 질문만 필터링 (answers에 의존)
  const availableQuestions = useMemo(() => {
    return getAvailableQuestions(answers);
  }, [answers]);

  // URL의 stepId로부터 현재 단계(currentStep) 계산
  const currentStep = useMemo(() => {
    // Legacy route (/spirit/step) 또는 stepId가 없는 경우 첫 번째 질문
    if (!stepId || location.pathname === '/spirit/step') {
      return 0;
    }

    // stepId를 question ID로 변환
    const questionId = SLUG_TO_QUESTION_ID[stepId];
    if (!questionId) {
      return 0; // 유효하지 않은 slug면 첫 번째 질문
    }

    // availableQuestions에서 해당 질문의 인덱스 찾기
    const index = availableQuestions.findIndex(q => q.id === questionId);
    return index >= 0 ? index : 0;
  }, [stepId, availableQuestions, location.pathname]);

  // showResult 상태를 URL로부터 파생
  const showResult = isResultPage;

  const [dietConflictWarning, setDietConflictWarning] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [shareCardPreview, setShareCardPreview] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [showRecipeCurationModal, setShowRecipeCurationModal] = useState(false);
  
  // AI 몬스터 이미지 관련 상태
  const [monsterImageUrl, setMonsterImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [monsterName, setMonsterName] = useState('');
  const [monsterDescription, setMonsterDescription] = useState('');

  // 타로 카드 호버 상태
  const [hoveredCard, setHoveredCard] = useState<{ label: string; description: string } | null>(null);

  // 현재 세션에서 사용자가 직접 상호작용한 질문 추적 (localStorage 복원 시 테두리 미표시)
  const [interactedQuestions, setInteractedQuestions] = useState<Set<number>>(new Set());

  const scrollToTop = () => {
    navigate('/spirit');
  };
  
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleOptionSelect = (questionId: number, value: string) => {
    const question = QUESTIONS.find(q => q.id === questionId);

    // 현재 세션에서 상호작용한 질문으로 표시
    setInteractedQuestions(prev => new Set(prev).add(questionId));

    if ((question as any)?.isMultiple) {
      // 다중 선택 가능한 질문
      setAnswers(prev => {
        const currentSelections = Array.isArray(prev[questionId]) ? prev[questionId] as string[] : [];
        if (currentSelections.includes(value)) {
          // 이미 선택된 경우 해제
          return { ...prev, [questionId]: currentSelections.filter(v => v !== value) };
        } else {
          // 새로 선택
          return { ...prev, [questionId]: [...currentSelections, value] };
        }
      });
    } else {
      // 단일 선택 질문
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleDietSelect = (value: string) => {
    setInteractedQuestions(prev => new Set(prev).add(1));
    setAnswers(prev => {
      const currentSelections = Array.isArray(prev[1]) ? prev[1] : (prev[1] ? [prev[1]] : []);
      let newSelections: string[];

      if (PRIMARY_DIET_VALUES.includes(value)) {
        // 주 식단은 하나만 선택 가능 (기존 주 식단 대체)
        const additionalOnly = currentSelections.filter(v => ADDITIONAL_DIET_VALUES.includes(v));
        if (currentSelections.includes(value)) {
          // 이미 선택된 주 식단 클릭 시 해제
          newSelections = additionalOnly;
        } else {
          newSelections = [value, ...additionalOnly];
        }
      } else {
        // 추가 옵션은 토글 방식
        if (currentSelections.includes(value)) {
          newSelections = currentSelections.filter(v => v !== value);
        } else {
          newSelections = [...currentSelections, value];
        }
      }

      // 상충 체크
      const conflict = checkDietConflict(newSelections);
      setDietConflictWarning(conflict);

      return { ...prev, [1]: newSelections };
    });
  };

  // DietCardSwipe 완료 핸들러
  const handleDietCardComplete = (result: { primaryDiet: string | null; additionalRestrictions: string[] }) => {
    const dietSelections = [
      result.primaryDiet,
      ...result.additionalRestrictions
    ].filter(Boolean) as string[];

    setInteractedQuestions(prev => new Set(prev).add(1));
    setAnswers(prev => ({ ...prev, [1]: dietSelections }));
    // 다음 질문으로 URL 이동
    const nextQuestion = availableQuestions[1];
    if (nextQuestion) {
      const nextSlug = QUESTION_SLUGS[nextQuestion.id];
      navigate(`/spirit/question/${nextSlug}`);
    }
  };

  // 식단 선택 여부 확인 헬퍼
  const isDietSelected = (value: string): boolean => {
    const selections = answers[1];
    if (Array.isArray(selections)) {
      return selections.includes(value);
    }
    return selections === value;
  };

  // 주 식단이 선택되었는지 확인
  const hasPrimaryDiet = (): boolean => {
    const selections = answers[1];
    if (Array.isArray(selections)) {
      return selections.some(v => PRIMARY_DIET_VALUES.includes(v));
    }
    return PRIMARY_DIET_VALUES.includes(selections as string);
  };

  // URL 기반 다음 질문으로 이동
  const handleNext = () => {
    if (currentStep < availableQuestions.length - 1) {
      // 다음 질문의 slug를 찾아서 navigate
      const nextQuestion = availableQuestions[currentStep + 1];
      const nextSlug = QUESTION_SLUGS[nextQuestion.id];
      navigate(`/spirit/question/${nextSlug}`);
    } else {
      // 마지막 질문 완료 시 결과 페이지로
      navigate('/spirit/result');
    }
  };

  // URL 기반 이전 질문으로 이동 (브라우저 뒤로가기 지원)
  const handleBack = () => {
    if (currentStep > 0) {
      // 이전 질문의 slug를 찾아서 navigate
      const prevQuestion = availableQuestions[currentStep - 1];
      const prevSlug = QUESTION_SLUGS[prevQuestion.id];
      navigate(`/spirit/question/${prevSlug}`);
    } else {
      // 첫 번째 질문일 때는 인트로 페이지로 이동
      navigate('/spirit');
    }
  };

  // 몬스터 생성 함수 (나중에 API 연동)
  const generateMonster = async () => {
    try {
      setIsGeneratingImage(true);
      setMonsterName(generateMonsterName(selectedItems));
      setMonsterDescription(generateMonsterDescription(selectedItems));
    
    // 이미지 생성 시뮬레이션
    // TODO: 실제 API 연동 시 아래 코드로 대체
    // const veggieNames = selectedItems.map(item => item.name);
    // const response = await fetch('http://localhost:YOUR_PORT/generate-monster', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ vegetables: veggieNames })
    // });
    // const data = await response.json();
    // setMonsterImageUrl(data.imageUrl);
    // setIsGeneratingImage(false);
    
      setTimeout(() => {
        // 현재는 시뮬레이션: 2초 후 플레이스홀더 표시
        setMonsterImageUrl(null); // null이면 플레이스홀더 표시
        setIsGeneratingImage(false);
      }, 2000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error generating monster:', error);
      }
      setIsGeneratingImage(false);
      setMonsterImageUrl(null);
    }
  };

  // 이미지 재생성 함수
  const regenerateMonster = () => {
    generateMonster();
  };

  // 네이티브 공유 함수 (모바일용)
  const handleNativeShare = async () => {
    if (!result) return;
    
    try {
      const cardImageUrl = await generateShareCard(result);
      const response = await fetch(cardImageUrl);
      const blob = await response.blob();
      const file = new File([blob], `테이스트스피릿-${result.name}.png`, { type: 'image/png' });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `나의 테이스트 스피릿: ${result.name}`,
          text: `${result.name} - ${result.description}`,
          files: [file],
        });
      } else {
        await navigator.share({
          title: `나의 테이스트 스피릿: ${result.name}`,
          text: `${result.name} - ${result.description}`,
          url: window.location.href,
        });
      }
      
      URL.revokeObjectURL(cardImageUrl);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('공유 실패:', error);
        }
      // 실패 시 모달 표시
      setShowShareModal(true);
    }
  };

  // 공유용 카드 이미지 생성 함수
  const generateShareCard = useCallback(async (spiritResult: { name: string; description: string; mbti: string; emoji: string; color: string } | null): Promise<string> => {
    if (!spiritResult) {
      throw new Error('Result not available');
    }
    
    const currentMonsterImageUrl = monsterImageUrl; // 클로저로 캡처
    
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // 카드 크기 (SNS 공유 최적화: 1200x630)
      const width = 1200;
      const height = 630;
      canvas.width = width;
      canvas.height = height;

      // 배경 그라데이션
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f0fdf4');
      gradient.addColorStop(0.5, '#fefce8');
      gradient.addColorStop(1, '#fef3c7');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 스피릿 이미지 영역 (왼쪽)
      const imageSize = 400;
      const imageX = 100;
      const imageY = (height - imageSize) / 2;

      // 이미지 로드 및 그리기
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      };

      const drawCard = async () => {
        try {
          // 스피릿 이미지 (또는 플레이스홀더)
          if (currentMonsterImageUrl) {
            try {
              const img = await loadImage(currentMonsterImageUrl);
              ctx.drawImage(img, imageX, imageY, imageSize, imageSize);
            } catch (e) {
              // 이미지 로드 실패 시 플레이스홀더
              ctx.fillStyle = '#d1fae5';
              ctx.fillRect(imageX, imageY, imageSize, imageSize);
              ctx.fillStyle = '#10b981';
              ctx.font = 'bold 80px Arial';
              ctx.textAlign = 'center';
              ctx.fillText('🌱', imageX + imageSize / 2, imageY + imageSize / 2 + 30);
            }
          } else {
            // 플레이스홀더
            ctx.fillStyle = '#d1fae5';
            ctx.fillRect(imageX, imageY, imageSize, imageSize);
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 80px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🌱', imageX + imageSize / 2, imageY + imageSize / 2 + 30);
          }

          // 텍스트 영역 (오른쪽)
          const textX = imageX + imageSize + 80;
          const textY = height / 2;
          const maxTextWidth = width - textX - 100;

          // 스피릿 이름
          ctx.fillStyle = '#1c1917';
          ctx.font = 'bold 64px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(spiritResult.name, textX, textY - 100);

          // 설명
          ctx.fillStyle = '#78716c';
          ctx.font = '32px Arial';
          ctx.fillText(spiritResult.description, textX, textY - 20);

          // 해시태그
          ctx.fillStyle = '#57534e';
          ctx.font = '24px Arial';
          ctx.fillText('#슬런치 #테이스트스피릿', textX, textY + 60);

          // Canvas를 이미지로 변환
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error('Failed to create blob'));
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };

      drawCard();
    });
  }, [monsterImageUrl, selectedItems]);

  // 결과 계산 (간단한 로직)
  const calculateResult = useCallback(() => {
    try {
      // 답변이 없거나 비어있으면 기본값 반환
      if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
        return VEGAN_TYPES[0];
      }
      
      // 답변 기반으로 MBTI 유사 계산
      let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;
      
      // 식단 선호도 (배열 형태 지원)
      const dietSelections = Array.isArray(answers[1]) ? answers[1] : (answers[1] ? [answers[1]] : []);
      const primaryDiet = dietSelections.find(v => PRIMARY_DIET_VALUES.includes(v)) || 'none';
      
      if (primaryDiet === 'vegan' || primaryDiet === 'lacto' || primaryDiet === 'ovo' || primaryDiet === 'lacto-ovo') { i++; j++; }
      else if (primaryDiet === 'flexitarian' || primaryDiet === 'pescatarian' || primaryDiet === 'pollo') { e++; p++; }
      else { e++; p++; }
      
      // 추가 옵션 반영
      if (dietSelections.includes('halal') || dietSelections.includes('kosher')) { s++; j++; }
      if (dietSelections.includes('gluten-free') || dietSelections.includes('lactose-free')) { t++; i++; }
      
      // 요리 스타일
      if (answers[2] === 'traditional' || answers[2] === 'simple') { s++; j++; }
      else if (answers[2]) { n++; p++; }
      
      // 요리 시 중요한 것
      if (answers[3] === 'nutrition' || answers[3] === 'convenience') { t++; }
      else if (answers[3]) { f++; }
      
      // 식사 시간
      if (answers[4] === 'family' || answers[4] === 'experience') { f++; e++; }
      else if (answers[4]) { t++; i++; }
      
      // 비건 이유
      if (answers[5] === 'health' || answers[5] === 'environment') { t++; j++; }
      else if (answers[5]) { f++; p++; }
      
      // 식사 패턴 (질문6 - 일반 식단 선택자만)
      if (answers[6]) {
        switch (answers[6]) {
          case 'regular':    // 규칙적
            j++; s++;
            break;
          case 'flexible':   // 자유로움
            p++; f++;
            break;
          case 'planned':    // 계획형
            j++; t++;
            break;
          case 'spontaneous': // 즉흥형
            p++; n++;
            break;
        }
      }
      
      const mbti = `${e >= i ? 'E' : 'I'}${n >= s ? 'N' : 'S'}${f >= t ? 'F' : 'T'}${p >= j ? 'P' : 'J'}`;
      
      const result = VEGAN_TYPES.find(type => type.mbti === mbti) || VEGAN_TYPES[0];
      
      return result;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error calculating result:', error);
      }
      return VEGAN_TYPES[0]; // 기본값 반환
    }
  }, [answers]);

  // 결과 계산 (항상 실행, showResult가 false면 null 반환)
  // ⚠️ 중요: 모든 hooks는 조건부 return 이전에 호출되어야 함
  const result = useMemo(() => {
    if (!showResult) return null;
    try {
      return calculateResult();
    } catch (error) {
      console.error('Error calculating result:', error);
      return VEGAN_TYPES[0];
    }
  }, [showResult, calculateResult]);

  // 컴포넌트 마운트 시 몬스터 생성 시작
  useEffect(() => {
    if (selectedItems.length > 0) {
      generateMonster();
    }
  }, []); // 마운트 시 한 번만 실행

  // 결과 표시 시 자동 로그인
  useEffect(() => {
    if (showResult && result && !user) {
      // 유저명 생성 (스피릿 이름 기반)
      const username = `${result.name}${Math.floor(Math.random() * 1000)}`;
      login(username, result.mbti, result.name);
    }
  }, [showResult, result, user, login]);
  
  const personalityDescription = useMemo(() => {
    if (!showResult || !result) return null;
    try {
      return generatePersonalityDescription(answers, result);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error generating personality description:', error);
      }
      return { text: '결과를 생성하는 중 오류가 발생했습니다.' };
    }
  }, [showResult, result, answers]);

  // 공유 모달이 열릴 때 기본 멘트와 카드 이미지 생성
  useEffect(() => {
    if (showShareModal && result) {
      // 기본 공유 멘트 생성
      const defaultMessage = `나의 테이스트 스피릿은 ${result.name}

${result.description}

너도 해봐 → ${window.location.href}

#테이스트스피릿 #슬런치`;
      setShareMessage(defaultMessage);
      
      // 카드 이미지 미리보기 생성
      generateShareCard(result)
        .then((cardImageUrl) => {
          setShareCardPreview(cardImageUrl);
        })
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error('카드 이미지 생성 실패:', error);
          }
        });
    }
    
    // 모달이 닫힐 때 메모리 정리
    return () => {
      if (!showShareModal && shareCardPreview) {
        URL.revokeObjectURL(shareCardPreview);
        setShareCardPreview(null);
      }
    };
  }, [showShareModal, result]);

  // 시작 전 화면 삭제 - 바로 질문으로 시작

  // 결과 화면
  if (showResult) {
    if (!result) {
      // result가 없으면 기본값 사용
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--palette-bg-1)' }}>
          <div className="text-center">
            <p className="text-warm-gray mb-4">결과를 계산하는 중...</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--palette-bg-1)' }}>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="bg-white p-8 max-w-2xl w-full shadow-sm" style={{ borderRadius: '16px' }}>
            
            {/* 🎨 AI 생성 스피릿 영역 */}
            <div className="mb-8">
              {/* 스피릿 이미지 */}
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 rounded-none overflow-hidden bg-gradient-to-br from-emerald-100 via-lime-50 to-yellow-100">
                {isGeneratingImage ? (
                  // 로딩 상태
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-[var(--border-divider)] rounded-none animate-spin border-t-black"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-black animate-pulse" />
                    </div>
                    <p className="mt-4 text-black font-medium">스피릿 소환 중...</p>
                  </div>
                ) : monsterImageUrl ? (
                  // 실제 AI 생성 이미지
                  <img 
                    src={monsterImageUrl} 
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // 플레이스홀더 (API 연동 전)
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="text-8xl mb-4">🌱</div>
                    <div className="flex gap-2 mb-4">
                      {selectedItems.map((item, idx) => (
                        <div 
                          key={item.id} 
                          className="w-12 h-12 rounded-none overflow-hidden border-2 border-white shadow-md"
                          style={{ marginLeft: idx > 0 ? '-8px' : '0' }}
                        >
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain bg-white" />
                        </div>
                      ))}
                    </div>
                    <p className="text-warm-gray text-sm text-center">
                      스피릿 소환 중...
                    </p>
                  </div>
                )}
                
                {/* 재생성 버튼 */}
                {!isGeneratingImage && (
                  <button
                    onClick={regenerateMonster}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-none text-sm font-medium text-charcoal hover:bg-white transition-colors shadow-lg flex items-center gap-2"
                    aria-label="다른 형상 보기"
                  >
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span aria-hidden="true">✦</span> 다른 형상 보기
                  </button>
                )}
              </div>
              
              {/* 스피릿 정보 */}
              <div className="text-center">
                {/* 라벨 */}
                
                {/* 스피릿 이름 - 가장 크게 */}
                <h2 className="text-charcoal mb-2" style={{ fontSize: 'var(--font-size-h1)', fontWeight: 600 }}>
                  {result.name}
                </h2>
                
                {/* 한 줄 설명 */}
                <p className="text-warm-gray text-sm mb-4">
                  {result.description}
                </p>
                
                {/* 키워드 태그 */}
                <div className="flex justify-center gap-2 flex-wrap mb-4">
                  {(() => {
                    // MBTI 기반 키워드 생성
                    const keywords: string[] = [];
                    
                    // T/F 기반
                    if (result.mbti.includes('T')) {
                      keywords.push('논리적');
                    } else {
                      keywords.push('감성적');
                    }
                    
                    // J/P 기반
                    if (result.mbti.includes('J')) {
                      keywords.push('효율추구');
                    } else {
                      keywords.push('유연함');
                    }
                    
                    // 공통 키워드
                    keywords.push('자연주의');
                    
                    return keywords.map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-eggshell text-charcoal"
                      >
                        #{keyword}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            </div>
            
            {/* Primary CTA - 공유 버튼 */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => {
                  if (!result) {
                    alert('결과를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                    return;
                  }
                  setShowShareModal(true);
                }}
                className="flex-1 py-4 rounded-none font-normal text-base transition-all flex items-center justify-center gap-2 text-white"
                style={{ backgroundColor: 'var(--palette-text)', color: 'var(--primary)' }}
                aria-label="공유하기"
              >
                <Share2 className="w-5 h-5" aria-hidden="true" />
                공유하기
              </button>
              
              {/* 레시피 보기 버튼 */}
              <button 
                onClick={() => {
                  setShowRecipeCurationModal(true);
                }}
                className="flex-1 py-4 rounded-none font-normal text-base transition-all flex items-center justify-center gap-2 text-white"
                style={{ backgroundColor: 'var(--palette-text)', color: 'var(--primary)' }}
                aria-label="레시피 보기"
              >
                레시피 보기
              </button>
            </div>
            
            {/* 커스텀 공유 모달 */}
            {showShareModal && result && (
              <div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={() => {
                  setShowShareModal(false);
                  if (shareCardPreview) {
                    URL.revokeObjectURL(shareCardPreview);
                    setShareCardPreview(null);
                  }
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-modal-title"
              >
                {/* 반투명 배경 오버레이 */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                
                {/* 모달 컨텐츠 */}
                <div 
                  className="relative bg-white rounded-none shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                  role="document"
                >
                  {/* 헤더 */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 id="share-modal-title" className="text-charcoal font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                      공유하기
                    </h3>
                    <button
                      onClick={() => {
                        setShowShareModal(false);
                        if (shareCardPreview) {
                          URL.revokeObjectURL(shareCardPreview);
                          setShareCardPreview(null);
                        }
                      }}
                      className="p-2 hover:bg-eggshell transition-colors"
                      aria-label="공유 모달 닫기"
                    >
                      <X className="w-5 h-5 text-muted" aria-hidden="true" />
                    </button>
                  </div>
                  
                  {/* 카드 이미지 미리보기 */}
                  {shareCardPreview && (
                    <div className="mb-6 border-2 border-[color:var(--border-hairline)] rounded-none overflow-hidden">
                      <img 
                        src={shareCardPreview} 
                        alt="공유 카드 미리보기"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  {/* 공유 멘트 입력창 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      공유 멘트
                    </label>
                    <textarea
                      value={shareMessage}
                      onChange={(e) => {
                        const text = e.target.value;
                        // 트위터 글자수 제한 (280자)
                        if (text.length <= 280) {
                          setShareMessage(text);
                        }
                      }}
                      className="w-full p-3 border-2 border-[color:var(--border-hairline)] rounded-none resize-none focus:outline-none focus:border-[color:var(--border-color-light)] text-sm"
                      rows={6}
                      placeholder="공유할 멘트를 입력하세요"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => {
                          const defaultMessage = `나의 테이스트 스피릿은 ${result.name}

${result.description}

너도 해봐 → ${window.location.href}

#테이스트스피릿 #슬런치`;
                          setShareMessage(defaultMessage);
                        }}
                        className="text-xs text-warm-gray hover:text-charcoal underline"
                      >
                        기본 멘트로 되돌리기
                      </button>
                      <span className={`text-xs ${shareMessage.length > 280 ? 'text-black' : 'text-muted'}`}>
                        {shareMessage.length}/280
                      </span>
                    </div>
                  </div>
                  
                  {/* 공유 채널 버튼 - 한 줄로 아이콘만 */}
                  <div className="flex items-center justify-center gap-6 mb-4">
                    {/* 카카오톡 */}
                    <button
                      onClick={async () => {
                        try {
                          // 카카오톡 공유 API 사용 (카드 이미지 + 멘트 + 링크)
                          // 실제 카카오톡 API 연동이 필요하지만, 현재는 링크 공유로 대체
                          const shareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareMessage)}`;
                          window.open(shareUrl, '_blank', 'width=600,height=600');
                          setShowShareModal(false);
                        } catch (error) {
                          if (import.meta.env.DEV) {
                            console.error('카카오톡 공유 실패:', error);
                          }
                        }
                      }}
                      className="w-14 h-14 flex items-center justify-center bg-yellow-100 hover:bg-yellow-200 transition-colors rounded-none"
                      title="카카오톡"
                      aria-label="카카오톡으로 공유하기"
                    >
                      <span className="text-3xl" aria-hidden="true">💬</span>
                    </button>
                    
                    {/* 인스타 스토리 */}
                    <button
                      onClick={async () => {
                        try {
                          // 인스타 스토리는 이미지 저장 후 앱으로 이동 유도
                          if (shareCardPreview) {
                            const link = document.createElement('a');
                            link.download = `테이스트스피릿-${result.name}.png`;
                            link.href = shareCardPreview;
                            link.click();
                            
                            // 인스타 앱 열기 시도 (모바일)
                            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                              setTimeout(() => {
                                window.open('instagram://story-camera', '_blank');
                              }, 500);
                            }
                            
                            alert('이미지가 저장되었습니다. 인스타그램 앱에서 스토리를 업로드해주세요!');
                            setShowShareModal(false);
                          }
                        } catch (error) {
                          if (import.meta.env.DEV) {
                            console.error('인스타 스토리 공유 실패:', error);
                          }
                        }
                      }}
                      className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors rounded-none"
                      title="인스타 스토리"
                      aria-label="인스타그램 스토리로 공유하기"
                    >
                      <span className="text-3xl" aria-hidden="true">📷</span>
                    </button>
                    
                    {/* X(트위터) */}
                    <button
                      onClick={() => {
                        // 트위터: 멘트 + 링크 자동 입력된 상태로 열기
                        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(window.location.href)}`;
                        window.open(shareUrl, '_blank', 'width=600,height=600');
                        setShowShareModal(false);
                      }}
                      className="w-14 h-14 flex items-center justify-center bg-black hover:bg-charcoal transition-colors rounded-none"
                      title="X (트위터)"
                      aria-label="X(트위터)로 공유하기"
                    >
                      <span className="text-white font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }} aria-hidden="true">𝕏</span>
                    </button>
                    
                    {/* 링크 복사 */}
                    <button
                      onClick={async () => {
                        try {
                          // 멘트 + 링크 함께 클립보드에 복사
                          await navigator.clipboard.writeText(`${shareMessage}\n\n${window.location.href}`);
                          setCopyToast(true);
                          setTimeout(() => setCopyToast(false), 2000);
                        } catch (e) {
                          alert('링크 복사에 실패했습니다.');
                        }
                      }}
                      className="w-14 h-14 flex items-center justify-center bg-eggshell hover:bg-[rgba(26,10,5,0.05)] transition-colors rounded-none"
                      title="링크 복사"
                      aria-label="링크 복사하기"
                    >
                      <Link2 className="w-6 h-6 text-charcoal" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* 복사 완료 토스트 */}
            {copyToast && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] bg-charcoal text-white px-6 py-3 rounded-none shadow-lg animate-fadeIn">
                복사됨!
              </div>
            )}
            
            {/* Secondary CTA - 이미지 다운로드 & 프로필 북마크 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={async () => {
                  if (!result) {
                    alert('결과를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                    return;
                  }
                  try {
                    const cardImageUrl = await generateShareCard(result);
                    
                    // 이미지 다운로드
                    const link = document.createElement('a');
                    link.download = `테이스트스피릿-${result.name}.png`;
                    link.href = cardImageUrl;
                    link.click();
                    
                    // 메모리 정리
                    setTimeout(() => URL.revokeObjectURL(cardImageUrl), 100);
                  } catch (error) {
                    if (import.meta.env.DEV) {
                      console.error('이미지 저장 실패:', error);
                    }
                    alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
                  }
                }}
                className="py-3 px-4 border-2 text-warm-gray rounded-none font-normal transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--palette-bg-1)', borderColor: 'var(--palette-bg-1)' }}
                aria-label="이미지 저장하기"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                이미지 저장
              </button>
              <button
                onClick={() => {
                  if (onSaveProfile && !profileSaved) {
                    const profileImage = monsterImageUrl || selectedItems[0]?.imageUrl || '';
                    onSaveProfile(profileImage, result.name);
                    setProfileSaved(true);
                  }
                }}
                aria-label="프로필에 북마크하기"
                disabled={profileSaved}
                className={`py-3 px-4 border-2 rounded-none font-normal transition-all flex items-center justify-center gap-2 ${
                  profileSaved 
                    ? 'border-[var(--border-divider)] bg-[var(--palette-bg-2)] text-black cursor-default'
                    : 'text-warm-gray'
                }`}
                style={!profileSaved ? { backgroundColor: 'var(--palette-bg-1)', borderColor: 'var(--palette-bg-1)' } : {}}
              >
                {profileSaved ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    북마크됨
                  </>
                ) : (
                  <>
                    <UserCircle className="w-5 h-5" aria-hidden="true" />
                    프로필에 북마크
                  </>
                )}
              </button>
            </div>
            
            {/* 스피릿 맞춤 큐레이션 팝업 */}
            {showRecipeCurationModal && result && (
              <div 
                className="sl-modal-overlay"
                onClick={() => setShowRecipeCurationModal(false)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="curation-modal-title"
              >
                {/* 모달 컨텐츠 */}
                <div 
                  className="sl-modal"
                  onClick={(e) => e.stopPropagation()}
                  role="document"
                >
                  {/* 모달 헤더 */}
                  <div className="sl-modal-header">
                    <div className="sl-modal-close-area">
                      <span 
                        className="sl-modal-dismiss"
                        onClick={() => {
                          const today = new Date().toDateString();
                          localStorage.setItem('tasteSpirit_dismiss', today);
                          setShowRecipeCurationModal(false);
                        }}
                      >
                        오늘 하루 보지않기
                      </span>
                      <button 
                        className="sl-modal-close"
                        onClick={() => setShowRecipeCurationModal(false)}
                        aria-label="모달 닫기"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="sl-modal-content">
                    {/* 스피릿 캐릭터 일러스트 (요리사 모자) */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        {/* 요리사 모자 */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl z-10">
                          👨‍🍳
                        </div>
                        {/* 스피릿 이모지 */}
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-lg"
                          style={{ backgroundColor: `${result.color}20` }}
                        >
                          {result.emoji}
                        </div>
                      </div>
                      
                      {/* 맞춤 메시지 */}
                      <h3 id="curation-modal-title" className="text-black mb-2 text-center font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>
                        {result.name}를 위한 레시피
                      </h3>
                      <p className="text-warm-gray text-center leading-relaxed">
                        {getSpiritCurationMessage(result.name)}
                      </p>
                    </div>
                    
                    {/* 레시피 보기 버튼 */}
                    <button
                      onClick={() => {
                        setShowRecipeCurationModal(false);
                        navigate(`/recipe?spirit=${encodeURIComponent(result.name)}&spiritType=${encodeURIComponent(result.mbti)}`);
                      }}
                      className="w-full py-4 rounded-none font-normal transition-colors flex items-center justify-center gap-2 text-white"
                      style={{ backgroundColor: 'var(--palette-text)', color: 'var(--primary)' }}
                    >
                      레시피 보기
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* 다시하기 */}
            <button
              onClick={() => {
                navigate('/');
              }}
              className="w-full mt-4 py-3 text-warm-gray hover:text-charcoal transition-colors rounded-none"
              style={{ textDecoration: 'none' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
              aria-label="다시 해볼래요?"
            >
              다시 해볼래요?
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 질문 화면
  if (currentStep >= availableQuestions.length || currentStep < 0) {
    // 잘못된 currentStep인 경우 첫 번째 질문으로 리셋
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--palette-bg-1)' }}>
        <div className="text-center">
          <p className="text-warm-gray mb-4">질문을 불러오는 중...</p>
          <button
            onClick={() => {
              // 첫 번째 질문으로 이동
              navigate('/spirit/question/diet');
            }}
            className="px-6 py-3 bg-black text-white rounded-none font-normal hover:bg-charcoal transition-colors"
          >
            다시 시작하기
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = availableQuestions[currentStep];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--palette-bg-1)' }}>
        <div className="text-center">
          <p className="text-warm-gray mb-4">질문을 찾을 수 없습니다.</p>
          <button
            onClick={() => {
              // 첫 번째 질문으로 이동
              navigate('/spirit/question/diet');
            }}
            className="px-6 py-3 bg-black text-white rounded-none font-normal hover:bg-charcoal transition-colors"
          >
            다시 시작하기
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / availableQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-transparent">

      {/* 위로 가기 버튼 (스크롤을 내렸을 때만 표시) */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed top-6 left-6 z-50 w-10 h-10 rounded-none flex items-center justify-center transition-opacity animate-fadeIn"
          style={{ backgroundColor: 'transparent', color: '#ffffff', textShadow: '0 0 6px rgba(26, 10, 5, 0.6)' }}
          aria-label="상단으로 이동"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-center min-h-screen p-4 md:p-8" style={{ backgroundColor: 'var(--palette-bg-1)' }}>
        <div className="rounded-none px-2 py-6 md:p-10 relative" style={{ backgroundColor: 'transparent', width: '1000px', maxWidth: '100%' }}>
          {/* 질문 영역 - 상단 고정 */}
          <div
            className="relative px-2 md:px-0"
            style={{
              marginBottom: '40px',
              position: 'sticky',
              top: '70px',
              zIndex: 10,
              backgroundColor: 'var(--palette-bg-1)',
              paddingTop: '16px',
              paddingBottom: '16px',
            }}
          >
            {/* 이전 버튼 - 질문과 중앙정렬, 좌측 */}
            <button
              onClick={handleBack}
              className="absolute flex items-center justify-center transition-colors"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                top: '20px',
                left: '0',
                backgroundColor: 'var(--palette-text)',
                border: 'none',
                outline: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
              }}
              onFocus={(e) => e.target.blur()}
              aria-label="이전"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* 질문 */}
            <h2 className="text-center text-charcoal font-normal px-8 md:px-0 text-base md:text-xl" style={{ fontWeight: 400, marginBottom: '12px' }}>
              {currentQuestion.question}
            </h2>
            
            {/* 실선 */}
            <div style={{ 
              width: '100%', 
              height: '1px', 
              backgroundColor: 'var(--palette-text)',
              marginTop: '16px'
            }} />
            
            {/* 게이지 (4px 두꺼운 실선) */}
            <div style={{ 
              width: `${progress}%`, 
              height: '4px', 
              backgroundColor: 'var(--palette-text)',
              marginTop: '0px'
            }} />
          </div>

          {/* 타로 카드 옵션들 */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .drag-scroll { cursor: grab; }
            .drag-scroll:active { cursor: grabbing; }
            .drag-scroll.dragging { scroll-snap-type: none !important; }
          `}</style>

          <div className="mb-8">
            {/* ========== (A) 모바일 전용 뷰: 가로 스크롤 1줄 ========== */}
            <div
              className="flex md:hidden overflow-x-auto flex-nowrap gap-3 pb-4 hide-scrollbar drag-scroll"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingLeft: '0',
                paddingRight: '0',
                marginLeft: '-8px',
                marginRight: '-8px',
                width: 'calc(100% + 16px)',
              }}
              onMouseDown={(e) => {
                const container = e.currentTarget;
                container.classList.add('dragging');
                const startX = e.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;

                const onMouseMove = (moveEvent: MouseEvent) => {
                  moveEvent.preventDefault();
                  const x = moveEvent.pageX - container.offsetLeft;
                  const walk = (x - startX) * 1.5;
                  container.scrollLeft = scrollLeft - walk;
                };

                const onMouseUp = () => {
                  container.classList.remove('dragging');
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                  // Re-enable snap after drag
                  setTimeout(() => {
                    container.style.scrollSnapType = 'x mandatory';
                  }, 100);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }}
              onTouchStart={(e) => {
                const container = e.currentTarget;
                container.classList.add('dragging');
              }}
              onTouchEnd={(e) => {
                const container = e.currentTarget;
                container.classList.remove('dragging');
                setTimeout(() => {
                  container.style.scrollSnapType = 'x mandatory';
                }, 100);
              }}
            >
              {currentQuestion.options.map((option: any, index: number) => {
                const isMultiple = (currentQuestion as any).isMultiple;
                const currentAnswer = answers[currentQuestion.id];
                const isSelected = isMultiple
                  ? (Array.isArray(currentAnswer) && currentAnswer.includes(option.value))
                  : currentAnswer === option.value;
                const showSelected = isSelected && interactedQuestions.has(currentQuestion.id);
                const tarot = option.tarot;
                const isFirst = index === 0;
                const isLast = index === currentQuestion.options.length - 1;
                return (
                  <div
                    key={`${currentQuestion.id}-${option.value}`}
                    className="flex-shrink-0 flex flex-col items-center"
                    style={{
                      scrollSnapAlign: 'center',
                      marginLeft: isFirst ? '12px' : '0',
                      marginRight: isLast ? '12px' : '0',
                    }}
                  >
                    <div
                      onClick={() => {
                        handleOptionSelect(currentQuestion.id, option.value);
                        if (!isMultiple) setTimeout(() => handleNext(), 300);
                      }}
                      className="cursor-pointer"
                      style={{
                        width: '130px',
                        height: '208px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: showSelected ? 'inset 0 0 0 2px var(--primary)' : 'none',
                        transform: showSelected ? 'scale(1.02)' : 'none',
                        background: 'var(--border-divider)',
                      }}
                    >
                      {tarot?.image ? (
                        <img
                          src={getTarotImageSrc(tarot.image)}
                          alt={tarot.title}
                          className="w-full h-full object-cover pointer-events-none"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-charcoal to-gray-lighter">
                          <span className="text-sm font-bold text-charcoal">{option.label}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-center" style={{ width: '130px' }}>
                      <span className="text-xs font-bold text-charcoal">{option.label}</span>
                      {/* 모바일에서는 설명 항상 표시 */}
                      <div className="text-xs text-warm-gray mt-1" style={{ lineHeight: '1.3' }}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========== (B) 데스크탑 전용 뷰: 2+3 그리드 ========== */}
            <div className="hidden md:flex flex-col items-center gap-6">
              {/* 첫 번째 줄: 2개 */}
              <div className="flex justify-center gap-6">
                {currentQuestion.options.slice(0, 2).map((option: any) => {
                  const isMultiple = (currentQuestion as any).isMultiple;
                  const currentAnswer = answers[currentQuestion.id];
                  const isSelected = isMultiple
                    ? (Array.isArray(currentAnswer) && currentAnswer.includes(option.value))
                    : currentAnswer === option.value;
                  const showSelected = isSelected && interactedQuestions.has(currentQuestion.id);
                  const tarot = option.tarot;
                  const isHovered = hoveredCard?.value === option.value;
                  return (
                    <div
                      key={`${currentQuestion.id}-${option.value}`}
                      className="flex flex-col items-center"
                      onMouseEnter={() => setHoveredCard(option)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        onClick={() => {
                          handleOptionSelect(currentQuestion.id, option.value);
                          if (!isMultiple) setTimeout(() => handleNext(), 300);
                        }}
                        className="cursor-pointer"
                        style={{
                          width: '192px',
                          height: '307px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxShadow: showSelected ? 'inset 0 0 0 2px var(--primary)' : 'none',
                          transform: showSelected || isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
                          background: 'var(--border-divider)',
                        }}
                      >
                        {tarot?.image ? (
                          <img
                            src={getTarotImageSrc(tarot.image)}
                            alt={tarot.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center" style={{ background: 'linear-gradient(135deg, #F5F0E8 0%, #E8E0D5 100%)' }}>
                            <span className="text-xl font-bold text-charcoal">{option.label}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-center" style={{ width: '192px' }}>
                        <span className="text-base font-bold text-charcoal">{option.label}</span>
                        <div className="text-sm text-warm-gray mt-1" style={{ lineHeight: '1.3' }}>
                          {option.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* 두 번째 줄: 나머지 (3개 이상일 경우) */}
              {currentQuestion.options.length > 2 && (
                <div className="flex justify-center gap-6">
                  {currentQuestion.options.slice(2).map((option: any) => {
                    const isMultiple = (currentQuestion as any).isMultiple;
                    const currentAnswer = answers[currentQuestion.id];
                    const isSelected = isMultiple
                      ? (Array.isArray(currentAnswer) && currentAnswer.includes(option.value))
                      : currentAnswer === option.value;
                    const showSelected = isSelected && interactedQuestions.has(currentQuestion.id);
                    const tarot = option.tarot;
                    const isHovered = hoveredCard?.value === option.value;
                    return (
                      <div
                        key={`${currentQuestion.id}-${option.value}`}
                        className="flex flex-col items-center"
                        onMouseEnter={() => setHoveredCard(option)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div
                          onClick={() => {
                            handleOptionSelect(currentQuestion.id, option.value);
                            if (!isMultiple) setTimeout(() => handleNext(), 300);
                          }}
                          className="cursor-pointer"
                          style={{
                            width: '192px',
                            height: '307px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: showSelected ? 'inset 0 0 0 2px var(--primary)' : 'none',
                            transform: showSelected || isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
                            background: 'var(--border-divider)',
                          }}
                        >
                          {tarot?.image ? (
                            <img
                              src={getTarotImageSrc(tarot.image)}
                              alt={tarot.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center" style={{ background: 'linear-gradient(135deg, #F5F0E8 0%, #E8E0D5 100%)' }}>
                              <span className="text-xl font-bold text-charcoal">{option.label}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 text-center" style={{ width: '192px' }}>
                          <span className="text-base font-bold text-charcoal">{option.label}</span>
                          <div className="text-sm text-warm-gray mt-1" style={{ lineHeight: '1.3' }}>
                            {option.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiritFinderStep;
