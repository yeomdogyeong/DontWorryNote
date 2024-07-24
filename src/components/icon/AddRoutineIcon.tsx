import React from "react";
import { useMemo } from "react";

interface Props {
  fill?: boolean;
  color?: string;
}

export default function AddRoutineIcon(props: Props) {
  const { fill, color = "#999999" } = props;

  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 24.5C20.299 24.5 25 19.799 25 14C25 8.20101 20.299 3.5 14.5 3.5C8.70101 3.5 4 8.20101 4 14C4 19.799 8.70101 24.5 14.5 24.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 10.5V17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 14H11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
