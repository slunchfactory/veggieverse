export const SubscriptionPage = () => {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const target = `${normalizedBase}subscribe-calendar.html?embed=1`;

  /* iframe = 헤더 아래 남은 영역 정확히 채움 (래퍼에 minHeight 100vh 두면 갭 발생) */
  const iframeMinH = 'calc(100dvh - var(--header-area-h, var(--header-h, 64px)))';

  return (
    <div
      className="block w-full min-h-0 overflow-x-hidden"
      style={{ lineHeight: 0, backgroundColor: 'var(--surface-soft)' }}
    >
      <iframe
        src={target}
        title="Subscribe Calendar"
        className="block w-full border-0"
        style={{
          height: iframeMinH,
          minHeight: iframeMinH,
          backgroundColor: 'var(--surface-soft)',
        }}
      />
    </div>
  );
};

export default SubscriptionPage;
