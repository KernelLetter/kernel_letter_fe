import React from 'react';
import { isLetterUnlocked } from '../utils/dateUtils';

/**
 * 메시지 읽기 모달 컴포넌트
 * @param {Object} message - 메시지 객체 (author, content, color)
 * @param {boolean} isPageOwner - 페이지 주인 여부
 * @param {Function} onClose - 닫기 핸들러
 */
export default function ReadMessageModal({ message, isPageOwner, onClose }) {
  if (!message) return null;

  const canViewLetter = isPageOwner && isLetterUnlocked();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 sm:p-8 max-w-[350px] sm:max-w-[400px] w-full shadow-2xl"
      >
        {canViewLetter ? (
          <>
            <div
              className={`
                rounded-lg p-4 sm:p-5 mb-4 min-h-[100px]
                ${message.color}
              `}
              style={{ fontFamily: 'KkuBulLim, sans-serif' }}
            >
              <p className="m-0 text-sm sm:text-base leading-relaxed text-gray-700">
                {message.content}
              </p>
            </div>
            <p
              className="text-right m-0 mb-4 text-gray-500 text-xs sm:text-sm"
              style={{ fontFamily: 'KkuBulLim, sans-serif' }}
            >
              from. {message.author}
            </p>
          </>
        ) : (
          <div
            className="text-center py-8"
            style={{ fontFamily: 'KkuBulLim, sans-serif' }}
          >
            <div className="text-5xl mb-4">🔒</div>
            <p className="text-gray-700 text-base mb-2">
              이 편지는 12월 26일 15시에 공개됩니다
            </p>
            <p className="text-gray-500 text-sm">
              {isPageOwner
                ? '공개 시간까지 조금만 기다려주세요!'
                : '페이지 주인만 편지를 읽을 수 있어요'}
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full py-2.5 sm:py-3 bg-white text-gray-900 rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition-colors font-medium border-0"
          style={{ fontFamily: 'KkuBulLim, sans-serif' }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
