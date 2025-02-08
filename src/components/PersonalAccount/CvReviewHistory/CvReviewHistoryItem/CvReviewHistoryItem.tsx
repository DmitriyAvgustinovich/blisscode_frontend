import { Typography } from "antd";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { getFormattedDate } from "utils";

import { ICvReviewResult } from "types";

import styles from "./CvReviewHistoryItem.module.scss";

interface ICvReviewHistoryItemProps {
  cvReviewResultData: ICvReviewResult;
}

export const CvReviewHistoryItem = (props: ICvReviewHistoryItemProps) => {
  const { cvReviewResultData } = props;

  return (
    <div className={styles.cvReviewHistoryItemWrapper}>
      <Typography.Text className={styles.cvReviewHistoryItemDate}>
        {getFormattedDate(cvReviewResultData.createdAt)}
      </Typography.Text>

      <div className={styles.cvReviewHistoryItemResultWrapper}>
        <MarkdownViewer markdownContent={cvReviewResultData.result} />
      </div>
    </div>
  );
};
