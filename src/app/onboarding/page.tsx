"use client";
import React, { useEffect } from "react";
import { AuthButton } from "@/components/button/AuthButton";

import google from "../../../public/google.png";
import kakao from "../../../public/kakao.png";
import SimpleSlider from "@/components/slider/SimpleSlider";
import { useRouter } from "next/navigation";

function OnBoardingPage() {
  const router = useRouter();

  // useEffect(() => {
  //   localStorage.removeItem("tokenKey");
  // }, []);

  const handleKakao = () => {
    router.push(`https://gaezzange.duckdns.org/oauth2/authorization/kakao`);
    console.log("kakao!");
  };
  return (
    <main className="w-full flex flex-col items-center bg-gray-50 pt-[82px] min-h-screen ">
      <div className="w-full ">
        <SimpleSlider />
      </div>

      <div className="w-full max-w-[440px] items-center flex flex-col justify-center mt-[56px]">
        <div className="">
          <AuthButton
            text="KaKao로 시작하기"
            bgColor="kakao"
            srcImg={kakao}
            onClick={handleKakao}
          />
        </div>
        <div className="mt-[8px] pb-[10px]">
          <AuthButton text="Google로 시작하기" bgColor="" srcImg={google} />
        </div>
      </div>
    </main>
  );
}

export default OnBoardingPage;
