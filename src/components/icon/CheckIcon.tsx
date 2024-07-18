interface Props {
  fill?: boolean;
  fillColor?: string;
}

export default function CheckIcon(props: Props) {
  const { fill = false, fillColor = "#E5E5EB" } = props;

  if (fill) {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" rx="10" fill={fillColor} />
        <path
          d="M6 10L9 13L14 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.50008 9.99984L9.00008 12.4998L14.0001 7.49984M18.5834 9.99984C18.5834 14.6022 14.8525 18.3332 10.2501 18.3332C5.64771 18.3332 1.91675 14.6022 1.91675 9.99984C1.91675 5.39746 5.64771 1.6665 10.2501 1.6665C14.8525 1.6665 18.5834 5.39746 18.5834 9.99984Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
