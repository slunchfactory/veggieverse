import React from 'react';
import { Check } from 'lucide-react';
import { ExclusionCategory, EXCLUSION_OPTIONS, SAMPLE_MENUS } from './types';

interface SidebarFilterProps {
  excluded: ExclusionCategory[];
  onExcludedChange: (excluded: ExclusionCategory[]) => void;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  excluded,
  onExcludedChange,
}) => {
  const toggleExclusion = (id: ExclusionCategory) => {
    if (excluded.includes(id)) {
      onExcludedChange(excluded.filter((e) => e !== id));
    } else {
      onExcludedChange([...excluded, id]);
    }
  };

  // 숨겨진 메뉴 개수 계산
  const hiddenMenuCount = SAMPLE_MENUS.filter((menu) =>
    menu.excludeTags.some((tag) => excluded.includes(tag))
  ).length;

  return (
    <aside
      style={{
        width: '260px',
        flexShrink: 0,
        position: 'sticky',
        top: '80px', // 헤더 높이
        alignSelf: 'flex-start',
        height: 'fit-content',
        padding: '24px',
        background: '#fafafa',
        borderRight: '1px solid #eee',
      }}
    >
      {/* Header */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '18px' }}>🚫</span>
        제외할 재료
      </h3>

      {/* Filter Options - 체크박스 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {EXCLUSION_OPTIONS.map((option) => {
          const isExcluded = excluded.includes(option.id);
          return (
            <label
              key={option.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '8px 12px',
                background: isExcluded ? '#fff' : 'transparent',
                border: isExcluded ? '1px solid #000' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {/* Custom Checkbox */}
              <div
                onClick={() => toggleExclusion(option.id)}
                style={{
                  width: '22px',
                  height: '22px',
                  border: isExcluded ? '2px solid #000' : '2px solid #ccc',
                  background: isExcluded ? '#000' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                {isExcluded && <Check size={14} color="#fff" strokeWidth={3} />}
              </div>

              <span
                style={{
                  fontSize: '15px',
                  fontWeight: isExcluded ? 500 : 400,
                  color: isExcluded ? '#000' : '#333',
                }}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: '#ddd',
          margin: '24px 0',
        }}
      />

      {/* Status */}
      {excluded.length > 0 ? (
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              fontSize: '13px',
              color: '#e53935',
              fontWeight: 500,
              marginBottom: '4px',
            }}
          >
            ✓ {excluded.map((e) => EXCLUSION_OPTIONS.find((o) => o.id === e)?.label).join(', ')} 제외 중
          </p>
          <p style={{ fontSize: '12px', color: '#888' }}>
            {hiddenMenuCount}개 메뉴 숨김
          </p>
        </div>
      ) : (
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
          제외할 재료를 선택하세요
        </p>
      )}

      {/* Clear Button */}
      {excluded.length > 0 && (
        <button
          onClick={() => onExcludedChange([])}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '13px',
            border: '1px solid #ddd',
            background: '#fff',
            color: '#666',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          전체 해제
        </button>
      )}
    </aside>
  );
};

export default SidebarFilter;
