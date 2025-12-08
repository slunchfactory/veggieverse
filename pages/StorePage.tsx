import React, { useState, useMemo } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

// 샘플 상품 데이터
const PRODUCTS = [
  {
    id: 1,
    name: '슬런치 볶음김치 (4캔)',
    price: 12000,
    isBest: true,
    popularity: 95,
  },
  {
    id: 2,
    name: '슬런치 볶음김치 (3캔)',
    price: 9000,
    isBest: true,
    popularity: 88,
  },
  {
    id: 3,
    name: '슬런치 김치볶음밥 밀키트',
    price: 15000,
    isBest: true,
    popularity: 92,
  },
  {
    id: 4,
    name: '슬런치 시금치 뇨끼',
    price: 18000,
    isBest: true,
    popularity: 85,
  },
  {
    id: 5,
    name: '슬런치 블루베리 타르트',
    price: 39000,
    isBest: false,
    popularity: 78,
  },
  {
    id: 6,
    name: '슬런치 자두 타르트',
    price: 39000,
    isBest: true,
    popularity: 82,
  },
  {
    id: 7,
    name: '슬런치 복숭아 타르트',
    price: 32000,
    isBest: true,
    popularity: 80,
  },
  {
    id: 8,
    name: '슬런치 잠봉뵈르',
    price: 8000,
    isBest: true,
    popularity: 90,
  },
  {
    id: 9,
    name: '슬런치 비건 마요네즈',
    price: 12000,
    isBest: false,
    popularity: 70,
  },
  {
    id: 10,
    name: '슬런치 비건 케첩',
    price: 8000,
    isBest: true,
    popularity: 75,
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
  const [sortType, setSortType] = useState<SortType>('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 현재 선택된 정렬 옵션 라벨
  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === sortType)?.label || '기본 정렬';

  // 정렬된 상품 목록
  const sortedProducts = useMemo(() => {
    const products = [...PRODUCTS];
    
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
  }, [sortType]);

  const handleSortChange = (value: SortType) => {
    setSortType(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 카테고리 헤더 */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-4">
        <h1 className="text-[15px] font-medium text-stone-800">Slunch Factory Selected</h1>
      </div>
      
      {/* 정렬 드롭다운 */}
      <div className="max-w-[1400px] mx-auto px-6 pb-6">
        <div className="relative inline-block">
          {/* 드롭다운 버튼 */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-8 px-4 py-2.5 border border-stone-300 bg-white text-[12px] text-stone-700 hover:border-stone-400 transition-colors min-w-[180px]"
          >
            <span className="flex items-center gap-1.5">
              {sortType === 'algorithm' && <Sparkles className="w-3 h-3 text-[#D8D262]" />}
              {currentSortLabel}
            </span>
            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <>
              {/* 배경 클릭 시 닫기 */}
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
                    {option.icon && <Sparkles className="w-3 h-3 text-[#D8D262]" />}
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* 알고리즘 설명 툴팁 */}
        {sortType === 'algorithm' && (
          <p className="text-[11px] text-stone-500 mt-2">
            ✨ 나의 비건 성향 테스트 결과를 기반으로 추천해드려요
          </p>
        )}
      </div>
      
      {/* 상품 그리드 - 5열 */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-5 gap-x-4 gap-y-10">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} isAlgorithmMode={sortType === 'algorithm'} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    isBest: boolean;
    popularity: number;
  };
  isAlgorithmMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAlgorithmMode }) => {
  return (
    <div className="group cursor-pointer">
      {/* 썸네일 - 5:6 비율 */}
      <div 
        className={`relative w-full mb-3 overflow-hidden ${isAlgorithmMode && product.isBest ? 'ring-2 ring-[#D8D262]' : ''}`}
        style={{ 
          aspectRatio: '5/6',
          backgroundColor: '#54271d' 
        }}
      >
        {/* 이미지 자리 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-xs">IMG</span>
        </div>
        
        {/* 알고리즘 추천 뱃지 */}
        {isAlgorithmMode && product.isBest && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-[#D8D262] rounded text-[10px] font-medium text-stone-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            추천
          </div>
        )}
      </div>
      
      {/* 상품 정보 */}
      <div>
        {/* 상품명 */}
        <h3 className="text-[13px] text-stone-700 mb-1 leading-snug">
          {product.name}
        </h3>
        
        {/* 가격 */}
        <p className="text-[13px] text-stone-800">
          KRW {product.price.toLocaleString()}
        </p>
        
        {/* BEST 뱃지 */}
        {product.isBest && !isAlgorithmMode && (
          <p className="text-[10px] text-stone-400 mt-1 tracking-wide">BEST</p>
        )}
      </div>
    </div>
  );
};
