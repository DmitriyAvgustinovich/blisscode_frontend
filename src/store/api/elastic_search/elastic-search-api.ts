import { rtkApi } from "../rtk-api";
import {
  ISearchSolutionsFilesRequest,
  ISearchSolutionsFilesResponse,
} from "./types";

const elasticSearchApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    searchSolutionFiles: build.mutation<
      ISearchSolutionsFilesResponse,
      ISearchSolutionsFilesRequest
    >({
      query: (body) => ({
        url: "elastic-search/search",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SolutionFile"],
    }),
  }),
});

export const { useSearchSolutionFilesMutation } = elasticSearchApi;
