import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VegetableItem } from '../types';
import { PRODUCE_ITEMS } from '../constants';
import { SurveyPage } from '../components/SurveyPage';

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
  size: number;
  labelColor: string;
  labelOffsetX: number;
  labelOffsetY: number;
  labelRotation: number;
  animationDuration: number;
  animationDelay: number;
  floatAmplitude: number;
  rotationDuration: number;
  driftX: number;
  driftY: number;
  rotateDirection: number;
}

interface VeganTestPageProps {
  onSaveProfile: (profileImage: string, veganType: string) => void;
}

export const VeganTestPage: React.FC<VeganTestPageProps> = ({ onSaveProfile }) => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FloatingItem[]>([]);
  const [showSelectionBar, setShowSelectionBar] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // body 스크롤 비활성화 (이 페이지에서만)
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  // 초기 아이템 생성 - 150%~250% 랜덤 크기, 오른쪽 회전
  useEffect(() => {
    const initialItems: FloatingItem[] = PRODUCE_ITEMS.map((produce, index) => {
      // 랜덤 위치
      const x = Math.random() * (window.innerWidth - 150) + 75;
      const y = Math.random() * (window.innerHeight - 350) + 120;
      
      // 150%~250% 크기 (기본 80px 기준)
      const baseSize = 80;
      const scale = 1.5 + Math.random() * 1.0; // 1.5 ~ 2.5
      
      return {
        id: `produce-${index}`,
        name: produce.name,
        x,
        y,
        scale,
        rotation: Math.random() * 360,
        imageUrl: produce.image,
        color: '',
        size: baseSize,
        labelColor: produce.color,
        labelOffsetX: (Math.random() - 0.5) * 30,
        labelOffsetY: -20,
        labelRotation: (Math.random() - 0.5) * 20,
        animationDuration: 6 + Math.random() * 4, // 6~10초 플로팅
        animationDelay: Math.random() * -8,
        floatAmplitude: 20 + Math.random() * 15,
        rotationDuration: 15 + Math.random() * 10, // 15~25초에 한 바퀴 회전
        driftX: (Math.random() - 0.5) * 50,
        driftY: (Math.random() - 0.5) * 30,
        rotateDirection: 1, // 오른쪽(시계방향) 회전
      };
    });
    setItems(initialItems);
  }, []);

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

  const removeSelection = useCallback((itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const goToSurvey = useCallback(() => {
    setShowSelectionBar(false);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, []);

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

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory pt-16 relative"
      style={{ 
        scrollBehavior: 'smooth',
        backgroundColor: '#5C4033',
      }}
    >
      {/* 그레인 텍스처 - 피그마 설정: #744b2f, 모노, 사이즈1, 덴시티100, 컬러#54341f */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: '#744b2f',
        }}
      />
      {/* 노이즈 오버레이 - 모노, 사이즈1, 덴시티100% */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' fill='%2354341f'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
          mixBlendMode: 'multiply',
        }}
      />
      {/* 첫 번째 페이지 - 야채 선택 */}
      <div 
        className="relative w-screen h-screen overflow-hidden select-none snap-start z-[2]"
      >
        {/* 상단 바 - Mustard Seed */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8" style={{ backgroundColor: '#D8D262' }}>
          {/* 로고 */}
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="SLUNCH FACTORY" 
            className="h-8 w-auto"
          />
          
          {/* SKIP 버튼 */}
          <Link 
            to="/shop"
            className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
          >
            SKIP
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {/* 떠다니는 야채/과일들 - 150%~250% 크기, 오른쪽 회전 */}
        {items.map((item) => {
          const isSelected = selectedItems.some(i => i.id === item.id);
          const itemId = item.id.replace(/[^a-zA-Z0-9]/g, '');
          
          return (
            <div
              key={item.id}
              className={`absolute cursor-pointer group ${isSelected ? 'z-40' : 'z-10 hover:z-50'}`}
              style={{
                left: item.x,
                top: item.y,
                width: item.size * item.scale,
                height: item.size * item.scale,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => handleItemClick(item, e)}
            >
              {/* 개별 애니메이션 스타일 */}
              <style>{`
                @keyframes float-${itemId} {
                  0% { 
                    transform: translateY(0px) rotate(0deg);
                  }
                  50% { 
                    transform: translateY(${-item.floatAmplitude}px) rotate(180deg);
                  }
                  100% { 
                    transform: translateY(0px) rotate(360deg);
                  }
                }
              `}</style>
              
              {/* 플로팅 + 회전 애니메이션 */}
              <div
                className="w-full h-full"
                style={{
                  animation: `float-${itemId} ${item.rotationDuration}s linear infinite`,
                  animationDelay: `${item.animationDelay}s`,
                }}
              >
                {/* 스티커 라벨 - 마우스 오버 시에만 표시 */}
                <div
                  className="absolute z-20 px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: `${15 / item.scale}px`,
                    fontWeight: 600,
                    backgroundColor: item.labelColor,
                    color: isLightColor(item.labelColor) ? '#1a1a1a' : '#ffffff',
                    top: '-12px',
                    left: '50%',
                    transform: `translateX(-50%) scale(${item.scale})`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  {item.name}
                </div>

                {/* 선택 시: 솔리드 컬러 실루엣 (투명도 0%) */}
                {isSelected && (
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundColor: item.labelColor,
                      WebkitMaskImage: `url(${item.imageUrl})`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url(${item.imageUrl})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />
                )}

                {/* 실제 이미지 - 선택 시 완전히 숨김 */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    isSelected ? 'opacity-0' : 'group-hover:scale-105'
                  }`}
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                  }}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}

        {/* 하단 선택 바 - 원본 이미지 표시 */}
        {showSelectionBar && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
            <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 flex items-center gap-4">
              {/* 선택된 아이템들 - 원본 이미지 */}
              <div className="flex items-center gap-3">
                {[0, 1, 2].map((index) => {
                  const item = selectedItems[index];
                  return (
                    <div
                      key={index}
                      className="relative"
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          item 
                            ? 'bg-stone-50' 
                            : 'border-2 border-dashed border-stone-300'
                        }`}
                      >
                        {item ? (
                          <img 
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <span className="text-stone-300 text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      {/* 취소 버튼 - Rustic Noir */}
                      {item && (
                        <button
                          onClick={() => removeSelection(item.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 text-white rounded-full flex items-center justify-center transition-colors z-10 shadow-sm"
                          style={{ backgroundColor: '#292624' }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 구분선 */}
              <div className="w-px h-8 bg-stone-200"></div>

              {/* 믹스하기 버튼 - Rustic Noir */}
              <button
                onClick={goToSurvey}
                disabled={selectedItems.length < 3}
                className="px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: selectedItems.length === 3 ? '#292624' : '#e5e5e5',
                  color: selectedItems.length === 3 ? '#fff' : '#a3a3a3',
                  cursor: selectedItems.length === 3 ? 'pointer' : 'not-allowed',
                }}
              >
                믹스하기
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 두 번째 페이지 - 설문조사 */}
      <div className="survey-page snap-start min-h-screen relative z-[2]">
        <SurveyPage selectedItems={selectedItems} onSaveProfile={onSaveProfile} />
      </div>
    </div>
  );
};

