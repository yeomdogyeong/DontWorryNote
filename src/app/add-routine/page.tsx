"use client";

import { Header } from "@/components/Header";
import { SubjectType } from "@/types/common";
import { useState } from "react";
import gaemiImg from "../../../public/small_gaemi.png";
import basejjangeImg from "../../../public/small_baejjange.png";
import Image from "next/image";

interface Props {}

export default function AddRoutinePage(props: Props) {
  const [type, setType] = useState(SubjectType.gaemi);
  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <Header
        title="게시글 작성"
        rightButton={
          <button className="text-mainGreen font-[600] text-[16px]">
            완료
          </button>
        }
      />
      <div className="flex py-[24px] px-[20px]">
        <div className="flex gap-[8px]">
          <div className="flex">
            <Image src={gaemiImg} alt="gaemi" />
            <div
              className={`${
                type === SubjectType.gaemi ? "text-mainBlack" : ""
              }`}
            >
              개미 피드
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
