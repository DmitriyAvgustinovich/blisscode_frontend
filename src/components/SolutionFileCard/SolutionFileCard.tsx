import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { ISolutionFile } from "types/ISolutionFile";

import {
  CodepenOutlined,
  FileTextOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

import { RouterPath } from "configs/route-config";

import styles from "./SolutionFileCard.module.scss";

export const SolutionFileCard = (props: ISolutionFile) => {
  return (
    <div className={styles.solutionFileCardWrapper}>
      <Typography.Text className={styles.solutionFileCardTitle}>
        <FontSizeOutlined className={styles.solutionFileCardTitle} />{" "}
        {props.name}
      </Typography.Text>

      <Typography.Text className={styles.solutionFileCardDescription}>
        <FileTextOutlined className={styles.solutionFileCardDescription} />{" "}
        {props.description}
      </Typography.Text>

      <Link
        to={`${RouterPath.solution_file_viewer}?solutionFileId=${props.uuid}`}
        target="_blank"
      >
        <Button icon={<CodepenOutlined />}>Смотреть решение</Button>
      </Link>
    </div>
  );
};
