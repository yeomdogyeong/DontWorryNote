import React from "react";

import { LeftArrow } from "./icon/LeftArrow";
import { useRouter } from "next/navigation";
export const Header = () => {
  const router = useRouter();
  return (
    <button className="pl-[20px] flex  items-center w-[500px] max-w-full h-[52px]">
      <p onClick={() => router.back()}>
        <LeftArrow />
      </p>
    </button>
  );
};
