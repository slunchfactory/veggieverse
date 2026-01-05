import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface DietOption {
  id: string;
  title: string;
  emoji: string;
}

interface DietGridSelectProps {
  onComplete: (result: { primaryDiet: string | null; additionalRestrictions: string[] }) => void;
  onBack?: () => void;
}

// 기본 식단 유형 (하나만 선택)
const PRIMARY_DIET_OPTIONS: DietOption[] = [
  { id: 'none', title: '일반', emoji: '🍽️' },
  { id: 'vegan', title: '비건', emoji: '🥬' },
  { id: 'pescatarian', title: '페스코', emoji: '🐟' },
  { id: 'pollo', title: '폴로', emoji: '🍗' },
  { id: 'flexitarian', title: '플렉시', emoji: '🥗' },
];

// 추가 옵션 (복수 선택 가능)
const ADDITIONAL_OPTIONS: DietOption[] = [
  { id: 'gluten-free', title: '글루텐프리', emoji: '🌾' },
  { id: 'lactose-free', title: '유당프리', emoji: '🥛' },
];

export const DietGridSelect: React.FC<DietGridSelectProps> = ({ onComplete, onBack }) => {
  const [primaryDiet, setPrimaryDiet] = useState<string | null>(null);
  const [additionalRestrictions, setAdditionalRestrictions] = useState<string[]>([]);

  const handlePrimarySelect = (id: string) => {
    setPrimaryDiet(prev => prev === id ? null : id);
  };

  const handleAdditionalToggle = (id: string) => {
    setAdditionalRestrictions(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleComplete = () => {
    onComplete({
      primaryDiet: primaryDiet || 'none',
      additionalRestrictions
    });
  };

  const isComplete = primaryDiet !== null;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      padding: '24px',
    }}>
      {/* 타이틀 */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: '8px',
        marginTop: '40px',
      }}>
        평소 어떻게 먹어요?
      </h2>
      <p style={{
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        해당하는 유형을 선택해주세요
      </p>

      {/* 기본 식단 유형 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '32px',
        maxWidth: '400px',
        margin: '0 auto 32px',
      }}>
        {PRIMARY_DIET_OPTIONS.map((option) => {
          const isSelected = primaryDiet === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handlePrimarySelect(option.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 12px',
                border: isSelected ? '2px solid #000' : '1px solid #ddd',
                background: isSelected ? '#f5f5f5' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {/* 체크 표시 */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  width: '20px',
                  height: '20px',
                  background: '#000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={12} color="#fff" strokeWidth={3} />
                </div>
              )}

              <span style={{ fontSize: '32px', marginBottom: '8px' }}>
                {option.emoji}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#333',
              }}>
                {option.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 구분선 */}
      <div style={{
        borderTop: '1px solid #ddd',
        margin: '0 auto 24px',
        maxWidth: '400px',
        width: '100%',
      }} />

      {/* 추가 옵션 */}
      <p style={{
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '16px',
      }}>
        추가 옵션 (복수 선택 가능)
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '48px',
      }}>
        {ADDITIONAL_OPTIONS.map((option) => {
          const isSelected = additionalRestrictions.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => handleAdditionalToggle(option.id)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: isSelected ? '2px solid #000' : '1px solid #ddd',
                background: isSelected ? '#f5f5f5' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {/* 체크 표시 */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  width: '20px',
                  height: '20px',
                  background: '#000',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={12} color="#fff" strokeWidth={3} />
                </div>
              )}

              <span style={{ fontSize: '20px' }}>
                {option.emoji}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#333',
              }}>
                {option.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택 완료 버튼 */}
      <div style={{
        marginTop: 'auto',
        padding: '24px 0',
      }}>
        <button
          onClick={handleComplete}
          disabled={!isComplete}
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'block',
            padding: '16px 24px',
            background: isComplete ? '#000' : '#ddd',
            color: isComplete ? '#fff' : '#999',
            fontSize: '16px',
            fontWeight: 400,
            border: 'none',
            cursor: isComplete ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default DietGridSelect;
