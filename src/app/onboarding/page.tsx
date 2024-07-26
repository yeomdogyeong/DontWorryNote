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
    <main className="w-full h-full flex flex-col justify-center items-center p-8 bg-gray-50">
      <div className="w-[440px] mt-[32px] mb-[102px]">
        <SimpleSlider />
      </div>

      <div className="mb-[70px]">
        <div className="mb-4">
          <AuthButton
            text="KaKao로 시작하기"
            bgColor="kakao"
            srcImg={kakao}
            onClick={handleKakao}
          />
        </div>
        <div className="">
          <AuthButton text="Google로 시작하기" bgColor="" srcImg={google} />
        </div>
      </div>
    </main>
  );
}

export default OnBoardingPage;
