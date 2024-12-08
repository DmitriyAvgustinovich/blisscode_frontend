import { IUser } from "types/IUser";

export type TGetAllUsersResponse = IUser[];
export type TGetAllUsersRequest = void;

export type TGetUserByHashedTelegramIdResponse = IUser;
export interface IGetUserByHashedTelegramIdRequest {
  hashedTelegramId: string;
}
