// 새로운 컬러 팔레트

export const COLORS = {
  // 메인 그린 (메뉴바, 주요 버튼)
  green: {
    name: 'Green',
    bg: '#3D9E3D',
    text: '#FFFFFF',
  },
  // 블랙 (텍스트, 강조)
  black: {
    name: 'Black',
    bg: '#1A1A1A',
    text: '#ffffff',
  },
  // 다크 브라운/마룬
  maroon: {
    name: 'Maroon',
    bg: '#5C1A1A',
    text: '#FFFFFF',
  },
  // 퍼플
  purple: {
    name: 'Purple',
    bg: '#6B3FA0',
    text: '#FFFFFF',
  },
  // 핑크
  pink: {
    name: 'Pink',
    bg: '#F5A0C0',
    text: '#1A1A1A',
  },
  // 오렌지 (포인트 컬러)
  orange: {
    name: 'Orange',
    bg: '#E54B1A',
    text: '#FFFFFF',
  },
  // 배경 미색
  cream: {
    name: 'Cream',
    bg: '#F5F0E6',
    text: '#1A1A1A',
  },
} as const;

// 카테고리별 컬러 매핑
export const CATEGORY_COLORS = {
  recipe: COLORS.green,
  store: COLORS.purple,
  brand: COLORS.maroon,
  community: COLORS.pink,
  newsletter: COLORS.orange,
  new: COLORS.green,
  dessert: COLORS.pink,
  korean: COLORS.maroon,
  lunch: COLORS.orange,
  drink: COLORS.purple,
  date: COLORS.pink,
} as const;

// 배경색
export const BG_COLOR = COLORS.cream.bg;

// 메뉴 컬러
export const MENU_COLOR = COLORS.green;

// 포인트 컬러
export const ACCENT_COLOR = COLORS.orange;
