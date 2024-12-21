import { ISolutionFile } from "types/ISolutionFile";

export interface ISearchSolutionsFilesRequest {
  searchQuery: string;
}

export interface ISearchSolutionsFilesResponse {
  hits: ISolutionFile[];
  total: number;
}
