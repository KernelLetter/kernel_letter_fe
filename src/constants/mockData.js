// 사용자 목록 (실제로는 API에서 가져옴)
export const USER_NAMES = [
  '김덕배', '곽두팔', '이영희', '박민수', '정수진', '최지훈', '홍길동', '윤서영',
  '강민지', '조현우', '신예진', '임도윤', '한서준', '송하은', '백지우', '오예준',
  '황시우', '전서연', '노준서', '장윤아', '권민준', '유지호', '차서윤', '성하준',
  '안유나', '표준혁', '양채원', '구시현', '남지안', '탁민서', '문지훈', '방서아',
  '석준우', '빈하윤', '도시은', '변지후', '서예린', '진우진'
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
