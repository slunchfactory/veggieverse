// 재료 이름 → 실제 재료 이미지 자동 매핑 유틸리티
// Spoonacular CDN 사용 (일관된 스타일의 재료 이미지)

// 한글 재료명 → 영문 재료명 매핑
const koreanToEnglishMap: Record<string, string> = {
  // 버섯류
  '버섯': 'mushrooms',
  '양송이': 'white-mushrooms',
  '표고': 'shiitake-mushrooms',
  '새송이': 'king-trumpet-mushroom',
  '팽이': 'enoki-mushrooms',
  '느타리': 'oyster-mushrooms',
  '포르치니': 'porcini-mushrooms',
  '트러플': 'truffle',
  
  // 채소류
  '당근': 'carrots',
  '양파': 'onion',
  '마늘': 'garlic',
  '브로콜리': 'broccoli',
  '감자': 'potatoes',
  '고구마': 'sweet-potato',
  '토마토': 'tomatoes',
  '상추': 'lettuce',
  '양상추': 'iceberg-lettuce',
  '로메인': 'romaine-lettuce',
  '배추': 'napa-cabbage',
  '김치': 'kimchi',
  '고추': 'red-chili-pepper',
  '청양고추': 'thai-chili',
  '파프리카': 'bell-pepper',
  '피망': 'green-bell-pepper',
  '후추': 'black-pepper',
  '아스파라거스': 'asparagus',
  '옥수수': 'corn',
  '콩': 'soybeans',
  '두부': 'tofu',
  '콩나물': 'bean-sprouts',
  '숙주': 'mung-bean-sprouts',
  '완두': 'peas',
  '생강': 'ginger',
  '파': 'green-onions',
  '대파': 'leeks',
  '쪽파': 'chives',
  '부추': 'garlic-chives',
  '호박': 'zucchini',
  '단호박': 'kabocha-squash',
  '애호박': 'zucchini',
  '오이': 'cucumber',
  '가지': 'eggplant',
  '셀러리': 'celery',
  '시금치': 'spinach',
  '케일': 'kale',
  '루꼴라': 'arugula',
  '청경채': 'bok-choy',
  '무': 'daikon-radish',
  '비트': 'beets',
  '순무': 'turnips',
  '콜리플라워': 'cauliflower',
  '양배추': 'cabbage',
  
  // 과일류
  '레몬': 'lemon',
  '라임': 'lime',
  '오렌지': 'orange',
  '귤': 'mandarin-oranges',
  '자몽': 'grapefruit',
  '아보카도': 'avocado',
  '망고': 'mango',
  '포도': 'grapes',
  '복숭아': 'peach',
  '키위': 'kiwi',
  '블루베리': 'blueberries',
  '라즈베리': 'raspberries',
  '딸기': 'strawberries',
  '수박': 'watermelon',
  '참외': 'korean-melon',
  '멜론': 'cantaloupe',
  '파인애플': 'pineapple',
  '배': 'pear',
  '사과': 'apple',
  '무화과': 'figs',
  '리치': 'lychee',
  '망고스틴': 'mangosteen',
  '코코넛': 'coconut',
  '바나나': 'banana',
  '체리': 'cherries',
  '석류': 'pomegranate',
  '자두': 'plums',
  '살구': 'apricots',
  
  // 견과류/씨앗
  '땅콩': 'peanuts',
  '피스타치오': 'pistachios',
  '아몬드': 'almonds',
  '호두': 'walnuts',
  '캐슈넛': 'cashews',
  '잣': 'pine-nuts',
  '참깨': 'sesame-seeds',
  '들깨': 'perilla-seeds',
  '해바라기씨': 'sunflower-seeds',
  '치아씨드': 'chia-seeds',
  '헤이즐넛': 'hazelnuts',
  '마카다미아': 'macadamia-nuts',
  
  // 허브/향신료
  '올리브': 'olives',
  '딜': 'dill',
  '바질': 'basil',
  '파슬리': 'parsley',
  '로즈마리': 'rosemary',
  '타임': 'thyme',
  '오레가노': 'oregano',
  '민트': 'mint',
  '고수': 'cilantro',
  '쑥': 'mugwort',
  '깻잎': 'perilla-leaves',
  '월계수': 'bay-leaves',
  '세이지': 'sage',
  '카레': 'curry-powder',
  '큐민': 'cumin',
  '파프리카가루': 'paprika',
  '강황': 'turmeric',
  '계피': 'cinnamon',
  '정향': 'cloves',
  '육두구': 'nutmeg',
  
  // 곡물/면/빵
  '쌀': 'rice',
  '현미': 'brown-rice',
  '보리': 'barley',
  '귀리': 'oats',
  '오트밀': 'rolled-oats',
  '밀': 'wheat',
  '밀가루': 'flour',
  '파스타': 'pasta',
  '스파게티': 'spaghetti',
  '펜네': 'penne',
  '면': 'noodles',
  '국수': 'rice-noodles',
  '우동': 'udon-noodles',
  '소바': 'soba-noodles',
  '라면': 'ramen-noodles',
  '빵': 'bread',
  '식빵': 'white-bread',
  '바게트': 'baguette',
  '퀴노아': 'quinoa',
  '그래놀라': 'granola',
  '아르보리오': 'arborio-rice',
  
  // 유제품/대체유
  '우유': 'milk',
  '크림': 'heavy-cream',
  '버터': 'butter',
  '치즈': 'cheese',
  '파마산': 'parmesan-cheese',
  '모짜렐라': 'mozzarella-cheese',
  '체다': 'cheddar-cheese',
  '리코타': 'ricotta-cheese',
  '크림치즈': 'cream-cheese',
  '요거트': 'yogurt',
  '그릭요거트': 'greek-yogurt',
  '사워크림': 'sour-cream',
  '두유': 'soy-milk',
  '오트밀크': 'oat-milk',
  '아몬드밀크': 'almond-milk',
  '코코넛밀크': 'coconut-milk',
  
  // 소스/오일/조미료
  '간장': 'soy-sauce',
  '된장': 'miso',
  '고추장': 'gochujang',
  '식초': 'vinegar',
  '발사믹': 'balsamic-vinegar',
  '오일': 'olive-oil',
  '참기름': 'sesame-oil',
  '들기름': 'perilla-oil',
  '올리브오일': 'olive-oil',
  '카놀라유': 'canola-oil',
  '포도씨유': 'grapeseed-oil',
  '소금': 'salt',
  '설탕': 'sugar',
  '흑설탕': 'brown-sugar',
  '꿀': 'honey',
  '메이플': 'maple-syrup',
  '시럽': 'syrup',
  '와인': 'white-wine',
  '맛술': 'mirin',
  '미림': 'mirin',
  '청주': 'sake',
  '케첩': 'ketchup',
  '마요네즈': 'mayonnaise',
  '머스타드': 'mustard',
  '핫소스': 'hot-sauce',
  '굴소스': 'oyster-sauce',
  '피쉬소스': 'fish-sauce',
  '타바스코': 'tabasco',
  '우스터소스': 'worcestershire-sauce',
  
  // 단백질
  '계란': 'eggs',
  '달걀': 'eggs',
  '템페': 'tempeh',
  '세이탄': 'seitan',
  
  // 기타
  '육수': 'vegetable-broth',
  '채수': 'vegetable-stock',
  '물': 'water',
  '얼음': 'ice',
  '해조류': 'seaweed',
  '김': 'nori',
  '미역': 'wakame',
  '다시마': 'kelp',
  '한천': 'agar',
  '젤라틴': 'gelatin',
  '베이킹파우더': 'baking-powder',
  '베이킹소다': 'baking-soda',
  '이스트': 'yeast',
  '바닐라': 'vanilla',
  '코코아': 'cocoa-powder',
  '초콜릿': 'chocolate',
  '카카오닙스': 'cacao-nibs',
};

// Spoonacular CDN 기본 URL
const SPOONACULAR_CDN = 'https://spoonacular.com/cdn/ingredients_250x250';

// 기본 이미지 (매칭되지 않을 때)
const DEFAULT_IMAGE = '/vege_flot_img/lettuce.png';

/**
 * 재료 이름을 기반으로 Spoonacular CDN 이미지 URL을 반환합니다.
 * @param ingredientName - 재료 이름 (한글 또는 영문)
 * @returns 이미지 URL
 */
export const getIngredientIcon = (ingredientName: string): string => {
  const lowerName = ingredientName.toLowerCase();
  
  // 한글 키워드 매칭 (긴 키워드부터 매칭)
  const sortedKeywords = Object.keys(koreanToEnglishMap).sort((a, b) => b.length - a.length);
  
  for (const keyword of sortedKeywords) {
    if (lowerName.includes(keyword.toLowerCase())) {
      const englishName = koreanToEnglishMap[keyword];
      return `${SPOONACULAR_CDN}/${englishName}.jpg`;
    }
  }
  
  // 영문 이름이 직접 입력된 경우
  const englishName = lowerName.replace(/\s+/g, '-');
  if (/^[a-z-]+$/.test(englishName)) {
    return `${SPOONACULAR_CDN}/${englishName}.jpg`;
  }
  
  return DEFAULT_IMAGE;
};

/**
 * 이미지 로드 실패 시 폴백 이미지로 대체하는 핸들러
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.src = DEFAULT_IMAGE;
  target.onerror = null; // 무한 루프 방지
};

/**
 * 여러 재료에 대해 이미지를 매핑합니다.
 * @param ingredients - 재료 이름 배열
 * @returns 재료-이미지 URL 매핑 객체
 */
export const mapIngredientsToImages = (ingredients: string[]): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const ingredient of ingredients) {
    result[ingredient] = getIngredientIcon(ingredient);
  }
  return result;
};
