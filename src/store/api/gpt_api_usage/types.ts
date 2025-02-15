import { IGptApiUsage } from "types";

export type TGetGptApiUsageLimitsByHashedTelegramIdResponse = IGptApiUsage[];
export interface IGetGptApiUsageLimitsByHashedTelegramIdRequest {
  hashedTelegramId: string;
}
