import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { VegetableItem } from '../../types';
import { PRODUCE_ITEMS } from '../../constants';
import { SurveyPage } from '../../components/SurveyPage';
import { Footer } from '../../components/Footer';
import { HomeEditorialContent } from '../../components/HomeEditorialContent';

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
  zIndex: number;
  vx: number;
  vy: number;
  moveX1: number;
  moveY1: number;
  moveX2: number;
  moveY2: number;
  moveX3: number;
  moveY3: number;
  moveX4: number;
  moveY4: number;
  floatDuration: number;
  floatDelay: number;
}

interface HomePageProps {
  headerOffset?: number;
}

export const HomePage: React.FC<HomePageProps> = ({ headerOffset = 96 }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FloatingItem[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(2); // Step 2: 재료 선택, Step 3: 설문 (Step 1 제거)
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // 초기 아이템 생성 - 랜덤 위치 배치 (퍼센트 기반)
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const sizeMultiplier = isMobile ? 0.78 : 1;
    const baseSize = 180;

    // 그리드 기반 위치 생성 → shuffle → 각 아이템에 배정 (겹침 감소)
    const cols = isMobile ? 5 : 7;
    const rows = Math.ceil(PRODUCE_ITEMS.length / cols);
    const xMin = 5, xMax = 95, yMin = 8, yMax = 85;
    const cellW = (xMax - xMin) / cols;
    const cellH = (yMax - yMin) / rows;

    const gridPositions: { x: number; y: number }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        gridPositions.push({
          x: xMin + (col + 0.5) * cellW + (Math.random() - 0.5) * cellW * 0.6,
          y: yMin + (row + 0.5) * cellH + (Math.random() - 0.5) * cellH * 0.6,
        });
      }
    }
    for (let i = gridPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridPositions[i], gridPositions[j]] = [gridPositions[j], gridPositions[i]];
    }

    const initialItems: FloatingItem[] = PRODUCE_ITEMS.map((produce, index) => {
      const pos = gridPositions[index];
      // 크기 범위 80% ~ 130%
      const scale = (0.8 + Math.random() * 0.5) * sizeMultiplier;

      return {
        id: `produce-${index}`,
        name: produce.name,
        x: pos.x,
        y: pos.y,
        scale,
        rotation: Math.random() * 360,
        imageUrl: produce.image,
        color: '',
        size: baseSize,
        labelColor: produce.color,
        labelOffsetX: (Math.random() - 0.5) * 30,
        labelOffsetY: -20,
        labelRotation: (Math.random() - 0.5) * 20,
        animationDuration: 4 + Math.random() * 2, // 4~6초
        animationDelay: Math.random() * 2, // 0~2초 딜레이
        floatAmplitude: 20 + Math.random() * 15,
        rotationDuration: 22 + Math.random() * 12,
        driftX: (Math.random() - 0.5) * 70,
        driftY: (Math.random() - 0.5) * 50,
        rotateDirection: Math.random() > 0.5 ? 1 : -1,
        zIndex: 1 + index, // 텍스트 뒤에 배치
        vx: 0,
        vy: 0,
        moveX1: (Math.random() - 0.5) * 120,
        moveY1: (Math.random() - 0.5) * 120,
        moveX2: (Math.random() - 0.5) * 150,
        moveY2: (Math.random() - 0.5) * 150,
        moveX3: (Math.random() - 0.5) * 130,
        moveY3: (Math.random() - 0.5) * 130,
        moveX4: (Math.random() - 0.5) * 100,
        moveY4: (Math.random() - 0.5) * 100,
        floatDuration: 10 + Math.random() * 8,
        floatDelay: Math.random() * 4,
      };
    });
    setItems(initialItems);
  }, [headerOffset]);

  // 야채 float + rotate keyframes를 <head>에 직접 주입 (React 19 style 호이스팅 우회)
  useEffect(() => {
    if (items.length === 0) return;
    const css = items.map((item) => {
      const itemId = item.id.replace(/[^a-zA-Z0-9]/g, '');
      return `
        @keyframes float-${itemId} {
          0%   { transform: translate(0px, 0px); }
          20%  { transform: translate(${item.moveX1}px, ${item.moveY1}px); }
          40%  { transform: translate(${item.moveX2}px, ${item.moveY2}px); }
          60%  { transform: translate(${item.moveX3}px, ${item.moveY3}px); }
          80%  { transform: translate(${item.moveX4}px, ${item.moveY4}px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes rotate-${itemId} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(${item.rotateDirection * 360}deg); }
        }
        .vegetable-rotate-${itemId} {
          animation: rotate-${itemId} ${item.rotationDuration}s linear infinite;
        }
      `;
    }).join('');
    const styleEl = document.createElement('style');
    styleEl.id = 'vegetable-animations';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    return () => {
      document.getElementById('vegetable-animations')?.remove();
    };
  }, [items]);

  const handleItemClick = useCallback((item: FloatingItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id);
      if (isSelected) {
        // 선택 해제 - 애니메이션 재개
        return prev.filter(i => i.id !== item.id);
      } else if (prev.length < 3) {
        // 선택 - 해당 위치에서 멈춤
        return [...prev, item];
      }
      return prev;
    });
  }, []);

  const removeSelection = useCallback((itemId: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
  }, []);


  const goToNextStep = useCallback(() => {
    if (selectedItems.length === 3) {
      localStorage.setItem('spirit-finder-selected-items', JSON.stringify(selectedItems));
      // 0.5초 딜레이 후 자동 전환
      setTimeout(() => {
        setStep(3);
      }, 500);
    }
  }, [selectedItems]);

  // 3칸 완성 시 자동 전환 제거 (버튼 클릭으로 전환)

  // 자유 부유 모션은 CSS 애니메이션으로만 처리 (원래 방식)


  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#ffffff', width: '100%', overflowX: 'hidden' }}>
      {/* ============================================
          HERO SECTION - 나의 슬로우 스피릿 찾기
          ============================================ */}
      <section 
        ref={containerRef}
        className="relative w-full"
        style={{ 
          minHeight: 'calc(100vh - 96px)',
          height: step === 3 ? 'auto' : 'calc(100vh - 96px)',
          backgroundColor: step === 3 ? '#ffffff' : 'transparent',
          backgroundImage: step === 3 ? 'none' : 'url(/veggieverse/images/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          paddingTop: 'clamp(40px, 8vw, 80px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          paddingBottom: '0',
          display: 'flex',
          flexDirection: 'column',
          clipPath: step === 3 ? undefined : 'inset(-40px -50px 0 -50px)',
        }}
      >
        {/* 야채 플로팅 영역 - 섹션 경계를 살짝 넘어감 */}
        <div className="absolute" style={{ top: '-40px', left: '-50px', right: '-50px', bottom: '-40px', pointerEvents: 'none' }}>
          {step !== 3 && items.map((item) => {
            const isSelected = selectedItems.some(i => i.id === item.id);
            const itemId = item.id.replace(/[^a-zA-Z0-9]/g, '');
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className="absolute group cursor-pointer"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: `${item.size * item.scale}px`,
                  height: `${item.size * item.scale}px`,
                  marginLeft: `-${(item.size * item.scale) / 2}px`,
                  marginTop: `-${(item.size * item.scale) / 2}px`,
                  zIndex: isSelected ? 19 : (item.zIndex % 10) + 1,
                  pointerEvents: 'auto',
                  isolation: 'isolate',
                  animation: isSelected ? 'none' : `float-${itemId} ${item.floatDuration}s ease-in-out infinite`,
                  animationDelay: isSelected ? undefined : `${item.floatDelay}s`,
                }}
              >
                {/* 회전 래퍼 */}
                <div
                  className={`w-full h-full relative ${!isSelected ? `vegetable-rotate-${itemId}` : ''}`}
                  style={{ animation: isSelected ? 'none' : undefined }}
                >
                    {/* 원본 이미지 (항상 렌더링) */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain absolute inset-0"
                      style={{
                        opacity: (isSelected || hoveredItemId === item.id) ? 0 : 1,
                        zIndex: 1,
                      }}
                      draggable={false}
                    />

                    {/* 컬러 실루엣 (호버 또는 선택 시 표시) */}
                    <div
                      className="w-full h-full absolute inset-0"
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
                        filter: isSelected ? 'drop-shadow(0 0 0 3px var(--palette-text))' : 'none',
                        opacity: (isSelected || hoveredItemId === item.id) ? 1 : 0,
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* 호버 시 야채 이름 표시 (이미지 안에) */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        zIndex: 30,
                        pointerEvents: 'none',
                        opacity: (hoveredItemId === item.id && !isSelected) ? 1 : 0,
                      }}
                    >
                      <span
                        className="text-white text-sm font-medium px-3 py-1.5 rounded"
                        style={{
                          backgroundColor: 'rgba(26, 10, 5, 0.7)',
                          backdropFilter: 'blur(4px)',
                          boxShadow: '0 2px 8px rgba(26, 10, 5, 0.3)',
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>

        {/* 플로팅 영역 간격 유지 */}
        <div className="flex-1" style={{ minHeight: '300px' }} />

        {/* 서브헤드라인 */}
        <p 
          className="mb-4 md:mb-6 z-30 relative text-center mx-auto"
          style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 700,
            lineHeight: '1.6',
            letterSpacing: '-0.01em',
            maxWidth: '700px',
            paddingLeft: '40px',
            paddingRight: '40px',
            color: 'var(--primary)',
          }}
        >
          마음이 당기는 재료 세 가지.<br />그것이 당신만의 식탁이 시작되는 방식입니다.
        </p>

        {/* 본문 */}
        <p 
          className="text-warm-gray mb-8 md:mb-12 z-30 relative text-center mx-auto"
          style={{ 
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '1.8',
            letterSpacing: '-0.01em',
            maxWidth: '800px',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          슬런치는 맛있는 한 끼가 거창할 필요 없다고 믿습니다. 바쁜 하루 안에도 나를 위한 식사 시간은 분명히 있어야 한다고 생각해요. 슬런치는 당신의 취향과 라이프스타일에 맞춰 매 끼니의 흐름을 설계합니다. 건강을 위해 맛을 포기하거나, 맛을 위해 건강을 타협할 필요가 없는 식탁—슬런치가 그 자리를 만들어드릴게요.
        </p>

        {/* 테이블 열기 영역 - 항상 표시 (야채 선택 전 20px 노출) */}
        {step === 2 && (
          <>
            <style>
              {`
                @keyframes slideUpPush {
                  from {
                    transform: translate(-50%, calc(100% + 20px));
                  }
                  to {
                    transform: translate(-50%, 0);
                  }
                }
                @keyframes pullUpPage {
                  from {
                    transform: translateY(0);
                  }
                  to {
                    transform: translateY(-100%);
                  }
                }
              `}
            </style>

            {/* 마름모 형태 박스 - 과일 선택시 표시 */}
            {selectedItems.length >= 1 && (
              <div 
                className="absolute z-40"
                style={{
                  width: '860px',
                  maxWidth: '100%',
                  left: '50%',
                  bottom: '0',
                  transform: 'translate(-50%, 0)',
                  animation: 'slideUpPush 0.5s ease-out',
                  overflow: 'hidden',
                }}
              >
                {/* 마름모 형태 배경 - 상단 라운딩 포함 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: 'var(--primary)',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    clipPath: 'polygon(3.49% 0, 96.51% 0, 100% 100%, 0 100%)',
                  }}
                />
                {/* 상단 라운딩 오버레이 - clipPath 위에 표시 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '3.49%',
                    right: '3.51%',
                    height: '16px',
                    backgroundColor: 'var(--primary)',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                />
                
                {/* 내용 영역 */}
                <div 
                  className="mx-auto"
                  style={{
                    width: '100%',
                    padding: '0',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                <div 
                  className="flex flex-col md:flex-row items-center justify-center gap-3"
                  style={{
                    padding: '20px',
                  }}
                >
                  {/* 선택된 야채 실루엣 */}
                  <div className="flex items-center gap-2">
                    {selectedItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="relative"
                        style={{
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <div
                          className="w-full h-full"
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
                        {/* X 버튼 - 삭제 가능 (갈색) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(item.id);
                          }}
                          className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full z-10"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: 'var(--palette-text)',
                          }}
                          aria-label="선택 해제"
                        >
                          <X className="w-3 h-3" style={{ color: 'var(--primary)' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* 나의 슬로우 스피릿 찾기 버튼 - DEBUG: 항상 활성화 */}
                  <button
                    onClick={() => {
                      if (selectedItems.length >= 1) {
                        localStorage.setItem('spirit-finder-selected-items', JSON.stringify(selectedItems));
                        navigate('/spirit/step');
                      }
                    }}
                    disabled={false}
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      border: 'none',
                      backgroundColor: 'var(--palette-text)',
                      color: 'var(--primary)',
                      fontSize: '15px',
                      fontWeight: 400,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      minHeight: '44px',
                      minWidth: '120px',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 100,
                      pointerEvents: 'auto',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--charcoal)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--palette-text)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                  >
                    나의 슬로우 스피릿 찾기
                  </button>
                </div>
              </div>
            </div>
            )}
          </>
        )}

        {/* Step 3: 설문 페이지 (12px 바가 끌어올림) */}
        {step === 3 && (
          <div
            className="fixed inset-0 z-50"
            style={{
              transform: 'translateY(100%)',
              animation: 'pullUpPage 0.6s ease-out forwards',
              backgroundColor: 'var(--primary)',
            }}
          >
            <div style={{ paddingTop: '20px', paddingBottom: '40px', minHeight: '100vh' }}>
              <SurveyPage 
                selectedItems={selectedItems} 
              />
            </div>
          </div>
        )}
      </section>

      {/* [Present Studio / Saba Jam] 식 케이스 스터디 — 에디토리얼 스크롤 */}
      <HomeEditorialContent />

      {/* Footer */}
      <Footer />
    </div>
  );
};
