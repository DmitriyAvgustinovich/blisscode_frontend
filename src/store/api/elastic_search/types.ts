import { IKnowledge, ISolutionFile, ITheoreticalTestingQuestion } from "types";

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

export interface ISearchTheoreticalQuestionsResponse {
  data: ITheoreticalTestingQuestion[];
  totalCount: number;
}

export interface ISearchTheoreticalQuestionsRequest {
  searchQuery: string;
}
