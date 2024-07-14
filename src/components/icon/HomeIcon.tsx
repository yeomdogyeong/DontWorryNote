import React from "react";
import { useMemo } from "react";

interface Props {
  fill?: boolean;
  color?: string;
}

export default function HomeIcon(props: Props) {
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
        <path
          d="M4.15625 10.3636L14.1562 4L24.1562 10.3636V24H4.15625V10.3636Z"
          fill={color}
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.1562 16.3333H17.1562"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
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
      <path
        d="M4.5 10.3636L14.5 4L24.5 10.3636V24H4.5V10.3636Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.5 16.3335H17.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
}
