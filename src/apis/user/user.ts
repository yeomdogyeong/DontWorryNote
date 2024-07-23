import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { GetUserMyInfoRs } from "@/types/apis/user";
import { headers } from "next/headers";

export const getUserMyInfo = () => {
  return Axios.get<ApiResponse<GetUserMyInfoRs>>(`/v1/user/my-info`);
};

export const postUserOnboarding = (formData: FormData) => {
  return Axios.post<ApiResponse<null>>(`/v1/user/onboarding`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
