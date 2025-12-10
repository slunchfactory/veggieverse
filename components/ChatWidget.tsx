import React, { useMemo, useState } from 'react';

const AVATAR_IMG = '/veggieverse/characters/slunch-character.png';
const AVATAR_VIDEO = '/veggieverse/characters/slunch-character-move.mp4';
type TabKey = 'chat' | 'profile' | 'saved';


export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [tab, setTab] = useState<TabKey>('chat');
  const memoryOn = true;
  const [contextTasteOn, setContextTasteOn] = useState(true);
  const [input, setInput] = useState('');

  const positionClass = useMemo(() => 'fixed z-[90] right-4 bottom-20 sm:right-6 sm:bottom-24', []);
  const quickPrompts = ['오늘 점심 추천', '주간 식단 짜줘', '장보기 리스트 만들어줘', '저염/고단백으로'];

  return (
    <>
      {/* 트리거 */}
      <button
        aria-label="챗봇 열기"
        className={`chatbot-trigger ${positionClass} w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-transparent border-none hover:scale-110 transition-all flex items-center justify-center overflow-hidden`}
        onClick={() => setIsOpen(prev => !prev)}
        style={{ borderRadius: '24%' }}
      >
        {avatarError ? (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-stone-100">
            🍉
          </div>
        ) : (
          <video
            src={AVATAR_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onError={() => setAvatarError(true)}
          />
        )}
      </button>

      {/* 패널 */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full max-w-[420px] bg-white shadow-2xl border-l border-stone-200 flex flex-col" style={{ zIndex: 80 }}>
          {/* 헤더 */}
          <div className="h-16 px-4 flex items-center gap-3 border-b border-stone-200">
            {avatarError ? (
              <div className="w-10 h-10 rounded-none bg-gradient-to-br from-lime-200 via-emerald-200 to-amber-200 flex items-center justify-center text-xl">
                🍉
              </div>
            ) : (
              <img
                src={AVATAR_IMG}
                alt="챗봇"
                className="w-10 h-10 rounded-none object-cover"
                onError={() => setAvatarError(true)}
                draggable={false}
              />
            )}
            <div className="flex-1">
              <p className="text-sm font-semibold text-stone-900">VeggieVerse GPT</p>
              <p className="text-[12px] text-emerald-600">기억 {memoryOn ? 'ON' : 'OFF'} • 빠른 답변</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none px-2 py-1"
                aria-label="챗봇 닫기"
              >
                ×
              </button>
            </div>
          </div>

          {/* 탭 */}
          <div className="flex border-b border-stone-200 px-4 gap-4">
            {[
              { key: 'chat', label: '대화' },
              { key: 'profile', label: '내 취향/기억' },
              { key: 'saved', label: '저장/핀' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as TabKey)}
                className={`relative py-3 text-sm ${
                  tab === t.key ? 'text-stone-900 font-semibold' : 'text-stone-500'
                }`}
              >
                {t.label}
                {tab === t.key && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-black" />}
              </button>
            ))}
          </div>

          {/* 본문 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {tab === 'chat' && (
              <>
                <label className="flex items-center gap-2 text-[12px] text-stone-500 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#3D9E3D]"
                    checked={contextTasteOn}
                    onChange={() => setContextTasteOn(!contextTasteOn)}
                  />
                  취향/알레르기 적용
                </label>

                <div className="text-xs text-stone-500">
                  집에 있는 재료로도 세계 각지의 유명한 레스토랑 맛을 최대한 비슷하게 만들어볼게요.
                  필요하면 어울리는 슬런치 제품도 같이 추천해 드릴게요.
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map(p => (
                    <button
                      key={p}
                      className="text-left text-[12px] px-3 py-2 border border-stone-200 rounded-none hover:border-stone-400 transition-colors"
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
                <div className="p-3 border border-stone-200 rounded-none">
                  <p className="text-[12px] text-stone-500 mb-1">식단 유형</p>
                  <p className="text-sm font-semibold text-stone-900">비건 / 저염 / 고단백</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-none">
                  <p className="text-[12px] text-stone-500 mb-1">선호 / 비선호</p>
                  <p className="text-sm text-stone-800">선호: 버섯, 올리브, 토마토</p>
                  <p className="text-sm text-stone-800">비선호: 너무 매운 음식, 파인애플</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-none">
                  <p className="text-[12px] text-stone-500 mb-1">알레르기</p>
                  <p className="text-sm text-stone-800">견과류(피넛) 주의</p>
                </div>
              </div>
            )}

            {tab === 'saved' && (
              <div className="space-y-3">
                <div className="p-3 border border-stone-200 rounded-none">
                  <p className="text-[12px] text-stone-500 mb-1">핀한 레시피</p>
                  <p className="text-sm text-stone-800">토마토 병아리콩 스튜 (저염)</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-none">
                  <p className="text-[12px] text-stone-500 mb-1">장보기 리스트</p>
                  <p className="text-sm text-stone-800">병아리콩, 시금치, 레몬, 올리브오일</p>
                </div>
              </div>
            )}
          </div>

          {/* 입력 */}
          <div className="border-t border-stone-200 p-4 bg-white space-y-2">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="두유, 단호박, 마카다미아로 버터처럼 부드러운 맛을 만들고 싶어."
                className="flex-1 resize-none rounded-none border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
              />
              <button className="px-4 py-2 bg-[#3D9E3D] text-white rounded-none text-sm font-semibold hover:opacity-90 transition-colors">
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

