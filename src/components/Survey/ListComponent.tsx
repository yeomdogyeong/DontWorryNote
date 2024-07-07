import Image, { StaticImageData } from "next/image";
import { List } from "postcss/lib/list";
import React, { ReactNode } from "react";

interface ListComponentType {
  text: string;
  srcImg: ReactNode;
}

export const ListComponent = ({ text, srcImg }: ListComponentType) => {
  return (
    <button className="mt-4">
      <div className="tracking-wide border-2 flex justify-left items-center pl-8 text-lg rounded-xl w-[400px] max-w-[80vw] h-[70px] max-h-[8vh] hover:border-mainGreen hover:bg-subGreen">
        <p>{srcImg}</p> <p className="ml-4 ">{text}</p>
      </div>
    </button>
  );
};
