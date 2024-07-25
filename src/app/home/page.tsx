"use client";

import { useAlertOverlay } from "@/components/overlay/alert/AlertOverlay";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { useCallback, useEffect, useState } from "react";
import { useUserColor } from "@/store/userColorContext";
import { OptionDialog } from "@/components/dialog/OptionDialog";
import { Loader } from "@/components/loader/Loader";
import "./page.css";
import useMyStore from "@/store/useMyStore";
export default function HomePage() {
  const userColor = useUserColor();
  const [loading, setLoading] = useState(true);
  const { tendency } = useMyStore();
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
      className={`flex flex-col justify-center items-center ${
        tendency === "GAEMI" ? "bg-mainBlack" : "bg-mainGreen"
      } h-[37vh] justify-around`}
    >
      <div className="text-[20px] text-white self-start ml-8 font-bold sm:text-2xl">
        <div className="mb-4">안녕하세요! 개짱이님</div>
        <div>오늘은 어떤 삶을 살아볼까요?</div>
      </div>

      <div
        className={` flex flex-col text-white self-start text-base sm:text-xl w-[200px] sm:w-[276px] ml-7 border-none p-4 mb-[85px] rounded-xl ${
          tendency === "GAEMI" ? "bg-[#505866]" : "bg-[#649C7D]"
        }`}
      >
        <div>오늘도 행복한 하루를 보내세요. </div>
        <div>제가 옆에서 열심히 응원할게요!</div>
      </div>

      <OptionDialog />

      <BottomNavigation />
    </div>
  );
}
