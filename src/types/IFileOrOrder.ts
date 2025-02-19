export interface ISolutionFileInParser {
  type: "file";
  content: string;
  getSolutionFileContent: () => Promise<string>;
}

export interface IFileOrFolder {
  type: "file" | "folder";
  [key: string]: ISolutionFileInParser | IFileOrFolder | "file" | "folder";
}

export interface ISearchResult {
  path: string;
  name: string;
  file: ISolutionFileInParser;
}

export interface IOpenedSolutionFile {
  solutionFilePath: string;
  solutionFileName: string;
  solutionFileContent: string;
}
