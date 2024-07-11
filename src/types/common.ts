import { StaticImageData } from "next/image";

// export type SubjectType = "baejjange" | "gaemi";
export enum SubjectType {
  baejjange = "baejjange",
  gaemi = "gaemi",
}

export type SurveyResult = {
  title: string;
  srcImg: StaticImageData;
  subImg: StaticImageData;
  subTitle1: string;
  subTitle2: string;
  score1: number;
  score2: number;
};

export type SurveyList = {
  result1: SurveyResult;
  result2: SurveyResult;
  result3: SurveyResult;
  result4: SurveyResult;
};
