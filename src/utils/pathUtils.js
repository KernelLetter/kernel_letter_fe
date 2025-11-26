import { PATH_CONFIG } from '../constants/mockData';

/**
 * 두 점 사이의 곡선 경로를 생성합니다 (Quadratic Bezier Curve)
 * @param {number} x1 - 시작점 X
 * @param {number} y1 - 시작점 Y
 * @param {number} x2 - 끝점 X
 * @param {number} y2 - 끝점 Y
 * @returns {string} SVG path 문자열
 */
export const createCurvedPath = (x1, y1, x2, y2) => {
  // 중간점 계산
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // 두 점 사이의 거리 벡터
  const dx = x2 - x1;
  const dy = y2 - y1;

  // 제어점 계산 (곡선의 휘어짐 정도)
  const { offset } = PATH_CONFIG;
  const cx = mx + dy * offset / 100;
  const cy = my - dx * offset / 100;

  // SVG Quadratic Bezier Curve 경로 반환
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
};

/**
 * 연결선 배열 생성 (순차적 연결)
 * @param {number} userCount - 사용자 수
 * @returns {Array<[number, number]>} 연결 쌍 배열
 */
export const createConnections = (userCount) => {
  const connections = [];
  for (let i = 0; i < userCount - 1; i++) {
    connections.push([i, i + 1]);
  }
  return connections;
};
