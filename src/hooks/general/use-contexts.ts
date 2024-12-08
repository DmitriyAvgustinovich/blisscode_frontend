import React from "react";

import { SolutionFileCodeContext } from "providers/SolutionFileCodeProvider";

export const useContexts = () => {
  const solutionFileCodeContext = React.useContext(SolutionFileCodeContext);

  return {
    solutionFileCodeContext,
  };
};
