import React from "react";

interface AuthButtonType {
  text: string;
  color: string;
}

export const AuthButton = ({ text, color }: AuthButtonType) => {
  return (
    <div
      className={`flex justify-center items-center rounded-2xl w-[400px] h-[70px] bg-[${color}]`}
    >
      {text}
    </div>
  );
};
