import { ICvReviewResult } from "types";

export type TGetCvReviewResultResponse = ICvReviewResult;
export interface IGetCvReviewResultRequest {
  resultId: number;
  authUserId: string;
}
