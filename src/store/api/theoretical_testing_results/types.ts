import { ITheoreticalTestResults } from "types";

export type TGetTheoreticalTestResultsResponse = ITheoreticalTestResults;
export interface IGetTheoreticalTestResultsRequest {
  resultId: number;
  authUserId: string;
}

export interface IGetTestResultsByHashedTelegramIdResponse {
  data: ITheoreticalTestResults[];
  totalCount: number;
}

export interface IGetTestResultsByHashedTelegramIdRequest {
  hashedTelegramId: string;
  page: number;
  pageSize: number;
}
