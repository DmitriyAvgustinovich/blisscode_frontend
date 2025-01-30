import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: [
    "SolutionFile",
    "Direction",
    "DirectionStack",
    "DirectionCategory",
    "User",
    "Knowledge",
    "DirectionKnowledge",
    "DirectionTopicKnowledge",
    "TheoreticalTestingQuestion",
    "TheoreticalTestingResult",
    "CvReviewResult",
  ],
  endpoints: () => ({}),
});
