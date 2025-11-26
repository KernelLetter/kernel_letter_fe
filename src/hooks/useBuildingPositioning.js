import { useState, useEffect } from 'react';
import { USER_NAMES } from '../constants/mockData';

/**
 * 사용자 위치를 크리스마스 건물의 창문 패턴으로 계산하는 커스텀 훅
 * @returns {Array} 위치 정보가 포함된 사용자 배열
 */
export const useBuildingPositioning = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userCount = USER_NAMES.length;
    const mockUsers = [];

    // 색상 배열 (크리스마스 컬러)
    const colors = ['#EF4444', '#FCD34D', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

    // 건물의 중심 X 좌표
    const centerX = 50;

    // 각 층의 설정 (Y 좌표, 창문 수)
    // 총 38명 = 4+6+6+6+6+5+5 (7층 건물)
    const floorConfigs = [
      // 아래층부터 위로 (1층이 가장 아래)
      { y: 78, windows: 4 },   // 1층 (지상층)
      { y: 68, windows: 6 },   // 2층
      { y: 58, windows: 6 },   // 3층
      { y: 48, windows: 6 },   // 4층
      { y: 38, windows: 6 },   // 5층
      { y: 28, windows: 5 },   // 6층
      { y: 20, windows: 5 },   // 7층 (최상층)
    ];

    let userIndex = 0;

    // 층별로 사용자 배치
    for (const config of floorConfigs) {
      if (userIndex >= userCount) break;

      const windowsInFloor = Math.min(config.windows, userCount - userIndex);

      for (let i = 0; i < windowsInFloor; i++) {
        // X 위치: 창문들을 균등하게 배치
        let xOffset;
        if (windowsInFloor === 1) {
          xOffset = 0;
        } else {
          // 건물 너비의 80% 정도 사용 (양 끝에서 10%씩 여백)
          const buildingWidth = 60; // 건물의 전체 너비
          const usableWidth = buildingWidth * 0.8;
          const spacing = usableWidth / (windowsInFloor - 1);
          xOffset = (i - (windowsInFloor - 1) / 2) * spacing;
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
