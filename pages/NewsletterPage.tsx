import React from 'react';

export const NewsletterPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-stone-800 mb-4">뉴스레터</h1>
      <p className="text-stone-600 mb-6">
        에디터가 발행하는 아티클을 순차적으로 업데이트할 예정입니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1,2,3,4].map(id => (
          <div key={id} className="border border-stone-200 rounded-lg p-4 bg-white shadow-sm">
            <div 
              className="w-full mb-3 overflow-hidden rounded"
              style={{ aspectRatio: '4/3', backgroundColor: '#e5ded8' }}
            />
            <p className="text-[10px] text-stone-500 mb-1">NEWSLETTER</p>
            <h3 className="text-sm font-semibold text-stone-800 mb-1">아티클 #{id}</h3>
            <p className="text-sm text-stone-600">곧 업데이트됩니다.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

