import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, MapPin } from 'lucide-react';
import { EVENTS, getStatusLabel, getStatusColor } from '../page';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '120px 20px',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--warm-gray)', marginBottom: '16px' }}>
            존재하지 않는 이벤트입니다.
          </p>
          <Link
            to="/event"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            이벤트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isEnded = event.status === 'ended';

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* 상단 네비게이션 */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--header-area-h, 72px)',
          left: 0,
          right: 0,
          zIndex: 45,
          background: '#FFFFFF',
          borderBottom: '1px solid var(--palette-text)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '48px',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <button
            onClick={() => navigate('/event')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              padding: 0,
            }}
          >
            <ChevronLeft size={18} />
            이벤트 목록
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px 60px' }}>
        {/* 커버 이미지 */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--border-divider)',
            overflow: 'hidden',
            borderRadius: '4px',
            position: 'relative',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}${event.thumbnail.replace('/', '')}`}
            alt={event.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isEnded ? 'grayscale(100%)' : 'none',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* 상태 뱃지 */}
          <span
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.95)',
              color: getStatusColor(event.status),
              fontSize: '12px',
              fontWeight: 400,
              border: `1px solid ${getStatusColor(event.status)}`,
            }}
          >
            {getStatusLabel(event.status)}
          </span>
          {/* 이벤트 뱃지 */}
          {event.badge && (
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                padding: '6px 12px',
                background: 'var(--palette-text)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 400,
              }}
            >
              {event.badge}
            </span>
          )}
        </div>

        {/* 이벤트 정보 */}
        <div style={{ paddingTop: '32px' }}>
          {/* 제목 */}
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 400,
              lineHeight: 1.3,
              color: 'var(--palette-text)',
              marginBottom: '12px',
            }}
          >
            {event.title}
          </h1>

          {/* 설명 */}
          <p
            style={{
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            {event.description}
          </p>

          {/* 기간 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--muted)',
              marginBottom: '32px',
            }}
          >
            <Calendar size={14} />
            <span>{event.startDate} - {event.endDate}</span>
          </div>

          {/* 구분선 */}
          <div style={{ borderTop: '1px solid rgba(26, 10, 5, 0.08)', marginBottom: '32px' }} />

          {/* 이벤트 상세 내용 (mock) */}
          <div style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: 'var(--palette-text)',
                marginBottom: '16px',
              }}
            >
              이벤트 안내
            </h2>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--charcoal)',
                lineHeight: 1.8,
              }}
            >
              <p style={{ marginBottom: '12px' }}>
                슬런치 팩토리에서 준비한 특별한 이벤트에 참여해보세요.
              </p>
              <p style={{ marginBottom: '12px' }}>
                참여 방법: 이벤트 기간 내 슬런치 스토어에서 비건 상품을 구매하시면 자동으로 응모됩니다.
              </p>
              <p>
                당첨자 발표: 이벤트 종료 후 7일 이내 개별 연락드립니다.
              </p>
            </div>
          </div>

          {/* 참여 버튼 */}
          {event.status === 'ongoing' && (
            <button
              onClick={() => alert('이벤트 참여가 완료되었습니다!')}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#fff',
                background: 'var(--palette-text)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              참여하기
            </button>
          )}

          {event.status === 'upcoming' && (
            <button
              disabled
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--muted)',
                background: 'var(--palette-bg-2)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'not-allowed',
                marginBottom: '16px',
              }}
            >
              오픈 예정
            </button>
          )}

          {event.status === 'ended' && (
            <button
              disabled
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--muted)',
                background: 'var(--palette-bg-2)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'not-allowed',
                marginBottom: '16px',
              }}
            >
              종료된 이벤트
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
