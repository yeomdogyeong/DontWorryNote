"use client";

import { getFeedComments, postFeedComment } from "@/apis/comment/comment";
import { getFeed } from "@/apis/feed/feed";
import { Header } from "@/components/Header";
import Comment from "@/components/modules/comment/Comment";
import ParentComment from "@/components/modules/comment/ParentComment";
import useMyStore from "@/store/useMyStore";
import { FeedComment } from "@/types/apis/comment";
import { SubjectType } from "@/types/common";
import { CACHE_TIME } from "@/util/common";
import { createCommentTree } from "@/util/tree";
import { valid } from "@/util/valid";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CommentPage() {
  const searchParams = useParams();
  const { userId } = useMyStore();
  const router = useRouter();

  const [comment, setComment] = useState("");

  const feedId = useMemo(
    () => (searchParams.id ? Number(searchParams.id) : undefined),
    [searchParams]
  );
  const commentId = useMemo(
    () => (searchParams.commentId ? Number(searchParams.commentId) : undefined),
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
      return createCommentTree(commentsData?.data.data as FeedComment[]).filter(
        (item: any) => commentId === item.commentId
      );
    }
    return [];
  }, [commentsData, isCommentsFetched, commentId]);

  return (
    <div className="h-max min-h-full bg-white">
      <Header leftText="댓글" />
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
      <div className="fixed z-20 bg-white bottom-0 w-full max-w-page flex-center gap-[8px] px-[23px] py-[10px] shadow-[0_-10px_10px_0px_rgba(0,0,0,0.04)]">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`border-gray-200 border-[1px] h-[40px] flex-center w-full px-[16px] py-[10px] rounded-[8px] focus:outline-none ${
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
              commentParentId: commentId,
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
