import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import {
  RoutineExecution,
  RoutineExecutionCount,
} from "@/types/apis/routineExecution";

export const postRoutineExecution = (routineId: number, targetDate: string) => {
  return Axios.post<ApiResponse<null>>(
    `/v1/routine-execution/${routineId}?targetDate=${targetDate}`
  );
};

export const deleteRoutineExecution = (
  routineId: number,
  targetDate: string
) => {
  return Axios.delete<ApiResponse<null>>(
    `/v1/routine-execution/${routineId}?targetDate=${targetDate}`
  );
};

export const getRoutineExecution = (from: string, to: string) => {
  console.log(from, to);
  return Axios.get<ApiResponse<RoutineExecution[]>>(`/v1/routine-execution`, {
    params: { from, to },
  });
};

export const getRoutineExecutionCount = (from: string, to: string) => {
  return Axios.get<ApiResponse<RoutineExecutionCount>>(
    `/v1/routine-execution/count`,
    {
      params: { from, to },
    }
  );
};
