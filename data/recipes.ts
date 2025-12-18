// 모든 레시피 데이터를 중앙에서 관리
export interface Recipe {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  author?: string;
  likes?: number;
  tags?: string[];
  spiritLikes?: Record<string, number>;
  heroImage?: string;
  dietCategory?: string; // 식습관 카테고리 (예: 완전비건, 유연비건)
  recipeCategory?: string; // 레시피 카테고리 (예: 점심, 디저트, 저녁)
  ingredients?: Array<{ name: string; amount: string; note?: string }>;
  steps?: Array<{
    step: number;
    title: string;
    instructions: string[];
    tip?: string;
    image?: string | { url: string; caption?: string }; // 단계별 과정 사진 (문자열 또는 객체)
  }>;
  heroImageCaption?: string; // 커버 이미지 설명
  nutrition?: {
    calories: number;
    fat: number;
    saturatedFat: number;
    carbs: number;
    sugar: number;
    fiber: number;
    protein: number;
  };
  totalTime?: string;
  prepTime?: string;
  cookTime?: string;
  difficulty?: string;
  servings?: number;
  allergens?: string[];
  relatedRecipes?: Array<{ id: number; title: string; description: string; image: string }>;
}

// Unsplash 이미지 URL 헬퍼 함수
// 비건 요리, 신선한 채소, 심플한 플레이팅 컨셉의 이미지 사용
const unsplashImage = (photoId: string, width: number = 800): string => {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=${width}`;
};

// 인기 레시피
export const popularRecipes: Recipe[] = [
  {
    id: 1,
    title: '두부 스테이크',
    description: '크리미한 버섯 소스와 구운 채소를 곁들인',
    image: unsplashImage('1546835261-3c2d81625009'), // Tofu steak
  },
  {
    id: 2,
    title: '비건 파스타',
    description: '발사믹 토마토 소스와 신선한 바질을 곁들인',
    image: unsplashImage('1621996346565-e3dbc646d9a9'), // Vegan pasta
  },
  {
    id: 3,
    title: '아보카도 샐러드 볼',
    description: '구운 감자 웨지와 신선한 채소를 곁들인',
    image: unsplashImage('1512621776958-a8b99277a0e5'), // Avocado salad bowl
  },
];

// 카테고리별 레시피 (RecipePage에서 사용)
export const recipeCategoriesData = [
  {
    id: 'new',
    title: '이번 주 새로 올라온 레시피',
    subtitle: '신규레시피',
    recipes: [
      { id: 101, title: '콩나물 비빔밥', description: '고소한 참기름 향 가득', image: unsplashImage('1555939594-58d7cb561ad1'), author: '비건셰프', likes: 234 }, // Bibimbap
      { id: 102, title: '당근 라페 샌드위치', description: '아삭한 식감이 일품', image: unsplashImage('1528735602780-2552fd46c7af'), author: '채식러버', likes: 189 }, // Carrot sandwich
      { id: 103, title: '올리브 파스타', description: '지중해 풍미 가득', image: unsplashImage('1621996346565-e3dbc646d9a9'), author: '이탈리안', likes: 156 }, // Olive pasta
      { id: 104, title: '피스타치오 페스토', description: '고급스러운 녹색 소스', image: unsplashImage('1556911220-bff31c812a08'), author: '홈쿡러', likes: 312 }, // Pesto pasta
      { id: 105, title: '무화과 샐러드', description: '달콤한 제철 과일과 함께', image: unsplashImage('1544025162-d76694265947'), author: '계절요리', likes: 278 }, // Fig salad
    ],
  },
  {
    id: 'lunch',
    title: '맛있는 점심으로 하루 채우기',
    subtitle: '점심',
    recipes: [
      { id: 201, title: '두부 덮밥', description: '든든한 단백질 한 그릇', image: unsplashImage('1546835261-3c2d81625009'), author: '점심왕', likes: 445 }, // Tofu rice bowl
      { id: 202, title: '야채 카레', description: '향신료 가득한 건강식', image: unsplashImage('1585937421612-70a008356fbe'), author: '카레매니아', likes: 389 }, // Vegetable curry
      { id: 203, title: '비빔국수', description: '새콤달콤 입맛 돋우는', image: unsplashImage('1556911220-bff31c812a08'), author: '면요리사', likes: 521 }, // Cold noodles
      { id: 204, title: '샐러드 랩', description: '간편하고 건강한 한 끼', image: unsplashImage('1512621776958-a8b99277a0e5'), author: '다이어터', likes: 298 }, // Salad wrap
      { id: 205, title: '버섯 덮밥', description: '쫄깃한 식감의 영양밥', image: unsplashImage('1526318896980-cf78c088247c'), author: '버섯사랑', likes: 367 }, // Mushroom rice bowl
    ],
  },
  {
    id: 'dessert',
    title: '디저트는 내 삶의 낙이야',
    subtitle: '디저트',
    recipes: [
      { id: 301, title: '코코넛 푸딩', description: '열대의 달콤함을 담아', image: unsplashImage('1551024506-0bccd828d307'), author: '디저트왕', likes: 623 }, // Coconut pudding
      { id: 302, title: '블루베리 타르트', description: '상큼한 보라빛 유혹', image: unsplashImage('1603048297172-c92544798d5a'), author: '베이커리', likes: 578 }, // Blueberry tart
      { id: 303, title: '망고스틴 아이스크림', description: '이국적인 과일의 향연', image: unsplashImage('1534939561126-855b8675edd7'), author: '아이스크림', likes: 445 }, // Mango ice cream
      { id: 304, title: '포도 젤리', description: '탱글탱글 보석같은', image: unsplashImage('1610305037320-69d55ac4055e'), author: '젤리장인', likes: 389 }, // Grape jelly
      { id: 305, title: '라즈베리 무스', description: '부드럽고 새콤한', image: unsplashImage('1588196749597-9ff075ee6b5b'), author: '무스마스터', likes: 512 }, // Raspberry mousse
    ],
  },
  {
    id: 'korean',
    title: '할머니 손맛이 그리울 때',
    subtitle: '한식',
    recipes: [
      { id: 401, title: '배추된장국', description: '구수한 된장의 깊은 맛', image: unsplashImage('1611305756194-1d09e5c4b1c9'), author: '한식셰프', likes: 734 }, // Korean soup
      { id: 402, title: '마늘종 볶음', description: '밥도둑 반찬의 정석', image: unsplashImage('1582878826629-29b7ad1cdc43'), author: '반찬왕', likes: 623 }, // Garlic chives
      { id: 403, title: '생강차', description: '몸을 따뜻하게 해주는', image: unsplashImage('1556911220-bff31c812a08'), author: '차전문가', likes: 456 }, // Ginger tea
      { id: 404, title: '파전', description: '비 오는 날의 필수템', image: unsplashImage('1617196034183-421b4917c92d'), author: '전요리사', likes: 589 }, // Korean pancake
      { id: 405, title: '고추장 비빔밥', description: '매콤 달콤 환상 조합', image: unsplashImage('1555939594-58d7cb561ad1'), author: '비빔밥러버', likes: 678 }, // Gochujang bibimbap
    ],
  },
  {
    id: 'drink',
    title: '오늘 한 잔, 안주는 내가 만들게',
    subtitle: '술안주',
    recipes: [
      { id: 501, title: '땅콩 조림', description: '짭짤하고 고소한', image: unsplashImage('1556911220-bff31c812a08'), author: '술꾼', likes: 445 }, // Peanuts
      { id: 502, title: '옥수수 치즈구이', description: '달콤 짭짤 중독성', image: unsplashImage('1528735602780-2552fd46c7af'), author: '안주왕', likes: 534 }, // Corn
      { id: 503, title: '아스파라거스 구이', description: '고급스러운 바 스타일', image: unsplashImage('1544025162-d76694265947'), author: '바텐더', likes: 367 }, // Grilled asparagus
      { id: 504, title: '브로콜리 튀김', description: '바삭한 식감의 매력', image: unsplashImage('1528735602780-2552fd46c7af'), author: '튀김장인', likes: 423 }, // Broccoli
      { id: 505, title: '딜 감자튀김', description: '허브 향 가득한', image: unsplashImage('1582037926247-6f8b8e4f5dc7'), author: '감자사랑', likes: 489 }, // Potatoes
    ],
  },
  {
    id: 'date',
    title: '오늘 저녁, 특별한 사람과 함께',
    subtitle: '데이트',
    recipes: [
      { id: 601, title: '트러플 리조또', description: '로맨틱한 저녁을 위해', image: unsplashImage('1556910103-1c02745aae4d'), author: '로맨티스트', likes: 789 }, // Truffle risotto
      { id: 602, title: '레몬 파스타', description: '상큼한 지중해 풍미', image: unsplashImage('1621996346565-e3dbc646d9a9'), author: '파스타장인', likes: 656 }, // Lemon pasta
      { id: 603, title: '복숭아 카프레제', description: '여름밤의 상큼함', image: unsplashImage('1544025162-d76694265947'), author: '샐러드마스터', likes: 534 }, // Peach caprese
      { id: 604, title: '키위 모히또', description: '청량한 칵테일 한 잔', image: unsplashImage('1527668752968-14dc70a27c95'), author: '믹솔로지스트', likes: 612 }, // Kiwi mojito
      { id: 605, title: '리치 샴페인', description: '달콤한 축배를 위해', image: unsplashImage('1510812431401-41d2bd2722f3'), author: '소믈리에', likes: 567 }, // Lychee champagne
    ],
  },
];

// 모든 레시피를 하나의 배열로 합치기
export const allRecipes: Recipe[] = recipeCategoriesData.flatMap(category => category.recipes);

// ID로 레시피 찾기
export const getRecipeById = (id: number | string): Recipe | null => {
  const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
  return allRecipes.find(r => r.id === recipeId) || null;
};

// 상세 레시피 데이터 가져오기
import { getRecipeDetails } from './recipeDetails';

// 상세 레시피 데이터 (기본 샘플)
export const getDetailedRecipe = (id: number | string): Recipe | null => {
  const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
  const baseRecipe = getRecipeById(recipeId);
  
  if (!baseRecipe) {
    return null;
    // 기본 샘플 레시피 반환
    return {
      id: 1,
      title: '크리미 버섯 리조또',
      subtitle: '트러플 오일과 파마산 치즈를 곁들인',
      description: '부드럽고 크리미한 이 버섯 리조또는 당신의 저녁 식탁을 풍요롭게 만들어줄 거예요.',
      image: '/vege_flot_img/mushroom.png',
      heroImage: '/vege_flot_img/mushroom.png',
      author: '비건셰프',
      likes: 1847,
      tags: ['고단백', '지중해식', '식이섬유', '간편조리', '원팟요리'],
      allergens: ['유제품'],
      totalTime: '35분',
      prepTime: '10분',
      cookTime: '25분',
      difficulty: '보통',
      servings: 2,
      ingredients: [
        { name: '아르보리오 쌀', amount: '200g' },
        { name: '양송이버섯', amount: '150g' },
        { name: '표고버섯', amount: '100g' },
        { name: '양파', amount: '1개' },
        { name: '마늘', amount: '3쪽' },
        { name: '채소 육수', amount: '800ml' },
        { name: '드라이 화이트 와인', amount: '100ml' },
        { name: '파마산 치즈', amount: '50g', note: '비건 대체 가능' },
        { name: '버터', amount: '30g', note: '비건 버터 대체 가능' },
        { name: '트러플 오일', amount: '1큰술' },
        { name: '소금, 후추', amount: '적당량' },
        { name: '파슬리', amount: '약간', note: '장식용' },
      ],
      steps: [
        {
          step: 1,
          title: '재료 준비',
          instructions: [
            '버섯은 깨끗이 닦아 먹기 좋은 크기로 슬라이스합니다.',
            '양파와 마늘은 곱게 다집니다.',
            '채소 육수는 따뜻하게 데워둡니다.',
          ],
        },
        {
          step: 2,
          title: '버섯 볶기',
          instructions: [
            '큰 팬에 버터 절반을 녹이고 버섯을 넣어 중강불에서 5-7분간 노릇하게 볶습니다.',
            '소금, 후추로 간을 하고 따로 덜어둡니다.',
          ],
        },
        {
          step: 3,
          title: '리조또 베이스 만들기',
          instructions: [
            '같은 팬에 남은 버터를 녹이고 양파를 넣어 투명해질 때까지 볶습니다.',
            '마늘을 넣고 30초간 더 볶아 향을 냅니다.',
            '아르보리오 쌀을 넣고 2분간 볶아 쌀이 반투명해지도록 합니다.',
          ],
        },
        {
          step: 4,
          title: '육수 추가하며 익히기',
          instructions: [
            '화이트 와인을 넣고 알코올이 날아갈 때까지 저어줍니다.',
            '따뜻한 육수를 한 국자씩 넣으며, 쌀이 육수를 흡수할 때마다 추가합니다.',
            '약 18-20분간 계속 저어가며 쌀이 알덴테가 될 때까지 익힙니다.',
          ],
          tip: '육수는 반드시 따뜻하게 유지해야 리조또가 균일하게 익습니다.',
        },
        {
          step: 5,
          title: '마무리',
          instructions: [
            '불을 끄고 볶아둔 버섯, 파마산 치즈, 트러플 오일을 넣어 섞습니다.',
            '소금, 후추로 간을 맞추고 그릇에 담습니다.',
            '파슬리를 뿌려 장식하고 바로 서빙합니다.',
          ],
        },
      ],
      nutrition: {
        calories: 485,
        fat: 18,
        saturatedFat: 6.5,
        carbs: 62,
        sugar: 4,
        fiber: 5,
        protein: 14,
      },
      relatedRecipes: [
        { id: 2, title: '아스파라거스 리조또', description: '봄의 향기를 담은', image: '/vege_flot_img/asparagus.png' },
        { id: 3, title: '레몬 허브 리조또', description: '상큼한 지중해 스타일', image: '/vege_flot_img/lemon.png' },
        { id: 4, title: '토마토 바질 리조또', description: '이탈리안 클래식', image: '/vege_flot_img/tomato.png' },
        { id: 5, title: '호박 리조또', description: '달콤하고 고소한', image: '/vege_flot_img/sweet potato.png' },
      ],
    };
  }
  
  // 상세 정보 가져오기
  const details = getRecipeDetails(recipeId);
  
  // 기본 레시피에 상세 정보 추가
  return {
    ...baseRecipe,
    ...(details || {}),
    subtitle: baseRecipe.subtitle || details?.subtitle || `${baseRecipe.title} 레시피`,
    heroImage: baseRecipe.image || details?.heroImage,
    totalTime: details?.totalTime || '30분',
    prepTime: details?.prepTime || '10분',
    cookTime: details?.cookTime || '20분',
    difficulty: details?.difficulty || '보통',
    servings: details?.servings || 2,
    ingredients: baseRecipe.ingredients || details?.ingredients || [
      { name: '주재료', amount: '적당량' },
      { name: '조미료', amount: '적당량' },
    ],
    steps: baseRecipe.steps || details?.steps || [
      {
        step: 1,
        title: '준비',
        instructions: ['재료를 준비합니다.'],
      },
    ],
    nutrition: baseRecipe.nutrition || details?.nutrition || {
      calories: 300,
      fat: 10,
      saturatedFat: 2,
      carbs: 40,
      sugar: 5,
      fiber: 5,
      protein: 15,
    },
    allergens: baseRecipe.allergens || details?.allergens || [],
    tags: baseRecipe.tags || details?.tags || ['비건', '건강'],
    relatedRecipes: baseRecipe.relatedRecipes || allRecipes.filter(r => r.id !== baseRecipe.id).slice(0, 4),
    dietCategory: baseRecipe.dietCategory || details?.dietCategory || '완전비건',
    recipeCategory: baseRecipe.recipeCategory || details?.recipeCategory || '점심',
  };
};

