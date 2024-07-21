"use client";

import { useAlertOverlay } from "@/components/overlay/alert/AlertOverlay";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { useCallback, useEffect, useState } from "react";
import { useUserColor } from "@/store/userColorContext";
import { OptionDialog } from "@/components/dialog/OptionDialog";
import { Loader } from "@/components/loader/Loader";
import "./page.css";
export default function HomePage() {
  const userColor = useUserColor();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userColor) {
      setLoading(false);
    }
  }, [userColor]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div
      className={`flex flex-col justify-center items-center bg-${userColor} h-[37vh] justify-around`}
    >
      <div className="text-[20px] text-white self-start ml-8 font-bold">
        <div className="mb-4">안녕하세요! 개짱이님</div>
        <div>오늘은 어떤 삶을 살아볼까요?</div>
      </div>

      <div
        className={`flex flex-col text-white self-start ml-4 border-2 p-4 mb-2 rounded-xl`}
      >
        <div>오늘도 행복한 하루를 보내세요. </div>
        <div>제가 옆에서 열심히 응원할게요!</div>
      </div>

      <OptionDialog />

      <BottomNavigation />
    </div>
  );
}
