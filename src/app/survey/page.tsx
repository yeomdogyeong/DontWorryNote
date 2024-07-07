"use client";
import { Header } from "@/components/Header";
import onestep from "../../../public/onestep.png";
import Image from "next/image";
import { ProgressBar } from "@/components/Survey/ProgressBar";
import { ListComponent } from "@/components/Survey/ListComponent";
import { listItem } from "@/components/Dummy";
import { useState } from "react";

export default function Survey() {
  const [select, setSelect] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <Header />
      <ProgressBar srcImg={onestep} />
      <div className="w-full p-6 mt-4 flex justify-between items-center ">
        <div className="self-start ml-2">
          <p className="text-2xl font-bold">하루에 가장 많은 시간을 쓰는</p>
          <p className="text-2xl font-bold">쓰는 활동은 무엇인가요?</p>
        </div>
        <div className="self-end flex tracking-wider">
          <p className="text-mainGreen">1</p>
          <p> /</p>
          <p>5</p>
        </div>
      </div>
      {listItem.map((el, idx) => (
        <ListComponent
          key={idx}
          srcImg={el.srcImg}
          text={el.text}
          select={select}
          onClick={setSelect}
        />
      ))}
      <div
        className={`${
          select ? "bg-mainGreen" : ""
        } flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[90px] max-h-[10vh] bg-gray-100 bottom-0 p-2 rounded-t-sm`}
      >
        <button
          className={`${
            select ? "text-white" : "text-gray-400"
          } flex justify-center items-center h-1/3 w-full text-lg`}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
