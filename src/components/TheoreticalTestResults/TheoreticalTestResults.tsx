import { Button, Typography } from "antd";
import { useGetSearchParams } from "hooks";

import { FilePdfOutlined } from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { useGetTheoreticalTestResultsQuery } from "store/api/theoretical_testing_results/theoretical-testing-results-api";

import { downloadPdf, getFormattedDate } from "utils";

import styles from "./TheoreticalTestResults.module.scss";

export const TheoreticalTestResults = () => {
  const { resultId, authUserId } = useGetSearchParams();

  const {
    data: theoreticalTestResultsData,
    isLoading: isTheoreticalTestResultsDataLoading,
  } = useGetTheoreticalTestResultsQuery({
    resultId: +resultId,
    authUserId,
  });

  const handleDownloadResultsPdf = () => {
    downloadPdf({
      dataStringForPdf: theoreticalTestResultsData?.answersResult ?? "",
      fileNameText: `Результаты прохождения теоретического теста от ${getFormattedDate(
        theoreticalTestResultsData?.createdAt
      )}`,
    });
  };

  return (
    <div className={styles.theoreticalTestResultsWrapper}>
      <Typography.Title
        className={styles.theoreticalTestResultsTitle}
        level={3}
      >
        Результаты теоретического теста от{" "}
        {!isTheoreticalTestResultsDataLoading &&
          getFormattedDate(theoreticalTestResultsData?.createdAt)}
      </Typography.Title>

      {isTheoreticalTestResultsDataLoading ? (
        <Typography.Text className={styles.theoreticalTestResultsTitle}>
          Загрузка...
        </Typography.Text>
      ) : (
        <>
          <Button
            className={styles.theoreticalTestResultsButton}
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={handleDownloadResultsPdf}
          >
            Скачать в PDF
          </Button>

          <div className={styles.theoreticalTestResultsMarkdownWrapper}>
            <MarkdownViewer
              markdownContent={theoreticalTestResultsData?.answersResult ?? ""}
            />
          </div>
        </>
      )}
    </div>
  );
};
