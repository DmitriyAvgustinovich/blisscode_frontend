import { ISolutionFile } from "types/ISolutionFile";

export interface ISearchSolutionsFilesRequest {
  searchQuery: string;
}

export interface ISearchSolutionsFilesResponse {
  data: ISolutionFile[];
  totalCount: number;
}
