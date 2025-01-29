import { ITheoreticalTestingQuestion } from "types";

export interface IGetAllQuestionsResponse {
  data: ITheoreticalTestingQuestion[];
  totalCount: number;
}

export interface IGetAllQuestionsRequest {
  page: number;
  pageSize: number;
}

export type TCreateQuestionResponse = ITheoreticalTestingQuestion;
export type TCreateQuestionRequest = ITheoreticalTestingQuestion;

export type TUpdateQuestionResponse = ITheoreticalTestingQuestion;
export interface IUpdateQuestionRequest {
  id: number;
}

export type TDeleteQuestionResponse = void;
export interface IDeleteQuestionRequest {
  id: number;
}
