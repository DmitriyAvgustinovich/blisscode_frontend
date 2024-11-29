export interface IFileOrFolder {
  [key: string]: {
    type: "file" | "folder";
    getSolutionFileContent?: () => Promise<string>;
    children?: FileStructure;
  };
}

interface FileStructure {
  [key: string]: IFileOrFolder;
}
