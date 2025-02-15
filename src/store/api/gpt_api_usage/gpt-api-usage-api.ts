import { rtkApi } from "../rtk-api";
import {
  TGetGptApiUsageLimitsByHashedTelegramIdResponse,
  IGetGptApiUsageLimitsByHashedTelegramIdRequest,
} from "./types";

const gptApiUsageApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getGptApiUsageLimitsByHashedTelegramId: build.query<
      TGetGptApiUsageLimitsByHashedTelegramIdResponse,
      IGetGptApiUsageLimitsByHashedTelegramIdRequest
    >({
      query: (body) => ({
        url: `gpt-api-usage/get-gpt-api-usage-limits-by-hashed-telegram-id/${body.hashedTelegramId}`,
      }),
      providesTags: ["GptApiUsage"],
    }),
  }),
});

export const { useGetGptApiUsageLimitsByHashedTelegramIdQuery } =
  gptApiUsageApi;
