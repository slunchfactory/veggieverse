import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { getHomeProductImage } from '../utils/productImages';

// 히어로 슬라이드 데이터
const HERO_SLIDES = [
  {
    id: 1,
    title: '비건 채식주의자들을 위한',
    subtitle: '레스토랑, 슬런치 팩토리',
    image: 'main/banner/main-banner-1.png',
  },
  {
    id: 2,
    title: 'From Nature with Slow',
    subtitle: '자연에서 온 건강한 비건 푸드',
    image: 'main/main-banner-2.png',
  },
  {
    id: 3,
    title: '비건 밀키트 출시',
    subtitle: '집에서도 슬런치의 맛을 즐기세요',
    image: 'main/main-banner-3.png',
  },
  {
    id: 4,
    title: 'Slow Lunch',
    subtitle: 'Full of Abundance',
    image: 'main/main-banner-4.png',
  },
];

// 추천 상품 데이터
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: '슬런치 김치볶음밥 밀키트(2인분)',
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트',
    price: 12000,
    originalPrice: 15000,
  },
  {
    id: 2,
    name: '슬런치 시금치 뇨끼',
    description: '계란, 우유, 버터를 넣지 않은 비건 뇨끼',
    price: 18000,
    originalPrice: 24000,
  },
  {
    id: 3,
    name: '슬런치 블루베리 타르트',
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
  },
];

// 메인 섹션 썸네일용 6개 리스트
const MAIN_THUMB_ITEMS = [
  { id: 'm1', name: '슬런치 김치볶음밥 밀키트(2인분)', price: 12000 },
  { id: 'm2', name: '슬런치 시금치 뇨끼', price: 18000 },
  { id: 'm3', name: '슬런치 블루베리 타르트', price: 39000 },
  { id: 'm4', name: '슬런치 잠봉뵈르', price: 8000 },
  { id: 'm5', name: '슬런치 오리엔탈 셀러드(2인분)', price: 24000 },
  { id: 'm6', name: '슬런치 김치전', price: 13000 },
];

interface HomePageProps {
  headerOffset?: number;
}

export const HomePage: React.FC<HomePageProps> = ({ headerOffset = 96 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // 드래그 중이 아닐 때만 자동 슬라이드
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isDragging]);

  const dismissToast = () => {
    setShowToast(false);
  };

  const openToast = () => {
    setShowToast(true);
  };

  // 드래그 핸들러
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    
    // 80px 이상 드래그하면 슬라이드 변경
    if (diff > 80) {
      setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    } else if (diff < -80) {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const dragOffset = isDragging ? currentX - startX : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* 비건 테스트 토스트 배너 */}
      <div 
        className={`fixed left-0 right-0 z-30 transition-all duration-150 ease-out ${
          showToast ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ backgroundColor: '#292624', top: `${headerOffset}px` }}
      >
        <div className="page-container py-4 relative">
          {/* 중앙 텍스트 - 세로 정렬 */}
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-[15px] font-semibold text-white">
              🥗 나의 비건 유형은?
            </span>
            <span className="text-[13px] text-stone-400">
              좋아하는 채소 3개를 선택하고 나만의 비건 페르소나를 발견해보세요!
            </span>
            <Link 
              to="/"
              className="mt-1 px-5 py-1.5 text-[12px] font-medium rounded-none transition-colors hover:opacity-90"
              style={{ backgroundColor: '#E54B1A', color: '#292624' }}
            >
              테스트 시작
            </Link>
          </div>
          
          {/* 닫기 버튼 - 오른쪽 고정 */}
          <button 
            onClick={dismissToast}
            className="absolute right-8 top-4 p-1 transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'transparent', color: '#ffffff', textShadow: '0 0 6px rgba(0,0,0,0.55)' }}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      {/* 최소화된 플로팅 버튼 - 토스트가 닫혔을 때 표시 */}
      <button
        onClick={openToast}
        className={`fixed right-6 z-30 px-3 py-2 rounded-none shadow-lg transition-all duration-300 flex items-center gap-2 ${
          showToast ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
        }`}
        style={{ backgroundColor: '#292624', top: `${headerOffset + 16}px` }}
      >
        <span className="text-lg">🥗</span>
        <span className="text-[11px] font-medium text-stone-300">비건 테스트</span>
      </button>

      {/* 히어로 배너 슬라이더 */}
      <div 
        className="relative h-[500px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* 슬라이드 컨테이너 */}
        <div 
          className={`flex h-full ${isDragging ? '' : 'transition-transform duration-700 ease-in-out'}`}
          style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={index}
              className="min-w-full h-full relative flex-shrink-0"
              style={{ backgroundColor: '#54271d' }}
            >
              {/* 배경 이미지 */}
              <img 
                src={`${import.meta.env.BASE_URL}${slide.image}`}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              {/* 텍스트 오버레이 - 하단 섹션과 동일한 여백 */}
              <div className="absolute bottom-20 left-0 w-full">
                <div className="page-container px-6 sm:px-8 text-left">
                  <p className="text-2xl md:text-3xl font-medium text-[#E54B1A] leading-relaxed drop-shadow-lg">
                    {slide.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-medium text-[#E54B1A] drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 슬라이드 인디케이터 - 분리됨, 중앙 배치 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-none transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* 매거진 스타일 레이아웃 */}
      <div className="bg-white">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row">
            {/* 왼쪽 컬럼 - 텍스트 + 상품 그리드 */}
            <div className="lg:w-[55%] p-8">
              {/* 텍스트 헤더 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* 타이틀 - 첫번째 이미지 위치 */}
                <h2 className="text-[20px] font-bold text-stone-800 leading-snug">
                  건강한 비건식으로 삶의 균형 맞추기
                </h2>
                
                {/* 설명 - 두번째 이미지 위치 */}
                <div>
                  <p className="text-[12px] text-stone-600 leading-relaxed">
                    매장에서만 즐겼던 맛있고 건강한 비건요리를
                  </p>
                  <p className="text-[12px] text-stone-600 mb-3">
                    이제 집에서도 간편하게 즐겨보세요.
                  </p>
                  <p className="text-[12px] text-stone-500 leading-relaxed">
                    비건 채식주의자들과 일반인들 모두 맛있게 즐길 수 있는
                  </p>
                  <p className="text-[12px] text-stone-500">
                    다채로운 비건 요리를 매장에서도 즐겨보세요
                  </p>
                </div>
              </div>
              
              {/* 상품 그리드 2열 x 3행 (총 6개) */}
              <div className="grid grid-cols-2 gap-4">
                {MAIN_THUMB_ITEMS.slice(0, 6).map((product, idx) => {
                  const imageUrl = getHomeProductImage(idx);
                  return (
                    <div key={product.id} className="cursor-pointer group">
                      <div 
                        className="w-full mb-2 overflow-hidden rounded-none relative"
                        style={{ aspectRatio: '4/5', backgroundColor: idx % 2 === 0 ? '#54271d' : '#6e3d2a' }}
                      >
                        {imageUrl ? (
                          <img 
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/30 text-xs">IMG</span>
                          </div>
                        )}
                      </div>
                      <p className="text-[12px] text-stone-700 group-hover:text-stone-900">{product.name}</p>
                      <p className="text-[11px] text-stone-500">KRW {product.price.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* 오른쪽 컬럼 - 대형 이미지 1개 (960x1200 제한) */}
            <div className="lg:w-[45%] flex justify-center items-start">
              <div 
                className="w-full"
                style={{ 
                  aspectRatio: '4/5', 
                  backgroundColor: '#3d1c12',
                  maxWidth: '960px',
                  maxHeight: '1200px'
                }}
              >
                {/* 이미지 자리 */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 뉴스레터 섹션 */}
      <div className="bg-white border-t border-stone-200">
        <div className="page-container py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold tracking-wide text-stone-900">NEWSLETTER</h3>
            <Link to="/newsletter" className="text-sm text-stone-600 hover:text-black">VIEW ALL</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, category: 'HEALTH', title: '멈춰야 보이는 것들', subtitle: '번아웃을 겪고 나서야 깨달은 것들' },
              { id: 2, category: 'CULTURE', title: '2060년, 나는 마흔이 된다', subtitle: '초고령 사회를 앞둔 Z세대의 고민' },
              { id: 3, category: 'FOOD', title: '냉장고를 열면 한 끼가 보인다', subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유' },
            ].map((article) => (
              <Link key={article.id} to="/newsletter" className="cursor-pointer group">
                <div 
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: '4/3', backgroundColor: '#e5ded8' }}
                >
                  {/* 썸네일 자리 */}
                </div>
                <p className="mt-2 text-[10px] text-stone-500 tracking-wider">{article.category}</p>
                <p className="text-sm font-semibold text-stone-800 group-hover:underline">
                  {article.title}
                </p>
                <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                  {article.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
