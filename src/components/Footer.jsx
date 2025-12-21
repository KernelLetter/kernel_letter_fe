import React from 'react';

/**
 * 공통 Footer 컴포넌트
 */
export default function Footer() {
  const contributors = ['김지은', '김동균', '조현희', '조건희'];

  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 to-transparent py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* 프로젝트 정보 */}
        <div className="mb-3">
          <p className="text-yellow-400 text-sm font-serif italic mb-1">
            Kernel Letter
          </p>
          <p className="text-white/60 text-xs">
            소중한 사람들에게 마음을 전하는 크리스마스 롤링페이퍼
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-16 h-px bg-white/20 mx-auto mb-3"></div>

        {/* 기여자 */}
        <div className="mb-2">
          <p className="text-white/40 text-xs mb-1.5">프로젝트 기여자</p>
          <div className="flex flex-wrap justify-center gap-2">
            {contributors.map((name, index) => (
              <span
                key={index}
                className="text-white/70 text-xs px-2 py-1 bg-white/5 rounded"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* 저작권 */}
        <p className="text-white/30 text-xs mt-4">
          © 2025 Fast Campus Kernel Letter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
