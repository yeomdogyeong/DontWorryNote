"use client";

import { getFeeds } from "@/apis/feed/feed";
import { DefaultHeader } from "@/components/DefaultHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import FeedItem from "@/components/modules/feed/FeedItem";
import { FEED_PATH } from "@/store/path";
import { PostType, PostTypeArray, SubjectType } from "@/types/common";
import { CACHE_TIME } from "@/util/common";
import { now } from "@/util/date";
import { valid } from "@/util/valid";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function FeedPage() {
  const searchParams = useSearchParams();

  const [feedType, setFeedType] = useState<SubjectType>(
    (searchParams.get("type") as SubjectType | undefined) ?? SubjectType.GAEMI
  );
  const [category, setCategory] = useState(
    (searchParams.get("category") as PostType | undefined) ??
      PostType.ROUTINE_SHARE
  );

  const lastRequestAt = useMemo(
    () => searchParams.get("lastRequestAt"),
    [searchParams]
  ) as string | undefined;

  const router = useRouter();

  useEffect(() => {}, []);

  const { data } = useQuery({
    queryKey: ["getFeeds", category, feedType, lastRequestAt],
    queryFn: () =>
      getFeeds({ tendency: feedType, category, searchText: "안녕" }),
    gcTime: CACHE_TIME,
    enabled:
      valid(searchParams.get("category")) &&
      valid(searchParams.get("category")),
  });

  useEffect(() => {
    if (
      searchParams.get("type") === null ||
      searchParams.get("category") === null
    ) {
      router.replace(
        FEED_PATH +
          `?type=${SubjectType.GAEMI}&category=${
            PostType.ROUTINE_SHARE
          }&lastRequestAt=${now()}`
      );
    }
  }, [searchParams, router]);

  const handleFeedTypeClick = useCallback(
    (type: SubjectType) => {
      router.replace(
        FEED_PATH + `?type=${type}&category=${category}&lastRequestAt=${now()}`
      );
      setFeedType(type);
    },
    [setFeedType, router]
  );

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
      <div className="bg-[#F4F4F4] py-[16px] h-full">
        <div className="h-[36px] flex gap-[8px] pl-[20px] items-center w-full overflow-x-auto">
          {PostTypeArray.map((item) => {
            return (
              <div
                key={item.value}
                onClick={() => {
                  router.replace(
                    `${FEED_PATH}?type=${feedType}&category=${
                      item.value
                    }&lastRequestAt=${now()}`
                  );
                  setCategory(item.value);
                }}
                className={`${
                  category === item.value
                    ? feedType === SubjectType.BAEJJANGE
                      ? "border-mainGreen bg-subGreen text-mainGreen"
                      : "border-mainBlack bg-subBlack text-mainBlack"
                    : "bg-white text-gray-800"
                } flex-shrink-0 font-[400] text-gray-800 text-[13px] border-[1px] border-gray-200 rounded-[100px] h-[36px] flex-center px-[12px] py-[8px]`}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div className=" px-[20px]mt-[20px] flex flex-col gap-[12px]">
          {data?.data.data.map((item) => {
            return <FeedItem key={item.feedContent} {...item} />;
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
