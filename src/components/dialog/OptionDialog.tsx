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
import { Burning } from "../icon/Burning";
import { RoutineExecution } from "@/types/apis/routineExecution";
//props에 내려주는거 any로 하지말기 (타입캐스팅이 안됌)
//isfetched => reactquery에 있는데 이거 쓰면 데이터 가져오기 전에 이미지 설정 가능
interface OptionDialogType {
  //? 있을때 | undefined 같음
  data?: RoutineExecution[];
  todayDate: string;
  refetch: () => void;
  isFetched: boolean;
}

export const OptionDialog = ({
  data,
  todayDate,
  refetch,
  isFetched,
}: OptionDialogType) => {
  const { tendency } = useMyStore();

  return (
    <>
      <div className="h-[700px] max-h-[73vh] absolute flex flex-col items-center w-[500px] max-w-[100vw] bg-gray-100 bottom-0 p-4 rounded-t-2xl">
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

        {isFetched ? (
          <div className="flex flex-col items-center w-full justify-start overflow-auto pb-[60px] ">
            <div className="flex flex-col gap-[8px] w-full">
              {data &&
                data.map((item) => (
                  <RoutineItem
                    refetch={() => {
                      refetch();
                    }}
                    key={item.routine.routineId}
                    {...item.routine}
                    isExecution={item.executionDates.some((date) => {
                      return date === todayDate;
                    })}
                    formatDate={todayDate}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center opacity-50">
              <Image
                src={
                  tendency === SubjectType.GAEMI
                    ? routineGaemi
                    : routineBaezzange
                }
                alt="userTypeImge"
                width={170}
                height={200}
                className="mb-[24px]"
              />
              <button
                className={`flex items-center ${
                  tendency === SubjectType.GAEMI
                    ? "bg-mainBlack"
                    : "bg-mainGreen"
                } rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 mb-8 border-2`}
              >
                루틴 추가하기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
