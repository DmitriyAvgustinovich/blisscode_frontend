import React from "react";

import { useGetSearchParams } from "hooks";

import { AppRouter } from "components/AppRouter/AppRouter";

import { LOCAL_STORAGE_KEYS, tg } from "constants/general-constants";

import { AppProviders } from "providers/AppProviders";

export const App = () => {
  const { authUserId } = useGetSearchParams();

  React.useEffect(() => {
    tg.ready();
  }, []);

  React.useEffect(() => {
    if (authUserId) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.botAuthUserHash, authUserId);
    }
  }, [authUserId]);

  return (
    <React.Suspense fallback={""}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </React.Suspense>
  );
};
