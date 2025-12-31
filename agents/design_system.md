# Slunch Design System

> **콘셉트**: "가볍고 즐거운 점심처럼, 미묘한 위트가 있는"
>
> **레퍼런스**: 오끼뜨(Oggitt)의 따뜻한 코지 감성 + 키티버니포니(KBP)의 위트있는 비비드함

---

## 1. Color Palette

### 1.1 Primary Color - 테라코타 오렌지

**오끼뜨의 따뜻함 + 식욕을 돋우는 색감**

| 이름 | Hex Code | 용도 | 미리보기 |
|------|----------|------|----------|
| **Primary** | `#D96941` | CTA 버튼, 메인 강조, 링크 호버 | ![#D96941](https://via.placeholder.com/60x30/D96941/D96941) |
| Primary Light | `#E88B6B` | 호버 배경, 연한 강조 | ![#E88B6B](https://via.placeholder.com/60x30/E88B6B/E88B6B) |
| Primary Dark | `#B84C2A` | 버튼 호버/액티브 상태 | ![#B84C2A](https://via.placeholder.com/60x30/B84C2A/B84C2A) |
| Primary 50 | `#FDF5F2` | 연한 배경 (알림, 하이라이트) | ![#FDF5F2](https://via.placeholder.com/60x30/FDF5F2/FDF5F2) |

### 1.2 Secondary Color - 세이지 그린

**자연/채소를 연상시키는 따뜻한 그린**

| 이름 | Hex Code | 용도 | 미리보기 |
|------|----------|------|----------|
| **Secondary** | `#7D8B6A` | 보조 버튼, 성공 상태, 태그 | ![#7D8B6A](https://via.placeholder.com/60x30/7D8B6A/7D8B6A) |
| Secondary Light | `#A3B08E` | 연한 강조 | ![#A3B08E](https://via.placeholder.com/60x30/A3B08E/A3B08E) |
| Secondary Dark | `#5C674D` | 호버 상태, 진한 강조 | ![#5C674D](https://via.placeholder.com/60x30/5C674D/5C674D) |
| Secondary 50 | `#F5F7F2` | 연한 배경 | ![#F5F7F2](https://via.placeholder.com/60x30/F5F7F2/F5F7F2) |

### 1.3 Accent Colors - 위트 포인트

**KBP에서 영감받은 비비드한 포인트 컬러**

| 이름 | Hex Code | 용도 | 미리보기 |
|------|----------|------|----------|
| **Mustard** | `#E8B86D` | 경고, 한정판 뱃지, 포인트 | ![#E8B86D](https://via.placeholder.com/60x30/E8B86D/E8B86D) |
| Butter Cream | `#F5D9A8` | 연한 머스타드 배경 | ![#F5D9A8](https://via.placeholder.com/60x30/F5D9A8/F5D9A8) |
| **Dusty Rose** | `#C9A9A6` | 부드러운 강조, 여성스러운 포인트 | ![#C9A9A6](https://via.placeholder.com/60x30/C9A9A6/C9A9A6) |
| **Dusty Blue** | `#8FA3B1` | 정보성 UI, 링크 | ![#8FA3B1](https://via.placeholder.com/60x30/8FA3B1/8FA3B1) |

### 1.4 Neutral Colors - 종이 질감

**차가운 회색 대신 따뜻한 베이지/브라운 계열**

| 이름 | Hex Code | 용도 | 미리보기 |
|------|----------|------|----------|
| **Cream** | `#FBF8F4` | 메인 페이지 배경 | ![#FBF8F4](https://via.placeholder.com/60x30/FBF8F4/FBF8F4) |
| **Ivory** | `#F5F0E8` | 카드 배경, 섹션 배경 | ![#F5F0E8](https://via.placeholder.com/60x30/F5F0E8/F5F0E8) |
| **Sand** | `#E6DFD4` | 테두리, 구분선, 디바이더 | ![#E6DFD4](https://via.placeholder.com/60x30/E6DFD4/E6DFD4) |
| Stone | `#C9C1B6` | 비활성 상태, disabled | ![#C9C1B6](https://via.placeholder.com/60x30/C9C1B6/C9C1B6) |
| **Charcoal** | `#3D3A36` | 메인 텍스트 (검정 대신) | ![#3D3A36](https://via.placeholder.com/60x30/3D3A36/3D3A36) |
| Brown Gray | `#6B645B` | 서브 텍스트, 설명 | ![#6B645B](https://via.placeholder.com/60x30/6B645B/6B645B) |
| Muted | `#9A9389` | 플레이스홀더, 힌트 텍스트 | ![#9A9389](https://via.placeholder.com/60x30/9A9389/9A9389) |

### 1.5 Semantic Colors

| 상태 | Hex Code | 설명 |
|------|----------|------|
| Success | `#7D8B6A` | 세이지 그린 (자연스러운 성공) |
| Warning | `#E8B86D` | 머스타드 (따뜻한 경고) |
| Error | `#C75B4A` | 테라코타 레드 (부드러운 에러) |
| Info | `#8FA3B1` | 더스티 블루 (차분한 정보) |

### 1.6 색상 조합 예시

```
┌─────────────────────────────────────────────────────┐
│  배경: Cream (#FBF8F4)                              │
│  ┌───────────────────────────────────────────────┐  │
│  │  카드 배경: Ivory (#F5F0E8)                    │  │
│  │  테두리: Sand (#E6DFD4)                       │  │
│  │                                               │  │
│  │  제목: Charcoal (#3D3A36)                     │  │
│  │  설명: Brown Gray (#6B645B)                   │  │
│  │                                               │  │
│  │  [CTA 버튼: Primary #D96941]                  │  │
│  │  [보조 버튼: Secondary #7D8B6A]               │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 2. Typography

### 2.1 폰트 패밀리

| 용도 | 폰트 | 대체 폰트 |
|------|------|----------|
| **제목 (Display)** | DM Serif Display | Georgia, serif |
| **본문 (Body)** | DM Sans | Pretendard, sans-serif |
| **한글** | Pretendard | Apple SD Gothic Neo |

```css
/* 제목 - 세리프 (클래식하고 따뜻한 느낌) */
font-family: 'DM Serif Display', Georgia, serif;

/* 본문 - 산세리프 (가독성 좋은 부드러운 서체) */
font-family: 'DM Sans', 'Pretendard', -apple-system, sans-serif;
```

### 2.2 폰트 크기 체계

| 레벨 | 크기 | 폰트 | 무게 | 행간 | 용도 |
|------|------|------|------|------|------|
| **Display** | 48px | Serif | 600 | 1.2 | 히어로 타이틀 |
| **H1** | 36px | Serif | 600 | 1.3 | 페이지 타이틀 |
| **H2** | 28px | Serif | 500 | 1.3 | 섹션 타이틀 |
| **H3** | 22px | Sans | 500 | 1.4 | 서브섹션 |
| **Large** | 18px | Sans | 400 | 1.6 | 강조 본문 |
| **Base** | 16px | Sans | 400 | 1.6 | 기본 본문 |
| **Small** | 14px | Sans | 400 | 1.5 | 보조 텍스트 |
| **XSmall** | 12px | Sans | 500 | 1.4 | 캡션, 라벨, 뱃지 |

### 2.3 타이포그래피 사용 예시

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   슬런치와 함께하는                                  │  ← Display (48px, Serif, Semibold)
│   건강한 한 끼                                       │
│                                                     │
│   이번 주 추천 메뉴                                  │  ← H2 (28px, Serif, Medium)
│                                                     │
│   신선한 재료로 만든 건강한 식사를                    │  ← Base (16px, Sans, Regular)
│   경험해보세요.                                      │
│                                                     │
│   타르트 · 밀키트 · 간식                             │  ← Small (14px, Sans)
│                                                     │
│   [NEW]  [BEST]                                     │  ← XSmall (12px, Sans, Medium)
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2.4 모바일 반응형 크기

| 레벨 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Display | 48px | 40px | 32px |
| H1 | 36px | 32px | 28px |
| H2 | 28px | 24px | 22px |
| H3 | 22px | 20px | 18px |
| Base | 16px | 16px | 15px |

---

## 3. UI Components

### 3.1 모서리 둥글기 (Border Radius)

**기존의 날카로운 직각(2px)에서 부드러운 곡선으로 변경**

| 이름 | 값 | 용도 |
|------|------|------|
| `rounded-sm` | 4px | 작은 요소 (태그, 인라인 뱃지) |
| `rounded` | 8px | 기본값 (버튼, 입력창) |
| `rounded-lg` | 12px | 카드, 모달 |
| `rounded-xl` | 16px | 큰 카드, 팝업 |
| `rounded-full` | 9999px | 뱃지, 아바타, 필터 칩 |

```
직각 (기존)          부드러운 곡선 (새로운)
┌──────────┐         ╭──────────╮
│          │   →     │          │
│          │         │          │
└──────────┘         ╰──────────╯
   2px                   8~12px
```

### 3.2 그림자 (Shadow)

**검은색 하드 섀도우에서 따뜻한 소프트 섀도우로 변경**

| 이름 | CSS | 용도 |
|------|-----|------|
| **Soft** | `0 2px 8px rgba(61,58,54,0.08), 0 4px 16px rgba(61,58,54,0.04)` | 기본 카드 |
| **Lift** | `0 4px 12px rgba(61,58,54,0.12), 0 8px 24px rgba(61,58,54,0.06)` | 호버 상태 |
| **Pressed** | `inset 1px 1px 2px rgba(0,0,0,0.05)` | 눌린 느낌 (입력창) |

```
기존 (하드 섀도우)          새로운 (소프트 리프트)
┌──────────┐               ╭──────────╮
│          │▓▓             │          │
│          │▓▓       →     │          │  ░░
└──────────┘▓▓             ╰──────────╯  ░░
  8px 검정색                  부드러운 브라운 그림자
```

### 3.3 버튼 (Button)

#### Primary Button (CTA)
| 속성 | 값 |
|------|------|
| 배경색 | `#D96941` (Primary) |
| 텍스트 | `#FFFFFF` (White) |
| 패딩 | `12px 24px` (py-3 px-6) |
| 둥글기 | `8px` (rounded-lg) |
| 호버 | 배경 `#B84C2A`, 그림자 추가 |
| 액티브 | `scale(0.98)` |

```
┌─────────────────────────────────────┐
│                                     │
│    ╭─────────────────────────╮     │
│    │    장바구니 담기         │     │  ← Primary: #D96941, 흰색 텍스트
│    ╰─────────────────────────╯     │     rounded: 8px
│                                     │
└─────────────────────────────────────┘
```

#### Secondary Button (보조)
| 속성 | 값 |
|------|------|
| 배경색 | 투명 |
| 테두리 | `2px solid #3D3A36` |
| 텍스트 | `#3D3A36` (Charcoal) |
| 둥글기 | `8px` |
| 호버 | 배경 `#3D3A36`, 텍스트 흰색 |

```
    ╭─────────────────────────╮
    │    더 보기              │  ← 투명 배경, Charcoal 테두리
    ╰─────────────────────────╯
```

#### Ghost Button (텍스트)
| 속성 | 값 |
|------|------|
| 배경색 | 투명 |
| 텍스트 | `#6B645B` (Brown Gray) |
| 호버 | 텍스트 `#D96941`, 밑줄 |

```
    자세히 보기 →              ← 텍스트만, 호버시 Primary 색상
```

### 3.4 카드 (Card)

| 속성 | 값 |
|------|------|
| 배경색 | `#F5F0E8` (Ivory) |
| 테두리 | `1px solid #E6DFD4` (Sand) |
| 둥글기 | `12px` (rounded-xl) |
| 그림자 | Soft (기본), Lift (호버) |
| 호버 효과 | `translateY(-2px)` + 그림자 강화 |

```
╭────────────────────────╮
│  ┌──────────────────┐  │
│  │                  │  │  ← 이미지: aspect-ratio 4:5
│  │    [이미지]       │  │     필터: warm-photo
│  │                  │  │     호버시 scale(1.05)
│  └──────────────────┘  │
│                        │
│  타르트                 │  ← 카테고리: 12px, Secondary
│  블루베리 타르트 (홀)    │  ← 상품명: 16px, Charcoal
│  신선한 블루베리가...    │  ← 설명: 14px, Brown Gray
│                        │
│  32,000원              │  ← 가격: 18px, Semibold
│                        │
╰────────────────────────╯
   ↑ 배경: Ivory, 테두리: Sand, 둥글기: 12px
```

### 3.5 입력창 (Input)

| 속성 | 값 |
|------|------|
| 배경색 | `#FBF8F4` (Cream) |
| 테두리 | `2px solid #E6DFD4` (Sand) |
| 둥글기 | `8px` (rounded-lg) |
| 패딩 | `12px 16px` |
| 포커스 | 테두리 `#D96941`, 링 `primary/20` |
| 그림자 | Pressed (inset) |

```
기본 상태:
╭────────────────────────────────╮
│  검색어를 입력하세요            │  ← placeholder: Muted (#9A9389)
╰────────────────────────────────╯
   ↑ 배경: Cream, 테두리: Sand

포커스 상태:
╭────────────────────────────────╮
│  블루베리 타르트|               │  ← 텍스트: Charcoal
╰────────────────────────────────╯
   ↑ 테두리: Primary (#D96941), 은은한 글로우
```

### 3.6 뱃지 (Badge)

| 타입 | 배경색 | 텍스트 | 둥글기 |
|------|--------|--------|--------|
| NEW | `#D96941` (Primary) | White | Full |
| BEST | `#7D8B6A` (Secondary) | White | Full |
| SOLD OUT | `#C9C1B6` (Stone) | White | Full |
| LIMITED | `#E8B86D` (Mustard) | Charcoal | Full |

```
  ╭─────╮  ╭──────╮  ╭───────────╮  ╭─────────╮
  │ NEW │  │ BEST │  │ SOLD OUT  │  │ LIMITED │
  ╰─────╯  ╰──────╯  ╰───────────╯  ╰─────────╯
   Primary  Secondary    Stone        Mustard
```

---

## 4. 핵심 변경 요약

### Before vs After

| 요소 | 기존 (Slunch Factory) | 새로운 (Slunch Cozy) |
|------|----------------------|---------------------|
| **Primary** | `#BFFF00` (네온 라임) | `#D96941` (테라코타) |
| **Secondary** | `#3D4A3A` (올리브) | `#7D8B6A` (세이지) |
| **배경** | `#FAF9F6` | `#FBF8F4` (Cream) |
| **텍스트** | `#000000` (순수 검정) | `#3D3A36` (Charcoal) |
| **둥글기** | 2px (직각) | 8-12px (부드러운) |
| **그림자** | 검정 하드 섀도우 | 브라운 소프트 리프트 |
| **제목 폰트** | Sans-serif | Serif (DM Serif Display) |
| **톤앤매너** | 에디토리얼/펑크 | 코지/위트 |

---

## 5. 다음 단계

이 디자인 시스템이 승인되면:

1. `index.css` - CSS 변수 업데이트
2. `tailwind.config.js` - Tailwind 색상/폰트 확장
3. UI 컴포넌트 스타일 적용

**승인해 주시면 코드 적용을 시작하겠습니다.**
