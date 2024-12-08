import { rtkApi } from "../rtk-api";
import {
  IDeleteDirectionRequest,
  IGetDirectionByIdRequest,
  IUpdateDirectionRequest,
  TAddDirectionRequest,
  TAddDirectionResponse,
  TDeleteDirectionResponse,
  TGetAllDirectionsRequest,
  IGetAllDirectionsResponse,
  TGetDirectionByIdResponse,
  TUpdateDirectionResponse,
} from "./types";

const directionApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDirections: build.query<
      IGetAllDirectionsResponse,
      TGetAllDirectionsRequest
    >({
      query: () => ({
        url: "direction",
      }),
      providesTags: ["Direction"],
    }),

    getDirectionById: build.query<
      TGetDirectionByIdResponse,
      IGetDirectionByIdRequest
    >({
      query: (body) => ({
        url: `direction/${body.id}`,
      }),
      providesTags: ["Direction"],
    }),

    addDirection: build.mutation<TAddDirectionResponse, TAddDirectionRequest>({
      query: (body) => ({
        url: "direction",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Direction"],
    }),

    updateDirection: build.mutation<
      TUpdateDirectionResponse,
      IUpdateDirectionRequest
    >({
      query: (body) => ({
        url: `direction/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Direction"],
    }),

    deleteDirection: build.mutation<
      TDeleteDirectionResponse,
      IDeleteDirectionRequest
    >({
      query: (body) => ({
        url: `direction/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Direction"],
    }),
  }),
});

export const {
  useGetAllDirectionsQuery,
  useGetDirectionByIdQuery,
  useAddDirectionMutation,
  useUpdateDirectionMutation,
  useDeleteDirectionMutation,
} = directionApi;
