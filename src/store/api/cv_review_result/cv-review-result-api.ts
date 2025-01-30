import { rtkApi } from "../rtk-api";
import { IGetCvReviewResultRequest, TGetCvReviewResultResponse } from "./types";

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
  }),
});

export const { useGetCvReviewResultQuery } = cvReviewResultApi;
