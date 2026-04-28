import React from 'react';

export const BrandPage: React.FC = () => {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero Section - Full Width Image */}
      <div
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          background: 'var(--charcoal)',
          overflow: 'hidden',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}brand-hero.jpg`}
          alt="SLUNCH FACTORY"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8,
          }}
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <h1
              style={{
                fontSize: '42px',
                fontWeight: 400,
                letterSpacing: '0.2em',
                marginBottom: '8px',
              }}
            >
              SLUNCH
            </h1>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 400,
                letterSpacing: '0.3em',
              }}
            >
              FACTORY
            </h2>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 400,
                marginTop: '20px',
                letterSpacing: '0.1em',
                opacity: 0.9,
              }}
            >
              From Nature with Slow
            </p>
          </div>
        </div>
      </div>

      {/* Section 1 - Grid Layout */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ background: 'var(--cream)' }}
      >
        {/* Image Left */}
        <div
          style={{
            aspectRatio: '4/3',
            background: 'var(--palette-text)',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}brand-section-1.jpg`}
            alt="비건 식문화"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Text Right */}
        <div
          className="p-8 md:p-12 lg:p-16"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              lineHeight: 1.4,
              marginBottom: '24px',
            }}
          >
            비건 식문화를 선도하는
            <br />
            슬런치 팩토리
          </h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.8,
              marginBottom: '12px',
            }}
          >
            슬런치 팩토리는 2012년부터 채식을 기반으로 한 이탈리아 비건식과 한국 비건식 요리를 전문으로 하는 비건 레스토랑 입니다.
          </p>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.8,
              marginBottom: '12px',
            }}
          >
            우리는 식물성 식단에 익숙한 분들을 위한 곳이지만, 일반 고객들의 다양한 맛과 취향을 고려하여, 이탈리아식과 한국식 조리법을 융합하여 현대 도시인들을 위한 영양가 높고 맛있는 다양한 요리를 연구하고 있습니다.
          </p>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.8,
            }}
          >
            우리의 요리는 오랜 전통을 지닌 이탈리아식 조리법과 한국식의 다채로운 향신료와 조미료를 조화롭게 사용하여 창의적으로 조리됩니다.
          </p>
        </div>
      </div>

      {/* Section 2 - Reversed Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ background: 'var(--cream)' }}
      >
        {/* Text Left - 모바일에서는 아래로 */}
        <div
          className="p-8 md:p-12 lg:p-16 order-2 md:order-1"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              lineHeight: 1.4,
              marginBottom: '24px',
            }}
          >
            국내 통합 브랜드형
            <br />
            비건 전문 기업
          </h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.8,
              marginBottom: '12px',
            }}
          >
            19년 동안 간편식 생산 사업을 쌓아온 노하우로 슬런치 팩토리는 전문 레스토랑 운영 뿐만 아니라 비건 냉동 즉석식품을 제조하는 최첨단 시설을 보유하고 있습니다.
          </p>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.8,
            }}
          >
            저희는 자체 개발한 비건 가공육, 치즈 및 다양한 기타 식재료를 사용하여 혁신적이고 맛있는 비건 간편식을 지속적으로 개발해왔습니다.
          </p>
        </div>

        {/* Image Right */}
        <div
          className="order-1 md:order-2"
          style={{
            aspectRatio: '4/3',
            background: 'var(--palette-mint)',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}brand-section-2.jpg`}
            alt="비건 전문 기업"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Section 3 - Philosophy */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-0"
        style={{ background: 'var(--cream)' }}
      >
        {/* Column 1 */}
        <div className="p-8 md:p-10">
          <div
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            01
          </div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              marginBottom: '12px',
            }}
          >
            지속가능한 식문화
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.7,
            }}
          >
            지구 환경의 지속가능성을 응원하고, 환경 보호에 대한 작은 노력과 변화를 적극적으로 지지합니다.
          </p>
        </div>

        {/* Column 2 */}
        <div className="p-8 md:p-10">
          <div
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            02
          </div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              marginBottom: '12px',
            }}
          >
            품질과 신선함
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.7,
            }}
          >
            콜드체인 유통 시스템을 통해 공급망 전 과정에서 신선도와 안전성을 높여 최상의 품질을 유지합니다.
          </p>
        </div>

        {/* Column 3 */}
        <div className="p-8 md:p-10">
          <div
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            03
          </div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              marginBottom: '12px',
            }}
          >
            혁신적인 연구
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.7,
            }}
          >
            자체 개발한 비건 가공육, 치즈 및 다양한 식재료를 사용하여 혁신적이고 맛있는 비건 간편식을 개발합니다.
          </p>
        </div>
      </div>

      {/* Section 4 - Quote */}
      <div
        className="px-4 md:px-8 lg:px-16 py-16 md:py-20"
        style={{
          textAlign: 'center',
          background: 'var(--cream)',
        }}
      >
        <p
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: 'var(--palette-text)',
            lineHeight: 1.8,
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          "함께하여 건강과 지구를 위한 긍정적인 변화를 이끌어내는 데 기여해주시면 감사하겠습니다."
        </p>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--warm-gray)',
            marginTop: '20px',
          }}
        >
          - SLUNCH FACTORY
        </p>
      </div>

      {/* Section 5 - Stats Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ background: 'var(--cream)' }}
      >
        {[
          { label: '설립연도', value: '2012' },
          { label: '누적 고객', value: '50,000+' },
          { label: '메뉴 종류', value: '100+' },
          { label: '전국 매장', value: '12' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-8 md:p-10"
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--palette-text)',
                marginBottom: '6px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--warm-gray)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Spacing */}
      <div style={{ height: '60px' }} />
    </div>
  );
};
