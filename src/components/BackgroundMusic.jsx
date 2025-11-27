import { useEffect, useRef, useState } from 'react';

/**
 * 백그라운드 음악 플레이어 컴포넌트
 * 모든 페이지에서 음악을 재생하고 컨트롤 제공
 */
export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(() => {
    // 로컬 스토리지에서 사용자 설정 불러오기
    const saved = localStorage.getItem('bgMusicEnabled');
    return saved === null ? true : saved === 'true';
  });
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 음악 설정
    audio.volume = 0.2;
    audio.loop = true;

    // 자동 재생 시도
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Auto-play was prevented:', err);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }

    // 사용자 설정 저장
    localStorage.setItem('bgMusicEnabled', isPlaying.toString());
  }, [isPlaying]);

  // 사용자의 첫 클릭을 감지하여 음악 재생
  useEffect(() => {
    if (userInteracted) return;

    const handleFirstInteraction = () => {
      const audio = audioRef.current;
      if (!audio || userInteracted) return;

      setUserInteracted(true);

      // 사용자가 음악을 켜놓은 상태였다면 자동 재생
      const saved = localStorage.getItem('bgMusicEnabled');
      if (saved === null || saved === 'true') {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Play failed on interaction:', err);
        });
      }
    };

    // 클릭, 터치, 키보드 이벤트 감지
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [userInteracted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => {
        console.log('Play failed:', err);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* 오디오 요소 */}
      <audio ref={audioRef} src="/sounds/background-music.mp3" />

      {/* 음악 컨트롤 버튼 (우측 하단 고정) */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        {/* 재생/정지 버튼 */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center group"
          title={isPlaying ? '음악 정지' : '음악 재생'}
        >
          {isPlaying ? (
            <span className="text-2xl">⏸️</span>
          ) : (
            <span className="text-2xl">▶️</span>
          )}
        </button>

        {/* 음소거 버튼 */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center"
            title={isMuted ? '음소거 해제' : '음소거'}
          >
            {isMuted ? (
              <span className="text-2xl">🔇</span>
            ) : (
              <span className="text-2xl">🔊</span>
            )}
          </button>
        )}
      </div>
    </>
  );
}
