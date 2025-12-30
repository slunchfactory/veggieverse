import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  scrollButtonZIndex?: number;
}

export const Footer: React.FC<FooterProps> = ({ scrollButtonZIndex = 80 }) => {
  const handleHover = (e: React.MouseEvent<HTMLElement>, isEnter: boolean) => {
    e.currentTarget.style.textDecoration = isEnter ? 'underline' : 'none';
    if (isEnter) e.currentTarget.style.textUnderlineOffset = '4px';
  };

  return (
    <footer className="bg-black text-white w-full">
      {/* === MOBILE FOOTER (Visible only < 768px) === */}
      <div className="block md:hidden px-5 py-10">
        {/* Mobile 2-Column Grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 mb-10">
          {/* Column 1: ABOUT */}
          <div>
            <Link 
              to="/about"
              className="block text-[11px] font-bold tracking-widest uppercase mb-3 text-white"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              ABOUT
            </Link>
            <Link 
              to="/about?section=slow-and-lunch" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Slow and Lunch
            </Link>
            <Link 
              to="/about?section=branch" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Branch
            </Link>
            <Link 
              to="/about?section=b2b-vtech" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              B2B & V-tech
            </Link>
          </div>

          {/* Column 2: NEWSLETTER */}
          <div>
            <Link 
              to="/newsletter"
              className="block text-[11px] font-bold tracking-widest uppercase mb-3 text-white"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              NEWSLETTER
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              슬런치 에디터가 발행하는 아티클
            </p>
          </div>

          {/* Column 3: CONTACT */}
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3 text-white">CONTACT</p>
            <a 
              href="mailto:slunch@slunch.co.kr" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              일반문의 slunch@slunch.co.kr
            </a>
            <a 
              href="mailto:export@slunch.co.kr" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              B2B export@slunch.co.kr
            </a>
          </div>

          {/* Column 4: SOCIAL */}
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3 text-white">SOCIAL</p>
            <a 
              href="https://instagram.com/slunch_factory" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Instagram
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Youtube
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-[13px] text-gray-400 leading-relaxed mb-1"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              Linked In
            </a>
          </div>

          {/* Column 5: BANK */}
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3 text-white">BANK</p>
            <p className="text-[14px] text-white font-mono mb-1">
              우리은행 1005-504-450570
            </p>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              (주)슬런치팩토리
            </p>
          </div>

          {/* Column 6: CS */}
          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3 text-white">CS</p>
            <p className="text-[14px] text-white font-mono mb-1">
              032-224-6525
            </p>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              카카오톡 채널 문의
            </p>
          </div>
        </div>

        {/* Mobile Copyright Section */}
        <p 
          className="text-[10px] text-gray-500 leading-relaxed text-left break-keep"
          style={{ wordBreak: 'keep-all' }}
        >
          (주)슬런치팩토리   |   대표 이현아   |   사업자번호 288-86-02863   |   통신판매업 제2023-경기부천-0868호   |   경기 부천시 소사로160번길 23-8   |   © 2024 Slunch Factory. All Rights Reserved.
        </p>
      </div>

      {/* === DESKTOP FOOTER (Visible only >= 768px) === */}
      <div className="hidden md:block w-full max-w-[1280px] mx-auto px-8 py-12">
        {/* Desktop Main Grid - 5 Columns */}
        <div className="grid grid-cols-5 gap-x-12 mb-12">
          {/* Column 1: ABOUT */}
          <div>
            <Link 
              to="/about"
              className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              ABOUT
            </Link>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about?section=slow-and-lunch" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  Slow and Lunch
                </Link>
              </li>
              <li>
                <Link 
                  to="/about?section=branch" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  Branch
                </Link>
              </li>
              <li>
                <Link 
                  to="/about?section=b2b-vtech" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  B2B & V-tech
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: NEWSLETTER */}
          <div>
            <Link 
              to="/newsletter"
              className="block text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              NEWSLETTER
            </Link>
            <p className="text-[13px] text-gray-400 font-medium leading-[1.8]">
              슬런치 에디터가 발행하는 아티클
            </p>
          </div>

          {/* Column 3: CONTACT */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white">CONTACT</p>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:slunch@slunch.co.kr" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  일반문의 slunch@slunch.co.kr
                </a>
              </li>
              <li>
                <a 
                  href="mailto:export@slunch.co.kr" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  B2B export@slunch.co.kr
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: SOCIAL */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white">SOCIAL</p>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://instagram.com/slunch_factory" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  Youtube
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-[13px] text-gray-400 font-medium leading-[1.8] hover:text-[#BFFF00] transition-colors"
                  onMouseEnter={(e) => handleHover(e, true)}
                  onMouseLeave={(e) => handleHover(e, false)}
                >
                  Linked In
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: BANK & CS (Grouped) */}
          <div>
            <div className="mb-6">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white">BANK</p>
              <p className="text-[14px] text-white font-mono mb-1 leading-[1.8]">
                우리은행 1005-504-450570
              </p>
              <p className="text-[13px] text-gray-400 font-medium leading-[1.8]">
                (주)슬런치팩토리
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white">CS</p>
              <p className="text-[14px] text-white font-mono mb-1 leading-[1.8]">
                032-224-6525
              </p>
              <p className="text-[13px] text-gray-400 font-medium leading-[1.8]">
                카카오톡 채널 문의
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Bottom: Copyright */}
        <div className="border-t border-gray-800 pt-6 flex justify-between items-end text-[11px] text-gray-600">
          <p className="break-keep" style={{ wordBreak: 'keep-all' }}>
            (주)슬런치팩토리   |   대표 이현아   |   사업자번호 288-86-02863   |   통신판매업 제2023-경기부천-0868호   |   경기 부천시 소사로160번길 23-8
          </p>
          <p className="whitespace-nowrap ml-4">
            © 2024 Slunch Factory. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
