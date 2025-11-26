import React from 'react';
import FruitNode from './FruitNode';

/**
 * 크리스마스 트리 시각화 컴포넌트
 * @param {Array} users - 사용자 배열 (id, name, x, y, color 포함)
 * @param {Function} onUserClick - 사용자 클릭 핸들러
 */
export default function ChristmasTree({ users, onUserClick }) {
  return (
    <div className="w-full max-w-4xl flex-1 relative">
      <svg
        className="w-full h-full min-h-[600px]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* 트리 그라데이션 */}
          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="50%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          {/* 별 그라데이션 */}
          <radialGradient id="starGradient">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FACC15" />
          </radialGradient>

          {/* 트렁크 그라데이션 */}
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>

        {/* 트리 몸체 - 4층 구조 */}
        <g className="tree-body">
          {/* 1층 (최상단) */}
          <path
            d="M 50 12 L 38 26 L 62 26 Z"
            fill="url(#treeGradient)"
            stroke="#15803d"
            strokeWidth="0.3"
            className="drop-shadow-lg"
          />

          {/* 2층 */}
          <path
            d="M 50 22 L 32 40 L 68 40 Z"
            fill="url(#treeGradient)"
            stroke="#15803d"
            strokeWidth="0.3"
            className="drop-shadow-lg"
          />

          {/* 3층 */}
          <path
            d="M 50 36 L 26 54 L 74 54 Z"
            fill="url(#treeGradient)"
            stroke="#15803d"
            strokeWidth="0.3"
            className="drop-shadow-lg"
          />

          {/* 4층 (최하단) */}
          <path
            d="M 50 50 L 20 70 L 80 70 Z"
            fill="url(#treeGradient)"
            stroke="#15803d"
            strokeWidth="0.3"
            className="drop-shadow-lg"
          />

          {/* 트리 하이라이트 */}
          <path
            d="M 50 12 L 45 18 L 40 24 L 38 26"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* 나무 줄기 */}
        <rect
          x="45"
          y="70"
          width="10"
          height="12"
          rx="1"
          fill="url(#trunkGradient)"
          stroke="#78350f"
          strokeWidth="0.3"
        />

        {/* 장식용 리본 */}
        <g className="decorations">
          {/* 가랜드 라인 */}
          <path
            d="M 35 30 Q 40 32 45 30 Q 50 28 55 30 Q 60 32 65 30"
            stroke="#D4AF37"
            strokeWidth="0.3"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 30 48 Q 40 50 50 48 Q 60 46 70 48"
            stroke="#D4AF37"
            strokeWidth="0.3"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 25 63 Q 37.5 65 50 63 Q 62.5 61 75 63"
            stroke="#D4AF37"
            strokeWidth="0.3"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 사용자 열매들 */}
        {users.map((user) => (
          <FruitNode key={user.id} user={user} onClick={onUserClick} />
        ))}

        {/* 트리 꼭대기 별 */}
        <g className="star-top">
          {/* 별 빛 효과 */}
          <circle
            cx="50"
            cy="8"
            r="4"
            fill="url(#starGradient)"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values="4;6;4"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* 별 본체 */}
          <path
            d="M 50 3 L 51.5 6.5 L 55 6.5 L 52 8.5 L 53.5 12 L 50 10 L 46.5 12 L 48 8.5 L 45 6.5 L 48.5 6.5 Z"
            fill="url(#starGradient)"
            stroke="#F59E0B"
            strokeWidth="0.2"
            className="drop-shadow-lg"
          />

          {/* 별 반짝임 */}
          <circle
            cx="50"
            cy="8"
            r="0.5"
            fill="white"
          >
            <animate
              attributeName="opacity"
              values="1;0;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* 화분 */}
        <g className="pot">
          <path
            d="M 42 82 L 58 82 L 56 90 L 44 90 Z"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="0.3"
          />
          <rect
            x="40"
            y="80"
            width="20"
            height="2"
            rx="0.5"
            fill="#B91C1C"
          />
          {/* 화분 리본 */}
          <rect
            x="40"
            y="85"
            width="20"
            height="1"
            fill="#D4AF37"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
}
