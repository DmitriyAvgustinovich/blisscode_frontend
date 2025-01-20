import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import {
  CodepenOutlined,
  FileTextOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { RouterPath } from "configs/route-config";

import { ISolutionFile } from "types";

import styles from "./SolutionFileListItem.module.scss";

export const SolutionFileListItem = (props: ISolutionFile) => {
  return (
    <div className={styles.solutionFileListItemWrapper}>
      <Typography.Text className={styles.solutionFileListItemTitle}>
        <FontSizeOutlined className={styles.solutionFileListItemTitle} />{" "}
        {props.name}
      </Typography.Text>

      <div className={styles.solutionFileListItemDescriptionWrapper}>
        <FileTextOutlined />
        <MarkdownViewer markdownContent={props.description} />
      </div>

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
