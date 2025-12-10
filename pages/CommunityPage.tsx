import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// 서브메뉴 항목
const SUB_MENUS = [
  { name: '공지사항', path: '/community/notice' },
  { name: '문의하기', path: '/community/inquiry' },
  { name: '자주하는 질문', path: '/community/faq' },
  { name: '제품 후기', path: '/community/review' },
];

// 샘플 공지사항 데이터
const NOTICES: Array<{
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}> = [];

export const CommunityPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('공지사항');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [searchType, setSearchType] = useState('일주일');
  const [searchField, setSearchField] = useState('제목');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* 서브 메뉴 드롭다운 */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40">
        {showSubMenu && (
          <div className="bg-white shadow-lg rounded-lg py-2 min-w-[150px]">
            {SUB_MENUS.map((menu) => (
              <button
                key={menu.path}
                onClick={() => {
                  setActiveMenu(menu.name);
                  setShowSubMenu(false);
                }}
                className={`block w-full px-4 py-2 text-sm text-left hover:bg-stone-50 ${
                  activeMenu === menu.name ? 'text-black font-semibold' : 'text-stone-600'
                }`}
              >
                {menu.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 페이지 타이틀 */}
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-stone-800">{activeMenu}</h1>
      </div>
      
      {/* 테이블 */}
      <div className="page-container pb-16">
        {/* 테이블 헤더 */}
        <div className="border-t-2 border-stone-800">
          <div className="grid grid-cols-12 py-4 border-b border-stone-200 text-sm font-semibold text-stone-600">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-7 text-center">제목</div>
            <div className="col-span-1 text-center">작성자</div>
            <div className="col-span-2 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
          </div>
          
          {/* 테이블 바디 */}
          {NOTICES.length > 0 ? (
            NOTICES.map((notice) => (
              <div 
                key={notice.id}
                className="grid grid-cols-12 py-4 border-b border-stone-200 text-sm hover:bg-stone-50 cursor-pointer"
              >
                <div className="col-span-1 text-center text-stone-500">{notice.id}</div>
                <div className="col-span-7 text-center text-stone-800 hover:text-black">
                  {notice.title}
                </div>
                <div className="col-span-1 text-center text-stone-500">{notice.author}</div>
                <div className="col-span-2 text-center text-stone-500">{notice.date}</div>
                <div className="col-span-1 text-center text-stone-500">{notice.views}</div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-stone-500">
              검색결과가 없습니다.
            </div>
          )}
        </div>
        
        {/* 검색 바 */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {/* 기간 선택 */}
          <div className="relative">
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-stone-300 rounded text-sm text-stone-600 bg-white focus:outline-none focus:border-stone-500"
            >
              <option>일주일</option>
              <option>한달</option>
              <option>전체</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
          
          {/* 검색 필드 선택 */}
          <div className="relative">
            <select 
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-stone-300 rounded text-sm text-stone-600 bg-white focus:outline-none focus:border-stone-500"
            >
              <option>제목</option>
              <option>내용</option>
              <option>작성자</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
          
          {/* 검색어 입력 */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded text-sm w-64 focus:outline-none focus:border-stone-500"
            placeholder="검색어를 입력하세요"
          />
          
          {/* 검색 버튼 */}
          <button className="px-4 py-2 border border-stone-300 rounded text-sm text-stone-600 hover:bg-stone-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};





