import { AntColorsProvider } from "./AntColorsProvider";
import { SolutionFileCodeProvider } from "./SolutionFileCodeProvider";

interface IAppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = (props: IAppProvidersProps) => {
  const { children } = props;

  return (
    <AntColorsProvider>
      <SolutionFileCodeProvider>{children}</SolutionFileCodeProvider>
    </AntColorsProvider>
  );
};
