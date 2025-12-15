import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronUp, Minus, Plus, ShoppingCart, Heart, Truck, Info } from 'lucide-react';
import { getProductThumbnailImages } from '../utils/productImages';

// 상품 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  isBest: boolean;
  description?: string;
  detailDescription?: string;
  spectrum: string;
  category: string;
  images?: string[];
  soldOut?: boolean;
}

// 상품 데이터
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: '볶음김치',
    price: 12000,
    isBest: true,
    description: '젓갈이 들어가지 않은 비건 볶음김치',
    detailDescription: '슬런치 팩토리의 시그니처 비건 볶음김치입니다. 젓갈을 사용하지 않고도 깊은 맛을 내는 비법 레시피로 만들어졌습니다. 김치볶음밥, 김치찌개 등 다양한 요리에 활용하세요.',
    spectrum: '비건',
    category: '캔 제품',
    images: [],
  },
  {
    id: 2,
    name: '김치볶음밥',
    price: 12000,
    originalPrice: 15000,
    isBest: true,
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트',
    detailDescription: '슬런치의 비건 볶음김치와 엄선된 재료로 구성된 김치볶음밥 밀키트입니다. 간편하게 조리하여 맛있는 비건 김치볶음밥을 즐겨보세요.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 3,
    name: '시금치 뇨끼',
    price: 18000,
    originalPrice: 24000,
    isBest: true,
    description: '계란, 우유, 버터를 넣지 않은 비건 뇨끼',
    detailDescription: '이탈리아 정통 뇨끼를 비건으로 재해석했습니다. 신선한 시금치를 듬뿍 넣어 만든 쫄깃한 뇨끼와 특제 소스가 함께 제공됩니다. 계란, 우유, 버터 없이도 풍부한 맛을 느낄 수 있습니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 4,
    name: '블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: true,
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    detailDescription: '신선한 블루베리를 듬뿍 올린 프리미엄 비건 타르트입니다. 바삭한 타르트 크러스트와 부드러운 크림, 상큼한 블루베리의 조화가 일품입니다. 버터와 계란 없이 만들어 비건도 안심하고 즐길 수 있습니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
  },
  {
    id: 5,
    name: '복숭아 타르트',
    price: 32000,
    originalPrice: 35000,
    isBest: true,
    description: '달콤한 복숭아를 올린 비건 디저트',
    detailDescription: '부드럽고 달콤한 복숭아를 올린 프리미엄 비건 타르트입니다. 여름 시즌 한정으로 선보이는 특별한 디저트입니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
  },
  {
    id: 6,
    name: '잠봉뵈르',
    price: 8000,
    originalPrice: 12000,
    isBest: true,
    description: '슬런치 팩토리의 베스트 셀러',
    detailDescription: '프랑스 정통 잠봉뵈르를 비건으로 재해석한 슬런치의 베스트 셀러입니다. 바삭한 바게트와 신선한 채소, 특제 소스가 어우러진 샌드위치입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 7,
    name: '자두 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: true,
    description: '상큼한 자두를 올린 프리미엄 비건 타르트',
    detailDescription: '제철 자두의 상큼함을 담은 프리미엄 비건 타르트입니다. 달콤하면서도 새콤한 자두와 고소한 타르트 크러스트의 완벽한 조화를 경험해보세요.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
  },
  {
    id: 8,
    name: '피넛버터 초코바',
    price: 12000,
    isBest: true,
    description: '고소한 피넛버터와 달콤한 초콜릿이 만나 만든 비건 초코바',
    detailDescription: '고소한 피넛버터와 진한 다크 초콜릿의 완벽한 조합입니다. 한 입 베어물면 느껴지는 바삭함과 부드러움의 조화, 달콤하면서도 고소한 맛이 일품입니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
  },
  {
    id: 9,
    name: '김치칼국수',
    price: 15000,
    isBest: true,
    description: '젓갈 없이 만든 비건 김치칼국수',
    detailDescription: '시원하고 얼큰한 비건 김치칼국수입니다. 쫄깃한 칼국수 면과 신선한 김치의 조화가 일품입니다. 젓갈 없이도 깊고 진한 맛을 내는 특별한 레시피입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 10,
    name: '김치전',
    price: 18000,
    isBest: true,
    description: '바삭하게 구운 비건 김치전',
    detailDescription: '바삭하게 구워낸 비건 김치전입니다. 신선한 김치와 쫄깃한 반죽의 조화가 일품입니다. 간단한 간식이나 안주로 완벽합니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 11,
    name: '단호박 초코 케익',
    price: 35000,
    isBest: true,
    description: '부드러운 단호박과 진한 초콜릿의 조화',
    detailDescription: '고소한 단호박과 진한 다크 초콜릿이 만나 만든 프리미엄 비건 케익입니다. 부드럽고 촉촉한 식감과 깊은 풍미가 일품입니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
  },
  {
    id: 12,
    name: '말차 케익',
    price: 32000,
    isBest: true,
    description: '고소하고 향긋한 말차의 풍미를 담은 비건 케익',
    detailDescription: '고급 말차 파우더를 사용한 프리미엄 비건 케익입니다. 씁쓸하면서도 달콤한 말차의 풍미와 부드러운 크림의 조화가 일품입니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
  },
  {
    id: 13,
    name: '슬런치 디스커버리 6팩',
    price: 25000,
    isBest: true,
    description: '슬런치의 대표 소스들을 한 번에 맛볼 수 있는 세트',
    detailDescription: '슬런치의 인기 소스들을 한 번에 경험할 수 있는 특별한 세트입니다. 비건 마요네즈, 케첩 등 다양한 소스를 포함하고 있어 다양한 요리에 활용하실 수 있습니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 14,
    name: '페퍼로니 피자',
    price: 22000,
    isBest: true,
    description: '비건 페퍼로니와 신선한 채소를 올린 비건 피자',
    detailDescription: '매콤한 비건 페퍼로니와 신선한 피망, 양파를 올린 프리미엄 비건 피자입니다. 쫄깃한 도우와 진한 토마토 소스, 비건 치즈의 조화가 일품입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
];

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'review' | 'detail' | 'return' | 'qna'>('review');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  // 리뷰 데이터 (나중에 API나 상태 관리로 연동)
  const [reviews] = useState<any[]>([]);
  // 상품문의 데이터 (나중에 API나 상태 관리로 연동)
  const [qnas] = useState<any[]>([]);
  const reviewRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<HTMLDivElement>(null);
  const qnaRef = useRef<HTMLDivElement>(null);
  const tabMenuContainerRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS.find(p => p.id === Number(productId));
  const images = product ? getProductThumbnailImages(product.id) : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center">
          <p className="text-stone-600 mb-4">상품을 찾을 수 없습니다.</p>
          <Link to="/store" className="text-stone-900 underline">스토어로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    alert(`${product.name} ${quantity}개가 장바구니에 담겼습니다.`);
  };

  const handleBuyNow = () => {
    alert(`${product.name} ${quantity}개 구매를 진행합니다.`);
  };

  const scrollToSection = (section: 'review' | 'detail' | 'return' | 'qna') => {
    const refs = {
      review: reviewRef,
      detail: detailRef,
      return: returnRef,
      qna: qnaRef,
    };
    
    const element = refs[section].current;
    
    if (!element) {
      console.error(`Element not found for section: ${section}`);
      return;
    }
    
    const mainContainer = document.querySelector('main') as HTMLElement;
    if (!mainContainer) return;

    // main 컨테이너 기준으로 스크롤
    const mainPaddingTop = parseInt(getComputedStyle(mainContainer).paddingTop) || 0;
    const tabMenuHeight = 56; // 탭바 높이 고정값
    const elementTop = element.offsetTop;
    
    // 고정된 탭바 높이와 헤더 높이를 고려한 오프셋
    const offset = mainPaddingTop + tabMenuHeight;
    
    mainContainer.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // 스크롤 감지로 스크롤 투 탑 버튼 표시/숨김
  useEffect(() => {
    const mainContainer = document.querySelector('main');
    const handleScroll = () => {
      if (mainContainer) {
        setShowScrollToTop(mainContainer.scrollTop > 200);
      } else {
        setShowScrollToTop(window.scrollY > 200);
      }
    };

    if (mainContainer) {
      mainContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 상태 확인
    } else {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 페이지 로드 시 스크롤을 최상단으로 이동
  useEffect(() => {
    const scrollToTop = () => {
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };

    // 즉시 실행
    scrollToTop();
    
    // requestAnimationFrame으로 한 번 더 실행 (렌더링 후)
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
  }, [productId]);

  // 스크롤 감지로 활성 섹션 업데이트
  useEffect(() => {
    const mainContainer = document.querySelector('main') as HTMLElement;
    if (!mainContainer) return;

    const handleScroll = () => {
      const mainPaddingTop = parseInt(getComputedStyle(mainContainer).paddingTop) || 0;
      const tabMenuHeight = 56; // 탭바 높이 고정값
      const scrollOffset = mainContainer.scrollTop + mainPaddingTop + tabMenuHeight + 50; // 50px 여유

      // 각 섹션의 위치 확인
      const sections = [
        { ref: reviewRef, id: 'review' as const },
        { ref: detailRef, id: 'detail' as const },
        { ref: returnRef, id: 'return' as const },
        { ref: qnaRef, id: 'qna' as const },
      ];

      // 스크롤 위치보다 위에 있는 마지막 섹션을 활성 섹션으로 설정
      let activeSection: 'review' | 'detail' | 'return' | 'qna' = 'review';
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sections[i].ref.current;
        if (element && element.offsetTop <= scrollOffset) {
          activeSection = sections[i].id;
          break;
        }
      }

      setActiveSection(activeSection);
    };

    mainContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 상태 확인

    return () => {
      mainContainer.removeEventListener('scroll', handleScroll);
    };
  }, [product]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* 스크롤 투 탑 버튼 */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 right-4 z-[95] w-12 h-12 bg-black border border-stone-300 flex items-center justify-center transition-opacity animate-fadeIn hover:opacity-80"
          aria-label="상단으로 이동"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* 상단 네비게이션 */}
      <div className="page-container py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">뒤로가기</span>
        </button>
      </div>

      {/* 상품 정보 영역 */}
      <div className="page-container pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 좌측 - 이미지 영역 */}
          <div className="lg:w-1/2">
            {/* 메인 이미지 */}
            <div 
              className="w-full aspect-square bg-[#54271d] mb-4 relative overflow-hidden"
            >
              {images.length > 0 ? (
                <div className="relative w-full h-full">
                  {images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        idx === selectedImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-lg">IMG</span>
                </div>
              )}
              
              {/* Sold Out 오버레이 */}
              {product.soldOut && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <span className="text-white text-2xl font-medium">Sold out</span>
                </div>
              )}

              {/* 이미지 인디케이터 (여러 이미지 있을 때) */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === selectedImageIndex 
                          ? 'bg-white w-4' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`이미지 ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 썸네일 이미지 리스트 */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === idx ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 우측 - 상품 정보 */}
          <div className="lg:w-1/2">
            {/* BEST 뱃지 */}
            {product.isBest && (
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs mb-4">
                BEST
              </span>
            )}

            {/* 상품명 */}
            <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-4">
              {product.name}
            </h1>

            {/* 가격 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-stone-900">
                {product.price.toLocaleString()}원
              </span>
              {product.originalPrice && (
                <span className="text-xl text-stone-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
            </div>

            {/* 짧은 설명 */}
            {product.description && (
              <p className="text-stone-600 mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* 태그 */}
            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-sm">
                {product.spectrum}
              </span>
              <span className="px-3 py-1.5 border border-stone-300 text-stone-600 text-sm">
                {product.category}
              </span>
            </div>

            {/* 구분선 */}
            <div className="border-t border-stone-200 my-6" />

            {/* 구매혜택 및 배송 정보 */}
            <div className="space-y-1">
              {/* 구매혜택 */}
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span>구매혜택</span>
                <span className="font-medium">0 포인트 적립예정</span>
                <button className="text-stone-400 hover:text-stone-600" aria-label="포인트 적립 안내">
                  <Info className="w-3 h-3" />
                </button>
              </div>

              {/* 배송 방법 */}
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span>배송 방법</span>
                <span className="font-medium">택배</span>
              </div>

              {/* 배송비 */}
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span>배송비</span>
                <span className="font-medium">3,500원 (55,000원 이상 무료배송)</span>
                <span className="text-stone-400">|</span>
                <span className="text-stone-500">도서산간 배송비 추가</span>
                <button className="text-stone-400 hover:text-stone-600" aria-label="배송비 안내">
                  <Info className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 오늘출발 상품 */}
            <div className="mt-3 mb-6">
              <div className="bg-stone-50 p-4 flex items-center gap-3 rounded-none">
                <div className="w-10 h-10 bg-stone-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-stone-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900 mb-1">오늘출발 상품</p>
                  <p className="text-xs text-stone-600">오늘 14:00까지 결제시 오늘 바로 발송됩니다.</p>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-stone-200 my-6" />

            {/* 수량 선택 */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-stone-600 font-medium">수량</span>
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-stone-100 transition-colors"
                  disabled={product.soldOut}
                >
                  <Minus className="w-4 h-4 text-stone-600" />
                </button>
                <span className="px-6 py-3 text-sm font-medium min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-stone-100 transition-colors"
                  disabled={product.soldOut}
                >
                  <Plus className="w-4 h-4 text-stone-600" />
                </button>
              </div>
            </div>

            {/* 총 금액 */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-stone-600 font-medium">총 금액</span>
              <span className="text-2xl font-bold text-stone-900">
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            {/* 버튼 영역 - 데스크톱용 (모바일에서는 숨김) */}
            <div className="hidden lg:flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-4 border transition-colors ${
                  isLiked ? 'border-red-400 bg-red-50' : 'border-stone-300 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.soldOut}
                className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 border ${
                  product.soldOut
                    ? 'border-stone-200 text-stone-400 cursor-not-allowed'
                    : 'border-stone-900 text-stone-900 hover:bg-stone-100'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.soldOut}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  product.soldOut
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {product.soldOut ? '품절' : '바로 구매'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 상세 섹션 */}
      {/* 탭 영역 */}
      <div ref={tabMenuContainerRef} style={{ position: 'relative' }}>
        <div className="tab-menu bg-white">
          <div className="page-container">
            {/* 탭 버튼 */}
            <div className="flex border-b border-stone-200">
              <button
                onClick={() => scrollToSection('review')}
                className={`flex-1 py-4 text-sm text-center transition-colors border-r border-stone-200 ${
                  activeSection === 'review'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                리뷰 <span className="font-normal">({reviews.length.toLocaleString()})</span>
              </button>
              <button
                onClick={() => scrollToSection('detail')}
                className={`flex-1 py-4 text-sm text-center transition-colors border-r border-stone-200 ${
                  activeSection === 'detail'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                상세정보
              </button>
              <button
                onClick={() => scrollToSection('return')}
                className={`flex-1 py-4 text-sm text-center transition-colors border-r border-stone-200 ${
                  activeSection === 'return'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                반품/교환정보
              </button>
              <button
                onClick={() => scrollToSection('qna')}
                className={`flex-1 py-4 text-sm text-center transition-colors ${
                  activeSection === 'qna'
                    ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                상품문의 <span className="font-normal">({qnas.length.toLocaleString()})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container overflow-x-hidden">
        {/* 리뷰 섹션 */}
        <div 
          ref={reviewRef} 
          data-section="review" 
          className="scroll-mt-[152px] pt-8"
        >
          <h2 className="text-xl font-bold text-stone-900 mb-6">리뷰</h2>
          {reviews.length === 0 ? (
            <p className="text-stone-500 text-sm mb-8">아직 등록된 리뷰가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-stone-200 pb-4">
                  {/* 리뷰 아이템 렌더링 */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 상세정보 섹션 */}
        <div ref={detailRef} data-section="detail" className="scroll-mt-[152px] mt-16 border-t border-stone-200 pt-8">
          {/* 상세 설명 텍스트 */}
          {product.detailDescription && (
            <div className="prose prose-stone max-w-none mb-8">
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {product.detailDescription}
              </p>
            </div>
          )}

          {/* 상세 이미지 영역 - 센터 정렬 */}
          <div className="flex justify-center overflow-hidden">
            <div className="space-y-4 w-full max-w-4xl">
              <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center">
                <span className="text-stone-400">상세 이미지 영역</span>
              </div>
            </div>
          </div>
        </div>

        {/* 반품/교환정보 섹션 */}
        <div ref={returnRef} data-section="return" className="scroll-mt-[152px] mt-16 border-t border-stone-200 pt-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6">반품/교환정보</h2>
          <p className="text-stone-500 text-sm mb-8">반품/교환 정보가 없습니다.</p>
        </div>

        {/* 상품문의 섹션 */}
        <div ref={qnaRef} data-section="qna" className="scroll-mt-[152px] mt-16 border-t border-stone-200 pt-8 mb-20 lg:mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6">상품문의</h2>
          {qnas.length === 0 ? (
            <p className="text-stone-500 text-sm mb-8">아직 등록된 상품문의가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {qnas.map((qna, index) => (
                <div key={index} className="border-b border-stone-200 pb-4">
                  {/* 상품문의 아이템 렌더링 */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단 고정 버튼 영역 - 모바일/태블릿용 */}
      <div 
        className="buy-fixed-bar fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-3 lg:hidden"
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          width: '100%',
          zIndex: 99999 
        }}
      >
        <div className="flex gap-3 max-w-[1400px] mx-auto">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 border transition-colors flex-shrink-0 ${
              isLiked ? 'border-red-400 bg-red-50' : 'border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.soldOut}
            className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 border ${
              product.soldOut
                ? 'border-stone-200 text-stone-400 cursor-not-allowed'
                : 'border-stone-900 text-stone-900 hover:bg-stone-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            장바구니
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.soldOut}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              product.soldOut
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {product.soldOut ? '품절' : '바로 구매'}
          </button>
        </div>
      </div>
    </div>
  );
};

