import { rtkApi } from "../rtk-api";
import {
  IDeleteQuestionRequest,
  IGetAllQuestionsRequest,
  IUpdateQuestionRequest,
  TCreateQuestionRequest,
  TCreateQuestionResponse,
  TDeleteQuestionResponse,
  IGetAllQuestionsResponse,
  TUpdateQuestionResponse,
} from "./types";

const theoreticalTestingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllQuestions: build.query<
      IGetAllQuestionsResponse,
      IGetAllQuestionsRequest
    >({
      query: (body) => ({
        url: `theoretical-testing/get-all-questions?page=${body.page}&pageSize=${body.pageSize}`,
      }),
      providesTags: ["TheoreticalTestingQuestion"],
    }),

    createQuestion: build.mutation<
      TCreateQuestionResponse,
      TCreateQuestionRequest
    >({
      query: (body) => ({
        url: "theoretical-testing/create-question",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TheoreticalTestingQuestion"],
    }),

    updateQuestion: build.mutation<
      TUpdateQuestionResponse,
      IUpdateQuestionRequest
    >({
      query: (body) => ({
        url: `theoretical-testing/update-question/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TheoreticalTestingQuestion"],
    }),

    deleteQuestion: build.mutation<
      TDeleteQuestionResponse,
      IDeleteQuestionRequest
    >({
      query: (body) => ({
        url: `theoretical-testing/delete-question/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TheoreticalTestingQuestion"],
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = theoreticalTestingApi;
