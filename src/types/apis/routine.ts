import { SubjectType } from "../common";
import routine_1 from "../../../public/routine_1.png";
import routine_2 from "../../../public/routine_2.png";
import routine_3 from "../../../public/routine_3.png";
import routine_4 from "../../../public/routine_4.png";
import routine_5 from "../../../public/routine_5.png";
import routine_6 from "../../../public/routine_6.png";
import routine_7 from "../../../public/routine_7.png";
import routine_8 from "../../../public/routine_8.png";
import routine_9 from "../../../public/routine_9.png";
import routine_10 from "../../../public/routine_10.png";
import routine_11 from "../../../public/routine_11.png";
import routine_12 from "../../../public/routine_12.png";
import routine_13 from "../../../public/routine_13.png";
import routine_14 from "../../../public/routine_14.png";

export interface PostRoutineRq extends Omit<RoutineItemType, "routineId"> {}

export interface RoutineItemType {
  routineId: number;
  tendency: SubjectType;
  category: RoutineCategoryType;
  name: string;
  description: string;
  emoji: number;
  startedDate: string;
  endedDate: string | null;
  executionTime?: string;
  userId?: number;
  daysOfWeek: DaysOfWeekType[];
}

export interface GetRoutineRs extends RoutineItemType {}

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
  // GAEMI
  WORK_AND_STUDY = "WORK_AND_STUDY",
  HEALTH = "HEALTH",
  SELF_DEVELOPMENT = "SELF_DEVELOPMENT",
  NETWORKING = "NETWORKING",
  CERTIFICATION = "CERTIFICATION",
  GAEMI_ETC = "GAEMI_ETC",
  PLAN = "PLAN",

  // BAEZZANGE
  HOBBY = "HOBBY",
  MEETING = "MEETING",
  GAME = "GAME",
  FOOD = "FOOD",
  MUSIC_AND_SHOW = "MUSIC_AND_SHOW",
  REST = "REST",
  BAEZZANGE_ETC = "BAEZZANGE_ETC",
}

export const convertRoutineCategoryValue = (
  type: RoutineCategoryType | null
) => {
  switch (type) {
    case RoutineCategoryType.WORK_AND_STUDY:
      return "업무 또는 학업";
    case RoutineCategoryType.HEALTH:
      return "운동 및 셀프케어";
    case RoutineCategoryType.SELF_DEVELOPMENT:
      return "생산적인 자기 계발";
    case RoutineCategoryType.PLAN:
      return "시간 관리 및 계획 세우기";
    case RoutineCategoryType.CERTIFICATION:
      return "자격증 공부 및 강의 수강";
    case RoutineCategoryType.NETWORKING:
      return "네트워킹 및 전문적 관계 형성";
    case RoutineCategoryType.GAEMI_ETC:
      return "기타";

    case RoutineCategoryType.HOBBY:
      return "취미와 여가 활동";
    case RoutineCategoryType.MEETING:
      return "가족 및 친구와의 시간";
    case RoutineCategoryType.REST:
      return "휴식과 수면";
    case RoutineCategoryType.GAME:
      return "게임 및 엔터테인먼트";
    case RoutineCategoryType.MUSIC_AND_SHOW:
      return "음악 감상 및 콘서트 참여";
    case RoutineCategoryType.BAEZZANGE_ETC:
      return "기타";
    case RoutineCategoryType.FOOD:
      return "맛집 탐방 및 미식 여행";
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
    case RoutineCategoryType.SELF_DEVELOPMENT:
      return routine_3;
    case RoutineCategoryType.PLAN:
      return routine_8;
    case RoutineCategoryType.CERTIFICATION:
      return routine_9;
    case RoutineCategoryType.NETWORKING:
      return routine_7;
    case RoutineCategoryType.GAEMI_ETC:
      return routine_14;

    case RoutineCategoryType.HOBBY:
      return routine_4;
    case RoutineCategoryType.MEETING:
      return routine_5;
    case RoutineCategoryType.REST:
      return routine_10;
    case RoutineCategoryType.GAME:
      return routine_11;
    case RoutineCategoryType.MUSIC_AND_SHOW:
      return routine_13;
    case RoutineCategoryType.BAEZZANGE_ETC:
      return routine_14;
    case RoutineCategoryType.FOOD:
      return routine_12;
    default:
      return "카테고리 선택하기";
  }
};
