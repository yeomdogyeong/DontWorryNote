import React from "react";

import { LeftArrow } from "./Icon/LeftArrow";
import { useRouter } from "next/navigation";
export const Header = () => {
  const router = useRouter();
  console.log(router.back);
  return (
    <button className="pl-[20px] flex  items-center bg-gray-200 w-[500px] max-w-full h-[52px]">
      <p onClick={() => router.back()}>
        <LeftArrow />
      </p>
    </button>
  );
};
