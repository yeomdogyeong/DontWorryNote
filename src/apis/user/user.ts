import { ApiResponse } from "@/types/apis/common";
import { Axios } from "..";
import { GetUserMyInfoRs } from "@/types/apis/user";

export const getUserMyInfo = () => {
  return Axios.get<ApiResponse<GetUserMyInfoRs>>(`/v1/user/my-info`);
};

export const postUserOnboarding = (formData: any) => {
  return Axios.post<ApiResponse<null>>(`/v1/user/onboarding`, { ...formData });
};
