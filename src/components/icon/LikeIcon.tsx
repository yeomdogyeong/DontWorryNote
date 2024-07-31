interface Props {
  color?: string;
  size?: 16 | 28;
}

export default function LikeIcon(props: Props) {
  const { color = "#CCCCCC", size = 28 } = props;

  if (size === 16) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99984 6.6665H2.6665V13.3332H5.99984V6.6665Z"
          stroke={color}
          stroke-width="1.33333"
          stroke-linejoin="round"
        />
        <path
          d="M6 6.6665V13.3332H11.3333L13.3333 6.6665H10L10.6667 3.99984L9.33333 2.6665L6 6.6665Z"
          stroke={color}
          stroke-width="1.33333"
          stroke-linejoin="round"
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
        d="M11.25 11.6667H5.41666V23.3334H11.25V11.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 11.6667V23.3334H20.5833L24.0833 11.6667H18.25L19.4167 7.00008L17.0833 4.66675L11.25 11.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
