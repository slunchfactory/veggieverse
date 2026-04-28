import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronUp, Minus, Plus, ShoppingCart, Heart, Truck, Info } from 'lucide-react';
import { getProductThumbnailImages } from '../../../utils/productImages';

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
    description: '깊고 진한 맛이 살아있는 볶음김치',
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
    description: '감칠맛 끝판왕, 한 그릇에 담은 김치볶음밥',
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
    description: '채소와 두부로 빚은 달콤짭짤 뇨끼',
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
    description: '고소한 피넛버터와 진한 초콜릿의 완벽한 조합',
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
    description: '칼칼하고 진한 야채육수의 맛',
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
  {
    id: 16,
    name: '슬런치 샐러드 드레싱 5종 테스터',
    price: 8800,
    isBest: false,
    description: '다양한 소스 맛보고 취향 찾아요',
    detailDescription: '슬런치의 인기 샐러드 드레싱 5종을 소량씩 맛볼 수 있는 테스터 세트입니다. 오리엔탈, 분짜, 랜치, 발사믹, 바질 페스토까지 다양한 맛을 경험하고 나만의 취향을 찾아보세요.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 17,
    name: '오리엔탈 드레싱',
    price: 7600,
    isBest: false,
    description: '고소하고 산뜻한 채소 친화적 드레싱',
    detailDescription: '참깨의 고소함과 산뜻한 식초의 조화가 돋보이는 오리엔탈 드레싱입니다. 어떤 채소와도 잘 어울려 매일 먹는 샐러드가 새로워집니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 18,
    name: '분짜 드레싱',
    price: 7600,
    isBest: false,
    description: '베트남 감성 그대로, 상큼한 피시프리 소스',
    detailDescription: '베트남 분짜의 감성을 담은 피시프리 소스입니다. 피시소스 없이도 깊고 상큼한 맛을 구현하여 비건도 안심하고 즐길 수 있습니다. 샐러드뿐 아니라 라이스페이퍼 롤에도 잘 어울립니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 19,
    name: '랜치 드레싱 소스',
    price: 9600,
    isBest: false,
    description: '크리미하고 진한 맛, 샐러드의 완성',
    detailDescription: '유제품 없이 만든 크리미한 비건 랜치 드레싱입니다. 진하고 부드러운 맛으로 어떤 샐러드든 한층 풍성하게 만들어줍니다. 딥핑 소스로도 활용 가능합니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 20,
    name: '발사믹 드레싱',
    price: 7600,
    isBest: false,
    description: '깊고 달콤한 산미로 어떤 샐러드든 한 단계 업',
    detailDescription: '깊고 달콤한 발사믹 식초를 베이스로 만든 드레싱입니다. 은은한 산미와 달콤함이 조화를 이루어 샐러드의 맛을 한 단계 끌어올립니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 21,
    name: '바질 페스토 드레싱',
    price: 9600,
    isBest: false,
    description: '이탈리아 허브향 가득, 파스타에도 샐러드에도',
    detailDescription: '신선한 바질과 잣, 올리브오일로 만든 향긋한 비건 페스토 드레싱입니다. 샐러드 드레싱은 물론 파스타 소스로도 활용 가능한 만능 소스입니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 22,
    name: '매생이 크림 펜네',
    price: 5200,
    isBest: false,
    description: '바다향 매생이와 고소한 크림소스의 만남',
    detailDescription: '제철 매생이의 은은한 바다향과 고소한 비건 크림소스가 쫄깃한 펜네와 어우러진 밀키트입니다. 간편하게 조리하여 레스토랑급 파스타를 즐겨보세요.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 23,
    name: '매생이 트러플 리조또',
    price: 6000,
    isBest: false,
    description: '트러플 향으로 한 그릇을 특별하게',
    detailDescription: '매생이의 부드러운 바다향에 트러플 오일의 깊은 풍미를 더한 프리미엄 비건 리조또 밀키트입니다. 특별한 한 끼가 필요할 때 간편하게 조리해 즐겨보세요.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 24,
    name: '매생이 페스토',
    price: 8800,
    isBest: false,
    description: '제철 매생이로 만든 초록빛 건강 페스토',
    detailDescription: '제철 매생이를 듬뿍 넣어 만든 초록빛 비건 페스토입니다. 파스타, 빵, 샐러드 등 다양한 요리에 활용할 수 있는 만능 소스입니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 25,
    name: '감태버터',
    price: 9600,
    isBest: false,
    description: '바다내음 감태로 만든 건강한 버터 스프레드',
    detailDescription: '바다내음 가득한 감태를 넣어 만든 비건 버터 스프레드입니다. 빵에 발라 먹거나 요리에 활용하면 감태 특유의 풍미가 더해져 한층 깊은 맛을 즐길 수 있습니다.',
    spectrum: '비건',
    category: '소스와 오일',
    images: [],
  },
  {
    id: 26,
    name: '슬런치 주먹밥 5종 10봉 세트',
    price: 21500,
    isBest: false,
    description: '인기 주먹밥 5종, 총 10봉 세트',
    detailDescription: '슬런치의 인기 주먹밥 5종을 한 세트에 담았습니다. 김치, 간장버터, 참치마요, 버섯, 불고기까지 각 2봉씩 총 10봉으로 구성되어 매일 다른 맛을 즐길 수 있습니다.',
    spectrum: '비건',
    category: '세트',
    images: [],
  },
  {
    id: 27,
    name: '슬런치 김치 주먹밥',
    price: 2650,
    isBest: false,
    description: '알싸하고 진한 김치맛이 밥알 하나하나에',
    detailDescription: '비건 김치의 알싸하고 진한 맛이 밥알 하나하나에 배어든 주먹밥입니다. 간편하게 데워 먹을 수 있어 바쁜 아침이나 간식으로 제격입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 28,
    name: '슬런치 간장버터 주먹밥',
    price: 2650,
    isBest: false,
    description: '고소한 대두버터가 황금빛 밥알에 녹아들어',
    detailDescription: '고소한 대두버터가 황금빛 밥알에 녹아든 간장버터 주먹밥입니다. 짭짤한 간장과 고소한 버터의 조화가 일품입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 29,
    name: '슬런치 참치마요 주먹밥',
    price: 2650,
    isBest: false,
    description: '크리미한 참치마요, 깔끔한 매운 끝맛',
    detailDescription: '비건 참치마요의 크리미한 맛과 깔끔한 매운 끝맛이 어우러진 주먹밥입니다. 식물성 재료만으로 참치마요의 맛을 완벽하게 재현했습니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 30,
    name: '슬런치 버섯 주먹밥',
    price: 2650,
    isBest: false,
    description: '향긋하게 볶은 버섯이 밥 속 깊이',
    detailDescription: '향긋하게 볶은 버섯이 밥 속 깊이 스며든 주먹밥입니다. 버섯 특유의 감칠맛이 입안 가득 퍼지는 건강한 한 끼입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
  },
  {
    id: 31,
    name: '슬런치 불고기 주먹밥',
    price: 2650,
    isBest: false,
    description: '달콤 짭짤 불고기 맛에 스모키한 여운까지',
    detailDescription: '달콤 짭짤한 비건 불고기 맛에 스모키한 여운이 남는 주먹밥입니다. 식물성 재료로 불고기의 풍미를 살려 남녀노소 누구나 좋아하는 맛입니다.',
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
  const [isTabSticky, setIsTabSticky] = useState(false);
  // 리뷰 데이터 (나중에 API나 상태 관리로 연동)
  const [reviews] = useState<any[]>([]);
  // 상품문의 데이터 (나중에 API나 상태 관리로 연동)
  const [qnas] = useState<any[]>([]);
  const reviewRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<HTMLDivElement>(null);
  const qnaRef = useRef<HTMLDivElement>(null);
  const tabMenuContainerRef = useRef<HTMLDivElement>(null);
  const tabMenuTriggerRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS.find(p => p.id === Number(productId));
  const images = product ? getProductThumbnailImages(product.id) : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="text-center">
          <p className="text-warm-gray mb-4">상품을 찾을 수 없습니다.</p>
          <Link to="/store" className="text-black underline">스토어로 돌아가기</Link>
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

  // 스크롤 컨테이너 찾기 헬퍼 함수
  const findScrollContainer = (): HTMLElement | null => {
    const main = document.querySelector('main');
    if (main) return main as HTMLElement;
    
    // Layout의 overflow-auto div 찾기
    const scrollContainer = document.querySelector('.flex-1.overflow-auto');
    if (scrollContainer) return scrollContainer as HTMLElement;
    
    return null;
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
      if (import.meta.env.DEV) {
        console.error(`Element not found for section: ${section}`);
      }
      return;
    }
    
    const scrollContainer = findScrollContainer();
    if (!scrollContainer) {
      // window 스크롤 사용
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const tabMenuHeight = 56;
      const offset = 64 + tabMenuHeight; // 헤더 + 탭바
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
      return;
    }

    // 스크롤 컨테이너 기준으로 스크롤
    const containerPaddingTop = parseInt(getComputedStyle(scrollContainer).paddingTop) || 0;
    const tabMenuHeight = 56; // 탭바 높이 고정값
    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top - containerRect.top + scrollContainer.scrollTop;
    
    // 고정된 탭바 높이와 헤더 높이를 고려한 오프셋
    const offset = containerPaddingTop + tabMenuHeight;
    
    scrollContainer.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    const scrollContainer = findScrollContainer();
    if (scrollContainer) {
      scrollContainer.scrollTo({
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
    const scrollContainer = findScrollContainer();
    const handleScroll = () => {
      if (scrollContainer) {
        setShowScrollToTop(scrollContainer.scrollTop > 200);
      } else {
        setShowScrollToTop(window.scrollY > 200);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 상태 확인
    } else {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 페이지 로드 시 스크롤을 최상단으로 이동
  useEffect(() => {
    const scrollToTop = () => {
      const scrollContainer = findScrollContainer();
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
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

  // 스크롤 감지로 활성 섹션 업데이트 및 탭 바 고정
  useEffect(() => {
    const scrollContainer = findScrollContainer();
    if (!tabMenuContainerRef.current || !tabMenuTriggerRef.current) return;

    const handleScroll = () => {
      if (!scrollContainer) {
        // window 스크롤 사용
        const triggerElement = tabMenuTriggerRef.current;
        if (triggerElement) {
          const triggerTop = triggerElement.getBoundingClientRect().top + window.scrollY;
          const shouldBeSticky = window.scrollY >= triggerTop - 64; // 헤더 높이(64px) 고려
          setIsTabSticky(shouldBeSticky);
        }
        return;
      }

      const containerPaddingTop = parseInt(getComputedStyle(scrollContainer).paddingTop) || 0;
      const tabMenuHeight = 56; // 탭바 높이 고정값
      const scrollOffset = scrollContainer.scrollTop + containerPaddingTop + tabMenuHeight + 50; // 50px 여유

      // 탭 바 고정 여부 확인
      const triggerElement = tabMenuTriggerRef.current;
      if (triggerElement) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const triggerRect = triggerElement.getBoundingClientRect();
        const triggerTop = triggerRect.top - containerRect.top + scrollContainer.scrollTop;
        const shouldBeSticky = scrollContainer.scrollTop >= triggerTop - 64; // 헤더 높이(64px) 고려
        setIsTabSticky(shouldBeSticky);
      }

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

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    handleScroll(); // 초기 상태 확인

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [product]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--surface-soft)' }}>
      {/* 스크롤 투 탑 버튼 */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 right-4 z-[95] w-12 h-12 flex items-center justify-center transition-opacity animate-fadeIn"
          style={{ background: 'var(--palette-text)', border: '1px solid var(--palette-text)' }}
          aria-label="상단으로 이동"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}


      {/* 상품 정보 영역 */}
      <div className="page-container pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 좌측 - 이미지 영역 */}
          <div className="lg:w-1/2">
            {/* 메인 이미지 */}
            <div 
              className="w-full aspect-square bg-[var(--charcoal)] mb-4 relative overflow-hidden"
            >
              {images.length > 0 ? (
                <div className="relative w-full h-full">
                  {images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`${product.name} - 이미지 ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        idx === selectedImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
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
                  <span className="text-white font-accent font-normal" style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400 }}>Sold out</span>
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
                      aria-label={`이미지 ${idx + 1} 선택`}
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
                      selectedImageIndex === idx ? 'border-black' : 'border-[color:var(--border-hairline)] hover:border-[color:var(--border-color-light)]'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} 썸네일 ${idx + 1}`}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      decoding="async"
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
              <span className="inline-block px-3 py-1 bg-eggshell text-warm-gray text-xs mb-4 font-accent">
                BEST
              </span>
            )}

            {/* 상품명 - H1: 24px Regular (Quiet Luxury) */}
            <h1 
              className="text-black mb-4 font-normal"
              style={{ 
                fontSize: '24px',
                fontWeight: 400,
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 'var(--line-height-h1)'
              }}
            >
              {product.name}
            </h1>

            {/* 가격 - UI: 15px - 순서: 원래 가격(취소선) → 할인율 → 할인된 가격 */}
            <div className="mb-6 flex flex-col gap-1">
              {product.originalPrice && (
                <>
                  <span 
                    className="line-through"
                    style={{ 
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--color-text-muted)',
                      fontWeight: 'var(--font-weight-ui)',
                      letterSpacing: 'var(--letter-spacing-tight)'
                    }}
                  >
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  {(() => {
                    const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                    return discountRate > 0 ? (
                      <span
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: 'var(--palette-sky)',
                        }}
                      >
                        {discountRate}%
                      </span>
                    ) : null;
                  })()}
                </>
              )}
              <span 
                className="font-normal"
                style={{ 
                  fontSize: 'var(--font-size-ui)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                {product.price.toLocaleString()}원
              </span>
            </div>

            {/* 짧은 설명 - Body: 16px */}
            {product.description && (
              <p 
                className="text-warm-gray mb-6"
                style={{ 
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 'var(--font-weight-body)',
                  lineHeight: 'var(--line-height-body)',
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                {product.description}
              </p>
            )}

            {/* 태그 */}
            <div className="flex gap-2 mb-8">
              <span className="px-3 py-1.5 border border-[color:var(--border-divider)] text-warm-gray text-sm">
                {product.spectrum}
              </span>
              <span className="px-3 py-1.5 border border-[color:var(--border-divider)] text-warm-gray text-sm">
                {product.category}
              </span>
            </div>

            {/* 구분선 */}
            <div style={{ borderTop: '1px solid var(--palette-text)', margin: '24px 0' }} />

            {/* 구매혜택 및 배송 정보 */}
            <div className="space-y-1">
              {/* 구매혜택 */}
              <div className="flex items-center gap-2 text-xs text-warm-gray">
                <span>구매혜택</span>
                <span className="font-normal">0 포인트 적립예정</span>
                <button className="text-muted hover:text-warm-gray" aria-label="포인트 적립 안내">
                  <Info className="w-3 h-3" />
                </button>
              </div>

              {/* 배송 방법 */}
              <div className="flex items-center gap-2 text-xs text-warm-gray">
                <span>배송 방법</span>
                <span className="font-normal">택배</span>
              </div>

              {/* 배송비 */}
              <div className="flex items-center gap-2 text-xs text-warm-gray">
                <span>배송비</span>
                <span className="font-normal">
                  <span className="font-accent">3,500</span>원 (<span className="font-accent">55,000</span>원 이상 무료배송)
                </span>
                <span className="text-muted">|</span>
                <span className="text-warm-gray">도서산간 배송비 추가</span>
                <button className="text-muted hover:text-warm-gray" aria-label="배송비 안내">
                  <Info className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 오늘출발 상품 */}
            <div className="mt-3 mb-6">
              <div
                className="p-4 flex items-center gap-3 rounded-none"
                style={{ backgroundColor: 'var(--surface-soft)' }}
              >
                <div className="w-10 h-10 bg-[rgba(26,10,5,0.04)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-warm-gray" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-normal text-black mb-1">오늘출발 상품</p>
                  <p className="text-xs text-warm-gray">오늘 14:00까지 결제시 오늘 바로 발송됩니다.</p>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div style={{ borderTop: '1px solid var(--palette-text)', margin: '24px 0' }} />

            {/* 수량 선택 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--warm-gray)' }}>수량</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--palette-text)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '12px 16px', background: 'transparent', border: 'none', cursor: product.soldOut ? 'not-allowed' : 'pointer' }}
                  disabled={product.soldOut}
                >
                  <Minus className="w-4 h-4" style={{ color: 'var(--palette-text)' }} />
                </button>
                <span style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 400, minWidth: '60px', textAlign: 'center', borderLeft: '1px solid var(--palette-text)', borderRight: '1px solid var(--palette-text)' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '12px 16px', background: 'transparent', border: 'none', cursor: product.soldOut ? 'not-allowed' : 'pointer' }}
                  disabled={product.soldOut}
                >
                  <Plus className="w-4 h-4" style={{ color: 'var(--palette-text)' }} />
                </button>
              </div>
            </div>

            {/* 총 금액 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--warm-gray)' }}>총 금액</span>
              <span style={{ fontSize: 'var(--font-size-h2)', fontWeight: 400, color: 'var(--palette-text)' }}>
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            {/* 버튼 영역 - 데스크톱용 (모바일에서는 숨김) */}
            <div className="hidden lg:flex" style={{ gap: '12px' }}>
              <button
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  padding: '16px',
                  background: isLiked ? 'var(--palette-bg-2)' : 'transparent',
                  border: '1px solid var(--palette-text)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-black text-black' : 'text-black'}`} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.soldOut}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'transparent',
                  border: '1px solid var(--palette-text)',
                  color: product.soldOut ? 'var(--muted)' : 'var(--palette-text)',
                  cursor: product.soldOut ? 'not-allowed' : 'pointer',
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.soldOut}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: 400,
                  background: product.soldOut ? 'var(--muted)' : 'var(--palette-text)',
                  border: '1px solid var(--palette-text)',
                  color: '#ffffff',
                  cursor: product.soldOut ? 'not-allowed' : 'pointer',
                }}
              >
                {product.soldOut ? '품절' : '바로 구매'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 상세 섹션 */}
      {/* 탭 바 트리거 포인트 (보이지 않는 마커) */}
      <div ref={tabMenuTriggerRef} className="h-0" />
      
      {/* 탭 영역 - JavaScript로 고정 제어 */}
      <div
        ref={tabMenuContainerRef}
        className={`transition-all ${
          isTabSticky
            ? 'fixed top-16 left-0 right-0 z-[9998]'
            : 'relative z-10'
        }`}
        style={{
          background: 'var(--surface-soft)',
          ...(isTabSticky ? { width: '100%', maxWidth: '100%' } : {})
        }}
      >
        <div style={{ background: 'var(--surface-soft)' }}>
          <div className={`${isTabSticky ? 'page-container' : 'page-container'}`}>
            {/* 탭 버튼 */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--palette-text)' }}>
              <button
                onClick={() => scrollToSection('review')}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  fontSize: '14px',
                  fontWeight: 400,
                  textAlign: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderRight: '1px solid var(--palette-text)',
                  borderBottom: activeSection === 'review' ? '2px solid var(--palette-text)' : 'none',
                  color: activeSection === 'review' ? 'var(--palette-text)' : 'var(--warm-gray)',
                  cursor: 'pointer',
                }}
              >
                리뷰 ({reviews.length.toLocaleString()})
              </button>
              <button
                onClick={() => scrollToSection('detail')}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  fontSize: '14px',
                  fontWeight: 400,
                  textAlign: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderRight: '1px solid var(--palette-text)',
                  borderBottom: activeSection === 'detail' ? '2px solid var(--palette-text)' : 'none',
                  color: activeSection === 'detail' ? 'var(--palette-text)' : 'var(--warm-gray)',
                  cursor: 'pointer',
                }}
              >
                상세정보
              </button>
              <button
                onClick={() => scrollToSection('return')}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  fontSize: '14px',
                  fontWeight: 400,
                  textAlign: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderRight: '1px solid var(--palette-text)',
                  borderBottom: activeSection === 'return' ? '2px solid var(--palette-text)' : 'none',
                  color: activeSection === 'return' ? 'var(--palette-text)' : 'var(--warm-gray)',
                  cursor: 'pointer',
                }}
              >
                반품/교환정보
              </button>
              <button
                onClick={() => scrollToSection('qna')}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  fontSize: '14px',
                  fontWeight: 400,
                  textAlign: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeSection === 'qna' ? '2px solid var(--palette-text)' : 'none',
                  color: activeSection === 'qna' ? 'var(--palette-text)' : 'var(--warm-gray)',
                  cursor: 'pointer',
                }}
              >
                상품문의 ({qnas.length.toLocaleString()})
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
          className="scroll-mt-[152px] mb-[60px] pt-8"
        >
          <h2 style={{ fontSize: '18px', fontWeight: 400, color: 'var(--palette-text)', lineHeight: 1.2, marginBottom: '13px' }}>
            리뷰
          </h2>
          {reviews.length === 0 ? (
            <p 
              className="text-warm-gray mb-8"
              style={{ 
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-body)',
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              아직 등록된 리뷰가 없습니다.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-[color:var(--border-hairline)] pb-4">
                  {/* 리뷰 아이템 렌더링 */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 상세정보 섹션 */}
        <div ref={detailRef} data-section="detail" className="scroll-mt-[152px] mb-[60px] pt-8" style={{ borderTop: '1px solid var(--palette-text)' }}>
          {/* 상세 설명 텍스트 - 13px (뉴스레터 상세 본문과 동일) */}
          {product.detailDescription && (
            <div className="prose prose-stone max-w-none mb-8">
              <p 
                className="text-warm-gray whitespace-pre-line"
                style={{ 
                  fontSize: '13px',
                  fontWeight: 'var(--font-weight-body)',
                  lineHeight: 'var(--line-height-body)',
                  letterSpacing: 'var(--letter-spacing-tight)'
                }}
              >
                {product.detailDescription}
              </p>
            </div>
          )}

          {/* 상세 이미지 영역 - 센터 정렬 */}
          <div className="flex justify-center overflow-hidden">
            <div className="space-y-4 w-full max-w-4xl">
              <div className="w-full aspect-[4/3] bg-eggshell flex items-center justify-center">
                <span className="text-muted">상세 이미지 영역</span>
              </div>
            </div>
          </div>
        </div>

        {/* 반품/교환정보 섹션 */}
        <div ref={returnRef} data-section="return" className="scroll-mt-[152px] mb-[60px] pt-8" style={{ borderTop: '1px solid var(--palette-text)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 400, color: 'var(--palette-text)', lineHeight: 1.2, marginBottom: '13px' }}>
            반품/교환정보
          </h2>
          <p 
            className="text-warm-gray mb-8"
            style={{ 
              fontSize: 'var(--font-size-body)',
              fontWeight: 'var(--font-weight-body)',
              lineHeight: 'var(--line-height-body)',
              letterSpacing: 'var(--letter-spacing-tight)'
            }}
          >
            반품/교환 정보가 없습니다.
          </p>
        </div>

        {/* 상품문의 섹션 */}
        <div ref={qnaRef} data-section="qna" className="scroll-mt-[152px] mb-[60px] pt-8" style={{ borderTop: '1px solid var(--palette-text)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 400, color: 'var(--palette-text)', lineHeight: 1.2, marginBottom: '13px' }}>
            상품문의
          </h2>
          {qnas.length === 0 ? (
            <p 
              className="text-warm-gray mb-8"
              style={{ 
                fontSize: 'var(--font-size-body)',
                fontWeight: 'var(--font-weight-body)',
                lineHeight: 'var(--line-height-body)',
                letterSpacing: 'var(--letter-spacing-tight)'
              }}
            >
              아직 등록된 상품문의가 없습니다.
            </p>
          ) : (
            <div className="space-y-4">
              {qnas.map((qna, index) => (
                <div key={index} className="border-b border-[color:var(--border-hairline)] pb-4">
                  {/* 상품문의 아이템 렌더링 */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단 고정 버튼 영역 - 모바일/태블릿용 */}
      <div
        className="buy-fixed-bar lg:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 99999,
          background: 'var(--surface-soft)',
          borderTop: '1px solid var(--palette-text)',
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', maxWidth: '1440px', margin: '0 auto' }}>
          <button
            onClick={() => setIsLiked(!isLiked)}
            style={{
              padding: '12px',
              background: isLiked ? 'var(--palette-bg-2)' : 'transparent',
              border: '1px solid var(--palette-text)',
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-black text-black' : 'text-black'}`} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.soldOut}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              color: product.soldOut ? 'var(--muted)' : 'var(--palette-text)',
              cursor: product.soldOut ? 'not-allowed' : 'pointer',
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            장바구니
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.soldOut}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 400,
              background: product.soldOut ? 'var(--muted)' : 'var(--palette-text)',
              border: '1px solid var(--palette-text)',
              color: '#ffffff',
              cursor: product.soldOut ? 'not-allowed' : 'pointer',
            }}
          >
            {product.soldOut ? '품절' : '바로 구매'}
          </button>
        </div>
      </div>
    </div>
  );
};

