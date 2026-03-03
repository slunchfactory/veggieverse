import React, { useState } from 'react';
import { Package } from 'lucide-react';
import MyPageLayout from '../../../components/MyPageLayout';

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: '준비중' | '배송중' | '배송완료';
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-006',
    date: '2024.12.30',
    items: [{ name: '페퍼로니 피자', quantity: 1, price: 22000 }],
    total: 22000,
    status: '준비중',
  },
  {
    id: 'ORD-2024-005',
    date: '2024.12.28',
    items: [
      { name: '김치볶음밥 밀키트', quantity: 2, price: 12000 },
      { name: '볶음김치', quantity: 1, price: 12000 },
    ],
    total: 36000,
    status: '배송중',
  },
  {
    id: 'ORD-2024-004',
    date: '2024.12.25',
    items: [{ name: '시금치 뇨끼', quantity: 1, price: 18000 }],
    total: 18000,
    status: '배송완료',
  },
  {
    id: 'ORD-2024-003',
    date: '2024.12.20',
    items: [
      { name: '블루베리 타르트', quantity: 1, price: 39000 },
      { name: '피넛버터 초코바', quantity: 2, price: 12000 },
    ],
    total: 63000,
    status: '배송완료',
  },
  {
    id: 'ORD-2024-002',
    date: '2024.12.15',
    items: [{ name: '김치칼국수', quantity: 1, price: 15000 }],
    total: 15000,
    status: '배송완료',
  },
  {
    id: 'ORD-2024-001',
    date: '2024.12.10',
    items: [{ name: '슬런치 디스커버리 6팩', quantity: 1, price: 25000 }],
    total: 25000,
    status: '배송완료',
  },
];

const STATUS_TABS = ['전체', '준비중', '배송중', '배송완료'] as const;

const MyOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('전체');

  const filteredOrders = activeTab === '전체'
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter((order) => order.status === activeTab);

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '900px' }}>
        {/* 필터 탭 */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 400,
                color: activeTab === tab ? '#fff' : '#6B6B6B',
                background: activeTab === tab ? '#000' : 'transparent',
                border: `1px solid ${activeTab === tab ? '#000' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 주문 목록 */}
        {filteredOrders.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
            }}
          >
            <Package size={40} color="#D4D4D4" style={{ marginBottom: '12px' }} />
            <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
              해당 상태의 주문이 없습니다.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </MyPageLayout>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const statusColorMap = {
    '준비중': '#000000',
    '배송중': '#3fa945',
    '배송완료': '#9A9A9A',
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '4px',
        border: '1px solid rgba(0,0,0,0.08)',
        padding: '20px',
      }}
    >
      {/* 주문 헤더 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <p style={{ fontSize: '13px', fontWeight: 400, color: '#9A9A9A', marginBottom: '2px' }}>
            {order.id}
          </p>
          <p style={{ fontSize: '12px', color: '#9A9A9A' }}>
            {order.date}
          </p>
        </div>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 400,
            color: statusColorMap[order.status],
            padding: '4px 10px',
            border: `1px solid ${statusColorMap[order.status]}`,
            borderRadius: '2px',
          }}
        >
          {order.status}
        </span>
      </div>

      {/* 주문 아이템 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {order.items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>
              {item.name}
              {item.quantity > 1 && (
                <span style={{ color: '#9A9A9A', marginLeft: '6px' }}>x{item.quantity}</span>
              )}
            </p>
            <p style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>
              {(item.price * item.quantity).toLocaleString()}원
            </p>
          </div>
        ))}
      </div>

      {/* 합계 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>합계</span>
        <span style={{ fontSize: '15px', fontWeight: 400, color: '#000' }}>
          {order.total.toLocaleString()}원
        </span>
      </div>
    </div>
  );
};

export default MyOrders;
