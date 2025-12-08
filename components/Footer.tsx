import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#292624] text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* 상단 섹션 - 가로로 퍼진 레이아웃 */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="flex items-start gap-8">
          {/* 로고 */}
          <div className="w-40 flex-shrink-0">
            <img 
              src={`${import.meta.env.BASE_URL}logo_footer.png`}
              alt="SLUNCH FACTORY" 
              className="h-8"
              style={{ filter: 'brightness(0) saturate(100%) invert(83%) sepia(47%) saturate(370%) hue-rotate(11deg) brightness(97%) contrast(89%)' }}
            />
          </div>
          
          {/* 링크 그룹들 */}
          <div className="flex gap-16 flex-1">
            {/* 정책 */}
            <div className="space-y-1">
              <Link to="/terms" className="block text-[11px] text-stone-400 hover:text-white">Terms and Conditions</Link>
              <Link to="/privacy" className="block text-[11px] text-stone-400 hover:text-white">Privacy Policy</Link>
              <Link to="/contact" className="block text-[11px] text-stone-400 hover:text-white">Customer Service</Link>
            </div>
            
            {/* 정보 */}
            <div className="space-y-1">
              <Link to="/brand" className="block text-[11px] text-stone-400 hover:text-white">About Us</Link>
              <Link to="/contact" className="block text-[11px] text-stone-400 hover:text-white">Contact</Link>
            </div>
            
            {/* 소셜 */}
            <div>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[11px] text-stone-400 hover:text-white">Instagram</a>
            </div>
            
            {/* 서포트 */}
            <div>
              <p className="text-[11px] text-stone-300 font-medium mb-1">SUPPORT</p>
              <p className="text-[11px] text-stone-500 leading-snug">We are always open to any form of collaboration.</p>
              <p className="text-[11px] text-stone-500 mb-2">Feel free to Contact us!</p>
              <a href="mailto:slunch@slunch.co.kr" className="text-[11px] text-stone-400 hover:text-white underline">slunch@slunch.co.kr</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 하단 회사 정보 - 한 줄로 */}
      <div className="border-t border-stone-700">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <p className="text-[10px] text-stone-600 leading-relaxed">
            대표자 | 이현아 · 상호명 | 주식회사 슬런치팩토리 · 사업자번호 | 288-86-02863 · 통신판매업신고번호 | 제2023-경기부천-0868호 · md@slunch.co.kr · 주소 | 경기 부천시 소사로160번길 23-8 · 고객센터 | 032-224-6525 · *유선 상담을 진행하지 않습니다. 카카오톡 채널로 문의해 주세요.
          </p>
        </div>
      </div>
      
      {/* 맨 위로 버튼 - 리모컨 스타일 */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};
