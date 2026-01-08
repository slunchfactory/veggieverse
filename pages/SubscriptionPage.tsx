import React, { useState, useMemo } from 'react';

type DurationType = 1 | 2;

// 날짜 포맷 헬퍼 (M/DD)
const formatDateShort = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

// 한국어 날짜 포맷
const formatDateKo = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// 다음 월요일 찾기
const getNextMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 7 : 8 - dayOfWeek;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);
  return nextMonday;
};

// 날짜 배열 생성 (월~일, 7일)
const generateDateSlots = (startDate: Date, weeks: number): Date[] => {
  const slots: Date[] = [];
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * 7 + day);
      slots.push(date);
    }
  }
  return slots;
};

// 월요일 옵션들 생성 (4주치)
const generateMondayOptions = (): Date[] => {
  const options: Date[] = [];
  let current = getNextMonday();
  for (let i = 0; i < 4; i++) {
    options.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return options;
};

// Mock 이미지
const MOCK_IMAGES = {
  lunch: [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop',
  ],
  dinner: [
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop',
  ],
};

const DAY_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const SubscriptionPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<DurationType>(1);

  const mondayOptions = useMemo(() => generateMondayOptions(), []);

  const dateSlots = useMemo(() => {
    if (!startDate) return [];
    return generateDateSlots(startDate, duration);
  }, [startDate, duration]);

  const handleDateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setStartDate(new Date(value));
    } else {
      setStartDate(null);
    }
  };

  // 스타일 정의
  const styles = {
    main: {
      paddingTop: '96px',
      paddingBottom: '128px',
      paddingLeft: '24px',
      paddingRight: '24px',
      maxWidth: '1024px',
      margin: '0 auto',
      backgroundColor: '#F3F4F6',
      minHeight: '100vh',
    } as React.CSSProperties,
    title: {
      textAlign: 'center' as const,
      marginBottom: '60px',
    },
    h1: {
      fontSize: '24px',
      marginBottom: '12px',
      color: '#111827',
      fontWeight: 400,
    } as React.CSSProperties,
    subtitle: {
      fontSize: '14px',
      color: '#6B7280',
      fontWeight: 400,
    } as React.CSSProperties,
    controlSection: {
      backgroundColor: '#fff',
      border: '1px solid #000',
      padding: '24px',
      marginBottom: '60px',
    } as React.CSSProperties,
    label: {
      fontSize: '14px',
      color: '#4B5563',
      marginBottom: '12px',
      fontWeight: 400,
    } as React.CSSProperties,
    tabContainer: {
      display: 'flex',
      gap: '13px',
      marginBottom: '24px',
    } as React.CSSProperties,
    tab: (active: boolean) => ({
      flex: 1,
      padding: '12px',
      fontSize: '14px',
      border: active ? '1px solid #000' : '1px solid #D1D5DB',
      backgroundColor: active ? '#000' : '#fff',
      color: active ? '#fff' : '#374151',
      cursor: 'pointer',
      fontWeight: 400,
      transition: 'all 0.2s',
    } as React.CSSProperties),
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      backgroundColor: '#fff',
      color: '#111827',
      fontSize: '14px',
      fontWeight: 400,
      marginBottom: '24px',
    } as React.CSSProperties,
    infoBox: {
      paddingTop: '16px',
      borderTop: '1px solid #E5E7EB',
    } as React.CSSProperties,
    infoText: {
      fontSize: '12px',
      color: '#6B7280',
      marginBottom: '4px',
      fontWeight: 400,
    } as React.CSSProperties,
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #000',
    } as React.CSSProperties,
    sectionTitle: {
      fontSize: '18px',
      color: '#111827',
      fontWeight: 400,
    } as React.CSSProperties,
    weekLabel: {
      fontSize: '12px',
      color: '#6B7280',
      marginBottom: '12px',
      fontWeight: 400,
    } as React.CSSProperties,
    dayHeaderGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '1px',
      backgroundColor: '#000',
      marginBottom: '1px',
    } as React.CSSProperties,
    dayHeader: {
      backgroundColor: '#111827',
      color: '#fff',
      textAlign: 'center' as const,
      padding: '8px',
      fontSize: '12px',
      letterSpacing: '0.05em',
      fontWeight: 400,
    } as React.CSSProperties,
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '1px',
      backgroundColor: '#000',
    } as React.CSSProperties,
    cell: {
      backgroundColor: '#fff',
      padding: '12px',
      height: '180px',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
    } as React.CSSProperties,
    dateText: {
      fontSize: '13px',
      marginBottom: '8px',
      fontFamily: 'monospace',
      color: '#111827',
      fontWeight: 500,
    } as React.CSSProperties,
    imageContainer: {
      position: 'relative' as const,
      flex: 1,
      width: '100%',
    } as React.CSSProperties,
    lunchImage: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '70%',
      height: '70%',
      backgroundColor: '#F3F4F6',
      border: '1px solid #E5E7EB',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    } as React.CSSProperties,
    dinnerImage: {
      position: 'absolute' as const,
      bottom: 0,
      right: 0,
      width: '70%',
      height: '70%',
      backgroundColor: '#F9FAFB',
      borderLeft: '2px solid #fff',
      borderTop: '2px solid #fff',
      zIndex: 10,
      overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    } as React.CSSProperties,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    } as React.CSSProperties,
    cellLabel: {
      marginTop: '8px',
      fontSize: '10px',
      color: '#9CA3AF',
      textAlign: 'center' as const,
      fontWeight: 400,
    } as React.CSSProperties,
    summarySection: {
      backgroundColor: '#fff',
      border: '1px solid #000',
      padding: '24px',
    } as React.CSSProperties,
    summaryContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as React.CSSProperties,
    summaryText: {
      fontSize: '14px',
      color: '#6B7280',
      marginBottom: '4px',
      fontWeight: 400,
    } as React.CSSProperties,
    summaryTotal: {
      fontSize: '20px',
      color: '#111827',
      fontWeight: 400,
    } as React.CSSProperties,
    ctaButton: {
      padding: '12px 32px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      fontSize: '14px',
      fontWeight: 400,
      cursor: 'pointer',
    } as React.CSSProperties,
    emptyState: {
      backgroundColor: '#fff',
      border: '1px solid #000',
      padding: '48px',
      textAlign: 'center' as const,
    } as React.CSSProperties,
  };

  return (
    <main style={styles.main}>
      {/* Page Title */}
      <div style={styles.title}>
        <h1 style={styles.h1}>SLUNCH 구독</h1>
        <p style={styles.subtitle}>건강한 식단을 정기적으로 받아보세요</p>
      </div>

      {/* Controls Section */}
      <section style={styles.controlSection}>
        {/* Duration Tabs */}
        <div>
          <p style={styles.label}>구독 기간 선택</p>
          <div style={styles.tabContainer}>
            <button
              onClick={() => setDuration(1)}
              style={styles.tab(duration === 1)}
            >
              1주 체험
            </button>
            <button
              onClick={() => setDuration(2)}
              style={styles.tab(duration === 2)}
            >
              2주 정기배송
            </button>
          </div>
        </div>

        {/* Start Date Picker */}
        <div>
          <p style={styles.label}>식단 시작일 선택 (월요일부터 시작)</p>
          <select
            value={startDate?.toISOString() || ''}
            onChange={handleDateSelect}
            style={styles.select}
          >
            <option value="">시작일을 선택해주세요</option>
            {mondayOptions.map((date) => (
              <option key={date.toISOString()} value={date.toISOString()}>
                {formatDateKo(date)} (월요일)
              </option>
            ))}
          </select>
        </div>

        {/* Info Text */}
        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            식단은 매주 <span style={{ color: '#111827' }}>월요일</span>부터 받아보실 수 있습니다.
          </p>
          {startDate && (
            <p style={{ ...styles.infoText, color: '#374151' }}>
              선택하신 시작일: <span style={{ color: '#000' }}>{formatDateKo(startDate)}</span>
            </p>
          )}
        </div>
      </section>

      {/* Calendar Grid */}
      {startDate && (
        <section style={{ marginBottom: '60px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              {duration === 1 ? '1주 식단표' : '2주 식단표'}
            </h2>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 400 }}>
              하루 2식 (점심 & 저녁)
            </span>
          </div>

          {/* Week 1 */}
          <div style={{ marginBottom: '32px' }}>
            <p style={styles.weekLabel}>Week 1</p>

            {/* Day Headers */}
            <div style={styles.dayHeaderGrid}>
              {DAY_HEADERS.map((day) => (
                <div key={day} style={styles.dayHeader}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Cells */}
            <div style={styles.calendarGrid}>
              {dateSlots.slice(0, 7).map((date, index) => (
                <div key={date.toISOString()} style={styles.cell}>
                  <span style={styles.dateText}>{formatDateShort(date)}</span>

                  <div style={styles.imageContainer}>
                    <div style={styles.lunchImage}>
                      <img
                        src={MOCK_IMAGES.lunch[index % 7]}
                        alt="점심"
                        style={styles.img}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div style={styles.dinnerImage}>
                      <img
                        src={MOCK_IMAGES.dinner[index % 7]}
                        alt="저녁"
                        style={styles.img}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.cellLabel}>점심 & 저녁</div>
                </div>
              ))}
            </div>
          </div>

          {/* Week 2 */}
          {duration === 2 && (
            <div>
              <p style={styles.weekLabel}>Week 2</p>

              <div style={styles.dayHeaderGrid}>
                {DAY_HEADERS.map((day) => (
                  <div key={`w2-${day}`} style={styles.dayHeader}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={styles.calendarGrid}>
                {dateSlots.slice(7, 14).map((date, index) => (
                  <div key={date.toISOString()} style={styles.cell}>
                    <span style={styles.dateText}>{formatDateShort(date)}</span>

                    <div style={styles.imageContainer}>
                      <div style={styles.lunchImage}>
                        <img
                          src={MOCK_IMAGES.lunch[index % 7]}
                          alt="점심"
                          style={styles.img}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div style={styles.dinnerImage}>
                        <img
                          src={MOCK_IMAGES.dinner[index % 7]}
                          alt="저녁"
                          style={styles.img}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>

                    <div style={styles.cellLabel}>점심 & 저녁</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Summary & CTA */}
      {startDate && (
        <section style={styles.summarySection}>
          <div style={styles.summaryContent}>
            <div>
              <p style={styles.summaryText}>
                {duration === 1 ? '1주' : '2주'} 구독 ({duration * 7}일 × 2식)
              </p>
              <p style={styles.summaryTotal}>총 {duration * 14}끼</p>
            </div>
            <button style={styles.ctaButton}>구독 시작하기</button>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!startDate && (
        <div style={styles.emptyState}>
          <p style={{ color: '#6B7280', marginBottom: '8px', fontWeight: 400 }}>
            시작일을 선택하면 식단표가 표시됩니다
          </p>
          <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 400 }}>
            위에서 구독 기간과 시작일을 먼저 선택해주세요
          </p>
        </div>
      )}
    </main>
  );
};

export default SubscriptionPage;
