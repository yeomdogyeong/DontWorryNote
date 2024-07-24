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
}

export interface GetFeedRq {
  tendency: SubjectType;
  category?: PostType;
  searchText?: string;
}
