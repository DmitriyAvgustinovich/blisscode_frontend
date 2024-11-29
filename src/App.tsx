import React from "react";

import { Main } from "components/Main/Main";

import { tg } from "constants/tg-api";

export const App = () => {
  React.useEffect(() => {
    tg.ready();
  }, []);

  return <Main />;
};
