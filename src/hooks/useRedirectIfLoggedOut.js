import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * 로그인 상태가 아니면 인덱스 페이지로 리다이렉트
 * @param {boolean} isLoggedIn - 현재 로그인 여부
 * @param {boolean} isCheckingAuth - 로그인 상태 확인 중인지 여부
 */
export const useRedirectIfLoggedOut = (isLoggedIn, isCheckingAuth) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 등록 페이지는 로그인 확인 없이도 접근할 수 있도록 리다이렉트 제외
    if (!isCheckingAuth && !isLoggedIn && location.pathname !== '/register') {
      navigate('/', { replace: true });
    }
  }, [isCheckingAuth, isLoggedIn, location.pathname, navigate]);
};
