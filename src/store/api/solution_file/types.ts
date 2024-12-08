import { ISolutionFile } from "types";

export type TGetAllSolutionsFilesResponse = ISolutionFile[];
export type TGetAllSolutionsFilesRequest = void;

export interface ISolutionFileByUuidRequest {
  uuid: string;
}

export type TSolutionFileByUuidResponse = Blob;

export type TSolutionFileByIdResponse = Blob;
export interface ISolutionFileByIdRequest {
  id: string;
}

export interface IGetSolutionsFilesByParamsResponse {
  data: ISolutionFile[];
  totalCount: number;
}

export interface IGetSolutionsFilesByParamsRequest {
  directionId: number;
  stackId: number;
  categoryId: number;
  page: number;
  pageSize: number;
}

export type TAddSolutionFileResponse = ISolutionFile;
export type TAddSolutionFileRequest = ISolutionFile;

export type TUpdateSolutionFileResponse = ISolutionFile;
export interface IUpdateSolutionFileRequest {
  id: number;
}

export type TDeleteSolutionFileResponse = void;
export interface IDeleteSolutionFileRequest {
  id: number;
}
