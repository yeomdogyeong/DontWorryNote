import { ApiResponse } from "@/types/apis/common";
import { FileRequest } from "..";
import { FileType } from "@/types/apis/file";

export const postFile = (type: FileType, file: any) => {
  return FileRequest.post<ApiResponse<{ path: string }>>(`/v1/file/${type}`, {
    file,
  });
};
