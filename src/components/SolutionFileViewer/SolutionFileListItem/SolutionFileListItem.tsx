import { Button } from "antd";
import { Link } from "react-router-dom";

import { CodepenOutlined } from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";
import { TextWithLine } from "components/TextWithLine/TextWithLine";

import { RouterPath } from "configs/route-config";

import { ISolutionFile } from "types";

import styles from "./SolutionFileListItem.module.scss";

export const SolutionFileListItem = (props: ISolutionFile) => {
  return (
    <div className={styles.solutionFileListItemWrapper}>
      <TextWithLine
        elements={[
          <b>{props.name}</b>,
          <MarkdownViewer markdownContent={props.description} />,
        ]}
      />

      <Link
        to={`${RouterPath.solution_file_viewer}?uuid=${props.uuid}`}
        target="_blank"
      >
        <Button icon={<CodepenOutlined />} block>
          Смотреть решение
        </Button>
      </Link>
    </div>
  );
};
