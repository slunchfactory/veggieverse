import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useTransform, useMotionValue } from 'framer-motion';

const base = import.meta.env.BASE_URL;

/** 스크롤 패닝(수직 이동량) 전역 배율 — 실제 이동은 프레임 slack 안에서 잘림 */
const PAN = 2.72;

/**
 * 1.0 = 섹션이 뷰포트를 통과하는 동안 progress 0→1 완주 (가장 강한 패닝).
 * 값이 클수록 같은 스크롤에서 progress 도달이 줄어 패닝이 느려짐.
 */
const IMAGE_PAN_SCROLL_RELAX = 1.0;

/** public에 개별 스토리 PNG가 없을 때를 대비한 에디토리얼용 이미지 */
const IMG = {
  meals: `${base}images/menus/27_roasted_vegetable_quinoa_salad.png`,
  morning:
    'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=80',
  balance: `${base}images/menus/04_kale_waldorf_salad.png`,
  outcome1: `${base}images/menus/22_avocado_sushi_bowl.png`,
  outcome2:
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
  outcome3: `${base}try.png`,
  /** 인트로 플로팅 — 브랜드 14끼·밸런스(없을 경우 배포에서 메뉴 PNG로 바꿔도 됨) */
  introA: `${base}14meals.png`,
  introB: `${base}balance.png`,
  introC: `${base}images/menus/15_gochujang_tofu_bowl.png`,
  strip1: `${base}images/menus/01_roasted_beet_carpaccio.png`,
  strip2: `${base}images/menus/08_roasted_vegetable_lasagna.png`,
  strip3: `${base}images/menus/20_mediterranean_vegetable_pasta.png`,
  strip4: `${base}images/menus/31_salmon_avocado_bowl.png`,
  ritual: `${base}try.png`,
  /** 풀블리드 섹션용 — 어두운 톤 위 카피 */
  bgHero: `${base}images/menus/08_roasted_vegetable_lasagna.png`,
  bgChapter: `${base}images/menus/27_roasted_vegetable_quinoa_salad.png`,
};

const linkInline =
  'border-b border-charcoal/45 pb-0.5 font-medium text-black no-underline transition-[border-color,background-color] duration-200 hover:border-black hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';

const linkOnLightOverPhoto =
  'border-b border-white/55 pb-0.5 font-medium text-white no-underline transition-[border-color,opacity] duration-200 hover:border-white hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/** 기본: 중앙 정렬 + 좁은 읽기 폭(아카이브/에디토리얼 류) */
const centerNarrow = 'mx-auto w-full max-w-[min(100%,30rem)] text-center text-pretty';
const centerMid = 'mx-auto w-full max-w-[min(100%,34rem)] text-center text-pretty';
const centerWide = 'mx-auto w-full max-w-[min(100%,40rem)] text-center text-pretty';

const introFade = {
  hidden: { opacity: 0, y: 64 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/** 섹션 헤더·본문 범용 — whileInView 단순 트리거용 */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** 이미지 클립 와이프 — 아래→위로 열림 (Plus X 스타일) */
const imgReveal = {
  hidden: { clipPath: 'inset(100% 0 0% 0)' },
  show: {
    clipPath: 'inset(0% 0 0% 0)',
    transition: { duration: 1.15, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const sans: React.CSSProperties = {
  fontFamily: "'Noto Sans KR', sans-serif",
};

const sectionRule = 'border-t border-b border-[color:var(--border-hairline)]';

/**
 * 요소가 뷰포트를 지날 때 0 → 1 (대략: 아래에서 들어와 위로 나감).
 * `useScroll({ target })`가 문서 스크롤 루트와 맞지 않을 때(window만 갱신되는 환경)에도 동작합니다.
 */
function useElementScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) {
        progress.set(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const travel = Math.max(1, vh + rect.height);
      const raw = (vh - rect.top) / travel;
      progress.set(Math.min(1, Math.max(0, raw)));
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', schedule, { passive: true });
    const root = document.scrollingElement;
    root?.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      root?.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [progress]);
  return progress;
}

/** 풀블리드·박스 패닝 전용: `useElementScrollProgress`보다 스크롤 구간을 길게 잡아 패닝 속도를 완만하게 */
function usePanScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) {
        progress.set(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const travel = Math.max(1, (vh + rect.height) * IMAGE_PAN_SCROLL_RELAX);
      const raw = (vh - rect.top) / travel;
      progress.set(Math.min(1, Math.max(0, raw)));
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', schedule, { passive: true });
    const root = document.scrollingElement;
    root?.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      root?.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [progress]);
  return progress;
}

function useObservedHeight(ref: React.RefObject<HTMLElement | null>) {
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setH(el.getBoundingClientRect().height);
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return h;
}

/** imgScale로 키운 레이어가 마스크 박스(높이 H) 안에서만 움직일 수 있는 최대 |y| (px) */
function maxPanSlackPx(imgScale: number, boxHeightPx: number) {
  if (boxHeightPx <= 0 || imgScale <= 1) return 0;
  return ((imgScale - 1) / 2) * boxHeightPx * 0.94;
}

/**
 * 마스크 박스(overflow hidden) 안에서만 이미지가 스크롤에 따라 위아래로 이동 — 아래/위 영역이 순서대로 드러남
 */
function ScrollPanImage({
  src,
  alt,
  boxClassName = 'w-full',
  className = '',
  panPx = 48,
  imgScale = 1.26,
  loading = 'lazy' as 'lazy' | 'eager',
}: {
  src: string;
  alt: string;
  boxClassName?: string;
  className?: string;
  /** 박스 안에서 수직 패닝 강도 */
  panPx?: number;
  /** 박스보다 키 큰 이미지 비율(남는 영역을 스크롤로 이동) */
  imgScale?: number;
  loading?: 'lazy' | 'eager';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const boxH = useObservedHeight(ref);
  const scrollProgress = usePanScrollProgress(ref);
  const slack = maxPanSlackPx(imgScale, boxH);
  const requested = panPx * PAN;
  const panMax = boxH > 0 && slack > 0 ? Math.min(requested, slack) : requested;
  const y = useTransform(scrollProgress, [0, 1], [panMax, -panMax]);
  const heightPct = imgScale * 100;
  const topNudge = ((imgScale - 1) / 2) * 100;

  return (
    <div ref={ref} className={`relative overflow-hidden bg-[rgba(26,10,5,0.05)]/30 ${boxClassName} ${className}`}>
      <motion.div
        className="absolute left-0 w-full will-change-transform"
        style={{
          top: `-${topNudge}%`,
          height: `${heightPct}%`,
          y,
        }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" loading={loading} decoding="async" />
      </motion.div>
    </div>
  );
}

/**
 * 마스크 박스 안에서만 보이는 정적 크롭(스크롤 패닝 없음) — 패닝은 이미지 #1·#6·#9·#10만 적용
 */
function FrameImage({
  src,
  alt,
  boxClassName = 'w-full',
  className = '',
  loading = 'lazy' as 'lazy' | 'eager',
}: {
  src: string;
  alt: string;
  boxClassName?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <div className={`relative overflow-hidden bg-[rgba(26,10,5,0.05)]/30 ${boxClassName} ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading={loading} decoding="async" />
    </div>
  );
}

/**
 * 래퍼 안 콘텐츠가 스크롤 진행에 맞춰 살짝 위아래로 떠다님(패럴랙스)
 */
function ScrollDriftY({
  children,
  className = '',
  range = 44,
}: {
  children: React.ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollProgress = useElementScrollProgress(ref);
  const y = useTransform(scrollProgress, [0, 1], [range * 0.5, -range * 0.5]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * [Plus X · experience](https://www.plus-ex.com/experience#archiveat) 류: 풀블리드 이미지 + 그라데이션 + 중앙 카피
 */
function FullBleedChapter({
  imageSrc,
  imageAlt = '',
  overlayClassName = 'bg-gradient-to-b from-black/80 via-black/55 to-black/50',
  minClass = 'min-h-[min(78svh,880px)]',
  /** 프레임 밖으로 살짝 나간 이미지가 스크롤에 따라 드러남 */
  imgScale = 1.32,
  panPx = 100,
  loading = 'lazy' as 'lazy' | 'eager',
  children,
}: {
  imageSrc: string;
  imageAlt?: string;
  overlayClassName?: string;
  minClass?: string;
  imgScale?: number;
  panPx?: number;
  loading?: 'lazy' | 'eager';
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const sectionH = useObservedHeight(ref);
  const scrollProgress = usePanScrollProgress(ref);
  const slack = maxPanSlackPx(imgScale, sectionH);
  const requested = panPx * PAN;
  const panMax = sectionH > 0 && slack > 0 ? Math.min(requested, slack) : requested;
  const y = useTransform(scrollProgress, [0, 1], [panMax, -panMax]);
  const heightPct = imgScale * 100;
  const topNudge = ((imgScale - 1) / 2) * 100;

  return (
    <section
      ref={ref}
      className={`relative flex w-full ${minClass} items-center justify-center overflow-hidden border-b border-[color:var(--border-hairline)]`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute left-0 w-full will-change-transform"
          style={{
            top: `-${topNudge}%`,
            height: `${heightPct}%`,
            y,
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading={loading}
            decoding="async"
          />
        </motion.div>
      </div>
      <div className={`pointer-events-none absolute inset-0 z-[1] ${overlayClassName}`} aria-hidden />
      <div className="page-container relative z-10 flex w-full flex-col items-center justify-center px-5 py-20 md:px-8 md:py-28">
        {children}
      </div>
    </section>
  );
}

/**
 * [Plus X · experience#km](https://www.plus-ex.com/experience#km) — 인트로: (1) 커다란 배경 + 중앙 헤드라인 (2) 크림 영역 중심 내러티브
 */
function EditorialIntroPlusMotion() {
  return (
    <>
      {/* 에디토리얼 패닝 이미지 #1: 히어로 풀블리드 */}
      <FullBleedChapter
        imageSrc={IMG.bgHero}
        imageAlt=""
        minClass="min-h-[min(88svh,920px)]"
        overlayClassName="bg-gradient-to-b from-black/78 via-black/48 to-black/40"
        imgScale={2.1}
        panPx={220}
        loading="eager"
      >
        <motion.div
          custom={0}
          variants={introFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className={centerWide}
        >
          <p
            className="text-balance text-white"
            style={{ ...sans, fontSize: 'clamp(28px, 4.2vw, 44px)', lineHeight: 1.28, fontWeight: 500 }}
          >
            맛있는 한 끼가 거창할 필요는 없어요.
            <br />
            <span className="text-white/95">다만 하루를 조용히 돌보는 </span>
            <Link to="/subscribe" className={linkOnLightOverPhoto}>
              식탁
            </Link>
            <span className="text-white/95">은 분명히 있습니다.</span>
          </p>
          <p
            className="mx-auto mt-10 max-w-[min(100%,26rem)] text-[14px] leading-[1.85] text-white/78 md:text-[15px]"
            style={sans}
          >
            슬런치는 그 리듬을 한 주에 열네 번으로 나눕니다. 똑같은 메뉴표가 아니라, 같은 취향의 결 위에서 매주 새롭게 이어지는 식단을 설계합니다.
          </p>
        </motion.div>
      </FullBleedChapter>

      <section className={`${sectionRule} relative overflow-hidden py-20 md:min-h-[min(100svh,1020px)] md:py-32`}>
        <div className="page-container relative z-10">
          <div className="flex flex-col items-center gap-14 md:gap-20">
            <div className={`flex flex-col gap-8 md:gap-10 ${centerMid}`}>
              <motion.p
                custom={1}
                variants={introFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.22 }}
                className="text-[15px] leading-[1.9] text-warm-gray md:text-[16px]"
                style={sans}
              >
                <Link to="/spirit" className={linkInline}>
                  스피릿
                </Link>
                으로 나의 식취향을 파악하고,{' '}
                <Link to="/subscribe" className={linkInline}>
                  주간 식단
                </Link>
                으로 한 주를 채워보세요. 맛과 건강, 둘 중 하나를 선택할 필요가 없다는 사실은—먹어보면서 자연스럽게 알게 됩니다.
              </motion.p>
              <motion.p
                custom={2}
                variants={introFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-[15px] leading-[1.9] text-warm-gray md:text-[16px]"
                style={sans}
              >
                월요 점심부터 일요 저녁까지 한 주의 식탁이 그려지면, 장 보는 수고와 잔반 걱정이 자연스럽게 줄어듭니다.{' '}
                <Link to="/store" className={linkInline}>
                  슬런치 스토어
                </Link>
                에서는 구독과 관계없이, 그날 당기는 한 끼를 단품으로 담아도 됩니다.
              </motion.p>
              <motion.p
                custom={3}
                variants={introFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-[15px] leading-[1.85] text-warm-gray md:text-[16px]"
                style={sans}
              >
                제철의 맛과 나의 식습관이 만나는 지점.
                <br />
                아래로 내려가며 슬런치의 이야기를 이어갑니다.
              </motion.p>
            </div>

            <div className="grid w-full max-w-3xl grid-cols-3 gap-2 sm:gap-4 md:hidden">
              <img
                src={IMG.introA}
                alt=""
                className="aspect-[3/4] w-full rounded-sm object-cover shadow-md shadow-black/10"
                loading="lazy"
                decoding="async"
              />
              <img
                src={IMG.introB}
                alt=""
                className="aspect-[3/4] w-full rounded-sm object-cover shadow-md shadow-black/10"
                loading="lazy"
                decoding="async"
              />
              <img
                src={IMG.introC}
                alt=""
                className="aspect-[3/4] w-full rounded-sm object-cover shadow-md shadow-black/10"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** 풀블리드 이미지 띠 + 짧은 카피 — 스크롤 길이·리듬 */
function EditorialImageStrip() {
  const row: { src: string; alt: string }[] = [
    { src: IMG.strip1, alt: '구운 비트 카르파치오' },
    { src: IMG.strip2, alt: '녹시 채소 라자냐' },
    { src: IMG.strip3, alt: '지중해 풍 파스타' },
    { src: IMG.strip4, alt: '연어·아보카도 볼' },
  ];

  return (
    <section className={`${sectionRule} border-t-0 py-0`}>
      <div className="w-full overflow-x-auto [scrollbar-width:none] sm:overflow-x-visible [&::-webkit-scrollbar]:hidden">
        <ul className="mx-auto flex w-max min-w-full snap-x snap-mandatory gap-0 sm:grid sm:w-full sm:grid-cols-4 sm:gap-0">
          {row.map((item) => (
            <li
              key={item.src}
              className="relative aspect-[3/4] w-[min(48vw,220px)] shrink-0 snap-center sm:aspect-[4/5] sm:w-auto"
            >
              <FrameImage
                src={item.src}
                alt={item.alt}
                boxClassName="h-full min-h-[240px] w-full sm:min-h-0"
                className="h-full"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="page-container border-t border-[color:var(--border-hairline)] py-12 text-center md:py-16">
        <ScrollDriftY range={18}>
          <p
            className={`${centerNarrow} text-[15px] leading-[1.9] text-warm-gray md:text-[16px]`}
            style={sans}
          >
            같은 메뉴를 반복하는 게 아니라,{' '}
            <span className="text-black">같은 취향의 결</span> 위에서 매주 새롭게 이어지는 식탁입니다.
            <br className="hidden sm:block" />
            색깔과 식감, 국물의 무게가 균형을 이룰 때—비로소 &lsquo;내 식탁&rsquo;이라는 느낌이 옵니다.
          </p>
        </ScrollDriftY>
      </div>
    </section>
  );
}

/** 중앙 시 제 + 좌측만 상세(아카이브 페이지의 비대칭 노트 류) */
function EditorialRhythmBlock() {
  return (
    <section className={`${sectionRule} border-t-0 py-16 md:py-28`}>
      <div className="page-container">
        <motion.div
          className="mb-12 text-center md:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className="mb-4 text-xs tracking-[0.22em] text-warm-gray"
            style={{ ...sans, textTransform: 'uppercase' }}
          >
            Rhythm
          </p>
          <h2
            className="mx-auto max-w-[min(100%,36rem)] text-2xl font-normal leading-snug tracking-tight text-black md:text-[30px] md:leading-tight"
            style={sans}
          >
            가벼운 점심, 든든한 저녁, 그리고 그 사이. 하루의 무게는 날마다 다릅니다.
          </h2>
          <p
            className="mx-auto mt-6 max-w-[min(100%,30rem)] text-[15px] leading-[1.85] text-warm-gray md:text-[16px]"
            style={sans}
          >
            그래서 슬런치는 한 주를 &lsquo;같은 밀도&rsquo;가 아니라, <strong className="font-medium text-charcoal">같은 취향의 흐름</strong>으로
            구성합니다. 가볍게 지나가는 점심이 있으면, 충분히 앉아서 먹는 저녁도 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollDriftY className="lg:col-span-5" range={22}>
            <motion.div
              className="mx-auto max-w-xl text-center md:text-left lg:mx-0 lg:max-w-none"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p
                className="text-xs font-medium tracking-[0.18em] text-muted"
                style={sans}
              >
                Note
              </p>
              <div
                className="mt-6 space-y-5 text-[15px] leading-[1.9] text-warm-gray md:text-[16px]"
                style={sans}
              >
                <p>
                  14끼를 구성할 때, &lsquo;또 이거야&rsquo;라는 말이 나오지 않도록 무게와 재료를 나눕니다. 질리지 않는 다양성—그게 슬런치가 <strong className="font-medium text-charcoal">식단을 설계하는 방식</strong>이에요.
                </p>
                <p>
                  슬런치{' '}
                  <Link to="/newsletter" className={linkInline}>
                    뉴스레터
                  </Link>
                  에는 제철 이야기와 식습관 팁, 짧은 인터뷰가 담겨 있어요. 매주 한 번, 식탁의 언어로 건네는 편지에 가깝습니다.
                </p>
                <p>
                  손이 많이 가는 날도, 5분이 전부인 날도—슬런치는 그 옆에 맞는 한 끼를 <strong className="font-medium text-charcoal">미리 준비해 둡니다</strong>. 맛도 편리함도, 둘 다 포기하지 않아도 됩니다.
                </p>
              </div>
            </motion.div>
          </ScrollDriftY>
          <ScrollDriftY className="lg:col-span-7" range={40}>
            <div className="space-y-4 md:space-y-5">
              <motion.div variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                <ScrollPanImage
                  src={IMG.morning}
                  alt="아침 식탁"
                  boxClassName="aspect-[4/3] w-full"
                  panPx={190}
                  imgScale={1.95}
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                  <FrameImage src={IMG.ritual} alt="트라이·제품 모먼트" boxClassName="aspect-square w-full" />
                </motion.div>
                <motion.div variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} style={{ transitionDelay: '0.12s' }}>
                  <FrameImage src={IMG.outcome1} alt="한 끼 그릇" boxClassName="aspect-square w-full" />
                </motion.div>
              </div>
            </div>
          </ScrollDriftY>
        </div>
      </div>
    </section>
  );
}

/** Present Studio / Saba Jam 류 — 크림 톤, 실선 구분, 2열 에디토리얼 */
export const HomeEditorialContent: React.FC = () => {
  return (
    <div
      className="w-full overflow-x-hidden"
      style={{ backgroundColor: 'var(--palette-bg-2)', color: 'var(--palette-text)' }}
    >
      <EditorialIntroPlusMotion />
      <EditorialImageStrip />
      <EditorialRhythmBlock />

      {/* 에디토리얼 패닝 이미지 #9: Weekly 풀블리드 */}
      <FullBleedChapter
        imageSrc={IMG.bgChapter}
        imageAlt=""
        minClass="min-h-[min(70svh,800px)]"
        overlayClassName="bg-gradient-to-b from-black/72 via-black/5 to-black/35"
        imgScale={2.0}
        panPx={210}
      >
        <ScrollDriftY range={26}>
          <motion.div
            className={centerWide}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className="mb-5 text-xs tracking-[0.2em] text-white/65"
              style={{ ...sans, textTransform: 'uppercase' }}
            >
              Weekly
            </p>
            <h2
              className="text-2xl font-normal leading-snug tracking-tight text-white md:text-[30px] md:leading-tight"
              style={sans}
            >
              하루 두 끼면, 일주일은 열네 번의 식사
            </h2>
            <p
              className="mx-auto mt-8 max-w-[min(100%,30rem)] text-[15px] leading-[1.9] text-white/82 md:text-[16px]"
              style={sans}
            >
              점심과 저녁이 나란히 정해지고, 배송 날짜가 맞춰지면 한 주가 조용히 완성됩니다. &lsquo;오늘 뭐 먹지&rsquo;를 고민하는 시간이 줄수록, 먹는 순간에 더 온전히 집중할 수 있어요.
            </p>
          </motion.div>
        </ScrollDriftY>
      </FullBleedChapter>

      {/* 중앙 카피 → 하단 이미지(박스 패닝) */}
      <section className={`${sectionRule} border-t-0 py-16 md:py-24`}>
        <div className="page-container">
          <ScrollDriftY range={22}>
            <motion.div
              className={`${centerMid} mb-12 md:mb-16`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p
                className="mb-5 text-xs tracking-[0.18em] text-warm-gray"
                style={{ ...sans, textTransform: 'uppercase' }}
              >
                Before
              </p>
              <h2 className="mb-6 text-2xl md:text-[28px] font-normal leading-snug tracking-tight text-black" style={sans}>
                식재료는 먼저 출발하고, 끼니는 나중에 맞춰집니다
              </h2>
              <p className="text-[15px] leading-[1.9] text-warm-gray md:text-[16px]" style={sans}>
                신선한 재료가 정해진 날, 문 앞까지 바로 배달됩니다. 장 보는 수고를 덜면, 식재료 본연의 맛에 더 온전히 집중할 수 있어요.
              </p>
            </motion.div>
          </ScrollDriftY>
          <motion.div
            className="mx-auto max-w-4xl"
            variants={imgReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <ScrollPanImage
              src={IMG.morning}
              alt="하루를 여는 식탁"
              boxClassName="aspect-[4/5] w-full max-h-[min(72vh,560px)]"
              className="mx-auto w-full"
              panPx={200}
              imgScale={2.0}
            />
          </motion.div>
        </div>
      </section>

      {/* 인용: 중앙 — 이미지는 아래에 얹는 아카이브 톤 */}
      <section className={`${sectionRule} border-t-0 bg-[var(--palette-bg-2)] py-16 md:py-24`}>
        <div className="page-container">
          <ScrollDriftY range={20}>
            <motion.div
              className="mx-auto max-w-[min(100%,36rem)] text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <blockquote
                className="text-[clamp(22px,3.2vw,32px)] leading-[1.48] font-normal text-black"
                style={sans}
              >
                처음엔 &lsquo;내 취향에 맞을까&rsquo; 싶었는데, 일주일이 지나니 &lsquo;이게 편하다&rsquo;는 생각이 먼저 들었어요. 제철 조합이 매번 달라서 질리지 않고, 무엇보다 고민하는 시간이 줄었어요.
              </blockquote>
              <p
                className="mt-10 text-[11px] tracking-[0.16em] text-warm-gray"
                style={{ ...sans, textTransform: 'uppercase' }}
              >
                김서연 · 슬런치 구독 멤버, 서울
              </p>
            </motion.div>
          </ScrollDriftY>
          <motion.div
            className="mx-auto mt-14 max-w-md md:mt-16"
            variants={imgReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <FrameImage
              src={IMG.balance}
              alt="채소와 견과가 어우러진 한 끼"
              boxClassName="aspect-[3/4] w-full max-h-[min(64vh,480px)]"
              className="mx-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Outcomes: 케이스 스터디 류 — 좌·우 정렬(본문만), 블록은 중앙 정렬 */}
      <section className={`${sectionRule} border-t-0 py-16 md:py-24`}>
        <div className="page-container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 text-left lg:grid-cols-12 lg:gap-14">
            <ScrollDriftY className="lg:col-span-4" range={18}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
              <h3
                className="mb-0 text-sm font-normal tracking-[0.2em] text-black"
                style={{ ...sans, textTransform: 'uppercase' }}
              >
                Outcomes
              </h3>
              <ol
                className="mt-8 list-none space-y-8 border-t border-[color:var(--border-divider)] pt-8 pl-0 text-[15px] leading-[1.7] text-charcoal md:text-[16px] md:leading-[1.75]"
                style={sans}
              >
                <li className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="-ml-1 shrink-0 pt-[0.08em] text-right text-[clamp(16px,1.15vw,19px)] font-medium tabular-nums leading-none text-muted sm:-ml-2 sm:w-9 sm:pt-[0.12em] md:text-xl"
                  >
                    1.
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link to="/newsletter" className="text-black underline decoration-stone-500 underline-offset-[5px] hover:decoration-stone-900">
                      뉴스레터
                    </Link>
                    와 짧은 인터뷰 안에서, &lsquo;주간 14끼&rsquo;가 식탁 이야기로 자주 겹쳐 올라와요.
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="-ml-1 shrink-0 pt-[0.08em] text-right text-[clamp(16px,1.15vw,19px)] font-medium tabular-nums leading-none text-muted sm:-ml-2 sm:w-9 sm:pt-[0.12em] md:text-xl"
                  >
                    2.
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link to="/store" className="text-black underline decoration-stone-500 underline-offset-[5px] hover:decoration-stone-900">
                      스토어
                    </Link>
                    에서는 제철·시즌을 묶은 한정 끼가 이어지고, 구독 밖에서도 식탁의 결이 한 겹 넓어집니다.
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="-ml-1 shrink-0 pt-[0.08em] text-right text-[clamp(16px,1.15vw,19px)] font-medium tabular-nums leading-none text-muted sm:-ml-2 sm:w-9 sm:pt-[0.12em] md:text-xl"
                  >
                    3.
                  </span>
                  <div className="min-w-0 flex-1">
                    한 주를 한 번에 묶는 흐름이 잡히면, 끼니 사이의 &lsquo;비는 날&rsquo;이 줄고, 다시 담는 리듬이
                    자연스럽게 이어져요.
                  </div>
                </li>
              </ol>
              </motion.div>
            </ScrollDriftY>

            <ScrollDriftY className="lg:col-span-8" range={32}>
              <div>
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                  <motion.div className="flex flex-col" variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                    <FrameImage
                      src={IMG.outcome1}
                      alt="큐레이션된 한 끼"
                      boxClassName="aspect-[3/4] w-full max-h-[min(48vh,380px)]"
                    />
                  </motion.div>
                  <motion.div className="flex flex-col" variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} style={{ transitionDelay: '0.15s' }}>
                    <FrameImage
                      src={IMG.outcome2}
                      alt="함께하는 식탁"
                      boxClassName="aspect-[3/4] w-full max-h-[min(48vh,380px)]"
                    />
                  </motion.div>
                </div>
                <motion.div className="mt-4 flex flex-col md:mt-5" variants={imgReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
                  <FrameImage
                    src={IMG.outcome3}
                    alt="슬런치 구독·스토어 경험"
                    boxClassName="aspect-[21/10] w-full max-h-[min(40vh,320px)]"
                  />
                </motion.div>
              </div>
            </ScrollDriftY>
          </div>
        </div>
      </section>

      {/* ── 맨 아래: 작은 썸네일 + 서비스 안내 + 구독/스토어 유입 버튼 */}
      <section
        className="border-t border-[color:var(--border-hairline)]"
        style={{ backgroundColor: 'var(--white-pure)' }}
      >
        <div
          className="page-container flex flex-col items-stretch px-6 text-center"
          style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)' }}
        >
          <ScrollDriftY className="mx-auto w-full max-w-[30rem]" range={14}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
            <img
              src={`${base}home-editorial-footer-cutout.jpg`}
              alt=""
              className="mx-auto block h-16 w-16 object-contain md:h-20 md:w-20"
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
            />

            <h2
              className="mb-5 mt-6 text-lg font-medium leading-snug text-black md:text-xl"
              style={sans}
            >
              골라 담는 시간을 줄이고, 먹는 데 남는 시간을 늘리려고
            </h2>
            <div
              className="space-y-4 text-[15px] leading-[1.8] text-warm-gray md:text-[16px] md:leading-[1.85]"
              style={sans}
            >
              <p>
                슬런치는 채식·비건 식단을 하루의 자연스러운 일부로 만드는 브랜드입니다. 한 주의 끼니가 미리 정해지면, 매일의 &lsquo;뭐 먹지&rsquo; 고민이 사라지고 식탁 앞의 시간이 달라져요.
              </p>
              <p>
                주간 식단 구독을 시작하면 <strong className="font-medium text-charcoal">14끼</strong>가 한 번에 완성됩니다. 나의 스피릿에 맞는 추천으로 시작하거나, 직접 원하는 메뉴를 골라 구성하는 것도 가능해요.
              </p>
              <p>
                밀키트·소스·간편 재료는 <strong className="font-medium text-charcoal">스토어</strong>에서 구독과 별도로 구매할 수 있어요. 한 주 전체를 채우기 어려운 날도, 그 사이사이를 슬런치로 이어갈 수 있습니다.
              </p>
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/subscribe"
                className="editorial-cta-primary inline-flex min-h-[48px] w-full max-w-xs items-center justify-center px-6 text-[15px] font-medium sm:w-auto sm:min-w-[200px]"
                style={sans}
              >
                주간 식단 살펴보기
              </Link>
              <Link
                to="/store"
                className="editorial-cta-secondary inline-flex min-h-[48px] w-full max-w-xs items-center justify-center px-6 text-[15px] font-medium sm:w-auto sm:min-w-[200px]"
                style={sans}
              >
                스토어
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted" style={sans}>
              결제·배송·품목 안내는 각 페이지 기준으로 이어집니다.
            </p>
            </motion.div>
          </ScrollDriftY>
        </div>
      </section>
    </div>
  );
};
