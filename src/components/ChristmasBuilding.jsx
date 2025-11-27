import React, { useState, useEffect } from 'react';
import WindowNode from './WindowNode';

/**
 * 크리스마스 건물 시각화 컴포넌트
 * @param {Array} users - 사용자 배열 (id, name, x, y, color 포함)
 * @param {Function} onUserClick - 사용자 클릭 핸들러
 */
export default function ChristmasBuilding({ users, onUserClick }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full relative">
      <svg
        className="w-full h-full min-h-[600px] md:min-h-0"
        viewBox={isMobile ? "18 0 64 92" : "0 0 100 100"}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* 건물 벽 그라데이션 */}
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C41E3A" />
            <stop offset="50%" stopColor="#DC143C" />
            <stop offset="100%" stopColor="#A01729" />
          </linearGradient>

          {/* 지붕 그라데이션 */}
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B5E20" />
            <stop offset="100%" stopColor="#0D3D11" />
          </linearGradient>

          {/* 눈 그라데이션 */}
          <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E3F2FD" />
          </linearGradient>

          {/* 문 그라데이션 */}
          <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B7355" />
            <stop offset="50%" stopColor="#A0826D" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
        </defs>

        {/* 지붕 */}
        <g className="roof">
          {/* 지붕 삼각형 */}
          <path
            d="M 50 3 L 18 12 L 82 12 Z"
            fill="url(#roofGradient)"
            stroke="#0D3D11"
            strokeWidth="0.3"
          />

          {/* 눈 덮인 지붕 */}
          <path
            d="M 50 3 L 18 12 L 20 11 L 50 4 L 80 11 L 82 12 Z"
            fill="url(#snowGradient)"
            opacity="0.9"
          />

          {/* 지붕 위 종 */}
          <g className="bell">
            <circle cx="50" cy="8" r="1" fill="#FFD700" stroke="#DAA520" strokeWidth="0.1"/>
            <path d="M 50 9 L 49.5 10 L 50.5 10 Z" fill="#FFD700"/>
          </g>
        </g>

        {/* 건물 본체 */}
        <rect
          x="20"
          y="12"
          width="60"
          height="73"
          fill="url(#buildingGradient)"
          stroke="#8B0000"
          strokeWidth="0.3"
          className="drop-shadow-lg"
        />

        {/* 문 (1층 중앙) */}
        <g className="door">
          <rect
            x="47"
            y="78"
            width="6"
            height="7"
            rx="0.5"
            fill="url(#doorGradient)"
            stroke="#654321"
            strokeWidth="0.2"
          />
          {/* 문 손잡이 */}
          <circle cx="51.5" cy="81.5" r="0.3" fill="#FFD700"/>
          {/* 문 위 리스 */}
          <circle cx="50" cy="77" r="1" fill="#0D5E20" stroke="#165E20" strokeWidth="0.1"/>
          <circle cx="50" cy="77" r="0.3" fill="#DC143C"/>
        </g>

        {/* 양옆 작은 크리스마스 트리들 - 데스크탑에서만 표시 */}
        <g className="side-trees">
          {/* 왼쪽 트리 */}
          <path d="M 10 85 L 7 90 L 13 90 Z" fill="#0D5E20"/>
          <path d="M 10 82 L 6 88 L 14 88 Z" fill="#165E20"/>
          <circle cx="10" cy="81" r="0.5" fill="#FFD700"/>
          <rect x="9.5" y="90" width="1" height="2" fill="#654321"/>

          {/* 오른쪽 트리 */}
          <path d="M 90 85 L 87 90 L 93 90 Z" fill="#0D5E20"/>
          <path d="M 90 82 L 86 88 L 94 88 Z" fill="#165E20"/>
          <circle cx="90" cy="81" r="0.5" fill="#FFD700"/>
          <rect x="89.5" y="90" width="1" height="2" fill="#654321"/>
        </g>

        {/* 선물 상자들 - 데스크탑에서만 표시 */}
        <g className="gifts">
          {/* 왼쪽 선물 */}
          <rect x="5" y="88" width="3" height="3" fill="#DC143C" stroke="#A01729" strokeWidth="0.1"/>
          <rect x="6.3" y="88" width="0.4" height="3" fill="#FFD700"/>
          <rect x="5" y="89.3" width="3" height="0.4" fill="#FFD700"/>

          {/* 오른쪽 선물 */}
          <rect x="92" y="88" width="3" height="3" fill="#0D5E20" stroke="#0A4015" strokeWidth="0.1"/>
          <rect x="93.3" y="88" width="0.4" height="3" fill="#FFD700"/>
          <rect x="92" y="89.3" width="3" height="0.4" fill="#FFD700"/>
        </g>

        {/* 창문들 (사용자들) */}
        {users.map((user) => (
          <WindowNode key={user.id} user={user} onClick={onUserClick} />
        ))}

        {/* 건물 하이라이트 효과 */}
        <rect
          x="20"
          y="10"
          width="3"
          height="70"
          fill="rgba(255, 255, 255, 0.1)"
          pointerEvents="none"
        />
      </svg>

      {/* 모바일에서 트리와 선물 숨기기 */}
      <style jsx>{`
        @media (max-width: 767px) {
          .side-trees,
          .gifts {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
