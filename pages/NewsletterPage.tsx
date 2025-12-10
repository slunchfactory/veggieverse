import React, { useState } from 'react';
import { X, Star, ChevronLeft } from 'lucide-react';

interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  author: string;
  rating: number;
  date: string;
  thumbnail: string;
  content: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'FILM REVIEW',
    title: '승부',
    subtitle: '바둑판 위의 드라마, 그 치열한 승부의 세계',
    author: '하얼빈',
    rating: 4,
    date: '2024.12.10',
    thumbnail: '/article-1.jpg',
    content: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          &lt;승부&gt;는 조훈현 바둑 기사와 이창호 바둑 기사의 드라마틱한 실화를 바탕으로 만들어진 영화입니다. <strong className="text-stone-900">이 영화의 목표는 무엇일까요?</strong> 관객들에게 스포츠 영화의 짜릿함을 선사해야 하지만 현실이 스포일러이기 때문에 적절한 각색이 필수겠죠. 극적인 결말을 위해 실제 사실 관계를 조정하거나 MSG를 쳐야 하는데, 또 너무 많이 건들면 실존 인물들과 그 사건을 잘 아는 사람들에게 부정적으로 다가갈 위험도 큽니다. 제가 본 &lt;승부&gt;는 그 밸런스가 아주 좋았던 영화입니다. 딱 납득 가능한 만큼 수정해서 정말 긴장감 넘치는 스포츠 드라마를 만들어냈습니다. 배우들의 멋진 연기 또한 인상적이었죠. 하지만 그 이상은 없었다고 느꼈습니다. 앞서 &lt;범죄도시2&gt;가 이룩한 것과 같은 영화 재미 이상의 무언가는 없었습니다. 영화가 다루고 있는 실화가 지금 다시 소환될 때 어떤 사회적인 의미를 가지고 있던 것도 아니었고요.
        </p>
        <div className="border-t border-b border-stone-300 py-8 my-8">
          <p className="text-center text-stone-500 italic">
            "아직 기회가 남은 자들을 향한 길고 텐션 높은 담화"
          </p>
        </div>
        <p className="mb-6 text-stone-700 leading-relaxed">
          그럼에도 불구하고, 이 영화는 바둑이라는 소재를 스크린에서 이토록 긴장감 있게 풀어낸 몇 안 되는 작품입니다. 조훈현 역의 배우와 이창호 역의 배우 모두 실제 인물의 특징을 잘 살려냈고, 특히 대국 장면에서의 손놀림과 표정 연기는 정말 인상적이었습니다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          영화는 단순히 승패를 다루는 것이 아니라, 스승과 제자 사이의 복잡한 감정, 그리고 최고의 자리를 향한 외로운 여정을 그려냅니다. 바둑을 모르는 관객도 충분히 몰입할 수 있도록 대국 장면을 연출한 점도 높이 평가할 만합니다.
        </p>
      </>
    ),
  },
  {
    id: 2,
    category: 'FOOD ESSAY',
    title: '비건의 시작',
    subtitle: '채식을 선택한 이유, 그리고 6개월 후',
    author: '슬런치 에디터',
    rating: 0,
    date: '2024.12.05',
    thumbnail: '/article-2.jpg',
    content: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          6개월 전, 저는 완전한 육식주의자였습니다. 고기 없는 식사는 상상도 할 수 없었죠. 하지만 우연히 본 다큐멘터리 한 편이 제 식습관을 완전히 바꿔놓았습니다.
        </p>
        <div className="border-t border-b border-stone-300 py-8 my-8">
          <p className="text-center text-stone-500 italic">
            "변화는 하루아침에 오지 않는다. 하지만 시작은 언제나 오늘이다."
          </p>
        </div>
        <p className="mb-6 text-stone-700 leading-relaxed">
          처음에는 정말 힘들었습니다. 무엇을 먹어야 할지 모르겠고, 외식은 더 어려웠습니다. 하지만 슬런치 팩토리를 알게 된 후로 비건 생활이 훨씬 수월해졌습니다. 맛있는 비건 요리가 이렇게 다양할 수 있다는 것을 알게 되었거든요.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          6개월이 지난 지금, 저는 이전보다 훨씬 건강해졌습니다. 체중도 줄었고, 무엇보다 소화가 잘 됩니다. 피부도 좋아졌다는 이야기를 많이 듣습니다. 비건 생활이 모든 사람에게 맞는 것은 아니겠지만, 한 번쯤 시도해볼 가치는 충분히 있다고 생각합니다.
        </p>
      </>
    ),
  },
  {
    id: 3,
    category: 'RECIPE STORY',
    title: '할머니의 된장찌개',
    subtitle: '비건 버전으로 재해석한 추억의 맛',
    author: '김채린 셰프',
    rating: 0,
    date: '2024.11.28',
    thumbnail: '/article-3.jpg',
    content: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          어린 시절, 할머니 댁에 가면 항상 된장찌개가 끓고 있었습니다. 그 구수한 냄새는 지금도 생생하게 기억납니다. 비건이 된 후, 가장 그리웠던 음식 중 하나가 바로 그 된장찌개였습니다.
        </p>
        <div className="border-t border-b border-stone-300 py-8 my-8">
          <p className="text-center text-stone-500 italic">
            "음식은 단순한 영양 섭취가 아니라, 기억과 감정을 담는 그릇이다."
          </p>
        </div>
        <p className="mb-6 text-stone-700 leading-relaxed">
          수많은 실험 끝에, 저는 할머니의 된장찌개를 비건 버전으로 재현하는 데 성공했습니다. 비결은 표고버섯과 다시마로 우린 육수, 그리고 젓갈 대신 사용하는 발효 식품들이었습니다. 두부와 각종 야채를 넣고 끓이면, 그 맛이 정말 놀라울 정도로 비슷합니다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          이 레시피를 슬런치 팩토리에서 선보일 예정입니다. 많은 분들이 저처럼 추억의 맛을 비건으로 즐길 수 있기를 바랍니다.
        </p>
      </>
    ),
  },
  {
    id: 4,
    category: 'LIFESTYLE',
    title: '지속가능한 식탁',
    subtitle: '환경을 생각하는 작은 실천들',
    author: '그린라이프',
    rating: 0,
    date: '2024.11.20',
    thumbnail: '/article-4.jpg',
    content: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          우리가 매일 먹는 음식이 지구에 어떤 영향을 미치는지 생각해본 적 있으신가요? 축산업은 전 세계 온실가스 배출의 약 14.5%를 차지합니다. 이는 전 세계 모든 교통수단이 배출하는 양과 맞먹는 수치입니다.
        </p>
        <div className="border-t border-b border-stone-300 py-8 my-8">
          <p className="text-center text-stone-500 italic">
            "지구를 위한 가장 쉬운 실천은 식탁에서 시작된다."
          </p>
        </div>
        <p className="mb-6 text-stone-700 leading-relaxed">
          완전한 비건이 되지 않더라도, 일주일에 한두 번 채식 식사를 하는 것만으로도 큰 변화를 만들 수 있습니다. 이른바 '플렉시테리언' 식단이죠. 또한 로컬 푸드를 선택하고, 음식물 쓰레기를 줄이는 것도 중요합니다.
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          슬런치 팩토리는 모든 식재료를 가능한 한 지역 농가에서 공급받고, 남은 음식은 퇴비로 활용합니다. 작은 실천들이 모여 큰 변화를 만든다고 믿기 때문입니다.
        </p>
      </>
    ),
  },
  {
    id: 5,
    category: 'INTERVIEW',
    title: '셰프가 말하는 비건',
    subtitle: '슬런치 팩토리 수석 셰프 인터뷰',
    author: '에디터 K',
    rating: 0,
    date: '2024.11.15',
    thumbnail: '/article-5.jpg',
    content: (
      <>
        <p className="mb-6 text-stone-700 leading-relaxed">
          <strong>Q. 비건 요리를 시작하게 된 계기가 무엇인가요?</strong>
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          A. 처음에는 단순한 호기심이었어요. 고기 없이 어디까지 맛을 낼 수 있을까? 그 도전이 저를 비건 요리의 세계로 이끌었습니다. 그리고 깊이 들어갈수록, 식물성 재료가 가진 무한한 가능성에 매료되었죠.
        </p>
        <div className="border-t border-b border-stone-300 py-8 my-8">
          <p className="text-center text-stone-500 italic">
            "제한은 창의성의 어머니다. 비건 요리는 그 진리를 매일 증명한다."
          </p>
        </div>
        <p className="mb-6 text-stone-700 leading-relaxed">
          <strong>Q. 비건 요리에서 가장 중요하게 생각하는 것은?</strong>
        </p>
        <p className="mb-6 text-stone-700 leading-relaxed">
          A. 맛이요. 당연하죠. 건강하고 윤리적이라도 맛이 없으면 아무도 먹지 않을 거예요. 저는 비건 요리가 일반 요리와 비교해서 전혀 뒤지지 않는다는 것을 증명하고 싶습니다. 아니, 더 나을 수도 있다는 것을요.
        </p>
      </>
    ),
  },
];

export const NewsletterPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const renderStars = (rating: number) => {
    if (rating === 0) return null;
    return (
      <div className="flex items-center gap-0.5 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-stone-800 text-stone-800' : 'fill-none text-stone-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      {/* 아티클 상세 모달 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="max-w-[680px] mx-auto px-6 py-8">
            {/* 뒤로가기 버튼 */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">뉴스레터로 돌아가기</span>
            </button>

            {/* 카테고리 */}
            <p className="text-[11px] text-stone-500 tracking-widest mb-4">
              {selectedArticle.category}
            </p>

            {/* 제목 */}
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              &lt;{selectedArticle.title}&gt;
            </h1>
            <p className="text-lg text-stone-600 mb-6">{selectedArticle.subtitle}</p>

            {/* 별점 */}
            {renderStars(selectedArticle.rating)}

            {/* 본문 */}
            <article className="prose prose-stone max-w-none">
              {selectedArticle.content}
            </article>

            {/* 구분선 */}
            <div className="border-t border-stone-200 mt-12 pt-8">
              <p className="text-center text-xl font-bold text-stone-900 mb-2">
                &lt;{selectedArticle.title}&gt;
              </p>
              {renderStars(selectedArticle.rating)}
              <p className="text-center text-sm text-stone-500">
                {selectedArticle.author}
              </p>
            </div>

            {/* 닫기 버튼 */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-8 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
              >
                목록으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메인 페이지 */}
      <div className="page-container py-12">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">뉴스레터</h1>
        <p className="text-stone-600 mb-8">
          슬런치 팩토리 에디터가 발행하는 아티클
        </p>

        {/* 아티클 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};
