import React from 'react';

type SubscribeShellProps = {
  /** 데스크탑 좌측 메뉴 라이브러리 (데스크탑 전용) */
  menuColumn: React.ReactNode;
  /** 캘린더 영역: 기간 탭 + 배송 시작일 + 일정 리스트 */
  plannerTopColumn: React.ReactNode;
  /** 결제 영역: 구매 옵션 + 결제 바 */
  plannerBottomColumn: React.ReactNode;
  /** 모바일 최상단 플랜 탭 (슬림/헬시) */
  mobilePlanTabs?: React.ReactNode;
  /** 모바일 원형 휠 */
  mobileWheel?: React.ReactNode;
};

/**
 * 데스크탑: 좌(메뉴) + 우(상단 캘린더 + 하단 결제) 2열
 * 모바일: 플랜탭 → 캘린더 → 휠 → 결제 순 세로 배치
 */
export const SubscribeShell: React.FC<SubscribeShellProps> = ({
  menuColumn,
  plannerTopColumn,
  plannerBottomColumn,
  mobilePlanTabs,
  mobileWheel,
}) => {
  return (
    <div
      className="subscribe-page-shell w-full min-h-0 min-w-0 overflow-hidden border-0 border-t border-solid border-black"
      style={{
        height: 'calc(100dvh - var(--header-area-h, var(--header-h, 64px)))',
        maxHeight: 'calc(100dvh - var(--header-area-h, var(--header-h, 64px)))',
        minHeight: 0,
      }}
      dir="ltr"
    >
      {/* 데스크탑 2열 */}
      <div className="hidden lg:grid grid-cols-[minmax(0,7fr)_minmax(0,3fr)] h-full min-h-0">
        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-0 border-r border-solid border-black bg-[#FAFAFA]">
          {menuColumn}
        </div>
        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-white">
          {plannerTopColumn}
          {plannerBottomColumn}
        </div>
      </div>

      {/* 모바일 세로 스택: 플랜탭 → 캘린더 → 휠 → 결제 */}
      <div className="flex lg:hidden flex-col h-full min-h-0">
        {mobilePlanTabs && (
          <div className="shrink-0">
            {mobilePlanTabs}
          </div>
        )}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-white">
          {plannerTopColumn}
        </div>
        {mobileWheel && (
          <div className="shrink-0">
            {mobileWheel}
          </div>
        )}
        <div className="shrink-0 bg-white">
          {plannerBottomColumn}
        </div>
      </div>
    </div>
  );
};
