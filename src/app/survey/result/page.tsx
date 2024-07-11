"use client";
import React, { useEffect, useState } from "react";
import gajjange from "../../../../public/baejjange.png";
import minibaejjange from "../../../../public/Ellipse1.png";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";
import { ResultBar } from "@/components/Survey/ResultBar";
import { surveyList } from "@/components/Dummy";
function page() {
  const { users } = useUserStore();
  type ResultKey = "result1" | "result2" | "result3" | "result4";
  const [resultIdx, setResultIdx] = useState<ResultKey | undefined>();

  useEffect(() => {
    console.log(users.score);

    if (users.score === 1 || users.score === 0) {
      setResultIdx("result1");
    } else if (users.score === 2 || users.score === 3) {
      setResultIdx("result2");
    } else if (users.score === 4) {
      setResultIdx("result3");
    } else if (users.score > 4) {
      setResultIdx("result4");
    } else {
      alert("오류");
    }
    console.log("resultIdx", resultIdx);
  }, [users.score]);

  const [] = ["result1", "result2", "result3", "resut4"];
  return (
    <div className="flex-col w-full p-6 mt-4 flex justify-between items-center ">
      <div className="self-start ml-8">
        <p className="text-lg font-thin text-gray-500">
          개짱이력(GJLS) 분석결과 회원님은
        </p>

        <div className="flex">
          <p className="text-2xl font-bold text-mainGreen">
            {resultIdx && surveyList[0][resultIdx]?.title}&nbsp;
          </p>
          <p className="text-2xl font-bold">입니다</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full tracking-wide">
        {/* <Image
          src={surveyList[0].result1.srcImg}
          alt="baejjange"
          className="mt-16 w-80 h-50"
        /> */}
        <Image
          src={surveyList[0].result1.srcImg}
          alt="baejjange"
          className="mt-16 w-40 h-50"
        />
        <div className="mt-6 bg-gray-100 flex justify-center items-center rounded-full w-[200px] h-[50px]">
          내 개짱이력 분석결과
        </div>
        <div className="border-2 w-full mt-6 flex items-center justify-center rounded-xl p-4">
          <Image
            src={surveyList[0].result1.subImg}
            alt="baejjange"
            className="mr-4 self-start"
          />
          <div className="font-thin text-gray-600">
            <p className="text-[12px] sm:text-[16px]">
              {surveyList[0].result1.subTitle1}
            </p>
            <p className="text-[12px] sm:text-[16px] ">
              {surveyList[0].result1.subTitle2}
            </p>
          </div>
        </div>
        <div className="w-full mt-6 flex flex-col items-start bg-gray-50 rounded-xl p-4 tracking-widest">
          <div className="flex justify-between w-full font-thin text-gray-600 ">
            <p>개미력</p>
            <p>{`${surveyList[0].result1.score1}0/100`}</p>
          </div>
          <ResultBar count={surveyList[0].result1.score1} gaemi={true} />
          <div className="flex justify-between w-full font-thin text-gray-600 mt-2">
            <p>베짱이력</p>
            <p>{`${surveyList[0].result1.score2}0/100`}</p>
          </div>
          <ResultBar count={surveyList[0].result1.score2} gaemi={false} />
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
