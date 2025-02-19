export interface ISolutionFile {
  type: "file";
  content: string;
  getSolutionFileContent: () => Promise<string>;
}

export interface IFileOrFolder {
  type: "file" | "folder";
  [key: string]: ISolutionFile | IFileOrFolder | "file" | "folder";
}

export interface ISearchResult {
  path: string;
  name: string;
  file: ISolutionFile;
}

export interface IOpenedSolutionFile {
  solutionFilePath: string;
  solutionFileName: string;
  solutionFileContent: string;
}

export type TRecordStringObject = Record<string, string>;
