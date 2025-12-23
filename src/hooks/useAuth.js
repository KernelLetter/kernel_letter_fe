import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

/**
 * 사용자 인증 정보를 관리하는 커스텀 훅
 * @returns {Object} 인증 관련 상태와 setter 함수들
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const { data } = await apiClient.get('/api/user/me');
        if (!isMounted) return;
        setIsLoggedIn(true);
        setUserName(data?.name || '사용자');
        setUserId(data?.id || null);
      } catch (error) {
        if (!isMounted) return;
        setIsLoggedIn(false);
        setUserName('');
        setUserId(null);
      } finally {
        if (!isMounted) return;
        setIsCheckingAuth(false);
      }
    };
    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    userId,
    setUserId,
    isCheckingAuth,
  };
};
