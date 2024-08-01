"use client";

import React, { useEffect } from "react";
import "./page.css";
import { useRouter } from "next/navigation";
function Loading() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/survey/result");
    }, 3000);
  });

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="loader mb-[24px]"></div>
      <div className="font-[600] text-[20px] text-gray-900 mb-[8px]">
        내 성향 분석 중
      </div>
      <div className="font-[500] text-[14px] text-gray-700">
        응답하신 내용을 바탕으로 성향을 분석하고 있어요!
      </div>
    </div>
  );
}

export default Loading;
