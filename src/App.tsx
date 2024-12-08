import React from "react";

import { useGetSearchParams } from "hooks";

import { AppRouter } from "components/AppRouter/AppRouter";

import { AppProviders } from "providers/AppProviders";

export const App = () => {
  const { authUserId } = useGetSearchParams();

  React.useEffect(() => {
    if (authUserId) {
      localStorage.setItem("botAuthUserHash", authUserId);
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
