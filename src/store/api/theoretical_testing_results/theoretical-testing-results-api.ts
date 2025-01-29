import { rtkApi } from "../rtk-api";
import {
  IGetTheoreticalTestResultsRequest,
  TGetTheoreticalTestResultsResponse,
} from "./types";

const theoreticalTestResultsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getTheoreticalTestResults: build.query<
      TGetTheoreticalTestResultsResponse,
      IGetTheoreticalTestResultsRequest
    >({
      query: (body) => ({
        url: `theoretical-test-results/get-test-results?resultId=${body.resultId}&authUserId=${body.authUserId}`,
      }),
      providesTags: ["TheoreticalTestingResult"],
    }),
  }),
});

export const { useGetTheoreticalTestResultsQuery } = theoreticalTestResultsApi;
