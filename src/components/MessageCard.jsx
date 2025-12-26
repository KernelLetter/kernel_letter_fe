import React from 'react';
import { isLetterUnlocked } from '../utils/dateUtils';

/**
 * 개별 메시지 카드 컴포넌트
 * @param {Object} message - 메시지 객체 (author, content, color)
 * @param {string} rotationClass - 회전 클래스명
 * @param {boolean} isPageOwner - 페이지 주인 여부
 * @param {Function} onClick - 클릭 핸들러
 */
export default function MessageCard({ message, rotationClass, isPageOwner, onClick }) {
  const canViewLetter = isPageOwner && isLetterUnlocked();
  return (
    <div
      onClick={() => onClick(message)}
      className={`
        w-[50px] h-[70px] sm:w-[80px] sm:h-[85px] md:w-[80px] md:h-[85px]
        rounded p-1
        shadow-lg cursor-pointer
        transition-all duration-300
        hover:scale-110 hover:shadow-xl hover:z-10
        flex flex-col
        ${rotationClass}
        ${message.color}
      `}
    >
      {/* 메시지 내용 영역 */}
      <div
        className="
          flex-1 rounded-sm p-1 text-[7px] sm:text-[8px] md:text-[9px]
          overflow-hidden flex items-center justify-center
          text-center text-gray-700 leading-tight
          bg-white/50
        "
        style={{ fontFamily: 'KkuBulLim, sans-serif' }}
      >
        {canViewLetter ? (
          message.content.length > 20
            ? message.content.substring(0, 20) + '...'
            : message.content
        ) : (
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-base sm:text-lg">💌</span>
            <span className="text-[6px] sm:text-[7px]">편지 도착!</span>
          </div>
        )}
      </div>
    </div>
  );
}
