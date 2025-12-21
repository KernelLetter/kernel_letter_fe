/**
 * 편지 공개 시간: 2025년 12월 26일 15시
 */
const RELEASE_DATE = new Date('2025-12-26T15:00:00');

/**
 * 현재 시간이 편지 공개 시간 이후인지 확인
 * @returns {boolean} 공개 시간 이후이면 true
 */
export const isLetterUnlocked = () => {
  const now = new Date();
  return now >= RELEASE_DATE;
};

/**
 * 편지 공개 시간을 반환
 * @returns {Date} 공개 시간
 */
export const getReleaseDate = () => {
  return RELEASE_DATE;
};
