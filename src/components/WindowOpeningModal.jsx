import React, { useEffect, useState } from 'react';

/**
 * 창문이 열리는 애니메이션 모달
 * @param {Boolean} isOpen - 모달 오픈 여부
 * @param {Function} onAnimationComplete - 애니메이션 완료 콜백
 */
export default function WindowOpeningModal({ isOpen, onAnimationComplete }) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 모달이 나타난 후 잠시 대기 후 열림 애니메이션 시작
      setTimeout(() => {
        setIsOpening(true);
      }, 300);

      // 애니메이션 완료 후 콜백 실행
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 1300);
    }
  }, [isOpen, onAnimationComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{ opacity: isOpening ? 0.8 : 0.3 }}
      />

      {/* 창문 컨테이너 */}
      <div className="relative z-10 flex items-center justify-center">
        <svg
          width="400"
          height="500"
          viewBox="0 0 100 125"
          className="animate-scaleIn"
        >
          <defs>
            {/* 빛 그라데이션 */}
            <radialGradient id="lightGradient">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 빛 효과 (창문이 열릴 때) */}
          {isOpening && (
            <>
              <circle
                cx="50"
                cy="62.5"
                r="60"
                fill="url(#lightGradient)"
                className="animate-expandLight"
              />
              <circle
                cx="50"
                cy="62.5"
                r="40"
                fill="rgba(255, 255, 255, 0.6)"
                className="animate-expandLight"
                style={{ animationDelay: '0.1s' }}
              />
            </>
          )}

          {/* 창문 프레임 */}
          <rect
            x="25"
            y="25"
            width="50"
            height="75"
            rx="2"
            fill="none"
            stroke={isOpening ? '#FFA500' : '#8B7355'}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* 왼쪽 창문 문짝 */}
          <g
            style={{
              transformOrigin: '25px 62.5px',
              transform: isOpening ? 'perspective(800px) rotateY(-120deg)' : 'none',
              transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            <rect
              x="25"
              y="25"
              width="24"
              height="75"
              rx="2"
              fill={isOpening ? '#FFD700' : '#F5F5DC'}
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
              transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            <rect
              x="51"
              y="25"
              width="24"
              height="75"
              rx="2"
              fill={isOpening ? '#FFD700' : '#F5F5DC'}
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

        @keyframes expandLight {
          0% {
            r: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            r: 100;
            opacity: 0;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-expandLight {
          animation: expandLight 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
