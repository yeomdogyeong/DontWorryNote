import { SubjectType } from "../common";
import routine_1 from "../../../public/routine_1.png";
import routine_2 from "../../../public/routine_2.png";
import routine_3 from "../../../public/routine_3.png";
import routine_4 from "../../../public/routine_4.png";
import routine_5 from "../../../public/routine_5.png";
import routine_6 from "../../../public/routine_6.png";

export interface PostRoutineRs {
  tendency: SubjectType;
  category: RoutineCategoryType;
  name: string;
  description: string;
  emoji: number;
  startedDate: string;
  endedDate?: string;
  executionTime?: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  daysOfWeek: DaysOfWeekType;
}

export enum DaysOfWeekType {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum RoutineCategoryType {
  WORK_AND_STUDY = "WORK_AND_STUDY",
  HEALTH = "HEALTH",
  SEL_DEVELOPMENT = "SEL_DEVELOPMENT",
  HOBBY = "HOBBY",
  MEETING = "MEETING",
  REST = "REST",
}

export const convertRoutineCategoryValue = (
  type: RoutineCategoryType | null
) => {
  switch (type) {
    case RoutineCategoryType.WORK_AND_STUDY:
      return "업무 또는 학업";
    case RoutineCategoryType.HEALTH:
      return "운동 및 셀프케어";
    case RoutineCategoryType.SEL_DEVELOPMENT:
      return "생산적인 자기 계발";
    case RoutineCategoryType.HOBBY:
      return "취미 및 여가활동";
    case RoutineCategoryType.MEETING:
      return "가족 및 친구와의 시간";
    case RoutineCategoryType.REST:
      return "휴식 및 수면";
    default:
      return "카테고리 선택하기";
  }
};

export const convertRoutineCategoryImgSrc = (type: RoutineCategoryType) => {
  switch (type) {
    case RoutineCategoryType.WORK_AND_STUDY:
      return routine_1;
    case RoutineCategoryType.HEALTH:
      return routine_2;
    case RoutineCategoryType.SEL_DEVELOPMENT:
      return routine_3;
    case RoutineCategoryType.HOBBY:
      return routine_4;
    case RoutineCategoryType.MEETING:
      return routine_5;
    case RoutineCategoryType.REST:
      return routine_6;
  }
};
