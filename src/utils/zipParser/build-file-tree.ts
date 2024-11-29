import JSZip from "jszip";

import { IFileOrFolder } from "types";

export const buildFileTree = (zipSolution: JSZip) => {
  const solutionFileStructure: IFileOrFolder = {};

  zipSolution.forEach((relativeFilePath, zipSolutionEntry) => {
    const filePathParts = relativeFilePath.split("/");
    let currentFileStructureLevel = solutionFileStructure;

    filePathParts.forEach((filePart, index) => {
      if (!currentFileStructureLevel[filePart]) {
        if (index === filePathParts.length - 1) {
          currentFileStructureLevel[filePart] = {
            type: "file",
            getSolutionFileContent: () => zipSolutionEntry.async("string"),
          };
        } else {
          currentFileStructureLevel[filePart] = currentFileStructureLevel[
            filePart
          ] || {
            type: "folder",
          };
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentFileStructureLevel = currentFileStructureLevel[filePart];
    });
  });

  return solutionFileStructure;
};
