import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { recipes as slunchListData } from '../data/slunchList';
import { getRecipeThumbnailImage } from '../utils/recipeImages';

interface Recipe {
  id: number;
  title: string;
  image: string;
  likes?: number;
}

// 슬런치 데이터에서 인기 레시피 생성 (placeholder 제외, 좋아요 순 정렬, 상위 20개)
const popularRecipes: Recipe[] = slunchListData
  .filter(r => r.code !== 'No.')
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 20)
  .map(r => ({
    id: r.id,
    title: r.name,
    image: getRecipeThumbnailImage(r.id),
    likes: r.likes,
  }));

// 2개씩 묶어서 10개 슬라이드
const slides: Recipe[][] = [];
for (let i = 0; i < popularRecipes.length; i += 2) {
  slides.push(popularRecipes.slice(i, i + 2));
}

export const PopularRecipes: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % total);
  }, [total]);

  // 자동 슬라이딩 (2초 간격, hover/드래그 시 일시정지)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 2000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, total]);

  // 드래그 (마우스 + 터치)
  const dragStartX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const didDrag = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setPaused(true);
    dragStartX.current = e.clientX;
    didDrag.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 5) didDrag.current = true;
    setDragOffset(diff);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    const w = containerRef.current?.offsetWidth || 1;
    const threshold = w * 0.15;
    if (dragOffset < -threshold) {
      setCurrent(c => (c + 1) % total);
    } else if (dragOffset > threshold) {
      setCurrent(c => (c - 1 + total) % total);
    }
    setDragOffset(0);
    setPaused(false);
  };

  return (
    <section style={{ position: 'relative', width: '100%' }}>
      {/* 슬라이드 배너 — 전체 너비, 갭 없이 반반 */}
      <div
        ref={containerRef}
        style={{
          overflow: 'hidden',
          width: '100%',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div style={{
          display: 'flex',
          transition: dragging ? 'none' : 'transform 0.5s ease',
          transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
        }}>
          {slides.map((pair, slideIdx) => (
            <div
              key={slideIdx}
              style={{
                flex: '0 0 100%',
                display: 'flex',
              }}
            >
              {pair.map((recipe) => (
                <Link
                  to={`/recipe/${recipe.id}`}
                  key={recipe.id}
                  draggable={false}
                  onClick={(e) => { if (didDrag.current) e.preventDefault(); }}
                  style={{
                    flex: '0 0 50%',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      loading="lazy"
                      draggable={false}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 컨트롤 오버레이 */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
      }}>
        <span style={{
          fontSize: '12px',
          color: '#fff',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 1px 3px rgba(26, 10, 5, 0.5)',
        }}>
          {current + 1} / {total}
        </span>
        <button
          onClick={prev}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(26, 10, 5, 0.4)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26, 10, 5, 0.7)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26, 10, 5, 0.4)'; }}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(26, 10, 5, 0.4)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(26, 10, 5, 0.7)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(26, 10, 5, 0.4)'; }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default PopularRecipes;
