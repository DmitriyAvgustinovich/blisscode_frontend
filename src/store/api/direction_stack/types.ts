import { IDirectionStack } from "types/IDirectionStack";

export type TGetAllDirectionStacksResponse = IDirectionStack[];
export type TGetAllDirectionStacksRequest = void;

export type TGetDirectionStackByIdResponse = IDirectionStack;
export interface IGetDirectionStackByIdRequest {
  id: number;
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
