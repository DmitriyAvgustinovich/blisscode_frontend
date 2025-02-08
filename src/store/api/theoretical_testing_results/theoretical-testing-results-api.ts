import { rtkApi } from "../rtk-api";
import {
  IGetTestResultsByHashedTelegramIdRequest,
  IGetTheoreticalTestResultsRequest,
  IGetTestResultsByHashedTelegramIdResponse,
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

    getTestResultsByHashedTelegramId: build.query<
      IGetTestResultsByHashedTelegramIdResponse,
      IGetTestResultsByHashedTelegramIdRequest
    >({
      query: (body) => ({
        url: `theoretical-test-results/get-test-results-by-hashed-telegram-id/${body.hashedTelegramId}?page=${body.page}&limit=${body.pageSize}`,
      }),
      providesTags: ["TheoreticalTestingResult"],
    }),
  }),
});

export const {
  useGetTheoreticalTestResultsQuery,
  useGetTestResultsByHashedTelegramIdQuery,
} = theoreticalTestResultsApi;
