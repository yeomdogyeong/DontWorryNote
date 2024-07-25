import { PostType, SubjectType } from "../common";

export interface FeedItemType {
  userId: string;
  nickname: string;
  tendency: SubjectType;
  category: PostType;
  profileImagePath: string;
  feedContent: string;
  feedImagePath: string;
  feedLikeCount: number;
  feedCommentCount: number;
  feedCreatedAt: string;
  feedId: number;
  isLike: boolean;
}

export interface GetFeedDetailRs {
  userId: number;
  nickname: string;
  profileImagePath: string;
  feedContent: string;
  createdAt: string;
  feedImagePath: string;
  isLike: boolean;
  feedTendency: SubjectType;
  category: PostType;
  likeCount: number;
  commentCount: number;
  tendency: SubjectType;
  commentForm?: {
    commentParentId: number;
    commentContent: string;
  }[];
}

export interface GetFeedRq {
  tendency: SubjectType;
  category?: PostType;
  searchText?: string;
}

export interface PostFeedRq {
  tendency: SubjectType;
  category: PostType;
  content: string;
  feedImagePath: string;
}
