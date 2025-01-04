import React from "react";

import { FileTextOutlined } from "@ant-design/icons";

import { HIDDEN_FOLDERS_OR_FILES } from "constants/solution-files-constants";

import styles from "./TreeSolutionFileItem.module.scss";

interface ITreeSolutionFileItem {
  fileName: string;
  getSolutionFileContent: () => void;
}

export const TreeSolutionFileItem = (props: ITreeSolutionFileItem) => {
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
    <div className={styles.treeSolutionFileItemWrapper}>
      <div
        className={styles.treeSolutionFileItemNameWrapper}
        onClick={handleOpenSolutionCode}
      >
        {fileName && (
          <FileTextOutlined className={styles.treeSolutionFileItemIcon} />
        )}

        {fileName}
      </div>
    </div>
  );
};
