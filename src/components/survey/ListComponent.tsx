"use client";
import Image, { StaticImageData } from "next/image";
import { List } from "postcss/lib/list";
import React, { ReactNode, useState } from "react";

interface ListComponentType {
  text: string;
  srcImg: ReactNode;
  onClick: (text: string | null) => void;
  select: string | null;
}

export const ListComponent = ({
  text,
  srcImg,
  onClick,
  select,
}: ListComponentType) => {
  const isSelected = select === text;
  const handlePick = () => {
    if (isSelected) {
      onClick(null);
    } else {
      onClick(text);
    }
  };

  return (
    <>
      <button className="mb-[8px] w-full px-[20px]">
        <div
          onClick={() => {
            handlePick();
          }}
          className={`tracking-wide border-2 flex justify-left items-center text-gray-800 px-[16px] font-[500] text-[16px] rounded-xl h-[70px]  hover:border-mainGreen hover:bg-subGreen ${
            isSelected ? "bg-subGreen border-mainGreen" : ""
          }`}
        >
          <span>{srcImg}</span>
          <span className="ml-[8px] ">{text}</span>
        </div>
      </button>
    </>
  );
};
