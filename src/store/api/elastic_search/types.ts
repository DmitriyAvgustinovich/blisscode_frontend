import { IKnowledge, ISolutionFile } from "types";

export interface ISearchSolutionsFilesRequest {
  searchQuery: string;
}

export interface ISearchSolutionsFilesResponse {
  data: ISolutionFile[];
  totalCount: number;
}

export interface ISearchKnowledgeRequest {
  searchQuery: string;
}

export interface ISearchKnowledgeResponse {
  data: IKnowledge[];
  totalCount: number;
}
