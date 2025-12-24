import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

interface FooterProps {
  scrollButtonZIndex?: number;
}

export const Footer: React.FC<FooterProps> = ({ scrollButtonZIndex = 80 }) => {
  return (
    <footer 
      style={{
        background: 'var(--white)',
        padding: '60px 48px',
        borderTop: '1px solid var(--black)',
      }}
    >
      {/* 메인 영역 - 1단 가로 배치 */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '40px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}
      >
        {/* ABOUT */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            ABOUT
          </p>
          <Link 
            to="/brand" 
            className="footer-link"
            style={{
              display: 'block',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            OUR STORY
          </Link>
          <Link 
            to="/store" 
            className="footer-link"
            style={{
              display: 'block',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            OUR STORE
          </Link>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            NEWSLETTER
          </p>
          <Link 
            to="/newsletter" 
            className="footer-link"
            style={{
              display: 'block',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            NEWSLETTER
          </Link>
        </div>

        {/* HELP */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            HELP
          </p>
          <Link 
            to="/contact" 
            className="footer-link"
            style={{
              display: 'block',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            1:1 INQUIRY
          </Link>
          <Link 
            to="/faq" 
            className="footer-link"
            style={{
              display: 'block',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            FAQ
          </Link>
          <Link 
            to="/notice" 
            className="footer-link"
            style={{
              display: 'block',
              fontSize: '13px',
              color: 'var(--gray)',
              textDecoration: 'none',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            NOTICE
          </Link>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            CONTACT
          </p>
          <div style={{ marginBottom: '8px' }}>
            <p className="footer-label" style={{
              fontSize: '11px',
              color: 'var(--gray)',
              marginBottom: '2px',
            }}>
              일반문의
            </p>
            <a 
              href="mailto:slunch@slunch.co.kr" 
              className="footer-email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--black)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.textUnderlineOffset = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              slunch@slunch.co.kr
            </a>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <p className="footer-label" style={{
              fontSize: '11px',
              color: 'var(--gray)',
              marginBottom: '2px',
            }}>
              B2B
            </p>
            <a 
              href="mailto:export@slunch.co.kr" 
              className="footer-email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--black)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.textUnderlineOffset = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              export@slunch.co.kr
            </a>
          </div>
          <div>
            <p className="footer-label" style={{
              fontSize: '11px',
              color: 'var(--gray)',
              marginBottom: '2px',
            }}>
              프레스 문의
            </p>
            <a 
              href="mailto:design@slunch.co.kr" 
              className="footer-email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--black)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
                e.currentTarget.style.textUnderlineOffset = '4px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              design@slunch.co.kr
            </a>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            SOCIAL
          </p>
          <a 
            href="https://instagram.com/slunch_factory" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--black)',
              textDecoration: 'none',
              fontSize: '13px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline';
              e.currentTarget.style.textUnderlineOffset = '4px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            <Instagram className="w-4 h-4" />
            @slunchfactory
          </a>
        </div>

        {/* BANK ACCOUNT */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            BANK ACCOUNT
          </p>
          <p className="footer-bank-name" style={{
            fontSize: '11px',
            color: 'var(--gray)',
            marginBottom: '2px',
          }}>
            우리은행
          </p>
          <p className="footer-account" style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '2px',
            color: 'var(--black)',
          }}>
            1005-504-450570
          </p>
          <p className="footer-account-holder" style={{
            fontSize: '12px',
            color: 'var(--gray)',
          }}>
            주식회사 슬런치팩토리
          </p>
        </div>

        {/* CS CENTER */}
        <div className="footer-section">
          <p className="footer-title" style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '16px',
            color: 'var(--black)',
          }}>
            CS CENTER
          </p>
          <p className="footer-cs-number" style={{
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '6px',
            color: 'var(--black)',
          }}>
            032-224-6525
          </p>
          <p className="footer-cs-notice" style={{
            fontSize: '11px',
            color: 'var(--gray)',
            lineHeight: 1.5,
          }}>
            *유선 상담 미진행,<br />카카오톡 채널 문의
          </p>
        </div>
      </div>

      {/* 사업자 정보 */}
      <p className="footer-business" style={{
        fontSize: '11px',
        color: 'var(--gray)',
        lineHeight: 1.8,
        paddingTop: '24px',
        borderTop: '1px solid var(--gray-lighter)',
        marginBottom: '20px',
      }}>
        대표자 | 이현아 · 상호명 | 주식회사 슬런치팩토리 · 사업자번호 | 288-86-02863 · 통신판매업신고번호 | 제2023-경기부천-0868호 · 주소 | 경기 부천시 소사로160번길 23-8
      </p>

      {/* Copyright */}
      <p className="footer-copyright" style={{
        fontSize: '10px',
        color: 'var(--gray-light)',
        letterSpacing: '0.05em',
      }}>
        © 2024 SLUNCH FACTORY. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};
