import {
  getRoutineExecution,
  getRoutineExecutionCount,
} from "@/apis/routine-execution/routine-execution";
import { getWeekDates } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { LeftArrow } from "../icon/LeftArrow";
import RightArrow from "../icon/RightArrow";

export default function MonthDayReport() {
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

  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = useMemo(() => {
    const dates = [];
    let date = startDate;
    while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
      dates.push(date);
      date = date.add(1, "day");
    }
    return dates;
  }, [startDate, endDate]);

  console.log(days);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <>
      <div className="z-30 sticky top-[108px] h-[64px] px-[20px] w-full flex items-center justify-between bg-white">
        <button
          onClick={handlePrevMonth}
          className="flex-center rounded-[4px] border-[1px] w-[32px] h-[32px]"
        >
          <LeftArrow size={20} />
        </button>
        <h2 className="flex items-center font-[500] text-[18px] text-gray-900">
          {dayjs(currentWeek.startDate).format("YYYY. MM")}{" "}
        </h2>
        <button
          onClick={handleNextMonth}
          className="flex-center rounded-[4px] border-[1px] w-[32px] h-[32px]"
        >
          <RightArrow size={20} />
        </button>
      </div>
      <div className="my-[12px] mx-[20px] grid grid-cols-7 text-center">
        {days.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`w-[42px] h-[40px] flex-center ${
              day.month() !== currentDate.month() ? "opacity-50" : ""
            } ${
              day.isSame(currentDate, "day")
                ? `bg-gray-800 text-white rounded-full`
                : ""
            }
                  ${day.day() === 0 ? "text-negative" : ""}`}
          >
            {day.date()}
          </div>
        ))}
      </div>
    </>
  );
}
