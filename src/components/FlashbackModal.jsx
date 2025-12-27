import React from 'react';

/**
 * 주마등 효과를 위한 풀스크린 모달 컴포넌트
 * @param {Object} message - 메시지 객체 (author, content, color)
 * @param {number} currentIndex - 현재 메시지 인덱스 (0부터 시작)
 * @param {number} totalCount - 전체 메시지 수
 * @param {boolean} isVisible - 페이드 인/아웃 제어
 */
export default function FlashbackModal({ message, currentIndex, totalCount, isVisible }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center">
      {/* 진행 상황 표시 */}
      <div
        className={`
          absolute top-8 right-8 text-white/60 text-sm sm:text-base
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ fontFamily: 'KkuBulLim, sans-serif' }}
      >
        {currentIndex + 1} / {totalCount}
      </div>

      {/* 메시지 카드 */}
      <div
        className={`
          max-w-2xl w-full mx-4 sm:mx-8
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* 내용 */}
        <div
          className={`
            rounded-2xl p-8 sm:p-12 mb-8
            shadow-2xl
            ${message.color}
            transform transition-transform duration-500
            ${isVisible ? 'scale-100' : 'scale-95'}
          `}
          style={{ fontFamily: 'KkuBulLim, sans-serif' }}
        >
          <p className="m-0 text-lg sm:text-2xl md:text-3xl leading-relaxed text-gray-800 whitespace-pre-wrap text-center">
            {message.content}
          </p>
        </div>

        {/* 작성자 */}
        <div className="text-center">
          <p
            className="m-0 text-white/80 text-base sm:text-xl md:text-2xl"
            style={{ fontFamily: 'KkuBulLim, sans-serif' }}
          >
            from. {message.author}
          </p>
        </div>
      </div>

      {/* 하단 안내 텍스트 */}
      <div
        className={`
          absolute bottom-8 text-white/40 text-xs sm:text-sm
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ fontFamily: 'KkuBulLim, sans-serif' }}
      >
        잠시 후 다음 메시지로 넘어갑니다...
      </div>
    </div>
  );
}
