/**
 * 상품 ID에 해당하는 썸네일 이미지 경로 배열을 반환
 */
export const getProductThumbnailImages = (productId: number): string[] => {
  const baseUrl = import.meta.env.BASE_URL || '/veggieverse/';
  
  switch (productId) {
    case 1:
    case 2:
      // 볶음김치
      return [
        `${baseUrl}store/thumbnails/볶음김치/김치)볶음김치캔1.jpg`,
        `${baseUrl}store/thumbnails/볶음김치/김치)볶음김치캔2.jpg`,
        `${baseUrl}store/thumbnails/볶음김치/김치)볶음김치캔3.png`,
        `${baseUrl}store/thumbnails/볶음김치/김치)볶음김치캔4.jpg`,
        `${baseUrl}store/thumbnails/볶음김치/김치)볶음김치캔5.jpg`,
        `${baseUrl}store/thumbnails/볶음김치/김치)볶음김치캔6.png`,
      ].filter(Boolean);
    
    case 3:
      // 김치볶음밥 밀키트
      return [
        `${baseUrl}store/thumbnails/김치볶음밥 밀키트/김치)밀키트1.jpg`,
        `${baseUrl}store/thumbnails/김치볶음밥 밀키트/김치)밀키트2.jpg`,
        `${baseUrl}store/thumbnails/김치볶음밥 밀키트/김치)밀키트3.jpg`,
        `${baseUrl}store/thumbnails/김치볶음밥 밀키트/김치)밀키트4.jpg`,
        `${baseUrl}store/thumbnails/김치볶음밥 밀키트/김치)밀키트5.jpg`,
        `${baseUrl}store/thumbnails/김치볶음밥 밀키트/김치)밀키트6.png`,
      ].filter(Boolean);
    
    case 4:
      // 시금치 뇨끼
      return [
        `${baseUrl}store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼1.jpg`,
        `${baseUrl}store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼2.jpg`,
        `${baseUrl}store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼3.jpg`,
        `${baseUrl}store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼4.jpg`,
        `${baseUrl}store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼5.jpg`,
        `${baseUrl}store/thumbnails/시금치뇨끼 밀키트/시금치뇨끼6.png`,
      ].filter(Boolean);
    
    case 5:
      // 블루베리 타르트 (조각)
      return [
        `${baseUrl}store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각1.jpg`,
        `${baseUrl}store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각2.jpg`,
        `${baseUrl}store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각3.jpg`,
        `${baseUrl}store/thumbnails/블루베리 타르트_조각/블루베리타르트)조각4.jpg`,
        `${baseUrl}store/thumbnails/블루베리 타르트_조각/타르트3종)조각 공통썸네일1.jpg`,
        `${baseUrl}store/thumbnails/블루베리 타르트_조각/타르트3종)조각 공통썸네일2.jpg`,
      ].filter(Boolean);
    
    case 6:
      // 자두 타르트 (조각)
      return [
        `${baseUrl}store/thumbnails/자두 타르트_조각/자두타르트)조각1.jpg`,
        `${baseUrl}store/thumbnails/자두 타르트_조각/자두타르트)조각2.jpg`,
        `${baseUrl}store/thumbnails/자두 타르트_조각/타르트3종)조각 공통썸네일1.jpg`,
        `${baseUrl}store/thumbnails/자두 타르트_조각/타르트3종)조각 공통썸네일2.jpg`,
      ].filter(Boolean);
    
    case 7:
      // 복숭아 타르트 (조각)
      return [
        `${baseUrl}store/thumbnails/복숭아 타르트_조각/복숭아타르트)조각1.jpg`,
        `${baseUrl}store/thumbnails/복숭아 타르트_조각/복숭아타르트)조각2.jpg`,
        `${baseUrl}store/thumbnails/복숭아 타르트_조각/복숭아타르트)조각3.jpg`,
        `${baseUrl}store/thumbnails/복숭아 타르트_조각/타르트3종)조각 공통썸네일1.jpg`,
        `${baseUrl}store/thumbnails/복숭아 타르트_조각/타르트3종)조각 공통썸네일2.jpg`,
      ].filter(Boolean);
    
    case 8:
      // 잠봉뵈르
      return [
        `${baseUrl}store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르1.jpg`,
        `${baseUrl}store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르2.jpg`,
        `${baseUrl}store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르3.jpg`,
        `${baseUrl}store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르4.jpg`,
        `${baseUrl}store/thumbnails/잠봉뵈르 밀키트/잠봉뵈르5.jpg`,
      ].filter(Boolean);
    
    case 9:
    case 10:
      // 피넛버터초코바
      return [
        `${baseUrl}store/thumbnails/피넛버터초코바/피넛버터초코바1.jpg`,
        `${baseUrl}store/thumbnails/피넛버터초코바/피넛버터초코바2.jpg`,
        `${baseUrl}store/thumbnails/피넛버터초코바/피넛버터초코바3.jpg`,
        `${baseUrl}store/thumbnails/피넛버터초코바/피넛버터초코바4.jpg`,
        `${baseUrl}store/thumbnails/피넛버터초코바/피넛버터초코바5.jpg`,
      ].filter(Boolean);
    
    default:
      return [];
  }
};

/**
 * 홈페이지 상품 이미지 경로
 */
export const getHomeProductImage = (index: number): string => {
  const baseUrl = import.meta.env.BASE_URL || '/veggieverse/';
  const images = [
    `${baseUrl}main/products/김치)볶음김치캔5.jpg`,
    `${baseUrl}main/products/시금치뇨끼6.png`,
    `${baseUrl}main/products/자두타르트)홀1.jpg`,
    `${baseUrl}main/products/피넛버터초코바4.jpg`,
  ];
  return images[index] || '';
};

