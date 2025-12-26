// 모노톤 컬러 팔레트

export const COLORS = {
  // 그린 → 다크 그레이
  green: {
    name: 'Green',
    bg: '#333333',
    text: '#FFFFFF',
  },
  // 블랙
  black: {
    name: 'Black',
    bg: '#000000',
    text: '#FFFFFF',
  },
  // 마룬 → 다크 그레이
  maroon: {
    name: 'Maroon',
    bg: '#333333',
    text: '#FFFFFF',
  },
  // 퍼플 → 미디엄 그레이
  purple: {
    name: 'Purple',
    bg: '#666666',
    text: '#FFFFFF',
  },
  // 핑크 → 라이트 그레이
  pink: {
    name: 'Pink',
    bg: '#E0E0E0',
    text: '#000000',
  },
  // 오렌지 → 블랙
  orange: {
    name: 'Orange',
    bg: '#000000',
    text: '#FFFFFF',
  },
  // 배경 미색 → 라이트 그레이
  cream: {
    name: 'Cream',
    bg: '#F5F5F5',
    text: '#000000',
  },
} as const;

// 카테고리별 컬러 매핑 (모노톤)
export const CATEGORY_COLORS = {
  recipe: { bg: '#333333', text: '#FFFFFF' },
  store: { bg: '#666666', text: '#FFFFFF' },
  brand: { bg: '#333333', text: '#FFFFFF' },
  community: { bg: '#E0E0E0', text: '#000000' },
  newsletter: { bg: '#000000', text: '#FFFFFF' },
  new: { bg: '#333333', text: '#FFFFFF' },
  dessert: { bg: '#E0E0E0', text: '#000000' },
  korean: { bg: '#333333', text: '#FFFFFF' },
  lunch: { bg: '#000000', text: '#FFFFFF' },
  drink: { bg: '#666666', text: '#FFFFFF' },
  date: { bg: '#E0E0E0', text: '#000000' },
} as const;

// 배경색
export const BG_COLOR = '#F5F5F5';

// 메뉴 컬러
export const MENU_COLOR = { bg: '#333333', text: '#FFFFFF' };

// 포인트 컬러
export const ACCENT_COLOR = { bg: '#000000', text: '#FFFFFF' };
