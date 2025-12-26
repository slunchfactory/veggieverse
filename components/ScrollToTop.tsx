import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 페이지 경로가 바뀔 때마다 즉시 스크롤을 맨 위로
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // document.documentElement도 초기화
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
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
    
    // requestAnimationFrame으로 한 번 더 확실하게 처리
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
    });
  }, [location.pathname]);

  return null;
};

