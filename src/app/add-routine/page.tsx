"use client";

import { Header } from "@/components/Header";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { useCallback, useRef, useState } from "react";
import gaemiImg from "../../../public/small_gaemi.png";
import baejjangeImg from "../../../public/small_baejjange.png";
import Image from "next/image";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import { useAddPostCateogoryModalOverlay } from "@/components/overlay/addPostCategoryModal/AddPostCategoryModalOverlay";

interface FileType extends File {
  url: string;
}

export default function AddPostPage() {
  const [type, setType] = useState(SubjectType.gaemi);
  const [postType, setPostType] = useState<PostType | null>(null);
  const [contents, setContents] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<FileType>();

  const { active } = useAddPostCateogoryModalOverlay();

  const handlePostType = useCallback(() => {
    active({
      list: [
        {
          title: "루틴 공유",
          onClick: async () => setPostType(PostType.ROUTINE_SHARE),
        },
        {
          title: "루틴 인증",
          onClick: async () => setPostType(PostType.ROUTINE_AUTH),
        },
        {
          title: "루틴 질문",
          onClick: async () => setPostType(PostType.ROUTINE_QUESTION),
        },
        {
          title: "일상글",
          onClick: async () => setPostType(PostType.ROUTINE_DAILY),
        },
        {
          title: "기타",
          onClick: async () => setPostType(PostType.ETC),
        },
      ],
    });
  }, [active, setPostType]);

  const handleContentsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContents(e.target.value);
    },
    []
  );
  return (
    <div className="flex flex-col items-center justify-start h-full">
      <Header title="루틴 작성하기" />
      <div className="flex flex-col mt-[24px] px-[20px] w-full">
        <div className="text-gray-700">루틴 성향</div>
        <div className="mt-[12px] flex gap-[8px] w-full">
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
        <button
          onClick={handlePostType}
          className="mt-[12px] px-[13px] py-[16px] flex justify-between items-center border-[1px] rounded-[8px] w-full h-[48px]"
        >
          <div>{convertPostTypeValue(postType)}</div>
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
}
