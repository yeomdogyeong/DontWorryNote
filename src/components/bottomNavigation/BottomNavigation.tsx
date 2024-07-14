import { useRouter } from "next/router";
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

interface Props {}

export default function BottomNavigation(props: Props) {
  const router = useRouter();
  const userType = useUserStore((state) => state.userType);
  const color = useMemo(() => {
    return userType === SubjectType.baejjange ? "#2FA464" : "#353C49";
  }, [userType]) as string;

  return (
    <div className="flex-center">
      <div className="flex-col items-center flex-1">
        <HomeIcon fill={HOME_PATH === router.pathname} color={color} />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            router.pathname === HOME_PATH
              ? userType === SubjectType.baejjange
                ? "#2FA464"
                : "#353C49"
              : "#999999"
          }`}
        >
          홈
        </div>
      </div>
      <div className="flex-col items-center flex-1">
        <FeedIcon fill={FEED_PATH === router.pathname} color={color} />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            router.pathname === FEED_PATH
              ? userType === SubjectType.baejjange
                ? "#2FA464"
                : "#353C49"
              : "#999999"
          }`}
        >
          피드
        </div>
      </div>
      <div className="flex-col items-center flex-1">
        <AddRoutineIcon
          fill={ADD_ROUTINE_PATH === router.pathname}
          color={color}
        />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            router.pathname === ADD_ROUTINE_PATH
              ? userType === SubjectType.baejjange
                ? "#2FA464"
                : "#353C49"
              : "#999999"
          }`}
        >
          루틴추가
        </div>
      </div>
      <div className="flex-col items-center flex-1">
        <ReportIcon fill={REPORT_PATH === router.pathname} color={color} />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            router.pathname === REPORT_PATH
              ? userType === SubjectType.baejjange
                ? "#2FA464"
                : "#353C49"
              : "#999999"
          }`}
        >
          통계
        </div>
      </div>
      <div className="flex-col items-center flex-1">
        <MyPageIcon fill={MY_PAGE_PATH === router.pathname} color={color} />
        <div
          className={`h-[15px] font-[400] text-[11px] ${
            router.pathname === MY_PAGE_PATH
              ? userType === SubjectType.baejjange
                ? "#2FA464"
                : "#353C49"
              : "#999999"
          }`}
        >
          마이페이지
        </div>
      </div>
    </div>
  );
}
