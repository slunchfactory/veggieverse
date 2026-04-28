import React from 'react';
import { X, Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderInfo {
  id: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalPrice: number;
  shippingFee: number;
  address?: string;
  trackingNumber?: string;
}

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: OrderInfo;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  const getStatusInfo = (status: OrderInfo['status']) => {
    switch (status) {
      case 'pending':
        return { label: '주문 확인중', icon: Clock, color: '#F59E0B' };
      case 'confirmed':
        return { label: '주문 확인', icon: CheckCircle, color: 'var(--status-success-icon)' };
      case 'shipping':
        return { label: '배송중', icon: Truck, color: '#3B82F6' };
      case 'delivered':
        return { label: '배송 완료', icon: Package, color: 'var(--palette-text)' };
      case 'cancelled':
        return { label: '주문 취소', icon: X, color: '#EF4444' };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(26, 10, 5, 0.4)' }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          background: '#FFFFFF',
          border: '1px solid var(--palette-text)',
          borderRadius: '16px',
          position: 'relative',
          margin: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'var(--palette-text)' }}>
            주문 상세
          </h2>
          <button
            onClick={onClose}
            style={{
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
            <X size={20} strokeWidth={1} color="var(--palette-text)" />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* 주문 상태 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'var(--palette-bg-2)',
              borderRadius: '8px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#fff',
                border: `1px solid ${statusInfo.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StatusIcon size={20} strokeWidth={1} color={statusInfo.color} />
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 400, color: 'var(--palette-text)', marginBottom: '2px' }}>
                {statusInfo.label}
              </p>
              <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--warm-gray)' }}>
                주문번호: {order.id}
              </p>
            </div>
          </div>

          {/* 주문 일시 */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)', marginBottom: '4px' }}>
              주문 일시
            </p>
            <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)' }}>
              {order.orderDate}
            </p>
          </div>

          {/* 주문 상품 */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--warm-gray)',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--border-divider)',
            }}>
              주문 상품 ({order.items.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                  }}
                >
                  {/* 상품 이미지 */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--palette-bg-2)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid var(--border-divider)',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '7px',
                        }}
                      />
                    ) : (
                      <Package size={24} strokeWidth={1} color="var(--muted)" />
                    )}
                  </div>
                  {/* 상품 정보 */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--palette-text)',
                      marginBottom: '4px',
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      color: 'var(--warm-gray)',
                    }}>
                      {formatPrice(item.price)} · {item.quantity}개
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 배송 정보 */}
          {order.address && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--warm-gray)',
                marginBottom: '8px',
              }}>
                배송지
              </h3>
              <p style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--palette-text)',
                lineHeight: '1.5',
              }}>
                {order.address}
              </p>
            </div>
          )}

          {/* 운송장 번호 */}
          {order.trackingNumber && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--warm-gray)',
                marginBottom: '8px',
              }}>
                운송장 번호
              </h3>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#3B82F6',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {order.trackingNumber}
                <ChevronRight size={14} strokeWidth={1} />
              </button>
            </div>
          )}

          {/* 결제 정보 */}
          <div
            style={{
              padding: '16px',
              background: 'var(--palette-bg-2)',
              borderRadius: '8px',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--warm-gray)' }}>
                상품 금액
              </span>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--palette-text)' }}>
                {formatPrice(order.totalPrice - order.shippingFee)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-divider)',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--warm-gray)' }}>
                배송비
              </span>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--palette-text)' }}>
                {order.shippingFee === 0 ? '무료' : formatPrice(order.shippingFee)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--palette-text)' }}>
                총 결제 금액
              </span>
              <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--palette-text)' }}>
                {formatPrice(order.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-divider)',
            display: 'flex',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          {order.status === 'delivered' && (
            <button
              style={{
                flex: 1,
                padding: '14px',
                background: 'transparent',
                border: '1px solid var(--palette-text)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--palette-text)',
                cursor: 'pointer',
              }}
            >
              리뷰 작성
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              background: 'var(--palette-text)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
