import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';

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
    name: '슬런치 볶음김치 (4캔)',
    price: 12000,
    isBest: true,
    description: '젓갈이 들어가지 않은 비건 볶음김치 캔 160g x 4개',
    detailDescription: '슬런치 팩토리의 시그니처 비건 볶음김치입니다. 젓갈을 사용하지 않고도 깊은 맛을 내는 비법 레시피로 만들어졌습니다. 김치볶음밥, 김치찌개 등 다양한 요리에 활용하세요.',
    spectrum: '비건',
    category: '캔 제품',
    images: [],
  },
  {
    id: 2,
    name: '슬런치 볶음김치 (3캔)',
    price: 9000,
    isBest: true,
    description: '젓갈이 들어가지 않은 비건 볶음김치 캔 160g x 3개',
    detailDescription: '슬런치 팩토리의 시그니처 비건 볶음김치입니다. 젓갈을 사용하지 않고도 깊은 맛을 내는 비법 레시피로 만들어졌습니다.',
    spectrum: '비건',
    category: '캔 제품',
    images: [],
  },
  {
    id: 3,
    name: '슬런치 김치볶음밥 밀키트',
    price: 12000,
    originalPrice: 15000,
    isBest: true,
    description: '젓갈이 들어가지 않은 비건 캔김치로 구성한 김치볶음밥 밀키트 (2인분)',
    detailDescription: '슬런치의 비건 볶음김치와 엄선된 재료로 구성된 김치볶음밥 밀키트입니다. 간편하게 조리하여 맛있는 비건 김치볶음밥을 즐겨보세요. 2인분 구성입니다.',
    spectrum: '비건',
    category: '밀키트',
    images: [],
    soldOut: true,
  },
  {
    id: 4,
    name: '슬런치 시금치 뇨끼',
    price: 18000,
    originalPrice: 24000,
    isBest: true,
    description: '계란, 우유, 버터를 넣지 않은 비건 뇨끼',
    detailDescription: '이탈리아 정통 뇨끼를 비건으로 재해석했습니다. 신선한 시금치를 듬뿍 넣어 만든 쫄깃한 뇨끼와 특제 소스가 함께 제공됩니다. 계란, 우유, 버터 없이도 풍부한 맛을 느낄 수 있습니다.',
    spectrum: '비건',
    category: '메인요리',
    images: [],
    soldOut: true,
  },
  {
    id: 5,
    name: '슬런치 블루베리 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: false,
    description: '슬런치 팩토리 프리미엄 블루베리 타르트',
    detailDescription: '신선한 블루베리를 듬뿍 올린 프리미엄 비건 타르트입니다. 바삭한 타르트 크러스트와 부드러운 크림, 상큼한 블루베리의 조화가 일품입니다. 버터와 계란 없이 만들어 비건도 안심하고 즐길 수 있습니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
    soldOut: true,
  },
  {
    id: 6,
    name: '슬런치 자두 타르트',
    price: 39000,
    originalPrice: 44000,
    isBest: true,
    description: '상큼한 자두를 올린 프리미엄 비건 타르트',
    detailDescription: '제철 자두의 상큼함을 담은 프리미엄 비건 타르트입니다. 달콤하면서도 새콤한 자두와 고소한 타르트 크러스트의 완벽한 조화를 경험해보세요.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
    soldOut: true,
  },
  {
    id: 7,
    name: '슬런치 복숭아 타르트',
    price: 32000,
    originalPrice: 35000,
    isBest: true,
    description: '달콤한 복숭아를 올린 비건 디저트',
    detailDescription: '부드럽고 달콤한 복숭아를 올린 프리미엄 비건 타르트입니다. 여름 시즌 한정으로 선보이는 특별한 디저트입니다.',
    spectrum: '비건',
    category: '베이커리',
    images: [],
    soldOut: true,
  },
  {
    id: 8,
    name: '슬런치 잠봉뵈르',
    price: 8000,
    originalPrice: 12000,
    isBest: true,
    description: '슬런치 팩토리의 베스트 셀러',
    detailDescription: '프랑스 정통 잠봉뵈르를 비건으로 재해석한 슬런치의 베스트 셀러입니다. 바삭한 바게트와 신선한 채소, 특제 소스가 어우러진 샌드위치입니다.',
    spectrum: '비건',
    category: '샌드위치',
    images: [],
    soldOut: true,
  },
  {
    id: 9,
    name: '슬런치 비건 마요네즈',
    price: 12000,
    isBest: true,
    description: '계란 없이 만든 고소한 비건 마요네즈',
    detailDescription: '계란 없이도 고소하고 크리미한 맛을 내는 비건 마요네즈입니다. 샐러드, 샌드위치, 각종 요리에 활용하세요. 콜레스테롤 걱정 없이 즐길 수 있습니다.',
    spectrum: '비건',
    category: '소스',
    images: [],
  },
  {
    id: 10,
    name: '슬런치 비건 케첩',
    price: 8000,
    isBest: true,
    description: '토마토 본연의 맛을 살린 비건 케첩',
    detailDescription: '신선한 토마토로 만든 비건 케첩입니다. 인공 첨가물 없이 토마토 본연의 맛을 살렸습니다. 감자튀김, 햄버거 등 다양한 요리에 곁들여 드세요.',
    spectrum: '비건',
    category: '소스',
    images: [],
  },
];

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = PRODUCTS.find(p => p.id === Number(productId));

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
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
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-lg">IMG</span>
                </div>
              )}
              
              {/* Sold Out 오버레이 */}
              {product.soldOut && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-medium">Sold out</span>
                </div>
              )}
            </div>

            {/* 썸네일 이미지 리스트 */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 overflow-hidden border-2 ${
                      selectedImageIndex === idx ? 'border-stone-900' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
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

            {/* 버튼 영역 */}
            <div className="flex gap-3">
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

        {/* 상세 설명 영역 */}
        <div className="mt-16 border-t border-stone-200 pt-12">
          <h2 className="text-xl font-bold text-stone-900 mb-6">상품 상세</h2>
          
          {/* 상세 설명 텍스트 */}
          {product.detailDescription && (
            <div className="prose prose-stone max-w-none mb-8">
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {product.detailDescription}
              </p>
            </div>
          )}

          {/* 상세 이미지 영역 (나중에 이미지 추가) */}
          <div className="space-y-4">
            <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center">
              <span className="text-stone-400">상세 이미지 영역</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

