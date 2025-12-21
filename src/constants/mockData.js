// 사용자 목록 (실제로는 API에서 가져옴) - 가나다 역순 정렬
export const USER_NAMES = [
  '최재희', '최승현', '최수민', '최민영', '조희찬', '조혜은', '조현희', '조경서',
  '조건희', '주민우', '정윤성', '정욱', '정수진', '장연우', '이주원', '이승욱',
  '이소윤', '양재웅', '신지원', '심다은', '오주현', '오원준', '박은정', '남궁성',
  '김희재', '김형근', '김태희', '김진용', '김지은', '김준휘', '김준오', '김재훈',
  '김윤영', '김동균', '김건우', '권우희', '권영훈', '권아연', '고대영', '경서영'
];

// 물결 패턴 설정
export const WAVE_CONFIG = {
  startX: 10,           // 시작 X 위치
  totalWidth: 290,      // 전체 너비
  amplitude: 30,        // 파도 높이
  frequency: 7,         // 파도 빈도
  centerY: 50,          // 중심 Y 위치
  randomOffset: 6,      // 랜덤 오프셋 범위
};

// 곡선 경로 설정
export const PATH_CONFIG = {
  offset: 20,           // 곡선 오프셋
};

// SVG 설정
export const SVG_CONFIG = {
  viewBoxWidth: 310,
  viewBoxHeight: 100,
  minHeight: '500px',
  minHeightSm: '600px',
};

// 노드 스타일 설정
export const NODE_STYLE = {
  radius: 3.2,
  fill: '#2acb4aff',
  hoverFill: '#FCA5A5',
  fontSize: '2.5',
};

// 연결선 스타일 설정
export const CONNECTION_STYLE = {
  stroke: 'rgba(227, 174, 83)',
  strokeWidth: '3.0',
};
