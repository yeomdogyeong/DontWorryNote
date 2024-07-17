"use client";
import React from "react";
import { AuthButton } from "@/components/button/AuthButton";

import Image from "next/image";
import google from "../../../public/google.png";
import kakao from "../../../public/kakao.png";
import SimpleSlider from "@/components/slider/SimpleSlider";
import { useRouter } from "next/navigation";
function onBoarding() {
  const router = useRouter();
  // const kakaoId = "7a5edf2c24ec67a56b41616546a55128";
  // const redirect = "http://localhost:3000/login";
  // const state = "YOkGWlZl-USxfUShthXhDj0Y8oBtjpEeJTyIySO7Ndg%3D";
  const handleKakao = () => {
    // router.push(
    //   "https://www.one-ul.com:8080/oauth2/authorization/google?redirect_uri=https://vercel-public-five.vercel.app/login/redirect"
    // );
    // router.push("https://gaezzange.duckdns.org/oauth2/authorization/kakao");
    router.push(
      // `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoId}&redirect_uri=${redirect}&response_type=code&state=${state}`
      `https://gaezzange.duckdns.org/oauth2/authorization/kakao`
    );
    console.log("kakao!");
  };
  return (
    <main className="w-full h-full flex flex-col justify-center items-center p-8 bg-gray-50">
      {/* <div className="text-2xl flex items-center flex-col font-semibold">
        <div>건강한 일상 회복을 위한</div>
        <div>새로운 시작 개짱이와 함께해요</div>
      </div> */}

      <div className="w-[440px] mt-[32px] mb-[102px]">
        <SimpleSlider />
      </div>

      <div className="">
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

export default onBoarding;
