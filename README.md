<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# VeggieVerse - 슬런치 팩토리

비건 푸드 플랫폼. 건강한 식단, 레시피, 뉴스레터를 만나보세요.

## 🚀 빠른 시작

### 로컬 실행

**필수 요구사항:** Node.js

1. 의존성 설치:
   ```bash
   npm install
   ```

2. 환경 변수 설정:
   - `.env.local` 파일에 `GEMINI_API_KEY` 설정 (Gemini API 키)

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. 브라우저에서 확인:
   - http://localhost:3000/veggieverse/

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# GitHub Pages 배포
npm run deploy
```

## 📁 프로젝트 구조

```
veggieverse/
├── agents/              # AI 에이전트 팀 구조 및 워크플로우
│   ├── README.md        # 에이전트 팀 구조 설명
│   ├── orchestrator.ts # 워크플로우 관리 오케스트레이터
│   ├── team-config.ts  # 에이전트 역할 및 프롬프트 정의
│   ├── design_system.md # 디자인 시스템 문서
│   └── prompts/        # 각 에이전트 상세 프롬프트
├── components/          # React 컴포넌트
├── pages/              # 페이지 컴포넌트
├── contexts/           # React Context (UserContext 등)
├── services/           # API 서비스 (Gemini 등)
├── utils/              # 유틸리티 함수
├── constants/          # 상수 정의
└── public/             # 정적 파일
```

## 🎨 디자인 시스템

### 컬러 팔레트

**Primary (테라코타 오렌지)**
- Primary: `#D96941` - CTA 버튼, 메인 강조
- Primary Light: `#E88B6B` - 호버 배경
- Primary Dark: `#B84C2A` - 버튼 액티브

**Secondary (세이지 그린)**
- Secondary: `#7D8B6A` - 보조 버튼, 성공 상태
- Secondary Light: `#A3B08E` - 연한 강조
- Secondary Dark: `#5C674D` - 호버 상태

**Neutral (따뜻한 베이지/브라운)**
- Cream: `#FBF8F4` - 메인 배경
- Ivory: `#F5F0E8` - 카드 배경
- Sand: `#E6DFD4` - 테두리, 구분선
- Charcoal: `#3D3A36` - 메인 텍스트

자세한 디자인 시스템은 [`agents/design_system.md`](./agents/design_system.md)를 참고하세요.

## 🤖 AI 에이전트 팀 구조

VeggieVerse 프로젝트는 3명의 전문 AI 에이전트가 협업하여 개발됩니다:

### 팀 구성

1. **PM (기획자)** - 요구사항 분석 및 프로젝트 관리
2. **UI/UX 디자이너** - 디자인 시스템 및 사용자 경험 설계
3. **프론트엔드 개발자** - React 컴포넌트 구현

### 워크플로우

```
사용자 요청
    │
    ▼
┌─────────────────┐
│  Step 1: PM     │  요구사항 분석 → PRD 작성
└────────┬────────┘
         │ 기능 명세서
         ▼
┌─────────────────┐
│  Step 2: UI/UX  │  디자인 시스템 → 디자인 명세서
└────────┬────────┘
         │ 디자인 명세서
         ▼
┌─────────────────┐
│  Step 3: 개발자  │  코드 구현 → React 컴포넌트
└────────┬────────┘
         │ 구현 코드
         ▼
┌─────────────────┐
│  Step 4: PM     │  코드 검토 → 승인/피드백
└────────┬────────┘
```

자세한 내용은 [`agents/README.md`](./agents/README.md)를 참고하세요.

## 🛠️ 기술 스택

- **프레임워크**: React 19 + TypeScript + Vite
- **스타일링**: Tailwind CSS
- **라우팅**: React Router 7
- **아이콘**: Lucide React
- **애니메이션**: Framer Motion

## 📝 주요 기능

- 🛒 온라인 쇼핑몰 (상품 목록, 상세, 장바구니)
- 📖 레시피 검색 및 상세 보기
- 📰 뉴스레터 아티클
- 🎯 비건 테스트 (마이 테이스트 스피릿)
- 👤 마이페이지 (주문 내역, 북마크, 리뷰)
- 🎁 이벤트 및 쿠폰 시스템
- 💬 챗봇 (Spirit Chatbot)

## 📄 페이지 구조

### 1. 메인 (Main)

- [x] `index.html` : 메인 홈 (히어로, 띠배너, 벤토그리드 포함)

### 2. 브랜드 (About)

- [x] `about.html` : 브랜드 메인
- [x] `about-story.html` : 브랜드 스토리 상세
- [x] `about-branch.html` : 지점 소개
- [x] `about-b2b.html` : 제휴 문의

### 3. 위클리 구독 (Weekly)

- [x] `subscribe.html` : 정기 구독 신청 및 플랜 소개

### 4. 스토어 (Store)

- [x] `store.html` : 전체 상품 리스트 및 큐레이션

### 5. 레시피 (Recipe)

- [x] `recipe.html` : 레시피 커뮤니티 및 명예의 전당

### 6. 커뮤니티 (Community)

- [x] `event.html` : 이벤트 및 공지사항
- [x] `newsletter.html` : 뉴스레터 아카이브

### 7. 스피릿 파인더 (Spirit / Onboarding)

**진단 문항 (총 6단계):**

- [x] `spirit-question-diet.html` (식단)
- [x] `spirit-question-meaning.html` (가치관)
- [x] `spirit-question-mood.html` (무드)
- [x] `spirit-question-option.html` (옵션)
- [x] `spirit-question-pattern.html` (패턴)
- [x] `spirit-question-priority.html` (우선순위)

**결과 페이지:**

- [x] `spirit-result.html`

> **검수 코멘트**: 현재 폴더 내에 모든 페이지의 뼈대(HTML)가 누락 없이 준비되어 있습니다. 이제 각 파일의 내부 코드(레이아웃 및 CSS 연결) 작업으로 넘어가면 되겠습니다.

## 📚 문서

- [개선 체크리스트](./IMPROVEMENT_CHECKLIST.md)
- [빠른 시작 가이드](./QUICK_START.md)
- [디자인 시스템](./agents/design_system.md)
- [에이전트 팀 구조](./agents/README.md)
- [이미지 크기 권장사항](./IMAGE_SIZE_RECOMMENDATIONS.md)

## 🔧 개발 가이드

### 컴포넌트 작성 규칙

- 함수형 컴포넌트 + Hooks 사용
- TypeScript strict 모드 준수
- Tailwind CSS로 스타일링
- 접근성 고려 (aria-label, alt 텍스트 등)

### 파일 구조

- 컴포넌트: `components/` 폴더
- 페이지: `pages/` 폴더
- 유틸리티: `utils/` 폴더
- 타입 정의: `types.ts` 또는 각 파일 내부

## 📄 라이선스

이 프로젝트는 슬런치 팩토리의 프로젝트입니다.

---

**View your app in AI Studio:** https://ai.studio/apps/temp/1
