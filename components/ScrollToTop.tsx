import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollDocumentToTop() {
  const root = document.scrollingElement ?? document.documentElement;
  root.scrollTop = 0;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 페이지 경로가 바뀔 때마다 즉시 스크롤을 맨 위로
    scrollDocumentToTop();
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
    
    // 메인 컨테이너 스크롤 초기화
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }

    // overflow-auto나 overflow-scroll이 있는 모든 스크롤 가능한 컨테이너 초기화
    const scrollableSelectors = [
      '[style*="overflow"]',
      '.overflow-auto',
      '.overflow-scroll',
      '[class*="overflow-auto"]',
      '[class*="overflow-scroll"]',
    ];
    
    scrollableSelectors.forEach(selector => {
      const containers = document.querySelectorAll(selector);
      containers.forEach((container) => {
        if (container instanceof HTMLElement && container.scrollTop > 0) {
          container.scrollTop = 0;
        }
      });
    });
    
    // 다음 프레임 + 레이아웃(이미지 등) 이후 한 번 더 (긴 홈에서 복원/레이아웃 시 튐 방지)
    requestAnimationFrame(() => {
      scrollDocumentToTop();
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
    });
    const t = window.setTimeout(() => {
      scrollDocumentToTop();
    }, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  /** 풀 리로드 후 이미지 등으로 레이아웃이 커진 뒤에도 맨 위 고정 */
  useEffect(() => {
    const onLoad = () => scrollDocumentToTop();
    if (document.readyState === 'complete') {
      queueMicrotask(onLoad);
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
    return undefined;
  }, []);

  return null;
};

