"use client";

import { getFeedComments, postFeedComment } from "@/apis/comment/comment";
import { deleteFeed, getFeed, postFeedByIdLikeToggle } from "@/apis/feed/feed";
import { Header } from "@/components/Header";
import CommentIcon from "@/components/icon/CommentIcon";
import LikeIcon from "@/components/icon/LikeIcon";
import MoreIcon from "@/components/icon/MoreIcon";
import Comment from "@/components/modules/comment/Comment";
import ParentComment from "@/components/modules/comment/ParentComment";
import { useActionSheetOverlay } from "@/components/overlay/actionSheet/ActionSheetOverlay";
import { FEED_PATH } from "@/store/path";
import useMyStore from "@/store/useMyStore";
import { FeedComment } from "@/types/apis/comment";
import { PostType, SubjectType, convertPostTypeValue } from "@/types/common";
import { CACHE_TIME } from "@/util/common";
import { formatTimeDifference } from "@/util/date";
import { createCommentTree } from "@/util/tree";
import { valid } from "@/util/valid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function FeedDetailPage() {
  const searchParams = useParams();
  const { userId } = useMyStore();
  const router = useRouter();

  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const feedId = useMemo(
    () => (searchParams.id ? Number(searchParams.id) : undefined),
    [searchParams]
  );
  const queryKey = useMemo(() => ["getFeed", feedId], [feedId]);

  const { data, isFetched, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: () => getFeed(feedId as number),
    gcTime: CACHE_TIME,
    enabled: valid(feedId),
  });

  const {
    data: commentsData,
    isFetched: isCommentsFetched,
    refetch: commentRefetch,
  } = useQuery({
    queryKey: ["getFeedComments", feedId],
    queryFn: () => getFeedComments(feedId as number),
    gcTime: CACHE_TIME,
    enabled: valid(feedId),
  });

  const commentTree = useMemo(() => {
    if (isCommentsFetched) {
      console.log(commentsData);
      return createCommentTree(commentsData?.data.data as FeedComment[]);
    }
    return [];
  }, [commentsData, isCommentsFetched]);

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
  }, [feedId, active, router]);

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
  }, [feedId, data, queryKey, queryClient]);

  if (!isFetched) {
    return <></>;
  }

  return (
    <div className="h-max min-h-full bg-white">
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
            className="rounded-full"
            style={{ height: 32 }}
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
      {commentTree.length > 0 ? (
        <div className="pb-[52px]">
          {commentTree.map((item: FeedComment, idx: number) => {
            return (
              <div
                key={item.commentId}
                className={`py-[24px] ${
                  idx !== 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <ParentComment
                  {...item}
                  onChange={() => {
                    commentRefetch();
                  }}
                  feedId={feedId as number}
                  tendency={data?.data.data.feedTendency as SubjectType}
                />
                {item.children?.map((replyComment) => (
                  <Comment
                    key={replyComment.commentId}
                    {...replyComment}
                    onChange={() => {
                      commentRefetch();
                    }}
                    feedId={feedId as number}
                    tendency={data?.data.data.feedTendency as SubjectType}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-[20px] h-[120px] text-center flex-center text-gray-500 whitespace-pre">{`아직 댓글이 없어요.\n 1등으로 댓글을 남겨볼까요?`}</div>
      )}
      <div className="h-[8px] bg-[#F4F4F4]" />
      <div className="fixed z-20 bg-white bottom-0 w-full max-w-page flex-center gap-[8px] px-[23px] py-[10px] shadow-[0_-10px_10px_0px_rgba(0,0,0,0.04)]">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`border-gray-200 border-[1px] flex-center w-full px-[16px] py-[10px] rounded-[8px] focus:outline-none ${
            data?.data.data.tendency === SubjectType.BAEZZANGE
              ? "focus:border-mainGreen"
              : "focus:border-mainBlack"
          }`}
          placeholder="댓글을 작성해보세요"
        />
        <button
          className={`shrink-0 rounded-[8px] w-[60px] flex-center h-[40px] text-white ${
            data?.data.data.tendency === SubjectType.BAEZZANGE
              ? "bg-mainGreen"
              : "bg-mainBlack"
          }`}
          onClick={async () => {
            await postFeedComment(feedId as number, {
              commentContent: comment,
            });
            setComment("");
            refetch();
            commentRefetch();
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
}
