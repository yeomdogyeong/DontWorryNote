"use client";

import { deleteFeed, getFeed, postFeedByIdLikeToggle } from "@/apis/feed/feed";
import { Header } from "@/components/Header";
import CommentIcon from "@/components/icon/CommentIcon";
import LikeIcon from "@/components/icon/LikeIcon";
import MoreIcon from "@/components/icon/MoreIcon";
import { useActionSheetOverlay } from "@/components/overlay/actionSheet/ActionSheetOverlay";
import { FEED_PATH } from "@/store/path";
import useMyStore from "@/store/useMyStore";
import { GetFeedDetailRs } from "@/types/apis/feed";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { CACHE_TIME } from "@/util/common";
import { formatTimeDifference } from "@/util/date";
import { valid } from "@/util/valid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function FeedDetailPage() {
  const searchParams = useParams();
  const { userId } = useMyStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  const feedId = useMemo(
    () => (searchParams.id ? Number(searchParams.id) : undefined),
    []
  );
  const queryKey = useMemo(() => ["getFeed", feedId], []);

  const { data, isFetched } = useQuery({
    queryKey: queryKey,
    queryFn: () => getFeed(feedId as number),
    gcTime: CACHE_TIME,
    enabled: valid(feedId),
  });

  const isMine = useMemo(
    () => userId === data?.data.data.userId,
    [userId, data]
  );

  const { active } = useActionSheetOverlay();
  const onMoreBtnClick = useCallback(() => {
    active({
      list: [
        {
          title: "게시글 편집",
          onClick: async () => {
            router.push(FEED_PATH + `/${feedId}/edit`);
          },
        },
        {
          title: "게시글 삭제",
          className: "text-negative",
          onClick: async () => {
            await deleteFeed(feedId as number);
            router.back();
          },
        },
        {
          title: "취소",
          onClick: async () => {},
        },
      ],
    });
  }, []);

  const likeText = useMemo(() => {
    if (data && data?.data.data.likeCount > 0) {
      return data?.data.data.likeCount + "명이 응원했어요!";
    }
    return "처음으로 응원해보세요!";
  }, [data]);

  const handleLike = useCallback(async () => {
    await postFeedByIdLikeToggle(feedId as number);
    queryClient.setQueryData(queryKey, (prevData: any) => {
      if (!prevData) return prevData;
      //NOTE: 추후 업로드 할 때, 기록 안막을 시 수정 필요
      return produce(prevData, (draft: any) => {
        const draftData = draft.data.data;
        draftData.isLike = !data?.data.data.isLike;
        draftData.likeCount += data?.data.data.isLike === true ? -1 : 1;
      });
    });
  }, [feedId, data]);

  if (!isFetched) {
    return <></>;
  }

  return (
    <div className="h-full">
      <Header
        rightButton={
          isMine && (
            <button onClick={onMoreBtnClick}>
              <MoreIcon />
            </button>
          )
        }
      />
      <div className="px-[20px] py-[12px]">
        <div className="flex h-[37px]">
          <Image
            src={data?.data.data.profileImagePath ?? ""}
            width={32}
            height={32}
            alt="profile_image"
          />
          <div className="ml-[12px]">
            <div className="font-[600]">{data?.data.data.nickname}</div>
            <div className="text-[12px] text-gray-500">
              {formatTimeDifference(data?.data.data.createdAt as string)}
            </div>
          </div>
          <div
            className={`ml-auto flex-center w-[72px] h-[30px] rounded-[80px] ${
              data?.data.data.feedTendency === SubjectType.GAEMI
                ? "text-mainBlack bg-subBlack"
                : "text-mainGreen bg-subGreen"
            }`}
          >
            {convertPostTypeValue(data?.data.data.category as PostType)}
          </div>
        </div>
        <div className="py-[16px]">{data?.data.data.feedContent}</div>
        <Image
          className="rounded-[10px]"
          src={data?.data.data.feedImagePath ?? ""}
          alt="feed-img"
          width={80}
          height={80}
        />
        <div className="mt-[24px] flex items-center text-[12px] font-[400] text-gray-600">
          <div>{likeText}</div>
          <div className="ml-auto">댓글 {data?.data.data.commentCount}개</div>
        </div>
      </div>
      <div className="mt-[9px] border-t-[1px] h-[46px] flex">
        <button className="flex-center w-full gap-[4px]" onClick={handleLike}>
          <LikeIcon
            color={
              data?.data.data.isLike
                ? data?.data.data.feedTendency === SubjectType.GAEMI
                  ? "#353C49"
                  : "#2FA464"
                : undefined
            }
          />
          <div
            className={`${
              data?.data.data.isLike
                ? data?.data.data.feedTendency === SubjectType.GAEMI
                  ? "text-[#353C49]"
                  : "text-[#2FA464]"
                : "text-gray-300"
            }`}
          >
            응원해요 {data?.data.data.likeCount}개
          </div>
        </button>
        <button className="flex-center w-full">
          <CommentIcon />
        </button>
      </div>
      <div className="h-[8px] bg-[#F4F4F4]" />
      <div className="px-[20px] pt-[24px] pb-[40px] ">
        <div className="text-gray-700">댓글 {data?.data.data.commentCount}</div>
        <div className="mt-[16px]">
          {data?.data.data.commentForm &&
          data?.data.data.commentForm.length > 0 ? (
            <div className="flex-center text-gray-500">{`아직 댓글이 없어요.\n 1등으로 댓글을 남겨볼까요?`}</div>
          ) : (
            <div className="h-[120px] text-center flex-center text-gray-500 whitespace-pre">{`아직 댓글이 없어요.\n 1등으로 댓글을 남겨볼까요?`}</div>
          )}
        </div>
      </div>
      <div className="h-[8px] bg-[#F4F4F4]" />
    </div>
  );
}
