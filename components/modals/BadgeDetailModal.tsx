import React from 'react';
import { X, Lock, Calendar, Award } from 'lucide-react';
import { Badge, ALL_BADGES, BadgeType } from '../../contexts/UserContext';

interface BadgeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeId?: BadgeType;
  earnedBadge?: Badge;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  isOpen,
  onClose,
  badgeId,
  earnedBadge,
}) => {
  if (!isOpen || !badgeId) return null;

  const badgeInfo = ALL_BADGES[badgeId];
  if (!badgeInfo) return null;

  const isLocked = !earnedBadge;
  const isHidden = badgeInfo.category === 'hidden';

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'activity':
        return '활동';
      case 'shopping':
        return '쇼핑';
      case 'community':
        return '커뮤니티';
      case 'hidden':
        return '히든';
      default:
        return category;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          background: '#FFFFFF',
          border: '1px solid #000',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative',
          margin: '16px',
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

        {/* 뱃지 아이콘 */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 16px',
              border: isLocked ? '1px dashed #D0D0D0' : '1px solid #000',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isLocked ? '#F9F9F9' : '#FFFFFF',
              transition: 'all 0.3s',
            }}
          >
            {isLocked ? (
              isHidden ? (
                <span style={{ fontSize: '36px', color: '#D0D0D0' }}>?</span>
              ) : (
                <Lock size={32} strokeWidth={1} color="#D0D0D0" />
              )
            ) : (
              <span style={{ fontSize: '48px' }}>{badgeInfo.icon}</span>
            )}
          </div>

          {/* 카테고리 */}
          <span
            style={{
              display: 'inline-block',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 400,
              color: isLocked ? '#999' : '#6B6B6B',
              border: `1px solid ${isLocked ? '#E0E0E0' : '#000'}`,
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          >
            {getCategoryLabel(badgeInfo.category)}
          </span>

          {/* 뱃지 이름 */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: 400,
            color: isLocked ? '#999' : '#000',
            marginBottom: '8px',
          }}>
            {isHidden && isLocked ? '???' : badgeInfo.name}
          </h2>
        </div>

        {/* 설명 */}
        <div
          style={{
            padding: '20px',
            background: '#FAFAFA',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <p style={{
            fontSize: '14px',
            fontWeight: 400,
            color: isLocked ? '#999' : '#333',
            textAlign: 'center',
            lineHeight: '1.5',
          }}>
            {isHidden && isLocked ? '특별한 조건을 달성하면 획득할 수 있는 히든 뱃지입니다.' : badgeInfo.description}
          </p>
        </div>

        {/* 획득 정보 */}
        {earnedBadge && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px',
              background: '#F0FFF0',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: 400,
              color: '#3fa945',
            }}
          >
            <Award size={16} strokeWidth={1} />
            획득 완료
            <span style={{ color: '#6B6B6B', marginLeft: '8px' }}>
              <Calendar size={14} strokeWidth={1} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              {new Date(earnedBadge.earnedAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        )}

        {/* 미획득 상태 안내 */}
        {isLocked && !isHidden && (
          <div
            style={{
              padding: '12px',
              background: '#F9F9F9',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#999',
            }}>
              아직 획득하지 않은 뱃지입니다
            </p>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px',
            marginTop: '16px',
            background: isLocked ? '#F5F5F5' : '#000',
            border: isLocked ? '1px solid #E0E0E0' : 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 400,
            color: isLocked ? '#666' : '#fff',
            cursor: 'pointer',
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default BadgeDetailModal;
