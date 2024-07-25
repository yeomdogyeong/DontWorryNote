"use client";

import { Header } from "@/components/Header";
import ChevronDownIcon from "@/components/icon/ChevronDownIcon";
import useMyStore from "@/store/useMyStore";
import dayjs from "dayjs";
import Image from "next/image";
import { useMemo, useState } from "react";
import routine_bae from "../../../../public/routine-baejjange.png";
import routine_gae from "../../../../public/routine-gaemi.png";
import { SubjectType } from "@/types/common";
import { useCalendarOverlay } from "@/components/overlay/calendar/CalendarOverlay";
import { useQuery } from "@tanstack/react-query";
import { getRoutineExecution } from "@/apis/routine-execution/routine-execution";
import RoutineItem from "@/components/modules/routine/RoutineItem";

export default function RoutinePage() {
  const userType = useMyStore((state) => state.tendency);

  const { active } = useCalendarOverlay();
  const [date, setDate] = useState(dayjs(new Date().toUTCString()));
  const formatDate = useMemo(() => date.format("YYYY-MM-DD"), [date]);

  const { data, refetch } = useQuery({
    queryKey: ["routineExecution", formatDate],
    queryFn: () => getRoutineExecution(formatDate, formatDate),
  });

  const onDateClick = () => {
    active({
      value: formatDate,
      onConfirm: async (v) => {
        setDate(dayjs(v));
      },
    });
  };

  return (
    <div className="h-full">
      <Header title="나의 루틴 기록" />
      <div className="flex-center gap-[6px] h-[52px]" onClick={onDateClick}>
        <div className="font-[600] text-[18px]">
          {date.format("YYYY. MM. DD")}
        </div>
        <ChevronDownIcon />
      </div>
      <div className="h-max min-h-full bg-[#F4F4F4] flex flex-col items-center px-[20px] py-[14px] gap-[8px]">
        {data && data?.data.data.length > 0 ? (
          data?.data.data.map((item) => (
            <RoutineItem
              refetch={() => {
                refetch();
              }}
              key={item.routine.routineId}
              {...item.routine}
              isExecution={item.executionDates.some((date) => {
                return date === formatDate;
              })}
            />
          ))
        ) : (
          <>
            <Image
              className="pt-[104px] opacity-[.5]"
              alt="empty_img"
              width={138}
              height={96}
              src={userType === SubjectType.GAEMI ? routine_gae : routine_bae}
            />
            <div className="mt-[12px] text-gray-600">
              이 날은 진행했던 루틴이 없네요!
            </div>
          </>
        )}
      </div>
    </div>
  );
}
