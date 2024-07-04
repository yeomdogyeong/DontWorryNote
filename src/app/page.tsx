import { AuthButton } from "@/components/AuthButton";
import { BasicButton } from "@/components/BasicButton";
import Image from "next/image";
import google from "../../public/google.png";
import kakao from "../../public/kakao.png";
import { PostButton } from "@/components/PostButton";
import { SubjectType } from "@/types/common";
export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <div>hello</div> <div>hello2</div> <div>hello33</div>
      <PostButton bgColor={SubjectType.baejjange} />{" "}
      <PostButton bgColor={SubjectType.gaemi} />
      <BasicButton text="dogyeong" bgColor="baejjange" />
      <BasicButton text="dogyeong" bgColor="gaemi" />
      <BasicButton text="dogyeong" bgColor="mainGreen" />
      <AuthButton text="KaKao로 시작하기" bgColor="kakao" srcImg={kakao} />
      <AuthButton text="Google로 시작하기" bgColor="" srcImg={google} />
    </main>
  );
}
