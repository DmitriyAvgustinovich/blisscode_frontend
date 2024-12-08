import { rtkApi } from "../rtk-api";
import {
  IGetUserByHashedTelegramIdRequest,
  TGetAllUsersRequest,
  TGetAllUsersResponse,
  TGetUserByHashedTelegramIdResponse,
} from "./types";

const usersApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<TGetAllUsersResponse, TGetAllUsersRequest>({
      query: () => ({
        url: "users",
      }),
      providesTags: ["User"],
    }),

    getUserByHashedTelegramId: build.query<
      TGetUserByHashedTelegramIdResponse,
      IGetUserByHashedTelegramIdRequest
    >({
      query: (body) => ({
        url: `users/${body.hashedTelegramId}`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByHashedTelegramIdQuery } =
  usersApi;
