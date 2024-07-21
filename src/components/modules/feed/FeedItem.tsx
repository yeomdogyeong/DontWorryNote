import { FeedItemType } from "@/types/apis/feed";
import { SubjectType, convertPostTypeValue } from "@/types/common";
import { formatTimeDifference } from "@/util/date";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

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
  } = props;

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

  return (
    <div className="bg-white px-[20px] pt-[28px] pb-[8px] shadow-[0_4px_10px_0px_rgba(0,40,100,0.06)]">
      <div className="flex h-[37px]">
        <Image
          src={profileImagePath}
          width={32}
          height={32}
          alt="profile_image"
        />
        <div className="ml-[12px]">
          <div className="font-[600]">{nickname}</div>
          {/* <div>{formatTimeDifference()}</div> */}
        </div>
        <div
          className={`ml-auto flex-center w-[72px] h-[30px] rounded-[80px] ${
            type === SubjectType.BAEJJANGE
              ? "text-mainBlack bg-subBlack"
              : "text-mainGreen bg-subGreen"
          }`}
        >
          {convertPostTypeValue(category)}
        </div>
      </div>
      <div className="mt-[16px]">{feedContent}</div>
      <div className="mt-[16px]">
        <Image
          src={feedImagePath}
          alt="feed-image"
          style={{ width: "100%", height: "auto" }} // optional
        />
      </div>
      <div className="text-[12px] text-gray-600">
        <div>{likeText}</div>
        <div>댓글 {feedCommentCount}개</div>
      </div>
    </div>
  );
}
