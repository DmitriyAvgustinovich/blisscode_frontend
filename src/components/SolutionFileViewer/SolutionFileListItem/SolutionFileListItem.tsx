import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { ISolutionFile } from "types/ISolutionFile";

import {
  CodepenOutlined,
  FileTextOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

import { RouterPath } from "configs/route-config";

import styles from "./SolutionFileListItem.module.scss";

export const SolutionFileListItem = (props: ISolutionFile) => {
  return (
    <div className={styles.solutionFileListItemWrapper}>
      <Typography.Text className={styles.solutionFileListItemTitle}>
        <FontSizeOutlined className={styles.solutionFileListItemTitle} />{" "}
        {props.name}
      </Typography.Text>

      <Typography.Text className={styles.solutionFileListItemDescription}>
        <FileTextOutlined className={styles.solutionFileListItemDescription} />{" "}
        {props.description}
      </Typography.Text>

      <Link
        to={`${RouterPath.solution_file_viewer}?solutionFileId=${props.uuid}`}
        target="_blank"
      >
        <Button icon={<CodepenOutlined />} block>
          Смотреть решение
        </Button>
      </Link>
    </div>
  );
};
