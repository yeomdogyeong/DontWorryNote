import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { FeedComment, PostFeedCommentRq } from "@/types/apis/comment";

export const postFeedComment = (feedId: number, rq: PostFeedCommentRq) => {
  return Axios.post<ApiResponse<null>>(`/v1/feed/${feedId}/comment`, rq);
};

export const putFeedComment = (
  feedId: number,
  commentId: number,
  rq: PostFeedCommentRq
) => {
  return Axios.put<ApiResponse<null>>(`/v1/feed/${feedId}/${commentId}`, rq);
};

export const deleteFeedComment = (feedId: number, commentId: number) => {
  return Axios.delete<ApiResponse<null>>(
    `/v1/feed/${feedId}/${commentId}/like-toggle`
  );
};

export const postFeedByIdCommentLikeToggle = (
  feedId: number,
  commentId: number
) => {
  return Axios.post<ApiResponse<null>>(
    `/v1/feed/${feedId}/${commentId}/like-toggle`
  );
};

export const getFeedComments = (feedId: number) => {
  return Axios.get<ApiResponse<FeedComment[]>>(`/v1/feed/${feedId}/comments`);
};
