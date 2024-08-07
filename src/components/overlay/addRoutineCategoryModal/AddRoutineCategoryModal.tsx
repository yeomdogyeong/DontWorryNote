import CloseIcon from "@/components/icon/CloseIcon";
import {
  RoutineCategoryType,
  convertRoutineCategoryImgSrc,
} from "@/types/apis/routine";
import { SubjectType } from "@/types/common";
import Image from "next/image";

export interface AddRoutineCateogoryModalListItem {
  title: string;
  value: RoutineCategoryType;
  onClick(): Promise<void>;
  className?: string;
}

export interface AddRoutineCateogoryModalProps {
  list: AddRoutineCateogoryModalListItem[];
  tendency: SubjectType;
  onClose?(): Promise<void>;
}

export default function AddRoutineCateogoryModal(
  props: AddRoutineCateogoryModalProps
) {
  const { list, onClose, tendency } = props;

  return (
    <>
      <div className="fixed z-[100] top-0 left-0 bg-black opacity-[.7] w-screen h-screen" />
      <div className="fixed z-[100] bottom-0 left-1/2 transform -translate-x-1/2 max-w-page w-full">
        <div className="h-[590px] rounded-t-[20px] bg-white">
          <div className="flex items-center justify-between pt-[28px] px-[20px] pb-[16px]">
            <div className="font-[500] text-[20px]">
              {tendency === SubjectType.BAEZZANGE
                ? "베짱이 카테고리"
                : "개미 카테고리"}
            </div>
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
                className={`${item.className} flex items-center gap-[8px] text-gray-800 bg-gray-50 p-[16px] rounded-[8px]`}
              >
                <Image
                  alt="category-img"
                  src={convertRoutineCategoryImgSrc(item.value)}
                  width={28}
                  height={28}
                />
                <div> {item.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
