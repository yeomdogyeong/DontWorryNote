interface Props {
  color?: string;
}

export default function LikeIcon(props: Props) {
  const { color = "#CCCCCC" } = props;

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
