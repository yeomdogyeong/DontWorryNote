interface Props {
  fillColor?: string;
}

export default function CheckFillIcon(props: Props) {
  const { fillColor = "#BBBBBB" } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill={fillColor} />
      <path
        d="M8 12L11 15L17 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
