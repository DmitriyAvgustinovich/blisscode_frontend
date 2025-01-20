import {
  IDirectionKnowledge,
  IDirectionTopicKnowledge,
  IKnowledge,
} from "types";

// knowledge
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
// knowledge

// direction knowledge
export type TGetAllDirectiondKnowledgesResponse = IDirectionKnowledge[];
export type TGetAllDirectiondKnowledgesRequest = void;

export type TGetDirectionKnowledgeByIdResponse = IDirectionKnowledge;
export interface IGetDirectionKnowledgeByIdRequest {
  id: number;
}

export type TAddDirectionKnowledgeResponse = IDirectionKnowledge;
export type TAddDirectionKnowledgeRequest = Omit<IDirectionKnowledge, "id">;

export type TUpdateDirectionKnowledgeResponse = IDirectionKnowledge;
export interface IUpdateDirectionKnowledgeRequest {
  id: number;
}

export type TDeleteDirectionKnowledgeResponse = void;
export interface IDeleteDirectionKnowledgeRequest {
  id: number;
}
//  direction knowledge

// direction topic knowledge
export type TGetAllDirectiondTopicsKnowledgeResponse =
  IDirectionTopicKnowledge[];

export type TGetAllDirectiondTopicsKnowledgeRequest = void;

export type TGetDirectiondTopicsKnowledgeByIdResponse =
  IDirectionTopicKnowledge;

export interface IGetDirectiondTopicsKnowledgeByIdRequest {
  id: number;
}

export type TAddDirectionTopicKnowledgeResponse = IDirectionTopicKnowledge;
export type TAddDirectionTopicKnowledgeRequest = Omit<
  IDirectionTopicKnowledge,
  "id"
>;

export type TUpdateDirectionTopicKnowledgeResponse = IDirectionTopicKnowledge;
export interface IUpdateDirectionTopicKnowledgeRequest {
  id: number;
}

export type TDeleteDirectionTopicKnowledgeResponse = void;
export interface IDeleteDirectionTopicKnowledgeRequest {
  id: number;
}
// direction topic knowledge
