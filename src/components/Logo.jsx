import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* 편지 봉투 */}
      <rect
        x="15"
        y="30"
        width="70"
        height="50"
        rx="4"
        fill="#FDE047"
        stroke="#854D0E"
        strokeWidth="2"
      />

      {/* 봉투 플랩 */}
      <path
        d="M15 30 L50 55 L85 30"
        stroke="#854D0E"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />

      {/* 별 장식 (크리스마스 테마) */}
      <path
        d="M50 15 L52 22 L59 22 L53.5 26.5 L56 33 L50 28.5 L44 33 L46.5 26.5 L41 22 L48 22 Z"
        fill="#EF4444"
        stroke="#991B1B"
        strokeWidth="1"
      />

      {/* K 이니셜 */}
      <text
        x="50"
        y="63"
        fontSize="24"
        fontWeight="bold"
        fill="#854D0E"
        textAnchor="middle"
        fontFamily="serif"
        style={{ fontStyle: 'italic' }}
      >
        K
      </text>
    </svg>
  );
}
