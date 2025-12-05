import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { VegetableItem } from './types';
import { PRODUCE_ITEMS } from './constants';
import { SurveyPage } from './components/SurveyPage';

const BASE_PATH = import.meta.env.BASE_URL || '/';

// 밝은 색상인지 판단하는 헬퍼 함수
const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
};

interface FloatingItem extends VegetableItem {
  vx: number;
  vy: number;
  floatOffset: number;
  floatSpeed: number;
  floatAmplitudeX: number; // X축 흔들림 크기
  floatAmplitudeY: number; // Y축 흔들림 크기
  size: number;
  rotationSpeed: number; // 회전 속도 (양수: 시계, 음수: 반시계)
  currentRotation: number; // 현재 회전 각도
  wobbleOffset: number; // 추가 흔들림 오프셋
  pathCurve: number; // 곡선 경로 강도
  labelColor: string; // 라벨 배경 색상
  labelOffsetX: number; // 스티커 X 오프셋
  labelOffsetY: number; // 스티커 Y 오프셋
  labelRotation: number; // 스티커 회전
}

const App: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FloatingItem[]>([]);
  const [showSelectionBar, setShowSelectionBar] = useState(true);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 초기 아이템 생성 - 일부는 화면 밖에서 시작
  useEffect(() => {
    const newItems: FloatingItem[] = PRODUCE_ITEMS.map((produce, index) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.12; // 더 느리게
      
      // 약 40%는 화면 밖에서 시작
      const startOutside = Math.random() < 0.4;
      let startX, startY;
      
      if (startOutside) {
        const edge = Math.floor(Math.random() * 4);
        const size = 100 + Math.random() * 60;
        switch (edge) {
          case 0: startX = Math.random() * window.innerWidth; startY = -size - Math.random() * 200; break;
          case 1: startX = window.innerWidth + size + Math.random() * 200; startY = Math.random() * window.innerHeight; break;
          case 2: startX = Math.random() * window.innerWidth; startY = window.innerHeight + size + Math.random() * 200; break;
          default: startX = -size - Math.random() * 200; startY = Math.random() * window.innerHeight;
        }
      } else {
        startX = Math.random() * window.innerWidth;
        startY = Math.random() * (window.innerHeight - 250);
      }
      
      // 회전 방향 랜덤 (시계 또는 반시계)
      const rotationDirection = Math.random() > 0.5 ? 1 : -1;
      
      return {
        id: `produce-${index}`,
        name: produce.name,
        x: startX,
        y: startY,
        scale: 1.3 + Math.random() * 1.2, // 130% ~ 250% 크기
        rotation: Math.random() * 360,
        imageUrl: produce.image,
        color: '',
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.3, // 더 다양한 속도
        floatAmplitudeX: 15 + Math.random() * 25, // X축 흔들림 15~40px
        floatAmplitudeY: 20 + Math.random() * 30, // Y축 흔들림 20~50px
        size: 80 + Math.random() * 70,
        rotationSpeed: (0.02 + Math.random() * 0.06) * rotationDirection, // 시계/반시계 랜덤
        currentRotation: Math.random() * 360,
        wobbleOffset: Math.random() * Math.PI * 2, // 추가 흔들림
        pathCurve: 0.5 + Math.random() * 1.5, // 곡선 경로 강도
        labelColor: produce.color, // 과일 메인 컬러
        labelOffsetX: (Math.random() - 0.5) * 40, // 스티커 X 오프셋 (-20 ~ 20)
        labelOffsetY: (Math.random() - 0.5) * 40, // 스티커 Y 오프셋 (-20 ~ 20)
        labelRotation: -15 + Math.random() * 30, // 스티커 회전 (-15 ~ 15도)
      };
    });
    setItems(newItems);
  }, []);

  // 아이템 선택/해제
  const handleItemClick = useCallback((item: FloatingItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id);
      
      if (isSelected) {
        return prev.filter(i => i.id !== item.id);
      } else if (prev.length < 3) {
        return [...prev, item];
      }
      return prev;
    });
  }, []);

  // 선택 해제
  const removeSelection = useCallback((itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  // 다음 단계로 스크롤
  const goToSurvey = useCallback(() => {
    setShowSelectionBar(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  // 스크롤 위치에 따라 선택바 표시/숨김
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const threshold = window.innerHeight * 0.3;
      
      if (scrollTop < threshold) {
        setShowSelectionBar(true);
      } else {
        setShowSelectionBar(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // 느린 위치 이동 (setInterval 사용)
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => 
        prevItems.map(item => {
          let newX = item.x + item.vx * 0.5;
          let newY = item.y + item.vy * 0.5;

          // 화면 경계에서 방향 전환
          const padding = 50;
          const margin = 100;
          
          let newVx = item.vx;
          let newVy = item.vy;
          
          if (newX < padding || newX > window.innerWidth - padding) {
            newVx = -item.vx;
            newX = Math.max(padding, Math.min(window.innerWidth - padding, newX));
          }
          if (newY < margin || newY > window.innerHeight - 300) {
            newVy = -item.vy;
            newY = Math.max(margin, Math.min(window.innerHeight - 300, newY));
          }

          return { ...item, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 100); // 100ms마다 업데이트 (10fps)

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* 첫 번째 페이지 - 야채 선택 */}
      <div 
        className="relative w-screen h-screen overflow-hidden select-none snap-start"
        style={{
          backgroundImage: `url(${BASE_PATH}background.png?v=new)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 상단 헤더 */}
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#f9ff35' }}>
          {/* 네비게이션 바 */}
          <nav className="h-16 flex items-center justify-between px-8">
            {/* 왼쪽 로고 */}
            <div className="flex items-center gap-3">
              <img 
                src={`${BASE_PATH}logo.png`} 
                alt="SLUNCH FACTORY" 
                className="h-8 w-auto"
              />
            </div>
            
            {/* 가운데 메뉴 */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">SLUNCH FACTORY</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">STORE</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">EVENT</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">COMMUNITY</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">REVIEW</a>
              <a href="#" className="text-stone-700 text-sm font-semibold hover:text-black transition-colors">CONTACT</a>
            </div>
            
            {/* 오른쪽 아이콘 */}
            <div className="flex items-center gap-6">
              <span className="text-stone-500 text-sm">KR</span>
              <button className="text-stone-600 hover:text-black transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="text-stone-600 hover:text-black transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">0</span>
              </button>
              <button className="text-stone-600 hover:text-black transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </header>

        {/* 떠다니는 야채/과일들 */}
        {items.map((item) => {
          const isSelected = selectedItems.some(i => i.id === item.id);
          
          return (
            <div
              key={item.id}
              className={`absolute cursor-pointer hover:scale-110 hover:z-50 group floating-item
                ${isSelected ? 'z-40' : ''}`}
              style={{
                left: item.x,
                top: item.y,
                width: item.size,
                height: item.size,
                transform: `translate(-50%, -50%) scale(${item.scale})`,
                animationDelay: `${item.floatOffset}s`,
                animationDuration: `${3 + item.floatSpeed * 2}s`,
              }}
              onClick={(e) => handleItemClick(item, e)}
            >
              <div className="relative w-full h-full">
                {/* 원본 이미지 */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105
                    ${isSelected ? 'opacity-0' : 'opacity-100'}`}
                  loading="lazy"
                  draggable={false}
                />
                
                {/* 선택 시 컬러 실루엣 */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300
                    ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundColor: item.labelColor,
                    maskImage: `url(${item.imageUrl})`,
                    WebkitMaskImage: `url(${item.imageUrl})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>

              <div
                className="absolute 
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  whitespace-nowrap z-20
                  flex items-center justify-center"
                style={{ 
                  backgroundColor: item.labelColor,
                  borderRadius: '50%',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${item.labelOffsetX}px), calc(-50% + ${item.labelOffsetY}px)) rotate(${item.labelRotation}deg) scale(${1 / item.scale})`,
                }}
              >
                <span 
                  className="font-futura font-medium"
                  style={{ 
                    fontSize: '15px',
                    color: isLightColor(item.labelColor) ? '#000000' : '#FFFFFF',
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* 하단 선택 바 */}
        {showSelectionBar && (
        <div className="selection-bar fixed bottom-0 left-0 right-0 z-50 transition-all duration-500">
          {/* 선택 영역 */}
          <div className="p-4">
            <div className="max-w-2xl mx-auto">
              {/* 선택된 아이템들 */}
              <div className="flex items-center justify-center gap-4 mb-4">
                {[0, 1, 2].map((index) => {
                  const item = selectedItems[index];
                  return (
                    <div
                      key={index}
                      className={`w-20 h-20 rounded-2xl border-2 border-dashed transition-all duration-300 flex items-center justify-center
                        ${item ? 'border-black bg-white shadow-lg' : 'border-stone-300 bg-white/50'}`}
                    >
                      {item ? (
                        <div className="relative w-full h-full p-1">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                          <button
                            onClick={() => removeSelection(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-colors shadow-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-stone-400 text-2xl">+</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 믹스하기 버튼 */}
              <div className="flex justify-center">
                <button
                  onClick={goToSurvey}
                  disabled={selectedItems.length === 0}
                  className={`px-12 py-3 text-white text-sm tracking-wider transition-all duration-300
                    ${selectedItems.length > 0 
                      ? 'hover:bg-stone-900' 
                      : 'cursor-not-allowed'}`}
                  style={{ 
                    backgroundColor: selectedItems.length > 0 ? '#000000' : 'rgba(0,0,0,0.4)',
                  }}
                >
                  믹스하기
                </button>
              </div>
            </div>
          </div>

          {/* 쉐브론 아이콘 */}
          <div className="w-full flex justify-center py-3">
            <ChevronDown className="w-6 h-6 text-black" strokeWidth={1} />
          </div>

          {/* 하단 블랙 바 */}
          <div className="w-full h-10 bg-black"></div>
        </div>
        )}
      </div>

      {/* 두 번째 페이지 - 설문조사 */}
      <div className="survey-page snap-start min-h-screen">
        <SurveyPage selectedItems={selectedItems} />
      </div>
    </div>
  );
};

export default App;
