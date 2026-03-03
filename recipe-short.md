# 레시피 샘플 — 재료 최소 (외주 에이전시 전달용)

> 재료 개수가 **가장 적은** 레시피 1건.  
> 출처: `data/slunchList.ts` (유효 레시피 중 재료 5개)

---

## 전체 데이터

| 필드 | 값 |
|------|-----|
| **id** | 25 |
| **code** | CV31 |
| **name** (제목) | 케일 시저 샐러드 |
| **ingredients** (재료) | 케일 200g, 비건 시저 드레싱 60ml, 크루통 50g, 비건 파르미지아노 20g, 레몬즙 |
| **author** | @헬시라이프 |
| **category** | 점심 |
| **likes** | 508 |

---

## 재료 목록 (파싱)

- 케일 200g
- 비건 시저 드레싱 60ml
- 크루통 50g
- 비건 파르미지아노 20g
- 레몬즙

**재료 개수:** 5개

---

## 이미지 URL

- **썸네일:** 프로젝트에서 `getRecipeThumbnailImage(25)` 사용.  
  `utils/recipeImages.ts`에 id 25 매핑이 없으면 로컬 경로 `{BASE_URL}/recipe/thumbnails/recipe-25.jpg` 또는 fallback 이미지 사용.
- **히어로:** `getRecipeHeroImage(25)` 동일 규칙.

---

## 영양정보 / 단계별 조리

현재 프로젝트에서 이 레시피(id 25)의 상세(영양정보, 단계별 조리)는 `data/slunchRecipes.ts`에 **다른 메뉴(피쉬 타코)** 로 등록되어 있어, 리스트와 상세가 1:1 대응되지 않습니다.  
외주 시 **리스트 데이터(slunchList) 기준**으로 사용하시면 됩니다.

---

## 데이터 소스

- 리스트: `data/slunchList.ts` — `recipes` 배열
- 이미지: `utils/recipeImages.ts` — `getRecipeThumbnailImage`, `getRecipeHeroImage`, `getFallbackRecipeImage`
