import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext';
import MyPageLayout from '../../../components/MyPageLayout';

const MyInfo: React.FC = () => {
  const { user } = useUser();

  const infoItems = [
    { label: '이름 (닉네임)', value: user?.username || '-' },
    { label: '채식 스피릿', value: user?.spiritName ? `${user.spiritName} (${user.spiritType})` : '-' },
    { label: '가입일', value: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('ko-KR') : '-' },
    { label: '보유 배지', value: `${user?.badges.length || 0}개` },
    { label: '레시피 투고', value: `${user?.recipes || 0}건` },
    { label: '댓글', value: `${user?.comments || 0}건` },
  ];

  return (
    <MyPageLayout>
      <div style={{ maxWidth: '560px' }}>
        {/* 프로필 이미지 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#F7F4EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {user?.profileImage ? (
              <img src={user.profileImage} alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={40} color="#9A9A9A" />
            )}
          </div>
        </div>

        {/* 회원 정보 목록 */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '4px',
            border: '1px solid rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          {infoItems.map((item, idx) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: idx < infoItems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 400, color: '#6B6B6B' }}>
                {item.label}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 400, color: '#000' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* 정보 수정 버튼 */}
        <Link
          to="/mypage/info/edit-profile"
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            fontSize: '14px',
            fontWeight: 400,
            color: '#fff',
            background: '#000',
            border: 'none',
            borderRadius: '4px',
            textAlign: 'center',
            textDecoration: 'none',
            marginTop: '24px',
          }}
        >
          정보 수정
        </Link>
      </div>
    </MyPageLayout>
  );
};

export default MyInfo;
