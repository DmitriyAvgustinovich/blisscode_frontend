import React from "react";

import { useGetSearchParams } from "hooks";

import JSZip from "jszip";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";

import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { SearchSolutionsFilesModal } from "components/SolutionFileViewer/SearchSolutionsFilesModal/SearchSolutionsFilesModal";
import { SolutionFileTabs } from "components/SolutionFileViewer/SolutionFileTabs/SolutionFileTabs";
import { SolutionFolder } from "components/SolutionFileViewer/SolutionFolder/SolutionFolder";
import { TreeSolutionFileItem } from "components/SolutionFileViewer/TreeSolutionFileItem/TreeSolutionFileItem";

import { useGetSolutionFileByUuidQuery } from "store/api/solution_file/solution-file-api";

import { buildFileTree, getSyntaxLanguageName, openSolutionCode } from "utils";

import { IFileOrFolder, TRecordStringObject } from "types";

import styles from "./ZipSolutionFileParser.module.scss";

export const ZipSolutionFileParser = () => {
  const { uuid } = useGetSearchParams();

  const { data: solutionFileData } = useGetSolutionFileByUuidQuery(
    { uuid },
    { skip: !uuid }
  );

  const [solutionsFilesTree, setSolutionsFilesTree] =
    React.useState<IFileOrFolder | null>(null);

  const [openedSolutionsFiles, setOpenedSolutionsFiles] = React.useState<
    TRecordStringObject[]
  >([]);

  const [activeSolutionFilePath, setActiveSolutionsFilePath] = React.useState<
    string | null
  >(null);

  const [searchSolutionsFilesResults, setSolutionsFilesSearchResults] =
    React.useState<TRecordStringObject[]>([]);

  const renderSolutionFileTree = (
    solutionFileTree: IFileOrFolder,
    parentPath = ""
  ) => {
    return Object.keys(solutionFileTree).map((key) => {
      const currentSolutionFile = solutionFileTree[key];
      const solutionFilePath = `${parentPath}/${key}`;

      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (currentSolutionFile.type === "folder") {
        return (
          <SolutionFolder key={solutionFilePath} fileName={key}>
            {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore */}
            {renderSolutionFileTree(currentSolutionFile, solutionFilePath)}
          </SolutionFolder>
        );
      }

      const getSolutionFileContent = () => {
        openSolutionCode({
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          currentSolutionFile,
          openedSolutionsFiles,
          solutionFilePath,
          solutionFileName: key,
          setOpenedSolutionsFiles,
          setActiveSolutionsFilePath,
        });
      };

      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (currentSolutionFile.type === "file") {
        return (
          <TreeSolutionFileItem
            key={solutionFilePath}
            fileName={key}
            getSolutionFileContent={getSolutionFileContent}
          />
        );
      }

      return null;
    });
  };

  React.useEffect(() => {
    const zip = new JSZip();

    if (solutionFileData) {
      zip.loadAsync(solutionFileData).then((zipContent) => {
        const solutionFileTree = buildFileTree(zipContent);
        setSolutionsFilesTree(solutionFileTree);
      });
    }
  }, [solutionFileData]);

  return (
    <div className={styles.zipSolutionFileParserWrapper}>
      <div className={styles.zipSolutionFileParserTreeWrapper}>
        <SearchSolutionsFilesModal
          solutionsFilesTree={solutionsFilesTree}
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          searchSolutionsFilesResults={searchSolutionsFilesResults}
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setSolutionsFilesSearchResults={setSolutionsFilesSearchResults}
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          openedSolutionsFiles={openedSolutionsFiles}
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setOpenedSolutionsFiles={setOpenedSolutionsFiles}
          setActiveSolutionsFilePath={setActiveSolutionsFilePath}
        />

        {solutionsFilesTree && renderSolutionFileTree(solutionsFilesTree)}
      </div>

      <div>
        <SolutionFileTabs
          openedSolutionsFiles={openedSolutionsFiles}
          activeSolutionFilePath={activeSolutionFilePath}
          setActiveSolutionsFilePath={setActiveSolutionsFilePath}
          setOpenedSolutionsFiles={setOpenedSolutionsFiles}
        />

        <div className={styles.zipSolutionFileParserCodeContent}>
          {openedSolutionsFiles
            .filter((file) => file.solutionFilePath === activeSolutionFilePath)
            .map((file) => (
              <React.Fragment key={file.solutionFilePath}>
                <SyntaxHighlighter
                  language={getSyntaxLanguageName(
                    file.solutionFileName.split(".").pop()
                  )}
                  style={vs2015}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {file.solutionFileContent}
                </SyntaxHighlighter>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
