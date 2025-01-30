import { ITheoreticalTestResults } from "types";

export type TGetTheoreticalTestResultsResponse = ITheoreticalTestResults;
export interface IGetTheoreticalTestResultsRequest {
  resultId: number;
  authUserId: string;
}
