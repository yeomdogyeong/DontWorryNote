"use client";
import React, { useEffect, useState } from "react";
import { RoutineBox } from "../routine/RoutineBox";
import maingaemi from "../../../public/maingaemi.png";
import mainbaejjange from "../../../public/mainbaejjange.png";
import Image from "next/image";
import { useUserColor } from "@/store/userColorContext";
import routineBaezzange from "../../../public/routine-baejjange.png";
import routineGaemi from "../../../public/routine-gaemi.png";
import useMyStore from "@/store/useMyStore";
import RoutineItem from "../modules/routine/RoutineItem";
import { convertEmojiImgSrc, SubjectType } from "@/types/common";
import { DaysOfWeekType, RoutineCategoryType } from "@/types/apis/routine";
import { Burning } from "../icon/Burning";
export const OptionDialog = () => {
  const userColor = useUserColor();
  const [isRoutineBoxVisible, setIsRoutineBoxVisible] = useState(false);
  const { tendency } = useMyStore();
  let data = "mango";
  useEffect(() => {
    console.log("mango2");
    if (data) {
      setIsRoutineBoxVisible(true);
    }
  }, []);

  const dummyRoutineItem = {
    routineId: 1,
    tendency: SubjectType.GAEMI,
    category: RoutineCategoryType.HEALTH,
    name: "망고강쥐랑 놀기",
    description: "30분동안 놀아주기",
    emoji: 1,
    startedDate: "2023-07-01",
    endedDate: null,
    executionTime: "07:00",
    userId: 123,
    daysOfWeek: [DaysOfWeekType.FRIDAY],
  };
  // h-[700px] max-h-[73vh]
  return (
    <>
      <div className="h-[700px] max-h-[73vh] absolute flex flex-col items-center overflow-auto w-[500px] max-w-[100vw] bg-gray-100 bottom-0 p-4 rounded-t-2xl">
        <div className="relative w-full">
          <Image
            src={tendency === "GAEMI" ? maingaemi : mainbaejjange}
            alt="userCharacter"
            width={103}
            height={125}
            className={`z-100 absolute ${
              tendency === "GAEMI" ? "top-[-115px]" : "top-[-100px]"
            } right-[30px]`}
          />
        </div>
        <div className="self-start m-3 text-xl">오늘의 할 일 목록</div>

        {isRoutineBoxVisible ? (
          <div className="flex flex-col items-center w-full justify-start ">
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>{" "}
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>{" "}
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>{" "}
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>{" "}
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>{" "}
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>{" "}
            <div className="mb-4 w-full">
              <RoutineItem
                {...dummyRoutineItem}
                isExecution={true}
                formatDate="2023-07-27"
                refetch={() => console.log("Refetch called")}
              />
            </div>
          </div>
        ) : tendency === "GAEMI" ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center opacity-50">
              <Image
                src={routineGaemi}
                alt="userTypeImge"
                width={170}
                height={200}
                className="mb-[24px]"
              />
              <button className="flex items-center bg-mainBlack rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 mb-8 border-2">
                루틴 추가하기
              </button>
            </div>{" "}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center opacity-50">
              <Image
                src={routineBaezzange}
                alt="userTypeImge"
                width={170}
                height={200}
                className="mb-[24px]"
              />
              <button className="flex items-center bg-mainGreen rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 mb-8 border-2">
                루틴 추가하기
              </button>
            </div>{" "}
          </div>
        )}

        {/* <div className="">앗! 아직 만들어진 루틴이 없어요!</div>
          <div className="mb-[24px]">새로운 루틴을 추가해보세요!</div>
          {tendency === "GAEMI" ? (
            <button className="flex items-center bg-mainBlack rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 mb-8 border-2">
              루틴 추가하기
            </button>
          ) : (
            <button className="flex items-center bg-mainGreen rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 mb-8 border-2">
              루틴 추가하기
            </button>
          )} */}
      </div>
    </>
  );
};
