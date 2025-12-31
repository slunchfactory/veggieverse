import React, { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_KEYWORDS = ['비건 밀키트', '두부', '샐러드', '비건 베이커리', '오트밀'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 모달 열릴 때 input 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Store 페이지로 검색어와 함께 이동
      navigate(`/store?search=${encodeURIComponent(query.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleKeywordClick = (keyword: string) => {
    handleSearch(keyword);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 16px',
          background: '#FFFFFF',
          border: '1px solid #000',
          borderRadius: '16px',
          padding: '24px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label="닫기"
        >
          <X size={20} strokeWidth={1} color="#000" />
        </button>

        {/* 헤더 */}
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: 400,
          color: '#000',
        }}>
          Search
        </h2>

        {/* 검색 폼 */}
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 48px 14px 16px',
                border: '1px solid #000',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label="검색"
            >
              <Search size={18} strokeWidth={1} color="#000" />
            </button>
          </div>
        </form>

        {/* 인기 검색어 */}
        <div style={{ marginTop: '24px' }}>
          <p style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#6B6B6B',
            marginBottom: '12px',
          }}>
            Popular Keywords
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {POPULAR_KEYWORDS.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordClick(keyword)}
                style={{
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#000',
                  background: 'transparent',
                  border: '1px solid #E5E5E5',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#000')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
