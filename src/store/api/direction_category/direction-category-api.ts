import { rtkApi } from "../rtk-api";
import {
  IDeleteDirectionCategoryRequest,
  IGetDirectionCategoryByIdRequest,
  IUpdateDirectionCategoryRequest,
  TAddDirectionCategoryRequest,
  TAddDirectionCategoryResponse,
  TDeleteDirectionCategoryResponse,
  TGetAllDirectionCategoriesRequest,
  TGetAllDirectionCategoriesResponse,
  TGetDirectionCategoryByIdResponse,
  TUpdateDirectionCategoryResponse,
} from "./types";

const directionCategoryApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDirectionCategories: build.query<
      TGetAllDirectionCategoriesResponse,
      TGetAllDirectionCategoriesRequest
    >({
      query: () => ({
        url: "direction-category",
      }),
      providesTags: ["DirectionCategory"],
    }),

    getDirectionCategoryById: build.query<
      TGetDirectionCategoryByIdResponse,
      IGetDirectionCategoryByIdRequest
    >({
      query: (body) => ({
        url: `direction-category/${body.id}`,
      }),
      providesTags: ["DirectionCategory"],
    }),

    addDirectionCategory: build.mutation<
      TAddDirectionCategoryResponse,
      TAddDirectionCategoryRequest
    >({
      query: (body) => ({
        url: "direction-category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DirectionCategory"],
    }),

    updateDirectionCategory: build.mutation<
      TUpdateDirectionCategoryResponse,
      IUpdateDirectionCategoryRequest
    >({
      query: (body) => ({
        url: `direction-category/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DirectionCategory"],
    }),

    deleteDirectionCategory: build.mutation<
      TDeleteDirectionCategoryResponse,
      IDeleteDirectionCategoryRequest
    >({
      query: (body) => ({
        url: `direction-category/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DirectionCategory"],
    }),
  }),
});

export const {
  useGetAllDirectionCategoriesQuery,
  useGetDirectionCategoryByIdQuery,
  useAddDirectionCategoryMutation,
  useUpdateDirectionCategoryMutation,
  useDeleteDirectionCategoryMutation,
} = directionCategoryApi;
