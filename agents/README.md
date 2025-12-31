# VeggieVerse 에이전트 팀 구조

웹사이트 구축을 위한 3명의 전문 에이전트가 협업하는 팀 구조입니다.

## 팀 구성

```
┌─────────────────────────────────────────────────────────────┐
│                    에이전트 팀 구조                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                           │
│   │     PM      │  기획자 (Product Manager)                  │
│   │   (기획자)   │  - 요구사항 분석                           │
│   └──────┬──────┘  - 기능 명세서 작성                        │
│          │         - 작업 조율 및 검토                        │
│          ▼                                                  │
│   ┌─────────────┐                                           │
│   │   UI/UX     │  UI/UX 디자이너                            │
│   │  디자이너    │  - 디자인 시스템 정의                       │
│   └──────┬──────┘  - 레이아웃 설계                           │
│          │         - Tailwind CSS 명세                      │
│          ▼                                                  │
│   ┌─────────────┐                                           │
│   │ 프론트엔드   │  프론트엔드 개발자                          │
│   │   개발자    │  - React 컴포넌트 구현                      │
│   └─────────────┘  - TypeScript 코드 작성                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 워크플로우

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
         │
    ┌────┴────┐
    ▼         ▼
 [승인]    [수정요청]
    │         │
    ▼         └──→ Step 3로 돌아감
  완료
```

## 파일 구조

```
agents/
├── README.md              # 이 파일
├── team-config.ts         # 에이전트 역할 및 프롬프트 정의
├── orchestrator.ts        # 워크플로우 관리 오케스트레이터
└── prompts/
    ├── pm-agent.md            # PM 에이전트 상세 프롬프트
    ├── uiux-designer-agent.md # UI/UX 디자이너 상세 프롬프트
    └── frontend-developer-agent.md # 프론트엔드 개발자 상세 프롬프트
```

## 각 에이전트 역할

### 1. PM (기획자)

**책임**
- 사용자 요구사항 분석
- 기능 명세서 (PRD) 작성
- 다른 에이전트에게 작업 지시
- 최종 결과물 검토

**출력물**
- PRD (Product Requirements Document)
- 사용자 스토리
- 완료 조건 체크리스트

### 2. UI/UX 디자이너

**책임**
- 디자인 시스템 정의
- 레이아웃 구조 설계
- Tailwind CSS 클래스 명세
- 반응형 디자인 가이드

**출력물**
- 레이아웃 구조도 (ASCII)
- 컴포넌트 스타일 명세
- 색상/타이포그래피 가이드
- 인터랙션 명세

### 3. 프론트엔드 개발자

**책임**
- React 컴포넌트 구현
- TypeScript 타입 정의
- Tailwind CSS 스타일링
- 성능 및 접근성 최적화

**출력물**
- React 컴포넌트 코드 (.tsx)
- TypeScript 인터페이스
- 사용 예시

## 사용 방법

### 기본 사용

```typescript
import { TeamOrchestrator } from './agents/orchestrator';

const orchestrator = new TeamOrchestrator();

// 작업 시작
orchestrator.startTask({
  type: 'new_page',
  description: '상품 목록 페이지를 만들어주세요',
  priority: 'high',
  requirements: [
    '카테고리별 필터링',
    '가격순/인기순 정렬',
    '반응형 그리드 레이아웃'
  ]
});

// 진행 상황 확인
console.log(orchestrator.getProgressDisplay());
// [>] Step 1: PM 기획 <<<
// [ ] Step 2: UI/UX 디자인
// [ ] Step 3: 프론트엔드 개발
// [ ] Step 4: PM 검토
```

### 에이전트 프롬프트 사용

```typescript
import { AGENT_PROMPTS } from './agents/team-config';

// PM 에이전트 프롬프트
const pmPrompt = AGENT_PROMPTS.PM;

// UI/UX 디자이너 프롬프트
const designerPrompt = AGENT_PROMPTS.UIUX_DESIGNER;

// 프론트엔드 개발자 프롬프트
const developerPrompt = AGENT_PROMPTS.FRONTEND_DEVELOPER;
```

## 협업 규칙

### 1. 순차적 진행
- 각 단계는 이전 단계가 완료되어야 시작
- PM → 디자이너 → 개발자 → PM(검토) 순서

### 2. 명확한 인터페이스
- 각 에이전트는 정해진 형식으로 출력물 전달
- 다음 에이전트는 이전 출력물을 입력으로 사용

### 3. 피드백 루프
- PM이 최종 검토 후 수정이 필요하면 개발자에게 피드백
- 수정 후 다시 검토받음

### 4. 컨텍스트 유지
- 모든 에이전트는 프로젝트 컨텍스트(기술 스택, 디자인 시스템)를 공유
- VeggieVerse 프로젝트의 특성을 반영

## 커스터마이징

### 새로운 에이전트 추가

```typescript
// team-config.ts에 추가
export const AGENT_ROLES = {
  // 기존 에이전트...

  QA_ENGINEER: {
    id: 'qa',
    name: 'QA Engineer',
    nameKo: 'QA 엔지니어',
    description: '테스트 케이스 작성 및 품질 검증',
    responsibilities: [...],
    skills: [...],
    outputFormat: [...],
  },
};
```

### 워크플로우 수정

```typescript
// orchestrator.ts에서 워크플로우 단계 수정
export const CUSTOM_WORKFLOW = [
  { step: 1, agent: 'PM', action: '기획' },
  { step: 2, agent: 'UIUX_DESIGNER', action: '디자인' },
  { step: 3, agent: 'FRONTEND_DEVELOPER', action: '개발' },
  { step: 4, agent: 'QA_ENGINEER', action: '테스트' },  // 추가
  { step: 5, agent: 'PM', action: '검토' },
];
```

## 프로젝트 컨텍스트

### VeggieVerse
- 채식/건강식품 온라인 쇼핑몰
- React 19 + TypeScript + Vite
- Tailwind CSS 스타일링
- React Router 라우팅

### 디자인 톤
- 자연친화적, 신선한, 건강한
- 그린 계열 Primary 색상
- 미니멀하고 깔끔한 레이아웃
