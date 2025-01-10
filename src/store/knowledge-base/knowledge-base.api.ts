import { rtkApi } from "store/api/rtk-api";

import {
  IDeleteKnowledgeRequest,
  IGetKnowledgeByIdRequest,
  IUpdateKnowledgeRequest,
  TAddKnowledgeRequest,
  TAddKnowledgeResponse,
  TDeleteKnowledgeResponse,
  IGetAllKnowledgesRequest,
  IGetAllKnowledgesResponse,
  TGetKnowledgeByIdResponse,
  TUpdateKnowledgeResponse,
} from "./types";

const knowledgeBaseApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllKnowledges: build.query<
      IGetAllKnowledgesResponse,
      IGetAllKnowledgesRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/all-knowledges?page=${body.page}&pageSize=${body.pageSize}`,
      }),
      providesTags: ["Knowledge"],
    }),

    getKnowledgeById: build.query<
      TGetKnowledgeByIdResponse,
      IGetKnowledgeByIdRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/get-knowledge-by-id/${body.id}`,
      }),
      providesTags: ["Knowledge"],
    }),

    addKnowledge: build.mutation<TAddKnowledgeResponse, TAddKnowledgeRequest>({
      query: (body) => ({
        url: "/knowledge-base/create-knowledge",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Knowledge"],
    }),

    updateKnowledge: build.mutation<
      TUpdateKnowledgeResponse,
      IUpdateKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Knowledge"],
    }),

    deleteKnowledge: build.mutation<
      TDeleteKnowledgeResponse,
      IDeleteKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Knowledge"],
    }),
  }),
});

export const {
  useGetAllKnowledgesQuery,
  useGetKnowledgeByIdQuery,
  useAddKnowledgeMutation,
  useUpdateKnowledgeMutation,
  useDeleteKnowledgeMutation,
} = knowledgeBaseApi;
