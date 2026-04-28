import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const base = import.meta.env.BASE_URL;

type StoryBeat = {
  eyebrow: string;
  title: string;
  body: string;
  images: { src: string; alt: string; className: string }[];
};

const BEATS: StoryBeat[] = [
  {
    eyebrow: 'THE STORY',
    title: '주 14끼 식단',
    body: '하루 두 끼, 일주일이면 열네 번의 식사가 완성됩니다. 고르기만 하면 되는 주간 식단이 천천히 모습을 드러내요.',
    images: [
      { src: `${base}14meals.png`, alt: '주 14끼 식단', className: 'top-[8%] left-[4%] w-[22vw] max-w-[140px] md:max-w-[180px] aspect-[3/4] object-cover' },
      { src: `${base}balance.png`, alt: '', className: 'bottom-[18%] right-[6%] w-[26vw] max-w-[160px] md:max-w-[200px] aspect-[4/3] object-cover' },
    ],
  },
  {
    eyebrow: '',
    title: '신선 새벽 배송',
    body: '밤새 준비한 식재료는 새벽에 출발해, 월요일 아침 문 앞까지 닿습니다. 덜 익은 날을 기다리지 않아도 돼요.',
    images: [
      { src: `${base}dawn.png`, alt: '신선 새벽 배송', className: 'top-[14%] right-[4%] w-[24vw] max-w-[150px] md:max-w-[190px] aspect-[4/3] object-cover' },
      { src: `${base}14meals.png`, alt: '', className: 'bottom-[12%] left-[8%] w-[20vw] max-w-[130px] md:max-w-[170px] aspect-square object-cover opacity-90' },
    ],
  },
  {
    eyebrow: '',
    title: '완벽 설계',
    body: '영양 밸런스와 입맛, AI와 셰프가 한데 모아 당신만의 한 주를 설계합니다. 설렘만 남기고 고민은 덜어내요.',
    images: [
      { src: `${base}balance.png`, alt: '완벽 설계', className: 'top-[10%] left-[10%] w-[22vw] max-w-[140px] md:max-w-[175px] aspect-[3/4] object-cover' },
      { src: `${base}dawn.png`, alt: '', className: 'bottom-[20%] right-[10%] w-[28vw] max-w-[170px] md:max-w-[210px] aspect-[16/10] object-cover' },
    ],
  },
];

function StoryPanel({ beat, index }: { beat: StoryBeat; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ['start end', 'end start'],
  });

  const ySlow = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const yFast = useTransform(scrollYProgress, [0, 1], [68, -68]);

  return (
    <div
      ref={panelRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 py-20 md:px-10"
    >
      {beat.images.map((img, i) => (
        <motion.img
          key={`${index}-${i}`}
          src={img.src}
          alt={img.alt}
          className={`pointer-events-none absolute select-none rounded-sm shadow-lg border border-white/10 ${img.className}`}
          style={{ y: i === 0 ? ySlow : yFast }}
          loading="lazy"
        />
      ))}

      <motion.div
        className="relative z-10 max-w-[min(100%,28rem)] text-center"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {beat.eyebrow ? (
          <p
            className="mb-4 text-[10px] md:text-[11px] font-medium tracking-[0.22em] text-white/75"
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
          >
            {beat.eyebrow}
          </p>
        ) : null}
        <h3
          className="text-white mb-5 md:mb-6 font-normal leading-[1.2] tracking-tight"
          style={{
            fontSize: 'clamp(1.65rem, 4.5vw, 2.75rem)',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {beat.title}
        </h3>
        <p
          className="text-white/88 leading-[1.85] text-[13px] md:text-[14px] font-normal"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            letterSpacing: '-0.02em',
          }}
        >
          {beat.body}
        </p>
      </motion.div>
    </div>
  );
}

export const SlunchWeeklyStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="scroll-snap-section-flex relative overflow-hidden"
      style={{
        backgroundColor: '#5c4338',
        color: '#fff',
      }}
    >
      <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-6 md:pt-8 pointer-events-none">
        <motion.p
          style={{ opacity: hintOpacity }}
          className="text-[11px] tracking-[0.12em] text-white/50 uppercase"
        >
          Scroll to explore
        </motion.p>
      </div>

      <div className="page-container relative z-10 pt-10 pb-4 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-white/70 mb-2">SLUNCH WEEKLY</p>
          <h2
            className="text-white font-normal mb-1"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            이야기처럼 펼쳐지는 한 주
          </h2>
        </motion.div>
      </div>

      {BEATS.map((beat, i) => (
        <StoryPanel key={i} beat={beat} index={i} />
      ))}

      <div className="page-container relative z-10 pb-20 md:pb-28 text-center">
        <Link
          to="/subscribe"
          className="inline-block px-7 py-3.5 text-[15px] font-normal transition-colors duration-200 border border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#5c4338] min-h-[44px] min-w-[120px] rounded-none"
        >
          슬런치 위클리 보러가기
        </Link>
      </div>
    </section>
  );
};
