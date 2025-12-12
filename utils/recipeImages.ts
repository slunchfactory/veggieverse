// 레시피 ID별 Unsplash 이미지 매핑 (임시)
const recipeImageMap: Record<number, string> = {
  // 명예의 전당 (1-20)
  1: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=500&fit=crop', // 리조또
  2: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&h=500&fit=crop', // 포케
  3: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop', // 파스타
  4: 'https://images.unsplash.com/photo-1611305756194-1d09e5c4b1c9?w=500&h=500&fit=crop', // 된장국
  5: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=500&fit=crop', // 푸딩
  6: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop', // 오트밀
  7: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=500&fit=crop', // 수프
  8: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', // 퀴노아
  9: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=500&fit=crop', // 브루스케타
  10: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=500&fit=crop', // 스무디
  11: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop', // 당근 수프
  12: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop', // 올리브
  13: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=500&fit=crop', // 푸딩
  14: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop', // 페스토
  15: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=500&fit=crop', // 샐러드
  16: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=500&fit=crop', // 비네그렛
  17: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=500&h=500&fit=crop', // 스무디
  18: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop', // 타르트
  19: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop', // 볶음밥
  20: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=500&h=500&fit=crop', // 가스파초
  
  // 신규 (101-105)
  101: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop', // 비빔밥
  102: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=500&fit=crop', // 샌드위치
  103: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop', // 파스타
  104: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop', // 페스토
  105: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=500&fit=crop', // 샐러드
  
  // 점심 (201-205)
  201: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop', // 덮밥
  202: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop', // 카레
  203: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&h=500&fit=crop', // 국수
  204: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop', // 랩
  205: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=500&fit=crop', // 덮밥
  
  // 디저트 (301-305)
  301: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=500&fit=crop', // 푸딩
  302: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop', // 타르트
  303: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500&h=500&fit=crop', // 아이스크림
  304: 'https://images.unsplash.com/photo-1610305037320-69d55ac4055e?w=500&h=500&fit=crop', // 젤리
  305: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=500&h=500&fit=crop', // 무스
  
  // 한식 (401-405)
  401: 'https://images.unsplash.com/photo-1611305756194-1d09e5c4b1c9?w=500&h=500&fit=crop', // 된장국
  402: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&h=500&fit=crop', // 볶음
  403: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop', // 차
  404: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=500&h=500&fit=crop', // 전
  405: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop', // 비빔밥
  
  // 술안주 (501-505)
  501: 'https://images.unsplash.com/photo-1611305756194-1d09e5c4b1c9?w=500&h=500&fit=crop', // 조림
  502: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop', // 구이
  503: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop', // 아스파라거스
  504: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop', // 튀김
  505: 'https://images.unsplash.com/photo-1582037926247-6f8b8e4f5dc7?w=500&h=500&fit=crop', // 감자튀김
  
  // 데이트 (601-605)
  601: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=500&fit=crop', // 리조또
  602: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop', // 파스타
  603: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&h=500&fit=crop', // 카프레제
  604: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=500&h=500&fit=crop', // 모히또
  605: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=500&fit=crop', // 샴페인
};

// 히어로 이미지용 (더 큰 사이즈)
const recipeHeroImageMap: Record<number, string> = {
  // 명예의 전당
  1: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=800&fit=crop',
  2: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=1200&h=800&fit=crop',
  3: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&h=800&fit=crop',
  4: 'https://images.unsplash.com/photo-1611305756194-1d09e5c4b1c9?w=1200&h=800&fit=crop',
  5: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=800&fit=crop',
  
  // 신규
  101: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=800&fit=crop',
  102: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&h=800&fit=crop',
  103: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&h=800&fit=crop',
  104: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=800&fit=crop',
  105: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=1200&h=800&fit=crop',
};

/**
 * 레시피 ID에 해당하는 썸네일 이미지 경로 반환
 */
export const getRecipeThumbnailImage = (recipeId: number): string => {
  // 임시: Unsplash 이미지 사용
  if (recipeImageMap[recipeId]) {
    return recipeImageMap[recipeId];
  }
  
  // 없으면 로컬 경로 시도
  const baseUrl = import.meta.env.BASE_URL || '/veggieverse/';
  return `${baseUrl}recipe/thumbnails/recipe-${recipeId}.jpg`;
};

/**
 * 레시피 ID에 해당하는 상세 이미지 경로 반환 (히어로 이미지)
 */
export const getRecipeHeroImage = (recipeId: number): string => {
  // 임시: Unsplash 이미지 사용
  if (recipeHeroImageMap[recipeId]) {
    return recipeHeroImageMap[recipeId];
  }
  
  // 없으면 썸네일 이미지 사용
  if (recipeImageMap[recipeId]) {
    return recipeImageMap[recipeId].replace('w=500&h=500', 'w=1200&h=800');
  }
  
  // 없으면 로컬 경로 시도
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

