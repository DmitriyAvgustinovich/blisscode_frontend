import { Typography } from "antd";

import { RightOutlined } from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { useGetDirectionByIdQuery } from "store/api/direction/direction-api";
import { useGetDirectionStackByIdQuery } from "store/api/direction_stack/direction-stack-api";

import { getFormattedDate } from "utils";

import { ITheoreticalTestResults } from "types";

import styles from "./TheoreticalTestHistoryItem.module.scss";

interface ITheoreticalTestHistoryItemProps {
  testResultData: ITheoreticalTestResults;
}

export const TheoreticalTestHistoryItem = (
  props: ITheoreticalTestHistoryItemProps
) => {
  const { testResultData } = props;

  const { data: directionData } = useGetDirectionByIdQuery({
    id: testResultData.directionId,
  });

  const { data: stackData } = useGetDirectionStackByIdQuery({
    id: testResultData.stackId,
  });

  return (
    <div className={styles.theoreticalTestHistoryItemWrapper}>
      <Typography.Text className={styles.theoreticalTestHistoryItemDate}>
        {getFormattedDate(testResultData.createdAt)}
      </Typography.Text>

      <Typography.Text className={styles.theoreticalTestHistoryItemHeader}>
        {directionData?.name} <RightOutlined /> {stackData?.name}
      </Typography.Text>

      <div className={styles.theoreticalTestHistoryItemAnswersWrapper}>
        <MarkdownViewer markdownContent={testResultData.answersResult} />
      </div>
    </div>
  );
};
