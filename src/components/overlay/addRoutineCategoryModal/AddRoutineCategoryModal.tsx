import CloseIcon from "@/components/icon/CloseIcon";

export interface AddRoutineCateogoryModalListItem {
  title: string;
  onClick(): Promise<void>;
  className?: string;
}

export interface AddRoutineCateogoryModalProps {
  list: AddRoutineCateogoryModalListItem[];
  onClose?(): Promise<void>;
}

export default function AddRoutineCateogoryModal(
  props: AddRoutineCateogoryModalProps
) {
  const { list, onClose } = props;
  return (
    <>
      <div className="absolute top-0 left-0 bg-black opacity-[.7] w-screen h-screen" />
      <div className="absolute bottom-0 absolute left-1/2 transform -translate-x-1/2 max-w-page w-full">
        <div className="h-[496px] rounded-t-[20px] bg-white">
          <div className="flex items-center justify-between pt-[28px] px-[20px] pb-[16px]">
            <div className="font-[600] text-[20px]">카테고리 선택하기</div>
            <button onClick={() => onClose?.()}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-[20px] pt-[16px] flex flex-col gap-[8px]">
            {list.map((item, idx) => (
              <button
                onClick={async () => {
                  await item.onClick();
                  await onClose?.();
                }}
                key={idx}
                className={`${item.className} flex-center text-gray-800 bg-gray-50 p-[16px] rounded-[8px]`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
