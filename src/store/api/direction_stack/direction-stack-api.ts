import { rtkApi } from "../rtk-api";
import {
  IDeleteDirectionStackRequest,
  IGetDirectionStackByIdRequest,
  IUpdateDirectionStackRequest,
  TAddDirectionStackRequest,
  TAddDirectionStackResponse,
  TDeleteDirectionStackResponse,
  TGetAllDirectionStacksRequest,
  TGetAllDirectionStacksResponse,
  TGetDirectionStackByIdResponse,
  TUpdateDirectionStackResponse,
} from "./types";

const directionApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDirectionsStacks: build.query<
      TGetAllDirectionStacksResponse,
      TGetAllDirectionStacksRequest
    >({
      query: () => ({
        url: "direction-stack",
      }),
      providesTags: ["DirectionStack"],
    }),

    getDirectionStackById: build.query<
      TGetDirectionStackByIdResponse,
      IGetDirectionStackByIdRequest
    >({
      query: (body) => ({
        url: `direction-stack/${body.id}`,
      }),
      providesTags: ["DirectionStack"],
    }),

    addDirectionStack: build.mutation<
      TAddDirectionStackResponse,
      TAddDirectionStackRequest
    >({
      query: (body) => ({
        url: "direction-stack",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DirectionStack"],
    }),

    updateDirectionStack: build.mutation<
      TUpdateDirectionStackResponse,
      IUpdateDirectionStackRequest
    >({
      query: (body) => ({
        url: `direction-stack/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DirectionStack"],
    }),

    deleteDirectionStack: build.mutation<
      TDeleteDirectionStackResponse,
      IDeleteDirectionStackRequest
    >({
      query: (body) => ({
        url: `direction-stack/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DirectionStack"],
    }),
  }),
});

export const {
  useGetAllDirectionsStacksQuery,
  useGetDirectionStackByIdQuery,
  useAddDirectionStackMutation,
  useUpdateDirectionStackMutation,
  useDeleteDirectionStackMutation,
} = directionApi;
