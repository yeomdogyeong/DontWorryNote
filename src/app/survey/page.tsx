"use client";
import { Header } from "@/components/Header";
import onestep from "../../../public/onestep.png";
import { ListComponent } from "@/components/survey/ListComponent";
import { listItem } from "@/components/dummy";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProgressBar } from "@/components/survey/ProgressBar";
import useUserStore from "@/store/useUserStore";
import useMyStore from "@/store/useMyStore";
export default function Survey() {
  const [select, setSelect] = useState<string | null>(null);
  const params = useSearchParams();
  const step = Number(params.get("step"));
  const router = useRouter();
  const { users, increaseScore } = useUserStore();
  const { setWannabe } = useMyStore();
  //클릭을 하고 다음 버튼을 누를때 score저장
  const handleScore = () => {
    const selectedScore =
      listItem[step]?.items?.find((el) => el.text === select)?.score || 0;
    increaseScore(selectedScore);

    const selectWannabe = listItem[step]?.items?.find(
      (el) => el.text === select
    )?.text;

    if (step === 5) {
      setWannabe(selectWannabe!);
    }

    if (select) {
      const nextStep =
        step + 1 !== 6 ? `/survey?step=${step + 1}` : `/survey/loading`;
      router.push(nextStep);
    }
    console.log(users);
  };

  useEffect(() => {
    setSelect(null);
  }, [step]);

  useEffect(() => {
    if (!step) {
      router.replace("/survey?step=1");
    }
  }, [router, step]);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <Header />
      {/* <ProgressBar srcImg={onestep} /> */}
      <ProgressBar stepNumber={step} />

      <div className="w-full flex justify-between items-center mt-[32px]  px-[20px] mb-[24px] ">
        <div className="self-start ">
          <p className="text-[24px] font-[700]">{listItem[step]?.title?.one}</p>
          <p className="text-[24px] font-[700]">{listItem[step]?.title?.two}</p>
        </div>
        <div className="self-start flex tracking-wider h-[22px] items-center font-[600] text-[16px]">
          <p className="text-mainGreen">{step}</p>
          <p className="text-gray-400"> /</p>
          <p className="text-gray-400">5</p>
        </div>
      </div>
      <div className="w-full overflow-auto">
        {listItem[step]?.items?.map((el, idx) => (
          <ListComponent
            key={idx}
            srcImg={el.srcImg}
            text={el.text}
            select={select}
            onClick={setSelect}
          />
        ))}
      </div>

      <button
        onClick={handleScore}
        disabled={!select}
        className={`${
          select ? "bg-mainGreen" : ""
        } disabled flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[90px] max-h-[10vh] bg-gray-100 bottom-0 p-2 rounded-t-sm`}
      >
        <span
          className={`font-600 ${
            select ? "text-white" : "text-gray-600"
          } flex justify-center items-center  w-full text-lg`}
        >
          {step === 5 ? "내 성향 분석하기" : "다음으로"}
        </span>
      </button>
    </div>
  );
}
