# VeggieVerse / Slunch Design System v2 — Design Tokens

> "실선과 여백이 만드는 시원한 개방감 + 신선한 채소의 생동감"  
> Open Border Grid + Flat & Clean

정리 기준: `tailwind.config.js`, `index.css` (global), `constants/colors.ts`, 레시피 페이지·제품 상세 페이지 및 컴포넌트 스타일.

---

## 1. 컬러 팔레트

### 1.1 브랜드 / Primary & Secondary

| 변수명 (Tailwind / CSS) | HEX | 용도 |
|-------------------------|-----|------|
| `primary` / `--primary` | `#3fa945` | 프라이머리 그린 (신선한 채소 그린) |
| `primary-light` / `--primary-light` | `#6B9B7A` | 프라이머리 라이트 |
| `primary-dark` / `--primary-dark` | `#365E43` | 프라이머리 다크 |
| `primary-50` / `--primary-50` | `#F0F5F1` | 프라이머리 배경/포커스 링 |
| `secondary` / `--secondary` | `#E07B39` | 세컨더리 오렌지 (당근 오렌지) |
| `secondary-light` / `--secondary-light` | `#F4A261` | 세컨더리 라이트 |
| `secondary-dark` / `--secondary-dark` | `#C45D1E` | 세컨더리 다크 |

### 1.2 악센트 (Accent)

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `tomato` / `--tomato-red` | `#D64545` | 에러/강조 (토마토 레드) |
| `corn` / `--corn-yellow` | `#F2C94C` | 경고/뱃지 (콘 옐로우) |
| `eggplant` / `--eggplant-purple` | `#7B5EA7` | 인포/포인트 (에그플랜트 퍼플) |

### 1.3 배경색

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `cream` / `--cream` | `#FDFBF7` | 메인 배경 (웜 크림) |
| `eggshell` / `--eggshell` | `#F7F4EF` | 서브 배경 |
| `--white-pure` | `#FFFFFF` | 순백 (카드, 모달) |
| `--section-alt-bg` (클래스) | `#faf9f7` | 섹션 교차 배경 |
| `.recipe-section` odd | `#F5F5F0` | 레시피 섹션 홀수 배경 |
| `.recipe-section` even | `#FFFFFF` | 레시피 섹션 짝수 배경 |
| `.newsletter-page` / `.hof-section` | `#F5F5F0` | 뉴스레터/명예의전당 배경 |
| `body` | `#D7D7D7` | 페이지 최외곽 배경 |
| 카드 이미지 플레이스홀더 | `#F5F5F5` | 카드/썸네일 빈 영역 |
| 제품 상세 이미지 플레이스홀더 | `#333333` | 상품 메인 이미지 배경 |

### 1.4 텍스트 컬러

| 변수명 | HEX | 용도 |
|--------|-----|------|
| `deep-forest` / `--deep-forest` / `slunch-black` | `#000000` | 제목·강조 텍스트 |
| `charcoal` / `--charcoal` | `#3D3D3D` | 본문 기본 |
| `warm-gray` / `--warm-gray` / `slunch-gray` | `#6B6B6B` | 부가 텍스트, 캡션 |
| `muted` / `--muted` | `#A0A0A0` | 비활성/뮤트 |
| `slunch-gray-light` / `--gray-light` | `#9A9A9A` | 연한 그레이 |
| `slunch-gray-lighter` / `--gray-lighter` | `#D4D4D4` | 보더/구분선 |

### 1.5 보더 / 라인

| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--border-color` / `border-section` | `#000000` | 섹션 구분선 (실선) |
| `--border-color-light` / `border-light` | `rgba(0, 0, 0, 0.2)` | 연한 구분선 |
| 탭/모달 구분선 | `#E5E5E5`, `#E0E0E0` | 탭 하단, 모달/리스트 구분 |

### 1.6 시맨틱 / 레거시 별칭

| 용도 | 변수/값 |
|------|---------|
| 성공 | `--color-success` → `--primary` |
| 에러 | `--color-error` → `--tomato-red` |
| 경고 | `--color-warning` → `--corn-yellow` |
| 정보 | `--color-info` → `--eggplant-purple` |
| 오버레이 | `--overlay-dark`: `rgba(0, 0, 0, 0.7)`, `--overlay-light`: `rgba(253, 251, 247, 0.9)` |
| 모달 오버레이 | `rgba(13, 13, 13, 0.6)` |

### 1.7 constants/colors.ts (모노톤/카테고리)

- `COLORS`: green `#333333`/`#FFFFFF`, black `#000000`/`#FFFFFF`, maroon, purple `#666666`, pink `#E0E0E0`/`#000000`, orange `#000000`/`#FFFFFF`, cream `#F5F5F5`/`#000000`
- `BG_COLOR`: `#F5F5F5`
- `ACCENT_COLOR`: `#000000` / `#FFFFFF`

---

## 2. 타이포그래피

### 2.1 폰트 패밀리

| 용도 | 값 | 정의 위치 |
|------|-----|-----------|
| 기본 (Tailwind) | `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` | `tailwind.config.js` |
| 글로벌 CSS | `Noto Sans KR`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` | `index.css` (`--font-family`) |
| 가격/영문 포인트 | `Montserrat`, `sans-serif` | `.font-accent` |
| Futura 스타일 | `Montserrat`, `Jost`, `Futura`, `Century Gothic`, `sans-serif` | `.font-futura` |

- **NO BOLD RULE**: 전역 `font-weight: 400` 강제. 굵기는 모두 400으로 통일하고, 크기로만 위계 표현.

### 2.2 폰트 크기 (Tailwind)

| 토큰 | 크기 | line-height | 용도 |
|------|------|-------------|------|
| `display` | 48px | 1.3 | 디스플레이 |
| `h1` | 36px | 1.3 | H1 |
| `h2` | 28px | 1.4 | H2 |
| `h3` | 20px | 1.4 | H3 |
| `body` | 16px | 1.7 | 본문 |
| `small` | 14px | 1.6 | 작은 본문 |
| `caption` | 12px | 1.5 | 캡션 |

### 2.3 폰트 크기 (CSS 변수 — 1440px 기준)

| 변수 | 데스크톱 | 모바일(768px 이하) | 용도 |
|------|----------|---------------------|------|
| `--font-size-display` | 40px | 32px | 디스플레이 |
| `--font-size-h1` | 32px | 28px | H1 |
| `--font-size-h2` | 24px | 22px | H2 |
| `--font-size-h3` | 18px | 18px | H3 |
| `--font-size-product` | 15px | — | 제품명 등 |
| `--font-size-body` | 14px | 15px / 16px | 본문 |
| `--font-size-small` | 13px | — | 작은 텍스트 |
| `--font-size-caption` | 11px | — | 캡션 |
| `--font-size-ui` | 14px | 14px | UI 라벨/버튼 |

### 2.4 폰트 굵기 & 행간

- **굵기**: 모두 `400` (`--font-weight-regular`, `--font-weight-body`, `--font-weight-ui` 등).
- **행간**: `--line-height-display` 1.3, `--line-height-h1` 1.3, `--line-height-h2` 1.4, `--line-height-body` 1.7, `--line-height-ui` 1.6.
- **자간**: `--letter-spacing-tight` -0.02em, `--letter-spacing-wide` 0.05em.

### 2.5 레시피/제품 상세 페이지에서의 사용

- **레시피 페이지**: 제목 `var(--font-size-h2)`, 본문/캡션 16px, 14px 등 + `fontWeight: 400`, `text-stone-600`/`text-stone-900`.
- **제품 상세**: 가격/제목 `var(--font-size-h2)`, 본문 `var(--font-size-body)`, 상세 설명 13px, 라벨 14px, 캡션 12px. 모두 `fontWeight: 400`.

---

## 3. 스페이싱 & 레이아웃

### 3.1 반복 사용 padding / margin / gap

| 토큰/클래스 | 값 | 용도 |
|-------------|-----|------|
| `--spacing-xs` | 4px | 최소 간격 |
| `--spacing-sm` | 8px | 작은 간격 |
| `--spacing-md` | 16px | 기본 간격 |
| `--spacing-lg` | 24px | 요소 간격 |
| `--spacing-xl` | 32px | 블록 간격 |
| `--spacing-2xl` | 48px | 섹션 내부 |
| `--spacing-3xl` | 80px | 모바일 섹션 패딩 |
| `--spacing-4xl` | 120px | 데스크톱 섹션 패딩 |
| `--gap-grid` | 20px | 그리드 갭 |
| `--gap-card` | 20px | 카드 갭 |
| `--gap-section` | 60px | 섹션 간격 |
| `--element-gap` | 24px | 요소 간격 |
| Tailwind `spacing.18` | 72px | — |
| Tailwind `spacing.22` | 88px | — |
| Tailwind `spacing.section` | 120px | 섹션 패딩 |
| Tailwind `spacing.section-mobile` | 80px | 모바일 섹션 |
| Tailwind `spacing.card` | 32px | 카드 패딩 |
| 카드 이미지–텍스트 간격 | 13px | `.card-content` 등 `padding-top` |
| 썸네일 그리드 gap | 13px | `.thumbnail-grid` |
| 레시피 캐러셀 gap | 16px | `.recipe-carousel-scroll` |

### 3.2 컨테이너 & max-width

| 클래스/용도 | max-width | padding (좌우) |
|-------------|----------|----------------|
| `.page-container` | 1440px | 20px → 768px+ 40px → 1440px+ 60px |
| `.text-container` | 680px | — (본문 가독) |
| `.text-container-wide` | 1440px | — |
| `.prose` | 680px | — |
| 레시피 히어로 이미지 영역 | 1000px | — |
| 제품 상세 본문 (prose) | max-w-4xl | — |
| About 콘텐츠 | — | 64px (데스크), 24px (모바일) |

### 3.3 브레이크포인트

- **768px**: 모바일/태블릿 전환 (섹션 패딩, 헤더, 그리드 열 수 등).
- **1024px**: 태블릿 (About 스플릿, 스토어 필터 등).
- **1280px**: 뉴스레터 그리드 3열.
- **1440px**: 메인 레이아웃 기준, `.page-container` 최대 너비.

### 3.4 헤더 / 프로모션

| 변수 | 데스크톱 | 모바일(768px 이하) |
|------|----------|---------------------|
| `--promo-h` | 28px | 28px |
| `--header-h` | 64px | 56px |
| `--header-area-h` | promo-h + header-h | — |
| `--header-padding-x` | 32px | 16px |
| `--header-nav-font-size` | 15px | clamp(12px, 1.8vw, 14px) |
| `--header-logo-height` | 28px | clamp(20px, 4vw, 24px) |
| `--sidebar-width` | 220px | — |

---

## 4. 컴포넌트 스타일

### 4.1 버튼

| 스타일 | 배경 | 텍스트 | 테두리 | border-radius | hover |
|--------|------|--------|--------|----------------|-------|
| `.btn-primary` | `--primary` | `--white-pure` | none | `--border-radius` (6px) | `--primary-dark` |
| `.btn-secondary` | transparent | `--deep-forest` | 1px solid `--deep-forest` | 6px | 배경 `--deep-forest`, 텍스트 흰색 |
| `.btn-ghost` | transparent | `--warm-gray` | none | — | 텍스트 `--primary` |
| **제품 상세** 장바구니 | transparent | `#000000` | 1px solid `#000000` | 0 (직각) | — |
| **제품 상세** 바로 구매 | `#000000` | `#ffffff` | 1px solid `#000000` | 0 | — |
| **제품 상세** 하트 버튼 | transparent / `#F5F5F5` (좋아요 시) | black | 1px solid `#000000` | 0 | — |
| 퀴즈 `.sl-quiz-btn-back` | transparent | black | 1px solid black | 0 | 배경 black, 텍스트 흰색 |
| 퀴즈 `.sl-quiz-btn-next` | black | 흰색 | none | 0 | 배경 `--primary` |
| **공통** (index.css) | `button:not(.chatbot-trigger):not(.rounded-btn)` | — | — | **0** (직각 통일) | — |

- 패딩: `14px 24px` (`.btn-primary` 등), 제품 상세 버튼 `16px`, 퀴즈 `16px 24px`.

### 4.2 카드

| 요소 | 스타일 |
|------|--------|
| **공통** `.card`, `.product-card`, `.recipe-card` | border 없음, 배경 transparent, cursor pointer |
| **이미지 영역** | aspect-ratio 4:5 (뉴스레터만 1:1), 배경 `#F5F5F5` |
| **이미지–텍스트** | padding-top 13px (`.card-content` 등) |
| **호버** | 이미지 `transform: scale(1.05)`, transition 0.3s ease |
| **플랫 카드** `.card-flat` | 배경 `--cream`, border 1px `--deep-forest`, radius `--border-radius-lg` (8px), padding `--card-padding`; hover 시 border 2px `--primary` |
| **명예의 전당** `.hof-card` | 배경 `#fff`, border 1px `#E5E5E5`, radius 12px; hover lift + `box-shadow: 0 8px 24px rgba(0,0,0,0.1)` |
| **Sold out 오버레이** | `background: rgba(13,13,13,0.7)`, 텍스트 흰색 |

### 4.3 인풋 / 폼

| 요소 | 스타일 |
|------|--------|
| **수량 선택** (제품 상세) | border 1px `#000000`, 버튼 padding 12px 16px, 숫자 padding 12px 24px, 좌우 1px 실선 구분 |
| **필터 라디오** `.filter-radio-circle` | 14×14px, border 1px `#CCCCCC`, border-radius 50%; 선택 시 border 2px `--deep-forest`, 배경 `--primary` |
| **필터 체크박스** `.filter-checkbox-box` | 14×14px, border 1px `#CCCCCC`; 선택 시 border 2px `--deep-forest`, 배경 `--primary`, 체크 `✓` 흰색 |
| **모달 인풋** | border `#E0E0E0`, 배경 `#FAFAFA` / `#fff` (OrderDetailModal 등) |
| **포커스** | `outline: 2px solid #a8a29e`, `outline-offset: 2px` (button, a); `.focus-primary`: `box-shadow: 0 0 0 3px var(--primary-50)` |

### 4.4 탭 (제품 상세)

- 배경 `var(--cream)`, 하단 border 1px `#000000`.
- 탭 버튼: padding 16px 0, font-size 14px, fontWeight 400, borderRight 1px `#000000`, 활성 시 borderBottom 2px `#000000`, 비활성 텍스트 `#6B6B6B`.

---

## 5. 기타

### 5.1 box-shadow

| 토큰/클래스 | 값 | 용도 |
|-------------|-----|------|
| `shadow-none` | none | — |
| `shadow-sm` | `0 2px 4px rgba(0,0,0,0.05)` | 최소 그림자 |
| `shadow` / `shadow-DEFAULT` | `0 4px 12px rgba(0,0,0,0.1)` | 카드/호버 |
| `shadow-focus` | `0 0 0 3px #F0F5F1` | 포커스 링 |
| `.hover-shadow:hover` | `0 4px 12px rgba(0,0,0,0.1)` | 호버 시 |
| `.hof-card:hover` | `0 8px 24px rgba(0,0,0,0.1)` | 명예의 전당 카드 |
| `.bottomsheet-content` | `0 -4px 20px rgba(0,0,0,0.1)` | 바텀시트 |
| `.produce-shadow` | `drop-shadow(0 25px 50px rgba(0,0,0,0.12))` | 이미지 드롭쉐도우 |

### 5.2 border-radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| `rounded-none` | 0 | 버튼/인풋 직각 통일 |
| `rounded-sm` | 4px | 썸네일, 스크롤바, 뱃지 |
| `rounded` / `rounded-md` | 6px | 기본 (버튼 등) |
| `rounded-lg` | 8px | 카드 플랫 |
| `rounded-xl` | 12px | 퀴즈 카드, HOF 카드 |
| `rounded-full` | 9999px | 원형 버튼, 필터 카운트 뱃지 |
| 바텀시트 상단 | 16px | `.bottomsheet-content` |

### 5.3 transition / animation

| 항목 | 값 |
|------|-----|
| **duration** (Tailwind) | `DEFAULT: 200ms` |
| **버튼/호버** | `0.2s ease`, `0.15s ease` |
| **이미지 스케일** | `0.3s ease` |
| **바텀시트** | `visibility 0s 0.3s`, `opacity 0.3s ease`, `transform 0.3s ease` |
| **fadeIn** | `0.6s ease-out`, translateY 15px → 0 |
| **slideInRight** | `0.3s ease-out`, translateX 100% → 0 |
| **slideInUp** | `0.3s ease-out`, translateY 100% → 0 |
| **pulse-soft** | 4s ease-in-out infinite, opacity 0.5 ↔ 0.8 |
| **float** | 6s ease-in-out infinite, translateY 0 ↔ -20px |
| **호버 리프트** | `transform 0.2s ease`, hover `translateY(-2px)` |
| **nav hover** | `text-decoration 0.15s ease` |

### 5.4 레시피 페이지 전용

- `.recipe-page`: 배경 `#fff`, overflow-x clip.
- `.recipe-hero`: padding 60px 64px, text-align center.
- `.recipe-hero-carousel`: padding 0 60px.
- `.recipe-section::before`: 100vw 배경, odd `#F5F5F0`, even `#FFFFFF`.
- `.recipe-carousel-scroll`: gap 16px, padding-bottom 16px, 스크롤바 숨김.

### 5.5 제품 상세 페이지 전용

- 페이지 배경: `var(--cream)`.
- 메인 이미지: `aspect-square`, 배경 `#333333`, 플레이스홀더 텍스트 `text-white/30`.
- 오늘출발 블록: `bg-stone-50`, padding 16px, gap 12px, `rounded-none`.
- 구분선: `1px solid #000000`, margin 24px 0.
- 스크롤 투 탑 버튼: 고정 하단 우측, 배경/테두리 `#000000`, 48×48px.
- 탭 바: sticky 시 `top-16`, 배경 `var(--cream)`.

---

## 참고 파일

- `tailwind.config.js` — 컬러, 폰트, spacing, radius, shadow, transition
- `index.css` — CSS 변수, 레이아웃, 카드/버튼/폼/모달/스크롤바, 애니메이션
- `constants/colors.ts` — 모노톤/카테고리 컬러
- `components/HallOfFameMarquee.css` — 명예의 전당 카드·마키
- `pages/recipe/page.tsx` — 레시피 메인·카테고리·섹션 스타일
- `pages/store/product/page.tsx` — 제품 상세 레이아웃·탭·버튼·인풋
