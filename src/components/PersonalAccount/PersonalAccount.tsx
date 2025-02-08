import { Tabs, Typography } from "antd";
import { useGetActiveUser } from "hooks";

import { CvReviewHistory } from "./CvReviewHistory/CvReviewHistory";
import styles from "./PersonalAccount.module.scss";
import { TheoreticalTestHistory } from "./TheoreticalTestHistory/TheoreticalTestHistory";

export const PersonalAccount = () => {
  const { activeUserData } = useGetActiveUser();

  const tabsItems = [
    {
      key: "1",
      label: "Теоретическое тестирование",
      children: <TheoreticalTestHistory />,
    },
    {
      key: "2",
      label: "Ревью резюме",
      children: <CvReviewHistory />,
    },
  ];

  return (
    <div className={styles.personalAccountWrapper}>
      <Typography.Title
        className={styles.personalAccountTitle}
        level={window.innerWidth < 430 ? 4 : 3}
      >
        👋 Добро пожаловать, {activeUserData?.username}!
      </Typography.Title>

      <Tabs items={tabsItems} />
    </div>
  );
};
