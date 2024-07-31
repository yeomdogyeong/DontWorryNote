export interface PostFeedCommentRq {
  commentParentId?: number;
  commentContent: string;
}

export interface FeedComment {
  userId: number;
  parentCommentId?: number;
  commentId: number;
  nickname: string;
  profileImagePath: string;
  commentContent: string;
  commentCreatedAt: string;
  commentLikeCount: number;
  isCommentLike: boolean;

  children?: FeedComment[];
}
