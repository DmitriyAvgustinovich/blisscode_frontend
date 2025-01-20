import { IDirection } from "types";

export type IGetAllDirectionsResponse = IDirection[];
export type TGetAllDirectionsRequest = void;

export type TGetDirectionByIdResponse = IDirection;
export interface IGetDirectionByIdRequest {
  id: number;
}

export type TAddDirectionResponse = IDirection;
export type TAddDirectionRequest = Omit<IDirection, "id">;

export type TUpdateDirectionResponse = IDirection;
export interface IUpdateDirectionRequest {
  id: number;
}

export type TDeleteDirectionResponse = void;
export interface IDeleteDirectionRequest {
  id: number;
}
