import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChristmasBuilding from '../components/ChristmasBuilding';
import WindowOpeningModal from '../components/WindowOpeningModal';
import { useBuildingPositioning } from '../hooks/useBuildingPositioning';

export default function UserListV3() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('사용자');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 커스텀 훅으로 건물 창문 형태의 사용자 위치 계산
  const users = useBuildingPositioning();

  const handleUserClick = (userId, userName) => {
    // 선택된 사용자 정보 저장
    setSelectedUser({ userId, userName });
    // 모달 표시
    setShowModal(true);
  };

  const handleAnimationComplete = () => {
    // 애니메이션 완료 후 페이지 이동
    if (selectedUser) {
      navigate(`/tree/${selectedUser.userId}`, {
        state: { pageOwner: selectedUser.userName }
      });
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

      <div className="flex-1 flex flex-col items-center px-1 py-2 sm:p-6 md:p-8">
        {/* 타이틀 */}
        <div className="text-center mb-1 sm:mb-8 mt-0 sm:mt-4">
          <div className="text-2xl sm:text-4xl mb-0.5 sm:mb-3">🏠</div>
          <h1
            className="text-xs sm:text-3xl md:text-4xl font-serif italic text-yellow-400 mb-0.5 sm:mb-2 whitespace-nowrap"
            style={{ fontFamily: 'KkuBulLim, serif' }}
          >
            크리스마스 하우스
          </h1>
          <p className="text-white/70 text-sl sm:text-base">
            창문을 클릭하여 편지를 남겨주세요
          </p>
        </div>

        {/* 크리스마스 건물 */}
        <div className="w-full sm:max-w-5xl flex-1">
          <ChristmasBuilding users={users} onUserClick={handleUserClick} />
        </div>

        {/* 하단 안내 */}
        <div className="mt-1 sm:mt-6 text-center space-y-1 sm:space-y-3 mb-1 sm:mb-0 flex flex-col items-center">
          {/* <div className="inline-block px-2 sm:px-6 py-0.5 sm:py-2 bg-white/10 rounded-full text-white/70 text-[8px] sm:text-sm">
            🎁 창문에 마우스를 올려 이름을 확인하세요
          </div> */}
          {/* <div className="text-white/50 text-[7px] sm:text-xs">
            빛나는 창문을 클릭하여 롤링페이퍼를 작성하세요
          </div> */}
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

      {/* 창문 열림 모달 */}
      <WindowOpeningModal
        isOpen={showModal}
        onAnimationComplete={handleAnimationComplete}
        nextPageUrl={selectedUser ? `/tree/${selectedUser.userId}` : ''}
      />
    </div>
  );
}
