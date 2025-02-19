import { Button, FloatButton, message, Tooltip, Typography } from "antd";
import { useScroll } from "hooks";
import { Link } from "react-router-dom";

import {
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
  ShareAltOutlined,
  UpOutlined,
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
  isKnowledgeDataIsLoading: boolean;
}

export const Knowledge = (props: IKnowledgeItemProps) => {
  const { knowledgeData, isKnowledgeDataIsLoading } = props;

  const { isShowScrollButton, handleScrollToTop } = useScroll({
    pageThreshold: 10,
  });

  const { data: directionKnowledgeData } = useGetDirectionKnowledgeByIdQuery({
    id: knowledgeData.directionKnowledgeId,
  });

  const { data: directionKnowledgeTopicData } =
    useGetDirectionTopicKnowledgeByIdQuery({
      id: knowledgeData.directionKnowledgeTopicId,
    });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("Ссылка на знание скопирована в буфер обмена");
  };

  return (
    <>
      {isKnowledgeDataIsLoading ? (
        <Typography.Text className={styles.knowledgeLoadingTitle}>
          <LoadingOutlined /> Загрузка...
        </Typography.Text>
      ) : (
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

          <Typography.Text className={styles.knowledgeDate}>
            Создано <b>{getFormattedDate(knowledgeData.createdAt)}</b>
          </Typography.Text>

          <div className={styles.knowledgeContentWrapper}>
            <MarkdownViewer markdownContent={knowledgeData.text} />
          </div>

          <Tooltip title="Поделиться" placement="left">
            <FloatButton
              className={styles.knowledgeFloatButton}
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              type="primary"
            />
          </Tooltip>

          <div
            className={`${styles.knowledgeFloatButtonWrapper} ${
              isShowScrollButton ? styles.visible : ""
            }`}
          >
            <FloatButton
              className={styles.knowledgeFloatButton}
              style={{ bottom: 100 }}
              icon={<UpOutlined />}
              onClick={handleScrollToTop}
              type="primary"
            />
          </div>
        </>
      )}
    </>
  );
};
