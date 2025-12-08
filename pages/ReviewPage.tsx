import React, { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

// 샘플 리뷰 데이터
const REVIEWS = [
  {
    id: 2,
    productInfo: '',
    title: '리뷰2',
    isHit: true,
    author: 'SLUNCH FACTORY',
    date: '2023-12-01 19:04:12',
    views: 302,
    rating: 4,
  },
  {
    id: 1,
    productInfo: '',
    title: '리뷰리뷰',
    isHit: true,
    author: 'SLUNCH FACTORY',
    date: '2023-12-01 18:54:48',
    views: 258,
    rating: 5,
  },
];

export const ReviewPage: React.FC = () => {
  const [searchType, setSearchType] = useState('일주일');
  const [searchField, setSearchField] = useState('제목');
  const [searchQuery, setSearchQuery] = useState('');

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-red-500 text-red-500' : 'fill-stone-200 text-stone-200'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* 페이지 타이틀 */}
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-stone-800">제품 후기</h1>
      </div>
      
      {/* 테이블 */}
      <div className="max-w-[1200px] mx-auto px-8 pb-16">
        {/* 테이블 헤더 */}
        <div className="border-t-2 border-stone-800">
          <div className="grid grid-cols-12 py-4 border-b border-stone-200 text-sm font-semibold text-stone-600">
            <div className="col-span-1 text-center">번호</div>
            <div className="col-span-2 text-center">상품정보</div>
            <div className="col-span-4 text-center">제목</div>
            <div className="col-span-2 text-center">작성자</div>
            <div className="col-span-1 text-center">작성일</div>
            <div className="col-span-1 text-center">조회</div>
            <div className="col-span-1 text-center">평점</div>
          </div>
          
          {/* 테이블 바디 */}
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className="grid grid-cols-12 py-4 border-b border-stone-200 text-sm hover:bg-stone-50 cursor-pointer items-center"
            >
              <div className="col-span-1 text-center text-stone-500">{review.id}</div>
              <div className="col-span-2 text-center text-stone-500">{review.productInfo || '-'}</div>
              <div className="col-span-4 text-center text-stone-800 hover:text-black flex items-center justify-center gap-2">
                {review.title}
                {review.isHit && (
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded">HIT</span>
                )}
              </div>
              <div className="col-span-2 text-center text-stone-500">{review.author}</div>
              <div className="col-span-1 text-center text-stone-500 text-xs">{review.date.split(' ')[0]}<br/>{review.date.split(' ')[1]}</div>
              <div className="col-span-1 text-center text-stone-500">{review.views}</div>
              <div className="col-span-1 flex justify-center">{renderStars(review.rating)}</div>
            </div>
          ))}
        </div>
        
        {/* 글쓰기 버튼 */}
        <div className="flex justify-end mt-4">
          <button className="px-6 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-stone-800 transition-colors">
            글쓰기
          </button>
        </div>
        
        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="text-stone-400 hover:text-black">{'<'}</button>
          <button className="w-8 h-8 bg-black text-white rounded-full text-sm">1</button>
          <button className="text-stone-400 hover:text-black">{'>'}</button>
        </div>
        
        {/* 검색 바 */}
        <div className="flex justify-center items-center gap-2 mt-8">
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
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded text-sm w-64 focus:outline-none focus:border-stone-500"
            placeholder="검색어를 입력하세요"
          />
          
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

