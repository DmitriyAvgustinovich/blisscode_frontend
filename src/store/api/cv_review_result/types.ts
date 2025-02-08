import { ICvReviewResult } from "types";

export type TGetCvReviewResultResponse = ICvReviewResult;
export interface IGetCvReviewResultRequest {
  resultId: number;
  authUserId: string;
}

export interface IGetCvReviewResultsByHashedTelegramIdResponse {
  data: ICvReviewResult[];
  totalCount: number;
}

export interface IGetCvReviewResultsByHashedTelegramIdRequest {
  hashedTelegramId: string;
  page: number;
  pageSize: number;
}
