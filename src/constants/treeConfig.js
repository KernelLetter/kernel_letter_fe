/**
 * 트리 설정 및 상수 관리
 */

// 노란색 계열 색상 팔레트 (메시지 카드용)
export const YELLOW_COLOR_PALETTE = [
  'bg-yellow-50',
  'bg-yellow-100',
  'bg-yellow-200',
  'bg-amber-50',
  'bg-amber-100',
  'bg-amber-200',
  'bg-orange-50',
  'bg-orange-100',
];

// 트리 구조 정의 (각 행의 카드 수)
export const TREE_STRUCTURE = [1, 2, 3, 4, 5, 6, 7];

// 각 행별 회전 각도 클래스
export const ROTATION_CLASSES = [
  ['rotate-0'],
  ['-rotate-6', 'rotate-6'],
  ['-rotate-12', 'rotate-0', 'rotate-12'],
  ['-rotate-12', '-rotate-3', 'rotate-3', 'rotate-12'],
  ['-rotate-12', '-rotate-6', 'rotate-0', 'rotate-6', 'rotate-12'],
  ['-rotate-12', '-rotate-6', '-rotate-2', 'rotate-2', 'rotate-6', 'rotate-12'],
  ['-rotate-12', '-rotate-6', '-rotate-3', 'rotate-0', 'rotate-3', 'rotate-6', 'rotate-12'],
];

// 사용자 ID와 이름 매핑 (실제로는 API에서 가져와야 함)
export const USER_MAP = {
  '1': '김덕배',
  '2': '곽두팔',
  '3': '이영희',
  '4': '박민수',
  '5': '정수진',
  '6': '최지훈',
  '7': '홍길동',
  '8': '윤서영',
};
