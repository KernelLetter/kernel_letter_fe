import React from 'react';

/**
 * 메시지 읽기 모달 컴포넌트
 * @param {Object} message - 메시지 객체 (author, content, color)
 * @param {Function} onClose - 닫기 핸들러
 */
export default function ReadMessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 sm:p-8 max-w-[350px] sm:max-w-[400px] w-full shadow-2xl"
      >
        <div
          className={`
            rounded-lg p-4 sm:p-5 mb-4 min-h-[100px]
            ${message.color}
          `}
        >
          <p className="m-0 text-sm sm:text-base leading-relaxed text-gray-700">
            {message.content}
          </p>
        </div>
        <p className="text-right m-0 mb-4 text-gray-500 text-xs sm:text-sm">
          from. {message.author}
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 sm:py-3 bg-red-950 text-white !border-none rounded-lg text-sm cursor-pointer hover:bg-red-900 transition-colors font-medium"
          style={{ backgroundColor: '#450a0a', color: 'white' }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
