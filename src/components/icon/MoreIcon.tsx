interface Props {
  color?: string;
}
export default function MoreIcon(props: Props) {
  const { color = "#111111" } = props;
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.51953" cy="14.0823" r="2" fill={color} />
      <circle cx="20.5195" cy="14.0823" r="2" fill={color} />
      <circle cx="13.5195" cy="14.0823" r="2" fill={color} />
    </svg>
  );
}
