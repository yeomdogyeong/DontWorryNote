"use client";

import { useAlertOverlay } from "@/components/overlay/alert/AlertOverlay";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { useCallback, useEffect, useState } from "react";
import { useUserColor } from "@/store/userColorContext";
import { OptionDialog } from "@/components/dialog/OptionDialog";
import { Loader } from "@/components/loader/Loader";
import "./page.css";
import useMyStore from "@/store/useMyStore";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getRoutineExecution } from "@/apis/routine-execution/routine-execution";
export default function HomePage() {
  const userColor = useUserColor();
  const [loading, setLoading] = useState(true);
  const { tendency } = useMyStore();
  var now = dayjs();
  now.format();
  const todayDate = now.format("YYYY-MM-DD");

  const query = useQuery({
    //두 번째 인자를 기준으로 이전 데이터를 캐시할지 말지 결정
    queryKey: ["routineExecution", todayDate],
    queryFn: () => getRoutineExecution(todayDate, todayDate),
  });

  useEffect(() => {
    if (userColor) {
      setLoading(false);
    }
  }, [userColor]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col justify-evenly ${
        tendency === "GAEMI" ? "bg-mainBlack" : "bg-mainGreen"
      } h-[30vh]`}
    >
      <div className="text-[20px]  text-white self-start ml-7 font-bold sm:text-2xl">
        <div className="mb-4">안녕하세요! 개짱이님</div>
        <div>오늘은 어떤 삶을 살아볼까요?</div>
      </div>

      <div
        className={` flex flex-col text-white self-start text-base sm:text-xl w-[200px] sm:w-[260px] ml-7 border-none p-4  rounded-xl ${
          tendency === "GAEMI" ? "bg-[#505866]" : "bg-[#649C7D]"
        }`}
      >
        <div>오늘도 행복한 하루를 보내세요. </div>
        <div>제가 옆에서 열심히 응원할게요!</div>
      </div>

      <OptionDialog data={query} />

      <BottomNavigation />
    </div>
  );
}
