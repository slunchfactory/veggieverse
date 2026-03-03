# 레시피 샘플 — 재료 평균 (외주 에이전시 전달용)

> 재료 개수가 **평균적인** 레시피 1건.  
> 출처: `data/slunchList.ts` (유효 레시피 33건 중 중간값, 재료 9개)

---

## 전체 데이터

| 필드 | 값 |
|------|-----|
| **id** | 11 |
| **code** | PP07 |
| **name** (제목) | 미소 글레이즈드 삼치 |
| **ingredients** (재료) | 삼치 필레 200g, 화이트 미소 40g, 미림 30ml, 사케 30ml, 설탕 15g, 시소 잎 5장, 무 100g, 생강 절임, 대파 |
| **author** | @슬런치팩토리 |
| **category** | 신규 |
| **likes** | 270 |

---

## 재료 목록 (파싱)

- 삼치 필레 200g
- 화이트 미소 40g
- 미림 30ml
- 사케 30ml
- 설탕 15g
- 시소 잎 5장
- 무 100g
- 생강 절임
- 대파

**재료 개수:** 9개

---

## 이미지 URL

- **썸네일:** `https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop`  
  (프로젝트: `getRecipeThumbnailImage(11)`)
- **히어로:** `getRecipeHeroImage(11)` — 썸네일 맵에 없으면 썸네일 URL을 `w=1200&h=800` 로 변환한 값 사용.

---

## 영양정보 / 단계별 조리

현재 프로젝트 `data/slunchRecipes.ts`에는 id 11 상세가 없습니다.  
외주 시 **리스트 데이터(slunchList) 기준**으로 사용하시면 됩니다.

---

## 데이터 소스

- 리스트: `data/slunchList.ts` — `recipes` 배열
- 이미지: `utils/recipeImages.ts` — `recipeImageMap`, `getRecipeThumbnailImage`, `getRecipeHeroImage`
