import React from 'react';
import { NODE_STYLE } from '../constants/mockData';

/**
 * 개별 사용자 노드 컴포넌트
 * @param {Object} user - 사용자 정보 (id, name, x, y)
 * @param {Function} onClick - 클릭 핸들러
 */
export default function UserNode({ user, onClick }) {
  const { radius, fill, fontSize } = NODE_STYLE;

  return (
    <g
      onClick={() => onClick(user.id, user.name)}
      className="cursor-pointer group"
      style={{ transformOrigin: `${user.x}% ${user.y}%` }}
    >
      {/* 노드 원 */}
      <circle
        cx={user.x}
        cy={user.y}
        r={radius}
        fill={fill}
        className="transition-all duration-300 group-hover:fill-pink-300"
      />

      {/* 이름 레이블 */}
      <text
        x={user.x}
        y={user.y - 5}
        textAnchor="middle"
        fill="white"
        fontSize={fontSize}
        fontWeight="bold"
        className="select-none transition-all duration-300 group-hover:fill-yellow-400"
      >
        {user.name}
      </text>
    </g>
  );
}
