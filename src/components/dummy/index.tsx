import { Burning } from "../icon/Burning";
import { Drawing } from "../icon/Drawing";
import { Family } from "../icon/Family";
import { Muscle } from "../icon/Muscle";
import { School } from "../icon/School";
import { Sleep } from "../icon/Sleep";
import baejjange1 from "../../../public/baejjange3.png";
import baejjange2 from "../../../public/baejjange1.png";
import minibaejjange from "../../../public/Ellipse1.png";
import minigaemi from "../../../public/Ellipse2.png";
import gaemi from "../../../public/gaemi1.png";
import gaemi2 from "../../../public/gaemi2.png";
import { SubjectType, SurveyList } from "@/types/common";
import { Book } from "../icon/Book";
import { Spa } from "../icon/Spa";
import { Lazy } from "../icon/Lazy";
import { Semina } from "../icon/Semina";
import { Lecture } from "../icon/Lecture";
import { Tv } from "../icon/Tv";
import { Health } from "../icon/Health";
import { Music } from "../icon/Music";
import { Plan } from "../icon/Plan";
import { Focus } from "../icon/Focus";
import { Happy } from "../icon/Happy";
import { Productivity } from "../icon/Productivity";
import { Mad } from "../icon/Mad";
import { Sunglass } from "../icon/Sunglass";
export const listItem = [
  {},
  {
    title: {
      one: "하루에 가장 많은 시간을 쓰는",
      two: "쓰는 활동은 무엇인가요?",
    },
    items: [
      { text: "업무 또는 학업", srcImg: <School />, score: 1 },
      {
        text: "생산적인 자기계발",
        srcImg: <Burning />,
        score: 1,
      },
      {
        text: "휴식과 수면",
        srcImg: <Sleep />,
        score: 0,
      },
      {
        text: "취미와 여가활동",
        srcImg: <Drawing />,
        score: 0,
      },
      {
        text: "운동 등 셀프 케어",
        srcImg: <Muscle />,
        score: 1,
      },
      {
        text: "가족과 친구와의 시간",
        srcImg: <Family />,
        score: 0,
      },
    ],
  },
  {
    title: {
      one: "가장 가치있다고",
      two: "느끼는것은 무엇인가요?",
    },
    items: [
      { text: "끊임없는 자기 발전", srcImg: <Burning />, score: 1 },
      {
        text: "행복과 만족",
        srcImg: <Happy />,
        score: 0,
      },
      {
        text: "성취감과 목표달성",
        srcImg: <Focus />,
        score: 1,
      },
      {
        text: "여유와 휴식",
        srcImg: <Drawing />,
        score: 0,
      },
      {
        text: "효율성과 생산성",
        srcImg: <Productivity />,
        score: 1,
      },
      {
        text: "가족과 친구와의 유대감",
        srcImg: <Family />,
        score: 0,
      },
    ],
  },
  {
    title: {
      one: "이상적인 휴가계획은",
      two: "무엇이라고 생각하나요?",
    },
    items: [
      { text: "자기계발 및 독서", srcImg: <Book />, score: 1 },
      {
        text: "스파나 마사지로 힐링",
        srcImg: <Spa />,
        score: 0,
      },
      {
        text: "워크숍 및 세미나 참석",
        srcImg: <Semina />,
        score: 1,
      },
      {
        text: "여유롭고 느긋한 휴식",
        srcImg: <Lazy />,
        score: 0,
      },
      {
        text: "강의 수강 및 자격증 취득",
        srcImg: <Lecture />,
        score: 1,
      },
      {
        text: "집에서 영화나 드라마 몰아보기",
        srcImg: <Tv />,
        score: 0,
      },
    ],
  },
  {
    title: {
      one: "스트레스를 받을 때",
      two: "주로 어떻게 해소하나요?",
    },
    items: [
      { text: "운동으로 스트레스 해소", srcImg: <Health />, score: 1 },
      {
        text: "가족이나 친구와의 대화",
        srcImg: <Family />,
        score: 0,
      },
      {
        text: "음악 감상 또는 명상",
        srcImg: <Music />,
        score: 0,
      },
      {
        text: "계획을 세우고 문제를 해결",
        srcImg: <Plan />,
        score: 1,
      },
      {
        text: "취미 활동 즐기기",
        srcImg: <Drawing />,
        score: 0,
      },
      {
        text: "새로운 프로젝트나 도전에 집중",
        srcImg: <Focus />,
        score: 1,
      },
    ],
  },
  {
    title: {
      one: "내가 원하는 나의 모습은",
      two: "어떤 모습인가요?",
    },
    items: [
      { text: "목표지향적 개짱이", srcImg: <Focus />, score: 1 },
      {
        text: "똑똑한 개짱이",
        srcImg: <Book />,
        score: 1,
      },
      {
        text: "여유로운 개짱이",
        srcImg: <Sunglass />,
        score: 0,
      },
      {
        text: "계획적인 개짱이",
        srcImg: <Plan />,
        score: 1,
      },
      {
        text: "행복한 개짱이",
        srcImg: <Happy />,
        score: 0,
      },
      {
        text: "즐거운 개짱이",
        srcImg: <Mad />,
        score: 0,
      },
    ],
  },
];

export const surveyList: SurveyList[] = [
  {
    result1: {
      title: "여유로운 베짱이",
      srcImg: baejjange1,
      subImg: minibaejjange,
      subTitle:
        "충분한 휴식을 통해 몸과 마음을 돌보는 당신,\n작은 도전으로 일상에 활력을 더해볼까요?",
      score1: 2,
      score2: 8,
      srcBg: "baejjange",
      status: SubjectType.BAEZZANGE,
    },
    result2: {
      title: "균형잡힌 베짱이",
      srcImg: baejjange2,
      subImg: minibaejjange,
      subTitle:
        "충분한 휴식과 일의 조화를 잘 맞추는 당신,\n지금의 균형잡힌 삶이 정말 멋지네요!",
      score1: 4,
      score2: 6,
      srcBg: "baejjange",
      status: SubjectType.BAEZZANGE,
    },
    result3: {
      title: "균형잡힌 개미",
      srcImg: gaemi,
      subImg: minigaemi,
      subTitle:
        "새로운 지식과 경험을 균형있게 즐기는 당신,\n현재의 밸런스는 매우 이상적입니다!",
      score1: 4,
      score2: 6,
      srcBg: "gaemi",
      status: SubjectType.GAEMI,
    },
    result4: {
      title: "부지런한 개미",
      srcImg: gaemi2,
      subImg: minigaemi,
      subTitle:
        "목표를 향해 끊임없이 노력하는 당신,\n건강한 성장을 위해 잠시 재충전 해볼까요?",
      score1: 8,
      score2: 2,
      srcBg: "gaemi",
      status: SubjectType.GAEMI,
    },
  },
];
