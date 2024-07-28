import React from "react";
import gaemi from "../../../public/gaemi1.png";
import Image, { StaticImageData } from "next/image";
import onboarding21 from "../../../public/onboarding2-1.png";
interface SliderItemType {
  srcImg: StaticImageData;
  subImg?: StaticImageData;
  text1?: string;
  text2?: string;
}

export const SliderItem = ({
  srcImg,
  subImg,
  text1,
  text2,
}: SliderItemType) => {
  return (
    <div className="flex-center flex-col relative">
      <div className="text-2xl flex items-center flex-col font-semibold mb-[32px]">
        <div>{text1}</div>
        <div>{text2}</div>
      </div>
      {subImg && (
        <Image
          src={subImg}
          alt="character-img"
          width={248}
          height={320}
          className="absolute left-10 bottom-0"
        />
      )}

      <Image src={srcImg} alt="character-img" width={264} height={120} />
    </div>
  );
};
