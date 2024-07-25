import { ApiResponse } from "@/types/apis/common";
import {
  FeedItemType,
  GetFeedDetailRs,
  GetFeedRq,
  PostFeedRq,
} from "@/types/apis/feed";
import { Axios } from "..";

export const getFeeds = (rq: GetFeedRq) => {
  return Axios.get<ApiResponse<FeedItemType[]>>(`/v1/feed`, {
    params: rq,
  });
};

export const getFeed = (feedId: number) => {
  return Axios.get<ApiResponse<GetFeedDetailRs>>(`/v1/feed/${feedId}`);
};

export const deleteFeed = (feedId: number) => {
  return Axios.delete<ApiResponse<null>>(`/v1/feed/${feedId}`);
};

export const postFeedByIdLikeToggle = (feedId: number) => {
  return Axios.post<ApiResponse<null>>(`/v1/feed/${feedId}/like-toggle`);
};

export const putFeed = (feedId: number, rq: PostFeedRq) => {
  return Axios.put<ApiResponse<null>>(`/v1/feed/${feedId}`, rq);
};

export const postFeed = (rq: PostFeedRq) => {
  return Axios.post<ApiResponse<null>>(`/v1/feed`, rq);
};
