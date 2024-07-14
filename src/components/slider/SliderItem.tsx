import React from "react";
import gaemi from "../../../public/gaemi1.png";
import Image, { StaticImageData } from "next/image";
interface SliderItemType {
  srcImg: StaticImageData;
}

export const SliderItem = ({ srcImg }: SliderItemType) => {
  return (
    <div>
      <Image src={srcImg} alt="character-img" width={300} height={100} />;
    </div>
  );
};
