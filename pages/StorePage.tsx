import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, ChevronDown, Check, Heart, X, ExternalLink, Minus, Plus, ShoppingCart } from 'lucide-react';

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
    name: '슬런치 볶음김치 (4캔)',
    price: 12000,
    isBest: true,
    popularity: 95,
    cuisine: '한식',
    spectrum: '비건',
    category: '신메뉴',
    description: '젓갈이 들어가지 않은 비건 볶음김치 캔 160g x 4개',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 2,
    name: '슬런치 볶음김치 (3캔)',
    price: 9000,
    isBest: true,
    popularity: 88,
    cuisine: '한식',
    spectrum: '비건',
    category: '신메뉴',
    description: '젓갈이 들어가지 않은 비건 볶음김치 캔 160g x 3개',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 3,
    name: '슬런치 김치볶음밥 밀키트',
    price: 12000,
    originalPrice: 15000,
    isBest: true,
    popularity: 92,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트 (2인분)',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    soldOut: true,
  },
  {
    id: 4,
    name: '슬런치 시금치 뇨끼',
    price: 18000,
    originalPrice: 24000,
    isBest: true,
    popularity: 85,
    cuisine: '양식',
    spectrum: '비건',
    category: '수프와 메인요리',
    description: '계란, 우유, 버터를 넣지 않은 비건 뇨끼',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    soldOut: true,
  },
  {
    id: 5,
    name: '슬런치 블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: false,
    popularity: 78,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    soldOut: true,
  },
  {
    id: 6,
    name: '슬런치 자두 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: true,
    popularity: 82,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '상큼한 자두를 올린 프리미엄 비건 타르트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    soldOut: true,
  },
  {
    id: 7,
    name: '슬런치 복숭아 타르트',
    price: 32000,
    originalPrice: 35000,
    isBest: true,
    popularity: 80,
    cuisine: '디저트',
    spectrum: '비건',
    category: '베이커리',
    description: '달콤한 복숭아를 올린 비건 디저트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    soldOut: true,
  },
  {
    id: 8,
    name: '슬런치 잠봉뵈르',
    price: 8000,
    originalPrice: 12000,
    isBest: true,
    popularity: 90,
    cuisine: '양식',
    spectrum: '비건',
    category: '샐러드',
    description: '슬런치 팩토리의 베스트 셀러',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    soldOut: true,
  },
  {
    id: 9,
    name: '슬런치 비건 마요네즈',
    price: 12000,
    isBest: true,
    popularity: 70,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '계란 없이 만든 고소한 비건 마요네즈',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
  },
  {
    id: 10,
    name: '슬런치 비건 케첩',
    price: 8000,
    isBest: true,
    popularity: 75,
    cuisine: '양식',
    spectrum: '비건',
    category: '양념•오일',
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
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
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
          '샐러드': '샐러드',
          '수프와 메인요리': '수프•메인요리',
          '소스와 오일': '양념•오일',
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
        // TODO: 비건 테스트 결과 기반 추천 로직 추가 예정
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
  const categoryOptions = ['신메뉴', '기획전', '밀키트', '베이커리', '양념•오일', '샐러드', '수프•메인요리'];

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
  const categoryTabs = ['ALL', 'NEW', '샐러드', '수프와 메인요리', '소스와 오일', '밀키트', '베이커리'];
  
  const handleTabClick = (tab: string) => {
    if (tab === 'ALL') {
      setActiveTab('ALL');
      setSelectedCategories([]);
      window.history.replaceState(null, '', '/veggieverse/store');
    } else {
      setActiveTab(tab);
      const categoryMap: Record<string, string> = {
        'NEW': '신메뉴',
        '샐러드': '샐러드',
        '수프와 메인요리': '수프•메인요리',
        '소스와 오일': '양념•오일',
        '밀키트': '밀키트',
        '베이커리': '베이커리',
      };
      setSelectedCategories([categoryMap[tab] || tab]);
      window.history.replaceState(null, '', `/veggieverse/store?category=${encodeURIComponent(tab)}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* ALL 페이지 전용 - 영상 + 추천 메뉴 섹션 (전체 너비) */}
      {activeTab === 'ALL' && (
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 96px)', minHeight: '600px', maxHeight: '900px' }}>
            {/* 좌측 - 세로형 영상 영역 (전체 높이) */}
            <div className="lg:w-1/2 h-[50vh] lg:h-full flex-shrink-0">
              <div className="relative w-full h-full overflow-hidden bg-stone-900">
                {/* YouTube 영상 자동재생 */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/qN-UMZZ1U9Y?autoplay=1&mute=1&loop=1&playlist=qN-UMZZ1U9Y&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  title="슬런치 비건 레시피"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ pointerEvents: 'none' }}
                />
                {/* 영상 위 텍스트 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" style={{ paddingBottom: '2rem' }}>
                  <span className="text-[11px] sm:text-[12px] font-medium text-white/70 tracking-widest uppercase">LIFE</span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight break-keep">
                    슬런치가 추천하는<br/>겨울 비건 레시피
                  </h3>
                  <p className="text-[12px] sm:text-[14px] lg:text-[15px] text-white/70 mt-3">따뜻한 겨울을 위한 건강한 한 끼</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[11px] sm:text-[12px] text-white/50">2025. 12. 10</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-none bg-stone-600 overflow-hidden"></div>
                      <span className="text-[12px] text-white/70">슬런치</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 - 추천 콘텐츠 영역 */}
            <div className="lg:w-1/2 lg:h-full bg-[#E54B1A] overflow-y-auto no-scrollbar">
              
              {/* 모바일/태블릿: 가로형 카드 2열 그리드 */}
              <div className="lg:hidden p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-4">
                  {algorithmRecommended.slice(0, 4).map((product, idx) => (
                    <div key={product.id} className="cursor-pointer group flex flex-row gap-3">
                      {/* 카드 영상 (왼쪽) */}
                      <div 
                        className="relative w-[45%] flex-shrink-0 overflow-hidden bg-stone-900"
                        style={{ aspectRatio: '4/5' }}
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
                          <span className="text-[9px] font-semibold text-stone-600 tracking-wide">
                            {product.cuisine === '한식' ? 'EAT' : product.cuisine === '디저트' ? 'STYLE' : 'LIFE'}
                          </span>
                          <h4 className="text-[13px] font-bold text-stone-900 leading-tight mt-0.5 line-clamp-2 group-hover:underline">
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
                        style={{ aspectRatio: '4/5' }}
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
                        <span className="text-[10px] font-semibold text-stone-700 tracking-wide">
                          {product.cuisine === '한식' ? 'EAT' : product.cuisine === '디저트' ? 'STYLE' : 'LIFE'}
                        </span>
                        <h4 className="text-[17px] font-bold text-stone-900 leading-tight mt-1 group-hover:underline">
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
                        style={{ aspectRatio: '4/5' }}
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
                        <span className="text-[10px] font-semibold text-stone-700 tracking-wide">
                          {product.cuisine === '한식' ? 'EAT' : product.cuisine === '디저트' ? 'STYLE' : 'LIFE'}
                        </span>
                        <h4 className="text-[17px] font-bold text-stone-900 leading-tight mt-1 group-hover:underline">
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
        <div className="flex gap-10">
          {/* 좌측 필터 */}
          <aside className="w-[240px] flex-shrink-0 hidden md:block">
            <div className="space-y-8 text-stone-800">
              {/* 카테고리 탭 (세로형) */}
              <div>
                <div className="text-[13px] font-semibold mb-3 pb-2 border-b-2 border-stone-900">카테고리</div>
                <div className="flex flex-col">
                  {categoryTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`w-full text-left py-2 text-[13px] transition-colors ${
                        activeTab === tab
                          ? 'text-stone-900 font-semibold'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 비건 스펙트럼 */}
              <div>
                <div className="text-[13px] font-semibold mb-3">비건 스펙트럼</div>
                <div className="flex flex-col gap-2">
                  {spectrumOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSpectrum(opt)}
                      className={`w-full px-3 py-2 text-left border text-[12px] transition-colors ${
                        spectrum === opt ? 'border-black text-black' : 'border-stone-300 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 제품 유형 */}
              <div>
                <div className="text-[13px] font-semibold mb-3">제품 유형</div>
                <div className="flex flex-col gap-2">
                  {cuisineOptions.map((c) => {
                    const checked = selectedCuisines.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleCuisine(c)}
                        className={`w-full px-3 py-2 flex items-center gap-2 border text-[12px] transition-colors ${
                          checked ? 'border-black text-black' : 'border-stone-300 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 border flex items-center justify-center ${
                            checked ? 'border-black bg-black text-white' : 'border-stone-300'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3" />}
                        </span>
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 카테고리 (접이식) */}
              <div>
                <button
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-[13px] font-semibold mb-3"
                >
                  <span>카테고리</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                  <div className="flex flex-col gap-2">
                    {categoryOptions.map((c) => {
                      const checked = selectedCategories.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() =>
                            setSelectedCategories((prev) =>
                              prev.includes(c) ? prev.filter((i) => i !== c) : [...prev, c]
                            )
                          }
                          className={`w-full px-3 py-2 flex items-center gap-2 border text-[12px] transition-colors ${
                            checked ? 'border-black text-black' : 'border-stone-300 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 border flex items-center justify-center ${
                              checked ? 'border-black bg-black text-white' : 'border-stone-300'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3" />}
                          </span>
                          {c}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* 우측 콘텐츠 */}
          <div className="flex-1">
            {/* 정렬 드롭다운 */}
            <div className="flex justify-end mb-6">
              <div className="relative inline-block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between gap-8 px-4 py-2.5 border border-stone-300 bg-white text-[12px] text-stone-700 hover:border-stone-400 transition-colors min-w-[180px]"
                >
                  <span className="flex items-center gap-1.5">
                    {sortType === 'algorithm' && <Sparkles className="w-3 h-3 text-[#E54B1A]" />}
                    {currentSortLabel}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    
                    <div className="absolute top-full left-0 mt-1 bg-white border border-stone-200 shadow-lg z-20 min-w-[180px]">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value as SortType)}
                          className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors flex items-center gap-1.5 ${
                            sortType === option.value
                              ? 'bg-stone-100 text-stone-900 font-medium'
                              : 'text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {option.icon && <Sparkles className="w-3 h-3 text-[#E54B1A]" />}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 상품 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isAlgorithmMode={sortType === 'algorithm'} 
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 상품 상세 모달 */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  isAlgorithmMode?: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAlgorithmMode, onClick }) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      {/* 썸네일 - 5:6 비율 */}
      <div 
        className={`relative w-full mb-3 overflow-hidden ${isAlgorithmMode && product.isBest ? 'ring-2 ring-[#E54B1A]' : ''}`}
        style={{ 
          aspectRatio: '5/6',
          backgroundColor: '#54271d' 
        }}
      >
        {/* 이미지 자리 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-xs">IMG</span>
        </div>
        
        {/* Sold Out 오버레이 */}
        {product.soldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Sold out</span>
          </div>
        )}
        
        {/* 알고리즘 추천 뱃지 */}
        {isAlgorithmMode && product.isBest && !product.soldOut && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-[#E54B1A] rounded-none text-[10px] font-medium text-stone-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            추천
          </div>
        )}
      </div>
      
      {/* 상품 정보 */}
      <div>
        {/* 상품명 */}
        <h3 className="text-[13px] text-stone-700 mb-1 leading-snug group-hover:text-stone-900 group-hover:underline">
          {product.name}
        </h3>
        
        {/* 가격 */}
        <div className="flex items-center gap-2">
          <p className="text-[13px] text-stone-800 font-medium">
            KRW {product.price.toLocaleString()}
          </p>
          {product.originalPrice && (
            <p className="text-[11px] text-stone-400 line-through">
              {product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
        
        {/* BEST 뱃지 */}
        {product.isBest && !isAlgorithmMode && (
          <p className="text-[10px] text-stone-400 mt-1 tracking-wide">BEST</p>
        )}
      </div>
    </div>
  );
};

// 상품 상세 모달
interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handlePurchase = () => {
    if (product.externalUrl) {
      window.open(product.externalUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto mx-4">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* 좌측 - 상품 이미지 */}
          <div className="md:w-1/2 bg-[#54271d] aspect-square flex items-center justify-center relative">
            <span className="text-white/30 text-lg">IMG</span>
            {product.soldOut && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xl font-medium">Sold out</span>
              </div>
            )}
          </div>
          
          {/* 우측 - 상품 정보 */}
          <div className="md:w-1/2 p-6 md:p-8">
            {/* 상품명 */}
            <h2 className="text-xl font-bold text-stone-900 mb-2">
              {product.name}
            </h2>
            
            {/* 가격 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-stone-900">
                {product.price.toLocaleString()}원
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
            </div>
            
            {/* 설명 */}
            {product.description && (
              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                {product.description}
              </p>
            )}
            
            {/* 스펙트럼 & 카테고리 */}
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs">
                {product.spectrum}
              </span>
              <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs">
                {product.category}
              </span>
            </div>
            
            {/* 구분선 */}
            <div className="border-t border-stone-200 my-6" />
            
            {/* 수량 선택 */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-stone-600">수량</span>
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-stone-100 transition-colors"
                  disabled={product.soldOut}
                >
                  <Minus className="w-4 h-4 text-stone-600" />
                </button>
                <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-stone-100 transition-colors"
                  disabled={product.soldOut}
                >
                  <Plus className="w-4 h-4 text-stone-600" />
                </button>
              </div>
            </div>
            
            {/* 총 금액 */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-stone-600">총 금액</span>
              <span className="text-xl font-bold text-stone-900">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
            
            {/* 구매 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={handlePurchase}
                disabled={product.soldOut}
                className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  product.soldOut
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {product.soldOut ? '품절' : '구매하기'}
              </button>
              <button
                onClick={handlePurchase}
                className="px-4 py-4 border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">공식몰</span>
              </button>
            </div>
            
            {/* 안내 문구 */}
            <p className="mt-4 text-xs text-stone-400 text-center">
              구매하기 클릭 시 슬런치 공식 쇼핑몰로 이동합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
