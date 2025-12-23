import React from 'react';

/**
 * 메시지 작성 모달 컴포넌트
 * @param {boolean} isOpen - 모달 열림 여부
 * @param {Object} newMessage - 새 메시지 객체 (author, content)
 * @param {boolean} isSubmissionClosed - 작성 가능 여부
 * @param {Function} onContentChange - 메시지 내용 변경 핸들러
 * @param {Function} onSubmit - 작성 완료 핸들러
 * @param {Function} onCancel - 취소 핸들러
 */
export default function WriteMessageModal({
  isOpen,
  newMessage,
  isSubmissionClosed = false,
  onContentChange,
  onSubmit,
  onCancel,
}) {
  if (!isOpen) return null;

  const contentLength = newMessage.content?.length || 0;
  const submitDisabled = isSubmissionClosed;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 sm:p-8 max-w-[350px] sm:max-w-[400px] w-full shadow-2xl"
        style={{ fontFamily: 'KkuBulLim, sans-serif' }}
      >
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
          편지 작성하기
        </h3>

        {isSubmissionClosed && (
          <div className="mb-4 text-sm text-red-600">
            12월 26일 13시 이후에는 메시지를 작성할 수 없습니다.
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">작성자</label>
          <input
            type="text"
            value={newMessage.author || '익명'}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600"
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm text-gray-600 mb-2">메시지 *</label>
          <textarea
            value={newMessage.content}
            onChange={(e) => onContentChange(e.target.value.slice(0, 150))}
            placeholder="따뜻한 메시지를 남겨주세요..."
            rows={4}
            maxLength={150}
            disabled={isSubmissionClosed}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none ${
              isSubmissionClosed ? 'bg-gray-100 text-gray-400' : ''
            }`}
          />
          <div className="absolute right-2 bottom-2 text-xs text-gray-400">
            {contentLength}/150자
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border-0"
          >
            취소
          </button>
          <button
            onClick={onSubmit}
            disabled={submitDisabled}
            className="flex-1 py-2.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
