import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, ChevronDown, Check, Heart, X, SlidersHorizontal } from 'lucide-react';
import { getProductThumbnailImages } from '../../utils/productImages';
import { Badge } from '../../components/ui/Badge';
import { TopControlBar, TabItem, SortOption } from '../../components/TopControlBar';

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
  statusBadge?: 'NEW' | 'BEST' | 'SOLD_OUT';
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
    description: '깊고 진한 맛이 살아있는 볶음김치',
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
    description: '감칠맛 끝판왕, 한 그릇에 담은 김치볶음밥',
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
    description: '채소와 두부로 빚은 달콤짭짤 뇨끼',
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
    description: '고소한 피넛버터와 진한 초콜릿의 완벽한 조합',
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
    description: '칼칼하고 진한 야채육수의 맛',
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
    id: 16,
    name: '슬런치 샐러드 드레싱 5종 테스터',
    price: 8800,
    isBest: false,
    popularity: 70,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '다양한 소스 맛보고 취향 찾아요',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 17,
    name: '오리엔탈 드레싱',
    price: 7600,
    isBest: false,
    popularity: 65,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '고소하고 산뜻한 채소 친화적 드레싱',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 18,
    name: '분짜 드레싱',
    price: 7600,
    isBest: false,
    popularity: 68,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '베트남 감성 그대로, 상큼한 피시프리 소스',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 19,
    name: '랜치 드레싱 소스',
    price: 9600,
    isBest: false,
    popularity: 72,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '크리미하고 진한 맛, 샐러드의 완성',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 20,
    name: '발사믹 드레싱',
    price: 7600,
    isBest: false,
    popularity: 66,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '깊고 달콤한 산미로 어떤 샐러드든 한 단계 업',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 21,
    name: '바질 페스토 드레싱',
    price: 9600,
    isBest: false,
    popularity: 74,
    cuisine: '양식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '이탈리아 허브향 가득, 파스타에도 샐러드에도',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 22,
    name: '매생이 크림 펜네',
    price: 5200,
    isBest: false,
    popularity: 76,
    cuisine: '양식',
    spectrum: '비건',
    category: '밀키트',
    description: '바다향 매생이와 고소한 크림소스의 만남',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 23,
    name: '매생이 트러플 리조또',
    price: 6000,
    isBest: false,
    popularity: 78,
    cuisine: '양식',
    spectrum: '비건',
    category: '밀키트',
    description: '트러플 향으로 한 그릇을 특별하게',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 24,
    name: '매생이 페스토',
    price: 8800,
    isBest: false,
    popularity: 71,
    cuisine: '한식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '제철 매생이로 만든 초록빛 건강 페스토',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 25,
    name: '감태버터',
    price: 9600,
    isBest: false,
    popularity: 73,
    cuisine: '한식',
    spectrum: '비건',
    category: '소스와 오일',
    description: '바다내음 감태로 만든 건강한 버터 스프레드',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 26,
    name: '슬런치 주먹밥 5종 10봉 세트',
    price: 21500,
    isBest: false,
    popularity: 85,
    cuisine: '한식',
    spectrum: '비건',
    category: '세트',
    description: '인기 주먹밥 5종, 총 10봉 세트',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 27,
    name: '슬런치 김치 주먹밥',
    price: 2650,
    isBest: false,
    popularity: 77,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '알싸하고 진한 김치맛이 밥알 하나하나에',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 28,
    name: '슬런치 간장버터 주먹밥',
    price: 2650,
    isBest: false,
    popularity: 76,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '고소한 대두버터가 황금빛 밥알에 녹아들어',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 29,
    name: '슬런치 참치마요 주먹밥',
    price: 2650,
    isBest: false,
    popularity: 75,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '크리미한 참치마요, 깔끔한 매운 끝맛',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 30,
    name: '슬런치 버섯 주먹밥',
    price: 2650,
    isBest: false,
    popularity: 74,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '향긋하게 볶은 버섯이 밥 속 깊이',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
  },
  {
    id: 31,
    name: '슬런치 불고기 주먹밥',
    price: 2650,
    isBest: false,
    popularity: 78,
    cuisine: '한식',
    spectrum: '비건',
    category: '밀키트',
    description: '달콤 짭짤 불고기 맛에 스모키한 여운까지',
    externalUrl: 'https://slunch.co.kr/category/%EC%8A%A4%ED%86%A0%EC%96%B4/24/',
    statusBadge: 'NEW',
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
  const [activeTab, setActiveTab] = useState<string>('밀키트');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // 모바일 여부 확인
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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

  // 정렬된 상품 목록 (일부 상품에만 뱃지 할당)
  const sortedProducts = useMemo(() => {
    // 특정 상품에만 뱃지 할당 (NEW: 1번, BEST: 2, 4번, SOLD_OUT: 품절상품)
    const badgeAssignments: Record<number, 'NEW' | 'BEST' | undefined> = {
      1: 'NEW',    // 볶음김치 - NEW
      2: 'BEST',   // 김치볶음밥 - BEST
      4: 'BEST',   // 블루베리 타르트 - BEST
    };

    const products = [...PRODUCTS].map((p) => ({
      ...p,
      statusBadge: p.soldOut ? 'SOLD_OUT' as const : badgeAssignments[p.id],
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

    // 기본 정렬: NEW → BEST → 일반 → SOLD_OUT
    const sortWithPriority = (arr: typeof products) => {
      return arr.sort((a, b) => {
        // SOLD_OUT 최하단
        if (a.soldOut && !b.soldOut) return 1;
        if (!a.soldOut && b.soldOut) return -1;
        // NEW 최상단
        if (a.statusBadge === 'NEW' && b.statusBadge !== 'NEW') return -1;
        if (a.statusBadge !== 'NEW' && b.statusBadge === 'NEW') return 1;
        // BEST 그 다음
        if (a.statusBadge === 'BEST' && b.statusBadge !== 'BEST') return -1;
        if (a.statusBadge !== 'BEST' && b.statusBadge === 'BEST') return 1;
        return 0;
      });
    };

    switch (sortType) {
      case 'price-low':
        return products.sort((a, b) => {
          if (a.soldOut && !b.soldOut) return 1;
          if (!a.soldOut && b.soldOut) return -1;
          if (a.statusBadge === 'NEW' && b.statusBadge !== 'NEW') return -1;
          if (a.statusBadge !== 'NEW' && b.statusBadge === 'NEW') return 1;
          if (a.statusBadge === 'BEST' && b.statusBadge !== 'BEST') return -1;
          if (a.statusBadge !== 'BEST' && b.statusBadge === 'BEST') return 1;
          return a.price - b.price;
        });
      case 'price-high':
        return products.sort((a, b) => {
          if (a.soldOut && !b.soldOut) return 1;
          if (!a.soldOut && b.soldOut) return -1;
          if (a.statusBadge === 'NEW' && b.statusBadge !== 'NEW') return -1;
          if (a.statusBadge !== 'NEW' && b.statusBadge === 'NEW') return 1;
          if (a.statusBadge === 'BEST' && b.statusBadge !== 'BEST') return -1;
          if (a.statusBadge !== 'BEST' && b.statusBadge === 'BEST') return 1;
          return b.price - a.price;
        });
      case 'popularity':
        return products.sort((a, b) => {
          if (a.soldOut && !b.soldOut) return 1;
          if (!a.soldOut && b.soldOut) return -1;
          if (a.statusBadge === 'NEW' && b.statusBadge !== 'NEW') return -1;
          if (a.statusBadge !== 'NEW' && b.statusBadge === 'NEW') return 1;
          if (a.statusBadge === 'BEST' && b.statusBadge !== 'BEST') return -1;
          if (a.statusBadge !== 'BEST' && b.statusBadge === 'BEST') return 1;
          return b.popularity - a.popularity;
        });
      case 'name-az':
        return products.sort((a, b) => {
          if (a.soldOut && !b.soldOut) return 1;
          if (!a.soldOut && b.soldOut) return -1;
          return a.name.localeCompare(b.name);
        });
      case 'name-za':
        return products.sort((a, b) => {
          if (a.soldOut && !b.soldOut) return 1;
          if (!a.soldOut && b.soldOut) return -1;
          return b.name.localeCompare(a.name);
        });
      case 'algorithm':
        return products.sort((a, b) => {
          if (a.soldOut && !b.soldOut) return 1;
          if (!a.soldOut && b.soldOut) return -1;
          if (a.statusBadge === 'NEW') return -1;
          if (b.statusBadge === 'NEW') return 1;
          if (a.statusBadge === 'BEST') return -1;
          if (b.statusBadge === 'BEST') return 1;
          return b.popularity - a.popularity;
        });
      default:
        return sortWithPriority(products);
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
  const productTypeTabs = ['밀키트', '베이커리', '소스/오일', '세트', '구독'];
  
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

  // 적용된 필터 개수 계산
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (activeTab !== '전체') count++;
    if (spectrum !== 'none') count++;
    if (selectedRestrictions.length > 0) count += selectedRestrictions.length;
    if (selectedCuisines.length > 0) count += selectedCuisines.length;
    return count;
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setActiveTab('전체');
    setSelectedCategories([]);
    setSpectrum('none');
    setSelectedRestrictions([]);
    setSelectedCuisines([]);
  };

  // 필터 적용 (바텀시트 닫기)
  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  // 바디 스크롤 잠금
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  // 필터 내용 공통 컴포넌트 - 텍스트 기반, 테두리 없음
  const FilterContent: React.FC = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 식단 */}
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid #000' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dietOptions.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 400,
                color: spectrum === opt.value ? '#000' : '#666',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1px solid #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {spectrum === opt.value && (
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#000' }} />
                )}
              </span>
              <span onClick={() => setSpectrum(opt.value)}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 추가 제한 */}
      <div style={{ padding: '20px 0', borderBottom: '1px solid #000' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {restrictionOptions.map((opt) => {
            const checked = selectedRestrictions.includes(opt.value);
            return (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: checked ? '#000' : '#666',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSelectedRestrictions(prev =>
                    prev.includes(opt.value)
                      ? prev.filter(v => v !== opt.value)
                      : [...prev, opt.value]
                  );
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '1px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {checked && (
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#000' }} />
                  )}
                </span>
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 음식 종류 */}
      <div style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cuisineOptions.map((c) => {
            const checked = selectedCuisines.includes(c);
            return (
              <label
                key={c}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: checked ? '#000' : '#666',
                  cursor: 'pointer',
                }}
                onClick={() => toggleCuisine(c)}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '1px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {checked && (
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#000' }} />
                  )}
                </span>
                <span>{c}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  // TopControlBar용 탭 데이터
  const storeTabs: TabItem[] = productTypeTabs.map(tab => ({
    id: tab,
    label: tab,
    count: getCategoryCount(tab),
  }));

  // TopControlBar용 정렬 옵션
  const sortOptionsForBar: SortOption[] = SORT_OPTIONS.map(opt => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 상단 컨트롤 바 - KBP Style */}
      <TopControlBar
        tabs={storeTabs}
        activeTab={activeTab}
        onTabChange={handleTabClick}
        showFilter={true}
        filterCount={getActiveFilterCount()}
        onFilterClick={() => setIsFilterOpen(true)}
        showSort={true}
        sortOptions={sortOptionsForBar}
        currentSort={sortType}
        onSortChange={(value) => handleSortChange(value as SortType)}
      />

      {/* 우측 필터 드로어 (슬라이드 패널) */}
      {isFilterOpen && (
        <div
          className="fixed z-[100]"
          style={{
            top: 'calc(var(--header-area-h, 72px) + 48px)',
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => setIsFilterOpen(false)}
          />
          {/* Filter Panel - Right Side */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '320px',
              maxWidth: '100vw',
              background: '#FFFFFF',
              borderLeft: '1px solid #000',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.3s ease-out',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #000',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 400, margin: 0 }}>Filter</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              <FilterContent />
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '16px 20px',
                borderTop: '1px solid #000',
              }}
            >
              <button
                onClick={handleResetFilters}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 400,
                  background: 'transparent',
                  border: '1px solid #000',
                  cursor: 'pointer',
                }}
              >
                초기화
              </button>
              <button
                onClick={handleApplyFilters}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 400,
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                적용
              </button>
            </div>
          </div>
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </div>
      )}

      {/* 메인 콘텐츠 - Full Width (Fixed TopControlBar 높이만큼 여백) */}
      <main style={{ padding: '24px 16px', paddingTop: '72px', maxWidth: '1440px', margin: '0 auto' }}>
        {/* 상품 그리드 - 반응형 */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          style={{ marginBottom: '60px' }}
        >
          {sortedProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                isAlgorithmMode={sortType === 'algorithm'}
                onClick={() => navigate(`/store/product/${product.id}`)}
              />
            </div>
          ))}
        </div>

        {/* 상품이 없을 때 */}
        {sortedProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '15px', color: '#666' }}>
              조건에 맞는 상품이 없습니다.
            </p>
            <button
              onClick={handleResetFilters}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                fontSize: '14px',
                background: '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              필터 초기화
            </button>
          </div>
        )}
      </main>
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
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const rawImages = getProductThumbnailImages(product.id);
  // 최소 3개 ~ 최대 5개: 3개 미만이면 슬라이더 비활성화(단일 이미지), 5개 초과면 앞 5개만 사용
  const images = rawImages.length >= 3
    ? rawImages.slice(0, 5)
    : rawImages.length > 0
      ? [rawImages[0]]
      : [];
  const useSlider = images.length >= 3;

  // 이미지 로드/상품 변경 시 초기화
  useEffect(() => {
    setLoadedImages([]);
    setCurrentImageIndex(0);
  }, [product.id]);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(index, images.length - 1));
    setCurrentImageIndex(next);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!useSlider) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragStartX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!useSlider || dragStartX === null) return;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    const delta = e.clientX - dragStartX;
    const threshold = 40;
    if (delta > threshold) goTo(currentImageIndex - 1);
    else if (delta < -threshold) goTo(currentImageIndex + 1);
    setDragStartX(null);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // 드래그 중 취소 시 (예: 포인터가 영역 밖으로 나감) 초기화만
    if (e.buttons === 0 && dragStartX !== null) setDragStartX(null);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (useSlider) {
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
      {/* 썸네일 이미지 - 테두리 없음, 여백으로 구분 */}
      <div
        className="menu-card-img-wrapper"
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          background: '#F5F5F5',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {/* 이미지: 슬라이더(3~5장) 또는 단일 이미지 */}
        {images.length > 0 ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              touchAction: 'pan-y',
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            {useSlider ? (
              /* 우측→좌측 슬라이드 트랙 (translateX) */
              <div
                className="menu-card-img-track"
                style={{
                  display: 'flex',
                  width: `${images.length * 100}%`,
                  height: '100%',
                  transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`,
                  transition: dragStartX === null ? 'transform 0.3s ease-out' : 'none',
                }}
              >
                {images.map((img, idx) => {
                  const shouldRender = Math.abs(idx - currentImageIndex) <= 1;
                  return (
                    <div
                      key={`${product.id}-${idx}`}
                      style={{
                        flex: '0 0 auto',
                        width: `${100 / images.length}%`,
                        height: '100%',
                        position: 'relative',
                        backgroundColor: '#F5F5F5',
                      }}
                      onClick={handleImageClick}
                    >
                      {shouldRender ? (
                        <img
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
                          }}
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
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* 단일 이미지 (3장 미만일 때) */
              <img
                src={images[0]}
                alt={product.name}
                className="menu-card-img"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                loading="lazy"
                onLoad={() => {
                  if (!loadedImages.includes(images[0])) {
                    setLoadedImages(prev => [...prev, images[0]]);
                  }
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0';
                }}
              />
            )}
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
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Sparkles style={{ width: '12px', height: '12px' }} />
            추천
          </div>
        )}

        {/* 이미지 인디케이터 dot (슬라이더일 때만, 현재 활성 슬라이드 반영) */}
        {useSlider && !product.soldOut && (
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
                type="button"
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
                aria-current={idx === currentImageIndex ? 'true' : undefined}
              />
            ))}
          </div>
        )}

        {/* SOLD OUT 오버레이 - 반투명 처리만 (텍스트 없음, 뱃지로 표시) */}
        {product.soldOut && (
          <div className="menu-card-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(13, 13, 13, 0.5)',
            zIndex: 15,
          }} />
        )}
      </div>
      
      {/* 상품 정보 */}
      <div className="menu-card-content" style={{ padding: '16px 0 0 0' }}>
        {/* 상품명 */}
        <h3 className="menu-card-title" style={{
          fontSize: '15px',
          fontWeight: 400,
          lineHeight: '1.3',
          margin: '0 0 8px 0',
          color: product.soldOut ? 'var(--gray)' : '#000000',
        }}>
          {product.name}
        </h3>

        {/* 설명 - 1줄만 */}
        {product.description && (
          <p className="menu-card-desc" style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#6B6B6B',
            margin: '0 0 12px 0',
            lineHeight: '1.5',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {product.description}
          </p>
        )}
        
        {/* 가격 정보 */}
        <div style={{ marginTop: '0' }}>
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              {/* 원래 가격 - 취소선 */}
              <p className="menu-card-price-original" style={{
                fontSize: '13px',
                fontWeight: 400,
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
                {/* 할인율 */}
                {(() => {
                  const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                  return discountRate > 0 ? (
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#87b5e1',
                    }}>
                      {discountRate}%
                    </span>
                  ) : null;
                })()}
                {/* 할인된 가격 */}
                <span className="menu-card-price" style={{
                  fontSize: '16px',
                  fontWeight: 400,
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
              fontWeight: 400,
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

