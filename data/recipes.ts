// 슬런치 레시피 데이터 import
import { recipesDetail, RecipeDetail } from './slunchRecipes';
import { recipes as slunchListData } from './slunchList';

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

// ============================================
// 슬런치 리스트 데이터 → 기존 Recipe 형식 변환
// ============================================

// placeholder 제외한 유효 레시피
const validListRecipes = slunchListData.filter(r => r.code !== 'No.');

// 리스트 데이터를 Recipe로 변환
const listToRecipe = (r: typeof slunchListData[0]): Recipe => ({
  id: r.id,
  title: r.name,
  description: r.ingredients.split(',').slice(0, 3).join(', ').replace(/\s*\d+[gml개쪽장]+/g, ''),
  image: `https://images.unsplash.com/photo-1546835261-3c2d81625009?auto=format&fit=crop&q=80&w=800`,
  author: r.author.replace('@', ''),
  likes: r.likes,
});

// 인기 레시피
export const popularRecipes: Recipe[] = validListRecipes
  .filter(r => r.category === '인기')
  .map(listToRecipe);

// 카테고리별 레시피 (RecipePage에서 사용)
export const recipeCategoriesData = [
  { id: 'new', title: '이번 주 새로 올라온 레시피', subtitle: '신규레시피', slunchCategory: '신규' },
  { id: 'lunch', title: '맛있는 점심으로 하루 채우기', subtitle: '점심', slunchCategory: '점심' },
  { id: 'popular', title: '가장 사랑받는 인기 레시피', subtitle: '인기', slunchCategory: '인기' },
  { id: 'dessert', title: '디저트는 내 삶의 낙이야', subtitle: '디저트', slunchCategory: '디저트' },
].map(config => ({
  id: config.id,
  title: config.title,
  subtitle: config.subtitle,
  recipes: validListRecipes
    .filter(r => r.category === config.slunchCategory)
    .map(listToRecipe),
}));

// ============================================
// 슬런치 상세 데이터 → code 기반 매핑
// ============================================
const parseNumber = (str: string): number => {
  const match = str.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

// code → 상세 데이터 매핑 (빠른 조회용)
const detailByCode = new Map<string, RecipeDetail>();
for (const detail of recipesDetail) {
  detailByCode.set(detail.code, detail);
}

// listId → code 매핑
const codeById = new Map<number, string>();
for (const item of validListRecipes) {
  codeById.set(item.id, item.code);
}

// 모든 레시피를 하나의 배열로 합치기
export const allRecipes: Recipe[] = validListRecipes.map(listToRecipe);

// ID로 레시피 찾기
export const getRecipeById = (id: number | string): Recipe | null => {
  const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
  return allRecipes.find(r => r.id === recipeId) || null;
};

// 상세 레시피 데이터 가져오기
import { getRecipeDetails } from './recipeDetails';

// 상세 레시피 데이터
export const getDetailedRecipe = (id: number | string): Recipe | null => {
  const recipeId = typeof id === 'string' ? parseInt(id, 10) : id;
  const baseRecipe = getRecipeById(recipeId);

  if (!baseRecipe) {
    return null;
  }

  // code로 슬런치 상세 데이터 조회
  const code = codeById.get(recipeId);
  const detail = code ? detailByCode.get(code) : null;

  // code prefix로 식습관 카테고리 결정
  const getDietCategory = (c: string | undefined): string => {
    if (!c) return '완전비건';
    if (c.startsWith('PP') || c.startsWith('CP')) return '페스코';
    if (c.startsWith('CV')) return '유연비건';
    return '완전비건'; // PV
  };

  if (detail) {
    // 슬런치 상세 데이터가 있는 경우 → 실제 데이터로 채움
    const ingredients: Array<{ name: string; amount: string; note?: string }> = [];
    for (const [category, items] of Object.entries(detail.ingredients.categories)) {
      for (const item of items) {
        ingredients.push({
          name: item.name,
          amount: `${item.amount}${item.unit}`,
          note: category,
        });
      }
    }

    const steps = detail.steps.map((step, idx) => ({
      step: idx + 1,
      title: step.title,
      instructions: [step.description],
      tip: step.tips || undefined,
      image: detail.images.steps[idx] || undefined,
    }));

    const nutrition = {
      calories: parseNumber(detail.nutrition['칼로리'] || '0'),
      fat: parseNumber(detail.nutrition['지방'] || '0'),
      saturatedFat: 0,
      carbs: parseNumber(detail.nutrition['탄수화물'] || '0'),
      sugar: 0,
      fiber: 0,
      protein: parseNumber(detail.nutrition['단백질'] || '0'),
    };

    const relatedRecipes = allRecipes
      .filter(r => r.id !== recipeId)
      .slice(0, 4)
      .map(r => ({ id: r.id, title: r.title, description: r.description, image: r.image }));

    return {
      ...baseRecipe,
      title: detail.name,
      description: detail.description,
      heroImage: detail.images.hero,
      author: detail.author.name,
      likes: detail.stats.likes,
      tags: detail.tags,
      totalTime: detail.cookingTime,
      difficulty: detail.difficulty,
      servings: parseNumber(detail.servings) || 2,
      ingredients,
      steps,
      nutrition,
      dietCategory: getDietCategory(code),
      recipeCategory: detail.tags.find(t => ['프랑스', '이탈리아', '한국', '일본', '태국', '멕시코', '인도', '중국'].includes(t)) || '비건',
      relatedRecipes,
    };
  }

  // 상세 데이터가 없는 경우 → 기본 폴백
  const fallbackDetails = getRecipeDetails(recipeId);
  return {
    ...baseRecipe,
    ...(fallbackDetails || {}),
    subtitle: baseRecipe.subtitle || `${baseRecipe.title} 레시피`,
    totalTime: fallbackDetails?.totalTime || '30분',
    difficulty: fallbackDetails?.difficulty || '보통',
    servings: fallbackDetails?.servings || 2,
    ingredients: fallbackDetails?.ingredients || [
      { name: '주재료', amount: '적당량' },
    ],
    steps: fallbackDetails?.steps || [
      { step: 1, title: '준비', instructions: ['재료를 준비합니다.'] },
    ],
    nutrition: fallbackDetails?.nutrition || {
      calories: 300, fat: 10, saturatedFat: 2, carbs: 40, sugar: 5, fiber: 5, protein: 15,
    },
    tags: baseRecipe.tags || ['비건', '건강'],
    relatedRecipes: allRecipes.filter(r => r.id !== baseRecipe.id).slice(0, 4),
    dietCategory: getDietCategory(code),
    recipeCategory: '점심',
  };
};

