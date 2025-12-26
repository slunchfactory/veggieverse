import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  scrollButtonZIndex?: number;
}

// 공통 스타일 - 다크 배경용
const linkStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#9A9A9A',
  textDecoration: 'none',
  marginBottom: '2px',
  cursor: 'pointer',
};

const titleStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  marginBottom: '10px',
  color: '#FFFFFF',
  textDecoration: 'none',
};

export const Footer: React.FC<FooterProps> = ({ scrollButtonZIndex = 80 }) => {
  const handleHover = (e: React.MouseEvent<HTMLElement>, isEnter: boolean) => {
    e.currentTarget.style.textDecoration = isEnter ? 'underline' : 'none';
    if (isEnter) e.currentTarget.style.textUnderlineOffset = '4px';
  };

  return (
    <footer 
      className="site-footer"
      style={{
        background: 'var(--black)',
        padding: '32px 48px 24px 48px',
      }}
    >
      {/* 메인 영역 - 좌측 정렬 */}
      <div 
        className="footer-content"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '80px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}
      >
        {/* ABOUT */}
        <div className="footer-section">
          <Link 
            to="/about"
            style={{ ...titleStyle, cursor: 'pointer' } as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            ABOUT
          </Link>
          <Link 
            to="/about?section=slow-and-lunch" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Slow and Lunch
          </Link>
          <Link 
            to="/about?section=branch" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Branch
          </Link>
          <Link 
            to="/about?section=b2b-vtech" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            B2B & V-tech
          </Link>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-section">
          <Link 
            to="/newsletter"
            style={{ ...titleStyle, cursor: 'pointer' } as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            NEWSLETTER
          </Link>
          <p style={{ fontSize: '12px', color: '#9A9A9A', marginBottom: '2px' }}>
            슬런치 에디터가 발행하는 아티클
          </p>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <p style={titleStyle as React.CSSProperties}>CONTACT</p>
          <a 
            href="mailto:slunch@slunch.co.kr" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            일반문의 slunch@slunch.co.kr
          </a>
          <a 
            href="mailto:export@slunch.co.kr" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            B2B export@slunch.co.kr
          </a>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <p style={titleStyle as React.CSSProperties}>SOCIAL</p>
          <a 
            href="https://instagram.com/slunch_factory" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Instagram
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Youtube
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={linkStyle as React.CSSProperties}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Linked In
          </a>
        </div>

        {/* BANK */}
        <div className="footer-section">
          <p style={titleStyle as React.CSSProperties}>BANK</p>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px' }}>
            우리은행 1005-504-450570
          </p>
          <p style={{ fontSize: '12px', color: '#9A9A9A' }}>
            (주)슬런치팩토리
          </p>
        </div>

        {/* CS */}
        <div className="footer-section">
          <p style={titleStyle as React.CSSProperties}>CS</p>
          <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px', color: '#FFFFFF' }}>
            032-224-6525
          </p>
          <p style={{ fontSize: '12px', color: '#9A9A9A' }}>
            카카오톡 채널 문의
          </p>
        </div>
      </div>

      {/* 사업자 정보 + Copyright - 좌측 정렬 */}
      <p style={{
        fontSize: '9.5px',
        color: '#6B6B6B',
        lineHeight: 1.6,
        textAlign: 'left',
        whiteSpace: 'pre',
      }}>
        (주)슬런치팩토리   |   대표 이현아   |   사업자번호 288-86-02863   |   통신판매업 제2023-경기부천-0868호   |   경기 부천시 소사로160번길 23-8   |   © 2024 Slunch Factory. All Rights Reserved.
      </p>
    </footer>
  );
};
