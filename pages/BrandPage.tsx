import React from 'react';

export const BrandPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#F5F0E6' }}>
      {/* 히어로 이미지 */}
      <div className="relative h-[400px] bg-emerald-800 overflow-hidden">
        <img 
          src="/brand-hero.jpg" 
          alt="SLUNCH FACTORY"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-4">
              <img src="/logo-white.png" alt="SLUNCH FACTORY" className="h-16 mx-auto" onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }} />
            </div>
            <h2 className="text-2xl font-light tracking-wider">SLUNCH</h2>
            <h2 className="text-2xl font-light tracking-wider">FACTORY</h2>
            <p className="text-lg mt-4 font-light">From Nature with Slow</p>
          </div>
        </div>
      </div>
      
      {/* 브랜드 소개 섹션 1 */}
      <div className="page-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="self-start">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 leading-relaxed">
              비건 식문화를 선도하는<br/>
              슬런치 팩토리
            </h2>
          </div>
          <div className="self-start">
            <p className="text-stone-600 leading-relaxed mb-6">
              슬런치 팩토리는 2012년부터 채식을 기반으로 한 이탈리아 비건식과 한국 비건식 요리를 전문으로 하는 비건 레스토랑 입니다.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              우리는 식물성 식단에 익숙한 분들을 위한 곳이지만, 일반 고객들의 다양한 맛과 취향을 고려하여, 이탈리아식과 한국식 조리법을 융합하여 현대 도시인들을 위한 영양가 높고 맛있는 다양한 요리를 연구하고 있습니다.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              우리의 요리는 오랜 전통을 지닌 이탈리아식 조리법과 한국식의 다채로운 향신료와 조미료를 조화롭게 사용하여 창의적으로 조리됩니다. 이를 통해 고객들에게 색다른 맛과 풍부한 영양을 제공하고자 노력하고 있습니다. 바쁜 일상 속에서도 건강한 식사를 추구하는 분들에게도 최상의 선택이 될 수 있도록 다양한 메뉴를 제시하고 있습니다.
            </p>
            <p className="text-stone-600 leading-relaxed">
              뿐만 아니라, 우리는 지구 환경의 지속가능성을 응원하고, 환경 보호에 대한 작은 노력과 변화를 적극적으로 지지합니다. 식재료 선택부터 폐기물 관리까지 환경 친화적인 지속 가능한 사업을 추구하며, 고객들과 함께 지구를 위한 더 나은 미래를 만들어가고자 노력하고 있습니다. 함께하여 건강과 지구를 위한 긍정적인 변화를 이끌어내는 데 기여해주시면 감사하겠습니다.
            </p>
          </div>
        </div>
      </div>
      
      {/* 매장 이미지 */}
      <div className="w-full h-[500px] relative">
        <img 
          src="/store-image.jpg" 
          alt="슬런치 팩토리 매장"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1400x500?text=Store+Image';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-4xl font-light tracking-[0.3em] drop-shadow-lg">
            slunchfactory
          </p>
        </div>
      </div>
      
      {/* 브랜드 소개 섹션 2 */}
      <div className="page-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="self-start">
            <h2 className="text-3xl font-bold text-stone-800 mb-8 leading-relaxed">
              국내 통합 브랜드형 비건 전문 기업<br/>
              슬런치 팩토리
            </h2>
          </div>
          <div className="self-start">
            <p className="text-stone-600 leading-relaxed mb-6">
              19년 동안 간편식 생산 사업을 쌓아온 노하우로 슬런치 팩토리는 전문 레스토랑 운영 뿐만 아니라 비건 냉동 즉석식품을 제조하는 최첨단 시설을 보유하고 있습니다. 저희는 자체 개발한 비건 가공육, 치즈 및 다양한 기타 식재료를 사용하여 혁신적이고 맛있는 비건 간편식을 지속적으로 개발해왔습니다.
            </p>
            <p className="text-stone-600 leading-relaxed">
              고객들에게 제공하는 다양한 메뉴와 제품은 탁월한 맛과 영양성을 동시에 보장하며, 콜드체인 유통 시스템을 통해 공급망 전 과정에서 신선도와 안전성을 높여 최상의 품질을 유지합니다. 우리의 설비와 공장은 신속하고 효율적인 생산을 가능하게 하여, 이를 통해 고품질의 비건 식품을 보급함으로써 건강한 식습관과 지속 가능한 라이프스타일을 지지하고 있습니다. 함께하여 건강하고 맛있는 비건 식품을 더 많은 사람들에게 전달하고 지구 환경에 긍정적인 영향을 미치는 데 동참해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


