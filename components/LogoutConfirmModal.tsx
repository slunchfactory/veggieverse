import React, { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onClose }) => {
  const { logout } = useUser();
  const navigate = useNavigate();

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
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
          maxWidth: '320px',
          margin: '0 16px',
          background: '#FFFFFF',
          border: '1px solid var(--palette-text)',
          borderRadius: '16px',
          padding: '32px 24px',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 메시지 */}
        <p style={{
          fontSize: '15px',
          fontWeight: 400,
          color: 'var(--palette-text)',
          marginBottom: '24px',
          lineHeight: 1.5,
        }}>
          로그아웃 하시겠습니까?
        </p>

        {/* 버튼 */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontWeight: 400,
              color: '#fff',
              background: 'var(--palette-text)',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
