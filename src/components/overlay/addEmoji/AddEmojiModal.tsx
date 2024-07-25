import CloseIcon from "@/components/icon/CloseIcon";
import { convertEmojiImgSrc } from "@/types/common";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export interface AddEmojiModalProps {
  onClick(value: number): void;
  onClose?(): Promise<void>;
}

export default function AddEmojiModal(props: AddEmojiModalProps) {
  const { onClick, onClose } = props;
  const numbers = Array.from({ length: 56 }, (_, index) => index + 1);

  return (
    <>
      <div className="z-[100] fixed top-0 left-0 bg-black opacity-[.7] w-screen h-screen" />
      <div className="z-[100] fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-page w-full">
        <div className="h-[496px] rounded-t-[20px] bg-white">
          <div className="flex items-center justify-between pt-[28px] px-[20px] pb-[16px]">
            <div className="font-[600] text-[20px]">이모지 선택하기</div>
            <button onClick={() => onClose?.()}>
              <CloseIcon />
            </button>
          </div>
          <div className="px-[20px] grid grid-cols-7 grid-rows-6 pt-[16px] flex flex-col gap-[8px]">
            {numbers.map((value, idx) => (
              <button
                className="flex-center"
                onClick={async (idx) => {
                  await onClick(value);
                  await onClose?.();
                }}
                key={idx}
              >
                <Image
                  alt="category-img"
                  src={convertEmojiImgSrc(value) as StaticImport}
                  width={41}
                  height={40}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
