import React from 'react';
import { Mail, Award } from 'lucide-react';

const AboutB2B: React.FC = () => {
  return (
    <div>
      {/* Factory Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        borderBottom: '1px solid #000',
      }}>
        <div style={{
          padding: '64px',
          borderRight: '1px solid #000',
        }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            Factory
          </p>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '24px',
          }}>
            자체 생산 시설
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--charcoal)',
            lineHeight: 1.8,
            marginBottom: '16px',
          }}>
            부천에 저희 공장이 있어요.
            델리, 소스, 빵, 디저트까지 전부 여기서 만들어요.
          </p>
          <p style={{
            fontSize: '15px',
            color: 'var(--charcoal)',
            lineHeight: 1.8,
          }}>
            외주 없이 직접 만드는 이유는 간단해요.
            맛과 품질을 저희가 컨트롤하고 싶어서.
            재료 수급부터 생산, 포장까지 한 곳에서 해요.
          </p>
        </div>

        <div style={{
          background: '#E8E4DF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: '14px',
        }}>
          [공장 이미지]
        </div>
      </div>

      {/* Recipe Archive + Patents */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #000',
      }}>
        <div style={{
          padding: '48px',
          borderRight: '1px solid #000',
        }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            Archive
          </p>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 400,
            marginBottom: '16px',
          }}>
            비건 레시피 500+
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'var(--charcoal)',
            lineHeight: 1.8,
          }}>
            5년간 개발한 비건 레시피 500개 이상 보유.
            한식, 양식, 아시안, 디저트까지.
            맛없으면 안 만들어요.
          </p>
        </div>

        <div style={{ padding: '48px' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            Technology
          </p>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 400,
            marginBottom: '16px',
          }}>
            특허 기술
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>식물성 햄 제조 특허</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>식물성 단백질 텍스처링</span>
            </div>
          </div>
        </div>
      </div>

      {/* B2B Partnership */}
      <div style={{
        padding: '64px',
        borderBottom: '1px solid #000',
      }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            Partnership
          </p>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '24px',
          }}>
            B2B 파트너십
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--charcoal)',
            lineHeight: 1.8,
            marginBottom: '16px',
          }}>
            호텔, 레스토랑, 카페, 급식 등 비건 메뉴가 필요한 곳에 공급하고 있어요.
            OEM/ODM 문의도 받아요. 레시피 개발부터 생산까지 같이 할 수 있어요.
          </p>

          <a
            href="mailto:export@slunch.co.kr"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#000',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 400,
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            <Mail className="w-4 h-4" />
            B2B 문의하기
          </a>
        </div>
      </div>

      {/* Partners */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {['더현대 서울', '신세계푸드', 'CJ프레시웨이', '풀무원'].map((partner, idx) => (
          <div
            key={partner}
            style={{
              padding: '48px 32px',
              textAlign: 'center',
              borderRight: idx < 3 ? '1px solid #000' : 'none',
              borderBottom: '1px solid #000',
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              background: '#E8E4DF',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'var(--muted)',
            }}>
              Logo
            </div>
            <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>{partner}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutB2B;
