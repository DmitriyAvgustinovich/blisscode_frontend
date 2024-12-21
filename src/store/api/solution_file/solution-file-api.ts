import { rtkApi } from "../rtk-api";
import {
  TGetAllSolutionsFilesResponse,
  TGetAllSolutionsFilesRequest,
  TSolutionFileByUuidResponse,
  ISolutionFileByUuidRequest,
  IGetSolutionsFilesByParamsResponse,
  IGetSolutionsFilesByParamsRequest,
  TAddSolutionFileResponse,
  TAddSolutionFileRequest,
  TUpdateSolutionFileResponse,
  IUpdateSolutionFileRequest,
  TDeleteSolutionFileResponse,
  IDeleteSolutionFileRequest,
} from "./types";

const solutionFileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSolutionsFiles: build.query<
      TGetAllSolutionsFilesResponse,
      TGetAllSolutionsFilesRequest
    >({
      query: () => ({
        url: "solution-files/all-solution-files",
      }),
      providesTags: ["SolutionFile"],
    }),

    getSolutionFileByUuid: build.query<
      TSolutionFileByUuidResponse,
      ISolutionFileByUuidRequest
    >({
      query: (body) => ({
        url: `solution-files/get-solution-file-by-uuid/${body.uuid}`,
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["SolutionFile"],
    }),

    getSolutionsFilesByParams: build.query<
      IGetSolutionsFilesByParamsResponse,
      IGetSolutionsFilesByParamsRequest
    >({
      query: (body) => ({
        url: `solution-files/solutions-files-by-params?directionId=${body.directionId}&stackId=${body.stackId}&categoryId=${body.categoryId}&page=${body.page}&pageSize=${body.pageSize}`,
      }),
      providesTags: ["SolutionFile"],
    }),

    addSolutionFile: build.mutation<
      TAddSolutionFileResponse,
      TAddSolutionFileRequest
    >({
      query: (body) => ({
        url: "solution-files/create-solution-file",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["SolutionFile"],
    }),

    updateSolutionFile: build.mutation<
      TUpdateSolutionFileResponse,
      IUpdateSolutionFileRequest
    >({
      query: (body) => ({
        url: `solution-files/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["SolutionFile"],
    }),

    deleteSolutionFile: build.mutation<
      TDeleteSolutionFileResponse,
      IDeleteSolutionFileRequest
    >({
      query: (body) => ({
        url: `solution-files/${body.id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["SolutionFile"],
    }),
  }),
});

export const {
  useGetAllSolutionsFilesQuery,
  useGetSolutionFileByUuidQuery,
  useGetSolutionsFilesByParamsQuery,
  useAddSolutionFileMutation,
  useUpdateSolutionFileMutation,
  useDeleteSolutionFileMutation,
} = solutionFileApi;
