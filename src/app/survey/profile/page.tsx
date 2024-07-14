"use client";
import Image from "next/image";
import { useState } from "react";
import baejjange from "../../../../public/Ellipse1.png";
import camera from "../../../../public/camera.png";
export default function Main() {
  const [select, setSelect] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      {/* <ProgressBar srcImg={onestep} /> */}

      <div className="w-full p-6 mt-4 flex justify-between items-center ">
        <div className="self-start ml-[20px] mb-[32px]">
          <p className="text-2xl font-bold">개미와 베짱이에서</p>
          <p className="text-2xl font-bold">어떤 프로필로 활동할까요?</p>
        </div>
      </div>
      <div className="relative flex justify-center items-center mb-[24px]">
        <p>
          <Image alt="user-img" src={baejjange} width={103} height={100} />
        </p>
        <p className="absolute bottom-0 right-0">
          <Image alt="user-img" src={camera} width={40} />
        </p>
      </div>
      <div>
        <input
          className="border-b-2 bg-gray-50 w-[335px] h-[40px] focus:outline-none focus:border-mainGreen"
          placeholder="닉네임을 입력해주세요"
        />
        <div className="self-start mt-[8px] text-gray-600">
          6자리 이내, 문자/숫자 가능, 특수문자/기호 입력불가
        </div>
      </div>

      <button
        className={`${
          select ? "bg-mainGreen" : ""
        } disabled flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[90px] max-h-[10vh] bg-gray-100 bottom-0 p-2 rounded-t-sm`}
      >
        <span
          className={`${
            select ? "text-white" : "text-gray-400"
          } flex justify-center items-center h-1/3 w-full text-lg`}
        >
          개짱이 시작하기
        </span>
      </button>
    </div>
  );
}
