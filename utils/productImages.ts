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
        getImageUrl('store/thumbnails/볶음김치/김치)볶음김치캔1.jpg'),
        getImageUrl('store/thumbnails/볶음김치/김치)볶음김치캔2.jpg'),
        getImageUrl('store/thumbnails/볶음김치/김치)볶음김치캔3.jpg'),
        getImageUrl('store/thumbnails/볶음김치/김치)볶음김치캔4.jpg'),
        getImageUrl('store/thumbnails/볶음김치/김치)볶음김치캔5.jpg'),
        getImageUrl('store/thumbnails/볶음김치/김치)볶음김치캔6.png'),
      ].filter(Boolean);
    
    case 3:
      // 김치볶음밥 밀키트
      return [
        getImageUrl('store/thumbnails/김치볶음밥 밀키트/김치)밀키트1.jpg'),
        getImageUrl('store/thumbnails/김치볶음밥 밀키트/김치)밀키트2.jpg'),
        getImageUrl('store/thumbnails/김치볶음밥 밀키트/김치)밀키트3.jpg'),
        getImageUrl('store/thumbnails/김치볶음밥 밀키트/김치)밀키트4.jpg'),
        getImageUrl('store/thumbnails/김치볶음밥 밀키트/김치)밀키트5.jpg'),
        getImageUrl('store/thumbnails/김치볶음밥 밀키트/김치)밀키트6.png'),
      ].filter(Boolean);
    
    case 4:
      // 시금치 뇨끼
      return [
        getImageUrl('store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼1.jpg'),
        getImageUrl('store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼2.jpg'),
        getImageUrl('store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼3.jpg'),
        getImageUrl('store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼4.jpg'),
        getImageUrl('store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼5.jpg'),
        getImageUrl('store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼6.png'),
      ].filter(Boolean);
    
    case 5:
      // 블루베리 타르트 (조각)
      return [
        getImageUrl('store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각1.jpg'),
        getImageUrl('store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각2.jpg'),
        getImageUrl('store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각3.jpg'),
        getImageUrl('store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각4.jpg'),
        getImageUrl('store/thumbnails/블루베리 타르트_조각/타르트3종)조각 공통썸네일1.jpg'),
        getImageUrl('store/thumbnails/블루베리 타르트_조각/타르트3종)조각 공통썸네일2.jpg'),
      ].filter(Boolean);
    
    case 6:
      // 자두 타르트 (조각)
      return [
        getImageUrl('store/thumbnails/자두 타르트_조각/자두타르트)조각1.jpg'),
        getImageUrl('store/thumbnails/자두 타르트_조각/자두타르트)조각2.jpg'),
        getImageUrl('store/thumbnails/자두 타르트_조각/타르트3종)조각 공통썸네일1.jpg'),
        getImageUrl('store/thumbnails/자두 타르트_조각/타르트3종)조각 공통썸네일2.jpg'),
      ].filter(Boolean);
    
    case 7:
      // 복숭아 타르트 (조각)
      return [
        getImageUrl('store/thumbnails/복숭아 타르트_조각/복숭아타르트)조각1.jpg'),
        getImageUrl('store/thumbnails/복숭아 타르트_조각/복숭아타르트)조각2.jpg'),
        getImageUrl('store/thumbnails/복숭아 타르트_조각/복숭아타르트)조각3.jpg'),
        getImageUrl('store/thumbnails/복숭아 타르트_조각/타르트3종)조각 공통썸네일1.jpg'),
        getImageUrl('store/thumbnails/복숭아 타르트_조각/타르트3종)조각 공통썸네일2.jpg'),
      ].filter(Boolean);
    
    case 8:
      // 잠봉뵈르
      return [
        getImageUrl('store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르1.jpg'),
        getImageUrl('store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르2.jpg'),
        getImageUrl('store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르3.jpg'),
        getImageUrl('store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르4.jpg'),
        getImageUrl('store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르5.jpg'),
      ].filter(Boolean);
    
    case 9:
    case 10:
      // 피넛버터초코바
      return [
        getImageUrl('store/thumbnails/피넛버터초코바/피넛버터초코바1.jpg'),
        getImageUrl('store/thumbnails/피넛버터초코바/피넛버터초코바2.jpg'),
        getImageUrl('store/thumbnails/피넛버터초코바/피넛버터초코바3.jpg'),
        getImageUrl('store/thumbnails/피넛버터초코바/피넛버터초코바4.jpg'),
        getImageUrl('store/thumbnails/피넛버터초코바/피넛버터초코바5.jpg'),
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
    getImageUrl('main/products/김치)볶음김치캔5.jpg'),
    getImageUrl('main/products/시금치뇨끼6.png'),
    getImageUrl('main/products/자두타르트)홀1.jpg'),
    getImageUrl('main/products/피넛버터초코바4.jpg'),
  ];
  return images[index] || '';
};

