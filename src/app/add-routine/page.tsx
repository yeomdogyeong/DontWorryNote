"use client";

import { Header } from "@/components/Header";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { useCallback, useState } from "react";
import gaemiImg from "../../../public/small_gaemi.png";
import baejjangeImg from "../../../public/small_baejjange.png";
import Image from "next/image";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import { useAddRoutineCateogoryModalOverlay } from "@/components/overlay/addRoutineCategoryModal/AddRoutineCategoryModalOverlay";
import { useCalendarOverlay } from "@/components/overlay/calendar/CalendarOverlay";
import CheckIcon from "@/components/icon/CheckIcon";
import { useTimePickerOverlay } from "@/components/overlay/timePicker/TimePickerOverlay";

interface FileType extends File {
  url: string;
}

export default function AddPostPage() {
  const [type, setType] = useState(SubjectType.GAEMI);
  const [postType, setPostType] = useState<PostType | null>(null);
  const [contents, setContents] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<FileType>();

  const { active } = useAddRoutineCateogoryModalOverlay();
  const { active: timePickerActive } = useTimePickerOverlay();

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

  const handleAllDayClick = useCallback(() => {}, []);
  const handleAddClick = useCallback(() => {}, []);

  const onTimeClick = useCallback(() => {
    timePickerActive({
      onConfirm: async () => {},
      value: "",
    });
  }, [timePickerActive]);

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
    <div className="flex flex-col items-center justify-start h-full ">
      <Header title="루틴 추가하기" />
      <div className="flex flex-col mt-[24px] pb-[32px] px-[20px] w-full h-max bg-white">
        <div className="text-gray-700">루틴 성향</div>
        <div className="mt-[12px] flex gap-[8px] w-full">
          <div
            className={`flex-center gap-[8px] border-[1px] rounded-[8px] flex-1 h-[48px] cursor-pointer border-gray-200 ${
              type === SubjectType.GAEMI
                ? "text-mainBlack bg-subBlack border-mainBlack"
                : ""
            }`}
            onClick={() => setType(SubjectType.GAEMI)}
          >
            <Image src={gaemiImg} alt="gaemi" className="w-[24px] h-[24px]" />
            <div>개미 피드</div>
          </div>
          <div
            className={`flex-center gap-[8px] border-[1px] rounded-[8px] flex-1 h-[48px] cursor-pointer border-gray-200 ${
              type === SubjectType.BAEJJANGE
                ? "text-mainGreen bg-subGreen border-mainGreen"
                : ""
            }`}
            onClick={() => setType(SubjectType.BAEJJANGE)}
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
          className="mt-[8px] py-[14px] px-[16px] border-[1px] rounded-[8px] w-full h-[48px]"
          placeholder="루틴에 대한 다짐이나 설명 등을 적어주세요"
        />

        <div className="mt-[24px] text-gray-700">기간 작성하기</div>
        <div className="mt-[10px] flex items-center">
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

        <div className="flex items-center gap-[8px] mt-[8px] h-[48px]">
          <button onClick={handleAllDayClick}>
            <CheckIcon fill />
          </button>
          <div>매일 이 루틴을 반복할 거에요!</div>
        </div>
        <div className="h-[48px] mt-[8px] rounded-[8px] w-full h-[48px] flex gap-[8px]">
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            월
          </div>
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            화
          </div>
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            수
          </div>
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            목
          </div>
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            금
          </div>
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            토
          </div>
          <div className="flex-center w-full h-full border-[1px] rounded-[8px]">
            일
          </div>
        </div>
        <div
          onClick={onTimeClick}
          className="flex justify-between h-[48px] mt-[8px] py-[14px] px-[16px] border-[1px] rounded-[8px] w-full h-[48px]"
        >
          <div>시작 시간</div>
          <div>00:00</div>
        </div>
        <div
          className={`mt-[32px] w-full h-[56px] flex-center text-white rounded-[12px] ${
            type === SubjectType.GAEMI ? "bg-mainBlack" : "bg-mainGreen"
          }`}
          onClick={handleAddClick}
        >
          루틴 추가하기
        </div>
      </div>
    </div>
  );
}
