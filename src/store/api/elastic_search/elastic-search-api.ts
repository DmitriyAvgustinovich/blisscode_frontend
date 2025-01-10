import { rtkApi } from "../rtk-api";
import {
  ISearchKnowledgeRequest,
  ISearchKnowledgeResponse,
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
        url: "elastic-search/search-solution-files",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SolutionFile"],
    }),

    searchKnowledges: build.mutation<
      ISearchKnowledgeResponse,
      ISearchKnowledgeRequest
    >({
      query: (body) => ({
        url: "elastic-search/search-knowledge",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Knowledge"],
    }),
  }),
});

export const { useSearchSolutionFilesMutation, useSearchKnowledgesMutation } =
  elasticSearchApi;
