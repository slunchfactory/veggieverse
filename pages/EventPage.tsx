import React, { useState } from 'react';
import { TopControlBar, TabItem } from '../components/TopControlBar';

const eventTabs: TabItem[] = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'ended', label: 'Ended' },
];

interface Event {
  id: number;
  status: 'ongoing' | 'upcoming' | 'ended';
  title: string;
  description: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  badge?: string;
}

const EVENTS: Event[] = [
  {
    id: 1,
    status: 'ongoing',
    title: 'Winter Vegan Festival',
    description: '겨울을 따뜻하게 채워줄 비건 요리 축제',
    thumbnail: '/event-1.jpg',
    startDate: '2024.12.01',
    endDate: '2024.12.31',
    badge: 'HOT',
  },
  {
    id: 2,
    status: 'ongoing',
    title: 'New Year Special',
    description: '새해 첫 주문 20% 할인',
    thumbnail: '/event-2.jpg',
    startDate: '2024.12.26',
    endDate: '2025.01.05',
  },
  {
    id: 3,
    status: 'upcoming',
    title: 'Veganuary Challenge',
    description: '1월 한 달, 비건 도전 캠페인',
    thumbnail: '/event-3.jpg',
    startDate: '2025.01.01',
    endDate: '2025.01.31',
  },
  {
    id: 4,
    status: 'ended',
    title: 'Black Friday Sale',
    description: '연중 최대 할인 이벤트',
    thumbnail: '/event-4.jpg',
    startDate: '2024.11.22',
    endDate: '2024.11.29',
  },
  {
    id: 5,
    status: 'ended',
    title: 'Recipe Contest',
    description: '나만의 비건 레시피 공모전',
    thumbnail: '/event-5.jpg',
    startDate: '2024.10.01',
    endDate: '2024.10.31',
  },
];

const getStatusLabel = (status: Event['status']) => {
  switch (status) {
    case 'ongoing':
      return '진행중';
    case 'upcoming':
      return '예정';
    case 'ended':
      return '종료';
  }
};

const getStatusColor = (status: Event['status']) => {
  switch (status) {
    case 'ongoing':
      return '#000000';
    case 'upcoming':
      return '#3fa945';
    case 'ended':
      return '#9A9A9A';
  }
};

const EventPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredEvents = selectedTab === 'all'
    ? EVENTS
    : EVENTS.filter((event) => event.status === selectedTab);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* TopControlBar */}
      <TopControlBar
        tabs={eventTabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {/* Event Grid */}
      <div className="px-4 md:px-8 lg:px-16 py-8 max-w-[1400px] mx-auto" style={{ paddingTop: '64px' }}>
        {filteredEvents.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '120px 0',
              color: '#6B6B6B',
              fontSize: '14px',
            }}
          >
            해당 카테고리에 이벤트가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const isEnded = event.status === 'ended';

  return (
    <div
      style={{
        background: 'var(--cream)',
        cursor: isEnded ? 'default' : 'pointer',
        opacity: isEnded ? 0.6 : 1,
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: '#E5E5E0',
          overflow: 'hidden',
          borderRadius: '4px',
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
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Badge */}
        {event.badge && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              padding: '4px 8px',
              background: '#000',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 400,
            }}
          >
            {event.badge}
          </span>
        )}

        {/* Status Badge */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 8px',
            background: 'rgba(255,255,255,0.95)',
            color: getStatusColor(event.status),
            fontSize: '11px',
            fontWeight: 400,
            border: `1px solid ${getStatusColor(event.status)}`,
          }}
        >
          {getStatusLabel(event.status)}
        </span>
      </div>

      {/* Content */}
      <div style={{ paddingTop: '16px' }}>
        {/* Title */}
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.3,
            color: '#000000',
            marginBottom: '6px',
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#6B6B6B',
            lineHeight: 1.5,
            marginBottom: '12px',
          }}
        >
          {event.description}
        </p>

        {/* Date */}
        <p
          style={{
            fontSize: '12px',
            color: '#9A9A9A',
          }}
        >
          {event.startDate} - {event.endDate}
        </p>
      </div>
    </div>
  );
};

export default EventPage;
