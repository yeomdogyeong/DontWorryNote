import { SubjectType } from "../common";

export interface GetUserMyInfoRs {
  userId: number;
  nickname: string;
  profileImagePath: string;
  tendency: SubjectType;
  wannabe: string;
}
