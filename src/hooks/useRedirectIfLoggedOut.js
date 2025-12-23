import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 로그인 상태가 아니면 인덱스 페이지로 리다이렉트
 * @param {boolean} isLoggedIn - 현재 로그인 여부
 * @param {boolean} isCheckingAuth - 로그인 상태 확인 중인지 여부
 */
export const useRedirectIfLoggedOut = (isLoggedIn, isCheckingAuth) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && !isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isCheckingAuth, isLoggedIn, navigate]);
};
