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
  TGetAllDirectiondKnowledgesResponse,
  TGetAllDirectiondKnowledgesRequest,
  TAddDirectionKnowledgeResponse,
  TAddDirectionKnowledgeRequest,
  TUpdateDirectionKnowledgeResponse,
  IUpdateDirectionKnowledgeRequest,
  TDeleteDirectionKnowledgeResponse,
  IDeleteDirectionKnowledgeRequest,
  TAddDirectionTopicKnowledgeResponse,
  TAddDirectionTopicKnowledgeRequest,
  TDeleteDirectionTopicKnowledgeResponse,
  IDeleteDirectionTopicKnowledgeRequest,
  TUpdateDirectionTopicKnowledgeResponse,
  IUpdateDirectionTopicKnowledgeRequest,
  TGetAllDirectiondTopicsKnowledgeResponse,
  TGetAllDirectiondTopicsKnowledgeRequest,
  TGetDirectionKnowledgeByIdResponse,
  IGetDirectionKnowledgeByIdRequest,
  TGetDirectiondTopicsKnowledgeByIdResponse,
  IGetDirectiondTopicsKnowledgeByIdRequest,
} from "./types";

const knowledgeBaseApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // knowledge
    getAllKnowledges: build.query<
      IGetAllKnowledgesResponse,
      IGetAllKnowledgesRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/get-all-knowledges?page=${body.page}&pageSize=${body.pageSize}`,
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
        url: `/knowledge-base/update-knowledge/${body.id}`,
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
        url: `/knowledge-base/delete-knowledge/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Knowledge"],
    }),
    // knowledge

    // direction knowledge
    getAllDirectionKnowledges: build.query<
      TGetAllDirectiondKnowledgesResponse,
      TGetAllDirectiondKnowledgesRequest
    >({
      query: () => ({
        url: `/knowledge-base/get-all-direction-knowledges`,
      }),
      providesTags: ["DirectionKnowledge"],
    }),

    getDirectionKnowledgeById: build.query<
      TGetDirectionKnowledgeByIdResponse,
      IGetDirectionKnowledgeByIdRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/get-direction-knowledge-by-id/${body.id}`,
      }),
      providesTags: ["DirectionKnowledge"],
    }),

    addDirectionKnowledge: build.mutation<
      TAddDirectionKnowledgeResponse,
      TAddDirectionKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/create-direction-knowledge`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["DirectionKnowledge"],
    }),

    updateDirectionKnowledge: build.mutation<
      TUpdateDirectionKnowledgeResponse,
      IUpdateDirectionKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/update-direction-knowledge/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DirectionKnowledge"],
    }),

    deleteDirectionKnowledge: build.mutation<
      TDeleteDirectionKnowledgeResponse,
      IDeleteDirectionKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/delete-direction-knowledge/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DirectionKnowledge"],
    }),
    // direction knowledge

    // direction topic knowledge
    getAllDirectionTopicsKnowledge: build.query<
      TGetAllDirectiondTopicsKnowledgeResponse,
      TGetAllDirectiondTopicsKnowledgeRequest
    >({
      query: () => ({
        url: `/knowledge-base/get-all-direction-topics-knowledge`,
      }),
      providesTags: ["DirectionTopicKnowledge"],
    }),

    getDirectionTopicKnowledgeById: build.query<
      TGetDirectiondTopicsKnowledgeByIdResponse,
      IGetDirectiondTopicsKnowledgeByIdRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/get-direction-topic-knowledge-by-id/${body.id}`,
      }),
      providesTags: ["DirectionTopicKnowledge"],
    }),

    addDirectionTopicKnowledge: build.mutation<
      TAddDirectionTopicKnowledgeResponse,
      TAddDirectionTopicKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/create-direction-topic-knowledge`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["DirectionTopicKnowledge"],
    }),

    updateDirectionTopicKnowledge: build.mutation<
      TUpdateDirectionTopicKnowledgeResponse,
      IUpdateDirectionTopicKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/update-direction-topic-knowledge/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DirectionTopicKnowledge"],
    }),

    deleteDirectionTopicKnowledge: build.mutation<
      TDeleteDirectionTopicKnowledgeResponse,
      IDeleteDirectionTopicKnowledgeRequest
    >({
      query: (body) => ({
        url: `/knowledge-base/delete-direction-topic-knowledge/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DirectionTopicKnowledge"],
    }),
    // direction topic knowledge
  }),
});

export const {
  // knowledge
  useGetAllKnowledgesQuery,
  useGetKnowledgeByIdQuery,
  useAddKnowledgeMutation,
  useUpdateKnowledgeMutation,
  useDeleteKnowledgeMutation,
  // knowledge

  // direction knowledge
  useGetAllDirectionKnowledgesQuery,
  useGetDirectionKnowledgeByIdQuery,
  useAddDirectionKnowledgeMutation,
  useUpdateDirectionKnowledgeMutation,
  useDeleteDirectionKnowledgeMutation,
  // direction knowledge

  // direction topic knowledge
  useGetAllDirectionTopicsKnowledgeQuery,
  useGetDirectionTopicKnowledgeByIdQuery,
  useAddDirectionTopicKnowledgeMutation,
  useUpdateDirectionTopicKnowledgeMutation,
  useDeleteDirectionTopicKnowledgeMutation,
  // direction topic knowledge
} = knowledgeBaseApi;
