import React from "react";

interface ISolutionFileCodeProps {
  solutionFileString: null;
  setSolutionFileString: (solutionFileString: null) => void;
  solutionFileName: string;
  setSolutionFileName: (solutionFileName: string) => void;
}

export const SolutionFileCodeContext =
  React.createContext<ISolutionFileCodeProps>({
    solutionFileString: null,
    setSolutionFileString: () => {},
    solutionFileName: "",
    setSolutionFileName: () => {},
  });

interface ISolutionFileCodeProviderProps {
  children: React.ReactNode;
}

export const SolutionFileCodeProvider = (
  props: ISolutionFileCodeProviderProps
) => {
  const { children } = props;

  const [solutionFileString, setSolutionFileString] = React.useState(null);
  const [solutionFileName, setSolutionFileName] = React.useState("");

  const solutionFileCodeContextValue = {
    solutionFileString,
    setSolutionFileString,
    solutionFileName,
    setSolutionFileName,
  };

  return (
    <SolutionFileCodeContext.Provider value={solutionFileCodeContextValue}>
      {children}
    </SolutionFileCodeContext.Provider>
  );
};
