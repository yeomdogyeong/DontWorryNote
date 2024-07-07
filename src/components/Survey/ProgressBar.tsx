import React from "react";
import Image, { StaticImageData } from "next/image";
export const ProgressBar = ({ srcImg }: { srcImg: StaticImageData }) => {
  return (
    <Image
      src={srcImg}
      alt="progress-bar"
      layout="intrinsic"
      className="w-[500px] max-w-full "
    />
  );
};
