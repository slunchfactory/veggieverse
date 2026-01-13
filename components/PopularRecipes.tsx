import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  likes?: number;
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  recipeId: number | null;
}

// 인기 레시피 20개 데이터
const popularRecipes: Recipe[] = [
  { id: 1, title: '두부 스테이크', image: '/veggieverse/vege_flot_img/mushroom.png', likes: 2847 },
  { id: 2, title: '아보카도 포케', image: '/veggieverse/vege_flot_img/avocado.png', likes: 2634 },
  { id: 3, title: '레몬 파스타', image: '/veggieverse/vege_flot_img/lemon.png', likes: 2512 },
  { id: 4, title: '배추 된장국', image: '/veggieverse/vege_flot_img/napa cabbage.png', likes: 2398 },
  { id: 5, title: '망고 푸딩', image: '/veggieverse/vege_flot_img/coconut.png', likes: 2287 },
  { id: 6, title: '블루베리 오트밀', image: '/veggieverse/vege_flot_img/blueberry.png', likes: 2156 },
  { id: 7, title: '토마토 브루스게타', image: '/veggieverse/vege_flot_img/tomato.png', likes: 2089 },
  { id: 8, title: '바나나 스무디', image: '/veggieverse/vege_flot_img/banana.png', likes: 1987 },
  { id: 9, title: '당근 케이크', image: '/veggieverse/vege_flot_img/carrot.png', likes: 1876 },
  { id: 10, title: '시금치 샐러드', image: '/veggieverse/vege_flot_img/spinach.png', likes: 1765 },
  { id: 11, title: '호박 수프', image: '/veggieverse/vege_flot_img/pumpkin.png', likes: 1654 },
  { id: 12, title: '브로콜리 볶음', image: '/veggieverse/vege_flot_img/broccoli.png', likes: 1543 },
  { id: 13, title: '오이 피클', image: '/veggieverse/vege_flot_img/cucumber.png', likes: 1432 },
  { id: 14, title: '체리 타르트', image: '/veggieverse/vege_flot_img/cherry.png', likes: 1321 },
  { id: 15, title: '딸기 파르페', image: '/veggieverse/vege_flot_img/strawberry.png', likes: 1210 },
  { id: 16, title: '포도 젤리', image: '/veggieverse/vege_flot_img/grapes.png', likes: 1109 },
  { id: 17, title: '파인애플 볶음밥', image: '/veggieverse/vege_flot_img/pineapple.png', likes: 1008 },
  { id: 18, title: '수박 화채', image: '/veggieverse/vege_flot_img/watermelon.png', likes: 907 },
  { id: 19, title: '키위 요거트', image: '/veggieverse/vege_flot_img/kiwi.png', likes: 806 },
  { id: 20, title: '복숭아 아이스티', image: '/veggieverse/vege_flot_img/peach.png', likes: 705 },
];

// 파일명 생성 (확장자 .rec)
const getFileName = (title: string) => title.replace(/\s+/g, '_') + '.rec';

// 그리드 기반 위치 + 랜덤 오프셋 생성 (폴더 영역 피하기)
const generateGridPositions = (count: number): { x: number; y: number }[] => {
  const cols = 5;
  const cellWidth = 95;
  const cellHeight = 105;
  const offsetRange = 8;

  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const randomX = (Math.random() - 0.5) * offsetRange * 2;
    const randomY = (Math.random() - 0.5) * offsetRange * 2;
    return {
      x: col * cellWidth + 15 + randomX,
      y: row * cellHeight + 10 + randomY,
    };
  });
};

// 레트로 스타일 상수
const RETRO = {
  bgLight: '#C0C0C0',
  bgDark: '#808080',
  borderLight: '#DFDFDF',
  borderDark: '#404040',
  titleBarBg: 'linear-gradient(180deg, #000080 0%, #1084D0 100%)',
  windowBg: '#C0C0C0',
  contentBg: '#FFFFFF',
  pixelFont: "'Pixelify Sans', 'VT323', monospace",
  menuHover: '#000080',
  menuHoverText: '#FFFFFF',
};

// ═══════════════════════════════════════════════════════════════
// 레트로 컨텍스트 메뉴 컴포넌트
// ═══════════════════════════════════════════════════════════════
const RetroContextMenu: React.FC<{
  x: number;
  y: number;
  recipe: Recipe | null;
  onClose: () => void;
  onSave: () => void;
  onView: () => void;
}> = ({ x, y, recipe, onClose, onSave, onView }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!recipe) return null;

  const menuItems = [
    { label: '📂 열기', sublabel: 'Open', action: onView },
    { label: '💾 저장하기', sublabel: 'Save to My_Recipe', action: onSave },
    { divider: true },
    { label: '📋 정보 보기', sublabel: `${recipe.likes?.toLocaleString()} likes`, action: () => {} },
  ];

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 99999,
        minWidth: '180px',
        background: RETRO.bgLight,
        border: '2px solid',
        borderColor: `${RETRO.borderLight} ${RETRO.borderDark} ${RETRO.borderDark} ${RETRO.borderLight}`,
        boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
        padding: '2px',
        fontFamily: RETRO.pixelFont,
      }}
    >
      {/* 메뉴 제목 */}
      <div
        style={{
          padding: '4px 8px',
          background: RETRO.titleBarBg,
          color: '#fff',
          fontSize: '11px',
          fontWeight: 600,
          marginBottom: '2px',
          textShadow: '1px 1px 0 #000',
        }}
      >
        {getFileName(recipe.title)}
      </div>

      {/* 메뉴 항목들 */}
      {menuItems.map((item, idx) =>
        item.divider ? (
          <div
            key={idx}
            style={{
              height: '1px',
              background: '#808080',
              margin: '4px 4px',
              boxShadow: '0 1px 0 #DFDFDF',
            }}
          />
        ) : (
          <div
            key={idx}
            onClick={() => {
              item.action?.();
              onClose();
            }}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = RETRO.menuHover;
              e.currentTarget.style.color = RETRO.menuHoverText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#000';
            }}
          >
            <span>{item.label}</span>
            {item.sublabel && (
              <span style={{ fontSize: '10px', opacity: 0.7 }}>{item.sublabel}</span>
            )}
          </div>
        )
      )}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 드래그 가능한 파일 아이콘 컴포넌트
// ═══════════════════════════════════════════════════════════════
const DraggableFile: React.FC<{
  recipe: Recipe;
  gridPosition: { x: number; y: number };
  onDrop: (id: number) => void;
  folderRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  zIndex: number;
  onDragStart: () => void;
  isSelected: boolean;
  onSelect: () => void;
  onContextMenu: (e: React.MouseEvent, recipe: Recipe) => void;
}> = ({ recipe, gridPosition, onDrop, folderRef, containerRef, zIndex, onDragStart, isSelected, onSelect, onContextMenu }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOverFolder, setIsOverFolder] = useState(false);
  const fileRef = useRef<HTMLDivElement>(null);

  const checkOverFolder = useCallback((point: { x: number; y: number }) => {
    if (!folderRef.current) return false;
    const folderRect = folderRef.current.getBoundingClientRect();
    return (
      point.x > folderRect.left - 20 &&
      point.x < folderRect.right + 20 &&
      point.y > folderRect.top - 20 &&
      point.y < folderRect.bottom + 20
    );
  }, [folderRef]);

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart();
    onSelect();
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsOverFolder(checkOverFolder(info.point));
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (checkOverFolder(info.point)) {
      onDrop(recipe.id);
    }
    setIsOverFolder(false);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    onContextMenu(e, recipe);
  };

  return (
    <motion.div
      ref={fileRef}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={containerRef}
      initial={{ x: gridPosition.x, y: gridPosition.y }}
      style={{
        position: 'absolute',
        zIndex: isDragging ? 9999 : zIndex,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileDrag={{
        scale: 1.08,
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
      }}
      whileHover={{ scale: 1.02 }}
      onClick={(e) => {
        if (!isDragging) {
          onSelect();
        }
      }}
      onContextMenu={handleRightClick}
    >
      <div
        style={{
          width: '72px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '6px',
          borderRadius: '2px',
          background: isSelected ? 'rgba(0, 0, 128, 0.2)' : 'transparent',
          border: isSelected ? '1px dotted #000080' : '1px solid transparent',
        }}
      >
        {/* 픽셀 아트 스타일 파일 아이콘 */}
        <div
          style={{
            width: '48px',
            height: '48px',
            position: 'relative',
            background: '#FFFFFF',
            border: '2px solid #000',
            borderRadius: '2px',
            overflow: 'hidden',
            boxShadow: isOverFolder
              ? '0 0 8px 2px #FFD700'
              : 'inset -1px -1px 0 #808080, inset 1px 1px 0 #FFFFFF',
          }}
        >
          {/* 파일 접힌 모서리 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '10px',
              height: '10px',
              background: 'linear-gradient(135deg, transparent 50%, #C0C0C0 50%)',
              borderLeft: '1px solid #808080',
              borderBottom: '1px solid #808080',
              zIndex: 2,
            }}
          />
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              imageRendering: 'auto',
              pointerEvents: 'none',
            }}
            draggable={false}
          />
        </div>
        {/* 파일명 - 픽셀 폰트 */}
        <span
          style={{
            marginTop: '4px',
            fontSize: '10px',
            fontFamily: RETRO.pixelFont,
            color: '#000',
            textAlign: 'center',
            wordBreak: 'break-all',
            lineHeight: 1.1,
            maxWidth: '70px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textShadow: isSelected ? '0 0 0' : '1px 1px 0 #fff',
          }}
        >
          {getFileName(recipe.title)}
        </span>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 픽셀 아트 폴더 아이콘 SVG
// ═══════════════════════════════════════════════════════════════
const PixelFolder: React.FC<{ isOpen: boolean; size?: number }> = ({ isOpen, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
    {isOpen ? (
      // 열린 폴더
      <>
        <rect x="2" y="8" width="28" height="20" fill="#FFD700" stroke="#000" strokeWidth="1"/>
        <rect x="2" y="6" width="12" height="4" fill="#FFD700" stroke="#000" strokeWidth="1"/>
        <rect x="4" y="10" width="26" height="16" fill="#FFEC8B" stroke="#000" strokeWidth="1"/>
        <line x1="4" y1="14" x2="28" y2="14" stroke="#DAA520" strokeWidth="1"/>
        <line x1="4" y1="18" x2="28" y2="18" stroke="#DAA520" strokeWidth="1"/>
        <line x1="4" y1="22" x2="28" y2="22" stroke="#DAA520" strokeWidth="1"/>
      </>
    ) : (
      // 닫힌 폴더
      <>
        <rect x="2" y="10" width="28" height="18" fill="#FFD700" stroke="#000" strokeWidth="1"/>
        <rect x="2" y="8" width="12" height="4" fill="#FFD700" stroke="#000" strokeWidth="1"/>
        <rect x="4" y="12" width="24" height="2" fill="#FFEC8B"/>
        <rect x="4" y="16" width="24" height="8" fill="#DAA520" opacity="0.3"/>
      </>
    )}
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// 모바일용 가로 스크롤 카드
// ═══════════════════════════════════════════════════════════════
const MobileRecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
  <Link
    to={`/recipe/${recipe.id}`}
    style={{
      display: 'block',
      minWidth: '140px',
      textDecoration: 'none',
    }}
  >
    <div
      style={{
        border: '2px solid #000',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: 'inset -2px -2px 0 #808080, inset 2px 2px 0 #DFDFDF',
      }}
    >
      <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '8px', background: '#C0C0C0' }}>
        <p style={{
          fontSize: '12px',
          color: '#000',
          margin: 0,
          fontFamily: RETRO.pixelFont,
        }}>
          {recipe.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
          <Heart size={10} style={{ color: '#E53935', fill: '#E53935' }} />
          <span style={{ fontSize: '10px', color: '#404040', fontFamily: RETRO.pixelFont }}>
            {recipe.likes?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// ═══════════════════════════════════════════════════════════════
// 메인 컴포넌트
// ═══════════════════════════════════════════════════════════════
export const PopularRecipes: React.FC = () => {
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [folderOpen, setFolderOpen] = useState(false);
  const [positions] = useState(() => generateGridPositions(popularRecipes.length));
  const [highestZ, setHighestZ] = useState(10);
  const [zIndices, setZIndices] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    popularRecipes.forEach((r, i) => { initial[r.id] = i + 1; });
    return initial;
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    recipeId: null,
  });
  const folderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 창 바깥 클릭 시 컨텍스트 메뉴 닫기
  useEffect(() => {
    const handleGlobalClick = () => {
      if (contextMenu.show) {
        setContextMenu(prev => ({ ...prev, show: false }));
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [contextMenu.show]);

  const handleDrop = (id: number) => {
    if (savedRecipes.includes(id)) return;

    setFolderOpen(true);
    setSavedRecipes((prev) => [...prev, id]);

    const recipe = popularRecipes.find((r) => r.id === id);
    setToastMessage(`📁 "${recipe?.title}" saved!`);
    setShowToast(true);

    setTimeout(() => {
      setFolderOpen(false);
      setShowToast(false);
    }, 2000);
  };

  const handleDragStart = (id: number) => {
    setHighestZ((prev) => prev + 1);
    setZIndices((prev) => ({ ...prev, [id]: highestZ + 1 }));
  };

  const handleContextMenu = (e: React.MouseEvent, recipe: Recipe) => {
    e.preventDefault();
    e.stopPropagation();

    // 메뉴가 화면 밖으로 나가지 않도록 조정
    const menuWidth = 180;
    const menuHeight = 150;
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setContextMenu({
      show: true,
      x,
      y,
      recipeId: recipe.id,
    });
  };

  const handleSaveFromMenu = () => {
    if (contextMenu.recipeId) {
      handleDrop(contextMenu.recipeId);
    }
  };

  const handleViewFromMenu = () => {
    if (contextMenu.recipeId) {
      navigate(`/recipe/${contextMenu.recipeId}`);
    }
  };

  const visibleRecipes = popularRecipes.filter((r) => !savedRecipes.includes(r.id));
  const contextMenuRecipe = contextMenu.recipeId
    ? popularRecipes.find((r) => r.id === contextMenu.recipeId) || null
    : null;

  // 모바일: 가로 스크롤 리스트
  if (isMobile) {
    return (
      <section style={{ padding: '16px 0' }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            padding: '0 16px 16px',
            scrollSnapType: 'x mandatory',
          }}
          className="no-scrollbar"
        >
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} style={{ scrollSnapAlign: 'start' }}>
              <MobileRecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 데스크톱: 리얼 레트로 맥 OS 스타일
  // ═══════════════════════════════════════════════════════════════
  return (
    <section style={{ padding: '0' }}>
      <div className="page-container">
        {/* ═══ Retro Window Frame ═══ */}
        <div
          style={{
            // 비벨(Bevel) 테두리 - 입체감
            border: '2px solid',
            borderColor: `${RETRO.borderLight} ${RETRO.borderDark} ${RETRO.borderDark} ${RETRO.borderLight}`,
            background: RETRO.windowBg,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          }}
        >
          {/* ═══ Title Bar ═══ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 6px',
              background: RETRO.titleBarBg,
              borderBottom: `2px solid ${RETRO.borderDark}`,
              minHeight: '28px',
            }}
          >
            {/* 신호등 버튼 */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '2px',
                  background: 'linear-gradient(180deg, #FF6B6B 0%, #C0392B 100%)',
                  border: '1px solid',
                  borderColor: '#FFAAAA #8B0000 #8B0000 #FFAAAA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <span style={{ fontSize: '10px', color: '#4A0000', fontWeight: 'bold', lineHeight: 1 }}>×</span>
              </div>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '2px',
                  background: 'linear-gradient(180deg, #F1C40F 0%, #D4AC0D 100%)',
                  border: '1px solid',
                  borderColor: '#FFEB99 #8B7500 #8B7500 #FFEB99',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <span style={{ fontSize: '10px', color: '#5D4E00', fontWeight: 'bold', lineHeight: 1 }}>−</span>
              </div>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '2px',
                  background: 'linear-gradient(180deg, #2ECC71 0%, #27AE60 100%)',
                  border: '1px solid',
                  borderColor: '#98FB98 #006400 #006400 #98FB98',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <span style={{ fontSize: '8px', color: '#004000', fontWeight: 'bold', lineHeight: 1 }}>□</span>
              </div>
            </div>

            {/* 창 제목 */}
            <div style={{ flex: 1, textAlign: 'center', marginLeft: '50px' }}>
              <span style={{
                fontSize: '14px',
                color: '#FFFFFF',
                fontFamily: RETRO.pixelFont,
                fontWeight: 600,
                textShadow: '1px 1px 0 #000',
                letterSpacing: '1px',
              }}>
                📂 The Recipe Finder
              </span>
            </div>

            <div style={{ width: '50px' }} />
          </div>

          {/* ═══ Menu Bar ═══ */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              padding: '4px 8px',
              background: '#C0C0C0',
              borderBottom: '1px solid #808080',
              fontFamily: RETRO.pixelFont,
              fontSize: '12px',
            }}
          >
            <span style={{ cursor: 'pointer' }}>File</span>
            <span style={{ cursor: 'pointer' }}>Edit</span>
            <span style={{ cursor: 'pointer' }}>View</span>
            <span style={{ cursor: 'pointer' }}>Help</span>
          </div>

          {/* ═══ Window Content - 스크롤 가능 영역 ═══ */}
          <div
            ref={scrollRef}
            style={{
              height: '70vh',
              minHeight: '500px',
              maxHeight: '700px',
              overflowY: 'auto',
              overflowX: 'hidden',
              background: '#FFFFFF',
              border: '2px solid',
              borderColor: `${RETRO.borderDark} ${RETRO.borderLight} ${RETRO.borderLight} ${RETRO.borderDark}`,
              margin: '4px',
              position: 'relative',
            }}
          >
            {/* 도트 패턴 배경 + 드래그 영역 */}
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                minHeight: '600px',
                width: '100%',
                paddingBottom: '120px',
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 15px,
                    rgba(0,0,0,0.03) 15px,
                    rgba(0,0,0,0.03) 16px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 15px,
                    rgba(0,0,0,0.03) 15px,
                    rgba(0,0,0,0.03) 16px
                  )
                `,
                backgroundSize: '16px 16px',
              }}
            >
              {/* 드래그 가능한 파일들 */}
              {visibleRecipes.map((recipe, index) => (
                <DraggableFile
                  key={recipe.id}
                  recipe={recipe}
                  gridPosition={positions[popularRecipes.findIndex(r => r.id === recipe.id)] || { x: 50, y: 50 }}
                  onDrop={handleDrop}
                  folderRef={folderRef}
                  containerRef={containerRef}
                  zIndex={zIndices[recipe.id] || index + 1}
                  onDragStart={() => handleDragStart(recipe.id)}
                  isSelected={selectedId === recipe.id}
                  onSelect={() => setSelectedId(recipe.id)}
                  onContextMenu={handleContextMenu}
                />
              ))}

              {/* ═══ My_Recipe 폴더 (드롭 존) - 창 내부 우측 하단 ═══ */}
              <motion.div
                ref={folderRef}
                animate={{
                  scale: folderOpen ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: folderOpen ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.02)',
                  border: folderOpen ? '2px dashed #DAA520' : '2px dashed #C0C0C0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border 0.2s',
                  zIndex: 100,
                }}
                whileHover={{
                  background: 'rgba(255,215,0,0.15)',
                  border: '2px dashed #DAA520',
                }}
              >
                <motion.div
                  animate={{ rotateY: folderOpen ? 15 : 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <PixelFolder isOpen={folderOpen} size={56} />
                </motion.div>
                <span
                  style={{
                    marginTop: '6px',
                    fontSize: '12px',
                    color: '#000',
                    fontFamily: RETRO.pixelFont,
                    fontWeight: 500,
                  }}
                >
                  My_Recipe
                </span>
                {savedRecipes.length > 0 && (
                  <span
                    style={{
                      fontSize: '10px',
                      color: '#666',
                      fontFamily: RETRO.pixelFont,
                      marginTop: '2px',
                      background: '#FFD700',
                      padding: '2px 6px',
                      borderRadius: '2px',
                    }}
                  >
                    {savedRecipes.length} items
                  </span>
                )}
              </motion.div>
            </div>
          </div>

          {/* ═══ Status Bar ═══ */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 8px',
              background: '#C0C0C0',
              borderTop: '1px solid #DFDFDF',
              fontFamily: RETRO.pixelFont,
              fontSize: '11px',
              color: '#404040',
            }}
          >
            <span>{visibleRecipes.length} items</span>
            <span>Right-click for options</span>
            <span>💾 {savedRecipes.length} saved</span>
          </div>
        </div>

        {/* ═══ 컨텍스트 메뉴 ═══ */}
        {contextMenu.show && (
          <RetroContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            recipe={contextMenuRecipe}
            onClose={() => setContextMenu(prev => ({ ...prev, show: false }))}
            onSave={handleSaveFromMenu}
            onView={handleViewFromMenu}
          />
        )}

        {/* ═══ Toast Message ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: showToast ? 1 : 0,
            y: showToast ? 0 : 30,
            scale: showToast ? 1 : 0.9,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 24px',
            background: '#000080',
            color: '#FFFFFF',
            fontFamily: RETRO.pixelFont,
            fontSize: '14px',
            border: '2px solid',
            borderColor: '#4040FF #000040 #000040 #4040FF',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            zIndex: 10000,
          }}
        >
          {toastMessage}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularRecipes;
