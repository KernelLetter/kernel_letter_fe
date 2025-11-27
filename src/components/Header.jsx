import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, setIsLoggedIn, userName, setUserName }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    // 실제로는 로그인 API 호출
    setIsLoggedIn(true);
    setUserName('사용자');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <header className="w-full bg-transparent py-4 px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="w-full flex justify-between items-center">
        <div
          onClick={() => navigate('/')}
          className="text-yellow-400 font-serif text-xl sm:text-2xl md:text-3xl italic cursor-pointer hover:text-yellow-300 transition-colors"
        >
          Kernel Letter
        </div>

        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-white text-sm sm:text-base">{userName}님</span>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors border-0"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors border-0"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
