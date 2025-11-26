import React from 'react';
import MessageCard from './MessageCard';
import EmptyCard from './EmptyCard';
import { getRotationClass } from '../utils/treeUtils';

/**
 * 트리 그리드 레이아웃 컴포넌트
 * @param {Array} treeRows - 트리 행 배열
 * @param {boolean} isPageOwner - 페이지 주인 여부
 * @param {Function} onEmptyCardClick - 빈 카드 클릭 핸들러
 * @param {Function} onMessageCardClick - 메시지 카드 클릭 핸들러
 */
export default function TreeGrid({
  treeRows,
  isPageOwner,
  onEmptyCardClick,
  onMessageCardClick,
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 w-full px-2">
      {treeRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1.5 sm:gap-2 md:gap-3 w-full"
        >
          {row.map((item, cardIndex) => {
            const { position, message } = item;
            const rotationClass = getRotationClass(rowIndex, cardIndex);

            // 빈 공간인 경우
            if (!message) {
              return (
                <EmptyCard
                  key={`empty-${position}`}
                  position={position}
                  rotationClass={rotationClass}
                  isPageOwner={isPageOwner}
                  onClick={onEmptyCardClick}
                />
              );
            }

            // 메시지가 있는 경우
            return (
              <MessageCard
                key={`message-${position}`}
                message={message}
                rotationClass={rotationClass}
                onClick={onMessageCardClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
