import { AuthButton } from "@/components/button/AuthButton";

import Image from "next/image";
import google from "../../public/google.png";
import kakao from "../../public/kakao.png";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <AuthButton text="KaKao로 시작하기" bgColor="kakao" srcImg={kakao} />
      <AuthButton text="Google로 시작하기" bgColor="" srcImg={google} />
    </main>
  );
}
