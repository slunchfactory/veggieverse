import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { ChevronUp, Calendar, FileText, Sparkles, Share2, Download, UserCircle, Check, X, Link2 } from 'lucide-react';
import { VegetableItem } from '../types';

interface SurveyPageProps {
  selectedItems: VegetableItem[];
  onSaveProfile?: (profileImage: string, veganType: string) => void;
  showScrollToTop?: boolean;
  onScrollToTop?: () => void;
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
      { label: '제한 없음 / 일반 식단', description: '특별한 제한이 없습니다', value: 'none' },
    ]
  },
  {
    category: '채식 관련',
    options: [
      { label: '완전비건', description: '모든 동물성 식품을 피합니다', value: 'vegan' },
      { label: '락토비건', description: '유제품은 허용하지만 알류와 육류는 피합니다', value: 'lacto' },
      { label: '오보 베지테리언', description: '달걀은 허용하지만 유제품과 육류는 피합니다', value: 'ovo' },
      { label: '락토오보 베지테리언', description: '유제품과 달걀은 허용하지만 육류는 피합니다 (가장 흔한 채식 유형)', value: 'lacto-ovo' },
      { label: '플렉시테리언', description: '가끔 육류나 생선을 먹을 수 있습니다', value: 'flexitarian' },
      { label: '페스케테리언', description: '생선은 허용하지만 육류는 피합니다', value: 'pescatarian' },
      { label: '폴로테리언', description: '가금류(닭, 오리)는 먹지만 적색육은 피합니다', value: 'pollo' },
    ]
  },
  {
    category: '건강/알레르기 관련',
    options: [
      { label: '글루텐 프리', description: '글루텐을 피합니다', value: 'gluten-free' },
      { label: '유당불내증', description: '유제품을 피합니다', value: 'lactose-free' },
    ]
  },
  {
    category: '종교/문화적 식단',
    options: [
      { label: '할랄', description: '이슬람 율법에 따른 식단', value: 'halal' },
      { label: '코셔', description: '유대교 율법에 따른 식단', value: 'kosher' },
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

const QUESTIONS = [
  {
    id: 1,
    question: '어떤 식단을 선호하시나요?',
    hasDietCategories: true, // 카테고리가 있는 특별한 질문
    options: [] // 옵션은 DIET_CATEGORIES에서 가져옴
  },
  {
    id: 2,
    question: '끌리는 요리 무드는?',
    options: [
      { label: '클래식', description: '검증된 전통의 맛', value: 'traditional' },
      { label: '퓨전', description: '경계 없는 조합', value: 'fusion' },
      { label: '미니멀', description: '최소한의 재료', value: 'simple' },
      { label: '파인', description: '정교하고 세련된', value: 'gourmet' },
    ]
  },
  {
    id: 3,
    question: '요리에서 가장 중요한 건?',
    options: [
      { label: '밸런스', description: '영양의 균형', value: 'nutrition' },
      { label: '테이스트', description: '맛이 전부', value: 'taste' },
      { label: '이지', description: '빠르고 간편하게', value: 'convenience' },
      { label: '디스커버리', description: '새로운 시도', value: 'novelty' },
    ]
  },
  {
    id: 4,
    question: '식사 시간, 당신에게 어떤 의미?',
    options: [
      { label: '함께', description: '소중한 사람과의 시간', value: 'family' },
      { label: '웰니스', description: '건강한 한 끼', value: 'health' },
      { label: '효율', description: '시간 절약이 우선', value: 'quick' },
      { label: '탐험', description: '새로운 맛의 발견', value: 'experience' },
    ]
  },
  {
    id: 5,
    question: '채식을 선택한 이유는?', // 채식 선택자용
    isConditional: true, // 조건부 질문
    condition: (answers: Record<number, string | string[]>) => {
      const dietSelections = Array.isArray(answers[1]) ? answers[1] : (answers[1] ? [answers[1]] : []);
      const primaryDiet = dietSelections.find(v => PRIMARY_DIET_VALUES.includes(v)) || 'none';
      return primaryDiet !== 'none'; // 비건~폴로 선택자에게만 표시
    },
    options: [
      { label: '건강', description: '나를 위해', value: 'health' },
      { label: '지구', description: '환경을 위해', value: 'environment' },
      { label: '생명', description: '동물을 위해', value: 'animal' },
      { label: '도전', description: '새로운 시도', value: 'curiosity' },
    ]
  },
  {
    id: 6,
    question: '평소 식사 패턴은?', // 논비건용
    isConditional: true,
    condition: (answers: Record<number, string | string[]>) => {
      const dietSelections = Array.isArray(answers[1]) ? answers[1] : (answers[1] ? [answers[1]] : []);
      const primaryDiet = dietSelections.find(v => PRIMARY_DIET_VALUES.includes(v)) || 'none';
      return primaryDiet === 'none'; // 열린 식단 선택자에게만 표시
    },
    options: [
      { label: '규칙적', description: '정해진 시간에 먹는 편', value: 'regular' },
      { label: '자유로움', description: '배고플 때 먹는 편', value: 'flexible' },
      { label: '계획형', description: '미리 식단을 짜두는 편', value: 'planned' },
      { label: '즉흥형', description: '그때그때 정하는 편', value: 'spontaneous' },
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

// 16가지 비건 유형
const VEGAN_TYPES = [
  { mbti: 'ENFP', name: 'Bloomist', emoji: '🌻', description: '새로운 식물성 실험을 즐기며 사람들과 나누는 생기형', color: '#F3B562' },
  { mbti: 'INFP', name: 'Mindgrower', emoji: '🌿', description: '윤리와 감정의 조화를 중시하는 사색가', color: '#A3C585' },
  { mbti: 'INFJ', name: 'Quiet Root', emoji: '🌱', description: '조용히 가치관을 실천하며 깊게 뿌리내리는 사람', color: '#6A8A6B' },
  { mbti: 'ENFJ', name: 'Lightgiver', emoji: '🌼', description: '사람들에게 따뜻한 에너지를 전파하는 리더형', color: '#F4C97E' },
  { mbti: 'ENTJ', name: 'Forger', emoji: '🍎', description: '비건의 구조를 재정립하는 강한 개혁가', color: '#8B7055' },
  { mbti: 'ESTJ', name: 'Groundtype', emoji: '🥦', description: '명확한 원칙으로 일상을 유지하는 현실주의자', color: '#BCA97E' },
  { mbti: 'ISTJ', name: 'Planter', emoji: '🌰', description: '계획적으로 루틴을 실천하며 안정감 있는 사람', color: '#9E8961' },
  { mbti: 'INTJ', name: 'Strategreen', emoji: '🌵', description: '데이터와 구조로 지속가능한 미래를 설계하는 자', color: '#5D7264' },
  { mbti: 'ISFP', name: 'Floret', emoji: '🌸', description: '예술적으로 비건을 표현하고 감각을 나누는 사람', color: '#E6B7C1' },
  { mbti: 'ESFP', name: 'Joybean', emoji: '🍑', description: '즉흥적이고 즐거운 미식과 유머를 사랑하는 사람', color: '#F6A880' },
  { mbti: 'ESFJ', name: 'Careleaf', emoji: '🌺', description: '주위를 돌보며 공동체적 조화를 이루는 사람', color: '#F2D68A' },
  { mbti: 'ISFJ', name: 'Nurturer', emoji: '🌾', description: '조용히 주변을 돕고 배려로 실천하는 사람', color: '#D6C6A5' },
  { mbti: 'INTP', name: 'Thinkroot', emoji: '🌴', description: '구조와 원리를 탐구하는 철저한 분석가형', color: '#7F9B8A' },
  { mbti: 'ENTP', name: 'Sparknut', emoji: '🍋', description: '새로운 관점으로 식문화를 재해석하는 발상가형', color: '#E8D26E' },
  { mbti: 'ISTP', name: 'Craftbean', emoji: '🫘', description: '손끝 감각으로 직접 실험하며 구현하는 제작자형', color: '#8D8570' },
  { mbti: 'ESTP', name: 'Wildgrain', emoji: '🌵', description: '즉흥적, 모험적이며 현장에서 비건을 즐기는 사람', color: '#C19F7B' },
];

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

export const SurveyPage: React.FC<SurveyPageProps> = ({ selectedItems = [], onSaveProfile, showScrollToTop = false, onScrollToTop }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [dietConflictWarning, setDietConflictWarning] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [shareCardPreview, setShareCardPreview] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);
  
  // AI 몬스터 이미지 관련 상태
  const [monsterImageUrl, setMonsterImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [monsterName, setMonsterName] = useState('');
  const [monsterDescription, setMonsterDescription] = useState('');

  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      const container = document.querySelector('.snap-y');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOptionSelect = (questionId: number, value: string) => {
    if (questionId === 1) {
      // 식단 질문은 다중 선택 로직
      handleDietSelect(value);
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleDietSelect = (value: string) => {
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

  // 조건에 맞는 질문만 필터링
  const availableQuestions = useMemo(() => {
    return getAvailableQuestions(answers);
  }, [answers]);

  const handleNext = () => {
    if (currentStep < availableQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // 마지막 질문 완료 시 결과 화면으로
      // 이미지 생성이 아직 진행 중이면 그대로 두고, 완료되지 않았으면 완료 처리
      if (isGeneratingImage) {
        // 이미 생성 중이면 그대로 진행
      } else {
        // 아직 시작하지 않았거나 완료되었으면 완료 상태로 설정
        setIsGeneratingImage(false);
      }
      // 결과 화면 표시
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // 몬스터 생성 함수 (나중에 API 연동)
  const generateMonster = async () => {
    try {
      setIsGeneratingImage(true);
      setMonsterName(generateMonsterName(selectedItems));
      setMonsterDescription(generateMonsterDescription(selectedItems));
    
    // NOTE: 로컬 프롬프터 API 연동 예정
    // 현재는 시뮬레이션 (2초 후 완료)
    // 
    // 연동 시 예상 코드:
    // const veggieNames = selectedItems.map(item => item.name);
    // const response = await fetch('http://localhost:YOUR_PORT/generate-monster', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ vegetables: veggieNames })
    // });
    // const data = await response.json();
    // setMonsterImageUrl(data.imageUrl);
    
      setTimeout(() => {
        // 플레이스홀더: 실제 연동 시 이 부분을 API 응답으로 대체
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
          ctx.fillText(`✦ ${spiritResult.name} ✦`, textX, textY - 100);

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
      const defaultMessage = `나의 테이스트 스피릿은 ✦${result.name}✦

${result.description}

너도 테스트해봐 👉 ${window.location.href}

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

  // 시작 전 화면
  if (!started) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="bg-white rounded-none p-12 max-w-lg w-full shadow-sm text-center">
            {/* 상단 네비게이션 */}
            <button
              onClick={scrollToTop}
              className="text-sm text-stone-400 hover:text-stone-600 mb-6 flex items-center gap-1 mx-auto"
              aria-label="다시 선택하기"
            >
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
              다시 선택하기
            </button>
            
            <div className="text-6xl mb-6">🥗</div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              마이 테이스트 스피릿
            </h2>
            <p className="text-stone-500 mb-8">
              5가지 질문에 답하고 당신의 테이스트 스피릿을 깨워보세요.
            </p>
            
            {selectedItems.length > 0 && (
              <div className="flex justify-center gap-3 mb-8">
                {selectedItems.map(item => (
                  <div key={item.id} className="w-14 h-14 rounded-none overflow-hidden shadow-md border-2 border-white">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain bg-stone-50" />
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={() => {
                try {
                  setStarted(true);
                  generateMonster(); // 시작하기 클릭 시 이미지 생성 시작
                } catch (error) {
                  if (import.meta.env.DEV) {
                    console.error('Error starting survey:', error);
                  }
                  setStarted(true); // 에러가 발생해도 시작은 진행
                }
              }}
              className="w-full py-4 bg-black text-white rounded-none font-semibold hover:bg-stone-800 transition-colors"
            >
              스피릿 깨우기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 결과 화면
  if (showResult) {
    if (!result) {
      // result가 없으면 기본값 사용
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F6' }}>
          <div className="text-center">
            <p className="text-stone-500 mb-4">결과를 계산하는 중...</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="bg-white rounded-none p-8 max-w-2xl w-full shadow-sm">
            
            {/* 🎨 AI 생성 스피릿 영역 */}
            <div className="mb-8">
              {/* 스피릿 이미지 */}
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 rounded-none overflow-hidden bg-gradient-to-br from-emerald-100 via-lime-50 to-yellow-100">
                {isGeneratingImage ? (
                  // 로딩 상태
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-emerald-200 rounded-none animate-spin border-t-emerald-500"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500 animate-pulse" />
                    </div>
                    <p className="mt-4 text-emerald-600 font-medium">스피릿 소환 중...</p>
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
                    <p className="text-stone-500 text-sm text-center">
                      스피릿 소환 중...
                    </p>
                  </div>
                )}
                
                {/* 재생성 버튼 */}
                {!isGeneratingImage && (
                  <button
                    onClick={regenerateMonster}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-none text-sm font-medium text-stone-700 hover:bg-white transition-colors shadow-lg flex items-center gap-2"
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
                <p className="text-xs text-stone-400 mb-2">당신의 테이스트 스피릿</p>
                
                {/* 스피릿 이름 - 가장 크게 */}
                <h2 className="text-4xl font-bold text-stone-800 mb-2">
                  ✦ {result.name} ✦
                </h2>
                
                {/* 한 줄 설명 */}
                <p className="text-stone-500 text-sm mb-4">
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
                        className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700"
                      >
                        #{keyword}
                      </span>
                    ));
                  })()}
                </div>
                
                {/* 짧은 설명 1-2줄만 */}
                {personalityDescription && (
                  <div className="mt-4">
                    <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
                      {personalityDescription.text.split('\n\n')[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Primary CTA - 공유 버튼 */}
            <button
              onClick={() => {
                if (!result) {
                  alert('결과를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                  return;
                }
                setShowShareModal(true);
              }}
              className="w-full py-5 mb-4 rounded-none font-bold text-lg transition-all flex items-center justify-center gap-2 text-white hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#292624' }}
              aria-label="내 스피릿 공유하기"
            >
              <Share2 className="w-6 h-6" aria-hidden="true" />
              <span aria-hidden="true">🔮</span> 내 스피릿 공유하기
            </button>
            
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
                    <h3 id="share-modal-title" className="text-xl font-bold text-stone-800">
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
                      className="p-2 hover:bg-stone-100 transition-colors"
                      aria-label="공유 모달 닫기"
                    >
                      <X className="w-5 h-5 text-stone-400" aria-hidden="true" />
                    </button>
                  </div>
                  
                  {/* 카드 이미지 미리보기 */}
                  {shareCardPreview && (
                    <div className="mb-6 border-2 border-stone-200 rounded-none overflow-hidden">
                      <img 
                        src={shareCardPreview} 
                        alt="공유 카드 미리보기"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  {/* 공유 멘트 입력창 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-stone-700 mb-2">
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
                      className="w-full p-3 border-2 border-stone-200 rounded-none resize-none focus:outline-none focus:border-stone-400 text-sm"
                      rows={6}
                      placeholder="공유할 멘트를 입력하세요"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => {
                          const defaultMessage = `나의 테이스트 스피릿은 ✦${result.name}✦

${result.description}

너도 테스트해봐 👉 ${window.location.href}

#테이스트스피릿 #슬런치`;
                          setShareMessage(defaultMessage);
                        }}
                        className="text-xs text-stone-500 hover:text-stone-700 underline"
                      >
                        기본 멘트로 되돌리기
                      </button>
                      <span className={`text-xs ${shareMessage.length > 280 ? 'text-red-500' : 'text-stone-400'}`}>
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
                      className="w-14 h-14 flex items-center justify-center bg-black hover:bg-stone-800 transition-colors rounded-none"
                      title="X (트위터)"
                      aria-label="X(트위터)로 공유하기"
                    >
                      <span className="text-2xl font-bold text-white" aria-hidden="true">𝕏</span>
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
                      className="w-14 h-14 flex items-center justify-center bg-stone-100 hover:bg-stone-200 transition-colors rounded-none"
                      title="링크 복사"
                      aria-label="링크 복사하기"
                    >
                      <Link2 className="w-6 h-6 text-stone-700" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* 복사 완료 토스트 */}
            {copyToast && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[101] bg-stone-800 text-white px-6 py-3 rounded-none shadow-lg animate-fadeIn">
                복사됨!
              </div>
            )}
            
            {/* Secondary CTA - 이미지 저장 & 프로필 저장 */}
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
                className="py-3 px-4 border-2 border-stone-200 text-stone-600 rounded-none font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
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
                aria-label="프로필에 저장하기"
                disabled={profileSaved}
                className={`py-3 px-4 border-2 rounded-none font-semibold transition-all flex items-center justify-center gap-2 ${
                  profileSaved 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-600 cursor-default'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {profileSaved ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    저장됨
                  </>
                ) : (
                  <>
                    <UserCircle className="w-5 h-5" aria-hidden="true" />
                    프로필에 저장
                  </>
                )}
              </button>
            </div>
            
            {/* 텍스트 링크 - 식단 추천받기 */}
            <div className="text-center mb-4">
              <button 
                className="text-stone-600 hover:text-stone-800 transition-colors text-sm flex items-center justify-center gap-1 mx-auto"
                aria-label="이 스피릿에 맞는 식단 추천받기"
              >
                이 스피릿에 맞는 식단 추천받기
                <span className="text-xs" aria-hidden="true">→</span>
              </button>
            </div>
            
            {/* 다시하기 */}
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setAnswers({});
                setStarted(false);
                setMonsterImageUrl(null);
                setMonsterName('');
                setMonsterDescription('');
                setProfileSaved(false);
              }}
              className="w-full mt-4 py-3 text-stone-500 hover:text-stone-700 transition-colors rounded-none"
              aria-label="다시 테스트하기"
            >
              다시 테스트하기
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="text-center">
          <p className="text-stone-500 mb-4">질문을 불러오는 중...</p>
          <button
            onClick={() => {
              setCurrentStep(0);
              setStarted(true);
            }}
            className="px-6 py-3 bg-black text-white rounded-none font-semibold hover:bg-stone-800 transition-colors"
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="text-center">
          <p className="text-stone-500 mb-4">질문을 찾을 수 없습니다.</p>
          <button
            onClick={() => {
              setCurrentStep(0);
              setStarted(true);
            }}
            className="px-6 py-3 bg-black text-white rounded-none font-semibold hover:bg-stone-800 transition-colors"
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
          style={{ backgroundColor: 'transparent', color: '#ffffff', textShadow: '0 0 6px rgba(0,0,0,0.6)' }}
          aria-label="상단으로 이동"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-white rounded-none p-10 max-w-xl w-full shadow-sm">
          {/* 질문 */}
          <h2 className="text-2xl font-bold text-center text-stone-800 mb-8">
            {currentQuestion.question}
          </h2>
          
          {/* 옵션들 */}
          <div className="mb-8">
            {currentQuestion.hasDietCategories ? (
              // 카테고리가 있는 식단 질문
              <div className="space-y-4">
                {DIET_CATEGORIES.map((category, categoryIndex) => {
                  const isAdditionalCategory = category.category === '건강/알레르기 관련' || category.category === '종교/문화적 식단';
                  
                  return (
                    <div key={category.category}>
                      {/* 추가 옵션 카테고리 안내 */}
                      {isAdditionalCategory && categoryIndex === 2 && (
                        <div className="text-xs text-stone-400 mb-2 pl-1">
                          ✓ 위 식단과 함께 선택 가능
                        </div>
                      )}
                      
                      {/* 카테고리 옵션들 */}
                      <div className="space-y-2">
                        {category.options.map((option) => {
                          const isSelected = isDietSelected(option.value);
                          const isAdditional = ADDITIONAL_DIET_VALUES.includes(option.value);
                          
                          return (
                            <button
                              key={option.value}
                              onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                              className={`w-full p-4 rounded-none border-2 text-left transition-all ${
                                isSelected
                                  ? 'border-black bg-stone-50'
                                  : 'border-stone-200 hover:border-stone-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* 체크박스/라디오 인디케이터 */}
                                <div className={`flex-shrink-0 w-5 h-5 rounded-${isAdditional ? 'md' : 'full'} border-2 flex items-center justify-center ${
                                  isSelected ? 'border-black bg-black' : 'border-stone-300'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-stone-800">{option.label}</div>
                                  <div className="text-sm text-stone-500">{option.description}</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* 카테고리 구분선 (마지막 카테고리 제외) */}
                      {categoryIndex < DIET_CATEGORIES.length - 1 && (
                        <div className="border-t border-stone-300 my-4"></div>
                      )}
                    </div>
                  );
                })}
                
                {/* 상충 경고 메시지 */}
                {dietConflictWarning && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-none text-sm text-amber-700">
                    {dietConflictWarning}
                  </div>
                )}
              </div>
            ) : (
              // 일반 질문
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                    className={`w-full p-4 rounded-none border-2 text-left transition-all ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-black bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-stone-800">{option.label}</div>
                    <div className="text-sm text-stone-500">{option.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* 네비게이션 버튼 */}
          <div className="flex gap-4">
            {currentStep === 0 ? (
              // 첫 질문에서는 "처음으로" 버튼
              <button
                onClick={scrollToTop}
                className="flex-1 py-3 border-2 border-stone-300 text-stone-600 rounded-none font-semibold hover:bg-stone-50 transition-colors"
              >
                처음으로
              </button>
            ) : (
              // 그 외에는 "이전" 버튼
              <button
                onClick={handleBack}
                className="flex-1 py-3 border-2 border-stone-300 text-stone-600 rounded-none font-semibold hover:bg-stone-50 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={currentQuestion.hasDietCategories ? !hasPrimaryDiet() : !answers[currentQuestion.id]}
              className={`flex-1 py-3 rounded-none font-semibold transition-colors ${
                (currentQuestion.hasDietCategories ? hasPrimaryDiet() : answers[currentQuestion.id])
                  ? 'text-white hover:opacity-90'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              style={(currentQuestion.hasDietCategories ? hasPrimaryDiet() : answers[currentQuestion.id]) ? { backgroundColor: '#292624', borderRadius: 0 } : { borderRadius: 0 }}
            >
              {currentStep < availableQuestions.length - 1 ? '다음' : '결과 보기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
