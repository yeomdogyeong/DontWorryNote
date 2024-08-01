"use client";

import { getFeeds } from "@/apis/feed/feed";
import { DefaultHeader } from "@/components/DefaultHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import WriteIcon from "@/components/icon/WriteIcon";
import FeedItem from "@/components/modules/feed/FeedItem";
import { ADD_POST_PATH, FEED_PATH } from "@/store/path";
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
  const [category, setCategory] = useState<PostType | "ALL">(
    (searchParams.get("category") as PostType | undefined) ?? "ALL"
  );

  const lastRequestAt = useMemo(
    () => searchParams.get("lastRequestAt"),
    [searchParams]
  ) as string | undefined;

  const queryKey = useMemo(
    () => ["getFeeds", category, feedType, lastRequestAt],
    [category, feedType, lastRequestAt]
  );

  const isEnabled = useMemo(
    () =>
      valid(searchParams.get("type")) && valid(searchParams.get("category")),
    [searchParams]
  );

  const router = useRouter();

  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () =>
      getFeeds({
        tendency: feedType,
        category: category === "ALL" ? undefined : category,
      }),
    gcTime: CACHE_TIME,
    enabled: isEnabled,
  });

  const moreMaxPageWidth = useMemo(() => {
    if (window && window.innerWidth > 500) {
      return window.innerWidth / 2 - 250 + 20;
    }
    return 20;
  }, []);

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
    [setFeedType, router, category]
  );

  return (
    <div className="h-max min-h-full pb-[52px]">
      <DefaultHeader title="피드" />
      <div className="z-30 px-[20px] flex items-center gap-[20px] h-[50px] sticky top-[56px] bg-white w-full">
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
          onClick={() => handleFeedTypeClick(SubjectType.BAEZZANGE)}
          className={`relative flex-center text-gray-500 font-[700] text-[20px] h-full ${
            feedType === SubjectType.BAEZZANGE ? "text-gray-900" : ""
          }`}
        >
          베짱이 피드
          {feedType === SubjectType.BAEZZANGE && (
            <div className="absolute w-full bottom-0 h-[3px] bg-gray-900" />
          )}
        </div>
      </div>
      <div className="bg-[#F4F4F4] py-[16px] h-max min-h-screen">
        <div className="h-[36px] flex gap-[8px] px-[20px] items-center w-full overflow-x-auto">
          {[{ name: "전체", value: "ALL" }, ...PostTypeArray].map((item) => {
            return (
              <div
                key={item.value}
                onClick={() => {
                  router.replace(
                    `${FEED_PATH}?type=${feedType}&category=${
                      item.value
                    }&lastRequestAt=${now()}`
                  );
                  setCategory(item.value as PostType | "ALL");
                }}
                className={`${
                  category === item.value
                    ? feedType === SubjectType.BAEZZANGE
                      ? "border-mainGreen bg-subGreen text-mainGreen"
                      : "border-mainBlack bg-subBlack text-mainBlack"
                    : "bg-white text-gray-800"
                } flex-shrink-0 text-gray-800 text-[13px] border-[1px] border-gray-200 rounded-[100px] h-[36px] flex-center px-[12px] py-[8px]`}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <div className="px-[20px] mt-[20px] flex flex-col gap-[12px]">
          {data?.data.data.map((item) => {
            return <FeedItem key={item.feedId} queryKey={queryKey} {...item} />;
          })}
        </div>
        <button
          style={{ right: moreMaxPageWidth }}
          onClick={() => router.push(ADD_POST_PATH)}
          className={`fixed bottom-[68px] shadow-[0_4px_4px_0px_rgba(0,0,0,0.16)] flex-center w-[52px] h-[52px] rounded-full ${
            feedType === SubjectType.GAEMI ? "bg-mainBlack" : "bg-mainGreen"
          }`}
        >
          <WriteIcon />
        </button>
      </div>
      <BottomNavigation />
    </div>
  );
}
