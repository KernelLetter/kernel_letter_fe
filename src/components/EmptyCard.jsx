/**
 * 빈 카드 컴포넌트 (편지 작성 가능)
 * @param {number} position - 카드 위치
 * @param {string} rotationClass - 회전 클래스명
 * @param {boolean} isPageOwner - 페이지 주인 여부
 * @param {Function} onClick - 클릭 핸들러
 */
export default function EmptyCard({ position, rotationClass, isPageOwner, onClick }) {
  return (
    <div
      onClick={() => onClick(position)}
      className={`
        w-[50px] h-[70px] sm:w-[80px] sm:h-[85px] md:w-[80px] md:h-[85px]
        bg-green-200/60 rounded p-1
        shadow-lg
        transition-all duration-300
        flex flex-col items-center justify-center
        ${rotationClass}
        ${!isPageOwner ? 'cursor-pointer hover:scale-105 hover:bg-green-300/60' : ''}
      `}
    >
      <div className="flex-1 rounded-sm bg-green-300/40 w-full flex items-center justify-center">
        {!isPageOwner && (
          <span className="text-green-700/70 text-lg sm:text-xl font-bold">+</span>
        )}
      </div>
    </div>
  );
}
