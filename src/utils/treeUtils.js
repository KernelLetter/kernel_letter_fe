import { TREE_STRUCTURE, ROTATION_CLASSES, YELLOW_COLOR_PALETTE } from '../constants/treeConfig';

/**
 * 랜덤 노란색 선택 함수
 * @returns {string} 랜덤으로 선택된 노란색 클래스명
 */
export const getRandomYellowColor = () => {
  return YELLOW_COLOR_PALETTE[Math.floor(Math.random() * YELLOW_COLOR_PALETTE.length)];
};

/**
 * 트리 구조 생성 (위치별로 메시지 또는 null)
 * @param {Object} messages - 위치별 메시지 객체
 * @returns {Array} 트리 행 배열
 */
export const getTreeRows = (messages) => {
  let currentPosition = 0;
  return TREE_STRUCTURE.map((count) => {
    const row = [];
    for (let i = 0; i < count; i++) {
      row.push({
        position: currentPosition,
        message: messages[currentPosition] || null,
      });
      currentPosition++;
    }
    return row;
  });
};

/**
 * 각 카드의 회전 각도 클래스 반환
 * @param {number} rowIndex - 행 인덱스
 * @param {number} cardIndex - 카드 인덱스
 * @returns {string} 회전 클래스명
 */
export const getRotationClass = (rowIndex, cardIndex) => {
  return ROTATION_CLASSES[rowIndex]?.[cardIndex] || 'rotate-0';
};

/**
 * 전체 자리 수 계산
 * @returns {number} 전체 자리 수
 */
export const getTotalPositions = () => {
  return TREE_STRUCTURE.reduce((sum, count) => sum + count, 0);
};
