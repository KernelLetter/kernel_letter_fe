import React from 'react';

/**
 * 나무에 달린 열매(오너먼트) 형태의 사용자 노드 컴포넌트
 * @param {Object} user - 사용자 정보 (id, name, x, y, color)
 * @param {Function} onClick - 클릭 핸들러
 */
export default function FruitNode({ user, onClick }) {
  return (
    <g
      onClick={() => onClick(user.id, user.name)}
      className="cursor-pointer group"
    >
      {/* 빛나는 효과 (호버 시) */}
      <circle
        cx={user.x}
        cy={user.y}
        r="3"
        fill={user.color}
        opacity="0"
        className="transition-all duration-300 group-hover:opacity-30 pointer-events-none"
      >
        <animate
          attributeName="r"
          values="3;4.5;3"
          dur="2s"
          repeatCount="indefinite"
          className="group-hover:animate-pulse"
        />
      </circle>

      {/* 오너먼트 몸체 */}
      <circle
        cx={user.x}
        cy={user.y}
        r="2.8"
        fill={user.color}
        className="transition-all duration-300 group-hover:r-[3.2] drop-shadow-lg"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
      />

      {/* 반짝이는 하이라이트 */}
      <circle
        cx={user.x - 0.6}
        cy={user.y - 0.6}
        r="0.6"
        fill="white"
        opacity="0.6"
        className="group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"
      />

      {/* 오너먼트 상단 고리 */}
      <rect
        x={user.x - 0.3}
        y={user.y - 3}
        width="0.6"
        height="0.7"
        fill="#D4AF37"
        rx="0.2"
        className="pointer-events-none"
      />

      {/* 전구 안의 이름 텍스트 */}
      <text
        x={user.x}
        y={user.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="1.4"
        fontWeight="600"
        className="select-none pointer-events-none"
        style={{
          textShadow: '0 0 2px rgba(0,0,0,0.8)',
        }}
      >
        {user.name}
      </text>
    </g>
  );
}
