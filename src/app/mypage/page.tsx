"use client";

import { DefaultHeader } from "@/components/DefaultHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { SubjectType } from "@/types/common";
import Image from "next/image";
import gaemiImg from "../../../public/small_gaemi.png";
import baejjangeImg from "../../../public/small_baejjange.png";
import routine_gaemi from "../../../public/routine-gaemi.png";
import routine_baejjange from "../../../public/routine-baejjange.png";
import gaemi_head from "../../../public/gaemi_head.png";
import baezzang_head from "../../../public/baezzang_head.png";

import { useRouter } from "next/navigation";
import { ADD_ROUTINE_PATH, MY_PAGE_ROUTINE_PATH } from "@/store/path";
import { convertDayToText, getWeekDates } from "@/util/date";
import { useEffect, useMemo, useState } from "react";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import useMyStore from "@/store/useMyStore";
import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getRoutineExecution } from "@/apis/routine-execution/routine-execution";

export default function MyPage() {
  const router = useRouter();
  const { userType, nickname, profileImagePath, isSignedIn } = useMyStore(
    useShallow((state) => ({
      userType: state.tendency,
      nickname: state.nickname,
      profileImagePath: state.profileImagePath,
      isSignedIn: state.isSignedIn,
    }))
  );
  const [setDate, setSetDate] = useState(new Set());
  const weekDates = useMemo(() => getWeekDates(), []);

  const { data, isFetched } = useQuery({
    queryKey: ["getRoutineExecution"],
    queryFn: () => getRoutineExecution(weekDates[0], weekDates[6]),
    enabled: weekDates.length > 0 && isSignedIn,
  });

  useEffect(() => {
    if (isFetched) {
      const newSet = new Set();
      data?.data.data.forEach((v) => {
        v.executionDates.forEach((date) => {
          newSet.add(date);
        });
      });

      setSetDate(newSet);
    }
  }, [isFetched, data?.data.data, setSetDate]);

  if (!isSignedIn) {
    return <></>;
  }

  return (
    <div className="h-max min-h-full">
      <DefaultHeader title="마이페이지" />
      <div className="h-[100px] px-[20px] pt-[16px] pb-[28px] flex justify-between">
        <div className="flex items-center gap-[12px]">
          <Image
            style={{ height: 56 }}
            alt="profile-img"
            className="border-[1px] rounded-full"
            width={56}
            height={56}
            src={
              profileImagePath
                ? profileImagePath
                : userType === SubjectType.BAEZZANGE
                ? baejjangeImg
                : gaemiImg
            }
          />
          <div className="flex flex-col gap-[4px]">
            <div className="text-gray-900 font-[600] text-[18px]">
              {nickname}
            </div>
            <div className="text-gray-600 font-[400]">
              개짱이와 함께 활기찬 하루 보내세요!
            </div>
          </div>
        </div>
        <button
          className="flex-center rounded-[8px] px-[4px] py-[8px] text-gray-600 border-[1px] text-[12px] h-[25px] w-[70px]"
          onClick={() => {
            alert("준비 중 입니다.");
            //router.push(MY_PAGE_EDIT_PATH)
          }}
        >
          프로필 변경
        </button>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="py-[24px] px-[20px]">
        <div className="font-[600] text-[16px]">이번주 루틴 진행상황</div>
        <div className="mt-[12px] flex-center">
          {weekDates.map((date, idx) => {
            return (
              <div
                key={idx}
                className={`flex-center flex-1 flex-col rounded-[12px] h-[66px] ${
                  dayjs(date).date() === dayjs(new Date()).date()
                    ? userType === SubjectType.GAEMI
                      ? "bg-mainBlack"
                      : "bg-mainGreen"
                    : ""
                }`}
              >
                {setDate.has(date) ? (
                  <div className="flex-center">
                    <Image
                      src={
                        userType === SubjectType.BAEZZANGE
                          ? baezzang_head
                          : gaemi_head
                      }
                      alt="head"
                      width={24}
                      height={24}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex-center w-[24px] h-[24px] text-[12px] text-gray-400 font-[400] rounded-full ${
                      dayjs(date).date() === dayjs(new Date()).date()
                        ? userType === SubjectType.BAEZZANGE
                          ? "text-mainGreen"
                          : "text-mainBlack"
                        : "text-gray-400"
                    } ${
                      dayjs(date).date() === dayjs(new Date()).date()
                        ? "bg-white font-[500]"
                        : "bg-gray-100"
                    }`}
                  >
                    {dayjs(date).date()}
                  </div>
                )}
                <div
                  className={`mt-[8px] text-[12px] ${
                    dayjs(date).date() === dayjs(new Date()).date()
                      ? "text-white font-[600]"
                      : "font-[400] text-gray-600"
                  }`}
                >
                  {convertDayToText(idx)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="py-[24px] px-[20px]">
        <button
          onClick={() => router.push(ADD_ROUTINE_PATH)}
          className={`py-[12px] px-[20px] h-[83px] rounded-[12px] w-full flex items-center bg-gradient-to-r ${
            userType === SubjectType.BAEZZANGE
              ? "from-[#2FA464] to-[#408977]"
              : "from-[#353C49] to-[#2D273C]"
          } `}
        >
          <div className="text-white font-[400]">
            <div>개짱이님! 즐거운 하루를 위해</div>
            <div>새로운 루틴을 작성해 보세요!</div>
          </div>
          <div className="ml-auto flex items-center">
            <div className="mr-[24px]">
              <Image
                width={66}
                height={59}
                src={
                  userType === SubjectType.BAEZZANGE
                    ? routine_baejjange
                    : routine_gaemi
                }
                alt="character"
              />
            </div>
            <RightArrowIcon color="#ffffff" />
          </div>
        </button>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="pt-[24px] px-[20px] pb-[76px]">
        <div className="font-[600] text-[16px] ">나의 개짱이 활동</div>
        <button
          onClick={() => router.push(MY_PAGE_ROUTINE_PATH)}
          className="w-full mt-[12px] h-[52px] flex items-center justify-between font-[400] text-gray-900"
        >
          <div>나의 루틴 기록</div>
          <RightArrowIcon color="#999999" />
        </button>
        <button
          onClick={() => alert("준비 중 입니다.")}
          className="w-full h-[52px] h-[52px] border-t-[1px] flex items-center justify-between font-[400] text-gray-900"
        >
          <div>내 활동 확인하기</div>
          <RightArrowIcon color="#999999" />
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}
