import React, { useState } from 'react';

/**
 * 건물 창문 노드 컴포넌트
 * @param {Object} user - 사용자 정보 (id, name, x, y, color)
 * @param {Function} onClick - 클릭 핸들러
 */
export default function WindowNode({ user, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick(user.id, user.name);
  };

  return (
    <g
      className="window-node cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 창문 배경 */}
      <rect
        x={user.x - 2}
        y={user.y - 3}
        width="4"
        height="5"
        rx="0.5"
        fill={isHovered ? '#FFD700' : '#F5F5DC'}
        stroke={isHovered ? '#FFA500' : '#8B7355'}
        strokeWidth="0.15"
        className="transition-all duration-200"
      />

      {/* 창문 십자가 프레임 */}
      <line
        x1={user.x}
        y1={user.y - 3}
        x2={user.x}
        y2={user.y + 2}
        stroke="#8B7355"
        strokeWidth="0.15"
      />
      <line
        x1={user.x - 2}
        y1={user.y - 0.5}
        x2={user.x + 2}
        y2={user.y - 0.5}
        stroke="#8B7355"
        strokeWidth="0.15"
      />

      {/* 불빛 효과 (호버 시) */}
      {isHovered && (
        <>
          <circle
            cx={user.x}
            cy={user.y - 0.5}
            r="2.5"
            fill="rgba(255, 215, 0, 0.3)"
            className="animate-pulse"
          />
          <circle
            cx={user.x}
            cy={user.y - 0.5}
            r="1.5"
            fill="rgba(255, 215, 0, 0.5)"
          />
        </>
      )}

      {/* 사용자 이름 (항상 표시) */}
      <g>
        {/* 이름 텍스트 */}
        <text
          x={user.x}
          y={user.y + 3.5}
          textAnchor="middle"
          fill={isHovered ? "#FFD700" : "#F5F5DC"}
          fontSize="1.3"
          fontWeight="bold"
          className="transition-colors duration-200"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        >
          {user.name}
        </text>
      </g>
    </g>
  );
}
