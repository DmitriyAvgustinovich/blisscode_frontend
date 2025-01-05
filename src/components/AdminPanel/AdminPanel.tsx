import { DirectionCategoriesCard } from "./AdminCards/DirectionCategoriesCard";
import { DirectionsCard } from "./AdminCards/DirectionsCard";
import { DirectionStacksCard } from "./AdminCards/DirectionStacksCard";
import { SolutionsFilesCard } from "./AdminCards/SolutionsFilesCard/SolutionsFilesCard";
import styles from "./AdminPanel.module.scss";

export const AdminPanel = () => (
  <div className={styles.adminPanelWrapper}>
    <DirectionsCard />
    <DirectionStacksCard />
    <DirectionCategoriesCard />
    <SolutionsFilesCard />
  </div>
);
