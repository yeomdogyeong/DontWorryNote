import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { PostRoutineRq } from "@/types/apis/routine";

export const postRoutine = (rq: PostRoutineRq) => {
  return Axios.post<ApiResponse<null>>(`/v1/routine`, {
    ...rq,
  });
};

export const putRoutine = (routineId: number, rq: PostRoutineRq) => {
  return Axios.put<ApiResponse<null>>(`/v1/routine/${routineId}`, {
    ...rq,
  });
};

export const deleteRoutine = (routineId: number) => {
  return Axios.delete<ApiResponse<null>>(`/v1/routine/${routineId}`);
};

export const getRoutine = (routineId: number) => {
  return Axios.get<ApiResponse<null>>(`/v1/routine/${routineId}`);
};

export const getRoutines = (startDate: string, endDate: string) => {
  return Axios.get<ApiResponse<null>>(`/v1/routine`, {
    params: { startDate, endDate },
  });
};
