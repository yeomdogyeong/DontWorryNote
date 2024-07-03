import React from "react";

interface BasicButtonType {
  text: string;
  bgColor: string;
}

export const BasicButton = ({ text, bgColor }: BasicButtonType) => {
  return (
    <div
      className={`flex justify-center items-center w-[400px] max-w-[80vw] h-[70px] max-h-[8vh]
     
      ${
        bgColor === "baejjange"
          ? "bg-mainGreen text-white"
          : bgColor === "gaemi"
          ? "bg-mainBlack  text-white"
          : "bg-gray-300 text-gray-400"
      }
      `}
    >
      {text}
    </div>
  );
};
