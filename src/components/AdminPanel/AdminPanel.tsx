import { Tabs } from "antd";

import { DirectionCategoriesCard } from "./AdminCards/DirectionCategoriesCard";
import { DirectionsCard } from "./AdminCards/DirectionsCard";
import { DirectionStacksCard } from "./AdminCards/DirectionStacksCard";
import { DirectionKnowledgeCard } from "./AdminCards/KnowledgeCard/DirectionKnowledgeCard";
import { DirectionTopicKnowledgeCard } from "./AdminCards/KnowledgeCard/DirectionTopicKnowledgeCard";
import { KnowledgeCard } from "./AdminCards/KnowledgeCard/KnowledgeCard";
import { SolutionsFilesCard } from "./AdminCards/SolutionsFilesCard/SolutionsFilesCard";
import { TheoreticalTestingCard } from "./AdminCards/TheoreticalTestingCard/TheoreticalTestingCard";
import styles from "./AdminPanel.module.scss";

export const AdminPanel = () => {
  const solutionsTabItems = [
    {
      key: "1",
      label: "Направления",
      children: <DirectionsCard />,
    },
    {
      key: "2",
      label: "Стеки",
      children: <DirectionStacksCard />,
    },
    {
      key: "3",
      label: "Категории направлений",
      children: <DirectionCategoriesCard />,
    },
    {
      key: "4",
      label: "Решения",
      children: <SolutionsFilesCard />,
    },
  ];

  const knowledgesTabItems = [
    {
      key: "1",
      label: "Направления знаний",
      children: <DirectionKnowledgeCard />,
    },
    {
      key: "2",
      label: "Топики направлений знаний",
      children: <DirectionTopicKnowledgeCard />,
    },
    {
      key: "3",
      label: "Знания",
      children: <KnowledgeCard />,
    },
  ];

  const tabsItems = [
    {
      key: "1",
      label: "Файлы решений",
      children: (
        <Tabs
          defaultActiveKey="1"
          items={solutionsTabItems}
          tabPosition="right"
        />
      ),
    },
    {
      key: "2",
      label: "База знаний",
      children: (
        <Tabs
          defaultActiveKey="1"
          items={knowledgesTabItems}
          tabPosition="right"
        />
      ),
    },
    {
      key: "3",
      label: "Теоретическое тестирование",
      children: <TheoreticalTestingCard />,
    },
  ];

  return (
    <div className={styles.adminPanelWrapper}>
      <Tabs defaultActiveKey="1" items={tabsItems} />
    </div>
  );
};
