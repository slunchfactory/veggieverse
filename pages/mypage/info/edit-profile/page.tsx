import React, { useState } from 'react';
import { User, Lock, ChevronDown } from 'lucide-react';
import { useUser } from '../../../../contexts/UserContext';
import MyPageLayout from '../../../../components/MyPageLayout';

// 채식 유형 옵션
const VEGAN_TYPES = [
  { value: 'vegan', label: '비건 (Vegan)' },
  { value: 'lacto', label: '락토 (Lacto)' },
  { value: 'ovo', label: '오보 (Ovo)' },
  { value: 'lacto-ovo', label: '락토오보 (Lacto-Ovo)' },
  { value: 'pesco', label: '페스코 (Pesco)' },
  { value: 'pollo', label: '폴로 (Pollo)' },
  { value: 'flexitarian', label: '플렉시테리언 (Flexitarian)' },
];

const ProfileEditPage: React.FC = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    username: user?.username || '비건탐험가',
    email: user?.email || 'vegan@slunch.com',
    phone: '010-1234-5678',
    veganType: user?.spiritName?.toLowerCase().includes('비건') ? 'vegan' : 'flexitarian',
    birthYear: '1990',
    gender: 'prefer-not-to-say',
    marketingEmail: true,
    marketingSms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출
    alert('회원정보가 수정되었습니다.');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 400,
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '4px',
    background: 'transparent',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 400,
    color: '#6B6B6B',
    marginBottom: '8px',
  };

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '560px' }}>
          {/* 프로필 이미지 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: '#F7F4EF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  overflow: 'hidden',
                }}
              >
                {user.profileImage ? (
                  <img src={user.profileImage} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User size={40} color="#9A9A9A" />
                )}
              </div>
              <button
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#6B6B6B',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                사진 변경
              </button>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 이름/닉네임 */}
            <div>
              <label style={labelStyle}>이름 (닉네임)</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* 이메일 */}
            <div>
              <label style={labelStyle}>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* 연락처 */}
            <div>
              <label style={labelStyle}>연락처</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
                style={inputStyle}
              />
            </div>

            {/* 채식 유형 */}
            <div>
              <label style={labelStyle}>채식 유형</label>
              <div style={{ position: 'relative' }}>
                <select
                  name="veganType"
                  value={formData.veganType}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {VEGAN_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  color="#6B6B6B"
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* 출생연도 & 성별 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>출생연도</label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {Array.from({ length: 80 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}년</option>
                    ))}
                  </select>
                  <ChevronDown size={14} color="#6B6B6B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>성별</label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="prefer-not-to-say">선택 안함</option>
                  </select>
                  <ChevronDown size={14} color="#6B6B6B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', margin: '8px 0' }} />

            {/* 비밀번호 변경 */}
            <div>
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#000000',
                  background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.15)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Lock size={16} />
                비밀번호 변경
              </button>
            </div>

            {/* 구분선 */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', margin: '8px 0' }} />

            {/* 마케팅 수신 동의 */}
            <div>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B', marginBottom: '12px' }}>마케팅 정보 수신 동의</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="marketingEmail"
                    checked={formData.marketingEmail}
                    onChange={handleChange}
                    style={{ width: '16px', height: '16px', accentColor: '#000000' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>이메일 수신 동의</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="marketingSms"
                    checked={formData.marketingSms}
                    onChange={handleChange}
                    style={{ width: '16px', height: '16px', accentColor: '#000000' }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#000000' }}>SMS 수신 동의</span>
                </label>
              </div>
            </div>

            {/* 저장 버튼 */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 400,
                color: '#fff',
                background: '#000000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '16px',
              }}
            >
              저장하기
            </button>

            {/* 회원 탈퇴 */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#9A9A9A',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                회원 탈퇴
              </button>
            </div>
          </form>
        </div>
      </MyPageLayout>
  );
};

export default ProfileEditPage;
