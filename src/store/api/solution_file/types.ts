import { ISolutionFileInParser } from "types";

export interface IGetAllSolutionsFilesResponse {
  data: ISolutionFileInParser[];
  totalCount: number;
}

export interface IGetAllSolutionsFilesRequest {
  page: number;
  pageSize: number;
}

export interface ISolutionFileByUuidRequest {
  uuid: string;
}

export type TSolutionFileByUuidResponse = Blob;

export type TSolutionFileByIdResponse = Blob;
export interface ISolutionFileByIdRequest {
  id: string;
}

export interface IGetSolutionsFilesByParamsResponse {
  data: ISolutionFileInParser[];
  totalCount: number;
}

export interface IGetSolutionsFilesByParamsRequest {
  directionId: number;
  stackId: number;
  categoryId: number;
  page: number;
  pageSize: number;
}

export type TAddSolutionFileResponse = ISolutionFileInParser;
export type TAddSolutionFileRequest = ISolutionFileInParser;

export type TUpdateSolutionFileResponse = ISolutionFileInParser;
export interface IUpdateSolutionFileRequest {
  id: number;
}

export type TDeleteSolutionFileResponse = void;
export interface IDeleteSolutionFileRequest {
  id: number;
}
