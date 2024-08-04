"use client";
import React, { useEffect } from "react";
import { AuthButton } from "@/components/button/AuthButton";

import google from "../../../public/google.png";
import kakao from "../../../public/kakao.png";
import SimpleSlider from "@/components/slider/SimpleSlider";
import { useRouter } from "next/navigation";
import useMyStore from "@/store/useMyStore";

function OnBoardingPage() {
  const router = useRouter();
  const { isSignedIn } = useMyStore();

  const handleKakao = () => {
    router.push(`https://gaezzange.duckdns.org/oauth2/authorization/kakao`);
    console.log("kakao!");
  };
  const handleGoogle = () => {
    router.push(`https://gaezzange.duckdns.org/oauth2/authorization/google`);
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
            srcImg={kakao}
            onClick={handleKakao}
          />
        </div>
        <div className="mt-[8px] pb-[10px] w-full px-[20px] font-[500]">
          <AuthButton
            text="Google로 시작하기"
            bgColor=""
            srcImg={google}
            onClick={handleGoogle}
          />
        </div>
      </div>
    </main>
  );
}

export default OnBoardingPage;
