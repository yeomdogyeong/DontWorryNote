import React from "react";

export const LeftArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14H24"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 7L4 14L11 21"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
