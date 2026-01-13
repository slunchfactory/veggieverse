import React from 'react';

const AboutStoryPage: React.FC = () => {
  return (
    <div>
      {/* Hero Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #000',
      }}>
        {/* Image */}
        <div style={{
          aspectRatio: '4/3',
          background: '#E8E4DF',
          borderRight: '1px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: '14px',
        }}>
          [브랜드 이미지]
        </div>

        {/* Text */}
        <div style={{ padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}>
            Since 2019
          </p>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 400,
            lineHeight: 1.3,
            marginBottom: '24px',
          }}>
            Slow and Lunch
          </h1>
          <p style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'var(--charcoal)',
          }}>
            슬런치팩토리는 2019년 부천에서 시작했어요.
            '천천히, 제대로 만든 점심 한 끼'라는 생각으로
            Slow와 Lunch를 합쳐 슬런치라는 이름을 지었어요.
          </p>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderBottom: '1px solid #000',
      }}>
        <div style={{
          padding: '48px 32px',
          borderRight: '1px solid #000',
        }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}>
            Philosophy
          </p>
          <p style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'var(--charcoal)',
          }}>
            고기 없이도 맛있을 수 있다는 걸 보여주고 싶었어요.
            "비건이라서 맛있는 게 아니라, 맛있는데 비건인 거"
            그게 저희가 생각하는 방향이에요.
          </p>
        </div>

        <div style={{
          padding: '48px 32px',
          borderRight: '1px solid #000',
        }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}>
            Production
          </p>
          <p style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'var(--charcoal)',
          }}>
            홍대와 더현대에서 직접 만든 음식을 팔고 있어요.
            공장도 여전히 직접 운영하고요.
            재료 고르는 것부터 포장까지, 다 저희 손을 거쳐요.
          </p>
        </div>

        <div style={{ padding: '48px 32px' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}>
            Vision
          </p>
          <p style={{
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'var(--charcoal)',
          }}>
            식물성이라고 해서 특별하거나 불편하지 않았으면 해요.
            그냥 맛있는 음식. 속 편한 한 끼.
            그게 슬런치가 만들고 싶은 거예요.
          </p>
        </div>
      </div>

      {/* Full-width Image */}
      <div style={{
        height: '400px',
        background: '#D4CFC7',
        borderBottom: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--muted)',
        fontSize: '14px',
      }}>
        [공장/매장 전경 이미지]
      </div>

      {/* Tags Section */}
      <div style={{
        padding: '32px 64px',
        display: 'flex',
        gap: '16px',
        borderBottom: '1px solid #000',
      }}>
        {['#속편한', '#재료가솔직한', '#식물성', '#천천히제대로'].map((tag) => (
          <span key={tag} style={{
            padding: '8px 16px',
            border: '1px solid #000',
            fontSize: '13px',
            fontWeight: 400,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AboutStoryPage;
