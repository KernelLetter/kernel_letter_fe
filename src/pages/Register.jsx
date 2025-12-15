import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import apiClient from '../lib/apiClient';

export default function Register() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('이름과 이메일을 모두 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    try {
      await apiClient.post('/api/user/register', {
        name: name.trim(),
        email: email.trim(),
      });
      setIsLoggedIn(true);
      setUserName(name.trim());
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-gray-900 flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
        setUserName={setUserName}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-5xl sm:text-6xl mb-4">⭐</div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-yellow-400 mb-2">
            추가 정보 입력
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            원활한 서비스를 위해 이름과 이메일을 입력해주세요.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10"
        >
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="홍길동"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm mb-2" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 sm:py-4 bg-yellow-400 text-gray-900 rounded-xl text-sm sm:text-base font-semibold hover:bg-yellow-300 transition-all hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '저장 중...' : '제출하고 시작하기'}
          </button>
        </form>
      </div>

      {/* 눈 내리는 효과 */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/30 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              fontSize: `${10 + Math.random() * 10}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
