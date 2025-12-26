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
  const [spectrum, setSpectrum] = useState<string>('none');
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('전체');
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
      // 'none'(일반)은 전체 보기로 처리
      const matchSpectrum = spectrum === 'none' || spectrum === '전체' || p.spectrum === spectrum;
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      // 추가 제한 필터 (글루텐프리, 할랄, 코셔)
      const matchRestrictions = selectedRestrictions.length === 0 || selectedRestrictions.every(r => {
        // 제품에 해당 속성이 있는지 확인 (실제 데이터 구조에 맞게 조정 필요)
        return true; // 현재는 모든 제품 통과 (데이터에 restriction 필드 추가 시 수정)
      });
      return matchCuisine && matchSpectrum && matchCategory && matchRestrictions;
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

  // 식단 옵션 (라디오 - 단일 선택)
  const dietOptions = [
    { value: 'none', label: '일반' },
    { value: 'vegan', label: '비건' },
    { value: 'lacto', label: '락토비건' },
    { value: 'ovo', label: '오보' },
    { value: 'lacto-ovo', label: '락토오보' },
    { value: 'flexi', label: '플렉시' },
    { value: 'pesco', label: '페스코' },
    { value: 'pollo', label: '폴로' },
  ];

  // 추가 제한 옵션 (체크박스 - 다중 선택)
  const restrictionOptions = [
    { value: 'gluten-free', label: '글루텐프리' },
    { value: 'halal', label: '할랄' },
    { value: 'kosher', label: '코셔' },
  ];
  // 음식 종류 옵션 ('전체' 삭제)
  const cuisineOptions = ['한식', '양식', '디저트'];

  // 알고리즘 추천 상품 (BEST 상품 중 상위 4개)
  const algorithmRecommended = useMemo(() => {
    return [...PRODUCTS]
      .filter(p => p.isBest)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4);
  }, []);

  // 우측 섹션 영상 ID 목록
  const cardVideoIds = ['x7pnY0U5yYY', 'LeZQWQ_cXqU', '8cVFJrY89SA', 'IzNnBZMjbXU'];

  // 제품 형태 탭 목록
  const productTypeTabs = ['전체', '밀키트', '베이커리', '소스/오일', '세트', '구독'];
  
  // 제품 형태별 제품 개수 계산
  const getCategoryCount = (productType: string): number => {
    if (productType === '전체') {
      return PRODUCTS.length;
    }
    // 제품 형태 매핑 (탭 이름 -> 실제 제품 category)
    const categoryMap: Record<string, string> = {
      '밀키트': '밀키트',
      '베이커리': '베이커리',
      '스낵': '스낵',
      '소스/오일': '소스와 오일',
      '세트': '세트',
      '구독': '구독',
    };
    const mappedCategory = categoryMap[productType] || productType;
    // 실제 제품의 category 값으로 필터링
    return PRODUCTS.filter(p => p.category === mappedCategory).length;
  };
  
  const handleTabClick = (tab: string) => {
    if (tab === '전체') {
      setActiveTab('전체');
      setSelectedCategories([]);
      window.history.replaceState(null, '', '/veggieverse/store');
    } else {
      setActiveTab(tab);
      const categoryMap: Record<string, string> = {
        '밀키트': '밀키트',
        '베이커리': '베이커리',
        '스낵': '스낵',
        '소스/오일': '소스와 오일',
        '세트': '세트',
        '구독': '구독',
      };
      setSelectedCategories([categoryMap[tab] || tab]);
      window.history.replaceState(null, '', `/veggieverse/store?productType=${encodeURIComponent(tab)}`);
    }
  };

  return (
    <>
      {/* 좌측 필터 - Fixed Sidebar */}
      <aside className="store-filter">
            <div className="text-slunch-black" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* 제품 형태 */}
              <div className="filter-group">
                <div className="filter-group-title">
                  제품 형태
                </div>
                <div className="flex flex-col">
                  {productTypeTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`w-full text-left transition-colors font-sans ${
                        activeTab === tab
                          ? 'font-bold text-slunch-black'
                          : 'text-slunch-gray hover:opacity-70'
                      }`}
                      style={{ fontSize: '14px', padding: '6px 0' }}
                    >
                      <span>{tab}</span>
                      <span className="ml-1 font-sans text-slunch-gray-light" style={{ fontSize: '12px' }}>
                        {getCategoryCount(tab)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 식단 */}
              <div className="filter-group">
                <div className="filter-group-title">
                  식단
                </div>
                <div className="flex flex-col">
                  {dietOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`filter-radio ${spectrum === opt.value ? 'selected' : ''}`}
                      onClick={() => setSpectrum(opt.value)}
                    >
                      <span className="filter-radio-circle"></span>
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 추가 제한 */}
              <div className="filter-group">
                <div className="filter-group-title">
                  추가 제한
                </div>
                <div className="flex flex-col">
                  {restrictionOptions.map((opt) => {
                    const checked = selectedRestrictions.includes(opt.value);
                    return (
                      <label
                        key={opt.value}
                        className={`filter-checkbox ${checked ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedRestrictions(prev => 
                            prev.includes(opt.value) 
                              ? prev.filter(v => v !== opt.value) 
                              : [...prev, opt.value]
                          );
                        }}
                      >
                        <span className="filter-checkbox-box"></span>
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 음식 종류 */}
              <div className="filter-group">
                <div className="filter-group-title">
                  음식 종류
                </div>
                <div className="flex flex-col">
                  {cuisineOptions.map((c) => {
                    const checked = selectedCuisines.includes(c);
                    return (
                      <label
                        key={c}
                        className={`filter-checkbox ${checked ? 'selected' : ''}`}
                        onClick={() => toggleCuisine(c)}
                      >
                        <span className="filter-checkbox-box"></span>
                        <span>{c}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* 우측 콘텐츠 */}
      <main className="store-content">
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

            {/* 상품 그리드 */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ gap: '13px' }}
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
      </main>
    </>
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
      className={`menu-card ${product.soldOut ? 'soldout' : ''}`}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      {/* 썸네일 이미지 */}
      <div 
        className="menu-card-img-wrapper"
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          background: '#F5F5F5',
        }}
      >
        {/* 이미지 슬라이드 */}
        {images.length > 0 ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {images.map((img, idx) => (
              <img
                key={`${product.id}-${idx}`}
                src={img}
                alt={product.name}
                className="menu-card-img"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease, opacity 0.5s ease',
                  opacity: idx === currentImageIndex ? 1 : 0,
                  zIndex: idx === currentImageIndex ? 10 : 0,
                }}
                onClick={handleImageClick}
                loading="lazy"
                onLoad={() => {
                  if (!loadedImages.includes(img)) {
                    setLoadedImages(prev => [...prev, img]);
                  }
                }}
                onError={(e) => {
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
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                pointerEvents: 'none',
              }}>
                <span style={{ color: 'var(--gray-lighter)', fontSize: '13px' }}>이미지 로딩 중...</span>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5F5F5',
          }}>
            <span style={{ color: 'var(--gray-lighter)', fontSize: '13px' }}>IMG</span>
          </div>
        )}
        
        {/* 뱃지 - 이미지 좌측 상단 */}
        {product.statusBadge && !isAlgorithmMode && (
          <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 20 }}>
            <Badge variant={product.statusBadge} />
          </div>
        )}
        
        {/* 알고리즘 추천 뱃지 */}
        {isAlgorithmMode && product.isBest && !product.soldOut && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            zIndex: 20,
            padding: '2px 8px',
            backgroundColor: 'var(--lime)',
            color: 'var(--black)',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Sparkles style={{ width: '12px', height: '12px' }} />
            추천
          </div>
        )}

        {/* 이미지 인디케이터 (하단 중앙) */}
        {hasMultipleImages && !product.soldOut && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '4px',
            zIndex: 10,
          }}>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                style={{
                  width: idx === currentImageIndex ? '8px' : '4px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: idx === currentImageIndex ? 'var(--white-pure)' : 'rgba(255, 255, 255, 0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`이미지 ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* SOLD OUT 오버레이 */}
        {product.soldOut && (
          <div className="menu-card-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(13, 13, 13, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--white-pure)',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            zIndex: 15,
          }}>
            SOLD OUT
          </div>
        )}
      </div>
      
      {/* 상품 정보 */}
      <div className="menu-card-content" style={{ padding: '16px 0' }}>
        {/* 태그 + 메뉴명 행 */}
        <div className="menu-card-title-row" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
        }}>
          {/* 뱃지가 이미지 위에 있으므로 여기서는 제거 */}
          <h3 className="menu-card-title" style={{
            fontSize: '16px',
            fontWeight: 700,
            margin: 0,
            color: product.soldOut ? 'var(--gray)' : 'var(--black)',
          }}>
            {product.name}
          </h3>
        </div>
        
        {/* 설명 */}
        {product.description && (
          <p className="menu-card-desc" style={{
            fontSize: '13px',
            color: product.soldOut ? 'var(--gray-light)' : 'var(--gray)',
            marginBottom: '10px',
            margin: 0,
          }}>
            {product.description}
          </p>
        )}
        
        {/* 가격 정보 */}
        <div style={{ marginTop: '10px' }}>
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              {/* 원래 가격 - 취소선 */}
              <p className="menu-card-price-original" style={{
                fontSize: '13px',
                color: 'var(--gray-light)',
                textDecoration: 'line-through',
                marginBottom: '4px',
                margin: 0,
              }}>
                {product.originalPrice.toLocaleString()}원
              </p>
              {/* 할인가 행 */}
              <div className="menu-card-price-row" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                {/* 할인율 뱃지 */}
                {(() => {
                  const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                  return discountRate > 0 ? (
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: 'var(--lime)',
                      color: 'var(--black)',
                      lineHeight: '1.2',
                    }}>
                      {discountRate}%
                    </span>
                  ) : null;
                })()}
                {/* 할인된 가격 */}
                <span className="menu-card-price" style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: product.soldOut ? 'var(--gray)' : 'var(--black)',
                }}>
                  {product.price.toLocaleString()}원
                </span>
              </div>
            </>
          ) : (
            /* 할인이 없을 때 - 현재 가격만 */
            <span className="menu-card-price" style={{
              fontSize: '16px',
              fontWeight: 700,
              color: product.soldOut ? 'var(--gray)' : 'var(--black)',
            }}>
              {product.price.toLocaleString()}원
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

