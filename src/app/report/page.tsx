"use client";

import { DefaultHeader } from "@/components/DefaultHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import MonthDayReport from "@/components/report/MonthDayReport";
import WeekDayReport from "@/components/report/WeekDayReport";
import { useCallback, useState } from "react";

enum ReportType {
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export default function ReportPage() {
  const [type, setType] = useState(ReportType.WEEK);
  const handleTypeClick = useCallback((type: ReportType) => {
    setType(type);
  }, []);

  return (
    <div className="min-h-full h-max bg-white">
      <DefaultHeader title="통계" />
      <div className="z-30 flex items-center gap-[20px] h-[52px] sticky top-[56px] bg-white w-full">
        <button
          onClick={() => handleTypeClick(ReportType.WEEK)}
          className={`relative flex-center text-gray-500 w-full font-[400] text-[16px] h-full ${
            type === ReportType.WEEK ? "text-gray-900 font-[600]" : ""
          }`}
        >
          주간 리포트
          {type === ReportType.WEEK && (
            <div className="absolute w-full bottom-0 h-[1px] bg-gray-900" />
          )}
        </button>
        <button
          onClick={() => handleTypeClick(ReportType.MONTH)}
          className={`relative flex-center text-gray-500 w-full font-[400] text-[16px] h-full ${
            type === ReportType.MONTH ? "text-gray-900 font-[600]" : ""
          }`}
        >
          월간 리포트
          {type === ReportType.MONTH && (
            <div className="absolute w-full bottom-0 h-[1px] bg-gray-900" />
          )}
        </button>
      </div>
      {type === ReportType.WEEK ? <WeekDayReport /> : <MonthDayReport />}
      <BottomNavigation />
    </div>
  );
}
