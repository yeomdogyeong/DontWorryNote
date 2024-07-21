import React from "react";
import { RoutineBox } from "../routine/RoutineBox";
import maingaemi from "../../../public/maingaemi.png";
import Image from "next/image";
export const OptionDialog = () => {
  return (
    <>
      <div className="absolute flex flex-col items-center w-[500px] h-[700px] max-h-[67vh] max-w-[100vw] bg-gray-100 bottom-0 p-4 rounded-t-2xl">
        <div className="relative w-full">
          <Image
            src={maingaemi}
            alt="userCharacter"
            width={103}
            height={125}
            className="absolute top-[-115px] right-[30px]"
          />
        </div>
        <div className="self-start m-3 text-xl">오늘의 할 일 목록</div>
        <RoutineBox />
      </div>
    </>
  );
};
