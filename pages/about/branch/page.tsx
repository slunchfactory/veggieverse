import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const AboutBranchPage: React.FC = () => {
  return (
    <div>
      {/* Hongdae Store */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--palette-text)',
      }}>
        <div style={{
          aspectRatio: '4/3',
          background: '#E8E4DF',
          borderRight: '1px solid var(--palette-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: '14px',
        }}>
          [홍대점 이미지]
        </div>

        <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            Flagship Store
          </p>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '24px',
          }}>
            홍대점
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin className="w-4 h-4" style={{ color: 'var(--warm-gray)', marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)', lineHeight: 1.6 }}>
                서울 마포구 와우산로 29길 6, 1층
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock className="w-4 h-4" style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
                11:00 - 21:00 (월요일 휴무)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone className="w-4 h-4" style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
                02-332-6525
              </span>
            </div>
          </div>

          <p style={{
            fontSize: '14px',
            color: 'var(--warm-gray)',
            lineHeight: 1.7,
            marginBottom: '24px',
          }}>
            홍대입구역 3번 출구에서 도보 7분.
            작은 골목 안에 있어요.
            테이크아웃도 되고, 안에서 먹어도 돼요.
          </p>

          <a
            href="https://naver.me/Fx3M8pKJ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              border: '1px solid var(--palette-text)',
              background: 'transparent',
              color: 'var(--palette-text)',
              fontSize: '14px',
              fontWeight: 400,
              textDecoration: 'none',
              width: 'fit-content',
            }}
          >
            네이버 지도로 보기
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* The Hyundai Store */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid var(--palette-text)',
      }}>
        <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid var(--palette-text)' }}>
          <p style={{
            fontSize: '11px',
            color: 'var(--warm-gray)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>
            Department Store
          </p>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '24px',
          }}>
            더현대 서울
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin className="w-4 h-4" style={{ color: 'var(--warm-gray)', marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)', lineHeight: 1.6 }}>
                서울 강남구 테헤란로 517, 더현대 서울 B1
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Clock className="w-4 h-4" style={{ color: 'var(--warm-gray)', flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--charcoal)' }}>
                10:30 - 20:00 (더현대 영업시간 따름)
              </span>
            </div>
          </div>

          <p style={{
            fontSize: '14px',
            color: 'var(--warm-gray)',
            lineHeight: 1.7,
          }}>
            지하 1층 푸드마켓 안에 있어요.
            바로 먹을 수 있는 델리 위주로 준비해뒀어요.
          </p>
        </div>

        <div style={{
          aspectRatio: '4/3',
          background: '#E8E4DF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: '14px',
        }}>
          [더현대점 이미지]
        </div>
      </div>

      {/* Online Store */}
      <div style={{
        padding: '64px',
        textAlign: 'center',
        borderBottom: '1px solid var(--palette-text)',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--warm-gray)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '12px',
        }}>
          Online
        </p>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 400,
          marginBottom: '16px',
        }}>
          온라인 스토어
        </h2>
        <p style={{
          fontSize: '14px',
          color: 'var(--warm-gray)',
          lineHeight: 1.7,
          marginBottom: '24px',
        }}>
          매장에 오기 어려우면 온라인으로도 주문할 수 있어요.
          냉동 배송으로 전국 어디든 보내드려요.
        </p>
        <a
          href="https://smartstore.naver.com/slunch"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'var(--palette-text)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 400,
            textDecoration: 'none',
          }}
        >
          네이버 스마트스토어
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default AboutBranchPage;
