import { useState } from 'react';
import { getRandomYellowColor } from '../utils/treeUtils';
import apiClient from '../lib/apiClient';

/**
 * 메시지 상태 관리를 위한 커스텀 훅
 * @param {string} receiverName - 받는 사람 이름
 * @param {number} senderId - 보내는 사람 ID
 * @returns {Object} 메시지 관련 상태와 핸들러 함수들
 */
export const useMessages = (receiverName, senderId) => {
  // 위치별 메시지 저장 (position index -> message)
  const [messages, setMessages] = useState({});

  // 선택된 메시지 (읽기용)
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 편지 작성 모달 상태
  const [isWriting, setIsWriting] = useState(false);
  const [writingPosition, setWritingPosition] = useState(null);
  const [newMessage, setNewMessage] = useState({ author: '', content: '' });

  /**
   * 빈 카드 클릭 시 편지 작성 모달 열기
   * @param {number} position - 카드 위치
   * @param {string} userName - 현재 사용자 이름
   * @param {boolean} isPageOwner - 페이지 주인 여부
   */
  const handleEmptyCardClick = (position, userName, isPageOwner) => {
    // 페이지 주인은 편지를 쓸 수 없음
    if (isPageOwner) {
      return;
    }

    setWritingPosition(position);
    setIsWriting(true);
    // 로그인한 사용자 이름 자동 입력
    setNewMessage({ author: userName, content: '' });
  };

  /**
   * 편지 작성 완료
   */
  const handleSubmitMessage = async () => {
    if (!newMessage.content.trim()) {
      alert('메시지를 입력해주세요!');
      return;
    }

    if (!senderId) {
      alert('로그인 정보를 확인할 수 없습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      // 서버로 편지 데이터 전송
      await apiClient.post('/Letter', {
        senderId: senderId,
        receiverName: receiverName,
        content: newMessage.content.trim(),
        position: writingPosition,
      });

      // 성공 시 로컬 state에도 저장 (UI 업데이트용)
      const messageData = {
        author: newMessage.author.trim() || '익명',
        content: newMessage.content.trim(),
        color: getRandomYellowColor(),
      };

      setMessages({
        ...messages,
        [writingPosition]: messageData,
      });

      setIsWriting(false);
      setWritingPosition(null);
      setNewMessage({ author: '', content: '' });
    } catch (error) {
      console.error('편지 전송 실패:', error);
      alert('편지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**
   * 편지 작성 취소
   */
  const handleCancelWrite = () => {
    setIsWriting(false);
    setWritingPosition(null);
    setNewMessage({ author: '', content: '' });
  };

  /**
   * 메시지 상세 모달 열기
   * @param {Object} message - 메시지 객체
   */
  const handleReadMessage = (message) => {
    setSelectedMessage(message);
  };

  /**
   * 메시지 상세 모달 닫기
   */
  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  /**
   * 메시지 내용 업데이트
   * @param {string} content - 메시지 내용
   */
  const updateMessageContent = (content) => {
    setNewMessage({ ...newMessage, content });
  };

  return {
    messages,
    selectedMessage,
    isWriting,
    newMessage,
    handleEmptyCardClick,
    handleSubmitMessage,
    handleCancelWrite,
    handleReadMessage,
    handleCloseMessage,
    updateMessageContent,
  };
};
