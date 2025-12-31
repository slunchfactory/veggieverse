/**
 * 에이전트 팀 오케스트레이터
 *
 * 3명의 에이전트가 순차적으로 협업하여 웹페이지를 구축하는 워크플로우를 관리합니다.
 *
 * 워크플로우:
 * 1. PM: 요구사항 분석 → 기능 명세서 작성
 * 2. UI/UX Designer: 기능 명세 → 디자인 명세서 작성
 * 3. Frontend Developer: 디자인 명세 → React 코드 구현
 * 4. PM: 코드 검토 → 승인 또는 피드백
 */

import {
  AGENT_ROLES,
  AGENT_PROMPTS,
  TEAM_WORKFLOW,
  createTeamSession,
  getCurrentAgent,
  advanceWorkflow,
  type TaskRequest,
  type TeamSession,
  type AgentOutput,
} from './team-config';

// ============================================
// 워크플로우 상태 관리
// ============================================

export type WorkflowStatus =
  | 'idle'
  | 'planning'      // PM이 기획 중
  | 'designing'     // 디자이너가 디자인 중
  | 'developing'    // 개발자가 구현 중
  | 'reviewing'     // PM이 검토 중
  | 'completed'     // 완료
  | 'error';        // 오류 발생

export interface WorkflowState {
  session: TeamSession | null;
  currentStep: number;
  status: WorkflowStatus;
  history: AgentOutput[];
  error?: string;
}

// ============================================
// 메시지 타입 정의
// ============================================

export interface AgentMessage {
  from: 'pm' | 'uiux' | 'frontend' | 'user' | 'system';
  to: 'pm' | 'uiux' | 'frontend' | 'user' | 'all';
  type: 'request' | 'response' | 'feedback' | 'approval' | 'error';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// ============================================
// 오케스트레이터 클래스
// ============================================

export class TeamOrchestrator {
  private state: WorkflowState;
  private messageQueue: AgentMessage[];

  constructor() {
    this.state = {
      session: null,
      currentStep: 0,
      status: 'idle',
      history: [],
    };
    this.messageQueue = [];
  }

  /**
   * 새로운 작업을 시작합니다
   */
  startTask(request: TaskRequest): void {
    this.state.session = createTeamSession(request);
    this.state.status = 'planning';
    this.state.currentStep = 1;
    this.state.history = [];

    this.addMessage({
      from: 'system',
      to: 'pm',
      type: 'request',
      content: this.buildPMRequest(request),
      timestamp: new Date(),
    });
  }

  /**
   * PM에게 전달할 요청 메시지 생성
   */
  private buildPMRequest(request: TaskRequest): string {
    return `
## 새로운 작업 요청

### 작업 유형
${request.type === 'new_page' ? '새 페이지 개발' :
  request.type === 'new_feature' ? '새 기능 추가' :
  request.type === 'bug_fix' ? '버그 수정' : '개선'}

### 우선순위
${request.priority === 'high' ? '높음' : request.priority === 'medium' ? '보통' : '낮음'}

### 설명
${request.description}

${request.requirements ? `
### 추가 요구사항
${request.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}
` : ''}

---
위 요청을 분석하고 기능 명세서(PRD)를 작성해주세요.
    `.trim();
  }

  /**
   * PM의 출력을 받아 디자이너에게 전달
   */
  onPMComplete(prdContent: string): void {
    this.addToHistory('pm', prdContent);

    this.state.status = 'designing';
    this.state.currentStep = 2;

    this.addMessage({
      from: 'pm',
      to: 'uiux',
      type: 'request',
      content: this.buildDesignerRequest(prdContent),
      timestamp: new Date(),
    });
  }

  /**
   * 디자이너에게 전달할 요청 메시지 생성
   */
  private buildDesignerRequest(prdContent: string): string {
    return `
## 디자인 요청

PM으로부터 다음 기능 명세서를 전달받았습니다.
이를 바탕으로 디자인 명세서를 작성해주세요.

---
${prdContent}
---

### 요청 사항
1. 레이아웃 구조도 (ASCII)
2. 컴포넌트별 Tailwind CSS 클래스 명세
3. 상태별 스타일 (hover, active, disabled)
4. 반응형 디자인 가이드
5. 인터랙션 명세
    `.trim();
  }

  /**
   * 디자이너의 출력을 받아 개발자에게 전달
   */
  onDesignerComplete(designSpec: string): void {
    this.addToHistory('uiux', designSpec);

    this.state.status = 'developing';
    this.state.currentStep = 3;

    const prdContent = this.getLatestOutput('pm');

    this.addMessage({
      from: 'uiux',
      to: 'frontend',
      type: 'request',
      content: this.buildDeveloperRequest(prdContent || '', designSpec),
      timestamp: new Date(),
    });
  }

  /**
   * 개발자에게 전달할 요청 메시지 생성
   */
  private buildDeveloperRequest(prdContent: string, designSpec: string): string {
    return `
## 개발 요청

다음 명세를 바탕으로 React 컴포넌트를 구현해주세요.

### 기능 명세 (PM)
---
${prdContent}
---

### 디자인 명세 (UI/UX)
---
${designSpec}
---

### 요청 사항
1. TypeScript 인터페이스 정의
2. React 함수형 컴포넌트 구현
3. Tailwind CSS 스타일 적용
4. 필요한 이벤트 핸들러 구현
5. 사용 예시 코드 제공
    `.trim();
  }

  /**
   * 개발자의 출력을 받아 PM에게 검토 요청
   */
  onDeveloperComplete(codeOutput: string): void {
    this.addToHistory('frontend', codeOutput);

    this.state.status = 'reviewing';
    this.state.currentStep = 4;

    this.addMessage({
      from: 'frontend',
      to: 'pm',
      type: 'request',
      content: this.buildReviewRequest(codeOutput),
      timestamp: new Date(),
    });
  }

  /**
   * PM에게 전달할 검토 요청 메시지 생성
   */
  private buildReviewRequest(codeOutput: string): string {
    const prdContent = this.getLatestOutput('pm');

    return `
## 코드 검토 요청

프론트엔드 개발자가 구현을 완료했습니다.
원래 요구사항과 대조하여 검토해주세요.

### 원래 요구사항
---
${prdContent}
---

### 구현된 코드
---
${codeOutput}
---

### 검토 항목
1. 모든 필수 기능이 구현되었는가?
2. 디자인 명세가 정확히 적용되었는가?
3. 코드 품질이 적절한가?
4. 추가 수정이 필요한 부분이 있는가?

### 결정
- **승인**: 요구사항을 모두 충족하면 승인
- **수정 요청**: 부족한 부분이 있으면 구체적인 피드백과 함께 수정 요청
    `.trim();
  }

  /**
   * PM의 검토 결과 처리
   */
  onReviewComplete(approved: boolean, feedback?: string): void {
    if (approved) {
      this.state.status = 'completed';
      this.addMessage({
        from: 'pm',
        to: 'all',
        type: 'approval',
        content: '작업이 승인되었습니다. 워크플로우가 완료되었습니다.',
        timestamp: new Date(),
      });
    } else {
      // 피드백과 함께 개발자에게 수정 요청
      this.state.status = 'developing';
      this.state.currentStep = 3;

      this.addMessage({
        from: 'pm',
        to: 'frontend',
        type: 'feedback',
        content: `
## 수정 요청

검토 결과 다음 사항의 수정이 필요합니다:

${feedback}

위 피드백을 반영하여 코드를 수정해주세요.
        `.trim(),
        timestamp: new Date(),
      });
    }
  }

  /**
   * 히스토리에 에이전트 출력 추가
   */
  private addToHistory(agentId: string, content: string): void {
    this.state.history.push({
      agentId,
      content,
      timestamp: new Date(),
    });
  }

  /**
   * 특정 에이전트의 최신 출력 가져오기
   */
  private getLatestOutput(agentId: string): string | null {
    const outputs = this.state.history.filter(h => h.agentId === agentId);
    return outputs.length > 0 ? outputs[outputs.length - 1].content : null;
  }

  /**
   * 메시지 큐에 추가
   */
  private addMessage(message: AgentMessage): void {
    this.messageQueue.push(message);
  }

  /**
   * 다음 처리할 메시지 가져오기
   */
  getNextMessage(): AgentMessage | null {
    return this.messageQueue.shift() || null;
  }

  /**
   * 현재 상태 반환
   */
  getState(): WorkflowState {
    return { ...this.state };
  }

  /**
   * 현재 담당 에이전트 정보 반환
   */
  getCurrentAgentInfo(): {
    name: string;
    prompt: string;
  } | null {
    if (!this.state.session) return null;

    const agent = getCurrentAgent(this.state.session);
    if (!agent) return null;

    const promptKey = agent.id === 'pm' ? 'PM' :
      agent.id === 'uiux' ? 'UIUX_DESIGNER' : 'FRONTEND_DEVELOPER';

    return {
      name: agent.nameKo,
      prompt: AGENT_PROMPTS[promptKey],
    };
  }

  /**
   * 워크플로우 진행 상황을 시각적으로 표시
   */
  getProgressDisplay(): string {
    const steps = [
      { step: 1, name: 'PM 기획', status: 'planning' },
      { step: 2, name: 'UI/UX 디자인', status: 'designing' },
      { step: 3, name: '프론트엔드 개발', status: 'developing' },
      { step: 4, name: 'PM 검토', status: 'reviewing' },
    ];

    return steps.map(s => {
      const isCurrent = this.state.currentStep === s.step;
      const isCompleted = this.state.currentStep > s.step ||
        (s.step === 4 && this.state.status === 'completed');

      const icon = isCompleted ? '[v]' : isCurrent ? '[>]' : '[ ]';
      const style = isCurrent ? '<<<' : '';

      return `${icon} Step ${s.step}: ${s.name} ${style}`;
    }).join('\n');
  }
}

// ============================================
// 사용 예시
// ============================================

/**
 * 워크플로우 실행 예시
 *
 * ```typescript
 * const orchestrator = new TeamOrchestrator();
 *
 * // 1. 작업 시작
 * orchestrator.startTask({
 *   type: 'new_page',
 *   description: '상품 목록 페이지를 만들어주세요',
 *   priority: 'high',
 *   requirements: [
 *     '카테고리별 필터링',
 *     '가격순/인기순 정렬',
 *     '반응형 그리드 레이아웃'
 *   ]
 * });
 *
 * // 2. PM이 기획 완료 후
 * orchestrator.onPMComplete(prdContent);
 *
 * // 3. 디자이너가 디자인 완료 후
 * orchestrator.onDesignerComplete(designSpec);
 *
 * // 4. 개발자가 구현 완료 후
 * orchestrator.onDeveloperComplete(codeOutput);
 *
 * // 5. PM이 검토 완료
 * orchestrator.onReviewComplete(true); // 승인
 * // 또는
 * orchestrator.onReviewComplete(false, '버튼 스타일 수정 필요'); // 수정 요청
 *
 * // 진행 상황 확인
 * console.log(orchestrator.getProgressDisplay());
 * ```
 */

export default TeamOrchestrator;
