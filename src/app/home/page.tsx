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
import { SubjectType } from "@/types/common";
export default function HomePage() {
  const userColor = useUserColor();
  const [loading, setLoading] = useState(true);
  const { tendency } = useMyStore();
  // const tendency = SubjectType.GAEMI
  var now = dayjs();
  now.format();
  const todayDate = now.format("YYYY-MM-DD");
  const { isSignedIn } = useMyStore();
  const { data, refetch, isFetched } = useQuery({
    //두 번째 인자를 기준으로 이전 데이터를 캐시할지 말지 결정
    queryKey: ["routineExecution"],
    queryFn: () => getRoutineExecution(todayDate, todayDate),
  });

  useEffect(() => {
    if (userColor) {
      setLoading(false);
    }
  }, [userColor, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col h-full ${
        tendency === "GAEMI" ? "bg-mainBlack" : "bg-mainGreen"
      }`}
    >
      <div className="text-[20px] mt-[24px] mb-[11px] xs:text-[24px] xs:mt-[51px] text-white self-start px-[20px] font-[600]">
        <div className="white-space">안녕하세요! 개짱이님</div>
        <div> 오늘은 어떤 삶을 살아볼까요?</div>
      </div>
      <div className="relative top-[110px]">
        <OptionDialog
          data={data?.data.data}
          todayDate={todayDate}
          refetch={refetch}
          isFetched={isFetched}
        />
      </div>

      <BottomNavigation />
    </div>
  );
}
