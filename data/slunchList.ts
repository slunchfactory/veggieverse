// 슬런치팩토리 레시피 타입 정의
export interface Recipe {
  id: number;
  code: string;
  name: string;
  ingredients: string;
  author: string;
  category: '신규' | '인기' | '점심' | '디저트';
  likes: number;
}

// 실제 레시피 데이터
export const recipes: Recipe[] = [
  {
    "id": 1,
    "code": "PV02",
    "name": "로스티드 비트 카르파초",
    "ingredients": "비트 300g, 발사믹 글레이즈 30ml, 아루굴라 50g, 캐슈넛 리코타 50g, 호두 30g, 엑스트라 버진 올리브 오일 20ml...",
    "author": "@비건셰프",
    "category": "점심",
    "likes": 100
  },
  {
    "id": 2,
    "code": "PV10",
    "name": "렌틸 볼로네제",
    "ingredients": "갈색 렌틸 200g, 토마토 소스 300ml, 당근 80g, 셀러리 50g, 양파 100g, 마늘 3쪽, 레드 와인 50ml, 오레가노, 바질,펜네면100g...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 117
  },
  {
    "id": 3,
    "code": "PV33",
    "name": "해바라기씨 페스토 파스타",
    "ingredients": "파스타 200g, 해바라기씨 80g, 바질 50g, 마늘 2쪽, 레몬즙 20ml, 영양효모 20g, 올리브 오일 50ml, 방울토마토 150g, 루꼴라 50g...",
    "author": "@이탈리안",
    "category": "신규",
    "likes": 134
  },
  {
    "id": 4,
    "code": "PV34",
    "name": "케일 월도프 샐러드",
    "ingredients": "케일 200g, 사과 1개, 셀러리 80g, 호두 50g, 건크랜베리 30g, 비건 마요네즈 60ml, 레몬즙 20ml, 디종 머스타드 10g...",
    "author": "@헬시라이프",
    "category": "점심",
    "likes": 151
  },
  {
    "id": 5,
    "code": "PV17",
    "name": "지중해식 퀴노아 샐러드",
    "ingredients": "퀴노아 150g, 오이 100g, 방울토마토 150g, 적양파 50g, 올리브 80g, 파슬리 20g, 민트 10g, 레몬즙 40ml, 올리브 오일 30ml...",
    "author": "@헬시라이프",
    "category": "점심",
    "likes": 168
  },
  {
    "id": 6,
    "code": "PV23",
    "name": "아시안 피넛 누들",
    "ingredients": "쌀국수 200g, 두부 150g, 당근 80g, 빨간 양배추 100g, 대파 30g, 땅콩 30g, 땅콩버터 40g, 간장 30ml, 라임즙 20ml, 스리라차 10ml, 메이플 ...",
    "author": "@슬런치팩토리",
    "category": "인기",
    "likes": 185
  },
  {
    "id": 7,
    "code": "PV31",
    "name": "크리스피 두부 스테이크",
    "ingredients": "단단한 두부 400g, 간장 40ml, 메이플 시럽 20ml, 마늘 3쪽, 생강 15g, 참기름 15ml, 전분 30g, 청경채 200g, 대파, 참깨...",
    "author": "@비건마스터",
    "category": "인기",
    "likes": 202
  },
  {
    "id": 8,
    "code": "PV37",
    "name": "구운 채소 라자냐",
    "ingredients": "라자냐 면 200g, 주키니 200g, 가지 150g, 토마토 소스 400ml, 캐슈 베샤멜 300ml, 바질 20장, 비건 모짜렐라 150g...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 219
  },
  {
    "id": 9,
    "code": "No.",
    "name": "메뉴명",
    "ingredients": "주재료...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 236
  },
  {
    "id": 10,
    "code": "PP02",
    "name": "홋카이도 관자 버터 소테",
    "ingredients": "홋카이도 관자 200g, 무염 버터 50g, 마늘 2쪽, 타임 5g, 레몬즙 15ml, 케이퍼 20g, 완두콩 퓨레 100g, 마이크로 그린...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 253
  },
  {
    "id": 11,
    "code": "PP07",
    "name": "미소 글레이즈드 삼치",
    "ingredients": "삼치 필레 200g, 화이트 미소 40g, 미림 30ml, 사케 30ml, 설탕 15g, 시소 잎 5장, 무 100g, 생강 절임, 대파...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 270
  },
  {
    "id": 12,
    "code": "PP06",
    "name": "그릴드 옥토퍼스",
    "ingredients": "문어 다리 300g, 올리브 오일 40ml, 레몬 1개, 파프리카 3g, 오레가노 5g, 감자 200g, 아이올리 50ml, 파슬리 15g, 마늘 3쪽...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 287
  },
  {
    "id": 13,
    "code": "PP13",
    "name": "레몬 허브 농어 구이",
    "ingredients": "농어 필레 200g, 레몬 1개, 마늘 3쪽, 로즈마리 10g, 타임 5g, 케이퍼 20g, 화이트 와인 50ml, 버터 30g, 올리브 오일...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 304
  },
  {
    "id": 14,
    "code": "PP44",
    "name": "해물 짬뽕 리조또",
    "ingredients": "아르보리오 쌀 150g, 혼합 해물 200g, 고춧가루 20g, 마늘 3쪽, 생강 10g, 굴소스 15ml, 해물 육수 600ml, 대파, 청경채 100g, 참기름...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 321
  },
  {
    "id": 15,
    "code": "PP29",
    "name": "피쉬 타코",
    "ingredients": "흰살 생선 200g, 콘 또띠아 6장, 양배추 100g, 적양파 50g, 아보카도 1개, 고수 크레마 60ml, 라임 2개, 치폴레 마요, 고수, 쿠민, 파프리카...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 338
  },
  {
    "id": 16,
    "code": "No.",
    "name": "메뉴명",
    "ingredients": "주재료...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 355
  },
  {
    "id": 17,
    "code": "CV01",
    "name": "고추장 두부 덮밥",
    "ingredients": "두부 200g, 고추장 40g, 간장 20ml, 설탕 15g, 마늘 2쪽, 양파 80g, 당근 50g, 참기름 10ml, 밥 250g, 대파, 참깨, 계란 프라이(비건 옵션)...",
    "author": "@비건마스터",
    "category": "인기",
    "likes": 372
  },
  {
    "id": 18,
    "code": "CV04",
    "name": "지중해 후무스 랩",
    "ingredients": "또띠아 2장, 후무스 100g, 오이 80g, 토마토 100g, 적양파 30g, 올리브 50g, 파슬리 10g, 레몬즙 15ml...",
    "author": "@슬런치팩토리",
    "category": "점심",
    "likes": 389
  },
  {
    "id": 19,
    "code": "CV08",
    "name": "마라 두부 볶음",
    "ingredients": "두부 250g, 청경채 150g, 마라 소스 40g, 두반장 20g, 마늘 3쪽, 생강 10g, 땅콩 20g, 대파, 밥...",
    "author": "@비건마스터",
    "category": "인기",
    "likes": 406
  },
  {
    "id": 20,
    "code": "CV10",
    "name": "버섯 잡채",
    "ingredients": "당면 150g, 표고버섯 100g, 양송이 100g, 시금치 80g, 당근 50g, 양파 80g, 간장 40ml, 설탕 15g, 참기름 15ml, 참깨...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 423
  },
  {
    "id": 21,
    "code": "CV17",
    "name": "스파이시 콜리플라워 타코",
    "ingredients": "콜리플라워 300g, 훈제 파프리카 5g, 쿠민 3g, 라임즙 20ml, 콘 또띠아 4장, 양배추 80g, 고수 크레마 50ml, 고수...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 440
  },
  {
    "id": 22,
    "code": "CV23",
    "name": "지중해 채소 파스타",
    "ingredients": "펜네 200g, 가지 100g, 주키니 100g, 방울토마토 150g, 올리브 50g, 케이퍼 15g, 바질 10장, 올리브 오일 30ml...",
    "author": "@이탈리안",
    "category": "신규",
    "likes": 457
  },
  {
    "id": 23,
    "code": "CV27",
    "name": "칠리 두부 스크램블",
    "ingredients": "두부 300g, 피망 80g, 양파 60g, 토마토 80g, 터메릭 3g, 쿠민 3g, 칠리 파우더 3g, 고수, 토스트 또는 또띠아...",
    "author": "@비건마스터",
    "category": "인기",
    "likes": 474
  },
  {
    "id": 24,
    "code": "CV28",
    "name": "아보카도 스시 볼",
    "ingredients": "밥 200g, 아보카도 1개, 오이 80g, 당근 60g, 에다마메 50g, 간장 20ml, 와사비, 김 가루, 참깨, 피클 생강...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 491
  },
  {
    "id": 25,
    "code": "CV31",
    "name": "케일 시저 샐러드",
    "ingredients": "케일 200g, 비건 시저 드레싱 60ml, 크루통 50g, 비건 파르미지아노 20g, 레몬즙...",
    "author": "@헬시라이프",
    "category": "점심",
    "likes": 508
  },
  {
    "id": 26,
    "code": "CV35",
    "name": "흑임자 두부 샐러드",
    "ingredients": "두부 200g, 믹스 그린 100g, 오이 80g, 당근 60g, 흑임자 드레싱 50ml, 김 가루, 참깨...",
    "author": "@헬시라이프",
    "category": "점심",
    "likes": 525
  },
  {
    "id": 27,
    "code": "CV37",
    "name": "카레 두부 라이스",
    "ingredients": "두부 200g, 카레 가루 15g, 코코넛 밀크 150ml, 양파 80g, 마늘 2쪽, 냉동 채소 믹스 100g, 밥 200g, 고수...",
    "author": "@비건마스터",
    "category": "인기",
    "likes": 542
  },
  {
    "id": 28,
    "code": "CV40",
    "name": "퓨전 콩나물 비빔면",
    "ingredients": "소면 200g, 콩나물 150g, 오이 80g, 김치 50g, 고추장 30g, 간장 15ml, 설탕 10g, 참기름 15ml, 참깨, 삶은 달걀 대신 두부...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 559
  },
  {
    "id": 29,
    "code": "CV41",
    "name": "구운 채소 퀴노아 샐러드",
    "ingredients": "퀴노아 100g, 단호박 150g, 주키니 100g, 적양파 80g, 아루굴라 50g, 호박씨 20g, 레몬 드레싱 40ml...",
    "author": "@헬시라이프",
    "category": "점심",
    "likes": 576
  },
  {
    "id": 30,
    "code": "CV42",
    "name": "반미 샌드위치 비건",
    "ingredients": "바게트 1개, 두부 150g, 당근 피클 50g, 무 피클 50g, 오이 60g, 고수 15g, 할라피뇨, 간장 마요 30ml, 간장 15ml, 스리라차...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 593
  },
  {
    "id": 31,
    "code": "CV45",
    "name": "두부 포케 볼",
    "ingredients": "두부 200g, 밥 200g, 아보카도 1개, 오이 80g, 에다마메 50g, 당근 60g, 간장 30ml, 참기름 10ml, 김 가루, 참깨, 스리라차 마요...",
    "author": "@비건마스터",
    "category": "인기",
    "likes": 110
  },
  {
    "id": 32,
    "code": "CV47",
    "name": "지중해 채소 구이 랩",
    "ingredients": "또띠아 2장, 가지 100g, 주키니 100g, 파프리카 80g, 적양파 60g, 후무스 80g, 페타 스타일 비건 치즈 50g...",
    "author": "@슬런치팩토리",
    "category": "점심",
    "likes": 127
  },
  {
    "id": 33,
    "code": "No.",
    "name": "메뉴명",
    "ingredients": "주재료...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 144
  },
  {
    "id": 34,
    "code": "CP01",
    "name": "연어 아보카도 덮밥",
    "ingredients": "연어회 150g, 밥 250g, 아보카도 1개, 오이 50g, 간장 20ml, 와사비, 참기름 10ml, 김 가루, 참깨, 대파...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 161
  },
  {
    "id": 35,
    "code": "CP22",
    "name": "새우 아보카도 롤",
    "ingredients": "밥 200g, 새우 튀김 4개, 아보카도 1개, 오이 1/2개, 김 2장, 마요네즈 30ml, 스리라차, 참깨...",
    "author": "@슬런치팩토리",
    "category": "신규",
    "likes": 178
  },
  {
    "id": 36,
    "code": "CP36",
    "name": "참치 샐러드 랩",
    "ingredients": "또띠아 2장, 참치캔 100g, 마요네즈 30g, 양상추 50g, 토마토 80g, 오이 50g, 적양파 20g, 머스타드 15g...",
    "author": "@헬시라이프",
    "category": "점심",
    "likes": 195
  }
];
