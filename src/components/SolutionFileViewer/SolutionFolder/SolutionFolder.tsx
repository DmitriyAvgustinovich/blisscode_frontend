import React from "react";

import { FolderOutlined, FolderOpenOutlined } from "@ant-design/icons";

import styles from "./SolutionFolder.module.scss";

interface ISolutionFolderProps {
  fileName: string;
  children: React.ReactNode;
}

export const SolutionFolder = (props: ISolutionFolderProps) => {
  const { fileName, children } = props;

  const [isOpenSolutionFile, setIsOpenSolutionFile] = React.useState(false);

  const toggleOpenSolutionFile = () => {
    setIsOpenSolutionFile(!isOpenSolutionFile);
  };

  if (fileName === "__MACOSX" || fileName === ".DS_Store") {
    return null;
  }

  return (
    <>
      <div
        className={styles.solutionFolderWrapper}
        onClick={toggleOpenSolutionFile}
      >
        {isOpenSolutionFile ? (
          <FolderOpenOutlined className={styles.solutionFolderIcon} />
        ) : (
          <FolderOutlined className={styles.solutionFolderIcon} />
        )}{" "}
        {fileName}
      </div>

      {isOpenSolutionFile && (
        <div className={styles.solutionFolderWithFileWrapper}>{children}</div>
      )}
    </>
  );
};
