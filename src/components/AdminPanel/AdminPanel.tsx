import { Tabs } from "antd";

import { DirectionCategoriesCard } from "./AdminCards/DirectionCategoriesCard";
import { DirectionsCard } from "./AdminCards/DirectionsCard";
import { DirectionStacksCard } from "./AdminCards/DirectionStacksCard";
import { DirectionKnowledge } from "./AdminCards/KnowledgeCard/DirectionKnowledge";
import { DirectionTopicKnowledge } from "./AdminCards/KnowledgeCard/DirectionTopicKnowledge";
import { KnowledgeCard } from "./AdminCards/KnowledgeCard/KnowledgeCard";
import { SolutionsFilesCard } from "./AdminCards/SolutionsFilesCard/SolutionsFilesCard";
import styles from "./AdminPanel.module.scss";

export const AdminPanel = () => {
  const tabsItems = [
    {
      key: "1",
      label: "Файлы решений",
      children: (
        <div className={styles.adminPanelSolutionsFilesCardsWrapper}>
          <DirectionsCard />
          <DirectionStacksCard />
          <DirectionCategoriesCard />
          <SolutionsFilesCard />
        </div>
      ),
    },
    {
      key: "2",
      label: "База знаний",
      children: (
        <div className={styles.adminPanelKnowledgeCardsWrapper}>
          <DirectionKnowledge />
          <DirectionTopicKnowledge />
          <KnowledgeCard />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.adminPanelWrapper}>
      <Tabs defaultActiveKey="1" items={tabsItems} />
    </div>
  );
};
