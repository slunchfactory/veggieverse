import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown } from 'lucide-react';
import MyPageLayout from '../../components/MyPageLayout';

// 주문 상태 타입
type OrderStatus = '결제완료' | '상품준비중' | '배송중' | '배송완료' | '구매확정';

// 주문 상품 타입
interface OrderItem {
  id: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  option?: string;
}

// 주문 타입
interface Order {
  id: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  trackingNumber?: string;
  canReview: boolean;
  canCancel: boolean;
}

// 샘플 주문 데이터
const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-2024122001',
    orderDate: '2024.12.20',
    status: '배송중',
    items: [
      { id: 1, productName: '볶음김치', productImage: '/veggieverse/store/thumbnails/kimchi.jpg', price: 12000, quantity: 2 },
      { id: 2, productName: '김치볶음밥', productImage: '/veggieverse/store/thumbnails/kimchi-fried-rice.jpg', price: 12000, quantity: 1, option: '매운맛' },
    ],
    totalAmount: 36000,
    shippingFee: 0,
    trackingNumber: '1234567890',
    canReview: false,
    canCancel: false,
  },
  {
    id: 'ORD-2024121501',
    orderDate: '2024.12.15',
    status: '배송완료',
    items: [
      { id: 3, productName: '시금치 뇨끼', productImage: '/veggieverse/store/thumbnails/gnocchi.jpg', price: 18000, quantity: 1 },
    ],
    totalAmount: 18000,
    shippingFee: 3000,
    canReview: true,
    canCancel: false,
  },
  {
    id: 'ORD-2024121001',
    orderDate: '2024.12.10',
    status: '구매확정',
    items: [
      { id: 4, productName: '블루베리 타르트', productImage: '/veggieverse/store/thumbnails/blueberry-tart.jpg', price: 39000, quantity: 1 },
      { id: 5, productName: '잠봉뵈르', productImage: '/veggieverse/store/thumbnails/jambon.jpg', price: 8000, quantity: 2 },
    ],
    totalAmount: 55000,
    shippingFee: 0,
    canReview: false,
    canCancel: false,
  },
  {
    id: 'ORD-2024120501',
    orderDate: '2024.12.05',
    status: '구매확정',
    items: [
      { id: 6, productName: '비건 라자냐', productImage: '/veggieverse/store/thumbnails/lasagna.jpg', price: 24000, quantity: 1 },
    ],
    totalAmount: 24000,
    shippingFee: 3000,
    canReview: false,
    canCancel: false,
  },
];

// 기간 필터 옵션
const PERIOD_OPTIONS = [
  { value: '1month', label: '최근 1개월' },
  { value: '3months', label: '최근 3개월' },
  { value: '6months', label: '최근 6개월' },
  { value: '1year', label: '최근 1년' },
];

const OrdersPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case '결제완료':
      case '상품준비중':
        return '#6B6B6B';
      case '배송중':
        return '#000000';
      case '배송완료':
      case '구매확정':
        return '#6B6B6B';
      default:
        return '#6B6B6B';
    }
  };

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '800px' }}>
        {/* 기간 필터 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <div style={{ position: 'relative' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                padding: '8px 32px 8px 12px',
                fontSize: '13px',
                fontWeight: 400,
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: '4px',
                background: 'transparent',
                appearance: 'none',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {PERIOD_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} color="#6B6B6B" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* 주문 목록 */}
          {SAMPLE_ORDERS.length > 0 ? (
            <div className="space-y-4">
              {SAMPLE_ORDERS.map((order) => (
                <div
                  key={order.id}
                  style={{ background: '#F7F4EF', borderRadius: '6px', overflow: 'hidden' }}
                >
                  {/* 주문 헤더 */}
                  <button
                    onClick={() => toggleOrderExpand(order.id)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', marginBottom: '4px' }}>
                        {order.orderDate} · {order.id}
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                        {order.items[0].productName}{order.items.length > 1 ? ` 외 ${order.items.length - 1}건` : ''}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 400, color: getStatusColor(order.status) }}>
                        {order.status}
                      </span>
                      <ChevronDown
                        size={16}
                        color="#6B6B6B"
                        style={{
                          transform: expandedOrders.includes(order.id) ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </div>
                  </button>

                  {/* 주문 상세 (펼침) */}
                  {expandedOrders.includes(order.id) && (
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                      {/* 상품 목록 */}
                      <div className="space-y-3" style={{ paddingTop: '16px' }}>
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div
                              style={{
                                width: '60px',
                                height: '60px',
                                background: '#E5E5E0',
                                borderRadius: '4px',
                                flexShrink: 0,
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '14px', fontWeight: 400, color: '#000000', marginBottom: '2px' }}>
                                {item.productName}
                              </p>
                              {item.option && (
                                <p style={{ fontSize: '12px', fontWeight: 400, color: '#6B6B6B', marginBottom: '2px' }}>
                                  옵션: {item.option}
                                </p>
                              )}
                              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>
                                {item.price.toLocaleString()}원 × {item.quantity}개
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 결제 정보 */}
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>상품금액</span>
                          <span style={{ fontSize: '13px', fontWeight: 400, color: '#000000' }}>
                            {(order.totalAmount - order.shippingFee).toLocaleString()}원
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>배송비</span>
                          <span style={{ fontSize: '13px', fontWeight: 400, color: '#000000' }}>
                            {order.shippingFee === 0 ? '무료' : `${order.shippingFee.toLocaleString()}원`}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>총 결제금액</span>
                          <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>
                            {order.totalAmount.toLocaleString()}원
                          </span>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex gap-2" style={{ marginTop: '16px' }}>
                        {order.trackingNumber && (
                          <button
                            style={{
                              padding: '10px 16px',
                              fontSize: '13px',
                              fontWeight: 400,
                              background: '#000000',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                          >
                            배송 조회
                          </button>
                        )}
                        {order.canReview && (
                          <button
                            style={{
                              padding: '10px 16px',
                              fontSize: '13px',
                              fontWeight: 400,
                              background: 'transparent',
                              color: '#000000',
                              border: '1px solid rgba(0,0,0,0.2)',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                          >
                            리뷰 쓰기
                          </button>
                        )}
                        {order.canCancel && (
                          <button
                            style={{
                              padding: '10px 16px',
                              fontSize: '13px',
                              fontWeight: 400,
                              background: 'transparent',
                              color: '#6B6B6B',
                              border: '1px solid rgba(0,0,0,0.15)',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                          >
                            주문 취소
                          </button>
                        )}
                        <Link
                          to={`/store/product/${order.items[0].id}`}
                          style={{
                            padding: '10px 16px',
                            fontSize: '13px',
                            fontWeight: 400,
                            background: 'transparent',
                            color: '#6B6B6B',
                            border: '1px solid rgba(0,0,0,0.15)',
                            borderRadius: '4px',
                            textDecoration: 'none',
                          }}
                        >
                          다시 구매
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <Package size={40} color="#D4D4D4" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '14px', fontWeight: 400, color: '#6B6B6B' }}>주문 내역이 없습니다.</p>
            </div>
          )}
        </div>
      </MyPageLayout>
  );
};

export default OrdersPage;
