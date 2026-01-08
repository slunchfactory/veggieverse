import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Check } from 'lucide-react';
import { LoginModal } from './LoginModal';

const AVATAR_IMG = '/veggieverse/characters/slunch-character.png';
const AVATAR_VIDEO = '/veggieverse/characters/slunch-character-move.mp4';
type TabKey = 'chat' | 'profile' | 'saved';

// 북마크 더미 데이터 (썸네일 이미지 및 태그 포함)
interface BookmarkItem {
  id: number;
  title: string;
  dietaryType: string; // 식단 유형 (비건, 락토오보 등)
  mealType: string; // 식사 유형 (아침, 점심, 저녁, 디저트 등)
  cuisine: string; // 요리 유형 (한식, 양식, 일식 등)
  image: string;
}

const MOCK_BOOKMARKS: BookmarkItem[] = [
  { id: 1, title: '콩나물 비빔밥', dietaryType: '비건', mealType: '메인', cuisine: '한식', image: '/veggieverse/store/thumbnails/sprout-bibimbap.jpg' },
  { id: 2, title: '토마토 병아리콩 스튜', dietaryType: '비건', mealType: '점심', cuisine: '양식', image: '/veggieverse/store/thumbnails/tomato-stew.jpg' },
  { id: 3, title: '비건 렌틸콩 카레', dietaryType: '락토오보', mealType: '저녁', cuisine: '한식', image: '/veggieverse/store/thumbnails/lentil-curry.jpg' },
  { id: 4, title: '두부 스테이크와 구운 야채', dietaryType: '비건', mealType: '', cuisine: '디저트', image: '/veggieverse/store/thumbnails/tofu-steak.jpg' },
  { id: 5, title: '아보카도 오픈 샌드위치', dietaryType: '비건', mealType: '아침', cuisine: '양식', image: '/veggieverse/store/thumbnails/avocado-sandwich.jpg' },
  { id: 6, title: '가지 라자냐', dietaryType: '비건', mealType: '저녁', cuisine: '양식', image: '/veggieverse/store/thumbnails/eggplant-lasagna.jpg' },
  { id: 7, title: '매콤 팽이버섯 덮밥', dietaryType: '비건', mealType: '점심', cuisine: '한식', image: '/veggieverse/store/thumbnails/mushroom-rice.jpg' },
  { id: 8, title: '브로콜리 크림 파스타', dietaryType: '락토오보', mealType: '저녁', cuisine: '양식', image: '/veggieverse/store/thumbnails/broccoli-pasta.jpg' },
  { id: 9, title: '시금치 두부볶음', dietaryType: '비건', mealType: '점심', cuisine: '한식', image: '/veggieverse/store/thumbnails/spinach-tofu.jpg' },
  { id: 10, title: '버섯 리소토', dietaryType: '비건', mealType: '저녁', cuisine: '양식', image: '/veggieverse/store/thumbnails/mushroom-risotto.jpg' },
  { id: 11, title: '비건 치즈 케이크', dietaryType: '비건', mealType: '', cuisine: '디저트', image: '/veggieverse/store/thumbnails/vegan-cheesecake.jpg' },
  { id: 12, title: '단호박 수프', dietaryType: '비건', mealType: '점심', cuisine: '양식', image: '/veggieverse/store/thumbnails/pumpkin-soup.jpg' },
  { id: 13, title: '옥수수 타코', dietaryType: '비건', mealType: '점심', cuisine: '양식', image: '/veggieverse/store/thumbnails/corn-taco.jpg' },
  { id: 14, title: '비건 김치볶음밥', dietaryType: '비건', mealType: '점심', cuisine: '한식', image: '/veggieverse/store/thumbnails/kimchi-fried-rice.jpg' },
  { id: 15, title: '연근 튀김', dietaryType: '비건', mealType: '저녁', cuisine: '한식', image: '/veggieverse/store/thumbnails/lotus-root-fry.jpg' },
];

// 태그 문자열 생성 함수
const getTagsString = (item: BookmarkItem): string => {
  const tags = [item.dietaryType, item.mealType, item.cuisine].filter(tag => tag && tag.trim() !== '');
  return tags.join(' • ');
};

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatTrigger: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [avatarError, setAvatarError] = useState(false);

  // 챗봇이 열렸을 때는 버튼을 숨김
  if (isOpen) return null;

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-[120px] right-6 z-[90] w-14 h-14 rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105"
      style={{
        background: '#fff',
        border: '1px solid #000',
        padding: 0,
        overflow: 'hidden',
      }}
      aria-label="챗봇 열기"
    >
      {avatarError ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            background: '#f5f5f5',
          }}
        >
          🥗
        </div>
      ) : (
        <img
          src={AVATAR_IMG}
          alt="챗봇"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={() => setAvatarError(true)}
          draggable={false}
        />
      )}
    </button>
  );
};

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onToggle }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [tab, setTab] = useState<TabKey>('chat');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 개발용: 로그인 상태로 설정
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [contextTasteOn, setContextTasteOn] = useState(true);
  const [input, setInput] = useState('');
  const quickPrompts = ['오늘 점심 추천', '주간 식단 짜줘', '장보기 리스트 만들어줘', '저염/고단백으로'];

  const handleLogin = () => {
    // 로그인 모달 열기
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    // 로그인 성공 후 상태 업데이트
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* 데스크탑: Fixed Bottom Right */}
      <div className="hidden md:block fixed bottom-8 right-8 z-[90] w-[360px] h-[600px] bg-white border border-black flex flex-col" style={{ boxShadow: '4px 4px 0 #000' }}>
        {/* 헤더 */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-black">
          {avatarError ? (
            <div className="w-10 h-10 border border-black bg-white flex items-center justify-center text-xl">
              🍉
            </div>
          ) : (
            <img
              src={AVATAR_IMG}
              alt="챗봇"
              className="w-10 h-10 border border-black object-cover"
              onError={() => setAvatarError(true)}
              draggable={false}
            />
          )}
          <div className="flex-1 flex flex-col">
            <p className="text-base font-normal text-black" style={{ fontSize: '16px' }}>VeggieVerse GPT</p>
            {isLoggedIn ? (
              <span className="text-[11px] text-gray-500 flex items-center gap-1 cursor-default">
                <Check className="w-3 h-3" />
                대화가 저장되고 있습니다
              </span>
            ) : (
              <button
                onClick={handleLogin}
                className="text-[11px] text-black underline text-left hover:text-gray-600 transition-colors"
              >
                로그인하고 대화 기억하기
              </button>
            )}
          </div>
          <button
            onClick={onToggle}
            className="text-black hover:bg-black hover:text-white transition-colors text-lg leading-none px-2 py-1 border border-black"
            aria-label="챗봇 닫기"
          >
            ×
          </button>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-black px-4 gap-4">
          {[
            { key: 'chat', label: '대화' },
            { key: 'profile', label: '나의 스피릿' },
            { key: 'saved', label: '북마크' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as TabKey)}
              className={`relative py-3 text-sm font-normal transition-colors ${
                tab === t.key ? 'text-black' : 'text-black hover:underline'
              }`}
              style={{ fontSize: '14px' }}
            >
              {t.label}
              {tab === t.key && <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-black" />}
            </button>
          ))}
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {tab === 'chat' && (
            <>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contextTasteOn}
                  onChange={() => setContextTasteOn(!contextTasteOn)}
                  className="w-3 h-3 border border-black accent-black"
                  style={{ accentColor: '#000' }}
                />
                <span className="text-xs text-black font-normal" style={{ fontSize: '13px' }}>취향/알레르기 적용</span>
              </label>

              <div className="text-xs text-black font-normal" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                집에 있는 재료로도 세계 각지의 유명한 레스토랑 맛을 최대한 비슷하게 만들어볼게요.
                필요하면 어울리는 슬런치 제품도 같이 추천해 드릴게요.
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map(p => (
                  <button
                    key={p}
                    className="text-left px-3 py-2 border border-black bg-white text-black font-normal hover:bg-black hover:text-white transition-colors"
                    style={{ fontSize: '13px' }}
                    onClick={() => setInput(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === 'profile' && (
            <div className="space-y-3">
              {/* 나의 스피릿 찾기 버튼 */}
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full py-3 border border-black bg-black text-white font-normal hover:bg-white hover:text-black transition-colors"
                style={{ fontSize: '14px' }}
              >
                🥗 나의 스피릿 찾기
              </Link>

              <div className="p-3 border border-black bg-white">
                <p className="text-xs text-black font-normal mb-1" style={{ fontSize: '13px' }}>식단 유형</p>
                <p className="text-sm font-normal text-black" style={{ fontSize: '14px' }}>비건 / 저염 / 고단백</p>
              </div>
              <div className="p-3 border border-black bg-white">
                <p className="text-xs text-black font-normal mb-1" style={{ fontSize: '13px' }}>선호 / 비선호</p>
                <p className="text-sm text-black font-normal" style={{ fontSize: '14px' }}>선호: 버섯, 올리브, 토마토</p>
                <p className="text-sm text-black font-normal" style={{ fontSize: '14px' }}>비선호: 너무 매운 음식, 파인애플</p>
              </div>
              <div className="p-3 border border-black bg-white">
                <p className="text-xs text-black font-normal mb-1" style={{ fontSize: '13px' }}>알레르기</p>
                <p className="text-sm text-black font-normal" style={{ fontSize: '14px' }}>견과류(피넛) 주의</p>
              </div>
            </div>
          )}

          {tab === 'saved' && (
            <div className="grid grid-cols-2 gap-3 p-1">
              {MOCK_BOOKMARKS.map((bookmark) => (
                <Link
                  key={bookmark.id}
                  to={`/recipe/${bookmark.id}`}
                  className="group flex flex-col border border-black bg-white hover:bg-black transition-colors cursor-pointer"
                >
                  {/* 이미지 */}
                  <div className="w-full h-[100px] border-b border-black bg-gray-200 overflow-hidden relative">
                    <img
                      src={bookmark.image}
                      alt={bookmark.title}
                      className="w-full h-full object-cover group-hover:opacity-80"
                      onError={(e) => {
                        // 이미지 로드 실패 시 플레이스홀더
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[10px] text-gray-400">IMG</div>';
                        }
                      }}
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="p-2 text-left">
                    <p className="text-[12px] font-medium mb-1 truncate group-hover:text-white">
                      {bookmark.title}
                    </p>
                    <p className="text-[10px] text-gray-500 group-hover:text-gray-300 truncate">
                      {getTagsString(bookmark)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 입력 */}
        <div className="border-t border-black p-4 bg-white space-y-2">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="두유, 단호박, 마카다미아로 버터처럼 부드러운 맛을 만들고 싶어."
              className="flex-1 resize-none border border-black px-3 py-2 text-black bg-white focus:outline-none focus:ring-0 font-normal"
              style={{ fontSize: '13px' }}
            />
            <button 
              className="px-4 py-2 bg-black text-white border border-black font-normal hover:opacity-90 transition-opacity"
              style={{ fontSize: '13px' }}
            >
              전송
            </button>
          </div>
        </div>
      </div>

      {/* 모바일: Bottom Sheet */}
      <>
        {/* 오버레이 */}
        <div 
          className="md:hidden fixed inset-0 z-[89] bg-black/50"
          onClick={onToggle}
          style={{ top: 0 }}
        />
        <div className="md:hidden fixed inset-x-0 bottom-0 z-[90] bg-white flex flex-col border-t border-black" style={{ height: '80vh' }}>
        {/* 헤더 */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-black">
          {avatarError ? (
            <div className="w-10 h-10 border border-black bg-white flex items-center justify-center text-xl">
              🍉
            </div>
          ) : (
            <img
              src={AVATAR_IMG}
              alt="챗봇"
              className="w-10 h-10 border border-black object-cover"
              onError={() => setAvatarError(true)}
              draggable={false}
            />
          )}
          <div className="flex-1 flex flex-col">
            <p className="text-base font-normal text-black" style={{ fontSize: '16px' }}>VeggieVerse GPT</p>
            {isLoggedIn ? (
              <span className="text-[11px] text-gray-500 flex items-center gap-1 cursor-default">
                <Check className="w-3 h-3" />
                대화가 저장되고 있습니다
              </span>
            ) : (
              <button
                onClick={handleLogin}
                className="text-[11px] text-black underline text-left hover:text-gray-600 transition-colors"
              >
                로그인하고 대화 기억하기
              </button>
            )}
          </div>
          <button
            onClick={onToggle}
            className="text-black hover:bg-black hover:text-white transition-colors text-lg leading-none px-2 py-1 border border-black"
            aria-label="챗봇 닫기"
          >
            ×
          </button>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-black px-4 gap-4">
          {[
            { key: 'chat', label: '대화' },
            { key: 'profile', label: '나의 스피릿' },
            { key: 'saved', label: '북마크' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as TabKey)}
              className={`relative py-3 text-sm font-normal transition-colors ${
                tab === t.key ? 'text-black' : 'text-black hover:underline'
              }`}
              style={{ fontSize: '14px' }}
            >
              {t.label}
              {tab === t.key && <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-black" />}
            </button>
          ))}
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {tab === 'chat' && (
            <>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contextTasteOn}
                  onChange={() => setContextTasteOn(!contextTasteOn)}
                  className="w-3 h-3 border border-black accent-black"
                  style={{ accentColor: '#000' }}
                />
                <span className="text-xs text-black font-normal" style={{ fontSize: '13px' }}>취향/알레르기 적용</span>
              </label>

              <div className="text-xs text-black font-normal" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                집에 있는 재료로도 세계 각지의 유명한 레스토랑 맛을 최대한 비슷하게 만들어볼게요.
                필요하면 어울리는 슬런치 제품도 같이 추천해 드릴게요.
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickPrompts.map(p => (
                  <button
                    key={p}
                    className="text-left px-3 py-2 border border-black bg-white text-black font-normal hover:bg-black hover:text-white transition-colors"
                    style={{ fontSize: '13px' }}
                    onClick={() => setInput(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === 'profile' && (
            <div className="space-y-3">
              {/* 나의 스피릿 찾기 버튼 */}
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full py-3 border border-black bg-black text-white font-normal hover:bg-white hover:text-black transition-colors"
                style={{ fontSize: '14px' }}
              >
                🥗 나의 스피릿 찾기
              </Link>

              <div className="p-3 border border-black bg-white">
                <p className="text-xs text-black font-normal mb-1" style={{ fontSize: '13px' }}>식단 유형</p>
                <p className="text-sm font-normal text-black" style={{ fontSize: '14px' }}>비건 / 저염 / 고단백</p>
              </div>
              <div className="p-3 border border-black bg-white">
                <p className="text-xs text-black font-normal mb-1" style={{ fontSize: '13px' }}>선호 / 비선호</p>
                <p className="text-sm text-black font-normal" style={{ fontSize: '14px' }}>선호: 버섯, 올리브, 토마토</p>
                <p className="text-sm text-black font-normal" style={{ fontSize: '14px' }}>비선호: 너무 매운 음식, 파인애플</p>
              </div>
              <div className="p-3 border border-black bg-white">
                <p className="text-xs text-black font-normal mb-1" style={{ fontSize: '13px' }}>알레르기</p>
                <p className="text-sm text-black font-normal" style={{ fontSize: '14px' }}>견과류(피넛) 주의</p>
              </div>
            </div>
          )}

          {tab === 'saved' && (
            <div className="grid grid-cols-2 gap-3 p-1">
              {MOCK_BOOKMARKS.map((bookmark) => (
                <Link
                  key={bookmark.id}
                  to={`/recipe/${bookmark.id}`}
                  className="group flex flex-col border border-black bg-white hover:bg-black transition-colors cursor-pointer"
                >
                  {/* 이미지 */}
                  <div className="w-full h-[100px] border-b border-black bg-gray-200 overflow-hidden relative">
                    <img
                      src={bookmark.image}
                      alt={bookmark.title}
                      className="w-full h-full object-cover group-hover:opacity-80"
                      onError={(e) => {
                        // 이미지 로드 실패 시 플레이스홀더
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[10px] text-gray-400">IMG</div>';
                        }
                      }}
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="p-2 text-left">
                    <p className="text-[12px] font-medium mb-1 truncate group-hover:text-white">
                      {bookmark.title}
                    </p>
                    <p className="text-[10px] text-gray-500 group-hover:text-gray-300 truncate">
                      {getTagsString(bookmark)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 입력 */}
        <div className="border-t border-black p-4 bg-white space-y-2">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder="두유, 단호박, 마카다미아로 버터처럼 부드러운 맛을 만들고 싶어."
              className="flex-1 resize-none border border-black px-3 py-2 text-black bg-white focus:outline-none focus:ring-0 font-normal"
              style={{ fontSize: '13px' }}
            />
            <button 
              className="px-4 py-2 bg-black text-white border border-black font-normal hover:opacity-90 transition-opacity"
              style={{ fontSize: '13px' }}
            >
              전송
            </button>
          </div>
        </div>
      </div>
      </>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      <ChatTrigger isOpen={isOpen} onToggle={onToggle} />
      <ChatPanel isOpen={isOpen} onToggle={onToggle} />
    </>
  );
};
