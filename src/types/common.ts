import { StaticImageData } from "next/image";
import emoji_1 from "../../public/emoji_1.png";
import emoji_2 from "../../public/emoji_2.png";
import emoji_3 from "../../public/emoji_3.png";
import emoji_4 from "../../public/emoji_4.png";
import emoji_5 from "../../public/emoji_5.png";
import emoji_6 from "../../public/emoji_6.png";
import emoji_7 from "../../public/emoji_7.png";
import emoji_8 from "../../public/emoji_8.png";
import emoji_9 from "../../public/emoji_9.png";
import emoji_10 from "../../public/emoji_10.png";
import emoji_11 from "../../public/emoji_11.png";
import emoji_12 from "../../public/emoji_12.png";
import emoji_13 from "../../public/emoji_13.png";
import emoji_14 from "../../public/emoji_14.png";
import emoji_15 from "../../public/emoji_15.png";
import emoji_16 from "../../public/emoji_16.png";
import emoji_17 from "../../public/emoji_17.png";
import emoji_18 from "../../public/emoji_18.png";
import emoji_19 from "../../public/emoji_19.png";
import emoji_20 from "../../public/emoji_20.png";
import emoji_21 from "../../public/emoji_21.png";
import emoji_22 from "../../public/emoji_22.png";
import emoji_23 from "../../public/emoji_23.png";
import emoji_24 from "../../public/emoji_24.png";
import emoji_25 from "../../public/emoji_25.png";
import emoji_26 from "../../public/emoji_26.png";
import emoji_27 from "../../public/emoji_27.png";
import emoji_28 from "../../public/emoji_28.png";
import emoji_29 from "../../public/emoji_29.png";
import emoji_30 from "../../public/emoji_30.png";
import emoji_31 from "../../public/emoji_31.png";
import emoji_32 from "../../public/emoji_32.png";
import emoji_33 from "../../public/emoji_33.png";
import emoji_34 from "../../public/emoji_34.png";
import emoji_35 from "../../public/emoji_35.png";
import emoji_36 from "../../public/emoji_36.png";
import emoji_37 from "../../public/emoji_37.png";
import emoji_38 from "../../public/emoji_38.png";
import emoji_39 from "../../public/emoji_39.png";
import emoji_40 from "../../public/emoji_40.png";
import emoji_41 from "../../public/emoji_41.png";
import emoji_42 from "../../public/emoji_42.png";
import emoji_43 from "../../public/emoji_43.png";
import emoji_44 from "../../public/emoji_44.png";
import emoji_45 from "../../public/emoji_45.png";
import emoji_46 from "../../public/emoji_46.png";
import emoji_47 from "../../public/emoji_47.png";
import emoji_48 from "../../public/emoji_48.png";
import emoji_49 from "../../public/emoji_49.png";
import emoji_50 from "../../public/emoji_50.png";
import emoji_51 from "../../public/emoji_51.png";
import emoji_52 from "../../public/emoji_52.png";
import emoji_53 from "../../public/emoji_53.png";
import emoji_54 from "../../public/emoji_54.png";
import emoji_55 from "../../public/emoji_55.png";
import emoji_56 from "../../public/emoji_56.png";

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
  DAILY = "DAILY",
  ETC = "ETC",
}

export const convertPostTypeValue = (type: PostType | null) => {
  switch (type) {
    case PostType.ROUTINE_AUTHENTICATION:
      return "루틴 인증";
    case PostType.DAILY:
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
    value: PostType.DAILY,
    name: convertPostTypeValue(PostType.DAILY),
  },
  {
    value: PostType.ETC,
    name: convertPostTypeValue(PostType.ETC),
  },
];

export const convertEmojiImgSrc = (value: number) => {
  switch (value) {
    case 1:
      return emoji_1;
    case 2:
      return emoji_2;
    case 3:
      return emoji_3;
    case 4:
      return emoji_4;
    case 5:
      return emoji_5;
    case 6:
      return emoji_6;
    case 7:
      return emoji_7;
    case 8:
      return emoji_8;
    case 9:
      return emoji_9;
    case 10:
      return emoji_10;
    case 11:
      return emoji_11;
    case 12:
      return emoji_12;
    case 13:
      return emoji_13;
    case 14:
      return emoji_14;
    case 15:
      return emoji_15;
    case 16:
      return emoji_16;
    case 17:
      return emoji_17;
    case 18:
      return emoji_18;
    case 19:
      return emoji_19;
    case 20:
      return emoji_20;
    case 21:
      return emoji_21;
    case 22:
      return emoji_22;
    case 23:
      return emoji_23;
    case 24:
      return emoji_24;
    case 25:
      return emoji_25;
    case 26:
      return emoji_26;
    case 27:
      return emoji_27;
    case 28:
      return emoji_28;
    case 29:
      return emoji_29;
    case 30:
      return emoji_30;
    case 31:
      return emoji_31;
    case 32:
      return emoji_32;
    case 33:
      return emoji_33;
    case 34:
      return emoji_34;
    case 35:
      return emoji_35;
    case 36:
      return emoji_36;
    case 37:
      return emoji_37;
    case 38:
      return emoji_38;
    case 39:
      return emoji_39;
    case 40:
      return emoji_40;
    case 41:
      return emoji_41;
    case 42:
      return emoji_42;
    case 43:
      return emoji_43;
    case 44:
      return emoji_44;
    case 45:
      return emoji_45;
    case 46:
      return emoji_46;
    case 47:
      return emoji_47;
    case 48:
      return emoji_48;
    case 49:
      return emoji_49;
    case 50:
      return emoji_50;
    case 51:
      return emoji_51;
    case 52:
      return emoji_52;
    case 53:
      return emoji_53;
    case 54:
      return emoji_54;
    case 55:
      return emoji_55;
    case 56:
      return emoji_56;
  }
};
