import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

/**
 * 사용자 인증 정보를 관리하는 커스텀 훅
 * @returns {Object} 인증 관련 상태와 setter 함수들
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiClient.get('/api/user/me');
        setIsLoggedIn(true);
        setUserName(data?.name || '사용자');
      } catch (error) {
        setIsLoggedIn(false);
        setUserName('');
      }
    };
    fetchUser();
  }, []);

  return {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
  };
};
