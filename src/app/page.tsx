"use client";
import Image from "next/image";
import slogan from "../../public/slogan.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../app/styles/animation.css";
import useMyStore from "@/store/useMyStore";
import { getUserMyInfo } from "@/apis/user/user";
import { HOME_PATH } from "@/store/path";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, setIsSignedIn, setInitializeState } = useMyStore(
    (state) => state
  );
  const handleNextPage = async () => {
    const userToken = localStorage.getItem("tokenKey");
    if (userToken && !isSignedIn) {
      try {
        const { data } = await getUserMyInfo();
        setInitializeState({
          ...data.data,
        });
        setTimeout(() => router.push(HOME_PATH), 2000);
      } catch (e) {
        setIsSignedIn(false);
        setTimeout(() => router.push("/onboarding"), 2000);
      }
    } else {
      setIsSignedIn(false);
      setTimeout(() => router.push("/onboarding"), 2000);
    }
  };

  useEffect(() => {
    handleNextPage();
  }, [handleNextPage]);
  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col justify-center items-center mt-[275px]">
        <Image
          src={slogan}
          alt="sloganImg"
          width={236}
          height={33}
          className="mb-[16px]"
        />
        <div className="text-gray-600 font-semibold">
          개짱이: 나를 찾아가는 루틴 여정
        </div>
      </div>
    </main>
  );
}
//처음 Fadein
//2초 뒤 onboarding page로 이동
