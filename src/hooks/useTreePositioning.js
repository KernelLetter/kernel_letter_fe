import { useState, useEffect } from 'react';
import { USER_NAMES } from '../constants/mockData';

/**
 * 사용자 위치를 크리스마스 트리 패턴으로 계산하는 커스텀 훅
 * @returns {Array} 위치 정보가 포함된 사용자 배열
 */
export const useTreePositioning = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userCount = USER_NAMES.length;
    const mockUsers = [];

    // 색상 배열 (크리스마스 컬러)
    const colors = ['#EF4444', '#FCD34D', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

    // 트리의 중심 X 좌표
    const centerX = 50;

    // 각 층의 설정 (Y 좌표, 최대 너비, 사용자 수)
    // 총 38명 = 1+2+3+3+4+4+5+4+5+7 (균형잡힌 분포)
    // 트리 4층 구조: 1층(y=12~26), 2층(y=22~40), 3층(y=36~54), 4층(y=50~70)
    // maxWidth는 양 끝 오너먼트 사이의 전체 거리
    const layerConfigs = [
      // 1층 (최상단, y=12~26, 너비 ±12) - 6명
      { y: 16, maxWidth: 0, users: 1 },      // 1개 (중앙만)
      { y: 20, maxWidth: 14, users: 2 },     // 2개 (y=20: 실제 너비 ±6.9 = 13.8)
      { y: 24, maxWidth: 20, users: 3 },     // 3개 (y=24: 실제 너비 ±10.3 = 20.6)

      // 2층 (y=22~40, 너비 ±18) - 7명
      { y: 30, maxWidth: 16, users: 3 },     // 3개 (y=30: 실제 너비 ±8 = 16)
      { y: 36, maxWidth: 28, users: 4 },     // 4개 (y=36: 실제 너비 ±14 = 28)

      // 3층 (y=36~54, 너비 ±24) - 9명
      { y: 44, maxWidth: 21, users: 4 },     // 4개 (y=44: 실제 너비 ±10.7 = 21.4)
      { y: 50, maxWidth: 37, users: 5 },     // 5개 (y=50: 실제 너비 ±18.7 = 37.4)

      // 4층 (최하단, y=50~70, 너비 ±30) - 16명
      { y: 56, maxWidth: 18, users: 4 },     // 4개 (y=56: 실제 너비 ±9 = 18)
      { y: 61, maxWidth: 33, users: 5 },     // 5개 (y=61: 실제 너비 ±16.5 = 33)
      { y: 66, maxWidth: 48, users: 7 },     // 7개 (y=66: 실제 너비 ±24 = 48)
    ];

    let userIndex = 0;

    // 층별로 사용자 배치
    for (const config of layerConfigs) {
      if (userIndex >= userCount) break;

      const actualUsersInLayer = Math.min(config.users, userCount - userIndex);

      for (let i = 0; i < actualUsersInLayer; i++) {
        // X 위치: 트리 모양에 맞춰 배치
        let xOffset;
        if (actualUsersInLayer === 1) {
          xOffset = 0;
        } else {
          // maxWidth 범위 내에서 균등 분포
          const spacing = config.maxWidth / (actualUsersInLayer - 1);
          xOffset = (i - (actualUsersInLayer - 1) / 2) * spacing;
        }
        const x = centerX + xOffset;

        // Y 위치 (같은 층은 수평 정렬)
        const y = config.y;

        mockUsers.push({
          id: userIndex + 1,
          name: USER_NAMES[userIndex],
          x: x,
          y: y,
          color: colors[userIndex % colors.length]
        });

        userIndex++;
      }
    }

    setUsers(mockUsers);
  }, []);

  return users;
};
