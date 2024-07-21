"use client";

import { getFeeds } from "@/apis/feed/feed";
import { DefaultHeader } from "@/components/DefaultHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import { FEED_PATH } from "@/store/path";
import { SubjectType } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function FeedPage() {
  const [feedType, setFeedType] = useState<SubjectType>(SubjectType.GAEMI);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getFeeds({ tendency: feedType }),
  });

  console.log(data);
  useEffect(() => {
    if (searchParams.get("type") === null) {
      router.push(FEED_PATH + `?type=${SubjectType.GAEMI}`);
    }
  }, [searchParams, router]);

  const handleFeedTypeClick = useCallback((type: SubjectType) => {
    setFeedType(type);
  }, []);

  return (
    <div className="h-full">
      <DefaultHeader title="피드" />
      <div className="ml-[20px] flex items-center gap-[20px] h-[50px]">
        <div
          onClick={() => handleFeedTypeClick(SubjectType.GAEMI)}
          className={`relative flex-center text-gray-500 font-[700] text-[20px] h-full ${
            feedType === SubjectType.GAEMI ? "text-gray-900" : ""
          }`}
        >
          개미 피드
          {feedType === SubjectType.GAEMI && (
            <div className="absolute w-full bottom-0 h-[3px] bg-gray-900" />
          )}
        </div>
        <div
          onClick={() => handleFeedTypeClick(SubjectType.BAEJJANGE)}
          className={`relative flex-center text-gray-500 font-[700] text-[20px] h-full ${
            feedType === SubjectType.BAEJJANGE ? "text-gray-900" : ""
          }`}
        >
          베짱이 피드
          {feedType === SubjectType.BAEJJANGE && (
            <div className="absolute w-full bottom-0 h-[3px] bg-gray-900" />
          )}
        </div>
      </div>
      <div className="bg-[#F4F4F4] py-[16px] px-[20px] h-full">
        <div className="h-[36px] flex gap-[8px] items-center overflow-x-auto"></div>
        <div className="mt-[20px] flex flex-col gap-[12px]">
          <div>mx-</div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
