import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, ChevronDown, Check, Heart } from 'lucide-react';
import { getProductThumbnailImages } from '../utils/productImages';
import { Badge } from '../components/ui/Badge';

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
  statusBadge?: 'NEW' | 'BEST' | 'LIMITED' | 'SEASONAL' | 'SOLD_OUT';
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
    soldOut: true,
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
    soldOut: true,
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
    soldOut: true,
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

  // 정렬된 상품 목록 (각 상품에 랜덤 상태 뱃지 할당)
  const sortedProducts = useMemo(() => {
    const statusBadges: Array<'NEW' | 'BEST' | 'LIMITED' | 'SEASONAL'> = ['NEW', 'BEST', 'LIMITED', 'SEASONAL'];
    
    const products = [...PRODUCTS].map((p, index) => ({
      ...p,
      // 상품 ID를 기반으로 일관된 랜덤 뱃지 할당 (페이지 새로고침 시에도 동일하게 유지)
      statusBadge: p.soldOut ? 'SOLD_OUT' as const : (p.statusBadge || statusBadges[p.id % statusBadges.length]),
    })).filter((p) => {
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
    <div className="min-h-screen bg-slunch-white">
      {/* Hero Section - Split Grid Layout (60-70% Main Video, 30-40% 2x2 Grid) */}
      {activeTab === 'ALL' && (
        <div className="w-full border-b-2 border-slunch-black">
          {/* Desktop: Flex Row Layout */}
          <div className="hidden lg:flex lg:flex-row">
            {/* Left Column - Main Video (50%) */}
            <div className="w-1/2 relative overflow-hidden border-r-2 border-slunch-black">
              <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/qN-UMZZ1U9Y?autoplay=1&mute=1&loop=1&playlist=qN-UMZZ1U9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="슬런치 비건 레시피"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ 
                    pointerEvents: 'none',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
            
            {/* Right Column - 추천 콘텐츠 영역 (50%) */}
            <div className="w-1/2 bg-slunch-white flex-shrink-0">
              {/* 데스크톱: 세로형 카드 2열 엇갈린 높이 */}
              <div className="hidden lg:flex p-5 pb-8 gap-4 h-full overflow-y-auto">
                {/* 왼쪽 열 */}
                <div className="flex-1 flex flex-col gap-4">
                  {algorithmRecommended.slice(0, 2).map((product, idx) => (
                    <div key={product.id} className="cursor-pointer group flex flex-col">
                      <div 
                        className="relative w-full overflow-hidden bg-slunch-black"
                        style={{ aspectRatio: '3/4' }}
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
                          <div className="w-8 h-8 bg-slunch-lime flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-slunch-black" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 bg-slunch-black">
                        <h4 className="font-mono font-bold text-slunch-white-pure leading-tight group-hover:underline text-base">
                          {product.name}
                        </h4>
                        <p className="font-sans text-slunch-gray-light mt-2 line-clamp-2 text-xs">
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
                                  ? 'fill-slunch-lime text-slunch-lime' 
                                  : 'text-slunch-gray hover:text-slunch-lime'
                              }`} 
                            />
                            <span className={`font-sans text-xs ${likedItems.has(product.id) ? 'text-slunch-white-pure font-medium' : 'text-slunch-gray'}`}>
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
                        className="relative w-full overflow-hidden bg-slunch-black"
                        style={{ aspectRatio: '3/4' }}
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
                          <div className="w-8 h-8 bg-slunch-lime flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-slunch-black" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 bg-slunch-black">
                        <h4 className="font-mono font-bold text-slunch-white-pure leading-tight group-hover:underline text-base">
                          {product.name}
                        </h4>
                        <p className="font-sans text-slunch-gray-light mt-2 line-clamp-2 text-xs">
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
                                  ? 'fill-slunch-lime text-slunch-lime' 
                                  : 'text-slunch-gray hover:text-slunch-lime'
                              }`} 
                            />
                            <span className={`font-sans text-xs ${likedItems.has(product.id) ? 'text-slunch-white-pure font-medium' : 'text-slunch-gray'}`}>
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
          
          {/* Mobile: Stack Vertically */}
          <div className="flex flex-col lg:hidden">
            {/* Main Video on Top */}
            <div className="relative w-full overflow-hidden border-b-2 border-slunch-black">
              <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/qN-UMZZ1U9Y?autoplay=1&mute=1&loop=1&playlist=qN-UMZZ1U9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="슬런치 비건 레시피"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ 
                    pointerEvents: 'none',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
            
            {/* 추천 콘텐츠 영역 Below (Mobile) */}
            <div className="lg:hidden p-4 sm:p-5 bg-slunch-white">
              <div className="grid grid-cols-2 gap-3">
                {algorithmRecommended.slice(0, 4).map((product, idx) => (
                  <div key={product.id} className="cursor-pointer group flex flex-row gap-3">
                    {/* 카드 영상 (왼쪽) */}
                    <div 
                      className="relative w-[45%] flex-shrink-0 overflow-hidden bg-slunch-black"
                      style={{ aspectRatio: '3/4' }}
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
                        <div className="w-6 h-6 bg-slunch-lime flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-slunch-black" />
                        </div>
                      </div>
                    </div>
                    {/* 카드 정보 (오른쪽) */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-mono font-bold text-slunch-black leading-tight line-clamp-2 group-hover:underline text-xs">
                          {product.name}
                        </h4>
                        <p className="font-sans text-slunch-gray mt-1 line-clamp-2 text-[10px]">
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
                                ? 'fill-slunch-lime text-slunch-lime' 
                                : 'text-slunch-gray hover:text-slunch-lime'
                            }`} 
                          />
                          <span className={`font-sans text-[10px] ${likedItems.has(product.id) ? 'text-slunch-black font-medium' : 'text-slunch-gray'}`}>
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
              borderRight: '2px solid #0D0D0D',
              paddingRight: 'var(--spacing-lg)'
            }}
          >
            <div className="space-y-8 text-slunch-black">
              {/* 카테고리 탭 (세로형) */}
              <div>
                <div 
                  className="mb-3 pb-2 font-sans font-semibold border-b-2 border-slunch-black"
                  style={{ fontSize: 'var(--font-size-ui)' }}
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
                      className={`font-sans ${activeTab === tab ? 'text-slunch-black font-bold' : 'text-slunch-gray'}`}
                      style={{ fontSize: 'var(--font-size-ui)' }}
                    >
                      <span>{tab}</span>
                      <span className="ml-1 font-sans text-slunch-gray-light"
                        style={{ fontSize: 'var(--font-size-body)' }}
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
                <div className="flex flex-col" style={{ gap: '12px' }}>
                  {spectrumOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center cursor-pointer hover:opacity-70"
                      style={{ 
                        fontSize: 'var(--font-size-ui)',
                        color: 'var(--color-text-secondary)',
                        letterSpacing: 'var(--letter-spacing-tight)',
                        gap: '12px',
                        paddingTop: '4px',
                        paddingBottom: '4px'
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
                        className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          spectrum === opt
                            ? 'border-slunch-black bg-slunch-black'
                            : 'border-slunch-gray hover:border-slunch-black'
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
                <div className="flex flex-col" style={{ gap: '12px' }}>
                  {cuisineOptions.map((c) => {
                    const checked = selectedCuisines.includes(c);
                    return (
                      <label
                        key={c}
                        className="flex items-center cursor-pointer hover:opacity-70"
                        className="font-sans text-slunch-gray"
                        style={{ fontSize: 'var(--font-size-ui)',
                          letterSpacing: 'var(--letter-spacing-tight)',
                          gap: '12px',
                          paddingTop: '4px',
                          paddingBottom: '4px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCuisine(c)}
                          className="hidden"
                        />
                        <span
                        className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          checked
                            ? 'border-slunch-black bg-slunch-black'
                            : 'border-slunch-gray hover:border-slunch-black'
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
                  <div className="flex flex-col" style={{ gap: '12px' }}>
                    {promotionOptions.map((opt) => {
                      const checked = selectedCategories.includes(opt);
                      return (
                        <label
                          key={opt}
                          className="flex items-center cursor-pointer hover:opacity-70"
                          style={{ 
                            fontSize: 'var(--font-size-ui)',
                            color: 'var(--color-text-secondary)',
                            letterSpacing: 'var(--letter-spacing-tight)',
                            gap: '12px',
                            paddingTop: '4px',
                            paddingBottom: '4px'
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
                        className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          checked
                            ? 'border-slunch-black bg-slunch-black'
                            : 'border-slunch-gray hover:border-slunch-black'
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
                  className="flex items-center justify-between gap-8 px-4 py-2.5 bg-slunch-white-pure border-2 border-slunch-black transition-colors min-w-[180px] hover-lift hover:bg-slunch-black hover:text-slunch-white-pure font-sans"
                  style={{ fontSize: 'var(--font-size-ui)' }}
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
                    
                    <div className="absolute top-full left-0 mt-1 bg-slunch-white-pure border-2 border-slunch-black z-20 min-w-[180px]">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value as SortType)}
                          className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-1.5 font-sans ${
                            sortType === option.value
                              ? 'font-bold text-slunch-black'
                              : 'text-slunch-gray hover:bg-slunch-black hover:text-slunch-white-pure'
                          }`}
                          style={{ fontSize: 'var(--font-size-ui)' }}
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

            {/* 상품 그리드 - Grunge Punch Grid */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-r-2 border-b-2 border-slunch-black"
              style={{ gap: 0 }}
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
      className="group cursor-pointer border-t-2 border-l-2 border-slunch-black hover-shadow bg-slunch-white-pure"
      onClick={onClick}
    >
      {/* 썸네일 - Portrait Aspect Ratio 2:3 */}
      <div 
        className="relative w-full overflow-hidden border-b-2 border-slunch-black"
        style={{ 
          aspectRatio: '2/3',
          backgroundColor: '#FAF9F6'
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
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                style={{ objectFit: 'cover' }}
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
        
        {/* Sold Out 뱃지 - 썸네일 좌측 상단 */}
        {product.soldOut && (
          <div className="absolute top-2 left-2 z-20">
            <Badge variant="SOLD_OUT" />
          </div>
        )}
        
        {/* 알고리즘 추천 뱃지 */}
        {isAlgorithmMode && product.isBest && !product.soldOut && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-slunch-lime text-slunch-black text-[10px] font-mono font-bold flex items-center gap-1 z-10">
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
      <div className="relative" style={{ padding: 'var(--spacing-md)' }}>
        {/* 상태 뱃지 - 메뉴명 위에 위치 (NEW, BEST, LIMITED, SEASONAL) */}
        {product.statusBadge && product.statusBadge !== 'SOLD_OUT' && !isAlgorithmMode && (
          <div className="absolute top-1 left-4 z-10">
            <Badge variant={product.statusBadge} />
          </div>
        )}
        
        {/* 상품명 - H2: 18px */}
        <h3 className="mb-2 leading-snug group-hover:underline font-mono font-bold text-slunch-black"
          style={{ 
            fontSize: 'var(--font-size-h2)',
            marginTop: product.statusBadge && product.statusBadge !== 'SOLD_OUT' && !isAlgorithmMode ? '24px' : '12px'
          }}
        >
          {product.name}
        </h3>
        
        {/* 가격 - 구조: 원래가격(위) | 할인율 | 할인된 가격(아래) */}
        <div className="flex flex-col gap-1" style={{ marginTop: '4px' }}>
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              {/* 원래 가격 - 14px, 더 연한 gray, line-through (위) */}
              <span className="line-through font-sans"
                style={{ 
                  fontSize: '14px',
                  color: '#CCCCCC' // 더 연한 회색
                }}
              >
                {product.originalPrice.toLocaleString()}원
              </span>
              {/* 할인율 | 할인된 가격 (아래, 가로 배치, 높이 맞춤) */}
              <div className="flex items-center gap-2">
                {/* 할인율 뱃지 - 11px, lime 배경, black 텍스트, 높이 맞춤 */}
                {(() => {
                  const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                  return discountRate > 0 ? (
                    <span className="inline-flex items-center justify-center font-bold font-mono"
                      style={{ 
                        fontSize: '11px', 
                        padding: '2px 8px',
                        backgroundColor: '#BFFF00',
                        color: '#0D0D0D',
                        lineHeight: '1.2',
                        height: '20px' // 할인된 가격과 높이 맞춤
                      }}
                    >
                      {discountRate}%
                    </span>
                  ) : null;
                })()}
                {/* 할인된 가격 - 18px, bold, black */}
                <span className="font-mono font-bold text-slunch-black"
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 700,
                    lineHeight: '1.2'
                  }}
                >
                  {product.price.toLocaleString()}원
                </span>
              </div>
            </>
          ) : (
            /* 할인이 없을 때 - 현재 가격만 18px, bold, black */
            <span className="font-mono font-bold text-slunch-black"
              style={{ fontSize: '18px', fontWeight: 700 }}
            >
              {product.price.toLocaleString()}원
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

