import { rtkApi } from "../rtk-api";
import { ISolutionFileByIdRequest } from "./types";

const solutionFileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSolutionFileById: build.query<Blob, ISolutionFileByIdRequest>({
      query: (body) => ({
        url: `controllers/files/${body.id}`,
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["SolutionFile"],
    }),
  }),
});

export const { useGetSolutionFileByIdQuery } = solutionFileApi;
