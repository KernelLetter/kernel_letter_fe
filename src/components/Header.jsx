import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/apiClient';

export default function Header({ isLoggedIn, setIsLoggedIn, userName, setUserName }) {
  const kakaoAuthUrl = import.meta.env.VITE_KAKAO_AUTH_URL;
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = () => {
    if (kakaoAuthUrl) {
      window.location.href = kakaoAuthUrl;
      return;
    }

    // 카카오 로그인 경로가 설정되지 않았을 때는 기존 목업 로그인 유지
    setIsLoggedIn(true);
    setUserName('사용자');
  };

  const handleLogout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await apiClient.post('/api/user/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggedIn(false);
      setUserName('');
      setIsProcessing(false);
    }
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
                disabled={isProcessing}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors border-0"
              >
                {isProcessing ? '로그아웃 중...' : '로그아웃'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border-0"            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
