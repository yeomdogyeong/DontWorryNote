import CommentIcon from "@/components/icon/CommentIcon";
import LikeIcon from "@/components/icon/LikeIcon";
import { FEED_PATH } from "@/store/path";
import { FeedItemType } from "@/types/apis/feed";
import { SubjectType, convertPostTypeValue } from "@/types/common";
import { formatTimeDifference } from "@/util/date";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Props extends FeedItemType {}

export default function FeedItem(props: Props) {
  const {
    profileImagePath,
    nickname,
    feedContent,
    feedImagePath,
    feedCommentCount,
    feedLikeCount,
    category,
    feedCreatedAt,
  } = props;

  const router = useRouter();

  const searchParams = useSearchParams();
  const type = useMemo(
    () => searchParams.get("type"),
    [searchParams]
  ) as SubjectType;

  const likeText = useMemo(() => {
    if (feedLikeCount > 0) {
      return feedLikeCount + "명이 응원했어요!";
    }
    return "처음으로 응원해보세요!";
  }, [feedLikeCount]);

  const handleLike = useCallback(() => {}, []);

  const handleComment = useCallback(() => {
    router.push(FEED_PATH);
  }, []);

  return (
    <div className="bg-white rounded-[12px] px-[20px] pt-[28px] pb-[8px] shadow-[0_4px_10px_0px_rgba(0,40,100,0.06)]">
      <div className="flex h-[37px]">
        <Image
          src={profileImagePath}
          width={32}
          height={32}
          alt="profile_image"
        />
        <div className="ml-[12px]">
          <div className="font-[600]">{nickname}</div>
          <div className="text-[12px] text-gray-500">
            {formatTimeDifference(feedCreatedAt)}
          </div>
        </div>
        <div
          className={`ml-auto flex-center w-[72px] h-[30px] rounded-[80px] ${
            type === SubjectType.GAEMI
              ? "text-mainBlack bg-subBlack"
              : "text-mainGreen bg-subGreen"
          }`}
        >
          {convertPostTypeValue(category)}
        </div>
      </div>
      <div className="mt-[16px]">{feedContent}</div>
      <div className="mt-[16px] w-full h-[200px] relative">
        <Image
          className="rounded-[8px]"
          src={feedImagePath}
          alt="feed-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-[24px] flex items-center text-[12px] font-[400] text-gray-600">
        <div>{likeText}</div>
        <div className="ml-auto">댓글 {feedCommentCount}개</div>
      </div>
      <div className="mt-[9px] border-t-[1px] h-[46px] flex">
        <button className="flex-center w-full" onClick={handleLike}>
          <LikeIcon />
        </button>
        <button className="flex-center w-full" onClick={handleComment}>
          <CommentIcon />
        </button>
      </div>
    </div>
  );
}
