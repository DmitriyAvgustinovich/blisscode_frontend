import { Tooltip } from "antd";

import {
  CloseOutlined,
  CopyOutlined,
  FileTextOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { TRecordStringObject, TSetStateActionStrings } from "types";

import styles from "./SolutionFileTabs.module.scss";

interface ISolutionFileTabsProps {
  openedSolutionsFiles: TRecordStringObject[];
  activeSolutionFilePath: string | null;
  setActiveSolutionsFilePath: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setOpenedSolutionsFiles: TSetStateActionStrings;
}

export const SolutionFileTabs = (props: ISolutionFileTabsProps) => {
  const {
    openedSolutionsFiles,
    activeSolutionFilePath,
    setActiveSolutionsFilePath,
    setOpenedSolutionsFiles,
  } = props;

  const handleSaveFileContentInClipBoard = (solutionFileCode: string) => {
    navigator.clipboard.writeText(solutionFileCode);
  };

  const handleCloseSolutionFileTab = (filePath: string) => {
    setOpenedSolutionsFiles((prevFiles) => {
      return prevFiles.filter((file) => file.solutionFilePath !== filePath);
    });
  };

  return (
    <div className={styles.solutionFileTabsWrapper}>
      {openedSolutionsFiles.map((solutionFile) => {
        const zipSolutionFileParserTabClassName = `${styles.solutionFileTab} ${
          activeSolutionFilePath === solutionFile.solutionFilePath
            ? styles.solutionFileActiveTab
            : ""
        }`;

        const handleClickActiveFile = () => {
          setActiveSolutionsFilePath(solutionFile.solutionFilePath);
        };

        const handleClickSaveFileContent = (event: React.MouseEvent) => {
          event.stopPropagation();
          handleSaveFileContentInClipBoard(solutionFile.solutionFileContent);
        };

        const handleClickCloseFile = () => {
          handleCloseSolutionFileTab(solutionFile.solutionFilePath);
        };

        const isActiveSolutionFilePath =
          solutionFile.solutionFilePath === activeSolutionFilePath;

        return (
          <div
            key={solutionFile.solutionFilePath}
            className={zipSolutionFileParserTabClassName}
            onClick={handleClickActiveFile}
          >
            <FileTextOutlined className={styles.solutionFileTabIcon} />

            {solutionFile.solutionFileName}

            {isActiveSolutionFilePath && (
              <Tooltip title="Скопировать содержимое файла">
                <CopyOutlined
                  className={styles.solutionFileTabIcon}
                  onClick={handleClickSaveFileContent}
                />
              </Tooltip>
            )}

            <Tooltip title="Файл доступен только для чтения">
              <LockOutlined className={styles.solutionFileTabIcon} />
            </Tooltip>

            <Tooltip title="Закрыть файл">
              <CloseOutlined
                className={styles.solutionFileTabIcon}
                onClick={handleClickCloseFile}
              />
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
