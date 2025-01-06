import { Typography } from "antd";

import styles from "./KnowledgeBase.module.scss";

export const KnowledgeBase = () => {
  return (
    <div className={styles.knowledgeBaseWrapper}>
      <Typography.Title className={styles.knowledgeBaseTitle} level={3}>
        База знаний
      </Typography.Title>
    </div>
  );
};
