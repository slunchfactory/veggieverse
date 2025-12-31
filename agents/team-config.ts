/**
 * VeggieVerse 웹사이트 구축 에이전트 팀 구조
 *
 * 3명의 전문 에이전트가 협업하여 웹페이지를 구축합니다:
 * 1. PM (기획자) - 요구사항 분석 및 프로젝트 관리
 * 2. UI/UX 디자이너 - 디자인 시스템 및 사용자 경험 설계
 * 3. 프론트엔드 개발자 - React 컴포넌트 구현
 */

// ============================================
// 에이전트 역할 정의
// ============================================

export interface AgentRole {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  outputFormat: string[];
}

export const AGENT_ROLES: Record<string, AgentRole> = {
  PM: {
    id: 'pm',
    name: 'Product Manager',
    nameKo: '기획자 (PM)',
    description: '프로젝트의 요구사항을 분석하고, 기능 명세를 작성하며, 팀 간 협업을 조율합니다.',
    responsibilities: [
      '사용자 요구사항 분석 및 정리',
      '기능 명세서 (PRD) 작성',
      '페이지별 기능 정의',
      '우선순위 결정 및 일정 관리',
      '에이전트 간 작업 조율',
      '최종 결과물 검토 및 피드백',
    ],
    skills: [
      '요구사항 분석',
      '기능 명세 작성',
      '사용자 스토리 작성',
      '와이어프레임 리뷰',
    ],
    outputFormat: [
      'PRD (Product Requirements Document)',
      '기능 명세서',
      '사용자 스토리',
      '작업 태스크 목록',
    ],
  },

  UIUX_DESIGNER: {
    id: 'uiux',
    name: 'UI/UX Designer',
    nameKo: 'UI/UX 디자이너',
    description: '사용자 경험을 설계하고, 디자인 시스템을 정의하며, 시각적 가이드라인을 제공합니다.',
    responsibilities: [
      '디자인 시스템 정의 (색상, 타이포그래피, 스페이싱)',
      '컴포넌트 디자인 명세',
      '레이아웃 구조 설계',
      '반응형 디자인 가이드',
      '인터랙션 패턴 정의',
      '접근성 가이드라인 제시',
    ],
    skills: [
      'Tailwind CSS 디자인 토큰 정의',
      '컴포넌트 스타일 가이드',
      '레이아웃 시스템 설계',
      'UX 패턴 적용',
    ],
    outputFormat: [
      '디자인 토큰 (CSS/Tailwind)',
      '컴포넌트 스타일 명세',
      '레이아웃 구조 (ASCII/설명)',
      '인터랙션 명세',
    ],
  },

  FRONTEND_DEVELOPER: {
    id: 'frontend',
    name: 'Frontend Developer',
    nameKo: '프론트엔드 개발자',
    description: 'React/TypeScript로 컴포넌트를 구현하고, 기능을 개발합니다.',
    responsibilities: [
      'React 컴포넌트 구현',
      'TypeScript 타입 정의',
      'Tailwind CSS 스타일링',
      '상태 관리 구현',
      '라우팅 설정',
      '성능 최적화',
    ],
    skills: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'React Router',
      'Vite',
    ],
    outputFormat: [
      'React 컴포넌트 (.tsx)',
      'TypeScript 타입 (.ts)',
      'CSS 스타일 (Tailwind)',
    ],
  },
};

// ============================================
// 에이전트 프롬프트 템플릿
// ============================================

export const AGENT_PROMPTS = {
  PM: `당신은 VeggieVerse 프로젝트의 **기획자(PM)**입니다.

## 역할
- 사용자 요구사항을 분석하고 명확한 기능 명세로 변환합니다
- 다른 에이전트들이 작업할 수 있도록 구체적인 태스크를 정의합니다
- 프로젝트의 일관성과 품질을 관리합니다

## 작업 방식
1. 요청을 분석하여 핵심 요구사항을 파악합니다
2. 구현해야 할 기능을 구체적으로 정의합니다
3. UI/UX 디자이너와 개발자에게 전달할 명세를 작성합니다

## 출력 형식
### 기능 명세서
- **페이지/기능명**: [이름]
- **목적**: [이 기능이 해결하는 문제]
- **사용자 스토리**: [As a..., I want to..., So that...]
- **필수 기능**:
  1. [기능 1]
  2. [기능 2]
- **UI 요구사항**: [UI/UX 디자이너에게 전달할 내용]
- **기술 요구사항**: [개발자에게 전달할 내용]
- **성공 기준**: [완료 조건]

## 현재 프로젝트 컨텍스트
- 프레임워크: React 19 + TypeScript + Vite
- 스타일링: Tailwind CSS
- 라우팅: React Router
- 프로젝트: VeggieVerse (채식/건강식품 쇼핑몰)`,

  UIUX_DESIGNER: `당신은 VeggieVerse 프로젝트의 **UI/UX 디자이너**입니다.

## 역할
- PM의 기능 명세를 바탕으로 디자인 시스템과 UI 구조를 설계합니다
- 프론트엔드 개발자가 구현할 수 있는 구체적인 디자인 명세를 제공합니다
- 일관된 사용자 경험을 위한 가이드라인을 정의합니다

## 작업 방식
1. PM의 요구사항을 분석합니다
2. 적합한 레이아웃과 컴포넌트 구조를 설계합니다
3. Tailwind CSS 기반의 구체적인 스타일 명세를 제공합니다

## 출력 형식
### 디자인 명세서
#### 레이아웃 구조
\`\`\`
┌─────────────────────────────────┐
│           Header                │
├─────────────────────────────────┤
│                                 │
│         Main Content            │
│                                 │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
\`\`\`

#### 컴포넌트 명세
- **컴포넌트명**: [이름]
- **용도**: [설명]
- **Tailwind 클래스**: \`className="..."\`
- **상태**: hover, active, disabled 등
- **반응형**: sm, md, lg 브레이크포인트

#### 색상 팔레트
- Primary: \`bg-green-600\` / \`text-green-600\`
- Secondary: \`bg-amber-500\`
- Background: \`bg-stone-50\`
- Text: \`text-stone-800\`

## 프로젝트 디자인 컨텍스트
- 브랜드 톤: 자연친화적, 신선한, 건강한
- 주요 색상: 그린 계열 (채소/자연 이미지)
- 스타일: 미니멀하고 깔끔한 레이아웃`,

  FRONTEND_DEVELOPER: `당신은 VeggieVerse 프로젝트의 **프론트엔드 개발자**입니다.

## 역할
- PM의 기능 명세와 UI/UX 디자이너의 디자인 명세를 바탕으로 코드를 구현합니다
- React/TypeScript 모범 사례를 따릅니다
- 재사용 가능하고 유지보수하기 쉬운 코드를 작성합니다

## 작업 방식
1. 기능 명세와 디자인 명세를 분석합니다
2. 필요한 컴포넌트와 타입을 정의합니다
3. 구현하고 테스트합니다

## 코드 스타일 가이드
- 함수형 컴포넌트 + Hooks 사용
- TypeScript strict 모드
- Tailwind CSS로 스타일링
- 컴포넌트는 components/ 폴더에 구성
- 페이지는 pages/ 폴더에 구성

## 출력 형식
\`\`\`tsx
// components/[ComponentName].tsx
import React from 'react';

interface [ComponentName]Props {
  // props 정의
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({ ... }) => {
  return (
    <div className="...">
      {/* 구현 */}
    </div>
  );
};
\`\`\`

## 기술 스택
- React 19
- TypeScript 5.x
- Tailwind CSS
- React Router 7
- Vite 7
- Lucide React (아이콘)`,
};

// ============================================
// 팀 협업 워크플로우
// ============================================

export interface WorkflowStep {
  step: number;
  agent: string;
  action: string;
  input: string;
  output: string;
}

export const TEAM_WORKFLOW: WorkflowStep[] = [
  {
    step: 1,
    agent: 'PM',
    action: '요구사항 분석',
    input: '사용자 요청',
    output: '기능 명세서 (PRD)',
  },
  {
    step: 2,
    agent: 'UIUX_DESIGNER',
    action: '디자인 설계',
    input: '기능 명세서',
    output: '디자인 명세서',
  },
  {
    step: 3,
    agent: 'FRONTEND_DEVELOPER',
    action: '코드 구현',
    input: '기능 명세서 + 디자인 명세서',
    output: 'React 컴포넌트 코드',
  },
  {
    step: 4,
    agent: 'PM',
    action: '검토 및 피드백',
    input: '구현된 코드',
    output: '승인 또는 수정 요청',
  },
];

// ============================================
// 협업 오케스트레이터
// ============================================

export interface TaskRequest {
  type: 'new_page' | 'new_feature' | 'bug_fix' | 'improvement';
  description: string;
  priority: 'high' | 'medium' | 'low';
  requirements?: string[];
}

export interface AgentOutput {
  agentId: string;
  content: string;
  timestamp: Date;
}

export interface TeamSession {
  id: string;
  task: TaskRequest;
  workflow: WorkflowStep[];
  outputs: AgentOutput[];
  status: 'planning' | 'designing' | 'developing' | 'reviewing' | 'completed';
}

/**
 * 팀 협업 세션을 시작합니다
 */
export function createTeamSession(task: TaskRequest): TeamSession {
  return {
    id: `session-${Date.now()}`,
    task,
    workflow: TEAM_WORKFLOW,
    outputs: [],
    status: 'planning',
  };
}

/**
 * 현재 단계에서 작업해야 할 에이전트를 반환합니다
 */
export function getCurrentAgent(session: TeamSession): AgentRole | null {
  const statusToAgent: Record<string, string> = {
    planning: 'PM',
    designing: 'UIUX_DESIGNER',
    developing: 'FRONTEND_DEVELOPER',
    reviewing: 'PM',
  };

  const agentId = statusToAgent[session.status];
  return agentId ? AGENT_ROLES[agentId] : null;
}

/**
 * 다음 단계로 진행합니다
 */
export function advanceWorkflow(session: TeamSession): TeamSession {
  const transitions: Record<string, TeamSession['status']> = {
    planning: 'designing',
    designing: 'developing',
    developing: 'reviewing',
    reviewing: 'completed',
  };

  return {
    ...session,
    status: transitions[session.status] || session.status,
  };
}
