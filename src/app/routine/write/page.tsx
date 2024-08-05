"use client";

import { Header } from "@/components/Header";
import { SubjectType, convertEmojiImgSrc } from "@/types/common";
import { useCallback, useMemo, useState } from "react";
import gaemiImg from "../../../../public/small_gaemi.png";
import baejjangeImg from "../../../../public/small_baejjange.png";
import Image from "next/image";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import { useAddRoutineCateogoryModalOverlay } from "@/components/overlay/addRoutineCategoryModal/AddRoutineCategoryModalOverlay";
import { useCalendarOverlay } from "@/components/overlay/calendar/CalendarOverlay";
import CheckIcon from "@/components/icon/CheckIcon";
import { useTimePickerOverlay } from "@/components/overlay/timePicker/TimePickerOverlay";
import {
  DaysOfWeekType,
  RoutineCategoryType,
  convertRoutineCategoryImgSrc,
  convertRoutineCategoryValue,
} from "@/types/apis/routine";
import { useAddEmojiModalOverlay } from "@/components/overlay/addEmoji/AddEmoji";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import dayjs from "dayjs";
import { postRoutine } from "@/apis/routine/routine";
import { useRouter } from "next/navigation";
import { HOME_PATH } from "@/store/path";
import useLoading from "@/hooks/useLoading";

export default function AddRoutinePage() {
  const router = useRouter();
  const [type, setType] = useState(SubjectType.GAEMI);
  const [routineType, setRoutineType] = useState<RoutineCategoryType | null>(
    null
  );
  const [name, setName] = useState<string | undefined>(undefined);
  const [startedDate, setStartedDate] = useState(new Date().toDateString());
  const [endedDate, setEndedDate] = useState<string | undefined>(undefined);
  const [time, setTime] = useState("1970-01-01 06:00");

  const { isLoading, loadWith } = useLoading();

  const [selectedDay, setSelectedDay] = useState({
    MONDAY: false,
    TUESDAY: false,
    WEDNESDAY: false,
    THURSDAY: false,
    FRIDAY: false,
    SATURDAY: false,
    SUNDAY: false,
  });

  const [description, setDescription] = useState<string | undefined>(undefined);
  const [emoji, setEmoji] = useState(15);

  const { active } = useAddRoutineCateogoryModalOverlay();
  const { active: emojiActive } = useAddEmojiModalOverlay();
  const { active: timePickerActive } = useTimePickerOverlay();

  const { active: startDateActive } = useCalendarOverlay();
  const { active: endDateActive } = useCalendarOverlay();
  const handleStartDateClick = useCallback(() => {
    startDateActive({
      onConfirm: async (value: string) => setStartedDate(value),
      value: startedDate,
    });
  }, [startDateActive, , startedDate]);
  const handleEndDateClick = useCallback(() => {
    endDateActive({
      onConfirm: async (value: string) => setEndedDate(value),
      value: endedDate,
    });
  }, [endDateActive, endedDate]);

  const isAllCheck = useMemo(
    () => Object.values(selectedDay).every((v) => v === true),
    [selectedDay]
  );

  const handleAllDayClick = useCallback(() => {
    if (isAllCheck) {
      setSelectedDay({
        MONDAY: false,
        TUESDAY: false,
        WEDNESDAY: false,
        THURSDAY: false,
        FRIDAY: false,
        SATURDAY: false,
        SUNDAY: false,
      });
    } else {
      setSelectedDay({
        MONDAY: true,
        TUESDAY: true,
        WEDNESDAY: true,
        THURSDAY: true,
        FRIDAY: true,
        SATURDAY: true,
        SUNDAY: true,
      });
    }
  }, [isAllCheck]);
  const handleAddClick = useCallback(async () => {
    loadWith(async () => {
      await postRoutine({
        tendency: type,
        category: routineType as RoutineCategoryType,
        name: name as string,
        description: description as string,
        emoji: emoji,
        startedDate: dayjs(startedDate).format("YYYY-MM-DD"),
        endedDate: endedDate ? dayjs(endedDate).format("YYYY-MM-DD") : null,
        executionTime: dayjs(time).format("HH:mm:00"),
        daysOfWeek: Object.entries(selectedDay).reduce((prev, cur) => {
          if (cur[1] === true) {
            prev.push(cur[0] as DaysOfWeekType);
          }

          return prev;
        }, [] as DaysOfWeekType[]),
      });
    });

    router.push(HOME_PATH);
  }, [
    loadWith,
    router,
    type,
    routineType,
    startedDate,
    endedDate,
    name,
    time,
    description,
    selectedDay,
    emoji,
  ]);

  const onTimeClick = useCallback(() => {
    timePickerActive({
      onConfirm: async (value: string) => setTime(value),
      value: time,
    });
  }, [timePickerActive, time]);

  const handlePostType = useCallback(() => {
    const list =
      type === SubjectType.GAEMI
        ? [
            {
              title: "업무 또는 학업",
              value: RoutineCategoryType.WORK_AND_STUDY,
              onClick: async () =>
                setRoutineType(RoutineCategoryType.WORK_AND_STUDY),
            },
            {
              title: "운동 및 셀프케어",
              onClick: async () => setRoutineType(RoutineCategoryType.HEALTH),
              value: RoutineCategoryType.HEALTH,
            },
            {
              title: "생산적인 자기 계발",
              onClick: async () =>
                setRoutineType(RoutineCategoryType.SEL_DEVELOPMENT),
              value: RoutineCategoryType.SEL_DEVELOPMENT,
            },
          ]
        : [
            {
              title: "취미 및 여가활동",
              onClick: async () => setRoutineType(RoutineCategoryType.REST),
              value: RoutineCategoryType.REST,
            },
            {
              title: "가족 및 친구와의 시간",
              onClick: async () => setRoutineType(RoutineCategoryType.MEETING),
              value: RoutineCategoryType.MEETING,
            },
            {
              title: "휴식 및 수면",
              onClick: async () => setRoutineType(RoutineCategoryType.REST),
              value: RoutineCategoryType.REST,
            },
          ];
    active({
      list: list,
    });
  }, [active, setRoutineType]);

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
              type === SubjectType.BAEZZANGE
                ? "text-mainGreen bg-subGreen border-mainGreen"
                : ""
            }`}
            onClick={() => setType(SubjectType.BAEZZANGE)}
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
          <div className="flex gap-[8px]">
            {routineType !== null && (
              <Image
                width={24}
                height={24}
                alt=""
                src={convertRoutineCategoryImgSrc(routineType)}
              />
            )}
            <div className="flex-center">
              {convertRoutineCategoryValue(routineType)}
            </div>
          </div>
          <RightArrowIcon />
        </button>
        <div className="mt-[24px] text-gray-700">루틴 이름</div>
        <div className="mt-[10px] flex items-center">
          <input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="relative py-[14px] pr-[16px] pl-[48px] border-[1px] rounded-[8px] w-full h-[48px]"
            placeholder="루틴 이름을 입력해 주세요"
          />

          <Image
            className="absolute ml-[16px]"
            alt="emoji_img"
            width={24}
            height={24}
            src={convertEmojiImgSrc(emoji) as StaticImport}
          />
          <button
            className="flex-center border-[1px] rounded-[8px] ml-[8px] h-[48px] w-[48px] shrink-0"
            onClick={() => emojiActive({ onClick: (v) => setEmoji(v) })}
          >
            <Image
              alt="emoji_img"
              width={24}
              height={24}
              src={convertEmojiImgSrc(emoji) as StaticImport}
            />
          </button>
        </div>
        <input
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          className="mt-[8px] py-[14px] px-[16px] border-[1px] rounded-[8px] w-full h-[48px]"
          placeholder="루틴에 대한 다짐이나 설명 등을 적어주세요"
        />

        <div className="mt-[24px] text-gray-700">기간 작성하기</div>
        <div className="mt-[10px] flex items-center">
          <button
            onClick={handleStartDateClick}
            className="flex-center border-[1px] rounded-[8px] w-full h-[48px]"
          >
            {dayjs(startedDate).format("YY. MM. DD")}
          </button>
          <div className="h-[20px] w-[9px] mx-[8px]">~</div>
          <button
            onClick={handleEndDateClick}
            className="flex-center border-[1px] rounded-[8px] w-full h-[48px]"
          >
            {endedDate === undefined ? (
              <div className="flex-center text-gray-400">계속 반복</div>
            ) : (
              dayjs(endedDate).format("YY. MM. DD")
            )}
          </button>
        </div>

        <div className="flex items-center gap-[8px] mt-[8px] h-[48px]">
          <button onClick={handleAllDayClick}>
            <CheckIcon
              fill
              fillColor={
                isAllCheck
                  ? type === SubjectType.BAEZZANGE
                    ? "#2FA464"
                    : "#353C49"
                  : undefined
              }
            />
          </button>
          <div>매일 이 루틴을 반복할 거에요!</div>
        </div>
        <div className="h-[48px] mt-[8px] rounded-[8px] w-full h-[48px] flex gap-[6px]">
          <button
            onClick={() =>
              setSelectedDay({ ...selectedDay, MONDAY: !selectedDay.MONDAY })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.MONDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            월
          </button>
          <button
            onClick={() =>
              setSelectedDay({ ...selectedDay, TUESDAY: !selectedDay.TUESDAY })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.TUESDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            화
          </button>
          <button
            onClick={() =>
              setSelectedDay({
                ...selectedDay,
                WEDNESDAY: !selectedDay.WEDNESDAY,
              })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.WEDNESDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            수
          </button>
          <button
            onClick={() =>
              setSelectedDay({
                ...selectedDay,
                THURSDAY: !selectedDay.THURSDAY,
              })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.THURSDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            목
          </button>
          <button
            onClick={() =>
              setSelectedDay({ ...selectedDay, FRIDAY: !selectedDay.FRIDAY })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.FRIDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            금
          </button>
          <button
            onClick={() =>
              setSelectedDay({
                ...selectedDay,
                SATURDAY: !selectedDay.SATURDAY,
              })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.SATURDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            토
          </button>
          <button
            onClick={() =>
              setSelectedDay({ ...selectedDay, SUNDAY: !selectedDay.SUNDAY })
            }
            className={`flex-center w-full h-full border-[1px] rounded-[8px] ${
              selectedDay.SUNDAY === true
                ? type === SubjectType.BAEZZANGE
                  ? "border-mainGreen text-mainGreen bg-subGreen"
                  : "border-mainBlack text-mainBlack bg-subBlack"
                : ""
            }`}
          >
            일
          </button>
        </div>
        <div
          onClick={onTimeClick}
          className="flex justify-between h-[48px] mt-[8px] py-[14px] px-[16px] border-[1px] rounded-[8px] w-full h-[48px]"
        >
          <div>시작 시간</div>
          <div>
            {dayjs(time)
              .format("A hh:mm")
              .replace("AM", "오전")
              .replace("PM", "오후")}
          </div>
        </div>
        <button
          disabled={isLoading}
          className={`mt-[32px] w-full h-[56px] flex-center text-white rounded-[12px] ${
            type === SubjectType.GAEMI ? "bg-mainBlack" : "bg-mainGreen"
          }`}
          onClick={handleAddClick}
        >
          루틴 추가하기
        </button>
      </div>
    </div>
  );
}
