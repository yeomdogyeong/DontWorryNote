import {
  getRoutineExecution,
  getRoutineExecutionCount,
} from "@/apis/routine-execution/routine-execution";
import {
  getWeekDates,
  replaceDayToValue,
  replaceFirstMondayToValue,
} from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { LeftArrow } from "../icon/LeftArrow";
import RightArrow from "../icon/RightArrow";
import { createBooleanArray } from "@/util/common";
import { SubjectType } from "@/types/common";
import Image from "next/image";
import report_baezzange from "../../../public/report_baezzange.png";
import report_gaemi from "../../../public/report_gaemi.png";
import empty_wave from "../../../public/empty_wave.png";
import routine_baezzange from "../../../public/routine_baezznge.png";
import routine_gaemi from "../../../public/routine_gaemi.png";
import useMyStore from "@/store/useMyStore";
import { useRouter } from "next/navigation";
import { ADD_ROUTINE_PATH } from "@/store/path";
import PlusIcon from "../icon/PlusIcon";

export default function WeekDayReport() {
  const [currentWeek, setCurrentWeek] = useState({
    startDate: getWeekDates()[0],
    endDate: getWeekDates()[6],
  });

  const userType = useMyStore((state) => state.tendency);

  const { data, isFetched: isFetchedCount } = useQuery({
    queryKey: ["getExecutionCount", currentWeek.startDate, currentWeek.endDate],
    queryFn: () =>
      getRoutineExecutionCount(currentWeek.startDate, currentWeek.endDate),
  });

  const router = useRouter();

  const { data: routineExecutionList, isFetched: isFetchedRoutineExecution } =
    useQuery({
      queryKey: [
        "routineExecution",
        currentWeek.startDate,
        currentWeek.endDate,
      ],
      queryFn: () =>
        getRoutineExecution(currentWeek.startDate, currentWeek.endDate),
    });

  const isEmpty = useMemo(
    () => routineExecutionList?.data.data.length === 0,
    [routineExecutionList]
  );

  const successCount = useMemo(() => {
    return getWeekDates(currentWeek.startDate).reduce(
      (prev, cur) => {
        if (data?.data.data[cur]) {
          prev[0] = prev[0] + data?.data.data[cur].gaemiCount;
          prev[1] = prev[1] + data?.data.data[cur].baezzangeCount;
        }
        return prev;
      },
      [0, 0]
    );
  }, [data, currentWeek]);

  const gaemiPercent = useMemo(() => {
    const value =
      (successCount[0] / (successCount[0] + successCount[1])) * 100 === Infinity
        ? 0
        : (successCount[0] / (successCount[0] + successCount[1])) * 100;

    if (Number.isNaN(value)) {
      return 0;
    } else {
      return Math.round(value);
    }
  }, [successCount]);

  const baezzangePercent = useMemo(() => {
    const value =
      (successCount[1] / (successCount[0] + successCount[1])) * 100 === Infinity
        ? 0
        : (successCount[1] / (successCount[0] + successCount[1])) * 100;

    if (Number.isNaN(value)) {
      return 0;
    } else {
      return Math.round(value);
    }
  }, [successCount]);

  const waveRenderer = useMemo(() => {
    if (!isFetchedCount || !isFetchedRoutineExecution) {
      return;
    }

    if (gaemiPercent === 100) {
      return (
        <div className="circle relative overflow-hidden border-[#464343] rounded-full bg-gray-100 translate3d(0, 0, 0) w-[100px] h-[100px]">
          <div
            className={`absolute top-[18%] rounded-[45%] left-[-100px] bg-gray-500 opacity-[.9] w-[300px] h-[300px] animate-move-7s`}
          ></div>
          <div
            className={`absolute top-[38%] rounded-[45%] left-[-100px] bg-gray-700 opacity-[.9] w-[300px] h-[300px] animate-move-9s`}
          ></div>
          <div
            className={`absolute top-[62%] rounded-[45%] left-[-100px] bg-mainBlack opacity-[.9] w-[300px] h-[300px] animate-move-11s`}
          ></div>
        </div>
      );
    }

    if (gaemiPercent > 70) {
      return (
        <div className="circle relative overflow-hidden border-[#464343] rounded-full bg-gray-100 translate3d(0, 0, 0) w-[100px] h-[100px]">
          <div
            className={`absolute top-[75%] rounded-[45%] left-[-100px] bg-green-700  opacity-[.9] w-[300px] h-[300px] animate-move-7s`}
          ></div>
          <div
            className={`absolute top-[30%] rounded-[45%] left-[-100px] bg-gray-700 opacity-[.8] w-[300px] h-[300px] animate-move-9s`}
          ></div>
          <div
            className={`absolute top-[52%] rounded-[45%] left-[-100px] bg-mainBlack opacity-[.6] w-[300px] h-[300px] animate-move-11s`}
          ></div>
        </div>
      );
    }

    if (gaemiPercent >= 50) {
      return (
        <div className="circle relative overflow-hidden border-[#464343] rounded-full bg-gray-100 translate3d(0, 0, 0) w-[100px] h-[100px]">
          <div
            className={`absolute top-[45%] rounded-[55%] left-[-100px] bg-green-600 opacity-[.9] w-[300px] h-[300px] animate-move-9s`}
          ></div>
          <div
            className={`absolute top-[65%] rounded-[45%] left-[-100px] bg-green-900  opacity-[.9] w-[300px] h-[300px] animate-move-7s`}
          ></div>
          <div
            className={`absolute top-[55%] rounded-[45%] left-[-100px] bg-mainBlack opacity-[.9] w-[300px] h-[300px] animate-move-11s`}
          ></div>
        </div>
      );
    }

    if (gaemiPercent > 20) {
      return (
        <div className="circle relative overflow-hidden border-[#464343] rounded-full bg-gray-100 translate3d(0, 0, 0) w-[100px] h-[100px]">
          <div
            className={`absolute top-[38%] rounded-[45%] left-[-100px] bg-green-600 opacity-[.9] w-[300px] h-[300px] animate-move-7s`}
          ></div>
          <div
            className={`absolute top-[65%] rounded-[45%] left-[-100px] bg-green-700 opacity-[.9] w-[300px] h-[300px] animate-move-9s`}
          ></div>
          <div
            className={`absolute top-[72%] rounded-[45%] left-[-100px] bg-mainBlack opacity-[.9] w-[300px] h-[300px] animate-move-11s`}
          ></div>
        </div>
      );
    }

    return (
      <div className="circle relative overflow-hidden border-[#464343] rounded-full bg-gray-100 translate3d(0, 0, 0) w-[100px] h-[100px]">
        <div
          className={`absolute top-[18%] rounded-[45%] left-[-100px] bg-green-600 opacity-[.9] w-[300px] h-[300px] animate-move-7s`}
        ></div>
        <div
          className={`absolute top-[38%] rounded-[45%] left-[-100px] bg-green-700 opacity-[.9] w-[300px] h-[300px] animate-move-9s`}
        ></div>
        <div
          className={`absolute top-[62%] rounded-[45%] left-[-100px] bg-green-900 opacity-[.9] w-[300px] h-[300px] animate-move-11s`}
        ></div>
      </div>
    );
  }, [gaemiPercent, isFetchedCount, isFetchedRoutineExecution]);

  const failedCount = useMemo(() => {
    const possibleCheckRoutine =
      routineExecutionList?.data.data.reduce((prev, cur) => {
        cur.routine.daysOfWeek.forEach((day) => {
          if (
            replaceDayToValue[day] <=
            (getWeekDates(currentWeek.startDate).some(
              (date) => date === dayjs(new Date()).format("YYYY-MM-DD")
            )
              ? replaceFirstMondayToValue[dayjs(new Date()).day()]
              : 7)
          ) {
            prev++;
          }
        });
        return prev;
      }, 0) ?? 0;

    return possibleCheckRoutine - (successCount[0] + successCount[1]);
  }, [routineExecutionList, currentWeek, successCount]);

  const handlePrevWeek = useCallback(() => {
    setCurrentWeek({
      startDate: dayjs(currentWeek.startDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD"),
      endDate: dayjs(currentWeek.endDate)
        .subtract(1, "week")
        .format("YYYY-MM-DD"),
    });
  }, [currentWeek]);

  const handleNextWeek = useCallback(() => {
    if (
      dayjs(currentWeek.startDate)
        .add(1, "week")
        .isAfter(dayjs(new Date()).format("YYYY-MM-DD"))
    ) {
      alert("다음 주 통계는 아직이에요!");
      return;
    }

    setCurrentWeek({
      startDate: dayjs(currentWeek.startDate)
        .add(1, "week")
        .format("YYYY-MM-DD"),
      endDate: dayjs(currentWeek.endDate).add(1, "week").format("YYYY-MM-DD"),
    });
  }, [currentWeek]);

  return (
    <>
      <div className="z-30 sticky top-[108px] h-[64px] px-[20px] w-full flex items-center justify-between bg-white">
        <button
          onClick={handlePrevWeek}
          className="flex-center rounded-[4px] border-[1px] w-[32px] h-[32px]"
        >
          <LeftArrow size={20} />
        </button>
        <h2 className="flex items-center font-[500] text-[18px] text-gray-900">
          {dayjs(currentWeek.startDate).format("MM-DD")}{" "}
          <div className="w-[12px] mx-[6px]">~</div>
          {dayjs(currentWeek.endDate).format("MM-DD")}
        </h2>
        <button
          onClick={handleNextWeek}
          className="flex-center rounded-[4px] border-[1px] w-[32px] h-[32px]"
        >
          <RightArrow size={20} />
        </button>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="py-[12px] flex-center gap-[80px]">
        <div>
          <div className="font-[400] text-gray-600">성공 개수</div>
          <div className="mt-[4px] h-[34px] flex-center text-positive font-[600] text-[24px]">
            {successCount[0] + successCount[1]}
          </div>
        </div>
        <div>
          <div className="font-[400] text-gray-600">실패 개수</div>
          <div className="mt-[4px] h-[34px] flex-center text-negative font-[600] text-[24px]">
            {failedCount}
          </div>
        </div>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="pt-[24px] px-[20px] pb-[32px]">
        <div className="text-[16px] font-[600]">선호 루틴 분석</div>
        <div className="flex items-center mt-[20px]">
          {isEmpty ? (
            <Image src={empty_wave} alt="empty_wave" width={100} height={100} />
          ) : (
            waveRenderer
          )}
          {isEmpty ? (
            <div className="ml-auto w-[195px] font-[400]">
              <div className="text-gray-600 text-[16px]">
                등록된 루틴이 없어요!
              </div>
              <div className="mt-[8px] text-gray-500">
                기간 내 분석 가능한 루틴이 없으니 기간을 다시 지정해 주세요.
              </div>
            </div>
          ) : (
            <div className="ml-auto w-[175px] ">
              <div className="flex items-center">
                <Image
                  src={report_baezzange}
                  alt="report-baezzange"
                  width={32}
                  height={32}
                />
                <div className="ml-[6px]">베짱이 루틴</div>
                <div className="ml-auto flex font-[600]">
                  <div>{baezzangePercent}</div>
                  <div className="text-gray-500">%</div>
                </div>
              </div>
              <div className="flex items-center mt-[20px]">
                <Image
                  src={report_gaemi}
                  alt="report-gaemi"
                  width={32}
                  height={32}
                />
                <div className="ml-[6px]">개미 루틴</div>
                <div className="ml-auto flex font-[600]">
                  <div>{gaemiPercent}</div>
                  <div className="text-gray-500">%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[8px] bg-[#f4f4f4]" />
      <div className="pt-[24px] px-[20px] pb-[76px]">
        <div className="text-[16px] font-[600]">루틴 진행상황</div>
        {isEmpty ? (
          <div className="mt-[12px] flex-col flex-center">
            <Image
              src={
                userType === SubjectType.BAEZZANGE
                  ? routine_baezzange
                  : routine_gaemi
              }
              alt="empty_case"
              width={138}
              height={96}
            />
            <div className="mt-[12px] w-[175px] h-[40] text-gray-600 text-center">
              앗! 아직 만들어진 루틴이 없어요! 새로운 루틴을 추가해보세요!
            </div>
            <button
              onClick={() => router.push(ADD_ROUTINE_PATH)}
              className={`flex-center mt-[24px] flex-center w-[175px] h-[48px] text-white gap-[8px] rounded-[8px] ${
                userType === SubjectType.BAEZZANGE
                  ? "bg-mainGreen"
                  : "bg-mainBlack"
              }`}
            >
              <PlusIcon />
              <div>루틴 추가하기</div>
            </button>
          </div>
        ) : (
          <div className="mt-[20px] flex flex-col gap-[16px]">
            {routineExecutionList?.data.data.map((item) => {
              return (
                <div
                  key={item.routine.routineId}
                  className="flex flex-col gap-[6px]"
                >
                  <div className="flex justify-between">
                    <div className="font-[400]">{item.routine.name}</div>
                    <div className="font-[400] text-[12px] mt-[3px] text-gray-600">
                      <span className="font-[600] text-mainBlack">
                        {item.executionDates.length}일{" "}
                      </span>
                      / {item.routine.daysOfWeek.length}일
                    </div>
                  </div>
                  <div className="w-full flex gap-[4px]">
                    {createBooleanArray(item.executionDates.length).map(
                      (bool, idx) => {
                        return (
                          <div
                            key={idx}
                            className={`w-full h-[12px] rounded-[2px] ${
                              bool
                                ? item.routine.tendency ===
                                  SubjectType.BAEZZANGE
                                  ? "bg-mainGreen"
                                  : "bg-mainBlack"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
