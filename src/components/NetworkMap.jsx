import React from 'react';
import UserNode from './UserNode';
import { createCurvedPath, createConnections } from '../utils/pathUtils';
import { SVG_CONFIG, CONNECTION_STYLE } from '../constants/mockData';

/**
 * 네트워크 맵 시각화 컴포넌트
 * @param {Array} users - 사용자 배열 (id, name, x, y 포함)
 * @param {Function} onUserClick - 사용자 클릭 핸들러
 */
export default function NetworkMap({ users, onUserClick }) {
  const { viewBoxWidth, viewBoxHeight, minHeight, minHeightSm } = SVG_CONFIG;
  const { stroke, strokeWidth } = CONNECTION_STYLE;

  // 연결선 생성
  const connections = createConnections(users.length);

  return (
    <div className="w-full max-w-7xl flex-1 relative overflow-x-auto overflow-y-hidden">
      <svg
        className="h-full min-h-[500px] sm:min-h-[600px]"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMin meet"
        style={{ minWidth: '100%', width: 'auto' }}
      >
        {/* 연결선 그리기 */}
        {connections.map((conn, idx) => {
          const user1 = users[conn[0]];
          const user2 = users[conn[1]];
          if (!user1 || !user2) return null;

          return (
            <path
              key={idx}
              d={createCurvedPath(user1.x, user1.y, user2.x, user2.y)}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill="none"
              className="transition-all duration-300"
            />
          );
        })}

        {/* 사용자 노드 */}
        {users.map((user) => (
          <UserNode key={user.id} user={user} onClick={onUserClick} />
        ))}
      </svg>
    </div>
  );
}
