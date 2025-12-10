/**
 * URL 안전한 경로 생성 헬퍼
 */
const getImageUrl = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '/veggieverse/';
  // baseUrl 끝의 슬래시와 path 앞의 슬래시 정리
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Vite는 public 폴더의 파일을 그대로 복사하므로 직접 경로 사용
  // 브라우저가 자동으로 URL 인코딩 처리
  return `${cleanBase}/${cleanPath}`;
};

/**
 * 상품 ID에 해당하는 썸네일 이미지 경로 배열을 반환
 */
export const getProductThumbnailImages = (productId: number): string[] => {
  switch (productId) {
    case 1:
    case 2:
      // 볶음김치
      return [
        getImageUrl('store/thumbnails/kimchi/kimchi-can-1.jpg'),
        getImageUrl('store/thumbnails/kimchi/kimchi-can-2.jpg'),
        getImageUrl('store/thumbnails/kimchi/kimchi-can-3.jpg'),
        getImageUrl('store/thumbnails/kimchi/kimchi-can-4.jpg'),
        getImageUrl('store/thumbnails/kimchi/kimchi-can-5.jpg'),
        getImageUrl('store/thumbnails/kimchi/kimchi-can-6.png'),
      ].filter(Boolean);
    
    case 3:
      // 김치볶음밥 밀키트
      return [
        getImageUrl('store/thumbnails/kimchi-fried-rice-mealkit/kimchi-mealkit-1.jpg'),
        getImageUrl('store/thumbnails/kimchi-fried-rice-mealkit/kimchi-mealkit-2.jpg'),
        getImageUrl('store/thumbnails/kimchi-fried-rice-mealkit/kimchi-mealkit-3.jpg'),
        getImageUrl('store/thumbnails/kimchi-fried-rice-mealkit/kimchi-mealkit-4.jpg'),
        getImageUrl('store/thumbnails/kimchi-fried-rice-mealkit/kimchi-mealkit-5.jpg'),
        getImageUrl('store/thumbnails/kimchi-fried-rice-mealkit/kimchi-mealkit-6.png'),
      ].filter(Boolean);
    
    case 4:
      // 시금치 뇨끼
      return [
        getImageUrl('store/thumbnails/spinach-gnocchi-mealkit/spinach-gnocchi-1.jpg'),
        getImageUrl('store/thumbnails/spinach-gnocchi-mealkit/spinach-gnocchi-2.jpg'),
        getImageUrl('store/thumbnails/spinach-gnocchi-mealkit/spinach-gnocchi-3.jpg'),
        getImageUrl('store/thumbnails/spinach-gnocchi-mealkit/spinach-gnocchi-4.jpg'),
        getImageUrl('store/thumbnails/spinach-gnocchi-mealkit/spinach-gnocchi-5.jpg'),
        getImageUrl('store/thumbnails/spinach-gnocchi-mealkit/spinach-gnocchi-6.png'),
      ].filter(Boolean);
    
    case 5:
      // 블루베리 타르트 (조각)
      return [
        getImageUrl('store/thumbnails/blueberry-tart-piece/blueberry-tart-piece-1.jpg'),
        getImageUrl('store/thumbnails/blueberry-tart-piece/blueberry-tart-piece-2.jpg'),
        getImageUrl('store/thumbnails/blueberry-tart-piece/blueberry-tart-piece-3.jpg'),
        getImageUrl('store/thumbnails/blueberry-tart-piece/blueberry-tart-piece-4.jpg'),
        getImageUrl('store/thumbnails/blueberry-tart-piece/tart-3-piece-common-1.jpg'),
        getImageUrl('store/thumbnails/blueberry-tart-piece/tart-3-piece-common-2.jpg'),
      ].filter(Boolean);
    
    case 6:
      // 자두 타르트 (조각)
      return [
        getImageUrl('store/thumbnails/plum-tart-piece/plum-tart-piece-1.jpg'),
        getImageUrl('store/thumbnails/plum-tart-piece/plum-tart-piece-2.jpg'),
        getImageUrl('store/thumbnails/plum-tart-piece/tart-3-piece-common-1.jpg'),
        getImageUrl('store/thumbnails/plum-tart-piece/tart-3-piece-common-2.jpg'),
      ].filter(Boolean);
    
    case 7:
      // 복숭아 타르트 (조각)
      return [
        getImageUrl('store/thumbnails/peach-tart-piece/peach-tart-piece-1.jpg'),
        getImageUrl('store/thumbnails/peach-tart-piece/peach-tart-piece-2.jpg'),
        getImageUrl('store/thumbnails/peach-tart-piece/peach-tart-piece-3.jpg'),
        getImageUrl('store/thumbnails/peach-tart-piece/tart-3-piece-common-1.jpg'),
        getImageUrl('store/thumbnails/peach-tart-piece/tart-3-piece-common-2.jpg'),
      ].filter(Boolean);
    
    case 8:
      // 잠봉뵈르
      return [
        getImageUrl('store/thumbnails/jambon-beurre-mealkit/jambon-beurre-1.jpg'),
        getImageUrl('store/thumbnails/jambon-beurre-mealkit/jambon-beurre-2.jpg'),
        getImageUrl('store/thumbnails/jambon-beurre-mealkit/jambon-beurre-3.jpg'),
        getImageUrl('store/thumbnails/jambon-beurre-mealkit/jambon-beurre-4.jpg'),
        getImageUrl('store/thumbnails/jambon-beurre-mealkit/jambon-beurre-5.jpg'),
      ].filter(Boolean);
    
    case 9:
    case 10:
      // 피넛버터초코바
      return [
        getImageUrl('store/thumbnails/peanut-butter-choco-bar/peanut-butter-choco-bar-1.jpg'),
        getImageUrl('store/thumbnails/peanut-butter-choco-bar/peanut-butter-choco-bar-2.jpg'),
        getImageUrl('store/thumbnails/peanut-butter-choco-bar/peanut-butter-choco-bar-3.jpg'),
        getImageUrl('store/thumbnails/peanut-butter-choco-bar/peanut-butter-choco-bar-4.jpg'),
        getImageUrl('store/thumbnails/peanut-butter-choco-bar/peanut-butter-choco-bar-5.jpg'),
      ].filter(Boolean);
    
    default:
      return [];
  }
};

/**
 * 홈페이지 상품 이미지 경로
 */
export const getHomeProductImage = (index: number): string => {
  const images = [
    getImageUrl('main/products/kimchi-can-5.jpg'),
    getImageUrl('main/products/spinach-gnocchi-6.png'),
    getImageUrl('main/products/plum-tart-whole-1.jpg'),
    getImageUrl('main/products/peanut-butter-choco-bar-4.jpg'),
  ];
  return images[index] || '';
};

