import React from "react";

import { Button, message, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";

import {
  DislikeFilled,
  DislikeOutlined,
  LeftOutlined,
  LikeFilled,
  LikeOutlined,
  LineOutlined,
  LoadingOutlined,
  RightOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import {
  useGetDirectionKnowledgeByIdQuery,
  useGetDirectionTopicKnowledgeByIdQuery,
  useUpdateKnowledgeMutation,
} from "store/api/knowledge_base/knowledge-base.api";

import { RouterPath } from "configs/route-config";

import { REACTION_COOLDOWN_MS } from "constants/knowledge-base-constants";

import { getFormattedDate } from "utils";

import { IKnowledge } from "types";

import styles from "./Knowledge.module.scss";

interface IKnowledgeItemProps {
  knowledgeData: IKnowledge;
  isKnowledgeDataIsLoading: boolean;
}

export const Knowledge = (props: IKnowledgeItemProps) => {
  const { knowledgeData, isKnowledgeDataIsLoading } = props;

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const handleReactionCooldown = () => {
    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, REACTION_COOLDOWN_MS);
  };

  const { data: directionKnowledgeData } = useGetDirectionKnowledgeByIdQuery({
    id: knowledgeData.directionKnowledgeId,
  });

  const { data: directionKnowledgeTopicData } =
    useGetDirectionTopicKnowledgeByIdQuery({
      id: knowledgeData.directionKnowledgeTopicId,
    });

  const [updateKnowledge] = useUpdateKnowledgeMutation();

  const handleLikeKnowledge = async () => {
    if (isButtonDisabled) {
      message.warning("Подождите 5 секунд перед следующей реакцией");
      return;
    }

    try {
      const updateData = {
        id: knowledgeData.id,
        likes: knowledgeData.isLiked
          ? knowledgeData.likes - 1
          : knowledgeData.likes + 1,
        dislikes: knowledgeData.isDisliked
          ? knowledgeData.dislikes - 1
          : knowledgeData.dislikes,
        isLiked: !knowledgeData.isLiked,
        isDisliked: false,
      };

      await updateKnowledge(updateData);
      handleReactionCooldown();
    } catch (error) {
      message.error("Не удалось обновить реакцию");
    }
  };

  const handleDislikeKnowledge = async () => {
    if (isButtonDisabled) {
      message.warning("Подождите 5 секунд перед следующей реакцией");
      return;
    }

    try {
      const updateData = {
        id: knowledgeData.id,
        likes: knowledgeData.isLiked
          ? knowledgeData.likes - 1
          : knowledgeData.likes,
        dislikes: knowledgeData.isDisliked
          ? knowledgeData.dislikes - 1
          : knowledgeData.dislikes + 1,
        isLiked: false,
        isDisliked: !knowledgeData.isDisliked,
      };

      await updateKnowledge(updateData);
      handleReactionCooldown();
    } catch (error) {
      message.error("Не удалось обновить реакцию");
    }
  };

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

            <Typography.Title className={styles.knowledgeText} level={3}>
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

          <div className={styles.knowledgeLikeDislikeWrapper}>
            {knowledgeData.isLiked ? (
              <LikeFilled
                className={`${styles.knowledgeLikeDislikeIcon} ${styles.knowledgeLikeDislikeText}`}
                onClick={handleLikeKnowledge}
              />
            ) : (
              <LikeOutlined
                className={`${styles.knowledgeLikeDislikeIcon} ${styles.knowledgeLikeDislikeText}`}
                onClick={handleLikeKnowledge}
              />
            )}
            <Typography.Text className={styles.knowledgeLikeDislikeText}>
              {knowledgeData.likes}
            </Typography.Text>

            <LineOutlined
              className={styles.knowledgeLikeDislikeText}
              rotate={90}
            />

            {knowledgeData.isDisliked ? (
              <DislikeFilled
                className={`${styles.knowledgeLikeDislikeIcon} ${styles.knowledgeLikeDislikeText}`}
                onClick={handleDislikeKnowledge}
              />
            ) : (
              <DislikeOutlined
                className={`${styles.knowledgeLikeDislikeIcon} ${styles.knowledgeLikeDislikeText}`}
                onClick={handleDislikeKnowledge}
              />
            )}
            <Typography.Text className={styles.knowledgeLikeDislikeText}>
              {knowledgeData.dislikes}
            </Typography.Text>

            <LineOutlined
              className={styles.knowledgeLikeDislikeText}
              rotate={90}
            />

            <Button
              type="primary"
              onClick={handleShare}
              icon={<ShareAltOutlined />}
            >
              Поделиться
            </Button>
          </div>
        </>
      )}
    </>
  );
};
