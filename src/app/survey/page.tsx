import { Header } from "@/components/Header";
import onestep from "../../../public/onestep.png";
import Image from "next/image";
import { ProgressBar } from "@/components/Survey/ProgressBar";
import { ListComponent } from "@/components/Survey/ListComponent";
import { School } from "@/components/Icon/School";
import { Burning } from "@/components/Icon/Burning";
import { Sleep } from "@/components/Icon/Sleep";
import { Drawing } from "@/components/Icon/Drawing";
import { Muscle } from "@/components/Icon/Muscle";
import { Family } from "@/components/Icon/Family";
export default function Survey() {
  const listItem = [
    {
      text: "업무 또는 학업",
      srcImg: <School />,
    },
    {
      text: "생산적인 자기계발",
      srcImg: <Burning />,
    },
    {
      text: "휴식과 수면",
      srcImg: <Sleep />,
    },
    {
      text: "취미와 여가활동",
      srcImg: <Drawing />,
    },
    {
      text: "운동 등 셀프 케어",
      srcImg: <Muscle />,
    },
    {
      text: "가족과 친구와의 시간",
      srcImg: <Family />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 h-full">
      <Header />
      <ProgressBar srcImg={onestep} />
      <div className="w-full p-6 mt-4 flex justify-between items-center ">
        <div className="self-start ml-2">
          <p className="text-2xl font-bold">하루에 가장 많은 시간을 쓰는</p>
          <p className="text-2xl font-bold">쓰는 활동은 무엇인가요?</p>
        </div>
        <div className="self-end flex tracking-wider">
          <p className="text-mainGreen">1</p>
          <p> /</p>
          <p>5</p>
        </div>
      </div>
      {listItem.map((el) => (
        <ListComponent srcImg={el.srcImg} text={el.text} />
      ))}
      <div className="flex flex-col items-center justify-center absolute w-[500px] max-w-[100vw] h-[220px] max-h-[10vh] bg-gray-100 bottom-0 p-2 rounded-t-sm">
        <button className="flex justify-center items-center h-1/3 w-full text-lg ">
          다음으로
        </button>
      </div>
    </div>
  );
}
