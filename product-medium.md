# 제품 샘플 — 설명 평균 (외주 에이전시 전달용)

> 상세 설명(detailDescription)이 **평균적인** 제품 1건.  
> 출처: `pages/store/product/page.tsx` — PRODUCTS 배열 (설명 79자, 중간 길이)

---

## 전체 데이터

| 필드 | 값 |
|------|-----|
| **id** | 14 |
| **name** (제목) | 페퍼로니 피자 |
| **price** | 22000 |
| **originalPrice** | 미정의 |
| **isBest** | true |
| **description** (짧은 설명) | 비건 페퍼로니와 신선한 채소를 올린 비건 피자 |
| **detailDescription** (상세 설명) | 매콤한 비건 페퍼로니와 신선한 피망, 양파를 올린 프리미엄 비건 피자입니다. 쫄깃한 도우와 진한 토마토 소스, 비건 치즈의 조화가 일품입니다. |
| **spectrum** | 비건 |
| **category** | 밀키트 |
| **images** | [] (빈 배열) |
| **soldOut** | 미정의 |

---

## 설명 길이

- **description:** 28자
- **detailDescription:** 79자 ← 기준(평균)

---

## 이미지 URL

- `getProductThumbnailImages(14)`는 **default**로 **빈 배열 []** 을 반환합니다.
- 상품 상세 페이지에서는 이미지 없을 시 플레이스홀더 표시.

---

## 데이터 소스

- **상품 데이터:** `pages/store/product/page.tsx` — `PRODUCTS`
- **이미지:** `utils/productImages.ts` — `getProductThumbnailImages(productId)`
