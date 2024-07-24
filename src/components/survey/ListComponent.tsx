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
      <button className="mt-4">
        <div
          onClick={() => {
            handlePick();
          }}
          className={`tracking-wide border-2 flex justify-left items-center pl-8 text-lg rounded-xl w-[400px] max-w-[80vw] h-[70px] max-h-[8vh] hover:border-mainGreen hover:bg-subGreen ${
            isSelected ? "bg-subGreen border-mainGreen" : ""
          }`}
        >
          <p>{srcImg}</p> <p className="ml-4 ">{text}</p>
        </div>
      </button>
    </>
  );
};