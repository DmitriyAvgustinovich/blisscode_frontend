import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import styles from "./EmptyKnowledge.module.scss";

export const EmptyKnowledge = () => (
  <div className={styles.emptyKnowledgeWrapper}>
    <Typography.Title className={styles.emptyKnowledgeTitle} level={3}>
      Такой страницы статьи не сущесвует
    </Typography.Title>

    <Typography.Text className={styles.emptyKnowledgeText}>
      Страница была уделена или вы перешли но неверной ссылке
    </Typography.Text>

    <Button className={styles.emptyKnowledgeButton} type="primary">
      <Link to={RouterPath.knowledge_base}>Вернуться в Базу знаний</Link>
    </Button>
  </div>
);
