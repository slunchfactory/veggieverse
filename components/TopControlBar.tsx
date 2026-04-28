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

  const tabButtonStyle: React.CSSProperties = {
    lineHeight: '48px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--header-area-h, 72px)',
        left: 0,
        right: 0,
        zIndex: 45,
        background: 'var(--white-pure)',
        borderBottom: '1px solid var(--palette-text)',
      }}
    >
      <div
        className="px-5 md:px-8 lg:px-14"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          maxWidth: '1440px',
          margin: '0 auto',
          overflow: 'visible',
          position: 'relative',
        }}
      >
        {/* Center: Category Tabs (Horizontal Scroll) */}
        <div
          ref={scrollRef}
          className="no-scrollbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            overflowX: 'auto',
            overflowY: 'visible',
            height: '100%',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-tab={tab.id}
              className="ui-nav-tab"
              data-ui-active={activeTab === tab.id ? 'true' : 'false'}
              style={{ ...tabButtonStyle, fontSize: '14px', fontWeight: 400 }}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="ui-nav-tab__label">{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ui-nav-tab__meta">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Filter & Sort (Absolute positioned) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, position: 'absolute', right: '20px' }}>
          {/* Filter Button */}
          {showFilter && (
            <button
              type="button"
              className="ui-text-action"
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
                color: 'var(--warm-gray)',
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
                    background: 'var(--palette-text)',
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
                type="button"
                className="ui-text-action"
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
                  color: 'var(--warm-gray)',
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
                      border: '1px solid var(--palette-text)',
                      zIndex: 20,
                    }}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className="ui-text-action"
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
                          color: currentSort === option.value ? 'var(--palette-text)' : 'var(--warm-gray)',
                          background: currentSort === option.value ? 'var(--palette-bg-2)' : 'transparent',
                          border: 'none',
                          borderBottom: '1px solid var(--border-divider)',
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
