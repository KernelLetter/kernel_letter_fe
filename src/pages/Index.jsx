import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Index() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAuth();
  const navigate = useNavigate();

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    // 사용자 목록 페이지로 이동
    navigate('/users');
  };

  const handleViewClick = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    // 작성 내용 확인 페이지로 이동
    navigate('/my-letters');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-gray-900 flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
        setUserName={setUserName}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* 메인 타이틀 */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6">
            ⭐
          </div>
          <p className="text-xs sm:text-sm md:text-base tracking-widest text-green-800 mb-2">
            Fast Campus
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-yellow-400 drop-shadow-md mb-3 sm:mb-4"
            style={{ fontFamily: 'KkuBulLim, serif' }}
          >
            Kernel Letter
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm tracking-wider text-green-800">
            & HAPPY NEW YEAR
          </p>
        </div>

        {/* 설명 텍스트 */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-md">
          <p className="text-white text-sm sm:text-base leading-relaxed">
            소중한 사람들에게 마음을 전하세요.<br />
            12월 25일, 특별한 편지가 공개됩니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        {isLoggedIn ? (
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
            <button
              onClick={handleWriteClick}
              className="flex-1 py-3 sm:py-4 bg-white text-gray-900 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-300 transition-all hover:scale-105 shadow-lg"
            >
              📝 롤링페이퍼 작성하기
            </button>
            <button
              onClick={handleViewClick}
              className="flex-1 py-3 sm:py-4 bg-white text-gray-900 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-300 transition-all hover:scale-105 shadow-lg"
            >
              📋 작성한 내용 확인하기
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white text-sm sm:text-base mb-4">
              로그인 후 이용할 수 있습니다
            </p>
            <div className="text-yellow-400 text-xs sm:text-sm">
              상단의 로그인 버튼을 클릭해주세요
            </div>
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 rounded-full text-white text-xs sm:text-sm">
            🎄 따뜻한 연말을 함께 만들어가요
          </div>
        </div>
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
