import { IKnowledge } from "types/IKnowledge";

export interface IGetAllKnowledgesResponse {
  data: IKnowledge[];
  totalCount: number;
}

export interface IGetAllKnowledgesRequest {
  page: number;
  pageSize: number;
}

export type TGetKnowledgeByIdResponse = IKnowledge;
export interface IGetKnowledgeByIdRequest {
  id: number;
}

export type TGetKnowledgesByDirectionIdResponse = IKnowledge[];
export interface IGetKnowledgesByDirectionIdRequest {
  direction_id: number | null;
}

export type TAddKnowledgeResponse = IKnowledge;
export type TAddKnowledgeRequest = Omit<IKnowledge, "id">;

export type TUpdateKnowledgeResponse = IKnowledge;
export interface IUpdateKnowledgeRequest {
  id: number;
}

export type TDeleteKnowledgeResponse = void;
export interface IDeleteKnowledgeRequest {
  id: number;
}
