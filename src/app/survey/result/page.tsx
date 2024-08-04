"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";
import { ResultBar } from "@/components/survey/ResultBar";
import { surveyList } from "@/components/dummy";
import { useRouter } from "next/navigation";
import "animate.css";
import "./page.css";
import useMyStore from "@/store/useMyStore";
function ResultPage() {
  const { users, setStatus, userType } = useUserStore();
  type ResultKey = "result1" | "result2" | "result3" | "result4";
  const [resultIdx, setResultIdx] = useState<ResultKey | undefined>();
  const router = useRouter();
  const { wannabe } = useMyStore();
  const handleMakeProfile = () => {
    router.push("/survey/profile");
  };

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
    localStorage.setItem("userScore", JSON.stringify(users.score));
  }, [users.score, resultIdx]);

  useEffect(() => {
    console.log("wanna", wannabe);
  });

  return (
    <div className="flex-col w-full overflow-scroll h-full px-[20px] mt-[32px] flex items-center pb-[180px]">
      <div className="self-start ml-2">
        <p className="text-lg font-[400] text-gray-500 ">
          개짱이력(GJLS) 분석결과 회원님은
        </p>

        <div className="flex">
          {resultIdx && (
            <p
              className={`text-[24px] font-bold ${
                surveyList[0][resultIdx]?.srcBg === "baejjange"
                  ? "text-mainGreen"
                  : "text-mainBlack"
              }`}
            >
              {surveyList[0][resultIdx]?.title}&nbsp;
            </p>
          )}

          <p className="text-[24px] font-bold">입니다</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full tracking-wide">
        {resultIdx && surveyList[0][resultIdx]?.srcImg && (
          <Image
            src={surveyList[0][resultIdx].srcImg}
            alt="baejjange"
            className={`mt-16 h-50 ${
              resultIdx === "result1" ? "w-[208px] h-[145px]" : "w-40"
            } md:${resultIdx === "result1" ? "w-[122px]" : "w-[164px]"} `}
          />
        )}
        <div className="mt-[21px] bg-gray-100 flex-center rounded-full px-[16px] py-[8px] h-[34px] text-[#333333]">
          내 개짱이력 분석결과
        </div>
        <div className="mt-[16px] rounded-[8px] flex items-center border-[1px] border-gray-200 px-[16px] pt-[16px] pb-[18px] gap-[14px]">
          {resultIdx && surveyList[0][resultIdx]?.subImg && (
            <Image
              src={surveyList[0][resultIdx].subImg}
              alt="baejjange"
              className=""
              width={40}
              height={40}
            />
          )}
          <div className="white-space font-[400] text-[14ox] text-gray-600 ">
            {resultIdx && surveyList[0][resultIdx]?.subTitle}
          </div>
        </div>
        <div className="w-full mt-[12px] flex flex-col items-start bg-gray-100 rounded-xl p-4 tracking-widest">
          <div className="flex justify-between w-full text-gray-600 font-[400]">
            <p className="font-[400]">개미력</p>
            <p>{resultIdx && `${surveyList[0][resultIdx]?.score1}0/100`}</p>
          </div>
          {resultIdx && (
            <ResultBar count={surveyList[0][resultIdx]?.score1} gaemi={true} />
          )}
          <div className="flex justify-between w-full text-gray-600 mt-2 font-[400]">
            <p className="font-[400]">베짱이력</p>
            <p>{resultIdx && `${surveyList[0][resultIdx]?.score2}0/100`}</p>
          </div>
          {resultIdx && (
            <ResultBar count={surveyList[0][resultIdx]?.score2} gaemi={false} />
          )}
        </div>
      </div>
      {resultIdx && (
        <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center">
          <div className="speech-bubble border-[1px] p-[16px] mt-[10px] mb-[10px] bg-white rounded-3xl shadow-md z-100 animate__animated animate__pulse animate__infinite">
            개짱이와 루틴을 만들며{" "}
            <span className="text-mainGreen">{wannabe}</span>가 되어봐요! 😄
          </div>
          <button
            onClick={() => {
              handleMakeProfile();
              if (surveyList[0][resultIdx]?.status) {
                setStatus(surveyList[0][resultIdx].status);
              }
              console.log(userType);
            }}
            className={`flex flex-col items-center justify-center w-[500px] max-w-[100vw] h-[90px] text-white ${
              surveyList[0][resultIdx]?.srcBg === "baejjange"
                ? "bg-mainGreen"
                : "bg-mainBlack"
            } p-2 rounded-t-sm`}
          >
            프로필 만들기
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultPage;
