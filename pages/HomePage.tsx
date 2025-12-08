import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// 히어로 슬라이드 데이터
const HERO_SLIDES = [
  {
    id: 1,
    title: '비건 채식주의자들을 위한',
    subtitle: '레스토랑, 슬런치 팩토리',
  },
  {
    id: 2,
    title: 'From Nature with Slow',
    subtitle: '자연에서 온 건강한 비건 푸드',
  },
  {
    id: 3,
    title: '비건 밀키트 출시',
    subtitle: '집에서도 슬런치의 맛을 즐기세요',
  },
  {
    id: 4,
    title: 'Slow Lunch',
    subtitle: 'Full of Abundance',
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

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const dismissToast = () => {
    setShowToast(false);
  };

  const openToast = () => {
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 비건 테스트 토스트 배너 */}
      <div 
        className={`fixed top-16 left-0 right-0 z-40 transition-transform duration-500 ease-out ${
          showToast ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: '#292624' }}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-4 relative">
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
              className="mt-1 px-5 py-1.5 text-[12px] font-medium rounded-full transition-colors hover:opacity-90"
              style={{ backgroundColor: '#D8D262', color: '#292624' }}
            >
              테스트 시작
            </Link>
          </div>
          
          {/* 닫기 버튼 - 오른쪽 고정 */}
          <button 
            onClick={dismissToast}
            className="absolute right-8 top-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>
      
      {/* 최소화된 플로팅 버튼 - 토스트가 닫혔을 때 표시 */}
      <button
        onClick={openToast}
        className={`fixed top-20 right-6 z-40 px-3 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
          showToast ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
        }`}
        style={{ backgroundColor: '#292624' }}
      >
        <span className="text-lg">🥗</span>
        <span className="text-[11px] font-medium text-stone-300">비건 테스트</span>
      </button>

      {/* 히어로 배너 슬라이더 */}
      <div className="relative h-[500px] overflow-hidden">
        {/* 슬라이드 컨테이너 */}
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={index}
              className="min-w-full h-full relative flex-shrink-0"
              style={{ backgroundColor: '#54271d' }}
            >
              {/* 텍스트 오버레이 - 하단 섹션과 동일한 여백 */}
              <div className="absolute bottom-20 left-0 w-full">
                <div className="max-w-[1400px] mx-auto px-8">
                  <p className="text-2xl md:text-3xl font-medium text-[#D8D262] leading-relaxed">
                    {slide.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-medium text-[#D8D262]">
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
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* 매거진 스타일 레이아웃 */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto">
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
              
              {/* 상품 그리드 2열 */}
              <div className="grid grid-cols-2 gap-4">
                {FEATURED_PRODUCTS.slice(0, 2).map((product, idx) => (
                  <div key={product.id} className="cursor-pointer group">
                    <div 
                      className="w-full mb-2 overflow-hidden rounded-lg"
                      style={{ aspectRatio: '4/5', backgroundColor: idx % 2 === 0 ? '#54271d' : '#6e3d2a' }}
                    >
                      {/* 이미지 자리 */}
                    </div>
                    <p className="text-[12px] text-stone-700 group-hover:text-stone-900">{product.name}</p>
                    <p className="text-[11px] text-stone-500">KRW {product.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 오른쪽 컬럼 - 대형 이미지 1개 */}
            <div className="lg:w-[45%]">
              <div 
                className="w-full h-full"
                style={{ aspectRatio: '4/5', backgroundColor: '#3d1c12' }}
              >
                {/* 이미지 자리 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
