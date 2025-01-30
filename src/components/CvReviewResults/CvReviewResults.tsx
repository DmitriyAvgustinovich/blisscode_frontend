import { Button, Typography } from "antd";
import { useGetSearchParams } from "hooks";

import { FilePdfOutlined } from "@ant-design/icons";

import { MarkdownViewer } from "components/MarkdownViewer/MarkdownViewer";

import { useGetCvReviewResultQuery } from "store/api/cv_review_result/cv-review-result-api";

import { downloadPdf, getFormattedDate } from "utils";

import styles from "./CvReviewResults.module.scss";

export const CvReviewResults = () => {
  const { resultId, authUserId } = useGetSearchParams();

  const { data: cvReviewResultsData, isLoading: isCvReviewResultsDataLoading } =
    useGetCvReviewResultQuery({
      resultId: +resultId,
      authUserId,
    });

  const handleDownloadResultsPdf = () => {
    downloadPdf({
      dataStringForPdf: cvReviewResultsData?.result ?? "",
      fileNameText: `Результаты ревью резюме от ${getFormattedDate(
        cvReviewResultsData?.createdAt
      )}`,
    });
  };

  return (
    <div className={styles.cvReviewResultsWrapper}>
      <Typography.Title className={styles.cvReviewResultsTitle} level={3}>
        Результаты ревью резюме от{" "}
        {!isCvReviewResultsDataLoading &&
          getFormattedDate(cvReviewResultsData?.createdAt)}
      </Typography.Title>

      {isCvReviewResultsDataLoading ? (
        <Typography.Text className={styles.cvReviewResultsTitle}>
          Загрузка...
        </Typography.Text>
      ) : (
        <>
          <Button
            className={styles.cvReviewResultsButton}
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={handleDownloadResultsPdf}
          >
            Скачать в PDF
          </Button>

          <div className={styles.cvReviewResultsMarkdownWrapper}>
            <MarkdownViewer
              markdownContent={cvReviewResultsData?.result ?? ""}
            />
          </div>
        </>
      )}
    </div>
  );
};
