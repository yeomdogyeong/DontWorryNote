"use client";

import {
  getRoutineExecution,
  getRoutineExecutionCount,
} from "@/apis/routine-execution/routine-execution";
import { DefaultHeader } from "@/components/DefaultHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { LeftArrow } from "@/components/icon/LeftArrow";
import RightArrow from "@/components/icon/RightArrow";
import { getWeekDates } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";

enum ReportType {
  WEEK = "WEEK",
  MONTH = "MONTH",
}

const replaceDayToValue = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

export default function ReportPage() {
  const [type, setType] = useState(ReportType.WEEK);
  const [currentWeek, setCurrentWeek] = useState({
    startDate: getWeekDates()[0],
    endDate: getWeekDates()[6],
  });

  const { data } = useQuery({
    queryKey: ["getExecutionCount", currentWeek.startDate, currentWeek.endDate],
    queryFn: () =>
      getRoutineExecutionCount(currentWeek.startDate, currentWeek.endDate),
  });

  const { data: routineExecutionList, refetch } = useQuery({
    queryKey: ["routineExecution", currentWeek.startDate, currentWeek.endDate],
    queryFn: () =>
      getRoutineExecution(currentWeek.startDate, currentWeek.endDate),
  });

  const successCount = useMemo(() => {
    return getWeekDates(currentWeek.startDate).reduce((prev, cur) => {
      if (data?.data.data[cur]) {
        prev += data?.data.data[cur].baezzangeCount;
        prev += data?.data.data[cur].gaemiCount;
      }
      return prev;
    }, 0);
  }, [data]);
  const failedCount = useMemo(() => {
    const possibleCheckRoutine =
      routineExecutionList?.data.data.reduce((prev, cur) => {
        cur.routine.daysOfWeek.forEach((day) => {
          if (replaceDayToValue[day] < dayjs(new Date()).day()) {
            prev++;
          }
        });
        return prev;
      }, 0) ?? 0;
    return possibleCheckRoutine - successCount;
  }, [data, routineExecutionList]);

  const handleTypeClick = useCallback((type: ReportType) => {
    setType(type);
  }, []);

  const handlePrevWeek = useCallback(() => {
    setCurrentWeek({
      startDate: dayjs(currentWeek.startDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD"),
      endDate: dayjs(currentWeek.endDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD"),
    });
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentWeek({
      startDate: dayjs(currentWeek.startDate)
        .add(1, "week")
        .format("YYYY-MM-DD"),
      endDate: dayjs(currentWeek.endDate).add(1, "week").format("YYYY-MM-DD"),
    });
  }, []);

  return (
    <div className="flex flex-col justify-start h-full">
      <DefaultHeader title="통계" />
      <div className="z-30 flex items-center gap-[20px] h-[52px] sticky top-[56px] bg-white w-full">
        <button
          onClick={() => handleTypeClick(ReportType.WEEK)}
          className={`relative flex-center text-gray-500 w-full font-[600] text-[16px] h-full ${
            type === ReportType.WEEK ? "text-gray-900" : ""
          }`}
        >
          주간 리포트
          {type === ReportType.WEEK && (
            <div className="absolute w-full bottom-0 h-[3px] bg-gray-900" />
          )}
        </button>
        <button
          onClick={() => handleTypeClick(ReportType.MONTH)}
          className={`relative flex-center text-gray-500 w-full font-[600] text-[16px] h-full ${
            type === ReportType.MONTH ? "text-gray-900" : ""
          }`}
        >
          월간 리포트
          {type === ReportType.MONTH && (
            <div className="absolute w-full bottom-0 h-[3px] bg-gray-900" />
          )}
        </button>
      </div>
      <div className="h-[64px] px-[20px] w-full flex items-center justify-between">
        <button
          onClick={handlePrevWeek}
          className="flex-center rounded-[4px] border-[1px] w-[48px] h-[48px]"
        >
          <LeftArrow size={20} />
        </button>
        <h2 className="flex items-center font-[500] text-[18px] text-gray-900">
          {dayjs(currentWeek.startDate).format("MM-DD")}{" "}
          <div className="w-[12px] mx-[6px]">~</div>
          {dayjs(currentWeek.endDate).format("MM-DD")}
        </h2>
        <button
          onClick={handleNextWeek}
          className="flex-center rounded-[4px] border-[1px] w-[48px] h-[48px]"
        >
          <RightArrow size={20} />
        </button>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="py-[12px] flex-center gap-[80px]">
        <div>
          <div className="font-[400]">성공 개수</div>
          <div className="mt-[4px] h-[34px] flex-center text-positive font-[600] text-[24px]">
            {successCount}
          </div>
        </div>
        <div>
          <div className="font-[400]">실패 개수</div>
          <div className="mt-[4px] h-[34px] flex-center text-negative font-[600] text-[24px]">
            {failedCount}
          </div>
        </div>
      </div>

      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="pt-[24px] px-[20px] pb-[32px]">
        <div className="text-[16px] font-[600]">선호 루틴 분석</div>
        <div className="mt-[20px]"></div>
      </div>

      <div className="w-full h-[8px] bg-[#f4f4f4]" />

      <BottomNavigation />
    </div>
  );
}
