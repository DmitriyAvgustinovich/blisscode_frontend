import { ITheoreticalTestResults } from "types/ITheoreticalTestingQuestion";

export type TGetTheoreticalTestResultsResponse = ITheoreticalTestResults;
export interface IGetTheoreticalTestResultsRequest {
  resultId: number;
  authUserId: string;
}
