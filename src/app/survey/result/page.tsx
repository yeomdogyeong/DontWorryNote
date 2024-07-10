"use client";
import React, { useEffect } from "react";
import gajjange from "../../../../public/baejjange.png";
import minibaejjange from "../../../../public/Ellipse1.png";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";
import { ResultBar } from "@/components/Survey/ResultBar";
function page() {
  const { users } = useUserStore();
  useEffect(() => console.log(users));
  return (
    <div className="flex-col w-full p-6 mt-4 flex justify-between items-center ">
      <div className="self-start ml-8">
        <p className="text-lg font-thin text-gray-500">
          개짱이력(GJLS) 분석결과 회원님은
        </p>
        <div className="flex">
          <p className="text-2xl font-bold text-mainGreen">
            여유로운 베짱이&nbsp;
          </p>
          <p className="text-2xl font-bold">입니다</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full tracking-wide">
        <Image src={gajjange} alt="baejjange" className="mt-16 w-80 h-50" />
        <div className="mt-6 bg-gray-100 flex justify-center items-center rounded-full w-[200px] h-[50px]">
          내 개짱이력 분석결과
        </div>
        <div className="border-2 w-full mt-6 flex items-center justify-center rounded-xl p-4">
          <Image
            src={minibaejjange}
            alt="baejjange"
            className="mr-4 self-start"
          />
          <div className="font-thin text-gray-600">
            <p className="text-[12px] sm:text-[16px]">
              충분한 휴식을 통해 몸과 마음을 돌보는 당신,
            </p>
            <p className="text-[12px] sm:text-[16px] ">
              작은 도전으로 일상에 활력을 더해볼까요?
            </p>
          </div>
        </div>
        <div className="w-full mt-6 flex flex-col items-start bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between w-full font-thin text-gray-600">
            <p>개미력</p>
            <p>20/100</p>
          </div>
          <ResultBar />
          <div className="flex justify-between w-full font-thin text-gray-600 mt-2">
            <p>베짱이력</p>
            <p>20/100</p>
          </div>
          <div>component</div>
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[90px] max-h-[10vh] text-white bg-mainGreen bottom-0 p-2 rounded-t-sm`}
      >
        프로필만들기
      </div>
    </div>
  );
}

export default page;
