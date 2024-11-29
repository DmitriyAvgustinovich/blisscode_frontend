import React from "react";

interface ISolutionFileCodeProps {
  solutionFileString: null;
  setSolutionFileString: (solutionFileString: null) => void;
}

export const SolutionFileCodeContext =
  React.createContext<ISolutionFileCodeProps>({
    solutionFileString: null,
    setSolutionFileString: () => {},
  });

interface ISolutionFileCodeProviderProps {
  children: React.ReactNode;
}

export const SolutionFileCodeProvider = (
  props: ISolutionFileCodeProviderProps
) => {
  const { children } = props;

  const [solutionFileString, setSolutionFileString] = React.useState(null);

  const solutionFileCodeContextValue = {
    solutionFileString,
    setSolutionFileString,
  };

  return (
    <SolutionFileCodeContext.Provider value={solutionFileCodeContextValue}>
      {children}
    </SolutionFileCodeContext.Provider>
  );
};
