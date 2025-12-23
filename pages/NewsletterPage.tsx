import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Footer } from '../components/Footer';

interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  thumbnail: string;
  authorBio?: string; // 작성자 소개
  quote?: string; // 본문 상단 인용구
  contentBeforeImages?: React.ReactNode; // 이미지 전 본문
  images?: {
    large?: string | { url: string; caption?: string }; // 큰 이미지 1개 (문자열 또는 객체)
    small?: Array<string | { url: string; caption?: string }>; // 작은 이미지 2개 (좌우 배치)
  };
  contentAfterImages?: React.ReactNode; // 큰 이미지 후 본문
  contentAfterSmallImages?: React.ReactNode; // 작은 이미지 후 본문
  content?: React.ReactNode; // 기존 content (하위 호환성)
}

// 작성자 정보 매핑
const AUTHOR_BIO: Record<string, string> = {
  'Huna': '슬런치팩토리의 대표. 맛있는 것 앞에서는 누구보다 솔직해진다.\n먹는 것에 진심인 사람들과 함께 이 공간을 만들어가고 있다.',
  'Josin': '12년 차가 넘어가는 슬런치팩토리의 기둥. 오래 머물고 싶은 맛을 고민한다.\n묵묵히 주방을 지키며 팀의 중심을 잡아주는 사람.',
  'ChaCha': '작고 동그랗고 귀여운 것을 좋아하는 디자이너. 사소한 것에서 영감을 얻는 편이다.',
  'Jin': '뭐든지 다 잘하는 듬직한 막내 직원. 없으면 안 되는 존재가 되어가는 중.',
};

// 작성자 프로필 이미지 매핑
const AUTHOR_AVATAR: Record<string, string> = {
  'Huna': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  'Josin': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
  'ChaCha': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
  'Jin': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
};

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'HEALTH',
    title: '멈춰야 보이는 것들',
    subtitle: '번아웃을 겪고 나서야 깨달은 것들',
    author: 'Josin',
    date: '2024.12.10',
    thumbnail: '/article-1.jpg',
    quote: '요즘 나는 알람을 30분 늦춰놨다. 그 30분 동안 천장을 보며 멍하니 있는다.\n아무것도 안 하는 시간. 그게 하루 중 제일 좋다.',
    contentBeforeImages: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          작년 여름, 나는 침대에서 일어날 수가 없었다. 몸이 아픈 게 아니었다. 알람을 끄고 천장을 한 시간 동안 바라봤다. 출근해야 한다는 걸 알면서도, 그냥 아무것도 하고 싶지 않았다. 번아웃이라는 단어를 머리로는 알고 있었지만, 그게 내 이야기가 될 줄은 몰랐다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          돌이켜보면 신호는 있었다. 좋아하던 일이 싫어지기 시작했고, 주말에도 월요일 걱정을 했다. 친구들 만나는 게 귀찮아졌고, 취미생활은 언제 했는지 기억도 안 났다. 그런데도 나는 계속 달렸다. 멈추면 뒤처질 것 같았고, 뒤처지면 다시는 따라잡을 수 없을 것 같았다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg', // 큰 이미지 1개
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'], // 작은 이미지 2개
    },
    contentAfterImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">열심히의 함정</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          우리는 '열심히'를 미덕으로 배웠다. 새벽까지 일하면 성실한 사람이고, 주말에도 노트북을 켜면 책임감 있는 사람이다. 쉬는 건 게으른 것이고, 여유를 부리면 도태되는 것이다. 그렇게 믿으며 살았다. 그 믿음이 나를 침대에 눕혀놓기 전까지는.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          번아웃이 오고 나서야 깨달았다. 나는 왜 이렇게까지 달렸을까. 정말 이 일이 좋아서였을까, 아니면 멈추는 게 두려워서였을까. 매일 출근하면서 '이게 내가 원하던 삶인가?' 생각했다. 근데 바빠서 그 질문을 계속 미뤘다. 멈추고 나서야 그 질문과 제대로 마주할 수 있었다.
        </p>

        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">노 빡빡</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          회복하는 데 결정적이었던 건 태국 치앙마이 여행이었다. 거기서 만난 현지인이 내가 뭘 하든 이렇게 말했다. "노 빡빡. 천천히 해도 돼. 내일 해도 돼." 처음엔 답답했다. 나는 돈 주고 온 관광객인데, 왜 이렇게 느긋한 거지. 근데 며칠이 지나자 그 말이 위로가 되기 시작했다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          서울에서 프리랜서의 삶을 유지하기 위해 정말 '빡빡'하게 살았다. 그게 당연한 줄 알았다. 근데 치앙마이에서는 아무도 그렇게 살지 않았다. 카페 사장님은 손님이 와도 천천히 커피를 내렸고, 시장 상인들은 흥정하다 말고 점심을 먹으러 갔다. 그들이 게으른 게 아니었다. 다만 삶의 속도가 달랐을 뿐이었다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">쉬는 것도 일의 일부</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          지금은 일주일에 하루, 무조건 쉬는 날을 정해두고 있다. 처음엔 불안했다. 이 시간에 다른 사람들은 일하고 있을 텐데. 근데 신기하게도 쉬고 나면 오히려 작업 효율이 올라갔다. 억지로 책상 앞에 앉아 있던 시간들이 얼마나 비효율적이었는지 그제야 알았다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          번아웃은 실패가 아니다. 몸이 보내는 신호다. '너 지금 잘못된 방향으로 가고 있어'라는. 나는 그 신호를 너무 오래 무시했다. 완전히 쓰러지고 나서야 멈췄다. 지금 이 글을 읽는 누군가가 나처럼 되지 않았으면 좋겠다. 쓰러지기 전에 멈춰도 된다. 쉬는 것도 일의 일부다.
        </p>
      </>
    ),
  },
  {
    id: 2,
    category: 'CULTURE',
    title: '2060년, 나는 마흔이 된다',
    subtitle: '초고령 사회를 앞둔 Z세대의 고민',
    author: 'Huna',
    date: '2024.12.05',
    thumbnail: '/article-2.jpg',
    quote: '2060년의 나에게 편지를 쓴다면 이렇게 쓸 것 같다.\n그때도 계속 배우고 있길. 그리고 아직도 할머니한테 전화하고 있길.',
    contentBeforeImages: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          고등학교 사회 시간에 인구 피라미드 그래프를 봤다. 2025년 한국의 65세 이상 인구 비율은 약 20%. 2050년이 되면 40%를 넘는다고 했다. 선생님이 말했다. "2050년이면 너희가 마흔 즈음 되겠네. 그때는 일하는 사람보다 은퇴한 사람이 더 많아." 교실이 조용해졌다. 나도 계산을 해봤다. 2060년이면 나는 마흔일곱이다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          막연하게 알고 있던 '고령화'가 갑자기 내 문제로 다가왔다. 뉴스에서 듣던 이야기가 아니라, 내 미래 이야기였다. 연금은 받을 수 있을까. 부모님은 어떻게 모실까. 내가 늙으면 누가 나를 돌봐줄까. 열일곱에 하기엔 너무 무거운 생각들이 머리에 가득 찼다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">정답이 없는 시대</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          부모님 세대에는 정답이 있었다. 좋은 대학 가고, 좋은 회사 들어가고, 정년까지 버티면 됐다. 근데 우리 세대는 다르다. 10년 뒤에 어떤 직업이 살아남을지 아무도 모른다. 지금 인기 있는 직업이 AI에 대체될 수도 있고, 아직 존재하지 않는 직업이 뜰 수도 있다. 유튜버라는 직업이 10년 전엔 없었던 것처럼.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          그래서 어른들이 하는 말이 다 맞는 것 같지도 않다. "안정적인 직장을 구해라." 근데 안정적인 직장이 뭔데요? "공무원이 최고야." 근데 공무원 연금도 언제까지 나올지 모르잖아요. 조언을 구해도 시원한 답이 없다. 어른들도 모르는 것 같다. 솔직히.
        </p>

        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">외할머니 댁에서 찾은 힌트</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          설날에 외할머니 댁에 갔다. 할머니가 스마트폰으로 카카오톡 보내는 법을 물어보셨다. 가르쳐드리면서 생각했다. 이런 분들이 우리 할머니만 있는 게 아니구나. 배달 앱 쓰는 법, 유튜브 보는 법, 화상통화하는 법. 배우고 싶어 하시는 게 엄청 많았다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          문득 이런 생각이 들었다. 고령화가 위기라면, 고령층을 위한 서비스는 기회 아닐까. 시니어를 위한 디지털 교육, 건강 관리, 돌봄 서비스. 지금 존재하지 않는 직업이 내 직업이 될 수도 있겠다. 위기와 기회는 같은 곳에서 온다고 했던가.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">관계라는 자원</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          어떤 책에서 읽었다. 초고령 사회에서 가장 중요한 자원은 돈도 기술도 아니라 '관계'라고. 세대 간 갈등이 아니라 연대가 필요한 시대가 온다고. 어르신들의 경험과 젊은 세대의 기술이 만나면 시너지가 난다고. 그 말이 와닿았다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          집에 가는 길에 외할머니께 전화를 걸었다. "할머니, 요즘 뭐 불편한 거 없어요?" 대화가 30분이나 이어졌다. 그 30분 안에 사업 아이디어가 세 개쯤 있었던 것 같기도 하고. 농담이 아니라 진심이다.
        </p>
      </>
    ),
  },
  {
    id: 3,
    category: 'FOOD',
    title: '냉장고를 열면 한 끼가 보인다',
    subtitle: '배달 앱 골드 등급이 집밥을 시작한 이유',
    author: 'ChaCha',
    date: '2024.11.28',
    thumbnail: '/article-3.jpg',
    quote: '냉장고를 열면 한 끼가 보인다는 말이 이제 조금 이해가 된다.\n거창한 요리를 할 필요 없다. 있는 재료로, 먹을 만큼만, 내 입맛대로. 그게 집밥이다.',
    contentBeforeImages: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          나는 배달 앱 골드 등급이다. 자랑이 아니라 반성이다. 집밥을 해먹고 싶은 마음은 있다. 근데 퇴근하면 장 볼 힘이 없고, 주말에 장을 봐도 재료가 냉장고에서 시든다. 양파가 싹을 틔운 걸 발견했을 때의 죄책감이란. 결국 배달 앱을 켠다. 이번 달 배달비만 15만원이다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          언젠가부터 인스타그램에 집밥 사진 올리는 사람들이 부러워졌다. 예쁜 그릇에 담긴 한 상 차림. 나는 왜 저렇게 못 할까. 그 부러움이 요리에 대한 압박이 됐다. 집밥을 하려면 저 정도는 해야 하는 것 같았다. 그래서 더 시작을 못 했다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">완벽주의라는 적</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          집밥의 가장 큰 적은 완벽주의다. 이걸 깨닫는 데 오래 걸렸다. 예쁘게 차려야 한다, 영양 균형을 맞춰야 한다, 반찬이 여러 개 있어야 한다. 그런 생각이 시작도 하기 전에 지치게 만들었다. 어느 날 깨달았다. 밥 위에 계란 후라이 하나 올리면 그게 한 끼라는 걸.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          요리는 예술이 아니라 생존 기술이다. 배고프면 먹어야 하고, 매일 배달 시키면 통장이 텅 빈다. 그게 다다. 거창할 것 없다. 인스타그램에 올릴 것도 아닌데 뭘 그렇게 예쁘게 하려고 했을까. 이제는 안다. 맛있으면 장땡이다.
        </p>

        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">일주일 식단의 비밀</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          요즘은 일요일에 한 번만 장을 본다. 온라인으로 시킨다. 마트 가면 과자를 사거든. 나만 그런가. 새벽 배송이면 자고 일어나면 와 있다. 장 보는 시간 30분, 들고 오는 체력, 다 아낄 수 있다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          그리고 '만능 재료'를 정해뒀다. 양파, 계란, 대파, 두부. 이 네 가지는 항상 냉장고에 있다. 이것만 있으면 볶음밥, 계란찜, 된장찌개, 두부조림이 된다. 화려하진 않지만 충분히 맛있다. 비결은 '중복'이다. 월요일에 만든 찌개 국물로 화요일엔 우동을 끓이고, 남은 재료는 수요일 볶음밥에 넣는다. 새로운 요리를 매일 하는 게 아니라 변주를 하는 거다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">라면도 집에서 끓이면 다르다</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          솔직히 집밥이 제일 맛있다. 내 입맛에 맞게 간을 할 수 있으니까. 라면도 집에서 끓이면 다르다. 계란 넣고, 파 송송 썰어 넣고. 그 수고로움이 맛이 된다. 배달 음식은 편하지만 뭔가 허전하다. 집밥은 허전하지 않다. 내가 만들었다는 게 양념이 되는 것 같다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          어젯밤에 간장 계란밥을 해먹었다. 밥 위에 계란 후라이, 간장 한 스푼, 참기름 몇 방울, 김가루. 끝이다. 5분도 안 걸렸다. 근데 배달 음식보다 맛있었다. 먹으면서 생각했다. 이게 뭐라고 이렇게 뿌듯하지.
        </p>
      </>
    ),
  },
  {
    id: 4,
    category: 'LIFE',
    title: '"그 영화 재밌어" 다음에 할 말',
    subtitle: '소개팅에서 영화 이야기 잘하는 법',
    author: 'Jin',
    date: '2024.11.20',
    thumbnail: '/article-4.jpg',
    quote: '다음 소개팅에서는 이렇게 물어봐야겠다.\n\'최근 본 영화 중에 제일 웃겼던 장면이 뭐예요?\'\n무겁지 않으면서 상대방의 유머 코드를 알 수 있을 것 같다.',
    contentBeforeImages: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          소개팅에서 영화 이야기를 잘 못한다. "최근에 뭐 봤어요?"라고 물으면 "음... 넷플릭스에서 뭐 봤는데..." 하다가 제목이 생각 안 나서 멈칫한다. 겨우 제목을 떠올려도 "재밌었어요" 말고 할 말이 없다. 어색한 침묵. 다른 주제로 넘어간다. 매번 그랬다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          그래서 생각해봤다. 영화 이야기를 왜 못할까. 영화를 안 봐서? 아니다, 꽤 본다. 영화를 몰라서? 그것도 아닌 것 같다. 문제는 '어떻게' 이야기하는지 몰랐던 거다. 영화 줄거리를 설명하면 스포일러가 되고, 감상을 말하려니 "재밌었어요" 말고 떠오르는 게 없고.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">피해야 할 것들</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          먼저 피해야 할 것부터 정리했다. 스포일러는 당연히 안 된다. "그 영화 반전이 진짜..."까지만 말해도 이미 반전이 있다는 걸 알려준 거다. 그리고 상대방 취향을 평가하는 말. "그 영화도 몰라요?" "마블은 영화가 아니야." 이런 말은 대화를 끝내는 가장 빠른 방법이다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          영화 지식 자랑도 금물이다. "이 영화의 시네마토그래피가 어쩌고저쩌고..." 이러면 대화가 아니라 강의가 된다. 상대방이 영화학과라면 모를까. 소개팅은 나를 뽐내는 자리가 아니다. 상대방과 연결되는 자리다. 그걸 자꾸 잊어버린다.
        </p>

        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">'왜'를 물어보는 것</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          좋은 영화 이야기는 '왜'를 물어보는 거라고 한다. "어떤 영화 좋아해요?"보다 "그 영화 왜 좋아해요?"가 훨씬 좋은 질문이다. 상대방이 자기 이야기를 할 수 있게 해주니까. 영화 취향은 그 사람이 세상을 어떻게 보는지를 말해준다. 로맨스를 좋아하는 사람, 스릴러를 좋아하는 사람, 다큐멘터리를 좋아하는 사람. 각자 다른 걸 원하고, 다른 걸 두려워한다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          영화관 경험을 물어보는 것도 좋다고 한다. "제일 기억에 남는 영화관 경험이 뭐예요?" 이러면 영화 내용뿐 아니라 그때 누구랑 갔는지, 어떤 기분이었는지까지 이야기할 수 있다. 영화가 아니라 그 사람의 기억을 듣는 거다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">취향이 달라도 괜찮다</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          취향이 다를 때도 기회다. "저는 그 영화 별로였는데, 어떤 점이 좋았어요?" 이렇게 물으면 상대방의 관점을 이해할 수 있다. 싸우라는 게 아니다. 다름을 인정하고 호기심을 보이는 거다. 같은 영화를 봐도 다르게 느낄 수 있다는 걸 받아들이면, 대화가 훨씬 풍성해진다.
        </p>
      </>
    ),
  },
  {
    id: 5,
    category: "SLUNCH'S PICK",
    title: '마음을 전하는 데 10만원은 필요 없다',
    subtitle: '3만원으로 완성하는 크리스마스 선물',
    author: 'Josin',
    date: '2024.11.15',
    thumbnail: '/article-5.jpg',
    quote: '어제 편의점에 들렀다. 핫초코 스틱 3개, 마시멜로 한 봉지, 그리고 엽서 한 장.\n합계 7천원. 엽서에 뭐라고 쓸지 벌써 생각하고 있다.\n\'추운 날, 이거 마시면서 녹아.\'',
    contentBeforeImages: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          크리스마스가 다가오면 스트레스를 받는다. 뭘 선물해야 할지 모르겠고, 좋은 거 사주자니 통장이 걱정되고, 저렴한 거 사자니 성의 없어 보일까 봐 걱정된다. 해마다 반복되는 고민이다. 올해도 어김없이 12월이 왔고, 나는 또 검색창에 '크리스마스 선물 추천'을 치고 있다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          검색 결과를 보면 한숨이 나온다. "20대 여자친구 선물 TOP 10" 같은 글에 나오는 건 죄다 10만원이 넘는다. 향수, 지갑, 악세서리. 그런 걸 살 돈이 있으면 고민을 안 하지. 나는 3만원으로 어떻게든 해결해야 하는 사람이다.
        </p>
      </>
    ),
    images: {
      large: '/newsletter/articles/image1.jpg',
      small: ['/newsletter/articles/image2.jpg', '/newsletter/articles/image3.jpg'],
    },
    contentAfterImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">비싼 선물이 좋은 선물일까</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          곰곰이 생각해봤다. 내가 받아서 기뻤던 선물이 뭐였지? 떠오르는 건 10만원짜리 향수가 아니었다. 친구가 내 최애 과자를 잔뜩 사다 준 것. 언니가 내가 좋아하는 캐릭터 양말을 선물해준 것. 비싸지 않았다. 근데 '내 취향을 알아줬다'는 느낌이 들어서 기뻤다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          그러고 보니 선물의 핵심은 가격이 아니라 '이 사람이 나를 생각했구나'라는 느낌인 것 같다. 10만원짜리 향수를 아무 생각 없이 사는 것보다, 3만원을 고민하며 쓰는 게 더 마음이 전해질 수 있다. 적어도 나는 그렇게 믿기로 했다.
        </p>

        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">3만원의 마법, 조합</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          3만원으로 선물하는 가장 좋은 방법은 '조합'이다. 작은 것 여러 개를 모아서 하나의 패키지로 만드는 거다. 예를 들어 커피 좋아하는 친구에게. 드립백 커피 5개(1만원) + 예쁜 머그컵(1만2천원) + 손편지(0원) + 쿠키 3개(8천원). 이러면 '커피 키트'가 완성된다. 그냥 머그컵 하나 주는 것보다 훨씬 정성스러워 보인다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          포인트는 '테마'다. 그냥 여러 개 사는 게 아니라, 하나의 이야기로 묶는 거다. '집에서 보내는 따뜻한 저녁' 테마라면, 입욕제(8천원) + 양초(1만원) + 핫초코 스틱(5천원) + 두꺼운 양말(7천원). 이렇게 모으면 "피곤할 때 이거 하나씩 쓰면서 쉬어"라는 메시지가 된다.
        </p>
      </>
    ),
    contentAfterSmallImages: (
      <>
        <h3 className="text-lg font-bold text-stone-900 mt-10 mb-4">손편지의 힘</h3>
        <p className="mb-6 text-stone-700 leading-relaxed">
          손편지가 부담스러운 사람도 있을 거다. 뭐라고 써야 할지 모르겠으니까. 근데 길게 안 써도 된다. "이거 보고 네 생각났어"라는 한 줄이면 충분하다. 선물과 연결되는 짧은 이유만 적으면 된다. 커피 드립백에 "아침에 이거 마시면서 오늘 하루도 파이팅"이라고만 적어도 받는 사람은 기분이 좋다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          그리고 포장. 똑같은 선물도 포장에 따라 완전 달라 보인다. 다이소에서 3천원이면 예쁜 박스랑 리본 살 수 있다. 크래프트지로 감싸서 마른 꽃 하나 꽂아도 감성이 터진다. 포장에 들이는 시간도 선물의 일부다.
        </p>
      </>
    ),
  },
];

export const NewsletterPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // 이전/다음 아티클 찾기
  const currentArticleId = selectedArticle?.id || 0;
  const currentIndex = ARTICLES.findIndex(a => a.id === currentArticleId);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* 아티클 상세 모달 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
          {/* 커버 이미지 영역 */}
          <div className="relative w-full" style={{ height: '60vh', minHeight: '400px' }}>
            {/* 커버 이미지 */}
            <img
              src={`${import.meta.env.BASE_URL}${selectedArticle.thumbnail.replace('/', '')}`}
              alt={`${selectedArticle.title} - 커버 이미지`}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              onError={(e) => {
                (e.target as HTMLImageElement).style.backgroundColor = '#e5ded8';
              }}
            />
            
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            
            {/* 뒤로가기 버튼 (상단 좌측) */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white hover:text-stone-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">뉴스레터로 돌아가기</span>
            </button>
            
            {/* 카테고리 라벨 (상단 좌측, 뒤로가기 버튼 아래) */}
            <div className="absolute top-20 z-10" style={{ left: 'calc((100% - 680px) / 2 + 24px)' }}>
              <p className="text-[11px] text-white/90 tracking-widest font-semibold uppercase mb-6">
                {selectedArticle.category}
              </p>
            </div>
            
            {/* 제목 & 부제목 (하단, 본문 텍스트 선에 맞춤) */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <div className="max-w-[680px] mx-auto px-6 pb-6">
                <h1 id="article-title" className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  {selectedArticle.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">{selectedArticle.subtitle}</p>
                
                {/* 작성자 & 날짜 */}
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>{selectedArticle.author}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 본문 영역 */}
          <div className="max-w-[680px] mx-auto px-6 pt-12 pb-12">
            {/* 인용구 (본문 상단) */}
            {selectedArticle.quote && (
              <div className="border-t border-b border-stone-200 py-8 mb-12">
                <p className="text-center text-stone-500 leading-relaxed whitespace-pre-line">
                  {selectedArticle.quote}
                </p>
              </div>
            )}
            
            {/* 본문 */}
            <article className="prose prose-stone max-w-none">
              {/* 이미지 전 본문 */}
              {selectedArticle.contentBeforeImages && selectedArticle.contentBeforeImages}
              
              {/* 큰 이미지 1개 - "열심히의 함정" 위에 배치 */}
              {selectedArticle.images?.large && (
                <div className="my-12 -mx-6">
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-amber-200 via-rose-200 to-pink-200 flex items-center justify-center">
                    <span className="text-stone-500 text-sm">이미지 1</span>
                  </div>
                  {/* 이미지 설명 (있는 경우) */}
                  {typeof selectedArticle.images.large === 'object' && selectedArticle.images.large.caption && (
                    <p className="text-xs text-stone-500 mt-3 text-center px-6" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                      {selectedArticle.images.large.caption}
                    </p>
                  )}
                </div>
              )}
              
              {/* 이미지 후 본문 (열심히의 함정, 노 빡빡 섹션 포함) */}
              {selectedArticle.contentAfterImages && selectedArticle.contentAfterImages}
              
              {/* 작은 이미지 2개 (좌우 배치) - "쉬는 것도 일의 일부" 섹션 위 */}
              {selectedArticle.images?.small && selectedArticle.images.small.length > 0 && (
                <div className="my-12 -mx-6">
                  <div className="grid grid-cols-2 gap-0">
                    {selectedArticle.images.small.slice(0, 2).map((img, idx) => {
                      const imgUrl = typeof img === 'string' ? img : img.url;
                      const imgCaption = typeof img === 'object' ? img.caption : undefined;
                      return (
                        <div key={idx} className="relative">
                          <div className="w-full aspect-square bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 flex items-center justify-center">
                            <span className="text-stone-500 text-sm">이미지 {idx + 2}</span>
                          </div>
                          {/* 이미지 설명 (있는 경우) */}
                          {imgCaption && (
                            <p className="text-xs text-stone-500 mt-2 text-center px-3" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                              {imgCaption}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* 작은 이미지 후 본문 ("쉬는 것도 일의 일부" 섹션 포함) */}
              {selectedArticle.contentAfterSmallImages && selectedArticle.contentAfterSmallImages}
              
              {/* 기존 content (하위 호환성) */}
              {selectedArticle.content && !selectedArticle.contentBeforeImages && !selectedArticle.contentAfterImages && !selectedArticle.contentAfterSmallImages && selectedArticle.content}
            </article>

            {/* 하단 정보 */}
            <div className="border-t border-stone-200 mt-12 pt-6 pb-4">
              <p className="text-left text-sm font-bold text-stone-900 mb-4">
                About Author
              </p>
              <div className="flex items-center gap-4">
                {/* 원형 썸네일 */}
                {AUTHOR_AVATAR[selectedArticle.author] && (
                  <div className="flex-shrink-0">
                    <img
                      src={AUTHOR_AVATAR[selectedArticle.author]}
                      alt={selectedArticle.author}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                )}
                {/* 작성자 이름 및 소개 */}
                <div className="flex-1">
                  <p className="text-left text-sm font-bold text-stone-900 mb-2 underline">
                    {selectedArticle.author}
                  </p>
                  {AUTHOR_BIO[selectedArticle.author] && (
                    <p className="text-left text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                      {AUTHOR_BIO[selectedArticle.author]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 네비게이션 (이전글/다음글/목록) */}
            <div className="mt-12 pt-8">
              <div className="flex items-center gap-4">
                {/* 이전글 */}
                {prevArticle ? (
                  <button
                    onClick={() => setSelectedArticle(prevArticle)}
                    className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="text-left">
                      <p className="text-xs text-stone-500">이전글</p>
                      <p className="text-sm font-medium truncate max-w-[120px]">{prevArticle.title}</p>
                    </div>
                  </button>
                ) : (
                  <div className="flex-1" />
                )}

                {/* 목록으로 - 중앙 정렬 */}
                <div className="flex-1 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    목록으로
                  </button>
                </div>

                {/* 다음글 */}
                {nextArticle ? (
                  <button
                    onClick={() => setSelectedArticle(nextArticle)}
                    className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <div className="text-right">
                      <p className="text-xs text-stone-500">다음글</p>
                      <p className="text-sm font-medium truncate max-w-[120px]">{nextArticle.title}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </div>
          </div>
          
          {/* 푸터 */}
          <Footer scrollButtonZIndex={101} />
        </div>
      )}

      {/* 메인 페이지 */}
      <div className="page-container py-12">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">뉴스레터</h1>
        <p className="text-stone-600 mb-8">
          슬런치 팩토리 에디터가 발행하는 아티클
        </p>

        {/* 아티클 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer group"
            >
              <div className="border border-stone-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                {/* 썸네일 */}
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: '4/3', backgroundColor: '#e5ded8' }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${article.thumbnail.replace('/', '')}`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* 정보 */}
                <div className="p-4">
                  <p className="text-[10px] text-stone-500 tracking-wider mb-2">
                    {article.category}
                  </p>
                  <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-sm text-stone-600 mb-3 line-clamp-2">
                    {article.subtitle}
                  </p>
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 뉴스레터 구독 섹션 */}
        <div className="bg-stone-50 border border-stone-200 rounded-none p-8">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-stone-900">뉴스레터 구독</h3>
            <p className="text-sm text-stone-600 mb-4">슬런치의 최신 소식과 레시피를 받아보세요</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-2.5 bg-white border border-stone-300 text-stone-900 placeholder-stone-500 text-sm focus:outline-none focus:border-stone-500"
              />
              <button className="px-6 py-2.5 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors whitespace-nowrap">
                구독하기
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
