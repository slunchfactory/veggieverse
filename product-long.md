# 제품 샘플 — 설명 최다 (외주 에이전시 전달용)

> 상세 설명(detailDescription)이 **가장 긴** 제품 1건.  
> 출처: `pages/store/product/page.tsx` — PRODUCTS 배열 (설명 113자)

---

## 전체 데이터

| 필드 | 값 |
|------|-----|
| **id** | 15 |
| **name** (제목) | 슬런치 위클리 |
| **price** | 35000 |
| **originalPrice** | 미정의 |
| **isBest** | true |
| **description** (짧은 설명) | 매주 새로운 비건 메뉴를 만나보는 정기 구독 서비스 |
| **detailDescription** (상세 설명) | 슬런치 위클리는 매주 새로운 비건 메뉴를 집으로 배송해드리는 정기 구독 서비스입니다. 계절에 맞는 신선한 재료와 특별한 레시피로 구성된 메뉴를 만나보세요. 매주 다른 맛의 즐거움을 경험하실 수 있습니다. |
| **spectrum** | 비건 |
| **category** | 슬런치 위클리 |
| **images** | [] (빈 배열) |
| **soldOut** | 미정의 |

---

## 설명 길이

- **description:** 33자
- **detailDescription:** 113자 ← 기준(가장 김)

---

## 이미지 URL

- `getProductThumbnailImages(15)`는 **default**로 **빈 배열 []** 을 반환합니다.
- 상품 상세 페이지에서는 이미지 없을 시 플레이스홀더 표시.

---

## 데이터 소스

- **상품 데이터:** `pages/store/product/page.tsx` — `PRODUCTS`
- **이미지:** `utils/productImages.ts` — `getProductThumbnailImages(productId)`
