import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChristmasTree from '../components/ChristmasTree';
import { useTreePositioning } from '../hooks/useTreePositioning';

export default function UserListV2() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('사용자');

  // 커스텀 훅으로 트리 형태의 사용자 위치 계산
  const users = useTreePositioning();

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
            트리의 오너먼트를 선택하여 편지를 남겨주세요
          </p>
        </div>

        {/* 크리스마스 트리 */}
        <ChristmasTree users={users} onUserClick={handleUserClick} />

        {/* 하단 안내 */}
        <div className="mt-6 text-center space-y-3">
          <div className="inline-block px-4 sm:px-6 py-2 bg-white/10 rounded-full text-white/70 text-xs sm:text-sm">
            🎁 오너먼트에 마우스를 올려 이름을 확인하세요
          </div>
          <div className="text-white/50 text-xs">
            반짝이는 오너먼트를 클릭하여 롤링페이퍼를 작성하세요
          </div>
        </div>
      </div>

      {/* 눈 내리는 효과 */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
