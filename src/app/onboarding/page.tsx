"use client";
import React, { useEffect } from "react";
import { AuthButton } from "@/components/button/AuthButton";

import googleImg from "../../../public/google.png";
import kakaoImg from "../../../public/kakao.png";
import SimpleSlider from "@/components/slider/SimpleSlider";
import { useRouter } from "next/navigation";
import useMyStore from "@/store/useMyStore";

function OnBoardingPage() {
  const router = useRouter();
  const { isSignedIn } = useMyStore();
  const kakao = `${process.env.NEXT_KAKAO_URL}`;
  const google = `${process.env.NEXT_GOOGLE_URL}`;
  const handleKakao = () => {
    router.push(kakao);
    console.log("kakao!");
  };
  const handleGoogle = () => {
    router.push(google);
    console.log("google!");
  };

  return (
    <main className="w-full flex flex-col items-center pt-[69px] min-h-screen h-max bg-white">
      <div className="w-full ">
        <SimpleSlider />
      </div>

      <div className="w-full items-center flex flex-col justify-center mt-[112px] ">
        <div className="w-full px-[20px] font-[500]">
          <AuthButton
            text="카카오로 시작하기"
            bgColor="kakao"
            srcImg={kakaoImg}
            onClick={handleKakao}
          />
        </div>
        <div className="mt-[8px] pb-[10px] w-full px-[20px] font-[500]">
          <AuthButton
            text="Google로 시작하기"
            bgColor=""
            srcImg={googleImg}
            onClick={handleGoogle}
          />
        </div>
      </div>
    </main>
  );
}

export default OnBoardingPage;
