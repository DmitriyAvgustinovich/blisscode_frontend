import { useGetUserByHashedTelegramIdQuery } from "store/api/users/users-api";

import { ADMINS_TG_IDS } from "constants/general-constants";

export const useGetActiveUser = () => {
  const hashedTelegramId = localStorage.getItem("botAuthUserHash") as string;

  const { data: activeUserData, isLoading: isActiveUserDataLoading } =
    useGetUserByHashedTelegramIdQuery({
      hashedTelegramId,
    });

  const isActiveUserHasAdmin = ADMINS_TG_IDS.includes(
    activeUserData?.telegramId ?? ""
  );

  return { activeUserData, isActiveUserDataLoading, isActiveUserHasAdmin };
};
