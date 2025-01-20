import { IDirectionStack } from "types";

export type TGetAllDirectionStacksResponse = IDirectionStack[];
export type TGetAllDirectionStacksRequest = void;

export type TGetDirectionStackByIdResponse = IDirectionStack;
export interface IGetDirectionStackByIdRequest {
  id: number;
}

export type TGetDirectionStackByDirectionIdResponse = IDirectionStack[];
export interface IGetDirectionStackByDirectionIdRequest {
  direction_id: number | null;
}

export type TAddDirectionStackResponse = IDirectionStack;
export type TAddDirectionStackRequest = Omit<IDirectionStack, "id">;

export type TUpdateDirectionStackResponse = IDirectionStack;
export interface IUpdateDirectionStackRequest {
  id: number;
}

export type TDeleteDirectionStackResponse = void;
export interface IDeleteDirectionStackRequest {
  id: number;
}
