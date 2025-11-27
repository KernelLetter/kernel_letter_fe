import { useEffect, useState } from 'react';

/**
 * 창문이 열리는 애니메이션 모달
 * @param {Boolean} isOpen - 모달 오픈 여부
 * @param {Function} onAnimationComplete - 애니메이션 완료 콜백
 * @param {String} nextPageUrl - 다음 페이지 URL
 */
export default function WindowOpeningModal({ isOpen, onAnimationComplete, nextPageUrl }) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 사운드 재생
      const audio = new Audio('/sounds/window-open.mp3');
      audio.volume = 1;
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
          {/* 반짝이는 별/눈송이 마법 효과 (SVG 내부) */}
          {isOpening && (
            <>
              {/* 배경 그라데이션 */}
              <defs>
                <radialGradient id="magicGlow">
                  <stop offset="0%" stopColor="rgba(224,247,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(224,247,255,0.1)" />
                </radialGradient>
                <clipPath id="windowClip">
                  <rect x="25" y="25" width="50" height="75" rx="2" />
                </clipPath>
              </defs>

              {/* 마법 배경 */}
              <rect
                x="25"
                y="25"
                width="50"
                height="75"
                rx="2"
                fill="url(#magicGlow)"
                clipPath="url(#windowClip)"
              />

              {/* 별들과 눈송이를 SVG 내부에 foreignObject로 */}
              <foreignObject x="25" y="25" width="50" height="75" clipPath="url(#windowClip)">
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {/* 반짝이는 별들 */}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`star-${i}`}
                      className="animate-sparkle"
                      style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: `${1.5 + Math.random() * 2}em`,
                        animationDelay: `${Math.random() * 1.5}s`,
                        animationDuration: `${1 + Math.random() * 1}s`
                      }}
                    >
                      ✨
                    </div>
                  ))}

                  {/* 눈송이들 */}
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={`snow-${i}`}
                      className="animate-snowfall"
                      style={{
                        position: 'absolute',
                        left: `${Math.random() * 100}%`,
                        top: `-10%`,
                        fontSize: `${1.2 + Math.random() * 1.5}em`,
                        animationDelay: `${Math.random() * 1.5}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    >
                      ❄️
                    </div>
                  ))}
                </div>
              </foreignObject>
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
            stroke={isOpening ? '#FFFFFF' : '#8B7355'}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* 왼쪽 창문 문짝 */}
          <g
            style={{
              transformOrigin: '25px 62.5px',
              transform: isOpening ? 'perspective(800px) rotateY(-120deg)' : 'none',
              transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              opacity: isOpening ? 0.3 : 1
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
              transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              opacity: isOpening ? 0.3 : 1
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

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in forwards;
        }

        .animate-sparkle {
          animation: sparkle infinite ease-in-out;
        }

        .animate-snowfall {
          animation: snowfall infinite linear;
        }
      `}</style>
    </div>
  );
}
