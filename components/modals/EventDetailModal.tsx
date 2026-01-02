import React from 'react';
import { X, Calendar, Gift, ChevronRight } from 'lucide-react';

interface EventInfo {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  reward?: string;
  condition?: string;
}

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: EventInfo;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!isOpen || !event) return null;

  const getStatusText = (status: EventInfo['status']) => {
    switch (status) {
      case 'ongoing':
        return '진행중';
      case 'upcoming':
        return '예정';
      case 'ended':
        return '종료';
    }
  };

  const getStatusColor = (status: EventInfo['status']) => {
    switch (status) {
      case 'ongoing':
        return '#3fa945';
      case 'upcoming':
        return '#6B6B6B';
      case 'ended':
        return '#999';
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
          maxWidth: '480px',
          maxHeight: '90vh',
          background: '#FFFFFF',
          border: '1px solid #000',
          borderRadius: '16px',
          position: 'relative',
          margin: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
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
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #000',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: 0,
            zIndex: 10,
          }}
          aria-label="닫기"
        >
          <X size={16} strokeWidth={1} color="#000" />
        </button>

        {/* 이벤트 이미지 */}
        <div
          style={{
            width: '100%',
            height: '200px',
            background: '#F5F5F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #E0E0E0',
            flexShrink: 0,
          }}
        >
          {event.thumbnail ? (
            <img
              src={event.thumbnail}
              alt={event.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Gift size={48} strokeWidth={1} color="#999" />
          )}
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* 상태 뱃지 */}
          <div style={{ marginBottom: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 400,
                color: getStatusColor(event.status),
                border: `1px solid ${getStatusColor(event.status)}`,
                borderRadius: '4px',
              }}
            >
              {getStatusText(event.status)}
            </span>
          </div>

          {/* 제목 */}
          <h2 style={{
            fontSize: '18px',
            fontWeight: 400,
            color: '#000',
            marginBottom: '12px',
            lineHeight: '1.4',
          }}>
            {event.title}
          </h2>

          {/* 기간 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: 400,
              color: '#6B6B6B',
            }}
          >
            <Calendar size={14} strokeWidth={1} />
            {event.startDate} ~ {event.endDate}
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
              color: '#333',
              lineHeight: '1.6',
            }}>
              {event.description}
            </p>
          </div>

          {/* 혜택 */}
          {event.reward && (
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 400,
                color: '#6B6B6B',
                marginBottom: '8px',
              }}>
                혜택
              </h3>
              <p style={{
                fontSize: '15px',
                fontWeight: 400,
                color: '#000',
              }}>
                {event.reward}
              </p>
            </div>
          )}

          {/* 참여 조건 */}
          {event.condition && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 400,
                color: '#6B6B6B',
                marginBottom: '8px',
              }}>
                참여 조건
              </h3>
              <p style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#333',
                lineHeight: '1.5',
              }}>
                {event.condition}
              </p>
            </div>
          )}

          {/* 액션 버튼 */}
          {event.status === 'ongoing' && (
            <button
              onClick={() => {
                // 이벤트 참여 로직
                onClose();
              }}
              style={{
                width: '100%',
                padding: '14px',
                background: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              이벤트 참여하기
              <ChevronRight size={16} strokeWidth={1} />
            </button>
          )}

          {event.status === 'ended' && (
            <div
              style={{
                width: '100%',
                padding: '14px',
                background: '#F5F5F5',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#999',
                textAlign: 'center',
              }}
            >
              종료된 이벤트입니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
