interface Props {
  color?: string;
}
export default function RightArrowIcon(props: Props) {
  const { color = "#111111" } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66683 3.33342L13.3335 10.0001L6.66683 16.6667"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
