import { useState, useEffect } from 'react';
import { USER_MAP } from '../constants/treeConfig';

/**
 * 페이지 주인 정보를 관리하는 커스텀 훅
 * @param {string} userId - URL 파라미터의 userId
 * @param {Object} locationState - location.state 객체
 * @returns {Object} pageOwner와 isPageOwner 함수
 */
export const usePageOwner = (userId, locationState) => {
  const [pageOwner, setPageOwner] = useState('');

  useEffect(() => {
    // location state에서 페이지 주인 이름 가져오기
    if (locationState?.pageOwner) {
      setPageOwner(locationState.pageOwner);
    } else {
      // state가 없으면 userId로 조회 (실제로는 API 호출)
      setPageOwner(USER_MAP[userId] || '사용자');
    }
  }, [userId, locationState]);

  /**
   * 현재 사용자가 페이지 주인인지 확인
   * @param {string} userName - 현재 로그인한 사용자 이름
   * @returns {boolean} 페이지 주인 여부
   */
  const isPageOwner = (userName) => userName === pageOwner;

  return { pageOwner, isPageOwner };
};
