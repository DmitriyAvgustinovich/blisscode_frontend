import React from "react";

import { FileTextOutlined } from "@ant-design/icons";

import { HIDDEN_FOLDERS_OR_FILES } from "constants/hidden-folders-or-files";

import styles from "./SolutionFile.module.scss";

interface ISolutionFileProps {
  fileName: string;
  getSolutionFileContent: () => void;
}

export const SolutionFile = (props: ISolutionFileProps) => {
  const { fileName, getSolutionFileContent } = props;

  const [solutionFileContent, setSolutionFileContent] = React.useState("");

  const handleOpenSolutionCode = () => {
    if (solutionFileContent) {
      setSolutionFileContent("");
    } else {
      const fileContent = getSolutionFileContent();
      setSolutionFileContent(fileContent as unknown as string);
    }
  };

  if (HIDDEN_FOLDERS_OR_FILES.includes(fileName)) {
    return <></>;
  }

  return (
    <div className={styles.solutionFileWrapper}>
      <div
        className={styles.solutionFileNameWrapper}
        onClick={handleOpenSolutionCode}
      >
        {fileName && <FileTextOutlined className={styles.solutionFileIcon} />}
        {fileName}
      </div>
    </div>
  );
};
