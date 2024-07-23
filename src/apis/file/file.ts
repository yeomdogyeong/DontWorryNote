import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { FileType } from "@/types/apis/file";

export const postFile = (type: FileType, file: string) => {
  return Axios.post<ApiResponse<string>>(`/v1/file/${type}`, {
    file,
  });
};
