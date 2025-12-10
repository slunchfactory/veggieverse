// Colours Cafe 팔레트
// 각 색상은 text(텍스트)와 bg(배경) 조합으로 구성

export const COLORS = {
  bloodRed: {
    name: 'Blood Red',
    text: '#FF97D0',
    bg: '#630700',
  },
  pastelMagenta: {
    name: 'Pastel Magenta',
    text: '#125603',
    bg: '#FF97D0',
  },
  lincolnGreen: {
    name: 'Lincoln Green',
    text: '#C3F380',
    bg: '#125603',
  },
  lightLime: {
    name: 'Light Lime',
    text: '#7523B4',
    bg: '#C3F380',
  },
  grape: {
    name: 'Grape',
    text: '#FAE170',
    bg: '#7523B4',
  },
  sinopia: {
    name: 'Sinopia',
    text: '#D13F13',
    bg: '#FAE170',
  },
  brilliantRose: {
    name: 'Brilliant Rose',
    text: '#FCC5C6',
    bg: '#D13F13',
  },
  babyPink: {
    name: 'Baby Pink',
    text: '#F1FFBA',
    bg: '#F058AB',
  },
  goldenBrown: {
    name: 'Golden Brown',
    text: '#FFDB58',
    bg: '#906713',
  },
  darkCerulean: {
    name: 'Dark Cerulean',
    text: '#7FEEFF',
    bg: '#0D5072',
  },
} as const;

// 카테고리별 컬러 매핑
export const CATEGORY_COLORS = {
  recipe: COLORS.lincolnGreen,
  store: COLORS.grape,
  brand: COLORS.darkCerulean,
  community: COLORS.babyPink,
  newsletter: COLORS.sinopia,
  hallOfFame: COLORS.goldenBrown,
  new: COLORS.lightLime,
  dessert: COLORS.pastelMagenta,
  korean: COLORS.bloodRed,
  lunch: COLORS.brilliantRose,
} as const;

// 그라데이션 조합
export const GRADIENTS = {
  warm: `linear-gradient(135deg, ${COLORS.sinopia.bg} 0%, ${COLORS.bloodRed.bg} 100%)`,
  cool: `linear-gradient(135deg, ${COLORS.darkCerulean.bg} 0%, ${COLORS.grape.bg} 100%)`,
  fresh: `linear-gradient(135deg, ${COLORS.lightLime.bg} 0%, ${COLORS.lincolnGreen.bg} 100%)`,
  sweet: `linear-gradient(135deg, ${COLORS.pastelMagenta.bg} 0%, ${COLORS.babyPink.bg} 100%)`,
} as const;

