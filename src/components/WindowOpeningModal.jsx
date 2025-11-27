import { useEffect, useState } from 'react';

/**
 * 창문이 열리는 애니메이션 모달
 * @param {Boolean} isOpen - 모달 오픈 여부
 * @param {Function} onAnimationComplete - 애니메이션 완료 콜백
 */
export default function WindowOpeningModal({ isOpen, onAnimationComplete }) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 사운드 재생
      const audio = new Audio('/sounds/window-open.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Sound play failed:', err));

      // 모달이 나타난 후 잠시 대기 후 열림 애니메이션 시작
      setTimeout(() => {
        setIsOpening(true);
      }, 300);

      // 애니메이션 완료 후 콜백 실행 (천천히)
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 2300);
    }
  }, [isOpen, onAnimationComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-700"
        style={{ opacity: isOpening ? 0.8 : 0.3 }}
      />

      {/* 창문 컨테이너 */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <svg
          className="w-full h-full animate-scaleIn"
          viewBox="0 0 100 125"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 창문 프레임 */}
          <rect
            x="25"
            y="25"
            width="50"
            height="75"
            rx="2"
            fill="none"
            stroke={isOpening ? '#FFFFFF' : '#8B7355'}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* 왼쪽 창문 문짝 */}
          <g
            style={{
              transformOrigin: '25px 62.5px',
              transform: isOpening ? 'perspective(800px) rotateY(-120deg)' : 'none',
              transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            <rect
              x="25"
              y="25"
              width="24"
              height="75"
              rx="2"
              fill={isOpening ? '#E0F7FF' : '#F5F5DC'}
              stroke="#8B7355"
              strokeWidth="0.8"
            />
            {/* 왼쪽 창문 프레임 */}
            <line x1="37" y1="25" x2="37" y2="100" stroke="#654321" strokeWidth="1" />
            <line x1="25" y1="62.5" x2="49" y2="62.5" stroke="#654321" strokeWidth="1" />
          </g>

          {/* 오른쪽 창문 문짝 */}
          <g
            style={{
              transformOrigin: '75px 62.5px',
              transform: isOpening ? 'perspective(800px) rotateY(120deg)' : 'none',
              transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            <rect
              x="51"
              y="25"
              width="24"
              height="75"
              rx="2"
              fill={isOpening ? '#E0F7FF' : '#F5F5DC'}
              stroke="#8B7355"
              strokeWidth="0.8"
            />
            {/* 오른쪽 창문 프레임 */}
            <line x1="63" y1="25" x2="63" y2="100" stroke="#654321" strokeWidth="1" />
            <line x1="51" y1="62.5" x2="75" y2="62.5" stroke="#654321" strokeWidth="1" />
          </g>

          {/* 중앙 프레임 (항상 보이는 부분) */}
          <line x1="50" y1="25" x2="50" y2="100" stroke="#654321" strokeWidth="2" />
          <line x1="25" y1="62.5" x2="75" y2="62.5" stroke="#654321" strokeWidth="2" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
