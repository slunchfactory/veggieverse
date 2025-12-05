import React, { useState } from 'react';
import { ChevronUp, Send } from 'lucide-react';
import { VegetableItem } from '../types';

interface SurveyPageProps {
  selectedItems: VegetableItem[];
}

export const SurveyPage: React.FC<SurveyPageProps> = ({ selectedItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    preference: '',
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey submitted:', { selectedItems, formData });
    setSubmitted(true);
  };

  const scrollToTop = () => {
    const container = document.querySelector('.snap-y');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">✓</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">감사합니다!</h2>
          <p className="text-stone-600 mb-8">설문이 성공적으로 제출되었습니다.</p>
          <button
            onClick={() => { setSubmitted(false); scrollToTop(); }}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-stone-800 transition-colors"
          >
            처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* 위로 가기 버튼 */}
      <button
        onClick={scrollToTop}
        className="fixed top-6 left-6 z-50 w-10 h-10 bg-black shadow-lg rounded-full flex items-center justify-center text-white hover:bg-stone-800 transition-colors"
        title="재료 다시 선택하기"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">
            거의 다 왔어요!
          </h2>
          <p className="text-stone-600">
            선택하신 재료에 대해 몇 가지 질문이 있어요
          </p>
          <p className="text-stone-400 text-sm mt-2">
            ↑ 위로 스크롤하면 재료를 다시 선택할 수 있어요
          </p>
        </div>

        {/* 선택된 재료 표시 */}
        {selectedItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
              선택한 재료
            </h3>
            <div className="flex gap-4 justify-center">
              {selectedItems.map(item => (
                <div key={item.id} className="text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-md mb-2">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs text-stone-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 설문 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
              required
            />
          </div>

          {/* 이메일 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all"
              required
            />
          </div>

          {/* 나이대 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              나이대
            </label>
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all bg-white"
              required
            >
              <option value="">선택해주세요</option>
              <option value="10s">10대</option>
              <option value="20s">20대</option>
              <option value="30s">30대</option>
              <option value="40s">40대</option>
              <option value="50s">50대 이상</option>
            </select>
          </div>

          {/* 식사 선호도 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-stone-700 mb-3">
              평소 식사 스타일은?
            </label>
            <div className="space-y-2">
              {['채식 위주', '균형 잡힌 식단', '육식 위주', '특별한 선호 없음'].map(option => (
                <label key={option} className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="preference"
                    value={option}
                    checked={formData.preference === option}
                    onChange={handleChange}
                    className="w-4 h-4 text-black focus:ring-black"
                  />
                  <span className="text-stone-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 피드백 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              자유롭게 의견을 남겨주세요 (선택)
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="건강한 식단에 대한 관심, 요청사항 등..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all resize-none"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-2xl font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/30"
          >
            <Send className="w-5 h-5" />
            설문 제출하기
          </button>
        </form>

        {/* 푸터 */}
        <div className="text-center mt-12 text-stone-400 text-sm">
          <p>SLUNCH FACTORY</p>
        </div>
      </div>
    </div>
  );
};
