import { RoutineCategoryType } from "./apis/routine";
import { StaticImageData } from "next/image";

// export type SubjectType = "baejjange" | "gaemi";
export enum SubjectType {
  BAEZZANGE = "BAEZZANGE",
  GAEMI = "GAEMI",
}

export type SurveyResult = {
  title: string;
  srcImg: StaticImageData;
  subImg: StaticImageData;
  subTitle1: string;
  subTitle2: string;
  score1: number;
  score2: number;
  srcBg: string;
  status: SubjectType;
};

export type SurveyList = {
  result1: SurveyResult;
  result2: SurveyResult;
  result3: SurveyResult;
  result4: SurveyResult;
};

export enum PostType {
  ROUTINE_SHARE = "ROUTINE_SHARE",
  ROUTINE_AUTHENTICATION = "ROUTINE_AUTHENTICATION",
  ROUTINE_QUESTION = "ROUTINE_QUESTION",
  ROUTINE_DAILY = "ROUTINE_DAILY",
  ETC = "ETC",
}

export const convertPostTypeValue = (type: PostType | null) => {
  switch (type) {
    case PostType.ROUTINE_AUTHENTICATION:
      return "루틴 인증";
    case PostType.ROUTINE_DAILY:
      return "일상";
    case PostType.ETC:
      return "기타";
    case PostType.ROUTINE_QUESTION:
      return "루틴 질문";
    case PostType.ROUTINE_SHARE:
      return "루틴 공유";
    default:
      return "카테고리 선택하기";
  }
};

export const PostTypeArray = [
  {
    value: PostType.ROUTINE_SHARE,
    name: convertPostTypeValue(PostType.ROUTINE_SHARE),
  },
  {
    value: PostType.ROUTINE_QUESTION,
    name: convertPostTypeValue(PostType.ROUTINE_QUESTION),
  },
  {
    value: PostType.ROUTINE_AUTHENTICATION,
    name: convertPostTypeValue(PostType.ROUTINE_AUTHENTICATION),
  },
  {
    value: PostType.ROUTINE_DAILY,
    name: convertPostTypeValue(PostType.ROUTINE_DAILY),
  },
  {
    value: PostType.ETC,
    name: convertPostTypeValue(PostType.ETC),
  },
];
