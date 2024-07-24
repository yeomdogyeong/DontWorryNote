export interface ActionSheetListItem {
  title: string;
  onClick(): Promise<void>;
  className?: string;
}

export interface ActionSheetProps {
  list: ActionSheetListItem[];
  onClose?(): Promise<void>;
}

export default function ActionSheet(props: ActionSheetProps) {
  const { list, onClose } = props;
  return (
    <>
      <div className="absolute top-0 left-0 bg-black opacity-[.7] w-screen h-screen" />
      <div className="absolute bottom-0">
        {list.map((item, idx) => (
          <div
            onClick={async () => {
              await item.onClick();
              await onClose?.();
            }}
            key={idx}
            className={`${item.className}  ${
              idx !== 0 ? "border-t border-gray-100" : ""
            } h-[56px] flex-center font-600 text-gray-600 text-[16px]`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
}