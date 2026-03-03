# 레시피 샘플 — 재료 최다 (외주 에이전시 전달용)

> 재료 개수가 **가장 많은** 레시피 1건.  
> 출처: `data/slunchList.ts` (유효 레시피 중 재료 12개)

---

## 전체 데이터

| 필드 | 값 |
|------|-----|
| **id** | 17 |
| **code** | CV01 |
| **name** (제목) | 고추장 두부 덮밥 |
| **ingredients** (재료) | 두부 200g, 고추장 40g, 간장 20ml, 설탕 15g, 마늘 2쪽, 양파 80g, 당근 50g, 참기름 10ml, 밥 250g, 대파, 참깨, 계란 프라이(비건 옵션) |
| **author** | @비건마스터 |
| **category** | 인기 |
| **likes** | 372 |

---

## 재료 목록 (파싱)

- 두부 200g
- 고추장 40g
- 간장 20ml
- 설탕 15g
- 마늘 2쪽
- 양파 80g
- 당근 50g
- 참기름 10ml
- 밥 250g
- 대파
- 참깨
- 계란 프라이(비건 옵션)

**재료 개수:** 12개

---

## 이미지 URL

- **썸네일:** `https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=500&h=500&fit=crop`  
  (프로젝트: `getRecipeThumbnailImage(17)`)
- **히어로:** `getRecipeHeroImage(17)` — 썸네일 맵에 없으면 썸네일 URL을 `w=1200&h=800` 로 변환한 값 사용.

---

## 영양정보 / 단계별 조리

현재 프로젝트 `data/slunchRecipes.ts`에는 id 17 상세가 없습니다.  
외주 시 **리스트 데이터(slunchList) 기준**으로 사용하시면 됩니다.

---

## 데이터 소스

- 리스트: `data/slunchList.ts` — `recipes` 배열
- 이미지: `utils/recipeImages.ts` — `recipeImageMap`, `getRecipeThumbnailImage`, `getRecipeHeroImage`
