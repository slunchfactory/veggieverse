import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, ChevronDown, Check, Heart } from 'lucide-react';
import { getProductThumbnailImages } from '../utils/productImages';

// 상품 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  isBest: boolean;
  popularity: number;
  cuisine: string;
  spectrum: string;
  category: string;
  description?: string;
  externalUrl?: string;
  soldOut?: boolean;
}

// 슬런치 공식 사이트 기반 상품 데이터
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: '볶음김치',
    price: 12000,
    isBest: true,
    popularity: 95,
    cuisine: '한식',
    spectrum: '비건',
    category: '신메뉴',
    description: '젓갈이 들어가지 않은 비건 볶음김치',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 2,
    name: '김치볶음밥',
    price: 12000,
    originalPrice: 15000,
    isBest: true,
    popularity: 92,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 3,
    name: '시금치 뇨끼',
    price: 18000,
    originalPrice: 24000,
    isBest: true,
    popularity: 85,
    cuisine: '양식',
    spectrum: '비건',
    category: '밀키트',
    description: '계란, 우유, 버터를 넣지 않은 비건 뇨끼',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 4,
    name: '블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: true,
    popularity: 88,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 5,
    name: '복숭아 타르트',
    price: 32000,
    originalPrice: 35000,
    isBest: true,
    popularity: 82,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '달콤한 복숭아를 올린 비건 디저트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 6,
    name: '잠봉뵈르',
    price: 8000,
    originalPrice: 12000,
    isBest: true,
    popularity: 90,
    cuisine: '양식',
    spectrum: '비건',
    category: '밀키트',
    description: '슬런치 팩토리의 베스트 셀러',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 7,
    name: '자두 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: true,
    popularity: 80,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '상큼한 자두를 올린 프리미엄 비건 타르트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 8,
    name: '피넛버터 초코바',
    price: 12000,
    isBest: true,
    popularity: 75,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '고소한 피넛버터와 달콤한 초콜릿이 만나 만든 비건 초코바',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 9,
    name: '김치칼국수',
    price: 15000,
    isBest: true,
    popularity: 87,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '젓갈 없이 만든 비건 김치칼국수',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 10,
    name: '김치전',
    price: 18000,
    isBest: true,
    popularity: 83,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '바삭하게 구운 비건 김치전',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 11,
    name: '단호박 초코 케익',
    price: 35000,
    isBest: true,
    popularity: 79,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '부드러운 단호박과 진한 초콜릿의 조화',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 12,
    name: '말차 케익',
    price: 32000,
    isBest: true,
    popularity: 81,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '고소하고 향긋한 말차의 풍미를 담은 비건 케익',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 13,
    name: '슬런치 디스커버리 6팩',
    price: 25000,
    isBest: true,
    popularity: 72,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '슬런치의 대표 소스들을 한 번에 맛볼 수 있는 세트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 14,
    name: '페퍼로니 피자',
    price: 22000,
    isBest: true,
    popularity: 88,
    cuisine: '양식',
    spectrum: '비건',
    category: '밀키트',
    description: '비건 페퍼로니와 신선한 채소를 올린 비건 피자',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 15,
    name: '슬런치 위클리',
    price: 35000,
    isBest: true,
    popularity: 95,
    cuisine: '양식',
    spectrum: '비건',
    category: '슬런치 위클리',
    description: '매주 새로운 비건 메뉴를 만나보는 정기 구독 서비스',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
];

type SortType = 'default' | 'price-low' | 'price-high' | 'popularity' | 'name-az' | 'name-za' | 'algorithm';

const SORT_OPTIONS = [
  { value: 'default', label: '기본 정렬' },
  { value: 'name-az', label: '상품명순: A-Z' },
  { value: 'name-za', label: '상품명순: Z-A' },
  { value: 'price-low', label: '가격: 저가순' },
  { value: 'price-high', label: '가격: 고가순' },
  { value: 'popularity', label: '인기: 높은 순' },
  { value: 'algorithm', label: '내 알고리즘', icon: true },
];

export const StorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<SortType>('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [spectrum, setSpectrum] = useState<string>('전체');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const navigate = useNavigate();
  
  // 하트(좋아요) 상태 관리
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(() => {
    // 초기 하트 수 (랜덤)
    const counts: Record<number, number> = {};
    PRODUCTS.forEach(p => {
      counts[p.id] = Math.floor(Math.random() * 2000) + 100;
    });
    return counts;
  });

  const toggleLike = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
        setLikeCounts(counts => ({ ...counts, [productId]: counts[productId] - 1 }));
      } else {
        newSet.add(productId);
        setLikeCounts(counts => ({ ...counts, [productId]: counts[productId] + 1 }));
      }
      return newSet;
    });
  };

  const formatLikeCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  // URL 파라미터로 카테고리 필터링
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveTab(categoryParam);
      // 카테고리에 따른 필터 설정
      if (categoryParam === 'NEW') {
        setSelectedCategories(['신메뉴']);
      } else {
        // 세부 카테고리 매핑
        const categoryMap: Record<string, string> = {
          '슬런치 위클리': '슬런치 위클리',
          '소스와 오일': '소스와 오일',
          '밀키트': '밀키트',
          '베이커리': '베이커리',
        };
        const mappedCategory = categoryMap[categoryParam];
        if (mappedCategory) {
          setSelectedCategories([mappedCategory]);
        }
      }
    } else {
      setActiveTab('ALL');
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // 현재 선택된 정렬 옵션 라벨
  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === sortType)?.label || '기본 정렬';

  // 정렬된 상품 목록
  const sortedProducts = useMemo(() => {
    const products = [...PRODUCTS].filter((p) => {
      const matchCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(p.cuisine);
      const matchSpectrum = spectrum === '전체' || p.spectrum === spectrum;
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      return matchCuisine && matchSpectrum && matchCategory;
    });

    switch (sortType) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'popularity':
        return products.sort((a, b) => b.popularity - a.popularity);
      case 'name-az':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'algorithm':
        // NOTE: 비건 테스트 결과 기반 추천 로직 추가 예정
        // 현재는 인기순 + BEST 우선으로 임시 정렬
        return products.sort((a, b) => {
          if (a.isBest && !b.isBest) return -1;
          if (!a.isBest && b.isBest) return 1;
          return b.popularity - a.popularity;
        });
      default:
        return products;
    }
  }, [sortType, selectedCuisines, spectrum, selectedCategories]);

  const handleSortChange = (value: SortType) => {
    setSortType(value);
    setIsDropdownOpen(false);
  };

  const toggleCuisine = (label: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const spectrumOptions = ['전체', '비건', '락토', '플렉시'];
  const cuisineOptions = ['한식', '양식', '디저트'];
  // 기획전만 별도 필터로 남김 (나머지는 상단 카테고리 탭에 포함됨)
  const promotionOptions = ['기획전'];

  // 알고리즘 추천 상품 (BEST 상품 중 상위 4개)
  const algorithmRecommended = useMemo(() => {
    return [...PRODUCTS]
      .filter(p => p.isBest)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
  }, []);

  // 우측 섹션 영상 ID 목록
  const cardVideoIds = ['x7pnY0U5yYY', 'LeZQWQ_cXqU', '8cVFJrY89SA', 'IzNnBZMjbXU'];

  // 카테고리 탭 목록
  const categoryTabs = ['ALL', 'NEW', '슬런치 위클리', '소스와 오일', '밀키트', '베이커리'];
  
  // 카테고리별 제품 개수 계산
  const getCategoryCount = (category: string): number => {
    if (category === 'ALL') {
      return PRODUCTS.length;
    }
    if (category === 'NEW') {
      return PRODUCTS.filter(p => p.category === '신메뉴').length;
    }
    // 카테고리 매핑 (탭 이름 -> 실제 제품 category)
    const categoryMap: Record<string, string> = {
      '슬런치 위클리': '슬런치 위클리',
      '소스와 오일': '소스와 오일',
      '밀키트': '밀키트',
      '베이커리': '베이커리',
    };
    const mappedCategory = categoryMap[category] || category;
    // 실제 제품의 category 값으로 필터링
    return PRODUCTS.filter(p => p.category === mappedCategory).length;
  };
  
  const handleTabClick = (tab: string) => {
    if (tab === 'ALL') {
      setActiveTab('ALL');
      setSelectedCategories([]);
      window.history.replaceState(null, '', '/veggieverse/store');
    } else {
      setActiveTab(tab);
      const categoryMap: Record<string, string> = {
        'NEW': '신메뉴',
        '슬런치 위클리': '슬런치 위클리',
        '소스와 오일': '소스와 오일',
        '밀키트': '밀키트',
        '베이커리': '베이커리',
      };
      setSelectedCategories([categoryMap[tab] || tab]);
      window.history.replaceState(null, '', `/veggieverse/store?category=${encodeURIComponent(tab)}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* Store Hero Section - Video Presentation */}
      {activeTab === 'ALL' && (
        <div className="w-full border-b" style={{ borderWidth: 'var(--border-width)', borderStyle: 'var(--border-style)', borderColor: 'var(--color-border)' }}>
          <div className="relative w-full" style={{ aspectRatio: '21/9' }}>
            {/* Video Background */}
            <div className="absolute inset-0 bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/qN-UMZZ1U9Y?autoplay=1&mute=1&loop=1&playlist=qN-UMZZ1U9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                title="슬런치 비건 레시피"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ pointerEvents: 'none' }}
              />
            </div>
            {/* Dark Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            {/* Text Overlay - Bottom Left */}
            <div className="absolute bottom-0 left-0 z-20 p-8 lg:p-12" style={{ maxWidth: '60%' }}>
              <h1 
                className="text-white mb-4 font-medium"
                style={{ 
                  fontSize: 'var(--font-size-h1)', 
                  lineHeight: '1.2',
                  letterSpacing: 'var(--letter-spacing-tight)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                슬런치가 추천하는<br/>겨울 비건 레시피
              </h1>
              <Link
                to="/recipe"
                className="inline-block bg-white text-black px-6 py-2 font-medium hover:bg-black hover:text-white transition-colors"
                style={{ 
                  fontSize: 'var(--font-size-ui)',
                  border: 'none',
                  borderRadius: 'var(--border-radius)'
                }}
              >
                View Recipe →
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* ALL 페이지 전용 - 추천 메뉴 섹션 (기존 코드 유지하되 수정) */}
      {activeTab === 'ALL' && (
        <div className="w-full max-w-[1200px] mx-auto border-b" style={{ borderWidth: 'var(--border-width)', borderStyle: 'var(--border-style)', borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* 우측 - 추천 콘텐츠 영역 */}
            <div className="lg:w-1/2 bg-[#E54B1A] flex-shrink-0">
              
              {/* 모바일/태블릿: 가로형 카드 2열 그리드 */}
              <div className="lg:hidden p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3">
                  {algorithmRecommended.slice(0, 4).map((product, idx) => (
                    <div key={product.id} className="cursor-pointer group flex flex-row gap-3">
                      {/* 카드 영상 (왼쪽) */}
                      <div 
                        className="relative w-[45%] flex-shrink-0 overflow-hidden bg-stone-900"
                        style={{ aspectRatio: '3/4', borderRadius: '4px' }}
                      >
                        <iframe
                          className="absolute w-full h-full"
                          src={`https://www.youtube.com/embed/${cardVideoIds[idx]}?autoplay=1&mute=1&loop=1&playlist=${cardVideoIds[idx]}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                          title={product.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          style={{ pointerEvents: 'none', transform: 'scale(2.5)', transformOrigin: 'center center', top: 0, left: 0 }}
                        />
                        {/* 추천 아이콘 (좌측 상단) */}
                        <div className="absolute top-2 left-2 z-10">
                          <div className="w-6 h-6 rounded-none bg-stone-800 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-[#E54B1A]" />
                          </div>
                        </div>
                      </div>
                      {/* 카드 정보 (오른쪽) */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-[13px] font-bold text-stone-900 leading-tight line-clamp-2 group-hover:underline">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-stone-600 mt-1 line-clamp-2">
                            {product.spectrum} 식단에 어울리는 메뉴
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <button 
                            onClick={(e) => toggleLike(product.id, e)}
                            className="flex items-center gap-1 hover:scale-105 transition-transform"
                          >
                            <Heart 
                              className={`w-3.5 h-3.5 transition-colors ${
                                likedItems.has(product.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-stone-500 hover:text-red-400'
                              }`} 
                            />
                            <span className={`text-[10px] ${likedItems.has(product.id) ? 'text-red-500 font-medium' : 'text-stone-500'}`}>
                              {formatLikeCount(likeCounts[product.id] || 0)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 데스크톱: 세로형 카드 2열 엇갈린 높이 */}
              <div className="hidden lg:flex p-5 pb-8 gap-4">
                {/* 왼쪽 열 */}
                <div className="flex-1 flex flex-col gap-4">
                  {algorithmRecommended.slice(0, 2).map((product, idx) => (
                    <div key={product.id} className="cursor-pointer group flex flex-col">
                      <div 
                        className="relative w-full overflow-hidden bg-stone-900"
                        style={{ aspectRatio: '3/4', borderRadius: '4px' }}
                      >
                        <iframe
                          className="absolute w-full h-full"
                          src={`https://www.youtube.com/embed/${cardVideoIds[idx]}?autoplay=1&mute=1&loop=1&playlist=${cardVideoIds[idx]}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                          title={product.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          style={{ pointerEvents: 'none', transform: 'scale(2.5)', transformOrigin: 'center center' }}
                        />
                        {/* 추천 아이콘 (좌측 상단) */}
                        <div className="absolute top-3 left-3 z-10">
                          <div className="w-8 h-8 rounded-none bg-stone-800 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-[#E54B1A]" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 bg-[#E54B1A]">
                        <h4 className="text-[17px] font-bold text-stone-900 leading-tight group-hover:underline">
                          {product.name}
                        </h4>
                        <p className="text-[12px] text-stone-600 mt-2 line-clamp-2">
                          {product.spectrum} 식단에 어울리는 메뉴
                        </p>
                        <div className="flex items-center mt-3">
                          <button 
                            onClick={(e) => toggleLike(product.id, e)}
                            className="flex items-center gap-1.5 hover:scale-105 transition-transform"
                          >
                            <Heart 
                              className={`w-4 h-4 transition-colors ${
                                likedItems.has(product.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-stone-500 hover:text-red-400'
                              }`} 
                            />
                            <span className={`text-[12px] ${likedItems.has(product.id) ? 'text-red-500 font-medium' : 'text-stone-500'}`}>
                              {formatLikeCount(likeCounts[product.id] || 0)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 오른쪽 열 (아래로 오프셋) */}
                <div className="flex-1 flex flex-col gap-4 pt-24">
                  {algorithmRecommended.slice(2, 4).map((product, idx) => (
                    <div key={product.id} className="cursor-pointer group flex flex-col">
                      <div 
                        className="relative w-full overflow-hidden bg-stone-900"
                        style={{ aspectRatio: '3/4', borderRadius: '4px' }}
                      >
                        <iframe
                          className="absolute w-full h-full"
                          src={`https://www.youtube.com/embed/${cardVideoIds[idx + 2]}?autoplay=1&mute=1&loop=1&playlist=${cardVideoIds[idx + 2]}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                          title={product.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          style={{ pointerEvents: 'none', transform: 'scale(2.5)', transformOrigin: 'center center' }}
                        />
                        {/* 추천 아이콘 (좌측 상단) */}
                        <div className="absolute top-3 left-3 z-10">
                          <div className="w-8 h-8 rounded-none bg-stone-800 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-[#E54B1A]" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 bg-[#E54B1A]">
                        <h4 className="text-[17px] font-bold text-stone-900 leading-tight group-hover:underline">
                          {product.name}
                        </h4>
                        <p className="text-[12px] text-stone-600 mt-2 line-clamp-2">
                          {product.spectrum} 식단에 어울리는 메뉴
                        </p>
                        <div className="flex items-center mt-3">
                          <button 
                            onClick={(e) => toggleLike(product.id, e)}
                            className="flex items-center gap-1.5 hover:scale-105 transition-transform"
                          >
                            <Heart 
                              className={`w-4 h-4 transition-colors ${
                                likedItems.has(product.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-stone-500 hover:text-red-400'
                              }`} 
                            />
                            <span className={`text-[12px] ${likedItems.has(product.id) ? 'text-red-500 font-medium' : 'text-stone-500'}`}>
                              {formatLikeCount(likeCounts[product.id] || 0)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="page-container pt-8 pb-6">
        <div className="flex" style={{ gap: 'var(--spacing-xl)', alignItems: 'flex-start' }}>
          {/* 좌측 필터 - Sticky Sidebar */}
          <aside 
            className="flex-shrink-0 hidden md:block"
            style={{ 
              width: 'var(--sidebar-width)',
              position: 'sticky',
              top: 'calc(var(--header-height) + var(--spacing-md))',
              alignSelf: 'flex-start',
              borderRight: 'var(--border-width) var(--border-style) var(--color-border)',
              paddingRight: 'var(--spacing-lg)'
            }}
          >
            <div className="space-y-8" style={{ color: 'var(--color-text-primary)' }}>
              {/* 카테고리 탭 (세로형) */}
              <div>
                <div 
                  className="mb-3 pb-2 font-semibold"
                  style={{ 
                    fontSize: 'var(--font-size-ui)',
                    borderBottom: 'var(--border-width) var(--border-style) var(--color-border-active)'
                  }}
                >
                  카테고리
                </div>
                <div className="flex flex-col">
                  {categoryTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`w-full text-left py-3 transition-colors ${
                        activeTab === tab
                          ? 'font-bold'
                          : 'hover:opacity-70'
                      }`}
                      style={{ 
                        fontSize: 'var(--font-size-ui)',
                        color: activeTab === tab 
                          ? 'var(--color-text-primary)' 
                          : 'var(--color-text-secondary)'
                      }}
                    >
                      <span>{tab}</span>
                      <span 
                        className="ml-1"
                        style={{ 
                          fontSize: 'var(--font-size-body)',
                          color: 'var(--color-text-muted)'
                        }}
                      >
                        {getCategoryCount(tab)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 비건 스펙트럼 */}
              <div>
                <div 
                  className="font-semibold mb-3"
                  style={{ 
                    fontSize: 'var(--font-size-ui)',
                    letterSpacing: 'var(--letter-spacing-tight)'
                  }}
                >
                  비건 스펙트럼
                </div>
                <div className="flex flex-col gap-2">
                  {spectrumOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                      style={{ 
                        fontSize: 'var(--font-size-ui)',
                        color: 'var(--color-text-secondary)',
                        letterSpacing: 'var(--letter-spacing-tight)'
                      }}
                    >
                      <input
                        type="radio"
                        name="spectrum"
                        checked={spectrum === opt}
                        onChange={() => setSpectrum(opt)}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          spectrum === opt
                            ? 'border-black bg-black'
                            : 'border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {spectrum === opt && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </span>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 제품 유형 */}
              <div>
                <div 
                  className="font-semibold mb-3"
                  style={{ fontSize: 'var(--font-size-ui)' }}
                >
                  제품 유형
                </div>
                <div className="flex flex-col gap-2">
                  {cuisineOptions.map((c) => {
                    const checked = selectedCuisines.includes(c);
                    return (
                      <label
                        key={c}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                        style={{ 
                          fontSize: 'var(--font-size-ui)',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCuisine(c)}
                          className="hidden"
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            checked
                              ? 'border-black bg-black'
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          {checked && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        <span style={{ letterSpacing: 'var(--letter-spacing-tight)' }}>{c}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 기획전 필터 */}
              {promotionOptions.length > 0 && (
                <div>
                  <div 
                    className="font-semibold mb-3"
                    style={{ 
                      fontSize: 'var(--font-size-ui)',
                      letterSpacing: 'var(--letter-spacing-tight)'
                    }}
                  >
                    기획전
                  </div>
                  <div className="flex flex-col gap-2">
                    {promotionOptions.map((opt) => {
                      const checked = selectedCategories.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                          style={{ 
                            fontSize: 'var(--font-size-ui)',
                            color: 'var(--color-text-secondary)',
                            letterSpacing: 'var(--letter-spacing-tight)'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setSelectedCategories((prev) =>
                                prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]
                              )
                            }
                            className="hidden"
                          />
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              checked
                                ? 'border-black bg-black'
                                : 'border-stone-300 hover:border-stone-400'
                            }`}
                          >
                            {checked && <Check className="w-2.5 h-2.5 text-white" />}
                          </span>
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* 우측 콘텐츠 */}
          <div className="flex-1">
            {/* 정렬 드롭다운 - Flat Design */}
            <div className="flex justify-end mb-6">
              <div className="relative inline-block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between gap-8 px-4 py-2.5 bg-white transition-colors min-w-[180px] hover:bg-black hover:text-white"
                  style={{ 
                    fontSize: 'var(--font-size-ui)',
                    color: 'var(--color-text-primary)',
                    border: 'var(--border-width) var(--border-style) var(--color-border)',
                    borderRadius: 'var(--border-radius)'
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    {sortType === 'algorithm' && <Sparkles className="w-3 h-3" />}
                    {currentSortLabel}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    
                    <div 
                      className="absolute top-full left-0 mt-1 bg-white z-20 min-w-[180px]"
                      style={{
                        border: 'var(--border-width) var(--border-style) var(--color-border)'
                      }}
                    >
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value as SortType)}
                          className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-1.5 ${
                            sortType === option.value
                              ? 'font-bold'
                              : 'hover:bg-black hover:text-white'
                          }`}
                          style={{ 
                            fontSize: 'var(--font-size-ui)',
                            color: sortType === option.value 
                              ? 'var(--color-text-primary)' 
                              : 'var(--color-text-secondary)'
                          }}
                        >
                          {option.icon && <Sparkles className="w-3 h-3" />}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 상품 그리드 - Editorial Minimalist Grid with proper border overlap handling */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              style={{ 
                gap: 0,
                borderRight: 'var(--border-width) var(--border-style) var(--color-border)',
                borderBottom: 'var(--border-width) var(--border-style) var(--color-border)'
              }}
            >
              {sortedProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isAlgorithmMode={sortType === 'algorithm'}
                  onClick={() => navigate(`/store/product/${product.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  isAlgorithmMode?: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAlgorithmMode, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const images = getProductThumbnailImages(product.id);
  const hasMultipleImages = images.length > 1;

  // 이미지 로드 성공 추적
  useEffect(() => {
    setLoadedImages([]);
    setCurrentImageIndex(0);
  }, [product.id]);

  // 자동 슬라이드
  useEffect(() => {
    if (!hasMultipleImages) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [hasMultipleImages, images.length]);

  const handleImageClick = (e: React.MouseEvent) => {
    if (hasMultipleImages) {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
      style={{
        borderTop: 'var(--border-width) var(--border-style) var(--color-border)',
        borderLeft: 'var(--border-width) var(--border-style) var(--color-border)'
      }}
    >
      {/* 썸네일 - 70% 이미지 영역 */}
      <div 
        className={`relative w-full overflow-hidden ${isAlgorithmMode && product.isBest ? '' : ''}`}
        style={{ 
          aspectRatio: '7/3',
          backgroundColor: '#f5f5f5',
          borderBottom: 'var(--border-width) var(--border-style) var(--color-border)'
        }}
      >
        {/* 이미지 슬라이드 */}
        {images.length > 0 ? (
          <div className="relative w-full h-full">
            {images.map((img, idx) => (
              <img
                key={`${product.id}-${idx}`}
                src={img}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                onClick={handleImageClick}
                loading="lazy"
                onLoad={() => {
                  if (!loadedImages.includes(img)) {
                    setLoadedImages(prev => [...prev, img]);
                  }
                }}
                onError={(e) => {
                  // 이미지 로드 실패 시 로그
                  if (import.meta.env.DEV) {
                    console.warn(`이미지 로드 실패 [상품 ${product.id}]:`, img);
                  }
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0';
                }}
              />
            ))}
            {/* 모든 이미지 로드 실패 시 기본 배경 */}
            {loadedImages.length === 0 && images.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <span className="text-white/30 text-xs">이미지 로딩 중...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/30 text-xs">IMG</span>
          </div>
        )}
        
        {/* Sold Out 오버레이 */}
        {product.soldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="text-white text-sm font-medium font-accent">Sold out</span>
          </div>
        )}
        
        {/* 알고리즘 추천 뱃지 */}
        {isAlgorithmMode && product.isBest && !product.soldOut && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-[#E54B1A] rounded-none text-[10px] font-medium text-stone-800 flex items-center gap-1 z-10">
            <Sparkles className="w-3 h-3" />
            추천
          </div>
        )}

        {/* 이미지 인디케이터 (하단 중앙) */}
        {hasMultipleImages && !product.soldOut && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                className={`w-1 h-1 rounded-full transition-all ${
                  idx === currentImageIndex 
                    ? 'bg-white w-2' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`이미지 ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* 상품 정보 - 30% 텍스트 영역 */}
      <div style={{ padding: 'var(--spacing-md)' }}>
        {/* 상품명 */}
        <h3 
          className="mb-2 leading-snug group-hover:underline"
          style={{ 
            fontSize: 'var(--font-size-ui)',
            color: 'var(--color-text-primary)',
            fontWeight: 500,
            letterSpacing: 'var(--letter-spacing-tight)'
          }}
        >
          {product.name}
        </h3>
        
        {/* 가격 */}
        <div className="flex flex-col gap-1">
          {product.originalPrice && (
            <div className="flex items-baseline gap-2">
              <span 
                className="line-through font-accent"
                style={{ 
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                {product.originalPrice.toLocaleString()}원
              </span>
              {(() => {
                const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                return discountRate > 0 ? (
                  <span 
                    className="font-bold font-accent"
                    style={{ 
                      fontSize: 'var(--font-size-ui)',
                      color: 'var(--color-text-primary)',
                      letterSpacing: 'var(--letter-spacing-tight)'
                    }}
                  >
                    {discountRate}%
                  </span>
                ) : null;
              })()}
            </div>
          )}
          <p 
            className="font-bold font-accent"
            style={{ 
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-primary)',
              letterSpacing: 'var(--letter-spacing-tight)'
            }}
          >
            {product.price.toLocaleString()}원
          </p>
        </div>
        
        {/* BEST 뱃지 */}
        {product.isBest && !isAlgorithmMode && (
          <p 
            className="mt-2 tracking-wide font-accent"
            style={{ 
              fontSize: 'var(--font-size-ui)',
              color: 'var(--color-text-muted)'
            }}
          >
            BEST
          </p>
        )}
      </div>
    </div>
  );
};

