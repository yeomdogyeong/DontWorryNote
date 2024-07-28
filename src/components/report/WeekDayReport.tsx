import {
  getRoutineExecution,
  getRoutineExecutionCount,
} from "@/apis/routine-execution/routine-execution";
import { getWeekDates } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { LeftArrow } from "../icon/LeftArrow";
import RightArrow from "../icon/RightArrow";

const replaceDayToValue = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

export default function WeekDayReport() {
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
    return getWeekDates(currentWeek.startDate).reduce(
      (prev, cur) => {
        if (data?.data.data[cur]) {
          prev[0] = prev[0] + data?.data.data[cur].gaemiCount;
          prev[1] = prev[1] + data?.data.data[cur].baezzangeCount;
        }
        return prev;
      },
      [0, 0]
    );
  }, [data]);
  const failedCount = useMemo(() => {
    const possibleCheckRoutine =
      routineExecutionList?.data.data.reduce((prev, cur) => {
        cur.routine.daysOfWeek.forEach((day) => {
          if (
            replaceDayToValue[day] <
            (getWeekDates(currentWeek.startDate).some(
              (date) => date === dayjs(new Date()).format("YYYY-MM-DD")
            )
              ? dayjs(new Date()).day()
              : 7)
          ) {
            prev++;
          }
        });
        return prev;
      }, 0) ?? 0;

    return possibleCheckRoutine - (successCount[0] + successCount[1]);
  }, [data, routineExecutionList, currentWeek, successCount]);

  const handlePrevWeek = useCallback(() => {
    setCurrentWeek({
      startDate: dayjs(currentWeek.startDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD"),
      endDate: dayjs(currentWeek.endDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD"),
    });
  }, [currentWeek]);

  const handleNextWeek = useCallback(() => {
    if (
      dayjs(currentWeek.startDate)
        .add(1, "week")
        .isAfter(dayjs(new Date()).format("YYYY-MM-DD"))
    ) {
      alert("다음 주 통계는 아직이에요!");
      return;
    }

    setCurrentWeek({
      startDate: dayjs(currentWeek.startDate)
        .add(1, "week")
        .format("YYYY-MM-DD"),
      endDate: dayjs(currentWeek.endDate).add(1, "week").format("YYYY-MM-DD"),
    });
  }, [currentWeek]);

  return (
    <>
      <div className="h-[64px] px-[20px] w-full flex items-center justify-between">
        <button
          onClick={handlePrevWeek}
          className="flex-center rounded-[4px] border-[1px] w-[32px] h-[32px]"
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
          className="flex-center rounded-[4px] border-[1px] w-[32px] h-[32px]"
        >
          <RightArrow size={20} />
        </button>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="py-[12px] flex-center gap-[80px]">
        <div>
          <div className="font-[400] text-gray-600">성공 개수</div>
          <div className="mt-[4px] h-[34px] flex-center text-positive font-[600] text-[24px]">
            {successCount[0] + successCount[1]}
          </div>
        </div>
        <div>
          <div className="font-[400] text-gray-600">실패 개수</div>
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
    </>
  );
}
