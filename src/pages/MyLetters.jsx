import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../lib/apiClient';
import { useRedirectIfLoggedOut } from '../hooks/useRedirectIfLoggedOut';

export default function MyLetters() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    userId,
    isCheckingAuth,
  } = useAuth();
  useRedirectIfLoggedOut(isLoggedIn, isCheckingAuth);
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 작성한 편지 목록 가져오기
  useEffect(() => {
    const fetchMyLetters = async () => {
      if (!userId) return;

      try {
        const { data } = await apiClient.get(`/api/Letter/send/${userId}/all`);
        setLetters(data);
      } catch (error) {
        console.error('작성한 편지 목록 불러오기 실패:', error);
      }
    };

    fetchMyLetters();
  }, [userId]);

  const handleCardClick = (letter) => {
    setSelectedLetter(letter);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLetter(null);
  };

  // 편지 봉투 색상 배열
  const envelopeColors = [
    'bg-green-100',
    'bg-blue-100',
    'bg-pink-100',
    'bg-yellow-100',
    'bg-purple-100',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-gray-900 flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
        setUserName={setUserName}
      />

      <div className="flex-1 flex flex-col items-center p-4 sm:p-6 md:p-8">
        {/* 타이틀 */}
        <div className="text-center mb-6 sm:mb-8 mt-4">
          <div className="text-3xl sm:text-4xl mb-3">📬</div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-yellow-400 mb-2"
            style={{ fontFamily: 'KkuBulLim, serif' }}
          >
            작성한 편지
          </h1>
          <p className="text-white/70 text-xs sm:text-sm">
            소중한 사람들에게 보낸 {letters.length}개의 편지
          </p>
        </div>

        {/* 편지 카드 그리드 */}
        {letters.length === 0 ? (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg mb-2">아직 작성한 편지가 없어요</p>
            <p className="text-sm">소중한 사람에게 첫 편지를 보내보세요!</p>
            <button
              onClick={() => navigate('/users')}
              className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-medium hover:bg-yellow-300 transition-all"
            >
              편지 쓰러 가기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-6xl">
            {letters.map((letter, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(letter)}
                className={`
                  ${envelopeColors[index % envelopeColors.length]}
                  rounded-xl p-4 cursor-pointer
                  transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  flex flex-col items-center justify-center
                  min-h-[150px] sm:min-h-[160px]
                  border-2 border-gray-200
                `}
              >
                {/* 편지 봉투 이미지 */}
                <img
                  src={`/letterImg/letter_${(index % 8) + 1}.png`}
                  alt="편지 봉투"
                  className="w-30 h-30 mb-3 object-contain"
                />

                {/* 받는 사람 이름 */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">To.</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800">
                    {letter.receiverName || '익명'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 편지 상세 모달 */}
      {isModalOpen && selectedLetter && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 sm:p-8 max-w-[350px] sm:max-w-[400px] w-full shadow-2xl"
          >
            <div className="mb-4">
              <p className="text-gray-500 text-sm mb-1">To.</p>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                {selectedLetter.receiverName || '익명'}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 sm:p-5 mb-4 min-h-[150px]">
              <p className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                {selectedLetter.content}
              </p>
            </div>

            <p className="text-right text-gray-500 text-xs sm:text-sm mb-4">
              from. {selectedLetter.senderName || userName}
            </p>

            <div className="flex">
              <button
                onClick={handleCloseModal}
                className="flex-1 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* Footer */}
      <Footer />
    </div>
  );
}
