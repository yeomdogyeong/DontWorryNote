import React from "react";
import { Sleep } from "../icon/Sleep";
import { Burning } from "../icon/Burning";

export const RoutineBox = () => {
  return (
    <div className=" flex flex-col justify-between items-start w-[460px] h-[109px] max-w-[90vw] rounded-2xl bg-gray-50 p-4 m-2">
      <div className="mb-2">
        <span className="border-2 rounded-xl p-1">개미루틴</span>
        <span className="border-2 rounded-xl p-1">2일째 진행중</span>
      </div>
      <div className="flex items-center">
        <Sleep />
        <div className="ml-2">엄마 아빠한테 전화하기</div>
      </div>

      <div className="text-gray-600">주말마다 엄마, 아빠한테 전화하자!</div>
    </div>
  );
};
