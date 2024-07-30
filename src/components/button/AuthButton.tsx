import React from "react";
import google from "../../public/google.png";
import Image, { StaticImageData } from "next/image";
interface AuthButtonType {
  text: string;
  bgColor: string;
  srcImg: StaticImageData;
  onClick?: () => void;
}

export const AuthButton = ({
  text,
  bgColor,
  srcImg,
  onClick,
}: AuthButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`tracking-wide flex justify-center items-center rounded-xl w-full h-[56px] ${
        bgColor === "kakao" ? "bg-kakaoYellow" : "border-[1px]"
      }`}
    >
      <Image
        src={srcImg}
        alt="logo"
        style={{ height: 20 }}
        className="mr-[8px]"
        width={20}
        height={20}
      />
      <div className="text-[16px]">{text}</div>
    </button>
  );
};
