"use client";
import React from "react";
import { AuthButton } from "@/components/button/AuthButton";

import Image from "next/image";
import google from "../../../public/google.png";
import kakao from "../../../public/kakao.png";
import SimpleSlider from "@/components/slider/SimpleSlider";
function onBoarding() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div>ㅗㅑㅗㅑ</div>
      <div className="w-[440px]">
        <SimpleSlider />
      </div>

      <div>
        <div className="mb-2">
          <AuthButton text="KaKao로 시작하기" bgColor="kakao" srcImg={kakao} />
        </div>
        <div>
          <AuthButton text="Google로 시작하기" bgColor="" srcImg={google} />
        </div>
      </div>
    </main>
  );
}

export default onBoarding;
