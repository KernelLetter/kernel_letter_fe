import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NetworkMap from '../components/NetworkMap';
import { useUserPositioning } from '../hooks/useUserPositioning';
import { useAuth } from '../hooks/useAuth';

export default function UserList() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAuth();

  // 커스텀 훅으로 사용자 위치 계산
  const users = useUserPositioning();

  const handleUserClick = (userId, userName) => {
    navigate(`/tree/${userId}`, { state: { pageOwner: userName } });
  };

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
          <div className="text-3xl sm:text-4xl mb-3">🎄</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-yellow-400 mb-2">
            롤링페이퍼 작성하기
          </h1>
          <p className="text-white/70 text-xs sm:text-sm">
            편지를 남기고 싶은 사람을 선택해주세요
          </p>
        </div>

        {/* 네트워크 맵 */}
        <NetworkMap users={users} onUserClick={handleUserClick} />

        {/* 하단 안내 */}
        <div className="mt-6 text-center">
          <div className="inline-block px-4 sm:px-6 py-2 bg-white/10 rounded-full text-white/70 text-xs sm:text-sm">
            💌 사용자를 클릭하여 롤링페이퍼를 작성하세요
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
