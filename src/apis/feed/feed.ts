import { ApiResponse } from "@/types/apis/common";
import { FeedItemType, GetFeedRq } from "@/types/apis/feed";
import { Axios } from "..";

export const getFeeds = (rq: GetFeedRq) => {
  return Axios.get<ApiResponse<FeedItemType[]>>(`/v1/feed`, {
    params: rq,
  });
};
