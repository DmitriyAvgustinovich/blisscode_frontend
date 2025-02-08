import { rtkApi } from "../rtk-api";
import {
  IGetCvReviewResultRequest,
  IGetCvReviewResultsByHashedTelegramIdRequest,
  TGetCvReviewResultResponse,
  IGetCvReviewResultsByHashedTelegramIdResponse,
} from "./types";

const cvReviewResultApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getCvReviewResult: build.query<
      TGetCvReviewResultResponse,
      IGetCvReviewResultRequest
    >({
      query: (body) => ({
        url: `cv-review-results/get-cv-review-result?resultId=${body.resultId}&authUserId=${body.authUserId}`,
      }),
      providesTags: ["CvReviewResult"],
    }),

    getCvReviewResultsByHashedTelegramId: build.query<
      IGetCvReviewResultsByHashedTelegramIdResponse,
      IGetCvReviewResultsByHashedTelegramIdRequest
    >({
      query: (body) => ({
        url: `cv-review-results/get-cv-review-results-by-hashed-telegram-id/${body.hashedTelegramId}?page=${body.page}&pageSize=${body.pageSize}`,
      }),
      providesTags: ["CvReviewResult"],
    }),
  }),
});

export const {
  useGetCvReviewResultQuery,
  useGetCvReviewResultsByHashedTelegramIdQuery,
} = cvReviewResultApi;
