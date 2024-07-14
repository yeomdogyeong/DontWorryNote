"use client";
import { Header } from "@/components/Header";
import onestep from "../../../public/onestep.png";
import { ListComponent } from "@/components/survey/ListComponent";
import { listItem } from "@/components/dummy";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProgressBar } from "@/components/survey/ProgressBar";
import useUserStore from "@/store/useUserStore";
export default function Survey() {
  const [select, setSelect] = useState<string | null>(null);
  const params = useSearchParams();
  const step = Number(params.get("step"));
  const router = useRouter();
  const { users, increaseScore } = useUserStore();

  //클릭을 하고 다음 버튼을 누를때 score저장
  const handleScore = () => {
    const selectedScore =
      listItem[step]?.items?.find((el) => el.text === select)?.score || 0;
    increaseScore(selectedScore);
    console.log(users);
  };

  useEffect(() => {
    setSelect(null);
  }, [step]);

  useEffect(() => {
    if (!step) {
      router.replace("/survey?step=1");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <Header />
      {/* <ProgressBar srcImg={onestep} /> */}
      <ProgressBar stepNumber={step} />
      <div className="w-full p-6 mt-4 flex justify-between items-center ">
        <div className="self-start ml-8">
          <p className="text-2xl font-bold">{listItem[step]?.title?.one}</p>
          <p className="text-2xl font-bold">{listItem[step]?.title?.two}</p>
        </div>
        <div className="self-end flex tracking-wider">
          <p className="text-mainGreen">{step}</p>
          <p> /</p>
          <p>5</p>
        </div>
      </div>
      {listItem[step]?.items?.map((el, idx) => (
        <ListComponent
          key={idx}
          srcImg={el.srcImg}
          text={el.text}
          select={select}
          onClick={setSelect}
        />
      ))}
      <div
        onClick={handleScore}
        className={`${
          select ? "bg-mainGreen" : ""
        } flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[90px] max-h-[10vh] bg-gray-100 bottom-0 p-2 rounded-t-sm`}
      >
        <Link
          href={`${
            step + 1 !== 6 ? `/survey?step=${step + 1}` : `/survey/result`
          }`}
          className={`${
            select ? "text-white" : "text-gray-400 "
          } flex justify-center items-center h-1/3 w-full text-lg`}
        >
          {step === 5 ? "내 성향 분석하기" : "다음으로"}
        </Link>
      </div>
    </div>
  );
}
