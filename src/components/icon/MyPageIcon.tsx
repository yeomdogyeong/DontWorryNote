import React from "react";
import { useMemo } from "react";

interface Props {
  fill?: boolean;
  color?: string;
}

export default function MyPageIcon(props: Props) {
  const { fill, color = "#999999" } = props;

  if (fill) {
    return (
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="14.625"
          cy="8"
          rx="4"
          ry="4"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M5.625 19C5.625 16.7909 7.41586 15 9.625 15H19.625C21.8341 15 23.625 16.7909 23.625 19V24H5.625V19Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="14.625"
        cy="8"
        rx="4"
        ry="4"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5.625 19C5.625 16.7909 7.41586 15 9.625 15H19.625C21.8341 15 23.625 16.7909 23.625 19V24H5.625V19Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
