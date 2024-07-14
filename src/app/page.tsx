"use client";
import Image from "next/image";
import slogan from "../../public/slogan.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../app/styles/animation.css";
export default function Home() {
  const router = useRouter();
  const handleNextPage = () => {
    setTimeout(() => router.push("/onboarding"), 3000);
  };

  useEffect(() => {
    handleNextPage();
  }, []);
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-[218px]">
        <Image
          src={slogan}
          alt="sloganImg"
          width={236}
          height={33}
          className="mb-[16px]"
        />
        <div className="text-gray-600">개짱이: 나를 찾아가는 루틴 여정</div>
      </div>
    </main>
  );
}
//처음 Fadein
//2초 뒤 onboarding page로 이동
