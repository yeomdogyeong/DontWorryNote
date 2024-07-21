import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { FeedItemType, GetFeedRq } from "@/types/apis/feed";

export const getFeeds = (rq: GetFeedRq) => {
  return Axios.get<ApiResponse<FeedItemType[]>>(`/v1/feed`, {
    params: rq,
  });
};
