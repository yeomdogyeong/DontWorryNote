"use client";

import { Header } from "@/components/Header";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { useCallback, useRef, useState } from "react";
import gaemiImg from "../../../public/small_gaemi.png";
import baejjangeImg from "../../../public/small_baejjange.png";
import Image from "next/image";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import { useAddPostCateogoryModalOverlay } from "@/components/overlay/addPostCategoryModal/AddPostCategoryModalOverlay";
import { useAddRoutineCateogoryModalOverlay } from "@/components/overlay/addRoutineCategoryModal/AddRoutineCategoryModalOverlay";
import { useCalendarOverlay } from "@/components/overlay/calendar/CalendarOverlay";

interface FileType extends File {
  url: string;
}

export default function AddPostPage() {
  const [type, setType] = useState(SubjectType.gaemi);
  const [postType, setPostType] = useState<PostType | null>(null);
  const [contents, setContents] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<FileType>();

  const { active } = useAddRoutineCateogoryModalOverlay();
  const { active: startDateActive } = useCalendarOverlay();
  const { active: endDateActive } = useCalendarOverlay();
  const handleStartDateClick = useCallback(() => {
    startDateActive({
      onConfirm: async (value: string) => {},
      value: new Date().toDateString(),
    });
  }, [startDateActive]);
  const handleEndDateClick = useCallback(() => {
    endDateActive({
      onConfirm: async (value: string) => {},
      value: new Date().toDateString(),
    });
  }, [endDateActive]);

  const handlePostType = useCallback(() => {
    active({
      list: [
        {
          title: "업무 또는 학업",
          onClick: async () => setPostType(PostType.ROUTINE_SHARE),
        },
        {
          title: "운동 및 셀프케어",
          onClick: async () => setPostType(PostType.ROUTINE_AUTH),
        },
        {
          title: "생산적인 자기 계발",
          onClick: async () => setPostType(PostType.ROUTINE_QUESTION),
        },
        {
          title: "취미 및 여가활동",
          onClick: async () => setPostType(PostType.ROUTINE_DAILY),
        },
        {
          title: "가족 및 친구와의 시간",
          onClick: async () => setPostType(PostType.ETC),
        },
        {
          title: "휴식 및 수면",
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
      <Header title="루틴 추가하기" />
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
        <div className="mt-[24px] text-gray-700">루틴 성향</div>
        <button
          onClick={handlePostType}
          className="mt-[8px] px-[13px] py-[16px] flex justify-between items-center border-[1px] rounded-[8px] w-full h-[48px]"
        >
          <div>{convertPostTypeValue(postType)}</div>
          <RightArrowIcon />
        </button>
        <div className="mt-[24px] text-gray-700">루틴 이름</div>
        <div className="mt-[10px] flex items-center">
          <input
            className="py-[14px] pr-[16px] pl-[48px] border-[1px] rounded-[8px] w-full h-[48px]"
            placeholder="루틴 이름을 입력해 주세요"
          />
          <button className="border-[1px] rounded-[8px] ml-[8px] h-[48px] w-[48px] shrink-0"></button>
        </div>
        <input
          className="mt-[16px] py-[14px] px-[16px] border-[1px] rounded-[8px] w-full h-[48px]"
          placeholder="루틴에 대한 다짐이나 설명 등을 적어주세요"
        />

        <div className="mt-[24px] text-gray-700">기간 작성하기</div>
        <div className="mt-[8px] flex items-center">
          <button
            onClick={handleStartDateClick}
            className="border-[1px] rounded-[8px] w-full h-[48px]"
          ></button>
          <div className="h-[20px] w-[9px] mx-[8px]">~</div>
          <button
            onClick={handleEndDateClick}
            className="border-[1px] rounded-[8px] w-full h-[48px]"
          ></button>
        </div>
      </div>
    </div>
  );
}
