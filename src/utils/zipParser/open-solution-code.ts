import {
  IFileOrFolder,
  TRecordStringObject,
  TSetStateActionStrings,
} from "types";

interface IOpenSolutionCodeArgs {
  currentSolutionFile: IFileOrFolder;
  openedSolutionsFiles: TRecordStringObject[];
  solutionFilePath: string;
  solutionFileName: string;
  setOpenedSolutionsFiles: TSetStateActionStrings;
  setActiveSolutionsFilePath: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export const openSolutionCode = async (args: IOpenSolutionCodeArgs) => {
  const {
    currentSolutionFile,
    openedSolutionsFiles,
    solutionFilePath,
    solutionFileName,
    setOpenedSolutionsFiles,
    setActiveSolutionsFilePath,
  } = args;

  const solutionFileContent =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await currentSolutionFile.getSolutionFileContent();

  const alreadyOpened = openedSolutionsFiles.some(
    (file) => file.solutionFilePath === solutionFilePath
  );

  const newSolutionFileTab = {
    solutionFilePath,
    solutionFileName,
    solutionFileContent,
  };

  if (!alreadyOpened) {
    setOpenedSolutionsFiles((prevFiles) => [...prevFiles, newSolutionFileTab]);
    setActiveSolutionsFilePath(solutionFilePath);
  } else {
    setActiveSolutionsFilePath(solutionFilePath);
  }
};
