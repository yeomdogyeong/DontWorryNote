import { AuthButton } from "@/components/Button/AuthButton";
import { BasicButton } from "@/components/Button/BasicButton";
import Image from "next/image";
import google from "../../public/google.png";
import kakao from "../../public/kakao.png";
import { PostButton } from "@/components/Button/PostButton";
import { SubjectType } from "@/types/common";
import { ProgressBar2 } from "@/components/Survey/ProgressBar2";
export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <ProgressBar2 stepNumber={5} />
      <PostButton bgColor={SubjectType.baejjange} />
      <PostButton bgColor={SubjectType.gaemi} />
      <BasicButton text="dogyeong" bgColor="baejjange" />
      <BasicButton text="dogyeong" bgColor="gaemi" />
      <BasicButton text="dogyeong" bgColor="mainGreen" />
      <AuthButton text="KaKao로 시작하기" bgColor="kakao" srcImg={kakao} />
      <AuthButton text="Google로 시작하기" bgColor="" srcImg={google} />
    </main>
  );
}
