import HomeIcon from "../icon/HomeIcon";
import React, { useMemo } from "react";
import FeedIcon from "../icon/FeedIcon";
import AddRoutineIcon from "../icon/AddRoutineIcon";
import ReportIcon from "../icon/ReportIcon";
import MyPageIcon from "../icon/MyPageIcon";
import {
  ADD_ROUTINE_PATH,
  FEED_PATH,
  HOME_PATH,
  MY_PAGE_PATH,
  REPORT_PATH,
} from "../../store/path";
import useUserStore from "../../store/useUserStore";
import { SubjectType } from "../../types/common";

import { useRouter, usePathname } from "next/navigation";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const userType = useUserStore((state) => state.userType);
  const color = useMemo(() => {
    return userType === SubjectType.BAEJJANGE ? "#2FA464" : "#353C49";
  }, [userType]) as string;

  return (
    <div className="bg-white h-[52px] flex-center fixed bottom-0 space-between w-full max-w-page cursor-pointer">
      <div
        className="flex-center flex-col flex-1"
        onClick={() => router.push(HOME_PATH)}
      >
        <HomeIcon
          fill={HOME_PATH === pathname}
          color={HOME_PATH === pathname ? color : undefined}
        />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            pathname === HOME_PATH
              ? userType === SubjectType.BAEJJANGE
                ? "text-[#2FA464]"
                : "text-[#353C49]"
              : "text-[#767676]"
          }`}
        >
          홈
        </div>
      </div>
      <div
        className="flex-center flex-col items-center flex-1"
        onClick={() => router.push(FEED_PATH)}
      >
        <FeedIcon
          fill={FEED_PATH === pathname}
          color={FEED_PATH === pathname ? color : undefined}
        />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            pathname === FEED_PATH
              ? userType === SubjectType.BAEJJANGE
                ? "text-[#2FA464]"
                : "text-[#353C49]"
              : "text-[#767676]"
          }`}
        >
          피드
        </div>
      </div>
      <div
        className="flex-center flex-col items-center flex-1"
        onClick={() => router.push(ADD_ROUTINE_PATH)}
      >
        <AddRoutineIcon
          fill={ADD_ROUTINE_PATH === pathname}
          color={ADD_ROUTINE_PATH === pathname ? color : undefined}
        />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            pathname === ADD_ROUTINE_PATH
              ? userType === SubjectType.BAEJJANGE
                ? "text-[#2FA464]"
                : "text-[#353C49]"
              : "text-[#767676]"
          }`}
        >
          루틴추가
        </div>
      </div>
      <div
        className="flex-center flex-col items-center flex-1"
        onClick={() => router.push(REPORT_PATH)}
      >
        <ReportIcon
          fill={REPORT_PATH === pathname}
          color={REPORT_PATH === pathname ? color : undefined}
        />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            pathname === REPORT_PATH
              ? userType === SubjectType.BAEJJANGE
                ? "text-[#2FA464]"
                : "text-[#353C49]"
              : "text-[#767676]"
          }`}
        >
          통계
        </div>
      </div>
      <div
        className="flex-center flex-col items-center flex-1"
        onClick={() => router.push(MY_PAGE_PATH)}
      >
        <MyPageIcon
          fill={MY_PAGE_PATH === pathname}
          color={MY_PAGE_PATH === pathname ? color : undefined}
        />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            pathname === MY_PAGE_PATH
              ? userType === SubjectType.BAEJJANGE
                ? "text-[#2FA464]"
                : "text-[#353C49]"
              : "text-[#767676]"
          }`}
        >
          마이페이지
        </div>
      </div>
    </div>
  );
}
