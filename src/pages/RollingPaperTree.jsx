import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TreeGrid from '../components/TreeGrid';
import WriteMessageModal from '../components/WriteMessageModal';
import ReadMessageModal from '../components/ReadMessageModal';
import { usePageOwner } from '../hooks/usePageOwner';
import { useMessages } from '../hooks/useMessages';
import { getTreeRows } from '../utils/treeUtils';
import { useAuth } from '../hooks/useAuth';
import { useRedirectIfLoggedOut } from '../hooks/useRedirectIfLoggedOut';

export default function RollingPaperTree() {
  const { userId } = useParams();
  const location = useLocation();

  const {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    userId: loggedInUserId,
    isCheckingAuth,
  } = useAuth();
  useRedirectIfLoggedOut(isLoggedIn, isCheckingAuth);

  // 페이지 주인 정보 관리
  const { pageOwner, isPageOwner: checkIsPageOwner } = usePageOwner(userId, location.state);
  const isPageOwner = checkIsPageOwner(userName);

  // 메시지 상태 관리
  const {
    messages,
    selectedMessage,
    isWriting,
    newMessage,
    isSubmissionClosed,
    handleEmptyCardClick,
    handleSubmitMessage,
    handleCancelWrite,
    handleReadMessage,
    handleCloseMessage,
    updateMessageContent,
  } = useMessages(pageOwner, loggedInUserId, userName);

  // 주마등 효과 상태
  const [isFlashbackMode, setIsFlashbackMode] = useState(false);
  const [currentFlashbackIndex, setCurrentFlashbackIndex] = useState(0);

  // 트리 구조 생성
  const treeRows = getTreeRows(messages);
  const ownerDisplayName = pageOwner || '페이지 주인';

  // 페이지 로드 시 주마등 효과 시작 (페이지 주인만)
  useEffect(() => {
    const messagesList = Object.entries(messages).sort(([a], [b]) => a - b).map(([_, msg]) => msg);

    // 페이지 주인이고, 메시지가 있고, 아직 주마등 모드가 아닐 때
    if (isPageOwner && messagesList.length > 0 && !isFlashbackMode) {
      // 1초 딜레이 후 주마등 시작
      const timer = setTimeout(() => {
        setIsFlashbackMode(true);
        setCurrentFlashbackIndex(0);
        handleReadMessage(messagesList[0]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isPageOwner, messages]);

  // 주마등 모드 중 자동으로 다음 메시지로 전환
  useEffect(() => {
    if (!isFlashbackMode) return;

    const messagesList = Object.entries(messages).sort(([a], [b]) => a - b).map(([_, msg]) => msg);

    // 마지막 메시지면 3초 후 종료
    if (currentFlashbackIndex >= messagesList.length - 1) {
      const timer = setTimeout(() => {
        handleCloseMessage();
        setIsFlashbackMode(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    // 3초 후 다음 메시지로
    const timer = setTimeout(() => {
      const nextIndex = currentFlashbackIndex + 1;
      setCurrentFlashbackIndex(nextIndex);
      handleReadMessage(messagesList[nextIndex]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isFlashbackMode, currentFlashbackIndex, messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-gray-900 w-full">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
        setUserName={setUserName}
      />
      <div className="flex flex-col items-center py-4 sm:py-6 md:py-8 font-sans w-full">
        {/* 별 장식 */}
        <div
          className={`text-4xl sm:text-5xl md:text-6xl text-yellow-400 mb-2 md:mb-4 ${
            Object.keys(messages).length > 0
              ? 'drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]'
              : ''
          }`}
        >
          ⭐
        </div>

        {/* 트리 (메시지 카드들) */}
        <TreeGrid
          treeRows={treeRows}
          isPageOwner={isPageOwner}
          onEmptyCardClick={(position) =>
            handleEmptyCardClick(position, userName, isPageOwner)
          }
          onMessageCardClick={handleReadMessage}
        />

        {/* 메시지 텍스트 */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center text-yellow-400">
          <p
            className="text-xs sm:text-sm md:text-base tracking-widest m-0"
            style={{ fontFamily: 'KkuBulLim, sans-serif' }}
          >
            Fast Campus
          </p>
          <p
            className="text-3xl sm:text-4xl md:text-5xl font-serif italic m-0 drop-shadow-md"
            style={{ fontFamily: 'KkuBulLim, serif' }}
          >
            Kernel Letter
          </p>
          <p
            className="text-[10px] sm:text-xs md:text-sm tracking-wider mt-1 sm:mt-2"
            style={{ fontFamily: 'KkuBulLim, sans-serif' }}
          >
            & HAPPY NEW YEAR
          </p>
        </div>

        {/* 받은 메시지 수 */}
        <div
          className="mt-4 sm:mt-5 md:mt-6 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 bg-white/10 rounded-full text-white text-xs sm:text-sm"
          style={{ fontFamily: 'KkuBulLim, sans-serif' }}
        >
          {ownerDisplayName}님은 총 {Object.keys(messages).length}개의 메시지를 받았어요! 💌
        </div>

        {/* 메시지 작성 모달 */}
        <WriteMessageModal
          isOpen={isWriting}
          newMessage={newMessage}
          isSubmissionClosed={isSubmissionClosed}
          onContentChange={updateMessageContent}
          onSubmit={handleSubmitMessage}
          onCancel={handleCancelWrite}
        />

        {/* 메시지 상세 모달 */}
        <ReadMessageModal
          message={selectedMessage}
          isPageOwner={isPageOwner}
          onClose={handleCloseMessage}
        />
      </div>

      {/* 눈 내리는 효과 */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/30 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              fontSize: `${10 + Math.random() * 10}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </div>
  );
}
