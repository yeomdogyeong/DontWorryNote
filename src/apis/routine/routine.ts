import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { PostRoutineRq } from "@/types/apis/routine";

export const postRoutine = (rq: PostRoutineRq) => {
  return Axios.post<ApiResponse<null>>(`/v1/routine`, {
    ...rq,
  });
};
