import { IDirectionCategory } from "types";

export type TGetAllDirectionCategoriesResponse = IDirectionCategory[];
export type TGetAllDirectionCategoriesRequest = void;

export type TGetDirectionCategoryByIdResponse = IDirectionCategory;
export interface IGetDirectionCategoryByIdRequest {
  id: number;
}

export type TGetDirectionCategoriesByDirectionIdAndStackIdResponse =
  IDirectionCategory[];
export interface IGetDirectionCategoriesByDirectionIdAndStackIdRequest {
  directionId: number | null;
  stackId: number | null;
}

export type TAddDirectionCategoryResponse = IDirectionCategory;
export type TAddDirectionCategoryRequest = Omit<IDirectionCategory, "id">;

export type TUpdateDirectionCategoryResponse = IDirectionCategory;
export interface IUpdateDirectionCategoryRequest {
  id: number;
}

export type TDeleteDirectionCategoryResponse = void;
export interface IDeleteDirectionCategoryRequest {
  id: number;
}
