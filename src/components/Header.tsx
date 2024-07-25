import React from "react";

import { LeftArrow } from "./icon/LeftArrow";
import { useRouter } from "next/navigation";

interface Props {
  title?: string;
  rightButton?: React.ReactNode;
}

export const Header = (props: Props) => {
  const { title, rightButton } = props;
  const router = useRouter();
  return (
    <div className="z-50 sticky bg-white top-0 px-[20px] py-[12px] flex items-center w-full max-w-page h-[52px]">
      <div className="flex flex-1 justify-start" onClick={() => router.back()}>
        <button>
          <LeftArrow />
        </button>
      </div>
      <div className="flex-1 flex-center font-[600] text-[18px]">{title}</div>
      <div
        className={`flex flex-1 justify-end ${
          rightButton ? "cursor-pointer" : ""
        }`}
      >
        {rightButton}
      </div>
    </div>
  );
};
