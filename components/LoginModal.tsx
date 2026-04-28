import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 API 연동
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    onClose();
  };

  const handleSocialLogin = (provider: 'kakao' | 'naver' | 'google' | 'apple') => {
    // TODO: 소셜 로그인 API 연동
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    onClose();
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
          maxWidth: '400px',
          background: '#FFFFFF',
          border: '1px solid var(--palette-text)',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative',
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
          <X size={20} strokeWidth={1} color="var(--palette-text)" />
        </button>

        {/* 헤더 */}
        <h2 style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '20px',
          fontWeight: 400,
          color: 'var(--palette-text)',
        }}>
          Log-in
        </h2>

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 이메일/ID 입력 */}
          <input
            type="text"
            placeholder="이메일 또는 아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '12px',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              outline: 'none',
              boxSizing: 'border-box',
            }}
            required
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '16px',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              outline: 'none',
              boxSizing: 'border-box',
            }}
            required
          />

          {/* 옵션 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--palette-text)',
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--palette-text)' }}>
                아이디 저장
              </span>
            </label>
            <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--gray-light)' }}>
              보안접속
            </span>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '12px',
              background: 'var(--palette-text)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Log-in
          </button>

          {/* 게스트 주문 버튼 */}
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '20px',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              cursor: 'pointer',
            }}
          >
            Guest-Order
          </button>
        </form>

        {/* 링크 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 400,
            color: 'var(--gray-light)',
          }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-light)' }}>
              아이디 찾기
            </button>
            <span>|</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-light)' }}>
              비밀번호 찾기
            </button>
            <span>|</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-light)' }}>
              회원가입
            </button>
          </div>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* 카카오 */}
          <button
            onClick={() => handleSocialLogin('kakao')}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              cursor: 'pointer',
            }}
          >
            <span>Kakao로 로그인</span>
          </button>

          {/* 네이버 */}
          <button
            onClick={() => handleSocialLogin('naver')}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              cursor: 'pointer',
            }}
          >
            <span>NAVER로 로그인</span>
          </button>

          {/* 구글 */}
          <button
            onClick={() => handleSocialLogin('google')}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              cursor: 'pointer',
            }}
          >
            <span>Google로 로그인</span>
          </button>

          {/* 애플 */}
          <button
            onClick={() => handleSocialLogin('apple')}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid var(--palette-text)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--palette-text)',
              cursor: 'pointer',
            }}
          >
            <span>Apple로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
};
