import React, { useRef, useEffect, useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

interface TopControlBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  // Filter (optional)
  showFilter?: boolean;
  filterCount?: number;
  onFilterClick?: () => void;
  // Sort (optional)
  showSort?: boolean;
  sortOptions?: SortOption[];
  currentSort?: string;
  onSortChange?: (value: string) => void;
}

export const TopControlBar: React.FC<TopControlBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  showFilter = false,
  filterCount = 0,
  onFilterClick,
  showSort = false,
  sortOptions = [],
  currentSort,
  onSortChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // 활성 탭이 보이도록 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const currentSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label || '정렬';

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--header-area-h, 72px)',
        left: 0,
        right: 0,
        zIndex: 45,
        background: '#FFFFFF',
        borderBottom: '1px solid #000',
      }}
    >
      <div
        className="px-5 md:px-8 lg:px-14"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '48px',
          maxWidth: '1400px',
          margin: '0 auto',
          overflow: 'visible',
        }}
      >
        {/* Left: Category Tabs (Horizontal Scroll) */}
        <div
          ref={scrollRef}
          className="no-scrollbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            overflowX: 'auto',
            overflowY: 'visible',
            flex: 1,
            marginRight: '16px',
            height: '100%',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '0',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '48px',
                color: activeTab === tab.id ? '#000' : '#666',
                textDecoration: activeTab === tab.id ? 'underline' : 'none',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease',
                flexShrink: 0,
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span style={{ marginLeft: '4px', color: '#999', fontSize: '12px' }}>
                  ({tab.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Filter & Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          {/* Filter Button */}
          {showFilter && (
            <button
              onClick={onFilterClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                padding: '8px 0',
                fontSize: '13px',
                fontWeight: 400,
                color: '#666',
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={16} strokeWidth={1} />
              <span>Filter</span>
              {filterCount > 0 && (
                <span
                  style={{
                    minWidth: '18px',
                    height: '18px',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '50%',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {filterCount}
                </span>
              )}
            </button>
          )}

          {/* Sort Dropdown */}
          {showSort && sortOptions.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  padding: '8px 0',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#666',
                  cursor: 'pointer',
                }}
              >
                <span>{currentSortLabel}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={1}
                  style={{
                    transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {isSortOpen && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      minWidth: '140px',
                      background: '#FFFFFF',
                      border: '1px solid #000',
                      zIndex: 20,
                    }}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange?.(option.value);
                          setIsSortOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 14px',
                          fontSize: '13px',
                          fontWeight: 400,
                          color: currentSort === option.value ? '#000' : '#666',
                          background: currentSort === option.value ? '#F5F5F5' : 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #E0E0E0',
                          cursor: 'pointer',
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
