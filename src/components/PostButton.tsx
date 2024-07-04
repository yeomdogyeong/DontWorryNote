import Image from "next/image";
import React from "react";
import pencil from "../../public/pencil.png";
import { SubjectType } from "@/types/common";
interface PostButtonType {
  bgColor: SubjectType;
}

export const PostButton = ({ bgColor }: PostButtonType) => {
  return (
    <button
      className={`${
        bgColor === "baejjange" ? "bg-mainGreen " : "bg-mainBlack "
      } text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-12 h-12`}
    >
      <Image src={pencil} alt="logo" className="w-5 h-5" />
    </button>
  );
};
