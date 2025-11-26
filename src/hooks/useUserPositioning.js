import { useState, useEffect } from 'react';
import { USER_NAMES, WAVE_CONFIG } from '../constants/mockData';

/**
 * 사용자 위치를 물결 패턴으로 계산하는 커스텀 훅
 * @returns {Array} 위치 정보가 포함된 사용자 배열
 */
export const useUserPositioning = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { startX, totalWidth, amplitude, frequency, centerY, randomOffset } = WAVE_CONFIG;
    const userCount = USER_NAMES.length;
    const mockUsers = [];

    // 각 사용자의 위치 계산
    for (let i = 0; i < userCount; i++) {
      const t = i / (userCount - 1); // 0 ~ 1로 정규화

      // X 위치: 왼쪽에서 오른쪽으로 선형 분포
      const x = startX + t * totalWidth;

      // Y 위치: 사인파로 물결 패턴 생성
      const y = centerY + Math.sin(t * Math.PI * frequency) * amplitude;

      // 약간의 랜덤 오프셋 추가 (자연스러움)
      const offset = (Math.random() - 0.5) * randomOffset;

      mockUsers.push({
        id: i + 1,
        name: USER_NAMES[i],
        x: x,
        y: y + offset
      });
    }

    setUsers(mockUsers);
  }, []);

  return users;
};
