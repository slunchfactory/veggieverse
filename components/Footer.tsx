import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

interface FooterProps {
  scrollButtonZIndex?: number;
}

export const Footer: React.FC<FooterProps> = ({ scrollButtonZIndex = 80 }) => {
  return (
    <footer className="bg-stone-50 text-stone-900 overflow-x-hidden">
      {/* 상단 섹션 - 6개 컬럼 레이아웃 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* ABOUT */}
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-wider mb-3">ABOUT</p>
            <Link to="/brand" className="block text-xs text-stone-700 hover:text-stone-900 underline">OUR STORY</Link>
            <Link to="/store" className="block text-xs text-stone-700 hover:text-stone-900 underline">OUR STORE</Link>
          </div>
          
          {/* PAPER */}
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-wider mb-3">PAPER</p>
            <Link to="/newsletter" className="block text-xs text-stone-700 hover:text-stone-900 underline">NEWSLETTER</Link>
          </div>
          
          {/* CONTACT */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">CONTACT</p>
            <div className="mb-2">
              <p className="text-xs text-stone-700 underline mb-0">일반문의</p>
              <a href="mailto:slunch@slunch.co.kr" className="text-xs text-stone-600 hover:text-stone-900 leading-tight block">slunch@slunch.co.kr</a>
            </div>
            <div className="mb-2">
              <p className="text-xs text-stone-700 underline mb-0">B2B</p>
              <a href="mailto:export@slunch.co.kr" className="text-xs text-stone-600 hover:text-stone-900 leading-tight block">export@slunch.co.kr</a>
            </div>
            <div>
              <p className="text-xs text-stone-700 underline mb-0">프레스 문의</p>
              <a href="mailto:design@slunch.co.kr" className="text-xs text-stone-600 hover:text-stone-900 leading-tight block">design@slunch.co.kr</a>
            </div>
          </div>
          
          {/* SOCIAL */}
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-wider mb-3">SOCIAL</p>
            <a 
              href="https://instagram.com/slunch_factory" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-xs text-stone-700 hover:text-stone-900"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
          
          {/* BANK ACCOUNT */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider mb-3">BANK ACCOUNT</p>
            <p className="text-xs text-stone-700 leading-tight mb-0">1005-504-450570</p>
            <p className="text-xs text-stone-700 leading-tight">주식회사 슬런치팩토리</p>
          </div>
          
          {/* HELP */}
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-wider mb-3">HELP</p>
            <Link to="/contact" className="block text-xs text-stone-700 hover:text-stone-900 underline">1:1 INQUIRY</Link>
            <Link to="/faq" className="block text-xs text-stone-700 hover:text-stone-900 underline">FAQ</Link>
            <Link to="/notice" className="block text-xs text-stone-700 hover:text-stone-900 underline">NOTICE</Link>
          </div>
        </div>
      </div>
      
      {/* 하단 회사 정보 - 한 줄로 */}
      <div className="border-t border-stone-200 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-[10px] text-stone-600 leading-relaxed break-keep">
            대표자 | 이현아 · 상호명 | 주식회사 슬런치팩토리 · 사업자번호 | 288-86-02863 · 통신판매업신고번호 | 제2023-경기부천-0868호 · md@slunch.co.kr · 주소 | 경기 부천시 소사로160번길 23-8 · 고객센터 | 032-224-6525 · *유선 상담을 진행하지 않습니다. 카카오톡 채널로 문의해 주세요.
          </p>
        </div>
      </div>
      
      {/* 맨 위로 버튼 - 검은 원형 */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-11 h-11 bg-black rounded-full flex items-center justify-center hover:bg-stone-800 transition-colors shadow-lg"
        style={{ zIndex: scrollButtonZIndex }}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};
