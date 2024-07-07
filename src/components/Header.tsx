import React from "react";

import { LeftArrow } from "./Icon/LeftArrow";
export const Header = () => {
  return (
    <div className="pl-[20px] flex  items-center bg-gray-200 w-[500px] max-w-full h-[52px]">
      <LeftArrow />
    </div>
  );
};
