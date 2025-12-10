/**
 * 레시피 ID에 해당하는 썸네일 이미지 경로 반환
 */
export const getRecipeThumbnailImage = (recipeId: number): string => {
  const baseUrl = import.meta.env.BASE_URL || '/veggieverse/';
  // 레시피 ID별 이미지 경로
  // 실제 이미지 파일명은 recipe-{id}.jpg 또는 recipe-{id}.png 형태로 저장하면 됩니다
  return `${baseUrl}recipe/thumbnails/recipe-${recipeId}.jpg`;
};

/**
 * 레시피 ID에 해당하는 상세 이미지 경로 반환 (히어로 이미지)
 */
export const getRecipeHeroImage = (recipeId: number): string => {
  const baseUrl = import.meta.env.BASE_URL || '/veggieverse/';
  return `${baseUrl}recipe/details/recipe-${recipeId}.jpg`;
};

/**
 * 이미지 로드 실패 시 fallback 이미지 반환
 */
export const getFallbackRecipeImage = (recipeId: number): string => {
  // 재료 아이콘을 fallback으로 사용
  const ingredientIcons = [
    '/vege_flot_img/mushroom.png',
    '/vege_flot_img/avocado.png',
    '/vege_flot_img/lemon.png',
    '/vege_flot_img/napa cabbage.png',
    '/vege_flot_img/coconut.png',
    '/vege_flot_img/blueberry.png',
    '/vege_flot_img/sweet potato.png',
    '/vege_flot_img/broccoli.png',
    '/vege_flot_img/tomato.png',
    '/vege_flot_img/mango.png',
  ];
  return ingredientIcons[recipeId % ingredientIcons.length];
};

