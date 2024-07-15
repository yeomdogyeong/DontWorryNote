"use client";

import { Header } from "@/components/Header";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { useState } from "react";
import gaemiImg from "../../../public/small_gaemi.png";
import baejjangeImg from "../../../public/small_baejjange.png";
import Image from "next/image";

interface Props {}

export default function AddPostPage(props: Props) {
  const [type, setType] = useState(SubjectType.gaemi);
  const [postType, setPostType] = useState<PostType | null>(null);
  const 
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
      <div className="flex py-[24px] px-[20px] w-full">
        <div className="flex gap-[8px] w-full">
          <div
            className={`flex-center gap-[8px] border-[1px] rounded-[8px] flex-1 h-[48px] cursor-pointer border-gray-200 ${
              type === SubjectType.gaemi
                ? "text-mainBlack bg-subBlack border-mainBlack"
                : ""
            }`}
            onClick={() => setType(SubjectType.gaemi)}
          >
            <Image src={gaemiImg} alt="gaemi" className="w-[24px] h-[24px]" />
            <div>개미 피드</div>
          </div>
          <div
            className={`flex-center gap-[8px] border-[1px] rounded-[8px] flex-1 h-[48px] cursor-pointer border-gray-200 ${
              type === SubjectType.baejjange
                ? "text-mainGreen bg-subGreen border-mainGreen"
                : ""
            }`}
            onClick={() => setType(SubjectType.baejjange)}
          >
            <Image
              src={baejjangeImg}
              alt="baejjange"
              className="w-[24px] h-[24px]"
            />
            <div>베짱이 피드</div>
          </div>
        </div>
        <div className="flex-center gap-[8px] border-[1px] rounded-[8px] flex-1">
          {convertPostTypeValue(postType)}
        </div>
      </div>
    </div>
  );
}
