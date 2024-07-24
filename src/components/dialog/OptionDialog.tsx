"use client";
import React, { useEffect, useState } from "react";
import { RoutineBox } from "../routine/RoutineBox";
import maingaemi from "../../../public/maingaemi.png";
import mainbaejjange from "../../../public/mainbaejjange.png";
import Image from "next/image";
import { useUserColor } from "@/store/userColorContext";
import routineBaezzange from "../../../public/routine-baejjange.png";
import routineGaemi from "../../../public/routine-gaemi.png";
export const OptionDialog = () => {
  const userColor = useUserColor();
  const [isRoutineBoxVisible, setIsRoutineBoxVisible] = useState(false);

  useEffect(() => {
    setIsRoutineBoxVisible(false);
  }, []);
  return (
    <>
      <div className="absolute flex flex-col items-center w-[500px] h-[700px] max-h-[67vh] max-w-[100vw] bg-gray-100 bottom-0 p-4 rounded-t-2xl">
        <div className="relative w-full">
          <Image
            src={userColor === "mainGreen" ? mainbaejjange : maingaemi}
            alt="userCharacter"
            width={103}
            height={125}
            className="absolute top-[-100px] right-[30px]"
          />
        </div>
        <div className="self-start m-3 text-xl">오늘의 할 일 목록</div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center opacity-50">
            {isRoutineBoxVisible ? (
              <RoutineBox />
            ) : userColor === "mainGreen" ? (
              <Image
                src={routineBaezzange}
                alt="userTypeImge"
                width={170}
                height={200}
                className="mb-[12px]"
              />
            ) : (
              <Image
                src={routineGaemi}
                alt="userTypeImge"
                width={170}
                height={200}
                className="mb-[12px]"
              />
            )}

            <div className="">앗! 아직 만들어진 루틴이 없어요!</div>
            <div className="mb-[24px]">새로운 루틴을 추가해보세요!</div>
            {userColor === "mainGreen" ? (
              <button className="flex items-center bg-mainGreen rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 border-2">
                루틴 추가하기
              </button>
            ) : (
              <button className="flex items-center bg-mainBlack rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 border-2">
                루틴 추가하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
