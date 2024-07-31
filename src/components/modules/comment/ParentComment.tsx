import {
  deleteFeedComment,
  postFeedByIdCommentLikeToggle,
} from "@/apis/comment/comment";
import CommentIcon from "@/components/icon/CommentIcon";
import LikeIcon from "@/components/icon/LikeIcon";
import MoreIcon from "@/components/icon/MoreIcon";
import { useActionSheetOverlay } from "@/components/overlay/actionSheet/ActionSheetOverlay";
import { useAlertOverlay } from "@/components/overlay/alert/AlertOverlay";
import useMyStore from "@/store/useMyStore";
import { FeedComment } from "@/types/apis/comment";
import { SubjectType } from "@/types/common";
import { formatTimeDifference } from "@/util/date";
import Image from "next/image";
import { useCallback, useMemo } from "react";

interface Props extends FeedComment {
  onChange(): void;
  feedId: number;
  tendency: SubjectType;
}

export default function ParentComment(props: Props) {
  const {
    profileImagePath,
    nickname,
    commentCreatedAt,
    userId,
    commentLikeCount,
    commentContent,
    isCommentLike,
    commentId,
    feedId,
    tendency,

    onChange,
  } = props;

  const { active } = useActionSheetOverlay();
  const { active: alertActive } = useAlertOverlay();

  const handleMoreIconClick = useCallback(() => {
    active({
      list: [
        {
          title: "댓글 편집",
          onClick: async () => {
            // router.push(`/routine/${routineId}/edit`);
          },
        },
        {
          title: "댓글 삭제",
          className: "text-negative",
          onClick: async () => {
            alertActive({
              contents: "루틴을 정말 삭제할까요?",
              confirmText: "삭제",
              onConfirm: async () => {
                await deleteFeedComment(feedId, commentId);
                onChange();
              },
            });
          },
        },
        {
          title: "취소",
          onClick: async () => {},
        },
      ],
    });
  }, [active]);

  const handleLike = useCallback(async () => {
    await postFeedByIdCommentLikeToggle(feedId, commentId);
    await onChange();
  }, [feedId, commentId]);

  const handleCommentClick = useCallback(() => {}, []);

  const myId = useMyStore((state) => state.userId);
  const isMine = useMemo(() => userId === myId, [myId, userId]);

  return (
    <div className="w-full px-[20px]">
      <div className="w-full flex h-[37px]">
        <Image
          className="rounded-full"
          style={{ height: 32 }}
          src={profileImagePath}
          alt="comment-profile"
          width={32}
          height={32}
        />
        <div className="ml-[12px]">
          <div className="font-[600]">{nickname}</div>
          <div className="text-[12px] text-gray-500">
            {formatTimeDifference(commentCreatedAt)}
          </div>
        </div>
        {isMine && (
          <button
            className="ml-auto flex items-start"
            onClick={handleMoreIconClick}
          >
            <MoreIcon color="#999999" />
          </button>
        )}
      </div>
      <div className="mt-[8px] ml-[44px]">
        <div className="text-gray-800 font-[400]">{commentContent}</div>
        <div className="flex mt-[16px] text-[12px] font-[400]">
          <button className="flex" onClick={handleLike}>
            <LikeIcon
              size={16}
              color={
                isCommentLike
                  ? tendency === SubjectType.GAEMI
                    ? "#353C49"
                    : "#2FA464"
                  : undefined
              }
            />
            <div
              className={`ml-[4px] ${
                isCommentLike
                  ? tendency === SubjectType.GAEMI
                    ? "text-[#353C49]"
                    : "text-[#2FA464]"
                  : "text-[#999999]"
              }`}
            >
              좋아요 {commentLikeCount}
            </div>
          </button>
          <button className="flex ml-[12px]" onClick={handleCommentClick}>
            <CommentIcon size={16} />
            <div className="ml-[4px] text-gray-500">답글달기</div>
          </button>
        </div>
      </div>
    </div>
  );
}
