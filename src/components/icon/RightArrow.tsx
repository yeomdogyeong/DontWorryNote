interface Props {
  size?: 28 | 20;
}

export default function RightArrow(props: Props) {
  const { size = 28 } = props;

  if (size === 20) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.1428 10H2.85705"
          stroke="#111111"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M12.1428 5L17.1428 10L12.1428 15"
          stroke="#111111"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 14H4"
        stroke="#111111"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M17 7L24 14L17 21"
        stroke="#111111"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
