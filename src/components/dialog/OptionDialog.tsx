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
import { useRouter } from "next/navigation";
import { RoutineExecution } from "@/types/apis/routineExecution";
import AddRoutineIcon from "../icon/AddRoutineIcon";
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
  const router = useRouter();
  // const tendency = SubjectType.GAEMI;
  return (
    <>
      <div
        className={`min-h-[83vh] h-full absolute flex flex-col items-center w-[500px] max-w-[100vw] bg-gray-100 px-[20px] rounded-t-2xl`}
      >
        <div className={`relative w-full h-[12px]`}>
          <div
            className={`speech-bubble font-[400] absolute top-[-95px] xs:top-[-105px] xs:w-[280px]  xs:text-[18px] left-[-20px] flex flex-col text-white self-start justify-center items-center mb-[20px] w-[200px] 
        mx-[20px] border-none p-4 text-[14px] rounded-xl ${
          tendency === "GAEMI"
            ? "bg-[#505866] speech-bubble1"
            : "bg-[#649C7D] speech-bubble2"
        }`}
          >
            <div>오늘도 행복한 하루를 보내세요. </div>
            <div>제가 옆에서 열심히 응원할게요!</div>
          </div>
          <Image
            src={tendency === "GAEMI" ? maingaemi : mainbaejjange}
            alt="userCharacter"
            width={1}
            height={1}
            className={`${
              tendency === SubjectType.GAEMI
                ? "w-[103px] h-[125px]"
                : "w-[119px] h-[121px]"
            } xs:w-[134px]  xs:h-[145px] z-100 absolute ${
              tendency === SubjectType.GAEMI
                ? "top-[-102px] xs:top-[-118px]"
                : "top-[-99px] xs:top-[-119px]"
            } right-[0px]`}
          />
        </div>
        <div className="self-start mt-[32px] text-[18px] mb-[12px]  font-[500]">
          오늘의 루틴 목록
        </div>

        {data && data.length > 0 ? (
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
          <div className="flex flex-col items-center justify-center h-full w-full absolute">
            <div className="flex flex-col items-center justify-center opacity-50 w-full h-full">
              <Image
                src={
                  tendency === SubjectType.GAEMI
                    ? routineGaemi
                    : routineBaezzange
                }
                alt="userTypeImge"
                width={170}
                height={200}
                className=""
              />
              <div className="mt-[12px] mb-[24px] w-[175px] h-[40] text-gray-600 text-center">
                앗! 아직 만들어진 루틴이 없어요! 새로운 루틴을 추가해보세요!
              </div>
              <button
                onClick={() => router.push("/routine/write")}
                className={`flex items-center ${
                  tendency === SubjectType.GAEMI
                    ? "bg-mainBlack"
                    : "bg-mainGreen"
                } rounded-2xl justify-center text-white w-[175px] h-[48px] py-[4px] px-0 mb-8 border-2 `}
              >
                <AddRoutineIcon color="white" />{" "}
                <span className="ml-[10px]">루틴 추가하기</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
