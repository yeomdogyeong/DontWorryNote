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
import { getRoutines } from "@/apis/routine/routine";

export default function RoutinePage() {
  const userType = useMyStore((state) => state.tendency);

  const { active } = useCalendarOverlay();
  const [date, setDate] = useState(dayjs(new Date().toUTCString()));
  const formatDate = useMemo(() => date.format("YYYY-MM-DD"), [date]);

  const { data, isFetched } = useQuery({
    queryKey: ["routines", formatDate],
    queryFn: () => getRoutines(formatDate, formatDate),
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
      <div className="h-full bg-[#F4F4F4] flex flex-col items-center">
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
      </div>
    </div>
  );
}