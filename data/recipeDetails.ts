// 모든 레시피 ID에 대한 상세 더미 데이터
import { Recipe } from './recipes';

// 기본 Placeholder 이미지 (브랜드 로고 포함, 이미지가 없을 때 사용)
// 브랜드 로고가 담긴 깔끔한 Placeholder 이미지
export const DEFAULT_RECIPE_IMAGE = '/common/logo.png';

// 카테고리 매핑
const categoryMap: Record<string, string> = {
  'new': '신규레시피',
  'lunch': '점심',
  'dessert': '디저트',
  'korean': '한식',
  'drink': '술안주',
  'date': '데이트',
};

// 레시피별 상세 정보 생성 헬퍼 함수
const createRecipeDetails = (
  id: number,
  title: string,
  mainIngredient: string,
  imagePath: string,
  category: string
): Partial<Recipe> => {
  const baseIngredients = [
    { name: mainIngredient, amount: '200g' },
    { name: '올리브 오일', amount: '2큰술' },
    { name: '소금', amount: '적당량' },
    { name: '후추', amount: '적당량' },
  ];

  const categoryIngredients: Record<string, Array<{ name: string; amount: string }>> = {
    'new': [
      { name: mainIngredient, amount: '200g' },
      { name: '참기름', amount: '1큰술' },
      { name: '고추장', amount: '1큰술' },
      { name: '마늘', amount: '2쪽' },
    ],
    'lunch': [
      { name: mainIngredient, amount: '300g' },
      { name: '쌀밥', amount: '1공기' },
      { name: '양파', amount: '1/2개' },
      { name: '당근', amount: '1/2개' },
    ],
    'dessert': [
      { name: mainIngredient, amount: '150g' },
      { name: '코코넛 밀크', amount: '200ml' },
      { name: '설탕', amount: '50g' },
      { name: '바닐라 추출물', amount: '1작은술' },
    ],
    'korean': [
      { name: mainIngredient, amount: '300g' },
      { name: '된장', amount: '2큰술' },
      { name: '대파', amount: '1대' },
      { name: '마늘', amount: '3쪽' },
    ],
    'drink': [
      { name: mainIngredient, amount: '100g' },
      { name: '소금', amount: '1작은술' },
      { name: '올리브 오일', amount: '1큰술' },
      { name: '레몬즙', amount: '1큰술' },
    ],
    'date': [
      { name: mainIngredient, amount: '200g' },
      { name: '화이트 와인', amount: '100ml' },
      { name: '크림', amount: '100ml' },
      { name: '파마산 치즈', amount: '30g' },
    ],
  };

  const ingredients = categoryIngredients[category] || baseIngredients;

  return {
    ingredients,
    steps: [
      {
        step: 1,
        title: '재료 준비',
        instructions: [
          `${mainIngredient}을 깨끗이 씻어 준비합니다.`,
          '필요한 양념과 조미료를 미리 준비해둡니다.',
        ],
      },
      {
        step: 2,
        title: '기본 조리',
        instructions: [
          '팬에 기름을 두르고 중불로 예열합니다.',
          `${mainIngredient}을 넣고 볶기 시작합니다.`,
        ],
      },
      {
        step: 3,
        title: '양념 추가',
        instructions: [
          '양념을 넣고 골고루 섞어줍니다.',
          '적당한 간을 맞춥니다.',
        ],
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', // 양념 추가 과정 사진
      },
      {
        step: 4,
        title: '마무리',
        instructions: [
          '완성된 요리를 그릇에 담습니다.',
          '장식용 허브나 채소를 올려 마무리합니다.',
        ],
        tip: '바로 먹으면 더 맛있어요!',
      },
    ],
    nutrition: {
      calories: 250 + Math.floor(Math.random() * 200),
      fat: 8 + Math.floor(Math.random() * 10),
      saturatedFat: 2 + Math.floor(Math.random() * 3),
      carbs: 30 + Math.floor(Math.random() * 20),
      sugar: 3 + Math.floor(Math.random() * 5),
      fiber: 4 + Math.floor(Math.random() * 3),
      protein: 10 + Math.floor(Math.random() * 8),
    },
    totalTime: '25분',
    prepTime: '10분',
    cookTime: '15분',
    difficulty: '쉬움',
    servings: 2,
    allergens: [],
    tags: ['비건', '건강', '간편'],
    dietCategory: '완전비건', // 기본값: 완전비건
    recipeCategory: categoryMap[category] || '점심', // 카테고리 매핑
  };
};

// 모든 레시피 ID에 대한 상세 데이터 매핑
export const recipeDetailsMap: Record<number, Partial<Recipe>> = {
  // 인기 레시피 (1-8)
  1: createRecipeDetails(1, '두부 스테이크', '두부', '/vege_flot_img/mushroom.png', 'lunch'),
  2: createRecipeDetails(2, '비건 파스타', '토마토', '/vege_flot_img/tomato.png', 'date'),
  3: createRecipeDetails(3, '아보카도 샐러드 볼', '아보카도', '/vege_flot_img/avocado.png', 'lunch'),
  4: createRecipeDetails(4, '버섯 리조또', '버섯', '/vege_flot_img/mushroom.png', 'date'),
  5: createRecipeDetails(5, '채소 볶음밥', '브로콜리', '/vege_flot_img/broccoli.png', 'lunch'),
  6: createRecipeDetails(6, '레몬 허브 샐러드', '레몬', '/vege_flot_img/lemon.png', 'new'),
  7: createRecipeDetails(7, '고구마 수프', '고구마', '/vege_flot_img/sweet potato.png', 'korean'),
  8: createRecipeDetails(8, '망고 스무디 볼', '망고', '/vege_flot_img/mango.png', 'dessert'),

  // 신규 레시피 (101-105)
  101: createRecipeDetails(101, '콩나물 비빔밥', '콩나물', '/vege_flot_img/edamame.png', 'new'),
  102: createRecipeDetails(102, '당근 라페 샌드위치', '당근', '/vege_flot_img/carrot.png', 'new'),
  103: createRecipeDetails(103, '올리브 파스타', '올리브', '/vege_flot_img/olive.png', 'date'),
  104: createRecipeDetails(104, '피스타치오 페스토', '피스타치오', '/vege_flot_img/pistachio.png', 'date'),
  105: createRecipeDetails(105, '무화과 샐러드', '무화과', '/vege_flot_img/fig.png', 'new'),

  // 점심 레시피 (201-205)
  201: createRecipeDetails(201, '두부 덮밥', '두부', '/vege_flot_img/lettuce.png', 'lunch'),
  202: createRecipeDetails(202, '야채 카레', '감자', '/vege_flot_img/potato.png', 'lunch'),
  203: createRecipeDetails(203, '비빔국수', '고추', '/vege_flot_img/chili pepper.png', 'lunch'),
  204: createRecipeDetails(204, '샐러드 랩', '강낭콩', '/vege_flot_img/green bean.png', 'lunch'),
  205: createRecipeDetails(205, '버섯 덮밥', '버섯', '/vege_flot_img/mushroom.png', 'lunch'),

  // 디저트 레시피 (301-305)
  301: createRecipeDetails(301, '코코넛 푸딩', '코코넛', '/vege_flot_img/coconut.png', 'dessert'),
  302: createRecipeDetails(302, '블루베리 타르트', '블루베리', '/vege_flot_img/blueberry.png', 'dessert'),
  303: createRecipeDetails(303, '망고스틴 아이스크림', '망고스틴', '/vege_flot_img/mangosteen.png', 'dessert'),
  304: createRecipeDetails(304, '포도 젤리', '포도', '/vege_flot_img/grape.png', 'dessert'),
  305: createRecipeDetails(305, '라즈베리 무스', '라즈베리', '/vege_flot_img/raspberry.png', 'dessert'),

  // 한식 레시피 (401-405)
  401: createRecipeDetails(401, '배추된장국', '배추', '/vege_flot_img/napa cabbage.png', 'korean'),
  402: createRecipeDetails(402, '마늘종 볶음', '마늘', '/vege_flot_img/garlic.png', 'korean'),
  403: createRecipeDetails(403, '생강차', '생강', '/vege_flot_img/ginger.png', 'korean'),
  404: createRecipeDetails(404, '파전', '파', '/vege_flot_img/leek.png', 'korean'),
  405: createRecipeDetails(405, '고추장 비빔밥', '고추', '/vege_flot_img/pepper.png', 'korean'),

  // 술안주 레시피 (501-505)
  501: createRecipeDetails(501, '땅콩 조림', '땅콩', '/vege_flot_img/peanut.png', 'drink'),
  502: createRecipeDetails(502, '옥수수 치즈구이', '옥수수', '/vege_flot_img/corn.png', 'drink'),
  503: createRecipeDetails(503, '아스파라거스 구이', '아스파라거스', '/vege_flot_img/asparagus.png', 'drink'),
  504: createRecipeDetails(504, '브로콜리 튀김', '브로콜리', '/vege_flot_img/broccoli.png', 'drink'),
  505: createRecipeDetails(505, '딜 감자튀김', '딜', '/vege_flot_img/dill.png', 'drink'),

  // 데이트 레시피 (601-605)
  601: createRecipeDetails(601, '트러플 리조또', '버섯', '/vege_flot_img/mushroom.png', 'date'),
  602: createRecipeDetails(602, '레몬 파스타', '레몬', '/vege_flot_img/lemon.png', 'date'),
  603: createRecipeDetails(603, '복숭아 카프레제', '복숭아', '/vege_flot_img/peach.png', 'date'),
  604: createRecipeDetails(604, '키위 모히또', '키위', '/vege_flot_img/kiwi.png', 'date'),
  605: createRecipeDetails(605, '리치 샴페인', '리치', '/vege_flot_img/lychee.png', 'date'),
};

// 레시피 상세 정보 가져오기
export const getRecipeDetails = (id: number | string): Partial<Recipe> | null => {
  const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
  return recipeDetailsMap[recipeId] || null;
};

