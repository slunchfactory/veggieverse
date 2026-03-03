# 제품 샘플 — 설명 최소 (외주 에이전시 전달용)

> 상세 설명(detailDescription)이 **가장 짧은** 제품 1건.  
> 출처: `pages/store/product/page.tsx` — PRODUCTS 배열 (설명 60자)

---

## 전체 데이터

| 필드 | 값 |
|------|-----|
| **id** | 5 |
| **name** (제목) | 복숭아 타르트 |
| **price** | 32000 |
| **originalPrice** | 35000 |
| **isBest** | true |
| **description** (짧은 설명) | 달콤한 복숭아를 올린 비건 디저트 |
| **detailDescription** (상세 설명) | 부드럽고 달콤한 복숭아를 올린 프리미엄 비건 타르트입니다. 여름 시즌 한정으로 선보이는 특별한 디저트입니다. |
| **spectrum** | 비건 |
| **category** | 베이커리 |
| **images** | [] (빈 배열) |
| **soldOut** | 미정의 (없으면 미판매중) |

---

## 설명 길이

- **description:** 19자
- **detailDescription:** 60자 ← 기준(가장 짧음)

---

## 이미지 URL

- 프로젝트에서 `getProductThumbnailImages(5)`는 **default** 분기로 **빈 배열 []** 을 반환합니다.
- 상품 상세 페이지에서는 이미지가 없을 때 플레이스홀더(회색 배경 + "IMG" 텍스트)를 표시합니다.
- 참고: `utils/productImages.ts`에서 case 7이 복숭아 타르트(조각) 경로를 반환하나, 상품 id 5와 7은 서로 다른 상품(복숭아 vs 자두 타르트)입니다.

---

## 데이터 소스

- **상품 데이터:** `pages/store/product/page.tsx` — `PRODUCTS`
- **이미지:** `utils/productImages.ts` — `getProductThumbnailImages(productId)`
