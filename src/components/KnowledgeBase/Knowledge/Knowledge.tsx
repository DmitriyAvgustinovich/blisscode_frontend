import { Button, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";

import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import {
  useGetDirectionKnowledgeByIdQuery,
  useGetDirectionTopicKnowledgeByIdQuery,
} from "store/api/knowledge_base/knowledge-base.api";

import { RouterPath } from "configs/route-config";

import { getFormattedDate } from "utils";

import { IKnowledge } from "types";

import styles from "./Knowledge.module.scss";

interface IKnowledgeItemProps {
  knowledgeData: IKnowledge;
}

export const Knowledge = (props: IKnowledgeItemProps) => {
  const { knowledgeData } = props;

  const { data: directionKnowledgeData } = useGetDirectionKnowledgeByIdQuery({
    id: knowledgeData.directionKnowledgeId,
  });

  const { data: directionKnowledgeTopicData } =
    useGetDirectionTopicKnowledgeByIdQuery({
      id: knowledgeData.directionKnowledgeTopicId,
    });

  return (
    <>
      <div className={styles.knowledgeHeaderWrapper}>
        <Tooltip title="Назад в Базу знаний" placement="bottomRight">
          <Link to={RouterPath.knowledge_base}>
            <Button type="primary" icon={<LeftOutlined />} />
          </Link>
        </Tooltip>

        <Typography.Title className={styles.knowledgeTitle} level={3}>
          {directionKnowledgeData?.name} <RightOutlined />{" "}
          {directionKnowledgeTopicData?.name} <RightOutlined />{" "}
          {knowledgeData.title}
        </Typography.Title>
      </div>

      <div className={styles.knowledgeContentWrapper}>
        <Typography.Text className={styles.knowledgeTitle}>
          <CalendarOutlined /> Создано{" "}
          <b>{getFormattedDate(knowledgeData.createdAt)}</b>
        </Typography.Text>

        <MarkdownViewer markdownContent={knowledgeData.text} />
      </div>
    </>
  );
};
