import React, { useState } from 'react';
import { ChevronUp, Award, Calendar, FileText, Sparkles, Share2, Download } from 'lucide-react';
import { VegetableItem } from '../types';

interface SurveyPageProps {
  selectedItems: VegetableItem[];
}

// 질문 데이터
const QUESTIONS = [
  {
    id: 1,
    question: '어떤 식단을 선호하시나요?',
    options: [
      { label: '완전비건', description: '모든 동물성 식품을 피합니다', value: 'vegan' },
      { label: '락토비건', description: '유제품은 허용하지만 알류와 육류는 피합니다', value: 'lacto' },
      { label: '플렉시테리언', description: '가끔 육류나 생선을 먹을 수 있습니다', value: 'flexitarian' },
      { label: '페스케테리언', description: '생선은 허용하지만 육류는 피합니다', value: 'pescatarian' },
    ]
  },
  {
    id: 2,
    question: '선호하는 요리 스타일은?',
    options: [
      { label: '전통적인 요리', description: '검증된 전통 레시피를 선호합니다', value: 'traditional' },
      { label: '퓨전 요리', description: '다양한 문화의 요리를 조합하는 것을 좋아합니다', value: 'fusion' },
      { label: '간단한 요리', description: '최소한의 재료로 만드는 요리를 선호합니다', value: 'simple' },
      { label: '고급 요리', description: '정교하고 세련된 요리를 좋아합니다', value: 'gourmet' },
    ]
  },
  {
    id: 3,
    question: '요리할 때 가장 중요하게 생각하는 것은?',
    options: [
      { label: '영양 균형', description: '건강한 영양소 조합이 최우선입니다', value: 'nutrition' },
      { label: '맛', description: '맛있는 음식이 가장 중요합니다', value: 'taste' },
      { label: '간편함', description: '빠르고 쉽게 만들 수 있는 것이 좋습니다', value: 'convenience' },
      { label: '새로움', description: '새로운 재료나 조리법을 시도하는 것을 좋아합니다', value: 'novelty' },
    ]
  },
  {
    id: 4,
    question: '식사 시간에 가장 중요하게 생각하는 것은?',
    options: [
      { label: '가족과 함께', description: '가족이 함께하는 시간이 중요합니다', value: 'family' },
      { label: '건강한 식단', description: '영양적으로 균형잡힌 식사가 중요합니다', value: 'health' },
      { label: '빠른 식사', description: '시간을 절약할 수 있는 것이 중요합니다', value: 'quick' },
      { label: '새로운 경험', description: '새로운 맛과 경험을 하는 것이 중요합니다', value: 'experience' },
    ]
  },
  {
    id: 5,
    question: '비건 라이프를 선택한 주된 이유는?',
    options: [
      { label: '건강', description: '건강한 삶을 위해서입니다', value: 'health' },
      { label: '환경 보호', description: '환경을 보호하기 위해서입니다', value: 'environment' },
      { label: '동물 보호', description: '동물을 보호하기 위해서입니다', value: 'animal' },
      { label: '새로운 경험', description: '새로운 경험을 해보고 싶어서입니다', value: 'curiosity' },
    ]
  },
];

// 16가지 비건 유형
const VEGAN_TYPES = [
  { mbti: 'ENFP', name: 'Bloomist', emoji: '🌻', description: '새로운 식물성 실험을 즐기며 사람들과 나누는 생기형', color: '#F3B562' },
  { mbti: 'INFP', name: 'Mindgrower', emoji: '🌿', description: '윤리와 감정의 조화를 중시하는 사색가', color: '#A3C585' },
  { mbti: 'INFJ', name: 'Quiet Root', emoji: '🌱', description: '조용히 가치관을 실천하며 깊게 뿌리내리는 사람', color: '#6A8A6B' },
  { mbti: 'ENFJ', name: 'Lightgiver', emoji: '🌼', description: '사람들에게 따뜻한 에너지를 전파하는 리더형', color: '#F4C97E' },
  { mbti: 'ENTJ', name: 'Forger', emoji: '🍎', description: '비건의 구조를 재정립하는 강한 개혁가', color: '#8B7055' },
  { mbti: 'ESTJ', name: 'Groundtype', emoji: '🥦', description: '명확한 원칙으로 일상을 유지하는 현실주의자', color: '#BCA97E' },
  { mbti: 'ISTJ', name: 'Planter', emoji: '🌰', description: '계획적으로 루틴을 실천하며 안정감 있는 사람', color: '#9E8961' },
  { mbti: 'INTJ', name: 'Strategreen', emoji: '🌵', description: '데이터와 구조로 지속가능한 미래를 설계하는 자', color: '#5D7264' },
  { mbti: 'ISFP', name: 'Floret', emoji: '🌸', description: '예술적으로 비건을 표현하고 감각을 나누는 사람', color: '#E6B7C1' },
  { mbti: 'ESFP', name: 'Joybean', emoji: '🍑', description: '즉흥적이고 즐거운 미식과 유머를 사랑하는 사람', color: '#F6A880' },
  { mbti: 'ESFJ', name: 'Careleaf', emoji: '🌺', description: '주위를 돌보며 공동체적 조화를 이루는 사람', color: '#F2D68A' },
  { mbti: 'ISFJ', name: 'Nurturer', emoji: '🌾', description: '조용히 주변을 돕고 배려로 실천하는 사람', color: '#D6C6A5' },
  { mbti: 'INTP', name: 'Thinkroot', emoji: '🌴', description: '구조와 원리를 탐구하는 철저한 분석가형', color: '#7F9B8A' },
  { mbti: 'ENTP', name: 'Sparknut', emoji: '🍋', description: '새로운 관점으로 식문화를 재해석하는 발상가형', color: '#E8D26E' },
  { mbti: 'ISTP', name: 'Craftbean', emoji: '🫘', description: '손끝 감각으로 직접 실험하며 구현하는 제작자형', color: '#8D8570' },
  { mbti: 'ESTP', name: 'Wildgrain', emoji: '🌵', description: '즉흥적, 모험적이며 현장에서 비건을 즐기는 사람', color: '#C19F7B' },
];

// 몬스터 이름 생성 함수
const generateMonsterName = (items: VegetableItem[]): string => {
  if (items.length === 0) return 'Veggie Monster';
  
  // 선택한 야채 이름들을 조합해서 몬스터 이름 생성
  const names = items.map(item => item.name);
  const prefixes = ['Mighty', 'Ancient', 'Mystic', 'Cosmic', 'Wild', 'Sacred', 'Primal'];
  const suffixes = ['Guardian', 'Spirit', 'Beast', 'Titan', 'Golem', 'Dragon', 'Phoenix'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  // 야채 이름들의 첫 글자를 조합
  const veggiePart = names.map(n => n.slice(0, 3)).join('');
  
  return `${prefix} ${veggiePart}${suffix}`;
};

// 몬스터 설명 생성 함수
const generateMonsterDescription = (items: VegetableItem[]): string => {
  if (items.length === 0) return '';
  
  const names = items.map(item => item.name).join(', ');
  const descriptions = [
    `${names}의 힘을 흡수하여 탄생한 신비로운 채소 정령입니다.`,
    `${names}가 융합되어 만들어진 강력한 비건 수호자입니다.`,
    `${names}의 에센스가 결합된 자연의 화신입니다.`,
    `${names}의 영혼이 깃든 채소계의 전설적인 존재입니다.`,
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const SurveyPage: React.FC<SurveyPageProps> = ({ selectedItems }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  
  // AI 몬스터 이미지 관련 상태
  const [monsterImageUrl, setMonsterImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [monsterName, setMonsterName] = useState('');
  const [monsterDescription, setMonsterDescription] = useState('');

  const scrollToTop = () => {
    const container = document.querySelector('.snap-y');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOptionSelect = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // 마지막 질문 완료 시 결과 화면으로 + 몬스터 생성
      setShowResult(true);
      generateMonster();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // 몬스터 생성 함수 (나중에 API 연동)
  const generateMonster = async () => {
    setIsGeneratingImage(true);
    setMonsterName(generateMonsterName(selectedItems));
    setMonsterDescription(generateMonsterDescription(selectedItems));
    
    // TODO: 여기에 로컬 프롬프터 API 연동
    // 현재는 시뮬레이션 (2초 후 완료)
    // 
    // 연동 시 예상 코드:
    // const veggieNames = selectedItems.map(item => item.name);
    // const response = await fetch('http://localhost:YOUR_PORT/generate-monster', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ vegetables: veggieNames })
    // });
    // const data = await response.json();
    // setMonsterImageUrl(data.imageUrl);
    
    setTimeout(() => {
      // 플레이스홀더: 실제 연동 시 이 부분을 API 응답으로 대체
      setMonsterImageUrl(null); // null이면 플레이스홀더 표시
      setIsGeneratingImage(false);
    }, 2000);
  };

  // 이미지 재생성 함수
  const regenerateMonster = () => {
    generateMonster();
  };

  // 결과 계산 (간단한 로직)
  const calculateResult = () => {
    // 답변 기반으로 MBTI 유사 계산
    let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;
    
    // 식단 선호도
    if (answers[1] === 'vegan' || answers[1] === 'lacto') { i++; j++; }
    else { e++; p++; }
    
    // 요리 스타일
    if (answers[2] === 'traditional' || answers[2] === 'simple') { s++; j++; }
    else { n++; p++; }
    
    // 요리 시 중요한 것
    if (answers[3] === 'nutrition' || answers[3] === 'convenience') { t++; }
    else { f++; }
    
    // 식사 시간
    if (answers[4] === 'family' || answers[4] === 'experience') { f++; e++; }
    else { t++; i++; }
    
    // 비건 이유
    if (answers[5] === 'health' || answers[5] === 'environment') { t++; j++; }
    else { f++; p++; }
    
    const mbti = `${e >= i ? 'E' : 'I'}${n >= s ? 'N' : 'S'}${f >= t ? 'F' : 'T'}${p >= j ? 'P' : 'J'}`;
    
    const result = VEGAN_TYPES.find(type => type.mbti === mbti) || VEGAN_TYPES[0];
    const confidence = 60 + Math.random() * 30; // 60-90%
    
    return { ...result, confidence: confidence.toFixed(1) };
  };

  // 시작 전 화면
  if (!started) {
    return (
      <div className="min-h-screen bg-stone-100">
        {/* 상단 바 */}
        <div className="h-2 bg-stone-200"></div>
        
        {/* 위로 가기 버튼 */}
        <button
          onClick={scrollToTop}
          className="fixed top-6 left-6 z-50 w-10 h-10 bg-black shadow-lg rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-colors"
          title="재료 다시 선택하기"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-sm text-center">
            <div className="text-6xl mb-6">🥗</div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              나의 비건 유형 찾기
            </h2>
            <p className="text-stone-500 mb-8">
              5가지 질문으로 당신만의 비건 페르소나를 발견해보세요
            </p>
            
            {selectedItems.length > 0 && (
              <div className="flex justify-center gap-3 mb-8">
                {selectedItems.map(item => (
                  <div key={item.id} className="w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-white">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain bg-stone-50" />
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setStarted(true)}
              className="w-full py-4 bg-black text-white rounded-2xl font-semibold hover:bg-stone-800 transition-colors"
            >
              시작하기
            </button>
            
            <p className="text-stone-400 text-sm mt-4">
              ↑ 위로 스크롤하면 재료를 다시 선택할 수 있어요
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 결과 화면
  if (showResult) {
    const result = calculateResult();
    
    return (
      <div className="min-h-screen bg-stone-100">
        {/* 상단 진행 바 */}
        <div className="h-2 bg-[#4CAF50]"></div>
        
        {/* 위로 가기 버튼 */}
        <button
          onClick={scrollToTop}
          className="fixed top-6 left-6 z-50 w-10 h-10 bg-black shadow-lg rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-sm">
            
            {/* 🎨 AI 생성 몬스터 영역 */}
            <div className="mb-8">
              {/* 몬스터 이미지 */}
              <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 via-lime-50 to-yellow-100">
                {isGeneratingImage ? (
                  // 로딩 상태
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-500"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500 animate-pulse" />
                    </div>
                    <p className="mt-4 text-emerald-600 font-medium">몬스터 생성 중...</p>
                    <p className="text-sm text-stone-400 mt-1">
                      {selectedItems.map(i => i.name).join(' + ')}
                    </p>
                  </div>
                ) : monsterImageUrl ? (
                  // 실제 AI 생성 이미지
                  <img 
                    src={monsterImageUrl} 
                    alt={monsterName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // 플레이스홀더 (API 연동 전)
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="text-8xl mb-4">🌱</div>
                    <div className="flex gap-2 mb-4">
                      {selectedItems.map((item, idx) => (
                        <div 
                          key={item.id} 
                          className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md"
                          style={{ marginLeft: idx > 0 ? '-8px' : '0' }}
                        >
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain bg-white" />
                        </div>
                      ))}
                    </div>
                    <p className="text-stone-500 text-sm text-center">
                      AI 이미지 연동 대기 중
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      프롬프터 연동 시 자동 생성됩니다
                    </p>
                  </div>
                )}
                
                {/* 재생성 버튼 */}
                {!isGeneratingImage && (
                  <button
                    onClick={regenerateMonster}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-stone-700 hover:bg-white transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    다시 생성
                  </button>
                )}
              </div>
              
              {/* 몬스터 이름 & 설명 */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-800 mb-2">
                  {monsterName || 'Your Veggie Monster'}
                </h2>
                <p className="text-stone-500 text-sm mb-4">
                  {monsterDescription || '선택한 야채들로 만들어진 당신만의 몬스터'}
                </p>
                
                {/* 재료 태그 */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {selectedItems.map(item => (
                    <span 
                      key={item.id}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${item.color || '#4CAF50'}20`,
                        color: item.color || '#4CAF50'
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 구분선 */}
            <div className="border-t border-stone-200 my-6"></div>
            
            {/* 비건 유형 결과 */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${result.color}30` }}>
                <Award className="w-8 h-8" style={{ color: result.color }} />
              </div>
              
              <h3 className="text-xl font-bold text-stone-800 mb-1">
                {result.emoji} {result.name}
              </h3>
              <p className="text-stone-500 text-sm mb-4">
                {result.description}
              </p>
              
              {/* 신뢰도 바 */}
              <div className="inline-block rounded-full px-4 py-2" style={{ backgroundColor: `${result.color}20` }}>
                <span className="text-sm font-semibold" style={{ color: result.color }}>
                  매칭률: {result.confidence}%
                </span>
              </div>
            </div>
            
            {/* 특징 & 성격 */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-stone-50 rounded-2xl p-4">
                <h4 className="font-semibold text-stone-800 mb-2">특징</h4>
                <p className="text-stone-600">식이: {answers[1] === 'vegan' ? '완전비건' : answers[1] === 'lacto' ? '락토비건' : answers[1] === 'flexitarian' ? '플렉시테리언' : '페스케테리언'}</p>
                <p className="text-stone-600">스타일: {answers[2] === 'traditional' ? '전통식' : answers[2] === 'fusion' ? '퓨전' : answers[2] === 'simple' ? '심플' : '고급'}</p>
                <p className="text-stone-600">가치: {answers[3] === 'nutrition' ? '영양' : answers[3] === 'taste' ? '맛' : answers[3] === 'convenience' ? '간편함' : '새로움'}</p>
              </div>
              <div className="bg-stone-50 rounded-2xl p-4">
                <h4 className="font-semibold text-stone-800 mb-2">성격</h4>
                <p className="text-stone-600">MBTI: {result.mbti}</p>
                <p className="text-stone-600">라이프: {answers[4] === 'family' ? '가족형' : answers[4] === 'health' ? '건강형' : answers[4] === 'quick' ? '효율형' : '탐험형'}</p>
                <p className="text-stone-600">동기: {answers[5] === 'health' ? '건강' : answers[5] === 'environment' ? '환경' : answers[5] === 'animal' ? '동물보호' : '경험'}</p>
              </div>
            </div>
            
            {/* 액션 버튼들 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="py-3 px-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                식단 추천받기
              </button>
              <button className="py-3 px-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                레시피 보기
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 px-4 border-2 border-stone-200 text-stone-600 rounded-xl font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                공유하기
              </button>
              <button className="py-3 px-4 border-2 border-stone-200 text-stone-600 rounded-xl font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                이미지 저장
              </button>
            </div>
            
            {/* 다시하기 */}
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setAnswers({});
                setStarted(false);
                setMonsterImageUrl(null);
                setMonsterName('');
                setMonsterDescription('');
              }}
              className="w-full mt-4 py-3 text-stone-500 hover:text-stone-700 transition-colors"
            >
              처음부터 다시하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 질문 화면
  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-stone-100">
      {/* 상단 진행 바 */}
      <div className="h-2 bg-stone-200">
        <div 
          className="h-full bg-[#4CAF50] transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* 위로 가기 버튼 */}
      <button
        onClick={scrollToTop}
        className="fixed top-6 left-6 z-50 w-10 h-10 bg-black shadow-lg rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-colors"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-white rounded-3xl p-10 max-w-xl w-full shadow-sm">
          {/* 질문 */}
          <h2 className="text-2xl font-bold text-center text-stone-800 mb-8">
            {currentQuestion.question}
          </h2>
          
          {/* 옵션들 */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-black bg-stone-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="font-semibold text-stone-800">{option.label}</div>
                <div className="text-sm text-stone-500">{option.description}</div>
              </button>
            ))}
          </div>
          
          {/* 네비게이션 버튼 */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 border-2 border-stone-300 text-stone-600 rounded-xl font-semibold hover:bg-stone-50 transition-colors"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                answers[currentQuestion.id]
                  ? 'bg-black text-white hover:bg-stone-800'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {currentStep < QUESTIONS.length - 1 ? '다음' : '결과 보기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
