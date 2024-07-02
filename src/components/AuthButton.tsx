import React from "react";

interface AuthButtonType {
  text: string;
  bgColor: string;
}

export const AuthButton = ({ text, bgColor }: AuthButtonType) => {
  return (
    <div
      className={`flex justify-center items-center rounded-2xl w-[400px] h-[70px] bg-${bgColor} border-2`}
    >
      {text}
    </div>
  );
};
