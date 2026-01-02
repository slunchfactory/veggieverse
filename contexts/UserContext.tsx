import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// 배지 카테고리 정의
export type BadgeCategory = 'spirit' | 'activity' | 'grade' | 'hidden';

// 배지 타입 정의
export type BadgeType =
  // 스피릿 배지 (16개)
  | 'spirit-bloomist' | 'spirit-mindgrower' | 'spirit-quietroot' | 'spirit-lightgiver'
  | 'spirit-forger' | 'spirit-groundtype' | 'spirit-planter' | 'spirit-strategreen'
  | 'spirit-floret' | 'spirit-joybean' | 'spirit-careleaf' | 'spirit-nurturer'
  | 'spirit-thinkroot' | 'spirit-sparknut' | 'spirit-craftbean' | 'spirit-wildgrain'
  // 활동 배지 (4개)
  | 'first-recipe' | 'comment-master' | 'recipe-lover' | 'community-star'
  // 등급 배지 (5개)
  | 'grade-seed' | 'grade-sprout' | 'grade-stem' | 'grade-leaf' | 'grade-fruit'
  // 히든 배지 (5개)
  | 'hidden-secret-chef' | 'hidden-night-owl' | 'hidden-early-bird' | 'hidden-perfectionist' | 'hidden-explorer';

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  earnedAt?: string;
}

// 유저 정보 타입
export interface User {
  id: string;
  username: string;
  profileImage: string | null;
  spiritType: string | null; // MBTI 타입 (예: 'ENFP')
  spiritName: string | null; // 스피릿 이름 (예: 'Bloomist')
  badges: Badge[];
  recipes: number;
  comments: number;
  likes: number;
  joinedAt: string;
}

// 쿠폰 타입
export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  earnedAt: string;
  used: boolean;
}

interface UserContextType {
  user: User | null;
  coupons: Coupon[];
  setUser: (user: User | null) => void;
  addBadge: (badgeId: BadgeType) => Coupon | null;
  addCoupon: (coupon: Coupon) => void;
  updateUserStats: (updates: Partial<Pick<User, 'recipes' | 'comments' | 'likes'>>) => void;
  hasBadge: (badgeId: BadgeType) => boolean;
  login: (username: string, spiritType: string, spiritName: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 배지 데이터
const ALL_BADGES: Record<BadgeType, Omit<Badge, 'earnedAt'>> = {
  // 스피릿 배지
  'spirit-bloomist': { id: 'spirit-bloomist', name: 'Bloomist 요리사', description: 'Bloomist 활동 완료', icon: '🌻', category: 'spirit' },
  'spirit-mindgrower': { id: 'spirit-mindgrower', name: 'Mindgrower 요리사', description: 'Mindgrower 활동 완료', icon: '🌿', category: 'spirit' },
  'spirit-quietroot': { id: 'spirit-quietroot', name: 'Quiet Root 요리사', description: 'Quiet Root 활동 완료', icon: '🌱', category: 'spirit' },
  'spirit-lightgiver': { id: 'spirit-lightgiver', name: 'Lightgiver 요리사', description: 'Lightgiver 활동 완료', icon: '🌼', category: 'spirit' },
  'spirit-forger': { id: 'spirit-forger', name: 'Forger 요리사', description: 'Forger 활동 완료', icon: '🍎', category: 'spirit' },
  'spirit-groundtype': { id: 'spirit-groundtype', name: 'Groundtype 요리사', description: 'Groundtype 활동 완료', icon: '🥦', category: 'spirit' },
  'spirit-planter': { id: 'spirit-planter', name: 'Planter 요리사', description: 'Planter 활동 완료', icon: '🌰', category: 'spirit' },
  'spirit-strategreen': { id: 'spirit-strategreen', name: 'Strategreen 요리사', description: 'Strategreen 활동 완료', icon: '🌵', category: 'spirit' },
  'spirit-floret': { id: 'spirit-floret', name: 'Floret 요리사', description: 'Floret 활동 완료', icon: '🌸', category: 'spirit' },
  'spirit-joybean': { id: 'spirit-joybean', name: 'Joybean 요리사', description: 'Joybean 활동 완료', icon: '🍑', category: 'spirit' },
  'spirit-careleaf': { id: 'spirit-careleaf', name: 'Careleaf 요리사', description: 'Careleaf 활동 완료', icon: '🌺', category: 'spirit' },
  'spirit-nurturer': { id: 'spirit-nurturer', name: 'Nurturer 요리사', description: 'Nurturer 활동 완료', icon: '🌾', category: 'spirit' },
  'spirit-thinkroot': { id: 'spirit-thinkroot', name: 'Thinkroot 요리사', description: 'Thinkroot 활동 완료', icon: '🌴', category: 'spirit' },
  'spirit-sparknut': { id: 'spirit-sparknut', name: 'Sparknut 요리사', description: 'Sparknut 활동 완료', icon: '🍋', category: 'spirit' },
  'spirit-craftbean': { id: 'spirit-craftbean', name: 'Craftbean 요리사', description: 'Craftbean 활동 완료', icon: '🫘', category: 'spirit' },
  'spirit-wildgrain': { id: 'spirit-wildgrain', name: 'Wildgrain 요리사', description: 'Wildgrain 활동 완료', icon: '🌵', category: 'spirit' },
  // 활동 배지
  'first-recipe': { id: 'first-recipe', name: '첫 레시피', description: '첫 레시피를 투고했습니다', icon: '🎉', category: 'activity' },
  'comment-master': { id: 'comment-master', name: '댓글 마스터', description: '댓글을 5개 이상 작성했습니다', icon: '💬', category: 'activity' },
  'recipe-lover': { id: 'recipe-lover', name: '레시피 러버', description: '레시피를 10개 이상 좋아요했습니다', icon: '❤️', category: 'activity' },
  'community-star': { id: 'community-star', name: '커뮤니티 스타', description: '커뮤니티에 활발히 참여했습니다', icon: '⭐', category: 'activity' },
  // 등급 배지
  'grade-seed': { id: 'grade-seed', name: 'Seed 등급', description: '회원가입 완료', icon: '🌰', category: 'grade' },
  'grade-sprout': { id: 'grade-sprout', name: 'Sprout 등급', description: '첫 주문 완료', icon: '🌱', category: 'grade' },
  'grade-stem': { id: 'grade-stem', name: 'Stem 등급', description: '누적 5만원 이상 구매', icon: '🌿', category: 'grade' },
  'grade-leaf': { id: 'grade-leaf', name: 'Leaf 등급', description: '누적 10만원 이상 구매', icon: '🍃', category: 'grade' },
  'grade-fruit': { id: 'grade-fruit', name: 'Fruit 등급', description: '누적 20만원 이상 구매', icon: '🍎', category: 'grade' },
  // 히든 배지
  'hidden-secret-chef': { id: 'hidden-secret-chef', name: '시크릿 셰프', description: '?', icon: '👨‍🍳', category: 'hidden' },
  'hidden-night-owl': { id: 'hidden-night-owl', name: '올빼미 셰프', description: '?', icon: '🦉', category: 'hidden' },
  'hidden-early-bird': { id: 'hidden-early-bird', name: '얼리버드', description: '?', icon: '🐦', category: 'hidden' },
  'hidden-perfectionist': { id: 'hidden-perfectionist', name: '완벽주의자', description: '?', icon: '💎', category: 'hidden' },
  'hidden-explorer': { id: 'hidden-explorer', name: '탐험가', description: '?', icon: '🧭', category: 'hidden' },
};

// 스피릿 이름을 배지 ID로 변환
const spiritNameToBadgeId = (spiritName: string): BadgeType | null => {
  const mapping: Record<string, BadgeType> = {
    'Bloomist': 'spirit-bloomist',
    'Mindgrower': 'spirit-mindgrower',
    'Quiet Root': 'spirit-quietroot',
    'Lightgiver': 'spirit-lightgiver',
    'Forger': 'spirit-forger',
    'Groundtype': 'spirit-groundtype',
    'Planter': 'spirit-planter',
    'Strategreen': 'spirit-strategreen',
    'Floret': 'spirit-floret',
    'Joybean': 'spirit-joybean',
    'Careleaf': 'spirit-careleaf',
    'Nurturer': 'spirit-nurturer',
    'Thinkroot': 'spirit-thinkroot',
    'Sparknut': 'spirit-sparknut',
    'Craftbean': 'spirit-craftbean',
    'Wildgrain': 'spirit-wildgrain',
  };
  return mapping[spiritName] || null;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 개발용: 기본 mock user 데이터
  const mockUser: User = {
    id: 'dev-user-1',
    username: '개발자',
    profileImage: null,
    spiritType: 'ENFP',
    spiritName: 'Bloomist',
    badges: [
      { id: 'spirit-bloomist', name: 'Bloomist 요리사', description: 'Bloomist 활동 완료', icon: '🌻', category: 'spirit', earnedAt: new Date().toISOString() },
      { id: 'first-recipe', name: '첫 레시피', description: '첫 레시피를 투고했습니다', icon: '🎉', category: 'activity', earnedAt: new Date().toISOString() },
    ],
    recipes: 5,
    comments: 12,
    likes: 23,
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 전
  };

  const [user, setUserState] = useState<User | null>(mockUser); // 개발용: mock user로 초기화
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  // localStorage에서 유저 정보 로드
  useEffect(() => {
    const savedUser = localStorage.getItem('veggieverse-user');
    const savedCoupons = localStorage.getItem('veggieverse-coupons');
    
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user data:', e);
        // 에러 발생 시 mock user 유지
        setUserState(mockUser);
      }
    } else {
      // localStorage에 없으면 mock user 사용
      setUserState(mockUser);
    }
    
    if (savedCoupons) {
      try {
        setCoupons(JSON.parse(savedCoupons));
      } catch (e) {
        console.error('Failed to load coupons:', e);
      }
    }
  }, []);

  // 유저 정보 저장
  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('veggieverse-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('veggieverse-user');
    }
  }, []);

  // 쿠폰 저장
  useEffect(() => {
    if (coupons.length > 0) {
      localStorage.setItem('veggieverse-coupons', JSON.stringify(coupons));
    }
  }, [coupons]);

  // 쿠폰 추가 (먼저 정의)
  const addCoupon = useCallback((coupon: Coupon) => {
    setCoupons(prev => [...prev, coupon]);
  }, []);

  // 배지 추가
  const addBadge = useCallback((badgeId: BadgeType): Coupon | null => {
    if (!user) return null;
    
    // 이미 보유한 배지인지 확인
    if (user.badges.some(b => b.id === badgeId)) return null;
    
    const badgeData = ALL_BADGES[badgeId];
    const newBadge: Badge = {
      ...badgeData,
      earnedAt: new Date().toISOString(),
    };
    
    const updatedUser: User = {
      ...user,
      badges: [...user.badges, newBadge],
    };
    
    setUser(updatedUser);
    
    // 쿠폰 발급
    const coupon: Coupon = {
      id: `coupon-${Date.now()}`,
      code: `VEGGIE${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      discount: 10,
      type: 'percentage',
      earnedAt: new Date().toISOString(),
      used: false,
    };
    
    addCoupon(coupon);
    
    return coupon;
  }, [user, addCoupon]);

  // 유저 통계 업데이트
  const updateUserStats = useCallback((updates: Partial<Pick<User, 'recipes' | 'comments' | 'likes'>>) => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      ...updates,
    };
    
    setUser(updatedUser);
    
    // 활동 배지 체크
    if (updates.recipes !== undefined && updates.recipes === 1 && !user.badges.some(b => b.id === 'first-recipe')) {
      addBadge('first-recipe');
    }
    if (updates.comments !== undefined && updates.comments >= 5 && !user.badges.some(b => b.id === 'comment-master')) {
      addBadge('comment-master');
    }
    if (updates.likes !== undefined && updates.likes >= 10 && !user.badges.some(b => b.id === 'recipe-lover')) {
      addBadge('recipe-lover');
    }
  }, [user, addBadge]);

  // 배지 보유 여부 확인
  const hasBadge = useCallback((badgeId: BadgeType) => {
    return user?.badges.some(b => b.id === badgeId) || false;
  }, [user]);

  // 로그인
  const login = useCallback((username: string, spiritType: string, spiritName: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      profileImage: null,
      spiritType,
      spiritName,
      badges: [],
      recipes: 0,
      comments: 0,
      likes: 0,
      joinedAt: new Date().toISOString(),
    };
    
    setUser(newUser);
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    setUser(null);
    setCoupons([]);
    localStorage.removeItem('veggieverse-user');
    localStorage.removeItem('veggieverse-coupons');
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        coupons,
        setUser,
        addBadge,
        addCoupon,
        updateUserStats,
        hasBadge,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { ALL_BADGES, spiritNameToBadgeId };

