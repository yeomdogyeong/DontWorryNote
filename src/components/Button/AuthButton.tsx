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
      className={`tracking-wide flex justify-center items-center rounded-xl w-[400px] max-w-[80vw] h-[70px] max-h-[8vh] ${
        bgColor === "kakao" ? "bg-kakaoYellow" : "bg-gray-100 border-2"
      }`}
    >
      <Image
        src={srcImg}
        alt="logo"
        className="mr-2 w-7 h-6"
        width={32}
        height={32}
      />
      {text}
    </button>
  );
};
