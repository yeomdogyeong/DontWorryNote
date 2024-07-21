"use client";

import { useAlertOverlay } from "@/components/overlay/alert/AlertOverlay";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { useCallback } from "react";
import { useUserColor } from "@/store/userColorContext";
import { OptionDialog } from "@/components/dialog/OptionDialog";

export default function HomePage() {
  const userColor = useUserColor();
  return (
    <div
      className={`flex flex-col justify-center items-center bg-${userColor} h-[37vh] justify-around`}
    >
      <div className="text-[20px] text-white self-start ml-8 font-bold">
        <div className="mb-4">안녕하세요! 개짱이님</div>
        <div>오늘은 어떤 삶을 살아볼까요?</div>
      </div>

      <div className="flex flex-col self-start ml-8">
        <div>오늘도 행복한 하루를 보내세요. </div>
        <div>제가 옆에서 열심히 응원할게요!</div>
      </div>

      <OptionDialog />

      <BottomNavigation />
    </div>
  );
}
